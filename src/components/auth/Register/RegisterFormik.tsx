import { Field, Form, Formik } from "formik";
import { validationSchemaRegister } from "@/components/auth/Register/validationRegister";
import ToastContainer from "../../ToastContainer/ToastContainer";
import Button from "../../Button/Button";
import SvgIcon from "../../SvgIcon/SvgIcon";
import Loader from "../../Loader/Loader";
import PasswordStrengthIndicator from "../PasswordStrengthIndicator/PasswordStrengthIndicator";
import s from "./register.module.scss";
import useRegisterFormik from "@/hooks/useRegisterFormik";
import { FormField } from "@/components/common/form-field/form-field";
import { useState } from "react";

const RegisterFormik = () => {
  const {
    handleSubmit,
    togglePasswordVisibility,
    showPassword,
    isLoading,
    backendError,
    handleChange,
  } = useRegisterFormik();

  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  return (
    <>
      <ToastContainer />
      <Formik
        initialValues={{
          userName: "",
          email: "",
          password: "",
          confirmPassword: "",
          rememberMe: false,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchemaRegister}
      >
        {({
          errors,
          touched,
          dirty,
          values,
          handleChange: formikHandleChange,
          isValid,
        }) => (
          <Form className={s.form}>
            <FormField
              name={"userName"}
              label={"Ім`я"}
              type={"text"}
              touched={touched}
              errors={errors}
              backendError={backendError}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                formikHandleChange(e);
                handleChange();
              }}
            />
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

            <PasswordStrengthIndicator password={values.password} />

            <FormField
              name={"confirmPassword"}
              label={"Повторити пароль"}
              type={"password"}
              touched={touched}
              errors={errors}
              backendError={backendError}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                formikHandleChange(e);
                handleChange();
              }}
              showPassword={showConfirmPassword}
              togglePasswordVisibility={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              isThisPassword={true}
            />

            <div className={s.form__box__checkbox}>
              <div className={s.form__box__checkbox__field}>
                <Field
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    formikHandleChange(e);
                    handleChange();
                  }}
                  type="checkbox"
                  name="rememberMe"
                  className={`${s.checkbox} `}
                />
                <SvgIcon
                  id="checkbox"
                  width={14}
                  height={12}
                  className={s.chip__checkbox}
                />
                <label className={`${s.checkboxLabel} `}>
                  <p className={s.text}>
                    Я погоджуюсь з{" "}
                    <span className={s.text__chip__checkbox}>
                      {" "}
                      Умовами використання{" "}
                    </span>{" "}
                    та{" "}
                    <span className={s.text__chip__checkbox}>
                      {" "}
                      Політикою конфіденційності{" "}
                    </span>{" "}
                  </p>
                </label>
              </div>
              {errors.rememberMe && touched.rememberMe && (
                <div className={s.invalid__checkbox__message}>
                  {errors.rememberMe}
                </div>
              )}
            </div>

            {backendError && (
              <div className={s.error__backend}>{backendError}</div>
            )}
            <div className={s.box__btn}>
              <Button
                title="ОЧИСТИТИ"
                className={s.resetBtn}
                type="reset"
                isDisabled={!dirty || isLoading}
              />
              <Button
                className={`${s.styledBtn} ${
                  isLoading || isValid
                    ? s.valid
                    : !touched.userName ||
                      errors.userName ||
                      !touched.email ||
                      errors.email ||
                      !touched.password ||
                      errors.password ||
                      !touched.confirmPassword ||
                      errors.confirmPassword ||
                      !touched.rememberMe ||
                      errors.rememberMe
                    ? " "
                    : backendError
                    ? s.invalid
                    : s.valid
                }`}
                type="submit"
                isDisabled={!dirty || isLoading}
              >
                {isLoading ? (
                  <>
                    Зареєструватись
                    <Loader />
                  </>
                ) : (
                  "Зареєструватись"
                )}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default RegisterFormik;
