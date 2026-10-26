# 5 — Using Claude Code on this repo

You will do this work with Claude Code sitting in the repo. These are the prompts to paste, in
order. Each one assumes you are running from the `cardping-website` folder on branch
`dev/homepage`.

---

## Day one — the orientation prompt

Paste this whole block:

> I'm Dev, taking over the Rizely marketing homepage. Before we change anything, I want to
> understand it.
>
> Read `handoff/README.md`, then `handoff/01-PRODUCT-AND-VISION.md`,
> `handoff/02-WHERE-THINGS-STAND.md` and `handoff/03-TRACKER.md` in that order. Do not read
> `NEXT-SESSION-PROMPT.md` in the repo root — it is stale and contradicts the handoff.
>
> Then walk me through, in your own words:
> 1. What Rizely actually sells, and which of the three layers makes the money.
> 2. How `app/page.tsx` is composed, and which component owns each of the 16 homepage sections.
> 3. Which branch I am on, what deploys where, and what happens if I push to `main`.
> 4. The claims I am banned from putting on the page, and the one claim I am allowed.
>
> Then stop. Do not change any files yet.

Check its answers against the handoff yourself. If it gets one wrong, the handoff has a hole —
tell us, because the next person will hit the same hole.

---

## Day two — your own audit pass

> Start the dev server and walk the whole homepage yourself at desktop width and at 375px —
> screenshots at each section, not just the top. For each one, tell me: does it render fully at
> a normal scroll speed, does anything overlap or overflow, and does the copy match what
> `handoff/01-PRODUCT-AND-VISION.md` says is true about the product?
>
> Separately, run a banned-claim scan over the built `out/` folder using the grep list in
> `handoff/03-TRACKER.md` §5, and tell me every hit.
>
> Write what you find into `handoff/03-TRACKER.md` §3 as new `W-` items, in the same format as
> the existing ones. Do not fix anything yet — I want the list first.

---

## Working on an item

One tracker item at a time. Always name it:

> Work `W-01` from `handoff/03-TRACKER.md`. Read the item's "done when" line first and treat it
> as the acceptance test.
>
> Constraints: match the existing design system exactly — dark, one terracotta accent, warm
> hairline borders, Inter + Plus Jakarta Sans. No purple, no glassmorphism, no AI-blob
> illustrations. Mobile-first and desktop both. Keep it SSR-safe and
> `prefers-reduced-motion`-aware. Do not add a dependency without asking me.
>
> Show me the change at both viewports before we commit.

When it is done:

> Update `handoff/03-TRACKER.md` — mark `W-01` done with a one-line note on what actually
> changed. Then commit to `dev/homepage` with a message that says what changed and why, and
> push.

---

## Four things to tell Claude at the start of every session

Claude does not remember the last session. If a session is going to touch anything risky, say
these up front:

1. **"Never push to `main` — `main` is the live site."**
2. **"Never run a bare `netlify deploy`. Always pass `--site`, and never the `cardping` site."**
3. **"Do not invent a number, a customer name, a date or a feature. If it is not in `handoff/`
   or visibly true in the product, it does not go on the page."**
4. **"Do not import copy from the mission-control repo's `knowledge/KNOWLEDGE_BASE.md`."**

---

## What must never go into a chat window

Same rules as the QA repo, and they are not negotiable:

- **No credentials.** No API keys, no tokens, no `.env` contents, no Netlify or Shopify or
  Supabase logins. Credentials never leave `.env` — not into chat, not into a doc, not into a
  commit. `.env.example` shows the shape; that is all you need.
- **No real customer data.** No lead names, emails or phone numbers, from any screenshot,
  database or dashboard. If you have a screenshot with a real name in it, crop or redact it
  before it goes anywhere — chat included.
- **No server hosts, IPs or internal URLs** beyond the public ones in this handoff.

If you are unsure whether something counts, it counts. Ask first.

---

## If something goes wrong

- **You pushed to `main` by accident.** Tell Ankush immediately — do not try to fix it quietly.
  rizely.net rebuilds in a couple of minutes and the fix is a revert plus a rebuild, which is
  fine if we know. It is only a problem if we find out from a customer.
- **The preview build fails.** Check the Netlify deploy log first. A stale lockfile broke every
  build on this repo once before, so start there.
- **India is seeing dollars on the preview.** The edge function was dropped from the deploy
  (W-09). Redeploy from the repo root, not from `out/`.
