import { OptimizedImage } from "@/components/ui/OptimizedImage";

interface IndustryCardArtProps {
  image: string;
  label: string;
}

export function IndustryCardArt({ image, label }: IndustryCardArtProps) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200">
      <OptimizedImage
        src={image}
        alt={label}
        fill
        sizes="(max-width: 640px) 268px, 304px"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-slate-900/45 via-slate-900/10 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}
