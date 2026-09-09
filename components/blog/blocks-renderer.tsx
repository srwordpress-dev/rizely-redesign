// Renderer for Strapi 5 "blocks" rich-text JSON. No external dependency.
// Covers the blocks a blog post actually uses: paragraph, headings, lists,
// quote, code, image, and the inline text/link marks. Swap for
// @strapi/blocks-react-renderer if full block coverage is ever needed.
//
// Colours come from the design tokens (text-foreground, text-primary, ...)
// rather than hardcoded hex, unlike FameNinja's version. The accent on this
// site has already changed once, and tokens mean the blog follows the palette
// instead of having to be found and edited again.
import Link from "next/link";
import { Fragment } from "react";
import { slugifyHeading, mediaUrl } from "@/lib/strapi";

type TextNode = {
  type: "text";
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
};

type LinkNode = { type: "link"; url: string; children: TextNode[] };
type InlineNode = TextNode | LinkNode;
type Block = { type: string; [key: string]: unknown };

function inlineText(nodes: InlineNode[] = []): string {
  return nodes
    .map((n) => (n.type === "link" ? inlineText(n.children) : (n as TextNode).text ?? ""))
    .join("");
}

function renderInline(nodes: InlineNode[] = []) {
  return nodes.map((node, i) => {
    if (node.type === "link") {
      const external = /^https?:\/\//i.test(node.url);
      return (
        <Link
          key={i}
          href={node.url}
          className="text-primary underline underline-offset-4 hover:no-underline"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {renderInline(node.children)}
        </Link>
      );
    }
    let el: React.ReactNode = node.text ?? "";
    if (node.bold) el = <strong className="font-semibold text-foreground">{el}</strong>;
    if (node.italic) el = <em>{el}</em>;
    if (node.underline) el = <u>{el}</u>;
    if (node.strikethrough) el = <s>{el}</s>;
    if (node.code)
      el = (
        <code className="rounded border border-border bg-card px-1.5 py-0.5 text-[0.85em]">
          {el}
        </code>
      );
    return <Fragment key={i}>{el}</Fragment>;
  });
}

export default function BlocksRenderer({ content }: { content: unknown }) {
  if (!Array.isArray(content)) return null;
  const blocks = content as Block[];

  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, i) => {
        const children = block.children as InlineNode[];

        switch (block.type) {
          case "paragraph": {
            // Strapi emits an empty paragraph for a blank line; skip it.
            if (!inlineText(children).trim()) return null;
            return (
              <p key={i} className="text-base leading-relaxed text-muted-foreground">
                {renderInline(children)}
              </p>
            );
          }

          case "heading": {
            const lvl = (block.level as number) ?? 2;
            const id = slugifyHeading(inlineText(children));
            const Tag = (lvl <= 2 ? "h2" : lvl === 3 ? "h3" : "h4") as "h2";
            const size =
              lvl <= 2 ? "text-2xl mt-6" : lvl === 3 ? "text-xl mt-4" : "text-lg mt-2";
            return (
              <Tag
                key={i}
                id={id}
                className={`${size} scroll-mt-24 font-semibold tracking-tight text-foreground`}
              >
                {renderInline(children)}
              </Tag>
            );
          }

          case "list": {
            const ordered = block.format === "ordered";
            const ListTag = ordered ? "ol" : "ul";
            const items = (block.children as { children?: InlineNode[] }[]) ?? [];
            return (
              <ListTag
                key={i}
                className={`${ordered ? "list-decimal" : "list-disc"} flex flex-col gap-2 pl-6 text-base leading-relaxed text-muted-foreground marker:text-primary`}
              >
                {items.map((li, j) => (
                  <li key={j}>{renderInline(li.children)}</li>
                ))}
              </ListTag>
            );
          }

          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-2 border-primary bg-card/50 px-5 py-4 text-base leading-relaxed text-foreground"
              >
                {renderInline(children)}
              </blockquote>
            );

          case "code":
            return (
              <pre
                key={i}
                className="overflow-x-auto rounded-lg border border-border bg-card p-4 text-sm leading-relaxed"
              >
                <code>{inlineText(children)}</code>
              </pre>
            );

          case "image": {
            const img = block.image as
              | { url?: string; alternativeText?: string | null; width?: number; height?: number }
              | undefined;
            const src = mediaUrl(img?.url);
            if (!src) return null;
            return (
              <figure key={i} className="flex flex-col gap-2">
                {/* Plain img: images are unoptimized on this static export, so
                    next/image would add markup without adding anything. */}
                <img
                  src={src}
                  alt={img?.alternativeText ?? ""}
                  width={img?.width}
                  height={img?.height}
                  className="h-auto w-full rounded-lg border border-border"
                  loading="lazy"
                />
                {img?.alternativeText ? (
                  <figcaption className="text-sm text-muted-foreground">
                    {img.alternativeText}
                  </figcaption>
                ) : null}
              </figure>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
}
