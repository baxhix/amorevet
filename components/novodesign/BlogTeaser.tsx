import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { ArrowRight } from "./icons";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { SectionTitle } from "./ui";

/* Ilustrações simuladas (pets) — usadas quando o post não tem imagem de capa */
const BLOG_IMGS = ["/blog/1.jpg", "/blog/2.jpg", "/blog/3.jpg", "/blog/4.jpg"];

export type TeaserPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string | null;
  publishedAt: Date | string | null;
  author: { name: string };
  category: { name: string } | null;
};

export default function BlogTeaser({ posts }: { posts: TeaserPost[] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section id="blog" className="relative bg-cream py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <SectionTitle><span className="text-primary">Dicas &amp; novidades<br />do nosso blog</span></SectionTitle>
          </div>
          <Link href="/blog" className="group inline-flex items-center gap-2 text-[0.9rem] font-semibold text-primary-dark">
            Ver todos os artigos
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <StaggerItem key={post.id}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-white nd-shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:nd-shadow-lg"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={post.coverImage || BLOG_IMGS[i % BLOG_IMGS.length]}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex grow flex-col p-6">
                  {post.category && (
                    <span className="text-[0.7rem] font-bold uppercase tracking-wider text-secondary">{post.category.name}</span>
                  )}
                  <h3 className="mt-1.5 line-clamp-2 text-[1.05rem] font-bold text-ink transition-colors group-hover:text-secondary-dark">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 grow text-[0.88rem] leading-relaxed text-ink/55">{post.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-ink/8 pt-4 text-[0.75rem] text-ink/45">
                    <span>{post.author.name}</span>
                    <span>{post.publishedAt ? formatDate(post.publishedAt) : ""}</span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
