import { Field } from "formik";

import SvgIcon from "@/components/SvgIcon/SvgIcon";
import styles from "./styles.module.scss";

type FormCheckboxProps = {
  name: string;
  label: React.ReactNode;
  error?: string;
  touched?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormCheckbox = (props: FormCheckboxProps) => {
  const { name, label, error, touched, onChange } = props;

  return (
    <div className={styles.form__box__checkbox}>
      <div className={styles.form__box__checkbox__field}>
        <Field
          type="checkbox"
          name={name}
          className={styles.checkbox}
          onChange={onChange}
        />
        <SvgIcon
          id="checkbox"
          width={14}
          height={12}
          className={styles.chip__checkbox}
        />
        <label className={styles.checkboxLabel}>{label}</label>
      </div>
      {error && touched && (
        <div className={styles.invalid__checkbox__message}>{error}</div>
      )}
    </div>
  );
};

export { FormCheckbox };
