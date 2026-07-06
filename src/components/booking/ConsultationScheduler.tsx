import { CalEmbed } from "@/components/booking/CalEmbed";
import { BookingSlotPicker } from "@/components/booking/BookingSlotPicker";
import { bookingPage } from "@/data/booking";
import { getBookingConfig } from "@/lib/booking";

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
