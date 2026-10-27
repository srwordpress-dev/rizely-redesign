// Renderer for Strapi 5 "blocks" rich-text JSON. No external dependency.
// Covers the blocks a blog post actually uses: paragraph, headings, lists,
// quote, code, image, and the inline text/link marks. Swap for
// @strapi/blocks-react-renderer if full block coverage is ever needed.
//
// It emits bare elements and leaves every style to `.blog-prose` in
// app/globals.css, the same stylesheet the raw-HTML (`contentHtml`) path uses,
// so a post reads the same whichever way it was written. Colours there come
// from the design tokens, so the blog follows the palette if the accent moves.
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
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {renderInline(node.children)}
        </Link>
      );
    }
    let el: React.ReactNode = node.text ?? "";
    if (node.bold) el = <strong>{el}</strong>;
    if (node.italic) el = <em>{el}</em>;
    if (node.underline) el = <u>{el}</u>;
    if (node.strikethrough) el = <s>{el}</s>;
    if (node.code) el = <code>{el}</code>;
    return <Fragment key={i}>{el}</Fragment>;
  });
}

export default function BlocksRenderer({ content }: { content: unknown }) {
  if (!Array.isArray(content)) return null;
  const blocks = content as Block[];

  return (
    <>
      {blocks.map((block, i) => {
        const children = block.children as InlineNode[];

        switch (block.type) {
          case "paragraph": {
            // Strapi emits an empty paragraph for a blank line; skip it.
            if (!inlineText(children).trim()) return null;
            return <p key={i}>{renderInline(children)}</p>;
          }

          case "heading": {
            const lvl = (block.level as number) ?? 2;
            const id = slugifyHeading(inlineText(children));
            const Tag = (lvl <= 2 ? "h2" : lvl === 3 ? "h3" : "h4") as "h2";
            return (
              <Tag key={i} id={id}>
                {renderInline(children)}
              </Tag>
            );
          }

          case "list": {
            const ListTag = block.format === "ordered" ? "ol" : "ul";
            const items = (block.children as { children?: InlineNode[] }[]) ?? [];
            return (
              <ListTag key={i}>
                {items.map((li, j) => (
                  <li key={j}>{renderInline(li.children)}</li>
                ))}
              </ListTag>
            );
          }

          case "quote":
            return <blockquote key={i}>{renderInline(children)}</blockquote>;

          case "code":
            return (
              <pre key={i}>
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
              <figure key={i}>
                {/* Plain img: images are unoptimized on this static export, so
                    next/image would add markup without adding anything. */}
                <img
                  src={src}
                  alt={img?.alternativeText ?? ""}
                  width={img?.width}
                  height={img?.height}
                  loading="lazy"
                />
                {img?.alternativeText ? (
                  <figcaption>{img.alternativeText}</figcaption>
                ) : null}
              </figure>
            );
          }

          default:
            return null;
        }
      })}
    </>
  );
}
