import s from "../journal.module.css";

// A rebuilt sample issue of the newsletter design. All names and events are placeholders.
export default function Newsletter() {
  return (
    <figure className={s.nl}>
      <div className={s.nlPaper}>
        <header className={s.nlHead}>
          <p className={s.nlTop}>
            <span>Issue 04</span>
            <span>Monthly news for accounting students</span>
            <span>October</span>
          </p>
          <p className={s.nlName}>The Trial Balance</p>
        </header>
        <div className={s.nlGrid}>
          <section className={s.nlCol}>
            <h4 className={s.nlLabel}>This Week</h4>
            <ul className={s.nlEvents}>
              <li>
                <b>Tue 6:00 pm</b> Resume review night, bring a printed copy
              </li>
              <li>
                <b>Thu 5:30 pm</b> Panel: life in a forensic accounting practice
              </li>
              <li>
                <b>Sat 9:00 am</b> Volunteer tax-prep training, session one
              </li>
            </ul>
          </section>
          <section className={`${s.nlCol} ${s.nlLead}`}>
            <h4 className={s.nlLabel}>The Lead</h4>
            <p className={s.nlHeadline}>Busy season, explained by the people who just survived it</p>
            <p>
              Four second-year students on what their internships actually looked like in February: the hours,
              the learning curve, and the one spreadsheet shortcut each wishes they had learned sooner.
            </p>
            <p className={s.nlAsk}>
              <b>Ask a Second-Year:</b> &ldquo;Should I take the CPA exam during the program or after?&rdquo;
            </p>
          </section>
          <section className={s.nlCol}>
            <h4 className={s.nlLabel}>Deadlines</h4>
            <ul className={s.nlEvents}>
              <li>
                <b>Oct 15</b> Spring internship applications (placeholder firm A)
              </li>
              <li>
                <b>Oct 22</b> Case competition team sign-ups
              </li>
              <li>
                <b>Nov 1</b> Society scholarship essays due
              </li>
            </ul>
          </section>
        </div>
      </div>
      <figcaption className={s.caption}>
        A sample issue rebuilt from the template. Events, dates and firms are placeholders.
      </figcaption>
    </figure>
  );
}
