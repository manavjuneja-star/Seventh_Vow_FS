import styles from "./GuestBook.module.css";

type Review = { quote: string; name: string; meta: string };

const REVIEWS: Review[] = [
  {
    quote:
      "They didn't just plan our wedding. They translated who we are into a place, a feeling, a weekend our families still talk about.",
    name: "Meher & Dev",
    meta: "Couple / Goa",
  },
  {
    quote:
      "We handed over a folder of half-ideas and got back a weekend that felt like it had always existed.",
    name: "Ira & Rohan",
    meta: "Couple / Jaisalmer",
  },
  {
    quote:
      "Four hundred guests, three cities, one timeline. Nothing slipped, and nobody saw the work.",
    name: "Naina & Arjun",
    meta: "Couple / Tuscany",
  },
  {
    quote:
      "I flew in for two days and never once had to ask where to be. Somebody had already thought of it.",
    name: "Sana Kapadia",
    meta: "Guest / Goa",
  },
  {
    quote:
      "They said no to us twice. Both times they were right, and the day was better for it.",
    name: "Aranya & Kabir",
    meta: "Couple / Udaipur",
  },
  {
    quote:
      "My daughter cried at the mandap. So did I, at the flowers, if I am honest.",
    name: "Rekha Menon",
    meta: "Mother of the bride",
  },
  {
    quote:
      "The music, the light, the food all arrived in the same mood. That is rarer than it sounds.",
    name: "Dev Mathur",
    meta: "Guest / Goa",
  },
];

/** The guest book: a torn-edge paper card with a review carousel. */
export function GuestBook(): React.ReactElement {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div data-reveal="0" className={styles.head}>
          <span className={styles.eyebrow}>The Guest Book</span>
        </div>

        <div data-reveal="0" className={styles.paper}>
          <span className={styles.quoteMark}>&ldquo;</span>
          <div data-carousel="1" className={styles.carousel}>
            <button
              data-arrow="-1"
              aria-label="Previous review"
              className={`${styles.arrow} ${styles.arrowPrev}`}
            >
              ←
            </button>
            <div data-viewport="1" className={styles.viewport}>
              <div data-track="1" className={styles.track}>
                {REVIEWS.map((r) => (
                  <div key={r.name} className={styles.slide}>
                    <blockquote className={styles.quote}>{r.quote}</blockquote>
                    <div className={styles.byline}>
                      <span className={styles.name}>{r.name}</span>
                      <span className={styles.meta}>{r.meta}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              data-arrow="1"
              aria-label="Next review"
              className={`${styles.arrow} ${styles.arrowNext}`}
            >
              →
            </button>
          </div>
          <div className={styles.dots}>
            {REVIEWS.map((r, i) => (
              <button
                key={r.name}
                data-dot={i}
                aria-label={`Review ${i + 1}`}
                className={styles.dot}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
