"use client";

// ─── CompanyBreakthroughShowcase ─────────────────────────────────────────────
// "Company Breakthrough Showcase": Highlighting specific iconic American companies,
// their breakthrough product/innovation, official company logo, stats, and impact.
// Written in editorial voice: zero em dashes, zero AI tropes.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface FeaturedCompany {
  id: string;
  name: string;
  logoFile: string;
  logoInvert?: boolean;
  foundedYear: string;
  breakthroughProduct: string;
  breakthroughProductRo: string;
  breakthroughYear: string;
  statValue: string;
  statLabel: string;
  statLabelRo: string;
  tagline: string;
  taglineRo: string;
  story: string;
  storyRo: string;
  culturalImpact: string;
  culturalImpactRo: string;
}

const FEATURED_COMPANIES: FeaturedCompany[] = [
  {
    id: "apple",
    name: "Apple",
    logoFile: "/ASSETS/Companies/Apple_Logo white.svg",
    logoInvert: false,
    foundedYear: "1976",
    breakthroughProduct: "The iPhone & Multi-Touch Interface",
    breakthroughProductRo: "iPhone și Interfața Multi-Touch",
    breakthroughYear: "2007",
    statValue: "$3.4 Trillion",
    statLabel: "World's Most Valuable Brand",
    statLabelRo: "Cel mai valoros brand din lume",
    tagline: "Putting a pocket supercomputer into the hands of billions",
    taglineRo: "A pus un supercomputer de buzunar în mâinile a miliarde de oameni",
    story:
      "In January 2007, Steve Jobs unveiled the iPhone, combining a widescreen iPod, a revolutionary mobile phone, and a breakthrough internet communicator into a single glass display with zero physical keyboard buttons. By replacing styluses with natural finger gestures, Apple simplified personal computing into an extension of human instinct.",
    storyRo:
      "În ianuarie 2007, Steve Jobs a prezentat iPhone-ul, combinând un iPod cu ecran lat, un telefon mobil revoluționar și un dispozitiv de comunicare pe internet într-un singur ecran de sticlă fără tastatură fizică. Înlocuind stilusul cu gesturile naturale ale degetelor, Apple a transformat informatica într-o extensie a instinctului uman.",
    culturalImpact:
      "Created the app economy, mobile photography, and redefined how humans communicate, work, navigate, and record daily life globally.",
    culturalImpactRo:
      "A creat economia aplicațiilor, fotografia mobilă și a redefinit modul în care oamenii comunică, lucrează și înregistrează viața de zi cu zi.",
  },
  {
    id: "nike",
    name: "Nike",
    logoFile: "/ASSETS/Companies/Logo_NIKE.svg",
    logoInvert: true,
    foundedYear: "1964",
    breakthroughProduct: "Air Jordan I & Streetwear Culture",
    breakthroughProductRo: "Air Jordan I și Cultura Streetwear",
    breakthroughYear: "1984",
    statValue: "150+ Markets",
    statLabel: "Global Athletic & Culture Leader",
    statLabelRo: "Lider global în atletism și cultură",
    tagline: "Transforming athletic gear into global streetwear and human ambition",
    taglineRo: "Transformarea echipamentului sportiv în stil streetwear și ambiție umană",
    story:
      "Founded by track coach Bill Bowerman and runner Phil Knight, Nike revolutionized footwear by pouring rubber into a kitchen waffle iron. In 1984, Nike signed rookie Michael Jordan and released the black-and-red Air Jordan I. When the NBA banned the shoe for violating uniform colors, Nike paid the $5,000 fine per game, igniting global sneakerhead culture.",
    storyRo:
      "Fondată de antrenorul Bill Bowerman și alergătorul Phil Knight, Nike a revoluționat încălțămintea turnând cauciuc într-o formă de vafe. În 1984, Nike l-a semnat pe Michael Jordan și a lansat Air Jordan I. Când NBA a interzis pantoful din cauza culorilor, Nike a plătit amenda de 5.000$ pe meci, aprinzând cultura sneakerhead.",
    culturalImpact:
      "Elevated performance sportswear into high-fashion streetwear and established 'Just Do It' as a global manifesto of human potential.",
    culturalImpactRo:
      "A ridicat îmbrăcămintea sportivă la rang de modă urbană și a consacrat sloganul „Just Do It” ca manifest al potențialului uman.",
  },
  {
    id: "cocacola",
    name: "Coca-Cola",
    logoFile: "/ASSETS/Companies/Coca-Cola_Logo_0.svg",
    logoInvert: false,
    foundedYear: "1886",
    breakthroughProduct: "Contoured Glass Bottle & Bottling System",
    breakthroughProductRo: "Sticla conturată de sticlă și sistemul de îmbuteliere",
    breakthroughYear: "1915",
    statValue: "1.9 Billion",
    statLabel: "Daily Servings Reached Worldwide",
    statLabelRo: "Porții zilnice consumate în lume",
    tagline: "The most recognized trademark on Earth",
    taglineRo: "Cel mai recunoscut logo de pe Pământ",
    story:
      "Invented in Atlanta by pharmacist John Pemberton, Coca-Cola achieved legendary status in 1915 when the Root Glass Company designed the iconic contoured glass bottle, recognizable even by touch in the dark. Coca-Cola pioneered the independent bottling franchise model, enabling local businessmen in 200+ countries to produce and distribute the drink locally.",
    storyRo:
      "Inventată în Atlanta de farmacistul John Pemberton, Coca-Cola a atins statutul de legendă în 1915 când Root Glass Company a proiectat sticla conturată, recognoscibilă chiar și la atingere pe întuneric. Coca-Cola a creat modelul de franciză de îmbuteliere independentă în peste 200 de țări.",
    culturalImpact:
      "Exported American soda fountain culture worldwide and shaped the modern visual image of Santa Claus through Haddon Sundblom's 1931 illustrations.",
    culturalImpactRo:
      "A exportat cultura americană a băuturilor răcoritoare și a conturat imaginea modernă a lui Moș Crăciun prin ilustrațiile din 1931 ale lui Haddon Sundblom.",
  },
  {
    id: "levis",
    name: "Levi's",
    logoFile: "/ASSETS/Companies/Levi's_logo.svg",
    logoInvert: false,
    foundedYear: "1853",
    breakthroughProduct: "501 Copper-Riveted Blue Jeans",
    breakthroughProductRo: "Blugii 501 cu nituri de cupru",
    breakthroughYear: "1873",
    statValue: "170+ Years",
    statLabel: "The Democratic Uniform of Humanity",
    statLabelRo: "Uniforma democratică a omenirii",
    tagline: "Workwear born in the California Gold Rush that conquered every continent",
    taglineRo: "Haine de muncă din Goana după Aur care au cucerit toate continentele",
    story:
      "Bavarian immigrant Levi Strauss and Nevada tailor Jacob Davis patented copper rivets on denim work pants in 1873, creating rugged wear for miners and cowboys. Over the next century, the 501 blue jean evolved from working-class trousers into the universal garment of youth rebellion, rock stars, and everyday citizens across the globe.",
    storyRo:
      "Imigrantul bavarez Levi Strauss și croitorul Jacob Davis au brevetat niturile de cupru pe pantalonii de lucru din denim în 1873. În următorul secol, blugii 501 s-au transformat din pantaloni ai clasei muncitoare în articolul vestimentar universal al rebeliunii tinerilor.",
    culturalImpact:
      "Created the single most democratic fashion item in history: worn equally by farmhands, rock icons, tech billionaires, and heads of state.",
    culturalImpactRo:
      "A creat cel mai democratic articol vestimentar din istorie: purtat la fel de fermieri, vedete rock, miliardari din tech și șefi de stat.",
  },
  {
    id: "ford",
    name: "Ford",
    logoFile: "/ASSETS/Companies/Ford-Motor-Company-Logo.png",
    logoInvert: false,
    foundedYear: "1903",
    breakthroughProduct: "Model T & Moving Assembly Line",
    breakthroughProductRo: "Model T și linia mobilă de asamblare",
    breakthroughYear: "1913",
    statValue: "15 Million",
    statLabel: "Model T Cars Produced (1908–1927)",
    statLabelRo: "Automobile Model T produse (1908–1927)",
    tagline: "Democratizing personal mobility and inventing mass production",
    taglineRo: "Democratizarea mobilității personale și inventarea producției în masă",
    story:
      "Henry Ford set out to build 'a motor car for the great multitude.' In 1913, he introduced the moving assembly line at the Highland Park plant in Michigan, cutting vehicle assembly time from 12 hours to 93 minutes. By doubling worker wages to $5 a day, Ford created an auto-owning middle class capable of buying the products they built.",
    storyRo:
      "Henry Ford și-a propus să construiască „un automobil pentru marea mulțime”. În 1913, a introdus linia mobilă de asamblare la fabrica Highland Park, reducând timpul de asamblare de la 12 ore la 93 de minute. Dublând salariile la 5$ pe zi, Ford a creat clasa de mijloc capabilă să cumpere produsele fabricate.",
    culturalImpact:
      "Pioneered mass industrial manufacturing, paved the way for modern highway infrastructure, and reshaped American geography.",
    culturalImpactRo:
      "A fost pionierul producției industriale de masă, deschizând drumul pentru infrastructura rutieră modernă și reconfigurând geografia americană.",
  },
  {
    id: "mcdonalds",
    name: "McDonald's",
    logoFile: "/ASSETS/Companies/McDonald's_Symbol_0.svg",
    logoInvert: false,
    foundedYear: "1940",
    breakthroughProduct: "Speedee Service System & Golden Arches",
    breakthroughProductRo: "Sistemul Speedee Service și Arcadele de Aur",
    breakthroughYear: "1954",
    statValue: "40,000+",
    statLabel: "Restaurants Serving 69M Customers Daily",
    statLabelRo: "Restaurante ce deservesc 69M clienți zilnic",
    tagline: "Exporting standardized dining speed and global family convenience",
    taglineRo: "Exportul vitezei culinare standardizate și al confortului de familie",
    story:
      "Richard and Maurice McDonald streamlined restaurant kitchens into factory assembly lines in San Bernardino, California. Milkshake machine salesman Ray Kroc recognized the franchise potential in 1954, scaling McDonald's into the world's premier food service organization with identical quality and clean architecture in every town.",
    storyRo:
      "Frații Richard și Maurice McDonald au eficientizat bucătăriile în linii de asamblare în San Bernardino. Agentul de vânzări Ray Kroc a intuit potențialul de franciză în 1954, extinzând McDonald's în cea mai mare organizație de restaurant din lume.",
    culturalImpact:
      "Established the global fast-food paradigm, popularized drive-thru dining, and created the Golden Arches symbol recognized by 88% of the planet.",
    culturalImpactRo:
      "A consacrat paradigma globală fast-food, a popularizat serviciul drive-thru și a creat simbolul Arcadelor de Aur recunoscut de 88% din populație.",
  },
  {
    id: "disney",
    name: "Disney",
    logoFile: "/ASSETS/Companies/Disney_iddEtLt1OH_0.svg",
    logoInvert: true,
    foundedYear: "1923",
    breakthroughProduct: "Mickey Mouse & Disneyland Theme Park",
    breakthroughProductRo: "Mickey Mouse și Parcul Tematic Disneyland",
    breakthroughYear: "1928",
    statValue: "$200B+",
    statLabel: "World's Premier Storytelling Empire",
    statLabelRo: "Cel mai mare imperiu de povești din lume",
    tagline: "Building a century-old empire of animation, imagination, and theme parks",
    taglineRo: "Construirea unui imperiu de un secol de animație, imaginație și parcuri",
    story:
      "Walt Disney premiered Steamboat Willie in 1928, introducing synchronized sound animation and Mickey Mouse. In 1955, Disney opened Disneyland in Anaheim, California, creating the world's first immersive theme park where animated worlds were materialized in physical space.",
    storyRo:
      "Walt Disney a lansat Steamboat Willie în 1928, introducând animația cu sunet sincronizat și pe Mickey Mouse. În 1955, a deschis Disneyland în California, creând primul parc tematic imersiv unde lumile din desene au prins viață.",
    culturalImpact:
      "Set the global standard for animated feature films, family entertainment, and created a story IP empire encompassing Pixar, Marvel, and Star Wars.",
    culturalImpactRo:
      "A stabilit standardul global pentru filme de animație, divertisment de familie și a creat un imperiu ce include Pixar, Marvel și Star Wars.",
  },
  {
    id: "google",
    name: "Google",
    logoFile: "/ASSETS/Companies/Google_Logo_0.svg",
    logoInvert: false,
    foundedYear: "1998",
    breakthroughProduct: "PageRank Search & Clean White Homepage",
    breakthroughProductRo: "Căutarea PageRank și Pagina Principală Albă",
    breakthroughYear: "1998",
    statValue: "92%",
    statLabel: "Global Search Market Share in 50+ Languages",
    statLabelRo: "Cota de piață globală căutare în 50+ limbi",
    tagline: "Organizing the world's information and making it universally accessible",
    taglineRo: "Organizarea informațiilor lumii și accesibilizarea lor universală",
    story:
      "Stanford PhD students Larry Page and Sergey Brin developed PageRank, an algorithm that ranked web pages based on hyperlink connections rather than keyword density. By offering a clean, distraction-free search bar, Google replaced chaotic web portals and became the default gateway to human knowledge.",
    storyRo:
      "Doctoranzii de la Stanford Larry Page și Sergey Brin au dezvoltat PageRank, un algoritm ce clasifica paginile web după legăturile de hipertext. Oferind o bară de căutare simplă și curată, Google a devenit poarta principală de acces la cunoașterea umană.",
    culturalImpact:
      "Turned 'Google' into a universal verb in 50+ languages, created Android powering billions of smartphones, and mapped the physical planet via Google Maps.",
    culturalImpactRo:
      "A transformat „a căuta pe Google” într-un verb universal în 50+ limbi, a creat Android și a cartografiat planeta fizică prin Google Maps.",
  },
];

export function CompanyBreakthroughShowcase() {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const [sel, setSel] = useState(0);

  const active = FEATURED_COMPANIES[sel] || FEATURED_COMPANIES[0];

  return (
    <div className="my-16">
      {/* Selector Tabs: Company Logos & Names */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-10">
        {FEATURED_COMPANIES.map((c, i) => {
          const on = i === sel;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setSel(i)}
              className="flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 border"
              style={{
                cursor: "pointer",
                backgroundColor: on ? "#0C0907" : "rgba(255,255,255,0.04)",
                color: on ? "#F5EDD8" : "rgba(245,237,216,0.6)",
                borderColor: on ? "#E8B923" : "rgba(255,255,255,0.08)",
                transform: on ? "translateY(-3px)" : "none",
                boxShadow: on ? "0 15px 35px rgba(0,0,0,0.5)" : "none",
              }}
            >
              <div className="relative h-7 w-full mb-2 flex items-center justify-center">
                <Image
                  src={c.logoFile}
                  alt={c.name}
                  width={60}
                  height={28}
                  className={`object-contain max-h-7 max-w-[60px] ${
                    c.logoInvert ? "brightness-0 invert opacity-90" : ""
                  }`}
                />
              </div>
              <span className="font-body text-[10px] font-bold uppercase tracking-wider text-center">
                {c.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Feature Card */}
      <div key={active.id} className="culture-glass rounded-3xl border border-white/10 p-8 md:p-12 shadow-[0_30px_90px_rgb(0,0,0,0.5)]">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] items-start">
          {/* Left Column: Logo Badge, Breakthrough Product, Stat */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center justify-center h-14 w-24 rounded-xl bg-white/10 border border-white/15 p-2 backdrop-blur-md">
                <Image
                  src={active.logoFile}
                  alt={active.name}
                  width={80}
                  height={36}
                  className={`object-contain max-h-9 ${
                    active.logoInvert ? "brightness-0 invert" : ""
                  }`}
                />
              </div>
              <div>
                <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-glory-gold block">
                  {ro ? `FONDATĂ ÎN ${active.foundedYear}` : `FOUNDED IN ${active.foundedYear}`}
                </span>
                <span className="font-macro-display text-2xl font-black text-white">
                  {active.name}
                </span>
              </div>
            </div>

            {/* Breakthrough Product Box */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-6 mb-6">
              <span className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-[#E8391B] block mb-1">
                {ro ? `INOVAȚIE CHEIE (${active.breakthroughYear})` : `BREAKTHROUGH PRODUCT (${active.breakthroughYear})`}
              </span>
              <h4 className="font-macro-display text-2xl sm:text-3xl font-black text-white leading-tight">
                {ro ? active.breakthroughProductRo : active.breakthroughProduct}
              </h4>
            </div>

            {/* Key Stat Box */}
            <div className="rounded-2xl border border-glory-gold/30 bg-glory-gold/[0.05] p-6">
              <p className="font-macro-display text-3xl sm:text-4xl font-black text-glory-gold tracking-tight mb-1">
                {active.statValue}
              </p>
              <p className="font-body text-xs font-bold uppercase tracking-wider text-[#F5EDD8]/70">
                {ro ? active.statLabelRo : active.statLabel}
              </p>
            </div>
          </div>

          {/* Right Column: Story & Cultural Legacy */}
          <div className="flex flex-col justify-between h-full lg:pl-6 lg:border-l lg:border-white/10">
            <div>
              <p className="font-editorial text-xl italic text-glory-gold/90 leading-relaxed mb-6">
                &ldquo;{ro ? active.taglineRo : active.tagline}&rdquo;
              </p>

              <p className="font-editorial text-lg md:text-xl leading-relaxed text-[#F5EDD8]/90 mb-8">
                {ro ? active.storyRo : active.story}
              </p>
            </div>

            {/* Cultural Legacy Banner */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5 mt-4">
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#F5EDD8]/50 mb-2">
                {ro ? "MOȘTENIRE CULTURALĂ GLOBALĂ" : "GLOBAL CULTURAL LEGACY"}
              </p>
              <p className="font-editorial text-base leading-relaxed text-[#F5EDD8]/80">
                {ro ? active.culturalImpactRo : active.culturalImpact}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
