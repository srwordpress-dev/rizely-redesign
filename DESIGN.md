# Rizely Design System

> Warm paper, one orange spark. Rizely reads like a well-made printed brochure for a
> serious sales tool: cream pages, editorial serif headlines, calm cards with hairline
> borders, and one vivid orange that appears only where you act or where the brand signs
> its name.

**Theme:** light only. **Scope:** the marketing site (rizely.net), starting with the homepage.

Adapted from a measured reference of a warm editorial SaaS style (Direction A in
`Design_Upgrade_Research_Rizely_01wire.pdf`, 3 Nov 2026) and re-made as Rizely's own:
Rizely's orange, free fonts, Rizely's product visuals. Nothing here should make Rizely look
like any other company's site.

Every contrast value below was measured (WCAG 2.x ratio). Body text and button labels meet
AA (4.5:1); large display text meets 3:1.

---

## 1. Colour

One neutral ramp, one accent. No second chromatic colour on the page. The only exceptions
are third-party marks shown as themselves (the WhatsApp and Telegram chat screens in the
demo, and the WhatsApp/Telegram/Claude/OpenAI chips), which carry their own brand colours.

### Tokens

| Token | Value | Role |
|---|---|---|
| `--canvas` | `#FFFFFF` | Page background (palette D, Nov 2026: white, black, orange stickers). |
| `--card` | `#FFFFFF` | Card surface; separated from the page by `--shadow-card`. |
| `--parchment` | `#F5F5F4` | Alternating section bands (neutral light grey). |
| `--peach` | `#FFE7DA` | The orange "sticker" tint: badges, the "most popular" plan, highlight zones. |
| `--ink` | `#0A0A0A` | Headings, body text, buttons. Near-black. |
| `--graphite` | `#4A4A4A` | Secondary text, card body text, captions, metadata. |
| `--mist` | `#CACAC8` | Disabled borders, inactive markers. |
| `--hairline` | `#E7E7E5` | Nav, footer and section dividers only. |
| `--line` | `#D6D6D3` | Card, input and chip borders. Hover: `--line-strong` `#BDBDB9`. |
| `--shadow-card` | `0 1px 2px` (5%) + `0 4px 10px` (6%) + `0 14px 28px -10px` (14%), all ink | Elevation for every card (white or tinted, 16px radius); hover deepens to `--shadow-card-hover`. Boxes inside a card and dashed note boxes stay flat. |
| `--spark` | `#F05100` | **The Rizely orange.** Logo dot, icons, focus ring, the full stop on the hero headline, active nav state, large graphics. |
| `--spark-action` | `#0A0A0A` | Fill of the primary button (white label). Black since palette D; orange stays for highlights. |
| `--spark-action-hover` | `#2B2B2B` | Primary button hover and press. |
| `--spark-text` | `#B33C00` | Orange **text** on white or grey: links, eyebrows, prices that need emphasis. |
| `--night` | `#0A0A0A` | The one dark band allowed per page (final call to action). Text on it is `--canvas`. |

### Why two oranges

`#F05100` is the brand colour, but white text on it measures **3.57:1** and orange text on
cream measures **3.48:1**, both below the 4.5:1 needed for 16px text. So the brand orange is
used where no small text sits on or in it, and one deeper shade of the **same hue (20°)**
carries text:

| Pair | Ratio | Use |
|---|---|---|
| white on `--spark-action` `#0A0A0A` | 19.80 | Primary button label |
| white on `--spark-action-hover` `#2B2B2B` | 14.16 | Same, hovered |
| `--spark-text` `#B33C00` on `--canvas` / `--card` | 5.89 | Links, eyebrows, icons in cards |
| `--spark-text` on `--parchment` | 5.40 | Same, on bands |
| `--spark-text` on `--peach` | 4.97 | Badges |
| `--ink` on `--canvas` | 19.80 | Body, headings |
| `--ink` on `--parchment` | 18.15 | Body on bands |
| `--graphite` on `--canvas` | 8.86 | Secondary text, card body text |
| `--graphite` on `--parchment` | 8.12 | Secondary text on bands |
| `--ink` on `--peach` | 16.68 | Text on peach |
| `--ink` on `--spark` | 5.55 | Only if a label must sit on the pure brand orange |

### Rules

- Orange means "act here" or "this is Rizely". Never a large background, never decoration.
- Alternate `--canvas` and `--parchment` between sections; no divider lines between them.
- `--night` at most once per page.

---

## 2. Typography

| Role | Family | Weight | Size | Line height |
|---|---|---|---|---|
| Display (hero headline only) | Bricolage Grotesque | 650 (hero 700) | 72–80px desktop, 44px phone | 1.1 |
| Heading XL (section titles) | Bricolage Grotesque | 650 (hero 700) | 48px desktop, 34px phone | 1.1 |
| Heading L | Bricolage Grotesque | 650 (hero 700) | 40px desktop, 30px phone | 1.15 |
| Heading M (card titles) | Instrument Sans | 600 | 22–24px | 1.4 |
| Subheading / lead | Instrument Sans | 400 | 18–20px | 1.6 |
| Body | Instrument Sans | 400 | 16–17px | 1.6 |
| Small / meta | Instrument Sans | 400–500 | 14px | 1.55 |
| Eyebrow | Instrument Sans | 500, uppercase, +0.06em | 13–14px | 1.4 |
| Caption | Instrument Sans | 400 | 12px | 1.6 |

- **Bricolage Grotesque** (Google Fonts, variable) for h1/h2: weight 650 at -0.025em; the hero
  h1 at 700, -0.03em. No italic words in headings, no numbered section labels.
- **Instrument Sans** for everything else. Both load through next/font (`--font-display`,
  `--font-body`). Source Serif 4 and Inter are retired.
- The hero headline ends with a full stop in `--spark`.
- Headings use `text-wrap: balance`; body text keeps 60–75 characters per line.
- Prices and counts use tabular figures.

---

## 3. Space, radius, depth

- Base unit 4px. Page max-width **1200px**, side gutter 16px phone / 24px tablet / 32px desktop.
- Section padding: 64–80px desktop, 48–56px phone. Card padding 24–32px. Element gap 16–24px.
- **Radius:** buttons, inputs, nav pills **8px**; cards, images, demo frames **16px**; badges **4px**;
  chips fully round. Never swap them.
- **Depth is a line plus one soft shadow** (revised Nov 2026, for contrast). Cards are `--card`
  white with a 1px `--line` border and `--shadow-card`; on hover the border warms to orange and
  the shadow deepens. That one shadow recipe is the only one. No glows, no blur, no glass.
- Motion: colour and border transitions 150–200ms `cubic-bezier(0.23, 1, 0.32, 1)`; buttons
  scale to 0.96 on press; hover only on `(hover: hover) and (pointer: fine)`; everything
  respects `prefers-reduced-motion`. No shine sweeps, no glowing halos.

---

## 4. Components

### Buttons
- **Primary (click here):** `--cta` `#B33C00` fill, white Instrument Sans 16px/500 (5.89:1),
  8px radius, 12px × 20px padding, no border, no shadow. Hover `--cta-hover` `#9E3500` (7.09:1).
  One per view. Every button a visitor should press uses it, including the one on the dark band.
- **Black (`--spark-action`)** is kept for selected states and the mock buttons inside drawings,
  which are pictures, not controls.
- **Ghost:** transparent, 2px `--ink` border, `--ink` label, same size.
  Hover fills `--parchment`. Travels with a primary.
- **Text link:** `--spark-text`, underline on hover, arrow nudges 2px right.
- **Focus ring:** 2px `--spark`, 2px offset, on every interactive element.

### Navigation
`--canvas` (sticky, gains `--parchment` + hairline bottom border after scroll), height 64px,
dark-mark logo (`/rizely-logo.png`) left, links centre in Instrument Sans 15px `--ink`, primary CTA
right. Hamburger below 1024px, as today.

### Hero
Light canvas, eyebrow ("NFC card · digital profile · AI agent"), serif display headline with
the orange full stop, Instrument Sans lead, primary + ghost CTA pair, small reassurance line. **The
particle animation stays exactly as it behaves today**; only its colours change so it reads
on cream (ink and `--spark` particles instead of light ones).

### Cards (three layers, why Rizely, agents, personas)
`--card` white, 16px radius, 1px `--line`, `--shadow-card`, 24–32px padding. Icon tiles sit on `--peach`. An orange monoline
icon (1.5px stroke), Instrument Sans 22px/600 title, body in `--graphite`, optional text link in
`--spark-text`. Equal heights in a row.

### Checklist item
`--spark` check icon, 8px gap, Instrument Sans 16px `--ink`, 12px between items.

### Badge / pill
`--peach` background, `--spark-text` label, 4px radius, Instrument Sans 12–13px/500. "Live", "On the
roadmap" (roadmap uses `--parchment` + `--graphite`), "Most popular".

### Channel chips (works where you already are)
Round chips on `--canvas`, hairline border, the official mark in its own brand colour, Instrument Sans
14px label.

### Pricing cards
As cards. The most popular plan sits on `--peach` with a `--spark` 1.5px border; its CTA is
the page's primary button, the others are ghost buttons. Prices in Bricolage Grotesque, tabular.

### Product demos (chat demo, scan-lead)
Framed as 16px-radius images on `--parchment` with a hairline border. Inside the phone frames
the WhatsApp and Telegram screens keep their real colours. Surrounding labels, step lists and
controls use the system.

### FAQ
Hairline-separated rows, Instrument Sans 18px/500 questions, `--spark` chevron, body in `--graphite`.

### Final CTA band
The one `--night` section: serif headline in `--canvas`, primary button, lead in
`rgb(252 252 250 / 0.75)`.

### Footer
`--parchment`, hairline top border, Instrument Sans 14px, `--graphite` links turning `--ink` on hover.

---

## 5. Imagery

- Rizely's own product visuals only: the NFC card, the profile, the WhatsApp/Telegram chat
  flow. No stock photos, no AI-generated people, no 3D blobs.
- Images and demo frames: 16px radius.
- Icons: one monoline set (lucide), 1.5px stroke, `--spark` or `--ink`.

---

## 6. Do and don't

**Do**
- Keep all copy, links, prices, the ₹/$ geo pricing, GTM, structured data and noindex rules exactly as they are.
- Build mobile-first; check every section at 390px and 1440px (and 320, 768, 1024).
- Use only the tokens above. If a role has no token, add the token here first.
- Alternate canvas and parchment bands for rhythm.

**Don't**
- No pure white (`#FFFFFF`) or pure black page backgrounds (white is for cards only).
- No second accent colour, no gradients, no glows, no shadows other than `--shadow-card`, no glassmorphism.
- No `--spark` (`#F05100`) behind or as small text; use `--spark-action` / `--spark-text`.
- No serif below 24px, no serif weight other than 500.
- Don't change the hero animation's behaviour, only its colours.
- No emoji as icons, no centred everything; left-align body copy.

---

## Hand layer (Nov 2026)

Small human marks on a clean grid. Keep each to the places listed; more of them turns into decoration.

- **Hand-drawn underline** (rough-notation, `components/scribble.tsx`) in `--spark`, on the hero's
  last two words only. Drawn once after load; already drawn under reduced motion.
- **Margin notes** in Kalam 400 (`--font-hand`, not preloaded), `--graphite`, tilted 2-3°, with an
  orange hand-drawn arrow. Two notes on the desktop timeline only.
- **Stickers** (`.sticker`): `--spark` fill, `--ink` label (5.55:1), Bricolage 700, tilted -4° or 3°.
  Used for "Most popular" and one note on the card photo.
- **Paper grain** on the grey bands: an SVG noise tile at 5% black.
- **Section heads vary**: the label sits only on How it works and Pricing. How it works carries the
  oversized `10:42 → 19:30`, the page's one deliberate break from the grid.
