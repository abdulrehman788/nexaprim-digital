import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getServiceIconStyle } from "@/lib/service-icon-styles";
import { featureGridCardClass, featureGridIconClass } from "@/lib/service-card-styles";
import type { ServiceDetail } from "@/types";

interface ServicePageCardProps {
  service: ServiceDetail;
}

export function ServicePageCard({ service }: ServicePageCardProps) {
  const Icon = service.icon;
  const iconStyle = getServiceIconStyle(service.id);

  return (
    <Link href={service.href} className={featureGridCardClass} aria-label={service.imageAlt}>
      <div className={`${featureGridIconClass} ${iconStyle.bgClass} ${iconStyle.glowClass}`}>
        <Icon className={`h-7 w-7 ${iconStyle.iconClass}`} strokeWidth={1.75} aria-hidden="true" />
      </div>

      <h3 className="mt-6 font-display text-lg font-bold leading-snug text-white sm:text-xl">
        {service.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-content-secondary/90 sm:text-[0.9375rem]">
        {service.description}
      </p>

      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors group-hover:text-accent-hover">
        Learn more
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
