import s from "@/sass/layouts/signIn.module.scss";
import { roboto } from "@/utils/fonts";
import { ErrorMessage } from "formik";

export interface ErrorFeedbackProps {
  name: string;
}

const ErrorFeedback: React.FC<ErrorFeedbackProps> = ({ name }) => {
  return (
    <ErrorMessage name={name}>
      {(errorMessage) => (
        <span className={`${s.error} ${roboto.className}`}>{errorMessage}</span>
      )}
    </ErrorMessage>
  );
};
export default ErrorFeedback;
