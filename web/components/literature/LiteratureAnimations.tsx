"use client";

// ─── Literature & Philosophy: the text-as-interface toolkit ──────────────────
// Every other section of this site argues with numbers. This one has no honest
// numbers to argue with, so the reading itself is the interaction: text that
// lights as you scroll, passages you can take apart phrase by phrase, and
// manuscript scans that sit under the printed words they became.
//
// Safari is the target browser here (see project-svg-safari-gotchas). Three rules
// fall out of that and out of the performance work on the economy pages:
//
//  1. Animate opacity and transform only. No animated filter, no box-shadow.
//  2. Never put viewport-triggered animation on SVG children — it silently fails
//     in Safari and leaves elements stuck invisible. Plain DOM only in here.
//  3. Prefer ONE scroll-linked value over many. See ScrollIlluminatedText.

import { useRef, useState, useId } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { LITERATURE_ASSETS, type LiteratureAssetKey } from "@/lib/data/literature-assets";
import { useLanguage } from "@/components/providers/LanguageProvider";

/* ── Shared styles ─────────────────────────────────────────────────────────── */

export function LitStyles() {
  return (
    <style>{`
      /* --font-display is Playfair Display, already loaded site-wide. Turning on
         its typographic extras is what separates "a serif" from "typesetting":
         real ligatures, contextual alternates, and old-style figures that sit on
         the baseline like the letters do. On a page that is mostly large-set
         quotation, these details are most of the beauty. */
      .lit-serif {
        font-family: var(--font-display, Georgia), serif;
        font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "onum" 1;
        text-rendering: optimizeLegibility;
      }
      .lit-measure { max-width: 34em; }
      /* A hanging opening quote: the big quotation marks sit in the margin so the
         first real word stays flush with the text block. Standard fine-press
         detail, one line of CSS. */
      .lit-hang { text-indent: -0.5em; }
      /* Small caps for the drop-style era labels, from the font rather than by
         faking it with letter-spacing on uppercased text. */
      .lit-smallcaps { font-variant-caps: all-small-caps; letter-spacing: 0.08em; }

      /* Respect the OS setting. Everything below degrades to "fully lit,
         instantly" rather than "invisible", which is the failure mode that
         matters: a reader who disables motion must still get the text. */
      @media (prefers-reduced-motion: reduce) {
        .lit-illuminate { -webkit-text-fill-color: currentColor !important; }
        .lit-word { opacity: 1 !important; filter: none !important; }
      }
    `}</style>
  );
}

/* ── 1. Scroll-illuminated text ────────────────────────────────────────────── */

interface ScrollIlluminatedTextProps {
  children: string;
  className?: string;
  /** Colour of text not yet reached. Defaults to a dim white. */
  dim?: string;
  /** Colour of text the light has passed. */
  lit?: string;
}

/**
 * A block of prose that lights from top to bottom as it crosses the viewport.
 *
 * The obvious implementation is one motion value per word, mapping scroll
 * progress to each word's opacity. That works and it is what most sites do, but
 * a 90-word passage then drives 90 animated values and 90 style writes per
 * frame — on a page with several of these, that is exactly the frame budget we
 * spent the economy session clawing back.
 *
 * So instead: one gradient, one animated value. The text is painted with a
 * hard-edged linear-gradient clipped to the glyphs, and only the gradient's
 * position is scroll-linked. The browser composites it, the whole paragraph
 * costs a single interpolation, and the effect is identical to the eye.
 *
 * `background-clip: text` needs the -webkit- prefix to work in Safari, which is
 * why both are set.
 */
export function ScrollIlluminatedText({
  children,
  className = "",
  dim = "rgba(255,255,255,0.55)",
  lit = "rgba(255,255,255,0.97)",
}: ScrollIlluminatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();

  // Progressive enhancement, and it is not optional here.
  //
  // The effect works by painting the glyphs with a clipped gradient, which means
  // setting `-webkit-text-fill-color: transparent`. If the scroll value never
  // updates, the gradient never moves off its start position and the entire
  // paragraph renders at the `dim` colour — on a page whose only job is reading.
  // That is a severe failure for one animation's worth of polish.
  //
  // This is not hypothetical. Framer 12 drives this through the native
  // ScrollTimeline where the browser offers it, so a browser that reports scroll
  // badly takes the whole chain down with it, and no JS `scroll` event will
  // revive it. So: render ordinary, fully legible text until the scroll value
  // actually moves at least once. Only then do we hand the paint over to the
  // gradient. If it never fires, the reader simply gets a normal paragraph and
  // never knows an effect was intended.
  //
  // `dim` also sits at 0.55 rather than the 0.22 this started at, so that even
  // mid-sweep the text ahead of the light stays readable rather than merely
  // suggested.
  const [armed, setArmed] = useState(false);

  const { scrollYProgress } = useScroll({
    // Start when the block's top reaches 80% down the viewport, finish when its
    // bottom passes the middle. The reader is always slightly ahead of the light.
    target: ref,
    offset: ["start 0.8", "end 0.5"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!armed && v > 0) setArmed(true);
  });

  const pos = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const bg = useTransform(
    pos,
    (p) => `linear-gradient(to bottom, ${lit} ${p}, ${dim} ${p})`
  );

  if (reduced) {
    return <p className={`lit-illuminate ${className}`} style={{ color: lit }}>{children}</p>;
  }

  return (
    <motion.p
      ref={ref}
      className={`lit-illuminate ${className}`}
      style={
        armed
          ? {
              backgroundImage: bg as unknown as MotionValue<string>,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: lit,
            }
          : { color: lit }
      }
    >
      {children}
    </motion.p>
  );
}

/* ── 2. Annotated passage ──────────────────────────────────────────────────── */

export interface Annotation {
  /** Exact substring of `text` to make interactive. Must appear verbatim. */
  phrase: string;
  note: string;
  noteRo: string;
}

interface AnnotatedPassageProps {
  text: string;
  annotations: Annotation[];
  /** Shown before the reader has picked anything. */
  primer: string;
  primerRo: string;
  className?: string;
}

/**
 * A passage the reader can take apart, annotated in the MARGIN.
 *
 * The first version of this put the note in a panel under the passage. It read
 * badly for an obvious reason once you use it: clicking a phrase sends your eye
 * to the bottom of the section, and by the time you have read the note you have
 * lost the line you were in. The whole point is to look at a sentence closely,
 * and the interaction was pulling you away from it.
 *
 * So the note is now set beside the phrase, vertically aligned to the line it
 * belongs to, the way a scholarly edition or an annotated manuscript does it.
 * Your eye moves sideways a few centimetres instead of down a screen, and the
 * sentence never leaves view.
 *
 * On narrow screens there is no margin to put it in, so it falls back to an
 * inline note directly beneath the passage — still close, still in view.
 */
export function AnnotatedPassage({
  text,
  annotations,
  primer,
  primerRo,
  className = "",
}: AnnotatedPassageProps) {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const [active, setActive] = useState<number | null>(null);
  const [noteTop, setNoteTop] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  const present = annotations.filter((a) => text.includes(a.phrase));
  const missing = annotations.filter((a) => !text.includes(a.phrase));
  if (process.env.NODE_ENV !== "production" && missing.length) {
    console.warn(
      "[AnnotatedPassage] phrases not found verbatim in text:",
      missing.map((m) => m.phrase)
    );
  }

  // Build an ordered split of the passage around each annotated phrase.
  const parts: { text: string; idx: number | null }[] = [];
  let rest = text;
  let guard = 0;
  while (rest.length) {
    let best: { at: number; i: number } | null = null;
    present.forEach((a, i) => {
      const at = rest.indexOf(a.phrase);
      if (at !== -1 && (best === null || at < best.at)) best = { at, i };
    });
    if (!best) {
      parts.push({ text: rest, idx: null });
      break;
    }
    const b: { at: number; i: number } = best;
    if (b.at > 0) parts.push({ text: rest.slice(0, b.at), idx: null });
    parts.push({ text: present[b.i].phrase, idx: b.i });
    rest = rest.slice(b.at + present[b.i].phrase.length);
    if (++guard > present.length + 2) break;
  }

  const shown = active !== null ? present[active] : null;

  // Align the margin note to the top of whichever line the phrase starts on.
  const select = (idx: number, el: HTMLButtonElement) => {
    if (active === idx) {
      setActive(null);
      return;
    }
    const wrap = wrapRef.current;
    if (wrap) {
      const top = el.getBoundingClientRect().top - wrap.getBoundingClientRect().top;
      setNoteTop(Math.max(0, top));
    }
    setActive(idx);
  };

  const note = shown && (
    <motion.div
      key={active}
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="border-l-2 pl-5"
      style={{ borderColor: "rgba(232,185,35,0.5)" }}
    >
      <div className="font-body text-[11px] font-bold uppercase tracking-[0.16em] text-glory-gold">
        {shown.phrase}
      </div>
      <p className="mt-3 font-body text-[14px] leading-relaxed text-white/65">
        {ro ? shown.noteRo : shown.note}
      </p>
    </motion.div>
  );

  return (
    <div ref={wrapRef} className={`relative lg:grid lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14 ${className}`}>
      <div>
        <p className="lit-serif text-xl leading-[1.9] text-white/90 md:text-[26px] md:leading-[1.85]">
          {parts.map((p, i) =>
            p.idx === null ? (
              <span key={`${uid}-t-${i}`}>{p.text}</span>
            ) : (
              <button
                key={`${uid}-a-${i}`}
                type="button"
                onClick={(e) => select(p.idx as number, e.currentTarget)}
                aria-expanded={active === p.idx}
                className="rounded-[3px] px-[2px] transition-colors duration-200"
                style={{
                  borderBottom:
                    active === p.idx
                      ? "1.5px solid rgba(232,185,35,0.9)"
                      : "1.5px solid rgba(232,185,35,0.4)",
                  backgroundColor: active === p.idx ? "rgba(232,185,35,0.14)" : "transparent",
                  color: active === p.idx ? "#E8B923" : "inherit",
                  // Inherited and beats `color` in WebKit — must be set explicitly.
                  WebkitTextFillColor: active === p.idx ? "#E8B923" : "currentColor",
                  font: "inherit",
                  cursor: "pointer",
                }}
              >
                {p.text}
              </button>
            )
          )}
        </p>

        {/* Narrow screens: no margin exists, so the note sits just under the
            passage rather than a screen away. */}
        <div className="mt-8 lg:hidden">
          {note ?? (
            <p className="font-body text-[14px] leading-relaxed text-white/35">
              {ro ? primerRo : primer}
            </p>
          )}
        </div>
      </div>

      {/* Wide screens: true marginalia, aligned to the clicked line. */}
      <div className="relative hidden lg:block">
        {shown ? (
          <div className="absolute left-0 right-0" style={{ top: noteTop }}>
            {note}
          </div>
        ) : (
          <p className="font-body text-[14px] leading-relaxed text-white/35">
            {ro ? primerRo : primer}
          </p>
        )}
      </div>
    </div>
  );
}

/* ── 3. Manuscript parallax ────────────────────────────────────────────────── */

interface ManuscriptParallaxProps {
  asset: LiteratureAssetKey;
  children: React.ReactNode;
  /** How far the scan drifts, in px, across the whole scroll. */
  drift?: number;
  className?: string;
}

/**
 * A public-domain manuscript scan behind the words it became, drifting slower
 * than the page. The point is the contrast: the handwriting is a physical object
 * somebody actually made, and the printed text over it is what it turned into.
 *
 * Uses transform, not `background-attachment: fixed`, which is broken on iOS
 * Safari and would silently flatten this to a static image on the exact browser
 * this site is read in.
 */
export function ManuscriptParallax({
  asset,
  children,
  drift = 90,
  className = "",
}: ManuscriptParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { locale } = useLanguage();
  const a = LITERATURE_ASSETS[asset];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-drift, drift]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 -z-10"
        style={reduced ? undefined : { y }}
        aria-hidden="true"
      >
        <Image
          src={a.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.13] grayscale"
          // The scan is texture, not content — it must never be the LCP element
          // and must never block the words on top of it.
          loading="lazy"
        />
      </motion.div>
      {/* Keeps the text legible over whatever part of the scan is showing. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/80" aria-hidden="true" />
      {children}
      <span className="sr-only">{locale === "ro" ? a.altRo : a.alt}</span>
    </div>
  );
}

/* ── 4. Pull quote ─────────────────────────────────────────────────────────── */

interface PullQuoteProps {
  quote: string;
  attribution: string;
  /** Year or work, shown under the name. */
  meta?: string;
}

/**
 * A full-bleed typographic break. Deliberately not translated: see the note in
 * the literature pages — a Romanian "Call me Ishmael" is a different sentence.
 * The gloss belongs under it as commentary, which the caller supplies.
 */
export function PullQuote({ quote, attribution, meta }: PullQuoteProps) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto max-w-4xl py-24 text-center"
    >
      <blockquote className="lit-serif text-3xl leading-[1.35] text-white md:text-5xl md:leading-[1.25]">
        {quote}
      </blockquote>
      <figcaption className="mt-8 font-body text-[11px] font-bold uppercase tracking-[0.24em] text-glory-gold">
        {attribution}
        {meta && <span className="ml-3 font-normal text-white/35">{meta}</span>}
      </figcaption>
    </motion.figure>
  );
}

/* ── 5. Opening lines wall ─────────────────────────────────────────────────── */

export interface Opening {
  work: string;
  author: string;
  year: number;
  /** The opening sentence, verbatim and in English in both locales. */
  line: string;
  note: string;
  noteRo: string;
  /** Omit when no correctly-licensed likeness exists. A typographic panel is
   *  rendered instead — better an honest blank than a confidently wrong face. */
  portrait?: LiteratureAssetKey;
  /** True when the whole book is free to read, which is worth telling a reader. */
  publicDomain: boolean;
}

interface OpeningLinesWallProps {
  openings: Opening[];
  pdLabel: string;
  pdLabelRo: string;
  copyrightLabel: string;
  copyrightLabelRo: string;
}

/**
 * A rack of first sentences. Picking one promotes it to full size beside its
 * author's portrait.
 *
 * Deliberately a different gesture from AnnotatedPassage: that one takes a
 * single passage apart from the inside, this one sets whole books against each
 * other so the shift in what an American novel sounds like is visible across
 * a century in one screen. Same section, two different reasons to click.
 *
 * The public-domain flag is surfaced rather than hidden. If a reader can go and
 * read the entire book for free, that is the single most useful thing this
 * component can tell them.
 */
export function OpeningLinesWall({
  openings,
  pdLabel,
  pdLabelRo,
  copyrightLabel,
  copyrightLabelRo,
}: OpeningLinesWallProps) {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const [sel, setSel] = useState(0);
  const active = openings[sel];
  const portrait = active.portrait ? LITERATURE_ASSETS[active.portrait] : null;

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
      {/* The chosen opening, set large */}
      <div>
        <motion.blockquote
          key={sel}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="lit-serif text-2xl leading-[1.4] text-white md:text-[40px] md:leading-[1.28]"
        >
          &ldquo;{active.line}&rdquo;
        </motion.blockquote>

        <motion.div
          key={`meta-${sel}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mt-8"
        >
          <div className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-glory-gold">
            {active.work} · {active.year}
          </div>
          <div className="mt-1 font-body text-sm text-white/45">{active.author}</div>
          <p className="mt-6 max-w-xl font-body text-[15px] leading-relaxed text-white/65">
            {ro ? active.noteRo : active.note}
          </p>
          <span
            className="mt-6 inline-block rounded border px-2 py-1 font-body text-[10px] font-bold uppercase tracking-[0.14em]"
            style={
              active.publicDomain
                ? { borderColor: "rgba(232,185,35,0.35)", color: "#E8B923" }
                : { borderColor: "rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.4)" }
            }
          >
            {active.publicDomain
              ? ro ? pdLabelRo : pdLabel
              : ro ? copyrightLabelRo : copyrightLabel}
          </span>
        </motion.div>
      </div>

      {/* Portrait, plus the rack of everything else */}
      <div>
        <div className="relative mb-8 flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
          {portrait ? (
            <Image
              key={active.portrait}
              src={portrait.src}
              alt={ro ? portrait.altRo : portrait.alt}
              fill
              sizes="(min-width: 1024px) 34vw, 90vw"
              className="object-cover grayscale transition-opacity duration-500"
            />
          ) : (
            <div className="px-8 text-center">
              <div className="lit-serif text-3xl leading-tight text-white/70">{active.author}</div>
              <div className="mt-3 font-body text-[10px] uppercase tracking-[0.18em] text-white/25">
                {active.year}
              </div>
            </div>
          )}
        </div>

        <ul className="space-y-1">
          {openings.map((o, i) => (
            <li key={o.work}>
              <button
                type="button"
                onClick={() => setSel(i)}
                aria-current={i === sel}
                className="w-full border-l-2 py-2 pl-4 text-left transition-colors duration-200"
                style={{
                  borderColor: i === sel ? "#E8B923" : "rgba(255,255,255,0.1)",
                  color: i === sel ? "#fff" : "rgba(255,255,255,0.45)",
                  WebkitTextFillColor: i === sel ? "#fff" : "rgba(255,255,255,0.45)",
                  cursor: "pointer",
                }}
              >
                <span className="font-body text-sm">{o.work}</span>
                <span className="ml-2 font-body text-xs text-white/25">{o.year}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── 6. Era timeline ───────────────────────────────────────────────────────── */

export interface EraDatum {
  id: string;
  name: string;
  nameRo: string;
  from: number;
  to: number;
  question: string;
  questionRo: string;
  body: string;
  bodyRo: string;
  figures: string[];
  href?: string;
}

interface EraTimelineProps {
  eras: EraDatum[];
  readLabel: string;
  readLabelRo: string;
}

/**
 * The spine of the hub: four centuries of American writing as a single
 * horizontal band you scrub through. Each era's width is proportional to its
 * real duration, so the reader sees at a glance that the Puritan stretch is long
 * and thin while modernism is a dense thirty-year burst.
 *
 * Selection is click-driven state, not scroll-driven — the one interaction on
 * these pages that must keep working even in a browser that reports scroll badly,
 * because it is how you navigate the whole section.
 */
export function EraTimeline({ eras, readLabel, readLabelRo }: EraTimelineProps) {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const [sel, setSel] = useState(0);
  const active = eras[sel];

  const span0 = eras[0].from;
  const span1 = eras[eras.length - 1].to;
  const total = span1 - span0;
  const pct = (n: number) => ((n - span0) / total) * 100;

  return (
    <div>
      {/* The band */}
      <div className="relative h-16 w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
        {eras.map((e, i) => {
          const left = pct(e.from);
          const width = ((e.to - e.from) / total) * 100;
          const on = i === sel;
          return (
            <button
              key={e.id}
              type="button"
              onClick={() => setSel(i)}
              aria-current={on}
              className="absolute inset-y-0 flex items-center justify-center overflow-hidden border-r border-black/40 transition-colors duration-300"
              style={{
                left: `${left}%`,
                width: `${width}%`,
                backgroundColor: on ? "rgba(232,185,35,0.22)" : "rgba(255,255,255,0.015)",
                cursor: "pointer",
              }}
            >
              <span
                className="px-1 font-body text-[9px] font-bold uppercase tracking-wider"
                style={{ color: on ? "#E8B923" : "rgba(255,255,255,0.3)" }}
              >
                {e.from}
              </span>
            </button>
          );
        })}
      </div>

      {/* The selected era */}
      <motion.div
        key={active.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]"
      >
        <div>
          <div className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-glory-gold">
            {active.from}–{active.to} · {ro ? active.nameRo : active.name}
          </div>
          <h3 className="mt-3 lit-serif text-2xl leading-tight text-white md:text-4xl md:leading-[1.15]">
            {ro ? active.questionRo : active.question}
          </h3>
          <p className="mt-6 max-w-2xl font-body text-[15px] leading-relaxed text-white/65">
            {ro ? active.bodyRo : active.body}
          </p>
          {active.href && (
            <a
              href={active.href}
              className="mt-6 inline-block font-body text-sm text-glory-gold transition-opacity hover:opacity-70"
            >
              {ro ? readLabelRo : readLabel} →
            </a>
          )}
        </div>

        <div className="lg:border-l lg:border-white/10 lg:pl-8">
          <div className="font-body text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">
            {ro ? "Voci" : "Voices"}
          </div>
          <ul className="mt-4 space-y-2">
            {active.figures.map((f) => (
              <li key={f} className="lit-serif text-lg text-white/80">
                {f}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

/* ── 7. Word-by-word reveal ────────────────────────────────────────────────── */

interface WordRevealProps {
  children: string;
  className?: string;
}

/**
 * A short passage that assembles one word at a time as it crosses the viewport,
 * each word rising and sharpening into place. Reserved for a single famous
 * sentence per page — it is a spotlight, and a page full of spotlights is just a
 * page with the lights left on.
 *
 * The cost warning from ScrollIlluminatedText applies and is handled differently
 * here, because this genuinely does need per-word state. Two things keep it cheap:
 *
 *  1. It is only ever pointed at short text (a sentence, not a paragraph), so the
 *     word count is small by construction.
 *  2. Each word is a spring driven off ONE shared scroll progress value via a
 *     per-word useTransform, animating only opacity and transform — both
 *     compositor properties, so the main thread stays out of it.
 *
 * And the same progressive-enhancement contract: if the scroll value never fires
 * (a browser that reports scroll badly), `armed` stays false and every word is
 * rendered plainly visible. The sentence is never hidden behind an effect that
 * might not run.
 */
export function WordReveal({ children, className = "" }: WordRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const [armed, setArmed] = useState(false);
  const words = children.split(" ");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.65"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!armed && v > 0) setArmed(true);
  });

  if (reduced || !armed) {
    return (
      <p ref={ref} className={`lit-serif ${className}`} style={{ color: "rgba(255,255,255,0.97)" }}>
        {children}
      </p>
    );
  }

  return (
    <p ref={ref} className={`lit-serif ${className}`}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} index={i} total={words.length}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  index,
  total,
}: {
  children: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  // Each word owns a slice of the scroll range and finishes a little after it
  // starts, so the words overlap into a wave rather than snapping one by one.
  const start = index / total;
  const end = Math.min(1, start + 1.4 / total);
  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  const y = useTransform(progress, [start, end], [14, 0]);
  const blur = useTransform(progress, [start, end], [6, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <motion.span className="lit-word" style={{ opacity, y, filter, display: "inline-block", willChange: "opacity, transform" }}>
      {children}
      {" "}
    </motion.span>
  );
}
