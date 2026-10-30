// Blog posts that are live and listed on /blogs but must not be indexed yet:
// their page carries robots noindex, nofollow and they are left out of
// sitemap.xml. Remove a slug only on Ankush's word, then rebuild.
export const NOINDEX_SLUGS: ReadonlySet<string> = new Set([
  "best-nfc-business-cards-india",
]);

export function isNoindexSlug(slug: string): boolean {
  return NOINDEX_SLUGS.has(slug);
}
