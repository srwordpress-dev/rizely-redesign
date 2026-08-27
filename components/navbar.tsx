"use client";

import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND, WHATSAPP_URL } from "@/lib/site";

const menuItems = [
  { name: "How it works", href: "#how" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
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
          <div className="flex sm:hidden">
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
                {isMenuOpen ? <Cross1Icon /> : <HamburgerMenuIcon />}
              </motion.div>
            </Button>
          </div>

          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 sm:static sm:translate-x-0 font-medium tracking-tighter text-xl sm:text-2xl"
          >
            {BRAND}
            <span className="text-primary">.</span>
          </Link>

          <div className="hidden sm:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Button key={item.name} asChild variant="ghost" size="sm">
                <Link href={item.href}>{item.name}</Link>
              </Button>
            ))}
          </div>

          <div className="flex items-center">
            <Button asChild size="sm" className="hidden sm:flex">
              <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Start free on WhatsApp
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
              className="sm:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-4 space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button asChild size="sm" className="w-full mt-2">
                  <Link
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Start free on WhatsApp
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
            className="sm:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-background/80 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
    </>
  );
}
