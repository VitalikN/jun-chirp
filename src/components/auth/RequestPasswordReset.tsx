import s from "../../sass/layouts/requestPasswordReset.module.scss";

const RequestPasswordReset = () => {
  return (
    <section className={s.section}>
      <div className={`${s.container}    ${s.container__resend}`}>
        <h2 className={s.title}>Відправити запит на зміну паролю ?</h2>
      </div>
    </section>
  );
};
export default RequestPasswordReset;
