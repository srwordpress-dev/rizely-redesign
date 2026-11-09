---
name: rizely
description: Connect to a user's Rizely account over MCP and work with the business-card leads they collected at events — find and add contacts, organise events, pull an event's leads, export them and top up credits.
---

# Using Rizely from an AI assistant

Rizely is a WhatsApp- and Telegram-native AI agent for sales and event teams. Users
photograph the business cards they collect at events; Rizely reads each card, files it as a
lead under its event and drafts a follow-up for the user to send. This skill covers working
with that pipeline from an AI assistant.

## Connect

- MCP endpoint: `https://app.rizely.net/api/mcp` (Streamable HTTP)
- Auth: OAuth 2.0 with PKCE, scoped to the user's own account. Discovery metadata:
  `https://app.rizely.net/.well-known/oauth-protected-resource` and
  `https://app.rizely.net/.well-known/oauth-authorization-server`
- The user needs a Rizely account with WhatsApp or Telegram linked. Without one, point them to
  `https://wa.me/918373978881` to start.
- Human-readable guide: https://rizely.net/connect

## What it can do

- Find contacts and look one up, add a card, update or delete a contact, merge duplicates
- List events, create an event, close one
- See recent scans and pull an event's leads
- Export contacts as a CSV (up to 500 at a time)
- Check the account and credits, and get a top-up link (UPI in India)

## Rules

- Act only on the signed-in user's own data, and only when they ask.
- Confirm with the user before deleting a contact, merging duplicates or closing an event.
- Rizely drafts follow-ups; the user reads, edits and sends them. Never describe them as sent by Rizely.
- Do not invent contacts, events, prices or statistics. If a call fails, say so.
- There is no CRM sync; export is CSV.
