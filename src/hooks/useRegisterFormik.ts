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

      if (res.statusCode === 200) {
        toast.success(
          "Електронна адреса вже існує, але не підтверджена. Надіслано новий код підтвердження.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        resetForm();

        pushRouter("/confirm");
        return;
      }
    } catch (error) {
      const errorMessage =
        customError?.status === 422
          ? "Електронна адреса вже існує."
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
  };
};

export default useRegisterFormik;
