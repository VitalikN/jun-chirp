"use client";

import React from "react";

import { Field, Form, Formik } from "formik";

import { validationSchemaConfirm } from "@/components/auth/EmailConfirmation/validationSchemaConfirm";
import ToastContainer from "../../ToastContainer/ToastContainer";

import Button from "../../Button/Button";
import Loader from "../../Loader/Loader";
import s from "./emailConfirmation.module.scss";
import useEmailConfirmation from "@/hooks/useEmailConfirmation";
import useCodeInput from "@/hooks/useCodeInput";

const EmailConfirmation = () => {
  const {
    cooldown,
    email,
    timeLeft,
    isLoading,
    handleSubmit,
    handleResendCode,
    formatTime,
    backendError,
    handleChangeBackend,
  } = useEmailConfirmation();

  const { inputRefs, handleChange, handlePaste } = useCodeInput();

  return (
    <section className={s.section}>
      <div className={`${s.container}    ${s.container__resend}`}>
        <ToastContainer />
        <h2 className={s.title}>Підтвердження електронної пошти</h2>
        <p className={s.text}>
          Введіть 6 значний код, який ми надіслали на Вашу електронну пошту
          <span className={s.email__text}>{email}</span>
        </p>
        <p className={s.timer}>
          {cooldown !== null
            ? `Кнопка стане доступною для нового запиту, а код залишиться активним ще   ${formatTime(
                cooldown
              )}.`
            : `Код активний ще ${formatTime(timeLeft)}.`}
        </p>
        <Formik
          initialValues={{ code: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchemaConfirm}
        >
          {({
            errors,
            touched,
            values,
            setFieldValue,
            dirty,
            handleChange: formikHandleChange,
          }) => (
            <Form className={s.form}>
              <div
                className={s.form__box}
                onPaste={(e) => handlePaste(e, setFieldValue)}
              >
                {[...Array(6)].map((_, index) => (
                  <Field
                    key={index}
                    name={`code[${index}]`}
                    type="text"
                    className={`${s.input} ${
                      (touched.code && errors.code) || backendError
                        ? s.invalid
                        : touched.code && !errors.code
                        ? s.valid
                        : ""
                    }`}
                    maxLength="1"
                    value={values.code[index] || ""}
                    innerRef={(ref: HTMLInputElement) =>
                      (inputRefs.current[index] = ref)
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      formikHandleChange(e);
                      handleChangeBackend();
                      handleChange(e, index, setFieldValue, values);
                    }}
                  />
                ))}
                {touched.code && errors.code && (
                  <div className={s.invalid__code__message}>{errors.code}</div>
                )}
              </div>
              {backendError && (
                <div className={s.error__backend}>{backendError}</div>
              )}
              <Button
                className={`${s.styledBtn} ${
                  (touched.code && errors.code) || backendError
                    ? s.invalid
                    : touched.code && !errors.code
                    ? s.valid
                    : ""
                }
              ${backendError ? s.invalid__backendError : ""}`}
                type="submit"
                isDisabled={isLoading || !dirty}
              >
                {isLoading ? (
                  <>
                    Підтвердити
                    <Loader />
                  </>
                ) : (
                  "Підтвердити"
                )}
              </Button>
            </Form>
          )}
        </Formik>
        <Button
          title="Надіслати код повторно"
          onClick={() => email && handleResendCode(email)}
          className={`${s.btn__resend} ${cooldown !== null ? s.disabled : ""}`}
          isDisabled={cooldown !== null || isLoading}
        />
      </div>
    </section>
  );
};

export default EmailConfirmation;