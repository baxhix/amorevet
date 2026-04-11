import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import ContactFormHome from "@/components/site/ContactFormHome";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://amorevet.letshub.com.br";

export const metadata: Metadata = {
  title: "Amor&Vet - Clínica Veterinária",
  description: "Clínica veterinária com mais de 10 anos de experiência. Consultas 24h, cirurgias, exames, vacinação e terapia com células-tronco para cães, gatos e exóticos.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Amor&Vet - Clínica Veterinária",
    description: "Cuidado veterinário com amor e profissionalismo. Pronto atendimento 24h.",
    url: SITE_URL,
    images: [{ url: `${SITE_URL}/logoamorevet.webp`, width: 800, height: 600, alt: "Amor&Vet Clínica Veterinária" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amor&Vet - Clínica Veterinária",
    description: "Cuidado veterinário com amor e profissionalismo. Pronto atendimento 24h.",
  },
};

export const dynamic = "force-dynamic";

async function getLatestPosts() {
  try {
    return await prisma.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
      include: { author: true, category: true },
    });
  } catch {
    return [];
  }
}

const SERVICES = [
  { icon: "🏥", title: "Internação", description: "Estrutura completa de internamento com monitoramento 24h para o seu pet." },
  { icon: "🚑", title: "Pronto Atendimento 24h", description: "Emergências veterinárias atendidas a qualquer hora do dia ou da noite." },
  { icon: "🔬", title: "Exames Laboratoriais", description: "Análises clínicas com resultados rápidos e precisos no próprio laboratório." },
  { icon: "📡", title: "Exames de Imagens", description: "Radiografia, ultrassonografia e outros exames por imagem de alta qualidade." },
  { icon: "🩺", title: "Especialidades Clínicas", description: "Atendimento especializado por médicos veterinários em diversas áreas clínicas." },
  { icon: "🏟️", title: "Especialidades Cirúrgicas", description: "Centro cirúrgico equipado para procedimentos eletivos e de urgência." },
  { icon: "🌿", title: "Medicina Integrativa", description: "Acupuntura, fisioterapia e terapias complementares para bem-estar animal." },
];

const SPECIALTIES = [
  { icon: "❤️", title: "Cardiologia" },
  { icon: "🧠", title: "Neurologia" },
  { icon: "👁️", title: "Oftalmologia" },
  { icon: "🎗️", title: "Oncologia" },
  { icon: "🌿", title: "Homeopatia" },
  { icon: "🥗", title: "Nutrologia" },
  { icon: "🦴", title: "Ortopedia" },
  { icon: "🔬", title: "Terapia Celular" },
];

const STEM_CELL_INDICATIONS = [
  "Sequelas neurológicas de cinomose",
  "Osteoartrite e osteoartrose",
  "Lesões ligamentares e tendíneas",
  "Problemas oftálmicos como ceratoconjuntivite seca e úlceras de córnea",
  "Doenças renais, tanto agudas quanto crônicas",
  "Dermatite atópica e outras condições dermatológicas",
  "Traumas medulares e outras discopatias",
  "Condições geriátricas diversas que afetam a qualidade de vida dos animais mais velhos",
];

const GALLERY_ITEMS = [
  { label: "Recepção", bg: "from-primary/20 to-primary-100" },
  { label: "Consultório", bg: "from-secondary-light to-secondary/30" },
  { label: "Centro Cirúrgico", bg: "from-primary-100 to-primary/20" },
  { label: "Laboratório", bg: "from-secondary/20 to-secondary-light" },
  { label: "Internação", bg: "from-primary/10 to-primary-100" },
  { label: "Sala de Imagem", bg: "from-secondary-light to-secondary/20" },
];

export default async function HomePage() {
  const posts = await getLatestPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    name: "Amor&Vet Clínica Veterinária",
    url: SITE_URL,
    logo: `${SITE_URL}/logoamorevet.webp`,
    image: `${SITE_URL}/logoamorevet.webp`,
    description:
      "Clínica veterinária com mais de 10 anos de experiência. Atendimento completo para cães, gatos e animais exóticos.",
    foundingDate: "2013",
    numberOfEmployees: { "@type": "QuantitativeValue", value: 8 },
    medicalSpecialty: "Veterinary Medicine",
    availableService: SERVICES.map((s) => ({
      "@type": "MedicalProcedure",
      name: s.title,
      description: s.description,
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "13:00",
      },
    ],
    sameAs: [SITE_URL],
  };

  return (
    <>
      {/* JSON-LD VeterinaryClinic */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-primary-dark to-primary text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-5xl mb-6 block">🐾</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Cuidamos do seu pet com{" "}
            <span style={{ color: "#F9B7A9" }}>amor</span> e dedicação
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Clínica veterinária completa com profissionais apaixonados pela saúde e bem-estar dos animais. Pronto atendimento 24h.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/5543993777792"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary-dark px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Agendar pelo WhatsApp
            </a>
            <Link
              href="/servicos"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Nossos Serviços
            </Link>
          </div>
        </div>
      </section>

      {/* ── DESTAQUES ─────────────────────────────────────── */}
      <section className="py-14 px-4 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
                    <circle cx="20" cy="20" r="20" fill="#639197" fillOpacity="0.12" />
                    <path d="M13 21l5 5 9-10" stroke="#639197" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                title: "Excelência nos Serviços",
                text: "A Amor&Vet se destaca pela dedicação e qualidade no atendimento veterinário. Com uma equipe altamente qualificada e comprometida, a clínica oferece serviços que abrangem desde consultas e exames até internações e cirurgias, sempre priorizando o bem-estar dos animais.",
              },
              {
                icon: (
                  <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
                    <circle cx="20" cy="20" r="20" fill="#F9B7A9" fillOpacity="0.25" />
                    <path d="M20 12v8l5 3" stroke="#639197" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="20" cy="20" r="8" stroke="#639197" strokeWidth="2" />
                  </svg>
                ),
                title: "Resultados Comprovados",
                text: "A clínica tem um histórico de sucesso no tratamento de diversas condições de saúde animal. A combinação de profissionais experientes e protocolos eficazes resulta em altas taxas de recuperação e satisfação dos tutores.",
              },
              {
                icon: (
                  <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
                    <circle cx="20" cy="20" r="20" fill="#639197" fillOpacity="0.12" />
                    <path d="M14 26l4-8 4 4 4-8" stroke="#639197" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                title: "Tecnologia de Ponta",
                text: "Investindo continuamente em inovação, a Amor&Vet utiliza equipamentos modernos e técnicas avançadas para diagnósticos e tratamentos. A integração de tecnologia de ponta permite uma abordagem precisa e eficiente, assegurando diagnósticos rápidos e terapias eficazes.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-start gap-4 p-7 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-primary/20 transition-all group"
              >
                <div className="flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="font-bold text-dark text-lg mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-dark-600 text-sm leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOSSOS SERVIÇOS ───────────────────────────────── */}
      <section id="servicos" className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark mb-3">Nossos Serviços</h2>
            <p className="text-dark-600 max-w-2xl mx-auto leading-relaxed">
              Nossa equipe é altamente especializada e está constantemente se atualizando com as
              últimas inovações terapêuticas. Estamos comprometidos em oferecer o melhor
              atendimento para o seu companheiro de quatro patas. Confira alguns dos nossos serviços:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/30 transition-all group"
              >
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-semibold text-dark mb-2 group-hover:text-primary transition-colors">
                  {s.title}
                </h3>
                <p className="text-dark-600 text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOSSAS ESPECIALIDADES ─────────────────────────── */}
      <section id="especialidades" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark mb-3">Nossas Especialidades</h2>
            <p className="text-dark-600 max-w-xl mx-auto">
              Atendimento especializado em diversas áreas da medicina veterinária.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {SPECIALTIES.map((sp) => (
              <div
                key={sp.title}
                className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-secondary transition-all group"
              >
                <span className="text-4xl mb-3">{sp.icon}</span>
                <span className="font-semibold text-dark text-sm group-hover:text-primary transition-colors">
                  {sp.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LABORATÓRIO DE CÉLULAS-TRONCO ─────────────────── */}
      <section id="celulas-tronco" className="py-20 px-4" style={{ background: "linear-gradient(135deg, #eef4f5 0%, #fde8e3 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <span className="inline-block bg-secondary text-dark text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                Inovação &amp; Tecnologia
              </span>
              <h2 className="text-3xl font-bold text-dark mb-5 leading-snug">
                Laboratório de Células-Tronco
              </h2>
              <p className="text-dark-600 leading-relaxed mb-6">
                A terapia com células-tronco, uma das abordagens mais promissoras na medicina
                regenerativa, é uma técnica avançada que a Clínica Amor&Vet emprega para tratar
                uma variedade de condições clínicas em animais de estimação. Utilizando células
                obtidas do próprio tecido adiposo do animal, este tratamento tem o objetivo de
                reparar tecidos danificados, regenerar células e restaurar a funcionalidade de
                órgãos afetados por doenças ou lesões.
              </p>
              <a
                href="https://wa.me/5543993777792"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium"
              >
                Saiba mais pelo WhatsApp
              </a>
            </div>

            <div>
              <h3 className="font-bold text-dark mb-4 text-lg">A terapia é indicada para:</h3>
              <ul className="space-y-3">
                {STEM_CELL_INDICATIONS.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span className="text-dark-600 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── NOSSO ESPAÇO (GALERIA) ────────────────────────── */}
      <section id="espaco" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark mb-3">Nosso Espaço</h2>
            <p className="text-dark-600 max-w-xl mx-auto">
              Estrutura moderna e acolhedora pensada para o conforto e segurança do seu pet.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GALLERY_ITEMS.map((item) => (
              <div
                key={item.label}
                className={`relative rounded-2xl overflow-hidden h-52 bg-gradient-to-br ${item.bg} flex items-end group cursor-pointer`}
              >
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                <div className="relative w-full bg-gradient-to-t from-dark/60 to-transparent p-4">
                  <span className="text-white font-semibold text-sm">{item.label}</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-5xl opacity-20">🐾</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG ─────────────────────────────────────────── */}
      {posts.length > 0 && (
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-dark mb-3">Blog &amp; Dicas</h2>
              <p className="text-dark-600">Conteúdo educativo para tutores responsáveis.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="bg-primary-100 h-40 flex items-center justify-center text-4xl">🐾</div>
                  <div className="p-5">
                    {post.category && (
                      <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                        {post.category.name}
                      </span>
                    )}
                    <h3 className="font-bold text-dark mt-1 mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-dark-600 text-sm line-clamp-2 mb-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-dark-400">
                      <span>{post.author.name}</span>
                      <span>{post.publishedAt ? formatDate(post.publishedAt) : ""}</span>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-3 block text-sm text-primary font-semibold hover:underline"
                    >
                      Ler artigo →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/blog" className="text-primary font-semibold hover:underline">
                Ver todos os artigos →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── FALE CONOSCO ─────────────────────────────────── */}
      <section id="contato" className="py-20 px-4 bg-primary-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Info */}
            <div>
              <h2 className="text-3xl font-bold text-dark mb-4">Fale Conosco</h2>
              <p className="text-dark-600 leading-relaxed mb-8">
                Fique à vontade para falar conosco. Preencha o formulário e entraremos em contato
                o mais breve possível, ou, se preferir, nos chame no WhatsApp.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: "📍", text: "Av. Aminthas de Barros, 475, Ipanema, Londrina – PR, CEP 86.015-180" },
                  { icon: "📞", text: "(43) 98863-1862 | (43) 3293-0268" },
                  { icon: "✉️", text: "contato.amorevet@gmail.com" },
                  { icon: "🕐", text: "Pronto Atendimento 24 horas" },
                ].map((item) => (
                  <div key={item.icon} className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <span className="text-dark-600 text-sm leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://wa.me/5543993777792"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg hover:bg-[#20b358] transition-colors font-semibold"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chamar no WhatsApp
              </a>

              <div className="mt-6 p-4 bg-white rounded-xl border border-secondary/40">
                <p className="text-sm text-dark-600">
                  🎓 Gostaria de realizar seu estágio com a gente?{" "}
                  <a
                    href="mailto:estagio.amorevet@gmail.com"
                    className="text-primary font-semibold hover:underline"
                  >
                    estagio.amorevet@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* Form */}
            <ContactFormHome />
          </div>
        </div>
      </section>
    </>
  );
}
