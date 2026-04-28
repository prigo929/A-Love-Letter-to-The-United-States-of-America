"use client";

import { useState, useEffect, useRef, useCallback, useMemo, useId } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, animate } from "framer-motion";
import Image from "next/image";
import { BLUR_PLACEHOLDER } from "@/lib/utils";
import type { ConstitutionClause, FoundingFather, Amendment, PresidentialTransfer, StatePolicy, PowersCheckExample } from "@/lib/data/constitution-data";

// ── Aurora ────────────────────────────────────────────────────────────────────

export function ConstitutionAurora() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <style>{`
        @keyframes ca1{0%,100%{transform:translate(-10%,-10%) scale(1.1)}50%{transform:translate(5%,8%) scale(1.05)}}
        @keyframes ca2{0%,100%{transform:translate(10%,5%) scale(1)}50%{transform:translate(-8%,-12%) scale(1.08)}}
        @keyframes ca3{0%,100%{transform:translate(0,0) scale(1.05)}33%{transform:translate(-5%,10%) scale(1)}66%{transform:translate(8%,-5%) scale(1.1)}}
      `}</style>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 80% 60% at 30% 20%,rgba(201,168,76,.06) 0%,rgba(201,168,76,.02) 40%,transparent 70%)",animation:"ca1 120s ease-in-out infinite",mixBlendMode:"screen"}}/>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 70% 50% at 70% 70%,rgba(139,26,26,.04) 0%,transparent 60%)",animation:"ca2 90s ease-in-out infinite reverse",mixBlendMode:"screen"}}/>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 90% 70% at 50% 50%,rgba(27,45,79,.07) 0%,transparent 55%)",animation:"ca3 150s linear infinite",mixBlendMode:"screen"}}/>
    </div>
  );
}

// ── InkParticles ──────────────────────────────────────────────────────────────

function hashString(value: string) {
  let hash = 2166136261;

  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function createSeededRandom(seed: number) {
  let state = seed || 1;

  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export function InkParticles({ count = 120 }: { count?: number }) {
  const instanceId = useId();
  const particles = useMemo(() => {
    const random = createSeededRandom(hashString(`${instanceId}:${count}`));

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: random() * 100,
      y: random() * 100,
      size: 0.5 + random() * 2.5,
      dur: 18 + random() * 30,
      delay: random() * -40,
      dx: (random() - 0.5) * 8,
      dy: (random() - 0.5) * 8,
    }));
  }, [count, instanceId]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <style>{`@keyframes ink-drift{0%,100%{transform:translate(0,0);opacity:.04}25%{transform:translate(var(--dx),var(--dy));opacity:.08}50%{transform:translate(calc(var(--dx)*.5),calc(var(--dy)*-.3));opacity:.05}75%{transform:translate(calc(var(--dx)*-.3),calc(var(--dy)*.8));opacity:.07}}`}</style>
      {particles.map(p=>(
        <div key={p.id} className="absolute rounded-full" style={{left:`${p.x}%`,top:`${p.y}%`,width:p.size,height:p.size,backgroundColor:"rgba(201,168,76,.6)","--dx":`${p.dx}px`,"--dy":`${p.dy}px`,animation:`ink-drift ${p.dur}s ease-in-out ${p.delay}s infinite`} as React.CSSProperties}/>
      ))}
    </div>
  );
}

// ── CountUp helper ────────────────────────────────────────────────────────────

function CountUp({ to, delay=0 }: { to: number; delay?: number }) {
  const ref  = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv   = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => {
      const ctrl = animate(mv, to, {
        duration: 2.2, ease: [0.16,1,0.3,1],
        onUpdate: v => {
          if (!ref.current) return;
          ref.current.textContent = to>=1_000_000
            ? `${(v/1_000_000).toFixed(1)}B`
            : v.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
      });
      return ctrl.stop;
    }, delay);
    return () => clearTimeout(t);
  }, [inView, to, delay, mv]);

  return <span ref={ref}>0</span>;
}

// ── MetricCard ────────────────────────────────────────────────────────────────

export function MetricCard({ value, suffix="", label, sublabel, delay=0 }: {
  value: number; suffix?: string; label: string; sublabel: string; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity:0, y:40, scale:.95 }}
      whileInView={{ opacity:1, y:0, scale:1 }}
      viewport={{ once:true, margin:"-60px" }}
      transition={{ duration:.7, delay, ease:[0.16,1,0.3,1] }}
      whileHover={{ y:-6, transition:{ duration:.25 } }}
      className="group relative rounded-xl border border-[rgba(201,168,76,.2)] bg-[rgba(18,24,31,.7)] p-7 backdrop-blur-xl transition-all duration-300 hover:border-[rgba(201,168,76,.5)] hover:shadow-[0_0_40px_rgba(201,168,76,.12),0_0_80px_rgba(201,168,76,.06),inset_0_1px_0_rgba(201,168,76,.15)]"
    >
      <p className="mb-2 font-display leading-none" style={{ fontSize:"clamp(40px,5vw,64px)", background:"linear-gradient(180deg,#E8C878 0%,#C9A84C 50%,#8B6A2A 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
        <CountUp to={value} delay={delay*1000}/>{suffix}
      </p>
      <p className="font-body text-sm font-semibold leading-snug text-[#F5F0E8]">{label}</p>
      <p className="mt-1 font-body text-xs text-[#6B6860]">{sublabel}</p>
    </motion.div>
  );
}

// ── ClauseVault ───────────────────────────────────────────────────────────────

const TENSION_COLORS: Record<string,string> = { settled:"#4ade80", moderate:"#fbbf24", contested:"#fb923c", "highly-contested":"#ef4444" };
const TENSION_LABELS: Record<string,string> = { settled:"Settled Law", moderate:"Moderately Contested", contested:"Actively Contested", "highly-contested":"Highly Contested" };

export function ClauseVault({ clauses }: { clauses: ConstitutionClause[] }) {
  const [active, setActive]   = useState<ConstitutionClause|null>(null);
  const [hovered, setHovered] = useState<string|null>(null);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
      {/* Parchment */}
      <div className="relative overflow-hidden rounded-2xl" style={{ background:"linear-gradient(168deg,#F9F3E3 0%,#F4EDD8 30%,#EDE4C8 65%,#E8DDB8 100%)", backgroundImage:"repeating-linear-gradient(92deg,transparent,transparent 3px,rgba(180,160,120,.08) 3px,rgba(180,160,120,.08) 4px),repeating-linear-gradient(2deg,transparent,transparent 6px,rgba(160,140,100,.05) 6px,rgba(160,140,100,.05) 7px),linear-gradient(168deg,#F9F3E3 0%,#F4EDD8 30%,#EDE4C8 65%,#E8DDB8 100%)", boxShadow:"0 25px 80px rgba(0,0,0,.5),0 8px 32px rgba(0,0,0,.4),0 0 0 1px rgba(180,160,120,.3)", transform:"perspective(1200px) rotateX(.8deg)", transformOrigin:"top center" }}>
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage:"repeating-linear-gradient(to bottom,transparent,transparent 27px,rgba(180,160,120,.12) 27px,rgba(180,160,120,.12) 28px)" }}/>
        <div className="relative max-h-[560px] overflow-y-auto p-8 md:p-10">
          <div className="mb-8 text-center">
            <p className="mb-2 font-body text-xs font-semibold uppercase tracking-[.25em] text-[#8B6A2A]">United States Constitution</p>
            <div className="mx-auto h-px w-32 bg-[#C9A84C]/40"/>
          </div>
          <div className="space-y-6">
            {clauses.map(c=>(
              <div key={c.id} className="group relative">
                <p className="mb-1.5 font-body text-[10px] font-semibold uppercase tracking-[.2em] text-[#8B6A2A]/70">{c.article}</p>
                <button
                  onMouseEnter={()=>setHovered(c.id)}
                  onMouseLeave={()=>setHovered(null)}
                  onClick={()=>setActive(active?.id===c.id?null:c)}
                  className="relative w-full rounded-md px-2 py-1 text-left outline-none transition-all duration-300"
                  style={{ fontFamily:"'EB Garamond','Georgia',serif", fontSize:16, fontStyle:"italic", lineHeight:1.7,
                    color:active?.id===c.id?"#7A5A18":hovered===c.id?"#8B6A20":"#2C2416",
                    background:active?.id===c.id?"rgba(201,168,76,.18)":hovered===c.id?"rgba(201,168,76,.12)":"transparent",
                    textShadow:(hovered===c.id||active?.id===c.id)?"0 0 8px rgba(201,168,76,.5),0 0 20px rgba(201,168,76,.3)":"none",
                  }}
                  aria-expanded={active?.id===c.id}
                >
                  {(active?.id===c.id||hovered===c.id)&&<span className="pointer-events-none absolute inset-[-1px] rounded-md" style={{ border:"1px solid rgba(201,168,76,.4)", boxShadow:"0 0 20px rgba(201,168,76,.15),0 0 60px rgba(201,168,76,.08)" }}/>}
                  <span className="font-bold not-italic text-[#C9A84C]">{c.name} — </span>{c.originalText}
                </button>
                {hovered&&hovered!==c.id&&!active&&<div className="pointer-events-none absolute inset-0 rounded-md bg-[#F4EDD8]/40"/>}
              </div>
            ))}
          </div>
          <div className="mt-10 border-t border-[#C9A84C]/25 pt-6 text-center">
            <p style={{ fontFamily:"'EB Garamond','Georgia',serif", fontSize:13, color:"#6B5A2E", fontStyle:"italic" }}>Done in Convention by the Unanimous Consent of the States present · September 17, 1787</p>
          </div>
        </div>
      </div>

      {/* Side panel */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {!active ? (
            <motion.div key="default" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              className="flex h-full min-h-[400px] items-center justify-center rounded-2xl border border-[rgba(201,168,76,.12)] bg-[#080B12]/60 p-8 backdrop-blur-sm"
            >
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(201,168,76,.3)] bg-[rgba(201,168,76,.05)]">
                  <span className="text-xl text-[#C9A84C]">✦</span>
                </div>
                <p className="font-display text-lg italic text-[#F5F0E8]/60">Hover over any clause to illuminate its legacy</p>
              </div>
            </motion.div>
          ) : (
            <motion.div key={active.id} initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} transition={{duration:.4,ease:[0.16,1,0.3,1]}}
              className="max-h-[560px] overflow-y-auto rounded-2xl border border-[rgba(201,168,76,.2)] bg-[#080B12]/80 p-6 backdrop-blur-xl"
            >
              <p className="mb-2 font-body text-[10px] font-semibold uppercase tracking-[.25em] text-[#C9A84C]">{active.article}</p>
              <h3 className="mb-3 font-display text-2xl font-semibold text-[#F5F0E8]">{active.name}</h3>
              <blockquote className="mb-5 border-l-2 border-[#C9A84C]/50 pl-4">
                <p style={{ fontFamily:"'EB Garamond','Georgia',serif", fontSize:14, fontStyle:"italic", color:"#B8B4AC", lineHeight:1.7 }}>&ldquo;{active.originalText}&rdquo;</p>
              </blockquote>
              <div className="mb-5 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor:TENSION_COLORS[active.tension] }}/>
                <span className="font-body text-xs" style={{ color:TENSION_COLORS[active.tension] }}>{TENSION_LABELS[active.tension]}</span>
              </div>
              <div className="mb-5">
                <p className="mb-2 font-body text-xs font-semibold uppercase tracking-[.15em] text-[#6B6860]">Why It Changed the World</p>
                <p className="font-body text-sm leading-relaxed text-[#B8B4AC]">{active.modernImpact}</p>
              </div>
              <div className="mb-5 rounded-xl border border-white/8 bg-white/3 p-4">
                <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[.15em] text-[#C9A84C]">Echo Across Time</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="mb-1 font-body text-[10px] uppercase tracking-wider text-[#6B6860]">1787 Context</p>
                    <p className="font-body text-xs leading-relaxed text-[#B8B4AC]">{active.context1787}</p>
                  </div>
                  <div>
                    <p className="mb-1 font-body text-[10px] uppercase tracking-wider text-[#6B6860]">Today</p>
                    <p className="font-body text-xs leading-relaxed text-[#B8B4AC]">{active.contextToday}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[.15em] text-[#6B6860]">Impact Timeline</p>
                <div className="space-y-3">
                  {active.timeline.map((item,i)=>(
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A84C]"/>
                        {i<active.timeline.length-1&&<div className="mt-1 w-px flex-1 bg-[#C9A84C]/20"/>}
                      </div>
                      <div className="pb-3">
                        <div className="flex items-baseline gap-2">
                          <span className="font-display text-sm font-semibold text-[#C9A84C]">{item.year}</span>
                          <span className="font-body text-xs font-semibold text-[#F5F0E8]">{item.event}</span>
                        </div>
                        <p className="mt-0.5 font-body text-xs leading-relaxed text-[#6B6860]">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── FounderConstellation ──────────────────────────────────────────────────────

export function FounderConstellation({ founders }: { founders: FoundingFather[] }) {
  const [active,  setActive]  = useState<FoundingFather|null>(null);
  const [hovered, setHovered] = useState<string|null>(null);

  const highlightedSet = useMemo(() => {
    const src = hovered ?? active?.id ?? null;
    if (!src) return new Set<string>();
    const conns = founders.find(f=>f.id===src)?.connections ?? [];
    return new Set([src, ...conns]);
  }, [hovered, active, founders]);

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#080B12] py-6">
        <svg viewBox="0 0 800 350" className="w-full" role="img" aria-label="Founding Fathers constellation">
          <defs>
            <filter id="sg"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <filter id="sga"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          {founders.map(f=>f.connections.map(cid=>{
            const t=founders.find(x=>x.id===cid); if(!t) return null;
            const isHi=highlightedSet.size>0&&highlightedSet.has(f.id)&&highlightedSet.has(cid);
            const isDim=highlightedSet.size>0&&!isHi;
            return <line key={`${f.id}-${cid}`} x1={f.cx/100*800} y1={f.cy/100*350} x2={t.cx/100*800} y2={t.cy/100*350} stroke="#C9A84C" strokeOpacity={isHi?.6:isDim?.04:.12} strokeWidth={isHi?1.5:1} style={{transition:"all .3s ease"}}/>;
          }))}
          {founders.map(f=>{
            const isH=hovered===f.id, isA=active?.id===f.id;
            const isHi=highlightedSet.has(f.id), isDim=highlightedSet.size>0&&!isHi;
            const x=f.cx/100*800, y=f.cy/100*350;
            return (
              <g key={f.id} className="cursor-pointer" onMouseEnter={()=>setHovered(f.id)} onMouseLeave={()=>setHovered(null)} onClick={()=>setActive(active?.id===f.id?null:f)} style={{opacity:isDim?.2:1,transition:"opacity .3s ease"}}>
                <circle cx={x} cy={y} r={isH||isA?20:14} fill={`rgba(201,168,76,${isH||isA?.12:.05})`} style={{transition:"all .3s ease"}}/>
                <circle cx={x} cy={y} r={isH||isA?8:5} fill="#E8C878" filter={isH||isA?"url(#sga)":"url(#sg)"} style={{transition:"all .3s ease"}}/>
                <text x={x} y={y+(f.cy>60?-18:22)} textAnchor="middle" fill={isHi||isH||isA?"#E8C878":"#C9A84C"} fontSize={11} fontFamily="'Inter',sans-serif" fontWeight="600" letterSpacing=".08em" style={{opacity:isDim?.3:1,transition:"all .3s ease"}}>{f.name.split(" ")[1]}</text>
              </g>
            );
          })}
        </svg>
        <p className="mt-2 text-center font-body text-xs text-white/25">Click any star to explore · Lines show collaboration</p>
      </div>

      <AnimatePresence mode="wait">
        {active&&(
          <motion.div key={active.id} initial={{opacity:0,y:30,scale:.97}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:20,scale:.97}} transition={{duration:.4,ease:[0.16,1,0.3,1]}}
            className="overflow-hidden rounded-2xl border border-[rgba(201,168,76,.2)] bg-[#080B12]/90 backdrop-blur-xl"
          >
            <div className="grid md:grid-cols-[auto_1fr]">
              <div className="relative h-72 w-full md:h-auto md:w-52 shrink-0 overflow-hidden">
                <Image
                  src={active.portraitSrc}
                  alt={active.portraitAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 208px"
                  quality={100}
                  className="object-cover object-top"
                  style={{filter:"sepia(40%) saturate(.8) contrast(1.1)"}}
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                />
                <div className="absolute inset-0" style={{background:"linear-gradient(to right,transparent 60%,rgba(8,11,18,.95))"}}/>
              </div>
              <div className="p-6 md:p-8">
                <div className="mb-2 flex flex-wrap items-baseline gap-3">
                  <h3 className="font-display text-3xl font-semibold text-[#F5F0E8]">{active.name}</h3>
                  <span className="font-body text-sm text-[#C9A84C]">{active.years}</span>
                </div>
                <p className="mb-4 font-body text-sm text-[#6B6860]">{active.role}</p>
                <blockquote className="mb-6 border-l-2 border-[#C9A84C]/50 pl-4">
                  <p className="font-display text-lg italic leading-relaxed text-[#F5F0E8]/80">&ldquo;{active.quote}&rdquo;</p>
                  <cite className="mt-2 block font-body text-xs not-italic uppercase tracking-[.15em] text-[#C9A84C]">— {active.quoteSource}</cite>
                </blockquote>
                <ol className="space-y-2">
                  {active.contributions.map((c,i)=>(
                    <li key={i} className="flex gap-3">
                      <span className="mt-0.5 shrink-0 font-display text-sm font-bold text-[#C9A84C]/60">{String(i+1).padStart(2,"0")}</span>
                      <p className="font-body text-sm leading-relaxed text-[#B8B4AC]">{c}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── AmendmentAccordion ────────────────────────────────────────────────────────

const AM_COLORS = {
  gold:{ border:"border-[rgba(201,168,76,.25)]" },
  red: { border:"border-[rgba(139,26,26,.25)]"  },
  blue:{ border:"border-[rgba(27,45,79,.4)]"    },
};

export function AmendmentAccordion({ amendments }: { amendments: Amendment[] }) {
  const [expanded, setExpanded] = useState<number|null>(null);
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {amendments.map(a=>{
        const isOpen=expanded===a.number;
        return (
          <motion.div key={a.number} layout className={`overflow-hidden rounded-2xl border ${AM_COLORS[a.color].border} bg-[#12181F] transition-all duration-300`} style={{boxShadow:isOpen?"0 0 40px rgba(201,168,76,.08),0 8px 32px rgba(0,0,0,.3)":"none"}}>
            <button onClick={()=>setExpanded(isOpen?null:a.number)} className="flex w-full items-start gap-4 p-5 text-left" aria-expanded={isOpen}>
              <span className="shrink-0 font-display leading-none" style={{fontSize:"clamp(48px,6vw,72px)",background:"linear-gradient(180deg,#E8C878 0%,#C9A84C 50%,#8B6A2A 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>{a.romanNumeral}</span>
              <div className="flex-1 pt-2">
                <p className="mb-1 font-body text-sm font-semibold text-[#F5F0E8]">{a.name}</p>
                <p className="font-body text-xs text-[#6B6860]">{a.oneliner}</p>
              </div>
              <motion.span animate={{rotate:isOpen?45:0}} transition={{duration:.25}} className="mt-2 shrink-0 text-[#C9A84C] text-lg">+</motion.span>
            </button>
            <AnimatePresence>
              {isOpen&&(
                <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} transition={{height:{duration:.4,ease:[.4,0,.2,1]},opacity:{duration:.3,delay:.1}}}>
                  <div className="border-t border-white/5 px-5 pb-5 pt-4 space-y-4">
                    <blockquote className="border-l-2 border-[#C9A84C]/40 pl-3">
                      <p style={{fontFamily:"'EB Garamond','Georgia',serif",fontSize:13,fontStyle:"italic",color:"#B8B4AC",lineHeight:1.7}}>&ldquo;{a.originalText}&rdquo;</p>
                    </blockquote>
                    <div>
                      <p className="mb-2 font-body text-[10px] font-semibold uppercase tracking-[.2em] text-[#6B6860]">What It Means Today</p>
                      <ul className="space-y-1.5">{a.whatItMeans.map((m,i)=><li key={i} className="flex gap-2 font-body text-xs text-[#B8B4AC]"><span className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-[#C9A84C]"/>{m}</li>)}</ul>
                    </div>
                    <div>
                      <p className="mb-2 font-body text-[10px] font-semibold uppercase tracking-[.2em] text-[#6B6860]">Real-World Examples</p>
                      <ul className="space-y-1.5">{a.realWorldExamples.map((ex,i)=><li key={i} className="flex gap-2 font-body text-xs text-[#B8B4AC]"><span className="text-[#C9A84C]">→</span>{ex}</li>)}</ul>
                    </div>
                    <div>
                      <p className="mb-2 font-body text-[10px] font-semibold uppercase tracking-[.2em] text-[#6B6860]">Global Comparison</p>
                      <div className="space-y-1.5">{a.globalComparison.map((g,i)=><div key={i} className="flex gap-2 rounded-lg border border-white/6 bg-white/3 px-3 py-2"><span className="font-body text-xs font-semibold text-[#F5F0E8]">{g.country}:</span><span className="font-body text-xs text-[#6B6860]">{g.comparison}</span></div>)}</div>
                    </div>
                    {a.deepDiveHref&&<a href={a.deepDiveHref} className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(201,168,76,.3)] px-4 py-2 font-body text-xs font-semibold text-[#C9A84C] transition-all hover:bg-[rgba(201,168,76,.08)]">Full Deep Dive →</a>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

// ── SeparationDiagram ─────────────────────────────────────────────────────────

const BPOS = {
  legislative:{ x:180, y:260, label:"Legislative", icon:"🏛️", desc:"Congress · 535 members" },
  executive:  { x:620, y:260, label:"Executive",   icon:"🦅", desc:"President · Enforces law" },
  judicial:   { x:400, y:80,  label:"Judicial",    icon:"⚖️", desc:"Supreme Court · Interprets law" },
};

export function SeparationDiagram({ examples }: { examples: PowersCheckExample[] }) {
  const [selected, setSelected] = useState<PowersCheckExample|null>(null);
  const fp = selected ? BPOS[selected.from] : null;
  const tp = selected ? BPOS[selected.to]   : null;

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl border border-white/8 bg-[#080B12]/80 p-6">
        <svg viewBox="0 0 800 340" className="w-full" role="img" aria-label="Separation of powers">
          <defs>
            <marker id="arr" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#C9A84C"/></marker>
            <filter id="bg"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          {!selected&&<>
            <line x1="180" y1="260" x2="400" y2="80" stroke="rgba(201,168,76,.2)" strokeWidth="1" strokeDasharray="4 4"/>
            <line x1="620" y1="260" x2="400" y2="80" stroke="rgba(201,168,76,.2)" strokeWidth="1" strokeDasharray="4 4"/>
            <line x1="180" y1="260" x2="620" y2="260" stroke="rgba(201,168,76,.2)" strokeWidth="1" strokeDasharray="4 4"/>
          </>}
          {selected&&fp&&tp&&(
            <motion.line key={selected.id} x1={fp.x} y1={fp.y} x2={tp.x} y2={tp.y} stroke="#C9A84C" strokeWidth="2.5" markerEnd="url(#arr)" initial={{pathLength:0,opacity:0}} animate={{pathLength:1,opacity:1}} transition={{duration:.6}} filter="url(#bg)"/>
          )}
          {Object.entries(BPOS).map(([k,p])=>{
            const isA=selected&&(selected.from===k||selected.to===k);
            return (
              <g key={k}>
                <circle cx={p.x} cy={p.y} r={isA?52:44} fill="rgba(201,168,76,.05)" stroke={isA?"rgba(201,168,76,.6)":"rgba(201,168,76,.2)"} strokeWidth={isA?1.5:1} style={{transition:"all .4s ease"}} filter={isA?"url(#bg)":undefined}/>
                <text x={p.x} y={p.y-8} textAnchor="middle" fontSize="24">{p.icon}</text>
                <text x={p.x} y={p.y+14} textAnchor="middle" fill="#F5F0E8" fontSize="13" fontFamily="'Playfair Display',serif" fontWeight="600">{p.label}</text>
                <text x={p.x} y={p.y+28} textAnchor="middle" fill="rgba(201,168,76,.6)" fontSize="9.5" fontFamily="'Inter',sans-serif">{p.desc}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="rounded-2xl border border-white/8 bg-[#12181F] p-5">
        <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[.15em] text-[#6B6860]">Show me a real-world check:</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {examples.map(ex=>(
            <button key={ex.id} onClick={()=>setSelected(selected?.id===ex.id?null:ex)}
              className={`rounded-xl border px-3 py-2.5 text-left transition-all ${selected?.id===ex.id?"border-[rgba(201,168,76,.5)] bg-[rgba(201,168,76,.08)] text-[#C9A84C]":"border-white/8 bg-white/3 text-[#B8B4AC] hover:border-[rgba(201,168,76,.25)] hover:text-[#F5F0E8]"}`}
            >
              <p className="font-body text-xs font-semibold">{ex.label}</p>
              <p className="mt-0.5 font-body text-[10px] opacity-60">{ex.year}</p>
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        {selected&&(
          <motion.div key={selected.id} initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:.35}}
            className="rounded-2xl border border-[rgba(201,168,76,.2)] bg-[#080B12]/80 p-6 backdrop-blur-sm"
          >
            <div className="mb-2 flex items-center gap-3">
              <span className="rounded border border-[rgba(201,168,76,.3)] bg-[rgba(201,168,76,.06)] px-2 py-0.5 font-body text-xs text-[#C9A84C]">{selected.year}</span>
              <h4 className="font-display text-lg font-semibold text-[#F5F0E8]">{selected.summary}</h4>
            </div>
            <div className="mb-3 flex items-center gap-2 font-body text-xs text-[#6B6860]">
              <span className="capitalize text-[#C9A84C]">{selected.from}</span><span>→</span><span className="capitalize text-[#C9A84C]">{selected.to}</span>
            </div>
            <p className="font-body text-sm leading-relaxed text-[#B8B4AC]">{selected.detail}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── TransferTimeline ──────────────────────────────────────────────────────────

export function TransferTimeline({ transfers }: { transfers: PresidentialTransfer[] }) {
  const [selected, setSelected] = useState<PresidentialTransfer|null>(null);
  return (
    <div className="space-y-4">
      <div className="relative overflow-x-auto pb-4" style={{scrollbarWidth:"thin",scrollbarColor:"rgba(201,168,76,.3) transparent"}}>
        <div className="relative flex items-center min-w-max px-6 py-8">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,.4)] to-transparent"/>
          {transfers.map(t=>(
            <div key={t.year} className="relative flex flex-col items-center" style={{minWidth:t.crisis?100:72}}>
              <button
                onClick={()=>setSelected(selected?.year===t.year?null:t)}
                className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${t.crisis?selected?.year===t.year?"border-[#C0392B] bg-[#C0392B] shadow-[0_0_20px_rgba(192,57,43,.5)]":"border-[rgba(192,57,43,.6)] bg-[rgba(192,57,43,.12)] hover:border-[#C0392B]":selected?.year===t.year?"border-[#C9A84C] bg-[#C9A84C] shadow-[0_0_20px_rgba(201,168,76,.4)]":"border-[rgba(201,168,76,.4)] bg-[rgba(201,168,76,.06)] hover:border-[#C9A84C]"}`}
                aria-label={`${t.year}: ${t.from} to ${t.to}`}
              >
                {t.crisis?<span className="text-sm">⚡</span>:<span className="font-hero text-[10px] text-[#C9A84C]">{String(t.year).slice(-2)}</span>}
              </button>
              <span className="mt-2 font-body text-[9px] text-[#6B6860]">{t.year}</span>
              <span className="text-[10px] text-green-400">✓</span>
            </div>
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        {selected&&(
          <motion.div key={selected.year} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:.35}}
            className={`overflow-hidden rounded-2xl border p-6 backdrop-blur-sm ${selected.crisis?"border-[rgba(192,57,43,.3)] bg-[rgba(192,57,43,.04)]":"border-[rgba(201,168,76,.2)] bg-[#080B12]/60"}`}
          >
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <span className="font-display text-3xl font-semibold text-[#C9A84C]">{selected.year}</span>
              {selected.crisis&&<span className="rounded-full border border-[rgba(192,57,43,.5)] bg-[rgba(192,57,43,.1)] px-3 py-1 font-body text-xs text-[#C0392B]">Constitutional Crisis</span>}
            </div>
            <p className="mb-2 font-body text-sm font-semibold text-[#F5F0E8]">{selected.from} → {selected.to}</p>
            <p className="mb-4 font-body text-sm leading-relaxed text-[#B8B4AC]">{selected.context}</p>
            {selected.crisis&&selected.crisisDetail&&<div className="mb-4 rounded-xl border border-[rgba(192,57,43,.2)] bg-[rgba(192,57,43,.06)] p-4"><p className="mb-1 font-body text-[10px] font-semibold uppercase tracking-wider text-[#C0392B]">The Crisis</p><p className="font-body text-xs leading-relaxed text-[#B8B4AC]">{selected.crisisDetail}</p></div>}
            {selected.verdict&&<div className="rounded-xl border border-green-500/20 bg-green-900/10 p-4"><p className="mb-1 font-body text-[10px] font-semibold uppercase tracking-wider text-green-400">The Verdict</p><p className="font-body text-xs leading-relaxed text-[#B8B4AC]">{selected.verdict}</p></div>}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="grid grid-cols-3 gap-3">
        {[{v:String(transfers.length),l:"Transfers",s:"1797–2025"},{v:String(transfers.filter(t=>t.crisis).length),l:"Crisis Transfers",s:"Constitution survived all"},{v:"0",l:"Coups",s:"Zero. In 228 years."}].map(s=>(
          <div key={s.l} className="rounded-xl border border-white/8 bg-[#12181F] p-4 text-center">
            <p className="font-display text-2xl text-[#C9A84C]">{s.v}</p>
            <p className="font-body text-xs font-semibold text-[#F5F0E8]">{s.l}</p>
            <p className="font-body text-[10px] text-[#6B6860]">{s.s}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── FederalismSimulator ───────────────────────────────────────────────────────

export function FederalismSimulator({ states }: { states: StatePolicy[] }) {
  const [corpTax,  setCorpTax]  = useState(5);
  const [minWage,  setMinWage]  = useState(10);
  const [regIndex, setRegIndex] = useState(5);
  const [hovered,  setHovered]  = useState<StatePolicy|null>(null);

  const scored = useMemo(() => states.map(s => {
    const score = 1 - (Math.abs(s.corporateTax-corpTax)/10 + Math.abs(s.minWage-minWage)/12 + Math.abs(s.regulatoryIndex-regIndex)/9) / 3;
    return { ...s, score };
  }), [states, corpTax, minWage, regIndex]);

  const best = [...scored].sort((a,b)=>b.score-a.score)[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      <div className="rounded-2xl border border-[rgba(201,168,76,.15)] bg-[#12181F] p-6">
        <p className="mb-1 font-body text-xs font-semibold uppercase tracking-[.15em] text-[#C9A84C]">Policy Controls</p>
        <p className="mb-6 font-body text-xs text-[#6B6860]">Adjust levers — watch states respond</p>
        {[
          {label:"Corporate Tax Rate",min:0,max:10,step:.5,value:corpTax,set:setCorpTax,unit:"%"},
          {label:"Minimum Wage",min:7.25,max:20,step:.25,value:minWage,set:setMinWage,unit:"$/hr"},
          {label:"Regulatory Burden",min:1,max:10,step:.5,value:regIndex,set:setRegIndex,unit:"/10"},
        ].map(sl=>(
          <div key={sl.label} className="mb-5">
            <div className="mb-2 flex justify-between">
              <p className="font-body text-sm text-[#F5F0E8]">{sl.label}</p>
              <span className="font-hero text-base text-[#C9A84C]">{sl.value}{sl.unit}</span>
            </div>
            <input type="range" min={sl.min} max={sl.max} step={sl.step} value={sl.value} onChange={e=>sl.set(Number(e.target.value))} className="w-full cursor-pointer" style={{accentColor:"#C9A84C"}}/>
            <div className="mt-1 flex justify-between font-body text-[10px] text-[#6B6860]"><span>Low</span><span>High</span></div>
          </div>
        ))}
        {best&&(
          <div className="mt-2 rounded-xl border border-[rgba(201,168,76,.3)] bg-[rgba(201,168,76,.06)] p-4">
            <p className="mb-1 font-body text-[10px] font-semibold uppercase tracking-wider text-[#C9A84C]">Your Bundle Most Closely Matches:</p>
            <p className="font-display text-2xl font-semibold text-[#F5F0E8]">⭐ {best.name}</p>
            <p className="mb-3 font-body text-xs text-[#C9A84C]">Match Score: {Math.round(best.score*100)}%</p>
            <div className="grid grid-cols-2 gap-2 text-center">
              {[{label:"GDP Growth",value:`+${best.gdpGrowth5yr}%`},{label:"Net Migration",value:`${best.netMigration>0?"+":""}${best.netMigration.toLocaleString()}k`},{label:"Corp Tax",value:`${best.corporateTax}%`},{label:"Business Rank",value:`#${best.businessRank}`}].map(s=>(
                <div key={s.label} className="rounded-lg border border-white/8 bg-white/3 py-2">
                  <p className="font-hero text-sm text-[#C9A84C]">{s.value}</p>
                  <p className="font-body text-[9px] text-[#6B6860]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div>
        <p className="mb-4 font-body text-xs text-[#6B6860]">States colored by alignment with your settings · Gold = closest match</p>
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 xl:grid-cols-4">
          {scored.sort((a,b)=>b.score-a.score).map(state=>(
            <div key={state.id} onMouseEnter={()=>setHovered(state)} onMouseLeave={()=>setHovered(null)}
              className="relative overflow-hidden rounded-xl border p-3 cursor-default transition-all duration-200"
              style={{borderColor:state.score>.7?"rgba(201,168,76,.5)":"rgba(255,255,255,.06)",background:state.netMigration>50?`rgba(201,168,76,${.1+state.score*.5})`:state.netMigration<-50?`rgba(139,26,26,${.1+(1-state.score)*.4})`:`rgba(30,37,48,${.3+state.score*.4})`}}
            >
              <div className="flex items-center justify-between mb-1">
                <p className="font-body text-xs font-semibold text-[#F5F0E8]">{state.abbr}</p>
                {state.score>.7&&<span className="text-xs">⭐</span>}
              </div>
              <p className="font-body text-[9px] text-[#6B6860] truncate">{state.name}</p>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full transition-all duration-500" style={{width:`${state.score*100}%`,background:"linear-gradient(90deg,#8B6A2A,#C9A84C,#E8C878)"}}/>
              </div>
              {hovered?.id===state.id&&(
                <div className="absolute bottom-full left-0 z-20 mb-1 w-44 rounded-xl border border-[rgba(201,168,76,.3)] bg-[#080B12]/95 p-3 backdrop-blur-sm shadow-2xl">
                  <p className="mb-1 font-body text-xs font-bold text-[#F5F0E8]">{state.name}</p>
                  {[{l:"Corp Tax",v:`${state.corporateTax}%`},{l:"Min Wage",v:`$${state.minWage}`},{l:"GDP Growth",v:`+${state.gdpGrowth5yr}%`},{l:"Migration",v:`${state.netMigration>0?"+":""}${state.netMigration.toLocaleString()}k`}].map(r=>(
                    <div key={r.l} className="flex justify-between font-body text-[9px]"><span className="text-[#6B6860]">{r.l}</span><span className="text-[#C9A84C]">{r.v}</span></div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── RightsCounter ─────────────────────────────────────────────────────────────

export function RightsCounter({ stats }: { stats: {value:number;label:string;color:"gold"|"red";source:string}[] }) {
  return (
    <div className="space-y-5">
      {stats.map((s,i)=>(
        <motion.div key={i} initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true,margin:"-60px"}} transition={{duration:.6,delay:i*.12,ease:[0.16,1,0.3,1]}}
          className="flex items-center gap-4 rounded-xl border border-white/6 bg-[#12181F] px-5 py-4"
        >
          <p className="shrink-0 font-hero text-2xl md:text-3xl leading-none" style={{background:s.color==="gold"?"linear-gradient(180deg,#E8C878 0%,#C9A84C 100%)":"linear-gradient(180deg,#E87878 0%,#C0392B 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
            <CountUp to={s.value}/>
          </p>
          <div className="flex-1">
            <p className="font-body text-sm leading-snug text-[#F5F0E8]">{s.label}</p>
            <p className="mt-0.5 font-body text-[10px] text-[#6B6860]">{s.source}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
