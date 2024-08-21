"use client";

import s from "./hero.module.scss";

const Hero = () => {
  return (
    <section className={s.hero}>
      <div className={`${s.container}  `}>Hero</div>
    </section>
  );
};

export default Hero;
