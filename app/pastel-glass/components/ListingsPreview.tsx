import d from "./details.module.css";

// Sample listings and market figures, invented for the class project.
const LISTINGS = [
  { area: "West Urbana", beds: 3, baths: 1.5, sqft: 1450, price: 239900, bus: "2 min to a bus stop", tag: "Owner-occupied street" },
  { area: "Savoy", beds: 3, baths: 2, sqft: 1720, price: 284500, bus: "8 min to a bus stop", tag: "Newer build" },
  { area: "Southwest Champaign", beds: 4, baths: 2.5, sqft: 2100, price: 339000, bus: "6 min to a bus stop", tag: "Big yard" },
  { area: "Edge of Campustown", beds: 2, baths: 1, sqft: 980, price: 172000, bus: "1 min to a bus stop", tag: "Former rental" },
];

const MARKET = [
  { label: "Median list price", value: "$238K" },
  { label: "Median days on market", value: "19" },
  { label: "Homes under $200K", value: "31%" },
];

export default function ListingsPreview() {
  return (
    <div className={d.figure}>
      <h4 className={d.metricTitle}>Listing cards and market panel (sample data)</h4>
      <div className={d.marketRow}>
        {MARKET.map((m) => (
          <div key={m.label} className={d.stat}>
            <span className={d.statNum}>{m.value}</span>
            <span className={d.statLabel}>{m.label}</span>
          </div>
        ))}
      </div>
      <ul className={d.listingGrid}>
        {LISTINGS.map((l) => (
          <li key={l.area} className={d.listing}>
            <span className={d.listingTag}>{l.tag}</span>
            <strong className={d.listingPrice}>${l.price.toLocaleString("en-US")}</strong>
            <span>{l.area}</span>
            <span className={d.muted}>
              {l.beds} bd · {l.baths} ba · {l.sqft.toLocaleString("en-US")} sq ft
            </span>
            <span className={d.muted}>{l.bus}</span>
          </li>
        ))}
      </ul>
      <div className={d.prose}>
        <h4>What we learned</h4>
        <p>
          Our first draft sorted everything by price. In five short interviews with grad students and young staff, nobody
          started there. They asked how far the bus stop was, whether the street was mostly rentals, and what game days
          were like. So the neighbourhood pages lead with those three things, and price filters come second.
        </p>
      </div>
      <p className={d.note}>Listings, prices and market figures are sample data made up for the class project.</p>
    </div>
  );
}
