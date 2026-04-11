import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(_: Request, { params }: Props) {
  const { id } = await params;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { author: { select: { name: true } }, category: true },
    });
    if (!post) return NextResponse.json({ error: "Post não encontrado" }, { status: 404 });
    return NextResponse.json(post);
  } catch (error: any) {
    console.error("[GET /api/posts/:id]", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const { id } = await params;
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

    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Post não encontrado" }, { status: 404 });

    const wasPublished = !existing.published && published;
    const slug = customSlug ? slugify(customSlug) : slugify(title);

    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage: coverImage || null,
        categoryId: categoryId || null,
        published,
        publishedAt: wasPublished ? new Date() : existing.publishedAt,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        metaKeywords: metaKeywords || null,
        canonicalUrl: canonicalUrl || null,
        noIndex: noIndex ?? false,
      },
    });

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${existing.slug}`);
    if (post.slug !== existing.slug) {
      revalidatePath(`/blog/${post.slug}`);
    }

    return NextResponse.json(post);
  } catch (error: any) {
    if (error?.code === "P2002") {
      return NextResponse.json({ error: "Slug já existe. Altere o título ou o slug personalizado." }, { status: 409 });
    }
    console.error("[PUT /api/posts/:id]", error);
    const detail = process.env.NODE_ENV === "development"
      ? String(error?.message ?? error)
      : undefined;
    return NextResponse.json(
      { error: "Erro interno", ...(detail && { detail }) },
      { status: 500 }
    );
  }
}

// Toggle published (active/inactive)
export async function PATCH(_: Request, { params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const { id } = await params;
  try {
    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Post não encontrado" }, { status: 404 });

    const newPublished = !existing.published;

    const post = await prisma.post.update({
      where: { id },
      data: {
        published: newPublished,
        // Set publishedAt only on first publish
        publishedAt: newPublished && !existing.publishedAt ? new Date() : existing.publishedAt,
      },
    });

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);

    return NextResponse.json({ id: post.id, published: post.published });
  } catch (error: any) {
    console.error("[PATCH /api/posts/:id]", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const { id } = await params;
  try {
    const deleted = await prisma.post.delete({ where: { id } });

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${deleted.slug}`);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[DELETE /api/posts/:id]", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
