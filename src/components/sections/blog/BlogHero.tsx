import { Container } from "@/components/ui/Container";

export function BlogHero() {
  return (
    <section className="border-b border-white/[0.06] bg-[#050505] pt-28 sm:pt-32">
      <Container className="pb-12 sm:pb-14">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Insights</p>
        <h1 className="mt-3 max-w-3xl font-serif text-3xl font-bold text-white sm:text-4xl">
          Digital marketing & growth{" "}
          <span className="text-gold-gradient">insights</span>
        </h1>
        <p className="mt-4 max-w-2xl text-base text-content-secondary sm:text-lg">
          Strategy, SEO, paid media, and web — practical thinking from the NexaPrime team.
        </p>
      </Container>
    </section>
  );
}
