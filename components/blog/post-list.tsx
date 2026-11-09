// Post card, shared by the /blogs grid and the "Keep reading" block under each
// post. Hover motion lives in `.post-card` in app/globals.css.
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  articleDate,
  formatDate,
  readingTime,
  mediaUrl,
  type Article,
} from "@/lib/strapi";

export function PostCard({
  post,
  heading: Heading = "h2",
}: {
  post: Article;
  /** h2 on /blogs; h3 under a post's "Keep reading" h2. */
  heading?: "h2" | "h3";
}) {
  const cover = mediaUrl(post.cover?.url);
  const iso = articleDate(post);
  const date = formatDate(iso);

  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="post-card group flex w-full flex-col overflow-hidden rounded-xl border border-border bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {cover ? (
        <div className="overflow-hidden">
          <img
            src={cover}
            alt={post.cover?.alternativeText ?? ""}
            className="post-card-cover aspect-[16/9] w-full object-cover"
            loading="lazy"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        {post.category ? (
          <span className="text-sm font-medium text-primary">{post.category}</span>
        ) : null}
        <Heading className="text-lg font-semibold leading-snug tracking-tight text-foreground text-balance">
          {post.title}
        </Heading>
        {post.excerpt ? (
          <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
            {post.excerpt}
          </p>
        ) : null}
        <div className="mt-auto flex items-center justify-between gap-3 pt-3 text-sm text-muted-foreground">
          <span className="flex flex-wrap items-center gap-x-2">
            {date ? <time dateTime={iso ?? undefined}>{date}</time> : null}
            {date ? <span aria-hidden>·</span> : null}
            <span className="whitespace-nowrap">{readingTime(post)} min read</span>
          </span>
          <ArrowRight aria-hidden="true" className="post-card-arrow size-4 shrink-0 text-primary" />
        </div>
      </div>
    </Link>
  );
}
