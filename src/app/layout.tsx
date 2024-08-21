import type { Metadata } from "next";

import "./globals.css";
import Header from "@/components/Header/Header";
import { montserrat } from "@/utils/fonts";
import ReduxProvider from "@/redux/ReduxProvider/ReduxProvider";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "JunChirp",
  description: "JunChirp",
  openGraph: {
    images: ["/logo.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ReduxProvider>
          <Header />
          <main className="main">{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
