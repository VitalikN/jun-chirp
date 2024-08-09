"use client";

import s from "@/sass/layouts/resetPassword.module.scss";
import Loader from "../ui/Loader";
import { Field, Form, Formik } from "formik";

import SvgIcon from "../ui/SvgIcon";
import ErrorFeedback from "./ErrorFeedback";
import Button from "../ui/Button";
import { useState } from "react";
import { useResetPasswordMutation } from "@/redux/auth/authApi";
import { toast } from "react-toastify";
import ToastContainer from "../ui/ToastContainer";
import useRouterPush from "@/hooks/useRouter";
import { FormValuesResetPassword } from "@/utils/types/FormValuesResetPassword";
import { validationSchemaResetPassword } from "@/utils/schema/validationSchemaResetPassword";

const ResetPassword = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [backendError, setBackendError] = useState<string | null>(null);
  const { pushRouter } = useRouterPush();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
      toast.error("Неправильний код або пароль");

      let errorMessage = "Неправильний код або пароль";

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
                    touched.email && errors.email
                      ? // || backendError
                        s.invalid
                      : touched.email && !errors.email
                      ? s.valid
                      : ""
                  }`}
                  type="email"
                  name="email"
                  error={touched.email && errors.email}
                />
                {touched.email && errors.email ? (
                  // || backendError
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
                  className={`${s.input} ${
                    touched.code && errors.code
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
                {touched.code && errors.code ? (
                  // || backendError
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

              <Button
                className={`${s.styledBtn}
                 
                 ${
                   isLoading
                     ? s.styledBtn
                     : !touched.email || errors.email
                     ? ""
                     : !touched.email || errors.email
                     ? // || backendError
                       s.invalid
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
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};
export default ResetPassword;
