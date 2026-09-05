import Image from "next/image";
import { TEAM } from "./data";
import { ShieldCheck, Users } from "./icons";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { SectionHead } from "./ui";

export default function Team() {
  return (
    <section id="equipe" className="relative bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <SectionHead title={<span className="text-primary">Quem cuida do seu pet</span>}>
            Profissionais dedicados, com formação contínua e amor genuíno pelos
            animais — prontos para acolher você e o seu melhor amigo.
          </SectionHead>
        </Reveal>

        <Stagger className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {TEAM.map((m, i) => (
            <StaggerItem key={i}>
              <figure className="group relative overflow-hidden rounded-[1.8rem] bg-ink">
                <div className="relative aspect-[3/4.6] overflow-hidden">
                  {m.photo ? (
                    <Image
                      src={m.photo}
                      alt={m.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center bg-gradient-to-br from-primary-dark to-ink">
                      <Users className="h-14 w-14 text-white/25 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/15 to-transparent" />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  {m.name && (
                    <p className="text-[0.95rem] font-semibold leading-tight text-white sm:text-[1.05rem]">{m.name}</p>
                  )}
                  <p className="mt-1 text-[0.78rem] font-medium leading-snug text-primary-light sm:text-[0.82rem]">{m.role}</p>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-10 flex items-center gap-2.5 text-[0.88rem] text-ink/55">
          <ShieldCheck className="h-5 w-5 text-primary" />
          Equipe registrada e responsável técnica ativa no CRMV-PR
        </Reveal>
      </div>
    </section>
  );
}
