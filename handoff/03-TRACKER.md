# 3 — Tracker: what is done, what is not

_Baseline taken 26 Oct 2026 against `rizely-platform.netlify.app` (deploy `6ad27a47`) and branch
`rizely-v3-platform` @ `dbcb344`._

**You own this file.** Add what you find, tick what you finish, and push it with the work.

---

## 1. Scoreboard

| | |
|---|---|
| Homepage sections planned | **16** |
| Homepage sections built | **16** — the structure is complete |
| Supporting pages built | 6 of 6 (`/agents`, `/connect`, `/blogs`, `/privacy`, `/terms`, + home) |
| Banned-claim scan on the preview | **clean** — zero hits |
| Open work items | **13** (4 P0, 6 P1, 3 P2) |
| Decisions waiting on Ankush | **4** |
| Live on rizely.net | **No** — rizely.net still serves the old page |

**Read that honestly: the build is not the problem. The page is finished and the story is
right.** What is left is polish you can see, proof we do not have yet, and a handful of
decisions. Your job is mostly §3 and §4, not a rebuild from zero.

---

## 2. Section-by-section

Legend: ✅ built and good · ◐ built, needs work · ✗ missing

| # | Section | Component | State | Note |
|---|---|---|---|---|
| 1 | Hero — three layers | `hero.tsx` + `hero-particles.tsx` | ◐ | Copy and CTAs right. **Animation does not read on mobile — W-01.** |
| 2 | The three layers | `three-layers.tsx` | ◐ | Card / profile / agent, one panel each. Reveal stagger — W-05. |
| 3 | Partners | `partners.tsx` | ✅ | "Plugs into the tools you already use", Claude included. |
| 4 | How it works | `how-it-works.tsx` | ✅ | Snap it → Rizely files it → It follows up. Strong. |
| 5 | Chat demo | `chat-demo.tsx` | ✅ | WhatsApp + Telegram phones with a real card. The best thing on the page. |
| 6 | The card, up close | `the-card.tsx` | ✅ | ₹599, pack ladder, free shipping over ₹999. All CTAs → shop. |
| 7 | Card buyer → agent bridge | `card-to-agent.tsx` | ✅ | The commercial point of the page. Short, honest. |
| 8 | Platform / micro-agents | `agents-orbit.tsx` | ◐ | Orbit renders; one agent live, rest labelled roadmap. Reveal stagger — W-05. |
| 9 | Connect (MCP) | `connect.tsx` | ✅ | "Run your pipeline from inside Claude." Links to `/connect`. |
| 10 | Where this is going | `vision.tsx` | ✅ | Acquisition → Management → Agentic, each labelled live vs on-the-way. |
| 11 | Why Rizely | `why-rizely.tsx` | ✅ | Carries the one sanctioned positioning line, correctly worded. |
| 12 | Proof | `proof.tsx` | ◐ | "Without Rizely / With Rizely" narrative. **No real numbers exist yet — W-04.** |
| 13 | Personas | `personas.tsx` | ✅ | Walk the floor vs run the booth. |
| 14 | Pricing | `pricing.tsx` + `currency-toggle.tsx` | ◐ | Geo ₹/$ switching works on the preview. Figures are `[PRICING PROPOSED]` and **conflict with the live site — D-1.** |
| 15 | FAQ | `faq.tsx` | ✅ | Native `<details>`, so it is in the server HTML. |
| 16 | Footer | `footer.tsx` | ✅ | Shop, agents, connect, legal. |

---

## 3. Open work items

### P0 — these block the go-live

**W-01 · The hero animation does not read at 375px.**
The canvas is present and correctly sized on mobile (375 × 942, `display:block`, `opacity:1`),
but nothing legible appears — no card shape, no agent shape, no contact moment. On desktop the
particles are visible but still read as scattered dots rather than two silhouettes meeting.
This animation exists to dramatise the one moment the whole pitch turns on — physical meeting
AI — and on a phone it currently does nothing at all.
*Done when:* at 375px a visitor sees the card form, the agent form, and the two meet. 60fps on
a mid-range Android. `prefers-reduced-motion` still renders the settled frame with no loop
started. Logic is in `lib/hero-anim.ts` (scale factor at line 385, narrow branch at line 60).

**W-02 · The page is far too long on a phone.**
Measured: **23,382px on mobile** — about 29 screen-heights — against 14,492px on desktop. The
mobile layout stacks every multi-column section and adds heavy vertical padding between them,
so there are long stretches of empty dark screen between ideas.
*Done when:* mobile height is meaningfully down (target under ~16,000px) without cutting a
section — tighter section padding, denser stacked cards, and the long sections collapsed or
made horizontally scrollable on small screens.

**W-03 · Reveal animation leaves columns blank at normal scroll speed.**
Multi-column sections stagger in on `whileInView`. At an ordinary scroll pace, columns 2 and 3
are still invisible when the heading is already at the top of the viewport — so the page looks
half-built. Reproducible on "The three layers", "How it works", the agents orbit and the vision
section.
*Done when:* a normal scroll never shows a section with its heading painted and its content
blank. Shorten the stagger, raise the `whileInView` margin, or drop the stagger on mobile.

**W-04 · There is no real proof on the page.**
The Proof section is a narrative. We have no event-level numbers, no event logos and no real
customer quotes to put there. Everything in `[PLACEHOLDER]` form stays that way until Ankush
supplies real ones.
*Done when:* either real event-level proof lands and goes in, or the section is reworked so it
does not look like a slot waiting to be filled. **Ask Ankush first — do not invent a number.**

### P1

**W-05 · `/hero-anim` is publicly reachable and not excluded.**
It returns 200, and `robots.txt` disallows only `/lab`, not `/hero-anim`. It is a prototype page.
*Done when:* it is deleted, or disallowed in `robots.txt` *and* carries a noindex, and neither
prototype page is in `sitemap.xml`.

**W-06 · The blog builds empty on the preview.**
`/blogs` renders with zero posts because `STRAPI_URL` is not set on the `rizely-platform`
project. It fails soft, so nothing errors. Expected on the preview — but `/blogs` is in the
sitemap, so this must not reach rizely.net.
*Done when:* confirmed that whichever project builds for go-live has `STRAPI_URL` set, and
`/blogs` renders posts there.

**W-07 · Verify the "3-day follow-up campaigns" claim before it ships.**
It appears on the page as a feature chip. Three of our own sources describe the follow-up
behaviour three different ways. We should not publish a specific cadence we have not confirmed.
*Done when:* Ankush or Tarun confirms exactly what the agent sends and over what period, and
the chip matches it — or the chip loses the number.

**W-08 · Confirm Telegram's status wording.**
Mission control calls the Telegram bot live but mid-migration. The page implies both channels
work the same way. If Telegram is not fully there, the page has to say so.
*Done when:* the wording matches reality, checked with Tarun.

**W-09 · Edge function has to survive every deploy.**
Geo pricing depends on `netlify/edge-functions/geo-currency.ts` being in the deploy. If it is
dropped, India silently sees dollars and nothing errors.
*Done when:* it is in the preflight checklist (§5) and checked after every deploy.

**W-10 · The preview's sitemap advertises production URLs.**
`sitemap.xml` on the preview lists `https://rizely.net/...`. Correct for the canonical, wrong
for a preview that we do not want indexed under those URLs.
*Done when:* the preview is noindexed at the host level, or the sitemap is host-aware.

### P2

**W-11 · Desktop hero particles read as scattered dots.** Even where they render, the
silhouettes are not legible as a card and an agent. Secondary to W-01 but the same fix.

**W-12 · Delete `NEXT-SESSION-PROMPT.md` from the repo root.** It is stale, contradicts this
handoff, and repeats banned claims as approved copy. It will mislead the next person.

**W-13 · The `[PRICING PROPOSED]` markers.** They are correct to have today. They have to come
off before go-live, which means D-1 has to be answered first.

---

## 4. Decisions only Ankush can make

| ID | Decision | Why it is blocking |
|---|---|---|
| **D-1** | **Solo price: ₹3,499/yr or ₹4,788/yr?** | This repo says ₹3,499. Live rizely.net says ₹399/mo billed annually = ₹4,788/yr. We are publicly disagreeing with ourselves. Blocks W-13 and the whole pricing section. |
| **D-2** | **Hero CTA order** — *Start free on WhatsApp* first, or *Get your card — ₹599* first? | Currently the free agent trial leads, because the profit is in the agent and a free trial converts a stranger more cheaply. The counter-case is real: the card is what ads already point at, and a paid order is a far stronger intent signal. **One-line swap in `components/hero.tsx`.** |
| **D-3** | **Wire the preview to git?** | Linking `rizely-platform` → this repo @ `dev/homepage` means Dev's push builds the preview, with no Netlify credentials handed out. Needs Ankush's go because it changes how an already-deployed project builds. |
| **D-4** | **Real proof** — what event-level numbers may we publish? | Blocks W-04. Nothing goes on the page without this. |

Two things already decided, so you do not need to re-open them:

- **Hero LCP** — Option B shipped. The H1 paints immediately and only the particles animate.
  The 2.0–2.6s headline reveal was dropped on purpose; see the comment at `components/hero.tsx:13`.
- **The card does not sell on-page.** Every card CTA goes to `shop.rizely.net`. No checkout,
  no cart, no second price table to keep in sync.

---

## 5. The gate before anything goes live

Every one of these passes on the preview before the merge to `main` is even discussed.

- [ ] **Banned-claim scan over the built `out/` is zero.** Grep for: `first` · `99.2` · `99%` ·
      `10,247` · `847` · `100% followed` · `6 hours` · `9 days` · `73%` · `₹12L` · `was 27%` ·
      `Ananya` · `Rohan Malhotra` · `Karthik Reddy` · `/mo` · `/month`. The only permitted hit is
      the one sanctioned "only" compound.
- [ ] **Geo pricing matrix.** Forced `inr` shows ₹ and the GST line; forced `usd` shows $ and no
      GST line; the toggle works both ways and survives a reload; no layout shift on switch;
      JSON-LD `offers` carries INR only.
- [ ] **The edge function is in the deploy**, not just in the repo (W-09).
- [ ] **No CTA anywhere resolves to `profile.rizely.net`.** Every card CTA resolves to
      `shop.rizely.net`.
- [ ] **Animation.** 60fps desktop and mobile; `prefers-reduced-motion` renders the settled frame
      with no rAF loop started; canvas is `aria-hidden`; no console errors; the H1 is in the DOM
      for a crawler regardless of animation state.
- [ ] **Content is in the server-rendered HTML.** No JS-only content — that is why the FAQ uses
      native `<details>`. Check with JS disabled.
- [ ] **375px and desktop both clean.** No horizontal scroll, no overlap, no blank columns (W-03).
- [ ] **`/blogs` renders posts** on whichever project is going live (W-06).
- [ ] **Prototype pages are gone or excluded** (W-05).
- [ ] **`[PRICING PROPOSED]` markers resolved** — needs D-1.

---

## 6. Related, but not your job

Listed so you recognise them and do not try to fix them:

- **rizely.net's fabricated testimonials and invented stats** are live right now. Fixing them is
  a separate job that should probably not wait for this rebuild. Ankush owns it.
- **`profile.rizely.net`** is broken and being fixed separately by Aryan. 48 fixes are written.
- **The shop's "no subscription, no app" line** sells against the agent we then have to sell.
  Separate job.
- **The Shopify pack ladder** — pack-of-5 undercuts pack-of-10 (₹509 vs ₹549 a card). Not a
  website fix.
