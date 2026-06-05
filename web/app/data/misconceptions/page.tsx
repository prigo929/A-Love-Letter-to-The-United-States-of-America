import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { 
  AlertTriangle, 
  HelpCircle, 
  Layers, 
  TrendingUp, 
  ShieldAlert 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Common Misconceptions | Data & Media",
  description: "Debunking common myths, statistics, and narratives about the United States.",
};

interface MisconceptionCard {
  title: string;
  description: string;
  sourceUrl?: string;
}

const CARDS_EN: MisconceptionCard[] = [
  {
    title: "Maternal Mortality Reporting",
    description: "The US maternal mortality rate is often compared apples-to-oranges with other countries. The US includes all pregnancy-associated deaths up to a full year post-birth, including accidental, mental health, and unrelated causes, which European registries simply ignore.",
    sourceUrl: "https://cosm.aei.org/is-the-us-really-an-outlier-on-pregnancy-deaths-and-have-such-deaths-spiked/"
  },
  {
    title: "Life Expectancy & Lifestyle",
    description: "The oft-cited life expectancy gap is less about healthcare quality or national wealth and more about diet, obesity, and accidents. Middle-income nations like Costa Rica or Puerto Rico outperform OECD averages due to dietary habits, not superior medical facilities.",
    sourceUrl: "https://cosm.aei.org/is-the-us-really-an-outlier-on-pregnancy-deaths-and-have-such-deaths-spiked/"
  },
  {
    title: "Tax System Progressivity",
    description: "Despite narratives of low taxes on the rich, the US has the most progressive income tax system in the OECD. It features no regressive national sales tax (VAT); the top 1% earners pay 40% of all income taxes, while the bottom 50% pay just 3%.",
    sourceUrl: "https://www.cato.org/blog/united-states-has-most-progressive-tax-system-developed-world"
  },
  {
    title: "Freight Rail vs. Passenger Rail",
    description: "Critics highlight European passenger high-speed rail, but the US dominates in freight rail efficiency. Carrying double-stacked containers, US freight rails drop shipping costs dramatically, powering next-day logistics and cheap consumer goods.",
    sourceUrl: "https://www.freightwaves.com/news/why-is-europe-so-absurdly-backward-compared-to-the-u-s-in-rail-freight-transport"
  },
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
    title: "Mortalitatea Maternă",
    description: "Comparațiile cu alte țări sunt adesea deformate. SUA raportează toate decesele asociate sarcinii până la un an după naștere (inclusiv cauze accidentale sau colaterale), în timp ce statele din UE omit adesea aceste statistici.",
    sourceUrl: "https://cosm.aei.org/is-the-us-really-an-outlier-on-pregnancy-deaths-and-have-such-deaths-spiked/"
  },
  {
    title: "Speranța de Viață și Bunăstarea",
    description: "Diferențele de speranță de viață sunt mai mult legate de stilul de viață, obezitate și dietă, nu de calitatea medicinei. Țări cu venituri medii precum Costa Rica au rezultate similare sau superioare OCDE din motive de nutriție.",
    sourceUrl: "https://cosm.aei.org/is-the-us-really-an-outlier-on-pregnancy-deaths-and-have-such-deaths-spiked/"
  },
  {
    title: "Progresivitatea Impozitării",
    description: "SUA au cel mai progresiv sistem fiscal din OCDE, fără taxă națională pe valoarea adăugată (TVA regresivă). Cei mai bogați 1% plătesc 40% din toate impozitele, în timp ce jumătatea inferioară plătește doar 3%.",
    sourceUrl: "https://www.cato.org/blog/united-states-has-most-progressive-tax-system-developed-world"
  },
  {
    title: "Căile Ferate de Marfă vs. Pasageri",
    description: "În timp ce Europa se axează pe trenuri de pasageri, SUA excelează în transportul feroviar de marfă. Trenurile cu containere duble reduc costurile de transport, permițând logistica rapidă și prețurile mici.",
    sourceUrl: "https://www.freightwaves.com/news/why-is-europe-so-absurdly-backward-compared-to-the-u-s-in-rail-freight-transport"
  },
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
    <main className="min-h-screen bg-navy-dark pt-24 text-white font-body selection:bg-glory-gold selection:text-navy-dark">
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
        <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-white/3 p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-glory-gold/10 rounded-2xl text-glory-gold">
              <HelpCircle className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display text-white mb-2">
                {isRo ? "Fapte Empirice vs. Narative Virale" : "Empirical Data vs. Viral Narratives"}
              </h2>
              <p className="text-sm text-white/60 leading-relaxed font-body max-w-2xl">
                {isRo
                  ? "Această secțiune analizează miturile comune despre societatea, economia, taxele și sistemul medical din SUA utilizând date din surse auditate internațional precum OCDE, Banca Mondială și baze de date publice."
                  : "This section deconstructs popular misconceptions regarding U.S. society, economy, taxation, and healthcare using audited international datasets from the OECD, World Bank, and public records."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cards.map((card, index) => (
              <div
                key={index}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 flex flex-col justify-between min-h-[260px] hover:border-glory-gold/30 transition-all duration-300 shadow-card"
              >
                <div>
                  <h3 className="font-display text-lg font-bold text-glory-gold mb-3">
                    {card.title}
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed font-body">
                    {card.description}
                  </p>
                </div>
                {card.sourceUrl && (
                  <div className="border-t border-white/10 pt-3 mt-4 flex justify-end">
                    <a 
                      href={card.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[10px] font-mono text-glory-gold hover:underline flex items-center gap-1"
                    >
                      {isRo ? "Verifică Date →" : "Verify Data →"}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
