import s from "@/sass/layouts/errorPage505.module.scss";
import Link from "next/link";
import { roboto } from "@/utils/fonts";

const errorPage505 = () => {
  return (
    <section className={s.section}>
      <div className={`${roboto.className} ${s.container} `}>
        <div className={s.content__block}>
          <svg className={s.img__505} width="242" height="210">
            <use href="/symbol-defs.svg#505"></use>
          </svg>
          <h1 className={s.title}>Error 505 - Internal Server Error</h1>
          <p className={s.details}>
            Упс… Щось пішло не так з нашим сервером. Технічні фахівці вже
            усувають неполадку. Поки що, будь ласка, поверніться на головну
            сторінку
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

export default errorPage505;
