// ─── The Hudson River Painters ───────────────────────────────────────────────
// Built out from a 53-line stub. America's first native art movement (c. 1825–
// 1875): landscape painters who cast the American wilderness as a new Eden and a
// national scripture, from Thomas Cole's moral allegories to Frederic Church's
// blockbuster panoramas and the westward canvases of Bierstadt and Moran that
// helped invent the national parks. Museum-plate layout on the Art design system.
//
// All imagery is stored locally in /IMAGES/Art and /IMAGES/Architecture, wired
// through lib/data/art-assets.ts.

import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import {
  ArtStyles,
  ArtSingleHero,
  ArtHeroTitle,
  ArtStatWall,
  ArtParallaxBand,
  ArtQuoteBreak,
  ArtFactModule,
} from "@/components/art-architecture/ArtAnimations";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { ART_ASSETS } from "@/lib/data/art-assets";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "The Hudson River Painters | Art & Architecture",
  description:
    "America's first native art movement. From Thomas Cole's moral allegories to Frederic Church's blockbuster panoramas and the westward canvases that helped create the national parks, the Hudson River School painted the wilderness as a new Eden.",
  alternates: { canonical: "/art-architecture/hudson-river-school" },
};

interface Plate {
  key: keyof typeof ART_ASSETS;
  artist: string;
  title: string;
  year: string;
  en: string;
  ro: string;
}

const COLE: Plate[] = [
  {
    key: "coleConsummation", artist: "Thomas Cole", title: "The Consummation of Empire", year: "1836",
    en: "The centerpiece of Cole's five-part allegory The Course of Empire, which traces a civilization from wilderness to imperial splendor to ruin. Cole made his landscapes carry moral weight, a warning to a young republic tempted by wealth and expansion.",
    ro: "Piesa centrală a alegoriei în cinci părți a lui Cole, The Course of Empire, care urmărește o civilizație de la sălbăticie la splendoare imperială și apoi la ruină. Cole a făcut peisajele să poarte greutate morală, un avertisment pentru o republică tânără ispitită de bogăție și expansiune.",
  },
  {
    key: "coleVoyage", artist: "Thomas Cole", title: "The Voyage of Life: Youth", year: "1842",
    en: "The second canvas of another allegorical cycle, in which a figure sails the river of life beneath a shining castle in the clouds. Cole's landscapes were sermons in paint, fusing the American scene with Christian and classical meaning.",
    ro: "A doua pânză a unui alt ciclu alegoric, în care o siluetă navighează pe râul vieții sub un castel strălucitor în nori. Peisajele lui Cole erau predici în vopsea, îmbinând scena americană cu semnificații creștine și clasice.",
  },
];

const CHURCH: Plate[] = [
  {
    key: "churchNiagara", artist: "Frederic Edwin Church", title: "Niagara", year: "1857",
    en: "Church, Cole's only pupil, became the most famous painter in America. His Niagara put the viewer on the very brink of the falls with no shoreline for safety, and it toured as a ticketed attraction, a single painting people paid to see.",
    ro: "Church, singurul elev al lui Cole, a devenit cel mai faimos pictor din America. Niagara plasa privitorul chiar pe buza cascadei, fără mal salvator, și a fost expusă ca o atracție cu bilet, un singur tablou pe care oamenii plăteau să-l vadă.",
  },
  {
    key: "churchAndes", artist: "Frederic Edwin Church", title: "The Heart of the Andes", year: "1859",
    en: "A five-by-ten-foot South American panorama unveiled in a darkened gallery with gas jets and potted plants, framed like a window. Thousands paid admission and studied it through opera glasses. It was spectacle, science and religion at once.",
    ro: "Un panoram sud-american de un metru și jumătate pe trei, dezvăluit într-o galerie întunecată cu becuri de gaz și plante, încadrat ca o fereastră. Mii de oameni au plătit intrarea și l-au studiat prin binocluri de operă. Era în același timp spectacol, știință și religie.",
  },
  {
    key: "churchEcuador", artist: "Frederic Edwin Church", title: "The Andes of Ecuador", year: "1855",
    en: "Church followed the naturalist Alexander von Humboldt to the equator, painting the Andes with a botanist's precision and a believer's awe. Light itself is the subject, pouring through the composition toward a radiant, hazed horizon.",
    ro: "Church l-a urmat pe naturalistul Alexander von Humboldt la ecuator, pictând Anzii cu precizia unui botanist și uimirea unui credincios. Lumina însăși este subiectul, revărsându-se prin compoziție spre un orizont radiant.",
  },
];

const WEST: Plate[] = [
  {
    key: "bierstadtLandersPeak", artist: "Albert Bierstadt", title: "The Rocky Mountains, Lander's Peak", year: "1863",
    en: "Bierstadt joined a government survey west and returned with vast, glowing canvases of the Rockies. Lander's Peak sold for a record sum and fixed the image of the American West as a luminous, God-touched frontier.",
    ro: "Bierstadt s-a alăturat unei expediții guvernamentale spre vest și s-a întors cu pânze uriașe și strălucitoare ale Munților Stâncoși. Lander's Peak s-a vândut la o sumă record și a fixat imaginea Vestului american ca o frontieră luminoasă, atinsă de Dumnezeu.",
  },
  {
    key: "bierstadtYosemite", artist: "Albert Bierstadt", title: "Valley of the Yosemite", year: "1864",
    en: "Bierstadt's Yosemite canvases bathed the valley in golden, theatrical light. They were exhibited back east as evidence of a wonder worth protecting, part of the argument that led to the Yosemite Grant of 1864.",
    ro: "Pânzele Yosemite ale lui Bierstadt scăldau valea într-o lumină aurie, teatrală. Au fost expuse în est ca dovadă a unei minuni ce merită protejată, parte a argumentului care a dus la Yosemite Grant din 1864.",
  },
  {
    key: "bierstadtSierra", artist: "Albert Bierstadt", title: "Among the Sierra Nevada", year: "1868",
    en: "Painted in Rome for a European audience, this idealized Sierra scene made the American wilderness a sublime cathedral of light, deer at the water, mist rising to peaks lit like an altarpiece.",
    ro: "Pictată la Roma pentru un public european, această scenă idealizată a Sierrei a făcut din sălbăticia americană o catedrală sublimă a luminii, cerbi la apă, ceață urcând spre piscuri luminate ca un retablu.",
  },
  {
    key: "moranYellowstone", artist: "Thomas Moran", title: "The Grand Canyon of the Yellowstone", year: "1872",
    en: "Moran traveled with the 1871 Hayden survey, and his watercolors and this monumental canvas helped persuade Congress to make Yellowstone the world's first national park in 1872. Landscape painting had become an act of statecraft.",
    ro: "Moran a călătorit cu expediția Hayden din 1871, iar acuarelele sale și această pânză monumentală au ajutat la convingerea Congresului să facă din Yellowstone primul parc național din lume, în 1872. Pictura de peisaj devenise un act de guvernare.",
  },
];

function PlateImage({ k, isRo }: { k: keyof typeof ART_ASSETS; isRo: boolean }) {
  const a = ART_ASSETS[k];
  return (
    <div className="relative w-full overflow-hidden border border-white/10 bg-[var(--art-surface)]">
      <Image src={a.src} alt={isRo ? a.altRo : a.alt} width={1600} height={1100} className="h-auto w-full object-contain" sizes="(max-width: 768px) 100vw, 60vw" />
    </div>
  );
}

export default async function HudsonRiverSchoolPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const copy = isRo
    ? {
        home: "Acasă", section: "Artă & Arhitectură", pageLabel: "Pictorii de pe Râul Hudson",
        eyebrow: "PRIMA ȘCOALĂ AMERICANĂ · 1825–1875",
        line1: "RÂUL", line2: "HUDSON",
        heroBody:
          "Prima mișcare de artă autohtonă a Americii. Pictori de peisaj care au înfățișat sălbăticia americană ca un nou Eden și o scriptură națională.",
        thesisLabel: "O SCRIPTURĂ ÎN PEISAJ",
        thesisTitle: "Când America și-a găsit propria pânză",
        thesisBody:
          "Înainte de Râul Hudson, America împrumuta formele Europei. Apoi, în jurul lui 1825, o generație de pictori a decis că peisajul american, sălbatic, vast, neatins, era subiectul demn de o națiune nouă. Au transformat munții și pădurile în catedrale ale luminii și au făcut din natură purtătoarea identității naționale.",
        coleLabel: "FONDATORUL",
        coleTitle: "Thomas Cole, moralistul",
        coleBody:
          "Un imigrant englez care a urcat pe Hudson în 1825 și a găsit o vocație. Cole a fondat mișcarea și a insistat ca peisajul să spună ceva: despre providență, despre ambiție, despre soarta imperiilor.",
        durandLabel: "MANIFESTUL",
        durandTitle: "Kindred Spirits",
        durandBody:
          "Când Cole a murit în 1848, Asher B. Durand l-a pictat stând pe o stâncă din Catskill alături de poetul William Cullen Bryant. Kindred Spirits (1849) a devenit manifestul mișcării: artistul și poetul, contemplând împreună natura ca sursă a adevărului.",
        churchLabel: "VEDETA",
        churchTitle: "Frederic Church și tabloul-spectacol",
        churchBody:
          "Elevul lui Cole a dus mișcarea la apogeu. Church picta panorame uriașe pe care le expunea ca evenimente cu bilet, tablouri unice pe care mulțimile plăteau să le vadă prin binocluri de operă.",
        luminismLabel: "LUMINISM",
        luminismTitle: "Lumina tăcută",
        luminismBody:
          "O ramură mai liniștită a școlii, luminismul, a renunțat la dramă pentru o lumină imobilă și limpede. Lacul George al lui John Frederick Kensett este aer și apă aproape fără gest, o contemplație a tăcerii.",
        westLabel: "SPRE VEST",
        westTitle: "Bierstadt, Moran și nașterea parcurilor",
        westBody:
          "Pe măsură ce națiunea se extindea spre vest, pictorii au urmat-o. Pânzele strălucitoare ale lui Bierstadt și Moran nu doar au înregistrat Vestul, ci l-au și protejat: picturile lui Moran au ajutat la crearea primului parc național din lume.",
        quote: "Fața nedomesticită a țării este scrisă cu poezia lui Dumnezeu.",
        quoteBy: "Thomas Cole, „Eseu despre peisajul american”, 1836",
        factFact: "1872",
        factDetail: "Picturile lui Thomas Moran ale Yellowstone au ajutat la convingerea Congresului să creeze primul parc național din lume, transformând pictura de peisaj într-un act de conservare.",
        factSource: "Grand Canyon of the Yellowstone · Actul Yellowstone, 1872",
      }
    : {
        home: "Home", section: "Art & Architecture", pageLabel: "The Hudson River Painters",
        eyebrow: "THE FIRST AMERICAN SCHOOL · 1825–1875",
        line1: "THE HUDSON", line2: "RIVER SCHOOL",
        heroBody:
          "America's first native art movement. Landscape painters who cast the American wilderness as a new Eden and a national scripture.",
        thesisLabel: "A SCRIPTURE IN LANDSCAPE",
        thesisTitle: "When America found its own canvas",
        thesisBody:
          "Before the Hudson River School, America borrowed Europe's forms. Then, around 1825, a generation of painters decided that the American landscape itself, wild, vast, and untouched, was the subject worthy of a new nation. They turned mountains and forests into cathedrals of light and made nature the carrier of national identity.",
        coleLabel: "THE FOUNDER",
        coleTitle: "Thomas Cole, the moralist",
        coleBody:
          "An English immigrant who traveled up the Hudson in 1825 and found a calling. Cole founded the movement and insisted that a landscape should say something, about providence, about ambition, about the fate of empires.",
        durandLabel: "THE MANIFESTO",
        durandTitle: "Kindred Spirits",
        durandBody:
          "When Cole died in 1848, Asher B. Durand painted him standing on a Catskill ledge beside the poet William Cullen Bryant. Kindred Spirits (1849) became the movement's manifesto: the painter and the poet, contemplating nature together as the source of truth.",
        churchLabel: "THE SUPERSTAR",
        churchTitle: "Frederic Church and the blockbuster painting",
        churchBody:
          "Cole's pupil took the movement to its peak. Church painted enormous panoramas and exhibited them as ticketed events, single canvases that crowds paid to study through opera glasses.",
        luminismLabel: "LUMINISM",
        luminismTitle: "The silent light",
        luminismBody:
          "A quieter branch of the school, Luminism, traded drama for a still, clear light. John Frederick Kensett's Lake George is air and water with almost no gesture, a contemplation of silence.",
        westLabel: "GOING WEST",
        westTitle: "Bierstadt, Moran, and the birth of the parks",
        westBody:
          "As the nation pushed west, the painters followed. The glowing canvases of Bierstadt and Moran did not merely record the West, they helped protect it: Moran's paintings helped create the world's first national park.",
        quote: "The wilderness is yet a fitting place to speak of God.",
        quoteBy: "Thomas Cole, \"Essay on American Scenery,\" 1836",
        factFact: "1872",
        factDetail: "Thomas Moran's paintings of Yellowstone helped persuade Congress to create the world's first national park, turning landscape painting into an act of conservation.",
        factSource: "Grand Canyon of the Yellowstone · The Yellowstone Act, 1872",
      };

  return (
    <>
      <ArtStyles />
      <main style={{ background: "var(--art-void)" }} className="min-h-screen text-white">
        <ArtSingleHero
          imageSrc={ART_ASSETS.bierstadtLandersPeak.src}
          imageAlt={isRo ? ART_ASSETS.bierstadtLandersPeak.altRo : ART_ASSETS.bierstadtLandersPeak.alt}
          badge={isRo ? "1863 · ALBERT BIERSTADT" : "1863 · ALBERT BIERSTADT"}
          label={isRo ? "MUNȚII STÂNCOȘI, VÂRFUL LANDER" : "THE ROCKY MOUNTAINS, LANDER'S PEAK"}
        >
          <ArtHeroTitle eyebrow={copy.eyebrow} line1={copy.line1} line2={copy.line2} body={copy.heroBody}>
            <div className="mt-8">
              <Breadcrumb
                items={[{ label: copy.home, href: "/" }, { label: copy.section, href: "/art-architecture" }, { label: copy.pageLabel }]}
                className="py-0 text-white/80"
              />
            </div>
          </ArtHeroTitle>
        </ArtSingleHero>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Thesis */}
          <section className="py-16 md:py-24">
            <p className="art-text-label mb-6" style={{ color: "var(--art-accent-copper)" }}>{copy.thesisLabel}</p>
            <h2 className="art-text-section mb-8 max-w-4xl text-white" style={{ fontSize: "clamp(26px, 4vw, 52px)" }}>{copy.thesisTitle}</h2>
            <p className="max-w-3xl font-sans text-lg leading-relaxed text-white/70">{copy.thesisBody}</p>
            <div className="mt-14 border-y border-white/10">
              <ArtStatWall
                stats={[
                  { value: 1825, label: isRo ? "Mișcarea începe" : "The movement begins" },
                  { value: 50, suffix: "+", label: isRo ? "Ani de dominație" : "Years of dominance" },
                  { value: 1, prefix: "#", label: isRo ? "Prima școală americană" : "First American school" },
                  { value: 1872, label: isRo ? "Primul parc național" : "First national park" },
                ]}
              />
            </div>
          </section>

          {/* Thomas Cole */}
          <section className="border-t border-white/10 py-16 md:py-24">
            <p className="art-text-label mb-4" style={{ color: "var(--art-accent-copper)" }}>{copy.coleLabel}</p>
            <h2 className="art-text-section mb-6 text-white" style={{ fontSize: "clamp(24px, 3.5vw, 44px)" }}>{copy.coleTitle}</h2>
            <p className="mb-12 max-w-3xl font-sans text-base leading-relaxed text-white/70">{copy.coleBody}</p>
            <div className="mb-12">
              <PlateImage k="coleOxbow" isRo={isRo} />
              <p className="mt-4 font-sans text-sm text-white/60"><span className="text-white/90">Thomas Cole, The Oxbow, 1836.</span> {isRo ? "Pânza fondatoare: pădurea sălbatică într-o parte, câmpul cultivat în cealaltă, iar artistul minuscul la mijloc." : "The founding canvas: wild forest on one side, cultivated field on the other, and the tiny artist between them."}</p>
            </div>
            <div className="grid gap-10 md:grid-cols-2">
              {COLE.map((p) => (
                <figure key={p.key}>
                  <PlateImage k={p.key} isRo={isRo} />
                  <figcaption className="mt-4">
                    <div className="font-sans text-sm text-white/90">{p.artist}, {p.title}, {p.year}</div>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-white/60">{isRo ? p.ro : p.en}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        </div>

        <ArtParallaxBand imageSrc={ART_ASSETS.churchAndes.src} imageAlt={isRo ? ART_ASSETS.churchAndes.altRo : ART_ASSETS.churchAndes.alt} height={520} />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Durand */}
          <section className="py-16 md:py-24">
            <p className="art-text-label mb-4" style={{ color: "var(--art-accent-copper)" }}>{copy.durandLabel}</p>
            <h2 className="art-text-section mb-6 text-white" style={{ fontSize: "clamp(24px, 3.5vw, 44px)" }}>{copy.durandTitle}</h2>
            <div className="grid items-center gap-10 md:grid-cols-2">
              <PlateImage k="durandKindredSpirits" isRo={isRo} />
              <p className="font-sans text-base leading-relaxed text-white/70">{copy.durandBody}</p>
            </div>
          </section>

          {/* Church */}
          <section className="border-t border-white/10 py-16 md:py-24">
            <p className="art-text-label mb-4" style={{ color: "var(--art-accent-copper)" }}>{copy.churchLabel}</p>
            <h2 className="art-text-section mb-6 text-white" style={{ fontSize: "clamp(24px, 3.5vw, 44px)" }}>{copy.churchTitle}</h2>
            <p className="mb-12 max-w-3xl font-sans text-base leading-relaxed text-white/70">{copy.churchBody}</p>
            <div className="grid gap-10 lg:grid-cols-3">
              {CHURCH.map((p) => (
                <figure key={p.key}>
                  <PlateImage k={p.key} isRo={isRo} />
                  <figcaption className="mt-4">
                    <div className="font-sans text-sm text-white/90">{p.title}, {p.year}</div>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-white/60">{isRo ? p.ro : p.en}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          {/* Luminism */}
          <section className="border-t border-white/10 py-16 md:py-24">
            <p className="art-text-label mb-4" style={{ color: "var(--art-accent-copper)" }}>{copy.luminismLabel}</p>
            <h2 className="art-text-section mb-6 text-white" style={{ fontSize: "clamp(24px, 3.5vw, 44px)" }}>{copy.luminismTitle}</h2>
            <div className="grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
              <PlateImage k="kensettLakeGeorge" isRo={isRo} />
              <p className="font-sans text-base leading-relaxed text-white/70">{copy.luminismBody}</p>
            </div>
          </section>
        </div>

        <ArtQuoteBreak quote={copy.quote} attribution={copy.quoteBy} />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* West */}
          <section className="py-16 md:py-24">
            <p className="art-text-label mb-4" style={{ color: "var(--art-accent-copper)" }}>{copy.westLabel}</p>
            <h2 className="art-text-section mb-6 text-white" style={{ fontSize: "clamp(24px, 3.5vw, 44px)" }}>{copy.westTitle}</h2>
            <p className="mb-12 max-w-3xl font-sans text-base leading-relaxed text-white/70">{copy.westBody}</p>
            <div className="grid gap-10 md:grid-cols-2">
              {WEST.map((p) => (
                <figure key={p.key}>
                  <PlateImage k={p.key} isRo={isRo} />
                  <figcaption className="mt-4">
                    <div className="font-sans text-sm text-white/90">{p.artist}, {p.title}, {p.year}</div>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-white/60">{isRo ? p.ro : p.en}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="border-t border-white/10 py-16 md:py-24">
            <ArtFactModule fact={copy.factFact} detail={copy.factDetail} source={copy.factSource} color="crimson" />
          </section>
        </div>

        <AskAmericaCTA
          locale={locale}
          descriptionEn="Ask the AI Oracle about Thomas Cole's Course of Empire, Frederic Church's blockbuster exhibitions, Luminism, or how Thomas Moran's paintings helped create Yellowstone."
          descriptionRo="Întreabă Oracolul AI despre Course of Empire al lui Thomas Cole, expozițiile-eveniment ale lui Frederic Church, luminism sau cum picturile lui Thomas Moran au ajutat la crearea Yellowstone."
        />
      </main>
    </>
  );
}
