// Writes a Markdown twin of every page in out/ into out/markdown/
// (out/agents.html -> out/markdown/agents.md), which
// netlify/edge-functions/agent-markdown.ts serves to clients that send
// `Accept: text/markdown`. Runs after `next build` (npm "postbuild").
// The twins live in their own folder so /agents.md is never mistaken for an
// AGENTS.md instructions file.
//
// Only the page's <main> content is kept: no nav, footer, scripts or canvases.
// Both price sets are in the HTML (CSS hides one per visitor), so each price is
// labelled with its market instead of being shown twice without context.
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { parse } from "node-html-parser";
import { NodeHtmlMarkdown } from "node-html-markdown";

const OUT = "out";
const MD_DIR = path.join(OUT, "markdown");
const SITE = "https://rizely.net";
// Not pages a reader or agent should get: error pages, prototypes, verification.
const SKIP = [/^404\.html$/, /^_not-found\.html$/, /^lab/, /^hero-anim/, /^google[0-9a-f]+\.html$/, /^__/];

const nhm = new NodeHtmlMarkdown({ bulletMarker: "-", codeBlockStyle: "fenced" });

async function htmlFiles(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(OUT, full).split(path.sep).join("/");
    if (SKIP.some((re) => re.test(rel))) continue;
    if (entry.isDirectory()) {
      if (!entry.name.startsWith("_") && !entry.name.startsWith(".")) found.push(...(await htmlFiles(full)));
    } else if (entry.name.endsWith(".html")) {
      found.push(full);
    }
  }
  return found;
}

function urlFor(file) {
  const rel = path.relative(OUT, file).split(path.sep).join("/").replace(/\.html$/, "");
  return rel === "index" ? `${SITE}/` : `${SITE}/${rel}`;
}

function toMarkdown(html, url) {
  const doc = parse(html, { comment: false });
  const title = doc.querySelector("title")?.text.trim() ?? "";
  const description = doc.querySelector('meta[name="description"]')?.getAttribute("content") ?? "";
  // A page held out of search (lib/noindex.ts) gets no twin, so agents fall
  // back to the HTML, which carries the noindex.
  const robots = doc.querySelector('meta[name="robots"]')?.getAttribute("content") ?? "";
  if (/noindex/i.test(robots)) return null;
  const main = doc.querySelector("main") ?? doc.querySelector("body");
  if (!main) return null;

  // Decoration and the chat demo's phone mock-ups (timestamps, typing bars):
  // the demo's step list stays, the fake chat screens go.
  main
    .querySelectorAll("script, style, noscript, svg, canvas, iframe, nav, footer, [aria-hidden='true'], .cpc-chat .phones")
    .forEach((n) => n.remove());
  // Links with no text (e.g. the rotating card button, filled in by JS).
  main.querySelectorAll("a").forEach((a) => { if (!a.text.trim()) a.remove(); });
  main.querySelectorAll('[data-price="inr"]').forEach((n) => {
    n.set_content(`${n.innerHTML} (India)`);
    if (n.nextElementSibling?.getAttribute("data-price") === "usd") n.insertAdjacentHTML("afterend", " / ");
  });
  main.querySelectorAll('[data-price="usd"]').forEach((n) => n.set_content(`${n.innerHTML} (outside India)`));
  // Flex rows of chips and buttons have no whitespace between items, so the
  // text would run together ("…languagesFollow-ups…"). Separate siblings.
  main.querySelectorAll("*").forEach((el) => {
    const next = el.nextSibling;
    if (next && next.nodeType === 1) el.insertAdjacentHTML("afterend", " ");
  });

  const body = nhm
    .translate(main.innerHTML)
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  const front = [
    "---",
    `title: ${JSON.stringify(title)}`,
    description && `description: ${JSON.stringify(description)}`,
    `url: ${url}`,
    "---",
  ].filter(Boolean).join("\n");
  return `${front}\n\n${body}\n`;
}

let count = 0;
for (const file of await htmlFiles(OUT)) {
  const md = toMarkdown(await readFile(file, "utf8"), urlFor(file));
  if (!md) continue;
  const target = path.join(MD_DIR, path.relative(OUT, file).replace(/\.html$/, ".md"));
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, md, "utf8");
  count++;
}
console.log(`[markdown] wrote ${count} Markdown pages for agents`);
