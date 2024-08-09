"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import SignInFormik from "./SignInFormik";
import s from "@/sass/layouts/signIn.module.scss";
import SvgIcon from "../ui/SvgIcon";

const SignIn = () => {
  const pathname = usePathname();

  const hundelGoole = () => {
    const res = (window.location.href =
      "https://junchirp.vercel.app/auth/google");

    console.log(res);
  };

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
        <SignInFormik />
        <div className={s.box__link__group}>
          <p className={s.text}>Увійти за допомогою</p>
          <div className={s.link__group}>
            <Link href="#" className={s.link__icons}>
              <SvgIcon
                id="google"
                width={50}
                height={50}
                className={s.chip__google}
                onClick={hundelGoole}
              />
            </Link>
            <Link href="#" className={s.link__icons}>
              <SvgIcon
                id="linkedin"
                width={50}
                height={50}
                className={s.chip__linkedin}
              />
            </Link>
          </div>
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
