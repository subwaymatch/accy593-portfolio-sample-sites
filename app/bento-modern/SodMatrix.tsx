"use client";

import { useId, useMemo, useState } from "react";
import styles from "./demos.module.css";

type Risk = "high" | "medium" | "low";
type Fn = "VM" | "PO" | "GR" | "IV" | "PY" | "JE" | "JA" | "BR";

const FUNCTIONS: { code: Fn; name: string }[] = [
  { code: "VM", name: "Maintain vendor master" },
  { code: "PO", name: "Create purchase orders" },
  { code: "GR", name: "Post goods receipts" },
  { code: "IV", name: "Enter vendor invoices" },
  { code: "PY", name: "Release payments" },
  { code: "JE", name: "Post journal entries" },
  { code: "JA", name: "Approve journal entries" },
  { code: "BR", name: "Perform bank reconciliations" },
];

const RULES: { a: Fn; b: Fn; risk: Risk; why: string }[] = [
  { a: "VM", b: "PY", risk: "high", why: "Could set up a fake vendor and pay it." },
  { a: "VM", b: "IV", risk: "high", why: "Could create a vendor and bill the company through it." },
  { a: "IV", b: "PY", risk: "high", why: "Could enter an invoice and release payment with no second look." },
  { a: "JE", b: "JA", risk: "high", why: "Could post and approve their own journal entries." },
  { a: "PO", b: "GR", risk: "medium", why: "Could order goods and confirm receipt of goods that never came." },
  { a: "PO", b: "IV", risk: "medium", why: "Could raise a PO and the invoice that clears it." },
  { a: "PY", b: "BR", risk: "medium", why: "Could hide an improper payment inside the reconciliation." },
  { a: "GR", b: "IV", risk: "low", why: "Weakens the three-way match: receipt and invoice from one person." },
  { a: "JE", b: "BR", risk: "low", why: "Could clear reconciling items with a manual entry." },
];

const USERS: { name: string; dept: string; role: string; fns: Fn[] }[] = [
  { name: "D. Alvarez", dept: "Procurement", role: "Buyer", fns: ["PO", "GR"] },
  { name: "K. Brennan", dept: "Procurement", role: "Procurement lead", fns: ["PO", "VM"] },
  { name: "S. Okafor", dept: "Accounts payable", role: "AP clerk", fns: ["IV"] },
  { name: "E. Rossi", dept: "Accounts payable", role: "AP clerk", fns: ["IV", "GR"] },
  { name: "M. Chen", dept: "Accounts payable", role: "AP supervisor", fns: ["IV", "PY", "VM"] },
  { name: "J. Novak", dept: "Treasury", role: "Treasurer", fns: ["PY"] },
  { name: "R. Patel", dept: "Treasury", role: "Treasury analyst", fns: ["PY", "BR"] },
  { name: "A. Kim", dept: "General ledger", role: "Senior accountant", fns: ["JE"] },
  { name: "L. Haddad", dept: "General ledger", role: "Staff accountant", fns: ["JE", "BR"] },
  { name: "T. Reyes", dept: "General ledger", role: "Controller", fns: ["JE", "JA"] },
  { name: "N. Osei", dept: "Warehouse", role: "Receiving lead", fns: ["GR"] },
  { name: "P. Walsh", dept: "IT", role: "ERP admin (firefighter ID)", fns: ["VM", "PO", "GR", "IV", "PY", "JE", "JA", "BR"] },
];

const RISK_RANK: Record<Risk, number> = { low: 1, medium: 2, high: 3 };
const DEPTS = Array.from(new Set(USERS.map((u) => u.dept)));
const pairKey = (a: Fn, b: Fn) => [a, b].sort().join("+");
const RULE_BY_PAIR = new Map(RULES.map((r) => [pairKey(r.a, r.b), r]));

function conflictsFor(fns: Fn[]) {
  return RULES.filter((r) => fns.includes(r.a) && fns.includes(r.b));
}

export default function SodMatrix() {
  const uid = useId();
  const [dept, setDept] = useState("all");
  const [minRisk, setMinRisk] = useState<"all" | Risk>("all");
  const [query, setQuery] = useState("");
  const [onlyConflicts, setOnlyConflicts] = useState(true);
  const [pair, setPair] = useState<string | null>(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const floor = minRisk === "all" ? 0 : RISK_RANK[minRisk];
    return USERS.map((u) => ({
      ...u,
      conflicts: conflictsFor(u.fns).filter((c) => RISK_RANK[c.risk] >= floor),
    })).filter((u) => {
      if (dept !== "all" && u.dept !== dept) return false;
      if (q && !`${u.name} ${u.role}`.toLowerCase().includes(q)) return false;
      if (onlyConflicts && u.conflicts.length === 0) return false;
      if (pair && !u.conflicts.some((c) => pairKey(c.a, c.b) === pair)) return false;
      return true;
    });
  }, [dept, minRisk, query, onlyConflicts, pair]);

  // Count of filtered-in users (ignoring the pair filter) holding each conflicting pair.
  const pairCounts = useMemo(() => {
    const floor = minRisk === "all" ? 0 : RISK_RANK[minRisk];
    const counts = new Map<string, number>();
    for (const u of USERS) {
      if (dept !== "all" && u.dept !== dept) continue;
      for (const c of conflictsFor(u.fns)) {
        if (RISK_RANK[c.risk] < floor) continue;
        const k = pairKey(c.a, c.b);
        counts.set(k, (counts.get(k) ?? 0) + 1);
      }
    }
    return counts;
  }, [dept, minRisk]);

  const totalConflicts = rows.reduce((n, u) => n + u.conflicts.length, 0);
  const highConflicts = rows.reduce((n, u) => n + u.conflicts.filter((c) => c.risk === "high").length, 0);
  const activeRule = pair ? RULE_BY_PAIR.get(pair) : undefined;

  function reset() {
    setDept("all");
    setMinRisk("all");
    setQuery("");
    setOnlyConflicts(true);
    setPair(null);
  }

  return (
    <div className={styles.demo}>
      <div className={styles.controls}>
        <label className={styles.field}>
          <span>Department</span>
          <select value={dept} onChange={(e) => setDept(e.target.value)}>
            <option value="all">All departments</option>
            {DEPTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          <span>Risk</span>
          <select value={minRisk} onChange={(e) => setMinRisk(e.target.value as "all" | Risk)}>
            <option value="all">Any risk</option>
            <option value="medium">Medium and high</option>
            <option value="high">High only</option>
          </select>
        </label>
        <label className={styles.field}>
          <span>User or role</span>
          <input type="search" value={query} placeholder="e.g. clerk" onChange={(e) => setQuery(e.target.value)} />
        </label>
        <label className={styles.check}>
          <input type="checkbox" checked={onlyConflicts} onChange={(e) => setOnlyConflicts(e.target.checked)} />
          <span>Only users with conflicts</span>
        </label>
      </div>

      <div className={styles.matrixWrap}>
        <table className={styles.matrix} aria-describedby={`${uid}-mx`}>
          <caption id={`${uid}-mx`}>
            Conflict rules by function pair. The number is how many users hold both. Select a cell to filter the
            list.
          </caption>
          <thead>
            <tr>
              <td />
              {FUNCTIONS.slice(0, -1).map((f) => (
                <th key={f.code} scope="col" title={f.name}>
                  {f.code}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FUNCTIONS.slice(1).map((row, ri) => (
              <tr key={row.code}>
                <th scope="row" title={row.name}>
                  {row.code}
                </th>
                {FUNCTIONS.slice(0, -1).map((col, ci) => {
                  if (ci > ri) return <td key={col.code} className={styles.cellEmpty} />;
                  const k = pairKey(row.code, col.code);
                  const rule = RULE_BY_PAIR.get(k);
                  if (!rule) return <td key={col.code} className={styles.cellNone} />;
                  const count = pairCounts.get(k) ?? 0;
                  const on = pair === k;
                  return (
                    <td key={col.code}>
                      <button
                        type="button"
                        className={styles.cell}
                        data-risk={rule.risk}
                        data-zero={count === 0}
                        aria-pressed={on}
                        aria-label={`${row.name} with ${col.name}: ${rule.risk} risk, ${count} user${count === 1 ? "" : "s"}`}
                        onClick={() => setPair(on ? null : k)}
                      >
                        {count}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <dl className={styles.legend}>
          {FUNCTIONS.map((f) => (
            <div key={f.code}>
              <dt>{f.code}</dt>
              <dd>{f.name}</dd>
            </div>
          ))}
        </dl>
      </div>

      <p className={styles.summary} aria-live="polite">
        {activeRule ? (
          <>
            Filtered to <strong>{activeRule.a} + {activeRule.b}</strong>: {activeRule.why}{" "}
          </>
        ) : null}
        Showing {rows.length} of {USERS.length} users · {totalConflicts} conflict{totalConflicts === 1 ? "" : "s"} (
        {highConflicts} high).{" "}
        <button type="button" className={styles.linkBtn} onClick={reset}>
          Reset filters
        </button>
      </p>

      <ul className={styles.userList}>
        {rows.map((u) => (
          <li key={u.name} className={styles.userCard}>
            <div className={styles.userHead}>
              <strong>{u.name}</strong>
              <span>
                {u.role} · {u.dept}
              </span>
            </div>
            <div className={styles.fnChips} aria-label="Functions held">
              {u.fns.map((f) => (
                <span key={f}>{f}</span>
              ))}
            </div>
            {u.conflicts.length ? (
              <ul className={styles.conflicts}>
                {u.conflicts.map((c) => (
                  <li key={pairKey(c.a, c.b)}>
                    <span className={styles.risk} data-risk={c.risk}>
                      {c.risk}
                    </span>
                    <span>
                      {c.a} + {c.b}: {c.why}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.noConflict}>No conflicts at this risk level.</p>
            )}
          </li>
        ))}
        {rows.length === 0 ? <li className={styles.empty}>No users match these filters.</li> : null}
      </ul>
    </div>
  );
}
