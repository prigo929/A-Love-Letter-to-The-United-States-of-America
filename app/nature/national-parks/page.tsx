// ─── National Parks Sub-Page ──────────────────────────────────────────────────

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb }  from "@/components/layout/Breadcrumb";
import { FactCard }    from "@/components/sections/FactCard";
import { StatCard }    from "@/components/sections/StatCard";
import { QuoteBlock }  from "@/components/sections/QuoteBlock";
import { ParkVisitorsChart } from "@/components/data/NatureCharts";
import { getServerLocale }   from "@/lib/i18n/server";
import { BLUR_PLACEHOLDER }  from "@/lib/utils";
import {
  TOP_PARKS_VISITORS,
  FEATURED_PARKS,
  getNatureOverviewFacts,
} from "@/lib/data/nature-data";

export const metadata: Metadata = {
  title: "National Parks | Nature | America: The Greatest Nation",
  description:
    "63 national parks, 423 NPS sites, 85 million protected acres. The world's first and greatest national park system — America's defining conservation achievement.",
  alternates: { canonical: "/nature/national-parks" },
};

// Full parks list data (top 20)
const ALL_PARKS = [
  { name: "Great Smoky Mountains", state: "TN/NC",     established: 1934, visitors: 13.3, area: 522  },
  { name: "Grand Canyon",           state: "AZ",        established: 1919, visitors: 6.4,  area: 1218 },
  { name: "Zion",                   state: "UT",        established: 1919, visitors: 4.9,  area: 148  },
  { name: "Rocky Mountain",         state: "CO",        established: 1915, visitors: 4.4,  area: 265  },
  { name: "Acadia",                 state: "ME",        established: 1919, visitors: 4.1,  area: 49   },
  { name: "Yellowstone",            state: "WY/MT/ID",  established: 1872, visitors: 3.9,  area: 2220 },
  { name: "Olympic",                state: "WA",        established: 1938, visitors: 3.7,  area: 922  },
  { name: "Yosemite",               state: "CA",        established: 1890, visitors: 3.7,  area: 748  },
  { name: "Grand Teton",            state: "WY",        established: 1929, visitors: 3.3,  area: 310  },
  { name: "Glacier",                state: "MT",        established: 1910, visitors: 2.9,  area: 1013 },
  { name: "Indiana Dunes",          state: "IN",        established: 2019, visitors: 2.7,  area: 15   },
  { name: "Joshua Tree",            state: "CA",        established: 1994, visitors: 2.9,  area: 790  },
  { name: "Cuyahoga Valley",        state: "OH",        established: 2000, visitors: 2.8,  area: 33   },
  { name: "New River Gorge",        state: "WV",        established: 2020, visitors: 1.8,  area: 70   },
  { name: "Bryce Canyon",           state: "UT",        established: 1928, visitors: 2.1,  area: 36   },
  { name: "Hot Springs",            state: "AR",        established: 1921, visitors: 1.7,  area: 6    },
  { name: "Shenandoah",             state: "VA",        established: 1935, visitors: 1.7,  area: 200  },
  { name: "Denali",                 state: "AK",        established: 1917, visitors: 0.6,  area: 6075 },
  { name: "Arches",                 state: "UT",        established: 1971, visitors: 1.8,  area: 77   },
  { name: "Everglades",             state: "FL",        established: 1934, visitors: 1.4,  area: 1509 },
];

const PARKS_SYSTEM_FACTS = [
  {
    id: "ps-age",
    fact: "The NPS protects 423 sites across every US state and territory",
    detail: "Beyond the 63 national parks, the NPS manages national monuments, seashores, historic trails, battlefields, and recreation areas — a mosaic of American natural and cultural heritage.",
    source: "National Park Service 2024",
    color: "gold" as const,
  },
  {
    id: "ps-jobs",
    fact: "National parks generate $50B+ in economic activity annually",
    detail: "Visitor spending in gateway communities supports over 400,000 jobs. Every $1 invested by Congress in the NPS returns $10 to the American economy through tourism and recreation.",
    source: "NPS Economic Contributions Study 2023",
    color: "red" as const,
  },
  {
    id: "ps-influence",
    fact: "The US national park model has been copied by 100+ countries",
    detail: "After Congress established Yellowstone in 1872, nations from Canada to Kenya adopted the American model of setting aside land for public enjoyment. The US invented the concept of the national park.",
    source: "IUCN World Commission on Protected Areas",
    color: "blue" as const,
  },
  {
    id: "ps-newest",
    fact: "New River Gorge became America's 63rd national park in 2020",
    detail: "West Virginia's New River Gorge — one of the oldest rivers in the world, predating the Appalachian Mountains — was designated a national park in December 2020, protecting 70,000 acres of Appalachian wilderness.",
    source: "National Park Service",
    color: "gold" as const,
  },
  {
    id: "ps-largest",
    fact: "Wrangell–St. Elias is larger than Switzerland — America's biggest park",
    detail: "At 13.2 million acres in Alaska, Wrangell–St. Elias National Park and Preserve is larger than the entire country of Switzerland. It contains 9 of the 16 highest peaks in the United States.",
    source: "National Park Service",
    color: "red" as const,
  },
  {
    id: "ps-trail",
    fact: "The US National Trails System spans 50,000+ miles of maintained trails",
    detail: "The Appalachian Trail (2,190 miles), Pacific Crest Trail (2,653 miles), Continental Divide Trail (3,100 miles), and thousands of local trails form a network of free public wilderness access unmatched anywhere.",
    source: "American Hiking Society 2024",
    color: "blue" as const,
  },
];

export default async function NationalParksPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const overviewFacts = getNatureOverviewFacts(locale);

  return (
    <>
      {/* Hero */}
      <div className="relative bg-navy-dark pt-28 pb-16">
        <Image
          src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1920&auto=format&fit=crop"
          alt="Yosemite Valley with Half Dome — crown jewel of the national park system"
          fill
          className="object-cover opacity-30"
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/85 to-navy-dark" />
        <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: isRo ? "Natură" : "Nature", href: "/nature" },
              { label: isRo ? "Parcuri Naționale" : "National Parks" },
            ]}
            className="mb-8"
          />
          <p className="mb-4 section-eyebrow">
            {isRo ? "Sistemul Parcurilor Naționale" : "The National Parks System"}
          </p>
          <h1 className="mb-4 font-hero text-6xl text-white sm:text-7xl">
            {isRo ? "CEA MAI BUNĂ IDEE" : "THE BEST IDEA"}<br />
            <span className="text-green-400">
              {isRo ? "A AMERICII" : "AMERICA EVER HAD"}
            </span>
          </h1>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-white/65">
            {isRo
              ? "Șaizeci și trei de parcuri naționale. Patru sute douăzeci și trei de situri protejate. Optzeci și cinci de milioane de acri păstrați pentru totdeauna. De la Yellowstone din 1872 până astăzi, America a construit cel mai mare sistem de conservare a naturii din istoria lumii."
              : "Sixty-three national parks. Four hundred and twenty-three protected sites. Eighty-five million acres preserved forever. From Yellowstone in 1872 to today, America has built the greatest natural conservation system in the history of the world."}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-navy-dark">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">

          {/* Visitor chart */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {isRo ? "Cele Mai Vizitate Parcuri" : "Most Visited Parks"}
            </h2>
            <p className="mb-8 font-body text-lg text-white/65 leading-relaxed">
              {isRo
                ? "Peste 325 de milioane de vizite anuale — mai mult decât întreaga populație a SUA — demonstrează că parcurile naționale sunt cu adevărat proprietatea tuturor americanilor."
                : "Over 325 million annual visits — more than the entire US population — prove that national parks are truly every American's inheritance."}
            </p>
            <div className="rounded-2xl border border-white/10 bg-navy-mid p-6 md:p-8">
              <ParkVisitorsChart
                data={TOP_PARKS_VISITORS}
                title={isRo ? "Vizite Anuale (milioane), 2023" : "Annual Visits (millions), 2023"}
                source="National Park Service 2023"
              />
            </div>
          </section>

          {/* Featured Parks grid */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {isRo ? "Parcurile de Referință" : "Landmark Parks"}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURED_PARKS.map((park) => (
                <div
                  key={park.name}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-navy-mid transition-colors hover:border-green-500/40"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={park.imageSrc}
                      alt={park.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                      placeholder="blur"
                      blurDataURL={BLUR_PLACEHOLDER}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-mid via-navy-mid/20 to-transparent" />
                    <span className="absolute left-3 bottom-3 font-hero text-xl text-white drop-shadow">
                      {park.name}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="mb-2 font-body text-xs italic text-white/45">{park.highlight}</p>
                    <div className="flex gap-4 text-center">
                      <div>
                        <p className="font-hero text-lg text-glory-gold">{park.established}</p>
                        <p className="font-body text-xs text-white/40">{isRo ? "Înființat" : "Est."}</p>
                      </div>
                      <div>
                        <p className="font-hero text-lg text-white">{park.visitors}M</p>
                        <p className="font-body text-xs text-white/40">{isRo ? "Vizite/an" : "Visits/yr"}</p>
                      </div>
                      <div>
                        <p className="font-hero text-lg text-white">{park.area.toLocaleString()}K</p>
                        <p className="font-body text-xs text-white/40">{isRo ? "Acri" : "Acres"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Full Parks Table */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {isRo ? "Top 20 Parcuri Naționale" : "Top 20 National Parks"}
            </h2>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-mid">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[580px]">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-5 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">Park</th>
                      <th className="px-5 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">State</th>
                      <th className="px-5 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">{isRo ? "Înf." : "Est."}</th>
                      <th className="px-5 py-4 text-right font-body text-xs font-semibold uppercase tracking-widest text-white/40">{isRo ? "Vizite/an" : "Visits/yr"}</th>
                      <th className="px-5 py-4 text-right font-body text-xs font-semibold uppercase tracking-widest text-white/40">{isRo ? "Acri (K)" : "Acres (K)"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ALL_PARKS.map((park, i) => (
                      <tr key={i} className="border-b border-white/5 transition-colors hover:bg-white/3">
                        <td className="px-5 py-3.5 font-body text-sm font-semibold text-white">{park.name}</td>
                        <td className="px-5 py-3.5 font-body text-sm text-white/50">{park.state}</td>
                        <td className="px-5 py-3.5 font-hero text-base text-glory-gold">{park.established}</td>
                        <td className="px-5 py-3.5 text-right font-body text-sm text-white/70">{park.visitors}M</td>
                        <td className="px-5 py-3.5 text-right font-body text-sm text-white/55">{park.area.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="px-5 py-3 text-right font-body text-xs text-white/30">Source: National Park Service 2023</p>
            </div>
          </section>

          {/* System facts */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {isRo ? "Sistemul în Cifre" : "The System by the Numbers"}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PARKS_SYSTEM_FACTS.map((fact) => (
                <FactCard key={fact.id} fact={fact.fact} detail={fact.detail} source={fact.source} color={fact.color} variant="dark" />
              ))}
            </div>
          </section>

          <QuoteBlock
            quote="The national parks are the one thing America has done right that the rest of the world envies. We set aside the best of what we had and said: this belongs to everyone, forever."
            attribution="Wallace Stegner"
            title="Author & Conservationist, Stanford University"
            variant="dark"
          />

          {/* Nav */}
          <div className="flex items-center justify-between border-t border-white/10 pt-8">
            <Link href="/nature" className="font-body text-sm text-white/50 hover:text-white transition-colors">
              ← {isRo ? "Prezentare Generală Natură" : "Nature Overview"}
            </Link>
            <Link href="/nature/alaska" className="font-body text-sm font-semibold text-glory-gold hover:text-glory-gold-dark transition-colors">
              {isRo ? "Alaska →" : "Alaska →"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
