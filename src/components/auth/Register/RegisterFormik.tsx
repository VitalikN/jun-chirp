import { Field, Form, Formik } from "formik";
import { validationSchemaRegister } from "@/components/auth/Register/validationRegister";
import ErrorFeedback from "../ErrorFeedback";
import ToastContainer from "../../ToastContainer/ToastContainer";
import Button from "../../Button/Button";
import SvgIcon from "../../SvgIcon/SvgIcon";
import Loader from "../../Loader/Loader";
import PasswordStrengthIndicator from "../PasswordStrengthIndicator/PasswordStrengthIndicator";
import s from "./register.module.scss";
import useRegisterFormik from "@/hooks/useRegisterFormik";

const RegisterFormik = () => {
  const {
    handleSubmit,
    togglePasswordVisibility,
    showPassword,
    showConfirmPassword,
    isLoading,
    backendError,
    handleChange,
  } = useRegisterFormik();

  return (
    <>
      <ToastContainer />
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
        {({
          errors,
          touched,
          dirty,
          values,
          handleChange: formikHandleChange,
        }) => (
          <Form className={s.form}>
            <div className={s.form__box}>
              <label
                className={`${s.label} ${
                  touched.userName && errors.userName ? s.invalid : ""
                } `}
              >
                Ім`я
                <SvgIcon id="icon" width={6} height={16} className={s.chip} />
              </label>
              <Field
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  formikHandleChange(e);
                  handleChange();
                }}
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
                  <SvgIcon id="checkbox" width={12} height={10} />
                </p>
              ) : null}
              <ErrorFeedback name="userName" />
            </div>

            <div className={s.form__box}>
              <label
                className={`${s.label} ${
                  (touched.email && errors.email) || backendError
                    ? s.invalid
                    : ""
                } `}
              >
                Email
                <SvgIcon id="icon" width={6} height={16} className={s.chip} />
              </label>
              <Field
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  formikHandleChange(e);
                  handleChange();
                }}
                className={`${s.input} ${
                  (touched.email && errors.email) || backendError
                    ? s.invalid
                    : touched.email && !errors.email
                    ? s.valid
                    : ""
                }`}
                type="email"
                name="email"
                error={touched.email && errors.email}
              />
              {(touched.email && errors.email) || backendError ? (
                <span className={s.warning}>!</span>
              ) : touched.email && !errors.email ? (
                <p className={s.chip__checkbox__valid}>
                  <SvgIcon id="checkbox" width={12} height={10} />
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
                <SvgIcon id="icon" width={6} height={16} className={s.chip} />
              </label>

              <Field
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  formikHandleChange(e);
                  handleChange();
                }}
                className={`${s.input} ${
                  touched.password && errors.password
                    ? s.invalid
                    : touched.password && !errors.password
                    ? s.valid
                    : ""
                }`}
                name="password"
                type={showPassword ? "text" : "password"}
                error={touched.password && errors.password}
              />
              {touched.password && errors.password && (
                <span className={s.warning}>!</span>
              )}
              <SvgIcon
                id={showPassword ? "eye-close" : "eye"}
                width={40}
                height={40}
                className={s.chip__eye}
                onClick={() => togglePasswordVisibility("password")}
              />

              <ErrorFeedback name="password" />
            </div>

            <PasswordStrengthIndicator
              password={values.password}
              userName={values.userName}
            />

            <div className={`${s.form__box} `}>
              <label
                className={`${s.label}  ${
                  touched.confirmPassword && errors.confirmPassword
                    ? s.invalid
                    : ""
                }`}
              >
                Повторити пароль
                <SvgIcon id="icon" width={6} height={16} className={s.chip} />
              </label>
              <Field
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  formikHandleChange(e);
                  handleChange();
                }}
                className={`${s.input} ${
                  touched.confirmPassword && errors.confirmPassword
                    ? s.invalid
                    : touched.confirmPassword && !errors.confirmPassword
                    ? s.valid
                    : ""
                }`}
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                error={touched.confirmPassword && errors.confirmPassword}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <span className={s.warning}>!</span>
              )}{" "}
              <SvgIcon
                id={showConfirmPassword ? "eye-close" : "eye"}
                width={40}
                height={40}
                className={s.chip__eye}
                onClick={() => togglePasswordVisibility("confirmPassword")}
              />
              <ErrorFeedback name="confirmPassword" />
            </div>

            <div className={s.form__box__checkbox}>
              <div className={s.form__box__checkbox__field}>
                {" "}
                <Field
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    formikHandleChange(e);
                    handleChange();
                  }}
                  type="checkbox"
                  name="rememberMe"
                  className={`${s.checkbox} `}
                />
                <SvgIcon
                  id="checkbox"
                  width={14}
                  height={12}
                  className={s.chip__checkbox}
                />
                <label className={`${s.checkboxLabel} `}>
                  <p className={s.text}>
                    Я погоджуюсь з
                    <span className={s.text__chip__checkbox}>
                      {" "}
                      Умовами використання{" "}
                    </span>{" "}
                    та
                    <span className={s.text__chip__checkbox}>
                      {" "}
                      Політикою конфіденційності{" "}
                    </span>
                  </p>
                </label>
              </div>
              {errors.rememberMe && touched.rememberMe && (
                <div className={s.invalid__checkbox__message}>
                  {errors.rememberMe}
                </div>
              )}
            </div>

            {backendError && (
              <div className={s.error__backend}>{backendError}</div>
            )}
            <div className={s.box__btn}>
              <Button
                title="ОЧИСТИТИ"
                className={s.resetBtn}
                type="reset"
                isDisabled={!dirty || isLoading}
              />
              <Button
                className={`${s.styledBtn} ${
                  !touched.userName ||
                  errors.userName ||
                  !touched.email ||
                  errors.email ||
                  !touched.password ||
                  errors.password ||
                  !touched.confirmPassword ||
                  errors.confirmPassword ||
                  !touched.rememberMe ||
                  errors.rememberMe
                    ? " "
                    : backendError
                    ? s.invalid
                    : s.valid
                }`}
                type="submit"
                isDisabled={!dirty || isLoading}
              >
                {isLoading ? (
                  <>
                    Зареєструватись
                    <Loader />
                  </>
                ) : (
                  "Зареєструватись"
                )}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default RegisterFormik;
