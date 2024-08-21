"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import s from "./register.module.scss";
import RegisterFormik from "./RegisterFormik";
import SocialLoginGroup from "../../SocialLoginGroup/SocialLoginGroup";

const Register = () => {
  const pathname = usePathname();

  return (
    <section className={`${s.section} `}>
      <div className={`${s.container} `}>
        <div className={s.box__link}>
          <Link
            href="/sign_in"
            className={` ${s.link} ${
              pathname === "/sign_in" ? s.link__sign_in : ""
            } `}
          >
            Увійти
          </Link>
          <span>/</span>
          <Link
            href="/register"
            className={` ${s.link} ${
              pathname === "/register" ? s.link__register : ""
            } `}
          >
            Зареєструватись
          </Link>
        </div>

        <RegisterFormik />
        <div className={s.box__link__group}>
          <p className={s.text}>Зареєструватись за допомогою</p>
          <SocialLoginGroup />
        </div>
      </div>
    </section>
  );
};

export default Register;
