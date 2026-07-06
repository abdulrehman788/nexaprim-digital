import dynamic from "next/dynamic";

import { bookingPage } from "@/data/booking";
import { getBookingConfig } from "@/lib/booking";

const CalEmbed = dynamic(
  () => import("@/components/booking/CalEmbed").then((mod) => ({ default: mod.CalEmbed })),
  {
    ssr: false,
    loading: () => (
      <div
        className="min-h-[640px] w-full animate-pulse rounded-xl border border-white/[0.06] bg-white/[0.03]"
        aria-hidden="true"
      />
    ),
  },
);

const BookingSlotPicker = dynamic(
  () =>
    import("@/components/booking/BookingSlotPicker").then((mod) => ({
      default: mod.BookingSlotPicker,
    })),
  {
    loading: () => (
      <div
        className="min-h-[24rem] w-full animate-pulse rounded-xl border border-white/[0.06] bg-white/[0.03]"
        aria-hidden="true"
      />
    ),
  },
);

export function ConsultationScheduler() {
  const bookingConfig = getBookingConfig();

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111118] p-6 sm:p-8">
      <p className="text-center text-sm text-content-secondary sm:text-base">
        {bookingConfig ? bookingPage.embedNote : bookingPage.slotPickerNote}
      </p>
      <div className="mt-6">
        {bookingConfig ? <CalEmbed config={bookingConfig} /> : <BookingSlotPicker />}
      </div>
    </div>
  );
}
