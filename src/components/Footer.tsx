import s from "@/sass/layouts/footer.module.scss";
import Link from "next/link";
import Logo from "./ui/Logo";
import FooterNav from "./FooterNav";
import { roboto } from "@/utils/fonts";
import SvgIcon from "./ui/SvgIcon";

const Footer = () => {
  return (
    <footer className={roboto.className}>
      <div className={`${s.container} ${s.footer}`}>
        <Link href="/">
          <Logo />
        </Link>
        <div className={s.footer_nav}>
          {" "}
          <FooterNav />
          
        </div>

        <div>
          <Link href="#" className={s.footerIcons}>
            <SvgIcon id="email" width={50} height={50} />
          </Link>
          <Link href="#">
            <SvgIcon
              id="linkedin"
              width={50}
              height={50}
              className={s.footerIcons}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
