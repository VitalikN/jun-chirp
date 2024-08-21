import Link from "next/link";
import React from "react";
import s from "./footer.module.scss";

const FooterNav = () => {
  return (
    <nav>
      <Link href="about">Про нас</Link>
      <Link className={`${s.btn_confirm} ${s.display_none_mobile}`} href="#">
        Підтримай нас
      </Link>
      <Link href="terms-of-service">Умови використання</Link>
      <Link href="privacy-policy">Політика конфіденційності</Link>
    </nav>
  );
};

export default FooterNav;
