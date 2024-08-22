"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import authSelector from "@/redux/auth/authSelector";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "@/redux/auth/authApi";
import Logo from "../Logo/Logo";
import BurgerButton from "../BurgerButton/BurgerButton";
import SvgIcon from "../SvgIcon/SvgIcon";
import useRouterPush from "@/hooks/useRouter";
import s from "./header.module.scss";

const Header = () => {
  const pathname = usePathname();
  const token = useSelector(authSelector.selectToken);
  const isConfirmed = useSelector(authSelector.selectIsConfirmed);
  const [logout] = useLogoutMutation();
  const { pushRouter } = useRouterPush();

  const handleLogout = async () => {
    try {
      console.log("logout");

      await logout({}).unwrap();
      pushRouter("/");
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
                <Link
                  className={s.link}
                  href={
                    token
                      ? isConfirmed
                        ? "/my_office"
                        : "/confirm"
                      : "/sign_in"
                  }
                >
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