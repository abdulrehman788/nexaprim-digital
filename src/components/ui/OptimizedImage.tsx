"use client";

import Image, { type ImageProps } from "next/image";

import {
  defaultImageSizes,
  getImageQuality,
  imageBlurPlaceholder,
  isLocalStaticImageSrc,
  isRemoteImageSrc,
  isUnsplashSrc,
  unsplashImageLoader,
} from "@/lib/image";

type OptimizedImageProps = ImageProps & {
  priority?: boolean;
};

/**
 * Site-wide image wrapper:
 * - Lazy-loads by default (only `priority` images are eager)
 * - Local `/images` assets skip the Next optimizer (already compressed)
 * - Unsplash URLs use their CDN loader (no VPS sharp work)
 */
export function OptimizedImage({
  priority = false,
  quality,
  placeholder,
  blurDataURL,
  loading,
  sizes,
  src,
  alt,
  fetchPriority,
  unoptimized,
  loader,
  ...props
}: OptimizedImageProps) {
  const srcString = typeof src === "string" ? src : "";
  const remote = srcString ? isRemoteImageSrc(srcString) : false;
  const localStatic = srcString ? isLocalStaticImageSrc(srcString) : false;
  const unsplash = srcString ? isUnsplashSrc(srcString) : false;
  const eager = priority === true;
  const resolvedQuality = quality ?? getImageQuality(eager);

  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      priority={eager}
      quality={resolvedQuality}
      sizes={sizes ?? defaultImageSizes}
      loading={eager ? undefined : (loading ?? "lazy")}
      fetchPriority={eager ? (fetchPriority ?? "high") : (fetchPriority ?? "low")}
      decoding="async"
      unoptimized={unoptimized ?? localStatic}
      loader={loader ?? (unsplash ? unsplashImageLoader : undefined)}
      placeholder={placeholder ?? (remote ? "blur" : "empty")}
      blurDataURL={remote ? (blurDataURL ?? imageBlurPlaceholder) : blurDataURL}
    />
  );
}
