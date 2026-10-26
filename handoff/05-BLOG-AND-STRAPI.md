# 05 — The blog, and getting it live on rizely.net

**For:** Dev · **Owner:** Ankush · **Written:** 26 Oct 2026
**Second job, after the homepage.** Smaller than it sounds — most of it is already built and
working. Read §1 before you touch anything; it will save you a day of looking for a bug that
is not there.

---

## 1. The blog already works. It is just not on rizely.net.

Everything below was verified live on 26 Oct 2026, not read off a document.

| | `cardping.netlify.app` | `rizely.net` |
|---|---|---|
| `/blogs` | 200 | 200 |
| A real post, `/blogs/first-48-hours-after-an-event` | **200 ✅** | **404 ❌** |
| `/blogs/__no-posts` (the empty-state sentinel) | **404 ✅** | **200 ❌** |
| URLs in `sitemap.xml` | **7** | **4** |
| Served by | Netlify | **nginx/1.24.0 (Ubuntu)** |

**Three posts have been published in Strapi since 9 September.** They render perfectly on
Netlify. They have never appeared on rizely.net.

**Strapi itself is completely healthy** — `api/articles` answers in 0.65s, `/admin` loads,
public reads work with no token, 3 articles and 1 author present.

### 🔴 The thing that explains it, and that `README.md` currently gets wrong

`handoff/README.md` says *"`main` **is** the live site — `rizely.net` rebuilds from it
automatically."* **That is no longer true, and it matters for your homepage work as much as for
the blog.**

`rizely.net` is served by **nginx on the Hostinger VPS**, from `/var/www/cardping/website/out`,
built from a **copy of this site inside the `cardping-redev` monorepo** at `website/`. The site
was moved in there around 17 Oct. The Netlify project still builds from `main` and still serves
`cardping.netlify.app` and `cardping.rankkking.com` — but **rizely.net no longer comes from it.**

So there are two copies of this codebase:

| Copy | Serves | Has the blog working? |
|---|---|---|
| `agag13/cardping-website` (this repo) | `cardping.netlify.app`, `cardping.rankkking.com` | **Yes** |
| `cardping-redev/website/` | **`rizely.net`** | **No** |

**Why the monorepo copy has no posts:** its deploy workflow never passes `STRAPI_URL`. The build
falls back to the default `http://localhost:1337`, cannot reach it, and `lib/strapi.ts`
**fails soft by design** — so the build succeeds and ships an empty blog. `docs/BLOG.md` predicted
exactly this: *"a missing env var looks exactly like 'no posts yet'."* The live
`/blogs/__no-posts` returning 200 is the proof — that route exists only when Strapi returned
nothing at build time.

**You do not have access to `cardping-redev`.** Ask Ankush. Which brings us to the first
decision, which is not yours to make.

---

## 2. 🔴 The question Ankush has to answer before you start

**Which copy is the real site going forward?**

Both your homepage work and the blog depend on it, and the answer changes what you do:

- **(a) rizely.net moves back to Netlify.** Point DNS at the `cardping` Netlify project. The blog
  starts working immediately — it already does there — and milestone **M4** in `README.md`
  ("merge to main and it goes live") becomes true again. **This repo stays the source of truth.**
- **(b) The monorepo stays the live site.** Then `STRAPI_URL` has to be added to its deploy, the
  Strapi webhook has to be re-pointed at the monorepo's deploy, **and your homepage work has to
  be ported into `cardping-redev/website/` to ever go live.** Merging to `main` here would not
  reach rizely.net.

**Do not guess.** Under (b), M4 as written in `README.md` does not work, and you could finish the
homepage without it ever reaching the public.

Until it is answered, **do your homepage work here on `dev/homepage` exactly as briefed** — that
is correct under both answers.

---

## 3. What is already built, so you do not rebuild it

Danish built this on 9 Sep and it is merged into `main`. It is good work. Leave it alone unless
something below says otherwise.

| Piece | Where |
|---|---|
| Listing | `app/blogs/page.tsx` |
| Post page | `app/blogs/[slug]/page.tsx` |
| Blocks renderer | `components/blog/blocks-renderer.tsx` |
| Data layer | `lib/strapi.ts` |
| Sitemap | `app/sitemap.ts` — already includes every post |
| Docs | **`docs/BLOG.md` — read this, it is thorough and it is accurate** |
| CMS | [`1MrHad1/rizely-cms`](https://github.com/1MrHad1/rizely-cms), self-hosted on Railway. Media on Cloudinary. |

**The content model** — all of it exists already:

```
title · slug · excerpt · content (blocks) · contentHtml · cover
author · authorAvatar · authorProfile (relation) · category · tags
faqs · seoTitle · seoDescription · publishedDate
```

**SEO is done and done carefully.** Each post emits `BlogPosting` + `BreadcrumbList`, and
`FAQPage` **only when the post actually has FAQs** — the markup never claims Q&As the page does
not show. Canonicals are absolute, from `lib/site.ts`. `seoTitle` / `seoDescription` fall back to
`title` / `excerpt`. **There is nothing for you to add here.**

### Three details that will bite you if you do not know them

1. 🔴 **The body is a Strapi *blocks* field, and blocks has no table node.** Any post with a table
   must go through **`contentHtml`**, a raw-HTML escape hatch that overrides `content` and renders
   verbatim. Our upcoming comparison posts are mostly tables — **they all use `contentHtml`.**
2. **`/blogs/__no-posts` is deliberate, not a bug.** Next rejects an empty
   `generateStaticParams()` under `output: "export"` and fails the build — which would take the
   *whole site* down, not just the blog. The route returns one throwaway param that 404s and is
   marked `noindex`. **If you see it live, Strapi was unreachable at build time.**
3. **Every Strapi fetch fails soft on purpose.** A Strapi outage gives you an empty blog, never a
   failed deploy. Danish's reasoning, and it is right: *"an empty blog is recoverable; a failed
   deploy is not."* **Do not "fix" this by making it throw.**

---

## 4. Your tasks

Numbered to match `03-TRACKER.md`'s convention. **B-1 is blocked on §2; everything else is not.**

| # | Task | Done when |
|---|---|---|
| **B-1** | 🔴 **Get the blog onto rizely.net.** Under answer (a), nothing to build — confirm it works after the DNS move. Under (b), get `STRAPI_URL=https://rizely-cms-production.up.railway.app` into the monorepo's website build step and re-point the Strapi webhook at that deploy. **Blocked on §2 and on repo access.** | `rizely.net/blogs/__no-posts` returns **404**, the three posts are live, and the sitemap goes 4 → 7 URLs |
| **B-2** | **Check the publish webhook still fires at a live target.** In rizely-cms it is registered in code by `scripts/ensure-netlify-webhook.js`, on `entry.publish` / `entry.unpublish` / `entry.delete`. ⚠ **Do not add `entry.update`** — Strapi sends it immediately before `entry.publish`, so it would double every publish into two builds. It was tried once and removed for exactly that reason. | Publishing a post rebuilds whatever serves rizely.net, with no manual step |
| **B-3** | **Turn on Strapi's MCP server.** It is **built into Strapi core** from v5.47.0 and free — `mcp: { enabled: true }` in `config/server.ts`. `curl -i -X GET https://rizely-cms-production.up.railway.app/mcp` returns **404 today**, so it is off or Strapi is older. 405 means it is on. This lets Claude draft posts straight into Strapi as drafts for a human to publish. | `/mcp` returns 405, and the Strapi version is written down |
| **B-4** | **Publish one new test post end to end** and time it. | Live inside two minutes, in the sitemap, with a cover image |
| **B-5** | **Report back:** which copy is live, the Strapi version, whether MCP is on, and the measured publish-to-live time. | Four facts, in `03-TRACKER.md` |

**Known gaps Danish documented and consciously accepted** — not your problem unless Ankush says
so: no draft preview (needs per-request rendering, impossible under static export), no instant
publish (every publish costs a rebuild), no pagination past ~100 posts, and tags render as
labels that link nowhere.

---

## 5. Running it locally

```bash
cp .env.example .env.local      # set STRAPI_URL
npm run dev                     # http://localhost:3000/blogs
```

Point `STRAPI_URL` at `https://rizely-cms-production.up.railway.app` to develop against the real
content, or run rizely-cms locally (`npm run develop`, then `node scripts/seed-sample.js`).
Public reads need no token, so leave `STRAPI_API_TOKEN` empty.

**Without `STRAPI_URL` the build succeeds and the blog is empty.** That is the failure mode you
are fixing — do not mistake it for "no posts yet".

---

## 6. Things not to do

- **Never push to `main`** — rule 1 in `README.md`, and the pre-push hook blocks it. Run
  `git config core.hooksPath .githooks`.
- **Never touch the `cardping` Netlify project.** Yours is `rizely-platform`.
- **Do not rebuild the blog.** It works. The problem is configuration, not code.
- **Do not make `lib/strapi.ts` throw on error.** The soft failure is deliberate.
- **Do not add `entry.update`** to the Strapi webhook.
- **Do not commit secrets.** `STRAPI_URL`, tokens and build-hook URLs live in environment
  variables.

---

## 7. Reference

- **`docs/BLOG.md`** in this repo — the authoritative description of how the blog works. Read it
  before B-1.
- `docs/HANDOVER.md` — site-wide handover. ⚠ Written in September; its "served from Netlify" and
  "rizely.net cutover pending" lines are now out of date, for the reason in §1.
- [`1MrHad1/rizely-cms`](https://github.com/1MrHad1/rizely-cms) — the CMS repo and its content-model
  README. **You may not have access; ask Ankush.**
