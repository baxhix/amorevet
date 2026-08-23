import Image from "next/image";
import { TESTIMONIALS } from "./data";
import { Quote, Star } from "./icons";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { SectionHead } from "./ui";

export default function Testimonials() {
  return (
    <section id="depoimentos" className="nd-grain relative overflow-hidden bg-primary py-24 text-white sm:py-28">
      <div className="pointer-events-none absolute -right-16 -top-10 h-80 w-80 rounded-full bg-white/10 blur-[120px]" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-primary-dark/40 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <SectionHead light title={<>Histórias de quem<br />já é da família</>}>
            Quem confia na Amor&Vet, recomenda. Veja o que os tutores contam sobre
            a experiência com a nossa equipe.
          </SectionHead>
        </Reveal>

        <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <StaggerItem key={t.name}>
              <figure className="flex h-full flex-col rounded-[1.6rem] bg-white/[0.08] p-7 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1.5">
                <Quote className="h-9 w-9 text-white/30" />
                <div className="mt-3 flex gap-1 text-secondary-light">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4" />
                  ))}
                </div>
                <blockquote className="mt-4 grow text-[0.95rem] leading-relaxed text-white/85">
                  “{t.text}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/15 pt-5">
                  <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-white/30">
                    <Image src={t.photo} alt={t.name} fill sizes="44px" className="object-cover" />
                  </span>
                  <div>
                    <p className="text-[0.95rem] font-semibold text-white">{t.name}</p>
                    <p className="text-[0.8rem] text-white/60">{t.pet}</p>
                  </div>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
