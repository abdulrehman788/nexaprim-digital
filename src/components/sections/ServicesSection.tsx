import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { homepageServices, servicesSection } from "@/data/services";
import { cn } from "@/lib/utils";

interface ServicesSectionProps {
  variant?: "light" | "dark";
}

export function ServicesSection({ variant = "light" }: ServicesSectionProps) {
  const isDark = variant === "dark";

  return (
    <Section variant={variant} aria-labelledby="services-heading">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2
              id="services-heading"
              className={cn(
                "font-display text-display-sm sm:text-display-md",
                isDark ? "text-content-primary" : "text-slate-900",
              )}
            >
              {servicesSection.title}
            </h2>
            <p
              className={cn(
                "mt-4 text-base leading-relaxed sm:text-lg",
                isDark ? "text-content-secondary" : "text-slate-600",
              )}
            >
              {servicesSection.description}
            </p>
          </div>
          <Button
            href={servicesSection.ctaHref}
            variant="outline"
            className={cn(
              "shrink-0",
              isDark
                ? "border-white/40 text-white hover:border-white hover:bg-white/5 hover:text-white"
                : "border-slate-200 text-slate-900 hover:border-accent hover:text-accent",
            )}
          >
            {servicesSection.ctaLabel}
          </Button>
        </div>

        <ul className="mt-12 grid list-none gap-6 p-0 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {homepageServices.map((service) => (
            <li key={service.id}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>

        <p
          className={cn(
            "mt-10 text-center text-sm",
            isDark ? "text-content-muted" : "text-slate-500",
          )}
        >
          Need a custom combination?{" "}
          <Link
            href="/contact"
            className="font-semibold text-accent transition-colors hover:text-accent-hover"
          >
            Talk to our strategists
            <ArrowRight className="ml-1 inline h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </p>
      </Container>
    </Section>
  );
}
