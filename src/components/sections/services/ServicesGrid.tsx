import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/data/services";

export function ServicesGrid() {
  return (
    <Section variant="light" aria-labelledby="services-grid-heading" divider={false}>
      <Container>
        <h2 id="services-grid-heading" className="sr-only">
          All services
        </h2>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {services.map((service) => (
            <li key={service.id}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>

        <p className="mt-12 text-center text-sm text-slate-500">
          Need a custom combination?{" "}
          <Link
            href="/contact"
            className="font-semibold text-gold-600 transition-colors hover:text-gold-700"
          >
            Talk to our strategists
            <ArrowRight className="ml-1 inline h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </p>
      </Container>
    </Section>
  );
}
