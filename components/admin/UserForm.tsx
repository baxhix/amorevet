"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "EDITOR";
}

interface Props {
  user?: User;
  selfId: string; // logged-in user id — to prevent self-role change or self-delete
}

export default function UserForm({ user, selfId }: Props) {
  const router = useRouter();
  const isEditing = !!user;
  const isSelf = isEditing && user.id === selfId;

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
    role: user?.role || "EDITOR",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password && form.password !== form.confirmPassword) {
      setError("As senhas não conferem");
      return;
    }

    setLoading(true);
    try {
      const url = isEditing ? `/api/users/${user!.id}` : "/api/users";
      const method = isEditing ? "PUT" : "POST";

      const body: Record<string, string> = {
        name: form.name,
        email: form.email,
        role: form.role,
      };
      if (form.password) body.password = form.password;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao salvar");
      }

      router.push("/admin/usuarios");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm(`Tem certeza que deseja excluir o usuário "${user!.name}"? Esta ação não pode ser desfeita.`)) return;
    try {
      const res = await fetch(`/api/users/${user!.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }
      router.push("/admin/usuarios");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">

        {/* Nome */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo *</label>
          <input
            required
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Nome do usuário"
          />
        </div>

        {/* E-mail */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">E-mail *</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="usuario@amorevet.com.br"
          />
        </div>

        {/* Perfil */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Perfil de acesso</label>
          {isSelf ? (
            <p className="text-sm text-gray-400 italic">Você não pode alterar o seu próprio perfil.</p>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {(["EDITOR", "ADMIN"] as const).map((role) => (
                <label
                  key={role}
                  className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                    form.role === role
                      ? "border-primary bg-primary-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={form.role === role}
                    onChange={() => setForm({ ...form, role })}
                    className="mt-0.5 text-primary focus:ring-primary"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{role === "ADMIN" ? "Administrador" : "Editor"}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {role === "ADMIN"
                        ? "Acesso total, incluindo usuários"
                        : "Cria e edita posts e serviços"}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Senha */}
        <div className="pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-3">
            {isEditing ? "Deixe em branco para manter a senha atual" : "Mínimo 6 caracteres"}
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isEditing ? "Nova senha" : "Senha *"}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required={!isEditing}
                  minLength={6}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder={isEditing ? "••••••••" : "Mínimo 6 caracteres"}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isEditing ? "Confirmar nova senha" : "Confirmar senha *"}
              </label>
              <input
                type={showPassword ? "text" : "password"}
                required={!isEditing || form.password.length > 0}
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm disabled:opacity-60"
        >
          {loading ? "Salvando..." : isEditing ? "Salvar Alterações" : "Criar Usuário"}
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium text-sm"
        >
          Cancelar
        </button>

        {isEditing && !isSelf && (
          <button
            type="button"
            onClick={handleDelete}
            className="ml-auto px-6 py-2.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors font-medium text-sm"
          >
            Excluir Usuário
          </button>
        )}
      </div>
    </form>
  );
}
