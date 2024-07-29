import s from "../../sass/layouts/resetPassword.module.scss";

const ResetPassword = () => {
  return (
    <section className={s.section}>
      <div className={`${s.container}    ${s.container__resend}`}>
        <h2 className={s.title}>Зміна паролю</h2>
      </div>
    </section>
  );
};
export default ResetPassword;
