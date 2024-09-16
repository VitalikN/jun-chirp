import { useMemo } from "react";

interface UsePasswordStrengthProps {
  password: string;
}

const STRENGTH_LEVELS = [
  { level: "Very Weak", color: "#B3261E", score: 1, gradient: "20%" },
  { level: "Weak", color: "#F57C00", score: 2, gradient: "40%" },
  { level: "Medium", color: "#F5D251", score: 3, gradient: "60%" },
  { level: "Strong", color: "#388E3C", score: 4, gradient: "80%" },
  { level: "Very Strong", color: "#228B22", score: 5, gradient: "100%" },
  { level: "", color: "gray", score: 0, gradient: "0" },
];

const commonPasswords = ["123456", "password", "qwerty"];

const calculateStrengthScore = (password: string): number => {
  if (!password || commonPasswords.includes(password) || password.length === 0)
    return 0;

  let score = 0;
  score += password.length >= 8 ? 1 : 0;
  score += /[A-Z]/.test(password) ? 1 : 0;
  score += /[a-z]/.test(password) ? 1 : 0;
  score += /\d/.test(password) ? 1 : 0;
  score += /[!@#$%^&*(),.?":{}|<>]/.test(password) ? 1 : 0;
  console.log(score);
  return score;
};

const getStrengthLevel = (score: number) =>
  STRENGTH_LEVELS.find((level) => level.score === score) || STRENGTH_LEVELS[0];

const usePasswordStrength = ({ password }: UsePasswordStrengthProps) => {
  const strength = useMemo(() => {
    const score = calculateStrengthScore(password);
    return getStrengthLevel(score);
  }, [password]);

  return {
    strength: strength.level,
    barStyle: {
      background: `linear-gradient(to right, ${strength.color} ${strength.gradient}, #616161 ${strength.gradient})`,
      width: "100%",
    },
    color: strength.color,
  };
};

export default usePasswordStrength;
