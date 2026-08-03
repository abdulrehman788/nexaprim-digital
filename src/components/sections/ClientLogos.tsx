import { ClientLogoItem } from "@/components/ui/ClientLogoItem";
import { Container } from "@/components/ui/Container";
import { clients, clientLogosHeading } from "@/data/clients";

/**
 * Fully dark partners strip — black surface end-to-end so any logo
 * sits on the same ground as the rest of the homepage.
 */
export function ClientLogos() {
  return (
    <section aria-label="Client logos" className="bg-[#050505] py-12 sm:py-14">
      <Container>
        <div className="w-full rounded-2xl border border-white/10 bg-black px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
          <h2
            className="mb-8 text-center font-display text-2xl font-bold uppercase tracking-[0.18em] sm:mb-9 sm:text-3xl lg:text-4xl"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #64748b 0%, #94a3b8 35%, #e2e8f0 70%, #cbd5e1 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            {clientLogosHeading}
          </h2>

          <ul className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-3 sm:gap-5">
            {clients.map((client) => (
              <li key={client.id} className="w-full">
                <div className="flex h-full min-h-[5.5rem] items-center justify-center rounded-xl border border-white/10 bg-[#0a0a0a] px-4 py-4 sm:min-h-[6.25rem] sm:px-5">
                  <ClientLogoItem
                    name={client.name}
                    logo={client.logo}
                    logoAlt={client.logoAlt}
                    size={client.logoSize}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
