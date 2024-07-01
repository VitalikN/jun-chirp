"use client";

import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";
import { Field, Form, Formik } from "formik";
import ErrorFeedback from "./ErrorFeedback";
import * as Yup from "yup";
import s from "@/sass/layouts/signIn.module.scss";

export const validationSchema = Yup.object().shape({
  email: Yup.string().required(
    "Введіть дійсну електронну адресу у форматі username@example.com"
  ),

  password: Yup.string()
    .min(
      8,
      "Пароль повинен містити щонайменше 8 символів, включаючи великі і малі літери, цифри та спеціальні символи."
    )
    .required("Обов'язкове поле!"),
});

export interface FormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const SignIn = () => {
  const pathname = usePathname();
  const router = useRouter();

  // useEffect(() => {
  //   token ? router.push("/personal_office") : "";
  // }, [token, router]);

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    console.log(values);
    resetForm();
  };

  return (
    <section className={`${s.section} `}>
      <div className={`${s.container} `}>
        <div className={s.box__link}>
          <Link
            href="/sign_in"
            className={` ${s.link} ${
              pathname === "/sign_in" ? s.link__sign_in : ""
            } `}
          >
            Увійти
          </Link>
          <span>/</span>
          <Link
            href="/register"
            className={` ${s.link} ${
              pathname === "/register" ? s.link__register : ""
            } `}
          >
            Зареєструватись
          </Link>
        </div>

        <Formik
          initialValues={{ email: "", password: "", rememberMe: false }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ errors, touched }) => (
            <Form className={s.form}>
              <div className={s.form__box}>
                <label className={s.label}>
                  Email
                  <svg width="6" height="16" className={s.chip}>
                    <use href="/symbol-defs.svg#icon"></use>
                  </svg>
                </label>
                <Field
                  className={s.input}
                  type="email"
                  name="email"
                  error={touched.email && errors.email}
                />
                <ErrorFeedback name="email" />
              </div>
              <div className={s.form__box}>
                <label className={s.label}>
                  Пароль
                  <svg width="6" height="16" className={s.chip}>
                    <use href="/symbol-defs.svg#icon"></use>
                  </svg>
                </label>

                <Field
                  className={s.input}
                  type="password"
                  name="password"
                  error={touched.password && errors.password}
                />
                <svg width="40" height="40" className={s.chip__eye}>
                  <use href="/symbol-defs.svg#eye-close"></use>
                </svg>

                <ErrorFeedback name="password" />
              </div>
              <div className={s.form__box__checkbox}>
                <label className={s.checkboxLabel}>
                  <Field
                    type="checkbox"
                    name="rememberMe"
                    className={s.checkbox}
                  />
                  <svg width="13" height="11" className={s.chip__checkbox}>
                    <use href="/symbol-defs.svg#checkbox"></use>
                  </svg>
                  Запам`ятати мене
                </label>
              </div>
              <button className={s.styledBtn} type="submit">
                {/* {isLoading ? "Loading...." : "Увійти"} */}
                Увійти
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};
export default SignIn;
