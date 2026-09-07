"use client";

import { useEffect, useRef } from "react";

function veilSeen(): boolean {
  try {
    return sessionStorage.getItem("svVeilShown") === "1";
  } catch {
    return false;
  }
}

/**
 * Gates the intro veil.
 *
 * Render only *reads* session state: if the veil has already played this
 * session, `data-veil-seen` is set so CSS hides it before paint (covers client
 * navigations back to the homepage).
 *
 * The effect hides the page and locks scroll while the veil plays — revealing
 * the page when the veil *starts* fading, releasing scroll when it *ends*.
 * Whether to proceed is captured **once**, in a ref,
 * before anything is written — not re-read live from `sessionStorage` inside
 * the effect. React 18 Strict Mode runs this effect twice in dev
 * (effect → cleanup → effect) on the same mount; if the bail-out check reads
 * `sessionStorage` live, the *first* invocation's own write makes the
 * *second* invocation think the veil was already seen, so it bails out —
 * and since the first invocation's cleanup already tore the lock down, the
 * lock never gets set back up. The lock still visually "plays" (the veil is
 * pure CSS animation, unaffected by the remount) but scroll was never
 * actually disabled. A ref captured once is immune to that self-inflicted
 * race: both invocations see the same answer, so the second one correctly
 * re-establishes the lock the first one's cleanup removed.
 */
export function VeilGate(): null {
  if (typeof document !== "undefined" && veilSeen()) {
    document.documentElement.setAttribute("data-veil-seen", "");
  }

  const alreadySeenRef = useRef<boolean | null>(null);
  if (alreadySeenRef.current === null) {
    alreadySeenRef.current = veilSeen();
  }

  useEffect(() => {
    const veil = document.querySelector("[data-veil]");
    if (alreadySeenRef.current || veil === null) return undefined;

    try {
      sessionStorage.setItem("svVeilShown", "1");
    } catch {
      /* private mode — the veil still plays, just every load */
    }

    const root = document.documentElement;
    // `sv-veil-lock` (globals.css, `!important`) locks scroll on html + body.
    // `sv-veil-active` hides everything behind the veil — normally added before
    // paint by the layout head script; added here too for the client-nav case
    // (navigating back to `/` where the head script has already run).
    root.classList.add("sv-veil-lock", "sv-veil-active");
    window.scrollTo(0, 0);

    // Reveal the page the moment the veil *starts* fading, so the crossfade
    // still reads; release the scroll lock when it *finishes*.
    const reveal = (): void => root.classList.remove("sv-veil-active");
    const release = (): void => root.classList.remove("sv-veil-lock");

    veil.addEventListener("animationstart", reveal, { once: true });
    veil.addEventListener("animationend", release, { once: true });
    const revealFallback = window.setTimeout(reveal, 3400);
    const releaseFallback = window.setTimeout(release, 6000);

    return () => {
      veil.removeEventListener("animationstart", reveal);
      veil.removeEventListener("animationend", release);
      window.clearTimeout(revealFallback);
      window.clearTimeout(releaseFallback);
      reveal();
      release();
    };
  }, []);

  return null;
}
