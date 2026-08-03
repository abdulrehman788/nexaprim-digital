import type { ImageLoaderProps } from "next/image";

/** Shared defaults and placeholders for next/image across the site. */

export const imageDefaults = {
  /** Hero / above-the-fold LCP images only */
  heroQuality: 72,
  /** Cards, carousels, and below-the-fold photography */
  contentQuality: 58,
  /** Tiny logos / icons */
  logoQuality: 55,
} as const;

/** Sensible responsive default when callers omit `sizes`. */
export const defaultImageSizes =
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

/** Tiny neutral blur used while remote photos load (Unsplash, etc.). */
export const imageBlurPlaceholder =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=";

export function isRemoteImageSrc(src: string) {
  return src.startsWith("http://") || src.startsWith("https://");
}

/** Local public assets are already WebP/AVIF — skip sharp on the VPS. */
export function isLocalStaticImageSrc(src: string) {
  return src.startsWith("/images/") || src.startsWith("/icons/");
}

export function isUnsplashSrc(src: string) {
  try {
    return new URL(src).hostname === "images.unsplash.com";
  } catch {
    return false;
  }
}

/**
 * Resize via Unsplash CDN directly — avoids CPU-heavy `/_next/image` on the VPS.
 */
export function unsplashImageLoader({ src, width, quality }: ImageLoaderProps) {
  try {
    const url = new URL(src);
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "max");
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? imageDefaults.contentQuality));
    return url.toString();
  } catch {
    return src;
  }
}

export function getImageQuality(priority?: boolean) {
  return priority ? imageDefaults.heroQuality : imageDefaults.contentQuality;
}
