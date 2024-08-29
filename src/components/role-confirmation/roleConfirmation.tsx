import s from "./roleConfirmation.module.scss";
import { RoleList } from "./roleList";
import { roleCardData } from "./roleCardText";
import Button from "../Button/Button";

export const RoleConfirmation = () => {
  return (
    <section className={s.section}>
      <div className={`${s.container}  `}>
        <RoleList roles={roleCardData} />
        <div className={s.button__wrapper}>
          <Button title="Вибрати" className={s.button} isDisabled={false} />
        </div>
      </div>
    </section>
  );
};
