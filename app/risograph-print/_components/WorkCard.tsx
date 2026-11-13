import Link from "next/link";
import { work, type Ink, type WorkItem } from "../data";
import styles from "../riso.module.css";

export const inkClass: Record<Ink, string> = {
  blue: styles.inkBlue,
  orange: styles.inkOrange,
  yellow: styles.inkYellow,
  teal: styles.inkTeal,
};

export default function WorkCard({ item, eager = false }: { item: WorkItem; eager?: boolean }) {
  const no = work.findIndex((w) => w.slug === item.slug) + 1;
  return (
    <Link href={`/risograph-print/work/${item.slug}`} className={`${styles.card} ${inkClass[item.ink]}`}>
      <div className={styles.cardMedia}>
        <img
          src={item.image.src}
          alt={item.image.alt}
          width={item.image.width}
          height={item.image.height}
          loading={eager ? "eager" : "lazy"}
        />
        <span className={styles.printNo} aria-hidden="true">
          No.{String(no).padStart(2, "0")}
        </span>
      </div>
      <div className={styles.cardBody}>
        <span className={styles.kicker}>{item.kicker}</span>
        <h3 className={styles.cardTitle}>{item.title}</h3>
        <p className={styles.cardSummary}>{item.summary}</p>
      </div>
    </Link>
  );
}
