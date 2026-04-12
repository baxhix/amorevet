import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import ContactFormHome from "@/components/site/ContactFormHome";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://amorevet.letshub.com.br";

export const metadata: Metadata = {
  title: "Amor&Vet - Clínica Veterinária",
  description:
    "Clínica veterinária com mais de 10 anos de experiência. Consultas 24h, cirurgias, exames, vacinação e terapia com células-tronco para cães, gatos e exóticos.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Amor&Vet - Clínica Veterinária",
    description: "Cuidado veterinário com amor e profissionalismo. Pronto atendimento 24h.",
    url: SITE_URL,
    images: [{ url: `${SITE_URL}/logoamorevet.webp`, width: 800, height: 600, alt: "Amor&Vet" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amor&Vet - Clínica Veterinária",
    description: "Cuidado veterinário com amor e profissionalismo. Pronto atendimento 24h.",
  },
};

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
  { icon: "📡", title: "Exames de Imagem", description: "Radiografia, ultrassonografia e outros exames por imagem de alta qualidade." },
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

const DIFFERENTIALS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Atendimento Humanizado",
    description: "Tratamos cada pet como único. Nossa equipe cuida com empatia, paciência e carinho.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    title: "Especialistas Qualificados",
    description: "8 veterinários com formação contínua em especialidades de ponta.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .03 2.998-1.302 3.05l-1.536.03A9.042 9.042 0 0112 21a9.041 9.041 0 01-6.364-2.617l-1.536-.03c-1.332-.052-2.302-2.05-1.302-3.05L4.2 14.8" />
      </svg>
    ),
    title: "Estrutura Moderna",
    description: "Centro cirúrgico, laboratório e UTI com equipamentos de última geração.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: "Prevenção em Foco",
    description: "Além de tratar, educamos os tutores para uma vida mais saudável com o pet.",
  },
];

const TESTIMONIALS = [
  {
    name: "Mariana Costa",
    pet: "Tutora da Luna",
    text: "A equipe da Amor&Vet cuida da minha gata como se fosse deles. Nunca vi tanto carinho num atendimento veterinário. Recomendo de olhos fechados!",
    rating: 5,
  },
  {
    name: "Rafael Souza",
    pet: "Tutor do Thor",
    text: "Meu cão precisou de cirurgia de emergência e a equipe agiu rápido. A estrutura é impressionante e o cuidado pós-operatório foi exemplar.",
    rating: 5,
  },
  {
    name: "Camila Mendes",
    pet: "Tutora da Mel e do Bob",
    text: "Tenho dois pets e confio totalmente na Amor&Vet. O atendimento é humanizado, os veterinários explicam tudo com clareza e o espaço é muito limpo.",
    rating: 5,
  },
];

const GALLERY_ITEMS = [
  { label: "Recepção", color: "from-primary-50 to-primary-100" },
  { label: "Consultório", color: "from-secondary-50 to-secondary-100" },
  { label: "Centro Cirúrgico", color: "from-primary-100 to-primary-50" },
  { label: "Laboratório", color: "from-secondary-100 to-secondary-50" },
  { label: "Internação", color: "from-primary-50 to-teal-50" },
  { label: "Sala de Imagem", color: "from-secondary-50 to-primary-50" },
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
    description: "Clínica veterinária com mais de 10 anos de experiência.",
    foundingDate: "2013",
    numberOfEmployees: { "@type": "QuantitativeValue", value: 8 },
    medicalSpecialty: "Veterinary Medicine",
    availableService: SERVICES.map((s) => ({
      "@type": "MedicalProcedure",
      name: s.title,
      description: s.description,
    })),
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "00:00", closes: "23:59" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday","Sunday"], opens: "00:00", closes: "23:59" },
    ],
    sameAs: [SITE_URL],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 px-4">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-secondary-50 via-secondary-50/30 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-primary-50 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <span className="inline-flex items-center gap-2 bg-secondary-50 text-secondary-dark text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                Pronto Atendimento 24 horas
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-dark leading-[1.15] mb-6">
                Cuidado veterinário{" "}
                <span className="text-secondary">que faz</span>{" "}
                diferença
              </h1>

              <p className="text-dark-400 text-lg leading-relaxed mb-8 max-w-lg">
                Mais de 10 anos ao lado de tutores e pets. Estrutura completa,
                equipe especializada e atendimento com amor em Londrina.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <a
                  href="https://wa.me/5543993777792"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-secondary text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-secondary-dark transition-all shadow-lg shadow-secondary/25 hover:shadow-secondary/40 active:scale-95"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Agendar pelo WhatsApp
                </a>
                <Link
                  href="/servicos"
                  className="inline-flex items-center justify-center gap-2 border-2 border-dark/15 text-dark-600 px-7 py-3.5 rounded-xl font-semibold hover:border-primary hover:text-primary transition-all"
                >
                  Ver nossos serviços
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 pt-6 border-t border-gray-100">
                {[
                  { value: "10+", label: "Anos" },
                  { value: "5k+", label: "Pets" },
                  { value: "8", label: "Vets" },
                  { value: "24h", label: "Atendimento" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-2xl font-bold text-secondary">{s.value}</p>
                    <p className="text-xs text-dark-400 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual */}
            <div className="relative hidden lg:flex items-center justify-center">
              <div className="relative w-80 h-80">
                {/* Main circle */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-secondary-100 to-secondary-50 flex items-center justify-center">
                  <span className="text-9xl">🐾</span>
                </div>
                {/* Floating badges */}
                <div className="absolute -top-4 -right-8 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <p className="text-xs font-bold text-dark">98%</p>
                    <p className="text-xs text-dark-400">Satisfação</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-8 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2">
                  <span className="text-2xl">🏥</span>
                  <div>
                    <p className="text-xs font-bold text-dark">24h</p>
                    <p className="text-xs text-dark-400">Emergência</p>
                  </div>
                </div>
                {/* Teal accent ring */}
                <div className="absolute -inset-4 rounded-full border-2 border-dashed border-primary/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVIÇOS ─────────────────────────────────────────── */}
      <section id="servicos" className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-secondary text-sm font-semibold uppercase tracking-widest mb-3">
              O que oferecemos
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Tudo que seu pet precisa
            </h2>
            <p className="text-dark-400 max-w-2xl mx-auto leading-relaxed">
              Uma clínica completa, com especialistas qualificados e tecnologia de ponta para
              garantir a saúde e o bem-estar do seu companheiro.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-secondary/30 hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary-50 flex items-center justify-center text-2xl mb-4 group-hover:bg-secondary-100 transition-colors">
                  {s.icon}
                </div>
                <h3 className="font-semibold text-dark mb-2 group-hover:text-secondary transition-colors">
                  {s.title}
                </h3>
                <p className="text-dark-400 text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/servicos"
              className="inline-flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all"
            >
              Ver todos os serviços
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── DIFERENCIAIS ─────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-primary text-sm font-semibold uppercase tracking-widest mb-3">
                Por que nos escolher
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-5 leading-tight">
                Uma clínica que parece
                <br />
                <span className="text-secondary">parte da família</span>
              </h2>
              <p className="text-dark-400 leading-relaxed mb-8">
                Fundada em 2013, a Amor&Vet cresceu se tornando referência em Londrina
                por combinar medicina veterinária de excelência com um atendimento
                que faz tutores e pets se sentirem em casa.
              </p>
              <Link
                href="/sobre"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                Conheça nossa história
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {DIFFERENTIALS.map((d) => (
                <div
                  key={d.title}
                  className="p-5 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-sm transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-all">
                    {d.icon}
                  </div>
                  <h3 className="font-semibold text-dark mb-1.5">{d.title}</h3>
                  <p className="text-dark-400 text-sm leading-relaxed">{d.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ESPECIALIDADES ───────────────────────────────────── */}
      <section id="especialidades" className="py-20 px-4 bg-dark">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-primary-light text-sm font-semibold uppercase tracking-widest mb-3">
              Medicina especializada
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Nossas Especialidades
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Atendimento especializado em diversas áreas da medicina veterinária,
              com diagnóstico preciso e tratamento eficaz.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {SPECIALTIES.map((sp) => (
              <div
                key={sp.title}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/40 transition-all group cursor-default"
              >
                <span className="text-4xl mb-3">{sp.icon}</span>
                <span className="font-semibold text-white/80 text-sm group-hover:text-white transition-colors">
                  {sp.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CÉLULAS-TRONCO ────────────────────────────────────── */}
      <section id="celulas-tronco" className="py-20 px-4 overflow-hidden relative bg-white">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-secondary-50 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary-50 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <span className="inline-flex items-center gap-2 bg-secondary-50 text-secondary-dark text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                🔬 Inovação & Tecnologia
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-5 leading-tight">
                Laboratório de{" "}
                <span className="text-secondary">Células-Tronco</span>
              </h2>
              <p className="text-dark-400 leading-relaxed mb-6">
                A terapia com células-tronco é uma das abordagens mais promissoras na medicina
                regenerativa. A Amor&Vet utiliza células obtidas do próprio tecido adiposo do
                animal para reparar tecidos danificados e restaurar a funcionalidade de órgãos
                afetados por doenças ou lesões.
              </p>
              <a
                href="https://wa.me/5543993777792"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-xl hover:bg-secondary-dark transition-all font-semibold shadow-lg shadow-secondary/20 active:scale-95"
              >
                Saiba mais pelo WhatsApp
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>

            <div>
              <h3 className="font-bold text-dark mb-5 text-lg">Indicada para:</h3>
              <ul className="space-y-3">
                {STEM_CELL_INDICATIONS.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-secondary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                        <path d="M2 6l3 3 5-5" stroke="#E96A55" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span className="text-dark-400 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── DEPOIMENTOS ──────────────────────────────────────── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-secondary text-sm font-semibold uppercase tracking-widest mb-3">
              Prova social
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              O que os tutores dizem
            </h2>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-12">
            {[
              { value: "5k+", label: "Pets atendidos" },
              { value: "98%", label: "Taxa de satisfação" },
              { value: "10+", label: "Anos de experiência" },
            ].map((s) => (
              <div key={s.label} className="text-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-3xl font-bold text-secondary mb-1">{s.value}</p>
                <p className="text-dark-400 text-sm">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-dark-600 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-secondary-50 flex items-center justify-center text-lg">
                    🐾
                  </div>
                  <div>
                    <p className="font-semibold text-dark text-sm">{t.name}</p>
                    <p className="text-dark-400 text-xs">{t.pet}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOSSO ESPAÇO ─────────────────────────────────────── */}
      <section id="espaco" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              Estrutura
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Nosso Espaço</h2>
            <p className="text-dark-400 max-w-xl mx-auto">
              Ambiente moderno e acolhedor pensado para o conforto e segurança do seu pet.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {GALLERY_ITEMS.map((item) => (
              <div
                key={item.label}
                className={`relative rounded-2xl overflow-hidden h-48 bg-gradient-to-br ${item.color} flex items-end group`}
              >
                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/10 transition-colors duration-300" />
                <div className="relative w-full bg-gradient-to-t from-dark/50 to-transparent p-4">
                  <span className="text-white font-semibold text-sm">{item.label}</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-5xl opacity-10">🐾</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG ─────────────────────────────────────────────── */}
      {posts.length > 0 && (
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="inline-block text-secondary text-sm font-semibold uppercase tracking-widest mb-3">
                  Conteúdo educativo
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-dark">Blog & Dicas</h2>
              </div>
              <Link
                href="/blog"
                className="hidden sm:inline-flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all"
              >
                Ver todos
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
                >
                  <div className="bg-gradient-to-br from-secondary-50 to-primary-50 h-44 flex items-center justify-center text-5xl">
                    🐾
                  </div>
                  <div className="p-5">
                    {post.category && (
                      <span className="text-xs font-semibold text-secondary uppercase tracking-wide">
                        {post.category.name}
                      </span>
                    )}
                    <h3 className="font-bold text-dark mt-1 mb-2 line-clamp-2 group-hover:text-secondary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-dark-400 text-sm line-clamp-2 mb-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-dark-400 mb-3">
                      <span>{post.author.name}</span>
                      <span>{post.publishedAt ? formatDate(post.publishedAt) : ""}</span>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm text-secondary font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      Ler artigo →
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-8 sm:hidden">
              <Link href="/blog" className="text-secondary font-semibold hover:underline">
                Ver todos os artigos →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA FINAL ────────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ background: "linear-gradient(135deg, #E96A55 0%, #D44E3B 50%, #3BABA8 100%)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-5xl mb-6 block">🐾</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
            Seu pet merece o melhor cuidado
          </h2>
          <p className="text-white/80 text-lg mb-8 leading-relaxed">
            Agende uma consulta hoje e descubra por que somos a clínica
            veterinária mais querida de Londrina.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/5543993777792"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-secondary-dark px-8 py-4 rounded-xl font-bold hover:bg-secondary-50 transition-all shadow-xl active:scale-95 text-lg"
            >
              Agendar Consulta Agora
            </a>
            <a
              href="tel:+5543988631862"
              className="border-2 border-white/40 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all"
            >
              (43) 98863-1862
            </a>
          </div>
        </div>
      </section>

      {/* ── FALE CONOSCO ─────────────────────────────────────── */}
      <section id="contato" className="py-20 px-4 bg-dark">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Info */}
            <div>
              <span className="inline-block text-primary-light text-sm font-semibold uppercase tracking-widest mb-3">
                Entre em contato
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
                Fale com a gente
              </h2>
              <p className="text-white/50 leading-relaxed mb-8">
                Preencha o formulário ou nos chame diretamente. Estamos prontos
                para atender você e o seu pet com toda atenção.
              </p>

              <div className="space-y-5 mb-8">
                {[
                  { icon: "📍", label: "Endereço", text: "Av. Aminthas de Barros, 475, Ipanema, Londrina – PR" },
                  { icon: "📞", label: "Telefone", text: "(43) 98863-1862 | (43) 3293-0268" },
                  { icon: "✉️", label: "E-mail", text: "contato.amorevet@gmail.com" },
                  { icon: "🕐", label: "Horário", text: "Pronto Atendimento 24 horas" },
                ].map((item) => (
                  <div key={item.icon} className="flex items-start gap-4">
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wide mb-0.5">{item.label}</p>
                      <p className="text-white/80 text-sm">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="https://wa.me/5543993777792"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl hover:bg-[#20b358] transition-all font-semibold shadow-lg active:scale-95"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chamar no WhatsApp
              </a>

              <div className="mt-5 p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-white/60 text-sm">
                  🎓 Interesse em estágio?{" "}
                  <a
                    href="mailto:estagio.amorevet@gmail.com"
                    className="text-primary-light font-semibold hover:underline"
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
