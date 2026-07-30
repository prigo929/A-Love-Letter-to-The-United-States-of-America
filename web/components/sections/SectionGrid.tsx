"use client";

// ─── Section Navigation Grid ──────────────────────────────────────────────────
// 3×4 grid of NavigationCards: one per major section.

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
            "Analiză detaliată a economiei de 32,4 trilioane de dolari, celor 63 de parcuri naționale, cadrului constituțional și inovației tehnologice americane.",
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

      <div className="relative mx-auto max-w-[86rem] px-4 py-24 sm:px-6 lg:px-8 md:py-32">
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
          className="flex flex-wrap justify-center gap-4 xl:gap-5"
        >
          {navSections.map((section) => (
            <NavigationCard
              key={section.href}
              href={section.href}
              title={section.title}
              description={section.description}
              imageSrc={section.imageSrc}
              imageAlt={`${section.title}: explore this section`}
              badge={"badge" in section ? section.badge : undefined}
              className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] xl:w-[calc(25%-15px)] max-w-[360px]"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
