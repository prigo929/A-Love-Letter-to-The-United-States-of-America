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
import { Atom, Award, Laptop, Rocket } from "lucide-react";

export const metadata: Metadata = {
  title: "STEM Powerhouses | Innovation & Tech Foundations",
  description: "Explore how MIT, Stanford, Caltech, and CMU form the intellectual infrastructure driving global technology and venture-backed innovation.",
};

interface StemCopy {
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

const copyEn: StemCopy = {
  breadcrumbParent: "Universities",
  breadcrumbPage: "STEM Powerhouses",
  heroTagline: "INTELLECTUAL CAPITALS OF COMPUTE",
  heroTitle: "STEM Powerhouses",
  heroSubtitle: "MIT, Stanford, Caltech, and Carnegie Mellon — the research crucibles that engineered modern computing, launched Silicon Valley, and power global tech transfer.",
  thesisTitle: "The Infrastructure of Innovation",
  thesisParagraph1: "America's technological hegemony is not an accident of geography; it is the direct output of a small number of elite research laboratories. Institutions like MIT, Stanford, Caltech, and Carnegie Mellon function as high-velocity engines that take basic scientific research and immediately spin it off into commercial products through robust technology-transfer offices and deep venture capital integrations.",
  thesisParagraph2: "By blending military-defense research grants, massive corporate R&D partnerships, and an entrepreneurial culture that views start-up creation as the ultimate academic validation, these universities have established a model that Europe's public-funding systems cannot match. They don't just write papers; they build industries.",
  statsTitle: "Scientific & Industrial Impact Metrics",
  cardsTitle: "The Engines of Computing & Engineering",
  cards: [
    {
      title: "MIT (Massachusetts Institute of Technology)",
      description: "Founded 1861 · Cambridge, MA",
      details: "The world's preeminent engineering university. MIT spearheaded the development of radar in WWII, created the early building blocks of digital computing (magnetic-core memory), pioneered artificial intelligence, and manages over $2 billion in annual R&D expenditures.",
      imageSrc: "/images/library/University/MIT_Main_Campus_aerial.jpg",
    },
    {
      title: "Stanford University",
      description: "Founded 1885 · Stanford, CA",
      details: "The intellectual engine of Silicon Valley. Stanford established the Stanford Research Park in the 1950s, seeding companies like Hewlett-Packard. Alumni and faculty have founded Google, Cisco, Yahoo, Nvidia, Sun Microsystems, and Netflix.",
      imageSrc: "/images/library/University/Stanford University Campus.jpg",
    },
    {
      title: "Caltech (California Institute of Technology)",
      description: "Founded 1891 · Pasadena, CA",
      details: "An elite, ultra-focused community of scientists. Caltech manages NASA's Jet Propulsion Laboratory (JPL), has won 46 Nobel Prizes relative to its tiny student body, and stands at the cutting edge of quantum computing, astrophysics, and seismology.",
      imageSrc: "/images/library/University/Li Ka Shing Learning and Knowledge Center home to Stanford School of Medicine.jpg",
    },
    {
      title: "Carnegie Mellon University (CMU)",
      description: "Founded 1900 · Pittsburgh, PA",
      details: "A world-leader in computer science, robotics, and human-computer interaction. CMU hosted the first artificial intelligence research projects in the 1950s and continues to power autonomous driving, software engineering, and robotic logistics.",
      imageSrc: "/images/library/University/Johns_Hopkins'_Historic_Dome_-_panoramio.jpg",
    },
  ],
  parallelLabel: "TECH TRANSFER SYSTEM",
  parallelTitle: "From the Blackboard to the Nasdaq",
  parallelSubtitle: "American STEM universities don't just hoard patents; they act as rapid tech incubators. Stanford and MIT alone generate billions in annual licensing revenues and have spun off thousands of active companies.",
  oracleDescription: "Ask the AI Oracle about Stanford's role in founding Google, MIT's Lincoln Lab, Caltech's management of JPL, or CMU's robotics research.",
};

const copyRo: StemCopy = {
  breadcrumbParent: "Universități",
  breadcrumbPage: "Centre STEM",
  heroTagline: "CAPITALELE INTELECTUALE ALE CALCULULUI",
  heroTitle: "Centrele STEM de Elită",
  heroSubtitle: "MIT, Stanford, Caltech și Carnegie Mellon — creuzetele de cercetare care au inventat computingul modern, au creat Silicon Valley și conduc inovația globală.",
  thesisTitle: "Infrastructura Inovației",
  thesisParagraph1: "Hegemonia tehnologică a Americii nu este un accident geografic; este rezultatul direct al unui număr mic de laboratoare de cercetare de elită. Instituții precum MIT, Stanford, Caltech și Carnegie Mellon funcționează ca motoare de mare viteză care transformă cercetarea de bază în produse comerciale prin parteneriate de capital de risc.",
  thesisParagraph2: "Îmbinând granturile de apărare națională, parteneriatele corporate pentru R&D și o cultură antreprenorială care vede în startup-uri validarea academică supremă, aceste universități au creat un model unic. Ele nu scriu doar lucrări științifice; ele construiesc industrii.",
  statsTitle: "Indicatori ai Impactului Științific și Industrial",
  cardsTitle: "Motoarele de Calcul și Inginerie",
  cards: [
    {
      title: "MIT (Massachusetts Institute of Technology)",
      description: "Fondat în 1861 · Cambridge, MA",
      details: "Cea mai renumită universitate de inginerie din lume. MIT a condus dezvoltarea radarului în al Doilea Război Mondial, a creat bazele calculului digital și a inteligenței artificiale, administrând un buget anual de cercetare de peste 2 miliarde de dolari.",
      imageSrc: "/images/library/University/MIT_Main_Campus_aerial.jpg",
    },
    {
      title: "Stanford University",
      description: "Fondată în 1885 · Stanford, CA",
      details: "Motorul intelectual al Silicon Valley. În anii 1950, Stanford a înființat Stanford Research Park, punând bazele unor giganți precum Hewlett-Packard. Absolvenții și profesorii săi au fondat Google, Cisco, Yahoo, Nvidia și Netflix.",
      imageSrc: "/images/library/University/Stanford University Campus.jpg",
    },
    {
      title: "Caltech (California Institute of Technology)",
      description: "Fondat în 1891 · Pasadena, CA",
      details: "O comunitate de elită, extrem de concentrată. Caltech administrează Jet Propulsion Laboratory (JPL) al NASA, deține 46 de Premii Nobel raportat la numărul mic de studenți și excelează în computing cuantic și astrofizică.",
      imageSrc: "/images/library/University/Li Ka Shing Learning and Knowledge Center home to Stanford School of Medicine.jpg",
    },
    {
      title: "Carnegie Mellon University (CMU)",
      description: "Fondată în 1900 · Pittsburgh, PA",
      details: "Lider mondial în informatică, robotică și interacțiune om-calculator. CMU a găzduit primele proiecte de inteligență artificială din anii 1950 și conduce cercetarea în conducere autonomă și inginerie software.",
      imageSrc: "/images/library/University/Johns_Hopkins'_Historic_Dome_-_panoramio.jpg",
    },
  ],
  parallelLabel: "SISTEMUL DE TRANSFER TEHNOLOGIC",
  parallelTitle: "De la Tablă la Indicele Nasdaq",
  parallelSubtitle: "Universitățile americane STEM nu doar acumulează brevete; ele acționează ca incubatoare rapide. Numai Stanford și MIT au generat mii de companii active ce domină piețele globale.",
  oracleDescription: "Întreabă Oracolul AI despre rolul Stanford în fondarea Google, laboratorul Lincoln al MIT, managementul JPL de către Caltech sau cercetările în robotică de la CMU.",
};

export default async function StemPowerhousesPage() {
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
        imageSrc="/images/library/University/MIT_Main_Campus_aerial.jpg"
        imageAlt="MIT Campus Aerial View"
        stats={[
          { value: "300+", label: isRo ? "Unicorni Asociați Stanford" : "Stanford-Linked Unicorns" },
          { value: "$2.0B", label: isRo ? "Buget R&D Anual MIT" : "Annual MIT R&D Budget" },
          { value: "46", label: isRo ? "Premii Nobel Caltech" : "Caltech Nobel Prizes" }
        ]}
      />

      <div className="bg-[#030405] relative z-10 pb-32 pt-16 font-body text-white">
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
        <section id="intro" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-32">
          <div className="rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Atom className="h-40 w-40 text-[#E8B923]" />
            </div>
            <h2 className="font-macro-display text-3xl font-bold text-[#E8B923] mb-8">
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

        {/* Dynamic Count-Up STEM Stats */}
        <section className="py-24 border-t border-b border-white/5 bg-white/[0.01] mb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] text-center mb-16 font-semibold">
              {copy.statsTitle}
            </h3>
            <div className="grid gap-12 sm:grid-cols-3 text-center">
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
                <p className="font-macro-display text-5xl md:text-6xl text-[#E8B923] font-black tracking-tight mb-4">
                  <CountUp value={300} suffix="+" />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-2">
                  {isRo ? "Companii Unicorn" : "Unicorn Startups"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo ? "Companii de miliarde fondate de absolvenți Stanford în Silicon Valley." : "Billion-dollar startups founded by Stanford alumni, dominating tech sectors."}
                </p>
              </div>
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
                <p className="font-macro-display text-5xl md:text-6xl text-[#E8B923] font-black tracking-tight mb-4">
                  $<CountUp value={2} suffix="B+" />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-2">
                  {isRo ? "Buget Inovare MIT" : "MIT R&D Budget"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo ? "Finanțare anuală masivă ce susține laboratoare de calcul cuantic și AI." : "Annual research spending supporting advanced laboratories, compute clusters, and biotech."}
                </p>
              </div>
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
                <p className="font-macro-display text-5xl md:text-6xl text-[#E8B923] font-black tracking-tight mb-4">
                  <CountUp value={46} />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-2">
                  {isRo ? "Premii Nobel Caltech" : "Caltech Nobel Prizes"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo ? "Cea mai mare densitate de laureați Nobel din lume în raport cu dimensiunea." : "World-leading concentration of Nobel laureates relative to the small size of the university."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STEM Pillars Editorial Grid */}
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
          imageSrc="/images/library/University/Stanford University Campus.jpg"
          imageAlt="Stanford Sandstone Quad Architecture"
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
