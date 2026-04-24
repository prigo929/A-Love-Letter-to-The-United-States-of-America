// ─── National Parks Sub-Page ──────────────────────────────────────────────────
// Hero: local SITE_IMAGES.yosemiteNationalPark
// Cinematic grid: uses FEATURED_PARKS (all local SITE_IMAGES)
//
// Beginner guide:
// - Most shared park facts and chart datasets come from lib/data/nature-data.ts
// - This file mainly decides presentation order and page-only copy
// - FEATURED_PARKS is the source for the cinematic park grid below

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb }  from "@/components/layout/Breadcrumb";
import { FactCard }    from "@/components/sections/FactCard";
import { QuoteBlock }  from "@/components/sections/QuoteBlock";
import { ParkCinematicGrid, AnimatedStatWall, ParallaxImageBand, HeroTextReveal } from "@/components/nature/NatureAnimations";
import { ParkVisitorsChart } from "@/components/data/NatureCharts";
import { getServerLocale }   from "@/lib/i18n/server";
import { BLUR_PLACEHOLDER }  from "@/lib/utils";
import { SITE_IMAGES }       from "@/lib/site-images";
import { TOP_PARKS_VISITORS, FEATURED_PARKS, getNatureOverviewFacts } from "@/lib/data/nature-data";

export const metadata: Metadata = { title: "National Parks | Nature | America: The Greatest Nation", description: "63 national parks, 423 NPS sites, 85 million protected acres. The world's first and greatest national park system." };

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
  { id: "ps-age",       fact: "The NPS protects 423 sites across every US state and territory",        detail: "Beyond 63 national parks, the NPS manages monuments, seashores, historic trails, battlefields, and recreation areas — a mosaic of American natural and cultural heritage.", source: "NPS 2024", color: "gold" as const },
  { id: "ps-jobs",      fact: "National parks generate $50B+ in economic activity annually",            detail: "Visitor spending in gateway communities supports over 400,000 jobs. Every $1 invested by Congress returns $10 to the economy — the most efficient public investment in America.", source: "NPS Economic Contributions Study 2023", color: "red"  as const },
  { id: "ps-influence", fact: "The US national park model has been copied by 100+ countries",           detail: "After Congress established Yellowstone in 1872, nations from Canada to Kenya adopted the American model. The US invented the concept of the national park.", source: "IUCN World Commission on Protected Areas", color: "blue" as const },
  { id: "ps-largest",   fact: "Wrangell–St. Elias (AK) is larger than Switzerland at 13.2 million acres", detail: "America's biggest park contains 9 of the 16 highest peaks in the US and more wilderness than most nations' entire protected area systems combined.", source: "NPS", color: "gold" as const },
  { id: "ps-trail",     fact: "The US National Trails System spans 50,000+ miles",                     detail: "The Appalachian Trail (2,190 mi), Pacific Crest Trail (2,653 mi), Continental Divide Trail (3,100 mi), and thousands of local trails form a free public wilderness network.", source: "American Hiking Society 2024", color: "red"  as const },
  { id: "ps-newest",    fact: "New River Gorge became the 63rd national park in December 2020",         detail: "West Virginia's New River Gorge — one of the oldest rivers in the world, predating the Appalachians — protects 70,000 acres of Appalachian wilderness.", source: "NPS", color: "blue" as const },
];

const PARKS_SYSTEM_FACTS_RO = [
  { id: "ps-age",       fact: "NPS protejează 423 de situri în toate statele și teritoriile SUA",           detail: "Pe lângă 63 de parcuri naționale, NPS administrează monumente, maluri de mare, trasee istorice, câmpuri de bătălie și zone de recreere — un mozaic al patrimoniului natural și cultural american.", source: "NPS 2024", color: "gold" as const },
  { id: "ps-jobs",      fact: "Parcurile naționale generează 50 de miliarde de dolari activitate economică anual", detail: "Cheltuielile vizitatorilor în comunitățile din jur susțin 400.000+ de locuri de muncă. Fiecare dolar investit de Congres returnează 10 dolari economiei — cel mai eficient investiție publică din America.", source: "NPS Economic Contributions Study 2023", color: "red"  as const },
  { id: "ps-influence", fact: "Modelul american de parc național a fost copiat de 100+ de țări",            detail: "După ce Congresul a înființat Yellowstone în 1872, națiuni din Canada până în Kenya au adoptat modelul american. SUA a inventat conceptul de parc național.", source: "IUCN World Commission on Protected Areas", color: "blue" as const },
  { id: "ps-largest",   fact: "Wrangell–St. Elias (AK) este mai mare decât Elveția — 13,2 milioane de acri", detail: "Cel mai mare parc al Americii conține 9 din cele 16 cele mai înalte vârfuri din SUA și mai multă sălbăticie decât sistemul total de arii protejate al majorității națiunilor.", source: "NPS", color: "gold" as const },
  { id: "ps-trail",     fact: "Sistemul Național de Trasee al SUA se întinde pe 80.000+ km",                detail: "Appalachian Trail (3.524 km), Pacific Crest Trail (4.270 km), Continental Divide Trail (4.989 km) și mii de trasee locale formează o rețea gratuită de acces în sălbăticie.", source: "American Hiking Society 2024", color: "red"  as const },
  { id: "ps-newest",    fact: "New River Gorge a devenit al 63-lea parc național în decembrie 2020",        detail: "New River Gorge din West Virginia — unul dintre cele mai vechi râuri din lume, mai vechi decât Munții Apalachieni — protejează 113.000 de acri de sălbăticie apalachiană.", source: "NPS", color: "blue" as const },
];

export default async function NationalParksPage() {
  // This page is mostly data-driven. Once we know the locale, the rest of the
  // component becomes a matter of choosing the right arrays and labels.
  const locale       = await getServerLocale();
  const isRo         = locale === "ro";
  const systemFacts  = isRo ? PARKS_SYSTEM_FACTS_RO : PARKS_SYSTEM_FACTS_EN;

  // The stat wall values are kept as data here so the animated component can
  // stay generic and be reused on other nature pages.
  const statWall = [
    { value: 63,  suffix: "",    label: isRo ? "Parcuri Naționale" : "National Parks",  sub: isRo ? "Și tot mai multe în viitor" : "And counting",                     color: "#4ade80" },
    { value: 423, suffix: "",    label: isRo ? "Total Situri NPS" : "Total NPS Sites", sub: isRo ? "Inclusiv monumente și maluri" : "Including monuments & seashores", color: "#FFD700" },
    { value: 85,  suffix: "M",   label: isRo ? "Acri Protejați" : "Acres Protected",   sub: isRo ? "Mai mare decât suprafața multor națiuni" : "More than most nations' landmass", color: "#4ade80" },
    { value: 325, suffix: "M+",  label: isRo ? "Vizite Anuale" : "Annual Visits",      sub: isRo ? "Mai mult decât populația SUA" : "More than the US population",    color: "#FFD700" },
  ];

  return (
    <>
      <div className="relative bg-navy-dark pt-28 pb-16">
        <Image src={SITE_IMAGES.yosemiteNationalPark}
          alt={isRo ? "Parcul Național Yosemite — pereți de granit și văi magnifice" : "Yosemite National Park — granite walls and magnificent valleys"}
          fill className="object-cover opacity-40" priority sizes="100vw"
          placeholder="blur" blurDataURL={BLUR_PLACEHOLDER} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/80 to-navy-dark" />
        <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: isRo ? "Natură" : "Nature", href: "/nature" }, { label: isRo ? "Parcuri Naționale" : "National Parks" }]} className="mb-8" />
          <HeroTextReveal
            eyebrow={isRo ? "Sistemul Parcurilor Naționale" : "The National Parks System"}
            line1={isRo ? "CEA MAI BUNĂ IDEE" : "THE BEST IDEA"}
            line2={isRo ? "A AMERICII" : "AMERICA EVER HAD"}
            line2Color="#4ade80"
            body={isRo
              ? "Șaizeci și trei de parcuri naționale. Patru sute douăzeci și trei de situri protejate. Optzeci și cinci de milioane de acri — păstrați pentru totdeauna pentru fiecare american."
              : "Sixty-three national parks. Four hundred twenty-three protected sites. Eighty-five million acres — preserved forever for every American."}
          />
        </div>
      </div>

      <section className="bg-navy-dark px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-xl"><AnimatedStatWall stats={statWall} /></div>
      </section>

      <div className="bg-navy-dark">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 space-y-16">

          <section>
            {/* The chart component only needs data + labels; all drawing logic
                lives inside the reusable chart itself. */}
            <h2 className="mb-6 font-display text-h2 text-white">{isRo ? "Cele Mai Vizitate Parcuri" : "Most Visited Parks"}</h2>
            <p className="mb-6 font-body text-lg text-white/65 leading-relaxed">
              {isRo
                ? "Peste 325 de milioane de vizite anuale — mai mult decât întreaga populație a SUA — demonstrează că parcurile naționale sunt cu adevărat moștenirea fiecărui american."
                : "Over 325 million annual visits — more than the entire US population — prove that national parks are truly every American's inheritance."}
            </p>
            <div className="rounded-2xl border border-white/10 bg-navy-mid p-6 md:p-8">
              <ParkVisitorsChart data={TOP_PARKS_VISITORS}
                title={isRo ? "Vizite Anuale (milioane), 2023" : "Annual Visits (millions), 2023"}
                source="National Park Service 2023" />
            </div>
          </section>

          <section>
            {/* `FEATURED_PARKS` comes from the shared nature data file, which
                makes it easier to reuse the same park list elsewhere later. */}
            <h2 className="mb-6 font-display text-h2 text-white">{isRo ? "Bijuteriile Coroanei" : "Crown Jewels"}</h2>
            <ParkCinematicGrid parks={FEATURED_PARKS}
              visitLabel={isRo ? "Vizite/an" : "Visits/yr"}
              acresLabel={isRo ? "Acri" : "Acres"}
              estLabel={isRo ? "Înf." : "Est."} />
          </section>

          {/* Local Yosemite image for parallax */}
          <ParallaxImageBand imageSrc={SITE_IMAGES.yosemiteNationalPark}
            imageAlt={isRo ? "Yosemite — lumina de aur pe pereții de granit" : "Yosemite — golden light on granite walls"}
            height={380} overlayOpacity={0.42}>
            <div className="text-center px-4">
              <p className="font-hero text-5xl text-green-300 md:text-7xl">{isRo ? "Înf. 1872" : "Est. 1872"}</p>
              <p className="mt-3 font-body text-xl text-white/80">
                {isRo ? "Primul Sistem de Parcuri Naționale din Lume" : "The World's First National Park System"}
              </p>
            </div>
          </ParallaxImageBand>

          <section>
            <h2 className="mb-6 font-display text-h2 text-white">{isRo ? "Top 20 Parcuri Naționale" : "Top 20 National Parks"}</h2>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-mid">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[580px]">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-5 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">#</th>
                      <th className="px-5 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">{isRo ? "Parc" : "Park"}</th>
                      <th className="px-5 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">{isRo ? "Stat" : "State"}</th>
                      <th className="px-5 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">{isRo ? "Înf." : "Est."}</th>
                      <th className="px-5 py-4 text-right font-body text-xs font-semibold uppercase tracking-widest text-white/40">{isRo ? "Vizite/an" : "Visits/yr"}</th>
                      <th className="px-5 py-4 text-right font-body text-xs font-semibold uppercase tracking-widest text-white/40">{isRo ? "Acri (K)" : "Acres (K)"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ALL_PARKS.map((park, i) => (
                      <tr key={i} className={`border-b border-white/5 transition-colors hover:bg-white/3 ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}>
                        <td className="px-5 py-3.5 font-body text-sm text-white/30">{i + 1}</td>
                        <td className="px-5 py-3.5 font-body text-sm font-semibold text-white">{park.name}</td>
                        <td className="px-5 py-3.5 font-body text-sm text-white/50">{park.state}</td>
                        <td className="px-5 py-3.5 font-hero text-base text-green-400">{park.established}</td>
                        <td className="px-5 py-3.5 text-right font-body text-sm text-white/70">{park.visitors}M</td>
                        <td className="px-5 py-3.5 text-right font-body text-sm text-white/55">{park.area.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="px-5 py-3 text-right font-body text-xs text-white/30">{isRo ? "Sursă: National Park Service 2023" : "Source: National Park Service 2023"}</p>
            </div>
          </section>

          <section>
            <h2 className="mb-6 font-display text-h2 text-white">{isRo ? "Sistemul în Cifre" : "The System by the Numbers"}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {systemFacts.map((fact) => (
                <FactCard key={fact.id} fact={fact.fact} detail={fact.detail} source={fact.source} color={fact.color} variant="dark" />
              ))}
            </div>
          </section>

          <QuoteBlock
            quote={isRo ? "Parcurile naționale sunt singurul lucru pe care America l-a făcut bine și pe care restul lumii îl invidiază. Am rezervat ce aveam mai bun și am spus: asta aparține tuturor, pentru totdeauna." : "The national parks are the one thing America has done right that the rest of the world envies. We set aside the best of what we had and said: this belongs to everyone, forever."}
            attribution="Wallace Stegner" title={isRo ? "Autor & Conservaționist, Universitatea Stanford" : "Author & Conservationist, Stanford University"} variant="dark"
          />

          <div className="flex items-center justify-between border-t border-white/10 pt-8">
            <Link href="/nature" className="font-body text-sm text-white/50 hover:text-white transition-colors">← {isRo ? "Natură" : "Nature Overview"}</Link>
            <Link href="/nature/alaska" className="font-body text-sm font-semibold text-green-400 hover:text-green-300 transition-colors">Alaska →</Link>
          </div>
        </div>
      </div>
    </>
  );
}
