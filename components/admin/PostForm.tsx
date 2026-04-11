"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Load the rich-text editor only on the client (avoids SSR/hydration issues)
const RichTextEditor = dynamic(() => import("./RichTextEditor"), {
  ssr: false,
  loading: () => (
    <div className="border border-gray-200 rounded-xl min-h-[360px] bg-gray-50 animate-pulse" />
  ),
});

interface Category {
  id: string;
  name: string;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  categoryId: string | null;
  published: boolean;
  coverImage: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  canonicalUrl: string | null;
  noIndex: boolean;
}

interface Props {
  post?: Post;
  categories: Category[];
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function CharCounter({
  value,
  max,
  ideal,
}: {
  value: string;
  max: number;
  ideal: number;
}) {
  const len = value.length;
  const color =
    len === 0
      ? "text-gray-400"
      : len <= ideal
      ? "text-green-600"
      : len <= max
      ? "text-yellow-600"
      : "text-red-500";
  return (
    <span className={`text-xs font-medium ${color}`}>
      {len}/{max}
    </span>
  );
}

function GooglePreview({
  title,
  description,
  slug,
}: {
  title: string;
  description: string;
  slug: string;
}) {
  const displayTitle = title || "Título do artigo";
  const displayDesc =
    description ||
    "Descrição que aparecerá no Google. Escreva um resumo atrativo para aumentar o CTR.";
  const displayUrl = `amorevet.com.br/blog/${slug || "seu-artigo"}`;

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <p className="text-xs text-gray-500 font-medium mb-3 uppercase tracking-wide">
        Prévia no Google
      </p>
      <div className="max-w-xl">
        <p className="text-xs text-green-700 mb-0.5 truncate">{displayUrl}</p>
        <p
          className="text-[#1a0dab] text-lg font-medium leading-snug hover:underline cursor-pointer truncate"
          style={{ fontFamily: "arial, sans-serif" }}
        >
          {displayTitle.length > 60
            ? displayTitle.slice(0, 60) + "…"
            : displayTitle}
        </p>
        <p
          className="text-sm text-gray-600 mt-0.5 leading-snug"
          style={
            {
              fontFamily: "arial, sans-serif",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            } as React.CSSProperties
          }
        >
          {displayDesc.length > 160
            ? displayDesc.slice(0, 160) + "…"
            : displayDesc}
        </p>
      </div>
    </div>
  );
}

// ── Cover image upload zone ────────────────────────────────────────────────────
function CoverImageUpload({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro no upload");
      onChange(data.url);
    } catch (e: any) {
      setError(e.message);
      setTimeout(() => setError(""), 4000);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Imagem de Capa
      </label>

      {value ? (
        /* ── Preview ───────────────────────────────────────────────────── */
        <div className="relative rounded-xl overflow-hidden border border-gray-200 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Imagem de capa"
            className="w-full h-44 object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="bg-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              {uploading ? "Enviando…" : "Trocar"}
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="bg-white text-red-500 text-xs font-medium px-2.5 py-1.5 rounded-lg shadow-sm border border-gray-200 hover:bg-red-50 transition-colors"
            >
              ✕ Remover
            </button>
          </div>
        </div>
      ) : (
        /* ── Upload zone ────────────────────────────────────────────────── */
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full h-36 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary-50 transition-colors text-gray-400 hover:text-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <>
              <svg
                className="w-8 h-8 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              <span className="text-sm font-medium">Enviando…</span>
            </>
          ) : (
            <>
              <svg
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span className="text-sm font-medium">Clique para fazer upload</span>
              <span className="text-xs text-gray-400">
                JPG, PNG, WebP, GIF · Máx. 5 MB
              </span>
            </>
          )}
        </button>
      )}

      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}

// ── Main form ──────────────────────────────────────────────────────────────────
export default function PostForm({ post, categories }: Props) {
  const router = useRouter();
  const isEditing = !!post;

  const [form, setForm] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    categoryId: post?.categoryId || "",
    published: post?.published || false,
    coverImage: post?.coverImage || "",
    // SEO fields
    metaTitle: post?.metaTitle || "",
    metaDescription: post?.metaDescription || "",
    metaKeywords: post?.metaKeywords || "",
    canonicalUrl: post?.canonicalUrl || "",
    noIndex: post?.noIndex || false,
  });

  const [slugEdited, setSlugEdited] = useState(isEditing);
  const [seoOpen, setSeoOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Auto-generate slug from title unless user manually edited it
  function handleTitleChange(value: string) {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: slugEdited ? prev.slug : slugify(value),
    }));
  }

  function handleSlugChange(value: string) {
    setSlugEdited(true);
    setForm((prev) => ({ ...prev, slug: slugify(value) }));
  }

  const serpTitle = form.metaTitle || form.title;
  const serpDesc = form.metaDescription || form.excerpt;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.content || form.content === "<p></p>" || form.content.trim() === "") {
      setError("O conteúdo do post não pode estar vazio.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const url = isEditing ? `/api/posts/${post!.id}` : "/api/posts";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao salvar");
      }

      router.push("/admin/posts");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Tem certeza que deseja excluir este post?")) return;
    try {
      await fetch(`/api/posts/${post!.id}`, { method: "DELETE" });
      router.push("/admin/posts");
      router.refresh();
    } catch {
      setError("Erro ao excluir");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">

      {/* ── CONTEÚDO ────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Conteúdo
        </h2>

        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título *
          </label>
          <input
            required
            type="text"
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Título do post"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL (slug)
            <span className="ml-2 text-xs text-gray-400 font-normal">
              amorevet.com.br/blog/
              <span className="text-primary">{form.slug || "seu-artigo"}</span>
            </span>
          </label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => handleSlugChange(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono"
            placeholder="url-do-artigo"
          />
          <p className="text-xs text-gray-400 mt-1">
            Gerado automaticamente pelo título. Edite apenas se necessário.
          </p>
        </div>

        {/* Resumo */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Resumo *
            </label>
            <CharCounter value={form.excerpt} max={200} ideal={160} />
          </div>
          <textarea
            required
            rows={2}
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            placeholder="Breve descrição que aparecerá na listagem do blog"
          />
        </div>

        {/* Conteúdo — Rich Text Editor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Conteúdo *
          </label>
          <RichTextEditor
            value={form.content}
            onChange={(val) => setForm((prev) => ({ ...prev, content: val }))}
            placeholder="Escreva o conteúdo do artigo aqui..."
          />
          {/* Hidden textarea to keep `required` validation working */}
          <textarea
            required
            value={form.content}
            onChange={() => {}}
            className="sr-only"
            aria-hidden="true"
            tabIndex={-1}
          />
        </div>

        {/* Categoria */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoria
          </label>
          <select
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Sem categoria</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Imagem de capa — upload */}
        <CoverImageUpload
          value={form.coverImage}
          onChange={(url) => setForm({ ...form, coverImage: url })}
        />

        {/* Publicar */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="published"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
            className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
          />
          <label
            htmlFor="published"
            className="text-sm font-medium text-gray-700"
          >
            Publicar imediatamente
          </label>
        </div>
      </div>

      {/* ── SEO ─────────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Accordion header */}
        <button
          type="button"
          onClick={() => setSeoOpen(!seoOpen)}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="w-4 h-4 text-green-600"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-800">
                SEO & Metadados
              </p>
              <p className="text-xs text-gray-400">
                Controle como o artigo aparece no Google
              </p>
            </div>
          </div>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className={`w-4 h-4 text-gray-400 transition-transform ${
              seoOpen ? "rotate-180" : ""
            }`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {seoOpen && (
          <div className="px-6 pb-6 space-y-5 border-t border-gray-100">

            {/* Prévia Google */}
            <div className="pt-5">
              <GooglePreview
                title={serpTitle}
                description={serpDesc}
                slug={form.slug}
              />
            </div>

            {/* Meta Title */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Título SEO
                  <span className="ml-2 text-xs text-gray-400 font-normal">
                    (se vazio, usa o título do post)
                  </span>
                </label>
                <CharCounter value={form.metaTitle} max={60} ideal={55} />
              </div>
              <input
                type="text"
                value={form.metaTitle}
                onChange={(e) =>
                  setForm({ ...form, metaTitle: e.target.value })
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={
                  form.title || "Título para os mecanismos de busca"
                }
                maxLength={70}
              />
              <p className="text-xs text-gray-400 mt-1">
                Ideal: até 55 caracteres. Acima de 60 pode ser truncado no
                Google.
              </p>
            </div>

            {/* Meta Description */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Meta Description
                  <span className="ml-2 text-xs text-gray-400 font-normal">
                    (se vazia, usa o resumo)
                  </span>
                </label>
                <CharCounter
                  value={form.metaDescription}
                  max={160}
                  ideal={145}
                />
              </div>
              <textarea
                rows={3}
                value={form.metaDescription}
                onChange={(e) =>
                  setForm({ ...form, metaDescription: e.target.value })
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder={
                  form.excerpt ||
                  "Descrição atrativa para aparecer nos resultados de busca"
                }
                maxLength={180}
              />
              <p className="text-xs text-gray-400 mt-1">
                Ideal: 120–155 caracteres. Inclua a palavra-chave principal.
              </p>
            </div>

            {/* Keywords */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Palavras-chave
              </label>
              <input
                type="text"
                value={form.metaKeywords}
                onChange={(e) =>
                  setForm({ ...form, metaKeywords: e.target.value })
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="veterinário, saúde animal, cão, gato"
              />
              <p className="text-xs text-gray-400 mt-1">
                Separe por vírgulas. Foco em 3–5 termos relevantes.
              </p>
            </div>

            {/* Canonical URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL Canônica
                <span className="ml-2 text-xs text-gray-400 font-normal">
                  (opcional — deixe vazio para usar a URL padrão)
                </span>
              </label>
              <input
                type="url"
                value={form.canonicalUrl}
                onChange={(e) =>
                  setForm({ ...form, canonicalUrl: e.target.value })
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://amorevet.com.br/blog/seu-artigo"
              />
              <p className="text-xs text-gray-400 mt-1">
                Use apenas se o artigo foi publicado originalmente em outro
                endereço.
              </p>
            </div>

            {/* noIndex */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-50 border border-yellow-100">
              <input
                type="checkbox"
                id="noIndex"
                checked={form.noIndex}
                onChange={(e) =>
                  setForm({ ...form, noIndex: e.target.checked })
                }
                className="w-4 h-4 mt-0.5 text-yellow-600 rounded border-gray-300 focus:ring-yellow-500"
              />
              <div>
                <label
                  htmlFor="noIndex"
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                  Ocultar do Google (noindex)
                </label>
                <p className="text-xs text-gray-500 mt-0.5">
                  Marque para impedir que este artigo apareça nos mecanismos de
                  busca. Use para rascunhos ou páginas de teste.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── ERROS + AÇÕES ───────────────────────────────────────────────────── */}
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
          {loading
            ? "Salvando…"
            : isEditing
            ? "Salvar Alterações"
            : "Criar Post"}
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium text-sm"
        >
          Cancelar
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={handleDelete}
            className="ml-auto px-6 py-2.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors font-medium text-sm"
          >
            Excluir Post
          </button>
        )}
      </div>
    </form>
  );
}
