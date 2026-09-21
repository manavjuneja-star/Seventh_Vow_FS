import styles from "./Scribbles.module.css";

/** Loose hand-drawn marginalia for the per-destination page's Why-Choose,
 *  Venues and Weather sections — the same sketched-hairline language as
 *  `service-page/Sprig`, just in small standalone pieces instead of one
 *  long vine. Everything is `stroke="currentColor"`; colour comes from CSS. */

/** A rough, never-quite-closed circle for lassoing a word or eyebrow tag. */
export function ScribbleCircle({ className }: { className?: string }): React.ReactElement {
  return (
    <svg
      className={`${styles.mark} ${className ?? ""}`}
      viewBox="0 0 220 90"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M40 66 C10 52 14 22 52 12 C102 -2 178 4 202 26 C222 45 202 66 156 74 C104 83 46 78 26 62" />
    </svg>
  );
}

/** A wavy, hand-inked underline — three uneven arcs, not a straight scan line. */
export function ScribbleUnderline({ className }: { className?: string }): React.ReactElement {
  return (
    <svg
      className={`${styles.mark} ${className ?? ""}`}
      viewBox="0 0 200 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 10 C34 2 46 16 76 8 C106 0 118 15 148 7 C168 2 182 9 196 6" />
    </svg>
  );
}

/** A small four-point sparkle, drawn slightly off-true on purpose. */
export function ScribbleStar({ className }: { className?: string }): React.ReactElement {
  return (
    <svg
      className={`${styles.mark} ${className ?? ""}`}
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 2 C21 14 20 17 34 19 C21 21 21 24 20 37 C18 24 18 21 5 19 C18 17 18 14 20 2Z" />
    </svg>
  );
}

/** A curved, hand-drawn arrow — used to gesture from a heading toward the
 *  content it introduces. */
export function ScribbleArrow({ className }: { className?: string }): React.ReactElement {
  return (
    <svg
      className={`${styles.mark} ${className ?? ""}`}
      viewBox="0 0 90 70"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 8 C34 6 66 20 70 48" />
      <path d="M52 42 C60 46 66 49 71 51 C69 44 68 37 67 29" />
    </svg>
  );
}

/** A small hand-drawn travel compass — a wobbly ring, four direction ticks
 *  and a needle pointing north — used to open the "Why choose {place}"
 *  section instead of a stray typographic bracket. Reads as "here's the
 *  case for choosing this direction," which a bare glyph never did. */
export function ScribbleCompass({ className }: { className?: string }): React.ReactElement {
  return (
    <svg
      className={`${styles.mark} ${className ?? ""}`}
      viewBox="0 0 60 60"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M30 6 C46 5 54 16 53 30 C52 45 42 54 28 53 C13 52 6 42 7 28 C8 15 17 7 30 6Z" />
      <path d="M30 3 L30 10" />
      <path d="M30 50 L30 57" />
      <path d="M3 30 L10 30" />
      <path d="M50 30 L57 29.5" />
      <path
        d="M30 15 L37 32 L30 28 L23 32Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path d="M30 28 L26 42 L30 38 L34 42Z" opacity="0.4" />
      <circle cx="30" cy="30" r="1.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** A tiny pair of crossed hairlines, like a hand-marked "x marks the spot". */
export function ScribbleAsterisk({ className }: { className?: string }): React.ReactElement {
  return (
    <svg
      className={`${styles.mark} ${className ?? ""}`}
      viewBox="0 0 30 30"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M15 3 L16 27" />
      <path d="M4 9 L25 21" />
      <path d="M25 9 L4 21" />
    </svg>
  );
}
