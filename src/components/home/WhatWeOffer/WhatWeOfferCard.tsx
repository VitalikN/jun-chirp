import Link from "next/link";
import Image from "next/image";

import SvgIcon from "@/components/SvgIcon/SvgIcon";
import s from "./whatWeOffer.module.scss";
import { FC } from "react";
import { Offer } from "@/utils/types/Offer";
import { roboto } from "@/utils/fonts";

type Props = {
  offer: Offer;
};

const WhatWeOfferCard: FC<Props> = ({ offer }) => {
  return (
    <div className={s.card}>
      <Image
        src={offer.image}
        className={s.img}
        alt="offer"
        height={400}
        width={400}
      />
      <div className={s.layer}>
        <div className={s.layer__info}>
          <div className={s.layer__title}>{offer.title}</div>
          <div className={s.layer__description}>{offer.description}</div>
          <div className={s.layer__text}>{offer.text}</div>
        </div>
        <Link className={s.layer__button} href={""}>
          <span className={`${s.layer__buttonText} ${roboto.className}`}>
            {offer.buttonText}
          </span>
          <SvgIcon
            className={s.layer__icon}
            width={19}
            height={15}
            id="arrow-right-white"
          ></SvgIcon>
        </Link>
      </div>
    </div>
  );
};
export default WhatWeOfferCard;
