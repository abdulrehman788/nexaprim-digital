interface ClientLogoItemProps {
  name: string;
  logo: string;
  logoAlt: string;
}

/** Uniform logo box — every partner logo scales to the same max height & width. */
export function ClientLogoItem({ name, logo, logoAlt }: ClientLogoItemProps) {
  return (
    <div className="flex h-[4.75rem] w-full items-center justify-center px-2 sm:h-[5.25rem] sm:px-4">
      {/* eslint-disable-next-line @next/next/no-img-element -- avoids optimizer cache; mixed logo backgrounds */}
      <img
        src={logo}
        alt={logoAlt}
        width={360}
        height={120}
        loading="lazy"
        className="max-h-full max-w-full object-contain object-center"
      />
      <span className="sr-only">{name}</span>
    </div>
  );
}
