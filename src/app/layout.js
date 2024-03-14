export const runtime = "edge";

export const viewport = {
  themeColor: "#000000",
  initialScale: 1,
  width: "device-width",
  maximumScale: 1,
};

import { Rubik } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";

const font = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Ben's Page",
  description: "Portfolio for Ben's works",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={"bg-black"}>
      <body className={font.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
