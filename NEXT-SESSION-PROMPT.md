# Next-session prompt — Rizely landing page: add engaging animations & demos

Paste everything below into a fresh Claude Code session (run it from `/Users/ankushgupta/cardping-website`).

---

You are continuing work on the **Rizely** marketing landing page. It's already built, live, and audited. Your job this session: **make it more engaging by adding realistic, on-brand animations and product demos** (details in "The task"). Plan first, show me a preview, get approval, then deploy. Everything must be **mobile-optimised AND desktop-optimised**.

> **Brand (Sep 2026 rebrand):** the product is **Rizely**. The wordmark lives at `public/rizely-logo-dark.png` (used by `components/logo.tsx`: terracotta type, white mark, for the dark site) with the light-background master at `public/rizely-logo.png` (terracotta type, black mark); the mark alone is `app/icon.png`. The supplied artwork was purple `#865cda`, and it has been **recoloured to the site accent `#C2703F`** — the site palette did not move, the logo did. So there is no purple anywhere and the "one accent only / no purple" rule below still holds exactly as written. If you ever need the original purple art, it is live on rizely.net, not in this repo.

## Product context (don't re-derive; use this)
Rizely is a **WhatsApp- and Telegram-native AI agent** that scans the business cards you collect at events, turns each into a managed lead, and **sends the follow-up automatically**. India-first (INR, GST, Indian-language card capture, per-event pricing).

- **The one safe claim:** "the only tool that captures the card *and* sends the follow-up — in Indian languages, priced per event." That exact compound is the ONLY "only/first" allowed.
- **Pain → fix:** 73% of event leads never followed up · 9-day delay · 6+ hrs/event · ₹12L+ lost → **6 hours → 2 seconds, 9 days → 60 seconds, 73% lost → 100% followed up.**
- **NEVER use these killed claims:** "India's first", "99.2% accuracy", a "₹1,499" tier, or naming dead products (CamCard, ABBYY, Microsoft Lens). Never call it a "service" — it's an **AI agent**. Banned CTAs: "Sign Up", "Get Started", "Learn More", "Submit".
- WhatsApp business number: **+91 83739 78881** (`wa.me/918373978881`), already in `lib/site.ts`.

## Where it lives & how to run it
- **Live:** https://cardping.netlify.app · **Local code:** `/Users/ankushgupta/cardping-website` (not yet on GitHub — deploy is direct).
- **Stack:** Next.js 16 (App Router, static export `output: "export"`), TypeScript, Tailwind CSS 4, shadcn/Radix, framer-motion, next-themes, lucide. Based on the `gonzalochale/saas-landing-template`, **forced dark**.
- **Design tokens (match these exactly):** near-black bg `#0a0a0a`, card `#141414`, hairline borders `rgba(255,255,255,.08)`, off-white text, **one accent = terracotta** `#C2703F` (`--primary` = `oklch(0.63 0.12 47)`, hero glow via `--light`). Geist font. **One accent only — no purple gradients, no glassmorphism, real product UI not AI blobs.**
- **Current sections (in `components/`):** `hero` · `partners` · `how-it-works` · `stats` · `testimonials` (placeholder, tagged "Sample" — real quotes arriving from marketing) · `pricing` (+ Event Pass) · `faq` (native `<details>`) · `footer`. Legal pages at `/privacy` and `/terms`.
- **Dev preview:** `npm run dev` → http://localhost:3000. For a reliable full-page screenshot, use the Playwright in `/Users/ankushgupta/cardping/workstreams/04-testing/harness` (scroll the page first so `whileInView` sections render).
- **Build + deploy to Netlify (site id `766654de-5527-490d-be7f-3e81bfde854f`, team `hi-udqj89k`):**
  1. `npm run build` (produces `out/`).
  2. Move `node_modules`, `.next`, `out` out of the folder temporarily (keeps the upload ~1.4M).
  3. Call the Netlify MCP `netlify-deploy-services-updater` → `deploy-site` with that `siteId`; it returns an `npx -y @netlify/mcp@latest --site-id ... --proxy-path "..."` command — run it **from the project dir** (it uploads source + builds on Netlify, no login needed). Move the folders back afterward.
- **Audit already applied — don't regress these:** content must be in the server-rendered HTML (no JS-only content — that's why FAQ uses native `<details>` and stats are static text); above-the-fold hero is NOT opacity-gated; `MotionConfig reducedMotion="user"` is on; there's a no-JS `<noscript>` fallback; robots.txt, llms.txt, sitemap.xml, JSON-LD, canonical, OG image, security headers all exist. **Keep any new animation SSR-safe and reduced-motion-aware.**

## The task — build these animations/demos (all in Rizely's dark + terracotta theme, mobile + desktop)

1. **WhatsApp chat demo (the money shot).** An animated, realistic WhatsApp-style chat that plays the real flow: user photographs a business card → the Rizely bot replies with the extracted contact (name, company, phone, email) → "added to your pipeline" → an auto follow-up message goes out. Frame it in the dark theme (a phone mock). This fills the current "product demo" gap. Make it loop cleanly and pause on `prefers-reduced-motion`.
2. **Telegram version of the same flow** — same sequence on a Telegram-style UI, as a toggle/second tab beside the WhatsApp one (the product does both).
3. **popl.co-style scan → lead-capture animation.** REFERENCE: go to **https://popl.co/** and find the section **"AI-powered universal lead capture — turn your bad scan into revenue."** Copy the *idea* of its animation (a scan visibly becoming a captured lead), then build **Rizely's own version in our theme**: a business card gets scanned → fields extract/populate → a clean lead card materialises. We currently do **visiting cards only**, but design it so it can later extend to **QR codes and event badges** (show that variety is coming). Realistic, premium, not literal-copy.
4. **Problem → solution intro / brand-story animation.** A short animated sequence (text/motion, Claude-built with CSS/framer/Canvas — no external video): "You go to an event → meet dozens of people → collect a stack of cards → they pile up in a drawer, never followed up (the ₹12L problem) → Rizely scans + follows up automatically." Use the numbers above. **Ask Ankush for the older problem-narrative script** (or check the `cardping` mission-control repo's marketing context) and base the copy on it.
5. **(Optional) 4-screen product walkthrough** — ~4 steps/screens showing how Rizely solves the problem. You may reuse the real dashboard screenshots captured earlier (in this machine's scratchpad, `shots/u/`), **but user-dashboard shots contain real lead names/emails (PII) — do NOT put real PII on the public site.** Use clean/redacted crops or built mockups.

## Guardrails
- Match the existing design system exactly (dark, terracotta, hairline borders, Geist). One accent only.
- Mobile-first AND desktop — test both viewports.
- Keep it premium and human — avoid the "AI-generated" look (no purple gradients, no glassmorphism, no three identical floating cards).
- SSR-safe + `prefers-reduced-motion` friendly (see audit notes above).
- No killed claims; honest copy; keep testimonials tagged "Sample" until real ones land.

**Start by:** reviewing the live site + popl.co's referenced section, then propose where each animation goes (plan), show me a preview before deploying, and keep it mobile + desktop optimised throughout.
