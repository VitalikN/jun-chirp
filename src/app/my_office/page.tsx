"use client";

import useSaveUser from "@/hooks/useSaveUser";
import Image from "next/image";
import { SearchParams } from "@/utils/types/SearchParams";

const MyOfficePage = ({ searchParams }: SearchParams) => {
  const { userName, token, email, photo } = searchParams;
  useSaveUser({ userName, token, email, photo });
  return (
    <div>
      <h1>MyOfficePage</h1>
      <p>{userName}</p>
      <p>{email}</p>
      {photo && (
        <Image src={`${photo}`} alt="user photo" width={100} height={100} />
      )}
    </div>
  );
};

export default MyOfficePage;
