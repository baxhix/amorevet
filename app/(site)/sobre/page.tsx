import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nós",
  description: "Conheça a história e a equipe da Amor&Vet Clínica Veterinária.",
};

export default function SobrePage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sobre a Amor&Vet</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Mais de uma década cuidando com amor dos pets da nossa comunidade.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Nossa História</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              A Amor&Vet nasceu do sonho de oferecer atendimento veterinário de excelência com um toque especial: o amor incondicional pelos animais.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Fundada em 2013, nossa clínica cresceu e se tornou referência na região, sempre mantendo o compromisso com a saúde, bem-estar e qualidade de vida dos pets e de seus tutores.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Contamos com uma equipe multidisciplinar apaixonada e estrutura moderna para atender cães, gatos e animais exóticos.
            </p>
          </div>
          <div className="bg-primary-50 rounded-2xl p-10 text-center">
            <div className="text-6xl mb-4">🐾</div>
            <div className="grid grid-cols-2 gap-6 mt-6">
              <div>
                <p className="text-3xl font-bold text-primary">10+</p>
                <p className="text-gray-500 text-sm">Anos de experiência</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">5k+</p>
                <p className="text-gray-500 text-sm">Pets atendidos</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">8</p>
                <p className="text-gray-500 text-sm">Veterinários</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">98%</p>
                <p className="text-gray-500 text-sm">Satisfação</p>
              </div>
            </div>
          </div>
        </div>

        {/* Missão, Visão, Valores */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: "🎯",
              title: "Missão",
              text: "Promover saúde e bem-estar animal com atendimento de qualidade, ético e amoroso.",
            },
            {
              icon: "👁️",
              title: "Visão",
              text: "Ser a clínica veterinária mais confiada e querida pelas famílias da nossa região.",
            },
            {
              icon: "💚",
              title: "Valores",
              text: "Amor pelos animais, ética profissional, transparência e comprometimento com nossos clientes.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm text-center"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Nossa Equipe</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Dra. Ana Silva", role: "Clínica Geral" },
              { name: "Dr. Carlos Santos", role: "Cirurgia" },
              { name: "Dra. Mariana Lima", role: "Dermatologia" },
              { name: "Dr. Felipe Costa", role: "Odontologia" },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
                  👩‍⚕️
                </div>
                <p className="font-semibold text-gray-900 text-sm">{member.name}</p>
                <p className="text-primary text-xs">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
