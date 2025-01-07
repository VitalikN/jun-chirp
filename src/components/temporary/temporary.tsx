import { AppRouteEnum } from "@/libs/enums/enums";
import Link from "next/link";
import React from "react";

import s from "./styles.module.scss";

export const Temporary = () => {
  return (
    <section className={s.section}>
      <div className={s.container}>
        <ul className={s.list}>
          {Object.entries(AppRouteEnum).map(([key, value]) => {
            return (
              <li key={key}>
                <Link href={value}>{key}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
