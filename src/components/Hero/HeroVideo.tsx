"use client";

import { useEffect, useRef, useState } from "react";

const MOBILE_SRC = "/videos/grand-reel-mobile.mp4";
const DESKTOP_SRC = "/videos/grand-reel-desktop.mp4";
// Desktop only: a wide screen with a mouse. Phones and iPads (touch) keep the
// lighter portrait reel.
const DESKTOP_QUERY = "(min-width: 1100px) and (hover: hover) and (pointer: fine)";

/** Looping, muted background reel. Phones/iPads get the light mobile cut, large
 *  desktop screens get the 1080p60 cut. Mobile browsers pause background video
 *  on their own (low-power mode, tab switches, scrolling), so every pause the
 *  visitor didn't ask for is answered with a play(). */
export function HeroVideo({ className }: { className?: string }): React.ReactElement {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState(MOBILE_SRC);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const pick = (): void => setSrc(mq.matches ? DESKTOP_SRC : MOBILE_SRC);
    pick();
    mq.addEventListener("change", pick);
    return () => mq.removeEventListener("change", pick);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v) return undefined;
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
  }, [src]);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
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
