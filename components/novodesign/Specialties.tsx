import { SPECIALTIES } from "./data";
import { ICONS } from "./icons";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { SectionHead } from "./ui";

export default function Specialties() {
  const marquee = [...SPECIALTIES, ...SPECIALTIES];
  return (
    <section id="especialidades" className="nd-grain relative overflow-hidden bg-ink py-24 text-white sm:py-28">
      <div className="pointer-events-none absolute -left-20 top-0 h-80 w-80 rounded-full bg-primary/25 blur-[120px]" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-primary/15 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <SectionHead light title={<>Especialidades que<br />cuidam a fundo</>}>
            Diagnóstico preciso e tratamento dedicado em diversas áreas — porque
            cada caso merece o olhar de quem entende profundamente do assunto.
          </SectionHead>
        </Reveal>
      </div>

      {/* Marquee — pills sem borda */}
      <div className="nd-marquee-wrap relative mt-16 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="nd-marquee flex shrink-0 items-center gap-8 pr-8">
          {marquee.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <span key={i} className="inline-flex items-center gap-2.5 text-[1.05rem] font-medium text-white/75">
                <Icon className="h-5 w-5 text-primary-light" />
                {s.title}
              </span>
            );
          })}
        </div>
      </div>

      {/* Grid — itens sem caixa */}
      <div className="relative mx-auto mt-16 max-w-5xl px-6 sm:px-8">
        <Stagger className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          {SPECIALTIES.map((s) => {
            const Icon = ICONS[s.icon];
            return (
              <StaggerItem key={s.title}>
                <div className="group flex flex-col items-center gap-4 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/[0.06] text-primary-light transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </span>
                  <span className="text-[0.95rem] font-medium text-white/85">{s.title}</span>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
