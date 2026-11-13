import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import styles from "./terminal.module.css";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--ft-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--ft-mono",
  display: "swap",
});

export default function FinanceTerminalLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={`${styles.root} ${sans.variable} ${mono.variable}`}>{children}</div>;
}
