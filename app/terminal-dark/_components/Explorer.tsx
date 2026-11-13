"use client";

import { useEffect, useState } from "react";
import styles from "../terminal.module.css";
import { workItems } from "../data";

const SECTIONS = ["about", "work", "contact"] as const;
type SectionId = (typeof SECTIONS)[number];

const businessCount = workItems.filter((w) => w.category === "business").length;
const personalCount = workItems.length - businessCount;

export default function Explorer() {
  const [active, setActive] = useState<SectionId>("about");

  useEffect(() => {
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        // pick the first section (in document order) that is meaningfully on screen
        const next = SECTIONS.find((id) => (visible.get(id) ?? 0) > 0);
        if (next) setActive(next);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.01] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const cur = (id: SectionId) => (active === id ? "true" : undefined);

  return (
    <nav className={styles.explorer} aria-label="Sections">
      <div className={styles.explorerHead}>Explorer</div>
      <ul className={styles.tree}>
        <li>
          <span className={styles.treeFolder}>▾ ~/dev-patel/</span>
          <ul>
            <li>
              <a className={styles.treeLink} href="#about" aria-current={cur("about")}>
                about.md
              </a>
            </li>
            <li>
              <a className={styles.treeLink} href="#work" aria-current={cur("work")}>
                ▾ work/
              </a>
              <ul>
                {(["business", "personal"] as const).map((cat) => (
                  <li key={cat}>
                    <a className={styles.treeLink} href={`#work-${cat}`}>
                      {cat}/ <span className={styles.treeCount}>{cat === "business" ? businessCount : personalCount}</span>
                    </a>
                    <ul>
                      {workItems
                        .filter((w) => w.category === cat)
                        .map((w) => (
                          <li key={w.slug}>
                            <a
                              className={`${styles.treeLink} ${styles.treeFile}`}
                              href={`#work/${w.slug}`}
                              title={w.title}
                              aria-label={`Open ${w.title}`}
                            >
                              <span>{w.file.split("/").filter(Boolean).pop()}</span>
                            </a>
                          </li>
                        ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <a className={styles.treeLink} href="#contact" aria-current={cur("contact")}>
                contact.sh
              </a>
            </li>
          </ul>
        </li>
      </ul>
      <div className={styles.explorerFoot}>
        <span>
          <span className={styles.dotGreen}>●</span> main
        </span>
        <span>UTF-8</span>
      </div>

      {/* phone: the tree collapses into editor tabs */}
      <ul className={styles.tabs}>
        <li>
          <a href="#about" aria-current={cur("about")}>
            about.md
          </a>
        </li>
        <li>
          <a href="#work" aria-current={cur("work")}>
            work/
          </a>
        </li>
        <li>
          <a href="#contact" aria-current={cur("contact")}>
            contact.sh
          </a>
        </li>
      </ul>
    </nav>
  );
}
