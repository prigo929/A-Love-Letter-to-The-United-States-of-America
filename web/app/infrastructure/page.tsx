// ─── Infrastructure Hub Page ──────────────────────────────────────────────────
// The section landing page: continental integration as a thesis, the global
// aviation hub map, and the megaproject chronology — with cinematic routes into
// the Interstate Highway and Continental Rail subpages.

import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { QuoteBlock } from "@/components/sections/QuoteBlock";
import type { Locale } from "@/lib/i18n/config";
import { getServerLocale } from "@/lib/i18n/server";
import {
  MacroStyles,
  MacroHero,
  InfrastructureBand,
} from "@/components/shared/CinematicSystem";
import { AviationMap } from "@/components/infrastructure/AviationMap";
import { SerifLede, Reveal, MegaTimeline } from "@/components/infrastructure/InfraMotion";
import { MEGAPROJECTS } from "@/lib/data/infrastructure-network-data";
import { SITE_IMAGES } from "@/lib/site-images";
import { BLUR_PLACEHOLDER } from "@/lib/utils";

const getPageMetadata = (locale: Locale) => ({
  title: locale === "ro" ? "Infrastructură | America" : "Infrastructure | America",
  description:
    locale === "ro"
      ? "Sistemele care au integrat un continent: autostrăzi interstatale, rețele feroviare transcontinentale, huburi aviatice globale și megaproiecte de inginerie."
      : "The systems that integrated a continent: Interstate highways, transcontinental railroads, global aviation hubs, and engineering megaprojects.",
  alternates: { canonical: "/infrastructure" },
});

export async function generateMetadata() {
  const locale = await getServerLocale();
  return getPageMetadata(locale);
}

export default async function InfrastructureHubPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const copy = isRo
    ? {
        heroEyebrow: "Infrastructură",
        heroLead: "MAȘINĂRIA",
        heroAccent: "CONTINENTALĂ",
        heroBody:
          "Patru fusuri orare, două oceane, o singură piață. America nu este doar o țară mare — este un continent legat într-un întreg funcțional de autostrăzi, șine, piste și beton, la o scară pe care nicio altă națiune nu a egalat-o.",
        heroStats: [
          { value: "47,856", label: "mile de autostrăzi interstatale" },
          { value: "140,000", label: "mile de rețea feroviară de marfă" },
          { value: "5,000+", label: "aeroporturi publice" },
        ],
        thesisTitle: "Un continent, cablat",
        lede: "Geografia a oferit materia primă. Ingineria a transformat-o într-o singură economie.",
        thesisP1:
          "Distanța a fost întotdeauna problema fundamentală a Americii. New York și San Francisco sunt mai departe unul de altul decât Lisabona de Moscova. Nicio piață unică nu poate exista la asemenea scară fără o infrastructură care să anuleze distanța — iar America a construit-o, strat peste strat: mai întâi canale, apoi șine, apoi beton, apoi piste.",
        thesisP2:
          "Rezultatul este singura economie continentală cu adevărat integrată de pe Pământ. Un container descărcat în Los Angeles ajunge la Chicago în mai puțin de 60 de ore pe calea ferată. Un camion poate traversa continentul fără să întâlnească un singur semafor. Iar aproape orice punct din țară se află la o zi de zbor de oricare altul.",
        aviationEyebrow: "Cerul comercial",
        aviationTitle: "Huburile aviatice globale",
        aviationBody:
          "Cele mai aglomerate aeroporturi de pasageri din lume și mașinile nocturne de sortare care mută comerțul planetei. Comută între straturi și atinge un hub.",
        aviationLabels: {
          passengers: "Pasageri",
          cargo: "Marfă",
          paxUnit: "mil. pasageri · 2024",
          cargoUnit: "mil. tone · marfă aeriană",
          hint: "Atinge un hub pentru detalii. Mărimea cercului = traficul anual.",
        },
        bandTitle: "Construit la scară geologică",
        bandP1:
          "Barajul Hoover a fost turnat în plină Mare Criză, într-un canion la 49°C, cu doi ani înainte de termen. Generația care nu-și permitea prânzul a construit lucruri pe care le folosim și azi, în fiecare zi.",
        bandP2:
          "Acesta este tiparul american al infrastructurii: proiecte atât de mari încât par imposibile, terminate atât de repede încât par inevitabile.",
        bandAlt: "Construcția Barajului Hoover",
        megaEyebrow: "Cronologia",
        megaTitle: "Două secole de megaproiecte",
        networksEyebrow: "Explorează rețelele",
        networksTitle: "Sistemele care leagă continentul",
        highwayCard: {
          title: "Rețeaua de Autostrăzi Interstatale",
          desc: "Cel mai mare proiect de lucrări publice din istorie — 47.856 de mile, cu o hartă interactivă a coridoarelor și epocilor sale.",
          cta: "Explorează autostrăzile →",
          alt: "I-70 prin Glenwood Canyon, Colorado",
        },
        railCard: {
          title: "Rețeaua Feroviară Continentală",
          desc: "De la cuiul de aur din 1869 la titanii de marfă de azi — două oceane legate cu șine de oțel.",
          cta: "Explorează căile ferate →",
          alt: "Baterea cuiului de aur, Promontory, 1869",
        },
        moreNetworks: "Celelalte rețele",
        otherPages: [
          { href: "/infrastructure/dams-bridges", label: "Baraje și Poduri Monumentale" },
          { href: "/infrastructure/power-grid", label: "Rețeaua Electrică Continentală" },
          { href: "/infrastructure/aqueducts-waterways", label: "Marile Apeducte și Căi Navigabile" },
          { href: "/infrastructure/aviation-hubs", label: "Huburi Aviatice Globale" },
          { href: "/infrastructure/maritime-ports", label: "Porturi Maritime de Mare Adâncime" },
        ],
        quote:
          "Nu face planuri mici; ele nu au puterea magică de a stârni sângele oamenilor... Fă planuri mari; țintește sus în speranță și în muncă.",
        quoteTitle: "Arhitect — Planul orașului Chicago, 1909",
        breadcrumb: "Infrastructură",
      }
    : {
        heroEyebrow: "Infrastructure",
        heroLead: "THE CONTINENTAL",
        heroAccent: "MACHINE",
        heroBody:
          "Four time zones, two oceans, one market. America is not merely a large country — it is a continent bound into a working whole by highway, rail, runway and concrete, at a scale no other nation has matched.",
        heroStats: [
          { value: "47,856", label: "miles of Interstate highway" },
          { value: "140,000", label: "miles of freight rail network" },
          { value: "5,000+", label: "public airports" },
        ],
        thesisTitle: "A Continent, Wired",
        lede: "Geography supplied the raw material. Engineering turned it into a single economy.",
        thesisP1:
          "Distance has always been America's founding problem. New York and San Francisco lie farther apart than Lisbon and Moscow. No single market can exist at that scale without infrastructure that cancels distance — and America built it, layer upon layer: first canals, then rails, then concrete, then runways.",
        thesisP2:
          "The result is the only truly integrated continental economy on Earth. A container unloaded in Los Angeles reaches Chicago by rail in under 60 hours. A truck can cross the continent without meeting a single traffic light. And nearly every point in the country lies within a day's flight of every other.",
        aviationEyebrow: "The Commercial Sky",
        aviationTitle: "The Global Aviation Hubs",
        aviationBody:
          "The world's busiest passenger airports — and the overnight sorting machines that move the planet's commerce. Switch layers and touch a hub.",
        aviationLabels: {
          passengers: "Passengers",
          cargo: "Cargo",
          paxUnit: "M passengers · 2024",
          cargoUnit: "M tonnes · air cargo",
          hint: "Tap a hub for detail. Circle size = annual throughput.",
        },
        bandTitle: "Built at Geological Scale",
        bandP1:
          "The Hoover Dam was poured in the depths of the Depression, in a canyon at 120°F, two years ahead of schedule. The generation that could not afford lunch built things we still use every single day.",
        bandP2:
          "That is the American pattern of infrastructure: projects so large they look impossible, finished so fast they look inevitable.",
        bandAlt: "Construction of the Hoover Dam",
        megaEyebrow: "The Chronology",
        megaTitle: "Two Centuries of Megaprojects",
        networksEyebrow: "Explore the Networks",
        networksTitle: "The Systems That Bind the Continent",
        highwayCard: {
          title: "The Interstate Highway Network",
          desc: "The largest public works project in history — 47,856 miles, with an interactive map of its corridors and eras.",
          cta: "Explore the highways →",
          alt: "I-70 through Glenwood Canyon, Colorado",
        },
        railCard: {
          title: "The Continental Rail Network",
          desc: "From the golden spike of 1869 to today's freight titans — two oceans bound by steel rails.",
          cta: "Explore the railroads →",
          alt: "Driving the golden spike at Promontory, 1869",
        },
        moreNetworks: "The other networks",
        otherPages: [
          { href: "/infrastructure/dams-bridges", label: "Monumental Dams & Bridges" },
          { href: "/infrastructure/power-grid", label: "The Continental Power Grid" },
          { href: "/infrastructure/aqueducts-waterways", label: "Great Aqueducts & Waterways" },
          { href: "/infrastructure/aviation-hubs", label: "Global Aviation Hubs" },
          { href: "/infrastructure/maritime-ports", label: "Deepwater Maritime Ports" },
        ],
        quote:
          "Make no little plans; they have no magic to stir men's blood... Make big plans; aim high in hope and work.",
        quoteTitle: "Architect — The 1909 Plan of Chicago",
        breadcrumb: "Infrastructure",
      };

  return (
    <>
      <MacroStyles />
      <MacroHero
        videoSrc="/videos/library/Infrastructure/atlanta-highway-interchange.mp4"
        eyebrow={copy.heroEyebrow}
        titleLead={copy.heroLead}
        titleAccent={copy.heroAccent}
        description={copy.heroBody}
        stats={copy.heroStats}
      />

      <div className="relative z-10 bg-[#000000] pb-32 pt-16">
        <div className="mx-auto mb-24 max-w-[1600px] px-6 md:px-12">
          <Breadcrumb items={[{ label: copy.breadcrumb }]} />
        </div>

        <div className="mx-auto max-w-[1600px] space-y-40 px-6 md:space-y-48 md:px-12">
          {/* ── Thesis ── */}
          <section>
            <h2 className="macro-section-title mb-12">{copy.thesisTitle}</h2>
            <SerifLede className="mb-12 max-w-5xl">{copy.lede}</SerifLede>
            <div className="grid gap-10 md:grid-cols-2">
              <Reveal><p className="macro-body">{copy.thesisP1}</p></Reveal>
              <Reveal delay={0.12}><p className="macro-body">{copy.thesisP2}</p></Reveal>
            </div>
          </section>

          {/* ── Aviation hubs ── */}
          <section>
            <span className="macro-eyebrow">{copy.aviationEyebrow}</span>
            <h2 className="macro-section-title mb-8 mt-6">{copy.aviationTitle}</h2>
            <p className="macro-body mb-14 max-w-4xl">{copy.aviationBody}</p>
            <AviationMap locale={locale} labels={copy.aviationLabels} />
          </section>

          {/* ── Megaprojects band + chronology ── */}
          <InfrastructureBand imageSrc={SITE_IMAGES.infraHooverConstruction} imageAlt={copy.bandAlt}>
            <h2 className="macro-section-title mb-6">{copy.bandTitle}</h2>
            <p className="macro-body max-w-4xl">{copy.bandP1}</p>
            <p className="macro-body mt-4 max-w-4xl">{copy.bandP2}</p>
          </InfrastructureBand>

          <section>
            <span className="macro-eyebrow">{copy.megaEyebrow}</span>
            <h2 className="macro-section-title mb-10 mt-6">{copy.megaTitle}</h2>
            <MegaTimeline projects={MEGAPROJECTS} locale={locale} />
          </section>

          {/* ── Network gateway cards ── */}
          <section>
            <span className="macro-eyebrow">{copy.networksEyebrow}</span>
            <h2 className="macro-section-title mb-14 mt-6">{copy.networksTitle}</h2>

            <div className="grid gap-10 md:grid-cols-2">
              {[
                { card: copy.highwayCard, href: "/infrastructure/highway-system", img: SITE_IMAGES.infraGlenwoodCanyon },
                { card: copy.railCard, href: "/infrastructure/rail-network", img: SITE_IMAGES.infraGoldenSpike },
              ].map(({ card, href, img }) => (
                <Link key={href} href={href} className="group block">
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={img}
                      alt={card.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      placeholder="blur"
                      blurDataURL={BLUR_PLACEHOLDER}
                      className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  </div>
                  <div className="border-t border-[#E8B923]/40 pt-6">
                    <h3 className="font-macro-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                      {card.title}
                    </h3>
                    <p className="macro-body mt-3 !text-base">{card.desc}</p>
                    <span className="mt-4 inline-block font-macro-mono text-xs uppercase tracking-[0.2em] text-[#E8B923] transition-colors group-hover:text-white">
                      {card.cta}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-20 border-t border-white/[0.07] pt-10">
              <span className="font-macro-mono text-[11px] uppercase tracking-[0.25em] text-white/30">
                {copy.moreNetworks}
              </span>
              <div className="mt-6 flex flex-wrap gap-x-12 gap-y-4">
                {copy.otherPages.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    className="font-macro-display text-lg font-bold tracking-tight text-white/55 transition-colors hover:text-[#E8B923]"
                  >
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <div className="border-t border-white/5 pb-8 pt-24">
            <QuoteBlock quote={copy.quote} attribution="Daniel Burnham" title={copy.quoteTitle} variant="dark" />
          </div>
        </div>
      </div>
    </>
  );
}
