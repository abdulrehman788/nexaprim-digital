/**
 * Only allow same-origin relative redirects under /admin.
 * Blocks protocol-relative URLs, external hosts, and path traversal tricks.
 */
export function getSafeAdminRedirect(next: string | null | undefined): string {
  if (!next) return "/admin";

  const trimmed = next.trim();
  if (
    !trimmed.startsWith("/") ||
    trimmed.startsWith("//") ||
    trimmed.includes("\\") ||
    trimmed.includes("://") ||
    trimmed.includes("@")
  ) {
    return "/admin";
  }

  // Strip query/hash for path check, then restore only the path.
  const pathOnly = trimmed.split(/[?#]/, 1)[0] ?? "";
  if (!pathOnly.startsWith("/admin")) {
    return "/admin";
  }

  return pathOnly;
}
