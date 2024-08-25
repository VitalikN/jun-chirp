import SvgIcon from "@/components/SvgIcon/SvgIcon";
import s from "./whatWeOffer.module.scss";
import { FC } from "react";
import { Offer } from "@/utils/types/Offer";
import WhatWeOfferCard from "./WhatWeOfferCard";

type Props = {
  offers: Offer[];
};

const WhatWeOfferList: FC<Props> = ({ offers }) => {
  return (
    <div className={s.list}>
      {offers.map((offer) => (
        <WhatWeOfferCard offer={offer} />
      ))}
    </div>
  );
};
export default WhatWeOfferList;
