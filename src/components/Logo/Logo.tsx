type LogoProps = {
  className?: string;
  priority?: boolean;
};

/**
 * The Seventh Vow monogram — a rose-gold "7V" inside a broken gold ring with a
 * laurel sprig. Shipped as a trimmed PNG (`public/images/monogram.webp`,
 * 900x824). Decorative everywhere it appears, so the alt text is empty.
 */
export function Logo({ className, priority }: LogoProps): React.ReactElement {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/monogram.webp"
      alt=""
      width={900}
      height={824}
      className={className}
      loading={priority ? "eager" : "lazy"}
    />
  );
}
