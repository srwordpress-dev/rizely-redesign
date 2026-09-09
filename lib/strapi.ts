// Strapi data layer for the Rizely blog. Mirrors fameninja-web/lib/strapi.ts,
// adapted for this site being a Next.js static export.
//
// Two differences from FameNinja, both forced by `output: "export"`:
//   * No `next: { revalidate }`. There is no server at request time, so every
//     fetch here runs once at build time. New posts appear when the site
//     rebuilds — see the Strapi webhook -> Netlify build hook in docs/BLOG.md.
//   * No draft fetch. A preview route would need per-request rendering, so
//     Content Preview is disabled in rizely-cms too.
//
// Every fetch fails soft: on any error (Strapi down, not deployed yet, network)
// it returns empty/null so the build is never blocked and the rest of the site
// still ships. An empty blog is recoverable; a failed deploy is not.

const STRAPI_URL = (process.env.STRAPI_URL || "http://localhost:1337").replace(/\/$/, "");
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN; // optional — public reads work without it

export type StrapiImage = {
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
};

export type Author = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  role?: string | null;
  bio?: string | null;
  linkedin?: string | null;
  order?: number | null;
  avatar?: StrapiImage | null;
};

export type Faq = { id?: number; question: string; answer: string };

export type Article = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: unknown; // Strapi "blocks" JSON — rendered by <BlocksRenderer>
  /**
   * Raw HTML escape hatch. The blocks format has no table node, so posts that
   * need tables (or migrated HTML) set this instead. When present it wins over
   * `content` and is rendered verbatim.
   */
  contentHtml?: string | null;
  cover?: StrapiImage | null;
  author?: string | null; // plain byline fallback
  authorAvatar?: StrapiImage | null;
  authorProfile?: Author | null; // preferred — drives the author box
  category?: string | null;
  tags?: string | null; // comma-separated
  faqs?: Faq[] | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  publishedDate?: string | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
};

/** The date to show readers: the editorial date if set, else Strapi's. */
export function articleDate(a: Article): string | null {
  return a.publishedDate || a.publishedAt || null;
}

export function formatDate(iso?: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

/** Stable heading ids so post headings can be deep-linked. */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function parseTags(tags?: string | null): string[] {
  if (!tags) return [];
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

/** Rough reading time in minutes, from blocks or raw HTML. */
export function readingTime(a: Article): number {
  let words = 0;
  if (a.contentHtml) {
    words = a.contentHtml.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  } else if (Array.isArray(a.content)) {
    const walk = (nodes: unknown[]): void => {
      for (const n of nodes) {
        if (!n || typeof n !== "object") continue;
        const node = n as { text?: string; children?: unknown[] };
        if (typeof node.text === "string") words += node.text.split(/\s+/).filter(Boolean).length;
        if (Array.isArray(node.children)) walk(node.children);
      }
    };
    walk(a.content as unknown[]);
  }
  return Math.max(1, Math.round(words / 200));
}

/** Strapi returns relative media URLs for the local provider; Cloudinary is absolute. */
export function mediaUrl(url?: string | null): string | null {
  if (!url) return null;
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

function authHeaders(): Record<string, string> {
  return STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {};
}

async function strapiFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${STRAPI_URL}${path}`, { headers: authHeaders() });
    if (!res.ok) {
      console.warn(`[strapi] ${res.status} for ${path} — rendering without it`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.warn(`[strapi] unreachable at ${STRAPI_URL} — rendering without it`, err);
    return null;
  }
}

type ListResponse<T> = { data: T[] };

// Deep populate: cover + faqs + the author record and its avatar.
const ARTICLE_POPULATE =
  "populate[cover]=true&populate[authorAvatar]=true&populate[faqs]=true" +
  "&populate[authorProfile][populate][avatar]=true";

export async function getArticles(): Promise<Article[]> {
  const json = await strapiFetch<ListResponse<Article>>(
    `/api/articles?${ARTICLE_POPULATE}&sort=publishedDate:desc&pagination[pageSize]=100`
  );
  return json?.data ?? [];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const json = await strapiFetch<ListResponse<Article>>(
    `/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&${ARTICLE_POPULATE}`
  );
  return json?.data?.[0] ?? null;
}

export async function getAuthors(): Promise<Author[]> {
  const json = await strapiFetch<ListResponse<Author>>(
    "/api/authors?populate[avatar]=true&sort=order:asc&pagination[pageSize]=100"
  );
  return json?.data ?? [];
}
