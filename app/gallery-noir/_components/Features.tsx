import type { Img } from "../_data/works";
import f from "./Features.module.css";

function Plate({ img, caption }: { img: Img; caption: string }) {
  return (
    <figure className={f.plate} data-reveal>
      <img src={img.src} width={img.width} height={img.height} alt={img.alt} loading="lazy" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

/* ───────── Quad Capital Society identity ───────── */
const PALETTE = [
  { name: "Ink", hex: "#121417", use: "Backgrounds, cards" },
  { name: "Graphite", hex: "#2b2e33", use: "Tables, rules" },
  { name: "Brass", hex: "#b8964f", use: "Mark, one accent per page" },
  { name: "Paper", hex: "#f3efe6", use: "Text, print stock" },
];

function Monogram({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" role="img" aria-label="Quad Capital Society monogram">
      <rect x="6" y="6" width="108" height="108" fill="none" stroke="#b8964f" strokeWidth="2" />
      <rect x="26" y="52" width="10" height="46" fill="#b8964f" />
      <rect x="44" y="34" width="10" height="64" fill="#b8964f" />
      <rect x="62" y="44" width="10" height="54" fill="#b8964f" />
      <rect x="80" y="24" width="10" height="74" fill="#b8964f" />
    </svg>
  );
}

export function IdentityFeature({ cover }: { cover: Img }) {
  return (
    <div className={f.stack}>
      <Plate img={cover} caption="Stationery set: cards, letterhead and a members' notebook with the blind-embossed mark." />
      <div className={f.idGrid}>
        <div className={f.card} data-reveal>
          <p className={f.kicker}>The mark</p>
          <div className={f.markRow}>
            <Monogram />
            <Monogram size={48} />
            <Monogram size={20} />
          </div>
          <p className={f.small}>
            Four columns for the four sector teams, rising left to right. Drawn on a 12-unit grid so it survives at
            favicon size.
          </p>
        </div>
        <div className={f.card} data-reveal>
          <p className={f.kicker}>Palette</p>
          <ul className={f.swatches}>
            {PALETTE.map((p) => (
              <li key={p.name}>
                <span className={f.chip} style={{ background: p.hex }} aria-hidden="true" />
                <span>
                  <strong>{p.name}</strong> <code>{p.hex}</code>
                  <br />
                  <span className={f.small}>{p.use}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className={f.card} data-reveal>
          <p className={f.kicker}>Type</p>
          <p className={f.specimenSerif}>Long thesis, short slide.</p>
          <p className={f.specimenSans}>Figures 0123456789 · EV/EBITDA 11.4×</p>
          <p className={f.small}>A serif for headlines, a geometric sans with lining figures for every number.</p>
        </div>
      </div>
      <div className={f.card} data-reveal>
        <p className={f.kicker}>Pitch template: fixed slots</p>
        <ol className={f.slots}>
          <li>
            <span>01</span>Thesis in one sentence
          </li>
          <li>
            <span>02</span>Business and moat
          </li>
          <li>
            <span>03</span>Valuation: DCF and comps on one slide
          </li>
          <li>
            <span>04</span>Catalysts with dates
          </li>
          <li>
            <span>05</span>Risks, and what would change our mind
          </li>
        </ol>
      </div>
    </div>
  );
}

/* ───────── Champaign-Urbana homes ───────── */
const LISTINGS = [
  { name: "Brick bungalow", area: "West Urbana", price: 239000, beds: 3, baths: 1.5, moveIn: "Jun 1", walk: "18 min" },
  { name: "Craftsman two-storey", area: "Near Campustown", price: 312000, beds: 4, baths: 2, moveIn: "Aug 1", walk: "9 min" },
  { name: "Ranch with garden", area: "Savoy", price: 268000, beds: 3, baths: 2, moveIn: "Jul 15", walk: "Bus 22" },
  { name: "Downtown condo", area: "Downtown Champaign", price: 189000, beds: 2, baths: 2, moveIn: "Aug 15", walk: "Bus 5" },
];

function monthly(price: number) {
  const loan = price * 0.8;
  const r = 0.065 / 12;
  const n = 360;
  const pi = (loan * r) / (1 - Math.pow(1 + r, -n));
  const tax = (price * 0.022) / 12;
  const ins = 1500 / 12;
  return { pi, tax, ins, total: pi + tax + ins };
}

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

export function HomesFeature({ cover }: { cover: Img }) {
  const example = monthly(LISTINGS[1].price);
  return (
    <div className={f.stack}>
      <Plate img={cover} caption="The listings view with the map panel open, as I demoed it in class." />
      <div className={f.card} data-reveal>
        <p className={f.kicker}>Listings view · sample data</p>
        <div className={f.tableWrap}>
          <table className={`${f.table} ${f.listings}`}>
            <caption className={f.srOnly}>Sample listings from the site, sorted by move-in date</caption>
            <thead>
              <tr>
                <th scope="col">Home</th>
                <th scope="col">Price</th>
                <th scope="col">Beds / baths</th>
                <th scope="col">Move-in</th>
                <th scope="col">To the Quad</th>
                <th scope="col">Est. monthly</th>
              </tr>
            </thead>
            <tbody>
              {LISTINGS.map((l) => (
                <tr key={l.name}>
                  <th scope="row">
                    {l.name}
                    <span className={f.small}>{l.area}</span>
                  </th>
                  <td data-label="Price">{usd(l.price)}</td>
                  <td data-label="Beds / baths">
                    {l.beds} / {l.baths}
                  </td>
                  <td data-label="Move-in">{l.moveIn}</td>
                  <td data-label="To the Quad">{l.walk}</td>
                  <td data-label="Est. monthly" className={f.monthlyCell}>
                    {usd(monthly(l.price).total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={f.twoCol}>
        <div className={f.card} data-reveal>
          <p className={f.kicker}>How the monthly cost is built</p>
          <p className={f.small}>Example: the {usd(LISTINGS[1].price)} Craftsman, 20% down, 30-year fixed at 6.5%.</p>
          <dl className={f.costs}>
            <dt>Principal and interest</dt>
            <dd>{usd(example.pi)}</dd>
            <dt>Property tax (2.2% a year, assumed)</dt>
            <dd>{usd(example.tax)}</dd>
            <dt>Homeowner&apos;s insurance (assumed)</dt>
            <dd>{usd(example.ins)}</dd>
            <dt className={f.total}>Estimated monthly cost</dt>
            <dd className={f.total}>{usd(example.total)}</dd>
          </dl>
        </div>
        <div className={f.card} data-reveal>
          <p className={f.kicker}>What I built</p>
          <ul className={f.list}>
            <li>Listing data model and filters for neighbourhood, price, bedrooms and move-in month</li>
            <li>Walk and bus times to the main quad, so commuting is visible before price</li>
            <li>The cost calculator above, with every assumption shown on the page</li>
            <li>Responsive layout tested on two classmates&apos; phones during a real house search</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ───────── Recital programme ───────── */
export function ProgrammeFeature() {
  return (
    <div className={f.programme} data-reveal>
      <div className={f.progHead}>
        <p className={f.kicker}>Spring chamber recital · graduate and non-major performers</p>
        <h2 className={f.progTitle}>Programme</h2>
      </div>
      <ol className={f.progList}>
        <li>
          <span className={f.composer}>Johann Sebastian Bach (1685 to 1750)</span>
          <span className={f.piece}>Suite No. 3 in C major, BWV 1009: I. Prélude</span>
          <span className={f.perf}>Grace Nguyen, cello</span>
        </li>
        <li>
          <span className={f.composer}>Gabriel Fauré (1845 to 1924)</span>
          <span className={f.piece}>Élégie in C minor, Op. 24</span>
          <span className={f.perf}>Grace Nguyen, cello · Daniel Okafor, piano</span>
        </li>
      </ol>
      <div className={f.progNote}>
        <h3 className={f.progNoteHead}>Programme note</h3>
        <p>
          Bach&apos;s six suites for unaccompanied cello were probably written around 1720, during his years at
          Köthen. No manuscript in his own hand survives; the best source is a copy made by his wife, Anna
          Magdalena. Because of that, every cellist ends up making decisions about slurs and bowings that Bach never
          wrote down, and no two performances of the Prélude sound quite alike. The C major Prélude opens with a
          single falling scale and then spends three minutes finding out what the open strings of the instrument
          can do. I play it first because it asks the audience for nothing except attention.
        </p>
        <p>
          Fauré wrote the Élégie in 1880 as the slow movement of a cello sonata he never finished, and it was
          published on its own in 1883. The cello begins alone over slow, heavy chords in the piano, with a melody
          that sinks more than it sings. A gentler middle section lets the cello climb higher and lighter, almost
          hopeful, before the opening theme returns with far more force than it had the first time, as if the grief
          has been interrupted rather than resolved. It ends quietly.
        </p>
        <p>
          I first learned the Élégie at eighteen and put it away for three years. Coming back to it, I found that
          the hardest moment is not the loud return but the very first note, which has to start from nothing and
          still be heard at the back of the hall.
        </p>
        <p className={f.sign}>Grace Nguyen</p>
      </div>
    </div>
  );
}

/* ───────── Sketchbook ───────── */
const SPEC = [
  ["Format", "A5 landscape, 210 × 148 mm"],
  ["Text block", "8 signatures of 4 folded sheets, 64 leaves"],
  ["Paper", "150 gsm cartridge, grain parallel to the spine"],
  ["Covers", "2 mm greyboard wrapped in charcoal bookcloth"],
  ["Sewing", "Coptic stitch on 4 stations, waxed linen thread"],
  ["Time", "About six hours over two weekends"],
];

export function SketchbookFeature({ cover }: { cover: Img }) {
  return (
    <div className={f.stack}>
      <Plate img={cover} caption="Open at a spread of street corners and my cello's scroll. The exposed stitching lets it lie flat." />
      <div className={f.twoCol}>
        <div className={f.card} data-reveal>
          <p className={f.kicker}>Binding specification</p>
          <dl className={f.spec}>
            {SPEC.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className={f.card} data-reveal>
          <p className={f.kicker}>Process</p>
          <ol className={f.process}>
            <li>Fold the sheets into signatures and press them overnight under a stack of textbooks.</li>
            <li>Pierce four sewing stations through every signature with a paper jig so the holes line up.</li>
            <li>Cover the boards in bookcloth with PVA and pierce matching holes near the spine edge.</li>
            <li>Sew board to signature to signature, linking each with kettle stitches. Do not pull too tight.</li>
            <li>Press the finished book for a day, then start drawing on the first page before it feels too precious.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
