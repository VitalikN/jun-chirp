"use client";

import Image from "next/image";
import s from "@/sass/layouts/logo.module.scss";

const Logo = () => {
  return (
    <>
      <Image
        className={s.logo}
        src={"/logo.png"}
        alt="logo"
        width="192"
        height="90"
        priority={true}
      />
    </>
  );
};
export default Logo;
