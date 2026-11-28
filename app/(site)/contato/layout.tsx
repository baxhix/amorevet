import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://amorevet-three.vercel.app";

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato com a Amor&Vet. Agende uma consulta, tire dúvidas ou fale com nossa equipe veterinária.",
  alternates: { canonical: `${SITE_URL}/contato` },
  openGraph: {
    title: "Entre em Contato | Amor&Vet",
    description: "Agende uma consulta ou tire suas dúvidas. Estamos prontos para ajudar você e seu pet.",
    url: `${SITE_URL}/contato`,
    images: [{ url: `${SITE_URL}/og.jpg`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Entre em Contato | Amor&Vet",
    description: "Agende uma consulta ou tire suas dúvidas. Estamos prontos para ajudar você e seu pet.",
  },
};

export default function ContatoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
