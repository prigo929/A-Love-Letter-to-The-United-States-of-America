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
      cy: 110,
      label: { en: "Vertical Clearance", ro: "Înălțimea Liberă" },
      title: { en: "16-Foot Vertical Clearance", ro: "Înălțime Liberă de 16 Picioare" },
      desc: {
        en: "Interstate bridges are engineered with a strict 16-foot (4.87 m) minimum vertical clearance. This standard was established in the 1950s at the behest of the Department of Defense to ensure that heavy military convoys and Intercontinental Ballistic Missiles (ICBMs) could be transported across the nation without routing blockages.",
        ro: "Podurile interstatale sunt proiectate cu o înălțime liberă minimă de 16 picioare (4,87 m). Acest standard a fost stabilit în anii 1950 la cererea Departamentului Apărării pentru a asigura transportul rachetelor balistice intercontinentale (ICBM) și al convoiului militar fără blocaje pe traseu."
      }
    },
    {
      id: "lanes",
      cx: 210,
      cy: 220,
      label: { en: "Standard Lane Width", ro: "Lățimea Standard a Benzii" },
      title: { en: "12-Foot Travel Lanes", ro: "Benzi de Circulație de 12 Picioare" },
      desc: {
        en: "Every travel lane on the Interstate Highway System is exactly 12 feet (3.66 m) wide. This generous dimension is optimized for sustained high-speed driving, reducing driver fatigue and providing safety buffers for large commercial semi-trucks.",
        ro: "Fiecare bandă de circulație de pe autostrăzile interstatale are exact 12 picioare (3,66 m) lățime. Această dimensiune generoasă este optimizată pentru condusul la viteze mari, reducând oboseala șoferului și oferind o zonă de siguranță pentru camioanele comerciale mari."
      }
    },
    {
      id: "barrier",
      cx: 320,
      cy: 200,
      label: { en: "Median Barrier", ro: "Barieră Mediană" },
      title: { en: "The Jersey Barrier", ro: "Bariera Jersey" },
      desc: {
        en: "The concrete Jersey barrier separates opposing traffic lanes. Designed with a specific sloped face, it redirects errant vehicles back onto the road by allowing their tires to ride up the slope, absorbing impact energy and preventing deadly head-on crossover collisions.",
        ro: "Bariera de beton Jersey separă benzile cu sensuri opuse. Proiectată cu o pantă specifică, ea redirecționează vehiculele înapoi pe carosabil permițând anvelopelor să urce panta, absorbind energia impactului și prevenind coliziunile frontale.",
      }
    },
    {
      id: "shoulder",
      cx: 80,
      cy: 220,
      label: { en: "Emergency Shoulder", ro: "Banda de Urgență" },
      title: { en: "10-Foot Paved Shoulder", ro: "Bandă de Urgență Pavată de 10 Picioare" },
      desc: {
        en: "Interstates require a minimum 10-foot (3.05 m) paved outer shoulder. This area provides safe clearance for broken-down vehicles, emergency responders, and maintenance crews, keeping travel lanes completely free of obstructions.",
        ro: "Autostrăzile interstatale necesită o bandă de urgență exterioară pavată de minimum 10 picioare (3,05 m). Această zonă oferă un spațiu sigur pentru vehiculele defecte, echipajele de urgență și echipele de întreținere, păstrând benzile de rulare libere.",
      }
    },
    {
      id: "subbase",
      cx: 170,
      cy: 280,
      label: { en: "Structural Sub-base", ro: "Fundație Structurală" },
      title: { en: "Multi-layered Base", ro: "Fundație Multi-strat" },
      desc: {
        en: "Beneath the surface lies a heavy-duty sub-base: a layer of graded crushed stone, topped by an asphalt binder course, and finished with a 10-to-12-inch slab of steel-reinforced Portland cement concrete. This structural thickness is engineered to support millions of heavy trucks over a multi-decade lifespan.",
        ro: "Sub suprafața de rulare se află o fundație de mare rezistență: un strat de piatră spartă calibrată, acoperit de un strat de legătură de asfalt și finisat cu o placă de beton de ciment Portland armat de 25-30 cm. Această structură este proiectată să suporte milioane de camioane grele timp de decenii."
      }
    }
  ];

  const active = hotspots.find(h => h.id === activeId) || hotspots[0];

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
      {/* ── Visual Diagram (7 Cols) ── */}
      <div className="lg:col-span-7 bg-[#0b0b0b] border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col justify-center relative overflow-hidden">
        
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:32px_32px] opacity-10 pointer-events-none" />

        <svg viewBox="0 0 640 360" className="w-full h-auto relative z-10 select-none">
          {/* Bridge Overhead Deck */}
          <path d="M 0 40 L 640 40 L 640 70 L 450 70 L 440 90 L 200 90 L 190 70 L 0 70 Z" fill="#181818" stroke="#333" strokeWidth={1} />
          
          {/* Bridge Pillars */}
          <rect x={15} y={70} width={25} height={165} fill="#141414" stroke="#2a2a2a" />
          <rect x={600} y={70} width={25} height={165} fill="#141414" stroke="#2a2a2a" />

          {/* Sub-Base Soil Layers */}
          <rect x={0} y={245} width={640} height={115} fill="#111" />
          <line x1={0} y1={245} x2={640} y2={245} stroke="#333" strokeWidth={1} />

          {/* Granular Crushed Stone Layer */}
          <rect x={0} y={260} width={640} height={15} fill="#151515" />
          <line x1={0} y1={260} x2={640} y2={260} stroke="#222" strokeWidth={1} strokeDasharray="3 3" />

          {/* Concrete Base Slab Layer */}
          <rect x={40} y={235} width={560} height={10} fill="#262626" />

          {/* Paved Roadway Surface */}
          <polygon points="40,235 600,235 610,245 30,245" fill="#1e1e1e" stroke="#444" strokeWidth={1} />

          {/* Travel Lane Dividers */}
          {/* Outer shoulder line (solid white) */}
          <line x1={120} y1={235} x2={120} y2={245} stroke="#888" strokeWidth={1.5} />
          <line x1={520} y1={235} x2={520} y2={245} stroke="#888" strokeWidth={1.5} />
          
          {/* Inner lane dividers (dashed white) */}
          <line x1={220} y1={235} x2={220} y2={245} stroke="#888" strokeWidth={1.2} strokeDasharray="4 4" />
          <line x1={420} y1={235} x2={420} y2={245} stroke="#888" strokeWidth={1.2} strokeDasharray="4 4" />

          {/* Concrete Jersey Barrier in Median */}
          <polygon points="314,235 326,235 328,212 324,208 316,208 312,212" fill="#2d2d2d" stroke="#555" strokeWidth={0.8} />

          {/* 16ft Vertical Clearance Indicator Arrow */}
          <g opacity={activeId === "clearance" ? 1 : 0.45} style={{ transition: "opacity 0.3s ease" }}>
            <line x1={320} y1={90} x2={320} y2={208} stroke="#E8B923" strokeWidth={1.5} strokeDasharray="3 3" />
            <path d="M 320 90 L 316 98 L 324 98 Z" fill="#E8B923" />
            <path d="M 320 208 L 316 200 L 324 200 Z" fill="#E8B923" />
            <text x={330} y={150} fill="#E8B923" fontSize={11} fontFamily="var(--font-mono)" letterSpacing="0.05em">16 ft MIN</text>
          </g>

          {/* Lane Width Dimension Label */}
          <g opacity={activeId === "lanes" ? 1 : 0.45} style={{ transition: "opacity 0.3s ease" }}>
            <line x1={120} y1={255} x2={220} y2={255} stroke="#E8B923" strokeWidth={1} />
            <line x1={120} y1={251} x2={120} y2={259} stroke="#E8B923" strokeWidth={1} />
            <line x1={220} y1={251} x2={220} y2={259} stroke="#E8B923" strokeWidth={1} />
            <text x={153} y={270} fill="#E8B923" fontSize={10} fontFamily="var(--font-mono)">12 ft</text>
          </g>

          {/* Outer Shoulder Dimension Label */}
          <g opacity={activeId === "shoulder" ? 1 : 0.45} style={{ transition: "opacity 0.3s ease" }}>
            <line x1={40} y1={255} x2={120} y2={255} stroke="#E8B923" strokeWidth={1} />
            <line x1={40} y1={251} x2={40} y2={259} stroke="#E8B923" strokeWidth={1} />
            <line x1={120} y1={251} x2={120} y2={259} stroke="#E8B923" strokeWidth={1} />
            <text x={65} y={270} fill="#E8B923" fontSize={10} fontFamily="var(--font-mono)">10 ft</text>
          </g>

          {/* Hotspots Interactive Rings */}
          {hotspots.map((h) => {
            const active = activeId === h.id;
            return (
              <g
                key={h.id}
                className="cursor-pointer"
                onClick={() => setActiveId(h.id)}
              >
                {/* Pulsing ring */}
                <circle
                  cx={h.cx}
                  cy={h.cy}
                  r={active ? 15 : 10}
                  fill="transparent"
                  stroke={active ? "#E8B923" : "rgba(232, 185, 35, 0.4)"}
                  strokeWidth={1.5}
                >
                  {!active && (
                    <animate
                      attributeName="r"
                      values="6;16;6"
                      dur="2.5s"
                      repeatCount="indefinite"
                    />
                  )}
                </circle>
                {/* Center dot */}
                <circle
                  cx={h.cx}
                  cy={h.cy}
                  r={5}
                  fill={active ? "#E8B923" : "rgba(255,255,255,0.75)"}
                  stroke="#000"
                  strokeWidth={1}
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* ── Description Panel (5 Cols) ── */}
      <div className="lg:col-span-5 flex flex-col justify-center min-h-[220px]">
        <span className="font-macro-mono text-[10px] uppercase tracking-[0.25em] text-[#E8B923] mb-3">
          {isRo ? "Inginerie & Specificații" : "Engineering & Specifications"}
        </span>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.25 }}
          >
            <h3 className="font-macro-display text-2xl font-black text-white tracking-tight mb-4">
              {active.title[locale]}
            </h3>
            
            <p className="font-macro-body text-[15px] leading-relaxed text-white/60">
              {active.desc[locale]}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Hotspot selection bullets */}
        <div className="mt-8 flex flex-wrap gap-2 border-t border-white/5 pt-6">
          {hotspots.map((h) => {
            const active = activeId === h.id;
            return (
              <button
                key={h.id}
                onClick={() => setActiveId(h.id)}
                className="px-3 py-1.5 rounded-full border text-[11px] font-macro-mono tracking-tight transition-all duration-200"
                style={{
                  borderColor: active ? "#E8B923" : "rgba(255,255,255,0.08)",
                  background: active ? "rgba(232, 185, 35, 0.08)" : "transparent",
                  color: active ? "#E8B923" : "rgba(255,255,255,0.4)"
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
