import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Layers, 
  Atom, 
  Building2 
} from "lucide-react";
import { 
  MacroStyles, 
  MacroHero, 
  CountUp, 
  InfrastructureBand 
} from "@/components/economy/EconomyAnimations";

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
  heroTitle: "Top American Universities",
  heroSubtitle: "A competitive, market-driven ecosystem combining massive private endowments, federal research grants, and a culture that rewards output over seniority.",
  thesisTitle: "Higher Education: The World's University",
  thesisParagraph1: "Of the top 20 universities in every major global ranking — QS, Times Higher Education, the Shanghai ARWU — American institutions consistently occupy 15 to 17 spots. This is the direct product of a competitive, market-driven model that funds research through a combination of federal grants, massive private endowments, and tuition revenues, and rewards output over seniority.",
  thesisParagraph2: "The US attracts more international graduate students and produces more peer-reviewed research output than any other nation. The fact that the global elite — from China, India, South Korea, and Western Europe — still overwhelmingly choose American universities for their most ambitious children is the most unambiguous market endorsement imaginable.",
  statsTitle: "Higher Education Power Metrics",
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
  heroTitle: "Universități de Elită",
  heroSubtitle: "Un ecosistem competitiv, bazat pe piață, care combină fonduri private masive, granturi federale de cercetare și o cultură a meritocrației.",
  thesisTitle: "Învățământul Superior: Universitatea Lumii",
  thesisParagraph1: "Din primele 20 de universități în fiecare clasament global major — QS, Times Higher Education, Shanghai ARWU — instituțiile americane ocupă în mod constant între 15 și 17 locuri. Acesta este produsul direct al unui model competitiv, orientat spre piață, care finanțează cercetarea printr-o combinație de granturi federale, donații private masive și taxe de școlarizare.",
  thesisParagraph2: "SUA atrag mai mulți studenți internaționali de elită și produc mai multă cercetare de pionierat decât orice altă națiune. Faptul că elitele globale — din China, India, Coreea de Sud și Europa de Vest — aleg în mod covârșitor universitățile americane pentru copiii lor reprezintă cel mai clar gir pe care piața îl poate oferi.",
  statsTitle: "Metrici ale Excelenței Academice",
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
    <>
      <MacroStyles />
      
      {/* Cinematic Ken-Burns Image Hero */}
      <MacroHero 
        titleLead={copy.heroTitle}
        titleAccent={copy.heroTagline}
        eyebrow={copy.breadcrumb}
        description={copy.heroSubtitle}
        imageSrc="/images/library/University/Stanford University Campus.jpg"
        imageAlt="Stanford University Campus"
      />

      <div className="bg-[#030405] relative z-10 pb-32 pt-16 font-body text-white">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
          <Breadcrumb items={[{ label: copy.breadcrumb }]} className="mb-8" />
        </div>

        {/* Thesis Section */}
        <section id="intro" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-32">
          <div className="rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <GraduationCap className="h-40 w-40 text-[#E8B923]" />
            </div>
            <h2 className="font-macro-display text-3xl font-bold text-[#E8B923] mb-8 animate-fade-in-up">
              {copy.thesisTitle}
            </h2>
            <p className="font-macro-body text-white/80 text-xl leading-relaxed mb-6">
              {copy.thesisParagraph1}
            </p>
            <p className="font-macro-body text-white/80 text-xl leading-relaxed">
              {copy.thesisParagraph2}
            </p>
          </div>
        </section>

        {/* Dynamic Count-Up Academic Stats */}
        <section className="py-24 border-t border-b border-white/5 bg-white/[0.01] mb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] text-center mb-16 font-semibold">
              {copy.statsTitle}
            </h3>
            <div className="grid gap-12 sm:grid-cols-3 text-center">
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
                <p className="font-macro-display text-5xl md:text-6xl text-[#E8B923] font-black tracking-tight mb-4">
                  <CountUp value={17} prefix="15-" suffix=" of 20" />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-3">
                  {isRo ? "Supremație în Clasamente" : "Top 20 Supremacy"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo ? "Dominarea indicilor globali majori (QS, Times, Shanghai ARWU) an de an." : "Dominating major global indexes (QS, Times, Shanghai ARWU) year after year."}
                </p>
              </div>
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
                <p className="font-macro-display text-5xl md:text-6xl text-[#E8B923] font-black tracking-tight mb-4">
                  <CountUp value={873.7} prefix="$" suffix="B" decimals={1} />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-3">
                  {isRo ? "Fonduri Academice (Endowments)" : "Academic Endowments"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo ? "Harvard ($52B) și Yale dețin fonduri ce depășesc PIB-ul unor țări ca Islanda sau Nicaragua, consolidând avantajul." : "The private wealth of 658 institutions. Harvard ($52B) and Yale hold assets exceeding the GDP of countries like Iceland."}
                </p>
              </div>
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
                <p className="font-macro-display text-5xl md:text-6xl text-[#E8B923] font-black tracking-tight mb-4">
                  <CountUp value={400} suffix="k+" />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-3">
                  {isRo ? "Cercetători Internaționali" : "International Grads"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo ? "Atragerea celor mai luminate minți științifice de pe toate continentele." : "Attracting the brightest scientific minds from all corners of the globe."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Grid Links Section */}
        <section id="nav-grid" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <h2 className="font-macro-display text-4xl font-bold text-center mb-16 text-white uppercase tracking-tight">
            {copy.gridTitle}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {copy.gridItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="group rounded-3xl border border-white/5 bg-white/[0.02] p-8 flex flex-col justify-between hover:border-[#E8B923]/40 hover:bg-white/[0.04] transition-all duration-500 shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono text-[#E8B923] border border-[#E8B923]/25 px-2 py-0.5 rounded">
                      {item.badge}
                    </span>
                    {idx === 0 && <Award className="h-5 w-5 text-white/40 group-hover:text-[#E8B923] transition-colors" />}
                    {idx === 1 && <Atom className="h-5 w-5 text-white/40 group-hover:text-[#E8B923] transition-colors" />}
                    {idx === 2 && <Building2 className="h-5 w-5 text-white/40 group-hover:text-[#E8B923] transition-colors" />}
                    {idx === 3 && <BookOpen className="h-5 w-5 text-white/40 group-hover:text-[#E8B923] transition-colors" />}
                  </div>
                  <h3 className="font-macro-display text-2xl font-bold text-white mb-4 group-hover:text-[#E8B923] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed font-body">
                    {item.description}
                  </p>
                </div>
                <span className="mt-8 text-xs text-[#E8B923] group-hover:underline block font-semibold">
                  {isRo ? "Explorează sectorul →" : "Explore sector →"}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Parallax Library Divider Band */}
        <InfrastructureBand
          imageSrc="/images/library/University/Harvard Widener Library interior reading room.jpg"
          imageAlt="Harvard Widener Library Interior Reading Room"
        >
          <div className="relative z-10 text-center md:text-left">
            <span className="macro-eyebrow mb-2 block">
              {copy.rankingLabel}
            </span>
            <h2 className="macro-section-title text-white mb-4">
              {copy.rankingTitle}
            </h2>
            <p className="macro-body text-white/70 max-w-3xl leading-relaxed mb-8">
              {copy.rankingSubtitle}
            </p>
          </div>
        </InfrastructureBand>

        {/* Rankings Section */}
        <section id="feature" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <div className="rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md p-8 md:p-12">
            <div className="overflow-x-auto">
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
                    <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors">
                      <td className="py-5 font-mono text-lg text-[#E8B923] font-bold px-4">{row.rank}</td>
                      <td className="py-5 text-base font-semibold text-white px-4">{row.university}</td>
                      <td className="py-5 text-sm text-white/60 px-4">{row.location}</td>
                      <td className="py-5 px-4">
                        <span className="text-xs bg-white/5 border border-white/10 px-2.5 py-1 rounded text-white/70 font-mono">
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
        <div className="mt-32">
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
