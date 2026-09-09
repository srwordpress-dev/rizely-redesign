import Image from "next/image";
import { BRAND } from "@/lib/site";

/* The Rizely wordmark, recoloured from the supplied purple to the site accent
 * #C2703F. The site renders dark-only (forcedTheme in app/providers.tsx), so this
 * uses the light-on-dark variant: the mark is white, because as supplied it is
 * black and disappears on the near-black background. public/rizely-logo.png is the
 * same wordmark with the black mark, for light backgrounds. The type is the same
 * terracotta in both. */
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
