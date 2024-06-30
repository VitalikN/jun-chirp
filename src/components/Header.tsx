import Link from "next/link";
import s from "@/sass/layouts/header.module.scss";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className={s.header}>
      <div className={`${s.container} ${s.container__header} `}>
        <Link href="/">
          <Logo />
        </Link>
        <nav className={`${s.nav}  `}>
          <Link href="/" className={s.text__link}>
            Твій старт в <span className={s.text__link__chip}>ІТ</span>
          </Link>
        </nav>
        {/* <Link href="/register">register</Link> */}
        <Link className={s.link} href="/sign_in">
          <svg width="27" height="33">
            <use href="/symbol-defs.svg#user"></use>
          </svg>
          Увійти
        </Link>
      </div>
    </header>
  );
};

export default Header;
