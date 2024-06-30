import Link from "next/link";
import s from "@/sass/layouts/header.module.scss";
import Logo from "./Logo";

const Header = () => {
  return (
    <header>
      <div className={`${s.container} ${s.container__header} `}>
        <Link href="/">
          <Logo />
        </Link>
        <nav className={`${s.nav}  `}>
          <Link href="/">Головна</Link>
          <Link href="/register">register</Link>
          <Link href="/sign_in">sign_in</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
