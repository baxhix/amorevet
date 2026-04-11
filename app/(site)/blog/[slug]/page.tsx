import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://amorevet.com.br";
const SITE_NAME = "Amor&Vet Clínica Veterinária";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  try {
    return await prisma.post.findUnique({
      where: { slug, published: true },
      include: { author: true, category: true },
    });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return { title: "Post não encontrado" };

  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt;
  const canonicalUrl = post.canonicalUrl || `${SITE_URL}/blog/${post.slug}`;
  const ogImage = post.coverImage || `${SITE_URL}/og-default.jpg`;

  return {
    title,
    description,
    keywords: post.metaKeywords || undefined,
    robots: post.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      authors: [post.author.name],
      section: post.category?.name,
      tags: post.metaKeywords?.split(",").map((k) => k.trim()) || [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const canonicalUrl = post.canonicalUrl || `${SITE_URL}/blog/${post.slug}`;
  const ogImage = post.coverImage || `${SITE_URL}/og-default.jpg`;

  // JSON-LD structured data — Article schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    image: ogImage,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logoamorevet.webp`,
      },
    },
    url: canonicalUrl,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt?.toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    ...(post.category && {
      articleSection: post.category.name,
    }),
    ...(post.metaKeywords && {
      keywords: post.metaKeywords,
    }),
  };

  return (
    <div className="py-16 px-4">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="text-primary text-sm font-medium hover:underline mb-6 inline-block">
          ← Voltar ao Blog
        </Link>

        {post.category && (
          <span className="block text-xs font-semibold text-primary uppercase tracking-wide mb-3">
            {post.category.name}
          </span>
        )}

        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 text-sm text-gray-400 mb-8 pb-8 border-b border-gray-100">
          <span>Por {post.author.name}</span>
          <span>•</span>
          <span>{post.publishedAt ? formatDate(post.publishedAt) : ""}</span>
        </div>

        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-64 object-cover rounded-xl mb-8"
          />
        ) : (
          <div className="bg-primary-50 rounded-xl h-64 flex items-center justify-center text-6xl mb-8">
            🐾
          </div>
        )}

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
}
