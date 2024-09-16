"use client";

import cn from "classnames";
import Link from "next/link";
import s from "./faqs.module.scss";
import { faqs } from "./faqsText";
import { useState } from "react";
import SvgIcon from "@/components/SvgIcon/SvgIcon";
import { AppRouteEnum } from "@/libs/enums/enums";

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setActiveIndex(activeIndex === id ? null : id);
  };

  return (
    <section className={s.section}>
      <div className={s.container}>
        <section className={s.faqs}>
          <div className={s.container__faqs}>
            <h1 className={s.faq__title}>Heading for FAQs</h1>

            {faqs.map((faq) => (
              <div className={s.faq} key={faq.id}>
                <div
                  className={s.faq__item}
                  onClick={() => handleToggle(faq.id)}
                >
                  <h2 className={s.faq__question}>{faq.question}</h2>
                  <div className={s.toggleIcon}>+</div>
                </div>

                <h3
                  className={cn(s.faq__answer, {
                    [s.active]: activeIndex === faq.id,
                  })}
                >
                  {faq.answer}
                </h3>
              </div>
            ))}
          </div>

          <div className={s.container__link}>
            <Link className={s.link} href={AppRouteEnum.SUPPORT}>
              <span className={s.link__text}>Переглянути всі</span>
              <SvgIcon width={19} height={15} id="arrow-down" />
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Faqs;
