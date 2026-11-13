import { Archivo_Black, Space_Grotesk } from "next/font/google";
import styles from "./site.module.css";

const display = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--nb-display",
  display: "swap",
});

const body = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--nb-body",
  display: "swap",
});

export default function NeoBrutalistLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={`${styles.root} ${display.variable} ${body.variable}`}>{children}</div>;
}
