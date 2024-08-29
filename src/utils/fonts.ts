import { Montserrat, Roboto } from "next/font/google";

export const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const roboto = Roboto({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
});
