"use client";

import React from "react";

import { Field, Form, Formik } from "formik";

import styles from "./styles.module.scss";
import useEmailConfirmation from "@/hooks/useEmailConfirmation";
import useCodeInput from "@/hooks/useCodeInput";
import ToastContainer from "@/components/ToastContainer/ToastContainer";
import Button from "@/components/Button/Button";
import Loader from "@/components/Loader/Loader";
import { validationSchemaConfirm } from "./validation-schema-confirm";

const ConfirPage = () => {
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
    <section className={styles.section}>
      <div className={`${styles.container}    ${styles.container__resend}`}>
        <ToastContainer />
        <h2 className={styles.title}>Підтвердження електронної пошти</h2>
        <p className={styles.text}>
          Введіть 6 значний код, який ми надіслали на Вашу електронну пошту{" "}
          <span className={styles.email__text}> {email} </span>{" "}
        </p>
        <p className={styles.timer}>
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
            <Form className={styles.form}>
              <div
                className={styles.form__box}
                onPaste={(e) => handlePaste(e, setFieldValue)}
              >
                {[...Array(6)].map((_, index) => (
                  <Field
                    key={index}
                    name={`code[${index}]`}
                    type="text"
                    className={`${styles.input} ${
                      (touched.code && errors.code) || backendError
                        ? styles.invalid
                        : touched.code && !errors.code
                        ? styles.valid
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
                  <div className={styles.invalid__code__message}>
                    {errors.code}
                  </div>
                )}
              </div>
              {backendError && (
                <div className={styles.error__backend}>{backendError}</div>
              )}
              <Button
                className={`${styles.styledBtn} ${
                  (touched.code && errors.code) || backendError
                    ? styles.invalid
                    : touched.code && !errors.code
                    ? styles.valid
                    : ""
                }
              ${backendError ? styles.invalid__backendError : ""}`}
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
          className={`${styles.btn__resend} ${
            cooldown !== null ? styles.disabled : ""
          }`}
          isDisabled={cooldown !== null || isLoading}
        />
      </div>
    </section>
  );
};

export default ConfirPage;
