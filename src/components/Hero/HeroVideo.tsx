"use client";

import { useEffect, useRef, useState } from "react";

const MOBILE_SRC = "/videos/grand-reel-mobile.mp4";
// Desktop only: a wide screen with a mouse. It shows the photo slideshow, so the
// video is not rendered (or downloaded) there; phones and iPads keep the reel.
const DESKTOP_QUERY = "(min-width: 1100px) and (hover: hover) and (pointer: fine)";

/** Looping, muted background reel for phones and iPads (desktop shows the photo
 *  slideshow instead, see Hero). Mobile browsers pause background video
 *  on their own (low-power mode, tab switches, scrolling), so every pause the
 *  visitor didn't ask for is answered with a play(). */
export function HeroVideo({ className }: { className?: string }): React.ReactElement | null {
  const ref = useRef<HTMLVideoElement>(null);
  // null until mounted, so a desktop visitor never starts the video download.
  const [show, setShow] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const pick = (): void => setShow(!mq.matches);
    pick();
    mq.addEventListener("change", pick);
    return () => mq.removeEventListener("change", pick);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!show || !v) return undefined;
    // React doesn't reliably set the muted *attribute*, and iOS refuses to
    // autoplay without it.
    v.muted = true;
    v.defaultMuted = true;

    const play = (): void => {
      if (document.hidden || !v.paused) return;
      void v.play().catch(() => undefined);
    };
    v.load();
    play();

    const events: Array<[EventTarget, string]> = [
      [v, "pause"],
      [v, "suspend"],
      [v, "stalled"],
      [v, "canplay"],
      [document, "visibilitychange"],
      [window, "pageshow"],
      [window, "focus"],
      [window, "touchstart"],
      [window, "scroll"],
    ];
    events.forEach(([t, e]) => t.addEventListener(e, play, { passive: true }));
    return () => events.forEach(([t, e]) => t.removeEventListener(e, play));
  }, [show]);

  if (!show) return null;

  return (
    <video
      ref={ref}
      className={className}
      src={MOBILE_SRC}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      aria-hidden="true"
    />
  );
}
