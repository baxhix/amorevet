import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://amorevet.letshub.com.br";

export const metadata: Metadata = {
  title: "Serviços",
  description: "Consultas, vacinação, cirurgias, exames, banho e tosa, odontologia veterinária e muito mais. Atendimento completo para cães, gatos e exóticos.",
  alternates: { canonical: `${SITE_URL}/servicos` },
  openGraph: {
    title: "Serviços Veterinários | Amor&Vet",
    description: "Atendimento veterinário completo com estrutura moderna e equipe especializada.",
    url: `${SITE_URL}/servicos`,
    images: [{ url: `${SITE_URL}/logoamorevet.webp`, width: 800, height: 600 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Serviços Veterinários | Amor&Vet",
    description: "Atendimento veterinário completo com estrutura moderna e equipe especializada.",
  },
};

async function getServices() {
  try {
    return await prisma.service.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
    });
  } catch {
    return [];
  }
}

const defaultServices = [
  { id: "1", icon: "🩺", title: "Consultas Clínicas", description: "Atendimento clínico completo para cães, gatos e outros pets. Realizamos anamnese detalhada, exame físico e orientações preventivas para manter seu animal sempre saudável." },
  { id: "2", icon: "💉", title: "Vacinação", description: "Protocolos vacinais atualizados e seguros. Trabalhamos com as melhores vacinas do mercado e elaboramos um calendário personalizado para cada pet." },
  { id: "3", icon: "🔬", title: "Exames Laboratoriais", description: "Diagnósticos precisos com equipamentos modernos. Realizamos hemogramas, bioquímica, urinálise, parasitológico e muito mais." },
  { id: "4", icon: "🏥", title: "Cirurgias", description: "Procedimentos cirúrgicos com anestesia segura e monitoramento completo. Nossa equipe está preparada para cirurgias eletivas e de emergência." },
  { id: "5", icon: "🛁", title: "Banho e Tosa", description: "Serviço completo de higiene e estética pet. Banho, tosa higiênica, tosa na tesoura, limpeza de ouvidos e corte de unhas." },
  { id: "6", icon: "🦷", title: "Odontologia Veterinária", description: "Limpeza dental, extração e tratamento de doenças periodontais. A saúde bucal é fundamental para o bem-estar geral do seu pet." },
  { id: "7", icon: "📡", title: "Microchipagem", description: "Identificação segura e permanente do seu pet através do microchip, garantindo que ele possa ser encontrado se perdido." },
  { id: "8", icon: "🏠", title: "Internação", description: "Estrutura de internação confortável e segura para casos que requerem observação e tratamento contínuo." },
];

export default async function ServicosPage() {
  const services = await getServices();
  const displayServices = services.length > 0 ? services : defaultServices;

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nossos Serviços</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Oferecemos atendimento veterinário completo com estrutura moderna e equipe especializada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayServices.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{service.icon || "🐾"}</div>
              <h2 className="font-bold text-xl text-gray-900 mb-3">{service.title}</h2>
              <p className="text-gray-500 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-primary-50 rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Quer saber mais sobre algum serviço?
          </h2>
          <p className="text-gray-500 mb-6">
            Entre em contato conosco. Estamos prontos para tirar suas dúvidas.
          </p>
          <a
            href="/contato"
            className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium inline-block"
          >
            Falar conosco
          </a>
        </div>
      </div>
    </div>
  );
}
