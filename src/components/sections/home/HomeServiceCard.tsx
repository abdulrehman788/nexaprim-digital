import Link from "next/link";

import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { homeServiceCardImages } from "@/data/home-sections";
import { getServiceIconStyle } from "@/lib/service-icon-styles";
import type { Service } from "@/types";

interface HomeServiceCardProps {
  service: Service;
}

export function HomeServiceCard({ service }: HomeServiceCardProps) {
  const Icon = service.icon;
  const iconStyle = getServiceIconStyle(service.id);
  const cardImage = homeServiceCardImages[service.id];

  return (
    <Link
      href={service.href}
      className="group relative flex min-h-[12.5rem] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-300 hover:shadow-[0_18px_44px_-14px_rgba(124,58,237,0.3)]"
      aria-label={service.imageAlt}
    >
      <div className="relative z-10 flex flex-1 flex-col p-5 sm:max-w-[46%] sm:p-6">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${iconStyle.bgClass}`}
        >
          <Icon className={`h-5 w-5 ${iconStyle.iconClass}`} strokeWidth={1.75} aria-hidden="true" />
        </div>
        <h3 className="mt-4 font-display text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-violet-700 sm:text-lg">
          {service.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
          {service.description}
        </p>
      </div>

      {cardImage ? (
        <div className="relative hidden w-[54%] shrink-0 sm:block">
          <OptimizedImage
            src={cardImage}
            alt=""
            fill
            sizes="320px"
            className="object-cover object-center transition-all duration-500 group-hover:scale-[1.08] group-hover:brightness-110"
          />
          {/* Soft left fade only — photos stay highly visible */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent transition-opacity duration-300 group-hover:via-white/5 group-hover:opacity-70"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-br from-violet-600/0 to-orange-500/0 transition-all duration-300 group-hover:from-violet-600/15 group-hover:to-orange-500/10"
            aria-hidden="true"
          />
        </div>
      ) : null}
    </Link>
  );
}
