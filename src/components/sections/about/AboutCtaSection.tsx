import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { aboutCta } from "@/data/about";
import { siteConfig } from "@/lib/constants";

const addressLine = `${siteConfig.address.city}, ${siteConfig.address.region} ${siteConfig.address.postalCode}`;

export function AboutCtaSection() {
  return (
    <section
      aria-labelledby="about-cta-heading"
      className="border-t border-slate-200/80 bg-white py-20 lg:py-28"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-600">
            {aboutCta.overline}
          </p>
          <h2
            id="about-cta-heading"
            className="mt-4 font-display text-[1.75rem] font-bold leading-tight text-slate-900 sm:text-3xl"
          >
            {aboutCta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-600">
            {aboutCta.description}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={aboutCta.primaryCtaHref}
              className="bg-gold-gradient inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-lg px-8 text-sm font-semibold text-black shadow-glow transition-opacity hover:opacity-90 sm:w-auto sm:text-base"
            >
              {aboutCta.primaryCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href={aboutCta.secondaryCtaHref}
              className="inline-flex min-h-[3.25rem] w-full items-center justify-center rounded-lg border border-slate-300 px-8 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50 sm:w-auto sm:text-base"
            >
              {aboutCta.secondaryCta}
            </Link>
          </div>
        </div>

        <ul className="mt-14 flex flex-col items-center justify-center gap-6 border-t border-slate-200 pt-10 sm:flex-row sm:gap-10 lg:gap-14">
          <li>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2.5 text-sm text-slate-600 transition-colors hover:text-accent"
            >
              <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              {siteConfig.email}
            </a>
          </li>
          <li>
            <a
              href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
              className="flex items-center gap-2.5 text-sm text-slate-600 transition-colors hover:text-accent"
            >
              <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              {siteConfig.phone}
            </a>
          </li>
          <li className="flex items-center gap-2.5 text-sm text-slate-600">
            <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            {addressLine}
          </li>
        </ul>
      </Container>
    </section>
  );
}
