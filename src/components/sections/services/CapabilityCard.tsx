import {
  BarChart3,
  Layers,
  Monitor,
  Search,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";

import { featureGridCardClass, featureGridIconClass } from "@/lib/service-card-styles";
import type { ServiceCapabilityIcon, ServiceCapabilityItem } from "@/types";

export const capabilityIcons: Record<ServiceCapabilityIcon, LucideIcon> = {
  search: Search,
  "shopping-bag": ShoppingBag,
  "bar-chart": BarChart3,
  monitor: Monitor,
  layers: Layers,
};

const capabilityIconStyles: Record<
  ServiceCapabilityIcon,
  { iconClass: string; bgClass: string; glowClass: string }
> = {
  search: {
    iconClass: "text-cyan-400",
    bgClass: "bg-cyan-400/12",
    glowClass: "shadow-[0_0_24px_-6px_rgba(34,211,238,0.3)]",
  },
  "shopping-bag": {
    iconClass: "text-emerald-400",
    bgClass: "bg-emerald-400/12",
    glowClass: "shadow-[0_0_24px_-6px_rgba(52,211,153,0.3)]",
  },
  "bar-chart": {
    iconClass: "text-blue-400",
    bgClass: "bg-blue-400/12",
    glowClass: "shadow-[0_0_24px_-6px_rgba(96,165,250,0.3)]",
  },
  monitor: {
    iconClass: "text-violet-400",
    bgClass: "bg-violet-400/12",
    glowClass: "shadow-[0_0_24px_-6px_rgba(167,139,250,0.3)]",
  },
  layers: {
    iconClass: "text-orange-400",
    bgClass: "bg-orange-400/12",
    glowClass: "shadow-[0_0_24px_-6px_rgba(251,146,60,0.3)]",
  },
};

export function CapabilityCard({ item }: { item: ServiceCapabilityItem }) {
  const Icon = capabilityIcons[item.icon];
  const iconStyle = capabilityIconStyles[item.icon];

  return (
    <li className={featureGridCardClass}>
      <div className={`${featureGridIconClass} ${iconStyle.bgClass} ${iconStyle.glowClass}`}>
        <Icon className={`h-7 w-7 ${iconStyle.iconClass}`} strokeWidth={1.75} aria-hidden="true" />
      </div>
      <h3 className="mt-6 font-display text-lg font-bold text-white sm:text-xl">{item.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-content-secondary/80 sm:text-[0.9375rem]">
        {item.description}
      </p>
    </li>
  );
}

export function CapabilityCardGrid({ items }: { items: ServiceCapabilityItem[] }) {
  return (
    <ul className="grid list-none gap-6 p-0 md:grid-cols-3 lg:gap-8">
      {items.map((item) => (
        <CapabilityCard key={item.id} item={item} />
      ))}
    </ul>
  );
}
