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
| Open work items | **32** (8 P0, 14 P1, 10 P2) — 13 from the baseline, 19 added by Dev (26–27 Oct). Fixed in code, 27 Oct: W-01 (awaiting a real-phone check), W-14, W-31; partly fixed: W-15, W-20, W-22, W-32 |
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
| 3 | Partners | `partners.tsx` | ✅ | "Works where you already are": only real channels, ChatGPT marked `next`. |
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

> **Fixed in code, 27 Oct — needs a check on a real phone once it is on the preview.**
> *Cause:* at 375px the text column fills the full width and almost the full height, so the
> card and agent formed directly behind the subhead, where `safeFor` dimmed them by 86%. They
> were there, just invisible. Tuning could not fix that: there was no clear air to play in.
> *Fix (option chosen by Dev):* below 768px the animation plays in its own 170px band above
> the badge (`NARROW_STAGE` in `lib/hero-anim.ts`; `components/hero.tsx` reserves the space
> with a container query, so CSS and canvas switch at the same width). In the band: denser
> sampling, no rising-arc trail (it read as noise), smaller staggered follow-up bubbles.
> Desktop (≥768px) is unchanged.
> *Measured on a production build:* card forms → meets the agent with the ripple → card ·
> profile · agent + three follow-ups, legible at 320 / 375 / 414 / 767. Reduced motion draws
> the settled frame, zero rAF calls; canvas still `aria-hidden`. With the CPU throttled 6×:
> 62–71fps, p95 frame 21ms (the throttle approximates a mid-range Android, it is not one).
> *Cost:* the H1 moves down ~98px on phones; page height 23,382 → 23,480px (W-02).

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
> **Fixed in code, 27 Oct: the number is gone.** The chip is now "Follow-ups you approve first",
> and the demo no longer says "3 days" anywhere. Once Tarun confirms the real cadence, it can
> come back as a fact.

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
*Note, 27 Oct:* on a production build at 1440px the card and agent read clearly at 1.6s and
settle cleanly. Dev-mode hydration can lag by seconds, and screenshots timed from page load then
catch the scatter phase, which may be what this was. Re-check on the preview before working it.
What does reproduce at 1440 is W-25, and at 768px the shapes still sit behind the subhead.

**W-12 · Delete `NEXT-SESSION-PROMPT.md` from the repo root.** It is stale, contradicts this
handoff, and repeats banned claims as approved copy. It will mislead the next person.

**W-13 · The `[PRICING PROPOSED]` markers.** They are correct to have today. They have to come
off before go-live, which means D-1 has to be answered first.

---

### Dev's audit pass — 26 Oct 2026

_Walked `rizely-platform.netlify.app` at 1440px and 375px, plus rizely.net and shop.rizely.net,
and scanned a local `npm run build` of `dev/homepage` @ `1e36e7f`. Not yet tested: the WhatsApp
agent itself. Nothing below is fixed yet — list first, as asked._

Re-measured while I was there: mobile height is now **23,706px** (desktop 13,665px). W-01 and
W-03 both reproduce: at 375px the hero canvas shows nothing at all, and "How it works" sits with
its heading painted and all three steps near-invisible at a normal scroll pace.

#### P0

**W-14 · The chat demo shows real people's business cards.**
`public/chat-wa.jpg` and `public/chat-tg.jpg` are photos of what look like two real visiting
cards, and the "Card read" bubbles in `components/chat-demo.tsx` (and
`components/scan-lead.tsx`, plus `demo-src/`) spell out each person's full name, company, role,
email and mobile number. That breaks rule 4 of the handoff ("no real customer data on a public
page"). One of the two is also on live rizely.net today, in the "Universal scanner" block. I have
not copied the details anywhere.
*Done when:* both images and both data blocks are replaced with a mocked card whose details are
obviously fake (an `example.com` email, a dummy number), or Ankush confirms in writing that both
people agreed. The live rizely.net copy is Ankush's call (§6).

> **Fixed in code, 27 Oct.** Both cards are now made up: Meera Desai / Desai Spice Traders
> (bilingual, so the "Hindi + English" tag is true) and Arjun Mehta / Mehta Furnishings (tag now
> "English"), with `example.com` emails and `+91 90000` numbers. The event names were also real
> (one is a real Hong Kong conference), so they became "Trade Fair 2026" and "Home Expo 2026".
> The swap covers both photos, `chat-demo.tsx`, `scan-lead.tsx` (including its embedded image) and
> both `demo-src` sources. **Still open:** the old photos remain in git history, and live
> rizely.net still shows one of them.

**W-15 · The card facts on the page do not match the shop.**
The page says: 102 designs, "PVC, not metal", packs of 5 / 25 / 100 at ₹509 / ₹499 / ₹399 a card,
free shipping over ₹999. The shop today sells **three products** — PVC ₹599, Customised PVC ₹699,
and a **Metal card at ₹1,999** in four colours — with packs of 3 / 5 / 10 only (PVC pack of 10 =
₹509 a card; there is no ₹399 tier), "free shipping across India", and "our team contacts you for
your logo… you approve the design before print" rather than pick-one-of-102. `01` §2 also says
"PVC only — there is no metal card", and `public/llms.txt` repeats it. Touches `the-card.tsx`,
`three-layers.tsx`, the card tile in `pricing.tsx`, `llms.txt`, and `01` §2.
*Done when:* Ankush says which is true, and every price, pack and material on the page matches
the shop line for line.

> **Packs fixed in code, 27 Oct.** `the-card.tsx` now shows the store's PVC packs exactly:
> 1 / 3 / 5 / 10 at ₹599 / ₹1,707 / ₹2,695 / ₹5,091 (checked against `/products.json` that day),
> plus "Ordering more than 10? Ask us on WhatsApp". `pricing.tsx` now says "down to ₹509 a
> card". The page no longer denies metal: "PVC, not metal" became "Light, durable PVC", and
> `llms.txt` dropped "there is no metal or wooden card". **Ankush to decide:** keep or remove
> the ₹1,999 metal card on the shop (and then fix `01` §2's "PVC only"). **Still open:** 102
> designs vs the custom-design flow, the shipping line, and the "₹399/card at 100" line in `01` §2.

**W-31 · The social share image carried the banned stats.** `app/opengraph-image.png`, which
every share of the homepage shows, read "Scan the card. Send the follow-up. Automatically.",
"India-first", and the `01` §6 strip "6 hours → 2 seconds · 9 days → 60 seconds · 73% → 100%".
It was a hand-made PNG with no source, so it outlived the copy it came from.
> **Fixed in code, 27 Oct.** It is now rendered from `scripts/og/og.html` (the hero headline,
> no numbers) by `scripts/og/render.mjs`. Edit the HTML and re-render; never hand-edit the PNG.
> Check the preview with a link-preview tool once it is deployed, since platforms cache it.

**W-32 · The legal pages are not ready to launch.** `/privacy` and `/terms` both show "Draft for
review… have it reviewed by legal counsel" (`components/legal-layout.tsx:25`), and that banner
should stay until counsel signs off. What they are missing needs facts only Ankush has:
- the legal entity's name and registered address, and a support email (today the only contact
  is the WhatsApp number);
- a named grievance contact for India's DPDP Act;
- a refund and cancellation policy for annual plans and the Event Pass;
- coverage of the card and shop orders, `app.rizely.net`, the Android app, and Connect on
  Claude (contact data passing to Anthropic), plus any cross-border transfer to AI providers;
- a liability cap that makes sense for annual and one-off plans (today "the three months
  before the claim", `terms:78`), and a city or seat for "laws of India".

27 Oct, fixed in code: Terms no longer says "a free tier is available" (it now says the first 50
scans are free, then a paid plan or Event Pass), and Privacy no longer mentions a waitlist or
form providers.
*Done when:* Ankush supplies the facts above, counsel reviews both pages, and the Draft banner
comes off.

#### P1

**W-16 · The personas section hard-codes dollars.** `components/personas.tsx:27` and `:35` say
"$79/yr" and "$49/event" as plain strings, so an India visitor (`data-currency="inr"`) reads
dollar prices one section above the ₹ pricing table. *Done when:* both lines follow the currency
the same way `pricing.tsx` does.

**W-17 · "A whole stack from the badge queue" implies badge scanning.** In How it works and on
`/agents`. `01` §4 says visiting cards only, no badges. *Done when:* the phrase goes, or Tarun
confirms what the badge queue is and it is described without implying badge capture.
> **Fixed in code, 27 Oct.** The phrase is deleted in both places, with nothing in its place:
> sending several cards at once is not confirmed either. If Tarun describes a real batch
> feature, add it back in his words.

**W-18 · The page contradicts itself on whether follow-ups need approval.** How it works: "You
approve the first batch". Chat demo, same page: "A personalised campaign runs automatically over
the next 3 days". *Done when:* both say the same approve-first story. Fold into W-07.
> **Fixed in code, 27 Oct (with W-07).** Every place that said the follow-up "sends" or "goes
> out" automatically now says it is drafted for you to approve: hero, Three layers, the orbit,
> `/agents`, Personas, the site description and the JSON-LD. The chat demo's step 5, bubbles,
> banner and chip now say "Follow-up drafted" and "Waiting for your approval", and its message
> no longer promises "the deck I mentioned". The FAQ and How it works already had it right.

**W-19 · ChatGPT's status is stated three ways.** Connect says "live on Claude today; ChatGPT is
next", then a paragraph later "ChatGPT works through custom connectors on paid plans", and the
Partners strip lists ChatGPT beside live tools. *Done when:* one status, everywhere, labelled
live or roadmap.

**W-20 · The CRM wording overreaches.** Partners: "Your CRM". Connect: "Export to a sheet or
CRM". Team plan: "Sheets & CRM export". `01` §4: no sync to any external CRM. *Done when:* it
says exactly what happens (an export to a file or Sheet?), confirmed with Tarun.
> **Partners fixed in code, 27 Oct.** The strip is now "Works where you already are":
> WhatsApp · Telegram · Claude · CSV export · ChatGPT (`next`). Gmail and "Your CRM" are gone
> (neither integration exists), and the Sheets logo became "CSV export", which is what the
> `export_contacts` tool returns.
> **Connect and pricing fixed in code, 27 Oct.** Checked against the tool schemas: the export is
> "Export to CSV" (the whole contact list, up to 500 rows, no CRM push) on `/connect` and the
> homepage, and the Team plan says "CSV export". The same pass removed "87 cards at one event"
> and the per-event "recap" (no tool returns one; it is now "pull every lead from one event",
> also in the meta, FAQ, JSON-LD and Personas), "enriches it, no scan charge", "Every action is
> attributed" and the real event name "Blockchain Week". The search filters (event, tag,
> channel, date) are real and stayed.

**W-21 · Three different language claims.** Hero: "many languages". Why Rizely: "Hindi, Gujarati,
Marathi and plenty more". Footer: the three. *Done when:* one confirmed list (Tarun), used
everywhere.

**W-22 · Absolute claims about competitors, and the sanctioned line is reworded.** Why Rizely
says "No CRM auto-sends a follow-up after a scan. No AI sales tool ingests a card." — absolute
market claims, the same exposure class as "first". The allowed line also reads "We're the only
**one** that does…" instead of the exact "the only **tool** that does…". *Done when:* the two
absolutes are softened or dropped, and the sanctioned compound is word-for-word from `01` §6.
> **Fixed in code, 27 Oct.** "No AI sales tool ingests a card" is gone (it was false: GRID AI,
> Getgabs, Querygen and Karo all do). "No CRM auto-sends a follow-up after a scan" stays, since
> `01` §6 lists it as defensible. Card 1 now reads "…and most scanners stop once the contact is
> saved. Rizely reads the card and drafts the follow-up in one step." The intro says "the only
> **tool** that…" word for word. **Still open (Medium):** the H2 "Most tools stop at the scan"
> and "most scanners admit… 'work best with English'", which is sourced to Karo alone.

**W-23 · Sales CTAs open the bot with the wrong message.** "Kitting out a team? Ask us", "Get an
Event Pass" and "Ask about the Event Pass" all open `wa.me/918373978881` pre-filled with "I'd like
to try Rizely on the cards from my last event". A buyer asking about 20 cards lands in a
card-scanning bot. *Done when:* each has its own pre-filled message (in `lib/site.ts`), and
someone confirms who answers it.

#### P2

**W-24 · "No card" is ambiguous on a site that sells a card.** "First 50 scans on us — no card,
no app" (hero and pricing) means no payment card. Use "no payment details".

**W-25 · Desktop hero particles run behind the subhead and the trust line.** Dots cross body
text at 1440px. Part of the W-01/W-11 fix: keep a clear zone behind the copy.

**W-26 · Partners strip icons sit on a slight diagonal.** At 1440px each logo is a few px lower
than the last (WhatsApp → Your CRM). Probably the reveal offset not settling.

**W-27 · Roadmap agents are labelled "Coming soon".** Keeper and Reviews. `01` §5 says *roadmap*,
and "coming soon" reads like a date we have not promised.
> **Fixed in code, 27 Oct.** Keeper and Reviews are "On the roadmap" on the homepage and
> `/agents`, and the `soon` status is gone. The orbit chips only carry a dot, so a Live / On the
> roadmap legend now sits under the orbit, with screen-reader labels on each chip. The orbit
> heading no longer says the agents "do the work", Vision's three "On the way:" lines say
> "Roadmap:", the `/agents` intro no longer offers calls and reviews as things to switch on,
> and the Exploring card dropped broadcasts, the marketplace and the "date attached" promise.

**W-28 · The §5 grep list is noisy.** On a clean build `847` hits six times inside `_next` chunk
hashes and `first` hits 31 harmless uses ("approve the first batch"). Use word boundaries, skip
`_next/`, and record the expected hits so a real one stands out.

**W-29 · Handoff cross-references that are wrong.** `02` §5 points prototype pages at W-12 (it is
W-05). §2 rows 2 and 8 above point the reveal stagger at W-05 (it is W-03). W-05 is half done
already — both prototype pages carry `noindex` and neither is in the sitemap; only `robots.txt`
is missing `/hero-anim`. §6's pack-ladder note (₹509 vs ₹549) no longer matches the shop (W-15).

**W-30 · The navbar's WhatsApp CTA is clipped at tablet widths.** Found 27 Oct while checking
W-01. `components/navbar.tsx` switches to the full desktop nav at `sm` (640px), but six links
plus the CTA do not fit until roughly 900px. At 767 and 768px "Start free on WhatsApp" is cut
off at the right edge. *Done when:* nothing in the nav is clipped at any width from 640 to
1024px. Either keep the hamburger up to `lg`, or tighten the link spacing.

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
  website fix. *(Stale as of 26 Oct — see W-15.)*
- **The shop's contact links** go to a different WhatsApp number from the agent's and to a
  personal Telegram handle, and its header links to `profile.rizely.net` login and register.
  Added by Dev, 26 Oct.
