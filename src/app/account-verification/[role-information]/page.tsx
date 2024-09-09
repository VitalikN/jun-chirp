"use client";

import { getRoleForm } from "@/libs/enums/helpers/getRoleForm";
import { RoleType } from "@/utils/types/Role";

const RoleInformationPage = ({
  params,
}: {
  params: { "role-information": RoleType };
}) => {
  const role = params["role-information"];
  
  return <section>{getRoleForm(role)}</section>;
};

export default RoleInformationPage;
