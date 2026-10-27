import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/site";

// Static export writes this as 404.html, so it also catches mistyped URLs and
// removed blog posts on the live site, not only notFound() calls.
export const metadata: Metadata = {
  title: `Page not found — ${BRAND}`,
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="flex flex-col min-h-dvh">
      <section className="w-full max-w-2xl mx-auto px-4 md:px-8 pt-24 pb-28 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">404</p>
        <h1 className="mt-3 text-3xl font-heading font-bold sm:text-4xl tracking-tight">
          That page isn&apos;t here.
        </h1>
        <p className="mt-4 text-muted-foreground text-lg">
          The link may be old, or the post may have moved.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="h-12 px-6">
            <Link href="/">Back to Rizely</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 px-6">
            <Link href="/blogs">Read the blog</Link>
          </Button>
        </div>
      </section>
      <Footer />
    </main>
  );
}
