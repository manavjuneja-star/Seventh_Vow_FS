"use client";

/**
 * Marks the intro veil as seen for the session and, on every render after the
 * first, sets `data-veil-seen` so CSS hides the veil before it can paint — this
 * covers client navigations back to the homepage (a `<script>` only runs on the
 * initial HTML parse). Rendering nothing, this stays in sync server/client.
 */
export function VeilGate(): null {
  if (typeof document !== "undefined") {
    try {
      if (sessionStorage.getItem("svVeilShown")) {
        document.documentElement.setAttribute("data-veil-seen", "");
      } else {
        sessionStorage.setItem("svVeilShown", "1");
      }
    } catch {
      /* private mode / storage disabled — just let the veil play */
    }
  }
  return null;
}
