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
 * as transparent PNGs in `public/images/` (1180x857). Client-mandated art —
 * never recoloured beyond the supplied colour / ivory-knockout pair.
 */
export function LogoLockup({
  className,
  priority,
  variant = "color",
}: LogoLockupProps): React.ReactElement {
  const src =
    variant === "ivory"
      ? "/images/logo-lockup-ivory.webp"
      : "/images/logo-lockup.webp";
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="The Seventh Vow Weddings"
      width={1180}
      height={857}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding={priority ? "sync" : "async"}
    />
  );
}
