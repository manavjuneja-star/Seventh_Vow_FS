import type { Weather } from "@/lib/destinations";

import styles from "./WeatherDiagram.module.css";

const VIEW_W = 720;
const VIEW_H = 220;
const PAD_X = 16;
const PAD_TOP = 18;
const PAD_BOTTOM = 34;

/** Builds a smooth-ish path through the month points using quadratic midpoints. */
function smoothPath(points: Array<{ x: number; y: number }>): string {
  if (points.length === 0) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const midX = (a.x + b.x) / 2;
    d += ` Q ${a.x} ${a.y} ${midX} ${(a.y + b.y) / 2}`;
  }
  const last = points[points.length - 1];
  d += ` T ${last.x} ${last.y}`;
  return d;
}

/**
 * A small, hand-drawn-feeling climate chart: a warm gold temperature line
 * over a soft rainfall silhouette, with the recommended wedding window called
 * out as a shaded band. Not a generic dashboard chart — no axes, gridlines
 * or legends, just the shape of the year.
 */
export function WeatherDiagram({ weather }: { weather: Weather }): React.ReactElement {
  const { months } = weather;
  const plotW = VIEW_W - PAD_X * 2;
  const plotH = VIEW_H - PAD_TOP - PAD_BOTTOM;

  const temps = months.map((m) => m.tempC);
  const minT = Math.min(...temps) - 3;
  const maxT = Math.max(...temps) + 3;

  const points = months.map((m, i) => {
    const x = PAD_X + (i / (months.length - 1)) * plotW;
    const y = PAD_TOP + plotH - ((m.tempC - minT) / (maxT - minT)) * plotH;
    return { x, y, m };
  });

  const linePath = smoothPath(points);
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${PAD_TOP + plotH} L ${points[0].x} ${PAD_TOP + plotH} Z`;

  const maxRain = Math.max(...months.map((m) => m.rain), 1);

  return (
    <div className={styles.wrap}>
      <svg
        className={styles.svg}
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`wd-fill`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--gold-light)" stopOpacity="0.32" />
            <stop offset="100%" stopColor="var(--gold-light)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {months.map((m, i) => {
          const barW = plotW / months.length;
          const x = PAD_X + i * barW;
          const h = (m.rain / maxRain) * (plotH * 0.5);
          return (
            <rect
              key={m.month}
              x={x + barW * 0.22}
              y={PAD_TOP + plotH - h}
              width={barW * 0.56}
              height={h}
              rx="3"
              className={styles.rainBar}
            />
          );
        })}

        <path d={areaPath} fill="url(#wd-fill)" />
        <path d={linePath} className={styles.tempLine} fill="none" />

        {points.map(({ x, y, m }) => (
          <circle key={m.month} cx={x} cy={y} r="3.4" className={styles.dot} />
        ))}
      </svg>

      <div className={styles.labels}>
        {months.map((m) => (
          <span key={m.month} className={styles.label}>
            {m.month}
          </span>
        ))}
      </div>
    </div>
  );
}
