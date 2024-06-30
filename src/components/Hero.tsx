"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import s from "@/sass/layouts/hero.module.scss";

const Hero = () => {
  const [dynamicHeight, setDynamicHeight] = useState(300);

  useEffect(() => {
    const handleResize = () => {
      const w = Math.min(window.innerWidth, 1280);

      const w1 = 768,
        h1 = 300;
      const w2 = 1280,
        h2 = 489;

      const calculatedHeight = h1 + ((w - w1) * (h2 - h1)) / (w2 - w1);
      setDynamicHeight(calculatedHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className={s.hero} style={{ height: `${dynamicHeight}px` }}>
      <div className={`${s.container}  `}>
        <ul className={s.list}>
          <li className={s.list__item}>
            <Image
              className={s.role__img}
              src={"/junior.png"}
              alt="junior"
              width="352"
              height="100"
              priority={true}
            />
            <h2 className={s.list__item__title}>Джуніор</h2>
            <p className={s.list__item__text}>
              Знайди свій перший проєкт на JunChirp!
            </p>
            <p className={s.list__item__text}>
              Якщо ти тільки починаєш свій шлях у сфері IT, JunChirp допоможе
              тобі знайти пет-проєкти, які дозволять отримати реальний досвід
              роботи. Збирай команду, долучайся до цікавих задач, розвивай свої
              навички та стань професіоналом разом з нами.
            </p>
            <Link href="/sign_in" className={s.hero__link}>
              Перейти
            </Link>
          </li>

          <li className={s.list__item}>
            <Image
              className={s.role__img}
              src={"/mentor.png"}
              alt="mentor"
              width="352"
              height="100"
              priority={true}
            />
            <h2 className={s.list__item__title}>Ментор</h2>
            <p className={s.list__item__text}>
              Розвивай свій потенціал як ментор на JunChirp!
            </p>
            <p className={s.list__item__text}>
              Менторство - це чудова можливість підвищити свій професійний
              рівень та передати знання молодшим колегам. На JunChirp ти зможеш
              знайти амбіційні проєкти та талановитих джуніорів, яким потрібна
              твоя підтримка та досвід.
            </p>

            <Link href="/sign_in" className={s.hero__link}>
              Перейти
            </Link>
          </li>

          <li className={s.list__item}>
            <Image
              className={s.role__img}
              src={"/investor.png"}
              alt="investor"
              width="352"
              height="100"
              priority={true}
            />
            <h2 className={s.list__item__title}>Інвестор</h2>
            <p className={s.list__item__text}>
              Інвестуй у перспективні проєкти з JunChirp!
            </p>
            <p className={s.list__item__text}>
              Шукаєте інноваційні ідеї та талановиті команди для інвестицій?
              JunChirp пропонує платформу, де ви зможете знайти
              найперспективніші проєкти в IT-сфері. Долучайтеся до нашої
              спільноти та підтримуйте стартапи, які можуть змінити світ!
            </p>

            <Link href="/sign_in" className={s.hero__link}>
              Перейти
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Hero;
