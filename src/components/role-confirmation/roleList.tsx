import s from "./roleConfirmation.module.scss";
import { RoleCard as RoleCardType } from "@/utils/types/RoleCard";
import { FC } from "react";
import { RoleCard } from "./roleCard";

type Props = {
  roles: RoleCardType[];
};

export const RoleList: FC<Props> = ({ roles }) => {
  return (
    <div className={s.list}>
      {roles.map((role) => (
        <RoleCard key={role.id} role={role} />
      ))}
    </div>
  );
};
