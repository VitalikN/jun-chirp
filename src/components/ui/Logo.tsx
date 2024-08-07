"use client";

import Image from "next/image";
import s from "@/sass/layouts/logo.module.scss";
import { useEffect, useState } from "react";
import SvgIcon from "./SvgIcon";

const Logo = () => {
  const [dynamicWidth, setDynamicWidth] = useState(103);
  const [dynamicHeight, setDynamicHeight] = useState(55);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;

      let calculatedWidth, calculatedHeight;

      // if (w <= 375) {
      //   calculatedWidth = 103;
      //   calculatedHeight = 55;
      // } else if (w <= 767) {
      //   calculatedWidth = 103;
      //   calculatedHeight = 55;
      // } else if (w <= 1535) {
      //   calculatedWidth = 204;
      //   calculatedHeight = 114;
      // } else if (w <= 1919) {
      //   calculatedWidth = 216;
      //   calculatedHeight = 120;
      // } else {

      //   calculatedWidth = 280;

      //   calculatedHeight = 154;
      // }
      if (w <= 375) {
        calculatedWidth = 61;
        calculatedHeight = 34;
      } else if (w <= 767) {
        calculatedWidth = 80;
        calculatedHeight = 45;
      } else if (w <= 1535) {
        calculatedWidth = 96;
        calculatedHeight = 54;
      } else if (w <= 1919) {
        calculatedWidth = 128;
        calculatedHeight = 70;
      } else {
        calculatedWidth = 128;

        calculatedHeight = 70;
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
      <SvgIcon
        id="LOGO"
        width={dynamicWidth}
        height={dynamicHeight}
        className={s.logo}
      />
    </>
  );
};
export default Logo;
