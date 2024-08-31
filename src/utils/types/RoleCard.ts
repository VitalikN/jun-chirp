import { Roles } from "@/libs/enums/app/Role";

export type RoleCard = {
  id: number;
  role: Roles;
  title: string;
  properties: RoleProperties[];
};

type RoleProperties = {
  id: number;
  text: string;
};
