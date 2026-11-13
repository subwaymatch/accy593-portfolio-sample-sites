import d from "./details.module.css";

const GROSS = 1200;
const LINES = [
  { en: "Federal income tax", es: "Impuesto federal sobre la renta", amount: 78, color: "#6a4fb8", noteEn: "Depends on your W-4", noteEs: "Depende de tu formulario W-4" },
  { en: "Social Security (6.2%)", es: "Seguro Social (6.2%)", amount: GROSS * 0.062, color: "#2f6fb5", noteEn: "Counts toward retirement", noteEs: "Cuenta para tu jubilación" },
  { en: "Medicare tax", es: "Medicare (1.45%)", amount: GROSS * 0.0145, color: "#16917a", noteEn: "Health coverage at 65", noteEs: "Seguro médico a los 65" },
  { en: "Illinois income tax (4.95%)", es: "Impuesto de Illinois (4.95%)", amount: GROSS * 0.0495, color: "#d0683c", noteEn: "Flat rate, simplified", noteEs: "Tasa fija, simplificado" },
];
const NET = GROSS - LINES.reduce((a, l) => a + l.amount, 0);
const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export default function PaycheckInfographic() {
  return (
    <div className={d.infographic}>
      <div className={d.infoHead}>
        <p className={d.infoKicker}>Ejemplo / Example: pago quincenal de {usd(GROSS)} · {usd(GROSS)} every two weeks</p>
        <h4 className={d.infoTitle}>
          <span lang="es">¿A dónde va mi dinero?</span>
          <span className={d.infoTitleEn}>Where does my money go?</span>
        </h4>
      </div>

      <div className={d.stackBar} role="img" aria-label={`Of ${usd(GROSS)} gross pay, ${usd(NET)} is take-home pay; the rest goes to federal tax, Social Security, Medicare and Illinois tax.`}>
        <span style={{ flexGrow: NET, background: "#cfc5ec" }} />
        {LINES.map((l) => (
          <span key={l.en} style={{ flexGrow: l.amount, background: l.color }} />
        ))}
      </div>

      <ol className={d.infoList}>
        <li className={d.infoItem}>
          <span className={d.infoDot} style={{ background: "#cfc5ec" }} aria-hidden="true" />
          <span className={d.infoText}>
            <strong lang="es">Pago neto (lo que recibes)</strong>
            <span>Take-home pay</span>
          </span>
          <span className={d.infoAmount}>{usd(NET)}</span>
        </li>
        {LINES.map((l) => (
          <li key={l.en} className={d.infoItem}>
            <span className={d.infoDot} style={{ background: l.color }} aria-hidden="true" />
            <span className={d.infoText}>
              <strong lang="es">{l.es}</strong>
              <span>{l.en}</span>
              <small>
                <span lang="es">{l.noteEs}</span> · {l.noteEn}
              </small>
            </span>
            <span className={d.infoAmount}>−{usd(l.amount)}</span>
          </li>
        ))}
      </ol>

      <div className={d.infoTips}>
        <div>
          <strong lang="es">Consejo</strong>
          <p lang="es">Guarda tu último talón de pago del año. Te ayuda a revisar tu formulario W-2 en enero.</p>
        </div>
        <div>
          <strong>Tip</strong>
          <p>Keep your last pay stub of the year. It helps you check your W-2 in January.</p>
        </div>
      </div>
      <p className={d.note}>
        Simplified example for teaching. Real withholding depends on your W-4, pre-tax benefits and the Illinois exemption
        allowance, which I left out to keep the numbers easy to follow.
      </p>
    </div>
  );
}
