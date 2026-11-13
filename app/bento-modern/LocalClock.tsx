"use client";

import { useEffect, useState } from "react";
import styles from "./bento.module.css";

const fmt = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Chicago",
  hour: "numeric",
  minute: "2-digit",
});
const hourFmt = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Chicago",
  hour: "numeric",
  hourCycle: "h23",
});
const dayFmt = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", weekday: "long" });

function statusFor(hour: number, day: string) {
  if (day === "Saturday" || day === "Sunday") {
    if (hour >= 7 && hour < 11) return "Probably out flying the drone if the wind is low.";
    if (hour >= 11 && hour < 23) return "Weekend. Likely tinkering with something on the desk.";
  }
  if (hour < 7) return "Asleep. I'll reply in the morning.";
  if (hour < 9) return "On the first coffee, reading email.";
  if (hour < 17) return "In class or at the BIF, between cases.";
  if (hour < 22) return "Building something small or studying for REG.";
  return "Winding down. Replies tomorrow.";
}

export default function LocalClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 20_000);
    return () => window.clearInterval(id);
  }, []);

  const time = now ? fmt.format(now) : "--:--";
  const status = now ? statusFor(Number(hourFmt.format(now)), dayFmt.format(now)) : "Central Time";

  return (
    <div className={styles.clock}>
      <p className={styles.clockTime} suppressHydrationWarning>
        <time>{time}</time>
        <span className={styles.clockZone}>CT</span>
      </p>
      <p className={styles.clockStatus}>{status}</p>
    </div>
  );
}
