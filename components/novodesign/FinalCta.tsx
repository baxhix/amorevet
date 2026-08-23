import { CONTACT } from "./data";
import { Paw, WhatsApp, Phone } from "./icons";
import { Reveal } from "./motion";

export default function FinalCta() {
  return (
    <section className="relative px-5 py-20">
      <Reveal className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2.2rem] px-6 py-16 text-center sm:px-12 sm:py-20"
          style={{ background: "linear-gradient(125deg, #E96A55 0%, #D44E3B 45%, #318687 100%)" }}
        >
          <div className="nd-dotgrid absolute inset-0 opacity-[0.12]" />
          <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white/15 blur-2xl" />
          <Paw className="absolute -bottom-6 -right-2 h-40 w-40 text-white/10" />

          <span className="relative grid mx-auto h-14 w-14 place-items-center rounded-2xl bg-white/15 text-white backdrop-blur">
            <Paw className="h-7 w-7" />
          </span>
          <h2 className="relative mx-auto mt-6 max-w-2xl text-[2rem] font-extrabold leading-[1.1] text-white sm:text-[2.6rem]">
            Seu pet merece o melhor cuidado
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-[1.05rem] leading-relaxed text-white/85">
            Agende uma consulta hoje e descubra por que somos uma das clínicas
            veterinárias mais queridas de Londrina.
          </p>
          <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-8 py-4 text-[0.98rem] font-bold text-secondary-dark shadow-xl transition-transform hover:scale-[1.02] active:scale-95"
            >
              <WhatsApp className="h-5 w-5" /> Agendar consulta
            </a>
            <a
              href={CONTACT.phone1}
              className="inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-white/45 px-8 py-4 text-[0.98rem] font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Phone className="h-5 w-5" /> {CONTACT.phone1Label}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
