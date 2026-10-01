import styles from "./NextSteps.module.css";

const STEPS = [
  {
    n: "I",
    title: "Tell us your plans",
    body: "Share whatever you have in mind — a date, a destination, a guest list, or simply the kind of celebration you’re dreaming about. You don’t need to have it all figured out.",
  },
  {
    n: "II",
    title: "Let’s talk",
    body: "A planner from our team will personally reach out within two working days. We’ll listen, understand your plans and answer any questions you may have.",
  },
  {
    n: "III",
    title: "Let’s meet",
    body: "Once we know a little more about your celebration, we’ll set up a conversation — over chai at our office or on a video call, wherever you are. No pressure, no obligation. Just a chance to get to know each other.",
  },
];

/** "What happens next" — the three steps after the form is sent. */
export function NextSteps(): React.ReactElement {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div data-reveal="0" className={styles.head}>
          <span className={styles.eyebrow}>After you hit send</span>
          <h2 className={styles.heading}>What happens next</h2>
        </div>

        <ol data-reveal=".1" className={styles.grid}>
          {STEPS.map((s) => (
            <li key={s.n} className={styles.step}>
              <span className={styles.num}>{s.n}</span>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepBody}>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
