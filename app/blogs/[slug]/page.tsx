import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/footer";
import BlocksRenderer from "@/components/blog/blocks-renderer";
import { BRAND, SITE_URL } from "@/lib/site";
import {
  getArticles,
  getArticleBySlug,
  articleDate,
  formatDate,
  readingTime,
  parseTags,
  mediaUrl,
  type Article,
} from "@/lib/strapi";

// Static export: every post URL must be known at build time, and nothing
// outside this list should be reachable.
export const dynamicParams = false;

/**
 * Placeholder slug for the "no posts" case.
 *
 * Next 16 rejects an EMPTY generateStaticParams() under `output: "export"` and
 * reports it as *missing*, which fails the whole build — verified in isolation.
 * So when Strapi returns nothing (down, unreachable, or STRAPI_URL simply not
 * set yet) the marketing site would stop deploying entirely, which is far worse
 * than shipping an empty blog.
 *
 * Returning one throwaway param keeps the route buildable. The page below
 * 404s on it and generateMetadata marks it noindex, because a static export
 * serves it as a 200 and it would otherwise be a soft-404.
 */
const NO_POSTS_SLUG = "__no-posts";

export async function generateStaticParams() {
  const posts = await getArticles();
  const params = posts.filter((p) => p.slug).map((p) => ({ slug: p.slug }));
  return params.length > 0 ? params : [{ slug: NO_POSTS_SLUG }];
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getArticleBySlug(slug);
  if (!post) {
    return { title: `Not found — ${BRAND}`, robots: { index: false, follow: false } };
  }

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt || undefined;
  const cover = mediaUrl(post.cover?.url);
  const url = `${SITE_URL}/blogs/${post.slug}`;

  return {
    title: `${title} — ${BRAND}`,
    description,
    alternates: { canonical: `/blogs/${post.slug}` },
    openGraph: {
      type: "article",
      url,
      siteName: BRAND,
      title,
      description,
      locale: "en_IN",
      publishedTime: articleDate(post) ?? undefined,
      modifiedTime: post.updatedAt ?? undefined,
      ...(cover ? { images: [{ url: cover }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(cover ? { images: [cover] } : {}),
    },
  };
}

function PostSchema({ post }: { post: Article }) {
  const url = `${SITE_URL}/blogs/${post.slug}`;
  const cover = mediaUrl(post.cover?.url);
  const authorName = post.authorProfile?.name || post.author || BRAND;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt || undefined,
      url,
      mainEntityOfPage: url,
      datePublished: articleDate(post) ?? undefined,
      dateModified: post.updatedAt ?? articleDate(post) ?? undefined,
      author: { "@type": "Person", name: authorName },
      publisher: { "@id": `${SITE_URL}/#organization` },
      ...(cover ? { image: cover } : {}),
      ...(post.category ? { articleSection: post.category } : {}),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blogs` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];

  // Only emit FAQPage when the post actually carries Q&As, so the markup never
  // claims content the page does not show.
  if (post.faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: post.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  if (slug === NO_POSTS_SLUG) notFound();
  const post = await getArticleBySlug(slug);
  if (!post) notFound();

  const cover = mediaUrl(post.cover?.url);
  const date = formatDate(articleDate(post));
  const tags = parseTags(post.tags);
  const profile = post.authorProfile;
  const authorName = profile?.name || post.author;
  const avatar = mediaUrl(profile?.avatar?.url ?? post.authorAvatar?.url);

  return (
    <main className="flex min-h-dvh flex-col">
      <PostSchema post={post} />

      <article className="mx-auto w-full max-w-3xl px-4 pt-16 pb-24 md:px-8">
        <Link
          href="/blogs"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← All posts
        </Link>

        <header className="mt-6 flex flex-col gap-4">
          {post.category ? (
            <span className="w-fit rounded-full border border-border px-2.5 py-0.5 text-xs text-primary">
              {post.category}
            </span>
          ) : null}
          <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {post.title}
          </h1>
          {post.excerpt ? (
            <p className="text-lg leading-relaxed text-muted-foreground text-balance">
              {post.excerpt}
            </p>
          ) : null}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
            {authorName ? <span>{authorName}</span> : null}
            {authorName && date ? <span aria-hidden>·</span> : null}
            {date ? <time dateTime={articleDate(post) ?? undefined}>{date}</time> : null}
            <span aria-hidden>·</span>
            <span>{readingTime(post)} min read</span>
          </div>
        </header>

        {cover ? (
          <img
            src={cover}
            alt={post.cover?.alternativeText ?? ""}
            className="mt-8 h-auto w-full rounded-xl border border-border"
          />
        ) : null}

        <div className="mt-10">
          {post.contentHtml ? (
            // Migrated/raw HTML wins over blocks — the blocks format has no
            // table node, so posts with tables have to come through here.
            <div
              className="legal-prose flex flex-col gap-6 text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          ) : (
            <BlocksRenderer content={post.content} />
          )}
        </div>

        {post.faqs?.length ? (
          <section className="mt-14">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Frequently asked
            </h2>
            <div className="mt-5 flex flex-col gap-3">
              {post.faqs.map((f, i) => (
                <details
                  key={f.id ?? i}
                  className="rounded-lg border border-border bg-card/40 px-4 py-3"
                >
                  <summary className="cursor-pointer text-base font-medium text-foreground">
                    {f.question}
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        {tags.length ? (
          <div className="mt-12 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}

        {profile ? (
          <aside className="mt-12 flex items-start gap-4 rounded-xl border border-border bg-card/40 p-5">
            {avatar ? (
              <img
                src={avatar}
                alt={profile.name}
                className="size-12 shrink-0 rounded-full object-cover"
                loading="lazy"
              />
            ) : null}
            <div className="flex flex-col gap-1">
              <span className="font-medium text-foreground">{profile.name}</span>
              {profile.role ? (
                <span className="text-sm text-muted-foreground">{profile.role}</span>
              ) : null}
              {profile.bio ? (
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{profile.bio}</p>
              ) : null}
              {profile.linkedin ? (
                <Link
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 w-fit text-sm text-primary underline underline-offset-4 hover:no-underline"
                >
                  LinkedIn
                </Link>
              ) : null}
            </div>
          </aside>
        ) : null}
      </article>

      <Footer />
    </main>
  );
}
