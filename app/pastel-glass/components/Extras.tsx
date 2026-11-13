import d from "./details.module.css";

export function BlogPost() {
  return (
    <article className={d.prose}>
      <p>
        I finished my second season at our campus VITA site in April with forty returns that I prepared myself and a lot more
        that I quality-reviewed. Here is what stuck.
      </p>
      <h4>1. The document you need is the one they left at home</h4>
      <p>
        Almost every return that took more than an hour was waiting on one thing: a 1098-T, a corrected 1099, last year&apos;s
        AGI for e-file. I started asking people to read me their checklist out loud before they sat down. It saved more time
        than any software shortcut.
      </p>
      <h4>2. Ask the second question</h4>
      <p>
        &ldquo;Did anyone else live with you?&rdquo; gets a no. &ldquo;Who was at the house for Thanksgiving?&rdquo; gets you a
        nephew who lived there all year and a head-of-household status the client did not know they qualified for.
      </p>
      <h4>3. Nervous people talk fast, so slow down on purpose</h4>
      <p>
        A lot of clients came in expecting bad news. Saying &ldquo;nothing here looks like a problem so far&rdquo; halfway
        through the intake sheet changed the whole appointment.
      </p>
      <h4>4. Spanish is a tax skill</h4>
      <p>
        Being able to explain the Earned Income Tax Credit in Spanish was the most useful thing I brought to the site. Being
        able to explain it in Spanish without using the word &ldquo;crédito&rdquo; three times per sentence took practice.
      </p>
      <h4>5. Quality review is where I learned the most</h4>
      <p>
        Checking other volunteers&apos; returns showed me the same three mistakes again and again (dependent care dates, missing
        state withholding, the wrong education credit). I now check those first on my own returns too.
      </p>
    </article>
  );
}

const PROPAGATION = [
  { plant: "Golden pothos", cut: "Dec 2", roots: 9, potted: "Jan 4", note: "Fastest every time" },
  { plant: "Heartleaf philodendron", cut: "Dec 2", roots: 12, potted: "Jan 11", note: "" },
  { plant: "Tradescantia", cut: "Dec 9", roots: 6, potted: "Dec 30", note: "Roots in under a week" },
  { plant: "Monstera (one node)", cut: "Dec 16", roots: 24, potted: "Feb 15", note: "Needed the warm shelf" },
  { plant: "Peperomia leaf", cut: "Jan 5", roots: 31, potted: "Mar 8", note: "Slow, then two pups" },
];

export function PropagationLog() {
  const avg = Math.round(PROPAGATION.reduce((a, p) => a + p.roots, 0) / PROPAGATION.length);
  return (
    <div className={d.figure}>
      <div className={d.tableScroll}>
        <table className={`${d.table} ${d.stackTable}`}>
          <caption className={d.tableCaption}>Water propagation, south-facing window, winter 2025–26</caption>
          <thead>
            <tr>
              <th scope="col">Plant</th>
              <th scope="col">Cut</th>
              <th scope="col">Days to first root</th>
              <th scope="col">Potted</th>
              <th scope="col">Notes</th>
            </tr>
          </thead>
          <tbody>
            {PROPAGATION.map((p) => (
              <tr key={p.plant}>
                <th scope="row">{p.plant}</th>
                <td data-label="Cut">{p.cut}</td>
                <td data-label="Days to first root">{p.roots}</td>
                <td data-label="Potted">{p.potted}</td>
                <td data-label="Notes">{p.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={d.note}>
        Average {avg} days to the first root. Next winter I want to test whether a heat mat closes the gap for the monstera.
      </p>
    </div>
  );
}

export function StoryExcerpt() {
  return (
    <div className={d.story}>
      <div lang="es" className={d.storyCol}>
        <span className={d.storyLang}>Español</span>
        <p>Lucía sale de la casa de su abuela con las manos llenas de pan dulce.</p>
        <p>&mdash;Abuela, la luna me está siguiendo.</p>
        <p>&mdash;Claro, mija. Quiere asegurarse de que llegues bien.</p>
        <p>Esa noche, Lucía deja la cortina abierta. Por si acaso la luna quiere decir buenas noches.</p>
      </div>
      <div className={d.storyCol}>
        <span className={d.storyLang}>English</span>
        <p>Lucía leaves her grandmother&apos;s house with both hands full of sweet bread.</p>
        <p>&ldquo;Abuela, the moon is following me.&rdquo;</p>
        <p>&ldquo;Of course, mija. It wants to make sure you get home safe.&rdquo;</p>
        <p>That night, Lucía leaves the curtain open. Just in case the moon wants to say good night.</p>
      </div>
    </div>
  );
}

export function SimpleNote({ children }: { children: React.ReactNode }) {
  return <div className={d.prose}>{children}</div>;
}
