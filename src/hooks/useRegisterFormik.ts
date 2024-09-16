import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRegisterMutation } from "@/redux/auth/authApi";
import useRouterPush from "@/hooks/useRouter";
import { FormValuesRegister } from "@/components/auth/Register/FormValuesRegister";
import { customError } from "@/utils/types/customError";

const useRegisterFormik = () => {
  const [register, { isLoading, isSuccess }] = useRegisterMutation();
  const { pushRouter } = useRouterPush();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [backendError, setBackendError] = useState<string | null>(null);

  const sessionStorage = window.sessionStorage;

  useEffect(() => {
    if (isSuccess) {
      toast.success("Реєстрація успішна!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      pushRouter("/confirm");
    }
  }, [isSuccess, pushRouter]);

  const handleSubmit = async (
    values: FormValuesRegister,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const { userName, email, password } = values;

      sessionStorage.setItem("registrationFormData", JSON.stringify({ email }));

      await register({
        user: { userName, email, password },
      }).unwrap();

      resetForm();
      setBackendError(null);
    } catch (error) {
      const customError = error as customError;

      const status = customError?.status;
      let errorMessage = "Електронна адреса вже існує.";

      if (status === 400) {
        errorMessage =
          "Електронна адреса вже існує, але не підтверджена. Надіслано новий код підтвердження.";
        console.log("Status 400 detected, redirecting to /confirm");
        pushRouter("/confirm");
      }

      setBackendError(errorMessage);
    }
  };

  const handleChange = () => {
    setBackendError(null);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return {
    handleSubmit,
    togglePasswordVisibility,
    showPassword,
    showConfirmPassword,
    isLoading,
    backendError,
    handleChange,
  };
};

export default useRegisterFormik;
