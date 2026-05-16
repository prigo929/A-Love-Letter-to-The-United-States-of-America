// ─── Section Wrapper ─────────────────────────────────────────────────────────
// Consistent padding, max-width, and background for every page section.
// Server Component.

import { cn } from "@/lib/utils";
import type { SectionVariant } from "@/types/content.types";

interface SectionWrapperProps {
  id?: string;
  variant?: SectionVariant;
  className?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
  noPadding?: boolean;
}

const variantStyles: Record<SectionVariant, string> = {
  light: "bg-white text-navy-dark",
  dark: "bg-navy-mid text-white",
  navy: "bg-navy-dark text-white",
  parchment: "bg-parchment text-navy-dark",
  glory: "bg-glory-gradient text-white",
};

export function SectionWrapper({
  id,
  variant = "light",
  className,
  children,
  fullWidth = false,
  noPadding = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(variantStyles[variant], "relative w-full", className)}
    >
      <div
        className={cn(
          !noPadding && "py-20 md:py-28 lg:py-36",
          !fullWidth && "max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8",
        )}
      >
        {children}
      </div>
    </section>
  );
}
