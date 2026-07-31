import Image, { type ImageProps } from "next/image";

import {
  defaultImageSizes,
  getImageQuality,
  imageBlurPlaceholder,
  isRemoteImageSrc,
} from "@/lib/image";

type OptimizedImageProps = ImageProps & {
  priority?: boolean;
};

/**
 * Site-wide image wrapper:
 * - Lazy-loads by default (only `priority` images are eager)
 * - Uses AVIF/WebP via next/image
 * - Caps quality so large photos don't block the network
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
  ...props
}: OptimizedImageProps) {
  const srcString = typeof src === "string" ? src : "";
  const remote = srcString ? isRemoteImageSrc(srcString) : false;

  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      priority={priority}
      quality={quality ?? getImageQuality(priority)}
      sizes={sizes ?? defaultImageSizes}
      loading={priority ? undefined : loading ?? "lazy"}
      decoding="async"
      placeholder={placeholder ?? (remote ? "blur" : "empty")}
      blurDataURL={remote ? (blurDataURL ?? imageBlurPlaceholder) : blurDataURL}
    />
  );
}
