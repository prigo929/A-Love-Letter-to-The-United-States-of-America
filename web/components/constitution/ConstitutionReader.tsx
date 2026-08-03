"use client";

// ─── ConstitutionReader ──────────────────────────────────────────────────────
// A three-pane reading room for the full text of the Constitution, themed to
// match the rest of the Constitution exhibit: a dark, museum-like surround with
// the document itself set on a lit sheet of parchment.
//   • Left  — a sticky outline that scroll-spies the reader's position.
//   • Center — the verbatim document on a paper sheet, in elegant serif type.
//   • Right — a sticky context panel with seven tabs (plain English, history,
//             cases, related amendments, related provisions, examples, debates).
// A sticky timeline strip lights up the clauses that mattered in each era; a
// reading-progress bar tracks how far through the document you are.
//
// The document text stays in its authentic 18th-century English; the annotations
// and the interface are bilingual (EN/RO).

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { WeThePeopleSignature } from "@/components/constitution/WeThePeopleSignature";
import {
  CONSTITUTION,
  CONSTITUTION_ERAS,
  type ClauseNode,
  type ClauseContext,
} from "@/lib/data/constitution-text";

// ── Dark surround palette (matches the Constitution hub) ──────────────────────
const VOID = "#080B12";
const PANEL = "#10151C";
const GOLD = "#C9A84C";
const GOLD_LINE = "rgba(201,168,76,0.18)";
const CREAM = "#F5F0E8";
const MUTE = "#B8B4AC";
const FAINT = "#7C776B";
const EMBER = "#D9895F"; // warm red-gold used for the active clause on dark

// ── Paper (document) palette ──────────────────────────────────────────────────
const PAPER = "#f2e8cf";
const INK = "#2a2016";
const INK_SOFT = "#5c4f3c";
const PGOLD = "#8a6d1f";
const PSEAL = "#7c1d12";

const SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif";
const PAPER_TEXTURE = "/images/constitution/parchment-paper.jpg";

// Sticky offsets (the site header is fixed at h-20 ≈ 5rem).
const TIMELINE_TOP = "lg:top-[5.5rem]";
const PANEL_TOP = "lg:top-[9.5rem]";
const PANEL_MAXH = "lg:max-h-[calc(100vh-10.5rem)]";

// ── Tab definitions ───────────────────────────────────────────────────────────
type TabKey = keyof Pick<
  ClauseContext,
  "plain" | "history" | "cases" | "amendments" | "related" | "examples" | "debates"
>;

const TABS: { key: TabKey; en: string; ro: string }[] = [
  { key: "plain", en: "Plain English", ro: "Pe înțeles" },
  { key: "history", en: "History", ro: "Istorie" },
  { key: "cases", en: "Key cases", ro: "Cazuri-cheie" },
  { key: "amendments", en: "Amendments", ro: "Amendamente" },
  { key: "related", en: "Related", ro: "Conexe" },
  { key: "examples", en: "Modern examples", ro: "Exemple moderne" },
  { key: "debates", en: "Debates", ro: "Dezbateri" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function collectLeaves(nodes: ClauseNode[]): ClauseNode[] {
  const out: ClauseNode[] = [];
  for (const n of nodes) {
    if (n.children && n.children.length) out.push(...collectLeaves(n.children));
    else out.push(n);
  }
  return out;
}
function collectAll(nodes: ClauseNode[], map: Map<string, ClauseNode>) {
  for (const n of nodes) {
    map.set(n.id, n);
    if (n.children) collectAll(n.children, map);
  }
}
function tabHasContent(ctx: ClauseContext | undefined, key: TabKey, isRo: boolean): boolean {
  if (!ctx) return false;
  if (key === "cases") return ctx.cases.length > 0;
  if (key === "amendments") return ctx.amendments.length > 0;
  if (key === "related") return ctx.related.length > 0;
  if (key === "plain") return Boolean(isRo ? ctx.plainRo : ctx.plain);
  if (key === "history") return Boolean(isRo ? ctx.historyRo : ctx.history);
  if (key === "examples") return Boolean(isRo ? ctx.examplesRo : ctx.examples);
  if (key === "debates") return Boolean(isRo ? ctx.debatesRo : ctx.debates);
  return false;
}

export function ConstitutionReader() {
  const { locale } = useLanguage();
  const isRo = locale === "ro";

  const leaves = useMemo(() => collectLeaves(CONSTITUTION), []);
  const nodeMap = useMemo(() => {
    const m = new Map<string, ClauseNode>();
    collectAll(CONSTITUTION, m);
    return m;
  }, []);

  const [activeId, setActiveId] = useState<string>(leaves[0]?.id ?? "");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tab, setTab] = useState<TabKey>("plain");
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [eraIdx, setEraIdx] = useState<number>(-1);
  const [outlineOpen, setOutlineOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const docRef = useRef<HTMLDivElement>(null);
  const registerRef = useCallback((id: string, el: HTMLElement | null) => {
    if (el) sectionRefs.current.set(id, el);
    else sectionRefs.current.delete(id);
  }, []);

  // Scroll-spy: track which section is nearest the top of the viewport.
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId((visible[0].target as HTMLElement).dataset.nodeId || "");
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    sectionRefs.current.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [leaves]);

  // Reading-progress: how far through the document sheet we have scrolled.
  useEffect(() => {
    const onScroll = () => {
      const el = docRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const passed = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      setProgress(total > 0 ? passed / total : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const focusId = selectedId ?? activeId;
  const focusNode = nodeMap.get(focusId);
  const focusCtx = focusNode?.context;

  const availableTabs = useMemo(
    () => TABS.filter((t) => tabHasContent(focusCtx, t.key, isRo)),
    [focusCtx, isRo]
  );
  useEffect(() => {
    if (availableTabs.length && !availableTabs.some((t) => t.key === tab)) {
      setTab(availableTabs[0].key);
    }
  }, [availableTabs, tab]);

  const scrollToNode = useCallback((id: string) => {
    const el = sectionRefs.current.get(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 150;
      window.scrollTo({ top: y, behavior: "smooth" });
      setSelectedId(id);
    }
  }, []);

  const eraHighlights = useMemo(
    () => (eraIdx >= 0 ? new Set(CONSTITUTION_ERAS[eraIdx].highlights) : new Set<string>()),
    [eraIdx]
  );

  return (
    <div className="serif-headings relative" style={{ background: VOID, color: CREAM }}>
      {/* Marble ambient layer, matching the rest of the exhibit */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/constitution/marble-texture.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "512px 512px",
          opacity: 0.03,
          mixBlendMode: "screen",
        }}
      />
      {/* Reading-progress bar, pinned just under the fixed site header */}
      <div className="fixed left-0 right-0 top-16 z-40 h-[3px] bg-transparent md:top-20">
        <div
          className="h-full origin-left transition-[width] duration-150"
          style={{ width: `${progress * 100}%`, background: `linear-gradient(90deg, ${PGOLD}, ${GOLD})` }}
        />
      </div>

      <Overture isRo={isRo} />

      <TimelineSlider
        isRo={isRo}
        eraIdx={eraIdx}
        setEraIdx={setEraIdx}
        onJump={(ids) => ids[0] && scrollToNode(ids[0])}
      />

      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 pb-28 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
        <div className="lg:grid lg:grid-cols-[230px_minmax(0,1fr)_420px] lg:gap-8 xl:grid-cols-[260px_minmax(0,1fr)_460px]">

          {/* ── LEFT: Outline ── */}
          <aside className={`${PANEL_TOP} lg:sticky ${PANEL_MAXH} lg:self-start lg:overflow-y-auto lg:pr-1`}>
            <button
              onClick={() => setOutlineOpen((v) => !v)}
              className="mb-3 flex w-full items-center justify-between rounded-lg border px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-[0.2em] lg:hidden"
              style={{ borderColor: GOLD_LINE, color: GOLD }}
            >
              {isRo ? "Cuprins" : "Outline"}
              <span>{outlineOpen ? "−" : "+"}</span>
            </button>
            <nav
              className={`${outlineOpen ? "block" : "hidden"} mb-8 lg:block`}
              aria-label={isRo ? "Cuprinsul Constituției" : "Constitution outline"}
            >
              <p className="mb-3 hidden text-[10px] font-semibold uppercase tracking-[0.28em] lg:block" style={{ color: GOLD }}>
                {isRo ? "Cuprins" : "The Document"}
              </p>
              <Outline
                nodes={CONSTITUTION}
                isRo={isRo}
                focusId={focusId}
                activeId={activeId}
                eraHighlights={eraHighlights}
                onSelect={(id) => {
                  scrollToNode(id);
                  setOutlineOpen(false);
                }}
              />
            </nav>
          </aside>

          {/* ── CENTER: Document sheet ── */}
          <main className="min-w-0">
            <div
              ref={docRef}
              className="relative overflow-hidden rounded-2xl px-5 py-10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] ring-1 sm:px-10 md:px-14"
              style={{
                backgroundColor: PAPER,
                backgroundImage: `linear-gradient(rgba(242,232,207,0.55), rgba(242,232,207,0.55)), url('${PAPER_TEXTURE}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Warm inner glow at the top of the sheet */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ boxShadow: `inset 0 0 120px rgba(124,29,18,0.06)` }}
              />
              <Document
                nodes={CONSTITUTION}
                isRo={isRo}
                registerRef={registerRef}
                focusId={focusId}
                hoverId={hoverId}
                eraHighlights={eraHighlights}
                onSelect={setSelectedId}
              />
            </div>
          </main>

          {/* ── RIGHT: Context ── */}
          <aside className={`mt-10 lg:mt-0 ${PANEL_TOP} lg:sticky ${PANEL_MAXH} lg:self-start lg:overflow-y-auto lg:pl-1`}>
            <ContextPanel
              node={focusNode}
              ctx={focusCtx}
              isRo={isRo}
              tab={tab}
              setTab={setTab}
              availableTabs={availableTabs}
              nodeMap={nodeMap}
              onHover={setHoverId}
              onJump={scrollToNode}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}

// ── Calligraphy overture ──────────────────────────────────────────────────────
function Overture({ isRo }: { isRo: boolean }) {
  return (
    <header className="relative z-10 mx-auto max-w-4xl px-4 pt-16 pb-8 text-center sm:pt-20">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.4em]" style={{ color: GOLD }}>
        {isRo ? "Textul integral" : "The Full Text"}
      </p>
      {/* The same self-drawing 1787 calligraphy used on the Constitution hub */}
      <WeThePeopleSignature />
      <p className="mx-auto -mt-2 max-w-xl text-base leading-relaxed" style={{ color: MUTE, fontFamily: SERIF }}>
        {isRo
          ? "Constituția Statelor Unite, cuvânt cu cuvânt. Alege orice secțiune pentru a-i vedea traducerea pe înțeles, istoria, cazurile-cheie și dezbaterile din jurul ei."
          : "The Constitution of the United States, word for word. Select any section to read its plain-English meaning, its history, the landmark cases, and the debates that still surround it."}
      </p>
    </header>
  );
}

// ── Timeline slider (sticky strip) ────────────────────────────────────────────
function TimelineSlider({
  isRo,
  eraIdx,
  setEraIdx,
  onJump,
}: {
  isRo: boolean;
  eraIdx: number;
  setEraIdx: (i: number) => void;
  onJump: (ids: string[]) => void;
}) {
  const active = eraIdx >= 0 ? CONSTITUTION_ERAS[eraIdx] : null;
  return (
    <div className={`sticky ${TIMELINE_TOP} z-30 mb-6`}>
      <div
        className="w-full border-y px-4 py-3 backdrop-blur-md sm:px-6 lg:px-10"
        style={{ borderColor: GOLD_LINE, background: "rgba(8,11,18,0.82)" }}
      >
        <div className="flex items-center gap-3 overflow-x-auto">
          <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.28em]" style={{ color: GOLD }}>
            {isRo ? "Cronologie" : "Timeline"}
          </span>
          <div className="flex gap-2">
            {CONSTITUTION_ERAS.map((era, i) => {
              const on = i === eraIdx;
              return (
                <button
                  key={era.id}
                  onClick={() => {
                    setEraIdx(on ? -1 : i);
                    if (!on) onJump(era.highlights);
                  }}
                  className="shrink-0 rounded-full border px-3 py-1 text-xs font-semibold transition-colors"
                  style={{
                    borderColor: on ? GOLD : GOLD_LINE,
                    background: on ? "rgba(201,168,76,0.15)" : "transparent",
                    color: on ? GOLD : MUTE,
                  }}
                >
                  <span style={{ fontFamily: SERIF }}>{era.year}</span>
                  <span className="ml-1.5 hidden md:inline">{isRo ? era.labelRo : era.label}</span>
                </button>
              );
            })}
          </div>
          {active && (
            <button
              onClick={() => setEraIdx(-1)}
              className="ml-auto shrink-0 text-[10px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: EMBER }}
            >
              {isRo ? "Resetează" : "Reset"}
            </button>
          )}
        </div>
        {active && (
          <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTE, fontFamily: SERIF }}>
            <span className="font-semibold" style={{ color: CREAM }}>
              {isRo ? active.labelRo : active.label}.
            </span>{" "}
            {isRo ? active.blurbRo : active.blurb}
          </p>
        )}
      </div>
    </div>
  );
}

// ── Outline (left) ────────────────────────────────────────────────────────────
function Outline({
  nodes,
  isRo,
  focusId,
  activeId,
  eraHighlights,
  onSelect,
}: {
  nodes: ClauseNode[];
  isRo: boolean;
  focusId: string;
  activeId: string;
  eraHighlights: Set<string>;
  onSelect: (id: string) => void;
}) {
  return (
    <ul className="space-y-1">
      {nodes.map((node) => {
        const isGroup = Boolean(node.children?.length);
        if (isGroup) {
          return (
            <li key={node.id} className="pt-2">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: GOLD, fontFamily: SERIF }}>
                {node.ref}
              </p>
              <ul className="space-y-0.5 border-l pl-3" style={{ borderColor: GOLD_LINE }}>
                {node.children!.map((child) => (
                  <OutlineLink
                    key={child.id}
                    node={child}
                    isRo={isRo}
                    focusId={focusId}
                    activeId={activeId}
                    eraOn={eraHighlights.has(child.id)}
                    onSelect={onSelect}
                    nested
                  />
                ))}
              </ul>
            </li>
          );
        }
        return (
          <OutlineLink
            key={node.id}
            node={node}
            isRo={isRo}
            focusId={focusId}
            activeId={activeId}
            eraOn={eraHighlights.has(node.id)}
            onSelect={onSelect}
          />
        );
      })}
    </ul>
  );
}

function OutlineLink({
  node,
  isRo,
  focusId,
  activeId,
  eraOn,
  onSelect,
  nested,
}: {
  node: ClauseNode;
  isRo: boolean;
  focusId: string;
  activeId: string;
  eraOn: boolean;
  onSelect: (id: string) => void;
  nested?: boolean;
}) {
  const isActive = node.id === activeId;
  const isFocus = node.id === focusId;
  const label = nested
    ? (isRo ? node.headingRo : node.heading)
        .replace(/^Section\s+/i, "§")
        .replace(/^Secțiunea\s+/i, "§")
        .split("—")[0]
        .trim()
    : (isRo ? node.headingRo : node.heading);
  return (
    <li>
      <button
        onClick={() => onSelect(node.id)}
        className="group block w-full rounded px-2 py-1 text-left text-[13px] leading-snug transition-colors"
        style={{
          color: isFocus ? GOLD : isActive ? CREAM : MUTE,
          background: isFocus ? "rgba(201,168,76,0.1)" : "transparent",
          fontWeight: isActive || isFocus ? 700 : 400,
          fontFamily: SERIF,
        }}
      >
        <span
          className="mr-1.5 inline-block align-middle"
          style={{
            width: 6,
            height: 6,
            borderRadius: 9999,
            background: eraOn ? GOLD : isFocus ? GOLD : "transparent",
            boxShadow: eraOn ? `0 0 6px ${GOLD}` : "none",
          }}
        />
        {label}
      </button>
    </li>
  );
}

// ── Document (center, on paper) ───────────────────────────────────────────────
function Document({
  nodes,
  isRo,
  registerRef,
  focusId,
  hoverId,
  eraHighlights,
  onSelect,
}: {
  nodes: ClauseNode[];
  isRo: boolean;
  registerRef: (id: string, el: HTMLElement | null) => void;
  focusId: string;
  hoverId: string | null;
  eraHighlights: Set<string>;
  onSelect: (id: string) => void;
}) {
  let firstLeaf = true;
  const blocks: React.ReactNode[] = [];

  for (const node of nodes) {
    if (node.children?.length) {
      blocks.push(
        <h2
          key={node.id}
          className="mb-6 mt-16 border-b pb-3 text-center text-3xl font-bold first:mt-0 sm:text-4xl"
          style={{ color: INK, fontFamily: SERIF, borderColor: "rgba(138,109,31,0.35)" }}
        >
          {isRo ? node.headingRo : node.heading}
        </h2>
      );
      for (const child of node.children) {
        blocks.push(
          <Section
            key={child.id}
            node={child}
            isRo={isRo}
            drop={firstLeaf}
            registerRef={registerRef}
            focusId={focusId}
            hoverId={hoverId}
            eraOn={eraHighlights.has(child.id)}
            onSelect={onSelect}
          />
        );
        firstLeaf = false;
      }
    } else {
      blocks.push(
        <Section
          key={node.id}
          node={node}
          isRo={isRo}
          drop={firstLeaf}
          registerRef={registerRef}
          focusId={focusId}
          hoverId={hoverId}
          eraOn={eraHighlights.has(node.id)}
          onSelect={onSelect}
          preamble
        />
      );
      firstLeaf = false;
    }
  }
  return <div className="relative mx-auto max-w-[46rem]">{blocks}</div>;
}

function Section({
  node,
  isRo,
  drop,
  registerRef,
  focusId,
  hoverId,
  eraOn,
  onSelect,
  preamble,
}: {
  node: ClauseNode;
  isRo: boolean;
  drop: boolean;
  registerRef: (id: string, el: HTMLElement | null) => void;
  focusId: string;
  hoverId: string | null;
  eraOn: boolean;
  onSelect: (id: string) => void;
  preamble?: boolean;
}) {
  const isFocus = node.id === focusId;
  const isHover = node.id === hoverId;
  const body = isRo && node.textRo ? node.textRo : node.text;
  const paras = body.split("\n\n");

  return (
    <section
      ref={(el) => registerRef(node.id, el)}
      data-node-id={node.id}
      onClick={() => onSelect(node.id)}
      className="group relative scroll-mt-40 cursor-pointer rounded-lg px-4 py-5 transition-all sm:px-6"
      style={{
        background: isHover ? "rgba(138,109,31,0.16)" : isFocus ? "rgba(124,29,18,0.05)" : "transparent",
        boxShadow: isFocus ? `inset 3px 0 0 ${PSEAL}` : eraOn ? `inset 3px 0 0 ${PGOLD}` : "none",
      }}
    >
      <div className="mb-2 flex items-center gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: PGOLD }}>
          {node.ref}
        </span>
        {node.amended && (
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
            style={{ background: "rgba(124,29,18,0.1)", color: PSEAL }}
          >
            {isRo ? "Modificat" : "Amended"}
          </span>
        )}
        <span
          className="ml-auto text-[10px] font-semibold uppercase tracking-[0.2em] opacity-0 transition-opacity group-hover:opacity-100"
          style={{ color: PSEAL }}
        >
          {isRo ? "Context →" : "Context →"}
        </span>
      </div>

      {!preamble && (
        <h3 className="mb-3 text-xl font-bold sm:text-2xl" style={{ color: INK, fontFamily: SERIF }}>
          {isRo ? node.headingRo : node.heading}
        </h3>
      )}

      {paras.map((p, i) => (
        <p
          key={i}
          className={`mb-4 text-[17px] leading-[1.85] ${drop && i === 0 ? "reader-dropcap" : ""}`}
          style={{ color: INK, fontFamily: SERIF, whiteSpace: "pre-line" }}
        >
          {p}
        </p>
      ))}

      {node.amended && (node.amendedNote || node.amendedNoteRo) && (
        <p
          className="mt-3 rounded-md border-l-2 px-4 py-2 text-sm italic leading-relaxed"
          style={{ borderColor: PSEAL, color: INK_SOFT, background: "rgba(124,29,18,0.05)", fontFamily: SERIF }}
        >
          {isRo ? node.amendedNoteRo : node.amendedNote}
        </p>
      )}

      <style>{`
        .reader-dropcap::first-letter {
          font-size: 3.4em;
          line-height: 0.8;
          float: left;
          padding: 0.05em 0.12em 0 0;
          color: ${PSEAL};
          font-family: ${SERIF};
          font-weight: 700;
        }
      `}</style>
    </section>
  );
}

// ── Context panel (right) ─────────────────────────────────────────────────────
function ContextPanel({
  node,
  ctx,
  isRo,
  tab,
  setTab,
  availableTabs,
  nodeMap,
  onHover,
  onJump,
}: {
  node: ClauseNode | undefined;
  ctx: ClauseContext | undefined;
  isRo: boolean;
  tab: TabKey;
  setTab: (t: TabKey) => void;
  availableTabs: { key: TabKey; en: string; ro: string }[];
  nodeMap: Map<string, ClauseNode>;
  onHover: (id: string | null) => void;
  onJump: (id: string) => void;
}) {
  return (
    <div className="rounded-2xl border p-5 sm:p-6" style={{ borderColor: GOLD_LINE, background: PANEL }}>
      <p className="text-[10px] font-semibold uppercase tracking-[0.28em]" style={{ color: GOLD }}>
        {node?.ref ?? ""}
      </p>
      <h4 className="mt-1 text-lg font-bold leading-tight" style={{ color: CREAM, fontFamily: SERIF }}>
        {node ? (isRo ? node.headingRo : node.heading) : ""}
      </h4>

      {!ctx || availableTabs.length === 0 ? (
        <p className="mt-4 text-sm leading-relaxed" style={{ color: MUTE, fontFamily: SERIF }}>
          {isRo
            ? "Selectează o secțiune din text pentru a-i vedea contextul: explicație pe înțeles, istorie, cazuri la Curtea Supremă și dezbateri."
            : "Select a section of the text to see its context: plain-English meaning, history, Supreme Court cases, and the debates around it."}
        </p>
      ) : (
        <>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {availableTabs.map((t) => {
              const on = t.key === tab;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className="rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors"
                  style={{
                    background: on ? GOLD : "transparent",
                    color: on ? VOID : MUTE,
                    border: `1px solid ${on ? GOLD : GOLD_LINE}`,
                  }}
                >
                  {isRo ? t.ro : t.en}
                </button>
              );
            })}
          </div>

          <div className="mt-4 text-[15px] leading-relaxed" style={{ color: CREAM, fontFamily: SERIF }}>
            {tab === "cases" ? (
              <ul className="space-y-3">
                {ctx.cases.map((c) => (
                  <li key={c.name}>
                    <p className="font-semibold" style={{ color: GOLD }}>
                      {c.name} <span style={{ color: FAINT }}>· {c.year}</span>
                    </p>
                    <p className="text-sm" style={{ color: MUTE }}>
                      {isRo ? c.noteRo : c.note}
                    </p>
                  </li>
                ))}
              </ul>
            ) : tab === "amendments" || tab === "related" ? (
              <div className="flex flex-wrap gap-2">
                {(tab === "amendments" ? ctx.amendments : ctx.related).map((id) => {
                  const target = nodeMap.get(id);
                  const label = target ? target.ref : id.replace("amend-", isRo ? "Am. " : "Amend. ");
                  return (
                    <button
                      key={id}
                      onMouseEnter={() => onHover(id)}
                      onMouseLeave={() => onHover(null)}
                      onFocus={() => onHover(id)}
                      onBlur={() => onHover(null)}
                      onClick={() => target && onJump(id)}
                      className="rounded-full border px-3 py-1 text-xs font-semibold transition-colors"
                      style={{
                        borderColor: GOLD_LINE,
                        color: target ? GOLD : FAINT,
                        cursor: target ? "pointer" : "default",
                      }}
                      title={target ? (isRo ? target.headingRo : target.heading) : undefined}
                    >
                      {label}
                    </button>
                  );
                })}
                {tab === "amendments" && (
                  <p className="mt-1 w-full text-xs italic" style={{ color: FAINT }}>
                    {isRo
                      ? "Amendamentele conexe vor deveni interactive pe măsură ce sunt adăugate."
                      : "Related amendments become clickable as they are added to the reader."}
                  </p>
                )}
              </div>
            ) : (
              <p>
                {tab === "plain" && (isRo ? ctx.plainRo : ctx.plain)}
                {tab === "history" && (isRo ? ctx.historyRo : ctx.history)}
                {tab === "examples" && (isRo ? ctx.examplesRo : ctx.examples)}
                {tab === "debates" && (isRo ? ctx.debatesRo : ctx.debates)}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
