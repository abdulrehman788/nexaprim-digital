import type { IndustryDetail } from "@/types";

export const industriesSection = {
  overline: "Industry Growth Systems",
  title: "Solutions Built for Your Industry",
  description:
    "We design complete digital systems tailored to the unique needs of your industry.",
  ctaLabel: "Explore All Industries",
  ctaHref: "/industries",
} as const;

export const industriesPage = {
  overline: "Industries",
  titleLine1: "Digital systems built for",
  titleAccent: "how your market actually works.",
  description:
    "Every industry has different buying cycles, compliance rules, and margin pressure. We do not recycle generic playbooks — we build funnels, content, and media around the economics of your sector.",
} as const;

export const industries: IndustryDetail[] = [
  {
    id: "hospitality",
    title: "Hospitality",
    subtitle: "Hotels, Resorts, Villas & Airbnb Businesses",
    href: "/industries/hospitality",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Luxury villa with pool representing hospitality industry solutions",
    iconId: "hotel",
    headline: "Turn empty rooms into direct bookings — not OTA dependency.",
    description:
      "Hotel groups lose margin every time a guest books through a third party. We rebuild the path from search to confirmation so more revenue stays on your P&L.",
    painPoints: [
      "Paid ads send traffic to booking engines you do not control.",
      "Mobile checkout drops off before payment.",
      "Brand sites look premium but convert like brochureware.",
      "Revenue teams blame seasonality instead of fixing the funnel.",
    ],
    capabilities: [
      {
        title: "Direct booking funnels",
        description:
          "Property-specific landing pages, rate parity messaging, and abandoned-cart recovery tuned for mobile travelers.",
      },
      {
        title: "Paid media reallocation",
        description:
          "Shift spend from broad terms to branded and high-intent direct-booking keywords that protect margin.",
      },
      {
        title: "Guest CRM & retention",
        description:
          "Re-engage past visitors within 48 hours with offers that bring them back without discounting your brand.",
      },
      {
        title: "Revenue reporting",
        description:
          "Connect ad spend to confirmed bookings — not clicks — so leadership sees what actually fills rooms.",
      },
    ],
    proofPoint:
      "Grand Vista Hotel Group increased direct bookings 220% in two quarters while cutting OTA dependency from 71% to 48% of room nights.",
    relatedCaseStudySlug: "grand-vista-hotel",
  },
  {
    id: "restaurants",
    title: "Restaurants",
    subtitle: "Fine Dining, Cafes, Catering & Food Brands",
    href: "/industries/restaurants",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Plated gourmet dish representing restaurant industry solutions",
    iconId: "utensils",
    headline: "Fill tables on the nights that matter — without training deal-seekers.",
    description:
      "Weekend crowds mask weak midweek covers. We help restaurant groups drive predictable traffic Tuesday through Thursday with local campaigns that build repeat diners, not one-time coupon hunters.",
    painPoints: [
      "Instagram looks full; OpenTable does not reflect it midweek.",
      "Discount apps bring guests who never return at full price.",
      "No clear link between posts, ads, and actual covers.",
      "Each location markets differently with no shared playbook.",
    ],
    capabilities: [
      {
        title: "Hyper-local paid media",
        description:
          "Geo-fenced campaigns promoting chef features and experiences — not percentage-off coupons that erode margin.",
      },
      {
        title: "VIP & loyalty loops",
        description:
          "Text-based lists for midweek tastings and events that turn occasional diners into regulars.",
      },
      {
        title: "Review & reputation ops",
        description:
          "Response systems so managers reply to Google feedback within 24 hours and protect local rankings.",
      },
      {
        title: "Reservation-linked reporting",
        description:
          "Sync reservation data with ad reporting to see which campaigns fill tables, not just drive clicks.",
      },
    ],
    proofPoint:
      "Urban Table Restaurant Group grew Tuesday–Thursday covers 40% and repeat visits within 30 days by 28%.",
    relatedCaseStudySlug: "urban-table",
  },
  {
    id: "education",
    title: "Education",
    subtitle: "Universities, Colleges & Online Learning Platforms",
    href: "/industries/education",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "University campus building representing education industry solutions",
    iconId: "graduation-cap",
    headline: "Enrollment marketing that speaks to one audience at a time.",
    description:
      "Ed-tech and learning brands dilute their message when one homepage tries to win parents, career-changers, and corporate buyers simultaneously. We segment campaigns and proof so each audience sees a reason to act.",
    painPoints: [
      "Cold traffic to a generic homepage converts under 1%.",
      "High-ticket programs need nurture, not a hard sell on first visit.",
      "Student stories sit in a folder instead of fueling acquisition.",
      "Trial users get receipts — not value — before any sales conversation.",
    ],
    capabilities: [
      {
        title: "Audience-specific funnels",
        description:
          "Dedicated landing pages and proof points for each segment instead of one page shouting every credential.",
      },
      {
        title: "Webinar & nurture programs",
        description:
          "Move high-ticket prospects through education-first sequences before asking for enrollment.",
      },
      {
        title: "Permission-based social proof",
        description:
          "Short video ads and landing modules built from real student outcomes — with names and permission.",
      },
      {
        title: "Trial-to-enrollment email",
        description:
          "Tighten nurture so trial users receive value before any sales call, improving close rates.",
      },
    ],
    proofPoint:
      "BrightPath Academy raised enrollment inquiries 175% year over year and reached 4.2x ROAS on their core certificate track.",
    relatedCaseStudySlug: "brightpath-academy",
  },
  {
    id: "healthcare",
    title: "Healthcare",
    subtitle: "Clinics, Hospitals & Wellness Practices",
    href: "/industries/healthcare",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Modern medical clinic representing healthcare industry solutions",
    iconId: "heart-pulse",
    headline: "Patient acquisition that earns trust — and passes compliance review.",
    description:
      "Healthcare marketing cannot sound like retail. We build location pages, content, and campaigns that feel credible to patients and defensible to your compliance team.",
    painPoints: [
      "Websites list phone numbers but never explain why patients should choose you.",
      "Paid ads drive clicks; front desks field confused callers.",
      "Multi-location groups struggle with consistent local presence.",
      "Teams cannot tie marketing spend to booked appointments.",
    ],
    capabilities: [
      {
        title: "Location & provider SEO",
        description:
          "Pages with bios, insurance accepted, and condition-specific FAQs reviewed by your compliance team.",
      },
      {
        title: "Compliant paid campaigns",
        description:
          "HIPAA-conscious Meta and Google programs focused on appointment requests, not aggressive retargeting.",
      },
      {
        title: "Patient education content",
        description:
          "Monthly articles tied to seasonal search demand — allergies, sports physicals, preventive care.",
      },
      {
        title: "Call & appointment tracking",
        description:
          "See which channels produce booked appointments at each clinic, not just form fills.",
      },
    ],
    proofPoint:
      "Meridian Health Network tripled qualified patient inquiries in six months while cutting cost per booked appointment 41%.",
    relatedCaseStudySlug: "meridian-health",
  },
  {
    id: "real-estate",
    title: "Real Estate",
    subtitle: "Agents, Developers & Property Management",
    href: "/industries/real-estate",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Modern luxury home representing real estate industry solutions",
    iconId: "building",
    headline: "Leads that know whether they are buying or selling before they call.",
    description:
      "Boutique brokerages compete against national portals with fragmented agent marketing. We build separate buyer and seller funnels under one brand — same brokerage, different paths, clear attribution.",
    painPoints: [
      "Agents run inconsistent Facebook ads with no shared creative standards.",
      "Seller leads hit a generic form; buyers bounce to faster listing search.",
      "No central view of which campaigns produce qualified conversations.",
      "Lead routing delays cost showings and listings.",
    ],
    capabilities: [
      {
        title: "Buyer & seller funnels",
        description:
          "Distinct offers — home valuations for sellers, curated listing alerts for buyers — with matching nurture.",
      },
      {
        title: "Centralized ad operations",
        description:
          "Brokerage-controlled creative with personal tracking links so agents see their own numbers.",
      },
      {
        title: "Neighborhood trust content",
        description:
          "Short agent intro videos for farm areas so prospects trust you before the first showing.",
      },
      {
        title: "CRM automations",
        description:
          "Route leads to the right agent in under five minutes with clear source attribution.",
      },
    ],
    proofPoint:
      "Lakeside Realty Partners cut cost per qualified lead 52% and nearly doubled listing inquiries with 100% agent adoption.",
    relatedCaseStudySlug: "lakeside-realty",
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    subtitle: "Online Stores, DTC Brands & Marketplaces",
    href: "/industries/ecommerce",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Shipping boxes representing e-commerce industry solutions",
    iconId: "shopping-cart",
    headline: "Grow revenue on the traffic you already pay for.",
    description:
      "Rising CAC and flat returns usually mean the store leaks margin before ads get a fair test. We fix product pages, email, and campaign structure — then scale what is already working.",
    painPoints: [
      "ROAS looks fine until returns and rising CAC are accounted for.",
      "Product pages load slowly on mobile and lack sizing clarity.",
      "Email only sends receipts — no replenishment or win-back.",
      "Ad spend chases top sellers with thin margins.",
    ],
    capabilities: [
      {
        title: "Conversion-focused PDPs",
        description:
          "Faster mobile pages, clearer sizing guides, and social proof placed where hesitation happens.",
      },
      {
        title: "Lifecycle email",
        description:
          "Post-purchase bundles, replenishment reminders, and browse-abandonment flows that recover lost carts.",
      },
      {
        title: "Margin-aware media",
        description:
          "Restructure Meta and Google around SKUs that profit — not just products that rank in analytics.",
      },
      {
        title: "Retention reporting",
        description:
          "Dashboards that separate acquisition lift from store fixes so you know what to scale.",
      },
    ],
    proofPoint:
      "Nova Commerce Co. grew revenue 89% on the same ad budget within two quarters, with conversion rate up 2.1 points.",
    relatedCaseStudySlug: "nova-commerce",
  },
];

export function getIndustryById(id: string): IndustryDetail | undefined {
  return industries.find((industry) => industry.id === id);
}
