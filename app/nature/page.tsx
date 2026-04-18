// ─── Nature & Geography Main Page ────────────────────────────────────────────
// Phase 4: Full Nature section landing page.
// Hero + overview + sub-region grid + park highlights + charts + quotes.
// Server Component — chart/animation leaves are client-only.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Breadcrumb }    from "@/components/layout/Breadcrumb";
import { StatCard }      from "@/components/sections/StatCard";
import { FactCard }      from "@/components/sections/FactCard";
import { QuoteBlock }    from "@/components/sections/QuoteBlock";
import { ParkVisitorsChart, BiodiversityChart } from "@/components/data/NatureCharts";
import { getServerLocale } from "@/lib/i18n/server";
import { SITE_IMAGES }   from "@/lib/site-images";
import { BLUR_PLACEHOLDER } from "@/lib/utils";

import {
  TOP_PARKS_VISITORS,
  BIODIVERSITY_BY_COUNTRY,
  FEATURED_PARKS,
  NATURE_REGIONS,
  getNatureHeroStats,
  getNatureOverviewParagraphs,
  getNatureOverviewFacts,
  getNatureSubPages,
  getNatureQuotes,
} from "@/lib/data/nature-data";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Nature & Geography | America: The Greatest Nation",
  description:
    "From Arctic Alaska to tropical Hawaii — no nation on Earth possesses such extraordinary diversity of natural wonders. 63 national parks, the Great Lakes, Yellowstone, the Grand Canyon, and more.",
  alternates: { canonical: "/nature" },
  openGraph: {
    title: "America the Beautiful — Nature & Geography",
    description:
      "63 national parks, 85 million protected acres, 21% of Earth's freshwater, and landscapes found nowhere else on the planet.",
    url: "/nature",
    images: [
      {
        url: SITE_IMAGES.homeGrandCanyon,
        width: 1200,
        height: 630,
        alt: "Grand Canyon — one of America's greatest natural wonders",
      },
    ],
  },
};

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "America the Beautiful — Nature & Geography",
  description:
    "A deep dive into the extraordinary natural diversity of the United States: national parks, Alaska, the Rockies, the Grand Canyon, Yellowstone, and the Great Lakes.",
  url: "https://americagreatest.com/nature",
  author: { "@type": "Organization", name: "America: The Greatest Nation" },
};

// ─── TOC ──────────────────────────────────────────────────────────────────────

const TOC_ITEMS = [
  { label: "Overview",         href: "#overview"      },
  { label: "National Parks",   href: "#parks"         },
  { label: "Featured Parks",   href: "#featured"      },
  { label: "Biodiversity",     href: "#biodiversity"  },
  { label: "Regional Wonders", href: "#regions"       },
  { label: "Deep Dives",       href: "#sub-pages"     },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function NaturePage() {
  const locale = await getServerLocale();

  const heroStats    = getNatureHeroStats(locale);
  const paragraphs   = getNatureOverviewParagraphs(locale);
  const facts        = getNatureOverviewFacts(locale);
  const subPages     = getNatureSubPages(locale);
  const quotes       = getNatureQuotes(locale);

  const isRo = locale === "ro";
  const breadcrumbLabel = isRo ? "Natură" : "Nature";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <NatureHero isRo={isRo} />

      {/* ── Main layout: sticky TOC + content ─────────────────────────────── */}
      <div className="relative bg-navy-dark">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12 xl:grid-cols-[260px_1fr]">

            {/* Sticky TOC — desktop only */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 py-16">
                <p className="mb-4 font-body text-xs font-semibold uppercase tracking-widest text-glory-gold">
                  {isRo ? "Cuprins" : "Contents"}
                </p>
                <nav aria-label={isRo ? "Cuprins pagina Natură" : "Nature page contents"}>
                  <ul className="space-y-1">
                    {TOC_ITEMS.map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          className="block rounded-lg px-3 py-2 font-body text-sm text-white/50 transition-colors hover:bg-white/5 hover:text-white"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Quick stat box */}
                <div className="mt-10 rounded-2xl border border-green-500/20 bg-green-900/10 p-4">
                  <p className="font-hero text-4xl text-green-400">63</p>
                  <p className="mt-1 font-body text-xs text-white/50">
                    {isRo ? "Parcuri Naționale" : "National Parks"}
                  </p>
                  <p className="mt-2 font-body text-xs text-green-400">
                    {isRo ? "85 milioane acri protejați" : "85 million acres protected"}
                  </p>
                </div>
              </div>
            </aside>

            {/* Main content */}
            <main className="min-w-0 py-16">

              <Breadcrumb items={[{ label: breadcrumbLabel }]} className="mb-8" />

              {/* ── Section 1: Overview ──────────────────────────────────── */}
              <section id="overview" className="mb-20 scroll-mt-24">
                <p className="section-eyebrow">
                  {isRo ? "Faza 4 — Natură și Geografie" : "Phase 4 — Nature & Geography"}
                </p>
                <h1 className="mb-6 font-display text-h1 text-white">
                  {isRo ? "America cea Frumoasă" : "America the Beautiful"}
                </h1>

                {paragraphs.map((para, i) => (
                  <p key={i} className="mb-5 font-body text-lg leading-relaxed text-white/70">
                    {para}
                  </p>
                ))}

                {/* Hero stat cards */}
                <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {heroStats.map((stat) => (
                    <StatCard
                      key={stat.id}
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                      label={stat.label}
                      description={stat.description}
                      source={stat.source}
                      variant={stat.color === "gold" ? "gold" : "dark"}
                    />
                  ))}
                </div>
              </section>

              {/* ── Section 2: National Parks Overview ──────────────────── */}
              <section id="parks" className="mb-20 scroll-mt-24">
                <div className="mb-8 border-l-4 border-green-500 pl-5">
                  <p className="section-eyebrow">
                    {isRo ? "Sistemul Parcurilor Naționale" : "The National Parks System"}
                  </p>
                  <h2 className="font-display text-h2 text-white">
                    {isRo ? "Cea Mai Bună Idee a Americii" : "The Best Idea America Ever Had"}
                  </h2>
                </div>

                <p className="mb-6 font-body text-lg leading-relaxed text-white/70">
                  {isRo
                    ? "Când Theodore Roosevelt a vizitat Grand Canyon în 1903, a declarat: 'Nu faceți nimic pentru a-l deteriora. Nu-l puteți îmbunătăți. Singurul lucru pe care îl puteți face este să-l lăsați în seama celor ce vin după voi.' Acea filosofie — că frumusețea naturală aparține tuturor americanilor, acum și pentru totdeauna — a dat naștere celui mai mare și mai influent sistem de conservare a naturii din istoria lumii."
                    : "When Theodore Roosevelt visited the Grand Canyon in 1903, he declared: 'Do nothing to mar its grandeur. You cannot improve on it. The ages have been at work on it, and man can only mar it. Keep it for your children and your children's children.' That philosophy — that natural beauty belongs to all Americans, now and forever — gave birth to the greatest conservation system in the history of the world."}
                </p>
                <p className="mb-8 font-body text-lg leading-relaxed text-white/70">
                  {isRo
                    ? "Astăzi, 63 de parcuri naționale protejează 85 de milioane de acri din peisajul american — de la Everglades subtropicale la Denali arctic, de la vulcanii Hawaii până la stâncile stâncoase ale Acadiei. Sistemul NPS include 423 de situri totale, de la câmpuri de bătălie la monumente, de la maluri de mare la situri istorice naționale."
                    : "Today, 63 national parks protect 85 million acres of the American landscape — from the subtropical Everglades to arctic Denali, from Hawaii's volcanoes to Maine's rocky shores at Acadia. The NPS system includes 423 total sites, from battlefields to monuments, seashores to national historic sites."}
                </p>

                {/* Visitor chart */}
                <div className="rounded-2xl border border-white/10 bg-navy-mid p-6 md:p-8">
                  <ParkVisitorsChart
                    data={TOP_PARKS_VISITORS}
                    title={isRo ? "Cele Mai Vizitate Parcuri Naționale (2023)" : "Most Visited National Parks (2023)"}
                    subtitle={isRo ? "Vizite anuale în milioane" : "Annual visits in millions"}
                    source="National Park Service 2023"
                  />
                </div>

                {/* Overview facts */}
                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {facts.slice(0, 3).map((fact) => (
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

              {/* ── Quote 1 ──────────────────────────────────────────────── */}
              <QuoteBlock
                quote={quotes[0].quote}
                attribution={quotes[0].attribution}
                title={quotes[0].title}
              />

              {/* ── Section 3: Featured Parks ────────────────────────────── */}
              <section id="featured" className="mb-20 scroll-mt-24">
                <div className="mb-8 border-l-4 border-glory-gold pl-5">
                  <p className="section-eyebrow">
                    {isRo ? "Parcuri de Referință" : "Landmark Parks"}
                  </p>
                  <h2 className="font-display text-h2 text-white">
                    {isRo ? "Bijuteriile Coroanei" : "Crown Jewels of the Republic"}
                  </h2>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {FEATURED_PARKS.map((park) => (
                    <div
                      key={park.name}
                      className="group overflow-hidden rounded-2xl border border-white/10 bg-navy-mid transition-all hover:border-glory-gold/30 hover:shadow-[0_0_30px_rgba(255,215,0,0.08)]"
                    >
                      {/* Image */}
                      <div className="relative h-44 overflow-hidden">
                        <Image
                          src={park.imageSrc}
                          alt={park.imageAlt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                          placeholder="blur"
                          blurDataURL={BLUR_PLACEHOLDER}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-mid via-navy-mid/20 to-transparent" />
                        <span className="absolute right-3 top-3 rounded-full bg-navy-dark/80 px-2.5 py-1 font-body text-xs text-glory-gold backdrop-blur-sm">
                          Est. {park.established}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="mb-1 flex items-start justify-between gap-2">
                          <h3 className="font-display text-lg font-semibold text-white transition-colors group-hover:text-glory-gold">
                            {park.name}
                          </h3>
                          <span className="shrink-0 font-body text-xs text-white/40">
                            {park.state}
                          </span>
                        </div>
                        <p className="mb-3 font-body text-xs italic text-white/45">
                          {park.highlight}
                        </p>
                        <div className="flex gap-4 border-t border-white/8 pt-3">
                          <div>
                            <p className="font-hero text-xl text-glory-gold">
                              {park.visitors}M
                            </p>
                            <p className="font-body text-xs text-white/40">
                              {isRo ? "Vizite/an" : "Visits/yr"}
                            </p>
                          </div>
                          <div>
                            <p className="font-hero text-xl text-white">
                              {park.area.toLocaleString()}K
                            </p>
                            <p className="font-body text-xs text-white/40">
                              {isRo ? "Acri" : "Acres"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <Link
                    href="/nature/national-parks"
                    className="inline-flex items-center gap-2 font-body text-sm font-semibold text-glory-gold transition-colors hover:text-glory-gold-dark"
                  >
                    {isRo ? "Toate parcurile naționale →" : "All National Parks →"}
                  </Link>
                </div>
              </section>

              {/* ── Section 4: Biodiversity ──────────────────────────────── */}
              <section id="biodiversity" className="mb-20 scroll-mt-24">
                <div className="mb-8 border-l-4 border-glory-red pl-5">
                  <p className="section-eyebrow">
                    {isRo ? "Biodiversitate" : "Biodiversity"}
                  </p>
                  <h2 className="font-display text-h2 text-white">
                    {isRo ? "Fiecare Zonă Climatică pe Pământ" : "Every Climate Zone on Earth"}
                  </h2>
                </div>

                <p className="mb-6 font-body text-lg leading-relaxed text-white/70">
                  {isRo
                    ? "Statele Unite sunt una dintre cele mai bogate națiuni temperate din punct de vedere al biodiversității de pe Pământ. Cu 432.000 de specii cunoscute, SUA depășesc cu mult toți omologii lor din lumea dezvoltată — Germania are 72.000, Franța 94.000. Secretul este unic: America găzduiește fiecare zonă climatică majoră de pe planetă într-un singur teritoriu."
                    : "The United States is one of the most biodiversity-rich temperate nations on Earth. With 432,000 known species, the US dramatically outpaces its developed-world peers — Germany has 72,000, France 94,000. The secret is unique: America hosts every major climate zone on the planet within a single territory."}
                </p>

                <div className="my-8 rounded-2xl border border-white/10 bg-navy-mid p-6 md:p-8">
                  <BiodiversityChart
                    data={BIODIVERSITY_BY_COUNTRY}
                    title={isRo ? "Specii Cunoscute pe Țară (mii)" : "Known Species by Country (thousands)"}
                    subtitle={isRo
                      ? "SUA depășesc dramatic toată Europa — datorită diversității sale unice de zone climatice"
                      : "The US dramatically outpaces all of Europe — due to its unique diversity of climate zones"}
                    source="IUCN Red List / World Resources Institute 2024"
                  />
                </div>

                {/* Remaining overview facts */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {facts.slice(3).map((fact) => (
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

              {/* ── Quote 2 ──────────────────────────────────────────────── */}
              <QuoteBlock
                quote={quotes[1].quote}
                attribution={quotes[1].attribution}
                title={quotes[1].title}
              />

              {/* ── Section 5: Regional Wonders ──────────────────────────── */}
              <section id="regions" className="mb-20 scroll-mt-24">
                <div className="mb-8 border-l-4 border-glory-blue-light pl-5">
                  <p className="section-eyebrow">
                    {isRo ? "Regiunile Naturale" : "Natural Regions"}
                  </p>
                  <h2 className="font-display text-h2 text-white">
                    {isRo ? "Un Continent într-o Singură Țară" : "A Continent in One Country"}
                  </h2>
                </div>

                <p className="mb-8 font-body text-lg leading-relaxed text-white/70">
                  {isRo
                    ? "Cele cincizeci de state cuprind nu doar o națiune, ci o întreagă lume de peisaje. Fiecare regiune a Americii ar fi considerată un miracol natural în orice altă parte a globului."
                    : "The fifty states encompass not just a nation, but an entire world of landscapes. Each region of America would be considered a natural miracle anywhere else on the globe."}
                </p>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {NATURE_REGIONS.map((region) => (
                    <div
                      key={region.region}
                      className="rounded-2xl border border-white/10 bg-navy-mid p-5 transition-colors hover:border-glory-gold/25"
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <span className="text-3xl" role="img" aria-label={region.region}>
                          {region.icon}
                        </span>
                        <div>
                          <p className="font-body text-xs font-semibold uppercase tracking-widest text-glory-gold">
                            {region.region}
                          </p>
                          <p className="font-display text-base font-semibold text-white leading-snug">
                            {region.headline}
                          </p>
                        </div>
                      </div>
                      <div className="mb-3 flex items-baseline gap-2">
                        <span className="font-hero text-2xl text-glory-gold">
                          {region.stat}
                        </span>
                        <span className="font-body text-xs text-white/45">
                          {region.statLabel}
                        </span>
                      </div>
                      <p className="font-body text-sm leading-relaxed text-white/55">
                        {region.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Quote 3 ──────────────────────────────────────────────── */}
              <QuoteBlock
                quote={quotes[2].quote}
                attribution={quotes[2].attribution}
                title={quotes[2].title}
              />

              {/* ── Section 6: Sub-Page Navigation ──────────────────────── */}
              <section id="sub-pages" className="mb-8 scroll-mt-24">
                <p className="section-eyebrow">
                  {isRo ? "Explorați mai Adânc" : "Explore Deeper"}
                </p>
                <h2 className="mb-8 font-display text-h2 text-white">
                  {isRo ? "Imersiuni în Profunzime" : "Deep Dives"}
                </h2>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {subPages.map((page) => (
                    <Link
                      key={page.href}
                      href={page.href}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-navy-mid transition-all duration-300 hover:border-glory-gold/40 hover:shadow-[0_0_30px_rgba(255,215,0,0.1)]"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <Image
                          src={page.imageSrc}
                          alt={page.imageAlt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                          placeholder="blur"
                          blurDataURL={BLUR_PLACEHOLDER}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-mid via-navy-mid/30 to-transparent" />
                        <span className="absolute right-3 top-3 rounded-full bg-glory-gold px-3 py-1 font-body text-xs font-bold text-navy-dark">
                          {page.badge}
                        </span>
                      </div>
                      <div className="p-5">
                        <h3 className="mb-1.5 font-display text-lg font-semibold text-white transition-colors group-hover:text-glory-gold">
                          {page.title}
                        </h3>
                        <p className="font-body text-sm leading-relaxed text-white/55">
                          {page.description}
                        </p>
                        <p className="mt-4 font-body text-xs font-semibold text-glory-gold">
                          {isRo ? "Explorează →" : "Explore →"}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

            </main>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Nature Hero ──────────────────────────────────────────────────────────────

function NatureHero({ isRo }: { isRo: boolean }) {
  return (
    <section
      className="relative flex min-h-[85vh] items-end bg-navy-dark pb-16 pt-32"
      aria-label={isRo ? "Secțiunea Hero Natură" : "Nature hero"}
    >
      {/* Background — layered for depth */}
      <Image
        src={SITE_IMAGES.homeGrandCanyon}
        alt={isRo ? "Marele Canion — una dintre cele mai mari minuni naturale ale Americii" : "Grand Canyon — one of America's greatest natural wonders"}
        fill
        className="object-cover"
        priority
        sizes="100vw"
        placeholder="blur"
        blurDataURL={BLUR_PLACEHOLDER}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy-dark/80 to-navy-dark/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-transparent" />

      {/* Green accent bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 via-glory-gold to-green-600" />

      <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.3em] text-glory-gold">
            {isRo ? "Faza 4 — Natură și Geografie" : "Phase 4 — Nature & Geography"}
          </p>

          <h1 className="mb-6 font-hero text-6xl leading-none tracking-wide text-white sm:text-7xl md:text-8xl">
            {isRo ? "AMERICA" : "AMERICA"}<br />
            <span className="text-green-400">
              {isRo ? "CEA FRUMOASĂ" : "THE BEAUTIFUL"}
            </span>
          </h1>

          <p className="mb-8 max-w-2xl font-body text-lg leading-relaxed text-white/70 md:text-xl">
            {isRo
              ? "Nicio națiune de pe Pământ nu posedă o diversitate atât de extraordinară de minuni naturale — de la tundra arctică la pădurile tropicale, de la cel mai înalt vârf al Americii de Nord la cel mai mare sistem de apă dulce din lume."
              : "No nation on Earth possesses such extraordinary diversity of natural wonders — from Arctic tundra to tropical rainforests, from North America's highest peak to the world's greatest freshwater system."}
          </p>

          {/* Hero stats */}
          <div className="flex flex-wrap gap-6">
            {[
              { value: "63",      label: isRo ? "Parcuri Naționale" : "National Parks",     sub: "NPS 2024"     },
              { value: "85M",     label: isRo ? "Acri Protejați"    : "Acres Protected",      sub: "NPS 2024"     },
              { value: "21%",     label: isRo ? "Apă Dulce Globală" : "Global Freshwater",    sub: "EPA / GLC"    },
            ].map((stat) => (
              <div key={stat.value} className="text-center">
                <p className="font-hero text-4xl text-glory-gold md:text-5xl">{stat.value}</p>
                <p className="font-body text-sm text-white/70">{stat.label}</p>
                <p className="font-body text-xs text-white/35">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
