import { Field, Form, Formik } from "formik";

import { validationSchemaSignIn } from "./validationSchemaSignIn";
import ToastContainer from "@/components/ToastContainer/ToastContainer";
import SvgIcon from "@/components/SvgIcon/SvgIcon";
import ErrorFeedback from "../ErrorFeedback";
import Button from "@/components/Button/Button";
import Loader from "@/components/Loader/Loader";
import s from "./signIn.module.scss";
import useSignInFormik from "@/hooks/useSignInFormik";

const SignInFormik = () => {
  const {
    handleSubmit,
    togglePasswordVisibility,
    isLoading,
    showPassword,
    backendError,
    handleChange,
  } = useSignInFormik();

  return (
    <>
      <ToastContainer />
      <Formik
        initialValues={{ email: "", password: "", rememberMe: false }}
        onSubmit={handleSubmit}
        validationSchema={validationSchemaSignIn}
      >
        {({ errors, touched, dirty, handleChange: formikHandleChange }) => (
          <Form className={s.form}>
            <div className={s.form__box}>
              <label
                className={`${s.label} ${
                  touched.email && errors.email ? s.invalid : ""
                } `}
              >
                Email
                <SvgIcon id="icon" width={6} height={16} className={s.chip} />
              </label>
              <Field
                className={`${s.input} ${
                  (touched.email && errors.email) || backendError
                    ? s.invalid
                    : touched.email && !errors.email
                    ? s.valid
                    : ""
                }`}
                type="email"
                name="email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  formikHandleChange(e);
                  handleChange();
                }}
                error={touched.email && errors.email}
              />
              {(touched.email && errors.email) || backendError ? (
                <span className={s.warning}>!</span>
              ) : null}
              <ErrorFeedback name="email" />
            </div>
            <div className={`${s.form__box} ${s.nth__child}`}>
              <label
                className={`${s.label}  ${
                  touched.password && errors.password ? s.invalid : ""
                }`}
              >
                Пароль
                <SvgIcon id="icon" width={6} height={16} className={s.chip} />
              </label>

              <Field
                className={`${s.input} ${
                  (touched.password && errors.password) || backendError
                    ? s.invalid
                    : touched.password && !errors.password
                    ? s.valid
                    : ""
                }`}
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  formikHandleChange(e);
                  handleChange();
                }}
                error={touched.password && errors.password}
              />

              {touched.password && errors.password && (
                <span className={s.warning}>!</span>
              )}

              <SvgIcon
                id={showPassword ? "eye-close" : "eye"}
                width={40}
                height={40}
                className={s.chip__eye}
                onClick={togglePasswordVisibility}
              />

              <ErrorFeedback name="password" />
            </div>

            <div className={s.form__box__checkbox}>
              <Field type="checkbox" name="rememberMe" className={s.checkbox} />
              <SvgIcon
                id="checkbox"
                width={14}
                height={12}
                className={s.chip__checkbox}
              />
              <label className={s.checkboxLabel}>Запам`ятати мене</label>{" "}
            </div>
            {backendError && (
              <div className={s.error__backend}>{backendError}</div>
            )}

            <Button
              className={`${s.styledBtn} ${
                isLoading
                  ? s.styledBtn
                  : !touched.email ||
                    errors.email ||
                    !touched.password ||
                    errors.password
                  ? ""
                  : !touched.email ||
                    errors.email ||
                    !touched.password ||
                    errors.password ||
                    backendError
                  ? s.invalid
                  : s.valid
              }
              `}
              type="submit"
              isDisabled={!dirty || isLoading}
            >
              {isLoading ? (
                <>
                  Увійти
                  <Loader />
                </>
              ) : (
                "Увійти"
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default SignInFormik;
