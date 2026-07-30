// ─── Transcendentalism ────────────────────────────────────────────────────────
// The third built page of the literature section. Its argument: Individual conscience
// outranks the crowd, nature is a direct source of divine truth, and the soul
// is self-reliant.
//
// On quoting: Quotes are in public domain. Annotations are bilingual.
// Quoted text stays in English in both locales to preserve original cadence.

import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { MacroStyles, MacroHero } from "@/components/economy/EconomyAnimations";
import {
  LitStyles,
  ScrollIlluminatedText,
  AnnotatedPassage,
  ManuscriptParallax,
  PullQuote,
  type Annotation,
} from "@/components/literature/LiteratureAnimations";
import { LITERATURE_ASSETS } from "@/lib/data/literature-assets";
import { getServerLocale } from "@/lib/i18n/server";
import { BookShowcase } from "@/components/literature/BookShowcase";

export const metadata: Metadata = {
  title: "Transcendentalism | Literature & Philosophy",
  description:
    "Trust thyself. A close reading of Ralph Waldo Emerson and Henry David Thoreau, and the New England revolt against social conformity.",
  alternates: { canonical: "/literature-philosophy/transcendentalism" },
};

// Famous passages in the public domain.
const EMERSON_TEXT =
  "There is a time in every man's education when he arrives at the conviction that envy is ignorance; that imitation is suicide; that he must take himself for better, for worse, as his portion; that though the wide universe is full of good, no kernel of nourishing corn can come to him but through his toil bestowed on that plot of ground which is given to him to till. The power which resides in him is new in nature, and none but he knows what that is which he can do, nor does he know until he has tried. Trust thyself: every heart vibrates to that iron string.";

const THOREAU_TEXT =
  "I went to the woods because I wished to live deliberately, to front only the essential facts of life, and see if I could not learn what it had to teach, and not, when I came to die, discover that I had not lived. I did not wish to live what was not life, living is so dear; nor did I wish to practise resignation, unless it was quite necessary. I wanted to live deep and suck out all the marrow of life...";

const EMERSON_NOTES: Annotation[] = [
  {
    phrase: "envy is ignorance; imitation is suicide",
    note: "Emerson declares that copying others is a betrayal of one's unique identity. Conformity acts as both a social compromise and a spiritual self-destruction.",
    noteRo: "Emerson declară că a-i copia pe alții este o trădare a propriei identități unice. Conformismul reprezintă deopotrivă un compromis social și o distrugere spirituală.",
  },
  {
    phrase: "plot of ground which is given to him to till",
    note: "A metaphor for personal agency and raw capability. One's own life, circumstances, and talents represent the only soil from which real creation and growth can emerge.",
    noteRo: "O metaforă pentru acțiunea personală și capacitatea brută. Propria viață, circumstanțe și talente reprezintă singurul sol din care pot emerge creația și creșterea reală.",
  },
  {
    phrase: "Trust thyself: every heart vibrates to that iron string",
    note: "The central commandment of Transcendentalism. It calls for absolute trust in one's inner voice and intuition, which resonates with a universal divine truth.",
    noteRo: "Porunca centrală a transcendentalismului. Solicită încredere absolută în propria voce interioară și intuiție, care rezonează cu un adevăr divin universal.",
  },
];

const THOREAU_NOTES: Annotation[] = [
  {
    phrase: "wished to live deliberately",
    note: "To live with conscious intent, free from the unthinking routines and material distractions of modern society. Deliberate living is a systematic pursuit of truth.",
    noteRo: "A trăi cu o intenție conștientă, liber de rutinele lipsite de gândire și distragerile materiale ale societății moderne. Traiul deliberat este o căutare sistematică a adevărului.",
  },
  {
    phrase: "front only the essential facts of life",
    note: "Stripping away the artificial clutter of commerce and fashion to confront raw existence. Nature serves as the neutral, purifying laboratory for this reduction.",
    noteRo: "Înlăturarea aglomerării artificiale a comerțului și modei pentru a înfrunta existența brută. Natura servește ca laborator neutru, purificator pentru această reducere.",
  },
  {
    phrase: "suck out all the marrow of life",
    note: "An intense, physical metaphor for squeezing the absolute maximum utility and spiritual depth out of every moment. Life is precious and must not be wasted on trivialities.",
    noteRo: "O metaforă intensă, fizică, pentru a stoarce maximum de utilitate și profunzime spirituală din fiecare moment. Viața este prețioasă și nu trebuie irosită pe deșertăciuni.",
  },
];

export default async function TranscendentalismPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const copy = isRo
    ? {
        home: "Acasă",
        section: "Literatură & Filosofie",
        pageLabel: "Transcendentalism",
        eyebrow: "SINELE SUVERAN · FILOSOFIE",
        titleLead: "ÎNCREDE-TE",
        titleAccent: "ÎN TINE",
        heroDesc:
          "Emerson, Thoreau și revolta din Noua Anglie împotriva conformismului social. Argumentul că conștiința individuală trece înaintea mulțimii.",
        openingTitle: "O filosofie a independenței absolute",
        openingBody:
          "Transcendentalismul a apărut în New England în anii 1830 ca o revoltă împotriva formalismului religios și a materialismului industrial. A susținut că adevărul nu se găsește în cărți sau în biserici, ci în mod direct, prin intuiție și prin comuniunea cu natura. În centrul său se află o convingere radicală: individul poartă în sine o scânteie divină și are datoria de a-și asculta propria conștiință, chiar și atunci când întreaga societate îi cere contrariul.",
        emersonTitle: "Emerson și Încrederea în sine",
        emersonBody:
          "Eseul din 1841 al lui Ralph Waldo Emerson, „Self-Reliance”, a fost manifestul individualiștilor americani. Textul de mai jos conține celebrul său îndemn. Apasă pe orice frază subliniată pentru a-i explora argumentul.",
        emersonPrimer:
          "Alege o frază subliniată pentru a explora manifestul lui Emerson despre individualism.",
        thoreauTitle: "Thoreau și viața deliberată la Walden",
        thoreauBody:
          "În 1845, Henry David Thoreau s-a retras într-o cabină construită de el pe malul lacului Walden din Massachusetts. Experimentul său a fost o reducere sistematică a vieții la elementele esențiale pentru a dovedi că omul se poate elibera de sclavia muncii repetitive și a convențiilor sociale.",
        thoreauPrimer:
          "Alege o frază subliniată pentru a analiza textul lui Thoreau despre viața la Walden.",
        legacyTitle: "Nesupunerea civilă și moștenirea ei globală",
        legacyBody:
          "Rebeliunea din Noua Anglie nu a rămas în păduri. Eseul lui Thoreau din 1849, „Nesupunerea civilă”: scris după ce a fost închis pentru că a refuzat să plătească o taxă de vot în semn de protest față de sclavie și Războiul Mexicano-American: susținea că datoria morală a individului surclasează legile statului. Dacă o lege îți cere să fii agentul unei nedreptăți față de altul, scria el, „atunci, spun eu, încalcă legea”. Acest singur eseu a călătorit peste continente și decenii. A devenit un text fundamental pentru campaniile lui Mahatma Gandhi în India și mișcarea pentru drepturile civile a lui Martin Luther King Jr. în America, demonstrând cum o filosofie a conștiinței individuale poate rescrie istoria națiunilor.",
        sourceNote:
          "Imagini: portrete din secolul XIX și manuscrise în domeniul public, via Wikimedia Commons.",
        backLink: "Toate temele de literatură și filosofie",
      }
    : {
        home: "Home",
        section: "Literature & Philosophy",
        pageLabel: "Transcendentalism",
        eyebrow: "THE SOVEREIGN SELF · PHILOSOPHY",
        titleLead: "TRUST",
        titleAccent: "THYSELF",
        heroDesc:
          "Emerson, Thoreau, and the New England revolt against social conformity. The argument that the individual conscience outranks the crowd.",
        openingTitle: "A philosophy of absolute independence",
        openingBody:
          "Transcendentalism emerged in New England in the 1830s as a revolt against religious formalism and industrial materialism. It argued that truth is found not in books or churches, but directly through intuition and communion with nature. At its core lies a radical belief: the individual carries a divine spark within and has a duty to obey their own conscience, even when all of society demands otherwise.",
        emersonTitle: "Emerson and Self-Reliance",
        emersonBody:
          "Ralph Waldo Emerson's 1841 essay, 'Self-Reliance,' was the manifesto of American individualism. The passage below contains his famous exhortation. Click any underlined phrase to explore its argument.",
        emersonPrimer:
          "Pick an underlined phrase to explore Emerson's manifesto of individualism.",
        thoreauTitle: "Thoreau and Deliberate Living at Walden",
        thoreauBody:
          "In 1845, Henry David Thoreau retired to a cabin he built himself on the shores of Walden Pond in Massachusetts. His experiment was a systematic reduction of life to its essential elements, proving that a person could free themselves from the slavery of repetitive labor and social convention.",
        thoreauPrimer:
          "Pick an underlined phrase to analyze Thoreau's reflections on his Walden experiment.",
        legacyTitle: "Civil Disobedience and its global legacy",
        legacyBody:
          "The New England rebellion did not remain in the woods. Thoreau's 1849 essay 'Civil Disobedience': written after he was jailed for refusing to pay a poll tax in protest of slavery and the Mexican-American War: argued that the individual's moral duty outranks the laws of the state. If a law requires you to be an agent of injustice to another, he wrote, 'then, I say, break the law.' This single essay traveled across continents and decades. It became a primary text for Mahatma Gandhi's campaigns in India and Martin Luther King Jr.'s civil rights movement in America, demonstrating how a philosophy of individual conscience can rewrite the history of nations.",
        sourceNote:
          "Imagery: 19th-century portraits and manuscript scans in the public domain, via Wikimedia Commons.",
        backLink: "All literature and philosophy topics",
      };

  const heroAsset = LITERATURE_ASSETS.waldenTitlePage;

  return (
    <main className="min-h-screen bg-black text-white">
      <MacroStyles />
      <LitStyles />

      <MacroHero
        imageSrc={heroAsset.src}
        imageAlt={isRo ? heroAsset.altRo : heroAsset.alt}
        eyebrow={copy.eyebrow}
        titleLead={copy.titleLead}
        titleAccent={copy.titleAccent}
        description={copy.heroDesc}
        stats={[
          { value: "1836", label: isRo ? "Anul apariției" : "Emergence Year" },
          { value: "2", label: isRo ? "Piloni principali" : "Core Thinkers" },
          { value: "1854", label: isRo ? "Publicarea Walden" : "Walden Published" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: copy.home, href: "/" },
            { label: copy.section, href: "/literature-philosophy" },
            { label: copy.pageLabel },
          ]}
          className="py-8"
        />

        {/* Introduction, illuminated on scroll */}
        <section className="py-24 md:py-32">
          <h2 className="macro-section-title mb-12">{copy.openingTitle}</h2>
          <ScrollIlluminatedText className="lit-serif lit-measure text-2xl leading-[1.7] md:text-[34px] md:leading-[1.55]">
            {copy.openingBody}
          </ScrollIlluminatedText>
        </section>
      </div>

      {/* Emerson Close Reading */}
      <ManuscriptParallax asset="emersonPortrait" drift={75} className="py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="macro-section-title mb-6">{copy.emersonTitle}</h2>
          <p className="macro-body mb-16 max-w-3xl">{copy.emersonBody}</p>
          <AnnotatedPassage
            text={EMERSON_TEXT}
            annotations={EMERSON_NOTES}
            primer={copy.emersonPrimer}
            primerRo={copy.emersonPrimer}
          />
        </div>
      </ManuscriptParallax>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* A powerful, centered quote from Walden */}
        <PullQuote
          quote="If a man does not keep pace with his companions, perhaps it is because he hears a different drummer. Let him step to the music which he hears, however measured or far away."
          attribution="Henry David Thoreau"
          meta={isRo ? "Walden, 1854" : "Walden, 1854"}
        />
      </div>

      {/* Thoreau Close Reading */}
      <ManuscriptParallax asset="thoreauPortrait" drift={65} className="py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="macro-section-title mb-6">{copy.thoreauTitle}</h2>
          <p className="macro-body mb-16 max-w-3xl">{copy.thoreauBody}</p>
          <AnnotatedPassage
            text={THOREAU_TEXT}
            annotations={THOREAU_NOTES}
            primer={copy.thoreauPrimer}
            primerRo={copy.thoreauPrimer}
          />
        </div>
      </ManuscriptParallax>

      {/* Legacy and Disobedience */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="py-24 md:py-32">
          <h2 className="macro-section-title mb-12">{copy.legacyTitle}</h2>
          <p className="macro-body max-w-3xl leading-relaxed text-white/70">
            {copy.legacyBody}
          </p>
        </section>

        <BookShowcase category="transcendentalism" />

        <div className="border-t border-white/10 py-12">
          <p className="font-body text-xs text-white/30">{copy.sourceNote}</p>
          <Link
            href="/literature-philosophy"
            className="mt-6 inline-block font-body text-sm text-glory-gold transition-opacity hover:opacity-70"
          >
            ← {copy.backLink}
          </Link>
        </div>
      </div>
    </main>
  );
}
