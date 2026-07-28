import { ClientLogoItem } from "@/components/ui/ClientLogoItem";
import { Container } from "@/components/ui/Container";
import { clients, clientLogosHeading } from "@/data/clients";

export function ClientLogos() {
  return (
    <section
      aria-label="Client logos"
      className="border-y border-slate-200 bg-white py-12 lg:py-14"
    >
      <Container>
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.24em] text-slate-600 sm:mb-10">
          {clientLogosHeading}
        </p>

        <ul className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 sm:grid-cols-3 sm:gap-6 lg:gap-8">
          {clients.map((client, index) => (
            <li
              key={client.id}
              className={`flex items-center justify-center ${
                index > 0 ? "sm:border-l sm:border-slate-200" : ""
              }`}
            >
              <ClientLogoItem
                name={client.name}
                logo={client.logo}
                logoAlt={client.logoAlt}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
