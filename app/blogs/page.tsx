import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/footer";
import { BRAND, SITE_URL } from "@/lib/site";
import {
  getArticles,
  articleDate,
  formatDate,
  readingTime,
  mediaUrl,
  type Article,
} from "@/lib/strapi";

const TITLE = `Blog — ${BRAND}`;
const DESCRIPTION =
  "Practical writing on event lead capture and follow-up: what actually shortens the gap between collecting a card and getting a reply.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/blogs" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blogs`,
    siteName: BRAND,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

function PostCard({ post }: { post: Article }) {
  const cover = mediaUrl(post.cover?.url);
  const date = formatDate(articleDate(post));

  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card/40 transition-colors hover:border-border/90 hover:bg-card/70"
    >
      {cover ? (
        <img
          src={cover}
          alt={post.cover?.alternativeText ?? ""}
          className="aspect-[16/9] w-full object-cover"
          loading="lazy"
        />
      ) : null}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {post.category ? (
          <span className="w-fit rounded-full border border-border px-2.5 py-0.5 text-xs text-primary">
            {post.category}
          </span>
        ) : null}
        <h2 className="text-lg font-semibold leading-snug tracking-tight text-foreground">
          {post.title}
        </h2>
        {post.excerpt ? (
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
        ) : null}
        <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-2 text-xs text-muted-foreground">
          {date ? <span>{date}</span> : null}
          {date ? <span aria-hidden>·</span> : null}
          <span>{readingTime(post)} min read</span>
        </div>
      </div>
    </Link>
  );
}

export default async function BlogIndex() {
  const posts = await getArticles();

  return (
    <main className="flex min-h-dvh flex-col">
      <section className="mx-auto w-full max-w-6xl px-4 pt-16 pb-20 md:px-8">
        <header className="flex flex-col items-center gap-4 text-center">
          <span className="w-fit rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground sm:text-sm">
            {BRAND} blog
          </span>
          <h1 className="max-w-2xl text-4xl font-medium tracking-tighter text-balance md:text-5xl">
            Notes on turning event conversations into customers
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground text-balance sm:text-lg">
            {DESCRIPTION}
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="mx-auto mt-16 max-w-md rounded-lg border border-border bg-card/50 p-6 text-center text-sm text-muted-foreground">
            No posts published yet. Check back shortly.
          </p>
        ) : (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.documentId ?? post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
