import { Field, Form, Formik } from "formik";
import ErrorFeedback from "./ErrorFeedback";
import * as Yup from "yup";
import s from "@/sass/layouts/signIn.module.scss";

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Введіть дійсну електронну адресу у форматі username@example.com")
    .required("Обов'язкове поле!"),

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

const SignInFormik = () => {
  const handleSubmit = async (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    console.log(values);
    resetForm();
  };
  return (
    <Formik
      initialValues={{ email: "", password: "", rememberMe: false }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ errors, touched }) => (
        <Form className={s.form}>
          <div className={s.form__box}>
            <label
              className={`${s.label} ${
                touched.email && errors.email ? s.invalid : ""
              } `}
            >
              Email
              <svg width="6" height="16" className={s.chip}>
                <use href="/symbol-defs.svg#icon"></use>
              </svg>
            </label>
            <Field
              className={`${s.input} ${
                touched.email && errors.email
                  ? s.invalid
                  : touched.email && !errors.email
                  ? s.valid
                  : ""
              }`}
              type="email"
              name="email"
              error={touched.email && errors.email}
            />
            <ErrorFeedback name="email" />
          </div>
          <div className={s.form__box}>
            <label
              className={`${s.label}  ${
                touched.password && errors.password ? s.invalid : ""
              }`}
            >
              Пароль
              <svg width="6" height="16" className={s.chip}>
                <use href="/symbol-defs.svg#icon"></use>
              </svg>
            </label>

            <Field
              className={`${s.input} ${
                touched.password && errors.password
                  ? s.invalid
                  : touched.password && !errors.password
                  ? s.valid
                  : ""
              }`}
              //   className={s.input}
              type="password"
              name="password"
              error={touched.password && errors.password}
            />
            {/* <svg width="40" height="40" className={s.chip__eye}>
              <use href="/symbol-defs.svg#eye-close"></use>
            </svg> */}
            <svg width="40" height="40" className={s.chip__eye}>
              <use href="/symbol-defs.svg#eye"></use>
            </svg>

            <ErrorFeedback name="password" />
          </div>
          <div className={s.form__box__checkbox}>
            <label className={s.checkboxLabel}>
              <Field type="checkbox" name="rememberMe" className={s.checkbox} />
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
  );
};
export default SignInFormik;
