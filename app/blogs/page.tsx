import type { Metadata } from "next";
import Footer from "@/components/footer";
import { PostCard } from "@/components/blog/post-list";
import { BRAND, OG_IMAGE, SITE_URL } from "@/lib/site";
import { getArticles } from "@/lib/strapi";

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
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [OG_IMAGE] },
};

export default async function BlogIndex() {
  const posts = await getArticles();

  return (
    <main className="flex min-h-dvh flex-col">
      <section className="mx-auto w-full max-w-6xl px-4 pt-14 pb-20 md:px-8 md:pt-20">
        <header className="flex flex-col gap-4">
          <span className="w-fit rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground sm:text-sm">
            {BRAND} blog
          </span>
          <h1 className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-balance md:text-5xl">
            Notes on turning event conversations into customers
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            {DESCRIPTION}
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="mt-14 max-w-md rounded-lg border border-border bg-card/50 p-6 text-sm text-muted-foreground">
            No posts published yet. Check back shortly.
          </p>
        ) : (
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.documentId ?? post.slug} className="flex">
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </section>
      <Footer />
    </main>
  );
}
