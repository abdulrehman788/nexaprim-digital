"use client";

import { useEffect } from "react";

/**
 * Backup recovery if inline layout script missed an edge case.
 */
export function DevChunkRecovery() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    const reloadKey = "nexaprime-dev-reload";

    const bustReload = () => {
      if (sessionStorage.getItem(reloadKey)) {
        return;
      }
      sessionStorage.setItem(reloadKey, "1");
      const url = new URL(window.location.href);
      url.searchParams.set("__dev", String(Date.now()));
      window.location.replace(url.toString());
    };

    const onResourceError = (event: Event) => {
      const target = event.target;
      const assetUrl =
        target instanceof HTMLScriptElement
          ? target.src
          : target instanceof HTMLLinkElement
            ? target.href
            : "";

      if (assetUrl.includes("/_next/static/") || assetUrl.includes("/_next/webpack")) {
        bustReload();
      }
    };

    window.addEventListener("error", onResourceError, true);

    return () => {
      window.removeEventListener("error", onResourceError, true);
    };
  }, []);

  return null;
}
