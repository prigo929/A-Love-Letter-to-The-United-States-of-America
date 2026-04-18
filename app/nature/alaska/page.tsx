// ─── Alaska Sub-Page ──────────────────────────────────────────────────────────

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { FactCard }   from "@/components/sections/FactCard";
import { StatCard }   from "@/components/sections/StatCard";
import { QuoteBlock } from "@/components/sections/QuoteBlock";
import { getServerLocale } from "@/lib/i18n/server";
import { BLUR_PLACEHOLDER } from "@/lib/utils";
import { getAlaskaFacts }    from "@/lib/data/nature-data";

export const metadata: Metadata = {
  title: "Alaska | Nature | America: The Greatest Nation",
  description:
    "Alaska — 663,268 square miles, Denali at 20,310 ft, 100,000 glaciers, 3 million lakes, the aurora borealis, and the greatest concentration of wilderness remaining on Earth.",
  alternates: { canonical: "/nature/alaska" },
};

const ALASKA_STATS = [
  { id: "area",     value: 663,  suffix: "K mi²", label: "Total Area",            description: "2.5× the size of Texas",               source: "US Census Bureau",       color: "gold"  as const },
  { id: "denali",   value: 20310,                  label: "Denali Elevation (ft)", description: "Highest peak in North America",         source: "USGS",                   color: "gold"  as const },
  { id: "glaciers", value: 100,  suffix: "K+",     label: "Glaciers",              description: "More than rest of world outside poles", source: "NSIDC",                  color: "white" as const },
  { id: "lakes",    value: 3,    suffix: "M+",     label: "Lakes",                 description: "More lakes than all other states combined", source: "USGS",              color: "white" as const },
];

const ALASKA_WILDLIFE = [
  { animal: "Brown / Grizzly Bears", count: "30,000+", note: "70% of all US brown bears" },
  { animal: "Caribou",               count: "750,000+", note: "Several major herds crossing the state" },
  { animal: "Moose",                 count: "175,000+", note: "Largest moose population in the US" },
  { animal: "Black Bears",           count: "100,000+", note: "Distributed throughout forested areas" },
  { animal: "Dall Sheep",            count: "50,000+",  note: "Found in Alaska's mountain ranges" },
  { animal: "Wolves",                count: "7,000–11,000", note: "Largest wolf population in the US" },
  { animal: "Bald Eagles",           count: "30,000+", note: "Half of all bald eagles in the US" },
  { animal: "Seabirds (nesting)",    count: "50M+",    note: "One of the greatest seabird rookeries on Earth" },
];

const ALASKA_EXTENDED_FACTS = [
  {
    id: "ak-size-compare",
    fact: "Alaska is larger than the next three largest US states combined",
    detail: "Texas (268,596 mi²) + California (163,696 mi²) + Montana (147,040 mi²) = 579,332 mi². Alaska at 663,268 mi² is bigger than all three combined, plus there is room left over.",
    source: "US Census Bureau",
    color: "gold" as const,
  },
  {
    id: "ak-coastline",
    fact: "Alaska has more coastline than the rest of the US combined",
    detail: "Alaska's 33,904 miles of tidal shoreline represent more coastal length than all other US states combined — fjords, sea stacks, glacial inlets, and beaches of breathtaking remoteness.",
    source: "NOAA",
    color: "red" as const,
  },
  {
    id: "ak-midnight-sun",
    fact: "Fairbanks, Alaska receives 22 hours of daylight on the summer solstice",
    detail: "Above the Arctic Circle, the sun doesn't set for weeks in summer. At Barrow (Utqiaġvik), the sun doesn't set for 82 consecutive days. In winter, the same areas experience weeks of polar night — compensated by the Northern Lights.",
    source: "NOAA / Alaska Observatory",
    color: "blue" as const,
  },
  {
    id: "ak-oil",
    fact: "Alaska's North Slope is one of the largest oil fields in North American history",
    detail: "Prudhoe Bay on the North Slope has produced over 13 billion barrels of oil since discovery in 1968, connected to the lower 48 states via the 800-mile Trans-Alaska Pipeline — an engineering marvel across permafrost and three mountain ranges.",
    source: "Alaska Department of Natural Resources",
    color: "gold" as const,
  },
  {
    id: "ak-parks",
    fact: "Alaska contains 8 national parks, 16 wildlife refuges, and 2 national monuments",
    detail: "Denali, Wrangell–St. Elias (larger than Switzerland), Kenai Fjords, Glacier Bay, Katmai, Lake Clark, Gates of the Arctic (above the Arctic Circle), and Kobuk Valley. Over half of all US national park acreage is in Alaska.",
    source: "National Park Service",
    color: "red" as const,
  },
  {
    id: "ak-aurora",
    fact: "Fairbanks is one of the world's top destinations for witnessing the Northern Lights",
    detail: "Located directly under the auroral oval, Fairbanks offers some of the world's most reliable aurora viewing. The Geophysical Institute at the University of Alaska Fairbanks has studied auroras since 1903 — the longest continuous aurora research program on Earth.",
    source: "UAF Geophysical Institute",
    color: "blue" as const,
  },
];

export default async function AlaskaPage() {
  const locale  = await getServerLocale();
  const isRo    = locale === "ro";
  const facts   = getAlaskaFacts(locale);

  return (
    <>
      {/* Hero */}
      <div className="relative bg-navy-dark pt-28 pb-16">
        <Image
          src="https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=1920&auto=format&fit=crop"
          alt="Aurora borealis over the Alaskan wilderness"
          fill
          className="object-cover opacity-35"
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
              { label: "Alaska" },
            ]}
            className="mb-8"
          />
          <p className="mb-4 section-eyebrow">Alaska</p>
          <h1 className="mb-4 font-hero text-6xl text-white sm:text-7xl">
            THE LAST<br />
            <span className="text-blue-400">FRONTIER</span>
          </h1>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-white/65">
            {isRo
              ? "663.268 de mile pătrate de sălbăticie arctică, păduri boreale, ghețari impunători, fiorduri spectaculoase și animale sălbatice ce nu pot fi văzute nicăieri altundeva în lume. Alaska nu este doar un stat — este o altă lume."
              : "663,268 square miles of Arctic wilderness, boreal forests, towering glaciers, spectacular fjords, and wildlife found nowhere else on Earth. Alaska is not merely a state — it is another world."}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-navy-dark">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">

          {/* Stats */}
          <section>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {ALASKA_STATS.map((stat) => (
                <StatCard
                  key={stat.id}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  description={stat.description}
                  source={stat.source}
                  variant={stat.color === "gold" ? "gold" : "dark"}
                />
              ))}
            </div>
          </section>

          {/* Denali feature */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {isRo ? "Denali — Cel Mai Înalt Vârf din America de Nord" : "Denali — North America's Highest Peak"}
            </h2>
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <p className="mb-5 font-body text-lg leading-relaxed text-white/70">
                  {isRo
                    ? "La 6.194 de metri deasupra nivelului mării, Denali este cel mai înalt vârf din America de Nord. Dar ceea ce îl face cu adevărat extraordinar este drama sa: din câmpiile interioare ale Alaskăi, muntele se ridică cu aproape 5.500 de metri deasupra terenului înconjurător — mai mult decât Everest deasupra platoului tibetan."
                    : "At 20,310 feet above sea level, Denali is the highest peak in North America. But what makes it truly extraordinary is its drama: from Alaska's interior plains, the mountain rises nearly 18,000 feet above the surrounding terrain — more than Everest above the Tibetan plateau."}
                </p>
                <p className="mb-5 font-body text-lg leading-relaxed text-white/70">
                  {isRo
                    ? "Parcul național Denali, la 6 milioane de acri, înconjoară muntele într-o zonă sălbatică mai mare decât întregul New Hampshire. Un singur drum, 92 de mile, se aventurează în parc — o decizie deliberată de a păstra sălbăticia neîmblânzită."
                    : "Denali National Park, at 6 million acres, surrounds the mountain in a wilderness larger than the entire state of New Hampshire. A single road, 92 miles long, ventures into the park — a deliberate decision to keep the wilderness untamed."}
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: "20,310 ft", label: isRo ? "Altitudine" : "Elevation" },
                    { value: "~18,000 ft",label: isRo ? "Ridicare bază-vârf" : "Base-to-Summit Rise" },
                    { value: "6M acres",  label: isRo ? "Parc Național" : "National Park" },
                  ].map((s) => (
                    <div key={s.value} className="rounded-xl border border-white/10 bg-navy-mid p-3 text-center">
                      <p className="font-hero text-xl text-glory-gold">{s.value}</p>
                      <p className="font-body text-xs text-white/45">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-[360px] overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1508193638397-1c4234db14d8?q=80&w=900&auto=format&fit=crop"
                  alt="Denali mountain reflected in a glacial lake, Alaska"
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                />
              </div>
            </div>
          </section>

          {/* Wildlife table */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {isRo ? "Fauna Sălbatică din Alaska" : "Alaska's Wildlife"}
            </h2>
            <p className="mb-8 font-body text-lg text-white/65 leading-relaxed">
              {isRo
                ? "Alaska găzduiește concentrații de animale sălbatice care nu mai există nicăieri altundeva în lumea modernă. Este o geamănat cu Africa acum mii de ani."
                : "Alaska harbors concentrations of wildlife that no longer exist anywhere else in the modern world. It is a glimpse of what North America looked like thousands of years ago."}
            </p>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-mid">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-5 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">{isRo ? "Animal" : "Animal"}</th>
                    <th className="px-5 py-4 text-right font-body text-xs font-semibold uppercase tracking-widest text-white/40">{isRo ? "Estimare Populație" : "Est. Population"}</th>
                    <th className="px-5 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">{isRo ? "Notă" : "Note"}</th>
                  </tr>
                </thead>
                <tbody>
                  {ALASKA_WILDLIFE.map((item, i) => (
                    <tr key={i} className="border-b border-white/5 transition-colors hover:bg-white/3">
                      <td className="px-5 py-3.5 font-body text-sm font-semibold text-white">{item.animal}</td>
                      <td className="px-5 py-3.5 text-right font-hero text-lg text-glory-gold">{item.count}</td>
                      <td className="px-5 py-3.5 font-body text-sm italic text-white/45">{item.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="px-5 py-3 text-right font-body text-xs text-white/30">Source: Alaska Dept. of Fish & Game 2024</p>
            </div>
          </section>

          {/* Glaciers image feature */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {isRo ? "O Lume de Gheață" : "A World of Ice"}
            </h2>
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop"
                alt="Hubbard Glacier calving into Yakutat Bay, Alaska"
                width={1200}
                height={500}
                className="h-[300px] w-full object-cover md:h-[420px]"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/75 to-transparent" />
              <div className="absolute inset-0 flex items-center px-8">
                <div className="max-w-sm">
                  <p className="mb-2 font-hero text-5xl text-blue-300">100,000</p>
                  <p className="font-body text-lg text-white/80">
                    {isRo
                      ? "Ghețari acoperind 5% din suprafața Alaskăi — mai multă gheață glaciară decât restul lumii în afara calotelor polare"
                      : "Glaciers covering 5% of Alaska's surface — more glacial ice than the rest of the world outside the polar caps"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Facts */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {isRo ? "Alaska în Cifre" : "Alaska by the Numbers"}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[...facts, ...ALASKA_EXTENDED_FACTS].map((fact) => (
                <FactCard key={fact.id} fact={fact.fact} detail={fact.detail} source={fact.source} color={fact.color} variant="dark" />
              ))}
            </div>
          </section>

          <QuoteBlock
            quote="Alaska is not a place on the edge of anywhere. Alaska is the center of everything — the last great wilderness, the last frontier of the last great country."
            attribution="Joe Vogler"
            title="Alaskan Independence Advocate & Frontier Pioneer"
            variant="dark"
          />

          {/* Nav */}
          <div className="flex items-center justify-between border-t border-white/10 pt-8">
            <Link href="/nature/national-parks" className="font-body text-sm text-white/50 hover:text-white transition-colors">
              ← {isRo ? "Parcuri Naționale" : "National Parks"}
            </Link>
            <Link href="/nature/rockies" className="font-body text-sm font-semibold text-glory-gold hover:text-glory-gold-dark transition-colors">
              {isRo ? "Munții Stâncoși →" : "Rocky Mountains →"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
