"use client";

import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DASHBOARD_URL, WHATSAPP_URL } from "@/lib/site";
import { RizelyLogo } from "@/components/logo";

// Absolute hrefs, not bare "#how": these render on /blogs and /privacy too,
// where a bare hash would resolve to /blogs#how and go nowhere.
const menuItems = [
  { name: "How it works", href: "/#how" },
  { name: "Agents", href: "/agents" },
  { name: "Connect", href: "/connect" },
  { name: "Pricing", href: "/#pricing" },
  { name: "FAQ", href: "/#faq" },
  // Kept from main: the blog is live and already linked from rizely.net, so
  // dropping it here would orphan published posts.
  { name: "Blog", href: "/blogs" },
];

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showNavbarBlur = isScrolled || isMenuOpen;

  return (
    <>
    <nav
      className={`sticky top-0 z-50 w-full transition-[background-color,backdrop-filter,border-color] duration-300 ease-out ${
        isMenuOpen
          ? "backdrop-blur bg-background/95 supports-backdrop-filter:bg-background/90 border-b border-border/60"
          : showNavbarBlur
          ? "backdrop-blur supports-backdrop-filter:bg-background/70 border-b border-border/60"
          : "backdrop-blur-0 supports-backdrop-filter:bg-background/0 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between items-center h-16">
          <div className="flex lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {isMenuOpen ? (
                  <Cross1Icon aria-hidden="true" />
                ) : (
                  <HamburgerMenuIcon aria-hidden="true" />
                )}
              </motion.div>
            </Button>
          </div>

          {/* Below lg the hamburger sits left and the right slot is empty, so
              justify-between left the logo off centre. Pin it to the middle there;
              from lg up it rejoins the flex row. shrink-0 so a crowded row can
              never squeeze it to 0px (W-30). */}
          <Link
            href="/"
            aria-label="Rizely home"
            className="absolute left-1/2 -translate-x-1/2 shrink-0 lg:static lg:translate-x-0"
          >
            <RizelyLogo priority />
          </Link>

          {/* Logo + six links + the CTA need roughly 900px, so the full row starts at
              lg (1024px); below that it is the hamburger menu (W-30). */}
          <div className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Button key={item.name} asChild variant="ghost" size="sm">
                <Link href={item.href}>{item.name}</Link>
              </Button>
            ))}
          </div>

          <div className="flex items-center">
            <Button asChild size="sm" className="hidden lg:flex">
              <Link href={DASHBOARD_URL} target="_blank" rel="noopener noreferrer">
                Open your dashboard
              </Link>
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-4 space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex min-h-11 items-center px-3 py-2 text-base font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                {/* The menu shows below lg. Its CTA follows the hero (hero.tsx): WhatsApp on
                    phones (under 640px), the dashboard on tablets. */}
                <Button asChild size="sm" className="w-full mt-2 sm:hidden">
                  <Link
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Start free on WhatsApp
                  </Link>
                </Button>
                <Button asChild size="sm" className="w-full mt-2 hidden sm:flex">
                  <Link
                    href={DASHBOARD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Open your dashboard
                  </Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>

      {/* Dimming backdrop behind the open mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={() => setIsMenuOpen(false)}
            aria-hidden
            className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-background/80 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
    </>
  );
}
