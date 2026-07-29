// ─── National Parks Sub-Page ──────────────────────────────────────────────────
// Hero: local SITE_IMAGES.yosemiteNationalPark
// Cinematic grid: uses FEATURED_PARKS (all local SITE_IMAGES)
//
// Beginner guide:
// - Most shared park facts and chart datasets come from lib/data/nature-data.ts
// - This file mainly decides presentation order and page-only copy
// - FEATURED_PARKS is the source for the cinematic park grid below

import type { Metadata } from "next";
import Link from "next/link";
import {
  NatStyles,
  NatureSubPageHero,
  ParkCinematicGrid,
  AnimatedStatWall,
  ParallaxImageBand,
  HeroTextReveal,
  NatureQuoteBreak,
  NatureFactModule,
} from "@/components/nature/NatureAnimations";
import { ParkVisitorsChart } from "@/components/data/NatureCharts";
import { getServerLocale }   from "@/lib/i18n/server";
import { SITE_IMAGES }       from "@/lib/site-images";
import { getTopParksVisitors, getFeaturedParks } from "@/lib/data/nature-data";

export const metadata: Metadata = {
  title: "National Parks | Nature",
  description: "63 national parks, 423 NPS sites, 85 million protected acres. The world's first and greatest national park system.",
};

const ALL_PARKS = [
  { name: "Great Smoky Mountains", state: "TN/NC",    established: 1934, visitors: 13.3, area: 522  },
  { name: "Grand Canyon",           state: "AZ",       established: 1919, visitors: 6.4,  area: 1218 },
  { name: "Zion",                   state: "UT",       established: 1919, visitors: 4.9,  area: 148  },
  { name: "Rocky Mountain",         state: "CO",       established: 1915, visitors: 4.4,  area: 265  },
  { name: "Acadia",                 state: "ME",       established: 1919, visitors: 4.1,  area: 49   },
  { name: "Yellowstone",            state: "WY/MT/ID", established: 1872, visitors: 3.9,  area: 2220 },
  { name: "Olympic",                state: "WA",       established: 1938, visitors: 3.7,  area: 922  },
  { name: "Yosemite",               state: "CA",       established: 1890, visitors: 3.7,  area: 748  },
  { name: "Grand Teton",            state: "WY",       established: 1929, visitors: 3.3,  area: 310  },
  { name: "Glacier",                state: "MT",       established: 1910, visitors: 2.9,  area: 1013 },
  { name: "Joshua Tree",            state: "CA",       established: 1994, visitors: 2.9,  area: 790  },
  { name: "Cuyahoga Valley",        state: "OH",       established: 2000, visitors: 2.8,  area: 33   },
  { name: "Indiana Dunes",          state: "IN",       established: 2019, visitors: 2.7,  area: 15   },
  { name: "Bryce Canyon",           state: "UT",       established: 1928, visitors: 2.1,  area: 36   },
  { name: "Arches",                 state: "UT",       established: 1971, visitors: 1.8,  area: 77   },
  { name: "New River Gorge",        state: "WV",       established: 2020, visitors: 1.8,  area: 70   },
  { name: "Hot Springs",            state: "AR",       established: 1921, visitors: 1.7,  area: 6    },
  { name: "Shenandoah",             state: "VA",       established: 1935, visitors: 1.7,  area: 200  },
  { name: "Everglades",             state: "FL",       established: 1934, visitors: 1.4,  area: 1509 },
  { name: "Denali",                 state: "AK",       established: 1917, visitors: 0.6,  area: 6075 },
];

const PARKS_SYSTEM_FACTS_EN = [
  { id: "ps-age",       fact: "The NPS protects 423 sites across every US state and territory",        detail: "Beyond 63 national parks, the NPS manages monuments, seashores, historic trails, battlefields, and recreation areas: a mosaic of American natural and cultural heritage.", source: "NPS 2024", color: "gold" as const },
  { id: "ps-biodiversity", fact: "National Parks serve as a biodiversity ark for 1,000+ endangered species", detail: "From the recovery of the California Condor to the reintroduction of Gray Wolves in Yellowstone, the NPS provides the critical, undisturbed habitat necessary for species that have vanished elsewhere.", source: "NPS Biodiversity Study 2024", color: "red"  as const },
  { id: "ps-influence", fact: "The US national park model has been copied by 100+ countries",           detail: "After Congress established Yellowstone in 1872, nations from Canada to Kenya adopted the American model. The US invented the concept of the national park.", source: "IUCN World Commission on Protected Areas", color: "blue" as const },
  { id: "ps-largest",   fact: "Wrangell–St. Elias (AK) is larger than Switzerland at 13.2 million acres", detail: "America's biggest park contains 9 of the 16 highest peaks in the US and more wilderness than most nations' entire protected area systems combined.", source: "NPS", color: "gold" as const },
  { id: "ps-trail",     fact: "The US National Trails System spans 50,000+ miles",                     detail: "The Appalachian Trail (2,190 mi), Pacific Crest Trail (2,653 mi), Continental Divide Trail (3,100 mi), and thousands of local trails form a free public wilderness network.", source: "American Hiking Society 2024", color: "red"  as const },
  { id: "ps-newest",    fact: "New River Gorge became the 63rd national park in December 2020",         detail: "West Virginia's New River Gorge, one of the oldest rivers in the world predating the Appalachians, protects 70,000 acres of Appalachian wilderness.", source: "NPS", color: "blue" as const },
  { id: "ps-public-land", fact: "The US manages 640 million acres of public land for recreation", detail: "Freely accessible to every citizen for hiking, hunting, fishing, and camping, this massive system covers roughly 28% of the US land area: a democratic inheritance of wilderness at a continental scale.", source: "Bureau of Land Management (BLM)", color: "gold" as const },
  { id: "ps-rv", fact: "The RV Civilization: 11.2 million households with a mobile home", detail: "Over 11 million American households own an RV, with 1 million living in them full-time. This unique mobile lifestyle is supported by cheap gas, 4.1 million miles of roads, and 15,000 campgrounds, generating over $100B in economic activity.", source: "RV Industry Association (RVIA)", color: "gold" as const },
];

const PARKS_SYSTEM_FACTS_RO = [
  { id: "ps-age",       fact: "NPS protejează 423 de situri în toate statele și teritoriile SUA",           detail: "Pe lângă 63 de parcuri naționale, NPS administrează monumente, maluri de mare, trasee istorice, câmpuri de bătălie și zone de recreere: un mozaic al patrimoniului natural și cultural american.", source: "NPS 2024", color: "gold" as const },
  { id: "ps-biodiversity", fact: "Parcurile Naționale servesc ca o arcă a biodiversității pentru peste 1.000 de specii", detail: "De la recuperarea Condorului de California la reintroducerea lupilor cenușii în Yellowstone, NPS oferă habitatul critic necesar pentru speciile care au dispărut din alte locuri.", source: "NPS Biodiversity Study 2024", color: "red"  as const },
  { id: "ps-influence", fact: "Modelul american de parc național a fost copiat de 100+ de țări",            detail: "După ce Congresul a înființat Yellowstone în 1872, națiuni din Canada până în Kenya au adoptat modelul american. SUA a inventat conceptul de parc național.", source: "IUCN World Commission on Protected Areas", color: "blue" as const },
  { id: "ps-largest",   fact: "Wrangell–St. Elias (AK) este mai mare decât Elveția: 13,2 milioane de acri", detail: "Cel mai mare parc al Americii conține 9 din cele 16 cele mai înalte vârfuri din SUA și mai multă sălbăticie decât sistemul total de arii protejate al majorității națiunilor.", source: "NPS", color: "gold" as const },
  { id: "ps-trail",     fact: "Sistemul Național de Trasee al SUA se întinde pe 80.000+ km",                detail: "Appalachian Trail (3.524 km), Pacific Crest Trail (4.270 km), Continental Divide Trail (4.989 km) și mii de trasee locale formează o rețea gratuită de acces în sălbăticie.", source: "American Hiking Society 2024", color: "red"  as const },
  { id: "ps-newest",    fact: "New River Gorge a devenit al 63-lea parc național în decembrie 2020",        detail: "New River Gorge din West Virginia, unul dintre cele mai vechi râuri din lume mai vechi decât Munții Apalachieni, protejează 113.000 de acri de sălbăticie apalachiană.", source: "NPS", color: "blue" as const },
  { id: "ps-public-land", fact: "SUA administrează 640 de milioane de acri de teren public pentru recreere", detail: "Liber accesibile fiecărui cetățean pentru drumeții, vânătoare, pescuit și camping, aceste terenuri acoperă 28% din suprafața țării, o moștenire democratică de amploare continentală.", source: "Bureau of Land Management (BLM)", color: "gold" as const },
  { id: "ps-rv", fact: "Civilizația RV: 11,2 milioane de gospodării dețin o locuință mobilă", detail: "Peste 11 milioane de gospodării americane dețin un vehicul recreațional (RV), iar aproximativ 1 milion locuiesc în ele cu normă întreagă. Acest stil de viață mobil este susținut de combustibil ieftin, 6,6 milioane km de drumuri și 15.000 de campinguri.", source: "RV Industry Association (RVIA)", color: "gold" as const },
];

export default async function NationalParksPage() {
  const locale       = await getServerLocale();
  const isRo         = locale === "ro";
  const systemFacts  = isRo ? PARKS_SYSTEM_FACTS_RO : PARKS_SYSTEM_FACTS_EN;
  const topParksVisitors = getTopParksVisitors(locale);
  const featuredParks = getFeaturedParks(locale);

  const parks = ALL_PARKS.map(p => ({
    ...p,
    name: isRo ? p.name.replace("Great Smoky Mountains", "Munții Great Smoky")
                     .replace("Grand Canyon", "Marele Canion")
                     .replace("Rocky Mountain", "Munții Stâncoși")
                     .replace("New River Gorge", "Cheile New River")
                     .replace("Hot Springs", "Izvoarele Termale")
                     .replace("Everglades", "Everglades (Zona mlaştinoasă)")
               : p.name
  }));

  const statWall = [
    { value: 63,  suffix: "",    label: isRo ? "Parcuri Naționale" : "National Parks",  sub: isRo ? "Și tot mai multe în viitor" : "And counting",                     color: "#4ade80" },
    { value: 423, suffix: "",    label: isRo ? "Total Situri NPS" : "Total NPS Sites", sub: isRo ? "Inclusiv monumente și maluri" : "Including monuments & seashores", color: "#C4956A" },
    { value: 85,  suffix: "M",   label: isRo ? "Acri Protejați" : "Acres Protected",   sub: isRo ? "Mai mare decât suprafața multor națiuni" : "More than most nations' landmass", color: "#60a5fa" },
    { value: 325, suffix: "M+",  label: isRo ? "Vizite Anuale" : "Annual Visits",      sub: isRo ? "Mai mult decât populația SUA" : "More than the US population",    color: "#8B8680" },
  ];

  const colorMap = { gold: 'earth' as const, red: 'earth' as const, blue: 'glacier' as const, green: 'forest' as const };

  return (
    <>
      <NatStyles />

      {/* ── HERO — single image cinematic entrance ───────────────────────── */}
      <NatureSubPageHero
        imageSrc={SITE_IMAGES.yosemiteNationalPark}
        imageAlt={isRo ? "Parcul Național Yosemite" : "Yosemite National Park"}
        label={isRo ? "NATIONAL PARKS SYSTEM · CROWN JEWELS" : "NATIONAL PARKS SYSTEM · CROWN JEWELS"}
      >
        <HeroTextReveal
          eyebrow={isRo ? "Sistemul Parcurilor Naționale" : "The National Parks System"}
          line1={isRo ? "CEA MAI BUNĂ IDEE" : "THE BEST IDEA"}
          line2={isRo ? "A AMERICII" : "AMERICA EVER HAD"}
          line2Color="var(--nat-accent-forest)"
          body={isRo
            ? "Șaizeci și trei de parcuri naționale. Patru sute douăzeci și trei de situri protejate. Optzeci și cinci de milioane de acri, păstrați pentru totdeauna pentru fiecare american."
            : "Sixty-three national parks. Four hundred twenty-three protected sites. Eighty-five million acres, preserved forever for every American."}
        />
      </NatureSubPageHero>

      {/* ── STAT WALL ─────────────────────────────────────────────────────── */}
      <section className="bg-(--nat-void) pb-20 pt-12">
        <div className="mx-auto max-w-[1440px] w-full px-6 md:px-12">
          <AnimatedStatWall stats={statWall} />
        </div>
      </section>

      {/* ── CONTENT ───────────────────────────────────────────────────────── */}
      <div className="bg-(--nat-void) pb-32">
        <div className="mx-auto max-w-[1440px] w-full px-6 md:px-12 space-y-32">

          {/* Containerless Park Visitors Chart */}
          <section className="max-w-5xl mx-auto">
            <h2 className="nat-text-section text-white mb-4">{isRo ? "Cele Mai Vizitate Parcuri" : "Most Visited Parks"}</h2>
            <p className="nat-text-body mb-12">
              {isRo
                ? "Peste 325 de milioane de vizite anuale, mai mult decât întreaga populație a SUA, demonstrează că parcurile naționale sunt cu adevărat moștenirea fiecărui american."
                : "Over 325 million annual visits, more than the entire US population, prove that national parks are truly every American's inheritance."}
            </p>
            <div className="px-4">
              <ParkVisitorsChart
                data={topParksVisitors}
                title={isRo ? "Vizite Anuale (milioane), 2023" : "Annual Visits (millions), 2023"}
                source="National Park Service 2023"
              />
            </div>
          </section>

          {/* Crown Jewels Cinematic Grid */}
          <section className="max-w-6xl mx-auto">
            <h2 className="nat-text-section text-white mb-10">{isRo ? "Bijuteriile Coroanei" : "Crown Jewels"}</h2>
            <ParkCinematicGrid
              parks={featuredParks}
              visitLabel={isRo ? "Vizite/an" : "Visits/yr"}
              acresLabel={isRo ? "Acri" : "Acres"}
              estLabel={isRo ? "Înf." : "Est."}
            />
          </section>

        </div> {/* End first container */}

        {/* Parallax divider - FULL WIDTH */}
        <div className="my-32">
          <ParallaxImageBand
            imageSrc={SITE_IMAGES.yosemiteNationalPark}
            imageAlt={isRo ? "Yosemite" : "Yosemite"}
            height={600}
            overlayOpacity={0.5}
          >
            <div className="text-center max-w-4xl mx-auto px-6">
              <p className="nat-text-display" style={{ color: 'var(--nat-accent-forest)' }}>{isRo ? "1872" : "1872"}</p>
              <p className="nat-text-heading text-white mt-4">
                {isRo ? "Primul Sistem de Parcuri din Lume" : "The World's First National Park System"}
              </p>
            </div>
          </ParallaxImageBand>
        </div>

        <div className="mx-auto max-w-[1440px] w-full px-6 md:px-12 space-y-32">

          {/* Containerless Table */}
          <section className="max-w-5xl mx-auto">
            <h2 className="nat-text-section text-white mb-10">{isRo ? "Top 20 Parcuri Naționale" : "Top 20 National Parks"}</h2>
            <div className="border-t border-b border-white/4">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[580px]">
                  <thead>
                    <tr className="border-b border-white/4">
                      <th className="py-4 text-left nat-text-metadata text-white/40 px-4">#</th>
                      <th className="py-4 text-left nat-text-metadata text-white/40 px-4">{isRo ? "Parc" : "Park"}</th>
                      <th className="py-4 text-left nat-text-metadata text-white/40 px-4">{isRo ? "Stat" : "State"}</th>
                      <th className="py-4 text-left nat-text-metadata text-white/40 px-4">{isRo ? "Înf." : "Est."}</th>
                      <th className="py-4 text-right nat-text-metadata text-white/40 px-4">{isRo ? "Vizite/an" : "Visits/yr"}</th>
                      <th className="py-4 text-right nat-text-metadata text-white/40 px-4">{isRo ? "Acri (K)" : "Acres (K)"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parks.map((park, i) => (
                      <tr key={i} className="border-b border-white/4 last:border-0 hover:bg-white/2 transition-colors">
                        <td className="py-4 nat-text-metadata text-white/30 px-4">{i + 1}</td>
                        <td className="py-4 text-base font-semibold text-white tracking-wide px-4">{park.name}</td>
                        <td className="py-4 nat-text-body text-white/50 px-4">{park.state}</td>
                        <td className="py-4 font-hero text-base px-4" style={{ color: 'var(--nat-accent-forest)' }}>{park.established}</td>
                        <td className="py-4 text-right nat-text-body px-4">{park.visitors}M</td>
                        <td className="py-4 text-right nat-text-body text-white/50 px-4">{park.area.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="py-3 text-right nat-text-metadata text-white/30 px-4">{isRo ? "Sursă: National Park Service 2023" : "Source: National Park Service 2023"}</p>
            </div>
          </section>

          {/* Facts list as NatureFactModules */}
          <section className="max-w-5xl mx-auto">
            <h2 className="nat-text-section text-white mb-16">{isRo ? "În Detaliu" : "In Detail"}</h2>
            <div>
              {systemFacts.map((fact) => (
                <NatureFactModule
                  key={fact.id}
                  fact={fact.fact}
                  detail={fact.detail}
                  source={fact.source}
                  color={colorMap[fact.color as keyof typeof colorMap] ?? 'earth'}
                />
              ))}
            </div>
          </section>

          {/* Quote Section */}
          <NatureQuoteBreak
            quote={isRo ? "Parcurile naționale sunt singurul lucru pe care America l-a făcut bine și pe care restul lumii îl invidiază. Am rezervat ce aveam mai bun și am spus: asta aparține tuturor, pentru totdeauna." : "The national parks are the one thing America has done right that the rest of the world envies. We set aside the best of what we had and said: this belongs to everyone, forever."}
            attribution="Wallace Stegner"
            title={isRo ? "Autor & Conservaționist, Universitatea Stanford" : "Author & Conservationist, Stanford University"}
          />

          {/* Sub-page Navigation Footer */}
          <div className="flex items-center justify-between border-t border-white/4 pt-12 max-w-5xl mx-auto">
            <Link href="/nature" className="nat-text-label text-white/40 hover:text-white transition-colors">
              ← {isRo ? "Natură" : "Nature Overview"}
            </Link>
            <Link href="/nature/alaska" className="nat-text-label text-white/40 hover:text-white transition-colors" style={{ color: 'var(--nat-accent-forest)' }}>
              Alaska →
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
