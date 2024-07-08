"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import s from "@/sass/layouts/register.module.scss";
import RegisterFormik from "./RegisterFormik";

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
        </div>
      </div>
    </section>
  );
};

export default Register;
