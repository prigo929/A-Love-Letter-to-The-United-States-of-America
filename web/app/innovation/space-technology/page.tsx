import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { 
  Rocket, 
  ExternalLink,
  Orbit
} from "lucide-react";
import { 
  MacroStyles, 
  MacroHero, 
  CountUp, 
  InfrastructureBand 
} from "@/components/economy/EconomyAnimations";

export const metadata: Metadata = {
  title: "Space Technology | Innovation & Technology",
  description: "Explore how American private enterprise and venture capital revolutionized access to orbit, breaking the space monopolies of nation-states.",
};

interface SpaceCopy {
  breadcrumbParent: string;
  breadcrumbPage: string;
  heroTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  thesisTitle: string;
  thesisParagraph1: string;
  thesisParagraph2: string;
  milestonesTitle: string;
  milestones: Array<{
    title: string;
    date: string;
    details: string;
  }>;
  spaceLabel: string;
  spaceTitle: string;
  spaceParagraph1: string;
  spaceParagraph2: string;
  spaceSource: string;
  spaceSourceUrl: string;
  oracleDescription: string;
}

const copyEn: SpaceCopy = {
  breadcrumbParent: "Innovation & Technology",
  breadcrumbPage: "Space Technology",
  heroTagline: "COSMIC COMMERCIALIZATION",
  heroTitle: "Privatizing the Cosmos",
  heroSubtitle: "How private American enterprise and venture capital revolutionized access to orbit, breaking the launch monopolies of nation-states.",
  thesisTitle: "The Shift to Commercial Space",
  thesisParagraph1: "For decades, space was the exclusive domain of national governments, driven by geopolitical competition and public funds. Today, the space economy is led by American private capital, rapid engineering iterations, and vertical integration. By fostering a regulatory environment that allows failure and fast learning, the United States has unlocked orbit as a commercial marketplace.",
  thesisParagraph2: "This shift is powered by rapid reuse, mass satellite production, and a private launch cadence. The physical infrastructure of space — once dictated by civil agencies — is now dominated by private fleets launching from American soil, reducing launch costs by an order of magnitude.",
  milestonesTitle: "Key Milestones in Space Tech",
  milestones: [
    {
      title: "The Apollo Program",
      date: "1960s - 1970s",
      details: "The pinnacle of state-funded space exploration, landing twelve Americans on the Moon and proving the power of national scientific mobilization."
    },
    {
      title: "The Space Shuttle",
      date: "1981 - 2011",
      details: "The world's first reusable spacecraft, launching the Hubble Space Telescope and assembling the International Space Station."
    },
    {
      title: "Commercial Crew & Cargo",
      date: "2010s",
      details: "NASA partnered with private firms, shifting from buying rockets to purchasing transportation services, seeding a massive commercial ecosystem."
    },
    {
      title: "Rapid Reusability",
      date: "2020s",
      details: "Private launch systems achieved rapid rocket booster reusability, dropping orbital access costs by 90% and making mega-constellations viable."
    }
  ],
  spaceLabel: "THE PRIVATIZATION OF ORBIT",
  spaceTitle: "Commercial Space: SpaceX & Launch Hegemony",
  spaceParagraph1: "SpaceX conducted 52 percent of all orbital launches globally in 2024, launched 84 percent of all satellites, and delivered 84 percent of total satellite mass to orbit. The United States has nearly three times as many operational satellites as all other countries combined, overwhelmingly due to SpaceX's Starlink constellation, which comprises 65 percent of all operational satellites in space.",
  spaceParagraph2: "Founded in 2002 by an immigrant, built with private capital, and operating in a regulatory environment that permits rapid iteration, SpaceX achieved what no European space agency, Chinese state enterprise, or Russian program has matched. The Falcon 9 has fundamentally restructured the global launch market like the 747 restructured air travel, while Starlink serves 9 million users in 125 countries, doing to global broadband what the interstate highway system did to domestic freight.",
  spaceSource: "American Enterprise Institute (AEI) 2024",
  spaceSourceUrl: "https://www.aei.org/op-eds/space-trends-in-2024/",
  oracleDescription: "Ask the AI Oracle about SpaceX launch cadence, reusable rocket economics, Starlink global coverage, or NASA commercial crew partnerships."
};

const copyRo: SpaceCopy = {
  breadcrumbParent: "Inovație și Tehnologie",
  breadcrumbPage: "Tehnologie Spațială",
  heroTagline: "COMERCIALIZAREA COSMICĂ",
  heroTitle: "Privatizarea Cosmosului",
  heroSubtitle: "Cum întreprinderea privată americană și capitalul de risc au revoluționat accesul pe orbită, spărgând monopolul statelor suverane.",
  thesisTitle: "Tranziția către Spațiul Comercial",
  thesisParagraph1: "Timp de decenii, spațiul a fost domeniul exclusiv al guvernelor naționale, stimulat de competiția geopolitică și fondurile publice. Astăzi, economia spațială este condusă de capitalul privat american, iterații rapide de inginerie și integrare verticală. Printr-un mediu de reglementare permisiv care încurajează experimentarea, SUA au deblocat orbita ca o piață comercială.",
  thesisParagraph2: "Această tranziție este susținută de reutilizarea rapidă, producția în masă de sateliți și o cadență ridicată de lansare. Infrastructura fizică a spațiului — odinioară dictată de agenții guvernamentale — este acum dominată de flote private ce decolează de pe sol american, reducând costurile de lansare.",
  milestonesTitle: "Pilonii Cheie ai Tehnologiei Spațiale",
  milestones: [
    {
      title: "Programul Apollo",
      date: "Anii 1960 - 1970",
      details: "Culmea explorării spațiale finanțate de stat, aselenizarea a 12 americani pe Lună și dovada puterii de mobilizare științifică națională."
    },
    {
      title: "Naveta Spațială",
      date: "1981 - 2011",
      details: "Prima navă spațială reutilizabilă din lume, lansând telescopul Hubble și asamblând Stația Spațială Internațională."
    },
    {
      title: "Echipaj și Marfă Comercială",
      date: "Anii 2010",
      details: "NASA a încheiat parteneriate cu firme private, trecând de la achiziționarea de rachete la cea de servicii de transport, stimulând o nouă industrie."
    },
    {
      title: "Reutilizarea Rapidă",
      date: "Anii 2020",
      details: "Sistemele private de lansare au obținut reutilizarea rapidă a boosterelor, reducând costurile de acces orbital cu 90% și făcând megaconstelațiile viabile."
    }
  ],
  spaceLabel: "PRIVATIZAREA ORBITEI",
  spaceTitle: "Spațiul Comercial: SpaceX și Hegemonia Lansărilor",
  spaceParagraph1: "SpaceX a efectuat 52% din toate lansările orbitale globale în 2024, a lansat 84% din toți sateliții și a livrat 84% din masa totală trimisă pe orbită. Statele Unite au de aproape trei ori mai mulți sateliți operaționali în spațiu decât toate celelalte țări combinate, în mare parte datorită rețelei Starlink, care reprezintă 65% din totalul sateliților activi.",
  spaceParagraph2: "Fondată în 2002 de un imigrant, construită cu capital privat și operând într-un mediu de reglementare permisiv, SpaceX a realizat ceea ce nicio agenție de stat chineză, europeană sau rusă nu a putut egala. Falcon 9 a restructurat piața globală de lansări așa cum Boeing 747 a schimbat călătoriile aeriene, în timp ce Starlink deservește 9 milioane de utilizatori din 125 de țări.",
  spaceSource: "American Enterprise Institute (AEI) 2024",
  spaceSourceUrl: "https://www.aei.org/op-eds/space-trends-in-2024/",
  oracleDescription: "Întreabă Oracolul AI despre cadența de lansare SpaceX, economia rachetelor reutilizabile, acoperirea Starlink sau parteneriatele comerciale NASA."
};

export default async function SpaceTechnologyPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const copy = isRo ? copyRo : copyEn;

  return (
    <>
      <MacroStyles />
      
      {/* Cinematic Video Hero */}
      <MacroHero 
        titleLead={copy.heroTitle}
        titleAccent={copy.heroTagline}
        eyebrow={copy.breadcrumbPage}
        description={copy.heroSubtitle}
        videoSrc="/videos/library/Technology/Starship's Tenth Flight Test launch and landing cinematic.mp4"
      />

      <div className="bg-[#030405] relative z-10 pb-32 pt-16 font-body text-white">
        {/* Breadcrumbs */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
          <Breadcrumb
            items={[
              { label: copy.breadcrumbParent, href: "/innovation" },
              { label: copy.breadcrumbPage },
            ]}
          />
        </div>

        {/* Thesis Section */}
        <section id="intro" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-32">
          <div className="rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Orbit className="h-40 w-40 text-[#E8B923]" />
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

        {/* Space Stats Section */}
        <section className="py-24 border-t border-b border-white/5 bg-white/[0.01] mb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="flex flex-col items-center">
                <span className="font-macro-display text-6xl md:text-7xl font-black text-[#E8B923] mb-4">
                  <CountUp value={52} suffix="%" />
                </span>
                <span className="macro-metadata max-w-xs leading-relaxed">
                  {isRo ? "Din lansările orbitale globale în 2024 (SpaceX)" : "Of global orbital launches in 2024 (SpaceX)"}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-macro-display text-6xl md:text-7xl font-black text-[#E8B923] mb-4">
                  <CountUp value={84} suffix="%" />
                </span>
                <span className="macro-metadata max-w-xs leading-relaxed">
                  {isRo ? "Din masa totală trimisă pe orbită în 2024" : "Of total satellite mass delivered to orbit in 2024"}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-macro-display text-6xl md:text-7xl font-black text-[#E8B923] mb-4">
                  <CountUp value={65} suffix="%" />
                </span>
                <span className="macro-metadata max-w-xs leading-relaxed">
                  {isRo ? "Din toți sateliții activi în spațiu (Starlink)" : "Of all active operational satellites (Starlink)"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Milestones grid */}
        <section id="milestones" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <h2 className="font-macro-display text-4xl font-bold text-center mb-16 text-white uppercase tracking-tight">
            {copy.milestonesTitle}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {copy.milestones.map((item, idx) => (
              <div 
                key={idx}
                className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 flex flex-col justify-between hover:border-[#E8B923]/40 hover:bg-white/[0.04] transition-all duration-500 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono text-[#E8B923] border border-[#E8B923]/25 px-2 py-0.5 rounded">
                      {item.date}
                    </span>
                  </div>
                  <h3 className="font-macro-display text-2xl font-bold text-white mb-4 group-hover:text-[#E8B923] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed font-body">
                    {item.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SpaceX Feature Section (Cinematic Parallax Band) */}
        <InfrastructureBand
          imageSrc="/images/library/Technology/Landed rockets in hangar 39A SpaceX.jpg"
          imageAlt="SpaceX Landed Rockets in Hangar"
        >
          <div className="relative z-10">
            <span className="macro-eyebrow mb-3 block">
              {copy.spaceLabel}
            </span>
            <h2 className="macro-section-title text-white mb-6">
              {copy.spaceTitle}
            </h2>
            <p className="macro-body text-white/80 mb-6 max-w-4xl">
              {copy.spaceParagraph1}
            </p>
            <p className="macro-body text-white/80 mb-8 max-w-4xl">
              {copy.spaceParagraph2}
            </p>
            
            <div className="flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/40 font-mono">
              <span>Source: {copy.spaceSource}</span>
              <a 
                href={copy.spaceSourceUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1 text-[#E8B923] hover:underline"
              >
                {isRo ? "Verifică datele lansării" : "Verify Launch Data"}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </InfrastructureBand>

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
