import AdminLayout from "@/components/admin/AdminLayout";
import PostForm from "@/components/admin/PostForm";
import { prisma } from "@/lib/prisma";

async function getCategories() {
  try {
    return await prisma.category.findMany({ orderBy: { name: "asc" } });
  } catch {
    return [];
  }
}

export default async function NovoPostPage() {
  const categories = await getCategories();

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Novo Post</h1>
        <PostForm categories={categories} />
      </div>
    </AdminLayout>
  );
}
