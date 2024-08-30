import usePasswordStrength from "@/hooks/usePasswordStrength";
import s from "../Register/register.module.scss";

interface Indicator {
  password: string;
}

const PasswordStrengthIndicator = ({ password }: Indicator) => {
  const { strength, barStyle, color } = usePasswordStrength({
    password,
  });
  console.log(strength);

  return (
    <div className={s.passwordStrength}>
      <div className={s.strengthBar} style={barStyle}></div>
      <div className={s.strengthLevels}>
        <span
          className={strength === "weak" ? s.active : ""}
          style={{
            color: strength === "weak" ? color : "#616161",
          }}
        >
          Легкий
        </span>
        <span
          className={strength === "medium" ? s.active : ""}
          style={{
            color: strength === "medium" ? color : "#616161",
          }}
        >
          Середній
        </span>
        <span
          className={strength === "strong" ? s.active : ""}
          style={{
            color: strength === "strong" ? color : "#616161",
          }}
        >
          Складний
        </span>
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;
