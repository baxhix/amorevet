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
  { value: "5", label: "anos cuidando" },
  { value: "6 mil+", label: "pacientes atendidos" },
  { value: "30+", label: "veterinários" },
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
  { icon: "Microscope", tone: "teal", title: "Exames Laboratoriais", description: "Unidade de laboratório parceiro PETSCOP, com resultados rápidos e precisos para um diagnóstico confiável." },
  { icon: "Scan", tone: "coral", title: "Diagnóstico por Imagem", description: "Unidade PetRad de exames de imagem. Radiografia, ultrassonografia e exames de imagem de alta resolução." },
  { icon: "Stethoscope", tone: "teal", title: "Especialidades Clínicas", description: "Atendimento especializado por médicos veterinários dedicados a diversas áreas da clínica." },
  { icon: "Surgery", tone: "coral", title: "Centro Cirúrgico", description: "Cirurgias eletivas e de urgência em ambiente equipado, com anestesia segura e monitoramento completo." },
  { icon: "Leaf", tone: "teal", title: "Medicina Integrativa", description: "Acupuntura, fisioterapia e terapias complementares que somam ao tratamento e elevam o bem-estar." },
  { icon: "Dna", tone: "coral", title: "Laboratório de Terapia Celular", description: "Banco de células-tronco de cães, gatos e equinos e protocolo terapêutico especializado para reparar tecidos e tratar diversas doenças." },
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
  { icon: "Users", title: "Especialistas qualificados", description: "Mais de 30 veterinários em formação contínua nas principais especialidades da medicina pet." },
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

export type TeamMember = { name: string; role: string; photo?: string };

/* Fotos reais em /public/equipe. Entradas sem `photo` mostram um placeholder elegante.
   Para adicionar um novo médico: preencha nome/role e coloque a foto em /public/equipe. */
export const TEAM: TeamMember[] = [
  { name: "Drª Gabriela N. Dantas", role: "Responsável Técnica · CRMV-PR 16.143", photo: "/equipe/gabriela.jpg" },
  { name: "Médico Veterinário", role: "Cirurgia · Centro Cirúrgico", photo: "/equipe/cirurgia.jpg" },

  // Fotos adicionadas. NOMES provisórios onde ainda não identificados.
  { name: "Dra. Mariana Fernandes", role: "Rotina · Terapias integrativas · Células-tronco · CRMV-PR 16.460", photo: "/equipe/eq2.jpg" },
  { name: "Dra. Jessica Fernanda", role: "Rotina e plantão · CRMV-PR 24.009", photo: "/equipe/eq3.jpg" },
  { name: "Kamilla Seehagen", role: "Gerente administrativa", photo: "/equipe/eq4.jpg" },
  { name: "Dra. Ana Carolina Guereta", role: "Rotina e plantão · CRMV-PR 21.158", photo: "/equipe/eq5.jpg" },
  { name: "Dra. Bianca Delicato", role: "Plantonista · CRMV-PR 18.135", photo: "/equipe/eq6.jpg" },
];

export const SPACE_ITEMS = [
  { label: "Recepção", photo: "/espaco/recepcao.jpg" },
  { label: "Centro cirúrgico", photo: "/espaco/centro-cirurgico.jpg" },
  { label: "Centro de imagem", photo: "/espaco/centro-imagem.jpg" },
  { label: "Laboratório", photo: "/espaco/laboratorio.jpg" },
  { label: "Fisioterapia & reabilitação", photo: "/espaco/fisioterapia.jpg" },
  { label: "Espaço externo", photo: "/espaco/externo.jpg" },
  { label: "Internação acompanhada", photo: "/espaco/internacao.jpg" },
  { label: "Internação separada: gatil e canil", photo: "/espaco/canil-gatil.jpg" },
];

export type NewsItem = {
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  content: string[];
};

/* Conteúdo estático de blog/notícias (sem CMS). Substitua por posts reais quando houver. */
export const NEWS: NewsItem[] = [
  {
    slug: "vacinacao-em-dia",
    category: "Cuidados",
    date: "Novembro 2026",
    title: "Vacinação em dia: por que é tão importante",
    excerpt: "Entenda o calendário de vacinas e como ele protege o seu pet de doenças graves ao longo da vida.",
    image: "/blog/1.jpg",
    content: [
      "Manter a vacinação em dia é uma das formas mais eficazes de proteger o seu pet. As vacinas preparam o sistema imunológico para reconhecer e combater agentes causadores de doenças graves — muitas delas potencialmente fatais e de alto custo de tratamento.",
      "Em cães, o protocolo costuma incluir a vacina múltipla (V8 ou V10) e a antirrábica. Em gatos, a quádrupla ou quíntupla e a antirrábica. Filhotes seguem um esquema inicial com reforços, e adultos recebem reforços anuais conforme orientação do médico veterinário.",
      "Mais do que proteger o seu animal individualmente, a vacinação ajuda a reduzir a circulação de doenças na comunidade. Agende a avaliação do seu pet e monte com a nossa equipe um calendário personalizado de acordo com a idade, a espécie e o estilo de vida dele.",
    ],
  },
  {
    slug: "sinais-de-emergencia",
    category: "Saúde",
    date: "Outubro 2026",
    title: "Sinais de emergência: quando procurar o pronto atendimento",
    excerpt: "Reconheça os sintomas que indicam urgência e saiba agir rápido pelo bem-estar do seu animal.",
    image: "/blog/2.jpg",
    content: [
      "Alguns sinais não devem esperar: dificuldade para respirar, convulsões, vômito ou diarreia persistentes, barriga inchada e dura, dificuldade para urinar, sangramentos, traumas e ingestão de produtos tóxicos são situações que exigem atendimento imediato.",
      "Prostração intensa, gengivas muito pálidas ou arroxeadas, e dor evidente também são alertas importantes. Nesses casos, cada minuto conta — e o acompanhamento profissional faz toda a diferença no desfecho.",
      "Na dúvida, não espere para ver se melhora. Nosso pronto atendimento funciona 24 horas, todos os dias. Ligue ou chame no WhatsApp antes de vir: assim, a equipe já se prepara para receber o seu pet com agilidade.",
    ],
  },
  {
    slug: "pets-idosos",
    category: "Bem-estar",
    date: "Setembro 2026",
    title: "Pets idosos: cuidados para uma vida longa e saudável",
    excerpt: "Nutrição adequada, exames periódicos e conforto — dicas para cuidar do seu companheiro na melhor idade.",
    image: "/blog/3.jpg",
    content: [
      "Com o passar dos anos, o organismo do pet muda e passa a exigir cuidados específicos. Check-ups mais frequentes, com exames de sangue e de imagem, ajudam a identificar precocemente alterações renais, cardíacas, articulares e hormonais.",
      "A nutrição também merece atenção: rações e dietas adaptadas à idade, ao peso e a eventuais condições de saúde contribuem para a qualidade de vida. Manter o peso ideal reduz a sobrecarga nas articulações e o risco de outras doenças.",
      "Conforto e rotina fazem parte do cuidado: ambientes acessíveis, caminhas macias, passeios leves e muito carinho. Com acompanhamento veterinário regular, a melhor idade pode ser leve, saudável e cheia de bons momentos.",
    ],
  },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  { q: "A clínica atende emergências 24 horas?", a: "Sim. Nosso pronto atendimento funciona 24 horas, todos os dias. Em casos de urgência, ligue antes de vir — assim a equipe já se prepara para receber o seu pet." },
  { q: "Quais animais vocês atendem?", a: "Atendemos cães, gatos e animais exóticos. Nossa equipe multidisciplinar tem experiência com diferentes espécies e necessidades específicas de cada uma." },
  { q: "Como funciona a terapia com células-tronco?", a: "Medicina regenerativa com células-tronco para reparar tecidos e auxiliar no tratamento de diversas doenças, trazendo qualidade de vida aos nossos pacientes. Contamos com banco de células-tronco de cães, gatos e equinos, além de serviço especializado para a decisão do melhor protocolo terapêutico." },
  { q: "Preciso agendar consulta com antecedência?", a: "Para consultas de rotina, recomendamos agendar pelo WhatsApp para escolher o melhor horário. Emergências são atendidas por ordem de chegada e gravidade, a qualquer momento." },
  { q: "Vocês oferecem estágio para estudantes?", a: "Sim! Recebemos estudantes de medicina veterinária. Envie seu currículo para estagio.amorevet@gmail.com e conte um pouco sobre você." },
];
