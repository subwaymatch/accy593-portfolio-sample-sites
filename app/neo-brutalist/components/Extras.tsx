import styles from "../site.module.css";
import demo from "./demo.module.css";
import type { WorkItem } from "../data";

type Img = WorkItem["image"];

function Figure({ image, caption }: { image: Img; caption: string }) {
  if (!image) return null;
  return (
    <figure className={styles.figure}>
      <img src={image.src} alt={image.alt} width={image.width} height={image.height} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

const palette = [
  { name: "Bolt Pink", hex: "#FF5FA2", text: "#111111" },
  { name: "Lemon", hex: "#FFE14D", text: "#111111" },
  { name: "Night Blue", hex: "#2B59FF", text: "#FFFFFF" },
  { name: "Mint", hex: "#7CF0C2", text: "#111111" },
  { name: "Ink", hex: "#111111", text: "#FFE14D" },
];

export function PaletteBoard({ image }: { image: Img }) {
  return (
    <div className={demo.stack}>
      <Figure image={image} caption="Wrap mock-up: emblem on the serving side, colour split toward the cab." />
      <div className={styles.panel}>
        <h4 className={demo.chartTitle}>Logo lockup</h4>
        <div className={demo.lockup}>
          <svg viewBox="0 0 120 120" width="120" height="120" role="img" aria-label="Fork and Bolt emblem: a fork crossed with a lightning bolt in a yellow circle">
            <circle cx="60" cy="60" r="54" fill="#FFE14D" stroke="#111" strokeWidth="6" />
            <g stroke="#111" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round">
              <path d="M38 30 v18 M46 30 v18 M54 30 v18 M36 48 h20 v6 a10 10 0 0 1 -10 10 h0 a10 10 0 0 1 -10 -10z M46 64 L82 96" fill="#2B59FF" />
              <path d="M84 26 L62 58 L76 58 L54 92 L92 50 L76 50 L90 26 Z" fill="#FF5FA2" />
            </g>
          </svg>
          <div>
            <p className={demo.wordmark}>
              FORK <span>&amp;</span> BOLT
            </p>
            <p className={demo.fine}>Rice bowls, fast. Late nights on Green Street.</p>
          </div>
        </div>
        <h4 className={demo.chartTitle} style={{ marginTop: "1.5rem" }}>
          Palette
        </h4>
        <ul className={demo.swatches}>
          {palette.map((c) => (
            <li key={c.hex} style={{ background: c.hex, color: c.text }}>
              <strong>{c.name}</strong>
              <span>{c.hex}</span>
            </li>
          ))}
        </ul>
        <p className={demo.fine}>
          Every text pairing on the menu board uses black on a light colour or white on Night Blue, all of which pass
          WCAG AA.
        </p>
      </div>
    </div>
  );
}

export function OatMilkPost() {
  return (
    <article className={`${styles.panel} ${demo.post}`}>
      <p className={demo.fine}>Posted in October · 4 min read</p>
      <h4 className={demo.postTitle}>Why the 75-cent oat milk upcharge works</h4>
      <p>
        At almost every coffee shop near campus, a latte is about five dollars and oat milk is another 75 cents. People
        grumble a little and pay. If the same shop raised every latte by 50 cents, I am fairly sure the reaction would
        be worse, even though most customers would end up paying less.
      </p>
      <p>
        Marketers call this partitioned pricing: splitting one price into a base and a surcharge. The classic study
        (Morwitz, Greenleaf and Johnson, 1998) found that people anchor on the base price and under-weight the add-on.
        But I think two other things are going on at a coffee counter.
      </p>
      <p>
        <strong>The customer chose it.</strong> Nobody is forced into oat milk. A surcharge you opted into feels like
        buying an upgrade, not like being charged more for the same thing. It also maps to a cost people can picture:
        a carton of barista oat milk is visibly more expensive than a jug of whole milk.
      </p>
      <p>
        <strong>The menu board number stays comparable.</strong> The five-dollar latte still lines up with the shop
        across the street. Price comparison happens on the headline number, so that is the one a small shop should
        protect.
      </p>
      <p>
        Where this goes wrong is when the surcharge stops being tied to a choice or a cost. A mystery &ldquo;service
        fee&rdquo; at the bottom of a receipt uses the same mechanics and makes people furious, because it feels like a
        hidden price increase. It is one.
      </p>
      <p>
        My takeaway for a small shop: if you need margin, look first at add-ons where the customer picked the upgrade,
        and keep the menu board price clean. Then measure it. Track the attach rate (the share of drinks with the
        add-on) for a month before and after. If the attach rate barely moves, the upcharge was probably too low.
      </p>
    </article>
  );
}

const skate = [
  {
    src: "/neo-brutalist/skate-1.webp",
    alt: "Low-angle photo of a skateboarder mid-ollie over a parking lot curb at dusk, purple sky behind",
    w: 1024,
    h: 1536,
    cap: "01 · Ollie over the curb, Lot E, 5:40 pm",
  },
  {
    src: "/neo-brutalist/skate-2.webp",
    alt: "Close-up of worn black skate shoes on a scuffed board with pink edges, sunset behind bare trees",
    w: 1024,
    h: 1024,
    cap: "02 · Waiting for the light to go orange",
  },
  {
    src: "/neo-brutalist/skate-3.webp",
    alt: "Skater carving the wall of a concrete bowl at a public skatepark under a blue sky",
    w: 1200,
    h: 800,
    cap: "03 · Carving the bowl, first warm Saturday",
  },
];

export function SkateGallery() {
  return (
    <div className={demo.gallery}>
      {skate.map((s) => (
        <figure key={s.src} className={styles.figure}>
          <img src={s.src} alt={s.alt} width={s.w} height={s.h} />
          <figcaption>{s.cap}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export function ZineDetail({ image }: { image: Img }) {
  return (
    <div className={demo.stack}>
      <Figure image={image} caption="Issue one, open to the centre spread, with the stapler that did all the work." />
      <div className={styles.panel}>
        <h4 className={demo.chartTitle}>What is inside issue one</h4>
        <ul className={demo.list}>
          <li>Six photo spreads from the parking lot series, printed extra contrasty so they survive the copier</li>
          <li>A two-page map of every ledge within biking distance of campus (no addresses, just doodles)</li>
          <li>An interview with the person who has been fixing our boards for free for two years</li>
          <li>A back-page ledger of what the issue cost to make, because accounting students cannot help it</li>
        </ul>
      </div>
    </div>
  );
}

const teeCosts = [
  ["Blank tee (bulk)", 3.9],
  ["Plastisol ink, two colours", 1.15],
  ["Two screens + emulsion, spread over 40", 1.3],
  ["Tape, transparencies, misc.", 0.5],
] as const;

export function TeesDetail({ image }: { image: Img }) {
  const total = teeCosts.reduce((s, [, v]) => s + v, 0);
  return (
    <div className={demo.stack}>
      <Figure image={image} caption="The finished run, with one of the two screens and the squeegee." />
      <div className={styles.panel}>
        <div className={demo.tableWrap}>
          <table className={demo.table}>
            <caption>Cost per shirt (40-shirt run)</caption>
            <tbody>
              {teeCosts.map(([k, v]) => (
                <tr key={k}>
                  <th scope="row">{k}</th>
                  <td>${v.toFixed(2)}</td>
                </tr>
              ))}
              <tr>
                <th scope="row">Total cost</th>
                <td>
                  <strong>${total.toFixed(2)}</strong>
                </td>
              </tr>
              <tr>
                <th scope="row">Sold at</th>
                <td>$15.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function PostersDetail({ image }: { image: Img }) {
  return (
    <div className={demo.stack}>
      <Figure image={image} caption="Three posters from spring, taped up for a photo before they went out." />
      <div className={styles.panel}>
        <h4 className={demo.chartTitle}>My poster checklist</h4>
        <ul className={demo.list}>
          <li>Readable from across the street: date first, band second, everything else small</li>
          <li>One image that could only belong to this band</li>
          <li>Two ink colours maximum, so a run of 50 stays under $20</li>
        </ul>
      </div>
    </div>
  );
}
