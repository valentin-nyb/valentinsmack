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
    window.scrollTo(0, 0);
  }, []);

  return null;
}
