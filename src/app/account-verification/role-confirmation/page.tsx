"use client";

import { RoleConfirmation } from "@/components/role-confirmation/roleConfirmation";
import { RoleConfirmationHeader } from "@/components/role-confirmation/roleConfirmationHeader";
import Link from "next/link";
import { useParams } from "next/navigation";

const RoleConfirmationPage = () => {
  const params = useParams();
  return (
    <section>
      <RoleConfirmationHeader />
      <RoleConfirmation />
    </section>
  );
};
export default RoleConfirmationPage;
