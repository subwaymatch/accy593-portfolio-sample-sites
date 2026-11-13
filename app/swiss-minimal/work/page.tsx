import type { Metadata } from "next";
import WorkIndex from "./WorkIndex";
import { items } from "../data";
import s from "../site.module.css";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Index of Maya Chen's projects: audit analytics, process mining, controls design, a home-sales website, film photography, ceramics and more.",
};

export default function WorkPage() {
  return (
    <section className={`${s.wrap} ${s.detailHead}`}>
      <div className={s.grid}>
        <p className={s.eyebrow} style={{ gridColumn: "1 / span 3" }}>
          Index
        </p>
        <h1 className={s.h1} style={{ gridColumn: "1 / -1", marginTop: 16 }}>
          Work, 01–{String(items.length).padStart(2, "0")}
        </h1>
        <p className={`${s.lead} ${s.detailLead}`}>
          Coursework and side projects from the MS in Accountancy, plus the things I make on weekends. Items
          marked with a red square are business and analytics work.
        </p>
      </div>
      <div style={{ marginTop: "clamp(40px, 5vw, 72px)" }}>
        <WorkIndex />
      </div>
    </section>
  );
}
