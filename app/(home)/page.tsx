import { prisma } from "@/lib/prisma";
import { SERVICES } from "@/components/novodesign/data";
import Hero from "@/components/novodesign/Hero";
import Services from "@/components/novodesign/Services";
import WhyUs from "@/components/novodesign/WhyUs";
import Team from "@/components/novodesign/Team";
import Specialties from "@/components/novodesign/Specialties";
import StemCell from "@/components/novodesign/StemCell";
import Testimonials from "@/components/novodesign/Testimonials";
import Space from "@/components/novodesign/Space";
import Faq from "@/components/novodesign/Faq";
import BlogTeaser, { type TeaserPost } from "@/components/novodesign/BlogTeaser";
import Contact from "@/components/novodesign/Contact";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://amorevet.letshub.com.br";

async function getLatestPosts(): Promise<TeaserPost[]> {
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

export default async function NovoDesignHome() {
  const posts = await getLatestPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    name: "Amor&Vet Clínica Veterinária",
    url: SITE_URL,
    logo: `${SITE_URL}/logoamorevet.webp`,
    description: "Clínica veterinária com mais de 10 anos de experiência em Londrina/PR.",
    foundingDate: "2013",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Aminthas de Barros, 475, Ipanema",
      addressLocality: "Londrina",
      addressRegion: "PR",
      postalCode: "86015-180",
      addressCountry: "BR",
    },
    telephone: "+55-43-98863-1862",
    medicalSpecialty: "Veterinary Medicine",
    availableService: SERVICES.map((s) => ({ "@type": "MedicalProcedure", name: s.title, description: s.description })),
    openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "00:00", closes: "23:59" }],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <Team />
      <Services />
      <WhyUs />
      <Specialties />
      <StemCell />
      <Testimonials />
      <Space />
      <Faq />
      <BlogTeaser posts={posts} />
      <Contact />
    </>
  );
}
