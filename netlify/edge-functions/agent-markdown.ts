import type { Config, Context } from "@netlify/edge-functions";

/*
  Markdown for agents (content negotiation).

  A request that prefers `Accept: text/markdown` gets the page's Markdown twin
  (/markdown/<page>.md, written at build time by scripts/build-markdown.mjs). Every
  other request — browsers, Google — passes straight through to the HTML, so
  people see no difference.

  Named "agent-…" so it sorts before geo-currency and answers first; the
  currency function only rewrites text/html, so it leaves Markdown alone.
*/

function wantsMarkdown(accept: string | null): boolean {
  if (!accept) return false;
  return accept.split(",").some((part) => {
    const [type, ...params] = part.trim().toLowerCase().split(";");
    if (type !== "text/markdown") return false;
    const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
    return !q || Number(q.slice(2)) > 0;
  });
}

function markdownPath(pathname: string): string {
  const clean = pathname.replace(/\/+$/, "");
  return clean === "" ? "/markdown/index.md" : `/markdown${clean}.md`;
}

export default async (request: Request, context: Context) => {
  if (!wantsMarkdown(request.headers.get("accept"))) return;

  const url = new URL(request.url);
  const md = await fetch(new URL(markdownPath(url.pathname), url.origin));
  // No Markdown twin for this path: fall back to the normal response.
  if (!md.ok) return context.next();

  const text = await md.text();
  return new Response(text, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
      // Rough count (about 4 characters per token), as Cloudflare's version reports.
      "x-markdown-tokens": String(Math.ceil(text.length / 4)),
      "Cache-Control": "public, max-age=0, must-revalidate",
      "Content-Signal": "search=yes, ai-input=yes, ai-train=yes",
    },
  });
};

export const config: Config = {
  path: "/*",
  excludedPath: ["/_next/*", "/.well-known/*", "/*.*"],
  onError: "bypass",
};
