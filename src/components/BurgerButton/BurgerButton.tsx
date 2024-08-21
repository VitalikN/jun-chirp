import s from "./burger.module.scss";
import { useEffect, useState } from "react";

const BurgerButton = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("body-no-scroll");
    } else {
      document.body.classList.remove("body-no-scroll");
    }

    return () => {
      document.body.classList.remove("body-no-scroll");
    };
  }, [menuOpen]);

  return (
    <div
      className={`${s.burger__button} ${menuOpen ? s.spin : ""}`}
      onClick={() => setMenuOpen((prev) => !prev)}
    >
      <div className={s.line}></div>
      <div className={s.line}></div>
      <div className={s.line}></div>
    </div>
  );
};

export default BurgerButton;
