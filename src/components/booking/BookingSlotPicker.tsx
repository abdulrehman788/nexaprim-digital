"use client";

import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, CheckCircle2, Clock, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/Button";
import { bookingPage } from "@/data/booking";
import {
  formatBookingDate,
  formatSlotLabel,
  getTimeSlots,
  getUpcomingWeekdays,
  toIsoDate,
  type BookingSlotTime,
} from "@/lib/booking";
import { cn } from "@/lib/utils";

const bookingFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(254),
  phone: z.string().trim().min(7, "Please enter a phone number").max(30),
  company: z.string().trim().max(120).optional(),
  notes: z.string().trim().max(1000).optional(),
  website: z.string().max(0).optional().or(z.literal("")),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

type BookingStep = "date" | "time" | "details" | "success";

export function BookingSlotPicker() {
  const dates = useMemo(() => getUpcomingWeekdays(12), []);
  const timeSlots = useMemo(() => getTimeSlots(), []);

  const [step, setStep] = useState<BookingStep>("date");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<BookingSlotTime | null>(null);
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: { website: "" },
  });

  const onSubmit = async (values: BookingFormValues) => {
    if (!selectedDate || !selectedTime) {
      return;
    }

    setSubmitState("loading");
    setErrorMessage(null);

    const dateLabel = formatBookingDate(selectedDate);
    const timeLabel = formatSlotLabel(selectedTime);
    const message = [
      `Free consultation requested.`,
      `Preferred slot: ${dateLabel} at ${timeLabel} (${bookingPage.timezone}).`,
      values.notes?.trim() ? `Notes: ${values.notes.trim()}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          company: values.company,
          intent: "strategy-call",
          message,
          preferredDate: toIsoDate(selectedDate),
          preferredTime: selectedTime,
          timezone: bookingPage.timezone,
          website: values.website,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? "Unable to book right now. Please try again.");
      }

      setStep("success");
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setSubmitState("idle");
    }
  };

  if (step === "success" && selectedDate && selectedTime) {
    return (
      <div className="flex flex-col items-center py-6 text-center sm:py-8">
        <CheckCircle2 className="h-12 w-12 text-accent" aria-hidden="true" />
        <h2 className="mt-5 font-display text-2xl font-bold text-white">{bookingPage.successTitle}</h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-content-secondary sm:text-base">
          {bookingPage.successMessage}
        </p>
        <p className="mt-6 rounded-xl border border-accent/20 bg-accent/5 px-5 py-4 text-sm text-content-primary">
          <span className="font-semibold text-accent">Your slot:</span>{" "}
          {formatBookingDate(selectedDate)} at {formatSlotLabel(selectedTime)} ({bookingPage.timezone})
        </p>
      </div>
    );
  }

  const stepIndex = step === "date" ? 0 : step === "time" ? 1 : 2;

  return (
    <div>
      <ol className="mb-8 flex gap-2 sm:gap-3" aria-label="Booking steps">
        {bookingPage.steps.map((item, index) => {
          const isActive = index === stepIndex;
          const isComplete = index < stepIndex;

          return (
            <li
              key={item.id}
              className={cn(
                "flex flex-1 flex-col items-center gap-2 border-b-2 pb-3 text-center",
                isActive
                  ? "border-accent text-accent"
                  : isComplete
                    ? "border-accent/40 text-content-secondary"
                    : "border-white/10 text-content-muted",
              )}
            >
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
                  isActive
                    ? "bg-accent text-black"
                    : isComplete
                      ? "bg-accent/20 text-accent"
                      : "bg-white/5 text-content-muted",
                )}
              >
                {index + 1}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-xs">
                {item.label}
              </span>
            </li>
          );
        })}
      </ol>

      {step === "date" ? (
        <div>
          <div className="flex items-center gap-2 text-accent">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em]">Select a date</h2>
          </div>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {dates.map((date) => {
              const iso = toIsoDate(date);
              const isSelected = selectedDate && toIsoDate(selectedDate) === iso;

              return (
                <li key={iso}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDate(date);
                      setStep("time");
                    }}
                    className={cn(
                      "w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                      isSelected
                        ? "border-accent bg-accent/10 text-white"
                        : "border-white/10 bg-black/30 text-content-secondary hover:border-accent/30 hover:text-white",
                    )}
                  >
                    {formatBookingDate(date)}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      {step === "time" && selectedDate ? (
        <div>
          <button
            type="button"
            onClick={() => setStep("date")}
            className="text-xs font-semibold text-accent hover:text-accent-hover"
          >
            ← Change date ({formatBookingDate(selectedDate)})
          </button>
          <div className="mt-4 flex items-center gap-2 text-accent">
            <Clock className="h-4 w-4" aria-hidden="true" />
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em]">Select a time</h2>
          </div>
          <p className="mt-2 text-xs text-content-muted">
            {bookingPage.duration} · {bookingPage.timezone}
          </p>
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {timeSlots.map((slot) => (
              <li key={slot}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTime(slot);
                    setStep("details");
                  }}
                  className={cn(
                    "w-full rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors",
                    selectedTime === slot
                      ? "border-accent bg-accent/10 text-white"
                      : "border-white/10 bg-black/30 text-content-secondary hover:border-accent/30 hover:text-white",
                  )}
                >
                  {formatSlotLabel(slot)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {step === "details" && selectedDate && selectedTime ? (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <button
            type="button"
            onClick={() => setStep("time")}
            className="text-xs font-semibold text-accent hover:text-accent-hover"
          >
            ← Change time ({formatBookingDate(selectedDate)} at {formatSlotLabel(selectedTime)})
          </button>

          <h2 className="mt-4 font-display text-xl font-bold text-white">Your details</h2>
          <p className="mt-2 text-sm text-content-secondary">
            We&apos;ll email your calendar invite to the address below.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="booking-name" className="mb-2 block text-sm font-medium text-content-primary">
                Full name *
              </label>
              <input
                id="booking-name"
                className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-content-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                {...register("name")}
              />
              {errors.name ? (
                <p className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="booking-email" className="mb-2 block text-sm font-medium text-content-primary">
                Work email *
              </label>
              <input
                id="booking-email"
                type="email"
                className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-content-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                {...register("email")}
              />
              {errors.email ? (
                <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="booking-phone" className="mb-2 block text-sm font-medium text-content-primary">
                Phone *
              </label>
              <input
                id="booking-phone"
                type="tel"
                className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-content-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                {...register("phone")}
              />
              {errors.phone ? (
                <p className="mt-1.5 text-xs text-red-400">{errors.phone.message}</p>
              ) : null}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="booking-company" className="mb-2 block text-sm font-medium text-content-primary">
                Company
              </label>
              <input
                id="booking-company"
                className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-content-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                {...register("company")}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="booking-notes" className="mb-2 block text-sm font-medium text-content-primary">
                What should we prepare for?
              </label>
              <textarea
                id="booking-notes"
                rows={3}
                className="w-full resize-y rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-content-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                placeholder="Brief context on your goals, current challenges, or questions..."
                {...register("notes")}
              />
            </div>

            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
              {...register("website")}
            />
          </div>

          {errorMessage ? (
            <p className="mt-4 text-sm text-red-400" role="alert">
              {errorMessage}
            </p>
          ) : null}

          <Button
            type="submit"
            size="lg"
            className="bg-gold-gradient mt-8 w-full border-transparent text-black shadow-glow hover:opacity-90 sm:w-auto"
            disabled={submitState === "loading"}
          >
            {submitState === "loading" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                Confirming...
              </>
            ) : (
              "Confirm consultation"
            )}
          </Button>
        </form>
      ) : null}
    </div>
  );
}
