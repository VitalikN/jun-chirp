import { Field, Form, Formik } from "formik";
import ErrorFeedback from "./ErrorFeedback";
import s from "@/sass/layouts/register.module.scss";
import { useRegisterMutation } from "@/redux/auth/authApi";
import { validationSchemaRegister } from "@/utils/schema/validationRegister";
import { FormValuesRegister } from "@/utils/types/FormValuesRegister";

const RegisterFormik = () => {
  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (
    values: FormValuesRegister,
    { resetForm }: { resetForm: () => void }
  ) => {
    const { userName, email, password } = values;

    await register({ user: { userName, email, password } });
    resetForm();
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
            {touched.userName && errors.userName ? (
              <span className={s.warning}>!</span>
            ) : touched.userName && !errors.userName ? (
              <p className={s.chip__checkbox__valid}>
                <svg width="12" height="10">
                  <use href="/symbol-defs.svg#checkbox"></use>
                </svg>
              </p>
            ) : null}
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
            {touched.email && errors.email ? (
              <span className={s.warning}>!</span>
            ) : touched.email && !errors.email ? (
              <p className={s.chip__checkbox__valid}>
                <svg width="12" height="10">
                  <use href="/symbol-defs.svg#checkbox"></use>
                </svg>
              </p>
            ) : null}
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
            {
              touched.password && errors.password ? (
                <span className={s.warning}>!</span>
              ) : (
                <svg width="40" height="40" className={s.chip__eye}>
                  <use href="/symbol-defs.svg#eye-close"></use>
                </svg>
              ) // {/* <svg width="40" height="40" className={s.chip__eye}>
              //   <use href="/symbol-defs.svg#eye"></use>
              // </svg> */}
            }

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
            {
              touched.confirmPassword && errors.confirmPassword ? (
                <span className={s.warning}>!</span>
              ) : (
                <svg width="40" height="40" className={s.chip__eye}>
                  <use href="/symbol-defs.svg#eye-close"></use>
                </svg>
              ) // {/* <svg width="40" height="40" className={s.chip__eye}>
              //   <use href="/symbol-defs.svg#eye"></use>
              // </svg> */}
            }

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
              ВІДМІНИТИ
            </button>

            {/*  */}

            <button
              className={`${s.styledBtn} ${
                (touched.userName && errors.userName) ||
                (touched.email && errors.email) ||
                (touched.password && errors.password) ||
                (touched.confirmPassword && errors.confirmPassword) ||
                (touched.rememberMe && errors.rememberMe)
                  ? s.invalid
                  : (touched.userName && errors.userName) ||
                    (touched.email && errors.email) ||
                    (touched.password && errors.password) ||
                    (touched.confirmPassword && errors.confirmPassword) ||
                    (touched.rememberMe && !errors.rememberMe)
                  ? s.valid
                  : ""
              }`}
              type="submit"
            >
              {isLoading ? "Loading...." : "Зареєструватись"}
              {(touched.userName && errors.userName) ||
              (touched.email && errors.email) ||
              (touched.password && errors.password) ||
              (touched.confirmPassword && errors.confirmPassword) ||
              (touched.rememberMe && errors.rememberMe) ? (
                <span className={s.warning}>!</span>
              ) : (
                ""
              )}
            </button>
            {/*  */}
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default RegisterFormik;
