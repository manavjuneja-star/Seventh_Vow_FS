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
 * The effect locks page scroll while the veil plays, releasing when its
 * fade-out animation ends. Whether to proceed is captured **once**, in a ref,
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

    // A `!important` class (globals.css) locking both `html` and `body` —
    // `html` carries its own `overflow-x` rule, which can make it, not
    // `body`, the browser's effective scrolling root, and `!important` means
    // no other inline-style writer on the page can quietly re-enable scroll.
    document.documentElement.classList.add("sv-veil-lock");
    window.scrollTo(0, 0);

    const release = (): void => {
      document.documentElement.classList.remove("sv-veil-lock");
    };
    veil.addEventListener("animationend", release, { once: true });
    const fallback = window.setTimeout(release, 6000);

    return () => {
      veil.removeEventListener("animationend", release);
      window.clearTimeout(fallback);
      release();
    };
  }, []);

  return null;
}
