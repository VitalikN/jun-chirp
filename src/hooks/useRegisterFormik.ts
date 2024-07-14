import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRegisterMutation } from "@/redux/auth/authApi";
import useRouterPush from "@/hooks/useRouter";
import { FormValuesRegister } from "@/utils/types/FormValuesRegister";
import { customError } from "@/utils/types/customError";

const useRegisterFormik = () => {
  const [register, { isLoading, error, isSuccess }] = useRegisterMutation();
  const { pushRouter } = useRouterPush();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [backendError, setBackendError] = useState<string | null>(null);

  const sessionStorage = window.sessionStorage;

  const customError = error as customError;

  const handleSubmit = async (
    values: FormValuesRegister,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const { userName, email, password } = values;

      sessionStorage.setItem("registrationFormData", JSON.stringify({ email }));

      const res = await register({
        user: { userName, email, password },
      }).unwrap();

      // if (res.statusCode === 200) {
      //   toast.success(
      //     "Електронна адреса вже існує, але не підтверджена. Надіслано новий код підтвердження.",
      //     {
      //       position: "top-right",
      //       autoClose: 5000,
      //       hideProgressBar: false,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //     }
      //   );
      resetForm();
    } catch (error) {
      const status = customError?.status;
      let errorMessage = "Електронна адреса вже існує.";

      if (status === 400) {
        errorMessage =
          "Електронна адреса вже існує, але не підтверджена. Надіслано новий код підтвердження.";
        console.log(status);
        pushRouter("/confirm");
      }

      setBackendError(errorMessage);
    }
  };

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return {
    handleSubmit,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    showPassword,
    showConfirmPassword,
    isLoading,
    backendError,
  };
};

export default useRegisterFormik;
