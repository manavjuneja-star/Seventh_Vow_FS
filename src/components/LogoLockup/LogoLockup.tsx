type LogoLockupProps = {
  className?: string;
  priority?: boolean;
  /** "color" — the full rose-gold lockup for light grounds.
   *  "ivory" — a white knockout of the same art, for dark grounds. */
  variant?: "color" | "ivory";
};

/**
 * The full Seventh Vow Weddings lockup — the monogram over the wordmark, "The",
 * "Seventh Vow" and the "Weddings" script, with the divider ornaments. Shipped
 * as transparent PNGs in `public/images/` (1500x1089). Client-mandated art —
 * never recoloured beyond the supplied colour / ivory-knockout pair.
 */
export function LogoLockup({
  className,
  priority,
  variant = "color",
}: LogoLockupProps): React.ReactElement {
  const src =
    variant === "ivory"
      ? "/images/logo-lockup-ivory.png"
      : "/images/logo-lockup.png";
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="The Seventh Vow Weddings"
      width={1500}
      height={1089}
      className={className}
      loading={priority ? "eager" : "lazy"}
    />
  );
}
