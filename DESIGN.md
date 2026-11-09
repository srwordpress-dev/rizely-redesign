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
| `--canvas` | `#FCFCFA` | Page background. |
| `--card` | `#FFFFFF` | Card surface (revised Nov 2026: white cards stand off the cream). Never a page background. |
| `--parchment` | `#F3EEE4` | Alternating section bands, navigation surface. |
| `--peach` | `#FDE3D6` | Soft accent surface: badges, the "most popular" plan, highlight zones. |
| `--ink` | `#1F1B17` | Headings, body text, borders at low opacity. Warm near-black. |
| `--graphite` | `#48443F` | Secondary text, card body text, captions, metadata. |
| `--mist` | `#CACAC8` | Disabled borders, inactive markers. |
| `--hairline` | `#E4E0DA` | Nav, footer and section dividers only. |
| `--line` | `#D3CCC2` | Card, input and chip borders (1.59:1 on white). Hover: `--line-strong` `#C4BCB0` warming to orange. |
| `--shadow-card` | `0 1px 2px` + `0 4px 12px`, ink at 6% / 8% | Card elevation; hover deepens to `--shadow-card-hover`. |
| `--spark` | `#F05100` | **The Rizely orange.** Logo dot, icons, focus ring, the full stop on the hero headline, active nav state, large graphics. |
| `--spark-action` | `#B33C00` | Fill of the primary button (white label). Same hue as `--spark`, deep enough for text. |
| `--spark-action-hover` | `#9E3500` | Primary button hover and press. |
| `--spark-text` | `#B33C00` | Orange **text** on cream: links, eyebrows, prices that need emphasis. |
| `--night` | `#1F1B17` | The one dark band allowed per page (final call to action). Text on it is `--canvas`. |

### Why three oranges

`#F05100` is the brand colour, but white text on it measures **3.57:1** and orange text on
cream measures **3.48:1**, both below the 4.5:1 needed for 16px text. So the brand orange is
used where no small text sits on or in it, and two deeper shades of the **same hue (20°)**
carry text:

| Pair | Ratio | Use |
|---|---|---|
| white on `--spark-action` `#B33C00` | 5.89 | Primary button label |
| white on `--spark-action-hover` `#9E3500` | 7.09 | Same, hovered |
| `--spark-text` `#B33C00` on `--canvas` | 5.74 | Links, eyebrows |
| `--spark-text` on `--parchment` | 5.10 | Same, on bands |
| `--spark-text` on `--card` | 5.89 | Icons and links inside cards |
| `--spark-text` on `--peach` | 4.81 | Badges |
| `--ink` on `--canvas` | 16.66 | Body, headings |
| `--ink` on `--parchment` | 14.80 | Body on bands |
| `--graphite` on `--canvas` | 9.40 | Secondary text |
| `--graphite` on `--card` | 9.66 | Card body text |
| `--graphite` on `--parchment` | 8.35 | Secondary text on bands |
| `--ink` on `--peach` | 13.96 | Text on peach |
| `--ink` on `--spark` | 4.79 | Only if a label must sit on the pure brand orange |

### Rules

- Orange means "act here" or "this is Rizely". Never a large background, never decoration.
- Alternate `--canvas` and `--parchment` between sections; no divider lines between them.
- `--night` at most once per page.

---

## 2. Typography

| Role | Family | Weight | Size | Line height |
|---|---|---|---|---|
| Display (hero headline only) | Source Serif 4 | 500 | 72–80px desktop, 44px phone | 1.1 |
| Heading XL (section titles) | Source Serif 4 | 500 | 48px desktop, 34px phone | 1.1 |
| Heading L | Source Serif 4 | 500 | 40px desktop, 30px phone | 1.15 |
| Heading M (card titles) | Inter | 600 | 22–24px | 1.4 |
| Subheading / lead | Inter | 400 | 18–20px | 1.6 |
| Body | Inter | 400 | 16–17px | 1.6 |
| Small / meta | Inter | 400–500 | 14px | 1.55 |
| Eyebrow | Inter | 500, uppercase, +0.06em | 13–14px | 1.4 |
| Caption | Inter | 400 | 12px | 1.6 |

- **Source Serif 4** (Google Fonts) for headings 24px and up, **only weight 500**. Hierarchy
  comes from size, not weight. Never below 24px.
- **Inter** for everything else (already loaded). Plus Jakarta Sans is retired on redesigned pages.
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
- **Primary:** `--spark-action` fill, white Inter 16px/500, 8px radius, 12px × 20px padding,
  no border, no shadow. Hover `--spark-action-hover`. One per view.
- **Ghost:** transparent, 2px `--spark-action` border, `--spark-text` label, same size.
  Hover fills `--peach`. Travels with a primary.
- **Text link:** `--spark-text`, underline on hover, arrow nudges 2px right.
- **Focus ring:** 2px `--spark`, 2px offset, on every interactive element.

### Navigation
`--canvas` (sticky, gains `--parchment` + hairline bottom border after scroll), height 64px,
dark-mark logo (`/rizely-logo.png`) left, links centre in Inter 15px `--ink`, primary CTA
right. Hamburger below 1024px, as today.

### Hero
Light canvas, eyebrow ("NFC card · digital profile · AI agent"), serif display headline with
the orange full stop, Inter lead, primary + ghost CTA pair, small reassurance line. **The
particle animation stays exactly as it behaves today**; only its colours change so it reads
on cream (ink and `--spark` particles instead of light ones).

### Cards (three layers, why Rizely, agents, personas)
`--card` white, 16px radius, 1px `--line`, `--shadow-card`, 24–32px padding. Icon tiles sit on `--peach`. An orange monoline
icon (1.5px stroke), Inter 22px/600 title, body in `--graphite`, optional text link in
`--spark-text`. Equal heights in a row.

### Checklist item
`--spark` check icon, 8px gap, Inter 16px `--ink`, 12px between items.

### Badge / pill
`--peach` background, `--spark-text` label, 4px radius, Inter 12–13px/500. "Live", "On the
roadmap" (roadmap uses `--parchment` + `--graphite`), "Most popular".

### Channel chips (works where you already are)
Round chips on `--canvas`, hairline border, the official mark in its own brand colour, Inter
14px label.

### Pricing cards
As cards. The most popular plan sits on `--peach` with a `--spark` 1.5px border; its CTA is
the page's primary button, the others are ghost buttons. Prices in Source Serif 4, tabular.

### Product demos (chat demo, scan-lead)
Framed as 16px-radius images on `--parchment` with a hairline border. Inside the phone frames
the WhatsApp and Telegram screens keep their real colours. Surrounding labels, step lists and
controls use the system.

### FAQ
Hairline-separated rows, Inter 18px/500 questions, `--spark` chevron, body in `--graphite`.

### Final CTA band
The one `--night` section: serif headline in `--canvas`, primary button, lead in
`rgb(252 252 250 / 0.75)`.

### Footer
`--parchment`, hairline top border, Inter 14px, `--graphite` links turning `--ink` on hover.

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
