import type { Metadata } from "next";
import {
  NavyCapabilityGrid,
  NavyClosing,
  NavyCommandStack,
  NavyFullscreenPanel,
  NavyFutureStack,
  NavyHero,
  NavyMetricStrip,
  NavyPlatformShowcase,
  NavyStyles,
} from "@/components/military/NavyPageComponents";
import {
  NAVY_CAPABILITIES,
  NAVY_COMMAND_LAYERS,
  NAVY_FUTURE_PROGRAMS,
  NAVY_METRICS,
  NAVY_PLATFORMS,
  NAVY_VISUAL_PANELS,
} from "@/lib/data/navy-data";
import { SITE_IMAGES } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "United States Navy",
  description:
    "A cinematic, defense-tech exploration of the United States Navy: carrier strike groups, undersea deterrence, Aegis combat systems, naval aviation, and future autonomous fleets.",
  openGraph: {
    title: "United States Navy",
    description:
      "Sea control, carrier aviation, undersea dominance, missile defense, and future autonomous fleets.",
    images: [{ url: SITE_IMAGES.navy.hero, width: 1200, height: 630 }],
  },
};

export default function NavyPage() {
  return (
    <div className="navy-page min-h-screen overflow-hidden bg-[#030507] text-white">
      <NavyStyles />
      <NavyHero metrics={NAVY_METRICS} imageSrc={SITE_IMAGES.navy.hero} />
      <NavyMetricStrip metrics={NAVY_METRICS} />
      <NavyCapabilityGrid capabilities={NAVY_CAPABILITIES} />
      <NavyFullscreenPanel panel={NAVY_VISUAL_PANELS[0]} />
      <NavyPlatformShowcase platforms={NAVY_PLATFORMS} />
      <NavyCommandStack layers={NAVY_COMMAND_LAYERS} />
      <NavyFullscreenPanel panel={NAVY_VISUAL_PANELS[1]} reverse />
      <NavyFutureStack programs={NAVY_FUTURE_PROGRAMS} />
      <NavyFullscreenPanel panel={NAVY_VISUAL_PANELS[2]} />
      <NavyClosing />
    </div>
  );
}
