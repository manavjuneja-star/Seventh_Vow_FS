"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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

/** Columns for the current screen width, matching the breakpoints in the CSS. */
function useColumns(): number {
  const [columns, setColumns] = useState(3);
  useEffect(() => {
    const update = (): void => {
      setColumns(window.matchMedia("(max-width: 560px)").matches ? 1 : window.matchMedia("(max-width: 980px)").matches ? 2 : 3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return columns;
}

/** Photos in order, split into rows of `columns`. Within a row every photo shares one
 *  height (its width follows its shape), so nothing is cropped and the sequence reads
 *  strictly left to right, then top to bottom. */
function intoRows(photos: PortfolioPhoto[], columns: number): number[][] {
  const rows: number[][] = [];
  for (let i = 0; i < photos.length; i += columns) {
    rows.push(photos.slice(i, i + columns).map((_, k) => i + k));
  }
  return rows;
}

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
  const aspect = (photo.width ?? w) / (photo.height ?? h);
  return (
    <figure
      style={{ flex: `${aspect} 1 0` }}
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
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = (event: React.TouchEvent<HTMLElement>): void => {
    const touch = event.changedTouches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };
  const onTouchEnd = (event: React.TouchEvent<HTMLElement>): void => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY)) {
      onStep(deltaX < 0 ? 1 : -1);
    }
  };

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

      <figure
        className={styles.stage}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
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
  const columns = useColumns();
  const rows = intoRows(photos, columns);

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
        {rows.map((row, r) => (
          <div key={r} className={styles.row}>
            {row.map((i) => (
              <Frame key={`${photos[i].src}-${i}`} photo={photos[i]} index={i} onOpen={setOpen} />
            ))}
          </div>
        ))}
      </div>

      {open !== null && (
        <Lightbox photos={photos} index={open} onClose={close} onStep={step} />
      )}
    </section>
  );
}
