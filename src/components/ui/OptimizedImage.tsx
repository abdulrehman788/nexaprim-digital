import Image, { type ImageProps } from "next/image";

import {
  getImageQuality,
  imageBlurPlaceholder,
  isRemoteImageSrc,
} from "@/lib/image";

type OptimizedImageProps = ImageProps & {
  priority?: boolean;
};

export function OptimizedImage({
  priority = false,
  quality,
  placeholder,
  blurDataURL,
  loading,
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
      loading={priority ? undefined : loading ?? "lazy"}
      placeholder={placeholder ?? (remote ? "blur" : "empty")}
      blurDataURL={remote ? (blurDataURL ?? imageBlurPlaceholder) : blurDataURL}
    />
  );
}
