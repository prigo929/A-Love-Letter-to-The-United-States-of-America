import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Globe, 
  TrendingUp, 
  Layers, 
  Atom, 
  Building2, 
  Search 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Higher Education | The World's University",
  description: "Explore why American universities occupy 15 to 17 of the top 20 spots in global rankings, attracting the world's most ambitious minds through research and innovation.",
};

interface UniversitiesCopy {
  breadcrumb: string;
  heroTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  thesisTitle: string;
  thesisParagraph1: string;
  thesisParagraph2: string;
  statsTitle: string;
  stats: Array<{
    value: string;
    label: string;
    description: string;
  }>;
  gridTitle: string;
  gridItems: Array<{
    title: string;
    description: string;
    href: string;
    badge: string;
  }>;
  rankingLabel: string;
  rankingTitle: string;
  rankingSubtitle: string;
  rankingTable: Array<{
    rank: number;
    university: string;
    location: string;
    category: string;
  }>;
  oracleDescription: string;
}

const copyEn: UniversitiesCopy = {
  breadcrumb: "Universities",
  heroTagline: "THE WORLD'S UNIVERSITY",
  heroTitle: "7 of the Top 10 Universities are American",
  heroSubtitle: "A competitive, market-driven ecosystem combining massive private endowments, federal research grants, and a culture that rewards output over seniority.",
  thesisTitle: "Higher Education: The World's University",
  thesisParagraph1: "Of the top 20 universities in every major global ranking — QS, Times Higher Education, the Shanghai ARWU — American institutions consistently occupy 15 to 17 spots. This is the direct product of a competitive, market-driven model that funds research through a combination of federal grants, massive private endowments, and tuition revenues, and rewards output over seniority.",
  thesisParagraph2: "The US attracts more international graduate students and produces more peer-reviewed research output than any other nation. The fact that the global elite — from China, India, South Korea, and Western Europe — still overwhelmingly choose American universities for their most ambitious children is the most unambiguous market endorsement imaginable.",
  statsTitle: "Higher Education Power Metrics",
  stats: [
    {
      value: "15-17 of 20",
      label: "Top 20 Supremacy",
      description: "Dominating major global indexes (QS, Times, Shanghai ARWU) year after year."
    },
    {
      value: "$873.7B",
      label: "Academic Endowments",
      description: "The private wealth of 658 institutions. Harvard ($52B) and Yale each hold endowments higher than the GDP of countries like Iceland, Nicaragua, and Senegal, compounding their advantage over Europe's public-funding model."
    },
    {
      value: "400k+",
      label: "International Grads",
      description: "Attracting the brightest scientific minds from all corners of the globe."
    }
  ],
  gridTitle: "Explore University Sectors",
  gridItems: [
    {
      title: "Ivy League",
      description: "Harvard, Yale, Princeton, and the historic anchors of academic prestige and global leadership networks.",
      href: "/universities/ivy-league",
      badge: "Academic Legacy"
    },
    {
      title: "STEM Powerhouses",
      description: "MIT, Stanford, and Caltech — the intellectual crucibles that invented Silicon Valley and power global tech.",
      href: "/universities/stem-powerhouses",
      badge: "Tech & Science"
    },
    {
      title: "Business Schools",
      description: "Harvard Business School, Wharton, and Chicago Booth — training the managers and financiers of global capitalism.",
      href: "/universities/business-schools",
      badge: "Management"
    },
    {
      title: "Public Research Systems",
      description: "UC Berkeley, Michigan, and UT Austin — state systems that democratize research and drive local economies.",
      href: "/universities/public-research-universities",
      badge: "Public Research"
    }
  ],
  rankingLabel: "GLOBAL VERDICT",
  rankingTitle: "Global University Rankings (QS 2026)",
  rankingSubtitle: "A continuous market verdict on the stability and quality of the American system.",
  rankingTable: [
    { rank: 1, university: "Massachusetts Institute of Technology (MIT)", location: "Cambridge, MA", category: "STEM Powerhouse" },
    { rank: 2, university: "Stanford University", location: "Stanford, CA", category: "STEM Powerhouse" },
    { rank: 3, university: "Harvard University", location: "Cambridge, MA", category: "Ivy League" },
    { rank: 4, university: "University of Oxford", location: "United Kingdom", category: "International" },
    { rank: 5, university: "California Institute of Technology (Caltech)", location: "Pasadena, CA", category: "STEM Powerhouse" },
    { rank: 6, university: "University of Cambridge", location: "United Kingdom", category: "International" },
    { rank: 7, university: "University of Pennsylvania (Penn)", location: "Philadelphia, PA", category: "Ivy League" },
    { rank: 8, university: "University of California, Berkeley (UCB)", location: "Berkeley, CA", category: "Public Research" },
    { rank: 9, university: "Princeton University", location: "Princeton, NJ", category: "Ivy League" },
    { rank: 10, university: "Yale University", location: "New Haven, CT", category: "Ivy League" }
  ],
  oracleDescription: "Ask the AI Oracle about Ivy League endowments, STEM powerhouse institutions, research funding, or public university systems."
};

const copyRo: UniversitiesCopy = {
  breadcrumb: "Universități",
  heroTagline: "UNIVERSITATEA LUMII",
  heroTitle: "7 din Top 10 Universități sunt Americane",
  heroSubtitle: "Un ecosistem competitiv, bazat pe piață, care combină fonduri private masive, granturi federale de cercetare și o cultură a meritocrației.",
  thesisTitle: "Învățământul Superior: Universitatea Lumii",
  thesisParagraph1: "Din primele 20 de universități în fiecare clasament global major — QS, Times Higher Education, Shanghai ARWU — instituțiile americane ocupă în mod constant între 15 și 17 locuri. Acesta este produsul direct al unui model competitiv, orientat spre piață, care finanțează cercetarea printr-o combinație de granturi federale, donații private masive și taxe de școlarizare.",
  thesisParagraph2: "SUA atrag mai mulți studenți internaționali de elită și produc mai multă cercetare de pionierat decât orice altă națiune. Faptul că elitele globale — din China, India, Coreea de Sud și Europa de Vest — aleg în mod covârșitor universitățile americane pentru copiii lor reprezintă cel mai clar gir pe care piața îl poate oferi.",
  statsTitle: "Metrici ale Excelenței Academice",
  stats: [
    {
      value: "15-17 din 20",
      label: "Supremație în Clasamente",
      description: "Dominarea indicilor globali majori (QS, Times, Shanghai ARWU) an de an."
    },
    {
      value: "873,7 Mld. $",
      label: "Fonduri Academice (Endowments)",
      description: "Averea privată a 658 de instituții. Harvard (52 mld. $) și Yale dețin fonduri ce depășesc PIB-ul unor țări ca Islanda, Nicaragua sau Senegal, consolidând avantajul față de modelul european bazat pe bugete publice."
    },
    {
      value: "400k+",
      label: "Cercetători Internaționali",
      description: "Atragerea celor mai luminate minți științifice de pe toate continentele."
    }
  ],
  gridTitle: "Explorează Sectoarele Universitare",
  gridItems: [
    {
      title: "Ivy League",
      description: "Harvard, Yale, Princeton — ancorele istorice ale prestigiului academic și rețelelor de leadership global.",
      href: "/universities/ivy-league",
      badge: "Moștenire Academică"
    },
    {
      title: "Centre STEM",
      description: "MIT, Stanford și Caltech — creuzetele intelectuale care au inventat Silicon Valley și alimentează tehnologia mondială.",
      href: "/universities/stem-powerhouses",
      badge: "Știință & Tehnologie"
    },
    {
      title: "Școli de Business",
      description: "Harvard Business School, Wharton și Chicago Booth — pregătirea managerilor și finanțiștilor capitalismului global.",
      href: "/universities/business-schools",
      badge: "Management"
    },
    {
      title: "Sisteme de Cercetare Publică",
      description: "UC Berkeley, Michigan și UT Austin — sisteme de stat care democratizează accesul la cercetarea de vârf.",
      href: "/universities/public-research-universities",
      badge: "Cercetare Publică"
    }
  ],
  rankingLabel: "VERDICTUL GLOBAL",
  rankingTitle: "Clasamentul Mondial al Universităților (QS 2026)",
  rankingSubtitle: "O dovadă constantă a puterii de atracție și calității sistemului de învățământ din SUA.",
  rankingTable: [
    { rank: 1, university: "Massachusetts Institute of Technology (MIT)", location: "Cambridge, MA", category: "Centre STEM" },
    { rank: 2, university: "Stanford University", location: "Stanford, CA", category: "Centre STEM" },
    { rank: 3, university: "Harvard University", location: "Cambridge, MA", category: "Ivy League" },
    { rank: 4, university: "University of Oxford", location: "Marea Britanie", category: "Internațional" },
    { rank: 5, university: "California Institute of Technology (Caltech)", location: "Pasadena, CA", category: "Centre STEM" },
    { rank: 6, university: "University of Cambridge", location: "Marea Britanie", category: "Internațional" },
    { rank: 7, university: "University of Pennsylvania (Penn)", location: "Philadelphia, PA", category: "Ivy League" },
    { rank: 8, university: "University of California, Berkeley (UCB)", location: "Berkeley, CA", category: "Cercetare Publică" },
    { rank: 9, university: "Princeton University", location: "Princeton, NJ", category: "Ivy League" },
    { rank: 10, university: "Yale University", location: "New Haven, CT", category: "Ivy League" }
  ],
  oracleDescription: "Întreabă Oracolul AI despre fondurile universităților Ivy League, instituțiile STEM de top, finanțarea cercetării sau sistemele universitare publice."
};

export default async function UniversitiesPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const copy = isRo ? copyRo : copyEn;

  return (
    <main className="min-h-screen bg-navy-dark pt-24 text-white font-body selection:bg-glory-gold selection:text-navy-dark">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: copy.breadcrumb }]} className="mb-8" />
      </div>

      {/* Hero Section */}
      <section
        id="hero"
        className="scroll-mt-24 border-b border-white/10 px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-b from-navy-dark via-navy-mid to-navy-dark relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-star-pattern opacity-30 pointer-events-none" />
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-glory-gold mb-4 block">
            {copy.heroTagline}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {copy.heroTitle}
          </h1>
          <p className="font-body text-white/70 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            {copy.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Thesis Section */}
      <section
        id="intro"
        className="scroll-mt-24 border-b border-white/10 px-4 py-20 sm:px-6 lg:px-8 bg-navy-dark"
      >
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/3 p-8 md:p-12 relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <GraduationCap className="h-24 w-24 text-glory-gold" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-glory-gold mb-6">
            {copy.thesisTitle}
          </h2>
          <p className="font-body text-white/80 text-lg leading-relaxed mb-6">
            {copy.thesisParagraph1}
          </p>
          <p className="font-body text-white/80 text-lg leading-relaxed">
            {copy.thesisParagraph2}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section
        id="stats"
        className="scroll-mt-24 border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8 bg-navy-dark"
      >
        <div className="mx-auto max-w-7xl">
          <h3 className="font-mono text-xs uppercase tracking-widest text-glory-gold text-center mb-12">
            {copy.statsTitle}
          </h3>
          <div className="grid gap-8 sm:grid-cols-3 text-center">
            {copy.stats.map((stat, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl border border-white/5 bg-white/2 hover:border-glory-gold/20 transition-all"
              >
                <p className="font-hero text-4xl sm:text-5xl text-glory-gold tracking-wide mb-2">
                  {stat.value}
                </p>
                <p className="font-display text-lg font-bold text-white mb-2">
                  {stat.label}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Links Section */}
      <section
        id="nav-grid"
        className="scroll-mt-24 border-b border-white/10 px-4 py-20 sm:px-6 lg:px-8 bg-navy-dark"
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-3xl font-bold text-white text-center mb-12">
            {copy.gridTitle}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {copy.gridItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="group rounded-3xl border border-white/10 bg-white/5 p-6 flex flex-col justify-between hover:border-glory-gold/40 hover:bg-white/8 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-glory-gold border border-glory-gold/25 px-2 py-0.5 rounded">
                      {item.badge}
                    </span>
                    {idx === 0 && <Award className="h-5 w-5 text-white/40 group-hover:text-glory-gold transition-colors" />}
                    {idx === 1 && <Atom className="h-5 w-5 text-white/40 group-hover:text-glory-gold transition-colors" />}
                    {idx === 2 && <Building2 className="h-5 w-5 text-white/40 group-hover:text-glory-gold transition-colors" />}
                    {idx === 3 && <BookOpen className="h-5 w-5 text-white/40 group-hover:text-glory-gold transition-colors" />}
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-glory-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/50 leading-relaxed font-body">
                    {item.description}
                  </p>
                </div>
                <span className="mt-6 text-xs text-glory-gold group-hover:underline block">
                  {isRo ? "Explorează sectorul →" : "Explore sector →"}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Rankings Section */}
      <section
        id="feature"
        className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 pb-12"
      >
        <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-white/3 p-6 md:p-8">
          <div className="mb-8 text-center md:text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-glory-gold">
              {copy.rankingLabel}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-2 mb-3">
              {copy.rankingTitle}
            </h2>
            <p className="font-body text-white/50 text-sm">
              {copy.rankingSubtitle}
            </p>
          </div>

          <div className="overflow-x-auto border-t border-white/10">
            <table className="w-full min-w-[600px] text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 text-xs font-mono uppercase tracking-wider text-white/40 px-4">#</th>
                  <th className="py-4 text-xs font-mono uppercase tracking-wider text-white/40 px-4">{isRo ? "Universitate" : "University"}</th>
                  <th className="py-4 text-xs font-mono uppercase tracking-wider text-white/40 px-4">{isRo ? "Locație" : "Location"}</th>
                  <th className="py-4 text-xs font-mono uppercase tracking-wider text-white/40 px-4">{isRo ? "Categorie" : "Category"}</th>
                </tr>
              </thead>
              <tbody>
                {copy.rankingTable.map((row, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                    <td className="py-4 font-hero text-lg text-glory-gold px-4">{row.rank}</td>
                    <td className="py-4 text-base font-semibold text-white px-4">{row.university}</td>
                    <td className="py-4 text-sm text-white/60 px-4">{row.location}</td>
                    <td className="py-4 px-4">
                      <span className="text-xs bg-white/5 border border-white/10 px-2 py-0.5 rounded text-white/70">
                        {row.category}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* AI Ask America Oracle Section */}
      <AskAmericaCTA
        locale={locale}
        descriptionEn={copyEn.oracleDescription}
        descriptionRo={copyRo.oracleDescription}
      />
    </main>
  );
}
