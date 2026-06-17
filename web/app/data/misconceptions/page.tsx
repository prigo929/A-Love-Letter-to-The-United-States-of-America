import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import {
  HelpCircle,
  Layers,
  TrendingUp,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Common Misconceptions | Data & Media",
  description: "Debunking common myths, statistics, and narratives about the United States.",
};

interface MisconceptionCard {
  title: string;
  description: string;
  icon: LucideIcon;
  sourceUrl?: string;
}

const CARDS_EN: MisconceptionCard[] = [
  {
    title: "Maternal Mortality Reporting",
    icon: ShieldAlert,
    description: "The US maternal mortality rate is often compared apples-to-oranges with other countries. The US includes all pregnancy-associated deaths up to a full year post-birth, including accidental, mental health, and unrelated causes, which European registries simply ignore.",
    sourceUrl: "https://cosm.aei.org/is-the-us-really-an-outlier-on-pregnancy-deaths-and-have-such-deaths-spiked/"
  },
  {
    title: "Life Expectancy & Lifestyle",
    icon: ShieldAlert,
    description: "The oft-cited life expectancy gap is less about healthcare quality or national wealth and more about diet, obesity, and accidents. Middle-income nations like Costa Rica or Puerto Rico outperform OECD averages due to dietary habits, not superior medical facilities.",
    sourceUrl: "https://cosm.aei.org/is-the-us-really-an-outlier-on-pregnancy-deaths-and-have-such-deaths-spiked/"
  },
  {
    title: "Tax System Progressivity",
    icon: TrendingUp,
    description: "Despite narratives of low taxes on the rich, the US has the most progressive income tax system in the OECD. It features no regressive national sales tax (VAT); the top 1% earners pay 40% of all income taxes, while the bottom 50% pay just 3%.",
    sourceUrl: "https://www.cato.org/blog/united-states-has-most-progressive-tax-system-developed-world"
  },
  {
    title: "Freight Rail vs. Passenger Rail",
    icon: Layers,
    description: "Critics highlight European passenger high-speed rail, but the US dominates in freight rail efficiency. Carrying double-stacked containers, US freight rails drop shipping costs dramatically, powering next-day logistics and cheap consumer goods.",
    sourceUrl: "https://www.freightwaves.com/news/why-is-europe-so-absurdly-backward-compared-to-the-u-s-in-rail-freight-transport"
  },
  {
    title: "Healthcare & Itemization",
    icon: ShieldAlert,
    description: "The viral claim that simply requesting an 'itemized bill' erases hospital charges is mostly myth. What's real: hospitals must publish prices, uninsured patients can negotiate, nonprofit hospitals are legally required to offer charity care, and the No Surprises Act (2022) bans most surprise out-of-network billing. Insured patients also face an annual out-of-pocket maximum that caps total exposure.",
  },
  {
    title: "Food Safety & 'Banned' Chemicals",
    icon: Layers,
    description: "The list of additives 'banned in Europe but legal in the US' conflates hazard with risk. The FDA regulates by dose and exposure, while the EU often applies the precautionary principle. Several flagged substances are in fact permitted in both markets at controlled concentrations — and the US has the world's largest organic-food market by sales.",
  },
  {
    title: "The Credit Score System",
    icon: Layers,
    description: "A credit score isn't a 'debt trap' — it's a portable financial reputation that democratizes lending. You can build an excellent score with a card you pay in full every month, never paying a cent of interest. The system lets a 25-year-old with no family wealth secure a mortgage on the strength of their own record.",
  },
  {
    title: "Sales Tax at Checkout",
    icon: Layers,
    description: "Prices look pre-tax because the US has no national VAT and over 11,000 local tax jurisdictions — state, county, and city rates stack differently block to block. Federalism pushes consumption-tax decisions down to the local level rather than hiding one national rate inside the sticker price.",
  },
  {
    title: "Passport Ownership & Travel",
    icon: TrendingUp,
    description: "The 'Americans don't have passports' trope is dated — roughly half of US citizens now hold one, up from about 15% in 1990. It also ignores scale: domestic travel spans Arctic tundra, desert, rainforest, and tropical beaches across a continent the size of Europe, most of it requiring no passport at all.",
  },
  {
    title: "Work Culture & Paid Vacation",
    icon: TrendingUp,
    description: "While the US has no federal vacation mandate, competitive employers offer generous PTO, and 'at-will' employment cuts both ways — it underpins the labor-market fluidity that keeps US unemployment low and wages high. Total compensation (salary + benefits + equity) for skilled workers routinely exceeds European equivalents.",
  },
  {
    title: "American Decline",
    icon: TrendingUp,
    description: "Declinism doesn't survive the data: the US share of global GDP has held near 25% for decades, output per worker leads the G7, and manufacturing production sits near record highs. It is manufacturing employment, not output, that fell — as automation raised productivity per worker.",
  },
  {
    title: "Cultural Superficiality",
    icon: Layers,
    description: "Fast food and pop exports are the visible surface, not the substance. The US leads the world in Nobel laureates, top-ranked universities, scientific citations, and patents, and built much of modern jazz, cinema, literature, and computing. Commercial reach is a symptom of cultural depth, not a substitute for it.",
  },
  {
    title: "Wealth & Standard of Living",
    icon: TrendingUp,
    description: "On the measures that track lived experience — median disposable income, purchasing-power-adjusted consumption, home and appliance size, car ownership — the American middle class is among the richest populations in history, outpacing nearly every European peer once taxes and cost of living are accounted for.",
  },
  {
    title: "Historical & Foreign Policy Myths",
    icon: HelpCircle,
    description: "Popular tropes flatten a complex record: the Constitution was a deliberate, debated compromise rather than an accident; 'isolationist' America still shaped 20th-century trade and security; and the post-1945 rules-based order — for all its flaws — delivered the longest stretch of great-power peace and prosperity in modern history.",
  },
];

const CARDS_RO: MisconceptionCard[] = [
  {
    title: "Mortalitatea Maternă",
    icon: ShieldAlert,
    description: "Comparațiile cu alte țări sunt adesea deformate. SUA raportează toate decesele asociate sarcinii până la un an după naștere (inclusiv cauze accidentale sau colaterale), în timp ce statele din UE omit adesea aceste statistici.",
    sourceUrl: "https://cosm.aei.org/is-the-us-really-an-outlier-on-pregnancy-deaths-and-have-such-deaths-spiked/"
  },
  {
    title: "Speranța de Viață și Bunăstarea",
    icon: ShieldAlert,
    description: "Diferențele de speranță de viață sunt mai mult legate de stilul de viață, obezitate și dietă, nu de calitatea medicinei. Țări cu venituri medii precum Costa Rica au rezultate similare sau superioare OCDE din motive de nutriție.",
    sourceUrl: "https://cosm.aei.org/is-the-us-really-an-outlier-on-pregnancy-deaths-and-have-such-deaths-spiked/"
  },
  {
    title: "Progresivitatea Impozitării",
    icon: TrendingUp,
    description: "SUA au cel mai progresiv sistem fiscal din OCDE, fără taxă națională pe valoarea adăugată (TVA regresivă). Cei mai bogați 1% plătesc 40% din toate impozitele, în timp ce jumătatea inferioară plătește doar 3%.",
    sourceUrl: "https://www.cato.org/blog/united-states-has-most-progressive-tax-system-developed-world"
  },
  {
    title: "Căile Ferate de Marfă vs. Pasageri",
    icon: Layers,
    description: "În timp ce Europa se axează pe trenuri de pasageri, SUA excelează în transportul feroviar de marfă. Trenurile cu containere duble reduc costurile de transport, permițând logistica rapidă și prețurile mici.",
    sourceUrl: "https://www.freightwaves.com/news/why-is-europe-so-absurdly-backward-compared-to-the-u-s-in-rail-freight-transport"
  },
  {
    title: "Sistemul Medical și Facturile",
    icon: ShieldAlert,
    description: "Mitul viral conform căruia simpla cerere a unei facturi 'itemizate' anulează costurile spitalicești este în mare parte fals. Real este: spitalele trebuie să publice prețurile, pacienții neasigurați pot negocia, spitalele non-profit sunt obligate legal să ofere asistență caritabilă, iar No Surprises Act (2022) interzice majoritatea facturilor-surpriză din afara rețelei. Cei asigurați au și un plafon anual al cheltuielilor proprii.",
  },
  {
    title: "Aditivi Alimentari „Interziși”",
    icon: Layers,
    description: "Lista aditivilor 'interziși în Europa, dar permiși în SUA' confundă pericolul cu riscul. FDA reglementează în funcție de doză și expunere, în timp ce UE aplică des principiul precauției. Multe substanțe vizate sunt de fapt permise în ambele piețe la concentrații controlate — iar SUA are cea mai mare piață de alimente bio din lume.",
  },
  {
    title: "Scorul de Credit",
    icon: Layers,
    description: "Scorul de credit nu este o 'capcană a datoriilor' — este o reputație financiară portabilă care democratizează creditarea. Poți construi un scor excelent cu un card pe care îl plătești integral lunar, fără să plătești dobândă. Sistemul permite unui tânăr fără avere de familie să obțină un credit ipotecar pe baza propriului istoric.",
  },
  {
    title: "TVA-ul și Taxa de Vânzări",
    icon: Layers,
    description: "Prețurile par fără taxe pentru că SUA nu are TVA național, ci peste 11.000 de jurisdicții fiscale locale — cote de stat, county și oraș care se cumulează diferit. Federalismul coboară deciziile fiscale la nivel local în loc să ascundă o cotă națională unică în preț.",
  },
  {
    title: "Pașapoartele și Călătoriile",
    icon: TrendingUp,
    description: "Cliseul 'americanii nu au pașapoarte' este depășit — aproximativ jumătate dintre cetățeni dețin unul acum, față de ~15% în 1990. Ignoră și scara: turismul intern acoperă tundră arctică, deșert, pădure tropicală și plaje tropicale, pe un continent cât Europa, în mare parte fără pașaport.",
  },
  {
    title: "Concediul și Cultura Muncii",
    icon: TrendingUp,
    description: "Deși SUA nu impune concediu federal obligatoriu, angajatorii competitivi oferă pachete PTO generoase, iar contractele 'at-will' susțin flexibilitatea pieței muncii care menține șomajul scăzut și salariile ridicate. Compensația totală (salariu + beneficii + acțiuni) depășește adesea echivalentele europene.",
  },
  {
    title: "Declinul American",
    icon: TrendingUp,
    description: "Teza declinului nu rezistă datelor: ponderea SUA în PIB-ul global se menține în jur de 25% de decenii, producția pe lucrător conduce în G7, iar producția industrială e aproape de maxime istorice. A scăzut ocuparea în industrie, nu producția — pe fondul automatizării care a ridicat productivitatea.",
  },
  {
    title: "Ușurința Culturală",
    icon: Layers,
    description: "Fast-food-ul și muzica pop sunt suprafața vizibilă, nu substanța. SUA conduce lumea la laureați Nobel, universități de top, citări științifice și brevete, și a creat o mare parte din jazz, cinema, literatură și informatica modernă. Amploarea comercială e un simptom al profunzimii culturale, nu un substitut.",
  },
  {
    title: "Standardul de Viață",
    icon: TrendingUp,
    description: "La indicatorii care contează — venit median disponibil, consum ajustat la puterea de cumpărare, dimensiunea locuințelor și electrocasnicelor, deținerea de mașini — clasa de mijloc americană e printre cele mai bogate populații din istorie, depășind aproape orice omolog european după taxe și costul vieții.",
  },
  {
    title: "Mituri Istorice",
    icon: HelpCircle,
    description: "Cliseele populare simplifică o realitate complexă: Constituția a fost un compromis dezbătut deliberat, nu un accident; America 'izolaționistă' a modelat totuși comerțul și securitatea secolului XX; iar ordinea bazată pe reguli de după 1945 a adus cea mai lungă perioadă de pace și prosperitate între marile puteri din istoria modernă.",
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
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 flex flex-col justify-between min-h-[260px] hover:border-glory-gold/30 transition-all duration-300 shadow-card"
                >
                  <div>
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-glory-gold/10 text-glory-gold">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
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
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
