import s from "@/sass/layouts/signIn.module.scss";
import { ErrorMessage } from "formik";

export interface ErrorFeedbackProps {
  name: string;
}

const ErrorFeedback: React.FC<ErrorFeedbackProps> = ({ name }) => {
  return (
    <ErrorMessage name={name}>
      {(errorMessage) => <span className={s.error}>{errorMessage}</span>}
    </ErrorMessage>
  );
};
export default ErrorFeedback;
