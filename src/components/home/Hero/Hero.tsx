"use client";

import s from "./hero.module.scss";
import { roboto } from "@/utils/fonts";
import Link from "next/link";
import { AppRouteEnum } from "@/libs/enums/enums";

const Hero = () => {
  return (
    <section className={`${s.container} ${s.hero}`}>
      <div className={s.hero_title_container}>
        <h1 className={s.hero_title}>JunChirp</h1>
        <p className={s.hero_text}>
          Стань частиною динамічної спільноти, яка підтримає твоє зростання,
          надасть широкий спектр можливостей для розвитку та розкриття твого
          професійного потенціалу. Обіцяємо, ми перевершимо твої очікування!
        </p>
        <Link
          href={AppRouteEnum.SIGN_UP}
          className={`${s.hero_button} ${roboto.className} ${s.hiden_mobile}`}
        >
          Зареєструватись
        </Link>
      </div>

      <div className={s.hero_image_container}>
        <div className={s.hero_image}></div>
      </div>

      <Link
        href={AppRouteEnum.SIGN_UP}
        className={`${s.hero_button} ${roboto.className} ${s.hiden_tablet}`}
      >
        Зареєструватись
      </Link>
    </section>
  );
};

export default Hero;
