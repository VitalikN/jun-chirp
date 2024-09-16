import s from "./roleSelectionLink.module.scss";
import { roleCards } from "./data/cards";
import CardDetails from "./CardDetails/CardDetails";

const RoleSelectionLink = () => {
  const cards = roleCards.map((card) => (
    <CardDetails key={card.id} {...card} />
  ));

  return (
    <section className={`${s.section} ${s.section__role}`}>
      <div className={`${s.container}  `}>
        <div className={s.cards}>{cards}</div>
      </div>
    </section>
  );
};
export default RoleSelectionLink;
