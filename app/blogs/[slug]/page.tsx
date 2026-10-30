import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronDown } from "lucide-react";
import Footer from "@/components/footer";
import BlocksRenderer from "@/components/blog/blocks-renderer";
import { PostCard } from "@/components/blog/post-list";
import { BRAND, OG_IMAGE, SITE_URL } from "@/lib/site";
import { isNoindexSlug } from "@/lib/noindex";
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

/** Wrap each raw-HTML table so it scrolls inside itself on a narrow screen
    rather than widening the page. `.blog-prose .blog-table` styles the box. */
function wrapTables(html: string): string {
  return html
    .replace(/<table\b/gi, '<div class="blog-table"><table')
    .replace(/<\/table>/gi, "</table></div>");
}

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
    // Live but held out of search until Ankush approves (lib/noindex.ts).
    ...(isNoindexSlug(post.slug) ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type: "article",
      url,
      siteName: BRAND,
      title,
      description,
      locale: "en_IN",
      publishedTime: articleDate(post) ?? undefined,
      modifiedTime: post.updatedAt ?? undefined,
      images: [{ url: cover ?? OG_IMAGE }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [cover ?? OG_IMAGE],
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
  const iso = articleDate(post);
  const date = formatDate(iso);
  const tags = parseTags(post.tags);
  const profile = post.authorProfile;
  const authorName = profile?.name || post.author;
  const avatar = mediaUrl(profile?.avatar?.url ?? post.authorAvatar?.url);
  const more = (await getArticles()).filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <main className="flex min-h-dvh flex-col">
      <PostSchema post={post} />

      <article className="mx-auto w-full max-w-3xl px-4 pt-14 pb-20 md:px-8 md:pt-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
            <li>
              <Link href="/blogs" className="transition-colors hover:text-foreground">
                Blog
              </Link>
            </li>
            {post.category ? (
              <>
                <li aria-hidden>/</li>
                <li className="font-medium text-primary">{post.category}</li>
              </>
            ) : null}
          </ol>
        </nav>

        <header className="mt-6 flex flex-col gap-5">
          <h1 className="text-3xl font-bold leading-[1.1] tracking-tight text-balance sm:text-5xl">
            {post.title}
          </h1>
          {post.excerpt ? (
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty sm:text-xl">
              {post.excerpt}
            </p>
          ) : null}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
            {authorName ? <span className="text-foreground">{authorName}</span> : null}
            {authorName && date ? <span aria-hidden>·</span> : null}
            {date ? <time dateTime={iso ?? undefined}>{date}</time> : null}
            <span aria-hidden>·</span>
            <span className="whitespace-nowrap">{readingTime(post)} min read</span>
          </div>
        </header>

        {cover ? (
          <img
            src={cover}
            alt={post.cover?.alternativeText ?? ""}
            className="mt-10 h-auto w-full rounded-xl border border-border"
          />
        ) : null}

        {post.contentHtml ? (
          // Migrated/raw HTML wins over blocks — the blocks format has no
          // table node, so posts with tables have to come through here. Both
          // paths share .blog-prose, so they read the same.
          <div
            className="blog-prose mt-12"
            dangerouslySetInnerHTML={{ __html: wrapTables(post.contentHtml) }}
          />
        ) : (
          <div className="blog-prose mt-12">
            <BlocksRenderer content={post.content} />
          </div>
        )}

        {post.faqs?.length ? (
          <section className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Frequently asked
            </h2>
            {/* Same native <details> pattern as the homepage FAQ: answers are in
                the HTML with JS off, and match the FAQPage schema above. */}
            <div className="mt-4 divide-y divide-border">
              {post.faqs.map((f, i) => (
                <details key={f.id ?? i} className="group py-1">
                  <summary className="faq-summary flex cursor-pointer items-center justify-between gap-4 py-4 text-left font-medium text-foreground">
                    {f.question}
                    <ChevronDown
                      aria-hidden="true"
                      className="faq-chevron size-4 shrink-0 text-muted-foreground"
                    />
                  </summary>
                  <p className="pb-4 pr-8 text-base leading-relaxed text-muted-foreground">
                    {f.answer}
                  </p>
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

        {more.length ? (
          <section className="mt-16 border-t border-border pt-12">
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Keep reading
            </h2>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2">
              {more.map((p) => (
                <li key={p.documentId ?? p.slug} className="flex">
                  <PostCard post={p} heading="h3" />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>

      <Footer />
    </main>
  );
}
