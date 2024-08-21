"use client";

import Loader from "../ui/Loader";

import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import SvgIcon from "../ui/SvgIcon";
import ErrorFeedback from "./ErrorFeedback";
import Button from "../ui/Button";
import s from "@/sass/layouts/requestPasswordReset.module.scss";
import { useRequestPasswordResetMutation } from "@/redux/auth/authApi";
import { toast } from "react-toastify";
import ToastContainer from "../ui/ToastContainer";
import useRouterPush from "@/hooks/useRouter";
import { useState } from "react";
import { customError } from "@/utils/types/customError";
import { FormValuesRequestPasswordReset } from "@/utils/types/interface";
import { validationSchemaRequestPasswordReset } from "@/utils/schema/RequestPasswordReset";

const RequestPasswordReset = () => {
  const [requestPasswordReset, { isLoading }] =
    useRequestPasswordResetMutation();
  const { pushRouter } = useRouterPush();
  const [backendError, setBackendError] = useState<string | null>(null);
  console.log(backendError);

  const handleChange = () => {
    setBackendError(null);
  };
  const handleSubmit = async (
    values: FormValuesRequestPasswordReset,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const { email } = values;
      const res = await requestPasswordReset({ email }).unwrap();

      if (res) {
        resetForm();
        pushRouter("/reset_password");
      }
    } catch (error) {
      const err = error as customError;
      const status = err.status;
      let errorMessage = "Користувача не знайдено";
      if (status === 404) setBackendError(errorMessage);
    }
  };
  return (
    <section className={s.section}>
      <div className={`${s.container}    ${s.container__resend}`}>
        <ToastContainer />
        <h2 className={s.title}>Відправити запит на зміну паролю ?</h2>
        <Formik
          initialValues={{ email: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchemaRequestPasswordReset}
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
              {backendError && (
                <div className={s.error__backend}>{backendError}</div>
              )}
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
                    відновити пароль <Loader />
                  </>
                ) : (
                  "відновити пароль"
                )}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};
export default RequestPasswordReset;
