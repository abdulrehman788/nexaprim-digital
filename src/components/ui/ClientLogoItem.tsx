import { cn } from "@/lib/utils";

interface ClientLogoItemProps {
  name: string;
  logo: string;
  logoAlt: string;
  /** md = Nexus default; lg = slightly bigger/bolder for light wordmarks */
  size?: "md" | "lg";
}

/** Uniform logo box — scales partner marks; lg reads bolder on the dark strip. */
export function ClientLogoItem({
  name,
  logo,
  logoAlt,
  size = "md",
}: ClientLogoItemProps) {
  const isLarge = size === "lg";

  return (
    <div
      className={cn(
        "flex w-full items-center justify-center",
        isLarge ? "h-[4.75rem] sm:h-[5.5rem]" : "h-14 sm:h-16",
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- mixed logo formats/backgrounds */}
      <img
        src={logo}
        alt={logoAlt}
        width={360}
        height={120}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        className={cn(
          "max-h-full object-contain object-center",
          isLarge
            ? "max-w-[15rem] scale-[1.08] contrast-125 brightness-110 sm:max-w-[17rem]"
            : "max-w-[12.5rem] sm:max-w-[14.5rem]",
        )}
      />
      <span className="sr-only">{name}</span>
    </div>
  );
}
