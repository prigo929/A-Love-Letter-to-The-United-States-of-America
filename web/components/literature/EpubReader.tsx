"use client";

// ─── EpubReader: In-browser EPUB reader modal ───────────────────────────────
// Dynamically loads epub.js (client-only) and renders the selected book
// inside a full-screen modal with navigation, font-size, and theme controls.
//
// Security notes:
// - The EPUB URL is constructed exclusively from a validated filename in the
//   BOOK_DATABASE (allow-listed filenames). No user-controlled path is passed.
// - epub.js sandboxes book content inside an iframe (its default renderer);
//   no dangerouslySetInnerHTML is used in this component.
// - TODO(security): If user-uploaded EPUBs are ever supported, add server-side
//   magic-byte validation, content-type enforcement, and a strict CSP for the
//   reader iframe before exposing it.

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { BookItem } from "./BookShowcase";

interface EpubReaderProps {
  book: BookItem | null;
  onClose: () => void;
}

type Theme = "dark" | "sepia" | "light";

const THEMES: Record<Theme, { bg: string; fg: string; label: string }> = {
  dark: { bg: "#0d0d12", fg: "#e2d9c8", label: "Dark" },
  sepia: { bg: "#f5ede0", fg: "#3b2f20", label: "Sepia" },
  light: { bg: "#ffffff", fg: "#1a1a1a", label: "Light" },
};

export function EpubReader({ book, onClose }: EpubReaderProps) {
  const viewerRef = useRef<HTMLDivElement>(null);
  // We store the epub.js Book and Rendition in refs (not state) so React
  // re-renders don't accidentally destroy the rendition.
  const renditionRef = useRef<unknown>(null);
  const bookRef = useRef<unknown>(null);

  const [theme, setTheme] = useState<Theme>("dark");
  const [fontSize, setFontSize] = useState(100); // percent
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0); // 0–100
  const [chapterTitle, setChapterTitle] = useState<string>("");
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  // ── Destroy current rendition and book on unmount / book change ──────────
  const destroyBook = useCallback(() => {
    if (renditionRef.current) {
      try {
        (renditionRef.current as { destroy: () => void }).destroy();
      } catch {
        // ignore
      }
      renditionRef.current = null;
    }
    if (bookRef.current) {
      try {
        (bookRef.current as { destroy: () => void }).destroy();
      } catch {
        // ignore
      }
      bookRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!book || !viewerRef.current) return;

    setIsLoading(true);
    setError(null);
    setProgress(0);
    setChapterTitle("");
    setCanPrev(false);
    setCanNext(true);
    destroyBook();

    // Dynamic import keeps epub.js out of the server bundle entirely.
    let cancelled = false;

    (async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ePub = (await import("epubjs")).default as any;
        if (cancelled) return;

        // The filename is taken exclusively from our BOOK_DATABASE allow-list;
        // no path-traversal risk.
        const encodedFile = encodeURIComponent(book.fileName);
        const url = `/assets/books/${encodedFile}`;

        const epubBook = ePub(url);
        bookRef.current = epubBook;

        await epubBook.ready;
        if (cancelled) return;

        const rendition = epubBook.renderTo(viewerRef.current!, {
          width: "100%",
          height: "100%",
          spread: "none",
          flow: "paginated",
        });
        renditionRef.current = rendition;

        // Apply initial theme & font size
        applyThemeToRendition(rendition, theme, fontSize);

        // Display first page
        await rendition.display();
        if (cancelled) return;
        setIsLoading(false);

        // Track location changes for progress & chapter title
        rendition.on("locationChanged", (loc: unknown) => {
          const location = loc as {
            start: { percentage: number; displayed: { page: number; total: number } };
          };
          const pct = Math.round((location.start.percentage ?? 0) * 100);
          setProgress(pct);
          setCanPrev(pct > 0);

          // Try to resolve TOC item for this location
          epubBook.loaded.navigation.then((nav: unknown) => {
            const navigation = nav as { toc: Array<{ href: string; label: string }> };
            const item = navigation.toc?.find(
              (t) => t.href && location.start.percentage > 0
            );
            if (item) setChapterTitle(item.label?.trim() ?? "");
          }).catch(() => {});
        });

        rendition.on("rendered", () => {
          setCanNext(true);
        });
      } catch (err) {
        if (!cancelled) {
          setError("Failed to load this eBook. The file may not be available.");
          setIsLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
      destroyBook();
    };
    // We intentionally omit `theme` and `fontSize` here — those are applied
    // via separate effects below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book, destroyBook]);

  // ── Apply theme changes to an existing rendition ─────────────────────────
  useEffect(() => {
    if (renditionRef.current) {
      applyThemeToRendition(renditionRef.current, theme, fontSize);
    }
  }, [theme, fontSize]);

  // ── Keyboard navigation ───────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goNext();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goPrev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose]);

  // ── Lock body scroll while open ───────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  function goNext() {
    if (renditionRef.current) {
      (renditionRef.current as { next: () => Promise<void> }).next().catch(() => {
        setCanNext(false);
      });
    }
  }

  function goPrev() {
    if (canPrev && renditionRef.current) {
      (renditionRef.current as { prev: () => Promise<void> }).prev().catch(() => {});
    }
  }

  if (!book) return null;

  const t = THEMES[theme];

  return (
    <AnimatePresence>
      <motion.div
        key="reader-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[9999] flex flex-col"
        style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)" }}
        role="dialog"
        aria-modal="true"
        aria-label={`Reading: ${book.title}`}
      >
        {/* ── Top bar ───────────────────────────────────────────────────── */}
        <div
          className="flex items-center justify-between px-4 md:px-8 py-3 border-b shrink-0"
          style={{
            background: theme === "dark" ? "#0d0d12" : theme === "sepia" ? "#e8d9c4" : "#f0f0f0",
            borderColor: theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.12)",
          }}
        >
          {/* Left: title & chapter */}
          <div className="min-w-0 flex-1 mr-4">
            <p
              className="text-xs uppercase tracking-widest font-bold truncate"
              style={{ color: t.fg, opacity: 0.45 }}
            >
              {book.author} · {book.year}
            </p>
            <p
              className="text-sm font-semibold truncate"
              style={{ color: t.fg }}
            >
              {chapterTitle || book.title}
            </p>
          </div>

          {/* Center: theme switcher */}
          <div className="hidden md:flex items-center gap-1 rounded-full border px-1 py-1 mr-4"
            style={{ borderColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.15)" }}
          >
            {(Object.keys(THEMES) as Theme[]).map((t) => (
              <button
                key={t}
                id={`reader-theme-${t}`}
                onClick={() => setTheme(t)}
                className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-200"
                style={{
                  background: theme === t
                    ? (t === "dark" ? "#e8b923" : t === "sepia" ? "#c17f24" : "#3b3b3b")
                    : "transparent",
                  color: theme === t
                    ? (t === "dark" ? "#000" : "#fff")
                    : THEMES[theme].fg,
                  opacity: theme === t ? 1 : 0.5,
                }}
                aria-pressed={theme === t}
                aria-label={`Switch to ${THEMES[t].label} theme`}
              >
                {THEMES[t].label}
              </button>
            ))}
          </div>

          {/* Right: font size + close */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              id="reader-font-decrease"
              onClick={() => setFontSize((s) => Math.max(70, s - 10))}
              className="w-8 h-8 flex items-center justify-center rounded-full border text-sm font-bold transition-opacity hover:opacity-100 opacity-60"
              style={{ borderColor: theme === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.2)", color: t.fg }}
              aria-label="Decrease font size"
            >
              A−
            </button>
            <span className="text-xs tabular-nums w-8 text-center" style={{ color: t.fg, opacity: 0.5 }}>{fontSize}%</span>
            <button
              id="reader-font-increase"
              onClick={() => setFontSize((s) => Math.min(150, s + 10))}
              className="w-8 h-8 flex items-center justify-center rounded-full border text-sm font-bold transition-opacity hover:opacity-100 opacity-60"
              style={{ borderColor: theme === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.2)", color: t.fg }}
              aria-label="Increase font size"
            >
              A+
            </button>

            <div className="w-px h-5 mx-1" style={{ background: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.15)" }} />

            <button
              id="reader-close"
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full border transition-colors duration-200 hover:bg-red-600 hover:border-red-600 hover:text-white"
              style={{ borderColor: theme === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.2)", color: t.fg }}
              aria-label="Close reader"
            >
              ✕
            </button>
          </div>
        </div>

        {/* ── Progress bar ──────────────────────────────────────────────── */}
        <div
          className="h-0.5 shrink-0 transition-all duration-500"
          style={{ background: theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)" }}
        >
          <div
            className="h-full transition-all duration-500"
            style={{ width: `${progress}%`, background: "#e8b923" }}
          />
        </div>

        {/* ── Book viewport ─────────────────────────────────────────────── */}
        <div className="flex-1 relative overflow-hidden flex items-stretch" style={{ background: t.bg }}>
          {/* Prev page button */}
          <button
            id="reader-prev"
            onClick={goPrev}
            disabled={!canPrev}
            className="absolute left-0 top-0 bottom-0 z-10 w-14 md:w-20 flex items-center justify-center transition-opacity duration-200 disabled:opacity-0"
            style={{ color: t.fg, opacity: canPrev ? 0.35 : 0 }}
            aria-label="Previous page"
          >
            <span className="text-3xl select-none">‹</span>
          </button>

          {/* epub.js renders into this div */}
          <div
            ref={viewerRef}
            className="flex-1 mx-14 md:mx-20"
            style={{ background: t.bg }}
          />

          {/* Next page button */}
          <button
            id="reader-next"
            onClick={goNext}
            disabled={!canNext}
            className="absolute right-0 top-0 bottom-0 z-10 w-14 md:w-20 flex items-center justify-center transition-opacity duration-200"
            style={{ color: t.fg, opacity: canNext ? 0.35 : 0 }}
            aria-label="Next page"
          >
            <span className="text-3xl select-none">›</span>
          </button>

          {/* Loading state */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div
                className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin"
                style={{ borderColor: "#e8b923", borderTopColor: "transparent" }}
              />
              <p className="text-sm" style={{ color: t.fg, opacity: 0.5 }}>
                Loading <span className="font-semibold">{book.title}</span>…
              </p>
            </div>
          )}

          {/* Error state */}
          {error && !isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center">
              <svg className="w-12 h-12 opacity-30" fill="none" viewBox="0 0 24 24" stroke={t.fg}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01M4.94 5.47a8 8 0 1111.12 0M3 3l18 18" />
              </svg>
              <p className="text-sm max-w-xs" style={{ color: t.fg, opacity: 0.6 }}>{error}</p>
              <a
                href={`/assets/books/${encodeURIComponent(book.fileName)}`}
                download
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider"
                style={{ background: "#e8b923", color: "#000" }}
              >
                Download Instead
              </a>
            </div>
          )}
        </div>

        {/* ── Bottom bar: progress label + mobile theme ─────────────────── */}
        <div
          className="flex items-center justify-between px-4 md:px-8 py-2 shrink-0 border-t"
          style={{
            background: theme === "dark" ? "#0d0d12" : theme === "sepia" ? "#e8d9c4" : "#f0f0f0",
            borderColor: theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.1)",
          }}
        >
          <p className="text-xs tabular-nums" style={{ color: t.fg, opacity: 0.4 }}>
            {progress}% read
          </p>

          {/* Mobile theme switcher */}
          <div className="flex md:hidden items-center gap-2">
            {(Object.keys(THEMES) as Theme[]).map((th) => (
              <button
                key={th}
                id={`reader-theme-mobile-${th}`}
                onClick={() => setTheme(th)}
                className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider transition-colors"
                style={{
                  background: theme === th ? "#e8b923" : "transparent",
                  color: theme === th ? "#000" : (t.fg),
                  opacity: theme === th ? 1 : 0.4,
                }}
                aria-pressed={theme === th}
              >
                {THEMES[th].label}
              </button>
            ))}
          </div>

          <p className="text-xs hidden md:block" style={{ color: t.fg, opacity: 0.3 }}>
            ← → arrow keys to navigate · Esc to close
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function applyThemeToRendition(rendition: any, theme: Theme, fontSize: number) {
  const t = THEMES[theme];
  try {
    rendition.themes.register("custom", {
      body: {
        background: `${t.bg} !important`,
        color: `${t.fg} !important`,
        "font-size": `${fontSize}% !important`,
        "font-family": "'Georgia', serif !important",
        "line-height": "1.8 !important",
        padding: "0 2em !important",
      },
      a: { color: "#e8b923 !important" },
      "h1, h2, h3, h4": { color: `${t.fg} !important` },
    });
    rendition.themes.select("custom");
    rendition.themes.fontSize(`${fontSize}%`);
  } catch {
    // Theme application is best-effort; ignore failures.
  }
}
