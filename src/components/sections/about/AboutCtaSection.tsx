import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { aboutCta } from "@/data/about";
import { siteConfig } from "@/lib/constants";

const addressLine = `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.region} ${siteConfig.address.postalCode}`;

export function AboutCtaSection() {
  return (
    <Section variant="light" aria-labelledby="about-cta-heading" className="bg-white !py-16 lg:!py-20" divider={false}>
      <Container>
        <div className="overflow-hidden rounded-2xl shadow-[0_8px_40px_-12px_rgba(15,23,42,0.2)]">
          <div className="grid lg:grid-cols-2">
            <div className="bg-[#050505] px-7 py-12 sm:px-10 sm:py-14 lg:py-16">
              <h2
                id="about-cta-heading"
                className="font-serif text-[1.75rem] font-bold leading-tight text-white sm:text-[2.25rem]"
              >
                {aboutCta.title}
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-content-secondary">
                {aboutCta.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={aboutCta.primaryCtaHref}
                  className="bg-gold-gradient inline-flex min-h-11 items-center justify-center rounded-full px-7 text-sm font-semibold uppercase tracking-wide text-black transition-opacity hover:opacity-90"
                >
                  {aboutCta.primaryCta}
                </Link>
                <Link
                  href={aboutCta.secondaryCtaHref}
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/40 px-7 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:border-white hover:bg-white/5"
                >
                  {aboutCta.secondaryCta}
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 px-7 py-12 sm:px-10 sm:py-14 lg:py-16">
              <ul className="flex flex-col gap-8">
                <li className="flex gap-4">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-navy-950/70" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-navy-950/60">Email</p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="mt-1 block font-display text-base font-bold text-navy-950 hover:underline sm:text-lg"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-navy-950/70" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-navy-950/60">Phone</p>
                    <a
                      href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
                      className="mt-1 block font-display text-base font-bold text-navy-950 hover:underline sm:text-lg"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-navy-950/70" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-navy-950/60">Office</p>
                    <p className="mt-1 font-display text-base font-bold leading-snug text-navy-950 sm:text-lg">
                      {addressLine}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
