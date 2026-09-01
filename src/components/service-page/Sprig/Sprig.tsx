import styles from "./Sprig.module.css";

/** A tall, loose freehand botanical vine used as a margin sketch. Two
 *  compositions, picked by `variant`. Everything is drawn in one hairline
 *  weight with a deliberately uneven, sketched hand. */

type Mark = { x: number; y: number; r: number; kind: "leaf" | "bloom" };

const VINE_A =
  "M92 -20 C68 60 116 130 86 214 C60 286 108 356 82 442 C60 520 104 586 80 672 C64 742 96 802 78 900";
const VINE_B =
  "M70 -20 C104 70 56 150 92 236 C120 306 72 380 96 470 C116 548 70 620 94 706 C110 772 78 828 96 900";

const MARKS_A: Mark[] = [
  { x: 96, y: 70, r: 30, kind: "leaf" },
  { x: 74, y: 150, r: -46, kind: "leaf" },
  { x: 104, y: 232, r: 24, kind: "bloom" },
  { x: 70, y: 330, r: -38, kind: "leaf" },
  { x: 100, y: 430, r: 30, kind: "leaf" },
  { x: 74, y: 520, r: -22, kind: "bloom" },
  { x: 98, y: 628, r: 34, kind: "leaf" },
  { x: 76, y: 730, r: -40, kind: "leaf" },
  { x: 92, y: 820, r: 18, kind: "bloom" },
];

const MARKS_B: Mark[] = [
  { x: 80, y: 60, r: -28, kind: "leaf" },
  { x: 100, y: 150, r: 40, kind: "bloom" },
  { x: 72, y: 250, r: -34, kind: "leaf" },
  { x: 98, y: 356, r: 26, kind: "leaf" },
  { x: 74, y: 452, r: -30, kind: "bloom" },
  { x: 100, y: 556, r: 38, kind: "leaf" },
  { x: 72, y: 660, r: -26, kind: "leaf" },
  { x: 96, y: 760, r: 30, kind: "bloom" },
  { x: 78, y: 852, r: -36, kind: "leaf" },
];

const LEAF = "M0 0 C-7 -9 -5 -26 2 -34 C6 -24 8 -8 0 0Z";
const PETAL = "M0 0 C-8 -6 -9 -19 -1 -23 C6 -19 7 -6 0 0";

function Leaf({ x, y, r }: { x: number; y: number; r: number }): React.ReactElement {
  return <path d={LEAF} transform={`translate(${x} ${y}) rotate(${r})`} />;
}

function Bloom({ x, y, r }: { x: number; y: number; r: number }): React.ReactElement {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      {[0, 70, 145, 215, 290].map((a) => (
        <path key={a} d={PETAL} transform={`rotate(${a})`} />
      ))}
      <path d="M-2 1 C0 -3 3 -2 2 2" />
    </g>
  );
}

function drawMark(m: Mark, i: number): React.ReactElement {
  if (m.kind === "leaf") {
    return <Leaf key={i} x={m.x} y={m.y} r={m.r} />;
  }
  return <Bloom key={i} x={m.x} y={m.y} r={m.r} />;
}

type SprigProps = { variant: number; className?: string };

export function Sprig({ variant, className }: SprigProps): React.ReactElement {
  const useB = variant % 2 === 1;
  const stem = useB ? VINE_B : VINE_A;
  const marks = useB ? MARKS_B : MARKS_A;
  return (
    <svg
      className={`${styles.sprig} ${className ?? ""}`}
      viewBox="0 0 170 880"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={stem} opacity="0.9" />
      <path d={stem} transform="translate(2.5 1.5)" opacity="0.35" />
      <g>{marks.map(drawMark)}</g>
    </svg>
  );
}
