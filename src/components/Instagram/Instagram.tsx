import styles from "./Instagram.module.css";

const PETAL_LEAF = "M12 2 C16 8 16 16 12 22 C8 16 8 8 12 2 Z";
const HANDLE = "https://www.instagram.com/theseventhvow_weddings";

type Post = { image: string; caption: string };

const POSTS: Post[] = [
  { image: "/images/gazebo.webp", caption: "Gazebo, first light" },
  { image: "/images/bouquet.webp", caption: "Bouquet study" },
  { image: "/images/banquet.webp", caption: "Banquet, Jaisalmer" },
  { image: "/images/cake.webp", caption: "Six tiers, one flower" },
  { image: "/images/mandap.webp", caption: "Mandap at dusk" },
  { image: "/images/vows.webp", caption: "Vows, Udaipur" },
];

function CameraIcon({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className={className}
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
    </svg>
  );
}

function PostTile({ image, caption }: Post, index: number) {
  return (
    <a
      key={caption}
      data-post="1"
      href={HANDLE}
      className={`${styles.post} ${index % 2 === 0 ? styles.postA : styles.postB}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt={caption} />
      <span data-post-veil="1" className={styles.postVeil} />
      <span data-post-cap="1" className={styles.postCap}>
        <CameraIcon className="" />
        {caption}
      </span>
    </a>
  );
}

/** "Follow along as it happens" — a six-up Instagram grid. */
export function Instagram(): React.ReactElement {
  return (
    <section className={styles.section}>
      <svg
        data-petal="1"
        className={styles.petal}
        viewBox="0 0 24 24"
        fill="none"
      >
        <path d={PETAL_LEAF} fill="#C9A25C" />
      </svg>

      <div className={styles.inner}>
        <div data-reveal="0" className={styles.head}>
          <div>
            <span className={styles.eyebrow}>From the studio</span>
            <h2 className={styles.heading}>
              Follow along <em>as it happens</em>
            </h2>
          </div>
          <a href={HANDLE} className={styles.handle}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              className={styles.handleIcon}
            >
              <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
              <circle cx="12" cy="12" r="4.2" />
              <circle
                cx="17.2"
                cy="6.8"
                r="1.1"
                fill="currentColor"
                stroke="none"
              />
            </svg>
            @theseventhvow_weddings
          </a>
        </div>

        <div data-insta-grid="1" data-reveal=".1" className={styles.grid}>
          {POSTS.map((p, i) => PostTile(p, i))}
        </div>

        <div data-reveal=".15" className={styles.more}>
          <a href={HANDLE} className={styles.moreLink}>
            Follow the studio <span className={styles.arrow}>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
