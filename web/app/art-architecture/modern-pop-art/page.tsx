// ─── Modern & Pop Art Movements ──────────────────────────────────────────────
// Built from a 53-line stub. The 20th-century story in which the capital of the
// art world moved from Paris to New York: American Regionalism, then the world-
// leading Abstract Expressionism, then Pop Art's embrace of mass culture. Art-
// directed so the mood shifts with the movement: a moody dark gallery for AbEx,
// a bright white cube for Pop. Imagery is local, wired through art-assets.ts.

import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ArtStyles } from "@/components/art-architecture/ArtAnimations";
import { ArtFramedPlate } from "@/components/art-architecture/GalleryPieces";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { ART_ASSETS } from "@/lib/data/art-assets";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Modern & Pop Art Movements | Art & Architecture",
  description:
    "The century American art led the world. From Regionalism to the world-leading Abstract Expressionism of Pollock and Rothko to Pop Art's embrace of mass culture, the capital of art moved from Paris to New York.",
  alternates: { canonical: "/art-architecture/modern-pop-art" },
};

interface Work {
  key: keyof typeof ART_ASSETS;
  artist: string;
  title: string;
  year: string;
  en: string;
  ro: string;
}

const SCENE: Work[] = [
  {
    key: "woodAmericanGothic", artist: "Grant Wood", title: "American Gothic", year: "1930",
    en: "A stern farmer and his daughter before a plain Iowa house, the most parodied painting in America. Regionalism answered European abstraction by insisting the true American subject was the rural heartland.",
    ro: "Un fermier sever și fiica lui în fața unei case simple din Iowa, cel mai parodiat tablou din America. Regionalismul a răspuns abstracției europene insistând că adevăratul subiect american era inima rurală a țării.",
  },
  {
    key: "hopperNighthawks", artist: "Edward Hopper", title: "Nighthawks", year: "1942",
    en: "Four figures in an all-night diner, sealed behind glass in the empty city. Hopper made American realism a study of solitude, light and silence, the loneliness inside a crowd.",
    ro: "Patru siluete într-un local deschis toată noaptea, sigilate în spatele sticlei în orașul gol. Hopper a făcut din realismul american un studiu al singurătății, luminii și tăcerii.",
  },
];

const ABEX: Work[] = [
  {
    key: "pollockConvergence", artist: "Jackson Pollock", title: "Convergence", year: "1952",
    en: "Pollock laid the canvas on the floor and flung paint from above, moving around and inside the work. \"Action painting\" made the record of the artist's body the subject, and made New York the center of the art world.",
    ro: "Pollock a așezat pânza pe podea și a aruncat vopseaua de sus, mișcându-se în jurul și în interiorul lucrării. „Action painting” a făcut din urma corpului artistului subiectul și a făcut din New York centrul lumii artei.",
  },
  {
    key: "rothkoOrangeRedYellow", artist: "Mark Rothko", title: "Orange, Red, Yellow", year: "1961",
    en: "Soft rectangles of pure color that hover and breathe. Rothko wanted them seen up close, filling your vision, a wordless sublime reaching for the same awe the Hudson River painters found in mountains.",
    ro: "Dreptunghiuri moi de culoare pură care plutesc și respiră. Rothko voia să fie privite de aproape, umplându-ți vederea, un sublim fără cuvinte care caută aceeași uimire pe care pictorii Hudson o găseau în munți.",
  },
  {
    key: "deKooningWomanI", artist: "Willem de Kooning", title: "Woman I", year: "1952",
    en: "A ferocious, half-abstract figure clawed out of the paint over two years. While others abandoned the figure, de Kooning kept it, wielding the gesture of Abstract Expressionism against the human body itself.",
    ro: "O figură feroce, pe jumătate abstractă, smulsă din vopsea timp de doi ani. În timp ce alții abandonau figura, de Kooning a păstrat-o, folosind gestul expresionismului abstract chiar împotriva corpului uman.",
  },
];

const POP: Work[] = [
  {
    key: "warholSoupCans", artist: "Andy Warhol", title: "Campbell's Soup Cans", year: "1962",
    en: "Thirty-two canvases, one per soup variety, hung like grocery shelves. Warhol took the most banal object in the supermarket and made it art, deadpan and mechanical, and the boundary between commerce and culture never recovered.",
    ro: "Treizeci și două de pânze, câte una pentru fiecare tip de supă, atârnate ca rafturile de magazin. Warhol a luat cel mai banal obiect din supermarket și l-a făcut artă, impasibil și mecanic, iar granița dintre comerț și cultură nu și-a mai revenit.",
  },
  {
    key: "lichtensteinWhaam", artist: "Roy Lichtenstein", title: "Whaam!", year: "1963",
    en: "A comic-book panel blown up to mural scale, complete with hand-painted Ben-Day dots and a sound-effect caption. Lichtenstein borrowed the lowest visual language in America and framed it as high art.",
    ro: "Un cadru de bandă desenată mărit la scară de mural, cu punctele Ben-Day pictate manual și un onomatopee-titlu. Lichtenstein a împrumutat cel mai umil limbaj vizual din America și l-a încadrat drept artă înaltă.",
  },
  {
    key: "johnsFlag", artist: "Jasper Johns", title: "Flag", year: "1954-55",
    en: "The American flag, painted in thick encaustic over newspaper, exactly life-size. Is it a flag or a painting of a flag? Johns chose \"things the mind already knows\" and turned the most loaded symbol into a plain object.",
    ro: "Steagul american, pictat în encaustică groasă peste ziar, exact în mărime naturală. E un steag sau o pictură a unui steag? Johns a ales „lucruri pe care mintea le știe deja” și a transformat cel mai încărcat simbol într-un obiect simplu.",
  },
  {
    key: "wesselmannStillLife", artist: "Tom Wesselmann", title: "Still Life #35", year: "1963",
    en: "A billboard-scale collage of brand-name products, glossy and loud. Wesselmann rebuilt the old still life out of advertising, the fruit bowl replaced by the logos of the American kitchen.",
    ro: "Un colaj la scară de panou publicitar cu produse de marcă, lucios și zgomotos. Wesselmann a reconstruit vechea natură moartă din reclame, castronul cu fructe înlocuit de logo-urile bucătăriei americane.",
  },
];

export default async function ModernPopArtPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const t = isRo
    ? {
        home: "Acasă", section: "Artă & Arhitectură", pageLabel: "Artă Modernă și Pop Art",
        eyebrow: "DE LA PARIS LA NEW YORK · 1930–1990",
        heroDeck: "Secolul în care arta americană a condus lumea: de la regionalism la expresionismul abstract și la Pop Art.",
        thesisLead: "Timp de secole, capitala artei a fost Parisul. Apoi, după 1945, s-a mutat la New York.",
        thesisBody: "Al Doilea Război Mondial a adus la New York o generație de artiști europeni și a lăsat orașul bogat, încrezător și fără rival. Pentru prima dată, America nu mai importa avangarda, ci o crea. În patruzeci de ani a trecut prin trei revoluții: scena americană, expresionismul abstract și Pop Art-ul.",
        sceneLabel: "PRELUDIUL · SCENA AMERICANĂ",
        sceneTitle: "Înainte de abstracție",
        sceneBody: "Înainte ca New York-ul să conducă lumea, arta americană privea spre interior. Regionalismul și realismul au pictat inima rurală și orașul singuratic, insistând că America își merita propriile mituri.",
        abexLabel: "EXPRESIONISM ABSTRACT · ȘCOALA DIN NEW YORK",
        abexTitle: "Prima mișcare care a condus lumea",
        abexBody: "La sfârșitul anilor 1940, un grup de pictori din New York a renunțat cu totul la subiect. Pânza a devenit o arenă pentru gest, culoare și scară pură, iar pentru prima dată lumea a privit spre America pentru a vedea ce urmează în artă.",
        quote: "Nu pictez natura. Eu sunt natura.",
        quoteBy: "Jackson Pollock",
        popLabel: "POP ART",
        popTitle: "Cultura de masă intră în muzeu",
        popBody: "Dacă expresionismul abstract era solemn și interior, Pop Art-ul era strălucitor, rece și exterior. Warhol, Lichtenstein, Johns și Wesselmann au luat conservele, benzile desenate, steagurile și reclamele, materia primă a vieții americane, și le-au atârnat pe pereții galeriei.",
        streetTitle: "Ce a urmat: strada",
        streetBody: "În anii 1980, energia a coborât din galerie pe stradă. Neo-expresionismul lui Jean-Michel Basquiat și liniile publice ale lui Keith Haring au dus arta americană într-o nouă direcție, brută, urbană și tânără, dovadă că avangarda pe care America o crease acum continua să se reinventeze.",
      }
    : {
        home: "Home", section: "Art & Architecture", pageLabel: "Modern & Pop Art",
        eyebrow: "PARIS TO NEW YORK · 1930–1990",
        heroDeck: "The century American art led the world: from Regionalism to Abstract Expressionism to Pop Art.",
        thesisLead: "For centuries the capital of art was Paris. Then, after 1945, it moved to New York.",
        thesisBody: "World War II drove a generation of European artists to New York and left the city rich, confident, and without a rival. For the first time, America no longer imported the avant-garde, it made it. In forty years it ran through three revolutions: the American Scene, Abstract Expressionism, and Pop Art.",
        sceneLabel: "THE PRELUDE · THE AMERICAN SCENE",
        sceneTitle: "Before abstraction",
        sceneBody: "Before New York led the world, American art looked inward. Regionalism and Realism painted the rural heartland and the lonely city, insisting that America deserved its own myths.",
        abexLabel: "ABSTRACT EXPRESSIONISM · THE NEW YORK SCHOOL",
        abexTitle: "The first movement to lead the world",
        abexBody: "In the late 1940s a group of New York painters abandoned subject matter entirely. The canvas became an arena for gesture, color, and pure scale, and for the first time the world looked to America to see what came next in art.",
        quote: "I don't paint nature. I am nature.",
        quoteBy: "Jackson Pollock",
        popLabel: "POP ART",
        popTitle: "Mass culture enters the museum",
        popBody: "If Abstract Expressionism was solemn and inward, Pop Art was bright, cool, and outward. Warhol, Lichtenstein, Johns, and Wesselmann took the soup cans, comic strips, flags, and advertisements, the raw material of American life, and hung them on the gallery wall.",
        streetTitle: "What came next: the street",
        streetBody: "In the 1980s the energy came down from the gallery into the street. Jean-Michel Basquiat's neo-expressionism and Keith Haring's public line took American art in a new direction, raw, urban, and young, proof that the avant-garde America had built kept reinventing itself.",
      };

  return (
    <>
      <ArtStyles />
      <main className="min-h-screen bg-[#0c0c0e] text-[#f4f4f2]">
        {/* Bold typographic hero over Pollock */}
        <section className="relative flex h-[94vh] min-h-[620px] w-full items-end overflow-hidden">
          <Image
            src={ART_ASSETS.pollockConvergence.src}
            alt={isRo ? ART_ASSETS.pollockConvergence.altRo : ART_ASSETS.pollockConvergence.alt}
            fill priority sizes="100vw" className="object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,10,12,0.55) 0%, rgba(10,10,12,0.2) 40%, rgba(10,10,12,0.95) 100%)" }} />
          <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 sm:px-8">
            <p className="mb-6 font-sans text-[11px] font-bold uppercase tracking-[0.4em] text-[#E8391B]">{t.eyebrow}</p>
            <h1 className="font-sans text-6xl font-black uppercase leading-[0.86] tracking-tighter text-white sm:text-7xl md:text-8xl lg:text-9xl">
              Modern<br />&amp; Pop<span className="text-[#E8391B]">.</span>
            </h1>
            <p className="mt-8 max-w-2xl font-sans text-lg leading-relaxed text-white/75">{t.heroDeck}</p>
            <div className="mt-8">
              <Breadcrumb items={[{ label: t.home, href: "/" }, { label: t.section, href: "/art-architecture" }, { label: t.pageLabel }]} className="py-0 text-white/70" />
            </div>
          </div>
        </section>

        {/* Thesis */}
        <section className="mx-auto max-w-4xl px-6 py-24 md:py-32">
          <p className="font-sans text-3xl font-bold leading-[1.2] tracking-tight text-white md:text-[2.7rem]">{t.thesisLead}</p>
          <p className="mt-8 max-w-2xl font-sans text-lg leading-relaxed text-white/60">{t.thesisBody}</p>
          <div className="mt-14 grid grid-cols-3 gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 text-center">
            {[
              { n: "1945", l: isRo ? "Centrul se mută la NY" : "The center shifts to NY" },
              { n: "3", l: isRo ? "Revoluții în 40 de ani" : "Revolutions in 40 years" },
              { n: "#1", l: isRo ? "Capitala mondială a artei" : "World capital of art" },
            ].map((s) => (
              <div key={s.n} className="bg-[#0c0c0e] px-4 py-8">
                <div className="font-sans text-4xl font-black text-white md:text-5xl">{s.n}</div>
                <div className="mt-2 font-sans text-[11px] uppercase tracking-[0.2em] text-white/45">{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* The American Scene (warm dark panel) */}
        <section className="border-y border-white/10 bg-[#151210] py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHead label={t.sceneLabel} title={t.sceneTitle} body={t.sceneBody} accent="#c98a3a" />
            <div className="mt-14 grid gap-14 md:grid-cols-2">
              {SCENE.map((w) => (
                <PlateBlock key={w.key} w={w} isRo={isRo} variant="cube" />
              ))}
            </div>
          </div>
        </section>

        {/* Abstract Expressionism (moody dark) */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHead label={t.abexLabel} title={t.abexTitle} body={t.abexBody} accent="#6f8fd6" />
            <div className="mx-auto mt-16 max-w-4xl">
              <PlateBlock w={ABEX[0]} isRo={isRo} variant="cube" wide />
            </div>
            <div className="mt-14 grid gap-14 md:grid-cols-2">
              {ABEX.slice(1).map((w) => (
                <PlateBlock key={w.key} w={w} isRo={isRo} variant="cube" />
              ))}
            </div>
          </div>
        </section>

        {/* Pollock quote */}
        <section className="px-6 py-24 md:py-36" style={{ background: "linear-gradient(120deg,#12100e,#0c0c0e)" }}>
          <blockquote className="mx-auto max-w-4xl text-center">
            <p className="font-sans text-4xl font-black uppercase leading-[1.05] tracking-tight text-white md:text-6xl">&ldquo;{t.quote}&rdquo;</p>
            <footer className="mt-8 font-sans text-xs uppercase tracking-[0.35em] text-[#E8391B]">{t.quoteBy}</footer>
          </blockquote>
        </section>

        {/* POP ART - bright white cube */}
        <section className="bg-[#f4f2ec] py-24 text-[#111] md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <p className="mb-4 font-sans text-[11px] font-bold uppercase tracking-[0.4em] text-[#E8391B]">{t.popLabel}</p>
            <h2 className="max-w-3xl font-sans text-4xl font-black uppercase leading-[0.95] tracking-tight text-[#111] md:text-6xl">{t.popTitle}</h2>
            <p className="mt-6 max-w-2xl font-sans text-lg leading-relaxed text-[#111]/70">{t.popBody}</p>
            <div className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-2">
              {POP.map((w, i) => {
                const a = ART_ASSETS[w.key];
                const colors = ["#E8391B", "#1a56db", "#c99a1e", "#127a4a"];
                return (
                  <figure key={w.key}>
                    <div className="shadow-[0_30px_70px_rgba(0,0,0,0.25)] ring-1 ring-black/15">
                      <Image src={a.src} alt={isRo ? a.altRo : a.alt} width={1600} height={1200} sizes="(max-width: 768px) 100vw, 45vw" className="block h-auto w-full" />
                    </div>
                    <figcaption className="mt-5">
                      <div className="flex items-baseline gap-3">
                        <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: colors[i % colors.length] }} />
                        <span className="font-sans text-base font-black uppercase tracking-tight text-[#111]">{w.artist}</span>
                        <span className="font-sans text-sm text-[#111]/45">{w.title}, {w.year}</span>
                      </div>
                      <p className="mt-3 max-w-lg font-sans text-[15px] leading-relaxed text-[#111]/65">{isRo ? w.ro : w.en}</p>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        </section>

        {/* What came next: the street */}
        <section className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
          <p className="mb-4 font-sans text-[11px] font-bold uppercase tracking-[0.4em] text-[#E8391B]">1980s</p>
          <h2 className="font-sans text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-5xl">{t.streetTitle}</h2>
          <p className="mx-auto mt-8 max-w-2xl font-sans text-lg leading-relaxed text-white/60">{t.streetBody}</p>
        </section>

        <AskAmericaCTA
          locale={locale}
          descriptionEn="Ask the AI Oracle about Jackson Pollock's action painting, why the art world moved from Paris to New York, Warhol's Factory, or Jasper Johns and the American flag."
          descriptionRo="Întreabă Oracolul AI despre action painting-ul lui Jackson Pollock, de ce lumea artei s-a mutat de la Paris la New York, Factory-ul lui Warhol sau Jasper Johns și steagul american."
        />
      </main>
    </>
  );
}

function SectionHead({ label, title, body, accent }: { label: string; title: string; body: string; accent: string }) {
  return (
    <div>
      <p className="mb-4 font-sans text-[11px] font-bold uppercase tracking-[0.4em]" style={{ color: accent }}>{label}</p>
      <h2 className="max-w-3xl font-sans text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl">{title}</h2>
      <p className="mt-6 max-w-2xl font-sans text-lg leading-relaxed text-white/60">{body}</p>
    </div>
  );
}

function PlateBlock({ w, isRo, variant, wide }: { w: Work; isRo: boolean; variant: "gilt" | "cube"; wide?: boolean }) {
  const a = ART_ASSETS[w.key];
  return (
    <div>
      <ArtFramedPlate src={a.src} alt={isRo ? a.altRo : a.alt} artist={w.artist} title={w.title} year={w.year} variant={variant} />
      <p className={`mx-auto mt-5 ${wide ? "max-w-2xl" : "max-w-md"} text-center font-sans text-sm leading-relaxed text-white/55`}>{isRo ? w.ro : w.en}</p>
    </div>
  );
}
