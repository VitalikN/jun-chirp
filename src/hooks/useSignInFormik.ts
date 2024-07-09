import { useState } from "react";
import { useLoginMutation } from "@/redux/auth/authApi";
import { toast } from "react-toastify";
import useRouterPush from "@/hooks/useRouter";
import { customError } from "@/utils/types/customError";
import { FormValuesSignIn } from "@/utils/types/FormValuesSignIn";

const useSignInFormik = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const { pushRouter } = useRouterPush();
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

        toast.success(" Wow so easy!", {
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
        customError?.status === 422
          ? "Облікові дані недійсні"
          : (error as { data?: { message?: string } })?.data?.message ||
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

  return {
    handleSubmit,
    togglePasswordVisibility,
    isLoading,
    showPassword,
  };
};

export default useSignInFormik;
