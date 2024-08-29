"use client";

import { RoleConfirmation } from "@/components/role-confirmation/roleConfirmation";
import Link from "next/link";
import { useParams } from "next/navigation";

const RoleConfirmationPage = () => {
  const params = useParams();
  return (
    <section>
      {/* <div>
        RoleConfirmationPage
        <Link href={`/account-verification/junior`}>Junior</Link>
        <Link href={`/account-verification/mentor`}>Mentor</Link>
      </div> */}
      <RoleConfirmation />
    </section>
  );
};
export default RoleConfirmationPage;
