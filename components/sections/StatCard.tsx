"use client";

import { motion } from "framer-motion";
import { scaleUp } from "@/lib/animations";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { cn } from "@/lib/utils";

interface StatCardProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  description?: string;
  source?: string;
  icon?: React.ReactNode;
  variant?: "dark" | "navy" | "gold" | "glass";
  className?: string;
}

const variantStyles = {
  dark: "bg-navy-light border border-white/10 text-white",
  navy: "bg-navy-mid border border-white/5 text-white",
  gold: "bg-glory-gold/10 border border-glory-gold/30 text-white",
  glass: "bg-white/5 backdrop-blur-glass border border-white/15 text-white",
};

export function StatCard({
  value,
  prefix,
  suffix,
  decimals,
  label,
  description,
  source,
  icon,
  variant = "dark",
  className,
}: StatCardProps) {
  return (
    <motion.div
      variants={scaleUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={cn(
        "rounded-2xl p-6 md:p-8 flex flex-col gap-2",
        variantStyles[variant],
        className,
      )}
    >
      {icon && (
        <div className="text-glory-gold mb-2 w-10 h-10" aria-hidden="true">
          {icon}
        </div>
      )}

      {/* The big animated number */}
      <div className="font-hero text-stat-lg text-glory-gold leading-none">
        <AnimatedCounter
          value={value}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
        />
      </div>

      {/* Label */}
      <p className="font-body font-semibold text-lg text-white/90 leading-tight">
        {label}
      </p>

      {/* Optional description */}
      {description && (
        <p className="font-body text-sm text-white/55 leading-relaxed">
          {description}
        </p>
      )}

      {/* Source citation */}
      {source && (
        <p className="font-body text-xs text-white/35 mt-auto pt-3 border-t border-white/10">
          Source: {source}
        </p>
      )}
    </motion.div>
  );
}
