// ─── The Skyscraper Revolution ───────────────────────────────────────────────
// Built out from a 53-line stub. The subject is the one building type America
// genuinely invented, so the page is organised as a height race: nine towers
// that each redefined how tall an American building could be, told through a
// to-scale interactive skyline (SkyscraperRace), plus a gallery of 21st-century
// supertalls and the three engineering breakthroughs that made it possible.
//
// All imagery is stored locally in /IMAGES/Architecture — see lib/data/art-assets.ts

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import {
  ArtStyles,
  ArtSingleHero,
  ArtHeroTitle,
  ArtParallaxBand,
  ArtQuoteBreak,
  ArtFactModule,
} from "@/components/art-architecture/ArtAnimations";
import { SkyscraperRace, type Tower } from "@/components/art-architecture/SkyscraperRace";
import { ART_ASSETS } from "@/lib/data/art-assets";
import { getServerLocale } from "@/lib/i18n/server";
import { BLUR_PLACEHOLDER } from "@/lib/utils";

export const metadata: Metadata = {
  title: "The Skyscraper Revolution | Art & Architecture",
  description:
    "America invented the skyscraper in Chicago in 1885 and never stopped building taller. Nine historical towers, modern 21st-century supertalls, a to-scale height race, and the three inventions that made tall buildings possible.",
  alternates: { canonical: "/art-architecture/skyscraper-revolution" },
};

// The height race. Feet are architectural height.
const TOWERS: Tower[] = [
  {
    key: "home-insurance", name: "Home Insurance Building", city: "Chicago", cityRo: "Chicago",
    year: 1885, feet: 138, meters: 42, architect: "William Le Baron Jenney", asset: "homeInsurance",
    wasWorldsTallest: false,
    note: "The first skyscraper, and the one that made all the others possible. Jenney hung the walls on a steel-and-iron frame instead of stacking them from stone, which meant the building no longer had to hold itself up with sheer mass. Ten storeys looks modest now; it was the idea that mattered.",
    noteRo: "Primul zgârie-nori și cel care i-a făcut posibili pe toți ceilalți. Jenney a suspendat pereții pe un schelet de oțel și fier în loc să-i stivuiască din piatră, astfel încât clădirea nu mai trebuia să se susțină prin masă. Zece etaje par modeste azi; ideea a fost cea care a contat.",
  },
  {
    key: "wainwright", name: "Wainwright Building", city: "St. Louis", cityRo: "St. Louis",
    year: 1891, feet: 135, meters: 41, architect: "Louis Sullivan", asset: "sullivanWainwright",
    note: "Sullivan asked what a tall building should look like now that it no longer had to look like a stack of stone, and answered by making the verticality the whole point — unbroken piers driving the eye upward. 'Form follows function' is his line, and this is where it was argued in brick.",
    noteRo: "Sullivan a întrebat cum ar trebui să arate o clădire înaltă acum că nu mai trebuia să arate ca o stivă de piatră și a răspuns făcând din verticalitate esența — pilaștri neîntrerupți care conduc privirea în sus. „Forma urmează funcția” este replica lui, iar aici a fost argumentată în cărămidă.",
  },
  {
    key: "flatiron", name: "Flatiron Building", city: "New York", cityRo: "New York",
    year: 1902, feet: 285, meters: 87, architect: "Daniel Burnham", asset: "flatiron",
    note: "A steel frame dressed in Beaux-Arts limestone, squeezed onto a triangular block until the building became a prow. New Yorkers were half-convinced the wind would knock it over. It became the most photographed building in the world instead.",
    noteRo: "Un schelet de oțel îmbrăcat în calcar Beaux-Arts, strâns pe un bloc triunghiular până când clădirea a devenit o proră. New York-ezii erau pe jumătate convinși că vântul o va doborî. A devenit în schimb cea mai fotografiată clădire din lume.",
  },
  {
    key: "woolworth", name: "Woolworth Building", city: "New York", cityRo: "New York",
    year: 1913, feet: 792, meters: 241, architect: "Cass Gilbert", asset: "woolworth", wasWorldsTallest: true,
    note: "The 'Cathedral of Commerce' — Gothic tracery running 60 storeys up a steel frame, paid for in cash by the man who sold the nation its five-and-dime goods. World's tallest for seventeen years, and proof that the skyscraper could be beautiful, not merely big.",
    noteRo: "„Catedrala Comerțului” — dantelărie gotică urcând 60 de etaje pe un schelet de oțel, plătită cash de omul care a vândut națiunii mărfuri de bazar. Cea mai înaltă clădire din lume timp de șaptesprezece ani și dovada că zgârie-norul putea fi frumos, nu doar mare.",
  },
  {
    key: "chrysler", name: "Chrysler Building", city: "New York", cityRo: "New York",
    year: 1930, feet: 1046, meters: 319, architect: "William Van Alen", asset: "chrysler", wasWorldsTallest: true,
    note: "Its architect built the stainless-steel spire in secret inside the building, then hoisted it through the roof in 90 minutes to steal the world's-tallest title from a rival mid-race. The Art Deco crown is the most beautiful thing on the New York skyline and everyone knows it.",
    noteRo: "Arhitectul a construit fleșa din oțel inoxidabil în secret în interiorul clădirii, apoi a ridicat-o prin acoperiș în 90 de minute pentru a fura titlul de cea mai înaltă clădire de la un rival în plină cursă. Coroana Art Deco este cel mai frumos lucru de pe silueta New York-ului și toată lumea o știe.",
  },
  {
    key: "empire-state", name: "Empire State Building", city: "New York", cityRo: "New York",
    year: 1931, feet: 1250, meters: 381, architect: "Shreve, Lamb & Harmon", asset: "empireState", wasWorldsTallest: true,
    note: "Built in 410 days during the depths of the Depression, a storey a day at the peak. It held the world's-tallest title for forty years — longer than any building before or since — and became the shape the word 'skyscraper' draws in your head.",
    noteRo: "Construită în 410 zile în adâncul Marii Crize, un etaj pe zi la vârf. A deținut titlul de cea mai înaltă clădire timp de patruzeci de ani — mai mult decât orice clădire înainte sau după — și a devenit forma pe care cuvântul „zgârie-nori” o desenează în minte.",
  },
  {
    key: "seagram", name: "Seagram Building", city: "New York", cityRo: "New York",
    year: 1958, feet: 515, meters: 157, architect: "Mies van der Rohe", asset: "seagram",
    note: "Shorter than the towers around it and far more influential. Mies set a bronze-and-glass box back from the street on a granite plaza and refused every ornament, and every corporate glass tower built in the sixty years since is a child of it. The plaza changed New York's zoning law.",
    noteRo: "Mai scundă decât turnurile din jur și mult mai influentă. Mies a așezat o cutie de bronz și sticlă retrasă de la stradă pe o esplanadă de granit și a refuzat orice ornament, iar fiecare turn corporativ de sticlă construit în cei șaizeci de ani de atunci este copilul ei. Esplanada a schimbat legea de zonare a New York-ului.",
  },
  {
    key: "willis", name: "Willis (Sears) Tower", city: "Chicago", cityRo: "Chicago",
    year: 1973, feet: 1450, meters: 442, architect: "Fazlur Rahman Khan / SOM", asset: "willisTower", wasWorldsTallest: true,
    note: "Khan's 'bundled tube' — nine square tubes rising as a cluster, some stopping short of the top — let a building go higher on less steel than anyone thought possible. It brought the world's-tallest title back to the city that started it all, ninety years after the Home Insurance Building.",
    noteRo: "„Tubul mănunchi” al lui Khan — nouă tuburi pătrate ridicându-se în grup, unele oprindu-se sub vârf — a permis unei clădiri să urce mai sus cu mai puțin oțel decât credea oricine posibil. A readus titlul de cea mai înaltă clădire în orașul care a început totul, la nouăzeci de ani după Home Insurance Building.",
  },
  {
    key: "one-wtc", name: "One World Trade Center", city: "New York", cityRo: "New York",
    year: 2013, feet: 1776, meters: 541, architect: "David Childs / SOM", asset: "oneWTC",
    note: "1,776 feet, chosen for the year, not the structure — a building whose height is an argument. It rose on the site of the towers destroyed in 2001 and is the tallest building in the Western Hemisphere. The height race that began in Chicago in 1885 ends, for now, on a number that means something.",
    noteRo: "1.776 de picioare, alese pentru an, nu pentru structură — o clădire a cărei înălțime este un argument. S-a ridicat pe locul turnurilor distruse în 2001 și este cea mai înaltă clădire din emisfera vestică. Cursa înălțimii care a început la Chicago în 1885 se încheie, deocamdată, pe un număr care înseamnă ceva.",
  },
];

// Modern Supertalls Showcase
const MODERN_SUPERTALLS = [
  {
    name: "Central Park Tower",
    feet: "1,550 FT",
    city: "New York City",
    year: "2020",
    note: "The tallest residential building on Earth, soaring above Central Park.",
    imageSrc: ART_ASSETS.centralParkTower.src,
    imageAlt: "Central Park Tower, New York",
  },
  {
    name: "111 West 57th Street",
    feet: "1,428 FT",
    city: "New York City",
    year: "2021",
    note: "Steinway Tower — the world's most slender skyscraper with a 1:24 ratio.",
    imageSrc: ART_ASSETS.st57West.src,
    imageAlt: "111 West 57th Street, New York",
  },
  {
    name: "One Vanderbilt",
    feet: "1,401 FT",
    city: "New York City",
    year: "2020",
    note: "Grand Central's modern companion, piercing Midtown Manhattan with glass and steel.",
    imageSrc: ART_ASSETS.oneVanderbilt.src,
    imageAlt: "One Vanderbilt, New York",
  },
  {
    name: "270 Park Avenue",
    feet: "1,388 FT",
    city: "New York City",
    year: "2025",
    note: "JPMorgan Chase headquarters — an all-electric supertall designed by Foster + Partners.",
    imageSrc: ART_ASSETS.park270.src,
    imageAlt: "270 Park Avenue, New York",
  },
  {
    name: "432 Park Avenue",
    feet: "1,396 FT",
    city: "New York City",
    year: "2015",
    note: "Rafael Viñoly's grid supertall that helped define 57th Street.",
    imageSrc: ART_ASSETS.park432.src,
    imageAlt: "432 Park Avenue, New York",
  },
  {
    name: "30 Hudson Yards",
    feet: "1,268 FT",
    city: "New York City",
    year: "2019",
    note: "Anchor of Hudson Yards featuring the highest outdoor skydeck in the West.",
    imageSrc: ART_ASSETS.hudsonYards.src,
    imageAlt: "30 Hudson Yards, New York",
  },
  {
    name: "Bank of America Tower",
    feet: "1,200 FT",
    city: "New York City",
    year: "2009",
    note: "One Bryant Park — a model of sustainable high-performance architecture.",
    imageSrc: ART_ASSETS.boaTower.src,
    imageAlt: "Bank of America Tower, New York",
  },
  {
    name: "Trump Tower Chicago",
    feet: "1,388 FT",
    city: "Chicago",
    year: "2009",
    note: "Adrian Smith's curving stainless steel spire along the Chicago River.",
    imageSrc: ART_ASSETS.trumpTower.src,
    imageAlt: "Trump International Hotel & Tower Chicago",
  },
];

export default async function SkyscraperRevolutionPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const copy = isRo
    ? {
        home: "Acasă", section: "Artă & Arhitectură", pageLabel: "Revoluția Zgârie-Norilor",
        eyebrow: "ARHITECTURĂ · OȚEL ȘI AMBIȚIE",
        line1: "REVOLUȚIA", line2: "ZGÂRIE-NORILOR",
        heroBody: "Zgârie-norul este singurul tip major de clădire pe care America l-a inventat cu adevărat. A început la Chicago în 1885 și de atunci nu a încetat niciodată să construiască mai sus.",
        raceTitle: "Cursa înălțimii, la scară",
        raceBody: "Nouă clădiri care, fiecare la momentul ei, au redefinit cât de înaltă putea fi o construcție americană. Fiecare siluetă de mai jos este desenată proporțional cu înălțimea reală. Apasă pe oricare.",
        raceHint: "Fiecare bară este la scară · apasă o clădire",
        tallestLabel: "Cea mai înaltă din lume",
        supertallsTitle: "Noua eră a supraturnurilor din secolul XXI",
        supertallsSub: "O nouă generație de zgârie-nori ultra-subțiri și ecologici care împing New York-ul și Chicago-ul spre noi înălțimi.",
        howTitle: "Trei invenții, o clădire",
        howBody: "Zgârie-norul nu a fost o singură idee, ci trei care au sosit împreună. Fără oricare dintre ele, clădirea înaltă rămâne imposibilă.",
        f1: "Scheletul de oțel",
        f1d: "Înainte de 1885, o clădire își purta propria greutate prin pereți din ce în ce mai groși — la zece etaje, parterul ar fi fost aproape numai piatră. Scheletul de oțel a mutat greutatea pe un cadru interior, iar pereții au devenit doar o piele. Înălțimea a încetat să mai fie o problemă de masă.",
        f1s: "Home Insurance Building, Chicago, 1885",
        f2: "Ascensorul de siguranță",
        f2d: "Elisha Otis a rezolvat nu ascensorul, ci frica de el: un mecanism care blochează cabina dacă se rupe cablul. Fără el, nimeni nu ar fi urcat de bunăvoie la etajul patruzeci. Zgârie-norul este la fel de mult invenția lui Otis ca a oricărui arhitect.",
        f2s: "Otis, demonstrația frânei de siguranță, 1854",
        f3: "Peretele cortină",
        f3d: "Odată ce scheletul purta greutatea, peretele exterior putea fi orice — inclusiv sticlă din podea în tavan atârnată ca o perdea pe fața clădirii. Seagram Building a făcut din asta un stil, iar turnul corporativ de sticlă a devenit imaginea implicită a puterii americane.",
        f3s: "Seagram Building, New York, 1958",
        quote: "Un zgârie-nori trebuie să fie fiecare centimetru mândru și înălțător, o unitate lipsită de o singură linie disidentă.",
        quoteBy: "Louis Sullivan, 1896",
        sourceNote: "Imagini: stocate local în /IMAGES/Architecture.",
        backLink: "Toate temele de artă și arhitectură",
      }
    : {
        home: "Home", section: "Art & Architecture", pageLabel: "The Skyscraper Revolution",
        eyebrow: "ARCHITECTURE · STEEL AND AMBITION",
        line1: "THE SKYSCRAPER", line2: "REVOLUTION",
        heroBody: "The skyscraper is the one major building type America genuinely invented. It began in Chicago in 1885, and the country has never stopped building taller since.",
        raceTitle: "The height race, to scale",
        raceBody: "Nine buildings that each, in their moment, redefined how tall an American structure could be. Every silhouette below is drawn in proportion to its real height. Click any of them.",
        raceHint: "Every bar is to scale · click a building",
        tallestLabel: "World's tallest",
        supertallsTitle: "The 21st-Century Supertall Era",
        supertallsSub: "A new generation of ultra-slender, engineering marvels pushing New York and Chicago past 1,400 feet.",
        howTitle: "Three inventions, one building",
        howBody: "The skyscraper was not one idea but three that arrived together. Take any one away and the tall building is impossible again.",
        f1: "The steel frame",
        f1d: "Before 1885 a building carried its own weight through ever-thicker walls — at ten storeys the ground floor would have been almost solid stone. The steel frame moved the load onto an internal skeleton and turned the walls into a mere skin. Height stopped being a question of mass.",
        f1s: "Home Insurance Building, Chicago, 1885",
        f2: "The safety elevator",
        f2d: "Elisha Otis solved not the elevator but the fear of it: a mechanism that locks the car in place if the cable snaps. Without it nobody would willingly ride to the fortieth floor. The skyscraper is as much Otis's invention as any architect's.",
        f2s: "Otis safety-brake demonstration, 1854",
        f3: "The curtain wall",
        f3d: "Once the frame carried the weight, the outer wall could be anything — including floor-to-ceiling glass hung like a curtain across the building's face. The Seagram Building made that a style, and the glass corporate tower became the default image of American power.",
        f3s: "Seagram Building, New York, 1958",
        quote: "A tall building must be every inch a proud and soaring thing, rising in sheer exultation from bottom to top without a single dissenting line.",
        quoteBy: "Louis Sullivan, 1896",
        sourceNote: "Imagery: stored locally in /IMAGES/Architecture.",
        backLink: "All art and architecture topics",
      };

  return (
    <>
      <ArtStyles />
      <main style={{ background: "var(--art-void)" }} className="min-h-screen text-white">
        {/* Single Hero with View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City, no zooming in */}
        <ArtSingleHero
          imageSrc={ART_ASSETS.empireStateRockefeller.src}
          imageAlt={isRo ? ART_ASSETS.empireStateRockefeller.altRo : ART_ASSETS.empireStateRockefeller.alt}
          badge="1931 — ART DECO"
          label="EMPIRE STATE BUILDING · NEW YORK CITY"
        >
          <ArtHeroTitle
            eyebrow={copy.eyebrow}
            line1={copy.line1}
            line2={copy.line2}
            body={copy.heroBody}
          >
            <div className="mt-8">
              <Breadcrumb
                items={[
                  { label: copy.home, href: "/" },
                  { label: copy.section, href: "/art-architecture" },
                  { label: copy.pageLabel },
                ]}
                className="py-0 text-white/80"
              />
            </div>
          </ArtHeroTitle>
        </ArtSingleHero>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* The signature height race interaction */}
          <section className="py-16 md:py-24">
            <p className="art-text-label mb-6" style={{ color: "var(--art-accent-copper)" }}>
              {copy.raceTitle}
            </p>
            <h2 className="art-text-section mb-8 text-white" style={{ fontSize: "clamp(26px, 4vw, 52px)" }}>
              {copy.raceBody}
            </h2>
            <div className="mt-12">
              <SkyscraperRace
                towers={TOWERS}
                hint={copy.raceHint}
                hintRo={copy.raceHint}
                tallestLabel={copy.tallestLabel}
                tallestLabelRo={copy.tallestLabel}
              />
            </div>
          </section>

          {/* Modern Supertalls Showcase Grid */}
          <section className="py-16 border-t border-white/10">
            <p className="art-text-label mb-4" style={{ color: "var(--art-accent-copper)" }}>
              {copy.supertallsTitle}
            </p>
            <p className="font-sans text-base text-white/70 mb-12 max-w-2xl">
              {copy.supertallsSub}
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {MODERN_SUPERTALLS.map((st) => (
                <div
                  key={st.name}
                  className="group relative overflow-hidden rounded-none border border-white/10 bg-[var(--art-surface)] transition-all duration-300 hover:border-[var(--art-accent-copper)]"
                >
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={st.imageSrc}
                      alt={st.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ filter: "brightness(0.55) contrast(1.05)" }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      placeholder="blur"
                      blurDataURL={BLUR_PLACEHOLDER}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080609] via-transparent to-transparent opacity-80" />
                    <span className="absolute top-3 right-3 art-text-metadata px-2 py-1 bg-black/60 backdrop-blur-md border border-white/10" style={{ color: "var(--art-accent-copper)" }}>
                      {st.feet}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="art-text-metadata mb-1 text-white/50">{st.city} · {st.year}</p>
                    <h3 className="art-text-heading text-lg text-white group-hover:text-[var(--art-accent-copper)] transition-colors mb-2">
                      {st.name}
                    </h3>
                    <p className="art-text-body text-xs text-white/60 line-clamp-2">
                      {st.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <ArtQuoteBreak quote={copy.quote} attribution={copy.quoteBy} />

        {/* The three inventions */}
        <div className="mx-auto max-w-[900px] px-6 md:px-12">
          <section className="py-16 md:py-24">
            <p className="art-text-label mb-8" style={{ color: "var(--art-accent-copper)" }}>
              {copy.howTitle}
            </p>
            <p className="mb-12 font-sans text-lg leading-relaxed text-white/70">{copy.howBody}</p>
            <ArtFactModule fact={copy.f1} detail={copy.f1d} source={copy.f1s} color="copper" />
            <ArtFactModule fact={copy.f2} detail={copy.f2d} source={copy.f2s} color="slate" />
            <ArtFactModule fact={copy.f3} detail={copy.f3d} source={copy.f3s} color="crimson" />
          </section>
        </div>

        {/* Full-bleed Chicago, where it began */}
        <ArtParallaxBand imageSrc={ART_ASSETS.chicagoLoop.src} imageAlt={isRo ? ART_ASSETS.chicagoLoop.altRo : ART_ASSETS.chicagoLoop.alt} height={480}>
          <div className="mx-auto max-w-3xl px-6 text-center">
            <p className="art-text-label" style={{ color: "var(--art-accent-copper)" }}>
              {isRo ? "Chicago — unde a început totul, 1885" : "Chicago — where it began, 1885"}
            </p>
          </div>
        </ArtParallaxBand>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-white/10 py-12">
            <p className="font-sans text-xs text-white/30">{copy.sourceNote}</p>
            <Link href="/art-architecture" className="mt-6 inline-block font-sans text-sm transition-opacity hover:opacity-70" style={{ color: "var(--art-accent-copper)" }}>
              ← {copy.backLink}
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
