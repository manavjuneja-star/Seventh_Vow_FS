"use client";

import { useCallback, useEffect, useState } from "react";

import type { PortfolioPhoto } from "@/lib/portfolio";

import styles from "./PortfolioGallery.module.css";

/** Intrinsic sizes of the six stock placeholders, so the masonry can reserve
 *  space before they load. The client's real photos carry their own
 *  `width`/`height` and don't need this. */
const STOCK_DIMS: Record<string, [number, number]> = {
  "/images/banquet.webp": [1400, 2097],
  "/images/bouquet.webp": [1400, 934],
  "/images/cake.webp": [1200, 1800],
  "/images/gazebo.webp": [1400, 2100],
  "/images/mandap.webp": [1400, 1050],
  "/images/vows.webp": [1400, 933],
};

function Frame({
  photo,
  index,
  onOpen,
}: {
  photo: PortfolioPhoto;
  index: number;
  onOpen: (index: number) => void;
}): React.ReactElement {
  const reversed = index % 2 === 1;
  const [w, h] = STOCK_DIMS[photo.src] ?? [3, 2];
  return (
    <figure
      data-reveal={String((index % 5) * 0.04)}
      className={`${styles.frame} ${reversed ? styles.reversed : ""}`}
    >
      <button
        type="button"
        className={styles.frameButton}
        onClick={() => onOpen(index)}
        aria-label={`View photo ${index + 1} larger`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src}
          alt={photo.alt}
          width={photo.width ?? w}
          height={photo.height ?? h}
          loading={index < 2 ? "eager" : "lazy"}
        />
      </button>
    </figure>
  );
}

function Lightbox({
  photos,
  index,
  onClose,
  onStep,
}: {
  photos: PortfolioPhoto[];
  index: number;
  onClose: () => void;
  onStep: (delta: number) => void;
}): React.ReactElement {
  const photo = photos[index];

  return (
    <div
      className={styles.lightbox}
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      onClick={onClose}
    >
      <button
        type="button"
        className={styles.close}
        onClick={onClose}
        aria-label="Close"
      >
        ✕
      </button>

      <button
        type="button"
        className={`${styles.arrow} ${styles.prev}`}
        onClick={(e) => {
          e.stopPropagation();
          onStep(-1);
        }}
        aria-label="Previous photo"
      >
        ‹
      </button>

      <figure className={styles.stage} onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo.src} alt={photo.alt} />
      </figure>

      <button
        type="button"
        className={`${styles.arrow} ${styles.next}`}
        onClick={(e) => {
          e.stopPropagation();
          onStep(1);
        }}
        aria-label="Next photo"
      >
        ›
      </button>

      <span className={styles.counter}>
        {index + 1} / {photos.length}
      </span>
    </div>
  );
}

/** The couple's gallery — a masonry-style grid. Each portfolio passes its own
 *  photo order and sizes, so no two pages read the same. Clicking a photo opens
 *  a lightbox with prev/next navigation that shows every image in full,
 *  whatever its orientation. */
export function PortfolioGallery({
  photos,
}: {
  photos: PortfolioPhoto[];
}): React.ReactElement {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (delta: number) => {
      setOpen((current) =>
        current === null
          ? current
          : (current + delta + photos.length) % photos.length,
      );
    },
    [photos.length],
  );

  useEffect(() => {
    if (open === null) return undefined;

    document.documentElement.classList.add("sv-scroll-lock");
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.documentElement.classList.remove("sv-scroll-lock");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {photos.map((photo, i) => (
          <Frame key={`${photo.src}-${i}`} photo={photo} index={i} onOpen={setOpen} />
        ))}
      </div>

      {open !== null && (
        <Lightbox photos={photos} index={open} onClose={close} onStep={step} />
      )}
    </section>
  );
}
