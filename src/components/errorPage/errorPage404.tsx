import s from "./errorPage404.module.scss";
import Link from "next/link";
import { roboto, montserrat } from "@/utils/fonts";

const ErrorPage404 = () => {
  return (
    <section className={s.section}>
      <div className={`${roboto.className} ${s.container} `}>
        <div className={s.content__block}>
          <svg className={s.img__404} width="242" height="210">
            <use href="/symbol-defs.svg#404"></use>
          </svg>
          <h1 className={s.title}>Error 404 - Page not found</h1>
          <p className={s.details}>
            Ой, ви потрапили на таємну сторінку, якої не існує! Можливо,
            сторінка була видалена або переміщена. Перейдіть на нашу головну
            сторінку, щоб знайти потрібну інформацію
          </p>
          <Link href="/" className={s.link}>
            <button type="button" className={s.button}>
              головна сторінка
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage404;
