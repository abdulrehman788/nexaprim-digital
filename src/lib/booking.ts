export type BookingProvider = "calcom" | "calendly";

export interface BookingConfig {
  provider: BookingProvider;
  /** Cal.com path (e.g. nexaprime-digital/consultation) or full Calendly URL path */
  embedPath: string;
  embedUrl: string;
}

function normalizeCalLink(raw: string): string {
  const trimmed = raw.trim().replace(/^\/+|\/+$/g, "");
  if (trimmed.startsWith("http")) {
    try {
      const url = new URL(trimmed);
      if (url.hostname.includes("cal.com")) {
        return url.pathname.replace(/^\/+/, "");
      }
      if (url.hostname.includes("calendly.com")) {
        return trimmed;
      }
    } catch {
      return trimmed;
    }
  }
  return trimmed;
}

/** Returns embed config when NEXT_PUBLIC_BOOKING_URL is set; otherwise null (use slot picker). */
export function getBookingConfig(): BookingConfig | null {
  const raw = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();
  if (!raw) {
    return null;
  }

  const provider =
    (process.env.NEXT_PUBLIC_BOOKING_PROVIDER as BookingProvider | undefined) ??
    (raw.includes("calendly.com") ? "calendly" : "calcom");

  if (provider === "calendly") {
    const path = normalizeCalLink(raw);
    const embedUrl = path.startsWith("http")
      ? `${path}${path.includes("?") ? "&" : "?"}embed_type=Inline&hide_gdpr_banner=1`
      : `https://calendly.com/${path}?embed_type=Inline&hide_gdpr_banner=1`;

    return { provider, embedPath: path, embedUrl };
  }

  const calLink = normalizeCalLink(raw);
  const embedUrl = calLink.startsWith("http")
    ? `${calLink}${calLink.includes("?") ? "&" : "?"}embed=true&theme=dark`
    : `https://cal.com/${calLink}?embed=true&theme=dark`;

  return { provider: "calcom", embedPath: calLink, embedUrl };
}

const SLOT_TIMES = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
] as const;

export type BookingSlotTime = (typeof SLOT_TIMES)[number];

export function formatSlotLabel(time: BookingSlotTime): string {
  const [hourRaw, minuteRaw] = time.split(":");
  const hour = Number(hourRaw);
  const minute = Number(minuteRaw);
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;
}

export function getUpcomingWeekdays(count = 12): Date[] {
  const dates: Date[] = [];
  const cursor = new Date();
  cursor.setHours(12, 0, 0, 0);

  while (dates.length < count) {
    cursor.setDate(cursor.getDate() + 1);
    const day = cursor.getDay();
    if (day !== 0 && day !== 6) {
      dates.push(new Date(cursor));
    }
  }

  return dates;
}

export function getTimeSlots(): BookingSlotTime[] {
  return [...SLOT_TIMES];
}

export function formatBookingDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
