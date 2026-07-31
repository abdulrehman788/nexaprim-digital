"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const SESSION_KEY = "np_analytics_sid";
const HEARTBEAT_MS = 25_000;

function getOrCreateSessionId(): string {
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `sid_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    return `sid_${Date.now()}`;
  }
}

function postBeacon(url: string, body: Record<string, unknown>) {
  const payload = JSON.stringify(body);
  if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
    const blob = new Blob([payload], { type: "application/json" });
    if (navigator.sendBeacon(url, blob)) return;
  }
  void fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => undefined);
}

/** Lightweight page-view + live-visitor heartbeat for the marketing site. */
export function SiteTracker() {
  const pathname = usePathname();
  const sessionIdRef = useRef<string>("");

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;

    sessionIdRef.current = getOrCreateSessionId();
    const pageUrl = window.location.pathname + window.location.search;

    postBeacon("/api/analytics/track", {
      sessionId: sessionIdRef.current,
      pageUrl,
      referrer: document.referrer || null,
    });

    const tick = () => {
      postBeacon("/api/analytics/heartbeat", {
        sessionId: sessionIdRef.current,
        pageUrl: window.location.pathname + window.location.search,
      });
    };

    const interval = window.setInterval(tick, HEARTBEAT_MS);
    const onVisibility = () => {
      if (document.visibilityState === "visible") tick();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [pathname]);

  return null;
}

export function trackFormFunnel(
  formName: string,
  event: "viewed" | "started" | "submitted",
) {
  try {
    const sessionId = sessionStorage.getItem(SESSION_KEY);
    postBeacon("/api/analytics/funnel", {
      formName,
      event,
      sessionId,
      pageUrl: typeof window !== "undefined" ? window.location.pathname : null,
    });
  } catch {
    // ignore
  }
}
