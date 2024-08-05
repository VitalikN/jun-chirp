"use client";
import React, { useState } from "react";
import s from "@/sass/layouts/myProfile.module.scss";
import { myProfileMenu } from "./profile/myProfileMenu";
import { desktopMenu } from "./profile/desktopMenu";
import { wishListMenu } from "./profile/wishListMenu";
import { partnerProgramMenu } from "./profile/partnerProgramMenu";
import { specialProposalMenu } from "./profile/specialProposalMenu";
import { financeMenu } from "./profile/financeMenu";
import { supportMenu } from "./profile/supportMenu";
import { optionsMenu } from "./profile/optionsMenu";
import { logOutMenu } from "./profile/logOutMenu";

const MyProfile = () => {
  const [selectedMenu, setSelectedMenu] = useState(1);

  const menuItems = [
    { id: 1, text: "Мій профіль", icon: "profile-menu" },
    { id: 2, text: "Робочий стіл", icon: "desktop-menu" },
    { id: 3, text: "Список Бажань", icon: "wishList-menu" },
    { id: 4, text: "Партнерська програма", icon: "partner-menu" },
    { id: 5, text: "Спеціальні пропозиції", icon: "special-proposal-menu" },
    { id: 6, text: "Фінанси", icon: "finance-menu" },
    { id: 7, text: "Підтримка", icon: "support-menu" },
    { id: 8, text: "Налаштування", icon: "options-menu" },
    { id: 9, text: "Вийти", icon: "logout-menu" },
  ];

  const handleClick = (id: number) => {
    setSelectedMenu(id);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 1:
        return myProfileMenu();
      case 2:
        return desktopMenu();
      case 3:
        return wishListMenu();
      case 4:
        return partnerProgramMenu();
      case 5:
        return specialProposalMenu();
      case 6:
        return financeMenu();
      case 7:
        return supportMenu();
      case 8:
        return optionsMenu();
      case 9:
        return logOutMenu();

      default:
        return myProfileMenu();
    }
  };

  return (
    <section className={s.section}>
      <div className={s.container}>
        <aside className={s.sidebar}>
          <ul className={s.menu_list}>
            {menuItems.map((item, index) => (
              <li key={index} className={s.menu_item}>
                <button
                  className={`${s.menu_button} ${
                    selectedMenu === item.id ? s.currentMenu : ""
                  }`}
                  onClick={() => handleClick(item.id)}
                >
                  <svg className={s.nav__icons_svg} width="24" height="24">
                    <use href={`/symbol-defs.svg#${item.icon}`}></use>{" "}
                  </svg>
                  {item.text}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <div className="content">{renderContent()}</div>
      </div>
    </section>
  );
};
export default MyProfile;
