# 4 — Questions

Two directions. §1 is us checking you understood Rizely before you design for it. §2 is the
list of things you will need from us, so you ask once instead of guessing.

---

## 1. Answer these before you write any code (milestone M1)

Short answers. A paragraph each at most. Send them back in one message. If an answer is "I
could not find it", say that — that is a useful answer and it tells us the handoff has a hole.

1. **In two sentences, what does Rizely do?** Write it the way you would explain it to a friend
   who has never been to a trade show.
2. **What are the three layers, and which of them is where the money is made?** Say why.
3. **Name three things Rizely does *not* do** that a visitor might reasonably assume it does.
4. **Why does no CTA on this site link to `profile.rizely.net`?**
5. **What happens if you push to `main`?** Answer precisely.
6. **Why is pricing annual and not monthly?** This one has a specific reason, not a preference.
7. **Quote the one "only" claim we are allowed to make, exactly.** Then say what makes it
   defensible.
8. **After using the live site, the preview, the shop and the WhatsApp agent — give us your "five
   things I did not expect".** Anything confusing, broken, slow or contradictory. This is the
   most valuable thing you will send us all week, because you are the only person who will ever
   see Rizely for the first time with fresh eyes.

Then, before you start building: **walk the preview at desktop and at 375px and add your own
findings to `03-TRACKER.md`** (milestone M2). Our list in §3 of that file is not complete and is
not meant to be — find what we stopped seeing.

---

## 2. What to ask us, and who to ask

### Ask Ankush — product truth, copy, claims, priority

- **What event-level proof may I publish?** (blocks W-04 and the Proof section)
- **Solo price — ₹3,499/yr or ₹4,788/yr?** The repo and the live site disagree. (D-1)
- **Hero CTA order — free trial first, or the ₹599 card first?** (D-2)
- **Are there real customer quotes or event logos I can use yet, or does everything stay
  placeholder?**
- **Is there a brand asset set** — card photography, event photos, a logo pack — or do I build
  everything from code and tokens?
- **How much am I allowed to change?** Is this a polish pass on the existing design, or may I
  restructure sections and propose a different layout? *(Default assumption until told
  otherwise: polish and fix, propose anything structural before building it.)*
- **Is there a deadline, and is it tied to an event?**

### Ask Tarun — the bots

- **Exactly what does the follow-up send, and over what period?** The page currently says
  "3-day follow-up campaigns" and our own docs describe it three different ways. (W-07)
- **Is the Telegram bot fully live, or still migrating?** The page treats WhatsApp and Telegram
  as equal. (W-08)
- **Which languages are genuinely supported for card extraction today?** The page claims Hindi,
  Gujarati and Marathi.

### Ask Aryan — the app and the profile

- **Is `profile.rizely.net` going to be fixed, and roughly when?** It changes whether this site
  ever links to it.
- **Are there dashboard screenshots I can use that contain no real customer data?** Everything
  captured so far has real names and emails in it.

### Open an Issue on this repo — anything code, build or deploy

Branch problems, a build that fails, a dependency you want to add, a deploy that drops the edge
function. Use an Issue so there is a record, not a chat message.

---

## 3. Things you will be tempted to guess. Do not.

If you find yourself about to write any of these onto the page from your own judgement, stop and
ask instead:

- **A number.** Any number — a percentage, a count, a time saved, a rupee figure. Every invented
  number on the live site today got there this way, and one of them is a legal exposure.
- **A customer name or quote.** There are three fabricated ones live on rizely.net right now.
- **A feature that "obviously" exists** — badge scanning, QR capture, a CRM integration, an iOS
  app. None of those are real today.
- **A date or a roadmap commitment.** "Coming in January" is a promise we have not made.
- **A price**, or whether something includes GST.
- **Whether something is live or roadmap.** When in doubt it is roadmap, and it is labelled.

The rule underneath all six: **if it is not in this handoff folder or visibly true in the
product, it does not go on the page.**
