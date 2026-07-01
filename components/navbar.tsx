"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#setups", label: "Setups" },
  { href: "#media", label: "Media" },
  { href: "#dates", label: "Gigs" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMobileMenuOpen(false);
    
    if (isHomepage && href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleBookUsClick = () => {
    setIsMobileMenuOpen(false);
    const elem = document.getElementById("contact");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    } else if (!isHomepage) {
      window.location.href = "/#contact";
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
          isScrolled
            ? "bg-[#0B0B0C]/80 backdrop-blur-md border-b border-white/5 py-4 shadow-lg"
            : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center space-x-2">
            <span className="font-serif text-2xl md:text-3xl font-bold tracking-wider text-white">
              THE BOWTIES
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={isHomepage ? link.href : `/${link.href}`}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-sans tracking-wide text-[#A0A0A5] hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            {!isHomepage && (
              <Link
                href="/repertoire"
                className={cn(
                  "text-sm font-sans tracking-wide transition-colors",
                  pathname === "/repertoire" ? "text-gold" : "text-[#A0A0A5] hover:text-white"
                )}
              >
                Repertoire
              </Link>
            )}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="outline" size="sm" onClick={handleBookUsClick}>
              Book Us
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-gold p-2 transition-colors cursor-pointer"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-0 z-40 bg-[#0B0B0C] border-b border-white/5 pt-24 pb-10 px-8 flex flex-col md:hidden shadow-2xl glass"
          >
            <div className="flex flex-col space-y-6 text-center">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={isHomepage ? link.href : `/${link.href}`}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-lg font-sans tracking-widest text-[#A0A0A5] hover:text-white transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/repertoire"
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "text-lg font-sans tracking-widest transition-colors py-2",
                  pathname === "/repertoire" ? "text-gold" : "text-[#A0A0A5] hover:text-white"
                )}
              >
                Full Repertoire
              </Link>
              <div className="pt-4">
                <Button variant="primary" className="w-full" onClick={handleBookUsClick}>
                  Book Us
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
