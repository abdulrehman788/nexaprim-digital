import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { packages, packagesSection } from "@/data/packages";

export function PackagesSection() {
  return (
    <Section id="packages" variant="dark" aria-labelledby="packages-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <h2
              id="packages-heading"
              className="font-display text-display-sm text-content-primary sm:text-display-md"
            >
              {packagesSection.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-content-secondary">
              {packagesSection.description}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {packages.map((pkg) => {
              const Icon = pkg.icon;
              return (
                <Card
                  key={pkg.id}
                  featured={pkg.featured}
                  className="relative flex flex-col"
                >
                  {pkg.badge ? (
                    <Badge className="absolute -top-3 left-5">{pkg.badge}</Badge>
                  ) : null}
                  <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-lg font-bold text-content-primary">
                    {pkg.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-content-secondary">
                    {pkg.description}
                  </p>
                  <Link
                    href={pkg.href}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
                  >
                    Learn More
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
