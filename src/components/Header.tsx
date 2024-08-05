"use client";
import Link from "next/link";
import s from "@/sass/layouts/header.module.scss";
import Logo from "./ui/Logo";
import { usePathname } from "next/navigation";
import authSelector from "@/redux/auth/authSelector";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "@/redux/auth/authApi";
import SvgIcon from "./ui/SvgIcon";
import BurgerButton from "./BurgerButton";

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
      <div className={`${s.container} `}>
        <div className={` ${s.container__header} `}>
          <Link href="/" className={s.logo__link}>
            <Logo />
          </Link>
          <Link href="/" className={s.text__link}>
            <SvgIcon
              id="future-of-it"
              width={438}
              height={50}
              className={s.text__link__chip}
            />
          </Link>
          {pathname !== "/sign_in" &&
            pathname !== "/register" &&
            pathname !== "/confirm" && (
              <nav className={`${s.nav}  `}>
                {/* умова якщо є токен тоді показуємо box__input */}

                <Link
                  className={s.link}
                  href={
                    // "/sign_in"
                    token
                      ? isConfirmed
                        ? "/my_office"
                        : "/confirm"
                      : "/sign_in"
                  }
                >
                  {/* <SvgIcon id="user" width={27} height={33} className={s.chip} /> */}
                  {token ? "Мій кабінет" : "Зареєструватись / Увійти"}
                </Link>
                <BurgerButton />
                {token && (
                  <button
                    className={s.btn__exit}
                    type="button"
                    onClick={handleLogout}
                  >
                    <SvgIcon
                      id="exit"
                      width={25}
                      height={20}
                      className={s.exit__chip}
                    />
                  </button>
                )}
              </nav>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;
