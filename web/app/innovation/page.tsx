import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { 
  MacroStyles, 
  MacroHero 
} from "@/components/economy/EconomyAnimations";
import { Cpu, Globe, Phone, Cloud, Orbit, Gamepad2 } from "lucide-react";
import DeepDiveSection from "@/components/shared/DeepDiveSection";
import { VERTICALS_THEMATIC_DATA } from "@/lib/data/verticals-thematic-data";
import { DEEP_DIVE_THEMES } from "@/lib/deep-dive-themes";

export const metadata: Metadata = {
  title: "Innovation & Technology",
  description: "The internet, the personal computer, cloud computing, smartphones, and AI — all born from the American innovation engine.",
};

const subPagesEn = [
  {
    title: "The Internet",
    href: "/innovation/internet-history",
    badge: "DARPA & ARPANET",
    description: "How a defense project evolved into the global digital commons, created and scaled in the United States.",
    imageSrc: "/images/library/Technology/Fiber Optic Cable.jpg",
    icon: Globe,
  },
  {
    title: "AI & Tech",
    href: "/innovation/ai-and-tech",
    badge: "Silicon Valley",
    description: "Inside the design chokehold and computing clusters powering the generative artificial intelligence frontier.",
    imageSrc: "/images/library/Technology/Vivid and detailed close-up of a patterned silicon wafer with vibrant green and blue colors.jpg",
    icon: Cpu,
  },
  {
    title: "Smartphones",
    href: "/innovation/smartphones",
    badge: "Apple & Android",
    description: "The iPhone and mobile ecosystems that put the sum of human knowledge in the palm of every hand.",
    imageSrc: "/images/library/Technology/iPhone saying Hello on dark background.jpg",
    icon: Phone,
  },
  {
    title: "Cloud Computing",
    href: "/innovation/cloud-computing",
    badge: "AWS & Google Cloud",
    description: "The decentralized utility scaling global compute, built upon massive American data center architecture.",
    imageSrc: "/images/library/Technology/server aisles in google data center in Ohio.jpg",
    icon: Cloud,
  },
  {
    title: "Space Technology",
    href: "/innovation/space-technology",
    badge: "SpaceX & NASA",
    description: "From Apollo's historic legacy to the modern private rocket systems conquering the orbital marketplace.",
    imageSrc: "/images/library/Technology/Landed rockets in hangar 39A SpaceX.jpg",
    icon: Orbit,
  },
  {
    title: "Gaming",
    href: "/innovation/gaming",
    badge: "Atari to Unreal Engine",
    description: "The birth of interactive entertainment, from early arcade cabinets to state-of-the-art physics engines.",
    imageSrc: "/images/library/Technology/EA HQ campus logo.jpg",
    icon: Gamepad2,
  },
];

const subPagesRo = [
  {
    title: "Internetul",
    href: "/innovation/internet-history",
    badge: "DARPA și ARPANET",
    description: "Cum un proiect de apărare a evoluat în bunul comun digital global, creat și dezvoltat în Statele Unite.",
    imageSrc: "/images/library/Technology/Fiber Optic Cable.jpg",
    icon: Globe,
  },
  {
    title: "AI și Tehnologie",
    href: "/innovation/ai-and-tech",
    badge: "Silicon Valley",
    description: "În interiorul monopolului de design și centrelor de calcul care alimentează inteligența artificială generativă.",
    imageSrc: "/images/library/Technology/Vivid and detailed close-up of a patterned silicon wafer with vibrant green and blue colors.jpg",
    icon: Cpu,
  },
  {
    title: "Smartphone-uri",
    href: "/innovation/smartphones",
    badge: "Apple și Android",
    description: "iPhone-ul și ecosistemele mobile care au pus întreaga cunoaștere a lumii în palma fiecărui om.",
    imageSrc: "/images/library/Technology/iPhone saying Hello on dark background.jpg",
    icon: Phone,
  },
  {
    title: "Cloud Computing",
    href: "/innovation/cloud-computing",
    badge: "AWS și Google Cloud",
    description: "Utilitatea descentralizată care scalează calculul global pe baza infrastructurii de servere din SUA.",
    imageSrc: "/images/library/Technology/server aisles in google data center in Ohio.jpg",
    icon: Cloud,
  },
  {
    title: "Tehnologie Spațială",
    href: "/innovation/space-technology",
    badge: "SpaceX și NASA",
    description: "De la moștenirea istorică Apollo la sistemele private moderne ce redefinesc accesul pe orbită.",
    imageSrc: "/images/library/Technology/Landed rockets in hangar 39A SpaceX.jpg",
    icon: Orbit,
  },
  {
    title: "Gaming",
    href: "/innovation/gaming",
    badge: "De la Atari la Unreal",
    description: "Nașterea divertismentului interactiv, de la primele jocuri mecanice la motoarele grafice de ultimă generație.",
    imageSrc: "/images/library/Technology/EA HQ campus logo.jpg",
    icon: Gamepad2,
  },
];

export default async function InnovationPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const subPages = isRo ? subPagesRo : subPagesEn;

  const copy = isRo
    ? {
        heroEyebrow: "Inovație și Tehnologie",
        heroTitleLead: "MOTORUL",
        heroTitleAccent: "INOVAȚIEI GLOBALE",
        heroDescription:
          "De la Silicon Valley la DARPA, Statele Unite reprezintă laboratorul principal al lumii moderne. Internetul, tranzistorul, smartphone-ul, cloud computing-ul și inteligența artificială au fost toate create și extinse aici.",
        heroStats: [
          { value: "$800B+", label: "Cercetare & Dezvoltare", sub: "Investiții Anuale" },
          { value: "1.170+", label: "Start-up-uri Unicorn", sub: "65% din totalul global" },
          { value: "47%", label: "Finanțare VC", sub: "Cota globală a capitalului de risc" },
        ],
        overviewEyebrow: "AVANTAJUL TEHNOLOGIC",
        overviewTitle: "Cum proiectează America viitorul digital",
        overviewBody1:
          "Ascensiunea tehnologică a Statelor Unite nu a fost un accident al istoriei, ci rezultatul unui ecosistem unic ce îmbină cercetarea fundamentală finanțată de stat (prin agenții ca DARPA și NASA) cu adâncimea inegalabilă a capitalului privat și o cultură a riscului asumat din Silicon Valley.",
        overviewBody2:
          "De la microcipul de siliciu inventat la mijlocul secolului trecut până la modelele de limbaj de frontieră de astăzi, companiile americane continuă să controleze cele mai valoroase straturi ale stivei tehnologice globale: designul proprietății intelectuale, software-ul critic de proiectare și infrastructura globală de stocare în cloud.",
        factsTitle: "Pilonii Economiei Digitale",
        exploreCta: "Explorează →",
        oracleDescription:
          "Întreabă Oracolul AI despre Silicon Valley, istoria internetului, inteligența artificială, dezvoltarea smartphone-urilor sau sistemele spațiale.",
      }
    : {
        heroEyebrow: "Innovation & Technology",
        heroTitleLead: "THE ENGINE OF",
        heroTitleAccent: "GLOBAL INNOVATION",
        heroDescription:
          "From Silicon Valley to DARPA, the United States is the primary laboratory of modern civilization. The internet, the transistor, the smartphone, cloud computing, and artificial intelligence were all invented and scaled here.",
        heroStats: [
          { value: "$800B+", label: "R&D Spending", sub: "Annual public & private" },
          { value: "1,170+", label: "Unicorn Companies", sub: "65% of global total" },
          { value: "47%", label: "Venture Capital", sub: "Global VC funding share" },
        ],
        overviewEyebrow: "THE TECHNOLOGICAL ADVANTAGE",
        overviewTitle: "How America Designs the Digital Future",
        overviewBody1:
          "The technological rise of the United States was not an accident of history, but the product of a unique ecosystem that pairs state-funded foundational research (through agencies like DARPA and NASA) with the unmatched depth of private capital and the high-risk culture of Silicon Valley.",
        overviewBody2:
          "From the silicon microchip invented in the mid-20th century to the frontier AI models of today, American companies continue to command the most valuable layers of the global technology stack: intellectual property design, critical design software, and the global cloud computing fabric.",
        factsTitle: "Pillars of the Digital Economy",
        exploreCta: "Explore →",
        oracleDescription:
          "Ask the AI Oracle about Silicon Valley, internet history, artificial intelligence, smartphone developments, or space systems.",
      };

  const facts = isRo
    ? [
        {
          id: "semiconductor-chokehold",
          fact: "Controlul pe design-ul de semiconductori",
          detail:
            "Companiile americane captează circa 50% din veniturile globale din proiectarea semiconductorilor (Nvidia, AMD, Apple Silicon) și controlează software-ul critic EDA utilizat de orice fabrică din lume.",
        },
        {
          id: "venture-catalyst",
          fact: "Catalizatorul capitalului de risc",
          detail:
            "Aproape jumătate din întregul capital de risc global circulă prin hub-urile americane, permițând proiectelor ambițioase de tehnologie să acceseze finanțare masivă mult înainte de a fi profitabile.",
        },
        {
          id: "cloud-domination",
          fact: "Dominația cloud-ului hyper-scale",
          detail:
            "Trei furnizori americani (AWS, Microsoft Azure și Google Cloud) controlează peste 65% din piața mondială de infrastructură cloud, pe care rulează întreaga economie digitală.",
        },
      ]
    : [
        {
          id: "semiconductor-chokehold",
          fact: "The Semiconductor Design Chokehold",
          detail:
            "US firms capture approximately 50% of global semiconductor design revenues (Nvidia, AMD, Apple Silicon) and control the critical EDA software tools used to design advanced chips globally.",
        },
        {
          id: "venture-catalyst",
          fact: "The Venture Capital Catalyst",
          detail:
            "Nearly half of all global venture capital flows through American hubs, enabling high-risk, high-reward technologies to secure deep funding years before they achieve profitability.",
        },
        {
          id: "cloud-domination",
          fact: "Hyper-Scale Cloud Domination",
          detail:
            "Three American providers (AWS, Microsoft Azure, and Google Cloud) host over 65% of the global cloud infrastructure, powering the modern digital commons.",
        },
      ];

  return (
    <>
      <MacroStyles />
      <MacroHero
        videoSrc="/videos/library/Technology/TERAFAB cinematic - with Tesla and SpaceX.mp4"
        eyebrow={copy.heroEyebrow}
        titleLead={copy.heroTitleLead}
        titleAccent={copy.heroTitleAccent}
        description={copy.heroDescription}
        stats={copy.heroStats}
      />

      <div className="bg-[#030405] relative z-10 pb-32 pt-16 font-body text-white">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
          <Breadcrumb items={[{ label: copy.heroEyebrow }]} />
        </div>

        {/* Overview section */}
        <section id="overview" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 space-y-6">
              <span className="macro-eyebrow">{copy.overviewEyebrow}</span>
              <h2 className="font-macro-display text-4xl md:text-5xl font-bold text-white leading-tight">
                {copy.overviewTitle}
              </h2>
              <p className="font-macro-body text-white/80 text-xl leading-relaxed">
                {copy.overviewBody1}
              </p>
              <p className="font-macro-body text-white/80 text-xl leading-relaxed">
                {copy.overviewBody2}
              </p>
            </div>
          </div>
        </section>

        {/* Fact grid */}
        <section id="pillars" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32 border-t border-white/5 pt-24">
          <h2 className="font-macro-display text-3xl font-bold text-[#E8B923] mb-16">
            {copy.factsTitle}
          </h2>
          <div className="grid gap-12 md:grid-cols-3">
            {facts.map((fact, i) => (
              <div key={fact.id} className="border-t border-white/10 pt-8">
                <span className="font-mono text-xs text-[#E8B923] mb-4 block">0{i + 1}.</span>
                <h3 className="font-macro-display text-2xl font-bold text-white mb-4">
                  {fact.fact}
                </h3>
                <p className="font-macro-body text-white/60 leading-relaxed">
                  {fact.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Sub-pages deep dives navigation grid */}
        <section id="sub-pages" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32 border-t border-white/5 pt-24">
          <p className="macro-eyebrow mb-4">{isRo ? "EXPLORARE ÎN DETALIU" : "EXPLORE DEEPER"}</p>
          <h2 className="font-macro-display text-4xl font-bold text-white mb-16 uppercase tracking-tight">
            {isRo ? "Domeniile Inovației" : "Domains of Innovation"}
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {subPages.map((page) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.href}
                  href={page.href}
                  className="group flex flex-col border border-white/5 bg-white/[0.02] hover:border-[#E8B923]/30 hover:bg-white/[0.04] transition-all duration-500 rounded-3xl overflow-hidden"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={page.imageSrc}
                      alt={page.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030405] via-transparent to-transparent" />
                    <span className="absolute right-4 top-4 bg-[#E8B923] text-[#030405] font-mono text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded font-bold">
                      {page.badge}
                    </span>
                    <div className="absolute left-4 bottom-4 p-2 bg-black/40 backdrop-blur-md rounded-lg border border-white/10 text-[#E8B923]">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-macro-display text-2xl font-bold text-white mb-3 group-hover:text-[#E8B923] transition-colors">
                        {page.title}
                      </h3>
                      <p className="font-macro-body text-white/50 text-sm leading-relaxed mb-6">
                        {page.description}
                      </p>
                    </div>
                    <span className="font-mono text-xs uppercase tracking-widest text-[#E8B923] block group-hover:underline">
                      {copy.exploreCta}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Deep Dive Section */}
        <DeepDiveSection
          locale={locale}
          topics={VERTICALS_THEMATIC_DATA["innovation"] || []}
          theme={DEEP_DIVE_THEMES.innovation}
        />

        {/* AI Oracle */}
        <div className="mt-32">
          <AskAmericaCTA
            locale={locale}
            descriptionEn={copy.oracleDescription}
            descriptionRo={copy.oracleDescription}
          />
        </div>
      </div>
    </>
  );
}
