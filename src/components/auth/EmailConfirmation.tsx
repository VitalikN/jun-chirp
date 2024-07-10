"use client";

import React from "react";

import { Field, Form, Formik } from "formik";

import useEmailConfirmation from "@/hooks/useEmailConfirmation";
import { validationSchemaConfirm } from "@/utils/schema/validationSchemaConfirm";
import ToastContainer from "../ToastContainer";

import s from "@/sass/layouts/emailConfirmation.module.scss";

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
  } = useEmailConfirmation();

  return (
    <section className={s.section}>
      <ToastContainer />
      <div className={`${s.container}    ${s.container__resend}`}>
        <h2 className={s.title}>Підтвердження електронної пошти</h2>
        <p className={s.text}>
          Введіть 6 - значний код, який ми надіслали на вашу пошту
          <span className={s.email__text}>{email}</span>
        </p>
        <p className={s.timer}>
          {/* {cooldown !== null ? formatTime(cooldown) : */}
          {cooldown !== null
            ? `Код активний ще ${formatTime(cooldown)}.`
            : `Код активний ще ${formatTime(timeLeft)}.`}
          {/* {formatTime(timeLeft)} */}
        </p>
        <Formik
          initialValues={{ code: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchemaConfirm}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <Form className={s.form}>
              <div className={s.form__box}>
                {[...Array(6)].map((_, index) => (
                  <Field
                    key={index}
                    name={`code[${index}]`}
                    type="text"
                    className={`${s.input} ${
                      touched.code && errors.code ? s.invalid : ""
                    }`}
                    maxLength="1"
                    value={values.code[index] || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value;
                      if (/^[0-9]$/.test(value) || value === "") {
                        const newCode = values.code.split("");
                        newCode[index] = value;
                        setFieldValue("code", newCode.join(""));
                      }
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
              <button
                className={`${s.styledBtn} ${
                  (touched.code && errors.code) || backendError
                    ? s.invalid
                    : touched.code && !errors.code
                    ? s.valid
                    : ""
                }
              ${backendError ? s.invalid__backendError : ""}`}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Loading...." : "підтвердити"}
              </button>
            </Form>
          )}
        </Formik>
        <button
          onClick={() => email && handleResendCode(email)}
          className={`${s.btn__resend} ${cooldown !== null ? s.disabled : ""}`}
          disabled={cooldown !== null}
        >
          Відправити новий код повторно
        </button>
      </div>
    </section>
  );
};

export default EmailConfirmation;
