import type { Metadata } from "next";
import { getServerLocale } from "@/lib/i18n/server";
import { getCultureHollywood } from "@/lib/data/culture-data";
import { GALLERY_IMAGES } from "@/lib/data/gallery";
import { FilmAndStorytellingClient } from "@/components/culture/FilmAndStorytellingClient";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";

export const metadata: Metadata = {
  title: "Film & Storytelling | The American Operating System",
  description: "Hollywood and the visual syntax of human dreaming — explore how America's cinematic output shaped global values.",
};

export default async function FilmAndStorytellingPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const data = getCultureHollywood(locale);

  // Filter gallery images for movie posters/cinema
  const filmImages = GALLERY_IMAGES.filter(
    (img) => img.category === "Cinema" && img.path.includes("Movie Posters")
  );

  return (
    <main className="min-h-screen">
      <FilmAndStorytellingClient
        filmImages={filmImages}
        isRo={isRo}
        hollywoodData={data}
      />
      <div className="culture-bg">
        <AskAmericaCTA
          locale={locale}
          descriptionEn="Ask the AI Oracle about Hollywood's global box office dominance, the auteurs who shaped cinema, the grammar of visual storytelling, or how American film became the world's shared dream language."
          descriptionRo="Întreabă Oracolul AI despre dominanța globală a Hollywood-ului, regizorii care au modelat cinematografia, gramatica povestirii vizuale sau cum filmul american a devenit limbajul comun al viselor lumii."
        />
      </div>
    </main>
  );
}

