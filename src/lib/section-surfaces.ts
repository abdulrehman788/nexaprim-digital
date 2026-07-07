import { cn } from "@/lib/utils";

/** Dark content band — matches homepage dark sections */
export const sectionDark =
  "bg-surface-secondary text-content-primary border-t border-border-subtle";

/** Light content band — white */
export const sectionLight =
  "bg-white text-content-inverse border-t border-slate-200/80";

/** Warm off-white band — homepage industries style */
export const sectionLightWarm =
  "bg-[#f8f7f4] text-content-inverse border-t border-slate-200/80";

export const sectionPadding = "py-20 lg:py-28";

export function isLightBand(index: number): boolean {
  return index % 2 === 1;
}

export function sectionBandClass(index: number, warm = false): string {
  if (!isLightBand(index)) return sectionDark;
  return warm ? sectionLightWarm : sectionLight;
}

export function sectionShell(index: number, warm = false): string {
  return cn(sectionBandClass(index, warm), sectionPadding);
}

/** Light-surface typography */
export const lightHeading = "text-slate-900";
export const lightBody = "text-slate-600";
export const lightMuted = "text-slate-500";

/** Light inner cards */
export const lightCard =
  "rounded-2xl border border-slate-200 bg-white shadow-sm";

export const lightCardMuted =
  "rounded-2xl border border-slate-200 bg-slate-50";
