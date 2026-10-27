// The homepage FAQ. One list, read by both the FAQ section (components/faq.tsx) and the
// FAQPage JSON-LD (components/structured-data.tsx), so what Google indexes is word for word
// what the page shows. Answers are plain strings for that reason.
export const faqs = [
  {
    q: "What does Rizely actually do right now?",
    a: "Rizely Cards is live: photograph a business card in WhatsApp or Telegram, and it reads the card, files the lead into your pipeline, and drafts a personalised follow-up ready to send. The other agents on this page are on the roadmap — we'll say clearly when each one ships.",
  },
  {
    q: "Do I need to download an app?",
    a: "No. Rizely Cards lives inside WhatsApp and Telegram — apps already open on your phone. Nothing to install, nothing for your leads to install either. (A companion mobile app is in the works, but you'll never be forced onto it to get value.)",
  },
  {
    q: "Will it read a Hindi or Gujarati card, or only English?",
    a: "Indian-language cards too — Hindi, Gujarati and Marathi, not just English. It's not magic: a badly printed or coffee-stained card can still trip it up, and when it's unsure it flags the lead for a quick human check rather than guessing.",
  },
  {
    q: "Does it send the follow-ups on its own, or do I approve them first?",
    a: "You're in control. You review and approve the first batch so it sounds like you, not a robot. After that you can let it run automatically, or keep approving each batch — your call, changeable any time.",
  },
  {
    q: "What happens after the 50 free scans?",
    a: "You move to an annual plan when you're ready, or buy a one-off Event Pass for a single show. Solo is around $79/year; in India it is ₹3,499/year ex-GST, with a GST invoice and UPI. Plans are annual rather than monthly because RBI e-mandates make monthly subscriptions genuinely painful in India. You won't be charged automatically the moment the free scans run out. (Plans are proposed and may change.)",
  },
  {
    q: "Do I need the card to use the agent, or the agent to use the card?",
    a: "Neither. They're two halves of the same problem and you can buy either one on its own. The card hands your details over; the agent works the cards you collected. Most people start with whichever one is hurting — the drawer full of cards, or spelling their email out across a loud hall.",
  },
  {
    q: "Is the profile really free, or free-for-now?",
    a: "Free — it comes with the card, there's no subscription to read it, and nobody has to install anything to open it. The paid thing is the follow-up agent, which is a separate decision you can make later or never.",
  },
  {
    q: "Do you ship the card outside India?",
    a: "The store is set up for India today — ₹599 including GST, free shipping over ₹999. If you want cards somewhere else, ask on WhatsApp and we'll tell you honestly whether we can do it yet rather than taking the order and hoping.",
  },
  {
    q: "Why annual plans and not monthly?",
    a: "Because of how recurring payments work in India. RBI e-mandates require a 24-hour pre-debit notice with an opt-out before every single charge, which turns a monthly subscription into a monthly chance to cancel — for you and for us. That's why annual pricing is the norm in India. If you don't want a year, the Event Pass covers one show.",
  },
  {
    q: "Whose data is it, and is it safe?",
    a: "The leads are yours — export them any time, no ransom fee to get your own data out. We're building to India's DPDP rules and only act on contacts you've actually collected with consent. We won't scrape lists or blast strangers on your behalf; that's not follow-up, that's spam.",
  },
  {
    q: "Is Rizely just a card scanner, or a whole platform?",
    a: "It's a platform of AI micro-agents — each owns one job. The Card Agent is live today (scan, file, follow up). Others, like the Keeper and the Reviews Agent, are on the roadmap. You turn on what you need and pay for what you use, rather than buying one bloated app.",
  },
  {
    q: "Can I use Rizely from Claude or ChatGPT?",
    a: "Yes — Rizely connects to Claude today (web, desktop and Code). You can add and find contacts, organise events, pull an event's leads, export leads and top up, all in plain language. ChatGPT is next. It's a window onto your pipeline, so you'll still need a Rizely account with WhatsApp or Telegram linked.",
  },
];
