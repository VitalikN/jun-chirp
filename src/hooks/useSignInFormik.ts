import { useState } from "react";
import { useLoginMutation } from "@/redux/auth/authApi";
import useRouterPush from "@/hooks/useRouter";
import { customError } from "@/utils/types/customError";
import { FormValuesSignIn } from "@/utils/types/FormValuesSignIn";

const useSignInFormik = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const { pushRouter } = useRouterPush();

  const [showPassword, setShowPassword] = useState(false);
  const [backendError, setBackendError] = useState<string | null>(null);

  const handleSubmit = async (
    values: FormValuesSignIn,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const { email, password } = values;

      const res = await login({ user: { email, password } }).unwrap();
      if (res) {
        resetForm();

        pushRouter("/");
      }
    } catch (error) {
      const status = (error as customError)?.status;
      let errorMessage = "Неправильний логін або пароль";

      if (status === 401) {
        sessionStorage.setItem(
          "loginFormData",
          JSON.stringify({ email: values.email })
        );

        errorMessage =
          "Для завершення реєстрації підтвердіть свою електронну пошту";
        pushRouter("/confirm");
      } else if (status === 422) {
        errorMessage = "Неправильний логін або пароль";
      }

      setBackendError(errorMessage);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return {
    handleSubmit,
    togglePasswordVisibility,
    isLoading,
    showPassword,
    backendError,
  };
};

export default useSignInFormik;
