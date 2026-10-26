# 05 — The blog, in the new site

**For:** Dev · **Owner:** Ankush · **Written:** 26 Oct 2026
**You are building the final version of this site. The blog ships with it.**

Not a bolt-on and not a later phase — a site that cannot publish a post is not finished. The
good news is that almost none of this is new work: the blog already exists, already works, and
the whole data layer can be carried across as-is. Read §1 and §2 before you design anything,
because §2 is a decision that is cheap now and expensive in three weeks.

---

## 1. What already exists and works — carry it, do not rebuild it

Danish built the Strapi blog on 9 Sep. It is merged into `main` and it is good work. Verified
live on 26 Oct 2026, not read off a document:

| | `cardping.netlify.app` (builds from `main`) |
|---|---|
| `/blogs` | 200, all three posts listed |
| `/blogs/first-48-hours-after-an-event` | **200** |
| `sitemap.xml` | **7 URLs**, posts included |

**Three posts are published in Strapi** and render correctly. **Strapi is healthy** —
`api/articles` answers in 0.65s, `/admin` loads, public reads work with no token.

### What carries into the new site

| Piece | File | Notes |
|---|---|---|
| Data layer | `lib/strapi.ts` | Fetchers, types, `mediaUrl`, `readingTime`, `parseTags`. **Reuse wholesale.** |
| Listing | `app/blogs/page.tsx` | Redesign freely — the data contract is what matters |
| Post page | `app/blogs/[slug]/page.tsx` | Same |
| Blocks renderer | `components/blog/blocks-renderer.tsx` | Renders Strapi's blocks JSON |
| Sitemap | `app/sitemap.ts` | Already pulls every post |
| Docs | **`docs/BLOG.md`** | Thorough and accurate. Read it. |

**The content model** — already complete, nothing to add:

```
title · slug · excerpt · content (blocks) · contentHtml · cover
author · authorAvatar · authorProfile (relation) · category · tags
faqs · seoTitle · seoDescription · publishedDate
```

**SEO is already done properly.** Each post emits `BlogPosting` + `BreadcrumbList`, and
`FAQPage` **only when the post actually has FAQs** — the markup never claims Q&As the page does
not show. Canonicals absolute, from `lib/site.ts`. `seoTitle`/`seoDescription` fall back to
`title`/`excerpt`.

⚠ **Keep the split in `components/structured-data.tsx`.** `Organization` and `WebSite` render
site-wide; `SoftwareApplication` and the homepage `FAQPage` render **only** from `app/page.tsx`.
Before that split, every page — including `/privacy` and every blog post — claimed six FAQs and
four pricing offers that were not on it. **Do not move that markup back into the layout.**

### Two things that will bite you if nobody tells you

1. 🔴 **The body is a Strapi *blocks* field, and blocks has no table node.** Posts with tables
   must use **`contentHtml`**, a raw-HTML escape hatch that overrides `content` and renders
   verbatim. Our upcoming comparison posts are mostly tables, so this path has to keep working
   in whatever you build.
2. **Every Strapi fetch fails soft on purpose.** On any error it returns empty and the build
   still succeeds. Danish's reasoning, and it is right: *"an empty blog is recoverable; a failed
   deploy is not."* **Keep that. Do not make it throw.**

---

## 2. 🔴 The one architectural decision — make it now, not later

The current site is a **static export** (`output: "export"`). Four limitations come straight
from that, and `docs/BLOG.md` lists them as knowingly accepted:

- **No draft preview.** A preview URL needs per-request rendering.
- **No instant publish.** Every published post costs a full site rebuild.
- **No pagination.** The listing fetches up to 100 posts in one go.
- **No tag or category pages.** Tags render as labels that link nowhere.

There is also a sharp edge: Next rejects an **empty** `generateStaticParams()` under
`output: "export"` and fails the build — which would take the *whole site* down, not just the
blog. The current code works around it with a throwaway `__no-posts` param that 404s and is
marked `noindex`. If you keep static export, **keep that workaround**.

**You are building fresh, so this is the moment to choose deliberately:**

| | **Keep `output: "export"`** | **Server-rendered / ISR** |
|---|---|---|
| Hosting | Static files behind nginx or a CDN. Trivial. | Needs a Node process |
| Publish → live | Full rebuild every time | **Instant**, via on-demand revalidation |
| Draft preview | **Impossible** | Works |
| Pagination, tag pages | You build them by hand at build time | Normal |
| Blog growth | Rebuild time grows with post count | Flat |
| The `__no-posts` hack | Required | Not needed |

**Worth knowing before you decide:** rizely.net is already served from a VPS that runs four Node
apps under PM2 (`app.rizely.net` is API, dashboard, admin and admin-mcp on ports
3000/3100/3200/3300). **Running the marketing site as a Node process there is not exotic — it
is what the box already does.** The static export was the right call for a Netlify-hosted
brochure site; it is a weaker fit for a site with a growing blog on our own infrastructure.

**This is Ankush's call, not yours — but raise it in M1 rather than discovering it in M3.**
Everything else in this document works under either answer.

---

## 3. 🔴 A correction to `02-WHERE-THINGS-STAND.md` — it affects go-live, not just the blog

That page says the `cardping` Netlify project serves **rizely.net**, and that *"going live =
merging to `main`… Netlify builds `main` and rizely.net changes the moment it lands."*

**That is no longer true.** Checked 26 Oct 2026:

```
rizely.net            A  200.234.35.144     Server: nginx/1.24.0 (Ubuntu)
profile.rizely.net    A  200.234.35.144     ← same box: our VPS
cardping.rankkking.com   104.21.86.171 …    ← Cloudflare → Netlify
```

**`rizely.net` is served by nginx on our VPS**, from `/var/www/cardping/website/out`, built from
a copy of this site inside the `cardping-redev` monorepo. The Netlify `cardping` project still
builds from `main` and still serves `cardping.netlify.app` and `cardping.rankkking.com` — **but
not rizely.net.**

**Two consequences, and the second is the one that matters to you:**

1. The blog is invisible on rizely.net because the monorepo's deploy never passes `STRAPI_URL`.
   The build falls back to `localhost:1337`, fails soft, and ships an empty blog. Proof:
   `rizely.net/blogs/__no-posts` returns **200** (it exists only when Strapi returned nothing at
   build time) while the same URL on Netlify returns 404.
2. 🔴 **Merging to `main` would not put your new site on rizely.net either.** M4 in `README.md`
   does not work as written.

**Rule 1 still stands** — never push to `main`. It auto-deploys to `cardping.rankkking.com`,
which is a live commercial URL. Only the *reason* in that document changed.

**What this means for you:** nothing about how you work today. Keep building on `dev/homepage`
in this repo — correct under every outcome. But **whoever decides where the final site is
deployed has to decide it before M4**, and the blog's deploy wiring follows that same decision.

---

## 4. Your tasks

| # | Task | Blocked on | Done when |
|---|---|---|---|
| **B-1** | **Carry the blog into the new site.** Reuse `lib/strapi.ts` and the content contract; redesign the listing and post pages to match the new design. Keep the structured-data split, the soft-failure behaviour, and the `contentHtml` path. | — | The three real posts render in the new design, locally, against the live Strapi |
| **B-2** | **Raise the static-export question (§2) in M1**, with a recommendation. | — | Ankush has decided, and it is written in `03-TRACKER.md` |
| **B-3** | **Get `STRAPI_URL` into whichever build serves the final site.** `https://rizely-cms-production.up.railway.app`, no trailing slash. No token needed — public reads are open. | the deploy decision (§3) | **`/blogs/__no-posts` returns 404** on the live domain, and the sitemap carries every post |
| **B-4** | **Point the publish webhook at the build that actually serves the site.** In rizely-cms it is registered in code by `scripts/ensure-netlify-webhook.js`. ⚠ **Keep the events at `entry.publish` / `entry.unpublish` / `entry.delete`. Never add `entry.update`** — Strapi sends it immediately before `entry.publish`, so it would double every publish into two builds. It was tried once and removed for exactly that reason. | B-3 | Publishing a post reaches the live site with no manual step |
| **B-5** | **Turn on Strapi's MCP server** — built into Strapi core from v5.47.0, free: `mcp: { enabled: true }` in `config/server.ts`. `curl -i -X GET https://rizely-cms-production.up.railway.app/mcp` returns **404 today**, so it is off or Strapi is older; **405** means on. It lets Claude draft posts into Strapi as drafts for a human to publish. | — | `/mcp` returns 405, Strapi version recorded |
| **B-6** | **Publish one new post end to end** and time it. | B-3, B-4 | Live inside two minutes, in the sitemap, with a cover image |
| **B-7** | **Report back** in `03-TRACKER.md`: the static-export decision, where the final site deploys, the Strapi version, whether MCP is on, and the measured publish-to-live time. | B-6 | Five facts written down |

**B-1, B-2 and B-5 need nothing from anyone** — start there.

---

## 5. Running it locally

```bash
cp .env.example .env.local
# STRAPI_URL=https://rizely-cms-production.up.railway.app
npm run dev        # http://localhost:3000/blogs
```

Develop against the real Strapi — the three posts are real content and good test material. Or
run rizely-cms locally (`npm run develop`, then `node scripts/seed-sample.js`). Leave
`STRAPI_API_TOKEN` empty; public reads are open.

**Without `STRAPI_URL` the build succeeds and the blog is empty.** That is the exact failure
currently live on rizely.net — do not mistake it for "no posts yet".

---

## 6. Things not to do

- **Never push to `main`** — rule 1. Run `git config core.hooksPath .githooks`.
- **Never touch the `cardping` Netlify project.** Yours is `rizely-platform`.
- **Do not rebuild the Strapi layer.** Redesign the pages; keep the data layer.
- **Do not make `lib/strapi.ts` throw on error.** The soft failure is deliberate.
- **Do not add `entry.update`** to the Strapi webhook.
- **Do not drop the `contentHtml` path.** Our table-heavy posts depend on it.
- **Do not move `SoftwareApplication` or the homepage `FAQPage` into the root layout.**
- **Do not commit secrets.** `STRAPI_URL`, tokens and build-hook URLs are environment variables.

---

## 7. Reference

- **`docs/BLOG.md`** — the authoritative description of how the blog works. Read before B-1.
- `docs/HANDOVER.md` — site-wide handover. ⚠ September-era; its Netlify/rizely.net lines are
  superseded by §3 above.
- [`1MrHad1/rizely-cms`](https://github.com/1MrHad1/rizely-cms) — the CMS repo and its content-model
  README. **You may not have access; ask Ankush.**
