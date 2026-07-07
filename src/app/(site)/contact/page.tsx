import type { Metadata } from "next";

import { ContactFaqSection } from "@/components/sections/contact/ContactFaqSection";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { ContactMainSection } from "@/components/sections/contact/ContactMainSection";
import { ContactProcessSection } from "@/components/sections/contact/ContactProcessSection";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact Us",
  description:
    "Reach NexaPrime Digital in Austin. Send a message, book a strategy call, or email hello@nexaprime.digital — we reply within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="bg-white">
      <ContactHero />
      <ContactMainSection />
      <ContactProcessSection />
      <ContactFaqSection />
    </main>
  );
}
