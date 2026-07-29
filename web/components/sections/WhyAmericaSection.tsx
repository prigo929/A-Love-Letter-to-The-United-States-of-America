"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import {
  fadeUp,
  slideInLeft,
  slideInRight,
  staggerContainer,
} from "@/lib/animations";
import { WHY_AMERICA_BLOCKS } from "@/lib/data/home";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { BLUR_PLACEHOLDER, cn } from "@/lib/utils";

const FACT_COLORS = {
  gold: "bg-glory-gold/15 border-glory-gold/30 text-glory-gold",
  red: "bg-glory-red/15 border-glory-red/30 text-glory-red-light",
  blue: "bg-glory-blue-light/15 border-glory-blue-light/30 text-glory-blue-light",
} as const;

export function WhyAmericaSection() {
  const { locale } = useLanguage();
  const copy =
    locale === "ro"
      ? {
          eyebrow: "Argumentul pentru Măreția Americană",
          title: "De Ce America?",
          description:
            "Patru piloni care explică de ce, după 250 de ani, America rămâne destinația pe care cei mai buni și mai ambițioși oameni ai lumii încă o aleg înaintea tuturor celorlalte.",
          cta: "Explorează Toate Secțiunile",
          factsLabel: "Date cheie",
        }
      : {
          eyebrow: "The Case for American Greatness",
          title: "Why America?",
          description:
            "Four pillars that explain why, after 250 years, America remains the destination that the world's best and brightest still choose above all others.",
          cta: "Explore All Sections",
          factsLabel: "Key facts",
        };
  const blocks =
    locale === "ro"
      ? [
          {
            ...WHY_AMERICA_BLOCKS[0],
            heading: "Țara Oamenilor Liberi",
            subheading: "250 de Ani de Guvernare Constituțională Neîntreruptă",
            paragraphs: [
              "Nicio națiune din istorie nu a menținut același cadru constituțional pe o durată de 250 de ani precum Statele Unite. În timp ce numeroase regimuri și constituții s-au prăbușit sau au fost rescrise pe glob, documentul fondator al Americii a rămas în picioare de-a lungul a două secole și jumătate de încercări.",
              "Primul Amendament rămâne un reper unic: nicio altă națiune nu garantează libertatea de exprimare atât de ferm. Carta Drepturilor a consacrat libertăți umane fundamentale care preexistau statului, stabilind un model constituțional durabil.",
            ],
            imageAlt:
              "Constituția Statelor Unite, cea mai longevivă constituție națională scrisă din istorie",
            facts: [
              {
                id: "const-1",
                fact: "Peste 250 de ani de guvernare constituțională",
                source: "Cea mai longevivă din lume",
                color: "gold",
              },
              {
                id: "const-2",
                fact: "Cele mai largi protecții ale libertății de exprimare de pe Pământ",
                source: "Primul Amendament, 1791",
                color: "red",
              },
              {
                id: "const-3",
                fact: "27 de amendamente, dovada că sistemul poate evolua",
                source: "Arhivele Naționale",
                color: "blue",
              },
            ],
          },
          {
            ...WHY_AMERICA_BLOCKS[1],
            heading: "Motorul Inovației",
            subheading:
              "Pionierat Tehnologic și Progres Industrial",
            paragraphs: [
              "Telefonul, avionul, tranzistorul, microcipul, internetul, iPhone-ul, vaccinul mRNA și inteligența artificială își au originea în centrele americane de cercetare și inovare.",
              "Statele Unite atrag aproximativ 50% din investițiile globale de venture capital și concentrează 7 dintre primele 10 universități ale lumii. Această performanță reflectă un model economic axat pe investiții în inovare, mediu universitar de elită și libertate de inițiativă.",
            ],
            imageAlt:
              "Microcip și circuite, simbol al dominației tehnologice americane",
            facts: [
              {
                id: "tech-1",
                fact: "~50% din investițiile globale de venture capital ajung în SUA",
                source: "NVCA 2024",
                color: "gold",
              },
              {
                id: "tech-2",
                fact: "400+ Premii Nobel, mai multe decât orice altă națiune",
                source: "Fundația Nobel",
                color: "red",
              },
              {
                id: "tech-3",
                fact: "650+ companii unicorn, peste 50% din totalul global",
                source: "Pitchbook 2024",
                color: "blue",
              },
            ],
          },
          {
            ...WHY_AMERICA_BLOCKS[2],
            heading: "America cea Frumoasă",
            subheading:
              "Ecosisteme Continentale și Parcuri Protejate",
            paragraphs: [
              "Statele Unite adăpostesc o diversitate ecologică remarcabilă pe un singur continent. Cadrul lor natural include tundra arctică din Alaska, pădurile tropicale din Hawaii, pereții masivi de granit din Yosemite, bazinele geotermale din Yellowstone, Marele Canion și Marile Lacuri, care rețin 21% din apa dulce de la suprafața Pământului.",
              'Theodore Roosevelt a numit conservarea acestui pământ "cel mai mare dar pe care o generație îl poate oferă urmașilor". America a concretizat această viziune prin crearea primului sistem de parcuri naționale din lume, protejând 85 de milioane de acri în 63 de parcuri naționale.',
            ],
            imageAlt:
              "Parc național american, bijuterie a sistemului de parcuri naționale din SUA",
            facts: [
              {
                id: "nat-1",
                fact: "63 de parcuri naționale, 85 de milioane de acri protejați",
                source: "Serviciul Parcurilor Naționale",
                color: "gold",
              },
              {
                id: "nat-2",
                fact: "Marile Lacuri dețin 21% din apa dulce de la suprafața Pământului",
                source: "EPA",
                color: "blue",
              },
              {
                id: "nat-3",
                fact: "Singura națiune cu tundră arctică și pădure tropicală",
                source: "USGS",
                color: "red",
              },
            ],
          },
          {
            ...WHY_AMERICA_BLOCKS[3],
            heading: "Gardianul Lumii Libere",
            subheading:
              "Cea mai puternică forță militară din istoria civilizației umane",
            paragraphs: [
              "Statele Unite operează 11 grupuri de atac cu portavion, în timp ce restul lumii la un loc menține patru. Cu un buget de apărare de 954 de miliarde de dolari, America dispune de baze strategice în 80 de țări, operează o triadă nucleară completă și tehnică militară de ultimă generație.",
              "Dincolo de echipamente și efective, forța militară americană menține ordinea internațională bazată pe reguli, libertatea căilor maritime comerciale și alianțele de securitate ale democrațiilor lumii.",
            ],
            imageAlt:
              "Avion cargo al Forțelor Aeriene SUA, simbol al razei de acțiune americane",
            facts: [
              {
                id: "mil-1",
                fact: "11 grupuri de atac cu portavion, mai multe decât restul lumii la un loc",
                source: "IISS 2024",
                color: "gold",
              },
              {
                id: "mil-2",
                fact: "Buget de apărare de 954 de miliarde de dolari",
                source: "SIPRI 2025",
                color: "red",
              },
              {
                id: "mil-3",
                fact: "800+ baze în 80+ țări: rază de acțiune cu adevărat globală",
                source: "DoD",
                color: "blue",
              },
            ],
          },
        ]
      : WHY_AMERICA_BLOCKS;

  return (
    <section
      className="relative overflow-hidden bg-navy-dark"
      aria-labelledby="why-america-heading"
    >
      <div className="flex h-1" aria-hidden="true">
        <div className="flex-1 bg-glory-red" />
        <div className="flex-1 bg-white/20" />
        <div className="flex-1 bg-glory-blue" />
      </div>

      <div className="mx-auto max-w-screen-xl px-4 py-24 sm:px-6 md:py-36 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="mb-20 text-center md:mb-28"
        >
          <motion.p
            variants={fadeUp}
            className="section-eyebrow justify-center"
          >
            {copy.eyebrow}
          </motion.p>
          <motion.h2
            id="why-america-heading"
            variants={fadeUp}
            className="mb-5 font-display text-h1 text-white"
          >
            {copy.title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto max-w-2xl font-body text-xl leading-relaxed text-white/60"
          >
            {copy.description}
          </motion.p>
        </motion.div>

        <div className="space-y-28 md:space-y-40">
          {blocks.map((block, index) => {
            const isRight = block.imagePosition === "right";

            return (
              <motion.div
                key={block.heading}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className={cn(
                  "grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20",
                  isRight && "lg:[direction:ltr]",
                )}
              >
                <motion.div
                  variants={isRight ? slideInLeft : slideInRight}
                  className={cn(
                    "flex flex-col gap-6",
                    !isRight && "lg:order-2",
                  )}
                >
                  <span
                    className="-mb-6 block select-none font-hero text-[80px] leading-none text-white/20"
                    aria-hidden="true"
                  >
                    0{index + 1}
                  </span>

                  <p className="font-body text-sm font-semibold uppercase tracking-[0.25em] text-glory-gold">
                    {block.subheading}
                  </p>

                  <h3 className="font-display text-h2 leading-tight text-white">
                    {block.heading}
                  </h3>

                  <div
                    className="h-0.5 w-16 bg-glory-gold"
                    aria-hidden="true"
                  />

                  <div className="space-y-4">
                    {block.paragraphs.map((paragraph, paragraphIndex) => (
                      <p
                        key={`${block.heading}-${paragraphIndex}`}
                        className="font-body text-body-lg leading-relaxed text-white/65"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {block.facts && (
                    <ul
                      className="mt-2 flex flex-col gap-3"
                      aria-label={copy.factsLabel}
                    >
                      {block.facts.map((fact) => (
                        <li
                          key={fact.id}
                            className={cn(
                              "flex items-start gap-3 rounded-xl border px-4 py-3",
                              FACT_COLORS[
                                (fact.color ?? "gold") as keyof typeof FACT_COLORS
                              ],
                            )}
                          >
                          <CheckCircle
                            className="mt-0.5 h-4 w-4 shrink-0"
                            aria-hidden="true"
                          />
                          <div>
                            <span className="block font-body text-sm font-semibold">
                              {fact.fact}
                            </span>
                            {fact.source && (
                              <span className="mt-0.5 block font-body text-xs opacity-70">
                                {fact.source}
                              </span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>

                <motion.div
                  variants={isRight ? slideInRight : slideInLeft}
                  className={cn("relative", !isRight && "lg:order-1")}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
                    <Image
                      src={block.imageSrc ?? ""}
                      alt={block.imageAlt ?? ""}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      placeholder="blur"
                      blurDataURL={BLUR_PLACEHOLDER}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/40 to-transparent" />
                  </div>

                  <div
                    className={cn(
                      "absolute -z-10 h-full w-full rounded-2xl border-2 border-glory-gold/25",
                      isRight
                        ? "right-4 top-4 md:right-6 md:top-6"
                        : "left-4 top-4 md:left-6 md:top-6",
                    )}
                    aria-hidden="true"
                  />

                  <div
                    className={cn(
                      "absolute -bottom-4 rounded-xl bg-glory-gold px-4 py-2 shadow-gold",
                      isRight ? "-right-4 md:-right-6" : "-left-4 md:-left-6",
                    )}
                  >
                    <span className="font-hero text-2xl leading-none text-navy-dark">
                      0{index + 1}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-24 text-center"
        >
          <Link
            href="/sitemap"
            className="group inline-flex items-center gap-2 font-body text-lg font-semibold text-glory-gold transition-all duration-200 hover:gap-3"
          >
            {copy.cta}
            <ArrowRight
              className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
