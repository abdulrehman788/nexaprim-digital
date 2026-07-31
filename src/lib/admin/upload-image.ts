export async function uploadAdminImage(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Please choose an image file (JPEG, PNG, WebP, or GIF)");
  }

  const body = new FormData();
  body.append("file", file);

  const response = await fetch("/api/admin/upload", {
    method: "POST",
    body,
    credentials: "same-origin",
  });

  const data = (await response.json().catch(() => ({}))) as { url?: string; error?: string };

  if (response.status === 401) {
    if (typeof window !== "undefined") {
      const next = window.location.pathname + window.location.search;
      window.location.assign(
        `/admin/login?next=${encodeURIComponent(next.startsWith("/admin") ? next : "/admin")}`,
      );
    }
    throw new Error("UNAUTHORIZED");
  }

  if (!response.ok || !data.url) {
    throw new Error(data.error ?? "Upload failed");
  }

  return data.url;
}
