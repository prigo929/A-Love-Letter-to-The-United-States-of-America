"use client";

// ─── Newsletter Section (Home Page) ──────────────────────────────────────────

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { NewsletterSignup } from "@/components/forms/NewsletterSignup";
import { Star } from "lucide-react";

export function NewsletterSection() {
  return (
    <section
      className="bg-navy-mid relative overflow-hidden py-24 md:py-32"
      aria-labelledby="newsletter-heading"
    >
      {/* Red/gold accent lines */}
      <div
        className="absolute top-0 left-0 right-0 h-1 flex"
        aria-hidden="true"
      >
        <div className="flex-1 bg-glory-red" />
        <div className="w-24 bg-glory-gold" />
        <div className="flex-1 bg-glory-blue" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col items-center gap-6"
        >
          <motion.div
            variants={fadeUp}
            className="flex gap-1.5"
            aria-hidden="true"
          >
            {[...Array(3)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 fill-glory-gold text-glory-gold"
              />
            ))}
          </motion.div>

          <motion.h2
            variants={fadeUp}
            id="newsletter-heading"
            className="font-display text-h2 text-white"
          >
            Join the Celebration
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="font-body text-lg text-white/60 max-w-md leading-relaxed"
          >
            Get updates on new content celebrating America's achievements — from
            economic milestones to scientific breakthroughs to natural wonders.
          </motion.p>

          <motion.div variants={fadeUp} className="w-full max-w-md">
            <NewsletterSignup variant="dark" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
