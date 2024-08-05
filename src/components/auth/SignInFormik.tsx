import { Field, Form, Formik } from "formik";

import useSignInFormik from "@/hooks/useSignInFormik";
import ErrorFeedback from "./ErrorFeedback";
import ToastContainer from "../ui/ToastContainer";

import { validationSchemaSignIn } from "@/utils/schema/validationSchemaSignIn";
import s from "@/sass/layouts/signIn.module.scss";
import Button from "../ui/Button";
import SvgIcon from "../ui/SvgIcon";
import Loader from "../ui/Loader";

const SignInFormik = () => {
  const {
    handleSubmit,
    togglePasswordVisibility,
    isLoading,
    showPassword,
    backendError,
  } = useSignInFormik();

  return (
    <>
      <ToastContainer />
      <Formik
        initialValues={{ email: "", password: "", rememberMe: false }}
        onSubmit={handleSubmit}
        validationSchema={validationSchemaSignIn}
      >
        {({ errors, touched, dirty, isValid }) => (
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
              <label className={s.checkboxLabel}>
                <Field
                  type="checkbox"
                  name="rememberMe"
                  className={s.checkbox}
                />
                <SvgIcon
                  id="checkbox"
                  width={14}
                  height={12}
                  className={s.chip__checkbox}
                />
                Запам`ятати мене
              </label>
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
              isDisabled={!dirty || !isValid || isLoading}
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
