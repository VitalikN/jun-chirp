"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const RoleConfirmationPage = () => {
  const params = useParams();
  return (
    <section>
      <div>
        RoleConfirmationPage
        <Link href={`/account-verification/junior`}>Junior</Link>
        <Link href={`/account-verification/mentor`}>Mentor</Link>
      </div>
    </section>
  );
};
export default RoleConfirmationPage;
