import type { Metadata } from "next";

import "./globals.css";
import Header from "@/components/Header";
import { montserrat } from "@/utils/fonts";

export const metadata: Metadata = {
  title: "JunChirp",
  description: "JunChirp",
  openGraph: {
    images: "/logo.png",
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
        <Header />
        <main className="main">{children}</main>
      </body>
    </html>
  );
}
