import { Crown } from "lucide-react";

import { heroContent } from "@/data/hero";

export function ExcellenceBadge() {
  return (
    <div className="flex items-center gap-2 text-left">
      <Crown className="h-4 w-4 shrink-0 text-[#D4AF37]" aria-hidden="true" />
      <p className="text-xs leading-tight text-content-muted sm:text-sm">
        <span className="font-display font-bold text-[#D4AF37]">
          {heroContent.excellenceBadge.value}
        </span>{" "}
        {heroContent.excellenceBadge.label}
      </p>
    </div>
  );
}
