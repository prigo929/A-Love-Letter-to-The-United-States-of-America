// ─── Legacy path shim ─────────────────────────────────────────────────────────
// The cinematic design system was promoted from here to components/shared/
// once it started powering 30+ pages across six sections. New code should
// import from "@/components/shared/CinematicSystem"; this re-export keeps all
// existing imports working.

export {
  MacroStyles,
  MacroHero,
  CountUp,
  MacroStat,
  MacroFact,
  InfrastructureBand,
  DecodeText,
} from "@/components/shared/CinematicSystem";
