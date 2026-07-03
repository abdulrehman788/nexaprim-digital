import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getServiceIconStyle } from "@/lib/service-icon-styles";
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;
  const iconStyle = getServiceIconStyle(service.id);

  return (
    <article
      className="group flex h-full flex-col rounded-xl border border-white/10 bg-navy-800/60 p-6 transition-all duration-300 hover:border-white/20 hover:bg-navy-800 hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)] sm:p-7"
      aria-label={service.imageAlt}
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconStyle.bgClass}`}
      >
        <Icon className={`h-6 w-6 ${iconStyle.iconClass}`} strokeWidth={1.75} aria-hidden="true" />
      </div>

      <h3 className="mt-5 font-display text-lg font-bold leading-snug text-white">
        {service.title}
      </h3>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-400">{service.description}</p>

      <Link
        href={service.href}
        className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
      >
        Learn more
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>
    </article>
  );
}
