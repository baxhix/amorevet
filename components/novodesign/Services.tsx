import { SERVICES, CONTACT } from "./data";
import { ICONS } from "./icons";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { SectionHead, ButtonGhost } from "./ui";

export default function Services() {
  return (
    <section id="servicos" className="relative bg-cream py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <SectionHead title={<span className="text-primary">Uma clínica completa,<br />num só lugar</span>}>
            Da prevenção às emergências, reunimos especialistas e tecnologia para
            cuidar de cada fase da vida do seu pet — com tranquilidade para você.
          </SectionHead>
        </Reveal>

        <Stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => {
            const Icon = ICONS[s.icon];
            const coral = s.tone === "coral";
            return (
              <StaggerItem key={s.title}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-white p-7 nd-shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:nd-shadow-lg">
                  {/* brilho de hover */}
                  <div
                    className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100 ${
                      coral ? "bg-secondary/25" : "bg-primary/25"
                    }`}
                  />
                  <div
                    className={`relative grid h-14 w-14 place-items-center rounded-2xl transition-colors duration-300 ${
                      coral
                        ? "bg-secondary-50 text-secondary group-hover:bg-secondary group-hover:text-white"
                        : "bg-primary-50 text-primary group-hover:bg-primary group-hover:text-white"
                    }`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="relative mt-6 text-lg font-semibold text-ink">{s.title}</h3>
                  <p className="relative mt-2.5 text-[0.95rem] leading-relaxed text-ink/55">{s.description}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <ButtonGhost href={CONTACT.whatsapp} external>
            Falar com um veterinário
          </ButtonGhost>
        </Reveal>
      </div>
    </section>
  );
}
