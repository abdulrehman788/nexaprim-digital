interface ClientLogoItemProps {
  name: string;
  logo: string;
  logoAlt: string;
  /** Kept for data compat — all logos use one uniform size on the strip. */
  size?: "md" | "lg";
}

/** Uniform logo box so every partner mark has equal visual weight. */
export function ClientLogoItem({ name, logo, logoAlt }: ClientLogoItemProps) {
  return (
    <div className="flex h-14 w-full items-center justify-center sm:h-16 lg:h-[4.5rem]">
      {/* eslint-disable-next-line @next/next/no-img-element -- mixed logo formats/backgrounds */}
      <img
        src={logo}
        alt={logoAlt}
        width={360}
        height={120}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        className="h-full w-auto max-w-[min(100%,16rem)] object-contain object-center"
      />
      <span className="sr-only">{name}</span>
    </div>
  );
}
