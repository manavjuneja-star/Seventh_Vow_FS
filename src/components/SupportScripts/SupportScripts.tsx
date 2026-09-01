"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { initOnce, initRoute } from "@/lib/support";

/**
 * Wires the landing-page behaviour. `initOnce` runs a single time for the
 * session (header, enquiry overlay — elements that live in the shared layout).
 * `initRoute` re-runs on every client navigation so a freshly-mounted page's
 * reveals, carousel, tilt and slideshows get wired.
 */
export function SupportScripts(): null {
  const pathname = usePathname();

  useEffect(() => {
    initOnce();
  }, []);

  useEffect(() => initRoute(), [pathname]);

  return null;
}
