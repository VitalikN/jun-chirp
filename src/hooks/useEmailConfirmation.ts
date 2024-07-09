// hooks/useEmailConfirmation.ts
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useConfirmEmailMutation,
  useResendConfirmationCodeMutation,
} from "@/redux/auth/authApi";
import authSelector from "@/redux/auth/authSelector";
import useRouterPush from "@/hooks/useRouter";
import { customError } from "@/utils/types/customError";
import { FormikValues } from "formik";

const useEmailConfirmation = () => {
  const [confirm, { isLoading, error }] = useConfirmEmailMutation();
  const [resendCode] = useResendConfirmationCodeMutation();
  const { pushRouter } = useRouterPush();

  const emailSelector = useSelector(authSelector.getEmail);
  const [email, setEmail] = useState<string | null>(emailSelector);
  const [timeLeft, setTimeLeft] = useState(600);

  const [attempts, setAttempts] = useState(0);
  const [cooldown, setCooldown] = useState<number | null>(null);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("registrationFormData");
    if (storedEmail) {
      const { email } = JSON.parse(storedEmail);
      setEmail(email);
    }
    if (email === null || undefined) {
      pushRouter("/register");
    }
  }, [email, pushRouter]);

  useEffect(() => {
    const storedAttempts = localStorage.getItem("resendAttempts");
    const storedCooldown = localStorage.getItem("resendCooldown");

    if (storedAttempts) setAttempts(parseInt(storedAttempts, 10));
    if (storedCooldown) setCooldown(parseInt(storedCooldown, 10));
  }, []);

  useEffect(() => {
    if (cooldown !== null) {
      const interval = setInterval(() => {
        const newCooldown = cooldown - 1;
        setCooldown(newCooldown);
        localStorage.setItem("resendCooldown", newCooldown.toString());

        if (newCooldown <= 0) {
          clearInterval(interval);
          setCooldown(null);
          setAttempts(0);
          localStorage.removeItem("resendCooldown");
          localStorage.removeItem("resendAttempts");
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [cooldown]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleResendCode = async (email: string) => {
    if (cooldown !== null) {
      toast.error(
        "Будь ласка, зачекайте 15 хвилин перед наступною спробою отримання нового коду",
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
      return;
    }

    if (attempts >= 5) {
      setCooldown(900);
      localStorage.setItem("resendCooldown", "900");
      toast.error(
        "Ви вичерпали всі спроби отримання нового коду підтвердження. Будь ласка, зачекайте 15 хвилин перед наступною спробою отримання нового коду",
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
      return;
    }
    try {
      await resendCode({ email });

      setAttempts(attempts + 1);
      localStorage.setItem("resendAttempts", (attempts + 1).toString());

      toast.success(` Новий код підтвердження успішно надіслано  ${email}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Failed to resend confirmation code", error);
    }
  };

  const handleSubmit = async (values: FormikValues) => {
    try {
      const res = await confirm({ email, code: values.code }).unwrap();

      if (res.accessToken) {
        pushRouter("/");
      }
    } catch (error) {
      const customError = error as customError;
      const errorMessage =
        customError?.status === 400
          ? "Неправильний код.Будь ласка, перевірте і спробуйте ще раз "
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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return {
    email,
    timeLeft,
    isLoading,
    cooldown,
    handleSubmit,
    handleResendCode,
    formatTime,
  };
};

export default useEmailConfirmation;
