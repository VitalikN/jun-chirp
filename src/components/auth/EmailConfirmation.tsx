"use client";

import React, { useEffect, useState } from "react";

import authSelector from "@/redux/auth/authSelector";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useConfirmEmailMutation } from "@/redux/auth/authApi";
import { Field, Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";
import s from "@/sass/layouts/emailConfirmation.module.scss";

const validationSchemaConfirm = Yup.object().shape({
  code: Yup.string()
    .length(6, "Код має містити 6 цифр")
    .required("Код не може бути порожнім"),
});
// ;Неправильний код.Будь ласка, перевірте і спробуйте ще раз
// Термін дії коду закінчився. Будь ласка, запросіть новий код для підтвердження

// Ви вичерпали всі спроби отримання нового коду підтвердження. Будь ласка, зачекайте 15 хвилин перед наступною спробою отримання нового коду

const EmailConfirmation = () => {
  const router = useRouter();
  const email = useSelector(authSelector.getEmail);
  const token = useSelector(authSelector.selectToken);
  const [confirm] = useConfirmEmailMutation();

  const [timeLeft, setTimeLeft] = useState(180);

  // useEffect(() => {
  //   if (!token && !email) {
  //     router.push("/register");
  //   }
  // }, [token, email, router]);

  useEffect(() => {
    token && email ? router.push("/register") : "";
  }, [token, email, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };
  const handleSubmit = async (values: FormikValues) => {
    console.log(values);
    console.log(values.code);

    try {
      await confirm({ email, code: values.code });
    } catch (error) {
      console.error("Confirmation failed", error);
    }
  };
  return (
    <section className={s.section}>
      <div className={s.container}>
        <h2 className={s.title}>Підтвердження електронної пошти</h2>
        <p className={s.text}>
          Введіть 6-значний код, який ми надіслали на вашу пошту -
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
                {/* {isLoading ? "Loading...." : "підтвердити"} */}
                підтвердити
              </button>
            </Form>
          )}
        </Formik>
        <p>Відправити новий код повторно</p>
      </div>
    </section>
  );
};

export default EmailConfirmation;
