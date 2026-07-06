import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { serviceCategories, services, servicesPage } from "@/data/services";

import { ServicePageCard } from "./ServicePageCard";

export function ServicesGrid() {
  return (
    <section aria-labelledby="services-grid-heading" className="bg-surface-primary pb-20 sm:pb-24">
      <Container>
        <h2 id="services-grid-heading" className="sr-only">
          All services
        </h2>

        <div className="space-y-16 sm:space-y-20">
          {serviceCategories.map((category) => {
            const categoryServices = services.filter((service) => service.category === category.id);

            if (!categoryServices.length) {
              return null;
            }

            return (
              <div key={category.id}>
                <div className="border-b border-white/[0.06] pb-4">
                  <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                    {category.label}
                  </h3>
                </div>
                <ul className="mt-8 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                  {categoryServices.map((service) => (
                    <li key={service.id}>
                      <ServicePageCard service={service} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-white/10 bg-[#111118] px-6 py-12 text-center sm:mt-20 sm:px-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            {servicesPage.packagesOverline}
          </p>
          <h3 className="mt-5 font-display text-[1.75rem] font-bold leading-[1.15] text-white sm:text-3xl">
            {servicesPage.packagesTitle}
          </h3>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-content-secondary sm:text-lg">
            {servicesPage.packagesDescription}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Link
              href="/packages/all-in-one"
              className="bg-gold-gradient inline-flex min-h-[3.25rem] items-center justify-center rounded-lg px-8 py-3.5 text-sm font-semibold text-black shadow-glow transition-opacity hover:opacity-90 sm:text-base"
            >
              {servicesPage.allInOneLabel}
            </Link>
            <Link
              href="/packages/enterprise"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
            >
              {servicesPage.enterpriseLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
