import Image from "next/image";
import { BRAND } from "@/lib/site";

/**
 * Rizely wordmark for the light site: public/rizely-logo.png (black "R",
 * terracotta "izely"), 200×58. public/rizely-logo-dark.png is the version for
 * dark backgrounds. Size it by height; the width follows the artwork.
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
      src="/rizely-logo.png"
      alt={BRAND}
      width={200}
      height={58}
      priority={priority}
      className={`shrink-0 ${className}`}
    />
  );
}
