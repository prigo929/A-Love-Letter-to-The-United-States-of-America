// ─── Great Lakes Sub-Page ─────────────────────────────────────────────────────
// No local Great Lakes image — uses high-quality Unsplash aerial of Lake Superior.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { FactCard } from "@/components/sections/FactCard";
import { QuoteBlock } from "@/components/sections/QuoteBlock";
import {
  WaveSection,
  AnimatedStatWall,
  HeroTextReveal,
} from "@/components/nature/NatureAnimations";
import { GreatLakesChart } from "@/components/data/NatureCharts";
import { getServerLocale } from "@/lib/i18n/server";
import { BLUR_PLACEHOLDER } from "@/lib/utils";
import { GREAT_LAKES_DATA, getGreatLakesFacts } from "@/lib/data/nature-data";
import { SITE_IMAGES } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Great Lakes | Nature | America: The Greatest Nation",
  description:
    "The Great Lakes — 21% of Earth's surface freshwater, 10,900 miles of coastline, and the economic engine of the Midwest.",
};

// Local image of Great Lakes with Chicago
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
      color: "#38bdf8",
    },
    {
      value: 10900,
      suffix: " mi",
      label: isRo ? "Mile de Coastă" : "Miles of Coastline",
      sub: isRo
        ? "Mai mult decât Atlantic + Golf"
        : "More than Atlantic + Gulf combined",
      color: "#FFD700",
    },
    {
      value: 94,
      suffix: "K mi²",
      label: isRo ? "Suprafață Totală" : "Total Surface Area",
      sub: isRo
        ? "Mai mare decât Regatul Unit"
        : "Larger than the United Kingdom",
      color: "#38bdf8",
    },
    {
      value: 107,
      suffix: "M",
      label: isRo ? "Oameni în Regiune" : "People in the Region",
      sub: isRo
        ? "8 state SUA + 2 provincii canadiene"
        : "8 US states + 2 Canadian provinces",
      color: "#4ade80",
    },
  ];

  return (
    <>
      <div className="relative bg-navy-dark pt-28 pb-20 overflow-hidden">
        <Image
          src={GREAT_LAKES_HERO}
          alt={
            isRo ? "Marile Lacuri cu Chicago" : "The Great Lakes with Chicago"
          }
          fill
          className="object-cover opacity-50"
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
        />

        {/* 1. Main top-to-bottom dark overlay (Darkened) */}
        <div className="absolute inset-0 bg-linear-to-b from-navy-dark/90 via-navy-dark/60 to-transparent" />

        {/* 2. The glowing radial gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 100%,rgba(56,189,248,.12) 0%,transparent 70%)",
          }}
        />

        {/* 3. The seamless bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-navy-dark via-navy-dark/90 to-transparent pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: isRo ? "Natură" : "Nature", href: "/nature" },
              { label: isRo ? "Marile Lacuri" : "Great Lakes" },
            ]}
            className="mb-8"
          />
          <HeroTextReveal
            eyebrow={isRo ? "Marile Lacuri" : "The Great Lakes"}
            line1={isRo ? "MĂRILE INTERIOARE" : "AMERICA'S"}
            line2={isRo ? "ALE AMERICII" : "INLAND SEAS"}
            line2Color="#38bdf8"
            body={
              isRo
                ? "Cinci lacuri. 21% din toată apa dulce de suprafață a Pământului. 17.560 km de coastă — mai mult decât Atlantic și Golf la un loc. Cel mai mare sistem de apă dulce din lume, în inima Americii."
                : "Five lakes. 21% of all Earth's surface fresh water. 10,900 miles of coastline — more than the Atlantic and Gulf coasts combined. The largest freshwater system in the world, in the heart of America."
            }
          >
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-sky-400/25 bg-sky-900/20 px-5 py-2.5 backdrop-blur-sm">
              <span className="text-xl">💧</span>
              <span className="font-body text-sm text-sky-300">
                {isRo
                  ? "6 cvadriliane de galoane de apă dulce"
                  : "6 quadrillion gallons of fresh water"}
              </span>
            </div>
          </HeroTextReveal>
        </div>
      </div>

      <section className="bg-navy-dark px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedStatWall stats={statWall} />
        </div>
      </section>

      <WaveSection color="#050e1a">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 font-display text-h2 text-white text-center">
            {isRo ? "Volumul Lacurilor" : "Lake Volumes"}
          </h2>
          <p className="mb-8 font-body text-center text-white/55 max-w-2xl mx-auto">
            {isRo
              ? "Lacul Superior singur conține mai multă apă dulce decât toate celelalte Lacuri Mari la un loc."
              : "Lake Superior alone contains more fresh water than all the other Great Lakes combined."}
          </p>
          <div className="rounded-2xl border border-sky-500/15 bg-navy-mid/80 p-6 md:p-8 backdrop-blur-sm">
            <GreatLakesChart
              data={GREAT_LAKES_DATA}
              title={
                isRo
                  ? "Volumul Marilor Lacuri (mile cubice)"
                  : "Great Lakes Volume (cubic miles)"
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
      </WaveSection>

      <div className="bg-navy-dark">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {isRo ? "Fiecare Lac în Parte" : "Each Lake in Detail"}
            </h2>
            <div className="space-y-4">
              {lakes.map((lake) => (
                <div
                  key={lake.name}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-navy-mid transition-all hover:border-sky-500/30"
                >
                  <div
                    className="h-1.5 w-full"
                    style={{ backgroundColor: lake.color }}
                  />
                  <div className="flex flex-wrap items-start justify-between gap-4 p-5">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2.5 mb-1">
                        <span className="text-xl">{lake.flag}</span>
                        <h3 className="font-display text-xl font-semibold text-white">
                          {isRo ? "Lacul" : "Lake"} {lake.name}
                        </h3>
                      </div>
                      <p className="font-body text-sm leading-relaxed text-white/55 max-w-lg">
                        {lake.note}
                      </p>
                    </div>
                    <div className="flex gap-3 shrink-0">
                      {[
                        {
                          label: isRo ? "Suprafață" : "Area",
                          value: lake.area,
                        },
                        {
                          label: isRo ? "Volum" : "Volume",
                          value: lake.volume,
                        },
                        {
                          label: isRo ? "Ad. Max." : "Max Depth",
                          value: lake.depth,
                        },
                      ].map((s) => (
                        <div
                          key={s.label}
                          className="rounded-lg border border-white/8 bg-white/5 px-3 py-2 text-center min-w-20"
                        >
                          <p className="font-hero text-base text-sky-300">
                            {s.value}
                          </p>
                          <p className="font-body text-[10px] text-white/40">
                            {s.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-sky-500/20 bg-linear-to-br from-navy-mid to-[#050e1a]">
            <div className="p-8">
              <p className="mb-2 section-eyebrow">
                {isRo ? "Securitate Hidrologică" : "Water Security"}
              </p>
              <h2 className="mb-4 font-display text-2xl font-bold text-white">
                {isRo
                  ? "Cel Mai Valoros Bun Natural al Americii"
                  : "America's Most Valuable Natural Asset"}
              </h2>
              <p className="font-body text-base leading-relaxed text-white/65 mb-5">
                {isRo
                  ? "Într-o lume în care apa dulce devine din ce în ce mai rară, Marile Lacuri reprezintă un avantaj strategic fără precedent. 6 cvadriliane de galoane de apă dulce ce alimentează 30 de milioane de americani și susțin o economie regională de 6 trilioane de dolari."
                  : "In a world where fresh water is increasingly scarce, the Great Lakes represent an unparalleled strategic advantage — 6 quadrillion gallons supplying 30 million Americans and sustaining a $6 trillion regional economy."}
              </p>
              <div className="grid grid-cols-2 gap-4 max-w-xs">
                <div className="rounded-xl border border-sky-500/20 bg-sky-900/20 p-3 text-center">
                  <p className="font-hero text-2xl text-sky-300">30M</p>
                  <p className="font-body text-xs text-white/50">
                    {isRo ? "Americani aprovizionați" : "Americans supplied"}
                  </p>
                </div>
                <div className="rounded-xl border border-sky-500/20 bg-sky-900/20 p-3 text-center">
                  <p className="font-hero text-2xl text-sky-300">$6T</p>
                  <p className="font-body text-xs text-white/50">
                    {isRo
                      ? "Output economic regional"
                      : "Regional economic output"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {isRo ? "Marile Lacuri în Cifre" : "Great Lakes by the Numbers"}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[...facts, ...extFacts].map((fact) => (
                <FactCard
                  key={fact.id}
                  fact={fact.fact}
                  detail={fact.detail}
                  source={fact.source}
                  color={fact.color}
                  variant="dark"
                />
              ))}
            </div>
          </section>

          <QuoteBlock
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
            variant="dark"
          />

          <div className="flex items-center justify-between border-t border-white/10 pt-8">
            <Link
              href="/nature/yellowstone"
              className="font-body text-sm text-white/50 hover:text-white transition-colors"
            >
              ← Yellowstone
            </Link>
            <Link
              href="/nature"
              className="font-body text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors"
            >
              ↑ {isRo ? "Prezentare Generală" : "Nature Overview"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
