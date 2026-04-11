import AdminLayout from "@/components/admin/AdminLayout";
import PostsTable from "@/components/admin/PostsTable";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

async function getPosts() {
  try {
    return await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: { author: { select: { name: true } }, category: true },
    });
  } catch {
    return [];
  }
}

export default async function PostsPage() {
  const posts = await getPosts();

  const total = posts.length;
  const ativos = posts.filter((p) => p.published).length;
  const inativos = total - ativos;

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {total} post{total !== 1 ? "s" : ""} · {ativos} ativo{ativos !== 1 ? "s" : ""} · {inativos} inativo{inativos !== 1 ? "s" : ""}
            </p>
          </div>
          <Link
            href="/admin/posts/novo"
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm"
          >
            + Novo Post
          </Link>
        </div>

        <PostsTable initialPosts={posts} />
      </div>
    </AdminLayout>
  );
}
