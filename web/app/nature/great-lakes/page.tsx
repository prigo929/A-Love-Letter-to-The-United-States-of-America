// ─── Great Lakes Sub-Page ─────────────────────────────────────────────────────
// No local Great Lakes image — uses high-quality Unsplash aerial of Lake Superior.
//
// Beginner guide:
// - Shared Great Lakes facts and chart data come from lib/data/nature-data.ts
// - The lake detail arrays in this file are page-specific supporting content
// - `GREAT_LAKES_HERO` is split out as a constant so the hero image can be swapped in one place

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  NatStyles,
  NatureSubPageHero,
  AnimatedStatWall,
  HeroTextReveal,
  NatureQuoteBreak,
  NatureFactModule,
} from "@/components/nature/NatureAnimations";

import { GreatLakesChart } from "@/components/data/NatureCharts";
import { getServerLocale } from "@/lib/i18n/server";
import { BLUR_PLACEHOLDER } from "@/lib/utils";
import { GREAT_LAKES_DATA, getGreatLakesFacts } from "@/lib/data/nature-data";
import { SITE_IMAGES } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Great Lakes | Nature",
  description:
    "The Great Lakes — 21% of Earth's surface freshwater, 10,900 miles of coastline, and the economic engine of the Midwest.",
};

const GREAT_LAKES_HERO = SITE_IMAGES.greatLakesChicago;

const LAKES_DETAIL_EN = [
  {
    name: "Superior",
    flag: "🔵",
    area: "31,700 mi²",
    volume: "2,900 mi³",
    depth: "1,332 ft",
    note: "Largest freshwater lake by surface area in the world. So large it creates its own weather systems. Nearly the size of South Carolina.",
    color: "#B22234",
  },
  {
    name: "Michigan",
    flag: "🟦",
    area: "22,400 mi²",
    volume: "1,180 mi³",
    depth: "925 ft",
    note: "The only Great Lake entirely within the United States. Home to Chicago, Milwaukee, and Green Bay. Contains the famous Sleeping Bear Dunes.",
    color: "#3C3B6E",
  },
  {
    name: "Huron",
    flag: "🔷",
    area: "23,000 mi²",
    volume: "850 mi³",
    depth: "750 ft",
    note: "Contains Manitoulin Island — the largest freshwater island in the world. Georgian Bay is sometimes called the 6th Great Lake.",
    color: "#5554A0",
  },
  {
    name: "Erie",
    flag: "🟡",
    area: "9,910 mi²",
    volume: "116 mi³",
    depth: "210 ft",
    note: "Shallowest and most ecologically productive. Niagara Falls flows from Lake Erie into Lake Ontario, dropping 167 feet.",
    color: "#FFD700",
  },
  {
    name: "Ontario",
    flag: "🟠",
    area: "7,340 mi²",
    volume: "393 mi³",
    depth: "802 ft",
    note: "Smallest by surface area but deepest in average depth. Drains via the St. Lawrence River 2,340 miles to the Atlantic Ocean.",
    color: "#CC9900",
  },
];

const LAKES_DETAIL_RO = [
  {
    name: "Superior",
    flag: "🔵",
    area: "82.100 km²",
    volume: "12.000 km³",
    depth: "406 m",
    note: "Cel mai mare lac de apă dulce ca suprafață din lume. Atât de mare încât creează propriile sisteme meteorologice. Aproape la fel de mare ca Carolina de Sud.",
    color: "#B22234",
  },
  {
    name: "Michigan",
    flag: "🟦",
    area: "58.000 km²",
    volume: "4.900 km³",
    depth: "282 m",
    note: "Singurul Lac Mare aflat complet în interiorul Statelor Unite. Chicago, Milwaukee și Green Bay se află pe malurile sale.",
    color: "#3C3B6E",
  },
  {
    name: "Huron",
    flag: "🔷",
    area: "59.600 km²",
    volume: "3.540 km³",
    depth: "229 m",
    note: "Conține Insula Manitoulin — cea mai mare insulă de apă dulce din lume. Golful Georgian este uneori numit al 6-lea Lac Mare.",
    color: "#5554A0",
  },
  {
    name: "Erie",
    flag: "🟡",
    area: "25.700 km²",
    volume: "484 km³",
    depth: "64 m",
    note: "Cel mai puțin adânc și mai productiv ecologic. Cascadele Niagara curg din Lacul Erie în Lacul Ontario, coborând 51 m.",
    color: "#FFD700",
  },
  {
    name: "Ontario",
    flag: "🟠",
    area: "19.000 km²",
    volume: "1.640 km³",
    depth: "244 m",
    note: "Cel mai mic ca suprafață, dar cel mai adânc ca medie. Se varsă prin fluviul St. Lawrence, parcurgând 3.770 km până la Atlantic.",
    color: "#CC9900",
  },
];

const GL_EXTENDED_EN = [
  {
    id: "gl-weather",
    fact: "Lake Superior is so large it generates its own weather systems",
    detail:
      "Lake Superior's 31,700 mi² is large enough to influence regional weather. It moderates shore temperatures, creates lake-effect snowstorms, and generates waves up to 25 feet during storm season.",
    source: "NOAA GLERL",
    color: "gold" as const,
  },
  {
    id: "gl-seaway",
    fact: "The St. Lawrence Seaway allows ocean ships to sail 2,340 miles inland",
    detail:
      "Built jointly by the US and Canada in 1959, the Seaway opened the American heartland to global trade. Ocean vessels can sail from the Atlantic directly to Duluth, Minnesota.",
    source: "St. Lawrence Seaway Development Corp.",
    color: "red" as const,
  },
  {
    id: "gl-drink",
    fact: "The Great Lakes provide drinking water for 30 million Americans",
    detail:
      "Chicago, Detroit, Cleveland, Buffalo, and Milwaukee all draw municipal water from the Great Lakes system — the largest surface freshwater reservoir available to any major urban population.",
    source: "American Water Works Association",
    color: "blue" as const,
  },
  {
    id: "gl-island",
    fact: "Manitoulin Island in Lake Huron is the world's largest freshwater island",
    detail:
      "At 1,068 mi², Manitoulin Island is larger than many US counties. It contains numerous lakes itself — including the world's largest lake on an island in a freshwater lake.",
    source: "Natural Resources Canada",
    color: "gold" as const,
  },
  {
    id: "gl-boating",
    fact: "Freshwater Geography: Seeding a Recreational Boating Civilization",
    detail: "Containing over 20% of Earth's surface freshwater, the Great Lakes region is the epicenter of the American recreational boating civilization. Lake Michigan's shoreline alone exceeds the entire US Atlantic coast, and Michigan, Minnesota, and Wisconsin host over 2.5 million registered boats — demonstrating how massive freshwater geography creates democratization of outdoor leisure.",
    source: "US Coast Guard / National Marine Manufacturers Association 2025",
    color: "blue" as const,
  },
];

const GL_EXTENDED_RO = [
  {
    id: "gl-weather",
    fact: "Lacul Superior este atât de mare încât generează propriile sisteme meteorologice",
    detail:
      "Suprafața de 82.100 km² a Lacului Superior este suficient de mare pentru a influența vremea regională. Moderează temperaturile de pe maluri, creează viscole cu efect lacustru și generate valuri de până la 7,5 m în sezonul furtunos.",
    source: "NOAA GLERL",
    color: "gold" as const,
  },
  {
    id: "gl-seaway",
    fact: "Canalul St. Lawrence permite navelor oceanice să navigheze 3.770 km în interior",
    detail:
      "Construit de SUA și Canada în 1959, canalul a deschis inima americii comerțului global. Navele oceanice pot naviga de la Atlantic direct la Duluth, Minnesota.",
    source: "St. Lawrence Seaway Development Corp.",
    color: "red" as const,
  },
  {
    id: "gl-drink",
    fact: "Marile Lacuri furnizează apă potabilă pentru 30 de milioane de americani",
    detail:
      "Chicago, Detroit, Cleveland, Buffalo și Milwaukee iau apa municipală din sistemul Marilor Lacuri — cea mai mare rezervă de apă dulce de suprafață disponibilă oricărei populații urbane majore.",
    source: "American Water Works Association",
    color: "blue" as const,
  },
  {
    id: "gl-island",
    fact: "Insula Manitoulin din Lacul Huron este cea mai mare insulă de apă dulce din lume",
    detail:
      "Cu 2.766 km², Insula Manitoulin este mai mare decât multe județe americane. Conține numeroase lacuri în interior — inclusiv cel mai mare lac de pe o insulă dintr-un lac de apă dulce din lume.",
    source: "Natural Resources Canada",
    color: "gold" as const,
  },
  {
    id: "gl-boating",
    fact: "Geografia Apei Dulci: Civilizația Navigației de Recreere",
    detail: "Deținând peste 20% din apa dulce de suprafață a lumii, regiunea Marilor Lacuri este epicentrul navigației de agrement din SUA. Linia de coastă a Lacului Michigan depășește întreaga coastă atlantică a SUA, iar state precum Michigan, Minnesota și Wisconsin găzduiesc peste 2,5 milioane de ambarcațiuni înregistrate — demonstrând cum geografia apei dulci democratizează recreerea în aer liber.",
    source: "US Coast Guard / National Marine Manufacturers Association 2025",
    color: "blue" as const,
  },
];

export default async function GreatLakesPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const facts = getGreatLakesFacts(locale);
  const lakes = isRo ? LAKES_DETAIL_RO : LAKES_DETAIL_EN;
  const extFacts = isRo ? GL_EXTENDED_RO : GL_EXTENDED_EN;

  const statWall = [
    {
      value: 21,
      suffix: "%",
      label: isRo ? "Apă Dulce Globală" : "Global Freshwater",
      sub: isRo
        ? "Din toată apa dulce de suprafață"
        : "Of all Earth's surface fresh water",
      color: "#60a5fa",
    },
    {
      value: 10900,
      suffix: " mi",
      label: isRo ? "Mile de Coastă" : "Miles of Coastline",
      sub: isRo
        ? "Mai mult decât Atlantic + Golf"
        : "More than Atlantic + Gulf combined",
      color: "#C4956A",
    },
    {
      value: 94,
      suffix: "K mi²",
      label: isRo ? "Suprafață Totală" : "Total Surface Area",
      sub: isRo
        ? "Mai mare decât Regatul Unit"
        : "Larger than the United Kingdom",
      color: "#60a5fa",
    },
    {
      value: 107,
      suffix: "M",
      label: isRo ? "Oameni în Regiune" : "People in the Region",
      sub: isRo
        ? "8 state SUA + 2 provincii canadiene"
        : "8 US states + 2 Canadian provinces",
      color: "#8B8680",
    },
  ];

  const colorMap = { gold: 'earth' as const, red: 'earth' as const, blue: 'glacier' as const, green: 'forest' as const };

  return (
    <>
      <NatStyles />

      {/* ── HERO — single image cinematic entrance ───────────────────────── */}
      <NatureSubPageHero
        imageSrc={GREAT_LAKES_HERO}
        imageAlt={isRo ? "Marile Lacuri cu Chicago" : "The Great Lakes with Chicago"}
        label={isRo ? "GREAT LAKES · INLAND SEAS" : "GREAT LAKES · INLAND SEAS"}
      >
        <HeroTextReveal
          eyebrow={isRo ? "Marile Lacuri" : "The Great Lakes"}
          line1={isRo ? "MĂRILE INTERIOARE" : "AMERICA'S"}
          line2={isRo ? "ALE AMERICII" : "INLAND SEAS"}
          line2Color="var(--nat-accent-glacier)"
          body={
            isRo
              ? "Cinci lacuri. 21% din toată apa dulce de suprafață a Pământului. 17.560 km de coastă — mai mult decât Atlantic și Golf la un loc. Cel mai mare sistem de apă dulce din lume, în inima Americii."
              : "Five lakes. 21% of all Earth's surface fresh water. 10,900 miles of coastline — more than the Atlantic and Gulf coasts combined. The largest freshwater system in the world, in the heart of America."
          }
        />
      </NatureSubPageHero>

      {/* ── STAT WALL ─────────────────────────────────────────────────────── */}
      <section className="bg-(--nat-void) pb-20 pt-12">
        <div className="mx-auto max-w-[1440px] w-full px-6 md:px-12">
          <AnimatedStatWall stats={statWall} />
        </div>
      </section>

      {/* ── WAVE SECTION + CHART (Containerless) ─────────────────────────── */}
      <section className="bg-(--nat-void)">
        <div className="mx-auto max-w-5xl py-12">
          <p className="nat-text-body text-center max-w-2xl mx-auto mb-12">
            {isRo
              ? "Lacul Superior singur conține mai multă apă dulce decât toate celelalte Lacuri Mari la un loc."
              : "Lake Superior alone contains more fresh water than all the other Great Lakes combined."}
          </p>
          <div className="px-4">
            <GreatLakesChart
              data={GREAT_LAKES_DATA}
              title={
                isRo
                  ? "Volumul Marilor Lacuri"
                  : "Great Lakes Volume"
              }
              subtitle={
                isRo
                  ? "Superior singur depășește celelalte patru"
                  : "Superior alone exceeds the other four combined"
              }
              source="NOAA / Great Lakes Commission"
            />
          </div>
        </div>
      </section>

      {/* ── CONTENT ───────────────────────────────────────────────────────── */}
      <div className="bg-(--nat-void) pb-32">
        <div className="mx-auto max-w-[1440px] w-full px-6 md:px-12 space-y-32">

          {/* Lakes showcase borderless list */}
          <section className="max-w-5xl mx-auto">
            <h2 className="nat-text-section text-white mb-10">
              {isRo ? "Fiecare Lac în Parte" : "Each Lake in Detail"}
            </h2>
            <div className="space-y-8 border-t border-white/4 pt-8">
              {lakes.map((lake) => (
                <div key={lake.name} className="border-b border-white/4 pb-8 last:border-0 flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex-1 max-w-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl">{lake.flag}</span>
                      <h3 className="text-xl font-semibold text-white tracking-wide">
                        {isRo ? "Lacul" : "Lake"} {lake.name}
                      </h3>
                    </div>
                    <p className="nat-text-body">{lake.note}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-10 shrink-0 md:w-[400px] mt-1">
                    {[
                      { label: isRo ? "Suprafață" : "Area", value: lake.area },
                      { label: isRo ? "Volum" : "Volume", value: lake.volume },
                      { label: isRo ? "Ad. Max." : "Max Depth", value: lake.depth },
                    ].map((s) => (
                      <div key={s.label} className="text-right sm:text-left">
                        <p className="font-hero text-2xl md:text-3xl whitespace-nowrap" style={{ color: 'var(--nat-accent-glacier)' }}>{s.value}</p>
                        <p className="nat-text-metadata text-white/40 mt-1 uppercase tracking-tighter">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Water Security containerless block */}
          <section className="max-w-5xl mx-auto border-t border-b border-white/4 py-16">
            <p className="nat-text-metadata mb-2 uppercase tracking-widest" style={{ color: 'var(--nat-accent-glacier)' }}>
              {isRo ? "Securitate Hidrologică" : "Water Security"}
            </p>
            <h2 className="nat-text-section text-white mb-6">
              {isRo
                ? "Cel Mai Valoros Bun Natural al Americii"
                : "America's Most Valuable Natural Asset"}
            </h2>
            <p className="nat-text-body mb-8">
              {isRo
                ? "Într-o lume în care apa dulce devine din ce în ce mai rară, Marile Lacuri reprezintă un avantaj strategic fără precedent. 6 cvadriliane de galoane de apă dulce ce alimentează 30 de milioane de americani și susțin o economie regională de 6 trilioane de dolari."
                : "In a world where fresh water is increasingly scarce, the Great Lakes represent an unparalleled strategic advantage — 6 quadrillion gallons supplying 30 million Americans and sustaining a $6 trillion regional economy."}
            </p>
            <div className="grid grid-cols-2 gap-12 pt-8 border-t border-white/4">
              <div>
                <p className="text-5xl md:text-6xl font-black tracking-tight uppercase" style={{ color: 'var(--nat-accent-glacier)', fontFamily: 'var(--font-archivo)' }}>30M</p>
                <p className="nat-text-metadata text-white/40 mt-2 uppercase tracking-wider">
                  {isRo ? "Americani aprovizionați" : "Americans supplied"}
                </p>
              </div>
              <div>
                <p className="text-5xl md:text-6xl font-black tracking-tight uppercase" style={{ color: 'var(--nat-accent-glacier)', fontFamily: 'var(--font-archivo)' }}>$6T</p>
                <p className="nat-text-metadata text-white/40 mt-2 uppercase tracking-wider">
                  {isRo ? "Output economic regional" : "Regional economic output"}
                </p>
              </div>
            </div>
          </section>

          {/* Facts list as NatureFactModules */}
          <section className="max-w-5xl mx-auto">
            <h2 className="nat-text-section text-white mb-16">{isRo ? "În Detaliu" : "In Detail"}</h2>
            <div>
              {[...facts, ...extFacts].map((fact) => (
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
            quote={
              isRo
                ? "Marile Lacuri sunt un cadou pe care majoritatea americanilor îl iau de-a gata. O cincime din apa dulce a lumii, în inima celei mai puternice națiuni de pe Pământ."
                : "The Great Lakes are a gift that most Americans take for granted. One-fifth of the world's fresh water, sitting in the heartland of the most powerful nation on Earth."
            }
            attribution="David Dempsey"
            title={
              isRo
                ? "Autor, On the Brink: The Great Lakes in the 21st Century"
                : "Author, On the Brink: The Great Lakes in the 21st Century"
            }
          />

          {/* Sub-page Navigation Footer */}
          <div className="flex items-center justify-between border-t border-white/4 pt-12 max-w-5xl mx-auto">
            <Link
              href="/nature/rockies"
              className="nat-text-label text-white/40 hover:text-white transition-colors"
            >
              ← {isRo ? "Munții Stâncoși" : "Rocky Mountains"}
            </Link>
            <Link
              href="/nature/national-parks"
              className="nat-text-label text-white/40 hover:text-white transition-colors"
              style={{ color: 'var(--nat-accent-glacier)' }}
            >
              {isRo ? "Parcuri Naționale →" : "National Parks →"}
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
