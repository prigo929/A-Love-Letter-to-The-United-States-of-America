"use client";

// ─── EpubReader: In-browser EPUB reader modal overlay ────────────────────────
// Loads epub.js from /assets/epubjs.min.js (a static copy in /public) via a
// vanilla <script> tag appended in useEffect. This completely bypasses
// Turbopack / Next.js bundling, which epub.js is incompatible with due to
// its use of dynamic require() and window at module-init time.
// Renders as a full-screen overlay modal on the same page.
//
// Security notes:
// - The book filename is validated because it comes directly from our internal
//   BOOK_DATABASE (passed as a prop).
// - No user-controlled string is ever used as an innerHTML sink.
//   epub.js renders into a sandboxed iframe it creates internally.

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { BookItem } from "./BookShowcase";

interface EpubReaderProps {
  book: BookItem | null;
  onClose: () => void;
}

// epub.js is injected as a plain UMD script — not bundled — so TypeScript
// doesn't know about it. Access it through this typed shim.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getEpub = (): ((url: string, opts?: Record<string, unknown>) => any) | undefined =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).ePub;

type Theme = "dark" | "sepia" | "light";

const THEMES: Record<Theme, { bg: string; fg: string; label: string; barBg: string }> = {
  dark:  { bg: "#0c0c12", fg: "#e2d9c8", label: "Dark",  barBg: "#111118" },
  sepia: { bg: "#f5ede0", fg: "#3b2f20", label: "Sepia", barBg: "#e8d9c4" },
  light: { bg: "#fafafa", fg: "#1a1a1a", label: "Light", barBg: "#f0f0f0" },
};

export function EpubReader({ book, onClose }: EpubReaderProps) {
  const viewerRef  = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renditionRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bookObjRef   = useRef<any>(null);

  const [theme,     setTheme]     = useState<Theme>("dark");
  const [fontSize,  setFontSize]  = useState(100);
  const [isLoading, setIsLoading] = useState(true);
  const [error,     setError]     = useState<string | null>(null);
  const [progress,  setProgress]  = useState(0);
  const [chapter,   setChapter]   = useState("");
  const [canPrev,   setCanPrev]   = useState(false);
  const [canNext,   setCanNext]   = useState(true);
  const [atEnd,     setAtEnd]     = useState(false);

  // Keep a ref to isLoading so the rAF callback and keyboard handler
  // always see the current value without being in their dependency arrays.
  const isLoadingRef = useRef(true);
  useEffect(() => { isLoadingRef.current = isLoading; }, [isLoading]);

  // ── Destroy helpers ────────────────────────────────────────────────────────
  const destroyBook = useCallback(() => {
    try { renditionRef.current?.destroy(); } catch { /* ignore */ }
    try { bookObjRef.current?.destroy();   } catch { /* ignore */ }
    renditionRef.current = null;
    bookObjRef.current   = null;
  }, []);

  // ── Initialize epub.js once the script is ready ───────────────────────────
  const initReader = useCallback(() => {
    if (!book || !viewerRef.current || !getEpub()) return;
    destroyBook();

    setIsLoading(true);
    isLoadingRef.current = true;
    setError(null);
    setProgress(0);
    setChapter("");
    setCanPrev(false);
    setCanNext(true);
    setAtEnd(false);

    const encodedFile = encodeURIComponent(book.fileName);
    const url = `/assets/books/${encodedFile}`;

    // Defer one animation frame so the modal is fully painted and the
    // flex container has real pixel dimensions before epub.js measures it.
    requestAnimationFrame(() => {
      const viewer = viewerRef.current;
      if (!viewer || !getEpub()) return;

      const epubBook = getEpub()!(url);
      bookObjRef.current = epubBook;

      // Paginated mode columnises the content, and epub.js only sets that up
      // correctly when given EXPLICIT PIXEL dimensions. Passing "100%"/"100%" was
      // the bug behind two complaints at once: the text ran as one tall column
      // that scrolled up and down instead of turning pages, and prev/next
      // couldn't step through pages that didn't exist. Measure the viewer and
      // hand epub.js real numbers.
      const rect = viewer.getBoundingClientRect();
      const rendition = epubBook.renderTo(viewer, {
        width:   Math.max(1, Math.floor(rect.width)),
        height:  Math.max(1, Math.floor(rect.height)),
        spread:  "none",
        flow:    "paginated",
        manager: "default",
      });
      renditionRef.current = rendition;

      // Apply initial styles
      applyStyles(rendition, theme, fontSize);

      rendition.display().then(() => {
        setIsLoading(false);
        isLoadingRef.current = false;
      }).catch(() => {
        setError("This eBook could not be rendered. Try downloading it instead.");
        setIsLoading(false);
        isLoadingRef.current = false;
      });

      // `relocated` fires after every page turn with the authoritative location,
      // including atStart / atEnd. Driving the nav state from these booleans
      // (rather than a percentage that is 0 for the whole first chapter) is what
      // makes the "previous page" button reliably enable and work.
      rendition.on("relocated", (location: {
        start?: { percentage?: number };
        atStart?: boolean;
        atEnd?: boolean;
      }) => {
        setProgress(Math.round((location?.start?.percentage ?? 0) * 100));
        setCanPrev(!location?.atStart);
        setCanNext(!location?.atEnd);
        setAtEnd(!!location?.atEnd);
      });

      // Try to get chapter title from TOC
      epubBook.loaded.navigation.then((nav: { toc?: Array<{ label: string }> }) => {
        const first = nav?.toc?.[0];
        if (first?.label) setChapter(first.label.trim());
      }).catch(() => {});
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book, destroyBook]);

  // ── Re-flow pagination when the window resizes ─────────────────────────────
  // Paginated columns are computed from a fixed pixel size, so a resize (or the
  // browser chrome changing) must trigger a re-measure or the last page clips.
  useEffect(() => {
    if (!book) return;
    const onResize = () => {
      const viewer = viewerRef.current;
      if (!renditionRef.current || !viewer) return;
      const rect = viewer.getBoundingClientRect();
      try { renditionRef.current.resize(Math.floor(rect.width), Math.floor(rect.height)); }
      catch { /* rendition not ready yet — ignore */ }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [book]);

  // ── Load JSZip, THEN epub.js, then init the reader ─────────────────────────
  // Order is load-bearing. epub.js unzips the .epub with JSZip and binds to
  // `window.JSZip` at its own module-init time — so if JSZip is not already
  // present when epubjs.min.js runs, `book.ready` never resolves and the reader
  // spins forever with no error. That was the bug: the engine loaded and the
  // book fetched (HTTP 200), but the archive could never be opened. Verified by
  // driving epub.js by hand: JSZip-first → book.ready resolves (137 spine items
  // for Moby-Dick); JSZip-after or absent → indefinite hang.
  //
  // Both libraries are self-hosted in /public/assets and loaded idempotently by
  // a stable id, so re-opening the reader (or React's StrictMode double-invoke)
  // reuses the existing tags instead of racing new ones.
  useEffect(() => {
    if (!book) return;
    let cancelled = false;

    const ensureScript = (id: string, src: string) =>
      new Promise<void>((resolve, reject) => {
        const existing = document.getElementById(id) as HTMLScriptElement | null;
        if (existing) {
          if (existing.dataset.loaded === "true") return resolve();
          existing.addEventListener("load", () => resolve());
          existing.addEventListener("error", () => reject(new Error(src)));
          return;
        }
        const s = document.createElement("script");
        s.id = id;
        s.src = src; // own origin → no SRI needed
        s.async = true;
        s.addEventListener("load", () => { s.dataset.loaded = "true"; resolve(); });
        s.addEventListener("error", () => reject(new Error(src)));
        document.head.appendChild(s);
      });

    (async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!(window as any).JSZip) await ensureScript("jszip-lib", "/assets/jszip.min.js");
        if (!getEpub()) await ensureScript("epubjs-lib", "/assets/epubjs.min.js");
        if (!cancelled) initReader();
      } catch {
        if (cancelled) return;
        setError("Failed to load the reader engine.");
        setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      destroyBook();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book]);

  // ── Re-apply theme / font-size to existing rendition ─────────────────────
  useEffect(() => {
    if (renditionRef.current) {
      applyStyles(renditionRef.current, theme, fontSize);
    }
  }, [theme, fontSize]);

  // ── Navigation helpers ────────────────────────────────────────────────────
  const goNext = useCallback(() => {
    // Guard: don't navigate while book is still loading or manager isn't ready
    if (!renditionRef.current || atEnd || isLoadingRef.current) return;
    try { renditionRef.current.next().catch(() => setCanNext(false)); }
    catch { /* epub.js internal state not ready yet — ignore */ }
  }, [atEnd]);

  const goPrev = useCallback(() => {
    if (!renditionRef.current || !canPrev || isLoadingRef.current) return;
    try { renditionRef.current.prev().catch(() => {}); }
    catch { /* ignore */ }
  }, [canPrev]);

  // ── Keyboard shortcuts ────────────────────────────────────────────────────
  useEffect(() => {
    if (!book) return;
    const handler = (e: KeyboardEvent) => {
      // Skip Space while loading: the button click that opened the reader
      // dispatches a synthetic space keydown which would otherwise hit goNext.
      if (e.key === "ArrowRight")               { e.preventDefault(); goNext(); }
      if (e.key === " " && !isLoadingRef.current) { e.preventDefault(); goNext(); }
      if (e.key === "ArrowLeft")                { e.preventDefault(); goPrev(); }
      if (e.key === "Escape")                   { e.preventDefault(); onClose(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [book, goNext, goPrev, onClose]);

  // ── Lock body scroll when reader is active ────────────────────────────────
  useEffect(() => {
    if (book) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [book]);

  if (!book) return null;

  const t = THEMES[theme];

  return (
    <AnimatePresence>
      <motion.div
        key="epub-reader-modal"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed inset-0 z-[9999] flex flex-col select-none"
        style={{ background: t.bg }}
        role="dialog"
        aria-modal="true"
        aria-label={`Reading: ${book.title}`}
      >
        {/* ── Top Bar ─────────────────────────────────────────────────────── */}
        <div
          className="flex items-center gap-3 px-4 md:px-6 py-2 shrink-0 border-b"
          style={{
            background: t.barBg,
            borderColor: theme === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.1)",
          }}
        >
          {/* Back Button (Closes Modal) */}
          <button
            id="reader-back"
            onClick={onClose}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full opacity-50 hover:opacity-100 transition-opacity text-lg"
            style={{ color: t.fg }}
            title="Close Reader"
            aria-label="Close Reader"
          >
            ←
          </button>

          {/* Book info */}
          <div className="min-w-0 flex-1">
            <p className="text-[11px] uppercase tracking-widest font-bold truncate opacity-40"
              style={{ color: t.fg }}>
              {book.author} · {book.year}
            </p>
            <p className="text-sm font-semibold truncate" style={{ color: t.fg }}>
              {chapter || book.title}
            </p>
          </div>

          {/* Theme switcher — desktop */}
          <div
            className="hidden md:flex items-center gap-0.5 rounded-full border p-0.5"
            style={{ borderColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.12)" }}
          >
            {(Object.keys(THEMES) as Theme[]).map((th) => (
              <button
                key={th}
                id={`reader-theme-${th}`}
                onClick={() => setTheme(th)}
                className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-200"
                style={{
                  background: theme === th ? "#e8b923" : "transparent",
                  color:      theme === th ? "#000"    : t.fg,
                  opacity:    theme === th ? 1         : 0.45,
                }}
                aria-pressed={theme === th}
              >
                {THEMES[th].label}
              </button>
            ))}
          </div>

          {/* Font size */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              id="reader-font-smaller"
              onClick={() => setFontSize((s) => Math.max(70, s - 10))}
              className="w-7 h-7 flex items-center justify-center rounded-full border text-xs font-black transition-opacity opacity-50 hover:opacity-100"
              style={{ borderColor: theme === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)", color: t.fg }}
              title="Decrease font size"
            >A−</button>
            <span className="w-7 text-center text-[10px] tabular-nums opacity-40" style={{ color: t.fg }}>{fontSize}%</span>
            <button
              id="reader-font-larger"
              onClick={() => setFontSize((s) => Math.min(160, s + 10))}
              className="w-7 h-7 flex items-center justify-center rounded-full border text-xs font-black transition-opacity opacity-50 hover:opacity-100"
              style={{ borderColor: theme === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)", color: t.fg }}
              title="Increase font size"
            >A+</button>
          </div>

          {/* Download shortcut */}
          <a
            id="reader-download"
            href={`/assets/books/${encodeURIComponent(book.fileName)}`}
            download
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full border opacity-40 hover:opacity-100 transition-opacity"
            style={{ borderColor: theme === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)", color: t.fg }}
            title="Download ePub"
          >
            ↓
          </a>
        </div>

        {/* ── Progress bar ────────────────────────────────────────────────── */}
        <div className="h-[3px] shrink-0 relative" style={{ background: theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.07)" }}>
          <div
            className="absolute inset-y-0 left-0 transition-all duration-700 ease-out"
            style={{ width: `${progress}%`, background: "#e8b923" }}
          />
        </div>

        {/* ── Reading area ─────────────────────────────────────────────────── */}
        <div className="flex-1 flex items-stretch relative overflow-hidden" style={{ background: t.bg }}>

          {/* Prev button */}
          <button
            id="reader-prev-page"
            onClick={goPrev}
            disabled={!canPrev}
            className="absolute left-0 top-0 bottom-0 z-20 flex items-center justify-center transition-all duration-300 hover:opacity-100"
            style={{
              width: "clamp(44px, 8vw, 80px)",
              color: t.fg,
              opacity: canPrev ? 0.25 : 0,
              pointerEvents: canPrev ? "auto" : "none",
              background: `linear-gradient(to right, ${theme === "dark" ? "rgba(12,12,18,0.7)" : theme === "sepia" ? "rgba(245,237,224,0.7)" : "rgba(250,250,250,0.7)"}, transparent)`,
            }}
            aria-label="Previous page"
          >
            <span className="text-4xl font-thin leading-none">‹</span>
          </button>

          {/* epub.js mount target — needs explicit pixel height for paginator */}
          <div
            ref={viewerRef}
            className="flex-1 overflow-hidden"
            style={{
              marginLeft:  "clamp(44px, 8vw, 80px)",
              marginRight: "clamp(44px, 8vw, 80px)",
              background: t.bg,
            }}
          />

          {/* Next button */}
          <button
            id="reader-next-page"
            onClick={goNext}
            disabled={!canNext}
            className="absolute right-0 top-0 bottom-0 z-20 flex items-center justify-center transition-all duration-300 hover:opacity-100"
            style={{
              width: "clamp(44px, 8vw, 80px)",
              color: t.fg,
              opacity: canNext ? 0.25 : 0,
              pointerEvents: canNext ? "auto" : "none",
              background: `linear-gradient(to left, ${theme === "dark" ? "rgba(12,12,18,0.7)" : theme === "sepia" ? "rgba(245,237,224,0.7)" : "rgba(250,250,250,0.7)"}, transparent)`,
            }}
            aria-label="Next page"
          >
            <span className="text-4xl font-thin leading-none">›</span>
          </button>

          {/* Loading spinner */}
          {isLoading && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-5"
              style={{ background: t.bg }}>
              <div
                className="w-14 h-14 rounded-full border-2 animate-spin"
                style={{ borderColor: "rgba(232,185,35,0.3)", borderTopColor: "#e8b923" }}
              />
              <p className="text-sm" style={{ color: t.fg, opacity: 0.45 }}>
                Opening <em>{book.title}</em>…
              </p>
            </div>
          )}

          {/* Error state */}
          {error && !isLoading && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-5 px-8 text-center"
              style={{ background: t.bg }}>
              <svg className="w-14 h-14" fill="none" viewBox="0 0 24 24"
                style={{ stroke: t.fg, opacity: 0.25 }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                  d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
              <p className="max-w-sm text-sm leading-relaxed" style={{ color: t.fg, opacity: 0.5 }}>{error}</p>
              <a
                href={`/assets/books/${encodeURIComponent(book.fileName)}`}
                download
                className="px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider"
                style={{ background: "#e8b923", color: "#000" }}
              >
                ↓ Download ePub
              </a>
            </div>
          )}
        </div>

        {/* ── Bottom bar ───────────────────────────────────────────────────── */}
        <div
          className="flex items-center justify-between px-4 md:px-6 py-2 shrink-0 border-t"
          style={{
            background: t.barBg,
            borderColor: theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.08)",
          }}
        >
          <p className="text-[11px] tabular-nums" style={{ color: t.fg, opacity: 0.35 }}>
            {progress}% read
          </p>

          {/* Mobile theme */}
          <div className="flex md:hidden items-center gap-1">
            {(Object.keys(THEMES) as Theme[]).map((th) => (
              <button
                key={th}
                id={`reader-theme-mobile-${th}`}
                onClick={() => setTheme(th)}
                className="px-2 py-0.5 rounded text-[10px] font-bold uppercase"
                style={{
                  background: theme === th ? "#e8b923" : "transparent",
                  color:      theme === th ? "#000"    : t.fg,
                  opacity:    theme === th ? 1         : 0.4,
                }}
                aria-pressed={theme === th}
              >
                {THEMES[th].label}
              </button>
            ))}
          </div>

          <p className="hidden md:block text-[11px]" style={{ color: t.fg, opacity: 0.25 }}>
            ← → to navigate · Space for next · Esc to close
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Helper: apply font + color theme to epub.js rendition ────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function applyStyles(rendition: any, theme: Theme, fontSize: number) {
  const t = THEMES[theme];
  try {
    rendition.themes.register("usa", {
      "html, body": {
        "background-color": `${t.bg} !important`,
        color:              `${t.fg} !important`,
        "font-size":        `${fontSize}% !important`,
        "font-family":      "'Georgia', 'Times New Roman', serif !important",
        "line-height":      "1.85 !important",
        "padding":          "0 1.5em !important",
        margin:             "0 !important",
      },
      a:                { color: "#e8b923 !important" },
      "h1,h2,h3,h4,h5": { color: `${t.fg} !important` },
      p:                { "margin-bottom": "1em !important" },
    });
    rendition.themes.select("usa");
    rendition.themes.fontSize(`${fontSize}%`);
  } catch {
    // Best-effort; some renderers don't support theme overrides.
  }
}
