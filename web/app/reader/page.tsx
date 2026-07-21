"use client";

// ─── /reader — standalone in-browser EPUB reader page ────────────────────────
// Loads epub.js from /assets/epubjs.min.js (a static copy in /public) via a
// vanilla <script> tag appended in useEffect. This completely bypasses
// Turbopack / Next.js bundling, which epub.js is incompatible with due to
// its use of dynamic require() and window at module-init time.
//
// Security notes:
// - The `book` query param is validated against BOOK_DATABASE (allow-list of
//   known, server-hosted filenames). Anything not in that list is rejected.
// - No user-controlled string is ever used as an innerHTML sink.
//   epub.js renders into a sandboxed iframe it creates internally.
// - TODO(security): If user-uploaded EPUBs are ever added, add server-side
//   magic-byte validation + a strict CSP on the reader iframe.

import { useEffect, useRef, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { BOOK_DATABASE } from "@/components/literature/BookShowcase";

// ── Types ─────────────────────────────────────────────────────────────────────
declare global {
  interface Window {
    // epub.js attaches itself as ePub when loaded as a UMD script.
    // Marked optional because it is injected at runtime, not bundled.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ePub?: (url: string, options?: Record<string, unknown>) => any;
  }
}

type Theme = "dark" | "sepia" | "light";

const THEMES: Record<Theme, { bg: string; fg: string; label: string; barBg: string }> = {
  dark:  { bg: "#0c0c12", fg: "#e2d9c8", label: "Dark",  barBg: "#111118" },
  sepia: { bg: "#f5ede0", fg: "#3b2f20", label: "Sepia", barBg: "#e8d9c4" },
  light: { bg: "#fafafa", fg: "#1a1a1a", label: "Light", barBg: "#f0f0f0" },
};

// ── Inner reader component (needs Suspense for useSearchParams) ───────────────
function ReaderInner() {
  const params = useSearchParams();
  const rawBook = params.get("book") ?? "";

  // Validate against allow-list — never trust raw query params
  const bookMeta = BOOK_DATABASE.find((b) => b.fileName === rawBook) ?? null;

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

  // ── Destroy helpers ────────────────────────────────────────────────────────
  const destroyBook = useCallback(() => {
    try { renditionRef.current?.destroy(); } catch { /* ignore */ }
    try { bookObjRef.current?.destroy();   } catch { /* ignore */ }
    renditionRef.current = null;
    bookObjRef.current   = null;
  }, []);

  // ── Initialize epub.js once the script is ready ───────────────────────────
  const initReader = useCallback(() => {
    if (!bookMeta || !viewerRef.current || !window.ePub) return;
    destroyBook();

    setIsLoading(true);
    setError(null);
    setProgress(0);
    setChapter("");
    setCanPrev(false);
    setCanNext(true);
    setAtEnd(false);

    const encodedFile = encodeURIComponent(bookMeta.fileName);
    const url = `/assets/books/${encodedFile}`;

    const book = window.ePub!(url);
    bookObjRef.current = book;

    const rendition = book.renderTo(viewerRef.current, {
      width:  "100%",
      height: "100%",
      spread: "none",
      flow:   "paginated",
    });
    renditionRef.current = rendition;

    // Apply initial styles
    applyStyles(rendition, theme, fontSize);

    rendition.display().then(() => {
      setIsLoading(false);
    }).catch(() => {
      setError("This eBook could not be rendered. Try downloading it instead.");
      setIsLoading(false);
    });

    // Track progress
    rendition.on("locationChanged", (loc: { start: { percentage: number } }) => {
      const pct = Math.round((loc?.start?.percentage ?? 0) * 100);
      setProgress(pct);
      setCanPrev(pct > 0);
    });

    // Detect end of book
    rendition.on("finished", () => {
      setCanNext(false);
      setAtEnd(true);
    });

    // Try to get chapter title from TOC
    book.loaded.navigation.then((nav: { toc?: Array<{ label: string }> }) => {
      const first = nav?.toc?.[0];
      if (first?.label) setChapter(first.label.trim());
    }).catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookMeta, destroyBook]);

  // ── Load epub.js script once, then init reader ─────────────────────────────
  // Idempotent by design. The previous version used a `scriptLoaded` ref as a
  // one-shot guard, which deadlocks under React StrictMode's dev double-invoke:
  // the first pass flips the ref to true and appends the script, the second pass
  // sees the ref already true and returns before appending — but StrictMode had
  // torn down the first pass, so no <script> ends up in the DOM at all and the
  // reader spins forever. Confirmed live: engine present, book fetchable, zero
  // script tags injected.
  //
  // The fix keys off a stable element id instead of a ref, so it does the right
  // thing however many times the effect runs (StrictMode, Fast Refresh, or a
  // real book change): reuse the tag if present, attach a load handler either
  // way, and initialise the moment ePub is available.
  const SCRIPT_ID = "epubjs-lib";
  useEffect(() => {
    if (!bookMeta) return;
    let cancelled = false;
    const start = () => { if (!cancelled) initReader(); };

    if (window.ePub) {
      start();
      return () => { cancelled = true; destroyBook(); };
    }

    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = "/assets/epubjs.min.js"; // own origin → no SRI needed
      script.async = true;
      document.head.appendChild(script);
    }

    const onLoad = () => start();
    const onError = () => {
      if (cancelled) return;
      setError("Failed to load the reader engine.");
      setIsLoading(false);
    };
    script.addEventListener("load", onLoad);
    script.addEventListener("error", onError);
    // If the tag existed and finished loading between the check above and now.
    if (window.ePub) start();

    return () => {
      cancelled = true;
      script?.removeEventListener("load", onLoad);
      script?.removeEventListener("error", onError);
      destroyBook();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookMeta]);

  // ── Re-apply theme / font-size to existing rendition ─────────────────────
  useEffect(() => {
    if (renditionRef.current) {
      applyStyles(renditionRef.current, theme, fontSize);
    }
  }, [theme, fontSize]);

  // ── Navigation helpers ────────────────────────────────────────────────────
  const goNext = useCallback(() => {
    if (!renditionRef.current || atEnd) return;
    renditionRef.current.next().catch(() => setCanNext(false));
  }, [atEnd]);

  const goPrev = useCallback(() => {
    if (!renditionRef.current || !canPrev) return;
    renditionRef.current.prev().catch(() => {});
  }, [canPrev]);

  // ── Keyboard shortcuts ────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); goNext(); }
      if (e.key === "ArrowLeft")                    { e.preventDefault(); goPrev(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  const t = THEMES[theme];

  // ── Not found guard ───────────────────────────────────────────────────────
  if (!bookMeta) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6"
        style={{ background: "#0c0c12", color: "#e2d9c8" }}>
        <p className="text-xl opacity-60">Book not found.</p>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 rounded-xl text-sm font-bold"
          style={{ background: "#e8b923", color: "#000" }}
        >
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 flex flex-col select-none"
      style={{ background: t.bg }}
    >
      {/* ── Top Bar ─────────────────────────────────────────────────────── */}
      <div
        className="flex items-center gap-3 px-4 md:px-6 py-2 shrink-0 border-b"
        style={{
          background: t.barBg,
          borderColor: theme === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.1)",
        }}
      >
        {/* Back */}
        <button
          id="reader-back"
          onClick={() => window.history.back()}
          className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full opacity-50 hover:opacity-100 transition-opacity text-lg"
          style={{ color: t.fg }}
          title="Go back"
          aria-label="Go back"
        >
          ←
        </button>

        {/* Book info */}
        <div className="min-w-0 flex-1">
          <p className="text-[11px] uppercase tracking-widest font-bold truncate opacity-40"
            style={{ color: t.fg }}>
            {bookMeta.author} · {bookMeta.year}
          </p>
          <p className="text-sm font-semibold truncate" style={{ color: t.fg }}>
            {chapter || bookMeta.title}
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
          href={`/assets/books/${encodeURIComponent(bookMeta.fileName)}`}
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
              Opening <em>{bookMeta.title}</em>…
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
              href={`/assets/books/${encodeURIComponent(bookMeta.fileName)}`}
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
          ← → to navigate · Space for next
        </p>
      </div>
    </div>
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

// ── Page export (wraps with Suspense for useSearchParams) ─────────────────────
export default function ReaderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center"
          style={{ background: "#0c0c12" }}>
          <div className="w-12 h-12 rounded-full border-2 animate-spin"
            style={{ borderColor: "rgba(232,185,35,0.3)", borderTopColor: "#e8b923" }} />
        </div>
      }
    >
      <ReaderInner />
    </Suspense>
  );
}
