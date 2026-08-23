import { DIFFERENTIALS } from "./data";
import { ICONS } from "./icons";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { SectionTitle, Lede, ButtonGhost } from "./ui";

export default function WhyUs() {
  return (
    <section id="diferenciais" className="relative overflow-hidden bg-white py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        {/* Texto */}
        <Reveal>
          <SectionTitle>
            <span className="text-primary">Uma clínica que parece parte da família</span>
          </SectionTitle>
          <Lede className="mt-5">
            Fundada em 2013, a Amor&Vet se tornou referência em Londrina por unir
            medicina veterinária de excelência a um atendimento que faz tutores e
            pets se sentirem em casa.
          </Lede>

          <div className="mt-8 flex items-center gap-4 rounded-2xl bg-cream p-5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-lg font-bold text-white">
              13
            </span>
            <p className="text-[0.95rem] leading-relaxed text-ink/65">
              Mais de uma década de histórias ao lado de quem você ama —
              construindo confiança consulta após consulta.
            </p>
          </div>

          <div className="mt-8">
            <ButtonGhost href="#equipe">Conhecer a equipe</ButtonGhost>
          </div>
        </Reveal>

        {/* Cards */}
        <Stagger className="grid gap-4 sm:grid-cols-2">
          {DIFFERENTIALS.map((d) => {
            const Icon = ICONS[d.icon];
            return (
              <StaggerItem key={d.title}>
                <div className="group h-full rounded-[1.5rem] bg-cream p-6 transition-all duration-300 hover:-translate-y-1 hover:nd-shadow-lg">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-50 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-ink">{d.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/55">{d.description}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
