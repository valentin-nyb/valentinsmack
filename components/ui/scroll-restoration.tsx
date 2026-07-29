"use client";

import { useEffect } from "react";

// Browsers restore the previous scroll offset on refresh by default,
// which on this page can land you near the bottom instead of the top.
// Force every load to start fresh.
export function ScrollRestoration() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // Instant, not the page's global smooth-scroll behavior — an
    // animated scroll here can fight with the user's own scroll input
    // right as the page loads, making it feel stuck.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return null;
}
