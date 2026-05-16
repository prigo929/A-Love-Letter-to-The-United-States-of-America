"use client";

// Reusable highlighted fact box.
//
// Beginner guide:
// - This is for short facts with optional supporting detail
// - `color` changes the accent styling
// - `variant` changes the background shell

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { scaleUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { FactItem } from "@/types/content.types";

interface FactCardProps extends Omit<FactItem, "id"> {
  id?: string;
  className?: string;
  variant?: "dark" | "navy" | "glass";
}

const variantStyles = {
  dark: "bg-navy-light border border-white/10",
  navy: "bg-navy-mid border border-white/8",
  glass: "border border-white/15 bg-white/5 backdrop-blur-glass",
} as const;

const colorAccents: Record<string, string> = {
  red: "border-glory-red/30 bg-glory-red/20 text-glory-red-light",
  blue: "border-glory-blue-light/30 bg-glory-blue-light/20 text-glory-blue-light",
  gold: "border-glory-gold/30 bg-glory-gold/20 text-glory-gold",
};

export function FactCard({
  fact,
  detail,
  icon,
  source,
  category,
  color = "gold",
  className,
  variant = "dark",
}: FactCardProps) {
  return (
    <motion.div
      variants={scaleUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={cn(
        "flex flex-col gap-3 rounded-2xl p-5",
        variantStyles[variant],
        className,
      )}
    >
      {/* Top row: icon on the left, optional category pill on the right */}
      <div className="flex items-center justify-between">
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg border",
            colorAccents[color],
          )}
        >
          {icon ?? <Zap className="h-4 w-4" aria-hidden="true" />}
        </div>
        {category && (
          <span
            className={cn(
              "rounded-full border px-2.5 py-0.5 font-body text-xs font-semibold uppercase tracking-widest",
              colorAccents[color],
            )}
          >
            {category}
          </span>
        )}
      </div>

      <p className="font-body text-base font-semibold leading-snug text-white">
        {fact}
      </p>

      {/* Longer explanation under the headline fact */}
      {detail && (
        <p className="font-body text-sm leading-relaxed text-white/55">
          {detail}
        </p>
      )}

      {/* Source sits at the bottom so cards line up cleanly in a grid */}
      {source && (
        <p className="mt-auto border-t border-white/8 pt-2 font-body text-xs text-white/30">
          {source}
        </p>
      )}
    </motion.div>
  );
}
