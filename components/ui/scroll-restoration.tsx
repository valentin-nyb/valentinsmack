"use client";

import { useEffect } from "react";

// Browsers (especially mobile Safari/Chrome) restore the previous scroll
// offset on refresh, which can land the page mid-way down instead of at
// the top. Force every load to start fresh, instantly (not the page's
// global scroll-behavior: smooth — an animated scroll here can fight
// with the user's own scroll input right as the page loads).
export function ScrollRestoration() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return null;
}
