// ─── Art & Architecture Hub Page ─────────────────────────────────────────────
// America's Visual Legacy: the editorial hub for art, architecture & design.
//
// Design Language: "High-Contrast Editorial"
// Inspired by Artforum, MoMA, and architectural review journals.
// - Deep near-black void + Copper Gold accents
// - Stark B&W photography → color on interaction
// - Horizontal pinned-scroll era timeline
// - Animated stat wall, parallax quote bands
//
// Server Component: all interactive parts imported as client leaves.

import type { Metadata } from "next";
import Link from "next/link";

import {
  ArtStyles,
  ArtHeroCrossfade,
  ArtHeroTitle,
  ArtParallaxBand,
  ArtStatWall,
  ArtGalleryGrid,
  ArtEraTimeline,
  ArtQuoteBreak,
  ArtFactModule,
  ArtSubPageCards,
} from "@/components/art-architecture/ArtAnimations";

import { getServerLocale } from "@/lib/i18n/server";
import { ART_ASSETS } from "@/lib/data/art-assets";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Art & Architecture | America's Visual Legacy",
  description:
    "Explore the visual legacy of the United States, including Beaux-Arts skyscrapers, Art Deco spires, Abstract Expressionism, and contemporary supertalls. 35,000+ museums, 5,800+ skyscrapers, and a living artistic tradition.",
  alternates: { canonical: "/art-architecture" },
  openGraph: {
    title: "Art & Architecture: America's Visual Legacy",
    description:
      "The United States built more skyscrapers than any nation on Earth and houses more museums per capita than any country in Europe. Explore the visual culture that defines America.",
    url: "/art-architecture",
  },
};

// ─── Structured Data ──────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Art & Architecture: America's Visual Legacy",
  description:
    "A deep dive into the visual and structural achievements of the United States.",
  url: "https://americagreatest.com/art-architecture",
  author: { "@type": "Organization", name: "America: The Greatest Nation" },
};

// ─── Static Data ─────────────────────────────────────────────────────────────

const HERO_STATS = [
  { value: 35000, suffix: "+", label: "Art Museums", sub: "AIC/AMP 2024", color: "var(--art-accent-copper)" },
  { value: 5800, suffix: "+", label: "Skyscrapers", sub: "CTBUH 2024", color: "#F0EBE1" },
  { value: 42, suffix: "B", prefix: "$", label: "Arts Economy", sub: "NEA 2023", color: "var(--art-accent-crimson)" },
  { value: 1, suffix: "M+", label: "Public Artworks", sub: "AFTA 2024", color: "var(--art-accent-copper)" },
];

const GALLERY_TILES = [
  {
    href: "/art-architecture/skyscraper-revolution",
    imageSrc: ART_ASSETS.empireStateRockefeller.src,
    imageAlt: "View of Empire State Building from Rockefeller Center",
    era: "1880 – PRESENT",
    title: "The Skyscraper Revolution",
    description:
      "America invented the skyscraper: and then perfected it. From Louis Sullivan's first steel-frame tower in Chicago to today's supertalls piercing 1,500 feet.",
  },
  {
    href: "/art-architecture/modern-pop-art",
    imageSrc: ART_ASSETS.lichtensteinWhaam.src,
    imageAlt: "Whaam! by Roy Lichtenstein, 1963: Pop Art",
    era: "1950 – 1980",
    title: "Modern & Pop Art",
    description:
      "Pollock's drip paintings, Warhol's screen-prints, Lichtenstein's pop icons, Basquiat's raw energy: American artists remade the global art world.",
  },
  {
    href: "/art-architecture/hudson-river-school",
    imageSrc: ART_ASSETS.bierstadtSierra.src,
    imageAlt: "Among the Sierra Nevada Mountains by Albert Bierstadt, 1868",
    era: "1825 – 1880",
    title: "Hudson River School",
    description:
      "The first distinctly American art movement captured the sublime majesty of the continent's wild terrains: a visual declaration of national identity.",
  },
  {
    href: "/art-architecture/american-realism",
    imageSrc: ART_ASSETS.homerGulfStream.src,
    imageAlt: "The Gulf Stream by Winslow Homer, 1899",
    era: "1860 – 1950",
    title: "American Realism",
    description:
      "Homer's indifferent sea, Eakins's bloody operating theater, Hopper's lonely diners. The unflinching counter-tradition to the idealized wilderness.",
  },
  {
    href: "/art-architecture/smithsonian-museums",
    imageSrc: ART_ASSETS.smithsonianCastle.src,
    imageAlt: "The Smithsonian Institution Building, the Castle",
    era: "1846 – PRESENT",
    title: "Smithsonian Museums",
    description:
      "The world's largest museum complex: 21 museums, 21 libraries, 9 research centers, and 213 million artifacts held in public trust for all Americans.",
  },
];

const ART_ERAS = [
  {
    era: "BEAUX-ARTS",
    years: "1880: 1920",
    movement: "Beaux-Arts\nClassicism",
    keywork: "Grand Central Terminal",
    architect: "Warren & Wetmore, 1913",
    description:
      "Inspired by the École des Beaux-Arts in Paris, this movement brought palatial grandeur to American civic and commercial life. Limestone colonnades, coffered ceilings, and monumental scale defined the Gilded Age.",
    color: "var(--art-accent-copper)",
    icon: "🏛️",
  },
  {
    era: "ART DECO",
    years: "1920: 1940",
    movement: "Art Deco\nSkyscrapers",
    keywork: "Chrysler Building",
    architect: "William Van Alen, 1930",
    description:
      "The machine age soared into the sky. Gleaming steel, eagle gargoyles, and stainless spires expressed boundless optimism as America raced to build the world's tallest towers.",
    color: "#E8C97A",
    icon: "✦",
  },
  {
    era: "MID-CENTURY",
    years: "1945: 1970",
    movement: "International\nModernism",
    keywork: "Seagram Building",
    architect: "Mies van der Rohe, 1958",
    description:
      "Less is more. Glass curtain walls, exposed structural steel, and open plazas replaced ornament with pure geometry. New York and Chicago became laboratories for the International Style.",
    color: "#7DD3FC",
    icon: "◻",
  },
  {
    era: "POSTMODERN",
    years: "1970: 1995",
    movement: "Postmodern\nEclecticism",
    keywork: "AT&T Building",
    architect: "Philip Johnson, 1984",
    description:
      "Architecture rebelled against the coldness of modernism, embracing historical references, playful ornament, and bold colors. The Chippendale skyscraper announced that irony had arrived on Madison Avenue.",
    color: "#F4A261",
    icon: "◈",
  },
  {
    era: "CONTEMPORARY",
    years: "1995: PRESENT",
    movement: "Supertall\nEra",
    keywork: "One World Trade Center",
    architect: "Skidmore, Owings & Merrill, 2014",
    description:
      "A new generation of supertalls, One Vanderbilt, Central Park Tower, 111 West 57th, pushed the sky ever higher. Computational design and structural engineering fused into architecture as spectacle.",
    color: "var(--art-accent-crimson)",
    icon: "⬡",
  },
];

const OVERVIEW_PARAGRAPHS_EN = [
  "No nation has shaped the built environment with greater ambition. America invented the skyscraper in the 1880s and never stopped building. From Louis Sullivan's first steel-frame tower in Chicago to the supertalls now rising past 1,500 feet in Manhattan, the United States has consistently pushed the limits of what steel, concrete, and glass can become.",
  "The visual arts tell the same story of restless ambition. American painters invented entirely new movements, including the Hudson River School's romantic canvases, the Abstract Expressionists' emotional intensity, and Pop Art's brilliant subversion of consumer culture. These movements moved the center of global artistic gravity from Paris to New York after 1945.",
  "Today, the United States is home to more than 35,000 museums. The Smithsonian alone holds 213 million artifacts across 21 institutions. The Metropolitan Museum of Art is among the most visited cultural institutions on Earth. From the National Mall in Washington to the museums lining Fifth Avenue, America has built a permanent architectural argument for the value of beauty.",
];

const FACT_MODULES = [
  {
    fact: "America built the world's first skyscrapers",
    detail:
      "The Home Insurance Building in Chicago (1885) is widely considered the world's first true skyscraper: a 10-story structure with an iron and steel load-bearing skeleton rather than thick masonry walls. This Chicago invention launched the global high-rise era.",
    source: "CTBUH: Council on Tall Buildings and Urban Habitat, 2024",
    color: "copper" as const,
  },
  {
    fact: "The Metropolitan Museum of Art holds 1.5 million objects",
    detail:
      "Founded in 1870, the Met's collection spans 5,000 years of human civilization across all cultures. It receives approximately 5 million visitors per year, making it one of the most visited art museums in the world: larger in collection than the Louvre.",
    source: "Metropolitan Museum of Art Annual Report, 2023",
    color: "crimson" as const,
  },
  {
    fact: "Abstract Expressionism moved the global art center from Paris to New York",
    detail:
      "After World War II, artists like Jackson Pollock, Mark Rothko, and Willem de Kooning created a distinctly American visual language: gestural, emotional, and monumental in scale: that established New York as the new capital of contemporary art by the early 1950s.",
    source: "MoMA: Museum of Modern Art Archives",
    color: "slate" as const,
  },
];

const SUB_PAGE_CARDS = [
  {
    href: "/art-architecture/skyscraper-revolution",
    title: "Skyscraper Revolution",
    description: "How America invented the most audacious building type in history and kept building taller.",
    badge: "ARCHITECTURE",
    imageSrc: ART_ASSETS.oneVanderbilt.src,
    imageAlt: "One Vanderbilt Tower, Midtown Manhattan",
  },
  {
    href: "/art-architecture/hudson-river-school",
    title: "Hudson River School",
    description: "America's first great art movement: painters who saw the continent as Eden.",
    badge: "FINE ART",
    imageSrc: ART_ASSETS.bierstadtYosemite.src,
    imageAlt: "Valley of the Yosemite by Albert Bierstadt, 1864",
  },
  {
    href: "/art-architecture/american-realism",
    title: "American Realism",
    description: "Homer, Eakins, Sargent, the Ashcan School: an unflinching visual account of American life.",
    badge: "FINE ART",
    imageSrc: ART_ASSETS.eakinsGrossClinic.src,
    imageAlt: "The Gross Clinic by Thomas Eakins, 1875",
  },
  {
    href: "/art-architecture/modern-pop-art",
    title: "Modern & Pop Art",
    description: "Warhol's prints, Pollock's drips, Lichtenstein's pop icons: the American avant-garde.",
    badge: "CONTEMPORARY",
    imageSrc: ART_ASSETS.pollockConvergence.src,
    imageAlt: "Convergence by Jackson Pollock, 1952",
  },
  {
    href: "/art-architecture/smithsonian-museums",
    title: "Smithsonian Museums",
    description: "The world's largest museum complex, held in trust for every American.",
    badge: "MUSEUMS",
    imageSrc: ART_ASSETS.smithsonianCastle.src,
    imageAlt: "The Smithsonian Institution Building, the Castle",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ArtArchitecturePage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  return (
    <>
      <ArtStyles />
      {/* JSON-LD: secure: uses JSON.stringify on a hardcoded object, no user input */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <ArtHeroCrossfade>
        <ArtHeroTitle
          eyebrow={isRo ? "Artă & Arhitectură" : "Art & Architecture"}
          line1={isRo ? "MOȘTENIREA" : "AMERICA'S"}
          line2={isRo ? "VIZUALĂ" : "VISUAL LEGACY"}
          body={
            isRo
              ? "Nicio altă națiune nu a construit cu o ambiție mai mare sau nu a generat mișcări artistice cu impact global mai profund."
              : "No other nation has built with greater ambition or generated artistic movements with deeper global impact."
          }
        >
          <div className="mt-10 flex flex-wrap gap-8">
            {[
              { value: "35K+", label: isRo ? "Muzee" : "Museums", sub: "AIC 2024" },
              { value: "5,800+", label: isRo ? "Zgârie-nori" : "Skyscrapers", sub: "CTBUH" },
              { value: "$42B", label: isRo ? "Economia artelor" : "Arts Economy", sub: "NEA 2023" },
            ].map((s) => (
              <div key={s.value} className="text-center">
                <p
                  className="text-[clamp(28px,4.5vw,52px)] font-extralight tracking-tighter"
                  style={{ color: 'var(--art-accent-copper)' }}
                >
                  {s.value}
                </p>
                <p className="art-text-label mt-1">{s.label}</p>
                <p className="art-text-metadata mt-1">{s.sub}</p>
              </div>
            ))}
          </div>
        </ArtHeroTitle>
      </ArtHeroCrossfade>

      {/* ── STAT WALL ────────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--art-void)' }} className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <ArtStatWall stats={HERO_STATS} />
        </div>
      </section>

      {/* ── PARALLAX QUOTE 1: Frank Lloyd Wright ────────────────────────── */}
      <ArtParallaxBand
        imageSrc={ART_ASSETS.chrysler.src}
        imageAlt="The Chrysler Building Art Deco Crown"
        height={520}
      >
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="italic leading-[1.7] mb-12"
            style={{
              fontFamily: 'var(--font-archivo)',
              fontSize: 'clamp(20px, 3.5vw, 40px)',
              fontWeight: 400,
              letterSpacing: '0.04em',
              color: 'var(--art-accent-ivory)',
            }}
          >
            &ldquo;{isRo
              ? "Arhitectura este arta vie a oamenilor noștri: cultura noastră în piatră și oțel."
              : "Architecture is the art of our life of our people: our culture in stone and steel."
            }&rdquo;
          </p>
          <p className="art-text-label" style={{ color: 'var(--art-accent-copper)' }}>
           : Frank Lloyd Wright
          </p>
        </div>
      </ArtParallaxBand>

      {/* ── OVERVIEW NARRATIVE ───────────────────────────────────────────── */}
      <section style={{ background: 'var(--art-void)' }} className="py-24 md:py-32">
        <div className="mx-auto max-w-[900px] px-6 md:px-12">
          <p className="art-text-label mb-8" style={{ color: 'var(--art-accent-copper)' }}>
            {isRo ? "Prezentare Generală" : "Overview"}
          </p>
          <h2 className="art-text-section text-white mb-10" style={{ fontSize: 'clamp(28px, 4.5vw, 60px)' }}>
            {isRo ? "Arta ca Națiune" : "A Nation as Art"}
          </h2>
          {(isRo
            ? [
                "Nicio altă națiune nu a modelat mediul construit cu o ambiție mai mare. America a inventat zgârie-norii în anii 1880 și nu a încetat să construiască. De la primul turn cu cadru de oțel al lui Louis Sullivan din Chicago până la supertallurile care se înalță astăzi la peste 450 de metri în Manhattan, Statele Unite au depășit în mod constant limitele a ceea ce oțelul, betonul și sticla pot deveni.",
                "Artele vizuale spun aceeași poveste de ambiție neobosită. Pictorii americani au inventat mișcări complet noi: peisajele romantice ale Școlii Râului Hudson, intensitatea emoțională a Expresioniștilor Abstracti, subversiunea strălucitoare a Pop Art față de cultura de consum.",
                "Astăzi, Statele Unite găzduiesc mai mult de 35.000 de muzee. Smithsonian deține singur 213 milioane de artefacte în 21 de instituții. America a construit un argument arhitectural permanent pentru valoarea frumuseții.",
              ]
            : OVERVIEW_PARAGRAPHS_EN
          ).map((para, i) => (
            <p key={i} className="art-text-body mb-6">{para}</p>
          ))}
        </div>
      </section>

      {/* ── FACT MODULES ─────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--art-void)' }}>
        <div className="mx-auto max-w-[900px] px-6 md:px-12 pb-12">
          {FACT_MODULES.map((fact) => (
            <ArtFactModule
              key={fact.fact}
              fact={fact.fact}
              detail={fact.detail}
              source={fact.source}
              color={fact.color}
            />
          ))}
        </div>
      </section>

      {/* ── CURATED GALLERY GRID ─────────────────────────────────────────── */}
      <section style={{ background: 'var(--art-void)' }} className="py-24 md:py-32">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <p className="art-text-label mb-6" style={{ color: 'var(--art-accent-copper)' }}>
            {isRo ? "Galerii Curatorate" : "Curated Galleries"}
          </p>
          <h2 className="art-text-section text-white mb-3" style={{ fontSize: 'clamp(28px, 4.5vw, 64px)' }}>
            {isRo ? "Portale în Epocă" : "Portals into an Era"}
          </h2>
          <p className="art-text-body mb-12 max-w-xl">
            {isRo
              ? "Treceți cu mouse-ul peste fiecare portal: fotografia trece de la alb-negru la culoare deplină pe măsură ce descoperiți fiecare epocă."
              : "Hover each portal: the photography transitions from black-and-white to full color as you discover each era."}
          </p>
        </div>
        <ArtGalleryGrid tiles={GALLERY_TILES} />
      </section>

      {/* ── PARALLAX QUOTE 2: Thomas Jefferson ─────────────────────────── */}
      <ArtParallaxBand
        imageSrc={ART_ASSETS.bierstadtYosemite.src}
        imageAlt="Valley of the Yosemite by Albert Bierstadt, 1864"
        height={480}
      >
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="italic leading-[1.7] mb-12"
            style={{
              fontFamily: 'var(--font-archivo)',
              fontSize: 'clamp(18px, 3vw, 36px)',
              fontWeight: 400,
              letterSpacing: '0.04em',
              color: 'var(--art-accent-ivory)',
            }}
          >
            &ldquo;{isRo
              ? "Arhitectura merită mai multă atenție din partea americanilor decât a primit vreodată."
              : "Architecture merits more attention from Americans than it has hitherto received."
            }&rdquo;
          </p>
          <p className="art-text-label" style={{ color: 'var(--art-accent-copper)' }}>
           : Thomas Jefferson
          </p>
        </div>
      </ArtParallaxBand>

      {/* ── ERA TIMELINE: horizontal pinned scroll ────────────────────── */}
      <section style={{ background: 'var(--art-void)' }}>
        <ArtEraTimeline eras={ART_ERAS} />
      </section>

      {/* ── QUOTE BREAK: Maya Lin ───────────────────────────────────────── */}
      <section style={{ background: 'var(--art-void)' }}>
        <ArtQuoteBreak
          quote={isRo
            ? "Arhitectura este despre mediul public, spațiul public, cum oamenii împart un spațiu și cum acel spațiu le poate îmbunătăți viața."
            : "Architecture is about public space, shared space, how people experience that space and how that space can enrich their lives."
          }
          attribution="Maya Lin"
          title={isRo ? "Arhitect și artist, proiectantul Memorialului Veteranilor din Vietnam" : "Architect & artist, designer of the Vietnam Veterans Memorial"}
        />
      </section>

      {/* ── PARALLAX QUOTE 3 ─ Pollock / Warhol ──────────────────────────── */}
      <ArtParallaxBand
        imageSrc={ART_ASSETS.pollockConvergence.src}
        imageAlt="Convergence by Jackson Pollock, 1952"
        height={420}
      >
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="italic leading-[1.7] mb-10"
            style={{
              fontFamily: 'var(--font-archivo)',
              fontSize: 'clamp(18px, 3vw, 36px)',
              fontWeight: 400,
              letterSpacing: '0.04em',
              color: 'var(--art-accent-ivory)',
            }}
          >
            &ldquo;{isRo
              ? "Arta este ceea ce poți scăpa cu a face."
              : "Art is what you can get away with."
            }&rdquo;
          </p>
          <p className="art-text-label" style={{ color: 'var(--art-accent-copper)' }}>
           : Andy Warhol
          </p>
          <p className="art-text-metadata mt-2">Pop Artist, Pittsburgh, 1928–1987</p>
        </div>
      </ArtParallaxBand>

      {/* ── DEEP DIVES ───────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--art-void)' }} className="py-24 md:py-32">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <p className="art-text-label mb-6" style={{ color: 'var(--art-accent-copper)' }}>
            {isRo ? "Imersiuni în Profunzime" : "Deep Dives"}
          </p>
          <h2 className="art-text-section text-white mb-12" style={{ fontSize: 'clamp(28px, 4.5vw, 64px)' }}>
            {isRo ? "Explorați mai Adânc" : "Explore Deeper"}
          </h2>
          <ArtSubPageCards cards={SUB_PAGE_CARDS} />
        </div>
      </section>

      {/* ── ASK AMERICA CTA ──────────────────────────────────────────────── */}
      <section style={{ background: 'var(--art-void)' }} className="pb-32 px-6 md:px-12">
        <div
          className="mx-auto max-w-[1200px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
          style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'var(--art-surface)' }}
        >
          <div>
            <span className="art-text-metadata mb-2 block" style={{ color: 'var(--art-accent-copper)' }}>
              AI Oracle
            </span>
            <h3
              className="text-2xl md:text-3xl font-bold text-white tracking-tight"
              style={{ fontFamily: 'var(--font-archivo)' }}
            >
              {isRo ? "Oracolul Ask America" : "The Ask America Oracle"}
            </h3>
            <p className="art-text-body text-sm mt-2 max-w-2xl">
              {isRo
                ? "Pune întrebări despre arhitectura americană, mișcările artistice sau marile muzee."
                : "Ask questions about American architecture, art movements, and the great museums of the United States."}
            </p>
          </div>
          <Link
            href="/interactive"
            id="art-ask-america-cta"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 font-semibold text-sm transition-colors"
            style={{
              background: 'var(--art-accent-copper)',
              color: '#080609',
              fontFamily: 'var(--font-archivo)',
            }}
          >
            {isRo ? "Întreabă America →" : "Ask America →"}
          </Link>
        </div>
      </section>
    </>
  );
}
