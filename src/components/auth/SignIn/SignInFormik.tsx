import { Form, Formik } from "formik";

import useSignInFormik from "@/hooks/useSignInFormik";

import { validationSchemaSignIn } from "./validationSchemaSignIn";

import s from "./signIn.module.scss";
import ToastContainer from "@/components/ToastContainer/ToastContainer";
import Button from "@/components/Button/Button";
import Loader from "@/components/Loader/Loader";
import { FormField } from "@/components/common/form-field/form-field";

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
        {({
          errors,
          touched,
          dirty,
          handleChange: formikHandleChange,
          isValid,
        }) => (
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
              isThisPassword={true}
            />

            {backendError && (
              <div className={s.error__backend}>{backendError}</div>
            )}

            <Button
              className={`${s.styledBtn} ${
                isLoading || isValid
                  ? s.valid
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
