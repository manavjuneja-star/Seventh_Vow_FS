type LogoLockupProps = {
  className?: string;
  priority?: boolean;
};

/**
 * The full Seventh Vow Weddings lockup — the monogram over the wordmark, "The",
 * "Seventh Vow" and the "Weddings" script, with the divider ornaments. Shipped
 * as a transparent PNG (`public/images/logo-lockup.png`, 1500x1089). Used at the
 * hero and on the intro loading screen.
 */
export function LogoLockup({
  className,
  priority,
}: LogoLockupProps): React.ReactElement {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/logo-lockup.png"
      alt="The Seventh Vow Weddings"
      width={1500}
      height={1089}
      className={className}
      loading={priority ? "eager" : "lazy"}
    />
  );
}
