"use client";

import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";
import SignInFormik from "./SignInFormik";
import s from "@/sass/layouts/signIn.module.scss";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import authSelector from "@/redux/auth/authSelector";

const SignIn = () => {
  const pathname = usePathname();
  const router = useRouter();
  const token = useSelector(authSelector.selectToken);

  useEffect(() => {
    token ? router.push("/") : "";
  }, [token, router]);

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
              <svg width="50" height="50" className={s.chip__google}>
                <use href="/symbol-defs.svg#google"></use>
              </svg>
            </Link>
            <Link href="#" className={s.link__icons}>
              <svg width="50" height="50" className={s.chip__linkedin}>
                <use href="/symbol-defs.svg#linkedin"></use>
              </svg>
            </Link>
          </div>
          <Link href="#" className={s.link__forgot__password}>
            Забули пароль?
          </Link>
        </div>
      </div>
    </section>
  );
};
export default SignIn;
