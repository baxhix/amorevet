import type { IconName } from "./icons";

export const CONTACT = {
  whatsapp: "https://wa.me/5543993777792",
  whatsappLabel: "(43) 99377-7792",
  phone1: "tel:+5543988631862",
  phone1Label: "(43) 98863-1862",
  phone2: "tel:+554332930268",
  phone2Label: "(43) 3293-0268",
  email: "contato.amorevet@gmail.com",
  estagioEmail: "estagio.amorevet@gmail.com",
  address: "Av. Aminthas de Barros, 475 — Ipanema, Londrina/PR",
  addressShort: "Londrina · PR",
  cep: "86.015-180",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
  mapsQuery: "Av.+Aminthas+de+Barros,+475,+Ipanema,+Londrina+PR",
};

export const STATS = [
  { value: "10+", label: "anos cuidando" },
  { value: "5 mil+", label: "pets atendidos" },
  { value: "8", label: "veterinários" },
  { value: "24h", label: "pronto atendimento" },
];

export type Service = {
  icon: IconName;
  title: string;
  description: string;
  tone: "coral" | "teal";
};

export const SERVICES: Service[] = [
  { icon: "Ambulance", tone: "coral", title: "Pronto Atendimento 24h", description: "Emergências veterinárias acolhidas a qualquer hora — equipe de plantão pronta para agir quando cada minuto importa." },
  { icon: "Building", tone: "teal", title: "Internação Monitorada", description: "Estrutura de internamento com acompanhamento 24h, conforto e segurança durante toda a recuperação do seu pet." },
  { icon: "Microscope", tone: "teal", title: "Exames Laboratoriais", description: "Análises clínicas no laboratório próprio, com resultados rápidos e precisos para um diagnóstico confiável." },
  { icon: "Scan", tone: "coral", title: "Diagnóstico por Imagem", description: "Radiografia, ultrassonografia e exames de imagem de alta resolução para enxergar o que os olhos não alcançam." },
  { icon: "Stethoscope", tone: "teal", title: "Especialidades Clínicas", description: "Atendimento especializado por médicos veterinários dedicados a diversas áreas da clínica." },
  { icon: "Surgery", tone: "coral", title: "Centro Cirúrgico", description: "Cirurgias eletivas e de urgência em ambiente equipado, com anestesia segura e monitoramento completo." },
  { icon: "Leaf", tone: "teal", title: "Medicina Integrativa", description: "Acupuntura, fisioterapia e terapias complementares que somam ao tratamento e elevam o bem-estar." },
  { icon: "Dna", tone: "coral", title: "Terapia Celular", description: "Medicina regenerativa com células-tronco do próprio pet para reparar tecidos e devolver qualidade de vida." },
];

export type Specialty = { icon: IconName; title: string };

export const SPECIALTIES: Specialty[] = [
  { icon: "Heart", title: "Cardiologia" },
  { icon: "Brain", title: "Neurologia" },
  { icon: "Eye", title: "Oftalmologia" },
  { icon: "Ribbon", title: "Oncologia" },
  { icon: "Leaf", title: "Homeopatia" },
  { icon: "Stethoscope", title: "Nutrologia" },
  { icon: "Bone", title: "Ortopedia" },
  { icon: "Dna", title: "Terapia Celular" },
];

export type Differential = { icon: IconName; title: string; description: string };

export const DIFFERENTIALS: Differential[] = [
  { icon: "Heart", title: "Atendimento humanizado", description: "Cada pet é único. Cuidamos com empatia, paciência e tempo para ouvir você." },
  { icon: "Users", title: "Especialistas qualificados", description: "8 veterinários em formação contínua nas principais especialidades da medicina pet." },
  { icon: "Building", title: "Estrutura moderna", description: "Centro cirúrgico, laboratório, imagem e internação com equipamentos de ponta." },
  { icon: "ShieldCheck", title: "Prevenção em foco", description: "Mais do que tratar: orientamos tutores para uma vida longa e saudável ao lado do pet." },
];

export const STEM_CELL_INDICATIONS = [
  "Sequelas neurológicas de cinomose",
  "Osteoartrite e osteoartrose",
  "Lesões ligamentares e tendíneas",
  "Ceratoconjuntivite seca e úlceras de córnea",
  "Doenças renais agudas e crônicas",
  "Dermatite atópica e condições dermatológicas",
  "Traumas medulares e discopatias",
  "Condições geriátricas que afetam a qualidade de vida",
];

export type Testimonial = { name: string; pet: string; text: string; photo: string };

export const TESTIMONIALS: Testimonial[] = [
  { name: "Mariana Costa", pet: "Tutora da Luna", text: "A equipe cuida da minha gata como se fosse deles. Nunca vi tanto carinho num atendimento veterinário. Recomendo de olhos fechados!", photo: "/depoimentos/1.jpg" },
  { name: "Rafael Souza", pet: "Tutor do Thor", text: "Meu cão precisou de cirurgia de emergência e a equipe agiu rápido. A estrutura impressiona e o cuidado pós-operatório foi exemplar.", photo: "/depoimentos/2.jpg" },
  { name: "Camila Mendes", pet: "Tutora da Mel e do Bob", text: "Tenho dois pets e confio totalmente na Amor&Vet. Os veterinários explicam tudo com clareza e o espaço é impecável.", photo: "/depoimentos/3.jpg" },
];

export type TeamMember = { name: string; role: string; photo: string };

/* Fotos reais em /public/equipe. Ajuste nome/especialidade conforme necessário. */
export const TEAM: TeamMember[] = [
  { name: "Drª Gabriela N. Dantas", role: "Responsável Técnica · CRMV-PR 16.143", photo: "/equipe/gabriela.jpg" },
  { name: "Drª Mariana Fortunato", role: "Otoscopia Veterinária", photo: "/equipe/mariana.jpg" },
  { name: "Médico Veterinário", role: "Clínica Médica", photo: "/equipe/azul.jpg" },
  { name: "Médico Veterinário", role: "Cirurgia · Centro Cirúrgico", photo: "/equipe/cirurgia.jpg" },
];

export const SPACE_ITEMS = [
  { label: "Recepção acolhedora", tone: "coral" },
  { label: "Consultórios", tone: "teal" },
  { label: "Centro cirúrgico", tone: "teal" },
  { label: "Laboratório", tone: "coral" },
  { label: "Internação", tone: "coral" },
  { label: "Sala de imagem", tone: "teal" },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  { q: "A clínica atende emergências 24 horas?", a: "Sim. Nosso pronto atendimento funciona 24 horas, todos os dias. Em casos de urgência, ligue ou chame no WhatsApp antes de vir — assim a equipe já se prepara para receber o seu pet." },
  { q: "Quais animais vocês atendem?", a: "Atendemos cães, gatos e animais exóticos. Nossa equipe multidisciplinar tem experiência com diferentes espécies e necessidades específicas de cada uma." },
  { q: "Como funciona a terapia com células-tronco?", a: "Utilizamos células obtidas do próprio tecido adiposo do animal para reparar tecidos danificados e restaurar a função de órgãos afetados por doenças ou lesões. É indicada em diversos casos ortopédicos, neurológicos e geriátricos." },
  { q: "Preciso agendar consulta com antecedência?", a: "Para consultas de rotina, recomendamos agendar pelo WhatsApp para escolher o melhor horário. Emergências são atendidas por ordem de chegada e gravidade, a qualquer momento." },
  { q: "Vocês oferecem estágio para estudantes?", a: "Sim! Recebemos estudantes de medicina veterinária. Envie seu currículo para estagio.amorevet@gmail.com e conte um pouco sobre você." },
];
