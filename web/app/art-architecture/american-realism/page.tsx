// ─── American Realism ────────────────────────────────────────────────────────
// Built from a 53-line stub. The unflinching counter-tradition to the Hudson
// River School's idealized wilderness: art that looked at ordinary, brutal, and
// unglamorous American life head-on, from Homer's indifferent sea and Eakins's
// bloody operating theater to the cosmopolitan portraits of Sargent and Whistler,
// the gritty Ashcan city of Bellows, and Wyeth's lonely field. Cool museum-grey
// wall, white-matted frames. Imagery is local, wired through art-assets.ts.

import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ArtStyles, ArtParallaxBand } from "@/components/art-architecture/ArtAnimations";
import { ArtFramedPlate, SpotlightPiece } from "@/components/art-architecture/GalleryPieces";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { ART_ASSETS } from "@/lib/data/art-assets";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "American Realism | Art & Architecture",
  description:
    "The unflinching counter-tradition to the idealized wilderness of the Hudson River School. From Winslow Homer and Thomas Eakins to Sargent, Whistler, the Ashcan School, and Andrew Wyeth, American Realism looked at the country without flattery.",
  alternates: { canonical: "/art-architecture/american-realism" },
};

const WALL = "#16181b";
const RUST = "#c15a44";

interface Plate {
  key: keyof typeof ART_ASSETS;
  artist: string;
  title: string;
  year: string;
  en: string;
  ro: string;
}

const HOMER: Plate[] = [
  {
    key: "homerGulfStream", artist: "Winslow Homer", title: "The Gulf Stream", year: "1899",
    en: "A Black sailor lies on the deck of a dismasted boat, ringed by sharks and a distant waterspout, the sea utterly indifferent to his fate. Homer refused to soften it, and when buyers complained, he answered only that the man would eventually be rescued, or not.",
    ro: "Un marinar de culoare zace pe puntea unei bărci fără catarg, înconjurat de rechini și de o trombă de apă în depărtare, marea complet indiferentă la soarta lui. Homer a refuzat să înmoaie scena, iar când cumpărătorii s-au plâns, a răspuns doar că omul va fi în cele din urmă salvat, sau nu.",
  },
  {
    key: "homerSnapWhip", artist: "Winslow Homer", title: "Snap the Whip", year: "1872",
    en: "Barefoot boys tear across a field beside a one-room schoolhouse, a nostalgic vision of a rural America already vanishing after the Civil War. Homer's realism could be tender as well as harsh, but it was never sentimental.",
    ro: "Băieți desculți gonesc pe un câmp lângă o școală cu o singură cameră, o viziune nostalgică a unei Americi rurale care deja dispărea după Războiul Civil. Realismul lui Homer putea fi tandru la fel de bine ca aspru, dar nu era niciodată siropos.",
  },
];

const COSMO: Plate[] = [
  {
    key: "sargentMadameX", artist: "John Singer Sargent", title: "Madame X", year: "1884",
    en: "A society beauty in a black gown, painted with such cool audacity that its Paris debut became a scandal and drove Sargent to London. American realism at its most cosmopolitan: unflattering truth dressed in perfect technique.",
    ro: "O frumusețe a înaltei societăți într-o rochie neagră, pictată cu o îndrăzneală atât de rece încât debutul ei la Paris a devenit un scandal și l-a împins pe Sargent la Londra. Realismul american în forma sa cea mai cosmopolită: adevăr nemăgulitor îmbrăcat în tehnică perfectă.",
  },
  {
    key: "whistlerMother", artist: "James McNeill Whistler", title: "Whistler's Mother", year: "1871",
    en: "Officially Arrangement in Grey and Black No. 1, a study of tone and geometry that happens to be the artist's mother. Whistler pushed realism toward pure design, insisting a painting was an arrangement of color before it was a portrait.",
    ro: "Oficial Aranjament în gri și negru nr. 1, un studiu de ton și geometrie care se întâmplă să fie mama artistului. Whistler a împins realismul spre design pur, insistând că un tablou este un aranjament de culoare înainte de a fi un portret.",
  },
];

export default async function AmericanRealismPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const t = isRo
    ? {
        home: "Acasă", section: "Artă & Arhitectură", pageLabel: "Realismul american",
        eyebrow: "ADEVĂR CONTRA SUBLIM · 1860–1950",
        heroTitle: "Realismul american",
        heroDeck: "Contra-tradiția neînduplecată a sălbăticiei idealizate a Râului Hudson: arta care a privit America fără măgulire.",
        thesisLead: "Dacă Râul Hudson picta o sălbăticie atinsă de Dumnezeu, realismul picta adevărul.",
        thesisBody: "În timp ce o generație transforma munții în catedrale ale luminii, o alta privea America exact așa cum era: indiferența mării, sângele din sala de operație, singurătatea orașului, ringul de box. Realismul american nu a căutat sublimul. A căutat faptul, oricât de incomod, și tocmai de aceea a rămas la fel de american ca peisajele pe care le contrazicea.",
        homerLabel: "MAREA ȘI NAȚIUNEA", homerTitle: "Winslow Homer",
        homerBody: "Cel mai mare pictor american al secolului al XIX-lea a început ca ilustrator al Războiului Civil și și-a petrecut ultimii ani privind marea de pe coasta stâncoasă a statului Maine. Realismul lui putea fi tandru sau brutal, dar nu clipea niciodată.",
        eakinsLabel: "OCHIUL NEÎNDUPLECAT", eakinsTitle: "Thomas Eakins",
        eakinsBody: "Eakins a studiat anatomia ca un medic și a pictat ca un martor. The Gross Clinic arată un chirurg celebru operând într-un amfiteatru, cu mâna însângerată, o mamă ferindu-și privirea. A fost considerat prea șocant pentru expoziție, ascuns într-un pavilion medical. Astăzi este socotit unul dintre cele mai mari tablouri americane.",
        cosmoLabel: "COSMOPOLIȚII", cosmoTitle: "Sargent și Whistler",
        cosmoBody: "Nu tot realismul era aspru. Doi americani expatriați au dus tehnica la culmi europene, unul cu bravură strălucitoare, celălalt cu reținere tonală, dovedind că adevărul putea fi și rafinat.",
        ashcanLabel: "ȘCOALA ASHCAN", ashcanTitle: "Orașul, fără fard",
        ashcanBody: "La începutul secolului XX, un grup de pictori din New York a întors spatele saloanelor și a pictat orașul murdar și viu: bulevarde aglomerate, cârciumi, ringuri de box. Stag at Sharkey's al lui George Bellows surprinde doi boxeri încleștați sub lumini, o explozie de carne și mișcare care este toată energie brută urbană.",
        wyethLabel: "REALISTUL MODERN", wyethTitle: "Andrew Wyeth",
        wyethBody: "Chiar și când New York-ul inventa expresionismul abstract, realismul a supraviețuit. Christina's World al lui Andrew Wyeth arată o femeie infirmă târându-se printr-un câmp spre o casă îndepărtată, o imagine a dorului și a limitei care a devenit una dintre cele mai iubite picturi americane, dovadă că ochiul realist nu a murit niciodată.",
        quote: "Nu pictez ceea ce văd. Pictez ceea ce este.",
        quoteBy: "atribuit spiritului realist american",
      }
    : {
        home: "Home", section: "Art & Architecture", pageLabel: "American Realism",
        eyebrow: "TRUTH vs THE SUBLIME · 1860–1950",
        heroTitle: "American Realism",
        heroDeck: "The unflinching counter-tradition to the idealized wilderness of the Hudson River School: art that looked at America without flattery.",
        thesisLead: "If the Hudson River School painted a God-touched wilderness, Realism painted the truth.",
        thesisBody: "While one generation turned mountains into cathedrals of light, another looked at America exactly as it was: the indifference of the sea, the blood of the operating room, the loneliness of the city, the boxing ring. American Realism did not chase the sublime. It chased the fact, however uncomfortable, and that is precisely why it stayed as American as the landscapes it argued against.",
        homerLabel: "THE SEA AND THE NATION", homerTitle: "Winslow Homer",
        homerBody: "The greatest American painter of the 19th century began as a Civil War illustrator and spent his last years watching the sea from the rocky coast of Maine. His realism could be tender or brutal, but it never blinked.",
        eakinsLabel: "THE UNFLINCHING EYE", eakinsTitle: "Thomas Eakins",
        eakinsBody: "Eakins studied anatomy like a doctor and painted like a witness. The Gross Clinic shows a famous surgeon operating in an amphitheater, his hand bloodied, a mother shielding her eyes. It was judged too shocking to exhibit and hidden in a medical pavilion. Today it is counted among the greatest of all American paintings.",
        cosmoLabel: "THE COSMOPOLITANS", cosmoTitle: "Sargent and Whistler",
        cosmoBody: "Not all realism was harsh. Two expatriate Americans took the technique to European heights, one with dazzling bravura, the other with tonal restraint, proving the truth could also be refined.",
        ashcanLabel: "THE ASHCAN SCHOOL", ashcanTitle: "The city, unvarnished",
        ashcanBody: "In the early 20th century a group of New York painters turned their backs on the salons and painted the dirty, living city: crowded streets, saloons, boxing rings. George Bellows's Stag at Sharkey's catches two fighters locked under the lights, a burst of flesh and motion that is all raw urban energy.",
        wyethLabel: "THE MODERN REALIST", wyethTitle: "Andrew Wyeth",
        wyethBody: "Even as New York was inventing Abstract Expressionism, realism survived. Andrew Wyeth's Christina's World shows a disabled woman dragging herself across a field toward a distant house, an image of longing and limit that became one of the most beloved American paintings, proof the realist eye never died.",
        quote: "I do not paint what I see. I paint what is.",
        quoteBy: "the spirit of American Realism",
      };

  return (
    <>
      <ArtStyles />
      <main style={{ background: WALL }} className="min-h-screen text-[#e8e9ec]">
        {/* Hero */}
        <section className="relative h-[92vh] min-h-[600px] w-full overflow-hidden">
          <Image
            src={ART_ASSETS.homerGulfStream.src}
            alt={isRo ? ART_ASSETS.homerGulfStream.altRo : ART_ASSETS.homerGulfStream.alt}
            fill priority sizes="100vw" className="object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(22,24,27,0.4) 0%, rgba(22,24,27,0.2) 45%, rgba(22,24,27,0.94) 100%)" }} />
          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto max-w-6xl px-6 pb-16 sm:px-8">
              <p className="mb-5 font-sans text-[11px] font-bold uppercase tracking-[0.4em]" style={{ color: RUST }}>{t.eyebrow}</p>
              <h1 className="font-serif text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl">{t.heroTitle}</h1>
              <p className="mt-6 max-w-2xl font-serif text-xl leading-relaxed text-white/75">{t.heroDeck}</p>
              <div className="mt-8">
                <Breadcrumb items={[{ label: t.home, href: "/" }, { label: t.section, href: "/art-architecture" }, { label: t.pageLabel }]} className="py-0 text-white/70" />
              </div>
            </div>
          </div>
        </section>

        {/* Thesis */}
        <section className="mx-auto max-w-3xl px-6 py-24 md:py-32">
          <p className="font-serif text-3xl font-medium leading-[1.3] text-[#e8e9ec] md:text-[2.4rem]">{t.thesisLead}</p>
          <p className="mt-8 font-sans text-lg leading-relaxed text-white/60">{t.thesisBody}</p>
          <div className="mt-14 h-px w-24" style={{ background: RUST }} />
        </section>

        {/* Homer */}
        <section className="mx-auto max-w-5xl px-6 pb-24">
          <Head label={t.homerLabel} title={t.homerTitle} body={t.homerBody} rust={RUST} />
          <div className="mt-14 grid gap-14 md:grid-cols-2">
            {HOMER.map((p) => (
              <div key={p.key}>
                <ArtFramedPlate variant="cube" src={ART_ASSETS[p.key].src} alt={isRo ? ART_ASSETS[p.key].altRo : ART_ASSETS[p.key].alt} artist={p.artist} title={p.title} year={p.year} />
                <p className="mx-auto mt-5 max-w-md text-center font-sans text-sm leading-relaxed text-white/55">{isRo ? p.ro : p.en}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Eakins */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <Head label={t.eakinsLabel} title={t.eakinsTitle} rust={RUST} />
          <div className="mt-6">
            <SpotlightPiece variant="cube" src={ART_ASSETS.eakinsGrossClinic.src} alt={isRo ? ART_ASSETS.eakinsGrossClinic.altRo : ART_ASSETS.eakinsGrossClinic.alt} artist="Thomas Eakins" title="The Gross Clinic" year="1875">
              <p className="font-sans text-lg leading-relaxed text-white/70">{t.eakinsBody}</p>
            </SpotlightPiece>
          </div>
        </section>

        <ArtParallaxBand imageSrc={ART_ASSETS.bellowsStag.src} imageAlt={isRo ? ART_ASSETS.bellowsStag.altRo : ART_ASSETS.bellowsStag.alt} height={520} />

        {/* Cosmopolitans */}
        <section className="mx-auto max-w-5xl px-6 py-24 md:py-32">
          <Head label={t.cosmoLabel} title={t.cosmoTitle} body={t.cosmoBody} rust={RUST} />
          <div className="mt-14 grid gap-14 md:grid-cols-2">
            {COSMO.map((p) => (
              <div key={p.key}>
                <ArtFramedPlate variant="cube" src={ART_ASSETS[p.key].src} alt={isRo ? ART_ASSETS[p.key].altRo : ART_ASSETS[p.key].alt} artist={p.artist} title={p.title} year={p.year} />
                <p className="mx-auto mt-5 max-w-md text-center font-sans text-sm leading-relaxed text-white/55">{isRo ? p.ro : p.en}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ashcan */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <Head label={t.ashcanLabel} title={t.ashcanTitle} rust={RUST} />
          <div className="mt-6">
            <SpotlightPiece variant="cube" reverse src={ART_ASSETS.bellowsStag.src} alt={isRo ? ART_ASSETS.bellowsStag.altRo : ART_ASSETS.bellowsStag.alt} artist="George Bellows" title="Stag at Sharkey's" year="1909">
              <p className="font-sans text-lg leading-relaxed text-white/70">{t.ashcanBody}</p>
            </SpotlightPiece>
          </div>
        </section>

        {/* Quote */}
        <section className="px-6 py-24 md:py-36" style={{ background: "#0f1113" }}>
          <blockquote className="mx-auto max-w-4xl text-center">
            <p className="font-serif text-3xl font-medium italic leading-[1.3] text-[#e8e9ec] md:text-5xl">&ldquo;{t.quote}&rdquo;</p>
            <footer className="mt-8 font-sans text-xs uppercase tracking-[0.3em]" style={{ color: RUST }}>{t.quoteBy}</footer>
          </blockquote>
        </section>

        {/* Wyeth */}
        <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <Head label={t.wyethLabel} title={t.wyethTitle} rust={RUST} />
          <div className="mt-6">
            <SpotlightPiece variant="cube" src={ART_ASSETS.wyethChristina.src} alt={isRo ? ART_ASSETS.wyethChristina.altRo : ART_ASSETS.wyethChristina.alt} artist="Andrew Wyeth" title="Christina's World" year="1948">
              <p className="font-sans text-lg leading-relaxed text-white/70">{t.wyethBody}</p>
            </SpotlightPiece>
          </div>
        </section>

        <AskAmericaCTA
          locale={locale}
          descriptionEn="Ask the AI Oracle about Winslow Homer's sea paintings, why Eakins's Gross Clinic scandalized Philadelphia, the Ashcan School, or Andrew Wyeth's Christina's World."
          descriptionRo="Întreabă Oracolul AI despre picturile marine ale lui Winslow Homer, de ce The Gross Clinic al lui Eakins a scandalizat Philadelphia, Școala Ashcan sau Christina's World al lui Andrew Wyeth."
        />
      </main>
    </>
  );
}

function Head({ label, title, body, rust }: { label: string; title: string; body?: string; rust: string }) {
  return (
    <div className="text-center">
      <p className="mb-4 font-sans text-[11px] font-bold uppercase tracking-[0.4em]" style={{ color: rust }}>{label}</p>
      <h2 className="font-serif text-3xl font-bold leading-tight text-[#e8e9ec] md:text-[2.6rem]">{title}</h2>
      {body && <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60">{body}</p>}
    </div>
  );
}
