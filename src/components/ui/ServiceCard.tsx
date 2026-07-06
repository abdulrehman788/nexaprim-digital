import Link from "next/link";

import { getServiceIconStyle } from "@/lib/service-icon-styles";
import { featureGridCardClass, featureGridIconClass } from "@/lib/service-card-styles";
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;
  const iconStyle = getServiceIconStyle(service.id);

  return (
    <Link href={service.href} className={featureGridCardClass} aria-label={service.imageAlt}>
      <div
        className={`${featureGridIconClass} ${iconStyle.bgClass} ${iconStyle.glowClass}`}
      >
        <Icon className={`h-7 w-7 ${iconStyle.iconClass}`} strokeWidth={1.75} aria-hidden="true" />
      </div>

      <h3 className="mt-6 font-display text-lg font-bold leading-snug text-white sm:text-xl">
        {service.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-content-secondary/80 sm:text-[0.9375rem]">
        {service.description}
      </p>
    </Link>
  );
}
