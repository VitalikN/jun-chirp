"use client";
import Link from "next/link";
import s from "@/sass/layouts/header.module.scss";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import authSelector from "@/redux/auth/authSelector";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "@/redux/auth/authApi";
import SvgIcon from "./SvgIcon";

const Header = () => {
  const pathname = usePathname();
  const token = useSelector(authSelector.selectToken);
  const isConfirmed = useSelector(authSelector.selectIsConfirmed);
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      const res = await logout({}).unwrap();
      console.log(res);
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  return (
    <header className={s.header}>
      <div className={`${s.container} ${s.container__header} `}>
        <Link
          href="/"
          className={`${
            pathname === "/sign_in" ||
            pathname === "/register" ||
            pathname === "/confirm"
              ? s.logo__link
              : ""
          }`}
        >
          <Logo />
        </Link>
        <Link href="/" className={s.text__link}>
          Твій старт в
          <SvgIcon
            id="it"
            width={73}
            height={64}
            className={s.text__link__chip}
          />
        </Link>
        {pathname !== "/sign_in" &&
          pathname !== "/register" &&
          pathname !== "/confirm" && (
            <nav className={`${s.nav}  `}>
              {/* умова якщо є токен тоді показуємо box__input */}
              {token && (
                <button type="button" onClick={handleLogout}>
                  Logout
                </button>
              )}

              <Link
                className={s.link}
                href={
                  // "/sign_in"
                  token ? (isConfirmed ? "/my_office" : "/confirm") : "/sign_in"
                }
              >
                {/* <SvgIcon id="user" width={27} height={33} className={s.chip} /> */}
                {token ? "Мій кабінет" : "Зареєструватись / Увійти"}
              </Link>
            </nav>
          )}
      </div>
    </header>
  );
};

export default Header;
