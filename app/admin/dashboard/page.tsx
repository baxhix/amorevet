import AdminLayout from "@/components/admin/AdminLayout";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

async function getStats() {
  try {
    const [posts, published, services, messages, unread] = await Promise.all([
      prisma.post.count(),
      prisma.post.count({ where: { published: true } }),
      prisma.service.count({ where: { active: true } }),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { read: false } }),
    ]);
    return { posts, published, services, messages, unread };
  } catch {
    return { posts: 0, published: 0, services: 0, messages: 0, unread: 0 };
  }
}

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {[
            { label: "Total de Posts", value: stats.posts, icon: "📝", sub: `${stats.published} publicados` },
            { label: "Serviços Ativos", value: stats.services, icon: "🩺", sub: "no site público" },
            { label: "Mensagens", value: stats.messages, icon: "✉️", sub: `${stats.unread} não lidas` },
            { label: "Posts Publicados", value: stats.published, icon: "✅", sub: "visíveis no blog" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-1">{stat.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4">Ações Rápidas</h2>
            <div className="space-y-2">
              {[
                { href: "/admin/posts/novo", label: "Criar novo post", icon: "✏️" },
                { href: "/admin/servicos", label: "Gerenciar serviços", icon: "🩺" },
                { href: "/admin/categorias", label: "Gerenciar categorias", icon: "🏷️" },
                { href: "/admin/mensagens", label: "Ver mensagens", icon: "✉️" },
              ].map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  <span>{action.icon}</span>
                  <span className="text-gray-700 font-medium">{action.label}</span>
                  <span className="ml-auto text-gray-300">→</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4">Site Público</h2>
            <div className="space-y-2">
              {[
                { href: "/", label: "Página inicial" },
                { href: "/sobre", label: "Sobre nós" },
                { href: "/servicos", label: "Serviços" },
                { href: "/blog", label: "Blog" },
                { href: "/contato", label: "Contato" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-primary-500 inline-block"></span>
                  <span className="text-gray-700">{link.label}</span>
                  <span className="ml-auto text-gray-300 text-xs">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
