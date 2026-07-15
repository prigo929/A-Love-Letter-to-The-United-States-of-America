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
import { InfrastructureAtlas } from "@/components/infrastructure/InfrastructureAtlas";
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
        atlasTitle: "Atlasul Infrastructurii Naționale",
        atlasIntro: "Explorează sistemele continentale care definesc America modernă. Selectează filele de mai jos pentru a comuta între hărțile interactive ale aviației, porturilor, barajelor, rețelei electrice, căilor ferate, apeductelor și autostrăzilor.",
        atlasLabels: {
          aviation: {
            title: "Huburi Aviatice Globale",
            desc: "Peste 19.000 de aerodromuri și cele mai aglomerate aeroporturi de pasageri și marfă de pe Pământ."
          },
          ports: {
            title: "Porturi de Mare Adâncime",
            desc: "Terminalele comerciale care conectează rețelele interioare de transport cu rutele comerciale din Pacific și Atlantic."
          },
          dams: {
            title: "Baraje și Poduri Monumentale",
            desc: "Lucrările structurale masive care au îmblânzit râurile Americii și i-au traversat marile golfuri și canioane."
          },
          power: {
            title: "Rețeaua Electrică Continentală",
            desc: "Cea mai mare mașină de pe Pământ — o rețea uriașă de linii de înaltă tensiune care alimentează un continent."
          },
          rail: {
            title: "Rețeaua Feroviară de Marfă",
            desc: "Sistemul feroviar transcontinental de marfă care mută volume enorme de resurse cu o eficiență de neegalat."
          },
          water: {
            title: "Apeducte și Căi Navigabile",
            desc: "Canalele comerciale majore (Mississippi/Intracoastal) și apeductele colosale care alimentează deșertul din Vest."
          },
          highway: {
            title: "Sistemul de Autostrăzi Interstatale",
            desc: "Rețeaua de autostrăzi federale cu acces controlat, întinzându-se pe 48.000 de mile fără semafoare."
          },
          aviationLabels: {
            all: "Toate cele 873",
            major: "Huburi mari",
            medium: "Medii",
            regional: "Regionale",
            enplanements: "Îmbarcări",
            passengers: "Pasageri",
            hint: "aeroporturi afișate",
            towered: "Turn de control",
            international: "Punct de intrare internațional",
            perYear: "pe an",
            scopeCommercial: "Comerciale",
            scopeAll: "Toate cele 19.514",
            gaAirfields: "Aerodromuri GA",
            heliports: "Heliporturi",
            seaplane: "Baze de hidroavioane",
          },
          portLabels: {
            all: "Toate Porturile",
            imports: "Import-Dominant",
            exports: "Export-Dominant",
            completed: "Înființat",
            statLabel: "Tonaj Anual (Short Tons)",
            hint: "Treci peste un port pe hartă pentru detalii",
            rankLabel: "Locul în Topul SUA",
            tonnageLabel: "Volumul Total de Marfă",
            splitLabel: "Raport Domestic vs Foreign",
            domesticLabel: "Domestic",
            foreignLabel: "Extern",
          },
          damsLabels: {
            all: "Toate",
            dams: "Baraje",
            bridges: "Poduri",
            completed: "Finalizat",
            statLabel: "Dimensiune / Deschidere",
            hint: "Treci peste un punct pentru detalii",
            scopeLabel: "Monument",
          },
          mapLabels: {
            eraLabel: "Sistem",
            corridorsLabel: "Treci peste o linie pentru detalii",
            lengthLabel: "Lungime",
            openedLabel: "În serviciu",
            hint: "Trageți pentru panoramare · Scroll pentru zoom",
            zoomHint: "Trageți pentru panoramare · Scroll pentru zoom",
          }
        },
        bandTitle: "Construit la scară geologică",
        bandP1:
          "Barajul Hoover a fost turnat în plină Mare Criză, într-un canion la 49°C, cu doi ani înainte de termen. Generația care nu-și permitea prânzul a construit lucruri pe care le folosim și azi, în fiecare zi.",
        bandP2:
          "Acesta este tiparul american al infrastructurii: proiecte atât de mari încât par imposibile, terminate atât de repede încât par inevitabile.",
        bandAlt: "Vedere aeriană a Barajului Hoover",
        megaEyebrow: "Cronologia",
        megaTitle: "Două secole de megaproiecte",
        networksEyebrow: "Explorează rețelele",
        networksTitle: "Sistemele care leagă continentul",
        highwayCard: {
          title: "Autostrăzi Interstatale",
          desc: "Cel mai mare proiect de lucrări publice din istorie — 47.856 de mile de autostrăzi.",
          cta: "Explorează coridoarele →",
          alt: "I-70 prin Glenwood Canyon, Colorado",
        },
        railCard: {
          title: "Căi Ferate de Marfă",
          desc: "De la cuiul de aur din 1869 la giganții feroviari moderni — legând oceanele cu linii de oțel.",
          cta: "Explorează căile ferate →",
          alt: "Căi ferate transcontinentale",
        },
        aviationCard: {
          title: "Huburi Aviatice Globale",
          desc: "Peste 19.000 de aerodromuri și cele mai aglomerate aeroporturi de pasageri și marfă de pe Pământ.",
          cta: "Explorează zborurile →",
          alt: "Avioane la terminal în Chicago",
        },
        portCard: {
          title: "Porturi de Mare Adâncime",
          desc: "Huburile de containere din Los Angeles și terminalele de export de energie din Golful Mexic.",
          cta: "Explorează porturile →",
          alt: "Nave container la portul comercial",
        },
        powerCard: {
          title: "Rețeaua Electrică",
          desc: "Cea mai mare mașinărie a omenirii, alimentând sute de milioane de case și industrii.",
          cta: "Explorează energia →",
          alt: "Rețeaua electrică văzută din spațiu",
        },
        waterCard: {
          title: "Apeducte și Căi Navigabile",
          desc: "Marile canale agricole din California și poarta comercială a bazinului Mississippi.",
          cta: "Explorează apele →",
          alt: "Râul Colorado prin canion",
        },
        damsCard: {
          title: "Baraje și Poduri Monumentale",
          desc: "Barajul Hoover, Podul Golden Gate și minunile structurale ale ingineriei americane.",
          cta: "Explorează structurile →",
          alt: "Vedere aeriană a Barajului Hoover",
        },
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
        atlasTitle: "National Infrastructure Atlas",
        atlasIntro: "Explore the continental networks that define modern America. Select the tabs below to switch between interactive maps of aviation, ports, dams, power grid, rail network, aqueducts, and highways.",
        atlasLabels: {
          aviation: {
            title: "Global Aviation Hubs",
            desc: "Over 19,000 airfields and the world's busiest passenger and air cargo hubs."
          },
          ports: {
            title: "Deepwater Maritime Ports",
            desc: "The trade gateways connecting domestic transit lines to the shipping lanes of the Pacific and Atlantic."
          },
          dams: {
            title: "Monumental Dams & Bridges",
            desc: "The massive structural feats that tamed America's rivers and leaped its bays and canyons."
          },
          power: {
            title: "The Continental Power Grid",
            desc: "The largest machine built by mankind — a vast network of high-voltage transmission lines powering a continent."
          },
          rail: {
            title: "Freight Rail Network",
            desc: "The transcontinental rail freight system moving massive resource volumes with unmatched efficiency."
          },
          water: {
            title: "Aqueducts & Waterways",
            desc: "Major commercial channels (Mississippi/Intracoastal) and the colossal aqueducts watering the arid West."
          },
          highway: {
            title: "Interstate Highway System",
            desc: "The network of controlled-access federal highways, stretching 48,000 miles without a single traffic light."
          },
          aviationLabels: {
            all: "All 873",
            major: "Major hubs",
            medium: "Medium",
            regional: "Regional",
            enplanements: "Enplanements",
            passengers: "Passengers",
            hint: "airports shown",
            towered: "Control tower",
            international: "Intl port of entry",
            perYear: "per year",
            scopeCommercial: "Commercial",
            scopeAll: "All 19,514",
            gaAirfields: "GA airfields",
            heliports: "Heliports",
            seaplane: "Seaplane bases",
          },
          portLabels: {
            all: "All Ports",
            imports: "Import-Dominant",
            exports: "Export-Dominant",
            completed: "Established",
            statLabel: "Annual Tonnage (Short Tons)",
            hint: "Hover a port marker on the map for details",
            rankLabel: "National Rank",
            tonnageLabel: "Total Cargo Volume",
            splitLabel: "Domestic vs Foreign Split",
            domesticLabel: "Domestic",
            foreignLabel: "Foreign",
          },
          damsLabels: {
            all: "All",
            dams: "Dams",
            bridges: "Bridges",
            completed: "Completed",
            statLabel: "Height / Span Size",
            hint: "Hover a marker for details",
            scopeLabel: "Monument",
          },
          mapLabels: {
            eraLabel: "System",
            corridorsLabel: "Hover a line for its details",
            lengthLabel: "Length",
            openedLabel: "In service",
            hint: "Drag to pan · Scroll to zoom",
            zoomHint: "Drag to pan · Scroll to zoom",
          }
        },
        bandTitle: "Built at Geological Scale",
        bandP1:
          "The Hoover Dam was poured in the depths of the Depression, in a canyon at 120°F, two years ahead of schedule. The generation that could not afford lunch built things we still use every single day.",
        bandP2:
          "That is the American pattern of infrastructure: projects so large they look impossible, finished so fast they look inevitable.",
        bandAlt: "Aerial view of the Hoover Dam",
        megaEyebrow: "The Chronology",
        megaTitle: "Two Centuries of Megaprojects",
        networksEyebrow: "Explore the Networks",
        networksTitle: "The Systems That Bind the Continent",
        highwayCard: {
          title: "Interstate Highways",
          desc: "The largest public works project in U.S. history — 47,856 miles of arterial freeways.",
          cta: "Explore the corridors →",
          alt: "I-70 through Glenwood Canyon, Colorado",
        },
        railCard: {
          title: "Freight Railroads",
          desc: "From the 1869 golden spike to modern freight giants — binding two oceans with steel rails.",
          cta: "Explore the railroads →",
          alt: "Transcontinental railroads",
        },
        aviationCard: {
          title: "Global Aviation Hubs",
          desc: "Over 19,000 airfields and the world's busiest passenger and air cargo hubs.",
          cta: "Explore the skies →",
          alt: "Jets at the terminal gates in Chicago",
        },
        portCard: {
          title: "Deepwater Maritime Ports",
          desc: "Container pipelines of San Pedro Bay and energy export portals of the Gulf Coast.",
          cta: "Explore the ports →",
          alt: "Container ship docked at commercial port",
        },
        powerCard: {
          title: "The Power Grid",
          desc: "The largest machine built by mankind, powering hundreds of millions of homes and businesses.",
          cta: "Explore the grid →",
          alt: "National electricity grid seen from space",
        },
        waterCard: {
          title: "Aqueducts & Waterways",
          desc: "Colossal water supply projects in the West and the commercial channels of the Mississippi basin.",
          cta: "Explore the waters →",
          alt: "Colorado river cutting through red canyons",
        },
        damsCard: {
          title: "Monumental Dams & Bridges",
          desc: "Hoover Dam, the Golden Gate Bridge, and the ultimate feats of structural engineering.",
          cta: "Explore the structures →",
          alt: "Aerial view of the Hoover Dam",
        },
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

          {/* ── Infrastructure Atlas ── */}
          <section>
            <span className="macro-eyebrow">{isRo ? "Hărți Interactive" : "Interactive Maps"}</span>
            <h2 className="macro-section-title mb-8 mt-6">{copy.atlasTitle}</h2>
            <p className="macro-body mb-14 max-w-4xl">{copy.atlasIntro}</p>
            <InfrastructureAtlas locale={locale} labels={copy.atlasLabels} />
          </section>

          {/* ── Megaprojects band + chronology ── */}
          <InfrastructureBand imageSrc={SITE_IMAGES.infraHooverAerial} imageAlt={copy.bandAlt} fullBleed>
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

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { card: copy.highwayCard, href: "/infrastructure/highway-system", img: SITE_IMAGES.infraUs75Loop12 },
                { card: copy.railCard, href: "/infrastructure/rail-network", img: SITE_IMAGES.infraGoldenSpike },
                { card: copy.aviationCard, href: "/infrastructure/aviation-hubs", img: SITE_IMAGES.infraOHareJets },
                { card: copy.portCard, href: "/infrastructure/maritime-ports", img: SITE_IMAGES.pier300Channel },
                { card: copy.powerCard, href: "/infrastructure/power-grid", img: SITE_IMAGES.homeUsaAtNightFromSpace },
                { card: copy.waterCard, href: "/infrastructure/aqueducts-waterways", img: SITE_IMAGES.californiaAqueductCrossing },
                { card: copy.damsCard, href: "/infrastructure/dams-bridges", img: SITE_IMAGES.infraHooverAerial },
              ].map(({ card, href, img }) => (
                <Link key={href} href={href} className="group block">
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/5 bg-white/[0.01]">
                    <Image
                      src={img}
                      alt={card.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL={BLUR_PLACEHOLDER}
                      className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  </div>
                  <div className="border-t border-[#E8B923]/40 pt-6 mt-4">
                    <h3 className="font-macro-display text-xl font-bold tracking-tight text-white group-hover:text-[#E8B923] transition-colors">
                      {card.title}
                    </h3>
                    <p className="font-sans text-sm text-white/50 mt-3">{card.desc}</p>
                    <span className="mt-4 inline-block font-sans text-[11px] font-bold uppercase tracking-wider text-[#E8B923] transition-colors group-hover:text-white">
                      {card.cta}
                    </span>
                  </div>
                </Link>
              ))}
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
