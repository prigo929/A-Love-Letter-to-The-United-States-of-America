import type { Metadata } from "next";
import { getServerLocale } from "@/lib/i18n/server";
import { SITE_IMAGES } from "@/lib/site-images";
import { DataObservatory } from "@/components/data/DataObservatory";

export const metadata: Metadata = {
  title: "Data | America by the Numbers",
  description:
    "America by the numbers — economic output, capital markets, innovation, science, and military strength, every figure tied to a primary source.",
  alternates: { canonical: "/data" },
  openGraph: {
    title: "Data | America by the Numbers",
    description:
      "The empirical record of the most powerful nation in history: GDP, capital, venture capital, the dollar, Nobel prizes, and more.",
    images: [{ url: SITE_IMAGES.homeUsaAtNightFromSpace, width: 1200, height: 630 }],
  },
};

export default async function DataPage() {
  const locale = await getServerLocale();
  return <DataObservatory isRo={locale === "ro"} />;
}
