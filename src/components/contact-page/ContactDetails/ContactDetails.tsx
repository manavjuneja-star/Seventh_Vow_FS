import styles from "./ContactDetails.module.css";

type Method = {
  label: string;
  value: string;
  meta: string;
  href?: string;
  icon: React.ReactElement;
};

const ENVELOPE = (
  <path d="M2 5h20v14H2z M2 5l10 8 10-8" />
);
const PHONE = (
  <path d="M6 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 4 5a2 2 0 0 1 2-2Z" />
);
const PIN = (
  <path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12Z M12 10.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
);
const CALENDAR = (
  <path d="M4 6h16v15H4z M4 10h16 M9 3v4 M15 3v4" />
);

const METHODS: Method[] = [
  {
    label: "Write to us",
    value: "hello@theseventhvow.com",
    meta: "The surest way to reach the studio. We read every note ourselves.",
    href: "mailto:hello@theseventhvow.com",
    icon: ENVELOPE,
  },
  {
    label: "Call or WhatsApp",
    value: "+91 98XXX XXXXX",
    meta: "Monday to Saturday, 10am – 7pm IST. A message is fine after hours.",
    href: "https://wa.me/919800000000",
    icon: PHONE,
  },
  {
    label: "The studio",
    value: "New Delhi, India",
    meta: "Visits are by appointment — tell us you would like to come by and we will find a time.",
    icon: PIN,
  },
];

function MethodRow({ label, value, meta, href, icon }: Method): React.ReactElement {
  const heading = href ? (
    <a href={href} className={styles.methodValue}>
      {value}
    </a>
  ) : (
    <span className={styles.methodValue}>{value}</span>
  );
  return (
    <li className={styles.method}>
      <svg
        className={styles.methodIcon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {icon}
      </svg>
      <div>
        <span className={styles.methodLabel}>{label}</span>
        {heading}
        <p className={styles.methodMeta}>{meta}</p>
      </div>
    </li>
  );
}

/** Left column of the contact page: who you are reaching and how. */
export function ContactDetails(): React.ReactElement {
  return (
    <div data-reveal="0" className={styles.wrap}>
      <span className={styles.eyebrow}>The Seventh Vow</span>
      <h2 className={styles.heading}>
        A real planner on the other end, from the first word
      </h2>
      <p className={styles.intro}>
        We are a bespoke wedding design house in New Delhi, taking on a
        deliberately limited number of celebrations each year so every one has
        our full attention. The planner who writes back is the one who will lead
        your wedding — from the first sketch to the last farewell.
      </p>

      <span className={styles.rule} />

      <ul className={styles.methods}>
        {METHODS.map((m) => (
          <MethodRow key={m.label} {...m} />
        ))}
      </ul>
    </div>
  );
}
