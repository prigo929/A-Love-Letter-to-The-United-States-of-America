// ─── The Smithsonian & Great Museums ─────────────────────────────────────────
// Built from a 53-line stub. An architectural / institutional page (buildings,
// not framed paintings): the Smithsonian, "the nation's attic," born of an
// Englishman's bequest and grown into the world's largest museum complex on the
// free National Mall, plus the great American city museums. Imagery is local,
// wired through art-assets.ts, including a National Mall aerial from /IMAGES/Aerials.

import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ArtStyles, ArtParallaxBand } from "@/components/art-architecture/ArtAnimations";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { ART_ASSETS } from "@/lib/data/art-assets";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "The Smithsonian & Great Museums | Art & Architecture",
  description:
    "The nation's attic: the Smithsonian, the world's largest museum complex, free on the National Mall, plus the great American city museums, from the Met and the Art Institute to the Guggenheim and the Getty.",
  alternates: { canonical: "/art-architecture/smithsonian-museums" },
};

const STONE = "#c9b48a";

interface Museum {
  key: keyof typeof ART_ASSETS;
  name: string;
  meta: string;
  metaRo: string;
  en: string;
  ro: string;
}

const SMITHSONIAN: Museum[] = [
  {
    key: "smithsonianCastle", name: "The Smithsonian Castle", meta: "Washington, D.C. · 1855",
    metaRo: "Washington, D.C. · 1855",
    en: "The red sandstone Norman keep on the Mall, the institution's first home and enduring symbol, now its visitor center and the crypt of James Smithson himself.",
    ro: "Fortăreața normandă din gresie roșie de pe Mall, prima casă a instituției și simbolul ei durabil, acum centrul de vizitatori și cripta lui James Smithson însuși.",
  },
  {
    key: "airSpaceMuseum", name: "National Air and Space Museum", meta: "Washington, D.C. · 1976",
    metaRo: "Washington, D.C. · 1976",
    en: "For decades the most-visited museum on Earth, home to the Wright Flyer, the Spirit of St. Louis, and the Apollo 11 command module.",
    ro: "Timp de decenii cel mai vizitat muzeu de pe Pământ, casa Wright Flyer, a lui Spirit of St. Louis și a modulului de comandă Apollo 11.",
  },
  {
    key: "naturalHistoryMuseum", name: "National Museum of Natural History", meta: "Washington, D.C. · 1910",
    metaRo: "Washington, D.C. · 1910",
    en: "The great green-domed rotunda and its African elephant, guarding a collection of over 145 million specimens, from the Hope Diamond to the dinosaurs.",
    ro: "Marea rotondă cu cupolă verde și elefantul ei african, păzind o colecție de peste 145 de milioane de exemplare, de la Diamantul Hope la dinozauri.",
  },
];

const CITY: Museum[] = [
  {
    key: "metMuseum", name: "The Metropolitan Museum of Art", meta: "New York · 1870",
    metaRo: "New York · 1870",
    en: "The largest art museum in the Americas, its Fifth Avenue facade opening onto five thousand years of art from every civilization on Earth.",
    ro: "Cel mai mare muzeu de artă din Americi, cu fațada de pe Fifth Avenue deschizându-se spre cinci mii de ani de artă din fiecare civilizație de pe Pământ.",
  },
  {
    key: "guggenheimMuseum", name: "The Guggenheim", meta: "New York · Frank Lloyd Wright, 1959",
    metaRo: "New York · Frank Lloyd Wright, 1959",
    en: "Wright's white spiral, a building that is itself a work of art: visitors ride to the top and wind down a single continuous ramp past the canvases.",
    ro: "Spirala albă a lui Wright, o clădire care este ea însăși o operă de artă: vizitatorii urcă în vârf și coboară pe o singură rampă continuă pe lângă pânze.",
  },
  {
    key: "artInstituteChicago", name: "The Art Institute of Chicago", meta: "Chicago · 1879",
    metaRo: "Chicago · 1879",
    en: "Guarded by its two bronze lions, home to American icons from Hopper's Nighthawks to Wood's American Gothic, and one of the world's great Impressionist collections.",
    ro: "Păzit de cei doi lei de bronz, casa unor icoane americane de la Nighthawks al lui Hopper la American Gothic al lui Wood și una dintre marile colecții impresioniste ale lumii.",
  },
  {
    key: "gettyCenter", name: "The Getty Center", meta: "Los Angeles · Richard Meier, 1997",
    metaRo: "Los Angeles · Richard Meier, 1997",
    en: "A hilltop campus of travertine and white metal above Los Angeles, funded by an oil fortune into one of the wealthiest arts institutions in the world, and free to all.",
    ro: "Un campus pe deal din travertin și metal alb deasupra Los Angeles-ului, finanțat dintr-o avere petrolieră până la a deveni una dintre cele mai bogate instituții de artă din lume, și gratuit pentru toți.",
  },
];

export default async function SmithsonianMuseumsPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const t = isRo
    ? {
        home: "Acasă", section: "Artă & Arhitectură", pageLabel: "Smithsonian & Marile Muzee",
        eyebrow: "PODUL NAȚIUNII · GRATUIT PENTRU TOȚI",
        heroTitle: "Smithsonian & Marile Muzee",
        heroDeck: "Cel mai mare complex muzeal din lume, gratuit, pe National Mall, plus marile muzee ale orașelor Americii.",
        thesisLead: "A început cu darul unui englez care nu pusese niciodată piciorul în America.",
        thesisBody: "În 1846, averea lui James Smithson a întemeiat o instituție „pentru sporirea și răspândirea cunoașterii”. A crescut în cel mai mare complex muzeal din lume: peste douăzeci de muzee, majoritatea gratuite, aliniate de-a lungul National Mall precum sălile unei singure case naționale imense. I se spune „podul națiunii”, fiindcă păstrează totul.",
        smithLabel: "PE NATIONAL MALL", smithTitle: "Podul națiunii",
        smithBody: "Muzeele Smithsonian se întind de-a lungul Mall-ului între Capitoliu și monument, gratuite și deschise tuturor, adăpostind de la avioane și diamante la scheletele dinozaurilor.",
        interiorNote: "Sala Boeing Milestones of Flight, unde avioane care au făcut istorie atârnă deasupra capetelor vizitatorilor.",
        ngaLabel: "GALERIA NAȚIONALĂ DE ARTĂ", ngaTitle: "Două clădiri, o galerie",
        ngaBody: "Nu este parte a Smithsonian, dar stă alături pe Mall. Clădirea de Vest neoclasică (1941) și clădirea de Est modernistă a lui I. M. Pei (1978), unite sub pământ, arată două secole de gust american într-o singură instituție gratuită.",
        cityLabel: "MARILE MUZEE ALE ORAȘELOR", cityTitle: "De la Fifth Avenue la coasta de vest",
        cityBody: "Dincolo de capitală, marile orașe americane au construit propriile catedrale ale artei, finanțate de averi private și deschise publicului, unele clădiri fiind ele însele capodopere.",
      }
    : {
        home: "Home", section: "Art & Architecture", pageLabel: "Smithsonian & Great Museums",
        eyebrow: "THE NATION'S ATTIC · FREE TO ALL",
        heroTitle: "The Smithsonian & Great Museums",
        heroDeck: "The world's largest museum complex, free, on the National Mall, plus the great museums of America's cities.",
        thesisLead: "It began with the gift of an Englishman who never set foot in America.",
        thesisBody: "In 1846, the fortune of James Smithson founded an institution \"for the increase and diffusion of knowledge.\" It grew into the largest museum complex on Earth: more than twenty museums, most of them free, lined along the National Mall like the rooms of one enormous national house. It is called the nation's attic, because it keeps everything.",
        smithLabel: "ON THE NATIONAL MALL", smithTitle: "The nation's attic",
        smithBody: "The Smithsonian museums run along the Mall between the Capitol and the monument, free and open to all, holding everything from aircraft and diamonds to the skeletons of dinosaurs.",
        interiorNote: "The Boeing Milestones of Flight Hall, where aircraft that made history hang above the visitors' heads.",
        ngaLabel: "THE NATIONAL GALLERY OF ART", ngaTitle: "Two buildings, one gallery",
        ngaBody: "Not part of the Smithsonian, but standing alongside it on the Mall. The neoclassical West Building (1941) and I. M. Pei's modernist East Building (1978), joined underground, show two centuries of American taste in a single free institution.",
        cityLabel: "THE GREAT CITY MUSEUMS", cityTitle: "From Fifth Avenue to the West Coast",
        cityBody: "Beyond the capital, America's great cities built their own cathedrals of art, funded by private fortunes and opened to the public, some of the buildings masterpieces in their own right.",
      };

  return (
    <>
      <ArtStyles />
      <main style={{ background: "#101113" }} className="min-h-screen text-[#eceae4]">
        {/* Hero */}
        <section className="relative h-[92vh] min-h-[600px] w-full overflow-hidden">
          <Image
            src={ART_ASSETS.smithsonianCastle.src}
            alt={isRo ? ART_ASSETS.smithsonianCastle.altRo : ART_ASSETS.smithsonianCastle.alt}
            fill priority sizes="100vw" className="object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(16,17,19,0.4) 0%, rgba(16,17,19,0.2) 45%, rgba(16,17,19,0.94) 100%)" }} />
          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto max-w-6xl px-6 pb-16 sm:px-8">
              <p className="mb-5 font-sans text-[11px] font-bold uppercase tracking-[0.4em]" style={{ color: STONE }}>{t.eyebrow}</p>
              <h1 className="font-serif text-5xl font-bold leading-[0.98] tracking-tight text-white sm:text-6xl md:text-7xl">{t.heroTitle}</h1>
              <p className="mt-6 max-w-2xl font-sans text-xl leading-relaxed text-white/75">{t.heroDeck}</p>
              <div className="mt-8">
                <Breadcrumb items={[{ label: t.home, href: "/" }, { label: t.section, href: "/art-architecture" }, { label: t.pageLabel }]} className="py-0 text-white/70" />
              </div>
            </div>
          </div>
        </section>

        {/* Thesis + stats */}
        <section className="mx-auto max-w-4xl px-6 py-24 md:py-32">
          <p className="font-serif text-3xl font-medium leading-[1.3] text-[#eceae4] md:text-[2.4rem]">{t.thesisLead}</p>
          <p className="mt-8 max-w-2xl font-sans text-lg leading-relaxed text-white/60">{t.thesisBody}</p>
          <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 text-center md:grid-cols-4">
            {[
              { n: "1846", l: isRo ? "Legatul Smithson" : "The Smithson bequest" },
              { n: "21", l: isRo ? "Muzee Smithsonian" : "Smithsonian museums" },
              { n: isRo ? "Gratuit" : "Free", l: isRo ? "Intrarea, mereu" : "Admission, always" },
              { n: "157M+", l: isRo ? "Obiecte în colecție" : "Objects in the collection" },
            ].map((s) => (
              <div key={s.l} className="bg-[#101113] px-4 py-8">
                <div className="font-serif text-4xl font-bold md:text-5xl" style={{ color: STONE }}>{s.n}</div>
                <div className="mt-2 font-sans text-[11px] uppercase tracking-[0.18em] text-white/45">{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Smithsonian on the Mall */}
        <section className="mx-auto max-w-7xl px-6 pb-16">
          <Head label={t.smithLabel} title={t.smithTitle} body={t.smithBody} stone={STONE} />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {SMITHSONIAN.map((m) => (<Tile key={m.key} m={m} isRo={isRo} />))}
          </div>
          <div className="mt-6">
            <figure className="overflow-hidden ring-1 ring-white/10">
              <div className="relative aspect-[21/9] w-full">
                <Image src={ART_ASSETS.airSpaceInterior.src} alt={isRo ? ART_ASSETS.airSpaceInterior.altRo : ART_ASSETS.airSpaceInterior.alt} fill sizes="100vw" className="object-cover" />
              </div>
              <figcaption className="bg-white/[0.03] px-5 py-4 font-sans text-sm text-white/60">{t.interiorNote}</figcaption>
            </figure>
          </div>
        </section>

        {/* Mall aerial band */}
        <ArtParallaxBand imageSrc={ART_ASSETS.mallAerial.src} imageAlt={isRo ? ART_ASSETS.mallAerial.altRo : ART_ASSETS.mallAerial.alt} height={560}>
          <p className="mx-auto max-w-2xl px-6 text-center font-serif text-lg italic text-white/85">
            {isRo ? "National Mall: muzeele națiunii, aliniate între Capitoliu și monument." : "The National Mall: the nation's museums, lined up between the Capitol and the monument."}
          </p>
        </ArtParallaxBand>

        {/* National Gallery of Art */}
        <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <Head label={t.ngaLabel} title={t.ngaTitle} body={t.ngaBody} stone={STONE} />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <Tile m={{ key: "natGalleryWest", name: isRo ? "Clădirea de Vest" : "West Building", meta: "1941 · John Russell Pope", metaRo: "1941 · John Russell Pope", en: "", ro: "" }} isRo={isRo} />
            <Tile m={{ key: "natGalleryEast", name: isRo ? "Clădirea de Est" : "East Building", meta: "1978 · I. M. Pei", metaRo: "1978 · I. M. Pei", en: "", ro: "" }} isRo={isRo} />
          </div>
        </section>

        {/* Great city museums */}
        <section className="mx-auto max-w-7xl px-6 pb-28 md:pb-36">
          <Head label={t.cityLabel} title={t.cityTitle} body={t.cityBody} stone={STONE} />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {CITY.map((m) => (<Tile key={m.key} m={m} isRo={isRo} />))}
          </div>
        </section>

        <AskAmericaCTA
          locale={locale}
          descriptionEn="Ask the AI Oracle about James Smithson's bequest, the treasures of the Air and Space Museum, I. M. Pei's East Building, or how the Guggenheim's spiral works."
          descriptionRo="Întreabă Oracolul AI despre legatul lui James Smithson, comorile Muzeului Aerului și Spațiului, Clădirea de Est a lui I. M. Pei sau cum funcționează spirala Guggenheim."
        />
      </main>
    </>
  );
}

function Head({ label, title, body, stone }: { label: string; title: string; body?: string; stone: string }) {
  return (
    <div>
      <p className="mb-4 font-sans text-[11px] font-bold uppercase tracking-[0.4em]" style={{ color: stone }}>{label}</p>
      <h2 className="font-serif text-3xl font-bold leading-tight text-[#eceae4] md:text-[2.6rem]">{title}</h2>
      {body && <p className="mt-6 max-w-3xl font-sans text-base leading-relaxed text-white/60">{body}</p>}
    </div>
  );
}

function Tile({ m, isRo }: { m: Museum; isRo: boolean }) {
  const a = ART_ASSETS[m.key];
  return (
    <figure className="group overflow-hidden ring-1 ring-white/10 transition-all duration-300 hover:ring-white/25">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image src={a.src} alt={isRo ? a.altRo : a.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <figcaption className="bg-white/[0.03] px-5 py-4">
        <div className="font-serif text-lg font-bold text-white">{m.name}</div>
        <div className="mt-1 font-sans text-[11px] uppercase tracking-[0.15em]" style={{ color: "#b3ad9d" }}>{isRo ? m.metaRo : m.meta}</div>
        {(isRo ? m.ro : m.en) && <p className="mt-3 font-sans text-sm leading-relaxed text-white/55">{isRo ? m.ro : m.en}</p>}
      </figcaption>
    </figure>
  );
}
