import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getArticles, articleDate } from "@/lib/strapi";

// Replaces the hand-written public/sitemap.xml, which could not list blog
// posts. /lab and /hero-anim are deliberately absent — both are noindex
// internal previews. Next writes this out as a static sitemap.xml at build time, so it
// works on the static export — and it is regenerated on every rebuild, which
// is the same trigger that publishes a post.
// The Strapi fetch below makes this route look dynamic to Next, which
// `output: "export"` refuses to build. It genuinely is static — the fetch runs
// once at build time — so say so explicitly.
export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/agents`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/connect`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blogs`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const posts = await getArticles();
  const postRoutes: MetadataRoute.Sitemap = posts
    .filter((p) => p.slug)
    .map((p) => {
      const date = p.updatedAt ?? articleDate(p);
      return {
        url: `${SITE_URL}/blogs/${p.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.6,
        ...(date ? { lastModified: new Date(date) } : {}),
      };
    });

  return [...staticRoutes, ...postRoutes];
}
