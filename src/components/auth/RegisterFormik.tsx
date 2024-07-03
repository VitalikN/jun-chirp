import { Field, Form, Formik } from "formik";
import ErrorFeedback from "./ErrorFeedback";
import s from "@/sass/layouts/register.module.scss";
import { useRegisterMutation } from "@/redux/auth/authApi";
import { validationSchemaRegister } from "@/utils/schema/validationRegister";
import { FormValuesRegister } from "@/utils/types/FormValuesRegister";

const RegisterFormik = () => {
  const [register] = useRegisterMutation();

  const handleSubmit = async (
    values: FormValuesRegister,
    { resetForm }: { resetForm: () => void }
  ) => {
    const { userName, email, password } = values;

    const data = await register({ user: { userName, email, password } });
    if (data) {
      // resetForm();
    }
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
