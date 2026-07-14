// ─── Deepwater Maritime Ports ──────────────────────────────────────────────────
// From the energy portals of the Gulf Coast to the massive container gateways of
// San Pedro Bay and the historic harbors of the Atlantic. Displays bilingual (EN/RO)
// narratives, port statistics, and the interactive PortMap component.

import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { QuoteBlock } from "@/components/sections/QuoteBlock";
import type { Locale } from "@/lib/i18n/config";
import { getServerLocale } from "@/lib/i18n/server";
import {
  MacroStyles,
  MacroHero,
  MacroStat,
  MacroFact,
  InfrastructureBand,
} from "@/components/shared/CinematicSystem";
import { PortMap } from "@/components/infrastructure/PortMap";
import { SerifLede, Reveal } from "@/components/infrastructure/InfraMotion";
import { SITE_IMAGES } from "@/lib/site-images";

const getPageMetadata = (locale: Locale): Metadata => ({
  title:
    locale === "ro"
      ? "Porturi Maritime de Mare Adâncime | Infrastructură"
      : "Deepwater Maritime Ports | Infrastructure",
  description:
    locale === "ro"
      ? "Explorează marile porți comerciale ale Americii, de la gigantul energetic din Houston la porțile containerelor din Los Angeles și Long Beach."
      : "Explore America's major commercial gateways, from the energy giant of Houston to the container hubs of Los Angeles and Long Beach.",
  alternates: { canonical: "/infrastructure/maritime-ports" },
});

export async function generateMetadata() {
  const locale = await getServerLocale();
  return getPageMetadata(locale);
}

export default async function PortsPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const copy = isRo
    ? {
        breadcrumbSection: "Infrastructură",
        breadcrumbPage: "Porturi Maritime de Mare Adâncime",
        heroEyebrow: "Porturi Maritime de Mare Adâncime",
        heroLead: "PORTURI DE MARE ADÂNCIME.",
        heroAccent: "FLUX MARITIM.",
        heroBody:
          "Prin marile porți maritime de mare adâncime ale Americii curg anual peste 2 miliarde de tone de mărfuri. De la terminalele energetice din Houston și South Louisiana la macaralele gigant din Los Angeles și Long Beach, aceste porturi ancorează lanțurile globale de aprovizionare.",
        heroStats: [
          { value: "2,3 mld. t", label: "volum comercial anual procesat" },
          { value: "#1 Houston", label: "lider național în tonaj comercial" },
          { value: "30%+", label: "din containere trec prin Golful San Pedro" },
        ],
        storyTitle: "Porțile fluxului global",
        lede: "Un port comercial nu este doar o dană pentru vapoare; este o pâlnie uriașă în care se întâlnesc autostrăzile, căile ferate și rutele oceanice.",
        storyP1:
          "În Statele Unite, comerțul maritim este vital. Zona Golfului Mexic funcționează ca plămânul energetic și agricol al țării, exportând petrol, produse petrochimice și cereale din inima continentului. Porturi precum Houston, South Louisiana și Corpus Christi procesează volume uriașe de tonaj brut brut, propulsând America în fruntea exporturilor globale de energie.",
        storyP2:
          "Pe Coasta de Vest, dinamica se schimbă către bunuri de larg consum cu valoare adăugată mare. Complexul portuar format din Los Angeles și Long Beach — poarta transpacifică a Americii — procesează peste o treime din toate importurile containerizate din SUA, alimentând depozitele, magazinele și fabricile din întreaga națiune.",
        numbersTitle: "Giganții în cifre",
        numbersStats: [
          { value: "293 mil. t", label: "tonaj anual procesat în Houston, pe primul loc în SUA" },
          { value: "54 mile", label: "lungimea Portului South Louisiana de-a lungul fluviului Mississippi" },
          { value: "20 mil. TEU", label: "containere procesate anual în complexul LA / Long Beach" },
        ],
        mapTitle: "Harta Porturilor Comerciale",
        mapIntro:
          "Vizualizează rețeaua de porturi comerciale de mare adâncime a Statelor Unite. Dimensiunea punctelor indică tonajul anual total (tone scurte). Filtrează după specificul comercial: import-dominant (roz) sau export-dominant (verde).",
        mapLabels: {
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
        bandTitle: "San Pedro Bay: Autostrada Pacificului",
        bandP1:
          "Porturile gemene din Los Angeles și Long Beach alcătuiesc împreună cel mai aglomerat complex portuar din emisfera vestică. Macaralele lor gigantice descarcă zi și noapte nave cargo sosite din Asia, transferând containerele direct pe trenuri intermodale care pleacă spre Chicago, New York și Atlanta.",
        bandP2:
          "Această poartă colosală asigură aprovizionarea zilnică a milioane de afaceri și familii din SUA, generând sute de mii de locuri de muncă în logistică, transport și distribuție pe întreg continentul.",
        bandAlt: "Vedere aeriană a complexului portuar din Long Beach, California",
        portsTitle: "Marile Porturi Strategice",
        portsIntro:
          "Fiecare port major are un rol unic în economia americană, specializându-se pe categorii de mărfuri și rute comerciale globale.",
        portsFacts: [
          { fact: "Houston: Hubul energetic al continentului", detail: "Situat pe canalul de navigație Houston, procesează cea mai mare cantitate de mărfuri externe din țară, legând rafinăriile din Texas de restul lumii." },
          { fact: "South Louisiana: Portalul agricol", detail: "Stins pe 54 de mile pe râul Mississippi, colectează barjele cu porumb, grâu și soia din Midwest pentru a le exporta pe tot globul." },
          { fact: "New York & New Jersey: Gigantul Coastei de Est", detail: "Cel mai mare port de pe coasta Atlanticului, servește ca principal centru de aprovizionare pentru cea mai densă regiune de consumatori din SUA." },
          { fact: "Los Angeles & Long Beach: Giganții Containerelor", detail: "Cele două porturi vecine din California gestionează o flotă uriașă de nave portcontainere, fiind coloana vertebrală a comerțului transpacific." },
        ],
      }
    : {
        breadcrumbSection: "Infrastructure",
        breadcrumbPage: "Deepwater Maritime Ports",
        heroEyebrow: "Deepwater Maritime Ports",
        heroLead: "DEEPWATER PORTALS.",
        heroAccent: "MARITIME FLOW.",
        heroBody:
          "Through America's massive deepwater gateways, over 2 billion tons of cargo flow every single year. From the energy pipelines of Houston and South Louisiana to the towering container cranes of Los Angeles and Long Beach, these ports anchor the nation's supply chains.",
        heroStats: [
          { value: "2.3B tons", label: "of annual waterborne commerce handled" },
          { value: "#1 Houston", label: "national leader in total cargo tonnage" },
          { value: "30%+", label: "of container imports go through San Pedro Bay" },
        ],
        storyTitle: "Gateways of Global Trade",
        lede: "A commercial port is not just a place where ships dock; it is a massive funnel where highways, railroads, and ocean lanes converge.",
        storyP1:
          "Maritime commerce is the lifeblood of the American economy. The Gulf Coast serves as the country's energy and agricultural lung, exporting petroleum, petrochemicals, and grains from the fertile heartland. Ports like Houston, South Louisiana, and Corpus Christi process massive bulks of raw tonnage, placing America at the forefront of global energy markets.",
        storyP2:
          "On the West Coast, the dynamic shifts to high-value consumer goods. The twin ports of Los Angeles and Long Beach — America's transpacific gateway — process over a third of all containerized imports entering the country, feeding warehouses, stores, and manufacturing assembly lines nationwide.",
        numbersTitle: "The Giants in Numbers",
        numbersStats: [
          { value: "293M tons", label: "of annual cargo processed in Houston, ranking 1st in the U.S." },
          { value: "54 miles", label: "of Mississippi riverfront encompassing the Port of South Louisiana" },
          { value: "20M TEUs", label: "of container volume handled annually in the LA / Long Beach complex" },
        ],
        mapTitle: "Commercial Port Map",
        mapIntro:
          "Visualize the network of major deepwater commercial ports in the United States. Dot sizes scale with total annual tonnage (short tons). Toggle filters to see trade balances: import-dominant (pink) vs export-dominant (green).",
        mapLabels: {
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
        bandTitle: "San Pedro Bay: The Pacific Pipeline",
        bandP1:
          "The twin ports of Los Angeles and Long Beach make up the busiest port complex in the Western Hemisphere. Their giant container cranes work around the clock unloading ships from Asia, transferring cargo directly onto intermodal rail lines bound for Chicago, New York, and Atlanta.",
        bandP2:
          "This colossal trade corridor keeps shelves stocked across the nation and supports hundreds of thousands of logistical and transportation jobs from coast to coast.",
        bandAlt: "Aerial view of the massive port complex of Long Beach, California",
        portsTitle: "Strategic Maritime Portals",
        portsIntro:
          "Each major port performs a specialized role in the U.S. economy, routing specific classes of cargo and global shipping lanes.",
        portsFacts: [
          { fact: "Houston: The Energy Hub", detail: "Situated along the Houston Ship Channel, it handles the most foreign tonnage in the nation, connecting Texas refineries to international buyers." },
          { fact: "South Louisiana: The Heartland's Grain Portal", detail: "Extending 54 miles on the Mississippi River, it aggregates Midwest corn, wheat, and soybeans for export worldwide." },
          { fact: "New York & New Jersey: The East Coast Giant", detail: "The largest gateway on the Atlantic coast, serving as the primary supply node for the dense Northeast consumer corridor." },
          { fact: "Los Angeles & Long Beach: Container Champions", detail: "The adjacent California ports handle massive volumes of consumer imports, serving as the main bridge to Pacific Rim manufacturers." },
        ],
      };

  return (
    <main className="min-h-screen bg-[#000000] pb-24 text-white selection:bg-[#E8B923]/30 selection:text-[#E8B923]">
      <MacroStyles />

      {/* Hero section */}
      <MacroHero
        eyebrow={copy.heroEyebrow}
        titleLead={copy.heroLead}
        titleAccent={copy.heroAccent}
        description={copy.heroBody}
        stats={copy.heroStats}
        imageSrc={SITE_IMAGES.economyPort}
        imageAlt="Container ship docked at port"
      />

      <div className="relative z-10 bg-[#000000]">
        {/* Breadcrumb path */}
        <div className="mx-auto max-w-[1600px] px-6 pt-12 md:px-12">
          <Breadcrumb
            items={[
              { label: copy.breadcrumbSection, href: "/infrastructure" },
              { label: copy.breadcrumbPage },
            ]}
          />
        </div>

        <div className="mx-auto max-w-[1600px] space-y-40 px-6 md:space-y-48 md:px-12">
          {/* ── Origin Story ── */}
          <section>
            <h2 className="macro-section-title mb-12">{copy.storyTitle}</h2>
            <SerifLede className="mb-12 max-w-5xl">{copy.lede}</SerifLede>
            <div className="grid gap-10 md:grid-cols-2">
              <Reveal>
                <p className="macro-body">{copy.storyP1}</p>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="macro-body">{copy.storyP2}</p>
              </Reveal>
            </div>
          </section>

          {/* ── By the numbers stats ── */}
          <section className="border-t border-white/5 pt-24">
            <h2 className="macro-section-title mb-16">{copy.numbersTitle}</h2>
            <div className="grid gap-16 border-t border-[#E8B923]/30 pt-16 sm:grid-cols-3">
              {copy.numbersStats.map((s) => (
                <MacroStat key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
          </section>

          {/* ── Interactive Map ── */}
          <section className="border-t border-white/5 pt-24">
            <span className="macro-eyebrow">{isRo ? "Harta Interactivă" : "Interactive Map"}</span>
            <h2 className="macro-section-title mb-8 mt-6">{copy.mapTitle}</h2>
            <p className="macro-body mb-14 max-w-4xl">{copy.mapIntro}</p>
            <PortMap locale={locale} labels={copy.mapLabels} />
          </section>

          {/* ── Full-bleed band: Long Beach ── */}
          <InfrastructureBand
            imageSrc={SITE_IMAGES.aerialLongBeachPort}
            imageAlt={copy.bandAlt}
            fullBleed
          >
            <h2 className="macro-section-title mb-6">{copy.bandTitle}</h2>
            <p className="macro-body max-w-4xl">{copy.bandP1}</p>
            <p className="macro-body mt-4 max-w-4xl">{copy.bandP2}</p>
          </InfrastructureBand>

          {/* ── Ports & Harbors facts list ── */}
          <section className="border-t border-white/5 pt-24">
            <span className="macro-eyebrow">{isRo ? "Logistica" : "Logistics"}</span>
            <h2 className="macro-section-title mb-6 mt-6">{copy.portsTitle}</h2>
            <p className="macro-body mb-14 max-w-4xl">{copy.portsIntro}</p>
            <div className="grid gap-16 md:grid-cols-2">
              {copy.portsFacts.map((f) => (
                <MacroFact key={f.fact} fact={f.fact} detail={f.detail} />
              ))}
            </div>
          </section>

          {/* ── Infrastructure Grid Navigation footer ── */}
          <section className="border-t border-white/5 pt-24 text-center">
            <span className="macro-eyebrow">{isRo ? "Capitole" : "Chapters"}</span>
            <h2 className="macro-section-title mb-16 mt-6">
              {isRo ? "Explorează Sistemele Naționale" : "Explore National Systems"}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 text-left">
              {[
                {
                  href: "/infrastructure/highway-system",
                  nameEn: "Interstate Highways",
                  nameRo: "Autostrăzi Interstatale",
                  descEn: "48,000 miles of continental asphalt.",
                  descRo: "48.000 de mile de asfalt continental.",
                },
                {
                  href: "/infrastructure/rail-network",
                  nameEn: "Freight Railroads",
                  nameRo: "Căi Ferate de Marfă",
                  descEn: "The steel rails that move the heavy tonnage.",
                  descRo: "Șinele de oțel care transportă tonajul greu.",
                },
                {
                  href: "/infrastructure/power-grid",
                  nameEn: "The Power Grid",
                  nameRo: "Rețeaua Electrică",
                  descEn: "America's largest machine generating power.",
                  descRo: "Cea mai mare mașinărie a Americii.",
                },
                {
                  href: "/infrastructure/aqueducts-waterways",
                  nameEn: "Aqueducts & Canals",
                  nameRo: "Apeducte și Canale",
                  descEn: "Conveying water across western deserts.",
                  descRo: "Alimentarea cu apă a vestului arid.",
                },
                {
                  href: "/infrastructure/dams-bridges",
                  nameEn: "Dams & Bridges",
                  nameRo: "Baraje și Poduri",
                  descEn: "Hoover Dam and the historic suspension spans.",
                  descRo: "Barajul Hoover și marile deschideri suspendate.",
                },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group block border border-white/10 bg-white/[0.02] p-8 transition-all duration-300 hover:border-[#E8B923] hover:bg-[#E8B923]/[0.02] rounded-3xl"
                >
                  <span className="font-macro-mono text-[9px] uppercase tracking-[0.2em] text-[#E8B923] block mb-3">
                    {isRo ? "Capitol" : "Chapter"}
                  </span>
                  <h4 className="font-macro-display text-lg font-bold text-white group-hover:text-[#E8B923] transition-colors mb-2">
                    {isRo ? link.nameRo : link.nameEn}
                  </h4>
                  <p className="font-macro-mono text-[10px] uppercase leading-relaxed tracking-wider text-white/50">
                    {isRo ? link.descRo : link.descEn}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
