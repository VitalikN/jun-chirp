export type RoleCard = {
  id: number;
  title: string;
  properties: RoleProperties[];
};

type RoleProperties = {
  id: number;
  text: string;
};
