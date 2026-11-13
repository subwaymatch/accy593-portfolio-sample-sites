"use client";

import { useMemo, useState } from "react";
import styles from "./demos.module.css";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const usd2 = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

type YearRow = { year: number; principal: number; interest: number; balance: number };

function clamp(n: number, lo: number, hi: number) {
  return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : lo;
}

function payment(principal: number, monthlyRate: number, months: number) {
  if (monthlyRate === 0) return principal / months;
  const f = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * f) / (f - 1);
}

function schedule(principal: number, apr: number, years: number, extra: number) {
  const r = apr / 100 / 12;
  const n = years * 12;
  const base = payment(principal, r, n);
  let balance = principal;
  let month = 0;
  let totalInterest = 0;
  const rows: YearRow[] = [];
  while (balance > 0.005 && month < n) {
    const interest = Math.round(balance * r * 100) / 100;
    // Final payment is trimmed so the balance lands exactly on zero.
    const principalPaid = Math.min(balance, base + extra - interest);
    balance = Math.max(0, balance - principalPaid);
    totalInterest += interest;
    const y = Math.floor(month / 12);
    if (!rows[y]) rows[y] = { year: y + 1, principal: 0, interest: 0, balance: 0 };
    rows[y].principal += principalPaid;
    rows[y].interest += interest;
    rows[y].balance = balance;
    month++;
  }
  return { base, months: month, totalInterest, rows };
}

export default function LoanCalculator() {
  const [amount, setAmount] = useState("240000");
  const [apr, setApr] = useState("6.25");
  const [years, setYears] = useState("30");
  const [extra, setExtra] = useState("0");

  const P = clamp(parseFloat(amount), 1000, 5_000_000);
  const A = clamp(parseFloat(apr), 0, 25);
  const Y = clamp(parseInt(years, 10), 1, 40);
  const X = clamp(parseFloat(extra), 0, 50_000);

  const plan = useMemo(() => schedule(P, A, Y, X), [P, A, Y, X]);
  const baseline = useMemo(() => schedule(P, A, Y, 0), [P, A, Y]);
  const saved = baseline.totalInterest - plan.totalInterest;
  const monthsSaved = baseline.months - plan.months;
  const maxYear = Math.max(...plan.rows.map((r) => r.principal + r.interest), 1);

  const barW = 100 / Math.max(plan.rows.length, 1);

  return (
    <div className={styles.demo}>
      <form className={styles.loanForm} onSubmit={(e) => e.preventDefault()}>
        <label className={styles.field}>
          <span>Loan amount ($)</span>
          <input inputMode="decimal" type="number" min={1000} step={1000} value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <label className={styles.field}>
          <span>Interest rate (APR %)</span>
          <input inputMode="decimal" type="number" min={0} max={25} step={0.05} value={apr} onChange={(e) => setApr(e.target.value)} />
        </label>
        <label className={styles.field}>
          <span>Term (years)</span>
          <select value={years} onChange={(e) => setYears(e.target.value)}>
            {[5, 10, 15, 20, 25, 30].map((y) => (
              <option key={y} value={y}>
                {y} years
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          <span>Extra per month ($)</span>
          <input inputMode="decimal" type="number" min={0} step={25} value={extra} onChange={(e) => setExtra(e.target.value)} />
        </label>
      </form>

      <div className={styles.kpis} aria-live="polite">
        <div>
          <span>Monthly payment</span>
          <strong>{usd2.format(plan.base + X)}</strong>
          {X > 0 ? <small>{usd2.format(plan.base)} scheduled + {usd.format(X)} extra</small> : <small>principal and interest</small>}
        </div>
        <div>
          <span>Total interest</span>
          <strong>{usd.format(plan.totalInterest)}</strong>
          <small>over {plan.months} payments</small>
        </div>
        <div>
          <span>Paid off in</span>
          <strong>
            {Math.floor(plan.months / 12)}y {plan.months % 12}m
          </strong>
          <small>{monthsSaved > 0 ? `${monthsSaved} months early` : "on schedule"}</small>
        </div>
        <div>
          <span>Interest saved</span>
          <strong>{usd.format(Math.max(0, saved))}</strong>
          <small>{X > 0 ? "from the extra payment" : "add an extra payment to see"}</small>
        </div>
      </div>

      <figure className={styles.chart}>
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" role="img" aria-label="Principal and interest paid each year">
          {plan.rows.map((r, i) => {
            const hi = (r.interest / maxYear) * 38;
            const hp = (r.principal / maxYear) * 38;
            return (
              <g key={r.year}>
                <rect x={i * barW + barW * 0.15} width={barW * 0.7} y={40 - hp} height={hp} className={styles.barPrincipal} />
                <rect x={i * barW + barW * 0.15} width={barW * 0.7} y={40 - hp - hi} height={hi} className={styles.barInterest} />
              </g>
            );
          })}
        </svg>
        <figcaption>
          <span className={styles.keyPrincipal}>Principal</span>
          <span className={styles.keyInterest}>Interest</span>
          <span>paid per year, year 1 to {plan.rows.length}</span>
        </figcaption>
      </figure>

      <div className={styles.tableWrap}>
        <table className={styles.schedule}>
          <caption>Yearly amortization schedule</caption>
          <thead>
            <tr>
              <th scope="col">Year</th>
              <th scope="col">Principal</th>
              <th scope="col">Interest</th>
              <th scope="col">Balance</th>
            </tr>
          </thead>
          <tbody>
            {plan.rows.map((r) => (
              <tr key={r.year}>
                <th scope="row">{r.year}</th>
                <td>{usd.format(r.principal)}</td>
                <td>{usd.format(r.interest)}</td>
                <td>{usd.format(r.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
