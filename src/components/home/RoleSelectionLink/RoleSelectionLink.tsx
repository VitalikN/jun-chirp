import s from "./roleSelectionLink.module.scss";
import { roleCards } from "./data/cards";
import CardDetails from "./CardDetails/CardDetails";

const RoleSelectionLink = () => {
  const cards = roleCards.map((card, index: number) => (
    <CardDetails key={index} {...card} />
  ));

  return (
    <section className={s.section}>
      <div className={`${s.container}  ${s.cards}`}>{cards}</div>
    </section>
  );
};
export default RoleSelectionLink;
