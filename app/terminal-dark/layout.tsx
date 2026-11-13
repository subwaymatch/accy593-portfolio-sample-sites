import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import styles from "./terminal.module.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--td-mono",
  display: "swap",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--td-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dev Patel | Accounting data, SQL and Python",
  description:
    "Portfolio of Dev Patel, MS in Accountancy (Data Analytics) student at Gies College of Business, UIUC.",
};

export default function TerminalDarkLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={`${styles.root} ${mono.variable} ${sans.variable}`}>{children}</div>;
}
