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

  const [backendError, setBackendError] = useState<string | null>(null);

  const customError = error as customError;

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
        `Код активний ще ${formatTime(cooldown)}. Будь ласка, зачекайте.`,
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
      toast.error(
        "Ви вичерпали всі спроби отримання нового коду підтвердження на сьогодні. Будь ласка, спробуйте завтра.",
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
      await resendCode({ email }).unwrap();

      setAttempts(attempts + 1);
      localStorage.setItem("resendAttempts", (attempts + 1).toString());
      setCooldown(600);
      localStorage.setItem("resendCooldown", "600");

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
      const customError = error as customError;
      const status = customError.data?.statusCode;
      if (status === 400) {
        toast.error("Користувача вже підтверджено", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  const handleSubmit = async (values: FormikValues) => {
    try {
      const res = await confirm({ email, code: values.code }).unwrap();
      console.log(res.accessToken);

      if (res.accessToken) {
        setTimeLeft(0);
        setCooldown(null);
        localStorage.removeItem("resendCooldown");
        pushRouter("/");
      }
    } catch (error) {
      if (error && (error as customError).data) {
        const status = (error as customError).data.statusCode;
        let errorMessage =
          "Неправильний код. Будь ласка, перевірте і спробуйте ще раз ";

        if (status === 400) {
          errorMessage =
            "Неправильний код. Будь ласка, перевірте і спробуйте ще раз";
        } else if (status === 410) {
          errorMessage =
            "Термін дії коду закінчився. Будь ласка, запросіть новий код для підтвердження";
        } else if (status === 429) {
          errorMessage =
            "Ви вичерпали всі спроби отримання нового коду підтвердження. Будь ласка, зачекайте 24 години перед наступною спробою отримання нового коду";
        }
        setBackendError(errorMessage);
      }
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
    backendError,
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
