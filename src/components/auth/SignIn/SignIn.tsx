"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import SignInFormik from "./SignInFormik";
import SocialLoginGroup from "../../SocialLoginGroup/SocialLoginGroup";
import s from "./signIn.module.scss";
import { AppRouteEnum } from "@/libs/enums/enums";

const SignIn = () => {
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
        <SignInFormik />
        <div className={s.box__link__group}>
          <p className={s.text}>Увійти за допомогою</p>
          <SocialLoginGroup />
          <Link
            href="/request_password_reset"
            className={s.link__forgot__password}
          >
            Забули пароль?
          </Link>
        </div>
      </div>
    </section>
  );
};
export default SignIn;
