import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Common Misconceptions | Data & Media",
  description: "Debunking common myths, statistics, and narratives about the United States.",
};

export default async function MisconceptionsPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const breadcrumbParent = isRo ? "Date & Media" : "Data & Media";
  const breadcrumbPage = isRo ? "Concepții Greșite" : "Common Misconceptions";

  const copy = isRo
    ? {
        title: "Mituri și Concepții Greșite Frecvente",
        description: "Analiză empirică și demistificare a narațiunilor comune despre Statele Unite.",
        card1Title: "Declinul American",
        card1Desc: "Demontarea miturilor despre declinul economic și industrial al SUA prin date comparative globale.",
        card2Title: "Ușurința Culturală",
        card2Desc: "Cum exportul de branduri de masă ascunde adesea complexitatea și profunzimea culturii și inovației academice americane.",
        card3Title: "Distribuția Bunăstării",
        card3Desc: "Clarificarea statisticilor privind Standardul de Viață, mobilitatea socială și clasa de mijloc în comparație cu Europa.",
        card4Title: "Mituri Istorice",
        card4Desc: "Reevaluarea narațiunilor simplificate despre istoria constituțională, izolaționism și ordinea mondială postbelică.",
      }
    : {
        title: "Common Misconceptions",
        description: "Empirical analysis and myth-busting of common narratives about the United States.",
        card1Title: "American Decline",
        card1Desc: "Debunking myths regarding U.S. economic and industrial decline using comparative global data.",
        card2Title: "Cultural Superficiality",
        card2Desc: "How mass-market brand exports mask the deep structural complexity of American academic, scientific, and artistic culture.",
        card3Title: "Wealth & Standard of Living",
        card3Desc: "Clarifying statistics on purchasing power, median income, social mobility, and middle-class abundance compared globally.",
        card4Title: "Historical Narratives",
        card4Desc: "Reassessing simplified narratives surrounding constitutional history, isolationism, and the post-war international order.",
      };

  return (
    <main className="min-h-screen bg-navy-dark pt-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: breadcrumbParent, href: "/data" },
            { label: breadcrumbPage },
          ]}
          className="mb-8"
        />

        <div className="mb-16 mt-8">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            {copy.title}
          </h1>
          <p className="font-body text-white/60 text-lg max-w-3xl">
            {copy.description}
          </p>
        </div>
      </div>

      <section className="border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto min-h-[40dvh] max-w-7xl rounded-3xl border border-dashed border-white/15 bg-white/3 p-8 flex flex-col items-center justify-center text-center">
          <div className="max-w-md">
            <span className="font-mono text-xs uppercase tracking-widest text-glory-gold mb-4 block">
              {isRo ? "SECȚIUNE ÎN DEZVOLTARE" : "SECTION UNDER DEVELOPMENT"}
            </span>
            <h2 className="text-2xl font-bold mb-4 font-display">
              {isRo ? "Date empirice contra retoricii" : "Empirical Data vs. Rhetoric"}
            </h2>
            <p className="text-sm text-white/55 leading-relaxed font-body">
              {isRo
                ? "Această secțiune va găzdui diagrame interactive, seturi de date comparative și analize de fact-checking pentru a demonta cele mai comune idei preconcepute despre societatea, economia și istoria SUA."
                : "This section will house interactive data visualizations, comparative datasets, and fact-checking analysis to address the most common misconceptions about U.S. society, economy, and history."}
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-dashed border-white/15 bg-white/3 p-6 flex flex-col justify-between min-h-[200px]">
              <div>
                <h3 className="font-display text-lg font-bold text-glory-gold mb-3">{copy.card1Title}</h3>
                <p className="text-xs text-white/50 leading-relaxed font-body">{copy.card1Desc}</p>
              </div>
            </div>
            <div className="rounded-3xl border border-dashed border-white/15 bg-white/3 p-6 flex flex-col justify-between min-h-[200px]">
              <div>
                <h3 className="font-display text-lg font-bold text-glory-gold mb-3">{copy.card2Title}</h3>
                <p className="text-xs text-white/50 leading-relaxed font-body">{copy.card2Desc}</p>
              </div>
            </div>
            <div className="rounded-3xl border border-dashed border-white/15 bg-white/3 p-6 flex flex-col justify-between min-h-[200px]">
              <div>
                <h3 className="font-display text-lg font-bold text-glory-gold mb-3">{copy.card3Title}</h3>
                <p className="text-xs text-white/50 leading-relaxed font-body">{copy.card3Desc}</p>
              </div>
            </div>
            <div className="rounded-3xl border border-dashed border-white/15 bg-white/3 p-6 flex flex-col justify-between min-h-[200px]">
              <div>
                <h3 className="font-display text-lg font-bold text-glory-gold mb-3">{copy.card4Title}</h3>
                <p className="text-xs text-white/50 leading-relaxed font-body">{copy.card4Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
