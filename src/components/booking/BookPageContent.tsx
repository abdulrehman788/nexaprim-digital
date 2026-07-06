import { StarryNightBackground } from "@/components/sections/services/StarryNightBackground";
import { ConsultationScheduler } from "@/components/booking/ConsultationScheduler";
import { Container } from "@/components/ui/Container";
import { bookingPage } from "@/data/booking";

export function BookPageContent() {
  return (
    <>
      <section
        aria-labelledby="book-heading"
        className="relative overflow-hidden px-4 pb-10 pt-36 sm:px-6 sm:pb-12 sm:pt-40 lg:pt-44"
      >
        <StarryNightBackground />
        <div
          className="pointer-events-none absolute left-1/2 top-24 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent sm:text-sm">
              {bookingPage.overline}
            </p>

            <h1
              id="book-heading"
              className="mt-5 font-display text-[2rem] font-bold leading-[1.12] text-white sm:text-[2.75rem] lg:text-[3.25rem] lg:leading-[1.1]"
            >
              {bookingPage.titleLine1}{" "}
              <span className="text-gold-gradient">{bookingPage.titleAccent}</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-content-secondary sm:text-lg sm:leading-8">
              {bookingPage.description}
            </p>

            <p className="mt-4 text-sm text-content-muted">{bookingPage.metaLine}</p>
          </div>
        </Container>
      </section>

      <section aria-label="Consultation scheduling" className="pb-20 sm:pb-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <ConsultationScheduler />
          </div>
        </Container>
      </section>
    </>
  );
}
