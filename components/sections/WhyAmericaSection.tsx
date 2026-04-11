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
import { BLUR_PLACEHOLDER, cn } from "@/lib/utils";

const FACT_COLORS = {
  gold: "bg-glory-gold/15 border-glory-gold/30 text-glory-gold",
  red: "bg-glory-red/15 border-glory-red/30 text-glory-red-light",
  blue: "bg-glory-blue-light/15 border-glory-blue-light/30 text-glory-blue-light",
} as const;

export function WhyAmericaSection() {
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
            The Case for American Greatness
          </motion.p>
          <motion.h2
            id="why-america-heading"
            variants={fadeUp}
            className="mb-5 font-display text-h1 text-white"
          >
            Why America?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto max-w-2xl font-body text-xl leading-relaxed text-white/60"
          >
            Four pillars that explain why, after 250 years, America remains the
            destination that the world&apos;s best and brightest still choose
            above all others.
          </motion.p>
        </motion.div>

        <div className="space-y-28 md:space-y-40">
          {WHY_AMERICA_BLOCKS.map((block, index) => {
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
                    className="-mb-6 block select-none font-hero text-[80px] leading-none text-white/5"
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
                      aria-label="Key facts"
                    >
                      {block.facts.map((fact) => (
                        <li
                          key={fact.id}
                          className={cn(
                            "flex items-start gap-3 rounded-xl border px-4 py-3",
                            FACT_COLORS[fact.color ?? "gold"],
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
            Explore All Sections
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
