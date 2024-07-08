"use client";

import React, { useEffect, useState } from "react";

import authSelector from "@/redux/auth/authSelector";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
// import { useConfirmEmailMutation } from "@/redux/auth/";
import { Field, Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";
import s from "@/sass/layouts/emailConfirmation.module.scss";
import {
  useConfirmEmailMutation,
  useResendConfirmationCodeMutation,
} from "@/redux/auth/authApi";
import useRouterPush from "@/hooks.ts/useRouter";

const validationSchemaConfirm = Yup.object().shape({
  code: Yup.string()
    .length(6, "Код має містити 6 цифр")
    .required("Код не може бути порожнім"),
});
// Неправильний код.Будь ласка, перевірте і спробуйте ще раз
// Термін дії коду закінчився. Будь ласка, запросіть новий код для підтвердження

// Ви вичерпали всі спроби отримання нового коду підтвердження. Будь ласка, зачекайте 15 хвилин перед наступною спробою отримання нового коду

const EmailConfirmation = () => {
  const [confirm, { isLoading }] = useConfirmEmailMutation();
  const [resendCode] = useResendConfirmationCodeMutation();
  const isConfirmed = useSelector(authSelector.selectIsConfirmed);

  const emailSelector = useSelector(authSelector.getEmail);
  const [email, setEmail] = useState<string | null>(emailSelector);
  const [timeLeft, setTimeLeft] = useState(600);
  const { pushRouter } = useRouterPush();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("registrationFormData");
    if (storedEmail) {
      const { email } = JSON.parse(storedEmail);
      setEmail(email);
    }

    if (email === null || undefined) {
      pushRouter("/register");
    }
  }, [email, pushRouter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleResendCode = async (email: string) => {
    try {
      await resendCode({ email });
      console.log("New confirmation code sent successfully");
    } catch (error) {
      console.error("Failed to resend confirmation code", error);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };
  const handleSubmit = async (values: FormikValues) => {
    try {
      const res = await confirm({ email, code: values.code }).unwrap();

      console.log("!email!email", res.accessToken);
      if (res.accessToken) {
        pushRouter("/");
      }
    } catch (error) {
      console.error("Confirmation failed", error);
    }
  };
  return (
    <section className={s.section}>
      <div className={`${s.container}    ${s.container__resend}`}>
        <h2 className={s.title}>Підтвердження електронної пошти</h2>
        <p className={s.text}>
          Введіть 6 - значний код, який ми надіслали на вашу пошту
          <span className={s.email__text}>{email}</span>
        </p>
        <p className={s.timer}> {formatTime(timeLeft)}</p>
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
              <button
                className={`${s.styledBtn} ${
                  touched.code && errors.code ? s.invalid__styledBtn : ""
                }`}
                type="submit"
              >
                {isLoading ? "Loading...." : "підтвердити"}
                {/* підтвердити */}
              </button>
            </Form>
          )}
        </Formik>
        <button
          onClick={() => email && handleResendCode(email)}
          className={s.btn__resend}
        >
          {isLoading ? "Sending..." : "Відправити новий код повторно"}
        </button>
      </div>
    </section>
  );
};

export default EmailConfirmation;
