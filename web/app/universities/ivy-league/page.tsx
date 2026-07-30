import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { 
  MacroStyles, 
  MacroHero, 
  CountUp, 
  InfrastructureBand,
  MacroFact
} from "@/components/economy/EconomyAnimations";


export const metadata: Metadata = {
  title: "Ivy League | The Foundations of Academic Prestige",
  description: "Explore the historic Ivy League universities, their massive endowments, global influence networks, and academic rigor.",
};

interface IvyCopy {
  breadcrumbParent: string;
  breadcrumbPage: string;
  heroTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  thesisTitle: string;
  thesisParagraph1: string;
  thesisParagraph2: string;
  endowmentTitle: string;
  endowmentSubtitle: string;
  cardsTitle: string;
  cards: Array<{
    title: string;
    description: string;
    details: string;
    imageSrc: string;
  }>;
  tableTitle: string;
  tableHeaders: string[];
  tableData: Array<{
    name: string;
    est: string;
    endowment: string;
    location: string;
  }>;
  oracleDescription: string;
}

const copyEn: IvyCopy = {
  breadcrumbParent: "Universities",
  breadcrumbPage: "Ivy League",
  heroTagline: "ACADEMIC TRADITION & CAPITAL",
  heroTitle: "Old Money, New Power",
  heroSubtitle: "Eight elite institutions representing the historical foundation of American intellectual leadership, academic rigor, and unmatched financial endowments.",
  thesisTitle: "The Foundations of Prestige",
  thesisParagraph1: "The Ivy League operates as a global brand synonymous with academic prestige, moving far beyond its origins as an athletic conference. Its eight member institutions, Harvard, Yale, Princeton, Columbia, Penn, Brown, Dartmouth, and Cornell, hold over $190 billion in combined endowment assets, enabling them to offer full-need financial aid and attract the world's most talented students regardless of socioeconomic background.",
  thesisParagraph2: "At the core of their dominance is capital. With combined endowments exceeding $150 billion, they operate as major financial trusts that happen to run elite research institutions. This enables them to fund massive laboratories, attract world-class faculty, and offer generous financial aid that secures the world's most talented youth regardless of economic status.",
  endowmentTitle: "Capital Endowment Scale",
  endowmentSubtitle: "The financial engines that allow American private universities to out-invest and out-research global public models.",
  cardsTitle: "The Big Four",
  cards: [
    {
      title: "Harvard University",
      description: "Founded 1636 · Cambridge, MA",
      details: "The oldest and most famous university in the United States. With an endowment of $52+ billion, Harvard has produced 8 US Presidents, 188 living billionaires, and 160+ Nobel laureates, establishing the primary blueprint for global academic prestige.",
      imageSrc: "/images/library/University/zoshua-colah-Juzqxc8MwtU-unsplash.jpg",
    },
    {
      title: "Yale University",
      description: "Founded 1701 · New Haven, CT",
      details: "Renowned for its Gothic campus, intense collegiate system, and the world-preeminent Yale Law School. Yale is a primary feeder for the US Supreme Court and has trained generations of American heads of state and diplomats.",
      imageSrc: "/images/library/University/Yale Aerial.jpg",
    },
    {
      title: "Princeton University",
      description: "Founded 1746 · Princeton, NJ",
      details: "A research powerhouse with a unique, rigorous focus on undergraduate education. Princeton regularly ranks #1 in domestic university standings, maintaining the highest endowment per student in the world.",
      imageSrc: "/images/library/University/Princeton University 2.jpg",
    },
    {
      title: "Columbia University",
      description: "Founded 1754 · New York, NY",
      details: "Set in the heart of Manhattan, Columbia combines its famous core curriculum with immediate access to global financial, media, and political centers. It is the administrative anchor of the Pulitzer Prizes.",
      imageSrc: "/images/library/University/Columbia University.jpg",
    },
  ],
  tableTitle: "The Eight Sister Institutions",
  tableHeaders: ["University", "Founded", "Endowment", "Location"],
  tableData: [
    { name: "Harvard University", est: "1636", endowment: "$52.0B", location: "Cambridge, MA" },
    { name: "Yale University", est: "1701", endowment: "$40.7B", location: "New Haven, CT" },
    { name: "Princeton University", est: "1746", endowment: "$34.1B", location: "Princeton, NJ" },
    { name: "Columbia University", est: "1754", endowment: "$13.6B", location: "New York, NY" },
    { name: "University of Pennsylvania (Penn)", est: "1740", endowment: "$21.0B", location: "Philadelphia, PA" },
    { name: "Brown University", est: "1764", endowment: "$6.6B", location: "Providence, RI" },
    { name: "Dartmouth College", est: "1769", endowment: "$7.9B", location: "Hanover, NH" },
    { name: "Cornell University", est: "1865", endowment: "$10.0B", location: "Ithaca, NY" },
  ],
  oracleDescription: "Ask the AI Oracle about Ivy League admission selectivities, historical colonial charters, endowment investment returns, or the legacy networks of the Big Three.",
};

const copyRo: IvyCopy = {
  breadcrumbParent: "Universități",
  breadcrumbPage: "Ivy League",
  heroTagline: "TRADIȚIE ACADEMICĂ ȘI CAPITAL",
  heroTitle: "Tradiție și Putere",
  heroSubtitle: "Opt instituții de elită ce reprezintă fundamentul istoric al leadershipului intelectual american, al rigorii academice și al fondurilor financiare uriașe.",
  thesisTitle: "Fundamentele Prestigiului",
  thesisParagraph1: "Ivy League nu este doar o conferință sportivă; este un brand global sinonim cu supremația academică, admiterea extrem de selectivă și rețelele sociale ale elitei. Fondate în principal în perioada colonială (Cornell fiind singura adăugată după Revoluție), aceste opt instituții au acumulat secole de prestigiu și rețele de absolvenți.",
  thesisParagraph2: "La baza dominanței lor se află capitalul. Cu fonduri combinate care depășesc 150 de miliarde de dolari, ele funcționează ca trusturi financiare masive. Acest lucru le permite să finanțeze laboratoare uriașe, să atragă profesori de top și să ofere ajutoare financiare generoase care atrag cei mai talentați tineri.",
  endowmentTitle: "Scara Fondurilor Academice",
  endowmentSubtitle: "Motoarele financiare care permit universităților private americane să investească și să cerceteze peste modelele publice internaționale.",
  cardsTitle: "Cei Patru Mari (The Big Four)",
  cards: [
    {
      title: "Harvard University",
      description: "Fondată în 1636 · Cambridge, MA",
      details: "Cea mai veche și faimoasă universitate din SUA. Cu fonduri de peste 52 miliarde $, Harvard a oferit lumii 8 președinți americani, 188 de miliardari în viață și peste 160 de laureați Nobel, stabilind standardul prestigiului academic.",
      imageSrc: "/images/library/University/zoshua-colah-Juzqxc8MwtU-unsplash.jpg",
    },
    {
      title: "Yale University",
      description: "Fondată în 1701 · New Haven, CT",
      details: "Renumită pentru campusul său gotic superb, sistemul colegial strâns și renumita Yale Law School. Yale este principalul furnizor de judecători pentru Curtea Supremă a SUA și a format generații de lideri diplomatici.",
      imageSrc: "/images/library/University/Yale Aerial.jpg",
    },
    {
      title: "Princeton University",
      description: "Fondată în 1746 · Princeton, NJ",
      details: "O forță în cercetare cu o orientare riguroasă către învățământul de licență. Princeton ocupă constant locul 1 în clasamentele naționale americane, având cel mai mare fond financiar raportat la numărul de studenți.",
      imageSrc: "/images/library/University/Princeton University 2.jpg",
    },
    {
      title: "Columbia University",
      description: "Fondată în 1754 · New York, NY",
      details: "Situată în inima Manhattan-ului, Columbia îmbină curriculumul său clasic cu accesul direct la centrele financiare, media și politice ale lumii. Administrează decernarea Premiilor Pulitzer.",
      imageSrc: "/images/library/University/Columbia University.jpg",
    },
  ],
  tableTitle: "Cele Opt Instituții Surori",
  tableHeaders: ["Universitate", "Fondată", "Fonduri (Endowment)", "Locație"],
  tableData: [
    { name: "Harvard University", est: "1636", endowment: "$52.0B", location: "Cambridge, MA" },
    { name: "Yale University", est: "1701", endowment: "$40.7B", location: "New Haven, CT" },
    { name: "Princeton University", est: "1746", endowment: "$34.1B", location: "Princeton, NJ" },
    { name: "Columbia University", est: "1754", endowment: "$13.6B", location: "New York, NY" },
    { name: "University of Pennsylvania (Penn)", est: "1740", endowment: "$21.0B", location: "Philadelphia, PA" },
    { name: "Brown University", est: "1764", endowment: "$6.6B", location: "Providence, RI" },
    { name: "Dartmouth College", est: "1769", endowment: "$7.9B", location: "Hanover, NH" },
    { name: "Cornell University", est: "1865", endowment: "$10.0B", location: "Ithaca, NY" },
  ],
  oracleDescription: "Întreabă Oracolul AI despre selecția admiterii în Ivy League, cartele istorice din perioada colonială, randamentele investițiilor sau rețelele de influență ale absolvenților.",
};

export default async function IvyLeaguePage() {
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
        imageSrc="/images/library/University/Princeton University.jpg"
        imageAlt="Princeton University Historic Campus"
        stats={[
          { value: "$150B+", label: isRo ? "Fonduri Combinate" : "Combined Endowment" },
          { value: "1636", label: isRo ? "Prima Fondare (Harvard)" : "First Founded (Harvard)" },
          { value: "7/8", label: isRo ? "Cartele Coloniale Pre-1776" : "Pre-1776 Charters" }
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

        {/* Dynamic Count-Up Endowment Stats */}
        <section className="py-24 border-t border-b border-white/5 bg-white/[0.01] mb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] text-center mb-16 font-semibold">
              {copy.endowmentTitle}
            </h3>
            <div className="grid gap-12 sm:grid-cols-3 text-center">
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
                <p className="font-macro-display text-5xl md:text-6xl text-[#E8B923] font-black tracking-tight mb-4">
                  $<CountUp value={52} suffix="B+" />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-2">
                  {isRo ? "Fondul Harvard" : "Harvard Endowment"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo ? "Cel mai mare fond academic privat din lume, depășind PIB-ul multor națiuni." : "The largest academic endowment globally, surpassing the GDP of multiple sovereign nations."}
                </p>
              </div>
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
                <p className="font-macro-display text-5xl md:text-6xl text-[#E8B923] font-black tracking-tight mb-4">
                  $<CountUp value={152} suffix="B+" />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-2">
                  {isRo ? "Liga de Capital" : "Combined Ivy Assets"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo ? "Activele cumulate ale celor opt școli, gestionate ca trusturi majore de investiții." : "Cumulative wealth of the eight institutions, managed as mega investment funds."}
                </p>
              </div>
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
                <p className="font-macro-display text-5xl md:text-6xl text-[#E8B923] font-black tracking-tight mb-4">
                  <CountUp value={8} />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-2">
                  {isRo ? "Foști Președinți SUA (Harvard)" : "US Presidents (Harvard)"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo ? "O conductă istorică de transmitere a puterii și a autorității politice federale." : "A historic pipeline for the transfer of federal power and political authority."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Big Four Section */}
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
                <Image
                  src={card.imageSrc}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>
          ))}
        </section>

        {/* Parallax Band */}
        <InfrastructureBand
          imageSrc="/images/library/University/Harvard Widener Library interior reading room.jpg"
          imageAlt="Harvard Widener Library Reading Room"
        >
          <div className="relative z-10 text-center md:text-left">
            <span className="macro-eyebrow mb-2 block">
              {isRo ? "LIGA DE ELITĂ" : "THE ELITE GROUP"}
            </span>
            <h2 className="macro-section-title text-white mb-4">
              {copy.tableTitle}
            </h2>
            <p className="macro-body text-white/70 max-w-3xl leading-relaxed">
              {copy.endowmentSubtitle}
            </p>
          </div>
        </InfrastructureBand>

        {/* Table Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <div className="rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md p-8 md:p-12">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-4 text-xs font-mono uppercase tracking-wider text-white/40 px-4">{copy.tableHeaders[0]}</th>
                    <th className="py-4 text-xs font-mono uppercase tracking-wider text-white/40 px-4">{copy.tableHeaders[1]}</th>
                    <th className="py-4 text-xs font-mono uppercase tracking-wider text-white/40 px-4">{copy.tableHeaders[2]}</th>
                    <th className="py-4 text-xs font-mono uppercase tracking-wider text-white/40 px-4">{copy.tableHeaders[3]}</th>
                  </tr>
                </thead>
                <tbody>
                  {copy.tableData.map((row, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors">
                      <td className="py-5 text-base font-semibold text-white px-4">{row.name}</td>
                      <td className="py-5 font-mono text-sm text-[#E8B923] px-4">{row.est}</td>
                      <td className="py-5 font-mono text-sm text-white/80 px-4">{row.endowment}</td>
                      <td className="py-5 text-sm text-white/60 px-4">{row.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

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
