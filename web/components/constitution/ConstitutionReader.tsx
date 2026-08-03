"use client";

// ─── ConstitutionReader ──────────────────────────────────────────────────────
// A three-pane reading room for the full text of the Constitution.
//   • Left  — a collapsible outline that scroll-spies the reader's position.
//   • Center — the verbatim document on a paper surface, in elegant serif type.
//   • Right — a context panel with seven tabs (plain English, history, cases,
//             related amendments, related provisions, modern examples, debates).
// Hovering a related-clause chip glows the target in the document; a timeline
// slider lights up the clauses that mattered most in each constitutional era.
//
// The document text stays in its authentic 18th-century English; the annotations
// and the interface are bilingual (EN/RO).

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  CONSTITUTION,
  CONSTITUTION_ERAS,
  type ClauseNode,
  type ClauseContext,
} from "@/lib/data/constitution-text";

// ── Palette ───────────────────────────────────────────────────────────────────
const INK = "#2a2016";
const INK_SOFT = "#5c4f3c";
const GOLD = "#8a6d1f";
const SEAL = "#7c1d12";
const PAPER = "#f4ecd8";

const SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif";

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
// Flatten the tree into the ordered list of readable leaves (Preamble + every
// Section), plus a lookup for chip labels.
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
  const [eraIdx, setEraIdx] = useState<number>(-1); // -1 = no era selected
  const [outlineOpen, setOutlineOpen] = useState(false);

  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
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
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );
    sectionRefs.current.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [leaves]);

  const focusId = selectedId ?? activeId;
  const focusNode = nodeMap.get(focusId);
  const focusCtx = focusNode?.context;

  // Which tabs are available for the focused node.
  const availableTabs = useMemo(
    () => TABS.filter((t) => tabHasContent(focusCtx, t.key, isRo)),
    [focusCtx, isRo]
  );
  // Keep the active tab valid when the focus changes.
  useEffect(() => {
    if (availableTabs.length && !availableTabs.some((t) => t.key === tab)) {
      setTab(availableTabs[0].key);
    }
  }, [availableTabs, tab]);

  const scrollToNode = useCallback((id: string) => {
    const el = sectionRefs.current.get(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setSelectedId(id);
    }
  }, []);

  // Era highlight set.
  const eraHighlights = useMemo(
    () => (eraIdx >= 0 ? new Set(CONSTITUTION_ERAS[eraIdx].highlights) : new Set<string>()),
    [eraIdx]
  );

  return (
    <div
      className="serif-headings relative"
      style={{ background: PAPER, color: INK }}
    >
      {/* Warm vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(1200px 600px at 50% -10%, rgba(138,109,31,0.12), transparent 60%)",
        }}
      />
      {/* Paper grain */}
      <div
        aria-hidden
        className="bg-parchment-texture pointer-events-none absolute inset-0 z-0 opacity-70"
      />

      {/* ── Calligraphy overture ─────────────────────────────────────────────── */}
      <Overture isRo={isRo} />

      {/* ── Timeline slider ──────────────────────────────────────────────────── */}
      <TimelineSlider
        isRo={isRo}
        eraIdx={eraIdx}
        setEraIdx={setEraIdx}
        onJump={(ids) => ids[0] && scrollToNode(ids[0])}
      />

      {/* ── Three-pane body ──────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 pb-24 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[210px_minmax(0,1fr)_380px] lg:gap-8 xl:grid-cols-[230px_minmax(0,1fr)_410px]">

          {/* ── LEFT: Outline ── */}
          <aside className="lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] lg:self-start lg:overflow-y-auto">
            {/* Mobile toggle */}
            <button
              onClick={() => setOutlineOpen((v) => !v)}
              className="mb-3 flex w-full items-center justify-between rounded-lg border px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-[0.2em] lg:hidden"
              style={{ borderColor: "rgba(138,109,31,0.3)", color: GOLD }}
            >
              {isRo ? "Cuprins" : "Outline"}
              <span>{outlineOpen ? "−" : "+"}</span>
            </button>
            <nav
              className={`${outlineOpen ? "block" : "hidden"} mb-8 lg:block`}
              aria-label={isRo ? "Cuprinsul Constituției" : "Constitution outline"}
            >
              <p
                className="mb-3 hidden text-[10px] font-semibold uppercase tracking-[0.28em] lg:block"
                style={{ color: GOLD }}
              >
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

          {/* ── CENTER: Document ── */}
          <main className="min-w-0">
            <Document
              nodes={CONSTITUTION}
              isRo={isRo}
              registerRef={registerRef}
              focusId={focusId}
              hoverId={hoverId}
              eraHighlights={eraHighlights}
              onSelect={setSelectedId}
            />
          </main>

          {/* ── RIGHT: Context ── */}
          <aside className="mt-10 lg:mt-0 lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] lg:self-start lg:overflow-y-auto">
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
    <header className="relative z-10 mx-auto max-w-4xl px-4 pt-16 pb-10 text-center sm:pt-24">
      <p
        className="mb-4 text-[11px] font-semibold uppercase tracking-[0.4em]"
        style={{ color: GOLD }}
      >
        {isRo ? "Textul integral" : "The Full Text"}
      </p>
      <div className="reader-overture">
        <span
          className="font-signature block leading-none"
          style={{ color: INK, fontSize: "clamp(3rem, 11vw, 7rem)" }}
        >
          We the People
        </span>
      </div>
      {/* Hand-drawn flourish that draws itself */}
      <svg
        viewBox="0 0 400 40"
        className="mx-auto mt-2 h-8 w-64"
        fill="none"
        aria-hidden
      >
        <path
          d="M10 25 C 80 5, 140 5, 200 22 S 320 40, 390 15"
          stroke={GOLD}
          strokeWidth="2"
          strokeLinecap="round"
          className="reader-flourish"
        />
      </svg>
      <p
        className="mx-auto mt-6 max-w-xl text-base leading-relaxed"
        style={{ color: INK_SOFT, fontFamily: SERIF }}
      >
        {isRo
          ? "Constituția Statelor Unite, cuvânt cu cuvânt. Alege o secțiune pentru a-i vedea traducerea, istoria, cazurile-cheie și dezbaterile din jurul ei."
          : "The Constitution of the United States, word for word. Select any section to read its plain-English meaning, its history, the landmark cases, and the debates that still surround it."}
      </p>

      <style>{`
        .reader-overture span { opacity: 0; animation: readerFade 1.4s ease forwards 0.15s; }
        .reader-flourish {
          stroke-dasharray: 620;
          stroke-dashoffset: 620;
          animation: readerDraw 2s ease forwards 0.7s;
        }
        @keyframes readerFade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        @keyframes readerDraw { to { stroke-dashoffset: 0; } }
        @media (prefers-reduced-motion: reduce) {
          .reader-overture span { opacity: 1; animation: none; }
          .reader-flourish { stroke-dashoffset: 0; animation: none; }
        }
      `}</style>
    </header>
  );
}

// ── Timeline slider ───────────────────────────────────────────────────────────
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
    <div className="relative z-10 mx-auto mb-4 max-w-4xl px-4">
      <div
        className="rounded-2xl border px-5 py-4"
        style={{ borderColor: "rgba(138,109,31,0.25)", background: "rgba(255,255,255,0.35)" }}
      >
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em]" style={{ color: GOLD }}>
            {isRo ? "Cronologie" : "Timeline"}
          </p>
          {active && (
            <button
              onClick={() => setEraIdx(-1)}
              className="text-[10px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: SEAL }}
            >
              {isRo ? "Resetează" : "Reset"}
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {CONSTITUTION_ERAS.map((era, i) => {
            const on = i === eraIdx;
            return (
              <button
                key={era.id}
                onClick={() => {
                  setEraIdx(on ? -1 : i);
                  if (!on) onJump(era.highlights);
                }}
                className="rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors"
                style={{
                  borderColor: on ? SEAL : "rgba(138,109,31,0.3)",
                  background: on ? SEAL : "transparent",
                  color: on ? PAPER : INK_SOFT,
                }}
              >
                <span style={{ fontFamily: SERIF }}>{era.year}</span>
                <span className="ml-1.5 hidden sm:inline">{isRo ? era.labelRo : era.label}</span>
              </button>
            );
          })}
        </div>
        {active && (
          <p className="mt-3 text-sm leading-relaxed" style={{ color: INK_SOFT, fontFamily: SERIF }}>
            <span className="font-semibold" style={{ color: INK }}>
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
              <p
                className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em]"
                style={{ color: GOLD, fontFamily: SERIF }}
              >
                {node.ref}
              </p>
              <ul className="space-y-0.5 border-l pl-3" style={{ borderColor: "rgba(138,109,31,0.25)" }}>
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
  // A short label: use the section number for nested items, else the ref.
  const label = nested
    ? (isRo ? node.headingRo : node.heading).replace(/^Section\s+/i, "§").replace(/^Secțiunea\s+/i, "§").split("—")[0].trim()
    : (isRo ? node.headingRo : node.heading);
  return (
    <li>
      <button
        onClick={() => onSelect(node.id)}
        className="group block w-full rounded px-2 py-1 text-left text-[13px] leading-snug transition-colors"
        style={{
          color: isFocus ? SEAL : isActive ? INK : INK_SOFT,
          background: isFocus ? "rgba(124,29,18,0.07)" : "transparent",
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
            background: eraOn ? GOLD : isFocus ? SEAL : "transparent",
            boxShadow: eraOn ? `0 0 6px ${GOLD}` : "none",
          }}
        />
        {label}
      </button>
    </li>
  );
}

// ── Document (center) ─────────────────────────────────────────────────────────
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
          className="mb-6 mt-14 border-b pb-3 text-center text-3xl font-bold first:mt-0 sm:text-4xl"
          style={{ color: INK, fontFamily: SERIF, borderColor: "rgba(138,109,31,0.3)" }}
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
  return <div className="mx-auto max-w-[46rem]">{blocks}</div>;
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
  const paras = node.text.split("\n\n");

  return (
    <section
      ref={(el) => registerRef(node.id, el)}
      data-node-id={node.id}
      onClick={() => onSelect(node.id)}
      className="group relative scroll-mt-6 cursor-pointer rounded-lg px-4 py-5 transition-all sm:px-6"
      style={{
        background: isHover
          ? "rgba(138,109,31,0.14)"
          : isFocus
          ? "rgba(124,29,18,0.04)"
          : "transparent",
        boxShadow: isFocus ? `inset 3px 0 0 ${SEAL}` : eraOn ? `inset 3px 0 0 ${GOLD}` : "none",
      }}
    >
      <div className="mb-2 flex items-center gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>
          {node.ref}
        </span>
        {node.amended && (
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
            style={{ background: "rgba(124,29,18,0.1)", color: SEAL }}
          >
            {isRo ? "Modificat" : "Amended"}
          </span>
        )}
        <span
          className="ml-auto text-[10px] font-semibold uppercase tracking-[0.2em] opacity-0 transition-opacity group-hover:opacity-100"
          style={{ color: SEAL }}
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
          style={{ borderColor: SEAL, color: INK_SOFT, background: "rgba(124,29,18,0.05)", fontFamily: SERIF }}
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
          color: ${SEAL};
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
    <div
      className="rounded-2xl border p-5 sm:p-6"
      style={{ borderColor: "rgba(138,109,31,0.28)", background: "rgba(255,255,255,0.45)" }}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.28em]" style={{ color: GOLD }}>
        {node?.ref ?? ""}
      </p>
      <h4 className="mt-1 text-lg font-bold leading-tight" style={{ color: INK, fontFamily: SERIF }}>
        {node ? (isRo ? node.headingRo : node.heading) : ""}
      </h4>

      {!ctx || availableTabs.length === 0 ? (
        <p className="mt-4 text-sm leading-relaxed" style={{ color: INK_SOFT, fontFamily: SERIF }}>
          {isRo
            ? "Selectează o secțiune din text pentru a-i vedea contextul: explicație pe înțeles, istorie, cazuri la Curtea Supremă și dezbateri."
            : "Select a section of the text to see its context: plain-English meaning, history, Supreme Court cases, and the debates around it."}
        </p>
      ) : (
        <>
          {/* Tabs */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {availableTabs.map((t) => {
              const on = t.key === tab;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className="rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors"
                  style={{
                    background: on ? INK : "transparent",
                    color: on ? PAPER : INK_SOFT,
                    border: `1px solid ${on ? INK : "rgba(138,109,31,0.3)"}`,
                  }}
                >
                  {isRo ? t.ro : t.en}
                </button>
              );
            })}
          </div>

          {/* Body */}
          <div className="mt-4 text-[15px] leading-relaxed" style={{ color: INK, fontFamily: SERIF }}>
            {tab === "cases" ? (
              <ul className="space-y-3">
                {ctx.cases.map((c) => (
                  <li key={c.name}>
                    <p className="font-semibold" style={{ color: SEAL }}>
                      {c.name} <span style={{ color: INK_SOFT }}>· {c.year}</span>
                    </p>
                    <p className="text-sm" style={{ color: INK_SOFT }}>
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
                        borderColor: "rgba(138,109,31,0.35)",
                        color: target ? SEAL : INK_SOFT,
                        cursor: target ? "pointer" : "default",
                      }}
                      title={target ? (isRo ? target.headingRo : target.heading) : undefined}
                    >
                      {label}
                    </button>
                  );
                })}
                {tab === "amendments" && (
                  <p className="mt-1 w-full text-xs italic" style={{ color: INK_SOFT }}>
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
