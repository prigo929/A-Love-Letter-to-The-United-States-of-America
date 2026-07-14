// ─── The Great Aqueducts & Waterways ───────────────────────────────────────────
// From the historic Erie Canal that sparked the rise of New York City to the
// colossal water-conveyance networks that sustain the modern American West.
// Contains bilingual (EN/RO) cinematic sections and the WaterwayComparison chart.

import Link from "next/link";
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
import { WaterwayComparison } from "@/components/infrastructure/WaterwayComparison";
import { SerifLede, Reveal } from "@/components/infrastructure/InfraMotion";
import { NetworkMap } from "@/components/infrastructure/NetworkMap";
import waterwaysData from "@/lib/data/waterways-simplified.json";
import { SITE_IMAGES } from "@/lib/site-images";

const getPageMetadata = (locale: Locale) => ({
  title:
    locale === "ro"
      ? "Marile Apeducte și Căi Navigabile | Infrastructură"
      : "Great Aqueducts & Waterways | Infrastructure",
  description:
    locale === "ro"
      ? "De la canalul Erie în 1825 la apeductele gigantice care alimentează California și Arizona: râuri artificiale și canale comerciale ce au legat și alimentat o superputere."
      : "From the Erie Canal of 1825 to the giant aqueducts feeding California and Arizona: artificial rivers and commercial waterways that bound and powered a superpower.",
  alternates: { canonical: "/infrastructure/aqueducts-waterways" },
});

export async function generateMetadata() {
  const locale = await getServerLocale();
  return getPageMetadata(locale);
}

export default async function AqueductsWaterwaysPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const copy = isRo
    ? {
        breadcrumbSection: "Infrastructură",
        breadcrumbPage: "Apeducte și Căi Navigabile",
        heroEyebrow: "Marile Apeducte și Căi Navigabile",
        heroLead: "CUCERIREA DEȘERTULUI.",
        heroAccent: "NAVIGÂND O NAȚIUNE.",
        heroBody:
          "De la legendarul Canal Erie care a propulsat ascensiunea New York-ului până la minunile inginerești ale Apeductului Californiei și Căii Navigabile Sf. Laurențiu, râurile artificiale și căile navigabile interioare ale Americii au transportat apă și comerț pentru a clădi o superputere continentală.",
        heroStats: [
          { value: "3,000 mi", label: "lungimea coridorului de navigație Intracoastal Waterway" },
          { value: "444 mi", label: "lungimea monumentalului Apeduct al Californiei" },
          { value: "2.5 mld t", label: "marfă transportată prin Calea Sf. Laurențiu din 1959" },
        ],
        lede: "Apa a clădit marile metropole comerciale din Est. Redirecționarea apei a făcut posibilă supraviețuirea și înflorirea Occidentului arid.",
        storyTitle: "Arterele Comerțului și Supraviețuirii",
        storyP1:
          "În 1817, guvernatorul DeWitt Clinton din New York a susținut un proiect pe care criticii l-au numit în râs „Șanțul lui Clinton”: un canal de 363 de mile săpat în sălbăticie cu mâna și cu animale de tracțiune, legând râul Hudson de Marile Lacuri. Finalizat în 1825, Canalul Erie a redus costurile de transport cu peste 90% și a transformat New York-ul în capitala financiară a emisferei vestice, dovedind că infrastructura poate uni și îmbogăți o republică în creștere.",
        storyP2:
          "În Occidentul arid, supraviețuirea a cerut o inginerie la o scară și mai mare. Construit sub viziunea lui William Mulholland, Apeductul din Los Angeles de 233 de mile s-a deschis în 1913, aducând apă din Owens Valley exclusiv prin gravitație pentru a transforma un oraș de coastă prăfuit într-o metropolă globală. Decenii mai târziu, proiectele federale și de stat precum Central Arizona Project și California State Water Project au creat râuri artificiale masive, pompând milioane de acri-picioare de apă peste lanțuri muntoase și deșerturi arzătoare pentru a susține zeci de milioane de vieți și a hrăni cele mai productive văi agricole ale națiunii.",
        pullWord: "APA ESTE AUR.",
        pullLabel:
          "Principiul călăuzitor al managementului apei în Vest. Fără aceste canale colosale, abundența agricolă din Central Valley a Californiei și orizonturile luminoase din deșertul de sud-vest pur și simplu nu ar putea exista.",
        compareTitle: "Compararea Giganților",
        compareIntro:
          "Explorează dimensiunea infrastructurii de apă a Americii. Selectează mai jos pentru a compara lungimile marilor apeducte municipale și agricole, precum și ale căilor navigabile comerciale.",
        mapTitle: "Canale și Apeducte Continentale",
        mapIntro:
          "Harta interactivă a marilor proiecte de alimentare cu apă și a canalelor comerciale interioare. Atinge sau treci peste o linie pentru lungime, funcție și detalii.",
        mapLabels: {
          eraLabel: "Căi de Apă",
          corridorsLabel: "Treci peste o linie pentru detalii",
          lengthLabel: "Lungime",
          openedLabel: "În serviciu",
          hint: "Ctrl + scroll pentru zoom · trageți pentru panoramare",
          zoomHint: "Ctrl + scroll pentru zoom · trageți pentru panoramare",
        },
        bandTitle: "Sistemul Mississippi și Intracoastal Waterway",
        bandP1:
          "Bazinul fluviului Mississippi, combinat cu Intracoastal Waterway, formează cea mai extinsă rețea protejată de transport pe apă din lume. Întinzându-se pe 3.000 de mile, Intracoastal Waterway oferă o rută interioară sigură pentru ca barjele comerciale să transporte petrol, cărbune și produse agricole de-a lungul coastelor Atlanticului și Golfului, fără a se confrunta cu pericolele mării deschise.",
        bandP2:
          "Integrat cu Marile Lacuri prin Canalul de Nave și Sanitar din Chicago, acest sistem leagă inima industrială a țării de rutele comerciale globale, facilitând transportul ieftin și eficient al mărfurilor vrac către porturile oceanice.",
        bandAlt: "Fluviul Mississippi curgând prin Minneapolis",
        engineeringTitle: "Ingineria Debitelor",
        stats: [
          { value: "≈650M gal", label: "livrate zilnic către New York prin tunelul Delaware" },
          { value: "2,444 ft", label: "înălțimea de pompare atinsă de pompele Central Arizona Project" },
          { value: "27 ft", label: "pescajul minim menținut de ecluzele Căii Sf. Laurențiu" },
        ],
        facts: [
          {
            fact: "Apeductul Delaware: Cel mai lung tunel din lume",
            detail:
              "Finalizat în 1945, Apeductul Delaware este un tunel continuu de beton de 85 de mile săpat în rocă masivă la adâncimi de până la 2.500 de picioare sub suprafață. Livrând jumătate din apa potabilă curată a New York-ului exclusiv prin gravitație, rămâne cel mai lung tunel subteran continuu de pe Pământ.",
          },
          {
            fact: "Inversarea cursului Râului Chicago",
            detail:
              "Confruntați cu o epidemie gravă de febră tifoidă la sfârșitul secolului al XIX-lea, inginerii din Chicago au realizat de neconceputul în 1900. Săpând Canalul Sanitar și de Nave din Chicago, ei au inversat cursul râului Chicago, depărtându-l de Lacul Michigan și trimițând apele reziduale spre Mississippi, protejând astfel apa potabilă a metropolei într-una dintre cele mai mari isprăvi de inginerie sanitară din istorie.",
          },
        ],
        quote:
          "De-a lungul Canalului Erie, resursele unei națiuni au curs liber, și împreună cu ele, spiritul unei republici continentale unite.",
        quoteAttribution: "Comentariu istoric asupra primelor rețele de transport americane",
        quoteTitle: "Construirea Uniunii",
        prevLink: "← Rețeaua Electrică",
        nextLink: "↑ Prezentare Infrastructură",
      }
    : {
        breadcrumbSection: "Infrastructure",
        breadcrumbPage: "Aqueducts & Waterways",
        heroEyebrow: "Great Aqueducts & Waterways",
        heroLead: "CONQUERING THE DESERT.",
        heroAccent: "FLOATING A NATION.",
        heroBody:
          "From the historic Erie Canal that sparked the rise of New York to the engineering marvels of the California Aqueduct and the St. Lawrence Seaway, America's artificial rivers and inland waterways have moved water and commerce to forge a continental superpower.",
        heroStats: [
          { value: "3,000 mi", label: "length of the Intracoastal Waterway inland navigation corridor" },
          { value: "444 mi", label: "length of the monumental California Aqueduct" },
          { value: "2.5B tons", label: "of cargo carried by the St. Lawrence Seaway since 1959" },
        ],
        lede: "Water built the great commercial hubs of the East. The redirection of water made survival and growth possible in the arid West.",
        storyTitle: "The Lifelines of Commerce & Survival",
        storyP1:
          "In 1817, Governor DeWitt Clinton of New York championed a project critics ridiculed as 'Clinton's Ditch': a 363-mile canal dug through wilderness by hand and draft animals, linking the Hudson River to the Great Lakes. Completed in 1825, the Erie Canal slashed shipping costs by over 90% and transformed New York City into the financial capital of the Western Hemisphere, proving that infrastructure could unify and enrich a growing republic.",
        storyP2:
          "In the arid West, survival demanded engineering on an even grander scale. Built under the vision of William Mulholland, the 233-mile Los Angeles Aqueduct opened in 1913, carrying water from the Owens Valley entirely by gravity to transform a dusty coastal town into a global metropolis. Decades later, federal and state projects like the Central Arizona Project and the California State Water Project created massive artificial rivers, lifting millions of acre-feet of water over mountain ranges and across burning deserts to sustain tens of millions of lives and feed the nation's most productive agricultural valleys.",
        pullWord: "WATER IS GOLD.",
        pullLabel:
          "The guiding principle of Western water management. Without these colossal channels, the agricultural bounty of California's Central Valley and the neon skylines of the desert Southwest could not exist.",
        compareTitle: "Comparing the Giants",
        compareIntro:
          "Explore the scale of America's water infrastructure. Toggle below to compare the lengths of the major municipal and agricultural aqueducts, and the critical commercial waterways.",
        mapTitle: "Continental Aqueducts & Waterways",
        mapIntro:
          "The interactive map of America's major water conveyance systems and inland commercial channels. Hover or tap a line for length, role, and details.",
        mapLabels: {
          eraLabel: "Waterways",
          corridorsLabel: "Hover a line for its details",
          lengthLabel: "Length",
          openedLabel: "In service",
          hint: "Ctrl + scroll to zoom · drag to pan",
          zoomHint: "Ctrl + scroll to zoom · drag to pan",
        },
        bandTitle: "The Mississippi & Intracoastal Waterway System",
        bandP1:
          "The Mississippi River basin, combined with the Intracoastal Waterway, forms the most expansive protected water transport network in the world. Stretching over 3,000 miles, the Intracoastal Waterway provides a safe, inland route for commercial barges to transport petroleum, coal, and agricultural goods along the Atlantic and Gulf coasts without facing the hazards of the open sea.",
        bandP2:
          "Integrated with the Great Lakes via the Chicago Sanitary and Ship Canal, this system binds the industrial heartland to global trade routes, facilitating cheap and efficient bulk cargo transport to ocean ports.",
        bandAlt: "The Mississippi River flowing through Minneapolis",
        engineeringTitle: "Engineering the Flows",
        stats: [
          { value: "≈650M gal", label: "delivered daily by the Delaware Aqueduct tunnel to New York City" },
          { value: "2,444 ft", label: "elevation lift achieved by the Central Arizona Project pumps" },
          { value: "27 ft", label: "minimum draft depth maintained across the St. Lawrence Seaway locks" },
        ],
        facts: [
          {
            fact: "The Delaware Aqueduct: World's Longest Tunnel",
            detail:
              "Completed in 1945, the Delaware Aqueduct is a continuous 85-mile circular concrete tunnel carved through solid bedrock at depths up to 2,500 feet below the surface. Delivering half of New York City's clean drinking water entirely by gravity, it remains the longest continuous underground tunnel on Earth.",
          },
          {
            fact: "Reversing the Chicago River",
            detail:
              "Faced with a waterborne typhoid epidemic in the late 19th century, Chicago engineers achieved the unthinkable in 1900. By cutting the Chicago Sanitary and Ship Canal, they reversed the flow of the Chicago River away from Lake Michigan, sending the city's effluent down toward the Mississippi and protecting the city's drinking water in one of history's greatest feats of sanitary engineering.",
          },
        ],
        quote:
          "Along the Erie Canal, a nation's resources flowed, and with them, the spirit of a united, continental republic.",
        quoteAttribution: "Historical commentary on early American transport",
        quoteTitle: "Building the Union",
        prevLink: "← The Power Grid",
        nextLink: "↑ Infrastructure Overview",
      };

  return (
    <>
      <MacroStyles />
      <MacroHero
        imageSrc={SITE_IMAGES.landscapes.coloradoRiver}
        imageAlt={isRo ? "Canionul râului Colorado" : "The Colorado River canyon"}
        eyebrow={copy.heroEyebrow}
        titleLead={copy.heroLead}
        titleAccent={copy.heroAccent}
        description={copy.heroBody}
        stats={copy.heroStats}
      />

      <div className="relative z-10 bg-[#000000] pb-32 pt-16">
        <div className="mx-auto mb-24 max-w-[1600px] px-6 md:px-12">
          <Breadcrumb
            items={[
              { label: copy.breadcrumbSection, href: "/infrastructure" },
              { label: copy.breadcrumbPage },
            ]}
          />
        </div>

        <div className="mx-auto max-w-[1600px] space-y-40 px-6 md:space-y-48 md:px-12">
          {/* ── Story section ── */}
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

          {/* ── "WATER IS GOLD" pull moment ── */}
          <section className="border-t border-white/5 pt-24">
            <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
              <p className="font-macro-display text-[clamp(48px,9vw,140px)] font-black leading-none tracking-tighter text-[#E8B923]">
                {copy.pullWord}
              </p>
              <p className="macro-body mt-8 max-w-3xl">{copy.pullLabel}</p>
            </div>
          </section>

          {/* ── Interactive map ── */}
          <section className="border-t border-white/5 pt-24">
            <span className="macro-eyebrow">{isRo ? "Harta Interactivă" : "Interactive Map"}</span>
            <h2 className="macro-section-title mb-8 mt-6">{copy.mapTitle}</h2>
            <p className="macro-body mb-14 max-w-4xl">{copy.mapIntro}</p>
            <NetworkMap
              locale={locale}
              eras={[{ id: "waterway", label: { en: "Waterways", ro: "Ape" }, sublabel: { en: "Today", ro: "Prezent" } }]}
              routes={[]}
              nodes={[]}
              accent="#E8B923"
              backgroundNetwork
              variant="water"
              backgroundGeoms={waterwaysData as unknown as Record<string, { segments: [number, number][][]; miles: number }>}
              hideEraToggle
              initialEra="waterway"
              labels={copy.mapLabels}
            />
          </section>

          {/* ── WaterwayComparison ranked chart section ── */}
          <section className="border-t border-white/5 pt-24">
            <h2 className="macro-section-title mb-8">{copy.compareTitle}</h2>
            <p className="macro-body mb-14 max-w-4xl">{copy.compareIntro}</p>
            <div className="max-w-5xl">
              <WaterwayComparison locale={locale} />
            </div>
          </section>

          {/* ── Mississippi band ── */}
          <InfrastructureBand imageSrc={SITE_IMAGES.landscapes.mississippi} imageAlt={copy.bandAlt} fullBleed>
            <h2 className="macro-section-title mb-6 mt-4">{copy.bandTitle}</h2>
            <p className="macro-body max-w-4xl mb-6">{copy.bandP1}</p>
            <p className="macro-body max-w-4xl">{copy.bandP2}</p>
          </InfrastructureBand>

          {/* ── Stats & Facts section ── */}
          <section>
            <h2 className="macro-section-title mb-16">{copy.engineeringTitle}</h2>
            <div className="grid gap-16 border-t border-[#E8B923]/30 pt-16 sm:grid-cols-3">
              {copy.stats.map((s) => (
                <MacroStat key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
            <div className="mt-20 grid gap-16 md:grid-cols-2">
              {copy.facts.map((f) => (
                <MacroFact key={f.fact} fact={f.fact} detail={f.detail} />
              ))}
            </div>
          </section>

          {/* ── Quote Block ── */}
          <div className="border-t border-white/5 pb-8 pt-24">
            <QuoteBlock
              quote={copy.quote}
              attribution={copy.quoteAttribution}
              title={copy.quoteTitle}
              variant="dark"
            />
          </div>

          {/* ── Navigation Links ── */}
          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-16">
            <Link
              href="/infrastructure/power-grid"
              className="font-macro-mono text-sm uppercase tracking-widest text-white/50 transition-colors hover:text-white"
            >
              {copy.prevLink}
            </Link>
            <Link
              href="/infrastructure"
              className="font-macro-mono text-sm uppercase tracking-widest text-[#E8B923] transition-colors hover:text-white"
            >
              {copy.nextLink}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
