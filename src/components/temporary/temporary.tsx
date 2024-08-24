import { AppRouteEnum } from "@/libs/enums/enums";
import Link from "next/link";
import React from "react";

import styles from './styles.module.css';

export const Temporary = () => {
  return (
    <ul className={styles.list}>
      {Object.entries(AppRouteEnum).map(([key, value]) => {
        return (
          <li key={key}>
            <Link href={value}>{key}</Link>
          </li>
        );
      })}
    </ul>
  );
};
