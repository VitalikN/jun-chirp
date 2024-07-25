"use client";

import Image from "next/image";
import s from "@/sass/layouts/logo.module.scss";
import { useEffect, useState } from "react";

const Logo = () => {
  const [dynamicWidth, setDynamicWidth] = useState(103);
  const [dynamicHeight, setDynamicHeight] = useState(55);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;

      let calculatedWidth, calculatedHeight;

      if (w <= 375) {
        calculatedWidth = 103;
        calculatedHeight = 55;
      } else if (w <= 767) {
        calculatedWidth = 103;
        calculatedHeight = 55;
      } else if (w <= 1535) {
        calculatedWidth = 204;
        calculatedHeight = 114;
      } else if (w <= 1919) {
        calculatedWidth = 216;
        calculatedHeight = 120;
      } else {
        calculatedWidth = 280;
        calculatedHeight = 154;
      }

      setDynamicWidth(calculatedWidth);
      setDynamicHeight(calculatedHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Image
        className={s.logo}
        src={"/logo.png"}
        alt="logo"
        width={dynamicWidth}
        height={dynamicHeight}
        priority={true}
      />
    </>
  );
};
export default Logo;
