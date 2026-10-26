# Rizely website — handoff

**For:** Dev (`DEVSINGH2004`) · **Owner:** Ankush · **Written:** 26 Oct 2026

You are taking over the **Rizely homepage** — the design and the build. This folder is
everything you need to understand the product, see where the website actually stands, and
finish it. Read it in order; it is written to be read once, properly, before you change a line.

You already know this format from `agag13/rizely-qa`. Same rules apply here.

---

## The job, in five milestones

| # | Milestone | Done when |
|---|---|---|
| **M1** | **Understand Rizely** | You have answered the eight questions in [`04-QUESTIONS.md`](04-QUESTIONS.md) §1 and sent them back. No code yet. |
| **M2** | **Audit the homepage yourself** | You have walked the preview at desktop and 375px and added your own findings to [`03-TRACKER.md`](03-TRACKER.md). Your eyes, not ours. |
| **M3** | **Rebuild / finish the homepage, live on the preview** | `rizely-platform.netlify.app` carries your work and every check in `03-TRACKER.md` §5 passes. |
| **M4** | **Go live on rizely.net** | Ankush says the word, and the branch is merged. **Not yours to trigger.** ⚠ See the deploy note below — the mechanics of this changed. |
| **M5** | **The blog, live on rizely.net** | Second job, after the homepage. [`05-BLOG-AND-STRAPI.md`](05-BLOG-AND-STRAPI.md). Mostly already built — read §1 before touching anything. |

M3 is the real deliverable. M4 is one deliberate merge that Ankush calls. M5 is a separate,
smaller task you can pick up once the homepage is on the preview.

### ⚠ The deploy picture changed, and it affects M4

This folder was written on the understanding that `main` deploys to rizely.net via Netlify.
**As of 26 Oct that is no longer true.** `rizely.net` is served by **nginx on the VPS**, from a
copy of this site inside the `cardping-redev` monorepo. The Netlify project still builds from
`main` and still serves `cardping.netlify.app` and `cardping.rankkking.com` — but **not
rizely.net**.

**So under the current setup, merging to `main` would not put your work on rizely.net.** Ankush
has to decide which copy is the real site before M4 can happen.
[`05-BLOG-AND-STRAPI.md`](05-BLOG-AND-STRAPI.md) §2 lays out the two options.

**None of this changes what you do now** — keep working on `dev/homepage` in this repo. It is
correct either way.

---

## Read in this order

1. **[`01-PRODUCT-AND-VISION.md`](01-PRODUCT-AND-VISION.md)** — what Rizely actually is, what is
   live versus roadmap, the vision the homepage has to tell, and the claims that are banned.
   **The banned-claims section is the most important page in this folder.**
2. **[`02-WHERE-THINGS-STAND.md`](02-WHERE-THINGS-STAND.md)** — the three versions of this site
   that exist right now, which branch deploys where, and how to run and ship it.
3. **[`03-TRACKER.md`](03-TRACKER.md)** — section by section: what is built, what is weak, what
   is missing. This is your worklist and you keep it current.
4. **[`04-QUESTIONS.md`](04-QUESTIONS.md)** — what we need you to answer, and what you should
   ask us.
5. **[`05-BLOG-AND-STRAPI.md`](05-BLOG-AND-STRAPI.md)** — your second job: the Strapi blog and
   getting it live. Read it when you pick M5 up, not before — but read its §1 before you form
   any opinion about how this site deploys.
6. **[`START-WITH-CLAUDE.md`](START-WITH-CLAUDE.md)** — the prompt to paste into Claude Code on
   day one, and what must never go into a chat window.

---

## Five rules, none of them optional

1. **Never push to `main`.** `main` auto-deploys to a **live, public, commercial site**
   (`cardping.rankkking.com` via the `cardping` Netlify project; see the deploy note above for
   why that is no longer the same thing as rizely.net). There is no staging between `main` and
   the public. Work on `dev/homepage`. **Run `git config core.hooksPath .githooks` in your
   clone** — it blocks the accident.
2. **Never touch the Netlify project called `cardping`.** That is rizely.net. Yours is
   `rizely-platform`.
3. **No banned claims, ever.** `01-PRODUCT-AND-VISION.md` §6 lists them. Repeating one is the
   worst mistake you can make on this repo — one of them is a live advertising exposure in
   India, not just a credibility problem.
4. **No real customer data on a public page.** No names, no emails, no screenshots of the real
   dashboard. Mock it or redact it.
5. **Ask rather than guess.** If the product does not obviously do a thing, it does not go on
   the page. `04-QUESTIONS.md` tells you who to ask.

---

## Your first week

| When | What |
|---|---|
| **Day 1 — morning** | `01-PRODUCT-AND-VISION.md`. Then open the live site, the preview, the shop and the WhatsApp agent and *use* them. No code. |
| **Day 1 — afternoon** | `02-WHERE-THINGS-STAND.md`. Clone, `npm install`, `npm run dev`, get it running at `localhost:3000`. Send back the eight answers (M1). |
| **Day 2** | Your own audit pass at desktop and 375px. Add findings to `03-TRACKER.md` (M2). Send us anything that looks wrong before you fix it. |
| **Days 3–7** | Work the tracker in priority order. Push to `dev/homepage`, check the preview, repeat. |

Do not start M3 before M1 and M2 are back with us. A homepage built by someone who has not used
the product is the thing we are trying to stop building.

---

## Where to ask

- **Product, copy, claims, priority, anything about what is true** → Ankush.
- **Code, build, deploy, branch problems** → open an Issue on this repo and tag it.
- **If a change would touch `main`, rizely.net, the `cardping` Netlify project, or the Shopify
  store** → stop and ask. Those four are never yours to change.
