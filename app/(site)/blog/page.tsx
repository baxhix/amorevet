import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description: "Dicas, cuidados e novidades sobre saúde animal.",
};

async function getPosts() {
  try {
    return await prisma.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      include: { author: true, category: true },
    });
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog & Dicas</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Conteúdo educativo sobre saúde animal para tutores responsáveis.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">📝</div>
            <p className="text-lg">Nenhum artigo publicado ainda.</p>
            <p className="text-sm mt-2">Volte em breve!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-primary-100 h-44 flex items-center justify-center text-5xl">
                  🐾
                </div>
                <div className="p-5">
                  {post.category && (
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                      {post.category.name}
                    </span>
                  )}
                  <h2 className="font-bold text-gray-900 text-lg mt-1 mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                    <span>{post.author.name}</span>
                    <span>
                      {post.publishedAt ? formatDate(post.publishedAt) : ""}
                    </span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-semibold text-primary hover:underline"
                  >
                    Ler artigo completo →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
