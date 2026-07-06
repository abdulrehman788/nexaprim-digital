import { OptimizedImage } from "@/components/ui/OptimizedImage";
import type { CaseStudyTheme } from "@/lib/case-study-themes";

interface IndustryCardArtProps {
  theme: CaseStudyTheme;
  image: string;
  label: string;
}

export function IndustryCardArt({ theme, image, label }: IndustryCardArtProps) {
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
        className="absolute inset-0 opacity-35 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-25"
        style={{
          background: `linear-gradient(160deg, ${theme.gradientVia} 0%, ${theme.gradientFrom} 50%, ${theme.gradientTo} 100%)`,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-slate-900/45 via-slate-900/10 to-slate-900/5"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_20%,rgba(255,255,255,0.2),transparent_55%)]"
        aria-hidden="true"
      />
    </div>
  );
}
