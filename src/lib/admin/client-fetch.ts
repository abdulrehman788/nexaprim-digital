"use client";

/** Shared admin fetch: redirects to login on 401, throws with message otherwise. */
export async function adminFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const res = await fetch(input, init);
  if (res.status === 401) {
    const next =
      typeof window !== "undefined"
        ? window.location.pathname + window.location.search
        : "/admin";
    const login = `/admin/login?next=${encodeURIComponent(next.startsWith("/admin") ? next : "/admin")}`;
    if (typeof window !== "undefined") {
      window.location.assign(login);
    }
    throw new Error("UNAUTHORIZED");
  }
  return res;
}

export async function adminFetchJson<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const res = await adminFetch(input, init);
  const payload = (await res.json().catch(() => null)) as { error?: string } | T | null;
  if (!res.ok) {
    const message =
      payload && typeof payload === "object" && "error" in payload && payload.error
        ? String(payload.error)
        : "Request failed";
    throw new Error(message);
  }
  return payload as T;
}
