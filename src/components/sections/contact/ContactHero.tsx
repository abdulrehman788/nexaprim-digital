import { Container } from "@/components/ui/Container";
import { contactPage } from "@/data/contact";

function HeroDecorations() {
  return (
    <>
      <svg
        className="pointer-events-none absolute right-[10%] top-[15%] h-[65%] w-[40%] opacity-[0.12]"
        viewBox="0 0 500 500"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="260" cy="260" r="200" stroke="#D4AF37" strokeWidth="0.9" />
        <circle cx="260" cy="260" r="245" stroke="#D4AF37" strokeWidth="0.7" opacity="0.65" />
      </svg>
      <span
        className="absolute left-[18%] top-[22%] h-1 w-1 rounded-full bg-accent opacity-40"
        aria-hidden="true"
      />
    </>
  );
}

export function ContactHero() {
  return (
    <section
      aria-labelledby="contact-hero-heading"
      className="relative overflow-hidden bg-[#050505] pb-16 pt-32 lg:pb-20 lg:pt-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_40%_30%,rgba(197,163,88,0.08),transparent_55%)]" />
      <HeroDecorations />

      <Container className="relative">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-accent sm:text-sm">
          {contactPage.overline}
        </p>
        <h1
          id="contact-hero-heading"
          className="max-w-3xl font-display text-[2rem] font-bold leading-[1.1] text-white sm:text-display-md lg:text-[3.25rem]"
        >
          {contactPage.titleLine1}{" "}
          <span className="font-serif text-gold-gradient">{contactPage.titleAccent}</span>.
          <span className="mt-2 block font-serif text-gold-gradient">{contactPage.titleLine2}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-content-secondary sm:text-lg">
          {contactPage.description}
        </p>
      </Container>
    </section>
  );
}
