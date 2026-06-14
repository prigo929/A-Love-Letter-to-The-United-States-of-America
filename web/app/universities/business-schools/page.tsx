import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { 
  MacroStyles, 
  MacroHero, 
  CountUp, 
  InfrastructureBand
} from "@/components/economy/EconomyAnimations";


export const metadata: Metadata = {
  title: "Business Schools | Global Management & Finance",
  description: "Discover why American business schools like HBS, Wharton, and Stanford GSB lead the world in MBA education, venture funding, and executive training.",
};

interface BusinessCopy {
  breadcrumbParent: string;
  breadcrumbPage: string;
  heroTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  thesisTitle: string;
  thesisParagraph1: string;
  thesisParagraph2: string;
  statsTitle: string;
  cardsTitle: string;
  cards: Array<{
    title: string;
    description: string;
    details: string;
    imageSrc: string;
  }>;
  parallelLabel: string;
  parallelTitle: string;
  parallelSubtitle: string;
  oracleDescription: string;
}

const copyEn: BusinessCopy = {
  breadcrumbParent: "Universities",
  breadcrumbPage: "Business Schools",
  heroTagline: "ARCHITECTS OF CAPITALISM",
  heroTitle: "Business Schools",
  heroSubtitle: "HBS, Wharton, Stanford GSB, and Chicago Booth — the management hubs that invented the MBA and train the executives of global commerce.",
  thesisTitle: "The Command of Management Capital",
  thesisParagraph1: "The Master of Business Administration (MBA) is a uniquely American invention, first conceived at Dartmouth's Tuck School and formalized at Harvard in 1908. Since then, American business schools have operated as the preeminent sorting mechanisms and finishing schools for the global financial and corporate elite, dictating the practices of investment banking, private equity, and management consulting worldwide.",
  thesisParagraph2: "These institutions combine quantitative academic rigor with extensive case-method training and peer networking. By bringing together the world's most ambitious young professionals and connecting them directly with Wall Street, Silicon Valley, and Fortune 500 boardrooms, they act as high-velocity conduits for capital allocation and corporate authority.",
  statsTitle: "Leadership & Financial Placement Metrics",
  cardsTitle: "The Elite Business Academies",
  cards: [
    {
      title: "Harvard Business School (HBS)",
      description: "Founded 1908 · Boston, MA",
      details: "The pioneer of the Case Method, placing students in real-world CEO scenarios. HBS has generated more Fortune 500 executives and international business leaders than any other school, building an unmatched global network of corporate power.",
      imageSrc: "/images/library/University/zoshua-colah-Juzqxc8MwtU-unsplash.jpg",
    },
    {
      title: "The Wharton School (University of Pennsylvania)",
      description: "Founded 1881 · Philadelphia, PA",
      details: "The world's oldest collegiate business school, globally renowned for its quantitative finance curriculum. Wharton is the primary academic pipeline for Wall Street investment banking, private equity trusts, and real estate investment.",
      imageSrc: "/images/library/University/Cornell University, view, landscape, greens, mountains.jpg",
    },
    {
      title: "Stanford Graduate School of Business (GSB)",
      description: "Founded 1925 · Stanford, CA",
      details: "The global center for venture-backed entrepreneurship. Operating adjacent to Silicon Valley, Stanford GSB matches HBS in selectivity, emphasizing tech startups, venture capital funding, and disruptive executive leadership.",
      imageSrc: "/images/library/University/Stanford University Campus.jpg",
    },
    {
      title: "Chicago Booth School of Business",
      description: "Founded 1898 · Chicago, IL",
      details: "Renowned for its rigorous focus on quantitative economics and the Chicago School of economic thought. Booth has produced multiple Nobel laureates in economics, defining modern portfolio theory and financial market analysis.",
      imageSrc: "/images/library/University/University_of_Chicago,_Harper_Library.jpg",
    },
  ],
  parallelLabel: "THE EXECUTIVE NETWORK",
  parallelTitle: "Global Corporate Dominance",
  parallelSubtitle: "Over 35% of all Fortune 500 CEOs hold MBAs from these top-tier American institutions, establishing a shared management language that coordinates global supply chains and capital markets.",
  oracleDescription: "Ask the AI Oracle about HBS case method studies, Wharton's finance curriculum, Stanford GSB's venture capital placement, or Chicago Booth's economic Nobel laureates.",
};

const copyRo: BusinessCopy = {
  breadcrumbParent: "Universități",
  breadcrumbPage: "Școli de Business",
  heroTagline: "ARHITECȚII CAPITALISMULUI GLOBAL",
  heroTitle: "Școlile de Business",
  heroSubtitle: "HBS, Wharton, Stanford GSB și Chicago Booth — centrele de management care au inventat MBA-ul și formează executivii comerțului mondial.",
  thesisTitle: "Controlul Capitalului de Management",
  thesisParagraph1: "Masterul în Administrarea Afacerilor (MBA) este o invenție americană, concepută inițial la Tuck School (Dartmouth) și formalizată la Harvard în 1908. De atunci, școlile americane de business funcționează ca principalele filtre de selecție și școli de perfecționare pentru elita financiară și corporativă globală.",
  thesisParagraph2: "Aceste instituții îmbină rigoarea academică cantitativă cu studiile de caz practice și rețelele de absolvenți. Conectând tinerii profesioniști ambițioși cu Wall Street, Silicon Valley și consiliile de administrație Fortune 500, ele acționează ca rețele de transmitere a autorității corporative.",
  statsTitle: "Indicatori ai Leadershipului și Plasării Financiare",
  cardsTitle: "Academiile de Afaceri de Elită",
  cards: [
    {
      title: "Harvard Business School (HBS)",
      description: "Fondată în 1908 · Boston, MA",
      details: "Pioniera studiilor de caz (Case Method), punând studenții în rolul de CEO. HBS a format mai mulți lideri de corporații Fortune 500 și oameni de afaceri internaționali decât oricare altă școală din lume.",
      imageSrc: "/images/library/University/zoshua-colah-Juzqxc8MwtU-unsplash.jpg",
    },
    {
      title: "The Wharton School (University of Pennsylvania)",
      description: "Fondată în 1881 · Philadelphia, PA",
      details: "Cea mai veche școală universitară de afaceri din lume, renumită pentru curriculumul său în finanțe cantitative. Wharton este principalul furnizor de specialiști pentru Wall Street și private equity.",
      imageSrc: "/images/library/University/Cornell University, view, landscape, greens, mountains.jpg",
    },
    {
      title: "Stanford Graduate School of Business (GSB)",
      description: "Fondată în 1925 · Stanford, CA",
      details: "Centrul global al antreprenoriatului bazat pe capital de risc. Situată lângă Silicon Valley, Stanford GSB excelează în pregătirea fondatorilor de tehnologie și a liderilor din venture capital.",
      imageSrc: "/images/library/University/Stanford University Campus.jpg",
    },
    {
      title: "Chicago Booth School of Business",
      description: "Fondată în 1898 · Chicago, IL",
      details: "Renumită pentru abordarea riguroasă a economiei cantitative și Școala de Economie de la Chicago. A dat numeroși laureați Nobel, definind teoria modernă a portofoliilor.",
      imageSrc: "/images/library/University/University_of_Chicago,_Harper_Library.jpg",
    },
  ],
  parallelLabel: "REȚEAUA EXECUTIVĂ",
  parallelTitle: "Dominanța Corporativă Globală",
  parallelSubtitle: "Peste 35% din directorii executivi ai companiilor Fortune 500 dețin un MBA de la aceste instituții americane, definind un limbaj comun de management global.",
  oracleDescription: "Întreabă Oracolul AI despre studiile de caz HBS, curriculumul Wharton, plasamentele Stanford GSB în venture capital sau laureații Nobel de la Chicago Booth.",
};

export default async function BusinessSchoolsPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const copy = isRo ? copyRo : copyEn;

  return (
    <>
      <MacroStyles />
      
      {/* Cinematic Hero */}
      <MacroHero 
        titleLead={copy.heroTitle}
        titleAccent={copy.heroTagline}
        eyebrow={copy.breadcrumbPage}
        description={copy.heroSubtitle}
        imageSrc="/images/library/University/University_of_Chicago,_Harper_Library.jpg"
        imageAlt="University of Chicago Harper Library interior"
        stats={[
          { value: "200+", label: isRo ? "Directori Executivi F500" : "Fortune 500 CEOs" },
          { value: "$180k+", label: isRo ? "Salariu Inițial Mediu" : "Median Starting Salary" },
          { value: "$50B+", label: isRo ? "Capital VC Atras" : "VC Funding Raised" }
        ]}
      />

      <div className="bg-[#000000] relative z-10 pb-32 pt-16 font-body text-white">
        {/* Breadcrumbs */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
          <Breadcrumb
            items={[
              { label: copy.breadcrumbParent, href: "/universities" },
              { label: copy.breadcrumbPage },
            ]}
          />
        </div>

        {/* Thesis Section */}
        <section id="overview" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 space-y-6">
              <span className="macro-eyebrow">{copy.heroTagline}</span>
              <h2 className="font-macro-display text-4xl md:text-5xl font-bold text-white leading-tight">
                {copy.thesisTitle}
              </h2>
              <p className="font-macro-body text-white/80 text-xl leading-relaxed">
                {copy.thesisParagraph1}
              </p>
              <p className="font-macro-body text-white/80 text-xl leading-relaxed">
                {copy.thesisParagraph2}
              </p>
            </div>
          </div>
        </section>

        {/* Dynamic Count-Up Business Stats */}
        <section className="py-24 border-t border-b border-white/5 bg-white/[0.01] mb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] text-center mb-16 font-semibold">
              {copy.statsTitle}
            </h3>
            <div className="grid gap-12 sm:grid-cols-3 text-center">
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
                <p className="font-macro-display text-5xl md:text-6xl text-[#E8B923] font-black tracking-tight mb-4">
                  <CountUp value={200} suffix="+" />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-2">
                  {isRo ? "Lideri Fortune 500" : "Fortune 500 CEOs"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo ? "Lideri ai marilor corporații globale instruiți în top 3 școli americane." : "Top corporate leaders globally trained at elite US business schools."}
                </p>
              </div>
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
                <p className="font-macro-display text-5xl md:text-6xl text-[#E8B923] font-black tracking-tight mb-4">
                  $<CountUp value={180} suffix="k+" />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-2">
                  {isRo ? "Salariu de Pornire" : "Median Starting Pay"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo ? "Salariul mediu garantat de un MBA de top la angajare în finanțe sau consultanță." : "Base compensation secured by top MBA graduates entering banking or consulting."}
                </p>
              </div>
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
                <p className="font-macro-display text-5xl md:text-6xl text-[#E8B923] font-black tracking-tight mb-4">
                  $<CountUp value={50} suffix="B+" />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-2">
                  {isRo ? "Finanțări VC Atrași" : "Alumni Venture Funding"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo ? "Capital de risc strâns de absolvenții HBS și Stanford pentru idei inovatoare." : "Venture capital secured by HBS and Stanford GSB alumni for tech startups."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Business Pillars Editorial Grid */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-32 mb-32">
          <h2 className="font-macro-display text-4xl font-bold text-center text-white uppercase tracking-tight">
            {copy.cardsTitle}
          </h2>
          {copy.cards.map((card, idx) => (
            <div
              key={idx}
              className="grid gap-12 lg:grid-cols-2 items-center"
            >
              <div
                className={`space-y-6 ${
                  idx % 2 === 1 ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <span className="macro-eyebrow">{card.description}</span>
                <h3 className="macro-section-title text-white text-2xl md:text-4xl">
                  {card.title}
                </h3>
                <p className="macro-body text-white/70 text-lg leading-relaxed">{card.details}</p>
              </div>
              <div
                className={`relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-white/5 bg-black/40 ${
                  idx % 2 === 1 ? "lg:order-1" : "lg:order-2"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.imageSrc}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>
          ))}
        </section>

        {/* Parallax Band */}
        <InfrastructureBand
          imageSrc="/images/library/University/University_of_Chicago,_Harper_Library.jpg"
          imageAlt="University of Chicago Harper Library grand Gothic reading room"
        >
          <div className="relative z-10 text-center md:text-left">
            <span className="macro-eyebrow mb-2 block">
              {copy.parallelLabel}
            </span>
            <h2 className="macro-section-title text-white mb-4">
              {copy.parallelTitle}
            </h2>
            <p className="macro-body text-white/70 max-w-3xl leading-relaxed">
              {copy.parallelSubtitle}
            </p>
          </div>
        </InfrastructureBand>

        {/* Back Link */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex justify-start border-t border-white/10 pt-12">
            <a 
              href="/universities" 
              className="text-xs uppercase tracking-widest text-[#E8B923] hover:text-white transition-colors font-mono font-bold"
            >
              {isRo ? "← ÎNAPOI LA PREZENTAREA GENERALĂ" : "← BACK TO UNIVERSITIES OVERVIEW"}
            </a>
          </div>
        </div>

        {/* AI Ask America Oracle Section */}
        <div>
          <AskAmericaCTA
            locale={locale}
            descriptionEn={copyEn.oracleDescription}
            descriptionRo={copyRo.oracleDescription}
          />
        </div>
      </div>
    </>
  );
}
