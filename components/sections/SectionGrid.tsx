"use client";

// ─── Section Navigation Grid ──────────────────────────────────────────────────
// 3×4 grid of NavigationCards — one per major section.

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { NavigationCard } from "@/components/sections/NavigationCard";
import { NAV_SECTIONS } from "@/lib/constants";
import { HOME_COPY } from "@/lib/data/home";

export function SectionGrid() {
  return (
    <section
      className="bg-navy-dark relative"
      aria-labelledby="sections-heading"
    >
      {/* Star pattern bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 bg-star-pattern-grid"
        aria-hidden="true"
      />

      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        {/* Section heading */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.p
            variants={fadeUp}
            className="section-eyebrow justify-center"
          >
            Everything That Makes America Great
          </motion.p>
          <motion.h2
            variants={fadeUp}
            id="sections-heading"
            className="font-display text-h2 text-white mb-4"
          >
            Explore Every Dimension
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-body text-lg text-white/60 max-w-2xl mx-auto"
          >
            {HOME_COPY.sectionGridSummary}
          </motion.p>
        </motion.div>

        {/* Card grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {NAV_SECTIONS.map((section) => (
            <NavigationCard
              key={section.href}
              href={section.href}
              title={section.title}
              description={section.description}
              imageSrc={section.imageSrc}
              imageAlt={`${section.title} — explore this section`}
              badge={"badge" in section ? section.badge : undefined}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
