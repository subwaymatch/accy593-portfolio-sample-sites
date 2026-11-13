"use client";

import { useEffect, useState } from "react";
import styles from "./bento.module.css";

type Theme = "light" | "dark";
const KEY = "bento-modern-theme";

function currentTheme(root: HTMLElement): Theme {
  const set = root.getAttribute("data-theme");
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const root = document.getElementById("bm-root");
    if (!root) return;
    setTheme(currentTheme(root));
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setTheme(currentTheme(root));
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  function toggle() {
    const root = document.getElementById("bm-root");
    if (!root) return;
    const next: Theme = currentTheme(root) === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* private mode: the choice just won't persist */
    }
    setTheme(next);
  }

  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button type="button" className={styles.themeToggle} onClick={toggle} aria-label={label} title={label}>
      {/* Sun shows in dark mode, moon in light mode; both hidden until mounted */}
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" data-visible={theme === "dark"}>
        <circle cx="12" cy="12" r="4.2" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
        </g>
      </svg>
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" data-visible={theme === "light"}>
        <path d="M20.2 14.6A8.3 8.3 0 0 1 9.4 3.8a8.3 8.3 0 1 0 10.8 10.8Z" fill="currentColor" />
      </svg>
    </button>
  );
}
