"use client";

// ─── Opening Statement Section ────────────────────────────────────────────────
// Deep obsidian #000000 background with ambient monochrome vector flag,
// architectural hairline borders, horological coordinate stamps, and
// editorial museum typography.

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { yearsSince1776 } from "@/lib/utils";
import { MonochromeVectorFlag } from "@/components/shared/MonochromeVectorFlag";
import { BlurReveal } from "@/components/shared/CinematicEffects";

export function OpeningStatement() {
  const years = yearsSince1776();
  const { locale } = useLanguage();
  const copy =
    locale === "ro"
      ? {
          badge: `Fondată în 1776 · ${years} ani de măreție`,
          quoteStart:
            "Nu a existat niciodată, în toată istoria omenirii, o națiune care să fi făcut mai mult pentru libertate, să fi creat mai multă bogăție, să fi produs mai multă inovație sau să fi oferit mai multe oportunități mai multor oameni decât",
          emphasis: " Statele Unite ale Americii",
          quoteEnd: ".",
          paragraphs: [
            "Realizările documentate pe acest site sunt date istorice și statistice verificate de Banca Mondială, Fundația Nobel, OECD și alte instituții internaționale majore care măsoară progresul uman.",
            "Aceasta este cronica contribuției americane. Ea cuprinde măreția Marelui Canion, idealurile revoluționare ale Declarației de Independență, crearea semiconductorului și a iPhone-ului, spiritul jazz-ului din New Orleans și reușita istorică a aselenizării.",
            "Prezentăm această călătorie în întregime, cu claritatea și mândria pe care le merită.",
          ],
        }
      : {
          badge: `Est. 1776 · ${years} Years of Greatness`,
          quoteStart:
            "There has never been, in all of human history, a nation that has done more for freedom, created more wealth, produced more innovation, or offered more opportunity to more people than the",
          emphasis: " United States of America",
          quoteEnd: ".",
          paragraphs: [
            "The achievements documented on this site are matters of historic and statistical record, verified by the World Bank, the Nobel Foundation, the OECD, and other major international institutions that measure human progress.",
            "This is the chronicle of American contribution. It encompasses the grandeur of the Grand Canyon, the revolutionary ideals of the Declaration of Independence, the creation of the semiconductor and the iPhone, the spirit of New Orleans jazz, and the historic feat of walking on the Moon.",
            "We present this journey in full, with the clarity and pride it deserves.",
          ],
        };

  return (
    <section
      className="bg-navy-dark relative overflow-hidden text-white py-24 md:py-36 border-t border-white/[0.08]"
      aria-labelledby="opening-heading"
    >
      {/* ── Ambient Waving Monochrome Vector Flag Layer ─────────────────────────
          Mathematical double-sine cloth wave physics in deep obsidian and titanium,
          gently billowing in the background behind the archival quote. */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.12] pointer-events-none scale-110">
        <MonochromeVectorFlag
          amplitude={22}
          speed={0.0014}
          opacity={1}
          vignette={true}
        />
      </div>

      {/* Subtle radial ambient warm bloom */}
      <div
        className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,215,0,0.035)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center gap-8"
        >
          {/* Est. badge */}
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <Star
              className="w-3.5 h-3.5 fill-glory-gold text-glory-gold"
              aria-hidden="true"
            />
            <span
              id="opening-heading"
              className="font-body text-xs font-semibold text-glory-gold tracking-[0.35em] uppercase"
            >
              {copy.badge}
            </span>
            <Star
              className="w-3.5 h-3.5 fill-glory-gold text-glory-gold"
              aria-hidden="true"
            />
          </motion.div>

          {/* Burnished gold hairline accent rule */}
          <motion.div
            className="w-24 h-0.5 bg-gradient-to-r from-transparent via-glory-gold to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            aria-hidden="true"
          />

          {/* Opening quote with smooth Depth-of-Field Blur Reveal */}
          <BlurReveal blurAmount={8} duration={1.2}>
            <p className="font-display text-2xl md:text-4xl lg:text-5xl text-parchment italic leading-relaxed font-normal text-balance">
              "
              {copy.quoteStart}
              <strong className="font-bold not-italic text-glory-red chromatic-text">
                {copy.emphasis}
              </strong>
              {copy.quoteEnd}
              "
            </p>
          </BlurReveal>

          {/* Body paragraphs */}
          <motion.div
            variants={fadeUp}
            className="max-w-2xl space-y-5 text-left md:text-center"
          >
            {copy.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="font-body text-base md:text-lg text-white/70 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Bottom divider with stars and hairline rules */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-4 w-full max-w-xs pt-4"
            aria-hidden="true"
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/20" />
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3 h-3 fill-glory-gold text-glory-gold"
                />
              ))}
            </div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/20" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
