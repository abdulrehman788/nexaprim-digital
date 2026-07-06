export const bookingPage = {
  overline: "Free Consultation",
  titleLine1: "Book your",
  titleAccent: "strategy call",
  description:
    "20-minute video call — no pitch deck, no pressure. Pick a date and time that works for you and we'll send a calendar invite with a video link.",
  metaLine: "20 min · Video call · Central Time (US)",
  embedNote: "Select a date and time below for instant calendar confirmation.",
  slotPickerNote: "Select a date, time, and your details — we'll confirm by email within one business day.",
  duration: "20 minutes",
  timezone: "Central Time (US)",
  steps: [
    { id: "date", label: "Date" },
    { id: "time", label: "Time" },
    { id: "details", label: "Details" },
  ],
  successTitle: "You're booked in",
  successMessage:
    "Check your inbox — we'll send a calendar invite shortly with the video call link.",
} as const;
