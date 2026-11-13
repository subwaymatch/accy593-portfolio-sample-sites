"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import styles from "./terminal.module.css";

const TABS = [
  { id: "overview", label: "Overview", key: "F1" },
  { id: "work", label: "Work", key: "F2" },
  { id: "about", label: "About", key: "F3" },
  { id: "contact", label: "Contact", key: "F4" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export type DrawerEntry = {
  title: string;
  ticker: string;
  meta: string;
  body: ReactNode;
};

type Props = {
  header: ReactNode;
  ticker: ReactNode;
  panels: Record<TabId, ReactNode>;
  details: Record<string, DrawerEntry>;
  footer: ReactNode;
};

function parseHash(hash: string, details: Record<string, DrawerEntry>): { tab: TabId; item: string | null } {
  const raw = decodeURIComponent(hash.replace(/^#/, ""));
  const [first, second] = raw.split("/");
  const tab = (TABS.find((t) => t.id === first)?.id ?? "overview") as TabId;
  const item = tab === "work" && second && details[second] ? second : null;
  return { tab, item };
}

export default function Shell({ header, ticker, panels, details, footer }: Props) {
  const [tab, setTab] = useState<TabId>("overview");
  const [item, setItem] = useState<string | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Sync state from the URL hash (initial load, link clicks, back/forward).
  useEffect(() => {
    const sync = () => {
      const next = parseHash(window.location.hash, details);
      setTab(next.tab);
      setItem((prev) => {
        if (next.item && !prev) returnFocus.current = document.activeElement as HTMLElement | null;
        return next.item;
      });
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [details]);

  const selectTab = useCallback((id: TabId, focus = false) => {
    setTab(id);
    setItem(null);
    if (window.location.hash !== `#${id}`) window.history.pushState(null, "", `#${id}`);
    if (focus) tabRefs.current[id]?.focus();
    // Bring the panel top into view if the reader had scrolled past the tab bar.
    const nav = navRef.current;
    if (nav && nav.getBoundingClientRect().top < 0) nav.scrollIntoView({ block: "start" });
  }, []);

  const closeDrawer = useCallback(() => {
    setItem(null);
    window.history.replaceState(null, "", "#work");
    const target = returnFocus.current;
    returnFocus.current = null;
    if (target && document.contains(target)) target.focus();
  }, []);

  // Drawer: focus the close button, lock page scroll, close on Escape.
  useEffect(() => {
    if (!item) return;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeDrawer();
      }
      if (e.key === "Tab" && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [item, closeDrawer]);

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = -1;
    if (e.key === "ArrowRight") next = (index + 1) % TABS.length;
    if (e.key === "ArrowLeft") next = (index - 1 + TABS.length) % TABS.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = TABS.length - 1;
    if (next >= 0) {
      e.preventDefault();
      selectTab(TABS[next].id, true);
    }
  };

  const entry = item ? details[item] : null;

  return (
    <>
      <div className={styles.page} inert={!!entry}>
        <header className={styles.topbar}>
          {header}
          <div className={styles.navWrap} ref={navRef}>
            <div className={styles.tabs} role="tablist" aria-label="Sections">
              {TABS.map((t, i) => (
                <button
                  key={t.id}
                  ref={(el) => {
                    tabRefs.current[t.id] = el;
                  }}
                  id={`ft-tab-${t.id}`}
                  role="tab"
                  type="button"
                  aria-selected={tab === t.id}
                  aria-controls={`ft-panel-${t.id}`}
                  tabIndex={tab === t.id ? 0 : -1}
                  className={styles.tab}
                  onClick={() => selectTab(t.id)}
                  onKeyDown={(e) => onTabKey(e, i)}
                >
                  <span className={styles.tabKey} aria-hidden="true">
                    {t.key}
                  </span>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </header>
        {ticker}
        <main className={styles.main}>
          {TABS.map((t) => (
            <section
              key={t.id}
              id={`ft-panel-${t.id}`}
              role="tabpanel"
              aria-labelledby={`ft-tab-${t.id}`}
              hidden={tab !== t.id}
              className={styles.panel}
              tabIndex={-1}
            >
              {panels[t.id]}
            </section>
          ))}
        </main>
        {footer}
      </div>

      {entry && (
        <div className={styles.drawerLayer}>
          <div className={styles.backdrop} onClick={closeDrawer} aria-hidden="true" />
          <div
            ref={drawerRef}
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ft-drawer-title"
          >
            <div className={styles.drawerHead}>
              <div className={styles.drawerHeadText}>
                <span className={styles.drawerTicker}>{entry.ticker}</span>
                <h2 id="ft-drawer-title" className={styles.drawerTitle}>
                  {entry.title}
                </h2>
                <p className={styles.drawerMeta}>{entry.meta}</p>
              </div>
              <button ref={closeRef} type="button" className={styles.closeBtn} onClick={closeDrawer}>
                <span aria-hidden="true">✕</span>
                <span className={styles.srOnly}>Close</span>
                <kbd className={styles.escKey} aria-hidden="true">
                  ESC
                </kbd>
              </button>
            </div>
            <div className={styles.drawerBody}>{entry.body}</div>
          </div>
        </div>
      )}
    </>
  );
}
