"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const navItems = [
  { href: "/admin/dashboard", icon: "📊", label: "Dashboard", adminOnly: false },
  { href: "/admin/posts", icon: "📝", label: "Posts", adminOnly: false },
  { href: "/admin/categorias", icon: "🏷️", label: "Categorias", adminOnly: false },
  { href: "/admin/servicos", icon: "🩺", label: "Serviços", adminOnly: false },
  { href: "/admin/mensagens", icon: "✉️", label: "Mensagens", adminOnly: false },
  { href: "/admin/usuarios", icon: "👥", label: "Usuários", adminOnly: true },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAdmin = (session?.user as any)?.role === "ADMIN";

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🐾</span>
          <div>
            <p className="font-bold text-sm">Amor&Vet</p>
            <p className="text-xs text-gray-400">Painel Admin</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems
            .filter((item) => !item.adminOnly || isAdmin)
            .map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                    {item.adminOnly && (
                      <span className="ml-auto text-[10px] bg-purple-600/30 text-purple-300 px-1.5 py-0.5 rounded font-medium">
                        Admin
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="mb-3 px-3">
          <p className="text-xs text-gray-400">Logado como</p>
          <p className="text-sm font-medium text-white truncate">{session?.user?.name}</p>
          <p className="text-xs text-gray-500 mt-0.5">{isAdmin ? "Administrador" : "Editor"}</p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <span>🚪</span>
          Sair
        </button>
      </div>
    </aside>
  );
}
