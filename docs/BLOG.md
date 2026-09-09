# The Rizely blog

Content lives in Strapi. The site is a **static export**, so the blog is baked
in at build time — posts appear when the site rebuilds, not the moment you hit
publish. That single fact explains most of the design below.

- **CMS repo:** [`1MrHad1/rizely-cms`](https://github.com/1MrHad1/rizely-cms)
- **Listing:** `/blogs`
- **Posts:** `/blogs/<slug>`

## URLs

| Path | Source | Notes |
|---|---|---|
| `/blogs` | [`app/blogs/page.tsx`](../app/blogs/page.tsx) | lists every published article, newest first |
| `/blogs/<slug>` | [`app/blogs/[slug]/page.tsx`](../app/blogs/[slug]/page.tsx) | one post per Strapi `article.slug` |
| `/sitemap.xml` | [`app/sitemap.ts`](../app/sitemap.ts) | generated, includes every post |

`/blogs/` (with the trailing slash) 301s to `/blogs` — Netlify's pretty-URLs
behaviour, and the canonical form is the one without.

This differs from FameNinja deliberately: FameNinja serves posts from the **root**
(`/<slug>`) with `/blog` as the listing. Rizely namespaces them under `/blogs`,
so a post slug can never collide with a future marketing page.

## How a post gets published

1. Write and **publish** the article in Strapi. Draft-but-saved is invisible to
   the public API, so it will not appear even after a rebuild.
2. Strapi fires its webhook at the Netlify build hook (`strapi-publish`).
3. Netlify rebuilds and deploys. Takes roughly a minute.

If a post is published but not live, check in this order: is it actually
published (not draft), did the webhook fire (Strapi → Settings → Webhooks shows
delivery status), did the Netlify build succeed.

### Wiring that up (once)

- **Netlify:** the build hook already exists — project `cardping` → Build &
  deploy → Build hooks → `strapi-publish`. Copy its URL from there.
- **Strapi:** Settings → Webhooks → Create. POST to that URL, and enable
  `Entry publish`, `Entry update` and `Entry unpublish` for Article.

## Environment

Set on the Netlify site (Site configuration → Environment variables):

| Variable | Value |
|---|---|
| `STRAPI_URL` | the Railway URL of rizely-cms, no trailing slash |
| `STRAPI_API_TOKEN` | optional; only needed if the Public role is locked down |

**Without `STRAPI_URL` the build still succeeds and the blog renders empty.**
That is deliberate — see "Failure behaviour" below. It also means a missing env
var looks exactly like "no posts yet", so check the build log for
`[strapi] unreachable` if the blog is unexpectedly empty.

Locally, copy `.env.example` to `.env.local` and point `STRAPI_URL` at
`http://localhost:1337`.

## Failure behaviour

Every fetch in [`lib/strapi.ts`](../lib/strapi.ts) fails soft: on any error it
returns empty or null and logs a warning. If Strapi is down or unreachable the
build still succeeds and ships the marketing site with an empty blog.

This is a deliberate trade. An empty blog is recoverable in one rebuild; a
failed deploy blocks every other change to the site, including urgent ones.

There is one wrinkle worth knowing. Next 16 rejects an **empty**
`generateStaticParams()` under `output: "export"` — it reports it as *missing*
and fails the build. So with no posts, `/blogs/[slug]` would take the whole site
down with it. The route therefore returns a single throwaway param,
`__no-posts`, which the page 404s on and marks `noindex`; it is excluded from
the sitemap and linked from nowhere. If you see `/blogs/__no-posts` in a build
log, it means Strapi returned nothing — check `STRAPI_URL` and the build log for
`[strapi] unreachable`.

## Content model

Full field reference is in [rizely-cms's README](https://github.com/1MrHad1/rizely-cms#content-model).
The four fields worth knowing here:

- **`contentHtml` beats `content`.** If it is set, the post renders that raw HTML
  verbatim and ignores the blocks. The blocks format has no table node, so any
  post with a table has to come through this field.
- **`authorProfile`** (a relation) drives the author box. `author` and
  `authorAvatar` are plain-text fallbacks for posts without a real author record.
- **`faqs`** renders an accordion *and* emits FAQPage schema. Leave it empty and
  neither appears — the markup never claims Q&As the page does not show.
- **`seoTitle` / `seoDescription`** fall back to `title` / `excerpt`.

## SEO

Each post emits `BlogPosting` + `BreadcrumbList`, plus `FAQPage` only when it
actually has FAQs. Canonicals are absolute and derived from `SITE_URL` in
[`lib/site.ts`](../lib/site.ts).

Note the split in [`components/structured-data.tsx`](../components/structured-data.tsx):
`Organization` and `WebSite` render site-wide from the root layout, while
`SoftwareApplication` (with its price Offers) and the homepage `FAQPage` render
only from `app/page.tsx`. Before that split every page — including `/privacy`
and every blog post — claimed six FAQs and four pricing offers that were not on
the page, and a post with its own FAQs emitted two competing FAQPage nodes.
**Do not move that markup back into the layout.**

## What this setup does not have

Consequences of the static export, all accepted knowingly:

- **No draft preview.** Content Preview is disabled in rizely-cms because a
  preview URL needs per-request rendering. Restoring it means dropping
  `output: "export"` first.
- **No instant publish.** Every publish costs a rebuild.
- **No pagination.** The listing fetches up to 100 posts in one page. Past
  roughly that many, add pagination to `getArticles`.
- **No tag or category pages.** Tags render as labels only; they do not link
  anywhere.
