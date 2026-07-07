import type { Metadata } from "next";

import { BookPageContent } from "@/components/booking/BookPageContent";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Book a Free Consultation",
  description:
    "Schedule a free 20-minute strategy call with NexaPrime Digital. Pick a time that works for you — we'll send a calendar invite with a video link.",
  path: "/book",
});

export default function BookConsultationPage() {
  return (
    <main className="bg-white">
      <BookPageContent />
    </main>
  );
}
