import BarChart from "./BarChart";
import CarbonCalculator from "./CarbonCalculator";
import FairIsleChart from "./FairIsleChart";
import s from "../scrapbook.module.css";

const t1 = (v: number) => v.toFixed(1);
const money = (v: number) => `$${v.toFixed(2)}`;

function SampleNote({ children }: { children: React.ReactNode }) {
  return <p className={s.sampleNote}>{children}</p>;
}

function Scope3() {
  return (
    <div className={s.prose}>
      <h2>The estimate</h2>
      <SampleNote>
        Sample data. The restaurant is a composite I built for the case from typical purchasing volumes, not a real
        business. Figures are tonnes of CO2e per year, annualized from one 13-week quarter.
      </SampleNote>
      <BarChart
        title="Estimated Scope 3 emissions by source, tonnes CO2e per year (sample data)"
        caption="Beef and lamb alone are about half of the total. Upstream transport, the thing people usually ask about first, is around 2%."
        unit="t CO2e"
        format={t1}
        tableHeading={["Source", "t CO2e / year"]}
        rows={[
          { label: "Beef & lamb", value: 142.0, highlight: true },
          { label: "Dairy & eggs", value: 52.0 },
          { label: "Poultry & pork", value: 26.7 },
          { label: "Produce & grains", value: 16.2 },
          { label: "Beverages", value: 14.8 },
          { label: "Packaging & supplies", value: 9.4 },
          { label: "Employee commuting", value: 7.9 },
          { label: "Upstream transport", value: 6.3 },
          { label: "Waste to landfill", value: 5.1 },
        ]}
      />
      <h2>How I built it</h2>
      <p>
        I used activity data wherever the invoices gave me a weight (meat, dairy, produce) and multiplied it by a
        kg CO2e per kg factor. For packaging and cleaning supplies I only had dollar amounts, so those use spend-based
        factors, which are rougher. Commuting came from a short staff survey: distance, mode and days per week.
      </p>
      <p>
        The total came to about <strong>280 tonnes CO2e a year</strong>. The beef factor matters more than anything
        else: moving it from a low estimate (35 kg per kg) to a high one (100 kg per kg) swings the whole inventory
        from roughly 224 to 383 tonnes. I flagged that range in the memo instead of pretending the middle number was
        precise.
      </p>
      <h2>What I recommended</h2>
      <ol>
        <li>
          <strong>Blend the burger and drop one beef special.</strong> A 70/30 beef and mushroom blend plus one fewer
          beef special cuts beef purchases by about 20%, or roughly 28 tonnes.
        </li>
        <li>
          <strong>Switch to the commercial compost hauler.</strong> Diverting most food scraps from landfill saves about
          3 tonnes and costs only slightly more than the current trash contract.
        </li>
        <li>
          <strong>Keep buying local, but not for carbon reasons.</strong> Local sourcing saves well under 1 tonne. It
          is still worth doing for freshness and for the farms, but it should not be the headline of a climate story.
        </li>
      </ol>
    </div>
  );
}

function EsgPost() {
  return (
    <article className={s.prose}>
      <h2>What I learned reading three climate sections back to back</h2>
      <p>
        Sustainability reports are written for a strange audience. They are supposed to serve investors, regulators,
        customers and employees at once, and in my experience that usually means they serve none of them well. For a
        class exercise in ACCY 593 I wanted to test that hunch instead of just complaining about it, so I picked three
        mid-size US food companies and read only the climate section of each one&apos;s latest report. I&apos;m
        leaving the names out. This was a reading exercise, not a ranking, and three reports is far too small a sample
        to say anything about the industry.
      </p>
      <p>
        I pasted each climate section into a document and ran it through the Flesch Reading Ease formula, which scores
        text from 0 to 100 based on sentence length and syllables per word. Most newspapers land somewhere around 50 to
        60. I also counted three things by hand: sentences over 35 words, acronyms that never got defined, and claims
        with no number attached.
      </p>
      <p>
        The scores were 31, 24 and 42. All three sit in the range the formula calls difficult, which is roughly
        graduate-school reading. The lowest-scoring report averaged 29 words per sentence and used &ldquo;Scope
        3&rdquo; eleven times before explaining what Scope 3 was, on page 14. The easiest one was not easier because
        it was shorter. It was easier because it put each target in a small table, with the baseline year, the target
        year and the current figure in one row.
      </p>
      <div className={s.tableWrap}>
        <table className={s.table}>
          <caption className={s.tableCaption}>What I counted in each climate section</caption>
          <thead>
            <tr>
              <th scope="col">Report</th>
              <th scope="col" className={s.num}>
                Reading ease
              </th>
              <th scope="col" className={s.num}>
                Words per sentence
              </th>
              <th scope="col" className={s.num}>
                Undefined acronyms
              </th>
              <th scope="col" className={s.num}>
                Claims with a number
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A</td>
              <td className={s.num}>31</td>
              <td className={s.num}>26</td>
              <td className={s.num}>7</td>
              <td className={s.num}>8 of 17</td>
            </tr>
            <tr>
              <td>B</td>
              <td className={s.num}>24</td>
              <td className={s.num}>29</td>
              <td className={s.num}>11</td>
              <td className={s.num}>4 of 16</td>
            </tr>
            <tr>
              <td>C</td>
              <td className={s.num}>42</td>
              <td className={s.num}>21</td>
              <td className={s.num}>2</td>
              <td className={s.num}>7 of 13</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The part that bothered me most was the gap between claims and numbers. Across the three reports I counted 46
        sentences that made a performance or forward-looking claim, like &ldquo;we made meaningful progress on
        packaging.&rdquo; Only 19 had a number, a year or a reporting boundary in the same paragraph. As an accounting
        student, that is the bit I keep coming back to. A financial statement would never get away with
        &ldquo;revenue grew meaningfully.&rdquo;
      </p>
      <p>
        If I were drafting one of these sections, I would do three things. Define every acronym the first time it
        appears, or link to a glossary. Put each target in a table row with its baseline, its current value and the
        method behind it, so a reader can check progress without hunting. And keep most sentences under about 25 words.
        When I rewrote two paragraphs of the hardest report that way, its score rose by about ten points.
      </p>
      <p>
        Readability formulas are blunt tools. They cannot tell whether a sentence is honest, only whether it is long.
        But clear writing makes vague claims easier to spot, and I think that is exactly why it matters here. The
        reports that are easiest to read will also be the easiest to audit.
      </p>
    </article>
  );
}

function CsaCost() {
  return (
    <div className={s.prose}>
      <h2>Cost per box</h2>
      <SampleNote>
        Sample data modeled on a small diversified vegetable farm: 120 members, 20 weekly boxes, 2,400 boxes a season.
        Share price $550, so members pay $27.50 a box.
      </SampleNote>
      <BarChart
        title="Farm cost to grow, pack and deliver one box, dollars (sample data)"
        caption="Labor is more than half of the cost. The farm keeps about $3.00 a box, roughly an 11% margin before the owners pay themselves anything extra."
        unit="per box"
        format={money}
        tableHeading={["Cost pool", "$ per box"]}
        rows={[
          { label: "Field & packing labor", value: 13.4, highlight: true },
          { label: "Equipment & land overhead", value: 4.15 },
          { label: "Seeds, transplants & soil", value: 3.1 },
          { label: "Delivery (van & fuel)", value: 2.6 },
          { label: "Boxes & bags", value: 1.25 },
        ]}
      />
      <h2>How the numbers compare</h2>
      <div className={s.tableWrap}>
        <table className={s.table}>
          <thead>
            <tr>
              <th scope="col">Per box</th>
              <th scope="col" className={s.num}>
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Member pays</td>
              <td className={s.num}>$27.50</td>
            </tr>
            <tr>
              <td>Farm&apos;s full cost</td>
              <td className={s.num}>$24.50</td>
            </tr>
            <tr>
              <td>Margin</td>
              <td className={s.num}>$3.00</td>
            </tr>
            <tr>
              <td>Same produce at a grocery store (average of 4 sample weeks)</td>
              <td className={s.num}>$31.20</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2>Two what-ifs</h2>
      <p>
        <strong>Returnable boxes.</strong> Waxed boxes cost $1.25 per box per week. A returnable crate program, even
        assuming 10% go missing each season, brings that to about $0.40, saving $0.85 a box.
      </p>
      <p>
        <strong>A pickup site.</strong> If half the members picked up at a single site instead of getting home
        delivery, average delivery cost drops from $2.60 to about $1.55, saving another $1.05.
      </p>
      <p>
        Together those raise the margin from $3.00 to about $4.90 a box without touching the share price. My
        takeaway: the farm does not need to charge more, it needs fewer cardboard boxes and fewer stops.
      </p>
    </div>
  );
}

function Calculator() {
  return (
    <div>
      <h2>Build a plate</h2>
      <SampleNote>
        Simplified estimate. The factors are rounded, illustrative averages per kilogram of food. Real numbers vary a
        lot by farm and region, so treat the result as a rough order of magnitude.
      </SampleNote>
      <CarbonCalculator />
      <div className={s.prose}>
        <h2>Why put a dollar figure on it?</h2>
        <p>
          Companies that use an internal carbon price treat emissions as a cost line, even when nobody sends them a
          bill for it. I wanted to see what that looks like at the scale of one dinner. The answer is that the dollar
          figure per plate is tiny (often under a few cents), but it adds up across a restaurant&apos;s 40,000 covers
          a year, and it makes the gap between a beef dish and a bean dish easy to compare.
        </p>
        <p>
          Factor sources: rounded from published food lifecycle averages (for example, Poore and Nemecek, Science,
          2018). The miles comparison uses about 400 g of CO2 per mile for a typical gasoline passenger car, the figure
          the US EPA uses in its consumer guidance.
        </p>
      </div>
    </div>
  );
}

function HomeSales() {
  return (
    <div className={s.prose}>
      <h2>What the site does</h2>
      <p>
        Our class website project was a guide for first-time buyers in Champaign-Urbana, many of whom are grad students
        or new university staff who have never bought a house. The goal was to answer three questions quickly: what
        neighborhoods fit my budget, what will closing actually cost, and how do I compare two houses fairly.
      </p>
      <div className={s.browser} role="img" aria-label="Sketch of the prototype home page: a navigation bar, a headline about buying a first home in Champaign-Urbana, and three cards for budget, closing costs and comparing houses">
        <div className={s.browserBar}>
          <i />
          <i />
          <i />
          <span>first-home-cu / home (class prototype)</span>
        </div>
        <div className={s.mockNav}>
          <b>First Home C-U</b>
          <span>Neighborhoods</span>
          <span>Closing costs</span>
          <span>Compare</span>
          <span>About</span>
        </div>
        <div className={s.mockHero}>
          <strong>Buying your first home in Champaign-Urbana?</strong>
          <small>Three questions to answer before you call an agent.</small>
        </div>
        <div className={s.mockCards}>
          <div>
            What fits my budget?<em>Neighborhood pages</em>
          </div>
          <div>
            What will closing cost?<em>Plain-language glossary</em>
          </div>
          <div>
            How do I compare houses?<em>Price per sq ft table</em>
          </div>
        </div>
      </div>
      <p className={s.mockCaption}>The home page after usability testing: four sections cut down from six.</p>
      <h3>Site map</h3>
      <ul>
        <li>Home: a short welcome, the three questions, and links to each section</li>
        <li>Neighborhoods: one page each for central Champaign, west Urbana and Savoy</li>
        <li>Closing costs: a plain-language glossary</li>
        <li>Compare: a price-per-square-foot table</li>
        <li>About the project</li>
      </ul>
      <h3>Price per square foot (sample data)</h3>
      <SampleNote>Invented sample figures for the prototype. They are not market data.</SampleNote>
      <div className={s.tableWrap}>
        <table className={s.table}>
          <thead>
            <tr>
              <th scope="col">Area</th>
              <th scope="col" className={s.num}>
                Median sale price
              </th>
              <th scope="col" className={s.num}>
                Median sq ft
              </th>
              <th scope="col" className={s.num}>
                $ per sq ft
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Champaign (central)</td>
              <td className={s.num}>$214,000</td>
              <td className={s.num}>1,480</td>
              <td className={s.num}>$145</td>
            </tr>
            <tr>
              <td>Urbana (west)</td>
              <td className={s.num}>$238,000</td>
              <td className={s.num}>1,620</td>
              <td className={s.num}>$147</td>
            </tr>
            <tr>
              <td>Savoy</td>
              <td className={s.num}>$289,000</td>
              <td className={s.num}>2,050</td>
              <td className={s.num}>$141</td>
            </tr>
            <tr>
              <td>Mahomet</td>
              <td className={s.num}>$305,000</td>
              <td className={s.num}>2,120</td>
              <td className={s.num}>$144</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The point of the table is that price per square foot is surprisingly flat across the four areas, so the real
        difference is house size, not a premium for one town. Several testers assumed Savoy was &ldquo;more
        expensive&rdquo; until they saw it this way.
      </p>
      <h3>From the closing-cost glossary</h3>
      <dl className={s.glossary}>
        <div>
          <dt>Earnest money</dt>
          <dd>
            A deposit you put down when your offer is accepted, to show you are serious. It usually counts toward your
            down payment at closing.
          </dd>
        </div>
        <div>
          <dt>Prorated property taxes</dt>
          <dd>
            Illinois property taxes are paid a year behind, so the seller usually credits you for the months they lived
            in the house but have not paid for yet.
          </dd>
        </div>
        <div>
          <dt>Title insurance</dt>
          <dd>
            A one-time policy that protects you (and your lender) if someone later turns out to have a claim on the
            property.
          </dd>
        </div>
      </dl>
      <p>
        The prototype was built for class review and is not published online, so this page shows the content and
        structure instead of a link.
      </p>
    </div>
  );
}

function FairIsle() {
  return (
    <div className={s.prose}>
      <h2>The wheat-sheaf chart</h2>
      <p>
        I wanted a motif that felt like central Illinois in August, so I drew a wheat sheaf on graph paper. Each square
        is one stitch. The band repeats every 12 stitches, which divides evenly into the 288 stitches at the base of the
        yoke.
      </p>
      <FairIsleChart />
      <h3>Yarn and colors</h3>
      <ul>
        <li>Shetland-style jumperweight wool, about 9 skeins total</li>
        <li>Main color sage, with cream, mustard, rust and a dark brown for outlines</li>
        <li>US 2.5 and US 4 circular needles</li>
      </ul>
      <h3>What I would do differently</h3>
      <p>
        My floats were too tight on the first sleeve, which pulled the colorwork in. I ripped it back and knit the
        second attempt inside out so the floats ran around the outside of the tube. That fixed it.
      </p>
    </div>
  );
}

function Garden() {
  return (
    <div className={s.prose}>
      <h2>From the notebook</h2>
      <ul>
        <li>
          <strong>May 9:</strong> planted six tomatoes (Sungold and Cherokee Purple), four kale and a row of bush beans.
          Marigolds along the edges.
        </li>
        <li>
          <strong>June 14:</strong> first kale harvest. Flea beetles ate the eggplant, so I gave up on eggplant.
        </li>
        <li>
          <strong>July 22:</strong> Sungolds coming faster than we can eat them. Froze 3 lb as roasted tomato sauce.
        </li>
        <li>
          <strong>August 30:</strong> beans finished. Re-sowed that row with fall radishes.
        </li>
        <li>
          <strong>September 21:</strong> pulled the tomatoes and did the final weigh-in.
        </li>
      </ul>
      <h2>Did it pay for itself?</h2>
      <BarChart
        title="Harvest by crop, pounds (summer 2026)"
        caption="Tomatoes were more than half of everything I weighed."
        unit="lb"
        format={t1}
        tableHeading={["Crop", "Pounds"]}
        rows={[
          { label: "Tomatoes", value: 38.5, highlight: true },
          { label: "Bush beans", value: 14.2 },
          { label: "Kale", value: 9.8 },
          { label: "Peppers", value: 6.1 },
          { label: "Herbs", value: 2.3 },
        ]}
      />
      <p>
        Costs came to <strong>$143</strong>: $46 for seeds and transplants, $58 for compost and soil, $24 for one year
        of the lumber (spread over five years) and about $15 of extra water. At Saturday farmers&apos; market prices,
        the harvest was worth about <strong>$320</strong>. So the garden came out roughly $177 ahead, which works out to
        about $2.50 an hour for my time. I&apos;m counting that as a win anyway.
      </p>
    </div>
  );
}

function Embroidery() {
  return (
    <div className={s.prose}>
      <h2>The three hoops</h2>
      <h3>Wildflowers (6 inch)</h3>
      <p>
        Coneflowers and goldenrod in satin stitch, stems in stem stitch, and French knots for the seed heads. This one
        took the longest, about 14 hours, mostly because I redid the coneflower petals twice.
      </p>
      <h3>Seedling (5 inch)</h3>
      <p>
        The simplest of the three: a seedling, a line of soil and a few sun rays in back stitch. I stitched it in one
        weekend as a palate cleanser.
      </p>
      <h3>Little house (6 inch)</h3>
      <p>
        My sister&apos;s first house, simplified. Brick red satin-stitch walls, a sage door and lazy daisy leaves on the
        bushes out front.
      </p>
      <h3>Palette</h3>
      <p>
        Six thread colors shared across all three hoops: terracotta, brick, sage, olive, mustard and cream. Keeping the
        palette fixed is what makes them look like a set on the wall.
      </p>
    </div>
  );
}

function Recipe() {
  return (
    <div className={s.prose}>
      <p>
        <strong>Makes 16 knots.</strong> About 3 hours, mostly waiting. Mormor always ground the cardamom fresh from
        the pods, and it really does make a difference.
      </p>
      <h2>Ingredients</h2>
      <h3>Dough</h3>
      <ul>
        <li>250 ml whole milk</li>
        <li>75 g butter</li>
        <li>7 g instant yeast (one packet)</li>
        <li>60 g sugar</li>
        <li>2 tsp freshly ground cardamom</li>
        <li>½ tsp salt</li>
        <li>1 egg</li>
        <li>480 g all-purpose flour (Mormor&apos;s &ldquo;until it feels right&rdquo; turned out to be 480 g)</li>
      </ul>
      <h3>Filling</h3>
      <ul>
        <li>100 g very soft butter</li>
        <li>70 g light brown sugar</li>
        <li>1½ tsp ground cardamom</li>
        <li>1 tsp cinnamon</li>
      </ul>
      <h3>Topping</h3>
      <ul>
        <li>1 egg, beaten</li>
        <li>Pearl sugar</li>
      </ul>
      <h2>Method</h2>
      <ol>
        <li>Warm the milk and butter until the butter melts. Let it cool until it feels just warm on your wrist.</li>
        <li>Stir in the yeast, sugar, cardamom, salt and egg. Add the flour in three parts and knead for 8 to 10 minutes until smooth and slightly tacky.</li>
        <li>Cover and let rise for about an hour, until doubled.</li>
        <li>Beat the filling ingredients together. Roll the dough into a 30 by 40 cm rectangle and spread the filling over it.</li>
        <li>Fold the dough in thirds like a letter, roll it out a little, and cut 16 strips along the short side.</li>
        <li>Twist each strip, wrap it twice around two fingers and tuck the end through the middle. (My shortcut: wrap once and tuck underneath. It looks almost the same.)</li>
        <li>Let the knots rise on lined trays for 30 to 40 minutes. Heat the oven to 200°C (400°F).</li>
        <li>Brush with egg, sprinkle generously with pearl sugar and bake 10 to 12 minutes until deep golden.</li>
      </ol>
      <p>They are best the same day. Mormor would say they freeze well, but they never last that long at our house.</p>
    </div>
  );
}

function PressedFlowers() {
  return (
    <div className={s.prose}>
      <h2>How I made them</h2>
      <ol>
        <li>Picked flowers mid-morning, after the dew dried, and pressed them flat between sheets of printer paper.</li>
        <li>Left them in the press (and under a stack of old phone books) for two to three weeks.</li>
        <li>Arranged each card with tweezers, glued with archival glue on a toothpick, then sealed with a thin coat of matte medium.</li>
        <li>Slid each card into a cellophane sleeve with a kraft envelope.</li>
      </ol>
      <h2>Materials per card</h2>
      <div className={s.tableWrap}>
        <table className={s.table}>
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col" className={s.num}>
                Cost per card
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cream cardstock</td>
              <td className={s.num}>$0.24</td>
            </tr>
            <tr>
              <td>Kraft envelope</td>
              <td className={s.num}>$0.20</td>
            </tr>
            <tr>
              <td>Glue and matte medium (share used)</td>
              <td className={s.num}>$0.28</td>
            </tr>
            <tr>
              <td>Cellophane sleeve</td>
              <td className={s.num}>$0.13</td>
            </tr>
            <tr>
              <td>
                <strong>Total</strong>
              </td>
              <td className={s.num}>
                <strong>$0.85</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        I sold 25 cards at $4 each at a winter craft table. That covered the materials for all 40 cards and paid for a
        proper flower press for next spring. The flowers, of course, were free.
      </p>
    </div>
  );
}

function Notebooks() {
  return (
    <div className={s.prose}>
      <h2>Why coptic stitch</h2>
      <p>
        Coptic binding lies completely flat when it is open, which matters when one hand is holding a tape measure or a
        tomato. It also leaves the spine exposed, so the stitching becomes the decoration.
      </p>
      <h2>Process</h2>
      <ol>
        <li>Folded 48 signatures of four sheets each from recycled printer paper and grid paper.</li>
        <li>Pressed them overnight under a stack of textbooks (finally a use for my intermediate accounting text).</li>
        <li>Cut covers from cereal-box board and wrapped them in kraft paper.</li>
        <li>Marked and punched six sewing stations with an awl, using a paper jig so every signature lined up.</li>
        <li>Sewed with waxed linen thread, two needles at a time, linking each signature to the one below.</li>
      </ol>
      <p>
        My first two tries used a kettle stitch and fell apart at the corners. A library book on coptic binding
        explained what I was doing wrong: I was not pulling each link tight before moving to the next station.
      </p>
    </div>
  );
}

export default function ItemBody({ slug }: { slug: string }) {
  switch (slug) {
    case "scope-3-restaurant":
      return <Scope3 />;
    case "esg-report-readability":
      return <EsgPost />;
    case "csa-box-cost":
      return <CsaCost />;
    case "carbon-cost-per-meal":
      return <Calculator />;
    case "cu-home-sales":
      return <HomeSales />;
    case "fair-isle-sweater":
      return <FairIsle />;
    case "garden-log":
      return <Garden />;
    case "embroidery-hoops":
      return <Embroidery />;
    case "cardamom-knots":
      return <Recipe />;
    case "pressed-flower-cards":
      return <PressedFlowers />;
    case "hand-bound-notebooks":
      return <Notebooks />;
    default:
      return null;
  }
}
