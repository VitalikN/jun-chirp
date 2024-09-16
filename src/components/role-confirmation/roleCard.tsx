import { ChangeEvent, FC } from "react";
import s from "./roleConfirmation.module.scss";
import { RoleCard as RoleCardType } from "@/utils/types/RoleCard";
import { useField } from "formik";
import cn from "classnames";

type Props = {
  role: RoleCardType;
  onSelectRole: (roleId: string) => void;
};

export const RoleCard: FC<Props> = ({ role, onSelectRole }) => {
  const [field] = useField({
    name: "role",
    type: "radio",
    value: String(role.role),
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSelectRole(e.target.value);
  };

  return (
    <label
      key={role.id}
      className={cn(s.card, {
        [s["card--selected"]]: field.checked,
      })}
    >
      <div>
        <input
          type="radio"
          {...field}
          onChange={handleOnChange}
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
