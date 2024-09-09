"use client";

import { RoleConfirmationHeader } from "@/components/role-confirmation/roleConfirmationHeader";

export default function RoleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <RoleConfirmationHeader />
      {children}
    </div>
  );
}
