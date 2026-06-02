import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Common Misconceptions | Data & Media",
  description: "Debunking common myths, statistics, and narratives about the United States.",
};

interface MisconceptionCard {
  title: string;
  description: string;
}

const CARDS_EN: MisconceptionCard[] = [
  {
    title: "Healthcare & Itemization",
    description: "Debunking the viral 'itemization loophole' and clarifying the realities of insurance, financial assistance, and emergency billing.",
  },
  {
    title: "Food Safety & 'Banned' Chemicals",
    description: "Analyzing the regulatory difference between FDA and European EFSA frameworks, chemical concentrations, and organic food options.",
  },
  {
    title: "The Credit Score System",
    description: "Deconstructing the credit bureau rating model, showing how to build credit without paying interest, and its role in democratizing loans.",
  },
  {
    title: "Sales Tax at Checkout",
    description: "Explaining why sales taxes are added at checkout due to localized state/county/city jurisdictions under a federalist tax system.",
  },
  {
    title: "Passport Ownership & Travel",
    description: "Auditing actual passport ownership rates (nearly 48%) and detailing the vast geographic and ecological diversity of domestic U.S. travel.",
  },
  {
    title: "Work Culture & Paid Vacation",
    description: "Analyzing standard corporate PTO packages, at-will employment protections, and competitive benefits vs. mandatory minimums.",
  },
  {
    title: "American Decline",
    description: "Deconstructing narratives of U.S. economic, manufacturing, and industrial decline using comparative global GDP and productivity data.",
  },
  {
    title: "Cultural Superficiality",
    description: "Explaining how commercial brand exports (fast food, pop music) mask the depth of American classical, academic, and scientific contributions.",
  },
  {
    title: "Wealth & Standard of Living",
    description: "Comparing real median disposable income, consumer purchasing power, housing sizes, and middle-class abundance globally.",
  },
  {
    title: "Historical & Foreign Policy Myths",
    description: "Deconstructing simplified tropes regarding constitutional drafting, isolationist history, and the post-war rules-based order.",
  },
];

const CARDS_RO: MisconceptionCard[] = [
  {
    title: "Sistemul Medical și Facturile",
    description: "Demontarea mitului viral privind 'itemizarea facturilor ca metodă de anulare' și explicarea regulilor reale de asigurări și asistență financiară.",
  },
  {
    title: "Aditivi Alimentari „Interziși”",
    description: "Analizarea diferențelor dintre FDA și EFSA, evaluarea riscurilor versus principiul precauției și piața bio din SUA.",
  },
  {
    title: "Scorul de Credit",
    description: "Clarificarea modului în care funcționează scorul FICO, construirea istoricului fără plata dobânzilor și rolul său în democratizarea creditelor.",
  },
  {
    title: "TVA-ul și Taxa de Vânzări",
    description: "Explicarea motivului pentru care taxa de vânzări este adăugată la casă din cauza celor peste 10.000 de jurisdicții locale diferite.",
  },
  {
    title: "Pașapoartele și Călătoriile",
    description: "Prezentarea ratei reale de deținere a pașapoartelor (aproape 48%) și a diversității geografice imense a turismului intern.",
  },
  {
    title: "Concediul și Cultura Muncii",
    description: "Analizarea pachetelor salariale medii cu zile de concediu plătit (PTO), a contractelor 'at-will' și a beneficiilor oferite în piață.",
  },
  {
    title: "Declinul American",
    description: "Analiza PIB-ului și a productivității comparativ cu alte mari puteri pentru a demonta teza declinului industrial sau economic.",
  },
  {
    title: "Ușurința Culturală",
    description: "Cum brandurile de masă ascund complexitatea și profunzimea culturii, științei și inovației academice americane.",
  },
  {
    title: "Standardul de Viață",
    description: "Compararea venitului median disponibil, a puterii de cumpărare, a dimensiunilor caselor și a abundenței clasei de mijloc cu Europa.",
  },
  {
    title: "Mituri Istorice",
    description: "Reevaluarea narațiunilor simplificate despre istoria constituțională, izolaționismul istoric și ordinea mondială postbelică.",
  },
];

export default async function MisconceptionsPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const breadcrumbParent = isRo ? "Date & Media" : "Data & Media";
  const breadcrumbPage = isRo ? "Concepții Greșite" : "Common Misconceptions";

  const title = isRo
    ? "Mituri și Concepții Greșite Frecvente"
    : "Common Misconceptions";
  const description = isRo
    ? "Analiză empirică și demistificare a narațiunilor comune despre Statele Unite."
    : "Empirical analysis and myth-busting of common narratives about the United States.";

  const cards = isRo ? CARDS_RO : CARDS_EN;

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
            {title}
          </h1>
          <p className="font-body text-white/60 text-lg max-w-3xl">
            {description}
          </p>
        </div>
      </div>

      <section className="border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto min-h-[35dvh] max-w-7xl rounded-3xl border border-dashed border-white/15 bg-white/3 p-8 flex flex-col items-center justify-center text-center">
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cards.map((card, index) => (
              <div
                key={index}
                className="rounded-3xl border border-dashed border-white/15 bg-white/3 p-6 flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <h3 className="font-display text-lg font-bold text-glory-gold mb-3">
                    {card.title}
                  </h3>
                  <p className="text-xs text-white/50 leading-relaxed font-body">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
