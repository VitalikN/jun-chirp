import { FC } from "react";
import s from "./roleConfirmation.module.scss";
import { RoleCard as RoleCardType } from "@/utils/types/RoleCard";

type Props = {
  role: RoleCardType;
};

export const RoleCard: FC<Props> = ({ role }) => {
  return (
    <label key={role.id} className={s.card}>
      <div>
        <input
          type="radio"
          name="role"
          value={role.id}
          className={s.card__radio}
        />
        <h1 className={s.card__title}>{role.title}</h1>
        <div className={s.card__list}>
          <ul>
            {role.properties.map((property) => (
              <li className={s.card__property} key={property.id}>
                <div className={s.card__description}>{property.text}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </label>
  );
};
