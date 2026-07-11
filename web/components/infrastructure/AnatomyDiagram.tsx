"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Hotspot {
  id: string;
  cx: number;
  cy: number;
  label: { en: string; ro: string };
  title: { en: string; ro: string };
  desc: { en: string; ro: string };
  stats?: { value: string; unit: string; label: { en: string; ro: string } };
}

interface AnatomyDiagramProps {
  locale: "en" | "ro";
}

export function AnatomyDiagram({ locale }: AnatomyDiagramProps) {
  const [activeId, setActiveId] = useState<string>("clearance");
  const isRo = locale === "ro";

  const hotspots: Hotspot[] = [
    {
      id: "clearance",
      cx: 320,
      cy: 102,
      label: { en: "Vertical Clearance", ro: "Înălțimea Liberă" },
      title: { en: "16-Foot Defense Clearance", ro: "Înălțime de Apărare de 16 Picioare" },
      desc: {
        en: "To support strategic military mobility during the Cold War, the Department of Defense mandated a minimum 16-foot (4.87 m) vertical clearance under all overpasses. This allows Intercontinental Ballistic Missiles (ICBMs) on transport-erector-launchers, heavy armor, and mobile radar arrays to traverse the country without bottlenecking.",
        ro: "Pentru a sprijini mobilitatea militară strategică în timpul Războiului Rece, Departamentul Apărării a impus o înălțime liberă de minimum 16 picioare (4,87 m) sub toate podurile. Acest lucru permite rachetelor balistice intercontinentale (ICBM), blindatelor grele și sistemelor radar să traverseze țara fără blocaje."
      },
      stats: { value: "16", unit: "ft", label: { en: "military clearance limit", ro: "limita de înălțime militară" } }
    },
    {
      id: "lanes",
      cx: 170,
      cy: 235,
      label: { en: "Travel Lanes", ro: "Benzi de Rulare" },
      title: { en: "Standardized 12-Foot Lanes", ro: "Benzi Standardizate de 12 Picioare" },
      desc: {
        en: "Every Interstate travel lane is engineered to a uniform width of 12 feet (3.66 m). This design standard, adopted from early railway clearances, reduces lateral encroachment, decreases driver stress, and offers comfortable clearance margins for full-sized commercial vehicles traveling at high speeds.",
        ro: "Fiecare bandă de circulație are o lățime uniformă de 12 picioare (3,66 m). Acest standard reduce deviațiile laterale, scade stresul șoferului și oferă marje confortabile de siguranță pentru camioanele de mare tonaj la viteze ridicate."
      },
      stats: { value: "12", unit: "ft", label: { en: "standard lane width", ro: "lățimea standard a benzii" } }
    },
    {
      id: "barrier",
      cx: 320,
      cy: 216,
      label: { en: "Jersey Barrier", ro: "Bariera Jersey" },
      title: { en: "Concrete Jersey Median", ro: "Bariera Mediană din Beton Jersey" },
      desc: {
        en: "Originally designed at Stevens Institute of Technology and implemented in New Jersey, this solid concrete barrier is engineered to minimize damage. Its specific sloped base allows an errant vehicle's tires to ride upward, converting horizontal velocity into lift and safely redirecting the vehicle back into its lane.",
        ro: "Proiectată inițial la Institutul de Tehnologie Stevens, această barieră din beton masiv este concepută pentru a reduce daunele. Panta sa permite anvelopelor să urce ușor pe barieră, transformând energia impactului în forță de ridicare și redirecționând vehiculul în siguranță."
      },
      stats: { value: "32", unit: "in", label: { en: "standard concrete height", ro: "înălțimea standard a betonului" } }
    },
    {
      id: "shoulder",
      cx: 80,
      cy: 235,
      label: { en: "Emergency Shoulder", ro: "Banda de Urgență" },
      title: { en: "10-Foot Paved Outer Shoulders", ro: "Banda de Urgență Exterioară de 10 Picioare" },
      desc: {
        en: "Safety protocols dictate a minimum 10-foot (3.05 m) paved outer shoulder. This width ensures that commercial semi-trucks can pull completely off the active lanes in an emergency, leaving a clear path for emergency services and keeping heavy traffic flowing without disruption.",
        ro: "Protocoalele de siguranță impun o bandă de urgență exterioară pavată de minimum 10 picioare (3,05 m). Această lățime garantează că și camioanele se pot retrage complet de pe benzile active în caz de avarie, permițând accesul salvatorilor."
      },
      stats: { value: "10", unit: "ft", label: { en: "emergency refuge width", ro: "lățimea refugiului de urgență" } }
    },
    {
      id: "subbase",
      cx: 260,
      cy: 285,
      label: { en: "Sub-base Foundation", ro: "Fundația Drumului" },
      title: { en: "Structural Sub-grade Engineering", ro: "Ingineria Stratului de Fundație" },
      desc: {
        en: "Interstate paving is built to survive. Beneath the 10-to-12-inch reinforced Portland cement concrete surface slab sits a highly compacted gravel base, a stabilized granular soil sub-base, and a geotextile drainage membrane. This robust multi-layer design prevents frost heaving, drains water, and supports millions of axle repetitions.",
        ro: "Pavajul interstatalei este construit să reziste. Sub placa de beton armat de 25-30 cm se află un strat de piatră spartă compactată, o fundație din sol granular stabilizat și o membrană de drenaj geotextilă. Această structură previne tasarea și degradările."
      },
      stats: { value: "3", unit: "layers", label: { en: "engineered base strata", ro: "straturi de fundație proiectate" } }
    }
  ];

  const active = hotspots.find(h => h.id === activeId) || hotspots[0];

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:items-stretch">
      {/* ── Visual Diagram (7 Cols) ── */}
      <div className="lg:col-span-7 bg-[#070707] border border-white/[0.06] rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden min-h-[400px]">
        
        {/* CAD Blueprint styling: watermark overlay */}
        <div className="absolute top-4 left-4 font-macro-mono text-[9px] text-white/10 uppercase tracking-widest pointer-events-none select-none">
          FHWA STANDARD CROSS-SECTION // DWG NO: 1956-A
        </div>
        <div className="absolute bottom-4 right-4 font-macro-mono text-[9px] text-white/10 pointer-events-none select-none">
          SCALE: 1 FT = 8.33 PX // PROJECTION: TRANSVERSE
        </div>
        
        {/* Technical cyan/grey grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <svg viewBox="0 0 640 360" className="w-full h-auto relative z-10 select-none my-auto">
          <defs>
            {/* Soft glowing filter for interactive highlights */}
            <filter id="hud-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Hatch patterns for technical blueprint look */}
            <pattern id="bridge-concrete" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
            </pattern>
            
            <pattern id="compacted-gravel" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.8" fill="rgba(255,255,255,0.12)" />
              <circle cx="8" cy="9" r="1.2" fill="rgba(255,255,255,0.07)" />
              <circle cx="10" cy="3" r="0.6" fill="rgba(255,255,255,0.15)" />
              <path d="M 4 8 L 6 9 L 5 11 Z" fill="rgba(255,255,255,0.06)" />
            </pattern>
          </defs>

          {/* ── Bridge Overhead Structure ── */}
          {/* Bridge solid deck */}
          <path 
            d="M 0 35 L 640 35 L 640 68 L 470 68 L 460 102 L 180 102 L 170 68 L 0 68 Z" 
            fill="#151515" 
            stroke={activeId === "clearance" ? "#E8B923" : "#333"} 
            strokeWidth={1}
            style={{ transition: "stroke 0.3s ease" }}
          />
          {/* Bridge hatch patterns overlay */}
          <path d="M 0 35 L 640 35 L 640 68 L 470 68 L 460 102 L 180 102 L 170 68 L 0 68 Z" fill="url(#bridge-concrete)" />

          {/* Pillars */}
          <rect x={12} y={68} width={28} height={177} fill="#111" stroke={activeId === "clearance" ? "#E8B923" : "#222"} strokeWidth={1} style={{ transition: "stroke 0.3s ease" }} />
          <rect x={600} y={68} width={28} height={177} fill="#111" stroke={activeId === "clearance" ? "#E8B923" : "#222"} strokeWidth={1} style={{ transition: "stroke 0.3s ease" }} />

          {/* ── Sub-base Strata Layers (Ground) ── */}
          {/* Base bedrock layer */}
          <rect x={0} y={245} width={640} height={115} fill="#0d0d0d" />
          <line x1={0} y1={245} x2={640} y2={245} stroke="#333" strokeWidth={1.2} />

          {/* Stabilized Granular Sub-base Strata */}
          <rect 
            x={0} 
            y={262} 
            width={640} 
            height={98} 
            fill="url(#compacted-gravel)" 
            stroke={activeId === "subbase" ? "rgba(232, 185, 35, 0.2)" : "transparent"}
            strokeWidth={1}
            style={{ transition: "stroke 0.3s ease" }}
          />
          <line x1={0} y1={262} x2={640} y2={262} stroke="rgba(255,255,255,0.08)" strokeWidth={1} strokeDasharray="3 3" />

          {/* Concrete Base Sub-base Slab */}
          <rect 
            x={40} 
            y={245} 
            width={560} 
            height={17} 
            fill="#1e1e1e" 
            stroke={activeId === "subbase" ? "#E8B923" : "#333"} 
            strokeWidth={activeId === "subbase" ? 1.2 : 0.8}
            style={{ transition: "all 0.3s ease" }}
          />

          {/* Asphalt Binder Surface Overlay */}
          <polygon 
            points="38,245 602,245 609,251 31,251" 
            fill="#181818" 
            stroke="#222" 
            strokeWidth={0.5} 
          />

          {/* Paved Travel Surface */}
          <polygon 
            points="40,235 600,235 604,245 36,245" 
            fill="#141414" 
            stroke={activeId === "lanes" ? "rgba(232,185,35,0.4)" : "#383838"} 
            strokeWidth={1}
            style={{ transition: "stroke 0.3s ease" }}
          />

          {/* Lane Markings */}
          {/* Solid outer white fog line */}
          <line x1={120} y1={235} x2={120} y2={245} stroke="#888" strokeWidth={1.5} />
          <line x1={520} y1={235} x2={520} y2={245} stroke="#888" strokeWidth={1.5} />
          
          {/* Dashed lane dividers */}
          <line x1={220} y1={235} x2={220} y2={245} stroke="#888" strokeWidth={1.2} strokeDasharray="4 3" />
          <line x1={420} y1={235} x2={420} y2={245} stroke="#888" strokeWidth={1.2} strokeDasharray="4 3" />

          {/* Concrete Jersey Median Barrier */}
          <polygon 
            points="314,235 326,235 328,212 323,208 317,208 312,212" 
            fill={activeId === "barrier" ? "#E8B923" : "#282828"} 
            stroke={activeId === "barrier" ? "#fff" : "#444"} 
            strokeWidth={0.8}
            filter={activeId === "barrier" ? "url(#hud-glow)" : undefined}
            style={{ transition: "all 0.3s ease" }}
          />

          {/* ── VEHICLE 1: Front profile of a standard Passenger SUV in Lane 3 (Centered at x=370) ── */}
          <g opacity={activeId === "lanes" ? 0.9 : 0.4} style={{ transition: "opacity 0.3s ease" }}>
            {/* Tires */}
            <rect x={347} y={222} width={8} height={14} rx={1.5} fill="#0d0d0d" stroke="#222" strokeWidth={0.5} />
            <rect x={385} y={222} width={8} height={14} rx={1.5} fill="#0d0d0d" stroke="#222" strokeWidth={0.5} />
            
            {/* Vehicle lower body */}
            <path d="M 342 225 L 398 225 L 398 214 Q 398 210 392 209 L 348 209 Q 342 210 342 214 Z" fill="#1b1b1b" stroke="#3a3a3a" strokeWidth={0.8} />
            
            {/* Upper cabin */}
            <path d="M 348 209 L 354 195 Q 356 192 360 192 L 380 192 Q 384 192 386 195 L 392 209 Z" fill="#131313" stroke="#2c2c2c" strokeWidth={0.8} />
            {/* Windshield */}
            <polygon points="356,206 384,206 379,196 361,196" fill="rgba(255,255,255,0.06)" stroke="#222" strokeWidth={0.5} />
            
            {/* Headlights (glow effect) */}
            <circle cx={347} cy={217} r={2.5} fill="rgba(255,255,255,0.85)" filter="url(#hud-glow)" />
            <circle cx={393} cy={217} r={2.5} fill="rgba(255,255,255,0.85)" filter="url(#hud-glow)" />
            
            {/* License plate */}
            <rect x={364} y={220} width={12} height={4} fill="#555" stroke="#222" strokeWidth={0.5} />
          </g>

          {/* ── VEHICLE 2: Front profile of a giant American Semi-Truck in Lane 1 (Centered at x=170) ── */}
          <g opacity={activeId === "clearance" || activeId === "lanes" ? 0.95 : 0.55} style={{ transition: "opacity 0.3s ease" }}>
            {/* Exhaust stacks extending high */}
            <line x1={138} y1={148} x2={138} y2={110} stroke="#3a3a3a" strokeWidth={1.5} />
            <line x1={202} y1={148} x2={202} y2={110} stroke="#3a3a3a" strokeWidth={1.5} />
            <circle cx={138} cy={110} r={1} fill="#444" />
            <circle cx={202} cy={110} r={1} fill="#444" />

            {/* Tires */}
            <rect x={135} y={218} width={12} height={18} rx={2} fill="#0b0b0b" stroke="#222" strokeWidth={0.5} />
            <rect x={193} y={218} width={12} height={18} rx={2} fill="#0b0b0b" stroke="#222" strokeWidth={0.5} />

            {/* Mud flaps */}
            <rect x={132} y={223} width={15} height={10} fill="#050505" />
            <rect x={193} y={223} width={15} height={10} fill="#050505" />

            {/* Massive Front Bumper */}
            <rect x={130} y={210} width={80} height={9} rx={1} fill="#262626" stroke="#444" strokeWidth={0.8} />

            {/* Chrome Grille */}
            <rect x={152} y={175} width={36} height={35} fill="#1a1a1a" stroke="#444" strokeWidth={1} />
            <line x1={158} y1={178} x2={158} y2={207} stroke="#333" strokeWidth={1} />
            <line x1={164} y1={178} x2={164} y2={207} stroke="#333" strokeWidth={1} />
            <line x1={170} y1={178} x2={170} y2={207} stroke="#333" strokeWidth={1} />
            <line x1={176} y1={178} x2={176} y2={207} stroke="#333" strokeWidth={1} />
            <line x1={182} y1={178} x2={182} y2={207} stroke="#333" strokeWidth={1} />

            {/* Main cab shell */}
            <path d="M 137 210 L 137 148 C 137 145 140 142 144 142 L 196 142 C 200 142 203 145 203 148 L 203 210 Z" fill="#202020" stroke="#3c3c3c" strokeWidth={1} />
            
            {/* Windshield */}
            <rect x={145} y={150} width={50} height={18} rx={1} fill="#0f0f0f" stroke="#2a2a2a" strokeWidth={0.5} />
            <line x1={170} y1={150} x2={170} y2={168} stroke="#2a2a2a" strokeWidth={0.8} />

            {/* Sun visor */}
            <polygon points="142,148 198,148 194,152 146,152" fill="#151515" />

            {/* Side Mirrors */}
            <path d="M 137 165 L 131 165 L 131 185 L 137 185" fill="none" stroke="#333" strokeWidth={1} />
            <rect x={129} y={168} width={3} height={14} fill="#2a2a2a" stroke="#444" strokeWidth={0.5} />

            <path d="M 203 165 L 209 165 L 209 185 L 203 185" fill="none" stroke="#333" strokeWidth={1} />
            <rect x={208} y={168} width={3} height={14} fill="#2a2a2a" stroke="#444" strokeWidth={0.5} />

            {/* Cab Roof Lights */}
            <circle cx={155} cy={145} r={1.2} fill="#ff9900" filter="url(#hud-glow)" />
            <circle cx={170} cy={144} r={1.2} fill="#ff9900" filter="url(#hud-glow)" />
            <circle cx={185} cy={145} r={1.2} fill="#ff9900" filter="url(#hud-glow)" />

            {/* Main Headlights (bright glow) */}
            <rect x={136} y={212} width={7} height={5} rx={0.5} fill="#fff" filter="url(#hud-glow)" />
            <rect x={197} y={212} width={7} height={5} rx={0.5} fill="#fff" filter="url(#hud-glow)" />
          </g>

          {/* ── DIMENSIONS INDICATORS OVERLAYS ── */}
          {/* 1. Clearance Indicator */}
          <g 
            opacity={activeId === "clearance" ? 1 : 0} 
            style={{ transition: "opacity 0.35s ease" }}
          >
            <line x1={320} y1={102} x2={320} y2={208} stroke="#E8B923" strokeWidth={1.8} strokeDasharray="3 3" filter="url(#hud-glow)" />
            <path d="M 320 102 L 315 111 L 325 111 Z" fill="#E8B923" />
            <path d="M 320 208 L 315 199 L 325 199 Z" fill="#E8B923" />
            <rect x={328} y={140} width={90} height={20} rx={3} fill="#000" stroke="#E8B923" strokeWidth={0.8} />
            <text x={334} y={154} fill="#E8B923" fontSize={9.5} fontFamily="var(--font-mono)" letterSpacing="0.05em" fontWeight="bold">16 ft MIN</text>
          </g>

          {/* 2. Lane Width Indicator */}
          <g 
            opacity={activeId === "lanes" ? 1 : 0} 
            style={{ transition: "opacity 0.35s ease" }}
          >
            <line x1={120} y1={255} x2={220} y2={255} stroke="#E8B923" strokeWidth={1.5} filter="url(#hud-glow)" />
            <line x1={120} y1={250} x2={120} y2={260} stroke="#E8B923" strokeWidth={1.5} />
            <line x1={220} y1={250} x2={220} y2={260} stroke="#E8B923" strokeWidth={1.5} />
            <rect x={148} y={266} width={44} height={18} rx={3} fill="#000" stroke="#E8B923" strokeWidth={0.8} />
            <text x={156} y={279} fill="#E8B923" fontSize={9.5} fontFamily="var(--font-mono)" fontWeight="bold">12 ft</text>
          </g>

          {/* 3. Shoulder Width Indicator */}
          <g 
            opacity={activeId === "shoulder" ? 1 : 0} 
            style={{ transition: "opacity 0.35s ease" }}
          >
            <line x1={40} y1={255} x2={120} y2={255} stroke="#E8B923" strokeWidth={1.5} filter="url(#hud-glow)" />
            <line x1={40} y1={250} x2={40} y2={260} stroke="#E8B923" strokeWidth={1.5} />
            <line x1={120} y1={250} x2={120} y2={260} stroke="#E8B923" strokeWidth={1.5} />
            <rect x={58} y={266} width={44} height={18} rx={3} fill="#000" stroke="#E8B923" strokeWidth={0.8} />
            <text x={66} y={279} fill="#E8B923" fontSize={9.5} fontFamily="var(--font-mono)" fontWeight="bold">10 ft</text>
          </g>

          {/* 4. Subbase Layer Strata lines */}
          <g 
            opacity={activeId === "subbase" ? 1 : 0} 
            style={{ transition: "opacity 0.35s ease" }}
          >
            {/* Draw indicators pointing down into strata layers */}
            <path d="M 260 235 L 245 285 L 235 285" fill="none" stroke="#E8B923" strokeWidth={1.2} filter="url(#hud-glow)" />
            <circle cx={260} cy={235} r={2} fill="#E8B923" />
            <rect x={145} y={276} width={85} height={18} rx={3} fill="#000" stroke="#E8B923" strokeWidth={0.8} />
            <text x={151} y={289} fill="#E8B923" fontSize={8.5} fontFamily="var(--font-mono)" fontWeight="bold">3 STRATA BASE</text>
          </g>

          {/* Interactive Hotspot Targets */}
          {hotspots.map((h) => {
            const active = activeId === h.id;
            return (
              <g
                key={h.id}
                className="cursor-pointer"
                onClick={() => setActiveId(h.id)}
              >
                {/* Large hit-area circle */}
                <circle cx={h.cx} cy={h.cy} r={20} fill="transparent" />
                
                {/* Glowing ripple ring */}
                <circle
                  cx={h.cx}
                  cy={h.cy}
                  r={active ? 15 : 9}
                  fill="transparent"
                  stroke={active ? "#E8B923" : "rgba(232, 185, 35, 0.45)"}
                  strokeWidth={active ? 2 : 1.2}
                  filter={active ? "url(#hud-glow)" : undefined}
                  style={{ transition: "all 0.3s ease" }}
                >
                  {!active && (
                    <animate
                      attributeName="r"
                      values="6;15;6"
                      dur="2.8s"
                      repeatCount="indefinite"
                    />
                  )}
                </circle>

                {/* Core dot */}
                <circle
                  cx={h.cx}
                  cy={h.cy}
                  r={4.5}
                  fill={active ? "#fff" : "#E8B923"}
                  stroke="#000"
                  strokeWidth={1}
                  style={{ transition: "fill 0.3s ease" }}
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* ── Description Panel / HUD Interface (5 Cols) ── */}
      <div className="lg:col-span-5 flex flex-col justify-between border border-white/5 rounded-2xl p-6 md:p-8 bg-[#040404] relative overflow-hidden">
        
        {/* HUD subtle graphics */}
        <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-white/5 pointer-events-none rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 border-b border-l border-white/5 pointer-events-none rounded-bl-2xl" />

        <div className="flex-1 flex flex-col justify-center">
          <span className="font-macro-mono text-[10px] uppercase tracking-[0.25em] text-[#E8B923] mb-4 block">
            {isRo ? "Sistem Metric & Specificații" : "Metric HUD & Specifications"}
          </span>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              {/* Dynamic stats readout if present */}
              {active.stats && (
                <div className="mb-6 flex items-baseline gap-2">
                  <span className="font-macro-display text-5xl font-black text-white leading-none tracking-tight">
                    {active.stats.value}
                  </span>
                  <span className="font-macro-display text-xl font-bold text-[#E8B923]">
                    {active.stats.unit}
                  </span>
                  <span className="font-macro-mono text-[10px] text-white/30 uppercase tracking-wider ml-2 border-l border-white/10 pl-3">
                    {active.stats.label[locale]}
                  </span>
                </div>
              )}

              <h3 className="font-macro-display text-2xl font-black text-white tracking-tight mb-4 border-b border-white/5 pb-3">
                {active.title[locale]}
              </h3>
              
              <p className="font-macro-body text-[15px] leading-relaxed text-white/60">
                {active.desc[locale]}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tab selection indicators (bottom layout) */}
        <div className="mt-8 border-t border-white/5 pt-6 flex flex-wrap gap-2">
          {hotspots.map((h) => {
            const active = activeId === h.id;
            return (
              <button
                key={h.id}
                onClick={() => setActiveId(h.id)}
                className="px-3 py-1.5 rounded border text-[10px] font-macro-mono uppercase tracking-wider transition-all duration-200"
                style={{
                  borderColor: active ? "#E8B923" : "rgba(255,255,255,0.06)",
                  background: active ? "rgba(232, 185, 35, 0.08)" : "transparent",
                  color: active ? "#E8B923" : "rgba(255,255,255,0.45)"
                }}
              >
                {h.label[locale]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
