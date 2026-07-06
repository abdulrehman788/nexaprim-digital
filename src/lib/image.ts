/** Shared defaults and placeholders for next/image across the site. */

export const imageDefaults = {
  /** Hero / above-the-fold LCP images */
  heroQuality: 82,
  /** Cards, carousels, and below-the-fold photography */
  contentQuality: 75,
} as const;

/** Tiny neutral blur used while remote photos load (Unsplash, etc.). */
export const imageBlurPlaceholder =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=";

export function isRemoteImageSrc(src: string) {
  return src.startsWith("http://") || src.startsWith("https://");
}

export function getImageQuality(priority?: boolean) {
  return priority ? imageDefaults.heroQuality : imageDefaults.contentQuality;
}
