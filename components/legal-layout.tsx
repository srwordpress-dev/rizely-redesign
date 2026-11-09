import Link from "next/link";
import Footer from "@/components/footer";

export default function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col min-h-dvh">
      <article className="w-full max-w-3xl mx-auto px-4 md:px-8 pt-16 pb-24">
        <Link
          href="/"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to Rizely
        </Link>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {updated}</p>
        <div className="mt-5 rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
          <strong className="text-foreground">Draft for review.</strong> This is a starting
          template written for Rizely&apos;s current product. Please have it reviewed by legal
          counsel before you rely on it.
        </div>
        <div className="legal-prose mt-8 space-y-4 text-muted-foreground">{children}</div>
      </article>
      <Footer />
    </main>
  );
}
