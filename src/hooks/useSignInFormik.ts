import { useState } from "react";
import { useLoginMutation } from "@/redux/auth/authApi";
import { toast } from "react-toastify";
import useRouterPush from "@/hooks/useRouter";
import { customError } from "@/utils/types/customError";
import { FormValuesSignIn } from "@/utils/types/FormValuesSignIn";

const useSignInFormik = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const { pushRouter } = useRouterPush();

  const [showPassword, setShowPassword] = useState(false);
  const [backendError, setBackendError] = useState<string | null>(null);

  const customError = error as customError;

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
      const status = customError?.status;
      let errorMessage = "Неправильний логін або пароль";

      if (status === 422) errorMessage = "Облікові дані недійсні";

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
