"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  createdAt: Date | string;
  category: Category | null;
  author: { name: string };
}

export default function PostsTable({ initialPosts }: { initialPosts: Post[] }) {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [isPending, startTransition] = useTransition();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function togglePublished(id: string) {
    setLoadingId(id);
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "PATCH" });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, published: updated.published } : p))
      );
    } catch {
      alert("Erro ao alterar status");
    } finally {
      setLoadingId(null);
    }
  }

  async function duplicatePost(id: string) {
    setLoadingId(`dup-${id}`);
    try {
      const res = await fetch(`/api/posts/${id}/duplicate`, { method: "POST" });
      if (!res.ok) throw new Error();
      const { id: newId } = await res.json();
      startTransition(() => {
        router.push(`/admin/posts/${newId}`);
        router.refresh();
      });
    } catch {
      alert("Erro ao duplicar post");
      setLoadingId(null);
    }
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-16 text-center">
        <div className="text-5xl mb-3">📝</div>
        <p className="text-gray-400">Nenhum post ainda.</p>
        <Link href="/admin/posts/novo" className="mt-4 inline-block text-primary font-medium hover:underline text-sm">
          Criar primeiro post →
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">Título</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Categoria</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Status</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Criado em</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {posts.map((post) => {
            const isToggling = loadingId === post.id;
            const isDuplicating = loadingId === `dup-${post.id}`;

            return (
              <tr key={post.id} className="hover:bg-gray-50/60 transition-colors">
                {/* Título */}
                <td className="px-6 py-4 max-w-xs">
                  <p className="font-medium text-gray-900 text-sm truncate">{post.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5 font-mono truncate">{post.slug}</p>
                </td>

                {/* Categoria */}
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {post.category?.name || <span className="text-gray-300">—</span>}
                </td>

                {/* Status — toggle clicável */}
                <td className="px-4 py-4">
                  <button
                    onClick={() => togglePublished(post.id)}
                    disabled={isToggling}
                    title={post.published ? "Clique para desativar" : "Clique para ativar"}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all border cursor-pointer disabled:opacity-60 ${
                      post.published
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                        : "bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200"
                    }`}
                  >
                    {/* Toggle dot */}
                    <span className={`w-1.5 h-1.5 rounded-full ${post.published ? "bg-emerald-500" : "bg-gray-400"}`} />
                    {isToggling ? "..." : post.published ? "Ativo" : "Inativo"}
                  </button>
                </td>

                {/* Data */}
                <td className="px-4 py-4 text-sm text-gray-400 whitespace-nowrap">
                  {formatDate(new Date(post.createdAt))}
                </td>

                {/* Ações */}
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end gap-2">
                    {/* Duplicar */}
                    <button
                      onClick={() => duplicatePost(post.id)}
                      disabled={!!loadingId}
                      title="Duplicar post"
                      className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary-50 transition-colors disabled:opacity-40"
                    >
                      {isDuplicating ? (
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                      )}
                    </button>

                    {/* Editar */}
                    <Link
                      href={`/admin/posts/${post.id}`}
                      title="Editar post"
                      className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary-50 transition-colors"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
