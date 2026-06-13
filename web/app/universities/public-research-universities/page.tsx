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
import { Award, BookOpen, GraduationCap, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Public Research Universities | Higher Education Scale",
  description: "Explore the massive public university systems of America—like UC Berkeley, Michigan, UT Austin, and UCLA—that democratize research excellence at scale.",
};

interface PublicCopy {
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

const copyEn: PublicCopy = {
  breadcrumbParent: "Universities",
  breadcrumbPage: "Public Research",
  heroTagline: "DEMOCRATIZE RESEARCH",
  heroTitle: "Public Research",
  heroSubtitle: "UC Berkeley, Michigan, UT Austin, and UCLA — the state-funded giants that combine massive scale with research outputs that rival the private Ivy League.",
  thesisTitle: "Elite Education at Scale",
  thesisParagraph1: "While private universities dominate Ivy League prestige, America's state-funded public research systems are the unsung champions of democratic access and regional economic development. Systems like the University of California, the University of Michigan, and the University of Texas operate at a scale that dwarfs private elites, enrolling hundreds of thousands of students while maintaining world-class laboratories.",
  thesisParagraph2: "These public institutions receive federal grants, state appropriations, and tuition to fund Nobel Prize-winning science. In areas like biotechnology, microprocessors, and materials science, their research departments act as core anchors for regional technology clusters, generating thousands of local patents and high-wage jobs.",
  statsTitle: "Public Research & Economic Scale Metrics",
  cardsTitle: "The Giants of Public Education",
  cards: [
    {
      title: "University of California, Berkeley (UCB)",
      description: "Founded 1868 · Berkeley, CA",
      details: "Regularly ranked as the #1 public university in the world. UC Berkeley is a research behemoth whose scientists co-discovered plutonium, californium, and 14 other chemical elements, launched the Free Speech Movement, and have won over 110 Nobel Prizes.",
      imageSrc: "/images/library/University/UCBerkeleyCampus.jpg",
    },
    {
      title: "University of Michigan (Ann Arbor)",
      description: "Founded 1817 · Ann Arbor, MI",
      details: "A public research titan that regularly spends over $1.8 billion annually on research and development—the largest research budget of any public US university. U-Mich is renowned for its medical complex, social science databases, and athletic heritage.",
      imageSrc: "/images/library/University/central-campus-aerial-sunset_paul-coco.jpg",
    },
    {
      title: "University of Texas at Austin",
      description: "Founded 1883 · Austin, TX",
      details: "The flagship of the University of Texas System, which holds a $40+ billion endowment (the largest public endowment in the world). UT Austin has been the core intellectual engine of Austin's 'Silicon Hills' tech boom, leading in supercomputing.",
      imageSrc: "/images/library/University/Duke_University_(5744250215).jpg",
    },
    {
      title: "University of California, Los Angeles (UCLA)",
      description: "Founded 1919 · Los Angeles, CA",
      details: "The most applied-to university in the United States, receiving over 140,000 undergraduate applications annually. UCLA combines elite medical research and hospital systems with a legendary athletic program and close entertainment industry ties.",
      imageSrc: "/images/library/University/2019_UCLA_Royce_Hall_1.jpg",
    },
  ],
  parallelLabel: "THE STATE ENGINES",
  parallelTitle: "Driving Regional Abundance",
  parallelSubtitle: "State university systems act as economic hubs. Every dollar invested in a public research university generates an estimated $3.50 to $5.00 in local economic activity, creating a highly educated workforce.",
  oracleDescription: "Ask the AI Oracle about UC Berkeley's element discoveries, UT Austin's system endowment, U-Mich's research expenditures, or UCLA's selectivity.",
};

const copyRo: PublicCopy = {
  breadcrumbParent: "Universități",
  breadcrumbPage: "Cercetare Publică",
  heroTagline: "CERCETARE DEMOCRATIZATĂ",
  heroTitle: "Universitățile de Cercetare Publică",
  heroSubtitle: "UC Berkeley, Michigan, UT Austin și UCLA — giganții finanțați de stat care oferă educație la scară largă și cercetare de nivel Ivy League.",
  thesisTitle: "Educație de Elită la Scară Largă",
  thesisParagraph1: "În timp ce universitățile private domină prestigiul Ivy League, sistemele publice de cercetare finanțate de statele americane sunt campionii accesului democratic și ai dezvoltării economice regionale. Sisteme precum University of California sau University of Texas înscriu sute de mii de studenți în timp ce mențin laboratoare de vârf.",
  thesisParagraph2: "Aceste instituții publice folosesc granturile federale și fondurile de stat pentru a finanța descoperiri științifice laureate cu Nobel. În biotehnologie, microprocesoare și știința materialelor, departamentele lor acționează ca ancore pentru clusterele tehnologice regionale.",
  statsTitle: "Indicatori ai Cercetării Publice și Scării Economice",
  cardsTitle: "Giganții Învățământului Public",
  cards: [
    {
      title: "University of California, Berkeley (UCB)",
      description: "Fondată în 1868 · Berkeley, CA",
      details: "Clasată constant drept prima universitate publică din lume. Oamenii săi de știință au descoperit plutoniul, californiul și alte 14 elemente chimice, au lansat Mișcarea pentru Libera Exprimare și au câștigat peste 110 premii Nobel.",
      imageSrc: "/images/library/University/UCBerkeleyCampus.jpg",
    },
    {
      title: "University of Michigan (Ann Arbor)",
      description: "Fondată în 1817 · Ann Arbor, MI",
      details: "Un gigant al cercetării publice care cheltuiește anual peste 1,8 miliarde de dolari pe R&D — cel mai mare buget de cercetare al unei universități publice din SUA, renumită pentru complexul medical de top.",
      imageSrc: "/images/library/University/central-campus-aerial-sunset_paul-coco.jpg",
    },
    {
      title: "University of Texas at Austin",
      description: "Fondată în 1883 · Austin, TX",
      details: "Nava amiral a sistemului UT, care deține un fond de peste 40 de miliarde de dolari (cel mai mare din învățământul public mondial). A fost motorul dezvoltării tehnologice a orașului Austin («Silicon Hills»).",
      imageSrc: "/images/library/University/Duke_University_(5744250215).jpg",
    },
    {
      title: "University of California, Los Angeles (UCLA)",
      description: "Fondată în 1919 · Los Angeles, CA",
      details: "Cea mai solicitată universitate din SUA, primind peste 140.000 de aplicații de înscriere anual. Îmbină cercetarea medicală de vârf cu un program sportiv legendar și legături strânse cu industria de divertisment.",
      imageSrc: "/images/library/University/2019_UCLA_Royce_Hall_1.jpg",
    },
  ],
  parallelLabel: "MOTOARELE ECONOMICE ALE STATELOR",
  parallelTitle: "Stimularea Abundenței Regionale",
  parallelSubtitle: "Sistemele de universități de stat funcționează ca hub-uri de dezvoltare. Fiecare dolar investit generează între 3,50 și 5,00 dolari în economia locală prin forța de muncă calificată.",
  oracleDescription: "Întreabă Oracolul AI despre descoperirile chimice de la Berkeley, fondul masiv al UT Austin, bugetul de cercetare al Michigan sau selectivitatea UCLA.",
};

export default async function PublicResearchUniversitiesPage() {
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
        imageSrc="/images/library/University/UC-Berkeley-campus-overview-from-hills.h.jpg"
        imageAlt="UC Berkeley Campus Overlook"
        stats={[
          { value: "110+", label: isRo ? "Nobel Laureați Berkeley" : "Berkeley Nobel Laureates" },
          { value: "$40B+", label: isRo ? "Fond UT System" : "UT System Endowment" },
          { value: "$1.8B", label: isRo ? "Cercetare Anuală U-Mich" : "Annual U-Mich Research" }
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
        <section id="intro" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-32">
          <div className="rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <BookOpen className="h-40 w-40 text-[#E8B923]" />
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

        {/* Dynamic Count-Up Public Stats */}
        <section className="py-24 border-t border-b border-white/5 bg-white/[0.01] mb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] text-center mb-16 font-semibold">
              {copy.statsTitle}
            </h3>
            <div className="grid gap-12 sm:grid-cols-3 text-center">
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
                <p className="font-macro-display text-5xl md:text-6xl text-[#E8B923] font-black tracking-tight mb-4">
                  <CountUp value={110} suffix="+" />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-2">
                  {isRo ? "Laureați Nobel (Berkeley)" : "Nobel Laureates (Berkeley)"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo ? "Număr uriaș ce plasează o instituție publică peste aproape toate elitele private." : "A massive count placing a public institution ahead of almost all private Ivy League schools."}
                </p>
              </div>
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
                <p className="font-macro-display text-5xl md:text-6xl text-[#E8B923] font-black tracking-tight mb-4">
                  $<CountUp value={40} suffix="B+" />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-2">
                  {isRo ? "Fondul Universității Texas" : "UT Austin System Endowment"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo ? "Cel mai mare fond academic public din lume, alimentat istoric de redevențe petroliere." : "The largest public university fund globally, supported by royalties and land revenues."}
                </p>
              </div>
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
                <p className="font-macro-display text-5xl md:text-6xl text-[#E8B923] font-black tracking-tight mb-4">
                  $<CountUp value={18} suffix="B" decimals={1} />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-2">
                  {isRo ? "Buget R&D Anual Michigan" : "U-Mich Annual R&D Budget"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo ? "Depășește cheltuielile totale de cercetare ale multor state dezvoltate din Europa." : "Out-spends the total scientific research budgets of many developed nations."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Public Pillars Editorial Grid */}
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
          imageSrc="/images/library/University/Wheeler_Hall,_University_of_California,_Berkeley.jpg"
          imageAlt="UC Berkeley Wheeler Hall grand entrance"
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
