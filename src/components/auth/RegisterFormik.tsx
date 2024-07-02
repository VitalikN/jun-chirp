import { Field, Form, Formik } from "formik";
import ErrorFeedback from "./ErrorFeedback";
import * as Yup from "yup";
import s from "@/sass/layouts/register.module.scss";
import { useRegisterMutation } from "@/redux/auth/authApi";

export const validationSchemaRegister = Yup.object().shape({
  userName: Yup.string()
    .min(3, "ім'я може містити від 3 до 50 символів")
    .max(50, "ім'я може містити від 3 до 50 символів")
    .matches(
      /^[a-zA-Zа-яА-ЯёЁЇїІіЄєҐґ' -]+$/,
      "Ім’я може містити тільки букви, пробіли, апострофи і дефіси"
    )
    .required("Ім’я не може бути порожнім"),

  email: Yup.string()
    .email("Некоректний формат електронної пошти")
    .required("Обов'язкове поле!")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Введіть дійсну електронну адресу у форматі username@example.com"
    ),

  password: Yup.string()
    .min(8, "Пароль повинен містити щонайменше 8 символів.")
    .matches(/[a-z]/, "Пароль має містити принаймні одну малу літеру.")
    .matches(/[A-Z]/, "Пароль має містити принаймні одну велику літеру.")
    .matches(/\d/, "Пароль має містити принаймні одну цифру.")
    .matches(
      /[!@#$%^&*]/,
      "Пароль повинен містити спеціальний символ (!@#$%^&*)."
    )
    .matches(/^\S*$/, "Пароль не повинен містити пробілів.")
    .notOneOf(
      [
        "password",
        "123456",
        "12345678",
        "1234",
        "qwerty",
        "12345",
        "dragon",
        "baseball",
        "football",
        "letmein",
        "monkey",
        "696969",
        "abc123",
        "mustang",
        "shadow",
        "master",
        "666666",
        "qwertyuiop",
        "123321",
        "password1",
        "123",
      ],
      "Уникайте очевидних паролів, таких як 'password123'."
    )
    .test(
      "no-name",
      "Пароль не повинен містити ваше ім'я або прізвище.",
      function (value) {
        const { userName } = this.parent;
        return !value || !new RegExp(userName, "i").test(value);
      }
    )
    .required("Обов'язкове поле!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Паролі повинні збігатися")
    .required("Обов'язкове поле!"),

  rememberMe: Yup.boolean()
    .oneOf(
      [true],
      "Ви повинні погодитись з умовами використання та політикою конфіденційності"
    )
    .required(
      "Ви повинні погодитись з умовами використання та політикою конфіденційності"
    ),
});

export interface FormValuesRegister {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;
}

const RegisterFormik = () => {
  const [register] = useRegisterMutation();

  const handleSubmit = async (
    values: FormValuesRegister,
    { resetForm }: { resetForm: () => void }
  ) => {
    const { userName, email, password } = values;

    await register({ user: { userName, email, password } });
    console.log(values);
    // resetForm();
  };

  return (
    <Formik
      initialValues={{
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        rememberMe: false,
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchemaRegister}
    >
      {({ errors, touched }) => (
        <Form className={s.form}>
          <div className={s.form__box}>
            <label
              className={`${s.label} ${
                touched.userName && errors.userName ? s.invalid : ""
              } `}
            >
              Ім`я
              <svg width="6" height="16" className={s.chip}>
                <use href="/symbol-defs.svg#icon"></use>
              </svg>
            </label>
            <Field
              className={`${s.input} ${
                touched.userName && errors.userName
                  ? s.invalid
                  : touched.userName && !errors.userName
                  ? s.valid
                  : ""
              }`}
              type="text"
              name="userName"
              error={touched.userName && errors.userName}
            />
            <ErrorFeedback name="userName" />
          </div>

          {/*  */}
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
            <svg width="40" height="40" className={s.chip__eye}>
              <use href="/symbol-defs.svg#eye-close"></use>
            </svg>
            {/* <svg width="40" height="40" className={s.chip__eye}>
              <use href="/symbol-defs.svg#eye"></use>
            </svg> */}

            <ErrorFeedback name="password" />
          </div>

          {/*  */}
          <div className={`${s.form__box} `}>
            <label
              className={`${s.label}  ${
                touched.confirmPassword && errors.confirmPassword
                  ? s.invalid
                  : ""
              }`}
            >
              Повторити пароль
              <svg width="6" height="16" className={s.chip}>
                <use href="/symbol-defs.svg#icon"></use>
              </svg>
            </label>

            <Field
              className={`${s.input} ${
                touched.confirmPassword && errors.confirmPassword
                  ? s.invalid
                  : touched.confirmPassword && !errors.confirmPassword
                  ? s.valid
                  : ""
              }`}
              //   className={s.input}
              type="password"
              name="confirmPassword"
              error={touched.confirmPassword && errors.confirmPassword}
            />
            <svg width="40" height="40" className={s.chip__eye}>
              <use href="/symbol-defs.svg#eye-close"></use>
            </svg>
            {/* <svg width="40" height="40" className={s.chip__eye}>
              <use href="/symbol-defs.svg#eye"></use>
            </svg> */}

            <ErrorFeedback name="confirmPassword" />
          </div>
          {/*  */}

          <div className={s.form__box__checkbox}>
            {/* ${
                  touched.rememberMe && errors.rememberMe
                    ? s.error__rememberMe
                    : ""
                } */}

            <label className={`${s.checkboxLabel} `}>
              <Field
                type="checkbox"
                name="rememberMe"
                className={`${s.checkbox} `}
              />
              <svg width="14" height="12" className={`${s.chip__checkbox} `}>
                <use href="/symbol-defs.svg#checkbox"></use>
              </svg>
              <p className={s.text}>
                Я погоджуюсь з<span> Умовами використання </span> та
                <span> Політикою конфіденційності </span>
              </p>
            </label>
            {touched.rememberMe && errors.rememberMe && (
              <div className={s.invalid__checkbox__message}>
                {errors.rememberMe}
              </div>
            )}
          </div>

          <div className={s.box__btn}>
            <button className={s.resetBtn} type="reset">
              {/* {isLoading ? "Loading...." : "ВІДМІНИТИ"} */}
              ВІДМІНИТИ
            </button>
            <button className={s.styledBtn} type="submit">
              {/* {isLoading ? "Loading...." : "Зареєструватись"} */}
              Зареєструватись
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default RegisterFormik;
