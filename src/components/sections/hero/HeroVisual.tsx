import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { heroContent } from "@/data/hero";

export function HeroVisual() {
  return (
    <figure className="relative m-0 w-full max-w-[988px] lg:max-w-none lg:w-[130%] lg:origin-left">
      <div className="relative aspect-[1024/682] w-full">
        <OptimizedImage
          src={heroContent.heroImage}
          alt={heroContent.heroImageAlt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 62vw"
          className="object-contain object-center lg:object-left"
        />
      </div>
    </figure>
  );
}
