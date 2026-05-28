"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Network } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export function GlobalBasesClosing({ locale = "en" }: { locale?: Locale }) {
  const isRo = locale === "ro";

  const branches = [
    {
      href: "/military/navy",
      label: isRo ? "Marina" : "Navy",
    },
    {
      href: "/military/space-force",
      label: isRo ? "Forțele Spațiale" : "Space Force",
    },
    {
      href: "/military/air-force",
      label: isRo ? "Forțele Aeriene" : "Air Force",
    },
    {
      href: "/military/intelligence",
      label: isRo ? "Informații" : "Intelligence",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-black px-6 py-32 sm:px-10 md:py-40 lg:px-16 border-t border-white/5">
      {/* Background visual texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,42,102,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
        backgroundSize: "24px 24px"
      }} />
      <div className="absolute inset-0 pointer-events-none opacity-5 mix-blend-mode-overlay" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3CfeColorMatrix type=\'saturate\' values=\'0\'/%3E%3C/filter%3E%3Crect width=\'200\' height=\'200\' filter=\'url(%23n)\' opacity=\'0.12\'/%3E%3C/svg%3E")'
      }} />

      <div className="relative mx-auto max-w-[1000px] text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.div className="flex justify-center mb-8">
            <Network className="text-[#8edcff]/50 animate-pulse" size={32} strokeWidth={1.2} />
          </motion.div>
          
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(32px,8vw,96px)] font-black uppercase leading-[0.88] tracking-tight text-white"
            style={{ fontFamily: 'var(--font-archivo), Inter, system-ui, sans-serif', letterSpacing: '-0.035em' }}
          >
            {isRo ? "Amprentă planetară" : "Planetary footprint"}
          </motion.h2>
          <motion.div
            variants={fadeUp}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(32px,8vw,96px)] font-black uppercase leading-[0.88] tracking-tight text-white/12 mt-1"
            style={{ fontFamily: 'var(--font-archivo), Inter, system-ui, sans-serif', letterSpacing: '-0.035em' }}
          >
            {isRo ? "prezență absolută." : "absolute presence."}
          </motion.div>
          
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="mx-auto mt-10 max-w-2xl text-sm leading-[1.9] text-white/40 font-body"
          >
            {isRo
              ? "De la fiordurile adânci ale Mării Nordului până la atolii de corali din Indo-Pacific, rețeaua de baze globale a Americii asigură stabilitatea strategică și capacitatea de proiecție a forței în câteva ore."
              : "From the deep fjords of the North Sea to the coral atolls of the Indo-Pacific, America's network of global bases secures strategic stability and immediate power projection within hours."}
          </motion.p>
        </motion.div>

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/military"
            className="group inline-flex h-12 items-center gap-3 border border-white/10 bg-white px-7 text-[11px] font-bold uppercase tracking-[0.1em] text-black transition-colors hover:bg-white/85 rounded-none"
          >
            {isRo ? "Prezentare militară" : "Military overview"}
            <ArrowUpRight size={14} strokeWidth={2.5} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Cross-links */}
        <div className="mt-24 pt-16 border-t border-white/[0.04]">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/35 mb-8">
            {isRo ? "ALTE DIMENSIUNI MILITARE" : "OTHER MILITARY DIMENSIONS"}
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {branches.map((b) => (
              <Link
                key={b.href}
                href={b.href}
                className="font-mono text-xs uppercase tracking-[0.15em] text-white/50 transition-colors hover:text-[#8edcff]"
              >
                {b.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
