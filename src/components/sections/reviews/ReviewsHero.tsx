import { Container } from "@/components/ui/Container";
import { reviewsPage } from "@/data/reviews";

function HeroDecorations() {
  return (
    <svg
      className="pointer-events-none absolute right-[8%] top-[10%] h-[70%] w-[45%] opacity-[0.12]"
      viewBox="0 0 500 500"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="260" cy="260" r="200" stroke="#D4AF37" strokeWidth="0.9" />
      <circle cx="260" cy="260" r="245" stroke="#D4AF37" strokeWidth="0.7" opacity="0.65" />
    </svg>
  );
}

export function ReviewsHero() {
  return (
    <section
      aria-labelledby="reviews-hero-heading"
      className="relative overflow-hidden bg-[#050505] pb-16 pt-32 lg:pb-20 lg:pt-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(197,163,88,0.09),transparent_60%)]" />
      <HeroDecorations />

      <Container className="relative">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-accent sm:text-sm">
          {reviewsPage.overline}
        </p>
        <h1
          id="reviews-hero-heading"
          className="max-w-3xl font-display text-[2rem] font-bold leading-[1.1] text-white sm:text-display-md lg:text-[3.25rem]"
        >
          {reviewsPage.titleLine1}{" "}
          <span className="font-serif text-gold-gradient">{reviewsPage.titleAccent}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-content-secondary sm:text-lg">
          {reviewsPage.description}
        </p>
      </Container>
    </section>
  );
}
