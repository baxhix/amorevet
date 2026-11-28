// Fonte única da URL pública do site (canonical / Open Graph / sitemap).
// Em produção, defina NEXT_PUBLIC_SITE_URL na Vercel (ex.: o domínio final).
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://amorevet-three.vercel.app"
).replace(/\/+$/, "");

export const SITE_NAME = "Amor&Vet";
export const OG_IMAGE = "/og.jpg";
