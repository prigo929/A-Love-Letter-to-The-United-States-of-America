import type { Metadata } from "next";
import { SITE_IMAGES } from "@/lib/site-images";
import { InDepthArticlesExplorer } from "@/components/data/InDepthArticlesExplorer";

export const metadata: Metadata = {
  title: "In-Depth Articles & Deep Dives | America by the Numbers",
  description:
    "Explore all 188 encyclopedic articles, Wikipedia & Grokipedia deep dives across history, constitution, economy, innovation, culture, and nature.",
  alternates: { canonical: "/data/in-depth" },
  openGraph: {
    title: "In-Depth Articles & Deep Dives | America by the Numbers",
    description:
      "Comprehensive repository of 188 long-form articles, syntheses, and primary-source verified deep dives across every vertical.",
    images: [{ url: SITE_IMAGES.homeUsaAtNightFromSpace, width: 1200, height: 630 }],
  },
};

export default function InDepthArticlesPage() {
  return <InDepthArticlesExplorer />;
}
