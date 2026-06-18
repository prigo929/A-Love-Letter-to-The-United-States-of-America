"use client";

import { useState, useEffect, useRef } from "react";
import { List, X, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface TOCItem {
  label: string;
  href: string;
}

interface FloatingTOCProps {
  items: readonly TOCItem[] | TOCItem[];
}

export function FloatingTOC({ items }: FloatingTOCProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const { locale } = useLanguage();

  const copy =
    locale === "ro"
      ? {
          buttonLabel: "Cuprins",
          closeLabel: "Închide",
          sectionAriaLabel: "Navigare rapidă prin secțiunile paginii",
        }
      : {
          buttonLabel: "Contents",
          closeLabel: "Close",
          sectionAriaLabel: "Quick page section navigation",
        };

  // ── Scroll-spy with IntersectionObserver ──────────────────────────────────
  useEffect(() => {
    const observerOptions = {
      root: null, // viewport
      rootMargin: "-20% 0px -60% 0px", // triggers when section is in the upper middle
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      // Find the entry that is currently intersecting
      const visibleEntry = entries.find((entry) => entry.isIntersecting);
      if (visibleEntry) {
        setActiveSection(`#${visibleEntry.target.id}`);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe all target sections
    items.forEach((item) => {
      const id = item.href.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [items]);

  // ── Close on click outside or Escape ──────────────────────────────────────
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 90; // offset for the sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsOpen(false);
      setActiveSection(href);
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-8 left-8 z-45 flex flex-col items-start font-body"
      role="navigation"
      aria-label={copy.sectionAriaLabel}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mb-4 w-72 max-h-[60vh] overflow-y-auto rounded-2xl border border-white/10 bg-black/90 p-5 shadow-2xl backdrop-blur-glass scrollbar-thin"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-glory-gold">
                <Compass className="h-4 w-4" />
                {copy.buttonLabel}
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                aria-label={copy.closeLabel}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <ul className="space-y-1">
              {items.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => handleScrollToSection(e, item.href)}
                      className={cn(
                        "block py-1.5 px-3 rounded-lg text-sm text-white/60 transition-all hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-glory-gold relative overflow-hidden",
                        isActive && "text-glory-gold font-semibold bg-glory-gold/5"
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="tocActiveIndicator"
                          className="absolute left-0 top-0 bottom-0 w-0.5 bg-glory-gold"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className={cn(isActive && "pl-1.5")}>{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-12 items-center gap-2 rounded-full border border-white/15 bg-navy-dark/80 px-4 text-sm font-semibold text-white/90 shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-navy-light/90 hover:text-white hover:border-glory-gold/45 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glory-gold",
          isOpen && "border-glory-gold/50 text-glory-gold"
        )}
        aria-expanded={isOpen}
        aria-label={copy.buttonLabel}
      >
        <List className="h-5 w-5" />
        <span className="hidden sm:inline">{copy.buttonLabel}</span>
      </button>
    </div>
  );
}
