import { useState, useEffect, useCallback, useMemo } from "react";

interface UsePasswordStrengthProps {
  password: string;
  userName: string;
}

const usePasswordStrength = ({
  password,
  userName,
}: UsePasswordStrengthProps) => {
  const [strength, setStrength] = useState("gray");

  const commonPasswords = useMemo(() => ["123456", "password", "qwerty"], []);

  const checkStrength = useCallback(
    (password: string) => {
      if (!password) return "gray";
      if (
        password.length < 8 ||
        /^[a-z]+$/.test(password) ||
        commonPasswords.includes(password) ||
        password.includes(userName)
      ) {
        return "weak";
      }

      if (
        password.length >= 8 &&
        password.length <= 11 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /\d/.test(password) &&
        /[!@#$%^&*]/.test(password) &&
        !password.includes(" ") &&
        !commonPasswords.includes(password) &&
        !password.includes(userName)
      ) {
        return "medium";
      }

      if (
        password.length >= 12 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /\d/.test(password) &&
        /[!@#$%^&*]/.test(password) &&
        !password.includes(" ") &&
        !commonPasswords.includes(password) &&
        !password.includes(userName)
      ) {
        return "strong";
      }

      return "weak";
    },
    [userName, commonPasswords]
  );

  useEffect(() => {
    setStrength(checkStrength(password));
  }, [password, checkStrength]);

  const getBarStyle = (strength: string) => {
    switch (strength) {
      case "weak":
        return {
          background: `linear-gradient(to right, ${getColor(
            "weak"
          )} 33%, #616161 33%)`,
          width: "100%",
        };
      case "medium":
        return {
          background: `linear-gradient(to right, ${getColor(
            "medium"
          )} 66%, #616161 66%)`,
          width: "100%",
        };
      case "strong":
        return {
          background: `${getColor("strong")}`,
          width: "100%",
        };
      default:
        return {
          background: "#616161",
          width: "100%",
        };
    }
  };

  const getTextColor = (strength: string) => {
    return getColor(strength);
  };

  return { strength, getBarStyle, getTextColor };
};

const getColor = (strength: string) => {
  switch (strength) {
    case "weak":
      return "#B3261E";
    case "medium":
      return "#F5D251";
    case "strong":
      return "#228B22";
    default:
      return "#616161";
  }
};

export default usePasswordStrength;
