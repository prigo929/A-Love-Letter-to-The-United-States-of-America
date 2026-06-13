import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { Wind, Car, Waves, Package } from "lucide-react";
import { MacroStyles, MacroHero } from "@/components/shared/CinematicSystem";
import { RevealSection } from "@/components/shared/Reveal";

export const metadata: Metadata = {
  title: "Consumer Abundance | Quality of Life",
  description:
    "The density of American consumer goods: 90%+ AC ownership, 800 vehicles per 1,000 people, 17 million recreational boats, 10.7 million pools, and the world's largest self-storage industry.",
};

interface AbundanceCopy {
  breadcrumbParent: string;
  breadcrumbPage: string;
  heroTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  thesisTitle: string;
  thesisParagraph1: string;
  thesisParagraph2: string;
  statsTitle: string;
  stats: Array<{ value: string; label: string; description: string }>;
  categoriesTitle: string;
  categories: Array<{
    icon: React.ElementType;
    title: string;
    items: Array<{ title: string; body: string; source: string; sourceUrl?: string }>;
  }>;
  oracleDescription: string;
}

import React from "react";

const copyEn: AbundanceCopy = {
  breadcrumbParent: "Quality of Life",
  breadcrumbPage: "Consumer Abundance",
  heroTagline: "THE ABUNDANCE CIVILIZATION",
  heroTitle: "Where Middle-Class Looks Like Luxury",
  heroSubtitle:
    "Air conditioning in 90% of homes. 800 cars per 1,000 people. 17 million recreational boats. 10.7 million swimming pools. The American consumer economy produces a standard of living with no peer.",
  thesisTitle: "Democratized Luxury at Scale",
  thesisParagraph1:
    "When economists talk about living standards, they reach for GDP per capita or wage data. But those abstractions fail to capture what daily American life actually looks like in physical terms. The right lens is the density of consumer goods — the tangible objects that define comfort, mobility, and freedom in everyday life. By that measure, the United States stands utterly apart from any other society in human history.",
  thesisParagraph2:
    "Private swimming pools. Personal aircraft. Recreational boats. In-unit washer-dryer. Central air conditioning in August. Full-size garage refrigerator. A second car. A self-storage unit for the overflow. These are not descriptions of a wealthy American's lifestyle — they are descriptions of the median American household, particularly in the Sun Belt and South. The American consumer economy has industrialized luxury and democratized it to a degree that no other civilization has approached.",
  statsTitle: "Consumer Abundance by the Numbers",
  stats: [
    {
      value: "90%+",
      label: "Homes with AC",
      description:
        "Over 90% of US homes have air conditioning. In Europe, fewer than 10–20% of homes have AC. Climate control is a baseline American expectation, not a luxury.",
    },
    {
      value: "800",
      label: "Vehicles per 1,000 People",
      description:
        "The US has ~800 vehicles per 1,000 people — among the highest densities in the world, enabling the suburban lifestyle and continent-spanning personal mobility.",
    },
    {
      value: "17M",
      label: "Recreational Boats",
      description:
        "Approximately 17 million recreational boats are owned by 15 million American households — more than any other nation by a wide margin.",
    },
    {
      value: "10.7M",
      label: "Swimming Pools",
      description:
        "The US has approximately 10.7 million swimming pools (10.4M residential). In Florida, that is 1 pool for every 14 residents.",
    },
  ],
  categoriesTitle: "Categories of Consumer Dominance",
  categories: [
    {
      icon: Wind,
      title: "Climate Control & Home Appliances",
      items: [
        {
          title: "Air Conditioning: 90%+ of Homes",
          body: "Roughly 90% of US homes are equipped with air conditioning, making sweltering summers entirely manageable. By contrast, only 10–20% of European homes have AC. This gap is not explained by climate alone — northern US states with mild summers have nearly universal AC adoption. Cheap electricity from the shale energy revolution makes year-round climate control a standard expectation rather than a luxury.",
          source: "International Energy Agency / Statista",
          sourceUrl:
            "https://www.statista.com/chart/34786/respondents-who-have-an-air-conditioner/",
        },
        {
          title: "Full-Size Appliances as Standard",
          body: "Massive multi-door refrigerators, built-in dishwashers, garbage disposals, full-size washers and dryers in-unit, and chest freezers in the garage are baseline expectations even in working-class US apartments. In Europe, space and energy constraints mean appliances are smaller, shared laundry rooms are common, and dedicated clothes dryers are treated as an unusual luxury.",
          source: "US Energy Information Administration (EIA)",
          sourceUrl: "https://www.eia.gov/consumption/residential/data/2020/",
        },
      ],
    },
    {
      icon: Car,
      title: "Personal Mobility",
      items: [
        {
          title: "800 Vehicles per 1,000 People",
          body: "With ~800 vehicles per 1,000 people, cheap fuel, and the Interstate Highway System — 47,000 miles of limited-access freeway built and maintained by the federal government — Americans enjoy unmatched personal freedom of movement. This enables suburban living at low cost, makes labor highly mobile across the continent, and is the backbone of the American retail and logistics economy.",
          source: "List of countries by vehicles per capita",
          sourceUrl:
            "https://en.wikipedia.org/wiki/List_of_countries_by_vehicles_per_capita",
        },
        {
          title: "42% of the Global General Aviation Fleet",
          body: "The US civil aviation fleet has 220,000 registered aircraft — 42% of the global total, dwarfing China (5,366) and Canada (4,888). Over 90% are general aviation (private/business), and over 80% of the 609,000 certified pilots fly GA, landing at over 5,000 public-use airports. The personal airplane — a middle-class asset in rural America — is effectively nonexistent as a civilian vehicle in any other country.",
          source: "Aircraft Owners and Pilots Association (AOPA)",
          sourceUrl:
            "https://download.aopa.org/Media/General-Aviation-Explained-r5.pdf",
        },
      ],
    },
    {
      icon: Waves,
      title: "Recreation & Outdoor Assets",
      items: [
        {
          title: "17 Million Recreational Boats",
          body: "America leads globally in boat ownership. Approximately 17 million recreational boats and yachts are owned by 15 million US households. China registers fewer than 120,000 boats despite having 4× the population. US middle-class families access millions of navigable freshwater lakes, rivers, and coastal zones. Boat ramps, marinas, and public waterway access infrastructure is a nationwide given.",
          source: "National Marine Manufacturers Association (NMMA)",
          sourceUrl: "https://www.nmma.org/",
        },
        {
          title: "10.7 Million Swimming Pools",
          body: "There are approximately 10.7 million swimming pools in the United States (10.4M residential, 309k public). In Florida: 1 pool per 14 residents. Arizona: 1 per 13 residents. Germany has only 1.5 million pools; France 3.2 million — both with much lower population-adjusted rates. A private in-ground pool is a middle-class feature in the American Sunbelt and a near-unattainable luxury item almost everywhere else.",
          source: "Pool Research 2024",
          sourceUrl: "https://poolresearch.com/statistics/",
        },
      ],
    },
    {
      icon: Package,
      title: "The Overflow Economy",
      items: [
        {
          title: "The Self-Storage Civilization: 90% of Global Share",
          body: "The US holds a 90% share of global self-storage inventory, with over 50,000 facilities — more locations than McDonald's, Starbucks, and Subway combined. Generating $40B+ in annual revenue, this industry is a physical ledger of American material abundance. Self-storage exists at scale in the United States because American households consistently accumulate more goods than their already-large homes can contain.",
          source: "SpareFoot Industry Statistics",
          sourceUrl:
            "https://www.sparefoot.com/self-storage/news/1432-self-storage-industry-statistics/",
        },
        {
          title: "$150 Billion Pet Economy",
          body: "Total US pet industry sales reached $150.6 billion in 2024, representing 40% of the global market. Americans spend more on their pets annually than the entire GDP of dozens of sovereign nations. Advanced veterinary medicine — MRIs, oncologists, cardiologists for animals — represents a standard-of-living data point unique to the US, where middle-class pet owners routinely access specialist veterinary care.",
          source: "American Pet Products Association (APPA)",
          sourceUrl:
            "https://globalpetindustry.com/news/the-pet-industry-in-the-united-states/",
        },
        {
          title: "24.5 Sq Ft of Retail Space Per Capita",
          body: "The US has 24.5 sq ft of retail space per person, compared to an average of just 4.5 sq ft in Europe. This massive infrastructure of big-box stores, strip malls, and shopping centers creates permanent price competition and consumer abundance. The American consumer goods ecosystem — Walmart, Costco, Target, Home Depot, Amazon warehouses — represents a supply-chain and retail density without precedent.",
          source: "Statista Retail Space Report",
          sourceUrl:
            "https://www.statista.com/statistics/1058852/retail-space-per-capita-select-countries-worldwide/",
        },
      ],
    },
  ],
  oracleDescription:
    "Ask the AI Oracle about air conditioning rates in American homes, car ownership density, recreational boating statistics, or the American self-storage industry.",
};

const copyRo: AbundanceCopy = {
  breadcrumbParent: "Calitatea Vieții",
  breadcrumbPage: "Abundență de Consum",
  heroTagline: "CIVILIZAȚIA ABUNDENȚEI",
  heroTitle: "Unde Clasa de Mijloc Arată ca Lux",
  heroSubtitle:
    "Aer condiționat în peste 90% din locuințe. 800 de mașini la 1.000 de persoane. 17 milioane de ambarcațiuni de agrement. 10,7 milioane de piscine. Economia de consum americană produce un nivel de trai fără egal.",
  thesisTitle: "Lux Democratizat la Scară",
  thesisParagraph1:
    "Când economiștii vorbesc despre standarde de viață, apelează la PIB per capita sau date salariale. Dar acele abstracțiuni nu reușesc să surprindă cum arată cu adevărat viața de zi cu zi americană în termeni fizici. Lentila corectă este densitatea bunurilor de consum — obiectele tangibile care definesc confortul, mobilitatea și libertatea în viața de zi cu zi. Prin această măsură, Statele Unite se separă complet de orice altă societate din istoria omenirii.",
  thesisParagraph2:
    "Piscine private. Aeronave personale. Ambarcațiuni de agrement. Mașină de spălat și uscător în apartament. Aer condiționat central în august. Frigider mare în garaj. O a doua mașină. O unitate de self-storage pentru excedent. Acestea nu sunt descrieri ale stilului de viață al unui american bogat — sunt descrieri ale gospodăriei americane mediane.",
  statsTitle: "Abundența de Consum în Cifre",
  stats: [
    {
      value: "90%+",
      label: "Locuințe cu AC",
      description:
        "Peste 90% din locuințele din SUA au aer condiționat. În Europa, mai puțin de 10–20% din locuințe au AC.",
    },
    {
      value: "800",
      label: "Vehicule la 1.000 Persoane",
      description:
        "SUA au ~800 de vehicule la 1.000 de persoane — una dintre cele mai mari densități din lume.",
    },
    {
      value: "17M",
      label: "Ambarcațiuni de Agrement",
      description:
        "Aproximativ 17 milioane de ambarcațiuni de agrement sunt deținute de 15 milioane de gospodării americane.",
    },
    {
      value: "10,7M",
      label: "Piscine",
      description:
        "SUA au aproximativ 10,7 milioane de piscine (10,4M rezidențiale). În Florida, aceasta înseamnă 1 piscină la 14 locuitori.",
    },
  ],
  categoriesTitle: "Categorii de Dominanță a Consumului",
  categories: [
    {
      icon: Wind,
      title: "Control Climatic și Electrocasnice",
      items: [
        {
          title: "Aer Condiționat: 90%+ din Locuințe",
          body: "Aproximativ 90% din locuințele din SUA sunt dotate cu aer condiționat. Prin contrast, doar 10–20% din locuințele europene au AC. Electricitatea ieftină din revoluția energiei șisturilor face controlul climatic tot timpul anului o așteptare standard, nu un lux.",
          source: "International Energy Agency / Statista",
          sourceUrl:
            "https://www.statista.com/chart/34786/respondents-who-have-an-air-conditioner/",
        },
        {
          title: "Electrocasnice de Mari Dimensiuni ca Standard",
          body: "Frigidere mari cu mai multe uși, mașini de spălat vase incorporate, zdrobitoare de deșeuri, mașini de spălat și uscătoare de mari dimensiuni în unitate și congelatoare în garaj sunt așteptări de bază chiar și în apartamentele americane de clasă muncitoare. În Europa, constrângerile de spațiu și energie înseamnă că electrocasnicele sunt mai mici.",
          source: "US Energy Information Administration (EIA)",
          sourceUrl: "https://www.eia.gov/consumption/residential/data/2020/",
        },
      ],
    },
    {
      icon: Car,
      title: "Mobilitate Personală",
      items: [
        {
          title: "800 de Vehicule la 1.000 de Persoane",
          body: "Cu ~800 de vehicule la 1.000 de persoane, combustibil ieftin și sistemul de autostrăzi Interstate — 47.000 de mile de autostradă cu acces limitat — americanii se bucură de o libertate de mișcare personală fără egal.",
          source: "List of countries by vehicles per capita",
          sourceUrl:
            "https://en.wikipedia.org/wiki/List_of_countries_by_vehicles_per_capita",
        },
        {
          title: "42% din Flota Globală de Aviație Generală",
          body: "Flota aviației civile din SUA are 220.000 de aeronave înregistrate — 42% din totalul global, eclipsând China (5.366) și Canada (4.888). Avionul personal — un activ al clasei de mijloc în America rurală — este practic inexistent ca vehicul civil în orice altă țară.",
          source: "Aircraft Owners and Pilots Association (AOPA)",
          sourceUrl:
            "https://download.aopa.org/Media/General-Aviation-Explained-r5.pdf",
        },
      ],
    },
    {
      icon: Waves,
      title: "Recreere și Active de Agrement",
      items: [
        {
          title: "17 Milioane de Ambarcațiuni de Agrement",
          body: "America conduce la nivel global în deținerea de ambarcațiuni. Aproximativ 17 milioane de ambarcațiuni de agrement și iahturi sunt deținute de 15 milioane de gospodării americane. China înregistrează mai puțin de 120.000 de ambarcațiuni, deși are de 4 ori mai multă populație.",
          source: "National Marine Manufacturers Association (NMMA)",
          sourceUrl: "https://www.nmma.org/",
        },
        {
          title: "10,7 Milioane de Piscine",
          body: "Există aproximativ 10,7 milioane de piscine în Statele Unite (10,4M rezidențiale, 309k publice). În Florida: 1 piscină la 14 locuitori. Arizona: 1 la 13 locuitori. Germania are doar 1,5 milioane de piscine; Franța 3,2 milioane — ambele cu rate mult mai mici ajustate la populație.",
          source: "Pool Research 2024",
          sourceUrl: "https://poolresearch.com/statistics/",
        },
      ],
    },
    {
      icon: Package,
      title: "Economia Surplusului",
      items: [
        {
          title: "Civilizația Self-Storage: 90% din Cota Globală",
          body: "SUA dețin 90% din inventarul global de self-storage, cu peste 50.000 de facilități — mai multe locații decât McDonald's, Starbucks și Subway combinate. Generând venituri anuale de 40+ miliarde de dolari, această industrie este un registru fizic al abundenței materiale americane.",
          source: "SpareFoot Industry Statistics",
          sourceUrl:
            "https://www.sparefoot.com/self-storage/news/1432-self-storage-industry-statistics/",
        },
        {
          title: "Economia Animalelor de Companie de 150 Miliarde de Dolari",
          body: "Vânzările totale din industria americană a animalelor de companie au atins 150,6 miliarde de dolari în 2024, reprezentând 40% din piața globală. Medicina veterinară avansată — RMN-uri, oncologi, cardiologi pentru animale — reprezintă un punct de date privind nivelul de trai unic în SUA.",
          source: "American Pet Products Association (APPA)",
          sourceUrl:
            "https://globalpetindustry.com/news/the-pet-industry-in-the-united-states/",
        },
        {
          title: "24,5 Mp de Spațiu Comercial Per Capita",
          body: "SUA au 24,5 sq ft de spațiu comercial per persoană, față de o medie de doar 4,5 sq ft în Europa. Această infrastructură masivă de magazine de tip big-box, mall-uri și centre comerciale creează o concurență permanentă de prețuri și abundență de consum.",
          source: "Statista Retail Space Report",
          sourceUrl:
            "https://www.statista.com/statistics/1058852/retail-space-per-capita-select-countries-worldwide/",
        },
      ],
    },
  ],
  oracleDescription:
    "Întreabă Oracolul AI despre ratele de aer condiționat în locuințele americane, densitatea proprietăților de mașini, statisticile nautice de agrement sau industria americană de self-storage.",
};

export default async function AbundancePage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const copy = isRo ? copyRo : copyEn;

  return (
    <>
      <MacroStyles />
      <MacroHero
        imageSrc="/images/library/Housing/USA Suburb sunset.jpg"
        imageAlt="American suburb at sunset"
        eyebrow={copy.heroTagline}
        titleLead={isRo ? "UNDE CLASA DE MIJLOC" : "WHERE MIDDLE CLASS"}
        titleAccent={isRo ? "ARATĂ CA LUX" : "LOOKS LIKE LUXURY"}
        description={copy.heroSubtitle}
        stats={[
          { value: "90%+", label: isRo ? "Case cu AC" : "Homes with AC" },
          { value: "17M", label: isRo ? "Ambarcațiuni Agrement" : "Recreational Boats" },
          { value: "10.7M", label: isRo ? "Piscine Rezidențiale" : "Swimming Pools" },
        ]}
      />

      <div className="bg-[#000000] relative z-10 pb-32 font-body text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 mb-8">
          <Breadcrumb
            items={[
              { label: copy.breadcrumbParent, href: "/quality-of-life" },
              { label: copy.breadcrumbPage },
            ]}
          />
        </div>

        {/* Thesis */}
        <RevealSection className="border-b border-white/5 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/2 p-8 md:p-12 relative">
            <div className="absolute top-4 right-4 opacity-[0.06]">
              <Package className="h-24 w-24 text-[#E8B923]" />
            </div>
            <h2 className="macro-section-title text-[#E8B923] text-3xl mb-6">{copy.thesisTitle}</h2>
            <p className="macro-body mb-6">{copy.thesisParagraph1}</p>
            <p className="macro-body">{copy.thesisParagraph2}</p>
          </div>
        </RevealSection>

        {/* Stats */}
        <RevealSection className="border-b border-white/5 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#E8B923] text-center mb-12">
              {copy.statsTitle}
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {copy.stats.map((stat, i) => (
                <div key={i} className="p-6 rounded-2xl border border-white/5 bg-white/2 hover:border-[#E8B923]/20 transition-all text-center">
                  <p className="macro-stat-value mb-2">{stat.value}</p>
                  <p className="font-display text-base font-bold text-white mb-2">{stat.label}</p>
                  <p className="text-xs text-white/50 leading-relaxed">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* Categories */}
        <RevealSection className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="macro-section-title text-white text-center text-3xl mb-16">{copy.categoriesTitle}</h2>
            <div className="space-y-20">
              {copy.categories.map((cat, ci) => {
                const Icon = cat.icon;
                return (
                  <div key={ci}>
                    <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/5">
                      <div className="rounded-xl bg-[#E8B923]/10 p-2.5">
                        <Icon className="h-6 w-6 text-[#E8B923]" />
                      </div>
                      <h3 className="macro-section-title text-white text-2xl">{cat.title}</h3>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                      {cat.items.map((item, ii) => (
                        <div key={ii} className="rounded-3xl border border-white/10 bg-white/2 p-8 hover:border-[#E8B923]/20 transition-all">
                          <h4 className="font-display text-lg font-bold text-[#E8B923] mb-3">{item.title}</h4>
                          <p className="macro-body text-sm mb-4">{item.body}</p>
                          <div className="border-t border-white/5 pt-3">
                            {item.sourceUrl ? (
                              <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[#E8B923]/60 hover:text-[#E8B923] transition-colors">
                                {item.source} ↗
                              </a>
                            ) : (
                              <span className="text-xs text-white/30">{item.source}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </RevealSection>

        <AskAmericaCTA locale={locale} descriptionEn={copyEn.oracleDescription} descriptionRo={copyRo.oracleDescription} />
      </div>
    </>
  );
}
