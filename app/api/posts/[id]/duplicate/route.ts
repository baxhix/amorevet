import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{ id: string }>;
}

export async function POST(_: Request, { params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const userId = (session.user as any).id as string | undefined;
  if (!userId) {
    return NextResponse.json({ error: "Sessão inválida. Faça login novamente." }, { status: 401 });
  }

  const { id } = await params;
  try {
    const original = await prisma.post.findUnique({ where: { id } });
    if (!original) return NextResponse.json({ error: "Post não encontrado" }, { status: 404 });

    // Generate a unique slug by appending a timestamp
    const baseSlug = `copia-${original.slug}`;
    const timestamp = Date.now().toString().slice(-6);
    const newSlug = `${baseSlug}-${timestamp}`;

    const newPost = await prisma.post.create({
      data: {
        title: `Cópia de ${original.title}`,
        slug: newSlug,
        excerpt: original.excerpt,
        content: original.content,
        coverImage: original.coverImage,
        categoryId: original.categoryId,
        published: false,          // Always start as draft
        publishedAt: null,
        authorId: userId,
        // Copy SEO fields (except canonicalUrl — different post, different URL)
        metaTitle: original.metaTitle,
        metaDescription: original.metaDescription,
        metaKeywords: original.metaKeywords,
        canonicalUrl: null,
        noIndex: original.noIndex,
      },
    });

    return NextResponse.json({ id: newPost.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
