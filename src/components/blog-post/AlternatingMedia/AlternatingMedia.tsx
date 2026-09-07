import styles from "./AlternatingMedia.module.css";

/**
 * The repeatable image/text row shared by all 4 post templates: a large
 * photo on one side, text on the other, alternating sides automatically by
 * `index` — so an admin can add as many of these as a post needs and they
 * will always read left/right/left/right without any per-item config.
 */
export function AlternatingMedia({
  image,
  index,
  children,
}: {
  image: { src: string; alt: string; caption?: string };
  index: number;
  children: React.ReactNode;
}): React.ReactElement {
  const onRight = index % 2 === 1;

  return (
    <div className={`${styles.row} ${onRight ? styles.reversed : ""}`}>
      <figure className={styles.media}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image.src} alt={image.alt} />
        {image.caption && <figcaption>{image.caption}</figcaption>}
      </figure>
      <div className={styles.text}>{children}</div>
    </div>
  );
}
