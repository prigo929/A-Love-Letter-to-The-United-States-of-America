import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import {
  HelpCircle,
  Layers,
  TrendingUp,
  ShieldAlert,
  HeartPulse,
  Landmark,
  Train,
  Quote,
  type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Common Misconceptions | Data & Media",
  description:
    "Myth versus reality: debunking common statistics and narratives about the United States with audited international data.",
};

type Lang = { en: string; ro: string };
type CategoryKey = "health" | "economy" | "infrastructure" | "culture";

interface Stat {
  value: string;
  label: Lang;
}

interface MisconceptionCard {
  category: CategoryKey;
  icon: LucideIcon;
  myth: Lang;
  reality: Lang;
  stat?: Stat;
  sourceUrl?: string;
}

const CATEGORIES: { key: CategoryKey; icon: LucideIcon; label: Lang; blurb: Lang }[] = [
  {
    key: "health",
    icon: HeartPulse,
    label: { en: "Health & Wellbeing", ro: "Sănătate & Bunăstare" },
    blurb: {
      en: "Where definitions, lifestyle, and reporting methods drive the headline gaps.",
      ro: "Unde definițiile, stilul de viață și metodele de raportare creează diferențele.",
    },
  },
  {
    key: "economy",
    icon: TrendingUp,
    label: { en: "Economy, Taxes & Living Standards", ro: "Economie, Taxe & Nivel de Trai" },
    blurb: {
      en: "The numbers behind taxes, wealth, and the supposed American decline.",
      ro: "Cifrele din spatele taxelor, bogăției și presupusului declin american.",
    },
  },
  {
    key: "infrastructure",
    icon: Train,
    label: { en: "Infrastructure & Mobility", ro: "Infrastructură & Mobilitate" },
    blurb: {
      en: "What the rail-and-travel clichés leave out about scale and logistics.",
      ro: "Ce omit clișeele despre tren și călătorii privind scara și logistica.",
    },
  },
  {
    key: "culture",
    icon: Landmark,
    label: { en: "Culture & History", ro: "Cultură & Istorie" },
    blurb: {
      en: "Depth beneath the commercial surface, and a more honest historical record.",
      ro: "Profunzimea de sub suprafața comercială și o istorie mai onestă.",
    },
  },
];

const CARDS: MisconceptionCard[] = [
  // ── Health & Wellbeing ─────────────────────────────────────────────────────
  {
    category: "health",
    icon: ShieldAlert,
    myth: { en: "America is uniquely deadly for new mothers.", ro: "America este excepțional de periculoasă pentru mame." },
    reality: {
      en: "The US maternal mortality rate is often compared apples-to-oranges. The US counts all pregnancy-associated deaths up to a full year post-birth: including accidental, mental-health, and unrelated causes: which many European registries simply omit.",
      ro: "Rata mortalității materne din SUA este adesea comparată deformat. SUA raportează toate decesele asociate sarcinii până la un an după naștere (inclusiv cauze accidentale, de sănătate mintală sau colaterale), pe care multe registre europene le omit.",
    },
    stat: { value: "12 mo", label: { en: "post-birth window the US counts vs. ~6 weeks elsewhere", ro: "fereastra post-naștere numărată de SUA vs. ~6 săptămâni în alte părți" } },
    sourceUrl: "https://cosm.aei.org/is-the-us-really-an-outlier-on-pregnancy-deaths-and-have-such-deaths-spiked/",
  },
  {
    category: "health",
    icon: HeartPulse,
    myth: { en: "Americans die younger because their healthcare is worse.", ro: "Americanii mor mai tineri pentru că au medicină inferioară." },
    reality: {
      en: "The life-expectancy gap is driven less by medical quality and more by diet, obesity, gun and traffic deaths, and overdoses. Strip out fatal injuries and the US ranks at or near the top of the developed world for outcomes like cancer survival.",
      ro: "Diferența de speranță de viață ține mai puțin de calitatea medicală și mai mult de dietă, obezitate, decese rutiere și prin arme și supradoze. Eliminând rănile fatale, SUA se află în top la indicatori precum supraviețuirea la cancer.",
    },
    stat: { value: "#1–2", label: { en: "US cancer survival rates among large developed nations", ro: "rate de supraviețuire la cancer printre marile națiuni dezvoltate" } },
    sourceUrl: "https://cosm.aei.org/is-the-us-really-an-outlier-on-pregnancy-deaths-and-have-such-deaths-spiked/",
  },
  {
    category: "health",
    icon: ShieldAlert,
    myth: { en: "Just ask for an itemized bill and the hospital charges vanish.", ro: "Cere doar o factură detaliată și costurile spitalicești dispar." },
    reality: {
      en: "The viral 'itemized bill' hack is mostly myth, but real protections exist: hospitals must publish prices, the uninsured can negotiate, nonprofit hospitals must offer charity care, and the No Surprises Act bans most out-of-network surprise billing. Insured patients also hit an annual out-of-pocket maximum.",
      ro: "Trucul viral cu 'factura detaliată' e în mare parte fals, dar protecțiile reale există: spitalele trebuie să publice prețuri, neasigurații pot negocia, spitalele non-profit oferă asistență caritabilă, iar No Surprises Act interzice majoritatea facturilor-surpriză. Asigurații au și un plafon anual al cheltuielilor.",
    },
    stat: { value: "2022", label: { en: "No Surprises Act ended most surprise out-of-network bills", ro: "No Surprises Act a oprit majoritatea facturilor-surpriză" } },
  },
  {
    category: "health",
    icon: Layers,
    myth: { en: "America lets companies sell food that Europe has banned as poison.", ro: "America permite alimente pe care Europa le-a interzis ca otravă." },
    reality: {
      en: "The 'banned in Europe' list conflates hazard with risk. The FDA regulates by dose and exposure while the EU often applies the precautionary principle; several flagged substances are permitted in both markets at controlled levels, and the US has the world's largest organic-food market by sales.",
      ro: "Lista 'interzis în Europa' confundă pericolul cu riscul. FDA reglementează după doză și expunere, iar UE aplică des principiul precauției; multe substanțe vizate sunt permise în ambele piețe la niveluri controlate, iar SUA are cea mai mare piață de alimente bio din lume.",
    },
    stat: { value: "#1", label: { en: "largest organic-food market in the world by sales", ro: "cea mai mare piață de alimente bio din lume" } },
  },

  // ── Economy, Taxes & Living Standards ──────────────────────────────────────
  {
    category: "economy",
    icon: TrendingUp,
    myth: { en: "The rich barely pay taxes in America.", ro: "Bogații aproape nu plătesc taxe în America." },
    reality: {
      en: "Despite the narrative, the US has the most progressive income-tax system in the OECD and no regressive national sales tax (VAT). The top 1% of earners pay roughly 40% of all federal income taxes; the bottom 50% pay about 3%.",
      ro: "În ciuda narațiunii, SUA are cel mai progresiv sistem de impozit pe venit din OCDE și nicio taxă națională regresivă pe consum (TVA). Cei mai bogați 1% plătesc circa 40% din impozitul federal pe venit; jumătatea inferioară plătește ~3%.",
    },
    stat: { value: "40%", label: { en: "of federal income tax paid by the top 1% of earners", ro: "din impozitul federal pe venit plătit de top 1%" } },
    sourceUrl: "https://www.cato.org/blog/united-states-has-most-progressive-tax-system-developed-world",
  },
  {
    category: "economy",
    icon: Landmark,
    myth: { en: "The credit score is a predatory debt trap.", ro: "Scorul de credit este o capcană a datoriilor." },
    reality: {
      en: "A credit score is a portable financial reputation that democratizes lending. You can build an excellent score with a card paid in full every month: never paying a cent of interest: letting a 25-year-old with no family wealth secure a mortgage on the strength of their own record.",
      ro: "Scorul de credit este o reputație financiară portabilă care democratizează creditarea. Poți construi un scor excelent cu un card plătit integral lunar: fără nicio dobândă: permițând unui tânăr fără avere de familie să obțină un credit ipotecar pe baza propriului istoric.",
    },
  },
  {
    category: "economy",
    icon: Layers,
    myth: { en: "Stores hide a sneaky tax they spring on you at the register.", ro: "Magazinele ascund o taxă pe care ți-o aplică la casă." },
    reality: {
      en: "Prices look pre-tax because the US has no national VAT and over 11,000 local tax jurisdictions: state, county, and city rates stack differently block to block. Federalism pushes consumption-tax decisions down to the local level instead of burying one national rate in the sticker price.",
      ro: "Prețurile par fără taxe pentru că SUA nu are TVA național, ci peste 11.000 de jurisdicții fiscale locale: cote de stat, county și oraș care se cumulează diferit. Federalismul coboară deciziile fiscale la nivel local în loc să ascundă o cotă națională în preț.",
    },
    stat: { value: "11,000+", label: { en: "local sales-tax jurisdictions, none of them national", ro: "jurisdicții locale de taxe, niciuna națională" } },
  },
  {
    category: "economy",
    icon: TrendingUp,
    myth: { en: "Americans are overworked serfs with no vacation.", ro: "Americanii sunt iobagi suprasolicitați, fără concediu." },
    reality: {
      en: "There is no federal vacation mandate, but competitive employers offer generous PTO, and 'at-will' employment cuts both ways: it underpins the labor-market fluidity that keeps US unemployment low and wages high. Total compensation (salary + benefits + equity) for skilled workers routinely exceeds European equivalents.",
      ro: "Nu există un concediu federal obligatoriu, dar angajatorii competitivi oferă PTO generos, iar contractele 'at-will' susțin flexibilitatea pieței muncii care menține șomajul scăzut și salariile ridicate. Compensația totală (salariu + beneficii + acțiuni) depășește adesea echivalentele europene.",
    },
  },
  {
    category: "economy",
    icon: TrendingUp,
    myth: { en: "The American middle class is poorer than Europe's.", ro: "Clasa de mijloc americană e mai săracă decât cea europeană." },
    reality: {
      en: "On the measures that track lived experience: median disposable income, purchasing-power-adjusted consumption, home and appliance size, car ownership: the American middle class is among the richest populations in history, outpacing nearly every European peer once taxes and cost of living are accounted for.",
      ro: "La indicatorii care reflectă viața reală: venit median disponibil, consum ajustat la puterea de cumpărare, dimensiunea locuințelor și electrocasnicelor, deținerea de mașini: clasa de mijloc americană e printre cele mai bogate din istorie, depășind aproape orice omolog european după taxe și costul vieții.",
    },
  },
  {
    category: "economy",
    icon: TrendingUp,
    myth: { en: "The United States is in irreversible decline.", ro: "Statele Unite sunt într-un declin ireversibil." },
    reality: {
      en: "Declinism doesn't survive the data: the US share of global GDP has held near 25% for decades, output per worker leads the G7, and manufacturing production sits near record highs. It is manufacturing employment: not output: that fell, as automation raised productivity per worker.",
      ro: "Teza declinului nu rezistă datelor: ponderea SUA în PIB-ul global se menține în jur de 25% de decenii, producția pe lucrător conduce în G7, iar producția industrială e aproape de maxime istorice. A scăzut ocuparea în industrie, nu producția: pe fondul automatizării.",
    },
    stat: { value: "~25%", label: { en: "of global GDP, a share held steady for decades", ro: "din PIB-ul global, o pondere stabilă de decenii" } },
  },

  // ── Infrastructure & Mobility ──────────────────────────────────────────────
  {
    category: "infrastructure",
    icon: Train,
    myth: { en: "US rail is backward because it has no bullet trains.", ro: "Calea ferată din SUA e înapoiată pentru că nu are trenuri rapide." },
    reality: {
      en: "Critics fixate on European passenger high-speed rail, but the US runs the most efficient freight-rail network on earth. Double-stacked container trains slash shipping costs, powering next-day logistics and cheap consumer goods across a continent.",
      ro: "Criticii se fixează pe trenurile rapide de pasageri din Europa, dar SUA operează cea mai eficientă rețea de marfă din lume. Trenurile cu containere duble reduc costurile, alimentând logistica rapidă și prețurile mici pe un continent întreg.",
    },
    stat: { value: "#1", label: { en: "freight-rail network in the world by efficiency", ro: "rețea feroviară de marfă din lume ca eficiență" } },
    sourceUrl: "https://www.freightwaves.com/news/why-is-europe-so-absurdly-backward-compared-to-the-u-s-in-rail-freight-transport",
  },
  {
    category: "infrastructure",
    icon: TrendingUp,
    myth: { en: "Americans are insular: most don't even own a passport.", ro: "Americanii sunt insulari: majoritatea nici nu au pașaport." },
    reality: {
      en: "The trope is dated: roughly half of US citizens now hold a passport, up from about 15% in 1990. It also ignores scale: domestic travel spans Arctic tundra, desert, rainforest, and tropical beaches across a continent the size of Europe, most of it requiring no passport at all.",
      ro: "Cliseul e depășit: aproximativ jumătate dintre cetățeni dețin un pașaport acum, față de ~15% în 1990. Ignoră și scara: turismul intern acoperă tundră arctică, deșert, pădure tropicală și plaje, pe un continent cât Europa, în mare parte fără pașaport.",
    },
    stat: { value: "~50%", label: { en: "of Americans now hold a passport, up from 15% in 1990", ro: "dintre americani au pașaport acum, față de 15% în 1990" } },
  },

  // ── Culture & History ──────────────────────────────────────────────────────
  {
    category: "culture",
    icon: Layers,
    myth: { en: "American culture is just fast food and pop.", ro: "Cultura americană e doar fast-food și muzică pop." },
    reality: {
      en: "Commercial exports are the visible surface, not the substance. The US leads the world in Nobel laureates, top-ranked universities, scientific citations, and patents, and built much of modern jazz, cinema, literature, and computing. Reach is a symptom of depth, not a substitute for it.",
      ro: "Exporturile comerciale sunt suprafața vizibilă, nu substanța. SUA conduce lumea la laureați Nobel, universități de top, citări științifice și brevete, și a creat o mare parte din jazz, cinema, literatură și informatica modernă. Amploarea e un simptom al profunzimii, nu un substitut.",
    },
    stat: { value: "#1", label: { en: "in Nobel laureates and top-ranked global universities", ro: "la laureați Nobel și universități de top din lume" } },
  },
  {
    category: "culture",
    icon: HelpCircle,
    myth: { en: "The Constitution was an accident and America was isolationist.", ro: "Constituția a fost un accident, iar America izolaționistă." },
    reality: {
      en: "Popular tropes flatten a complex record: the Constitution was a deliberate, fiercely debated compromise; 'isolationist' America still shaped 20th-century trade and security; and the post-1945 rules-based order: for all its flaws: delivered the longest stretch of great-power peace and prosperity in modern history.",
      ro: "Cliseele simplifică o realitate complexă: Constituția a fost un compromis dezbătut deliberat; America 'izolaționistă' a modelat totuși comerțul și securitatea secolului XX; iar ordinea bazată pe reguli de după 1945 a adus cea mai lungă perioadă de pace și prosperitate între marile puteri din istoria modernă.",
    },
  },
];

export default async function MisconceptionsPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const t = (l: Lang) => (isRo ? l.ro : l.en);

  const breadcrumbParent = isRo ? "Date & Media" : "Data & Media";
  const breadcrumbPage = isRo ? "Concepții Greșite" : "Common Misconceptions";

  const title = isRo ? "Mit vs. Realitate" : "Myth vs. Reality";
  const description = isRo
    ? "Demistificarea celor mai răspândite narațiuni despre Statele Unite, comparând afirmația virală cu datele auditate."
    : "Deconstructing the most common narratives about the United States: the viral claim set against the audited data.";

  const sourcedCount = CARDS.filter((c) => c.sourceUrl).length;

  return (
    <main className="min-h-screen bg-navy-dark pt-24 text-white font-body selection:bg-glory-gold selection:text-navy-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[{ label: breadcrumbParent, href: "/data" }, { label: breadcrumbPage }]}
          className="mb-8"
        />

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <div className="mb-12 mt-8">
          <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.3em] text-glory-gold">
            {isRo ? "Date & Media" : "Data & Media"}
          </p>
          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-white/60">
            {description}
          </p>

          {/* Quick stats strip */}
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { v: String(CARDS.length), l: isRo ? "mituri analizate" : "myths examined" },
              { v: CATEGORIES.length + "", l: isRo ? "domenii" : "domains" },
              { v: sourcedCount + "+", l: isRo ? "surse verificabile" : "verifiable sources" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3">
                <span className="font-display text-2xl font-black text-glory-gold">{s.v}</span>
                <span className="ml-2 font-body text-xs uppercase tracking-widest text-white/40">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Methodology callout ─────────────────────────────────────────────── */}
      <section className="border-y border-white/10 bg-white/3 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-start gap-4">
          <div className="rounded-2xl bg-glory-gold/10 p-3 text-glory-gold">
            <HelpCircle className="h-7 w-7" />
          </div>
          <div>
            <h2 className="mb-1 font-display text-xl font-bold text-white">
              {isRo ? "Cum citim aceste mituri" : "How to read these"}
            </h2>
            <p className="max-w-3xl font-body text-sm leading-relaxed text-white/60">
              {isRo
                ? "Fiecare card pune afirmația virală („Mitul”) lângă ceea ce arată datele auditate („Realitatea”): folosind seturi de date internaționale de la OCDE, Banca Mondială și registre publice. Scopul nu este aroganța, ci acuratețea."
                : "Each card sets the viral claim (“The Myth”) beside what the audited data shows (“The Reality”), drawing on international datasets from the OECD, World Bank, and public records. The goal isn't triumphalism: it's accuracy."}
            </p>
          </div>
        </div>
      </section>

      {/* ── Category sections ───────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {CATEGORIES.map((cat) => {
          const cards = CARDS.filter((c) => c.category === cat.key);
          if (cards.length === 0) return null;
          const CatIcon = cat.icon;
          return (
            <section key={cat.key} className="mb-16">
              <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="rounded-xl bg-glory-gold/10 p-2.5 text-glory-gold">
                  <CatIcon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-white">{t(cat.label)}</h2>
                  <p className="font-body text-sm text-white/45">{t(cat.blurb)}</p>
                </div>
                <span className="ml-auto font-body text-xs uppercase tracking-widest text-white/30">
                  {cards.length} {isRo ? "mituri" : "myths"}
                </span>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {cards.map((card, i) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={i}
                      className="flex flex-col rounded-3xl border border-white/10 bg-white/5 p-6 shadow-card transition-all duration-300 hover:border-glory-gold/30"
                    >
                      {/* Myth */}
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                          <Quote className="h-4 w-4" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-red-400/80">
                            {isRo ? "Mitul" : "The Myth"}
                          </p>
                          <p className="mt-1 font-display text-base font-semibold leading-snug text-white/90">
                            {t(card.myth)}
                          </p>
                        </div>
                      </div>

                      {/* Reality */}
                      <div className="mt-4 flex items-start gap-3 border-t border-white/10 pt-4">
                        <div className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-glory-gold/10 text-glory-gold">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-glory-gold">
                            {isRo ? "Realitatea" : "The Reality"}
                          </p>
                          <p className="mt-1 font-body text-sm leading-relaxed text-white/65">
                            {t(card.reality)}
                          </p>
                        </div>
                      </div>

                      {/* Stat */}
                      {card.stat && (
                        <div className="mt-5 rounded-2xl border border-glory-gold/15 bg-glory-gold/5 px-4 py-3">
                          <span className="font-display text-2xl font-black text-glory-gold">
                            {card.stat.value}
                          </span>
                          <span className="ml-2 font-body text-xs leading-tight text-white/55">
                            {t(card.stat.label)}
                          </span>
                        </div>
                      )}

                      {/* Source */}
                      <div className="mt-auto flex justify-end pt-4">
                        {card.sourceUrl ? (
                          <a
                            href={card.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-body text-[11px] font-semibold text-glory-gold hover:underline"
                          >
                            {isRo ? "Verifică sursa →" : "Verify the source →"}
                          </a>
                        ) : (
                          <span className="font-body text-[11px] text-white/25">
                            {isRo ? "Date publice OCDE / Banca Mondială" : "OECD / World Bank public data"}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
