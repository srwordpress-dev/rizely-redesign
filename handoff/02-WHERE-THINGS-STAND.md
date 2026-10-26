# 2 — Where the website actually stands

There are **three different Rizely homepages alive right now**. Knowing which is which is the
single most important thing on this page, because one of them is the public commercial site and
one push can change it.

---

## 1. The three versions

| | What it is | URL | State |
|---|---|---|---|
| **A — Live** | What the world sees today | **rizely.net** | An **old** version. Hero is "Scan the card. Send the follow-up." Monthly pricing. Invented stats. Three **fabricated testimonials**. No card, no profile, no platform, no MCP story. |
| **B — Preview** | The v4 rebuild, deployed | **rizely-platform.netlify.app** | All 16 planned sections built. Correct three-layer story, geo pricing, no banned claims. **This is your working target.** |
| **C — Repo** | The source of B | branch `rizely-v3-platform` | 6 commits ahead of `main`, 0 behind. Contains everything on `main` plus the v4 work. |

So: **B is better than A in every way, and A is what customers see.** Going live means merging
C into `main`, which is a decision Ankush makes — see §4.

---

## 2. The deployment map — read this twice

Two Netlify projects, same team, both Pro.

| Netlify project | Serves | Site ID | How it deploys |
|---|---|---|---|
| **`cardping`** ⚠️ | **rizely.net — the live site** | `766654de-5527-490d-be7f-3e81bfde854f` | **Git-connected to `agag13/cardping-website` @ `main`.** Also rebuilds on a `strapi-publish` hook whenever a blog post is published. |
| **`rizely-platform`** | rizely-platform.netlify.app — the preview | `92e3fb0b-ca61-489a-85f7-f67faca7059a` | Manual CLI upload today. *(Being changed — see §3.)* |

### What that means, bluntly

> **Any push to `origin/main` publishes to rizely.net.** There is no staging in between and no
> approval step. The rule is not "do not click deploy" — it is **never push to `main`**.

Branch protection is not available on this repo's plan, so nothing in GitHub will stop you. The
only thing stopping you is this paragraph.

**Equally: never run a bare `netlify deploy`.** The repo was once linked to the *production*
project, so a bare deploy would have gone to rizely.net. Always pass `--site` explicitly.

---

## 3. Your branch and how your work reaches the preview

Work on **`dev/homepage`**, which is cut from `rizely-v3-platform`.

```bash
git clone https://github.com/agag13/cardping-website.git
cd cardping-website
git checkout dev/homepage
npm install
npm run dev          # http://localhost:3000
```

Node 22. Next.js 16 (App Router, **static export** — `output: "export"`), React 19,
TypeScript, Tailwind CSS 4, shadcn/Radix, framer-motion, lucide.

> ⏳ **Pending Ankush's go:** linking the `rizely-platform` Netlify project to this repo @
> `dev/homepage`, so that **your push builds the preview automatically** and you never need
> Netlify credentials at all. Until that is switched on, push your branch and ask for a preview
> deploy — Ankush or Claude runs it. Do not try to deploy it yourself.

When it is wired, the build settings are: build command `npm run build`, publish directory
`out`, branch `dev/homepage`.

### The one deploy trap worth knowing

Geo pricing uses a **Netlify Edge Function** at `netlify/edge-functions/geo-currency.ts`. Edge
functions are **not** part of a plain `out/` folder upload — a deploy must carry
`netlify/edge-functions/` and `netlify.toml`, which means deploying from the repo root, not
drag-and-dropping `out/`. If a deploy drops it the failure is silent and the symptom is
**"India sees dollars"**. Check `<html data-currency>` on every preview deploy.

---

## 4. Going live is a merge, not an upload

Because `cardping` builds from `main`:

**Going live = merging `dev/homepage` → `rizely-v3-platform` → `main`.** That merge *is* the
publish. Netlify builds `main` and rizely.net changes the moment it lands.

Consequences:

- It happens **once, deliberately, on Ankush's explicit word**, after the checks in
  `03-TRACKER.md` §5 pass on the preview.
- There is no partial release. The merge publishes *everything* sitting on the branch, so the
  branch has to be release-ready at all times — not just the bit under review.
- The `strapi-publish` hook also rebuilds `main`, so after a merge, publishing any blog post
  re-ships whatever `main` holds.
- Before that merge, `STRAPI_URL` must be set in the Netlify environment of whichever project is
  building, or **the blog builds empty** — it fails soft rather than erroring. The preview has
  no `STRAPI_URL` today, which is why `/blogs` shows zero posts there. That is expected on the
  preview; it would not be acceptable on rizely.net.

**You do not run this merge.** Ankush does.

---

## 5. How the page is put together

`app/page.tsx` composes the homepage from 16 components, in this order:

```
Hero · ThreeLayers · Partners · HowItWorks · ChatDemo · TheCard · CardToAgent
AgentsOrbit · Connect · Vision · WhyRizely · Proof · Personas · Pricing · Faq · Footer
```

Other pages: `/agents`, `/connect`, `/blogs` (Strapi-backed), `/privacy`, `/terms`, plus two
prototype pages — `/lab` and `/hero-anim` — that are **not meant to be public** (see tracker
item W-12).

Content that changes often lives in **`lib/site.ts`** — brand, canonical URL, the WhatsApp
number and message, the shop URL. Edit there, not in components.

The hero animation is a single `<canvas>` with no library: ~1,100 particles on desktop, ~500
under 768px, sampled from shapes drawn programmatically. Logic in `lib/hero-anim.ts`, component
in `components/hero-particles.tsx`.

---

## 6. Two files in this repo that will mislead you

- **`NEXT-SESSION-PROMPT.md`** (repo root) is **stale**. It describes the v3 build, says the
  font is Geist (it is Inter + Plus Jakarta Sans), says the code is "not yet on GitHub", and
  repeats several of the banned stats as if they were approved copy. **Ignore it.** This
  `handoff/` folder supersedes it.
- **`workstreams/08-website/GAP-ANALYSIS-rizely-web.md`** in the mission-control repo has a
  correction banner at the top for the same reason — its deployment facts were wrong and
  dangerous. §2 above is the corrected version.
