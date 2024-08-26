import { Field, Form, Formik } from "formik";

import useSignInFormik from "@/hooks/useSignInFormik";

import { validationSchemaSignIn } from "./validationSchemaSignIn";

import s from "./signIn.module.scss";
import ToastContainer from "@/components/ToastContainer/ToastContainer";
import { FormField } from "../components/form-field/form-field";
import SvgIcon from "@/components/SvgIcon/SvgIcon";
import Button from "@/components/Button/Button";
import Loader from "@/components/Loader/Loader";

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
            <FormField
              name={"email"}
              label={"Email"}
              type={"email"}
              touched={touched}
              errors={errors}
              backendError={backendError}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                formikHandleChange(e);
                handleChange();
              }}
            />
            <FormField
              name={"password"}
              label={"Пароль"}
              type={"password"}
              touched={touched}
              errors={errors}
              backendError={backendError}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                formikHandleChange(e);
                handleChange();
              }}
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
            />

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
