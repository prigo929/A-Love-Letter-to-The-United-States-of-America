"use client";

// ─── Card Component ───────────────────────────────────────────────────────────
// Generic card shell used across the site.
// For section navigation cards, see NavigationCard.tsx.

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "dark" | "navy" | "gold" | "glass";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean; // Enable lift on hover
  onClick?: () => void;
  as?: "div" | "article" | "section";
}

const variantStyles = {
  default: "bg-white text-navy-dark border border-parchment-dark shadow-card",
  dark: "bg-navy-light text-white border border-white/10",
  navy: "bg-navy-mid text-white border border-white/5",
  gold: "bg-glory-gold text-navy-dark border-2 border-glory-gold shadow-gold",
  glass: [
    "bg-white/10 backdrop-blur-glass text-white",
    "border border-white/20",
    "shadow-lg",
  ].join(" "),
};

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8 md:p-10",
};

export function Card({
  children,
  className,
  variant = "default",
  padding = "md",
  hover = false,
  onClick,
  as: Tag = "div",
}: CardProps) {
  const classes = cn(
    "rounded-2xl overflow-hidden",
    variantStyles[variant],
    paddingStyles[padding],
    hover &&
      "transition-all duration-300 cursor-pointer hover:card-hover-shadow",
    className,
  );

  if (hover || onClick) {
    return (
      <motion.div
        className={classes}
        onClick={onClick}
        whileHover={{
          y: -4,
          scale: 1.01,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    );
  }

  return <Tag className={classes}>{children}</Tag>;
}
