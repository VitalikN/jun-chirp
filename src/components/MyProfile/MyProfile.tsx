import s from "./myProfile.module.scss";

const MyProfile = () => {
  return (
    <section className={s.section}>
      <div className={`${s.container}  `}>
        <h1>My Profile</h1>
      </div>
    </section>
  );
};
export default MyProfile;
