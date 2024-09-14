"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import authSelector from "@/redux/auth/authSelector";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "@/redux/auth/authApi";
import Logo from "../Logo/Logo";
import BurgerButton from "../BurgerButton/BurgerButton";
import SvgIcon from "../SvgIcon/SvgIcon";
import useRouterPush from "@/hooks/useRouter";
import s from "./header.module.scss";
import { AppRouteEnum } from "@/libs/enums/enums";
import { useEffect, useState } from "react";
import useWindowWidth from "@/hooks/useWindowWidth";
import { clearToken } from "@/redux/auth/authSlice";

const Header = () => {
  const pathname = usePathname();
  const token = useSelector(authSelector.selectToken);
  const isConfirmed = useSelector(authSelector.selectIsConfirmed);
  const [logout] = useLogoutMutation();
  const { pushRouter } = useRouterPush();
  const windowWidth = useWindowWidth();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      console.log("logout");

      await logout({}).unwrap();
      dispatch(clearToken());
      pushRouter(AppRouteEnum.ROOT);
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen && windowWidth !== undefined && windowWidth < 1280) {
      document.body.classList.add("body-no-scroll");
      document.documentElement.classList.add("body-no-scroll");
    } else {
      document.body.classList.remove("body-no-scroll");
      document.documentElement.classList.remove("body-no-scroll");
    }
    return () => {
      document.body.classList.remove("body-no-scroll");
      document.documentElement.classList.remove("body-no-scroll");
    };
  }, [menuOpen, windowWidth]);

  return (
    <header className={s.header}>
      <div className={`${s.container} `}>
        <div className={` ${s.container__header} `}>
          <Link
            href={AppRouteEnum.ROOT}
            className={s.logo__link}
            onClick={() => setMenuOpen(false)}
          >
            <Logo />
          </Link>
          <Link href={AppRouteEnum.ROOT} className={s.text__link}>
            <SvgIcon
              id="future-of-it"
              width={438}
              height={50}
              className={s.text__link__chip}
            />
          </Link>
          {pathname !== AppRouteEnum.SIGN_IN &&
            pathname !== AppRouteEnum.SIGN_UP &&
            pathname !== AppRouteEnum.CONFIRM && (
              <nav className={`${s.nav}  `}>
                <Link
                  className={s.link}
                  href={
                    token
                      ? isConfirmed
                        ? AppRouteEnum.MY_OFFICE
                        : AppRouteEnum.CONFIRM
                      : AppRouteEnum.SIGN_IN
                  }
                >
                  {token ? "Мій кабінет" : "Зареєструватись / Увійти"}
                </Link>
                <BurgerButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
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
      <div className={`${s.menu_burger} ${menuOpen ? s.open : ""}`}>
        <ul className={s.nav_burger}>
          <li>
            {" "}
            <Link href="about" onClick={() => setMenuOpen(false)}>
              Про нас
            </Link>
          </li>
          <li>
            {" "}
            <Link href="terms-of-service" onClick={() => setMenuOpen(false)}>
              Умови використання
            </Link>
          </li>
          <li>
            <Link href="privacy-policy" onClick={() => setMenuOpen(false)}>
              Політика конфіденційності
            </Link>
          </li>
        </ul>
        <Link
          className={`${s.link} ${s.open}`}
          href={
            token
              ? isConfirmed
                ? AppRouteEnum.MY_OFFICE
                : AppRouteEnum.CONFIRM
              : AppRouteEnum.SIGN_IN
          }
          onClick={() => setMenuOpen(false)}
        >
          {token ? "Мій кабінет" : "Зареєструватись / Увійти"}
        </Link>
      </div>
    </header>
  );
};

export default Header;
