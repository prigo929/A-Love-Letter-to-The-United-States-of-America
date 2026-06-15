"use client";

// ─── Opening Statement Section ────────────────────────────────────────────────
// Parchment background, large centered quote with editorial styling.

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { yearsSince1776 } from "@/lib/utils";

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
      className="bg-parchment relative overflow-hidden"
      aria-labelledby="opening-heading"
    >
      {/* Decorative noise texture overlay */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none bg-opening-noise"
        aria-hidden="true"
      />

      {/* Decorative corner ornaments */}
      <div
        className="absolute top-8 left-8 text-glory-blue/15 font-hero text-8xl leading-none pointer-events-none select-none"
        aria-hidden="true"
      >
        ★
      </div>
      <div
        className="absolute top-8 right-8 text-glory-blue/15 font-hero text-8xl leading-none pointer-events-none select-none"
        aria-hidden="true"
      >
        ★
      </div>
      <div
        className="absolute bottom-8 left-8 text-glory-red/15 font-hero text-8xl leading-none pointer-events-none select-none"
        aria-hidden="true"
      >
        ★
      </div>
      <div
        className="absolute bottom-8 right-8 text-glory-red/15 font-hero text-8xl leading-none pointer-events-none select-none"
        aria-hidden="true"
      >
        ★
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-8 py-20 md:py-28 text-center">
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
              className="w-4 h-4 fill-glory-gold text-glory-gold"
              aria-hidden="true"
            />
            <span
              id="opening-heading"
              className="font-body text-xs font-semibold text-glory-blue tracking-[0.35em] uppercase"
            >
              {copy.badge}
            </span>
            <Star
              className="w-4 h-4 fill-glory-gold text-glory-gold"
              aria-hidden="true"
            />
          </motion.div>

          {/* Gold line */}
          <motion.div
            className="w-24 h-0.5 bg-glory-gold"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            aria-hidden="true"
          />

          {/* Opening paragraph */}
          <motion.p
            variants={fadeUp}
            className="font-display text-2xl md:text-4xl lg:text-5xl text-navy-dark italic leading-relaxed font-normal text-balance"
          >
            "
            {copy.quoteStart}
            <strong className="font-bold not-italic text-glory-red">
              {copy.emphasis}
            </strong>
            {copy.quoteEnd}
            "
          </motion.p>

          {/* Body text */}
          <motion.div
            variants={fadeUp}
            className="max-w-2xl space-y-5 text-left md:text-center"
          >
            {copy.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="font-body text-lg light-surface-copy leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Bottom divider with stars */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-4 w-full max-w-xs"
            aria-hidden="true"
          >
            <div className="flex-1 h-px bg-glory-blue/25" />
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3 h-3 fill-glory-gold text-glory-gold"
                />
              ))}
            </div>
            <div className="flex-1 h-px bg-glory-blue/25" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
