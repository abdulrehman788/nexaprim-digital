import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { HomeServiceCard } from "@/components/sections/home/HomeServiceCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { homepageServices } from "@/data/homepage-services";
import { servicesSection } from "@/data/services";

export function ServicesSection() {
  return (
    <Section variant="light" aria-labelledby="services-heading" className="content-auto">
      <Container className="max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="section-overline">Our services</p>
            <h2
              id="services-heading"
              className="mt-3 font-display text-display-sm font-bold text-slate-900 sm:text-display-md"
            >
              Every Niche. One{" "}
              <span className="text-gold-gradient">Accountable</span>{" "}
              <span className="text-brand-orange">Team.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              {servicesSection.description}
            </p>
          </div>
          <Link
            href={servicesSection.ctaHref}
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-slate-900 px-6 text-sm font-semibold text-white transition-colors hover:bg-slate-800 sm:h-12 sm:px-7"
          >
            {servicesSection.ctaLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-10 grid list-none auto-rows-fr gap-5 p-0 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:gap-6">
          {homepageServices.map((service) => (
            <li key={service.id} className="min-w-0">
              <HomeServiceCard service={service} />
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-sm text-slate-500">
          <span className="text-violet-500" aria-hidden="true">
            ✦
          </span>{" "}
          Need a custom combination?{" "}
          <Link
            href="/contact"
            className="font-semibold text-violet-600 transition-colors hover:text-violet-500"
          >
            Talk to our strategists
            <ArrowRight className="ml-1 inline h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </p>
      </Container>
    </Section>
  );
}
