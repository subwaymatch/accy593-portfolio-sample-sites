import type { Metadata } from "next";
import WorkCard from "../_components/WorkCard";
import { work } from "../data";
import styles from "../riso.module.css";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Ten projects by Liam Okafor: ticket pricing, a three-statement club model, sponsorship ROI, a break-even calculator, a home sales website, plus songs, maps, recipes and travel prints.",
};

export default function WorkIndex() {
  const business = work.filter((w) => w.group === "business");
  const personal = work.filter((w) => w.group === "personal");
  return (
    <div className={styles.wrap}>
      <section className={styles.section}>
        <p className={styles.eyebrow}>Work · {work.length} prints</p>
        <h1 className={`${styles.misreg} ${styles.h2}`}>The work</h1>
        <p className={styles.lede}>
          Five business and analytics projects, then five things I make for fun. Each one opens to
          show the actual work: charts, models, a working calculator, lyrics and recipes.
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={`${styles.misreg} ${styles.h2}`}>Business & analytics</h2>
        </div>
        <div className={styles.grid}>
          {business.map((item, i) => (
            <WorkCard key={item.slug} item={item} eager={i < 3} />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={`${styles.misreg} ${styles.misregTeal} ${styles.h2}`}>Off the clock</h2>
        </div>
        <div className={styles.grid}>
          {personal.map((item) => (
            <WorkCard key={item.slug} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
