import styles from "./styles.module.scss";
import Link from "next/link";
import { roboto } from "@/utils/fonts";

const NotFoundPage = () => {
  return (
    <section className={styles.section}>
      <div className={`${roboto.className} ${styles.container} `}>
        <div className={styles.content__block}>
          <svg className={styles.img__404} width="242" height="210">
            <use href="/symbol-defs.svg#404"></use>
          </svg>
          <h1 className={styles.title}>Error 404 - Page not found</h1>
          <p className={styles.details}>
            Ой, ви потрапили на таємну сторінку, якої не існує! Можливо,
            сторінка була видалена або переміщена. Перейдіть на нашу головну
            сторінку, щоб знайти потрібну інформацію
          </p>
          <Link href="/" className={styles.link}>
            <button type="button" className={styles.button}>
              головна сторінка
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
