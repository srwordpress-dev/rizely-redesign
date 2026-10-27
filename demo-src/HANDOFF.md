# Rizely landing page — session handoff

Paste this whole file into a fresh Claude Code session (run it from `/Users/ankushgupta/cardping-website`).

---

You are continuing work on the **Rizely** marketing landing page. It is **already built, live, and
audited**. Read this fully before touching anything.

> **Brand (Sep 2026 rebrand):** the product is **Rizely**. The wordmark lives at `public/rizely-logo-dark.png` (used by `components/logo.tsx`: terracotta type, white mark, for the dark site) with the light-background master at `public/rizely-logo.png` (terracotta type, black mark); the mark alone is `app/icon.png`. The supplied artwork was purple `#865cda`, and it has been **recoloured to the site accent `#C2703F`** — the site palette did not move, the logo did. So there is no purple anywhere and the "one accent only / no purple" rule below still holds exactly as written. If you ever need the original purple art, it is live on rizely.net, not in this repo.

## What Rizely is (don't re-derive — use this)
WhatsApp- and Telegram-native **AI agent** that scans business cards collected at events, turns each into a
managed lead, and handles the follow-up. India-first (INR, GST, Indian-language card capture, per-event pricing).
- **The one safe superiority claim (verbatim, the ONLY "only/first" allowed):** "Rizely is the only tool that
  captures the card **and** sends the follow-up — in Indian languages, priced per event."
- **NEVER use these killed claims:** "India's first", "99.2% accuracy", a "₹1,499" tier, or naming dead products
  (CamCard, ABBYY, Microsoft Lens). Never call it a "service" — it's an **AI agent**. Banned CTAs: Sign Up /
  Get Started / Learn More / Submit.
- WhatsApp business number: **+91 83739 78881** (`wa.me/918373978881`) — in `lib/site.ts`.

## Where things live
- **Live site:** https://cardping.netlify.app (Netlify site id `766654de-5527-490d-be7f-3e81bfde854f`, team `hi-udqj89k`).
- **Repo (NOT on GitHub — deploy is direct):** `/Users/ankushgupta/cardping-website`.
  Next.js 16 (App Router, `output: "export"` static), TypeScript, Tailwind v4, shadcn/Radix, framer-motion,
  next-themes, lucide. **Forced dark.**
- **Mission control:** `/Users/ankushgupta/cardping` — read `mission-control/STATE.md` and `mission-control/CORRECTIONS.md` first.
- **Real screen recordings of the product** (for realism reference): `/Users/ankushgupta/cardping/screenrecording/`
  (`IMG_9776.MP4` = real WhatsApp flow, `IMG_9777.MP4` = real Telegram flow). Extract frames with `ffmpeg`.
- **Demo sources + generator (THE thing you edit):** `/Users/ankushgupta/cardping-website/demo-src/` (see below).

## Design system — match EXACTLY (one accent only)
bg `#0a0a0a`, surface `#141414` / `#191919`, hairline borders `rgba(255,255,255,.08)` / `.14`, off-white text
`#ededed` / muted `#a1a1a1`. **ONE accent = terracotta `#c2703f`** (`--primary` oklch(0.63 0.12 47), glow
`#d1743f`). Geist + Geist Mono + Noto Sans Devanagari. No purple, no glassmorphism, real product UI not AI blobs.
Exception: third-party brand marks (WhatsApp green, Telegram blue, Gmail multicolor, LinkedIn blue) are allowed
as recognisable logos inside the integrations row and the chat/scanner mockups — they are not "the accent".

## Sections on the page now (top → bottom)
`hero · partners · how-it-works · **chat-demo** · **scan-lead** · stats · testimonials(Sample tags) ·
**walkthrough** · pricing · faq · footer`. The three **bold** ones are the animated demos built this project:

1. **chat-demo** (`components/chat-demo.tsx`) — a guided 5-step tour (left) beside two synced, scrollable phones
   (right): iPhone/WhatsApp + Samsung/Telegram, **100% real chat UI**, verified Rizely seal, "no app to install"
   headline. Steps: Snap the card → AI reads it → Filed under the event → Voice note transcribed → **Follow-up
   campaign scheduled (runs over the next 3 days)**. Uses two made-up cards (Meera Desai/Desai Spice Traders,
   bilingual Hindi + English, on WhatsApp; Arjun Mehta/Mehta Furnishings on Telegram) with `example.com` emails and
   `+91 90000` numbers. The photos of real people's cards that used to be here were removed (W-14) — never put a
   real person's card back. Auto-advances + Play/Pause/Prev/Next + clickable steps.
2. **scan-lead** (`components/scan-lead.tsx`) — popl.co-style "universal scanner": six input objects **side by side**
   (real card photo, printed website QR, LinkedIn QR, WhatsApp QR, Telegram QR, event badge with ATTENDEE/EXHIBITOR/VIP
   tiers), converging flow lighting the active one, auto-cycling into one resolving lead. All shown as capabilities.
3. **walkthrough** (`components/walkthrough.tsx`) — a 4-step "Everything you scanned" product tour with light
   dashboard mockups in a browser frame (built mockups, no real PII).

## Architecture of the 3 demos (important)
Each demo component is **auto-generated** — do not hand-edit the `.tsx`. Instead:

> ⚠️ **27 Oct: the sources have drifted.** `components/chat-demo.tsx` and `scan-lead.tsx` were edited by hand
> after their last build, so they no longer match `demo-src/*.src.html` (the colours and the intro line differ).
> Re-running `build-demos.js` today would silently undo that work. Before the next rebuild, copy the hand edits
> back into the `.src.html` files and confirm the regenerated `.tsx` diff contains only your change. On Windows,
> make sure the `.src.html` files have LF line endings first, or the build bakes `\r\n` into every string.
- **Edit the source HTML** in `demo-src/`: `chat-demo.src.html`, `scan-lead.src.html`, `walkthrough.src.html`
  (self-contained: `<style>` + markup + `<script>`, Google-Fonts only, one embedded card photo in scan-lead).
- **Regenerate:** `node demo-src/build-demos.js` — this scopes each demo's CSS (chat under `.cpc-chat`, walkthrough
  under `.cpc-walk`, scan-lead is already scoped under `.cp-uscan`), server-renders the markup via
  `dangerouslySetInnerHTML`, runs the standalone `<script>` once client-side via `new Function()` in a `useEffect`,
  and copies `card_wa.jpg`/`card_tg.jpg` → `public/chat-wa.jpg`/`chat-tg.jpg`. Then `npm run build`.
- **Audit rules to keep green:** all copy must be in the server-rendered HTML (it is — SSR via dangerouslySetInnerHTML);
  base state (no JS) shows meaningful content, not blank; `prefers-reduced-motion` bails to a static resolved state;
  MotionConfig `reducedMotion="user"` is on; noscript fallback exists; robots.txt/llms.txt/sitemap.xml/JSON-LD/
  canonical/OG/security-headers all exist — don't regress them.

## Run / preview / QA
- Dev: `npm run dev` → http://localhost:3000.
- Reliable screenshots (the in-app browser scales oddly): write a small Node script using the Playwright at
  `/Users/ankushgupta/cardping/workstreams/04-testing/harness/node_modules/playwright-core` (chromium is installed
  in `~/Library/Caches/ms-playwright`). Scroll the page first so `whileInView` + IntersectionObservers fire; drive
  demo state via `page.evaluate` (e.g. click `.cpc-chat .step[data-tour="3"]`, or read `.cp-uscan` cycling). Screenshot
  desktop (1440) AND mobile (402). Emulate `reducedMotion:'reduce'` and `javaScriptEnabled:false` to check backstop.

## Build + deploy (exact)
1. `node demo-src/build-demos.js` (if you changed a demo) then `rm -rf .next out && npm run build`.
2. Move the heavy folders aside to keep the upload ~1.6M: `mkdir -p /tmp/cph && mv node_modules out .next /tmp/cph/ ; rm -rf .next`.
3. Call the Netlify MCP tool **`netlify-deploy-services-updater` → operation `deploy-site`** with
   `siteId: "766654de-5527-490d-be7f-3e81bfde854f"`. It returns an
   `npx -y @netlify/mcp@latest --site-id ... --proxy-path "..."` command — run it **from the repo dir** (it uploads
   source + builds on Netlify, no login). Wait for "Deploy is ready!".
4. Restore: `mv /tmp/cph/node_modules /tmp/cph/out . ; rm -rf /tmp/cph`.
5. Verify live: `curl -s https://cardping.netlify.app/` and grep for your new copy; check images 200; grep for killed
   claims (use `grep -F` for `99.2%` — a bare `99.2` regex false-positives on SVG path coords); check FCP/weight with
   a Playwright navigation-timing script if asked.

## >>> TOP TODO for this session (Ankush's latest request) <<<
Fix the **walkthrough** section ("Everything you scanned, working for you." — `demo-src/walkthrough.src.html`):
- The four numbered step pointers (left column) should be reframed to be **universal to Rizely's actual features**
  (e.g. capture, auto-enrich, file under event, **credits**, **auto follow-up / campaigns**, voice notes,
  export to Sheets/CRM) — right now step 2/3 lean on specific sample events. Make the step copy feature-driven, not
  event-specific.
- The dashboard mockup hard-codes sample events "**Bharat Vypar 2026**" / "**BTC Asia HK**" as plain text — Ankush
  questioned this; make the mockup read as generic/representative (keep it clearly illustrative, no real PII).
- Keep the 4-step structure (that's fine), the browser-frame light dashboard, the design system, "credits" (not
  "coins" — the repo retired "coin" for "credit"), and no real PII.
- After editing: `node demo-src/build-demos.js` → dev-preview + QA desktop & mobile → build → deploy → verify live.

## Other open items (not blocking; confirm with Ankush)
- **Copy consistency:** hero/stats still say "9 days → 60 seconds to follow up", while the chat demo now frames the
  follow-up as a **3-day campaign**. Ankush may want this reconciled site-wide.
- **QR/badge capabilities:** the scanner presents QR + LinkedIn/WhatsApp/Telegram QR + event-badge capture as live.
  Per Ankush, the **visiting card is live now; QR + badge ship ~next week** — shown as capabilities on purpose.
- **Deferred:** a problem→solution brand-story animation (event → stack of cards → ₹12L lost → Rizely fixes it)
  was scoped but deferred by Ankush. The pain numbers: 73% of event leads never followed up · 9-day delay ·
  6+ hrs/event · ₹12L+ lost → 6h→2s, 9d→60s, 73%→100%.
- **"Your CRM"** in the partners row is intentionally a neutral mark (agnostic). Ankush may later want a specific CRM.

## Working style Ankush expects
Plan → show a live preview (publish an **Artifact** so he can watch the animation move on desktop + phone) → get
approval → deploy. He's exacting about realism and "pixel-perfect, high-end" quality; iterate rather than ship
"good enough". Always show BOTH desktop and mobile. Parallelize with subagents for well-scoped rebuilds.
