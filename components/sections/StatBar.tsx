"use client";

// ─── StatBar ──────────────────────────────────────────────────────────────────
// The horizontal "Key Stats" row on the home page hero.
// 6 massive animated stats separated by dividers.

import { motion } from "framer-motion";
import { staggerFast, fadeUp } from "@/lib/animations";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { HOME_COPY, KEY_STATS } from "@/lib/data/home";
import { cn } from "@/lib/utils";

export function StatBar() {
  return (
    <section className="bg-navy-dark border-y border-white/10 relative overflow-hidden">
      {/* Star pattern background */}
      <div
        className="absolute inset-0 opacity-30 bg-star-pattern-sm"
        aria-hidden="true"
      />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/10 rounded-2xl overflow-hidden"
        >
          {KEY_STATS.map((stat, i) => (
            <motion.div
              key={stat.id}
              variants={fadeUp}
              className={cn(
                "bg-navy-dark flex flex-col items-center justify-center text-center px-4 py-8 md:py-10",
                "relative group",
              )}
            >
              {/* Gold shimmer on hover */}
              <div className="absolute inset-0 bg-glory-gold/0 group-hover:bg-glory-gold/5 transition-colors duration-300 rounded-none" />

              {/* Number */}
              <div className="font-hero text-stat-lg text-glory-gold leading-none mb-2">
                <AnimatedCounter
                  value={stat.value}
                  prefix={"prefix" in stat ? stat.prefix : undefined}
                  suffix={"suffix" in stat ? stat.suffix : undefined}
                />
              </div>

              {/* Label */}
              <p className="font-body text-sm md:text-base font-medium text-white/80 leading-snug">
                {stat.label}
              </p>

              {/* Description */}
              {"description" in stat && stat.description && (
                <p className="font-body text-xs text-white/40 mt-1 hidden md:block">
                  {stat.description}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Source line */}
        <p className="text-center font-body text-xs text-white/25 mt-4">
          {HOME_COPY.statSources}
        </p>
      </div>
    </section>
  );
}
