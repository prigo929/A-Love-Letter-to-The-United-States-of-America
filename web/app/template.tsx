"use client";

// ─── Route transition ─────────────────────────────────────────────────────────
// Remounts on every navigation, fading the incoming page up from the void so
// route changes feel like film cuts instead of page loads. Opacity-only — no
// transform — so position:fixed / sticky descendants are unaffected.

import { motion, useReducedMotion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
