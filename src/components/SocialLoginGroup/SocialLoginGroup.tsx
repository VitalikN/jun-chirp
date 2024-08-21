import SvgIcon from "../SvgIcon/SvgIcon";
import s from "../auth/SignIn/signIn.module.scss";

const SocialLoginGroup = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const handleGoole = () => {
    window.location.href = `${baseUrl}/auth/google`;
  };
  const handleLinkedin = () => {
    window.location.href = `${baseUrl}/auth/linkedin`;
  };

  return (
    <div className={s.link__group}>
      <SvgIcon
        id="google"
        width={50}
        height={50}
        className={`${s.chip__google} ${s.link__icons}`}
        onClick={handleGoole}
      />
      <SvgIcon
        id="linkedin"
        width={50}
        height={50}
        className={`${s.chip__linkedin} ${s.link__icons}`}
        onClick={handleLinkedin}
      />
    </div>
  );
};
export default SocialLoginGroup;
