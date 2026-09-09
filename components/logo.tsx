import Image from "next/image";
import { BRAND } from "@/lib/site";

/* The Rizely wordmark. The site renders dark-only (forcedTheme in app/providers.tsx),
 * so this uses the light-on-dark variant — the artwork as supplied has a black mark
 * that disappears on the near-black background. public/rizely-logo.png keeps the
 * original for light backgrounds. Only the black glyph differs; the brand purple
 * is identical in both. */
export default function Logo({
  className = "h-6 w-auto",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/rizely-logo-dark.png"
      alt={BRAND}
      width={200}
      height={58}
      priority={priority}
      className={className}
    />
  );
}
