import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import styles from "./bento.module.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--bm-font",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arjun Mehta · MS Accountancy, Gies",
  description:
    "Portfolio of Arjun Mehta, MS in Accountancy student at Gies College of Business (UIUC): audit tooling, access reviews, data models and small builds.",
};

// Applies a saved theme before first paint so there is no light/dark flash.
// With no saved choice the CSS falls back to prefers-color-scheme.
const themeScript = `(function(){try{var t=localStorage.getItem("bento-modern-theme");var r=document.getElementById("bm-root");if(r&&(t==="light"||t==="dark"))r.setAttribute("data-theme",t);}catch(e){}})();`;

export default function BentoModernLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div id="bm-root" className={`${styles.root} ${manrope.variable}`} suppressHydrationWarning>
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      {children}
    </div>
  );
}
