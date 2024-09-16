import s from "./projectStatistics.module.scss";

const ProjectStatistics = () => {
  return (
    <section className={`${s.section__statistics}`}>
      <div className={`${s.container}  `}>
        <ul className={s.list}>
          <li className={s.list__item}>
            <h3 className={`${s.item__title} `}>+3К</h3>
            <p className={s.item__text}>проектів</p>
          </li>
          <li className={s.list__item}>
            <h3 className={s.item__title}>+2К</h3>
            <p className={s.item__text}>людей які знайшли роботу</p>
          </li>
          <li className={s.list__item}>
            <h3 className={s.item__title}>+75тис</h3>
            <p className={s.item__text}>доларів були вдало інвестовані</p>
          </li>
        </ul>
      </div>
    </section>
  );
};
export default ProjectStatistics;
