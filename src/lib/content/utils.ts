import type { ContentStatus } from "@/lib/content/types";

export function parseContentStatus(value: string): ContentStatus {
  if (value === "DRAFT" || value === "SCHEDULED" || value === "PUBLISHED" || value === "ARCHIVED") {
    return value;
  }
  return "DRAFT";
}

/** Content is visible on the public site when published or scheduled time has passed. */
export function isContentPublic(status: string, publishAt: Date | null): boolean {
  if (status === "DRAFT" || status === "ARCHIVED") return false;
  if (!publishAt) return status === "PUBLISHED";
  return publishAt.getTime() <= Date.now();
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export function parseJsonArray<T>(value: string, fallback: T[] = []): T[] {
  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed) ? (parsed as T[]) : fallback;
  } catch {
    return fallback;
  }
}
