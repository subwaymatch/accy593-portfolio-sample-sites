import { Inter, Nunito } from "next/font/google";
import styles from "./pastel.module.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--pg-font-head",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--pg-font-body",
  display: "swap",
});

export default function PastelGlassLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${styles.root} ${nunito.variable} ${inter.variable}`}>
      <div className={styles.blobs} aria-hidden="true">
        <span className={`${styles.blob} ${styles.blobLavender}`} />
        <span className={`${styles.blob} ${styles.blobPeach}`} />
        <span className={`${styles.blob} ${styles.blobMint}`} />
        <span className={`${styles.blob} ${styles.blobSky}`} />
      </div>
      {children}
    </div>
  );
}
