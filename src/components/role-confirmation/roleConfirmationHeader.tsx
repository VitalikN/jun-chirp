import { usePathname } from "next/navigation";
import s from "./roleConfirmation.module.scss";
import { AppRouteEnum } from "@/libs/enums/enums";
import { roboto } from "@/utils/fonts";
import cn from "classnames";
import { roles } from "@/libs/enums/app/Role";

export const RoleConfirmationHeader = () => {
  const pathname = usePathname();

  const isFirstStep = pathname === AppRouteEnum.ROLE_CONFIRMATION;
  const isSecondStep = roles.some(
    (role) => pathname === `${AppRouteEnum.ACCOUNT_VERIFICATION}/${role}`
  );

  const stepNumber = isFirstStep ? "2 кроки" : "кілька кроків";
  const tipText = isFirstStep
    ? "Будь ласка, оберіть свій кабінет, щоб продовжити"
    : "Будь ласка, заповніть інформацію нижче для завершення реєстрації";

  return (
    <div className={`${s.stepCountText} ${roboto} ${s.role__header__wrapper}`}>
      <div className={s.steps}>
        <h3 className={s.stepCounterText}>{`Залишилось ше ${stepNumber}`}</h3>
        <div className={s.stepsGroup}>
          <div
            className={cn(s.step, s.step__1, { [s.step__active]: isFirstStep })}
          ></div>
          <div
            className={cn(s.step, s.step__2, {
              [s.step__active]: isSecondStep,
            })}
          ></div>
        </div>
      </div>
      <h4 className={s.tip}>{tipText}</h4>
    </div>
  );
};
