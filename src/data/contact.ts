import { Clock, Mail, MapPin, Phone } from "lucide-react";

import type { ContactIntentOption } from "@/types";

export const contactSection = {
  title: "Let's Start Your Growth Journey",
  description:
    "Tell us about your goals and we'll respond within one business day with next steps — no pressure, no generic pitch decks.",
  submitLabel: "Send Message",
  successTitle: "Message received",
  successMessage:
    "Thank you for reaching out. A member of our strategy team will contact you within one business day.",
} as const;

export const contactPage = {
  overline: "Get In Touch",
  titleLine1: "Tell us what's",
  titleAccent: "not working",
  titleLine2: "We'll say if we can help.",
  description:
    "No pitch deck on the first message. Send what's frustrating you — flat leads, a site that doesn't convert, campaigns that eat budget — and we'll reply within one business day with an honest next step.",
  formTitle: "Send a message",
  formDescription:
    "Fields marked with * are required. Everything you share stays between us until you decide otherwise.",
  officeNote:
    "Our Austin office is open by appointment. Walk in without one and we'll still make time if someone's free — but booking ahead gets you a strategist, not whoever's at the front desk.",
} as const;

export const contactDetails = [
  {
    id: "email",
    label: "Email",
    value: "hello@nexaprime.digital",
    href: "mailto:hello@nexaprime.digital",
    icon: Mail,
  },
  {
    id: "phone",
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
    icon: Phone,
  },
  {
    id: "address",
    label: "Office",
    value: "1200 Innovation Drive, Suite 400, Austin, TX 78701",
    href: "https://maps.google.com/?q=1200+Innovation+Drive+Austin+TX",
    icon: MapPin,
  },
  {
    id: "hours",
    label: "Response time",
    value: "Within 1 business day",
    icon: Clock,
  },
] as const;

export const contactProcessSection = {
  overline: "What Happens Next",
  title: "After you hit send",
  description: "Three steps. No automated drip sequence. No 'just checking in' emails every 48 hours.",
} as const;

export const contactProcessSteps = [
  {
    id: "read",
    step: "01",
    title: "We read it the same day",
    body: "On business days, a strategist reviews your message within a few hours — not an inbox bot, not a shared support queue.",
  },
  {
    id: "reply",
    step: "02",
    title: "You get a direct reply",
    body: "We'll ask two or three pointed questions by email. Enough to know if a call is worth your time and ours.",
  },
  {
    id: "call",
    step: "03",
    title: "Twenty minutes, your call",
    body: "If there's a fit, we book a short strategy call. If not, we'll say so and point you somewhere better when we can.",
  },
] as const;

export const contactPageFaq = [
  {
    id: "size",
    question: "Are we too small — or too big?",
    answer:
      "We work best with companies between $2M and $50M in annual revenue. Smaller than that, you may not need us yet. Bigger, you may need a larger agency with more specialists on tap.",
  },
  {
    id: "cost",
    question: "Is the first conversation free?",
    answer:
      "Yes. The initial call is 20 minutes, no charge, no obligation. We use it to understand your situation — not to read a sales script.",
  },
  {
    id: "remote",
    question: "Do you only work with Austin businesses?",
    answer:
      "No. About half our clients are in Texas; the rest are spread across the US and a few overseas. We meet in person when it helps, but most work happens over video.",
  },
] as const;

export const contactIntentOptions: ContactIntentOption[] = [
  { value: "strategy-call", label: "Book a strategy call" },
  { value: "digital-strategy", label: "Digital strategy" },
  { value: "performance-marketing", label: "Performance marketing" },
  { value: "brand-creative", label: "Brand & creative" },
  { value: "web-development", label: "Web development" },
  { value: "packages", label: "Packages & pricing" },
  { value: "other", label: "Something else" },
];
