import s from "./styles.module.scss";
import { Field, FormikErrors, FormikTouched } from "formik";
import ErrorFeedback from "@/components/auth/ErrorFeedback";
import SvgIcon from "@/components/SvgIcon/SvgIcon";

type FormFieldProps<T extends object> = {
  name: keyof T;
  label: string;
  type: string;
  touched: FormikTouched<T>;
  errors: FormikErrors<T>;
  backendError: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword?: boolean;
  togglePasswordVisibility?: () => void;
  isThisPassword?: boolean;
};

const FormField = <T extends object>(props: FormFieldProps<T>) => {
  const {
    name,
    label,
    type,
    touched,
    errors,
    backendError,
    onChange,
    showPassword,
    isThisPassword,
    togglePasswordVisibility,
  } = props;

  return (
    <div className={s.form__box}>
      <label
        className={`${s.label} ${
          touched[name] && errors[name] ? s.invalid : ""
        }`}
      >
        {label}
        <SvgIcon id="icon" width={6} height={16} className={s.chip} />
      </label>
      <Field
        className={`${s.input} ${
          (touched[name] && errors[name]) || backendError
            ? s.invalid
            : touched[name] && !errors[name]
            ? s.valid
            : ""
        }`}
        type={showPassword === true ? "text" : type}
        name={name as string}
        onChange={onChange}
      />
      {(touched[name] && errors[name]) || backendError ? (
        <span className={s.warning}>!</span>
      ) : null}
      {isThisPassword && (
        <SvgIcon
          id={showPassword ? "eye-close" : "eye"}
          width={40}
          height={40}
          className={s.chip__eye}
          onClick={togglePasswordVisibility}
        />
      )}
      <ErrorFeedback name={name as string} />
    </div>
  );
};

export { FormField };
