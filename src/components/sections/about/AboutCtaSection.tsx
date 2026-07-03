import { MessageSquare, Route, Timer } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { aboutCta } from "@/data/about";
import { ctaLinks } from "@/lib/constants";

const benefitIcons = {
  call: MessageSquare,
  plan: Route,
  timeline: Timer,
} as const;

export function AboutCtaSection() {
  return (
    <Section variant="light" aria-labelledby="about-cta-heading" className="!py-20 lg:!py-24">
      <Container>
        <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-card">
          <div className="grid lg:grid-cols-2">
            <div className="bg-[#050505] px-6 py-14 sm:px-10 lg:py-16">
              <h2
                id="about-cta-heading"
                className="font-serif text-display-sm font-bold text-white sm:text-[2rem]"
              >
                {aboutCta.title}
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-content-secondary">
                {aboutCta.description}
              </p>
              <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Button href={ctaLinks.strategyCall} size="lg" pill className="w-full sm:w-auto">
                  {aboutCta.primaryCta}
                </Button>
                <Button
                  href={ctaLinks.caseStudies}
                  variant="outline"
                  size="lg"
                  pill
                  className="w-full border-white/40 text-white hover:border-white hover:bg-white/5 hover:text-white sm:w-auto"
                >
                  {aboutCta.secondaryCta}
                </Button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 px-6 py-14 sm:px-10 lg:py-16">
              <ul className="flex flex-col gap-7">
                {aboutCta.benefits.map((benefit) => {
                  const Icon = benefitIcons[benefit.id as keyof typeof benefitIcons];
                  return (
                    <li key={benefit.id} className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy-950/20">
                        <Icon className="h-5 w-5 text-navy-950" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold text-navy-950">
                          {benefit.title}
                        </h3>
                        <p className="mt-1 text-sm text-navy-900/80">{benefit.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
