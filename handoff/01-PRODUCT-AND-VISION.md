# 1 — What Rizely is, and what the homepage has to say

Read this before you look at the code. Most of the weaknesses in the current page come from
telling the story in the wrong order, not from bad CSS.

---

## 1. Rizely in plain language

You go to a trade show. You hand out cards, you collect a stack back, and on Monday the stack
sits in a jacket pocket and nobody gets followed up. Rizely is three things that fix both ends
of that:

- **A card you hand over** — a PVC NFC card. They tap it, your profile opens on their phone.
  No app, nothing to type.
- **A profile they land on** — the page your card opens.
- **An agent that follows up** — you photograph the cards *you* collected, inside WhatsApp or
  Telegram, and the agent reads each one (Hindi, Gujarati and Marathi too, not just English),
  files it as a lead, and sends that person a personalised follow-up in their language.

The money is in the third one. The card is cheap and nets ₹29–151 an order; every rupee of
profit is made after the card ships. That is why the homepage has to get a card buyer to look
at the agent without being sold at.

**Never call Rizely a "service".** It is an AI agent.

---

## 2. The three layers — what is live, and what each costs

| Layer | What it is | Status | Price | Where it lives |
|---|---|---|---|---|
| **The card** | PVC NFC card, 102 designs, profile included | **Live** | ₹599 incl GST, free shipping over ₹999, packs down to ₹399/card at 100 | `shop.rizely.net` (Shopify) |
| **The profile** | The page a tap opens | **Live but broken** — see §3 | Free with every card | `profile.rizely.net` |
| **The agent** | Card → lead → automatic follow-up | **Live** on WhatsApp; Telegram shipping | First 50 scans free, then a plan | `wa.me/918373978881` |

**PVC only.** There is no metal card and no wooden card. Do not put one on the page.

### Proposed pricing — mark every figure `[PRICING PROPOSED]`

| Plan | India (ex-GST, annual) | Rest of world (annual) |
|---|---|---|
| Solo | ₹3,499 /yr | $79 /yr |
| Team | ₹11,999 /yr | $199 /yr |
| Business | ₹27,999 /yr | $499 /yr |
| Event Pass | ₹2,499 /event | $49 /event |

Three standing rules behind those numbers:

- **Annual, never monthly.** RBI e-mandates make monthly subscriptions structurally hostile in
  India — a 24-hour pre-debit notice with an opt-out before every single charge. Every Indian
  competitor is annual.
- **Quote ex-GST**, as all Indian competitors do. The GST invoice is a selling point, and it
  appears **only** in the ₹ view — it is meaningless in the $ view.
- **Charge from day one.** 50 free scans, then a paid plan. We want paying users, not signups.

> 🔴 **Known conflict, not yours to resolve.** This repo says Solo **₹3,499/yr**. Live
> rizely.net still says **₹399/mo billed annually = ₹4,788/yr**. Ankush has not settled it.
> Build with ₹3,499 and leave the `[PRICING PROPOSED]` marker on. Flag it, do not fix it.

---

## 3. The profile is a hard constraint — do not link to it

`profile.rizely.net` is a third-party script that was never configured. Today it carries a
page title reading "Rizely Vcard SaaS … Script", a support address of `hello@gmail.com`, a fake
New York office address, a Polish phone number, terms governed by the law of the Netherlands,
an About page that is entirely lorem ipsum, and a page saying "No NFC cards available for
ordering" while the shop sells 102 designs.

**So, on this website:**

- The profile is **present in the story** — named, described, shown as a layer.
- **No CTA anywhere links to it.** Not the hero, not a card, not the footer. Not one.
- Where a link would naturally belong there is a
  `{/* TODO(profile): link here once profile.rizely.net is fixed */}` marker. Leave it.
- If someone tells you the profile is fixed, **ask Ankush** before you wire a link.

---

## 4. The other surfaces, so you know what exists

`rizely.net` (this site) · `app.rizely.net` (the user dashboard and admin) · `profile.rizely.net`
· `shop.rizely.net` (Shopify) · the agents (WhatsApp + two Telegram bots + 14 MCP tools
available inside Claude) · an Android app. **There is no iOS app** — do not put an App Store
badge anywhere.

### What Rizely does NOT do

Worth knowing because people assume these, and a page that implies them is a lie:

- It does not scan badges or QR codes yet — **visiting cards only** today.
- It does not sync to Salesforce, HubSpot or any external CRM.
- It does not make calls, write reviews or post anywhere.
- It does not do bulk cold outreach. It follows up with people *you met*.
- It does not have a Mac or iOS app.
- The follow-up is **approve-first** until you turn it loose — it does not message strangers on
  its own by default.

---

## 5. The vision the page has to tell

Rizely is being built in three stages, one at a time. Each one is labelled on the page with what
actually works today:

1. **Acquisition — get the lead, with consent.** Events, business cards, review tags for local
   shops, partner channels. *Live today: event cards on WhatsApp and Telegram.*
2. **Management — a CRM that maintains itself.** One place for every lead, enriched from public
   signals, flagging who is worth your time. *Live today: managed pipeline plus web enrichment
   written back to the lead.*
3. **Agentic — agents that do the work.** Small AI agents that capture, follow up, and
   eventually carry the conversation, and that you can run from the assistant you already use.
   *Live today: the Card Agent's follow-ups, and Connect on Claude.*

Further down there is a second framing — **a platform of AI micro-agents**, with you at the
centre and each agent owning one job. One is live (the Card Agent). Keeper, Reviews and Caller
are roadmap and must be **labelled roadmap**, every time.

> **Naming trap.** "The three layers" (card / profile / agent — *what you get today*) and "the
> three stages" (Acquisition → Management → Agentic — *the roadmap*) are different things.
> Section 2 of the homepage owns the word **layers**. The vision section says **stages**. Never
> let a reader meet the same word meaning two things.

---

## 6. 🔴 Banned claims — the most important section in this folder

Research killed these. Several were in our own live ads. **Repeating one is the worst error you
can make in this repo.**

| Banned | Why |
|---|---|
| **"India's first ... WhatsApp business card scanner"** | Flatly false — GRID AI has shipped exactly this in India since June 2025, and Getgabs, Querygen and Karo all do it today. An unsubstantiated "first" in Indian advertising is a **real legal exposure**, not just a credibility problem. |
| **"99.2% accuracy"**, or any accuracy percentage | Table stakes, unsubstantiated by anyone including us, same advertising exposure. Not "99%", not "near-perfect", not "virtually every card". |
| **"10,247 cards scanned" / "847 active users"** | Vanity stats that invite a comparison we lose. Event-level proof only. |
| **"6 hours → 2 seconds" · "9 days → 60 seconds" · "73% lost → 100% followed up" · "₹12L+ pipeline saved" · "was 27%"** | Invented and unsourced. "100% followed up" is also an absolute claim about an AI system. **These are live on rizely.net today and must not come back.** |
| **Named testimonials** — "Ananya Iyer, Brightfield Labs", "Rohan Malhotra, Vaya Analytics", "Karthik Reddy, NimbusPay" | Fabricated people at fabricated companies. **Live on rizely.net today.** A hedge in small type under an invented quote is not a disclosure. No named testimonial until a real one lands. |
| **Voice notes as unique** | CamCard, Covve, KaunTech and Querygen all ship it. |
| **"1 scan = 1 coin" as a differentiator** | KaunTech does exactly this in India today. Keep the mechanic, drop it from positioning. |
| **Monthly pricing (`/mo`, `/month`)** | Against the standing annual constraint. |
| Naming CamCard, ABBYY or Microsoft Lens as comparators | ABBYY discontinued its reader, Lens was retired March 2026, Scannable was paywalled. Three dead comparators. |

**Never import copy from `knowledge/KNOWLEDGE_BASE.md` in the mission-control repo.** It is the
single biggest reservoir of these killed claims.

### The one claim you ARE allowed

Used sparingly, phrased as fact, never as a boast:

> **the only tool that does capture *and* follow-up, in Indian languages, priced per event**

That is the exact compound. Do not stretch it into "the only AI agent", "first in India", or
anything else. The defensible pieces underneath it are: nobody credibly owns Hindi/Gujarati/
Marathi card extraction, no CRM auto-sends a follow-up after a scan, and nobody anywhere sells
a per-event SKU with GST and UPI plumbing.

---

## 7. Voice and CTAs

**Voice:** a smart friend explaining something useful. Specific numbers, never vague claims.
Short paragraphs. Light humour about the real frustrations — Excel at midnight, conference
WiFi. Honest about limitations.

**Banned CTA words — all four, everywhere:** "Sign Up" · "Get Started" · "Learn More" ·
"Submit". Write what the click does instead: *Start free on WhatsApp* · *Get your card — ₹599*
· *Meet all the agents*.

---

## 8. Brand and design tokens

Dark theme is the site. The tokens are already in `app/globals.css` — read them there, do not
retype them.

| Token | Value |
|---|---|
| Background | `#0a0a0a` |
| Card surface | `#161311` (warm near-black) |
| Hairline border | `#2a2320` (warm) |
| Foreground | `#ededed` |
| **Accent — the only one** | terracotta `#c2703f` |
| Hero glow | `#f05100` |
| Sunrise ramp (hero particles) | `#c2703f` → `#f05100` → `#f99c00` → `#fcbb00` |
| "Verified / synced" accent | teal `#009588`, used sparingly |
| Fonts | Inter (body) + Plus Jakarta Sans (headings) |

**One accent only. No purple, ever.** The supplied logo artwork was purple `#865cda` and was
recoloured to the site accent — if you find purple anywhere, it is a bug.

**Avoid the AI-generated look:** no purple gradients, no glassmorphism, no three identical
floating cards, no abstract blobs. Real product UI beats an illustration of product UI.
