import styles from "./ContactDetails.module.css";

type Method = {
  label: string;
  value: string;
  meta: string;
  href?: string;
  icon: React.ReactElement;
  whatsapp?: boolean;
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

/** WhatsApp glyph — filled, not stroke, so it reads instantly as the brand mark. */
function WhatsAppBadge(): React.ReactElement {
  return (
    <svg
      className={styles.whatsappBadge}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.02 2.5c-5.26 0-9.53 4.26-9.53 9.52 0 1.68.44 3.3 1.28 4.74L2.5 21.5l4.86-1.24a9.5 9.5 0 0 0 4.66 1.22h.01c5.26 0 9.53-4.27 9.53-9.53 0-2.55-1-4.94-2.79-6.74a9.47 9.47 0 0 0-6.75-2.71Zm0 17.44h-.01a7.9 7.9 0 0 1-4.03-1.1l-.29-.17-3 .78.8-2.92-.19-.3a7.9 7.9 0 0 1-1.21-4.2c0-4.37 3.56-7.93 7.94-7.93 2.12 0 4.11.83 5.61 2.33a7.87 7.87 0 0 1 2.32 5.61c0 4.37-3.56 7.9-7.94 7.9Zm4.34-5.94c-.24-.12-1.41-.7-1.63-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.17-.7-.63-1.18-1.4-1.31-1.64-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.41-.58 1.61-1.13.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

const METHODS: Method[] = [
  {
    label: "Write to us",
    value: "info@theseventhvowweddings.com",
    meta: "The easiest way to begin the conversation. Every enquiry is personally read by our planning team.",
    href: "mailto:info@theseventhvowweddings.com",
    icon: ENVELOPE,
  },
  {
    label: "Call or WhatsApp",
    value: "+91 83840 81013",
    meta: "Reach us by phone or WhatsApp to start a conversation about your celebration.",
    href: "https://wa.me/918384081013",
    icon: PHONE,
    whatsapp: true,
  },
  {
    label: "Our Office",
    value: "New Delhi, India",
    meta: "Come by, sit with us, and tell us about your celebration. Visits are by appointment — simply get in touch and we’ll arrange a time for you.",
    icon: PIN,
  },
];

function MethodRow({
  label,
  value,
  meta,
  href,
  icon,
  whatsapp,
}: Method): React.ReactElement {
  const heading = href ? (
    <a href={href} className={styles.methodValue}>
      {value}
      {whatsapp && (
        <span className={styles.whatsappHint} title="Also reachable on WhatsApp">
          <WhatsAppBadge />
        </span>
      )}
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
      <span className={styles.eyebrow}>The Seventh Vow Weddings</span>

      <h2 className={styles.heading}>
        A real planner behind every detail
      </h2>

      <p className={styles.intro}>
        We are a wedding planning company in New Delhi, taking a hands-on
        approach to every celebration we undertake. The planner you speak to
        is closely involved in understanding your vision, shaping the plan,
        coordinating the details and making sure everything comes together
        when it matters most.
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
