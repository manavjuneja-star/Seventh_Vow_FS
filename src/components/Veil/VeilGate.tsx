"use client";

import { useEffect } from "react";

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
 * navigations back to the homepage). The session flag is written in an effect,
 * not during render — writing it during render made React's double-invoke mark
 * the veil as seen on the very first load, so it never played.
 *
 * The effect also locks page scroll while the veil plays, releasing when its
 * fade-out animation ends.
 */
export function VeilGate(): null {
  if (typeof document !== "undefined" && veilSeen()) {
    document.documentElement.setAttribute("data-veil-seen", "");
  }

  useEffect(() => {
    const veil = document.querySelector("[data-veil]");
    if (veilSeen() || veil === null) return undefined;

    try {
      sessionStorage.setItem("svVeilShown", "1");
    } catch {
      /* private mode — the veil still plays, just every load */
    }

    const restore = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const release = (): void => {
      document.body.style.overflow = restore;
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
