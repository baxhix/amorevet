import AdminLayout from "@/components/admin/AdminLayout";
import CategoryManager from "@/components/admin/CategoryManager";
import { prisma } from "@/lib/prisma";

async function getCategories() {
  try {
    return await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { posts: true } } },
    });
  } catch {
    return [];
  }
}

export default async function CategoriasPage() {
  const categories = await getCategories();

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Categorias</h1>
        <CategoryManager initialCategories={categories} />
      </div>
    </AdminLayout>
  );
}
