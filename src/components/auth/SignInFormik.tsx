import { Field, Form, Formik } from "formik";
import ErrorFeedback from "./ErrorFeedback";
import s from "@/sass/layouts/signIn.module.scss";
import { useLoginMutation } from "@/redux/auth/authApi";
import { validationSchemaSignIn } from "@/utils/schema/validationSchemaSignIn";
import { useState } from "react";
import { toast } from "react-toastify";
import ToastContainer from "../ToastContainer";
import useRouterPush from "@/hooks.ts/useRouter";

export interface FormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const SignInFormik = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const { pushRouter } = useRouterPush();

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const { email, password } = values;

      const res = await login({ user: { email, password } }).unwrap();
      if (res) {
        resetForm();

        pushRouter("/");

        toast.success("🦄 Wow so easy!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      const errorMessage =
        (error as { data?: { message?: string } })?.data?.message ||
        "Облікові дані недійсні";
      toast.error(`${errorMessage}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "", rememberMe: false }}
        onSubmit={handleSubmit}
        validationSchema={validationSchemaSignIn}
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
            <div className={`${s.form__box} ${s.nth__child}`}>
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
                type={showPassword ? "text" : "password"}
                name="password"
                error={touched.password && errors.password}
              />

              {touched.password && errors.password ? (
                <span className={s.warning}>!</span>
              ) : (
                <svg
                  width="40"
                  height="40"
                  className={s.chip__eye}
                  onClick={togglePasswordVisibility}
                >
                  <use
                    href={`/symbol-defs.svg#${
                      showPassword ? "eye-close" : "eye"
                    }`}
                  ></use>
                </svg>
              )}

              <ErrorFeedback name="password" />
            </div>

            <div className={s.form__box__checkbox}>
              <label className={s.checkboxLabel}>
                <Field
                  type="checkbox"
                  name="rememberMe"
                  className={s.checkbox}
                />
                <svg width="14" height="12" className={s.chip__checkbox}>
                  <use href="/symbol-defs.svg#checkbox"></use>
                </svg>
                Запам`ятати мене
              </label>
            </div>
            <button
              className={`${s.styledBtn} ${
                (touched.password && errors.password) ||
                (touched.email && errors.email)
                  ? s.invalid
                  : (touched.password && !errors.password) ||
                    (touched.email && errors.email)
                  ? s.valid
                  : ""
              }`}
              type="submit"
            >
              {isLoading ? "Loading...." : "Увійти"}
              {(touched.password && errors.password) ||
              (touched.email && errors.email) ? (
                <span className={s.warning}>!</span>
              ) : (
                ""
              )}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default SignInFormik;
