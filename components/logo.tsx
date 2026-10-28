import Image from "next/image";
import { BRAND } from "@/lib/site";

/**
 * Rizely wordmark: the supplied dark-background artwork (white "R", terracotta
 * "izely"), public/rizely-logo-dark.png, 200×58. The site is dark-only, so this
 * is the one variant; public/rizely-logo.png is the light-background version.
 * Size it by height; the width follows the artwork.
 */
export function RizelyLogo({
  className = "h-7 w-auto",
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
      className={`shrink-0 ${className}`}
    />
  );
}
