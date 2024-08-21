"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

interface Props {
  children?: React.ReactNode;
}

const FooterIcons: React.FC<Props> = ({ children }) => {
  const [dynamicWidth, setDynamicWidth] = useState(24);
  const [dynamicHeight, setDynamicHeight] = useState(24);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;

      let calculatedWidth, calculatedHeight;
      if (w <= 375) {
        calculatedWidth = 34;
        calculatedHeight = 34;
      } else if (w <= 767) {
        calculatedWidth = 40;
        calculatedHeight = 40;
      } else if (w <= 1535) {
        calculatedWidth = 50;
        calculatedHeight = 50;
      } else if (w <= 1919) {
        calculatedWidth = 40;
        calculatedHeight = 40;
      } else {
        calculatedWidth = 50;
        calculatedHeight = 50;
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
      <Link href="#">
        <SvgIcon id="email" width={dynamicWidth} height={dynamicHeight} />
      </Link>
      <Link href="#">
        <SvgIcon
          id="linkedinWhite"
          width={dynamicWidth}
          height={dynamicHeight}
        />
      </Link>
      {children}
    </>
  );
};

export default FooterIcons;
