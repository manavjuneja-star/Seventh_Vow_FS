import styles from "./NextSteps.module.css";

const STEPS = [
  {
    n: "I",
    title: "You send a note",
    body: "The form here, an email, or a WhatsApp message. A sentence or two is plenty to begin.",
  },
  {
    n: "II",
    title: "We write back",
    body: "Within two working days, from the planner who would lead your wedding — never a template.",
  },
  {
    n: "III",
    title: "We meet",
    body: "In the studio over chai, or a video call if you are planning from abroad. No fee, no obligation.",
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
