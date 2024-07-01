"use client";
import Link from "next/link";
import s from "@/sass/layouts/header.module.scss";
import Logo from "./Logo";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className={s.header}>
      <div className={`${s.container} ${s.container__header} `}>
        <Link
          href="/"
          className={`${
            pathname === "/sign_in" || pathname === "/register"
              ? s.logo__link
              : ""
          }`}
        >
          <Logo />
        </Link>
        <Link href="/" className={s.text__link}>
          Твій старт в <span className={s.text__link__chip}>ІТ</span>
        </Link>
        {pathname !== "/sign_in" && pathname !== "/register" && (
          <nav className={`${s.nav}  `}>
            {/* умова якщо є токен тоді показуємо box__input */}
            <div className={s.box__input}>
              <input type="text" className={s.input} placeholder="Пошук" />
              <button type="button" className={s.btn}>
                <svg width="18" height="18" className={s.chip}>
                  <use href="/symbol-defs.svg#serch"></use>
                </svg>
              </button>
            </div>
            {/* <Link href="/register">register</Link> */}
            <Link className={s.link} href="/sign_in">
              <svg width="27" height="33" className={s.chip}>
                <use href="/symbol-defs.svg#user"></use>
              </svg>
              {/* умова якщо є токен тоді показуємо Мій кабінет якщо нема Увійти  */}{" "}
              {/* Мій кабінет */}
              Увійти
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
