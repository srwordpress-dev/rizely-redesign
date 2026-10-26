# 05 — The blog

**For:** Dev · **Written:** 26 Oct 2026 · **Part of the site you are building, not a later phase.**

The blog already exists and works. Carry it into the new site, redesign the pages, get it live.
`docs/BLOG.md` has the detail — it is accurate and worth the ten minutes.

---

## The tasks

| # | Task | Done when |
|---|---|---|
| **B-1** | **Carry the blog into the new site.** Reuse `lib/strapi.ts` and the content contract as-is; redesign `app/blogs/page.tsx` and `app/blogs/[slug]/page.tsx` to match. | The three real posts render in the new design against the live Strapi |
| **B-2** | **Decide static export vs server-rendered, and tell Ankush.** See the note below — raise it in M1, not M3. | Decided and written in `03-TRACKER.md` |
| **B-3** | **Get `STRAPI_URL` into whichever build serves the final site.** `https://rizely-cms-production.up.railway.app`, no trailing slash, no token needed. | **`/blogs/__no-posts` returns 404** on the live domain and the sitemap carries every post |
| **B-4** | **Point the Strapi publish webhook at that build.** Registered in code in rizely-cms by `scripts/ensure-netlify-webhook.js`. | Publishing a post reaches the live site with no manual step |
| **B-5** | **Turn on Strapi's MCP** — built into core from v5.47.0, free: `mcp: { enabled: true }`. Returns 404 today; 405 means on. Lets Claude draft posts as drafts for a human to publish. | `/mcp` returns 405 |
| **B-6** | **Publish one post end to end** and time it. | Live in under two minutes, in the sitemap |

**B-1, B-2 and B-5 need nothing from anyone. Start there.**

---

## Five things worth knowing before you start

1. 🔴 **The body is a Strapi *blocks* field and blocks has no table node.** Posts with tables use
   **`contentHtml`**, a raw-HTML escape hatch that overrides `content`. Our comparison posts are
   mostly tables, so that path has to keep working.
2. **Every Strapi fetch fails soft on purpose** — on error it returns empty and the build still
   ships. *"An empty blog is recoverable; a failed deploy is not."* **Don't make it throw.**
3. **`/blogs/__no-posts` is deliberate.** Next rejects an empty `generateStaticParams()` under
   `output: "export"` and fails the build, taking the whole site with it. If you keep static
   export, keep the workaround. **If you see it live, Strapi was unreachable at build time.**
4. **Keep the split in `components/structured-data.tsx`.** `SoftwareApplication` and the homepage
   `FAQPage` render only from `app/page.tsx`. Before that split every page, `/privacy` included,
   claimed six FAQs and four pricing offers it did not have.
5. **SEO is already done** — `BlogPosting` + `BreadcrumbList` per post, `FAQPage` only when the
   post has FAQs, absolute canonicals, `seoTitle`/`seoDescription` with fallbacks. Nothing to add.

**Never add `entry.update` to the Strapi webhook.** Strapi sends it immediately before
`entry.publish`, so it doubles every publish into two builds. Tried once, removed.

---

## B-2, in one table

All four known blog limitations come from `output: "export"`. You are building fresh, so this is
the moment:

| | Static export | Server-rendered / ISR |
|---|---|---|
| Publish → live | Full rebuild | Instant |
| Draft preview | Impossible | Works |
| Pagination, tag pages | Hand-built | Normal |
| Rebuild time as posts grow | Grows | Flat |

The VPS already runs four Node apps under PM2, so SSR there is not exotic.

---

## 🔴 One correction to `02-WHERE-THINGS-STAND.md`

It says `main` deploys to rizely.net. **It doesn't any more.**

```
rizely.net            A 200.234.35.144   Server: nginx/1.24.0 (Ubuntu)
profile.rizely.net    A 200.234.35.144   ← same box, our VPS
cardping.rankkking.com  104.21.86.171    ← Cloudflare → Netlify
```

rizely.net is served by nginx on our VPS from a copy of this site in the `cardping-redev`
monorepo — which is also why the blog is empty there: that build never passes `STRAPI_URL`.

**So merging to `main` would not put your work on rizely.net.** M4 needs a decision from Ankush
about where the final site deploys. **Rule 1 still stands** — `main` auto-deploys to
`cardping.rankkking.com`, a live commercial URL.

None of this changes what you do now. Keep building on `dev/homepage`.

---

**Reference:** `docs/BLOG.md` (read first) · [`1MrHad1/rizely-cms`](https://github.com/1MrHad1/rizely-cms)
(ask Ankush for access).
