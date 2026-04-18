"use client";

// ─── Section Navigation Grid ──────────────────────────────────────────────────
// 3×4 grid of NavigationCards — one per major section.

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { NavigationCard } from "@/components/sections/NavigationCard";
import { getLocalizedNavSections } from "@/lib/constants";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { HOME_COPY } from "@/lib/data/home";

export function SectionGrid() {
  const { locale } = useLanguage();
  const navSections = getLocalizedNavSections(locale);
  const copy =
    locale === "ro"
      ? {
          eyebrow: "Tot Ceea Ce Face America Măreață",
          title: "Explorează Fiecare Dimensiune",
          summary:
            "De la economia sa de 28,8 trilioane de dolari la 63 de parcuri naționale. De la Constituție la semiconductor. Fiecare capitol al poveștii extraordinare a Americii.",
        }
      : {
          eyebrow: "Everything That Makes America Great",
          title: "Explore Every Dimension",
          summary: HOME_COPY.sectionGridSummary,
        };

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
            {copy.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            id="sections-heading"
            className="font-display text-h2 text-white mb-4"
          >
            {copy.title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-body text-lg text-white/60 max-w-2xl mx-auto"
          >
            {copy.summary}
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
          {navSections.map((section) => (
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
