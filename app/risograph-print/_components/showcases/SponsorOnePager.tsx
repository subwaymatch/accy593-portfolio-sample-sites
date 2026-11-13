import s from "./showcase.module.css";

// Fictional sponsor and club. Benchmarks are illustrative.
const COST = 35_000;
const assets = [
  { asset: "Sleeve patch, home & away kits", measure: "640,000 stream and photo impressions", basis: "$12 CPM", value: 7_680 },
  { asset: "LED board rotations (14 home matches)", measure: "180,600 in-stadium exposures", basis: "$25 CPM", value: 4_515 },
  { asset: "Club social posts (12)", measure: "102,000 impressions", basis: "$9 CPM", value: 918 },
  { asset: "Four youth clinics, co-branded", measure: "240 families attended", basis: "Cost of equivalent event", value: 6_000 },
  { asset: "New members via promo code", measure: "85 accounts opened", basis: "$260 first-year margin each", value: 22_100 },
];

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

export default function SponsorOnePager() {
  const total = assets.reduce((a, r) => a + r.value, 0);
  const multiple = total / COST;
  return (
    <div className={s.stack}>
      <article className={s.sheet} aria-label="Sponsorship ROI one-pager (fictional sponsor)">
        <header className={s.sheetHead}>
          <p className={s.sheetKicker}>2026 season recap · prepared for Corn Belt Credit Union</p>
          <h3 className={s.sheetTitle}>Your $35,000 came back as {usd(total)}.</h3>
        </header>
        <div className={s.sheetBody}>
          <div className={s.sheetBig}>
            <span className={s.sheetMultiple}>{multiple.toFixed(2)}×</span>
            <span>measured return on sponsorship spend</span>
          </div>
          <div className={s.tableWrap}>
            <table className={`${s.table} ${s.sheetTable}`}>
              <thead>
                <tr>
                  <th scope="col">What you got</th>
                  <th scope="col">How much</th>
                  <th scope="col">Valued at</th>
                  <th scope="col">Value</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((r) => (
                  <tr key={r.asset}>
                    <th scope="row">{r.asset}</th>
                    <td className={s.left}>{r.measure}</td>
                    <td className={s.left}>{r.basis}</td>
                    <td>{usd(r.value)}</td>
                  </tr>
                ))}
                <tr className={s.totalRow}>
                  <th scope="row">Total measured value</th>
                  <td />
                  <td />
                  <td>{usd(total)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={s.sheetFoot}>
            <div>
              <h4>What we did not count</h4>
              <p>
                Brand awareness, goodwill in the youth programme, and members who joined without using the code. We
                think these are real, but we cannot prove them, so they are not in the number.
              </p>
            </div>
            <div>
              <h4>Next season</h4>
              <p>
                Same price. We will add a member-night match and track sign-ups at the gate, so next year&apos;s sheet
                can count those too.
              </p>
            </div>
          </div>
        </div>
      </article>
      <p className={s.caption}>
        The finished one-pager, rebuilt in HTML for this site. Sponsor, club and figures are fictional; the CPM
        benchmarks are deliberately conservative placeholders.
      </p>
      <div className={s.memo}>
        <h3 className={s.memoTitle}>Design choices</h3>
        <ul className={s.memoList}>
          <li>
            <strong>Headline is a sentence, not a logo.</strong> &ldquo;Your $35,000 came back as $41,213&rdquo; is
            the line a branch manager repeats to their regional boss.
          </li>
          <li>
            <strong>Show the working.</strong> Every value has its quantity and its benchmark next to it, so a sceptical
            finance person can check it in a minute.
          </li>
          <li>
            <strong>Say what is missing.</strong> Listing what we did not count made the number more believable, not
            less.
          </li>
        </ul>
      </div>
    </div>
  );
}
