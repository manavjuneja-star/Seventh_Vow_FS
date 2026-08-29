"use client";

import { useEffect } from "react";

import { initSupport } from "@/lib/support";

/**
 * Mounts the landing-page behaviour once the DOM is present. `initSupport`
 * guards against a second run, so a Strict Mode remount is a no-op and the
 * listeners it wires live for the lifetime of the page.
 */
export function SupportScripts(): null {
  useEffect(() => {
    initSupport();
  }, []);
  return null;
}
