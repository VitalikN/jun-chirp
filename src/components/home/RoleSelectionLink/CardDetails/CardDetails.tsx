import { Card } from "../types";

import s from "./cardDetails.module.scss";
import Link from "next/link";
import SvgIcon from "@/components/SvgIcon/SvgIcon";

const CardDetails = ({ title, subtitle, description }: Card) => {
  return (
    <div className={s.card}>
      <h3 className={s.title}>{title}</h3>

      <div className={s.content}>
        <p className={s.subtitle}>{subtitle}</p>
        <p className={s.description}>{description}</p>
        <Link className={s.link} href="#">
          Перейти
          <SvgIcon width={25} height={25} id="arrow-next" />
        </Link>
      </div>
    </div>
  );
};

export default CardDetails;
