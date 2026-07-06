import type { CaseStudy } from "@/types";

export const caseStudiesPage = {
  overline: "Case Studies",
  titleLine1: "Results you can",
  titleAccent: "measure in revenue.",
  description:
    "Six engagements. Six different industries. Every story here includes the problem we walked into, what we changed, and what moved on the P&L — not vanity metrics.",
} as const;

export const caseStudies: CaseStudy[] = [
  {
    id: "grand-vista-hotel",
    slug: "grand-vista-hotel",
    client: "Grand Vista Hotel Group",
    industry: "Hospitality",
    headline: "Increased direct bookings by 220%",
    summary:
      "A four-property hotel group was bleeding margin to OTAs. We rebuilt the booking funnel and shifted paid spend to high-intent direct traffic.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Luxury hotel lobby — Grand Vista Hotel Group case study",
    stats: [
      { label: "Direct bookings", value: "+220%" },
      { label: "OTA commission saved", value: "$84K/yr" },
      { label: "Project timeline", value: "14 weeks" },
    ],
    challenge:
      "Grand Vista was spending $22,000 a month on Google Ads that sent guests to a third-party booking engine. The brand site looked premium; the checkout path did not. Guests compared OTA prices and left. Internal teams blamed 'seasonality' for flat revenue.",
    approach: [
      "Audited every step from ad click to confirmation email — found three drop-off points on mobile.",
      "Launched property-specific landing pages with rate parity messaging and abandoned-cart recovery.",
      "Shifted 60% of paid budget from broad terms to branded and high-intent direct-booking keywords.",
      "Rolled out a guest CRM flow that re-engaged past visitors within 48 hours.",
    ],
    outcome:
      "Direct bookings rose 220% in two quarters. OTA dependency dropped from 71% to 48% of room nights. The group reinvested saved commission into property upgrades instead of ad spend.",
    quote: "We stopped arguing about whose fault flat bookings were. NexaPrime showed us exactly where guests were leaving — and fixed it.",
    quoteAuthor: "Director of Revenue, Grand Vista Hotel Group",
  },
  {
    id: "meridian-health",
    slug: "meridian-health",
    client: "Meridian Health Network",
    industry: "Healthcare",
    headline: "Tripled new patient intake in six months",
    summary:
      "A regional clinic network needed compliant lead generation without sacrificing trust. Local SEO and education-first content did the heavy lifting.",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Modern medical clinic — Meridian Health Network case study",
    stats: [
      { label: "New patient inquiries", value: "3x" },
      { label: "Cost per lead", value: "-41%" },
      { label: "Markets served", value: "6 cities" },
    ],
    challenge:
      "Meridian had twelve locations and one outdated website that listed phone numbers but never explained why a patient should choose them. Paid ads drove clicks; the front desk said most callers were confused about services offered at their nearest clinic.",
    approach: [
      "Built location pages with provider bios, insurance accepted, and condition-specific FAQs reviewed by their compliance team.",
      "Ran HIPAA-conscious Meta and Google campaigns focused on appointment requests, not aggressive retargeting.",
      "Published monthly patient education articles tied to seasonal search demand (allergies, sports physicals, preventive care).",
      "Installed call tracking so each clinic could see which channels produced booked appointments, not just form fills.",
    ],
    outcome:
      "Qualified patient inquiries tripled in six months. Cost per booked appointment fell 41%. Meridian expanded digital spend to two additional markets without hiring another agency.",
    quote: "They understood we could not sound like a retail brand. The campaigns felt like our practice — calm, clear, and credible.",
    quoteAuthor: "VP Marketing, Meridian Health Network",
  },
  {
    id: "urban-table",
    slug: "urban-table",
    client: "Urban Table Restaurant Group",
    industry: "Restaurants",
    headline: "Filled 40% more tables every week",
    summary:
      "A three-location restaurant group struggled with empty Tuesday–Thursday covers. Hyper-local ads and a simple loyalty loop changed the pattern.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Upscale restaurant interior — Urban Table case study",
    stats: [
      { label: "Weeknight covers", value: "+40%" },
      { label: "Repeat visit rate", value: "+28%" },
      { label: "Avg. review score", value: "4.7★" },
    ],
    challenge:
      "Urban Table was packed on weekends and half-empty midweek. Instagram looked great; OpenTable did not reflect it. They had tried discount apps that brought deal-seekers who never returned.",
    approach: [
      "Mapped diner radius per location and ran geo-fenced ads promoting chef features, not percentage-off coupons.",
      "Launched a text-based VIP list for midweek tasting events — 1,200 signups in the first month.",
      "Implemented a review response system so managers replied to Google feedback within 24 hours.",
      "Synced reservation data with ad reporting to see which campaigns actually filled tables, not just clicks.",
    ],
    outcome:
      "Tuesday through Thursday covers rose 40%. Repeat visits within 30 days climbed 28%. The group opened a fourth location using the same playbook instead of guessing what worked.",
    quote: "We finally knew which posts and ads put butts in seats. That sounds simple. No other agency gave us that.",
    quoteAuthor: "Co-founder, Urban Table Restaurant Group",
  },
  {
    id: "lakeside-realty",
    slug: "lakeside-realty",
    client: "Lakeside Realty Partners",
    industry: "Real Estate",
    headline: "Cut cost per qualified lead by 52%",
    summary:
      "A boutique brokerage competing against national portals needed a funnel that treated buyers and sellers differently — same brand, different paths.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Modern home exterior — Lakeside Realty Partners case study",
    stats: [
      { label: "Cost per lead", value: "-52%" },
      { label: "Listing inquiries", value: "+95%" },
      { label: "Agent adoption", value: "100%" },
    ],
    challenge:
      "Lakeside agents were buying their own Facebook ads with inconsistent messaging. Seller leads went to a generic contact form. Buyers bounced because listing search felt slower than Zillow.",
    approach: [
      "Built separate buyer and seller funnels with distinct offers: home valuation for sellers, curated listing alerts for buyers.",
      "Centralized ad accounts so the brokerage controlled creative while agents got personal tracking links.",
      "Produced short agent intro videos for each neighborhood farm area — trust before the first showing.",
      "Connected CRM automations so leads routed to the right agent in under five minutes.",
    ],
    outcome:
      "Cost per qualified lead dropped 52%. Listing inquiries nearly doubled. Every agent opted into the shared system because they could still see their own numbers.",
    quote: "Our agents stopped fighting over who got credit for a lead. The system made it obvious — and fair.",
    quoteAuthor: "Managing Broker, Lakeside Realty Partners",
  },
  {
    id: "brightpath-academy",
    slug: "brightpath-academy",
    client: "BrightPath Academy",
    industry: "Education",
    headline: "Raised enrollment inquiries 175%",
    summary:
      "An online learning platform needed to stand out in a crowded ed-tech market without promising outcomes it could not guarantee.",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "University campus — BrightPath Academy case study",
    stats: [
      { label: "Enrollment inquiries", value: "+175%" },
      { label: "Trial sign-ups", value: "+63%" },
      { label: "Ad spend ROI", value: "4.2x" },
    ],
    challenge:
      "BrightPath had strong course content and weak positioning. Paid traffic landed on a homepage that tried to speak to parents, career-changers, and corporate trainers at once. Conversion rate was under 1%.",
    approach: [
      "Segmented campaigns by audience with dedicated landing pages and proof points for each segment.",
      "Ran webinar funnels for high-ticket programs instead of pushing cold traffic straight to checkout.",
      "Repurposed student success stories into short video ads with real names and outcomes (with permission).",
      "Tightened email nurture so trial users received value before any sales call.",
    ],
    outcome:
      "Enrollment inquiries rose 175% year over year. Trial sign-ups grew 63%. Return on ad spend reached 4.2x on their core professional certificate track.",
    quote: "They helped us pick one message per audience instead of shouting every credential on one page.",
    quoteAuthor: "Head of Growth, BrightPath Academy",
  },
  {
    id: "nova-commerce",
    slug: "nova-commerce",
    client: "Nova Commerce Co.",
    industry: "E-commerce",
    headline: "Grew revenue 89% without raising ad budget",
    summary:
      "A DTC home goods brand was spending more each month for flat returns. We fixed the store, then optimized the ads.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Shipping and fulfillment — Nova Commerce case study",
    stats: [
      { label: "Revenue growth", value: "+89%" },
      { label: "Conversion rate", value: "+2.1pts" },
      { label: "Cart abandonment", value: "-34%" },
    ],
    challenge:
      "Nova's Meta ROAS looked acceptable until you accounted for returns and rising CAC. Product pages loaded slowly on mobile. Upsells were an afterthought. Email only sent receipts.",
    approach: [
      "Rebuilt mobile product pages with faster load times, clearer sizing guides, and social proof above the fold.",
      "Introduced post-purchase bundles and automated replenishment reminders for consumables.",
      "Restructured Meta campaigns around margin-positive SKUs instead of top sellers with thin margins.",
      "Launched win-back and browse-abandonment flows that recovered 12% of lost carts in month one.",
    ],
    outcome:
      "Revenue grew 89% on the same ad budget within two quarters. Conversion rate improved 2.1 percentage points. The founder credited funnel fixes for more than half the lift — before any scaling.",
    quote: "We thought we needed more ad spend. We needed fewer people leaving at checkout.",
    quoteAuthor: "Founder, Nova Commerce Co.",
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
