# Rizely site — handover

Everything needed to run, deploy and hand off this site. Written September 2026,
after the CardPing → Rizely rebrand and the addition of the Strapi blog.

## What this is

The Rizely marketing site: a Next.js 16 App Router project built as a **static
export** (`output: "export"`) and served from Netlify. Rizely is a WhatsApp- and
Telegram-native AI agent that scans business cards collected at events, turns
each into a managed lead, and sends the follow-up automatically.

| | |
|---|---|
| Site repo | [`agag13/cardping-website`](https://github.com/agag13/cardping-website) — still named for the pre-rebrand product |
| CMS repo | [`1MrHad1/rizely-cms`](https://github.com/1MrHad1/rizely-cms) |
| Netlify project | `cardping` (site id `766654de-5527-490d-be7f-3e81bfde854f`) |
| Live domain | `cardping.rankkking.com` — **rizely.net cutover is pending, see below** |
| Netlify subdomain | `cardping.netlify.app` |
| Stack | Next.js 16, React 19, TypeScript, Tailwind 4, Radix, framer-motion |

The repo, the Netlify project and the Netlify subdomain all still say
"cardping". Only the naming is stale; nothing depends on it. Renaming the repo
needs admin on `agag13`.

## Running it locally

```bash
npm install
cp .env.example .env.local     # point STRAPI_URL at your Strapi
npm run dev                    # http://localhost:3000
npm run build                  # static export into out/
```

For the blog to have content locally, run rizely-cms alongside it
(`npm run develop` in that repo, then `node scripts/seed-sample.js` for a sample
post). Without it the site builds fine and the blog is empty — see
[docs/BLOG.md](BLOG.md).

`npm run lint` is **broken**: the script calls `next lint`, removed in Next 16,
and the ESLint config is still the legacy `.eslintrc.json` that ESLint 9 will
not read. Pre-existing. `npx tsc --noEmit` works and the build runs TypeScript.

## Deploying

**Merging to `main` does not deploy.** The GitHub → Netlify webhook is not
firing for this repo, even though the integration is still configured
(`allowed_branches: ["main"]`, and deploys before 29 Aug 2026 do carry commit
refs, so it worked once). A merge on 9 Sep 2026 produced no build after seven
minutes. **Reconnecting that webhook in Netlify's UI is an open task.**

Until then, deploy by hand — merge first so `main` matches what ships:

```bash
npm run build
npx netlify-cli deploy --prod --dir=out --site 766654de-5527-490d-be7f-3e81bfde854f
```

Drop `--prod` for a draft deploy on an unlisted URL, which is the safe way to
show work: PRs get no deploy preview here, for the same reason.

Rolling back needs no rebuild: Netlify → Deploys → pick an earlier one →
Publish deploy.

## The rizely.net cutover (pending)

Currently live on `cardping.rankkking.com`. `rizely.net` is on **Cloudflare** DNS
and, as of this writing, still serves a different WordPress site ("Rizely:
Transforming CRM in the Web3 Era"), which has been backed up.

Prepared already: `rizely.net` and `www.rizely.net` are added to the Netlify
project as **domain aliases**. The primary is deliberately still
`cardping.rankkking.com` — making rizely.net primary before DNS resolves would
redirect the live site to a domain that is not serving and take production down.

Remaining steps, in this order:

1. **Cloudflare** — point `rizely.net` at Netlify. Either switch the zone to
   Netlify DNS, or keep Cloudflare DNS and set:
   - `rizely.net` → `CNAME` (or ALIAS/flattened) → `cardping.netlify.app`
   - `www.rizely.net` → `CNAME` → `cardping.netlify.app`

   Set the records to **DNS only** (grey cloud), not proxied. Cloudflare's proxy
   in front of Netlify's own CDN and TLS causes redirect loops and blocks
   Netlify's certificate issuance.
2. Wait for Netlify to verify the domain and issue the certificate.
3. Confirm `https://rizely.net` serves the site.
4. **Then** make `rizely.net` the primary domain in Netlify, which makes
   `cardping.rankkking.com` and `cardping.netlify.app` redirect to it.
5. Change `SITE_URL` in [`lib/site.ts`](../lib/site.ts) to `https://rizely.net`,
   and the absolute URLs in `public/robots.txt` and `public/llms.txt`. Rebuild
   and deploy. (`sitemap.xml` is generated from `SITE_URL`, so it follows.)

Step 5 must come **after** step 3, not before: pointing canonicals at a domain
that is not yet serving is worse than leaving them briefly stale.

## Open issues

1. **The GitHub → Netlify build webhook is not firing.** See Deploying. Highest
   priority — it also means blog publishes will not trigger builds until fixed
   or until the Strapi build hook is wired (that hook is inbound, so it works
   independently).
2. **Canonical mismatch and duplicate content.** `cardping.rankkking.com` and
   `cardping.netlify.app` both return 200 with no redirect between them, and
   both canonicalise to the netlify.app subdomain — so the primary domain
   self-canonicalises to a different host. The rizely.net cutover (step 4) fixes
   this by making everything redirect to one host.
3. **Favicon resolution.** `app/icon.png` is only 53×53, the largest the source
   artwork provides. Fine in a browser tab, too small for a crisp
   `apple-icon`/PWA icon. Needs a vector or ≥512px master from the brand files.
4. **`npm run lint` is broken.** See Running it locally.
5. **`components/theme-switcher.tsx` is dead code.** The site is hard-forced to
   dark (`forcedTheme="dark"` in [`app/providers.tsx`](../app/providers.tsx)) and
   nothing renders the switcher.

## Things not to break

- **The demo components are generated.** `components/chat-demo.tsx`,
  `scan-lead.tsx` and `walkthrough.tsx` carry an
  `AUTO-GENERATED — do not edit by hand` header. Edit `demo-src/*.src.html` and
  run `node demo-src/build-demos.js`. Editing the components directly is
  silently overwritten on the next regeneration.
- **Product schema stays on the homepage.** See the SEO section of
  [docs/BLOG.md](BLOG.md) for why `SoftwareApplication` and the homepage
  `FAQPage` must not move back into the root layout.
- **Content must be in the server-rendered HTML.** An earlier audit fixed
  JS-only content: that is why the FAQ uses native `<details>`, the stats are
  static text, the hero is not opacity-gated, and there is a `<noscript>`
  fallback. Keep new sections SSR-safe and reduced-motion aware
  (`MotionConfig reducedMotion="user"` is on).
- **Nav anchors are absolute** (`/#pricing`, not `#pricing`). The navbar and
  footer render on `/blogs` and `/privacy` too, where a bare hash goes nowhere.
- **One accent only.** The palette is terracotta `#C2703F`
  (`--primary`, `oklch(0.63 0.12 47)`), glow `--light` `#d1743f`. The Rizely logo
  artwork was purple and has been recoloured to match — see
  [`components/logo.tsx`](../components/logo.tsx). There is no purple anywhere
  and the design system's "no purple" rule still holds.
- **Honest copy.** No "India's first", no accuracy percentages, no naming dead
  competitors. It is an "AI agent", not a "service". The one permitted
  superiority claim is the compound: captures the card *and* sends the follow-up,
  in Indian languages, priced per event. Fuller notes in
  [`NEXT-SESSION-PROMPT.md`](../NEXT-SESSION-PROMPT.md) and
  [`demo-src/HANDOFF.md`](../demo-src/HANDOFF.md).

## Where things live

```
app/
  layout.tsx            root metadata, site-wide JSON-LD, forced dark
  page.tsx              homepage + homepage-only product/FAQ JSON-LD
  sitemap.ts            generated sitemap, includes blog posts
  icon.png              favicon (the Rizely mark)
  opengraph-image.png   1200x630 social card, brand baked into pixels
  blogs/                blog listing and posts
  privacy/, terms/      legal pages
components/
  logo.tsx              the wordmark, terracotta on dark
  blog/                 blocks renderer for Strapi rich text
  chat-demo, scan-lead, walkthrough   GENERATED — see above
  ui/                   shadcn/Radix primitives
demo-src/               editable sources for the generated demos
lib/
  site.ts               BRAND, SITE_URL, WhatsApp link — edit here, not inline
  strapi.ts             blog data layer, fails soft
public/
  robots.txt, llms.txt  contain absolute URLs; update on the domain cutover
docs/                   this file and BLOG.md
```
