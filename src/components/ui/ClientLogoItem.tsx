import Image from "next/image";

interface ClientLogoItemProps {
  name: string;
  logo: string;
  logoAlt: string;
}

export function ClientLogoItem({ name, logo, logoAlt }: ClientLogoItemProps) {
  return (
    <div className="group flex h-14 w-full items-center justify-center px-3 sm:h-16 sm:px-4">
      <Image
        src={logo}
        alt={logoAlt}
        width={180}
        height={44}
        loading="lazy"
        className="h-8 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105 sm:h-9"
      />
      <span className="sr-only">{name}</span>
    </div>
  );
}
