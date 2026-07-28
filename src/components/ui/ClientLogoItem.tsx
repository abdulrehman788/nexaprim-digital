interface ClientLogoItemProps {
  name: string;
  logo: string;
  logoAlt: string;
}

export function ClientLogoItem({
  name,
  logo,
  logoAlt,
}: ClientLogoItemProps) {
  return (
    <div className="flex h-20 w-full items-center justify-center px-3 sm:h-24 sm:px-4 lg:h-28">
      {/* eslint-disable-next-line @next/next/no-img-element -- avoids optimizer cache; mixed logo backgrounds */}
      <img
        src={logo}
        alt={logoAlt}
        width={320}
        height={112}
        loading="lazy"
        className="max-h-full max-w-full object-contain object-center"
      />
      <span className="sr-only">{name}</span>
    </div>
  );
}
