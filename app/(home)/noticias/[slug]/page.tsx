import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { NEWS, CONTACT } from "@/components/novodesign/data";
import { ArrowRight } from "@/components/novodesign/icons";
import { ButtonWhatsApp } from "@/components/novodesign/ui";
import { SITE_URL } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return NEWS.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = NEWS.find((n) => n.slug === slug);
  if (!item) return { title: "Notícia não encontrada" };
  return {
    title: item.title,
    description: item.excerpt,
    alternates: { canonical: `${SITE_URL}/noticias/${item.slug}` },
    openGraph: {
      title: item.title,
      description: item.excerpt,
      type: "article",
      url: `${SITE_URL}/noticias/${item.slug}`,
      images: [{ url: `${SITE_URL}${item.image}` }],
    },
  };
}

export default async function NewsDetail({ params }: Props) {
  const { slug } = await params;
  const item = NEWS.find((n) => n.slug === slug);
  if (!item) notFound();

  const others = NEWS.filter((n) => n.slug !== item.slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: item.title,
    description: item.excerpt,
    image: `${SITE_URL}${item.image}`,
    articleSection: item.category,
    publisher: { "@type": "Organization", name: "Amor&Vet Clínica Veterinária" },
    mainEntityOfPage: `${SITE_URL}/noticias/${item.slug}`,
  };

  return (
    <article className="bg-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Cabeçalho verde (navbar legível) */}
      <header
        className="relative overflow-hidden pt-36 pb-20 text-white sm:pt-44"
        style={{ background: "linear-gradient(158deg, #2C807F 0%, #318687 42%, #49A3A2 100%)" }}
      >
        <div className="nd-paws pointer-events-none absolute inset-0 opacity-[0.06]" />
        <div className="relative mx-auto max-w-3xl px-6 sm:px-8">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-white/80 transition-colors hover:text-white"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Voltar para notícias
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-[0.8rem]">
            <span className="rounded-full bg-white/15 px-3 py-1 font-semibold uppercase tracking-wider">{item.category}</span>
            <span className="text-white/70">{item.date}</span>
          </div>
          <h1 className="mt-5 text-[2rem] font-bold leading-[1.12] tracking-tight sm:text-[2.6rem]">{item.title}</h1>
          <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-white/75">{item.excerpt}</p>
        </div>
      </header>

      {/* Corpo */}
      <div className="mx-auto max-w-3xl px-6 pb-24 sm:px-8">
        <div className="relative -mt-12 aspect-[16/9] overflow-hidden rounded-[1.6rem] ring-1 ring-white/50 nd-shadow-lg">
          <Image src={item.image} alt={item.title} fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
        </div>

        <div className="mt-10 space-y-5">
          {item.content.map((p, i) => (
            <p key={i} className="text-[1.05rem] leading-relaxed text-ink/75">{p}</p>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-[1.8rem] bg-white p-8 text-center nd-shadow-sm ring-1 ring-ink/5">
          <p className="text-[1.15rem] font-bold text-ink">Precisa de ajuda com o seu pet?</p>
          <p className="mt-1.5 text-[0.95rem] text-ink/55">Fale com a nossa equipe — pronto atendimento 24 horas.</p>
          <div className="mt-6 flex justify-center">
            <ButtonWhatsApp href={CONTACT.whatsapp}>Agendar pelo WhatsApp</ButtonWhatsApp>
          </div>
        </div>

        {/* Outras notícias */}
        {others.length > 0 && (
          <div className="mt-16">
            <h2 className="text-lg font-semibold text-ink">Continue lendo</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/noticias/${o.slug}`}
                  className="group flex items-center gap-4 rounded-2xl bg-white p-3 nd-shadow-sm ring-1 ring-ink/5 transition-all hover:-translate-y-0.5 hover:nd-shadow-lg"
                >
                  <span className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl">
                    <Image src={o.image} alt={o.title} fill sizes="80px" className="object-cover" />
                  </span>
                  <span className="min-w-0">
                    <span className="text-[0.68rem] font-bold uppercase tracking-wider text-secondary">{o.category}</span>
                    <span className="mt-0.5 line-clamp-2 block text-[0.92rem] font-semibold text-ink group-hover:text-primary-dark">{o.title}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
