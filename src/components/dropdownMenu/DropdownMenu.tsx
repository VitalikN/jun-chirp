import React, { useState } from "react";
import styles from "./dropdownMenu.module.scss"; // Імпорт SCSS модулю

interface DropdownMenuProps {
  isAuthenticated: boolean;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.headerDropdown}>
      <button onClick={toggleMenu} className={styles.headerButton}>
        <svg
          width="32"
          height="28"
          viewBox="0 0 32 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="32" height="4" rx="2" fill="#228B22" />
          <rect y="12" width="32" height="4" rx="2" fill="#228B22" />
          <rect y="24" width="32" height="4" rx="2" fill="#228B22" />
        </svg>
      </button>
      {isOpen && (
        <div> 
          <div className={styles.overlayLine}/>
          <svg xmlns="http://www.w3.org/2000/svg" width="225" height="2" viewBox="0 0 225 2" fill="none">
  <path d="M1 1H224" stroke="#228B22" stroke-linecap="round"/>
</svg>
          <ul className={styles.dropdownList}>
            <li>
              <a href="/profile" className={styles.dropdownItem}>
                Мій профіль
              </a>
            </li>
            {!isAuthenticated && (
              <>
                <li>
                  <a href="/register" className={styles.dropdownItem}>
                    Зареєструватись
                  </a>
                </li>
                <li>
                  <a href="/login" className={styles.dropdownItem}>
                    Особистий кабінет
                  </a>
                </li>
              </>
            )}
            <li>
              <a href="/projects" className={styles.dropdownItem}>
                Проєкти
              </a>
            </li>
            <li>
              <a href="/education" className={styles.dropdownItem}>
                Навчання
              </a>
            </li>
            <li>
              <a href="/career" className={styles.dropdownItem}>
                Кар’єра
              </a>
            </li>
            <li>
              <a href="/blog" className={styles.dropdownItem}>
                Блог
              </a>
            </li>
            <li>
              <a href="/chat" className={styles.dropdownItem}>
                Чат
              </a>
            </li>
            <li>
              <a href="/settings" className={styles.dropdownItem}>
                Налаштування
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
