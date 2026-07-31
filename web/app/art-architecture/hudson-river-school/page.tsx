// ─── The Hudson River Painters ───────────────────────────────────────────────
// America's first native art movement (c. 1825–1875), presented as a warm gallery
// wall: full-bleed sublime hero, gilt-framed altarpieces with engraved wall labels,
// editorial serif typography, and full-bleed panorama bands. From Thomas Cole's
// moral allegories to Church's blockbuster panoramas and the westward canvases of
// Bierstadt and Moran that helped invent the national parks.
//
// Imagery is local, wired through lib/data/art-assets.ts.

import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ArtStyles, ArtParallaxBand } from "@/components/art-architecture/ArtAnimations";
import { ArtFramedPlate, SpotlightPiece } from "@/components/art-architecture/GalleryPieces";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { ART_ASSETS } from "@/lib/data/art-assets";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "The Hudson River Painters | Art & Architecture",
  description:
    "America's first native art movement. From Thomas Cole's moral allegories to Frederic Church's blockbuster panoramas and the westward canvases that helped create the national parks, the Hudson River School painted the wilderness as a new Eden.",
  alternates: { canonical: "/art-architecture/hudson-river-school" },
};

const WALL = "#14100a";
const GOLD = "#c9a24a";

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
    en: "The centerpiece of Cole's five-part allegory The Course of Empire, tracing a civilization from wilderness to imperial splendor to ruin. Cole made his landscapes carry moral weight, a warning to a young republic tempted by wealth and expansion.",
    ro: "Piesa centrală a alegoriei în cinci părți a lui Cole, The Course of Empire, care urmărește o civilizație de la sălbăticie la splendoare imperială și apoi la ruină. Cole a făcut peisajele să poarte greutate morală, un avertisment pentru o republică tânără ispitită de bogăție.",
  },
  {
    key: "coleVoyage", artist: "Thomas Cole", title: "The Voyage of Life: Youth", year: "1842",
    en: "From another allegorical cycle: a figure sails the river of life toward a shining castle in the clouds. Cole's landscapes were sermons in paint, fusing the American scene with Christian and classical meaning.",
    ro: "Dintr-un alt ciclu alegoric: o siluetă navighează pe râul vieții spre un castel strălucitor din nori. Peisajele lui Cole erau predici în vopsea, îmbinând scena americană cu semnificații creștine și clasice.",
  },
];

const CHURCH: Plate[] = [
  {
    key: "churchNiagara", artist: "Frederic Edwin Church", title: "Niagara", year: "1857",
    en: "Church, Cole's only pupil, became the most famous painter in America. His Niagara set the viewer on the very brink of the falls with no shoreline for safety, and toured as a ticketed attraction: a single painting people paid to see.",
    ro: "Church, singurul elev al lui Cole, a devenit cel mai faimos pictor din America. Niagara plasa privitorul chiar pe buza cascadei, fără mal salvator, și a fost expusă ca o atracție cu bilet: un singur tablou pe care oamenii plăteau să-l vadă.",
  },
  {
    key: "churchEcuador", artist: "Frederic Edwin Church", title: "The Andes of Ecuador", year: "1855",
    en: "Church followed the naturalist Alexander von Humboldt to the equator, painting the Andes with a botanist's precision and a believer's awe. Light itself is the subject, pouring through toward a radiant, hazed horizon.",
    ro: "Church l-a urmat pe naturalistul Alexander von Humboldt la ecuator, pictând Anzii cu precizia unui botanist și uimirea unui credincios. Lumina însăși este subiectul, revărsându-se spre un orizont radiant.",
  },
];

const WEST: Plate[] = [
  {
    key: "bierstadtYosemite", artist: "Albert Bierstadt", title: "Valley of the Yosemite", year: "1864",
    en: "Bierstadt bathed Yosemite in golden, theatrical light. His canvases were shown back east as evidence of a wonder worth protecting, part of the argument that led to the Yosemite Grant of 1864.",
    ro: "Bierstadt a scăldat Yosemite într-o lumină aurie, teatrală. Pânzele sale au fost expuse în est ca dovadă a unei minuni ce merită protejată, parte a argumentului care a dus la Yosemite Grant din 1864.",
  },
  {
    key: "bierstadtSierra", artist: "Albert Bierstadt", title: "Among the Sierra Nevada", year: "1868",
    en: "Painted in Rome for a European audience, this idealized Sierra scene made the American wilderness a sublime cathedral of light: deer at the water, mist rising to peaks lit like an altarpiece.",
    ro: "Pictată la Roma pentru un public european, această scenă idealizată a Sierrei a făcut din sălbăticia americană o catedrală sublimă a luminii: cerbi la apă, ceață urcând spre piscuri luminate ca un retablu.",
  },
];

export default async function HudsonRiverSchoolPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const t = isRo
    ? {
        home: "Acasă", section: "Artă & Arhitectură", pageLabel: "Pictorii de pe Râul Hudson",
        eyebrow: "PRIMA ȘCOALĂ AMERICANĂ · 1825–1875",
        heroTitle: "Pictorii de pe Râul Hudson",
        heroDeck: "Prima mișcare de artă autohtonă a Americii, care a înfățișat sălbăticia ca un nou Eden și o scriptură națională.",
        thesisLead: "Înainte de Râul Hudson, America împrumuta formele Europei.",
        thesisBody: "Apoi, în jurul lui 1825, o generație de pictori a decis că peisajul american, sălbatic, vast și neatins, era subiectul demn de o națiune nouă. Au transformat munții și pădurile în catedrale ale luminii și au făcut din natură purtătoarea identității naționale. Timp de o jumătate de secol, arta americană a însemnat, înainte de orice, pământul american însuși.",
        coleLabel: "FONDATORUL", coleTitle: "Thomas Cole, moralistul",
        coleBody: "Un imigrant englez care a urcat pe Hudson în 1825 și a găsit o vocație. Cole a fondat mișcarea și a insistat ca peisajul să spună ceva: despre providență, despre ambiție, despre soarta imperiilor. Pânza sa fondatoare, The Oxbow, pune pădurea sălbatică într-o parte și câmpul cultivat în cealaltă, cu artistul minuscul la mijloc.",
        durandBody: "Când Cole a murit în 1848, Asher B. Durand l-a pictat stând pe o stâncă din Catskill alături de poetul William Cullen Bryant. Kindred Spirits a devenit manifestul mișcării: artistul și poetul, contemplând împreună natura ca sursă a adevărului. Titlul e împrumutat din Keats, iar tabloul a fost un dar pentru Bryant după elogiul funebru adus lui Cole.",
        durandLabel: "MANIFESTUL",
        churchLabel: "VEDETA", churchTitle: "Frederic Church și tabloul-spectacol",
        churchBody: "Elevul lui Cole a dus mișcarea la apogeu. Church picta panorame uriașe pe care le expunea ca evenimente cu bilet, tablouri unice pe care mulțimile plăteau să le vadă prin binocluri de operă, într-o galerie întunecată, încadrate ca ferestre spre o altă lume.",
        andesNote: "The Heart of the Andes, 1859: dezvăluită într-o galerie întunecată cu becuri de gaz și plante, studiată de mii de oameni prin binocluri de operă.",
        luminismLabel: "LUMINISM", luminismTitle: "Lumina tăcută",
        luminismBody: "O ramură mai liniștită a școlii, luminismul, a renunțat la dramă pentru o lumină imobilă și limpede. Lacul George al lui John Frederick Kensett este aer și apă aproape fără gest, o contemplație a tăcerii, unde orizontul se dizolvă într-o strălucire uniformă.",
        westLabel: "SPRE VEST", westTitle: "Bierstadt, Moran și nașterea parcurilor",
        westBody: "Pe măsură ce națiunea se extindea spre vest, pictorii au urmat-o. Pânzele strălucitoare ale lui Bierstadt și Moran nu doar au înregistrat Vestul, ci l-au și protejat.",
        moranNote: "Marele Canion al Yellowstone, Thomas Moran, 1872: pânza care a ajutat la crearea primului parc național din lume.",
        quote: "Sălbăticia este încă un loc potrivit pentru a vorbi despre Dumnezeu.",
        quoteBy: "Thomas Cole, „Eseu despre peisajul american”, 1836",
        parksTitle: "Când pictura a devenit conservare",
        parksBody: "Moran a călătorit cu expediția Hayden din 1871. Acuarelele sale și pânza sa monumentală au ajutat la convingerea Congresului să facă din Yellowstone primul parc național din lume, în 1872. Peisajul nu mai era doar frumos; devenise un argument, iar școala care picta pământul a ajutat la salvarea lui.",
      }
    : {
        home: "Home", section: "Art & Architecture", pageLabel: "The Hudson River Painters",
        eyebrow: "THE FIRST AMERICAN SCHOOL · 1825–1875",
        heroTitle: "The Hudson River Painters",
        heroDeck: "America's first native art movement, which cast the wilderness as a new Eden and a national scripture.",
        thesisLead: "Before the Hudson River School, America borrowed Europe's forms.",
        thesisBody: "Then, around 1825, a generation of painters decided that the American landscape itself, wild, vast, and untouched, was the subject worthy of a new nation. They turned mountains and forests into cathedrals of light and made nature the carrier of national identity. For half a century, American art meant, before anything else, the American land itself.",
        coleLabel: "THE FOUNDER", coleTitle: "Thomas Cole, the moralist",
        coleBody: "An English immigrant who traveled up the Hudson in 1825 and found a calling. Cole founded the movement and insisted that a landscape should say something, about providence, about ambition, about the fate of empires. His founding canvas, The Oxbow, sets wild forest on one side and cultivated field on the other, with the tiny artist between them.",
        durandBody: "When Cole died in 1848, Asher B. Durand painted him standing on a Catskill ledge beside the poet William Cullen Bryant. Kindred Spirits became the movement's manifesto: the painter and the poet, contemplating nature together as the source of truth. The title is borrowed from Keats, and the picture was a gift to Bryant after his eulogy for Cole.",
        durandLabel: "THE MANIFESTO",
        churchLabel: "THE SUPERSTAR", churchTitle: "Frederic Church and the blockbuster painting",
        churchBody: "Cole's pupil took the movement to its peak. Church painted enormous panoramas and exhibited them as ticketed events, single canvases that crowds paid to study through opera glasses, in a darkened gallery, framed like windows onto another world.",
        andesNote: "The Heart of the Andes, 1859: unveiled in a darkened gallery with gas jets and potted plants, studied by thousands through opera glasses.",
        luminismLabel: "LUMINISM", luminismTitle: "The silent light",
        luminismBody: "A quieter branch of the school, Luminism, traded drama for a still, clear light. John Frederick Kensett's Lake George is air and water with almost no gesture, a contemplation of silence, where the horizon dissolves into an even glow.",
        westLabel: "GOING WEST", westTitle: "Bierstadt, Moran, and the birth of the parks",
        westBody: "As the nation pushed west, the painters followed. The glowing canvases of Bierstadt and Moran did not merely record the West, they helped protect it.",
        moranNote: "The Grand Canyon of the Yellowstone, Thomas Moran, 1872: the canvas that helped create the world's first national park.",
        quote: "The wilderness is yet a fitting place to speak of God.",
        quoteBy: "Thomas Cole, \"Essay on American Scenery,\" 1836",
        parksTitle: "When painting became conservation",
        parksBody: "Moran traveled with the 1871 Hayden survey. His watercolors and his monumental canvas helped persuade Congress to make Yellowstone the world's first national park in 1872. Landscape was no longer merely beautiful; it had become an argument, and the school that painted the land helped save it.",
      };

  return (
    <>
      <ArtStyles />
      <main style={{ background: WALL }} className="min-h-screen text-[#f3ece0]">
        {/* Full-bleed sublime hero */}
        <section className="relative h-[94vh] min-h-[620px] w-full overflow-hidden">
          <Image
            src={ART_ASSETS.bierstadtLandersPeak.src}
            alt={isRo ? ART_ASSETS.bierstadtLandersPeak.altRo : ART_ASSETS.bierstadtLandersPeak.alt}
            fill priority sizes="100vw" className="object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(20,16,10,0.35) 0%, rgba(20,16,10,0.15) 42%, rgba(20,16,10,0.92) 100%)" }} />
          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto max-w-6xl px-6 pb-16 sm:px-8">
              <p className="mb-5 font-sans text-[11px] font-semibold uppercase tracking-[0.4em]" style={{ color: GOLD }}>{t.eyebrow}</p>
              <h1 className="font-serif text-5xl italic leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl">{t.heroTitle}</h1>
              <p className="mt-6 max-w-2xl font-serif text-xl leading-relaxed text-white/80">{t.heroDeck}</p>
              <div className="mt-8">
                <Breadcrumb items={[{ label: t.home, href: "/" }, { label: t.section, href: "/art-architecture" }, { label: t.pageLabel }]} className="py-0 text-white/70" />
              </div>
            </div>
          </div>
        </section>

        {/* Thesis */}
        <section className="mx-auto max-w-3xl px-6 py-24 md:py-32">
          <p className="font-serif text-3xl leading-[1.35] text-[#f3ece0] md:text-[2.4rem]">
            <span className="float-left mr-3 mt-1 font-serif text-7xl leading-[0.7] md:text-8xl" style={{ color: GOLD }}>{t.thesisLead.charAt(0)}</span>
            {t.thesisLead.slice(1)}
          </p>
          <p className="mt-8 font-sans text-lg leading-relaxed text-white/65">{t.thesisBody}</p>
          <div className="mx-auto mt-14 h-px w-24" style={{ background: GOLD }} />
        </section>

        {/* Cole - the founder */}
        <section className="mx-auto max-w-4xl px-6 pb-24">
          <SectionLabel label={t.coleLabel} title={t.coleTitle} gold={GOLD} />
          <p className="mx-auto mb-14 max-w-2xl text-center font-sans text-base leading-relaxed text-white/65">{t.coleBody}</p>
          <div className="mx-auto max-w-3xl">
            <ArtFramedPlate src={ART_ASSETS.coleOxbow.src} alt={isRo ? ART_ASSETS.coleOxbow.altRo : ART_ASSETS.coleOxbow.alt} artist="Thomas Cole" title="The Oxbow" year="1836" priority />
          </div>
          <div className="mt-16 grid gap-14 md:grid-cols-2">
            {COLE.map((p) => (
              <div key={p.key}>
                <ArtFramedPlate src={ART_ASSETS[p.key].src} alt={isRo ? ART_ASSETS[p.key].altRo : ART_ASSETS[p.key].alt} artist={p.artist} title={p.title} year={p.year} />
                <p className="mx-auto mt-5 max-w-md text-center font-sans text-sm leading-relaxed text-white/55">{isRo ? p.ro : p.en}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Full-bleed band */}
        <ArtParallaxBand imageSrc={ART_ASSETS.churchAndes.src} imageAlt={isRo ? ART_ASSETS.churchAndes.altRo : ART_ASSETS.churchAndes.alt} height={560}>
          <p className="mx-auto max-w-2xl px-6 text-center font-serif text-lg italic text-white/85">{t.andesNote}</p>
        </ArtParallaxBand>

        {/* Durand - the manifesto */}
        <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <SectionLabel label={t.durandLabel} title="Kindred Spirits" gold={GOLD} />
          <div className="mt-6">
            <SpotlightPiece src={ART_ASSETS.durandKindredSpirits.src} alt={isRo ? ART_ASSETS.durandKindredSpirits.altRo : ART_ASSETS.durandKindredSpirits.alt} artist="Asher B. Durand" title="Kindred Spirits" year="1849">
              <p className="font-sans text-lg leading-relaxed text-white/70">{t.durandBody}</p>
            </SpotlightPiece>
          </div>
        </section>

        {/* Church - the superstar */}
        <section className="mx-auto max-w-5xl px-6 pb-24">
          <SectionLabel label={t.churchLabel} title={t.churchTitle} gold={GOLD} />
          <p className="mx-auto mb-14 max-w-2xl text-center font-sans text-base leading-relaxed text-white/65">{t.churchBody}</p>
          <div className="grid gap-14 md:grid-cols-2">
            {CHURCH.map((p) => (
              <div key={p.key}>
                <ArtFramedPlate src={ART_ASSETS[p.key].src} alt={isRo ? ART_ASSETS[p.key].altRo : ART_ASSETS[p.key].alt} artist={p.artist} title={p.title} year={p.year} />
                <p className="mx-auto mt-5 max-w-md text-center font-sans text-sm leading-relaxed text-white/55">{isRo ? p.ro : p.en}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Luminism */}
        <section className="mx-auto max-w-6xl px-6 pb-24 md:pb-32">
          <SectionLabel label={t.luminismLabel} title={t.luminismTitle} gold={GOLD} />
          <div className="mt-6">
            <SpotlightPiece src={ART_ASSETS.kensettLakeGeorge.src} alt={isRo ? ART_ASSETS.kensettLakeGeorge.altRo : ART_ASSETS.kensettLakeGeorge.alt} artist="John F. Kensett" title="Lake George" year="1869" reverse>
              <p className="font-sans text-lg leading-relaxed text-white/70">{t.luminismBody}</p>
            </SpotlightPiece>
          </div>
        </section>

        {/* Pull quote */}
        <section className="px-6 py-24 md:py-36" style={{ background: "#0e0b06" }}>
          <blockquote className="mx-auto max-w-4xl text-center">
            <p className="font-serif text-3xl italic leading-[1.3] text-[#f3ece0] md:text-5xl">&ldquo;{t.quote}&rdquo;</p>
            <footer className="mt-8 font-sans text-xs uppercase tracking-[0.3em]" style={{ color: GOLD }}>{t.quoteBy}</footer>
          </blockquote>
        </section>

        {/* West */}
        <section className="mx-auto max-w-5xl px-6 py-24 md:py-32">
          <SectionLabel label={t.westLabel} title={t.westTitle} gold={GOLD} />
          <p className="mx-auto mb-14 max-w-2xl text-center font-sans text-base leading-relaxed text-white/65">{t.westBody}</p>
          <div className="grid gap-14 md:grid-cols-2">
            {WEST.map((p) => (
              <div key={p.key}>
                <ArtFramedPlate src={ART_ASSETS[p.key].src} alt={isRo ? ART_ASSETS[p.key].altRo : ART_ASSETS[p.key].alt} artist={p.artist} title={p.title} year={p.year} />
                <p className="mx-auto mt-5 max-w-md text-center font-sans text-sm leading-relaxed text-white/55">{isRo ? p.ro : p.en}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Moran full-bleed + parks legacy */}
        <ArtParallaxBand imageSrc={ART_ASSETS.moranYellowstone.src} imageAlt={isRo ? ART_ASSETS.moranYellowstone.altRo : ART_ASSETS.moranYellowstone.alt} height={600}>
          <p className="mx-auto max-w-2xl px-6 text-center font-serif text-lg italic text-white/85">{t.moranNote}</p>
        </ArtParallaxBand>

        <section className="mx-auto max-w-3xl px-6 py-24 md:py-32 text-center">
          <h2 className="font-serif text-3xl italic text-[#f3ece0] md:text-[2.6rem]">{t.parksTitle}</h2>
          <p className="mx-auto mt-8 max-w-2xl font-sans text-lg leading-relaxed text-white/65">{t.parksBody}</p>
          <div className="mx-auto mt-10 font-serif text-6xl md:text-7xl" style={{ color: GOLD }}>1872</div>
        </section>

        <AskAmericaCTA
          locale={locale}
          descriptionEn="Ask the AI Oracle about Thomas Cole's Course of Empire, Frederic Church's blockbuster exhibitions, Luminism, or how Thomas Moran's paintings helped create Yellowstone."
          descriptionRo="Întreabă Oracolul AI despre Course of Empire al lui Thomas Cole, expozițiile-eveniment ale lui Frederic Church, luminism sau cum picturile lui Thomas Moran au ajutat la crearea Yellowstone."
        />
      </main>
    </>
  );
}

function SectionLabel({ label, title, gold }: { label: string; title: string; gold: string }) {
  return (
    <div className="mb-8 text-center">
      <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.4em]" style={{ color: gold }}>{label}</p>
      <h2 className="font-serif text-3xl italic leading-tight text-[#f3ece0] md:text-[2.6rem]">{title}</h2>
    </div>
  );
}
