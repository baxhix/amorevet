import Image from "next/image";
import Link from "next/link";
import { NEWS, CONTACT } from "./data";
import { ArrowRight, Instagram } from "./icons";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { SectionHead, ButtonGhost } from "./ui";

export default function News() {
  return (
    <section id="blog" className="relative bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <SectionHead title={<span className="text-primary">Notícias &amp; Dicas</span>}>
            Conteúdo para cuidar ainda melhor do seu pet — orientações da nossa
            equipe e novidades da clínica.
          </SectionHead>
        </Reveal>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
          {NEWS.map((item) => (
            <StaggerItem key={item.slug}>
              <Link
                href={`/noticias/${item.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-white nd-shadow-sm ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1.5 hover:nd-shadow-lg"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex grow flex-col p-6">
                  <div className="flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-wider text-secondary">
                    {item.category}
                    <span className="text-ink/25">•</span>
                    <span className="font-medium normal-case tracking-normal text-ink/45">{item.date}</span>
                  </div>
                  <h3 className="mt-2 line-clamp-2 text-[1.05rem] font-bold text-ink transition-colors group-hover:text-primary-dark">
                    {item.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 grow text-[0.88rem] leading-relaxed text-ink/55">{item.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 border-t border-ink/8 pt-4 text-[0.82rem] font-semibold text-primary-dark">
                    Ler artigo
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <ButtonGhost href={CONTACT.instagram} external icon={<Instagram className="h-5 w-5" />}>
            Acompanhe no Instagram
          </ButtonGhost>
        </Reveal>
      </div>
    </section>
  );
}
