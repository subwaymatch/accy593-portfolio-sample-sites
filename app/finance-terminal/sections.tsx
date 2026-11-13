import { Sparkline } from "./charts";
import { courses, items, kpis, person, skills, tickerStats, type WorkItem } from "./data";
import styles from "./terminal.module.css";

const toneArrow = { up: "▲", down: "▼", flat: "■" } as const;

export function Header() {
  return (
    <>
      <a href="#overview" className={styles.brand} aria-label="Hana Kim, portfolio overview">
        <span className={styles.brandMark} aria-hidden="true">
          {person.initials}
        </span>
        <span className={styles.brandText}>
          <span className={styles.brandName}>Hana Kim</span>
          <span className={styles.brandSub}>MSA · Gies · UIUC</span>
        </span>
      </a>
      <p className={styles.status}>
        <span className={styles.statusDot} aria-hidden="true" />
        <span className={styles.statusLong}>Open to summer 2027 roles</span>
        <span className={styles.statusShort}>Open to work</span>
      </p>
    </>
  );
}

export function Ticker() {
  const list = (hidden: boolean) => (
    <ul className={styles.tickerList} aria-hidden={hidden || undefined}>
      {tickerStats.map((s) => (
        <li key={s.label} className={styles.tickerItem}>
          <span className={styles.tickerLabel}>{s.label}</span>
          <span className={styles.tickerValue}>{s.value}</span>
          {s.delta && (
            <span className={styles[`tone_${s.tone}`]}>
              {toneArrow[s.tone]} {s.delta}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
  return (
    <div className={styles.ticker} role="region" aria-label="Personal stats ticker">
      <div className={styles.tickerTrack}>
        {list(false)}
        {list(true)}
      </div>
    </div>
  );
}

function PanelHead({ title, code, id, right }: { title: string; code: string; id?: string; right?: React.ReactNode }) {
  return (
    <div className={styles.panelHead}>
      <h2 id={id} className={styles.panelTitle}>
        <span className={styles.panelCode}>{code}</span>
        {title}
      </h2>
      {right && <div className={styles.panelRight}>{right}</div>}
    </div>
  );
}

export function Overview() {
  const analytics = items.filter((i) => i.category === "analytics");
  return (
    <div className={styles.stack}>
      <div className={styles.heroGrid}>
        <div className={`${styles.box} ${styles.heroText}`}>
          <p className={styles.kicker}>Session · Fall 2026 · {person.course}</p>
          <h1 className={styles.heroName}>Hana Kim</h1>
          <p className={styles.heroRole}>
            MS in Accountancy candidate at Gies College of Business, University of Illinois Urbana-Champaign
          </p>
          <p className={styles.heroBody}>
            I like the part of accounting where the numbers turn into a decision: what a business is worth, whether it
            can make payroll in week seven, why the quarter missed budget. I&apos;m building toward corporate finance,
            valuation and FP&amp;A. This terminal is my portfolio: models, write-ups, and a few things I make when I am
            not in Excel.
          </p>
          <div className={styles.ctaRow}>
            <a href="#work" className={styles.ctaPrimary}>
              View work <span aria-hidden="true">▸</span>
            </a>
            <a href="#work/dcf-prairie-forge" className={styles.ctaGhost}>
              Try the DCF model
            </a>
            <a href="#contact" className={styles.ctaGhost}>
              Contact
            </a>
          </div>
        </div>
        <div className={`${styles.box} ${styles.heroArt}`}>
          <img
            src="/finance-terminal/hero-grid.webp"
            alt="Abstract amber and teal line charts and candlestick bars rising across a dark perspective grid"
            width={1200}
            height={800}
          />
          <dl className={styles.heroQuote}>
            <div>
              <dt>FOCUS</dt>
              <dd>Valuation · FP&amp;A</dd>
            </div>
            <div>
              <dt>CPA</dt>
              <dd className={styles.textUp}>2 / 4 passed</dd>
            </div>
            <div>
              <dt>BASED</dt>
              <dd>Champaign, IL</dd>
            </div>
          </dl>
        </div>
      </div>

      <ul className={styles.kpiGrid} aria-label="Key figures">
        {kpis.map((k) => (
          <li key={k.label} className={`${styles.box} ${styles.kpi}`}>
            <span className={styles.kpiLabel}>{k.label}</span>
            <span className={styles.kpiValue}>{k.value}</span>
            <span className={styles[`tone_${k.tone}`]}>
              {toneArrow[k.tone]} {k.delta}
            </span>
            <Sparkline
              data={"invert" in k && k.invert ? k.spark.map((v) => -v) : k.spark}
              tone={k.tone}
              label={`${k.label} trend: ${k.note}`}
            />
            <span className={styles.kpiNote}>{k.note}</span>
          </li>
        ))}
      </ul>

      <div className={styles.splitGrid}>
        <section className={styles.box} aria-labelledby="ft-watch">
          <div className={styles.panelHead}>
            <h2 id="ft-watch" className={styles.panelTitle}>
              <span className={styles.panelCode}>WL</span>
              Watchlist: business &amp; analytics
            </h2>
            <a href="#work" className={styles.panelLink}>
              All work ▸
            </a>
          </div>
          <table className={styles.watch}>
            <thead>
              <tr>
                <th scope="col">Symbol</th>
                <th scope="col">Project</th>
                <th scope="col" className={styles.num}>
                  Key figure
                </th>
              </tr>
            </thead>
            <tbody>
              {analytics.map((i) => (
                <tr key={i.id}>
                  <td className={styles.sym}>{i.ticker}</td>
                  <td>
                    <a href={`#work/${i.id}`} className={styles.watchLink}>
                      {i.title}
                    </a>
                  </td>
                  <td className={styles.num}>
                    <span className={styles.watchMetricLabel}>{i.metric.label}</span>
                    <span className={styles[`tone_${i.metric.tone}`]}>{i.metric.value}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className={styles.box} aria-labelledby="ft-desk">
          <PanelHead title="Desk notes" code="DN" id="ft-desk" />
          <ul className={styles.notes}>
            <li>
              <span className={styles.noteTag}>NOW</span>
              Finishing my ACCY 593 portfolio (this site) and the CU Home Ledger website project.
            </li>
            <li>
              <span className={styles.noteTag}>NEXT</span>
              CPA REG section in January. BAR after that, in spring.
            </li>
            <li>
              <span className={styles.noteTag}>READING</span>
              Damodaran on narrative and numbers, and a lot of 10-K footnotes.
            </li>
            <li>
              <span className={styles.noteTag}>SEEKING</span>
              Summer 2027 internship in FP&amp;A, valuation or transaction advisory.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

function Thumb({ item }: { item: WorkItem }) {
  if (item.image) {
    return (
      <img
        className={styles.cardImg}
        src={item.image.src}
        alt=""
        width={item.image.width}
        height={item.image.height}
        loading="lazy"
      />
    );
  }
  return (
    <svg className={styles.cardImg} viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="300" height="200" className={styles.glyphBg} />
      {item.glyph === "chess" &&
        Array.from({ length: 36 }).map((_, i) => {
          const r = Math.floor(i / 6);
          const c = i % 6;
          return (
            <rect
              key={i}
              x={60 + c * 30}
              y={10 + r * 30}
              width="30"
              height="30"
              className={(r + c) % 2 ? styles.glyphDark : styles.glyphLight}
            />
          );
        })}
      {item.glyph === "chess" && (
        <text x="165" y="117" textAnchor="middle" dominantBaseline="central" className={styles.glyphPiece}>
          ♞{"︎"}
        </text>
      )}
      {item.glyph === "sheet" &&
        Array.from({ length: 7 }).map((_, r) => (
          <g key={r}>
            {[0, 1, 2, 3].map((c) => (
              <rect
                key={c}
                x={30 + c * 60}
                y={24 + r * 22}
                width={c === 0 ? 58 : 58}
                height="20"
                className={r === 0 ? styles.glyphHead : styles.glyphCell}
              />
            ))}
            {r > 0 && (
              <rect
                x={214}
                y={30 + r * 22}
                width={8 + ((r * 37) % 30)}
                height="8"
                className={r === 5 ? styles.glyphRed : styles.glyphGreen}
              />
            )}
          </g>
        ))}
      {item.glyph === "ledger" && (
        <g>
          {[0, 1, 2, 3, 4, 5].map((r) => (
            <line key={r} x1="40" x2="260" y1={40 + r * 24} y2={40 + r * 24} className={styles.glyphRule} />
          ))}
          <rect x="60" y="120" width="40" height="44" className={styles.glyphDark2} />
          <rect x="120" y="96" width="40" height="68" className={styles.glyphAmber} />
          <rect x="180" y="88" width="40" height="76" className={styles.glyphDark2} />
          <path d="M60 110 L140 84 L200 78" className={styles.glyphLine} />
        </g>
      )}
    </svg>
  );
}

function Card({ item }: { item: WorkItem }) {
  return (
    <li>
      <a href={`#work/${item.id}`} className={styles.card}>
        <span className={styles.cardMedia}>
          <Thumb item={item} />
          <span className={styles.cardTicker}>{item.ticker}</span>
        </span>
        <span className={styles.cardBody}>
          <span className={styles.cardMeta}>
            <span>{item.date}</span>
            <span>{item.tags[0]}</span>
          </span>
          <span className={styles.cardTitle}>{item.title}</span>
          <span className={styles.cardSummary}>{item.summary}</span>
          <span className={styles.cardFoot}>
            <span className={styles.cardMetric}>
              <span className={styles.cardMetricLabel}>{item.metric.label}</span>
              <span className={styles[`tone_${item.metric.tone}`]}>{item.metric.value}</span>
            </span>
            <span className={styles.cardOpen}>
              Open <span aria-hidden="true">▸</span>
            </span>
          </span>
        </span>
      </a>
    </li>
  );
}

export function Work() {
  const groups = [
    {
      id: "analytics",
      code: "BA",
      title: "Business & analytics",
      note: "Valuation, forecasting, dashboards and write-ups",
    },
    { id: "personal", code: "PX", title: "Personal", note: "Things I make and do outside class" },
  ] as const;
  return (
    <div className={styles.stack}>
      <div className={styles.workIntro}>
        <h1 className={styles.sectionTitle}>Work</h1>
        <p>
          {items.length} items. Each card opens a detail panel with what the project is, what I did, and the work
          itself. Figures are sample data built for coursework or invented for this portfolio.
        </p>
      </div>
      {groups.map((g) => {
        const list = items.filter((i) => i.category === g.id);
        return (
          <section key={g.id} className={styles.box} aria-labelledby={`ft-group-${g.id}`}>
            <div className={styles.panelHead}>
              <h2 id={`ft-group-${g.id}`} className={styles.panelTitle}>
                <span className={styles.panelCode}>{g.code}</span>
                {g.title}
                <span className={styles.count}>{list.length}</span>
              </h2>
              <p className={styles.panelRight}>{g.note}</p>
            </div>
            <ul className={styles.cardGrid}>
              {list.map((i) => (
                <Card key={i.id} item={i} />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

export function About() {
  return (
    <div className={styles.stack}>
    <div className={styles.workIntro}>
      <h1 className={styles.sectionTitle}>About</h1>
      <p>Who I am, what I study, and the tools I reach for.</p>
    </div>
    <div className={styles.aboutGrid}>
      <section className={`${styles.box} ${styles.profile}`} aria-labelledby="ft-profile">
        <img
          className={styles.portrait}
          src="/finance-terminal/portrait.webp"
          alt="Illustrated portrait of Hana Kim in a navy blazer and glasses"
          width={1024}
          height={1024}
        />
        <h2 id="ft-profile" className={styles.profileName}>
          Hana Kim
        </h2>
        <p className={styles.profileRole}>MS in Accountancy candidate</p>
        <dl className={styles.facts}>
          <div>
            <dt>School</dt>
            <dd>Gies College of Business, UIUC</dd>
          </div>
          <div>
            <dt>Course</dt>
            <dd>ACCY 593</dd>
          </div>
          <div>
            <dt>Focus</dt>
            <dd>Corporate finance, valuation, FP&amp;A</dd>
          </div>
          <div>
            <dt>Based in</dt>
            <dd>{person.city}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${person.email}`}>{person.email}</a>
            </dd>
          </div>
        </dl>
      </section>

      <div className={styles.stack}>
        <section className={styles.box} aria-labelledby="ft-bio">
          <PanelHead title="About me" code="BIO" id="ft-bio" />
          <div className={styles.bioGrid}>
          <div className={styles.prose}>
            <p>
              I&apos;m in the MS in Accountancy program at Gies, where I spend most of my time in financial reporting,
              corporate finance and data analytics courses. Before that I did my undergrad in accounting and worked two
              busy seasons as a tax intern, which taught me to love a clean workpaper and to dislike March.
            </p>
            <p>
              What pulls me toward finance is the forward-looking side of the numbers. An audit asks whether last year is
              right; a forecast asks what we should do next. I want to work where those two meet: FP&amp;A, valuation, or
              transaction advisory, ideally somewhere I can be the person who checks the footnotes before the ratios.
            </p>
            <p>
              Outside class I run (one marathon so far), play rapid chess badly but enthusiastically, take photographs
              around downtown Champaign at dusk, and sew notebooks by hand.
            </p>
          </div>
          <aside className={styles.interests} aria-label="Career interests, ranked">
            <p className={styles.interestsHead}>Interest allocation</p>
            <ul>
              {[
                { name: "Valuation", w: 40, note: "DCF, comps, deal work" },
                { name: "FP&A", w: 35, note: "Forecasts, budgets, variance" },
                { name: "Corporate finance", w: 25, note: "Capital budgeting, treasury" },
              ].map((x) => (
                <li key={x.name}>
                  <span className={styles.interestRow}>
                    <span>{x.name}</span>
                    <span className={styles.interestPct}>{x.w}%</span>
                  </span>
                  <span className={styles.meter} aria-hidden="true">
                    <span style={{ width: `${x.w * 2.5}%` }} />
                  </span>
                  <span className={styles.skillNote}>{x.note}</span>
                </li>
              ))}
            </ul>
          </aside>
          </div>
        </section>

        <div className={styles.splitGridEven}>
          <section className={styles.box} aria-labelledby="ft-skills">
            <div className={styles.panelHead}>
              <h2 id="ft-skills" className={styles.panelTitle}>
                <span className={styles.panelCode}>SK</span>Tools &amp; skills
              </h2>
            </div>
            <ul className={styles.skills}>
              {skills.map((s) => (
                <li key={s.name}>
                  <span className={styles.skillName}>{s.name}</span>
                  <span className={styles.skillNote}>{s.note}</span>
                  <span
                    className={styles.meter}
                    role="meter"
                    aria-valuenow={s.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${s.name} self-rated ${s.level} out of 100`}
                  >
                    <span style={{ width: `${s.level}%` }} />
                  </span>
                </li>
              ))}
            </ul>
          </section>
          <section className={styles.box} aria-labelledby="ft-courses">
            <div className={styles.panelHead}>
              <h2 id="ft-courses" className={styles.panelTitle}>
                <span className={styles.panelCode}>CRS</span>Coursework
              </h2>
            </div>
            <table className={styles.watch}>
              <thead>
                <tr>
                  <th scope="col">Dept</th>
                  <th scope="col">Course</th>
                  <th scope="col" className={styles.num}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {courses.map((c) => (
                  <tr key={c.name}>
                    <td className={styles.sym}>{c.code}</td>
                    <td>{c.name}</td>
                    <td className={`${styles.num} ${c.status === "In progress" ? styles.tone_flat : styles.tone_up}`}>
                      {c.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </div>
    </div>
  );
}

export function Contact() {
  return (
    <div className={styles.contactGrid}>
      <section className={`${styles.box} ${styles.contactMain}`} aria-labelledby="ft-contact">
        <p className={styles.kicker}>Order ticket · New conversation</p>
        <h1 id="ft-contact" className={styles.contactTitle}>
          Let&apos;s talk.
        </h1>
        <p className={styles.contactLead}>
          I&apos;m looking for a summer 2027 internship in FP&amp;A, valuation or transaction advisory, and I&apos;m happy
          to talk about any project on this site. Email is the fastest way to reach me; I reply within one business day.
        </p>
        <div className={styles.ctaRow}>
          <a href={`mailto:${person.email}`} className={styles.ctaPrimary}>
            Email {person.email}
          </a>
          <a href={person.linkedin} className={styles.ctaGhost} target="_blank" rel="noopener noreferrer">
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
      <section className={styles.box} aria-labelledby="ft-ticket">
        <PanelHead title="Ticket details" code="TKT" id="ft-ticket" />
        <dl className={styles.ticket}>
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${person.email}`}>{person.email}</a>
            </dd>
          </div>
          <div>
            <dt>LinkedIn</dt>
            <dd>
              <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
                linkedin.com
              </a>
            </dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>Champaign, IL · open to relocating</dd>
          </div>
          <div>
            <dt>Available</dt>
            <dd>Summer 2027 internship · full-time from Aug 2027</dd>
          </div>
          <div>
            <dt>Interests</dt>
            <dd>Corporate finance · valuation · FP&amp;A</dd>
          </div>
          <div>
            <dt>Response</dt>
            <dd className={styles.tone_up}>▲ Within 1 business day</dd>
          </div>
        </dl>
      </section>
      <section className={`${styles.box} ${styles.contactWide}`} aria-labelledby="ft-starters">
        <PanelHead title="Good conversation starters" code="Q" id="ft-starters" />
        <ul className={styles.starters}>
          {[
            {
              id: "dcf-prairie-forge",
              q: "Why does three quarters of the value sit in the terminal year, and what would you do about it?",
            },
            { id: "cash-13-week", q: "How would you roll a 13-week forecast forward with actuals every Monday?" },
            { id: "lifo-reserve", q: "Which footnotes do you read before comparing two companies' margins?" },
          ].map((x) => {
            const it = items.find((i) => i.id === x.id)!;
            return (
              <li key={x.id}>
                <a href={`#work/${x.id}`} className={styles.starter}>
                  <span className={styles.sym}>{it.ticker}</span>
                  <span className={styles.starterQ}>{x.q}</span>
                  <span className={styles.cardOpen}>
                    See the project <span aria-hidden="true">▸</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <a href="/" className={styles.hubLink}>
        ← All sample sites
      </a>
      <p>Sample portfolio for ACCY 593. Hana Kim is a fictional student and every figure on this site is sample data.</p>
    </footer>
  );
}
