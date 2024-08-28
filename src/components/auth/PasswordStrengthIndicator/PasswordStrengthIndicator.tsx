import usePasswordStrength from "@/hooks/usePasswordStrength";
import s from "../Register/register.module.scss";

interface Indicator {
  password: string;
  userName: string;
}

const PasswordStrengthIndicator = ({ password, userName }: Indicator) => {
  const { strength, getBarStyle, getTextColor } = usePasswordStrength({
    password,
    userName,
  });
  console.log(strength)

  return (
    <div className={s.passwordStrength}>
      <div className={s.strengthBar} style={getBarStyle(strength)}></div>
      <div className={s.strengthLevels}>
        <span
          className={strength === "weak" ? s.active : ""}
          style={{
            color: strength === "weak" ? getTextColor("weak") : "#616161",
          }}
        >
          Легкий
        </span>
        <span
          className={strength === "medium" ? s.active : ""}
          style={{
            color: strength === "medium" ? getTextColor("medium") : "#616161",
          }}
        >
          Середній
        </span>
        <span
          className={strength === "strong" ? s.active : ""}
          style={{
            color: strength === "strong" ? getTextColor("strong") : "#616161",
          }}
        >
          Складний
        </span>
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;
