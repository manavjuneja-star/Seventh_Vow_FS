import styles from "./EnquiryModal.module.css";

const EVENT_TYPES = [
  "Wedding",
  "Engagement",
  "Sangeet / Mehndi",
  "Reception",
  "Anniversary",
  "Other celebration",
];

const TIMELINES = [
  "Within 3 months",
  "3 – 6 months",
  "6 – 12 months",
  "More than a year away",
  "Date not decided",
];

const BUDGETS = [
  "Under ₹25 lakh",
  "₹25 – 50 lakh",
  "₹50 lakh – 1 crore",
  "Above ₹1 crore",
  "Not decided yet",
];

const LEAF = "M0 0 C4 -6 12 -8 19 -5 C14 2 5 5 0 0 Z";
const LEAVES = [
  "translate(9 11.4) rotate(-72) scale(.28)",
  "translate(9 11.4) rotate(38) scale(.28)",
  "translate(19 9.6) rotate(-80) scale(.3)",
  "translate(19 9.6) rotate(30) scale(.3)",
  "translate(29 6.6) rotate(-88) scale(.28)",
  "translate(29 6.6) rotate(22) scale(.28)",
  "translate(38.5 3.2) rotate(-40) scale(.22)",
];

function DividerTop(): React.ReactElement {
  return (
    <div className={`${styles.divider} ${styles.dividerTop}`}>
      <span className={styles.dividerDot} />
      <span className={styles.dividerLine} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/monogram-mark.png"
        alt=""
        className={styles.dividerMonogram}
      />
      <span className={styles.dividerLine} />
      <span className={styles.dividerDot} />
    </div>
  );
}

function DividerBottom(): React.ReactElement {
  return (
    <div className={`${styles.divider} ${styles.dividerBottom}`}>
      <span className={styles.dividerDot} />
      <span className={styles.dividerLine} />
      <svg viewBox="0 0 44 14" className={styles.dividerSprig}>
        <path
          d="M2 11 C12 12 24 8 42 2"
          fill="none"
          stroke="#C48674"
          strokeWidth="1"
          strokeLinecap="round"
        />
        {LEAVES.map((t) => (
          <g key={t} transform={t}>
            <path d={LEAF} fill="#D9A794" />
          </g>
        ))}
      </svg>
      <span className={styles.dividerLine} />
      <span className={styles.dividerDot} />
    </div>
  );
}

function SelectField({
  label,
  options,
}: {
  label: string;
  options: string[];
}): React.ReactElement {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <select className={styles.select}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

/** The enquiry overlay: a bordered card that unrolls between two sprig rules. */
export function EnquiryModal(): React.ReactElement {
  return (
    <div data-enquiry="1" className={styles.overlay}>
      <div className={styles.dialog}>
        <DividerTop />
        <div data-scroll-body="1" className={styles.body}>
          <div data-scroll-inner="1" className={styles.inner}>
            <div className={styles.head}>
              <div>
                <span className={styles.kicker}>Enquiry</span>
                <h2 className={styles.headTitle}>
                  Tell us about your celebration
                </h2>
              </div>
              <button
                data-enquiry-close="1"
                aria-label="Close"
                className={styles.close}
              >
                ×
              </button>
            </div>

            <form data-enquiry-form="1" className={styles.form}>
              <label className={styles.field}>
                <span className={styles.label}>Your name</span>
                <input
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Aranya & Kabir"
                  className={styles.input}
                />
              </label>
              <label className={styles.field}>
                <span className={styles.label}>Phone</span>
                <input
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="+91 98XXX XXXXX"
                  className={styles.input}
                />
              </label>
              <label className={styles.field}>
                <span className={styles.label}>Email</span>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@email.com"
                  className={styles.input}
                />
              </label>
              <SelectField label="Event type" options={EVENT_TYPES} />
              <SelectField label="Event timeline" options={TIMELINES} />
              <SelectField label="Budget (INR)" options={BUDGETS} />
              <label className={styles.field}>
                <span className={styles.label}>Guest count</span>
                <input
                  type="number"
                  placeholder="250"
                  className={styles.input}
                />
              </label>
              <label className={styles.field}>
                <span className={styles.label}>Preferred location</span>
                <input
                  type="text"
                  placeholder="Udaipur, or open to suggestions"
                  className={styles.input}
                />
              </label>
              <label className={`${styles.field} ${styles.fieldWide}`}>
                <span className={styles.label}>Anything we should know</span>
                <textarea
                  rows={3}
                  placeholder="How you met, what you are imagining, what you would rather avoid. If you budget in another currency, tell us here."
                  className={styles.textarea}
                />
              </label>
              <label className={styles.honeypot} aria-hidden="true">
                Leave this empty
                <input
                  type="text"
                  data-honeypot="1"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
              <div data-form-foot="1" className={styles.foot}>
                <span className={styles.footNote}>
                  We read every enquiry ourselves and write back within two
                  working days.
                </span>
                <button type="submit" className={styles.submit}>
                  Send Enquiry
                </button>
              </div>
            </form>

            <div data-enquiry-thanks="1" className={styles.thanks}>
              <span className={styles.thanksScript}>Thank you</span>
              <p className={styles.thanksBody}>
                Your note is with the studio. We will write back within two
                working days.
              </p>
            </div>
          </div>
        </div>
        <DividerBottom />
      </div>
    </div>
  );
}
