"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import s from "./register.module.scss";
import RegisterFormik from "./RegisterFormik";
import SocialLoginGroup from "../../SocialLoginGroup/SocialLoginGroup";
import { AppRouteEnum } from "@/libs/enums/enums";

const Register = () => {
  const pathname = usePathname();

  return (
    <section className={`${s.section} `}>
      <div className={`${s.container} `}>
        <div className={s.box__link}>
          <Link
            href={AppRouteEnum.SIGN_IN}
            className={` ${s.link} ${
              pathname === `${AppRouteEnum.SIGN_IN}` ? s.link__sign_in : ""
            } `}
          >
            Увійти
          </Link>
          <span>/</span>
          <Link
            href={AppRouteEnum.SIGN_UP}
            className={` ${s.link} ${
              pathname === `${AppRouteEnum.SIGN_UP}` ? s.link__register : ""
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
