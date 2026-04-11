import { notFound } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import PostForm from "@/components/admin/PostForm";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{ id: string }>;
}

async function getPost(id: string) {
  try {
    return await prisma.post.findUnique({ where: { id } });
  } catch {
    return null;
  }
}

async function getCategories() {
  try {
    return await prisma.category.findMany({ orderBy: { name: "asc" } });
  } catch {
    return [];
  }
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const [post, categories] = await Promise.all([getPost(id), getCategories()]);

  if (!post) notFound();

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Editar Post</h1>
        <PostForm post={post} categories={categories} />
      </div>
    </AdminLayout>
  );
}
