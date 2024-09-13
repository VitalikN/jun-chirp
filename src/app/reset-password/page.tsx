"use client";

import s from "./styles.module.scss";
import { Field, Form, Formik } from "formik";

import { useState } from "react";
import { useResetPasswordMutation } from "@/redux/auth/authApi";
import { toast } from "react-toastify";
import useRouterPush from "@/hooks/useRouter";
import { FormValuesResetPassword } from "@/components/auth/ResetPassword/FormValuesResetPassword";
import ToastContainer from "@/components/ToastContainer/ToastContainer";
import { validationSchemaResetPassword } from "@/components/auth/ResetPassword/validationSchemaResetPassword";
import SvgIcon from "@/components/SvgIcon/SvgIcon";
import ErrorFeedback from "@/components/auth/ErrorFeedback";
import Button from "@/components/Button/Button";
import Loader from "@/components/Loader/Loader";

const ResetPasswordPage = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [backendError, setBackendError] = useState<string | null>(null);
  const { pushRouter } = useRouterPush();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = () => {
    setBackendError(null);
  };
  const handleSubmit = async (
    values: FormValuesResetPassword,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const { email, code, newPassword } = values;
      console.log("dsdsd");

      const res = await resetPassword({ email, code, newPassword }).unwrap();
      if (res) {
        toast.success(
          "Ваш пароль успішно змінено. Ви будете перенаправлені на сторінку входу."
        );
        resetForm();
        pushRouter("/sign_in");
      }
    } catch (error) {
      toast.error("Неправильний email або code");

      let errorMessage = "Неправильний email або code";

      setBackendError(errorMessage);
    }
  };
  return (
    <section className={s.section}>
      <div className={`${s.container}    ${s.container__resend}`}>
        <ToastContainer /> <h2 className={s.title}>Зміна паролю</h2>
        <p className={s.text}>
          Перевірте свою електронну пошту, ми відправили лист із подальшими
          інструкціями для відновлення паролю.
          <br />
          <br /> Якщо ви не отримали листа для відновлення паролю, перевірте
          папку зі спамом.
        </p>
        <Formik
          initialValues={{ email: "", code: "", newPassword: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchemaResetPassword}
        >
          {({
            errors,
            touched,
            dirty,
            isValid,
            handleChange: formikHandleChange,
          }) => (
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    formikHandleChange(e);
                    handleChange();
                  }}
                  className={`${s.input} ${
                    (touched.email && errors.email) || backendError
                      ? //
                        s.invalid
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
              <div className={s.form__box}>
                <label
                  className={`${s.label} ${
                    touched.code && errors.code ? s.invalid : ""
                  } `}
                >
                  Код
                  <SvgIcon id="icon" width={6} height={16} className={s.chip} />
                </label>
                <Field
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    formikHandleChange(e);
                    handleChange();
                  }}
                  className={`${s.input} ${
                    (touched.code && errors.code) || backendError
                      ? // || backendError
                        s.invalid
                      : touched.code && !errors.code
                      ? s.valid
                      : ""
                  }`}
                  type="text"
                  name="code"
                  error={touched.code && errors.code}
                />
                {(touched.code && errors.code) || backendError ? (
                  <span className={s.warning}>!</span>
                ) : null}
                <ErrorFeedback name="code" />
              </div>
              <div className={`${s.form__box} ${s.nth__child}`}>
                <label
                  className={`${s.label}  ${
                    touched.newPassword && errors.newPassword ? s.invalid : ""
                  }`}
                >
                  Пароль
                  <SvgIcon id="icon" width={6} height={16} className={s.chip} />
                </label>

                <Field
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    formikHandleChange(e);
                    handleChange();
                  }}
                  className={`${s.input} ${
                    touched.newPassword && errors.newPassword
                      ? s.invalid
                      : touched.newPassword && !errors.newPassword
                      ? s.valid
                      : ""
                  }`}
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  error={touched.newPassword && errors.newPassword}
                />

                {touched.newPassword && errors.newPassword && (
                  <span className={s.warning}>!</span>
                )}

                <SvgIcon
                  id={showPassword ? "eye-close" : "eye"}
                  width={40}
                  height={40}
                  className={s.chip__eye}
                  onClick={togglePasswordVisibility}
                />

                <ErrorFeedback name="newPassword" />
              </div>
              <div className={s.box__btn}>
                <Button
                  title="ВІДМІНИТИ"
                  className={s.resetBtn}
                  type="reset"
                  isDisabled={!dirty || isLoading}
                />
                <Button
                  className={`${s.styledBtn}
                 
                 ${
                   isLoading
                     ? s.styledBtn
                     : !touched.email || errors.email
                     ? ""
                     : !touched.email || errors.email || backendError
                     ? s.invalid
                     : s.valid
                 } `}
                  type="submit"
                  isDisabled={!dirty || !isValid || isLoading}
                >
                  {isLoading ? (
                    <>
                      Змінити пароль <Loader />
                    </>
                  ) : (
                    "Змінити пароль"
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};
export default ResetPasswordPage;
