import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { 
  MacroStyles, 
  MacroHero, 
  CountUp, 
  InfrastructureBand
} from "@/components/economy/EconomyAnimations";
import {
  Award,
  ExternalLink
} from "lucide-react";

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
  bayhLabel: string;
  bayhTitle: string;
  bayhParagraph1: string;
  bayhParagraph2: string;
  bayhSource: string;
  bayhSourceUrl: string;
  oracleDescription: string;
}

const copyEn: StemCopy = {
  breadcrumbParent: "Universities",
  breadcrumbPage: "STEM Powerhouses",
  heroTagline: "CAPITALS OF COMPUTE",
  heroTitle: "Where the Future Is Built",
  heroSubtitle: "MIT, Stanford, Caltech, and Carnegie Mellon: the research crucibles that engineered modern computing, launched Silicon Valley, and power global tech transfer.",
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
      imageSrc: "/images/library/University/Caltech_Campus_Pasadena.png",
    },
    {
      title: "Carnegie Mellon University (CMU)",
      description: "Founded 1900 · Pittsburgh, PA",
      details: "A world-leader in computer science, robotics, and human-computer interaction. CMU hosted the first artificial intelligence research projects in the 1950s and continues to power autonomous driving, software engineering, and robotic logistics.",
      imageSrc: "/images/library/University/Carnegie_Mellon_University_Campus.png",
    },
  ],
  parallelLabel: "TECH TRANSFER SYSTEM",
  parallelTitle: "From the Blackboard to the Nasdaq",
  parallelSubtitle: "American STEM universities don't just hoard patents; they act as rapid tech incubators. Stanford and MIT alone generate billions in annual licensing revenues and have spun off thousands of active companies.",
  bayhLabel: "UNIVERSITY VENTURE PIPELINE",
  bayhTitle: "The Bayh-Dole Act of 1980: Unlocking Academic Inventions",
  bayhParagraph1: "Before 1980, the US federal government owned the patents on any discoveries funded by federal research grants, licensing fewer than 5% of them. The Bayh-Dole Act flipped this ownership structure, allowing universities and research institutions to retain patent title to their discoveries and license them to private startups and corporations. This single policy shift transformed American universities from theoretical ivory towers into commercial launchpads.",
  bayhParagraph2: "Since its passage, academic tech transfer has generated over $1.9 trillion in U.S. gross industrial output, supported over 4.2 million jobs, and helped launch more than 11,000 startup companies. Over 70% of university licenses are granted to small companies and startups. The act is the legal engine behind biotechnology clusters like Boston's Kendall Square, Silicon Valley's tech transfer, and countless life-saving innovations like mRNA platforms and cancer therapies: funded by federal research, commercialized by private capital.",
  bayhSource: "AUTM / Association of American Universities (AAU) 2026",
  bayhSourceUrl: "https://autm.net",
  oracleDescription: "Ask the AI Oracle about Stanford's role in founding Google, MIT's Lincoln Lab, Caltech's management of JPL, or CMU's robotics research.",
};

const copyRo: StemCopy = {
  breadcrumbParent: "Universități",
  breadcrumbPage: "Centre STEM",
  heroTagline: "CAPITALELE CALCULULUI",
  heroTitle: "Unde Se Construiește Viitorul",
  heroSubtitle: "MIT, Stanford, Caltech și Carnegie Mellon: creuzetele de cercetare care au inovat computingul modern, au creat Silicon Valley și conduc inovația globală.",
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
      imageSrc: "/images/library/University/Caltech_Campus_Pasadena.png",
    },
    {
      title: "Carnegie Mellon University (CMU)",
      description: "Fondată în 1900 · Pittsburgh, PA",
      details: "Lider mondial în informatică, robotică și interacțiune om-calculator. CMU a găzduit primele proiecte de inteligență artificială din anii 1950 și conduce cercetarea în conducere autonomă și inginerie software.",
      imageSrc: "/images/library/University/Carnegie_Mellon_University_Campus.png",
    },
  ],
  parallelLabel: "SISTEMUL DE TRANSFER TEHNOLOGIC",
  parallelTitle: "De la Tablă la Indicele Nasdaq",
  parallelSubtitle: "Universitățile americane STEM nu doar acumulează brevete; ele acționează ca incubatoare rapide. Numai Stanford și MIT au generat mii de companii active ce domină piețele globale.",
  bayhLabel: "CONDUCTA DE STARTUP-URI UNIVERSITARE",
  bayhTitle: "Legea Bayh-Dole din 1980: Deblocarea Invențiilor Academice",
  bayhParagraph1: "Înainte de 1980, guvernul federal al SUA deținea brevetele pentru orice descoperire finanțată din fonduri federale, licențiind mai puțin de 5% dintre acestea. Legea Bayh-Dole a inversat această structură de proprietate, permițând universităților și instituțiilor de cercetare să păstreze drepturile de brevet asupra descoperirilor lor și să le licențieze către startup-uri și corporații private. Această schimbare de politică a transformat universitățile din turnuri de fildeș teoretice în rampe de lansare comercială.",
  bayhParagraph2: "De la adoptarea sa, transferul tehnologic academic a generat peste 1,9 trilioane de dolari în producția industrială brută a SUA, a susținut peste 4,2 milioane de locuri de muncă și a ajutat la lansarea a peste 11.000 de startup-uri. Peste 70% din licențele universitare sunt acordate companiilor mici și startup-urilor. Actul este motorul juridic din spatele clusterelor de biotehnologie precum Kendall Square din Boston, transferului de tehnologie din Silicon Valley și a nenumăratelor inovații salvatoare de vieți, cum ar fi platformele mRNA și terapiile împotriva cancerului: finanțate din cercetare federală, dar comercializate de capital privat.",
  bayhSource: "AUTM / Association of American Universities (AAU) 2026",
  bayhSourceUrl: "https://autm.net",
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

        {/* Bayh-Dole Act Section */}
        <section
          id="bayh-dole-feature"
          className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-32 mb-16"
        >
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Award className="h-40 w-40 text-[#E8B923]" />
            </div>
            
            <div className="relative z-10">
              <span className="font-mono text-xs uppercase tracking-widest text-[#E8B923] mb-3 block">
                {copy.bayhLabel}
              </span>
              <h2 className="font-macro-display text-3xl sm:text-4xl font-bold text-white mb-6">
                {copy.bayhTitle}
              </h2>
              <p className="font-macro-body text-white/80 text-lg leading-relaxed mb-6">
                {copy.bayhParagraph1}
              </p>
              <p className="font-macro-body text-white/80 text-lg leading-relaxed mb-8">
                {copy.bayhParagraph2}
              </p>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-white/10 pt-6 text-xs text-white/40 gap-4">
                <span>Source: {copy.bayhSource}</span>
                <a 
                  href={copy.bayhSourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1 text-[#E8B923] hover:underline self-start sm:self-auto"
                >
                  {isRo ? "Verifică datele AUTM" : "Verify AUTM Data"}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
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
