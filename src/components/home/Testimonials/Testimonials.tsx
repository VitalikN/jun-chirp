"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation, EffectCoverflow } from "swiper/modules";

import "swiper/css/scrollbar";

import s from "./testimonials.module.scss";
import Image from "next/image";
import SvgIcon from "@/components/SvgIcon/SvgIcon";

import testimonials from "./testimonials.json";

interface Testimonial {
  id: number;
  text: string;
  name: string;
  title: string;
  project: string;
  imageSrc: string;
}

const Testimonials = () => {
  const generateBreakpoints = () => {
    const baseConfig = {
      slidesPerView: 1,
      spaceBetween: 10,
    };

    return {
      375: { ...baseConfig, slidesPerView: 1 },
      425: { ...baseConfig, slidesPerView: 1.3 },
      500: { ...baseConfig, slidesPerView: 1.4 },
      520: { ...baseConfig, slidesPerView: 1.5 },
      540: { ...baseConfig, slidesPerView: 1.6 },
      560: { ...baseConfig, slidesPerView: 1.7 },
      580: { ...baseConfig, slidesPerView: 1.8 },
      600: { ...baseConfig, slidesPerView: 1.9 },
      768: { slidesPerView: 2 },
      850: { slidesPerView: 2.2 },
      1024: { slidesPerView: 2.5 },
      1100: { slidesPerView: 2.7 },
      1150: { slidesPerView: 2.8 },
      1200: { slidesPerView: 2.9 },
      1280: { slidesPerView: 3 },
    };
  };
  return (
    <section className={s.section__testimonials}>
      <div className={`${s.container__testimonials}  ${s.container}  `}>
        {/* */}
        <h2 className={s.title__testimonials}>Відгуки</h2>
        <div className={s.swiper__box}>
          <Swiper
            navigation={{
              nextEl: ".swiper__button__next",
              prevEl: ".swiper__button__prev",
            }}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="mySwiper"
            slidesPerView={"auto"}
            spaceBetween={30}
            breakpoints={generateBreakpoints()}
          >
            {testimonials &&
              testimonials.length > 0 &&
              testimonials.map((testimonial: Testimonial) => (
                <SwiperSlide key={testimonial.id} className={s.swiper__box}>
                  <div className={s.container__slide}>
                    <SvgIcon
                      id="vector-1"
                      width={20}
                      height={20}
                      className={s.chip__vector}
                    />

                    <p className={s.text__slide}>{testimonial.text}</p>
                    <div className={s.box__slide}>
                      <Image
                        src={testimonial.imageSrc}
                        alt="user"
                        height={100}
                        width={100}
                        className={s.img}
                      />
                      <div className={s.box__title}>
                        <h3 className={s.title}>{testimonial.name}</h3>
                        <p className={s.subtitle}>{testimonial.title}</p>

                        <p>Назва пет-проєкту: {testimonial.project}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
          <div
            className={`${s.swiperButton} ${s.swiperButtonPrev} swiper__button__prev`}
          >
            <SvgIcon
              id="arrow-left"
              width={24}
              height={24}
              className={s.swiper__button__left}
            />
          </div>
          <div
            className={`${s.swiperButton} ${s.swiperButtonNext} swiper__button__next`}
          >
            <SvgIcon
              id="arrow-right"
              width={24}
              height={24}
              className={s.swiper__button__right}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
