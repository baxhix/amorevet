import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: { author: { select: { name: true } }, category: true },
    });
    return NextResponse.json(posts);
  } catch (error: any) {
    console.error("[GET /api/posts]", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const body = await request.json();
    const {
      title,
      slug: customSlug,
      excerpt,
      content,
      categoryId,
      published,
      coverImage,
      metaTitle,
      metaDescription,
      metaKeywords,
      canonicalUrl,
      noIndex,
    } = body;

    if (!title || !excerpt || !content) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
    }

    const slug = customSlug ? slugify(customSlug) : slugify(title);
    const userId = (session.user as any).id as string | undefined;

    if (!userId) {
      return NextResponse.json({ error: "Sessão inválida. Faça login novamente." }, { status: 401 });
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage: coverImage || null,
        categoryId: categoryId || null,
        published: published ?? false,
        publishedAt: published ? new Date() : null,
        authorId: userId,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        metaKeywords: metaKeywords || null,
        canonicalUrl: canonicalUrl || null,
        noIndex: noIndex ?? false,
      },
    });

    // Invalida cache das páginas públicas
    revalidatePath("/");
    revalidatePath("/blog");

    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    if (error?.code === "P2002") {
      return NextResponse.json({ error: "Slug já existe. Altere o título ou o slug personalizado." }, { status: 409 });
    }
    console.error("[POST /api/posts]", error);
    // Expose real error message in dev so we can diagnose quickly
    const detail = process.env.NODE_ENV === "development"
      ? String(error?.message ?? error)
      : undefined;
    return NextResponse.json(
      { error: "Erro interno", ...(detail && { detail }) },
      { status: 500 }
    );
  }
}
