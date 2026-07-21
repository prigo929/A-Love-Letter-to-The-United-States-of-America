// ─── Pragmatism ──────────────────────────────────────────────────────────────
// The fourth built page of the literature section. Its argument: Truth is not a
// static mirror of nature, but an instrument we use to navigate the world.
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
  title: "Pragmatism | Literature & Philosophy",
  description:
    "Truth as the thing that works. A close reading of William James, Charles Sanders Peirce, John Dewey, and America's one native philosophy.",
  alternates: { canonical: "/literature-philosophy/pragmatism" },
};

// Famous passage in the public domain.
const JAMES_TEXT =
  "Pragmatism asks its usual question. 'Grant an idea or belief to be true,' it says, 'what concrete difference will its being true make in anyone's actual life? How will the truth be realized? What experiences will be different from those which would obtain if the belief were false? What, in short, is the truth's cash-value in experiential terms?' ... Truth lives, in fact, for the most part on a credit system. Our thoughts and beliefs 'pass' so long as nothing challenges them, just as bank-notes pass so long as nobody refuses them.";

const JAMES_NOTES: Annotation[] = [
  {
    phrase: "what concrete difference will its being true make",
    note: "The core pragmatic test. James argues that if a belief has no observable, practical effects on how we act or experience the world, then the debate over its truth is meaningless.",
    noteRo: "Testul pragmatic de bază. James susține că dacă o credință nu are efecte observabile și practice asupra modului în care acționăm sau experimentăm lumea, atunci dezbaterea asupra adevărului ei este lipsită de sens.",
  },
  {
    phrase: "truth's cash-value in experiential terms",
    note: "A famous, deliberately commercial metaphor. James treats ideas as currencies whose worth is determined by their utility and practical results, not by abstract matching to a transcendental realm.",
    noteRo: "O metaforă faimoasă, deliberat comercială. James tratează ideile ca pe monede a căror valoare este determinată de utilitatea lor și de rezultatele practice, nu de potrivirea abstractă cu un tărâm transcendental.",
  },
  {
    phrase: "truth lives, in fact, for the most part on a credit system",
    note: "Most of what we accept as true is taken on trust (credit) because verifying every single claim ourselves would render action impossible. Truth is a social contract that operates until challenged.",
    noteRo: "Cea mai mare parte a ceea ce acceptăm ca adevărat este luat pe încredere (credit), deoarece verificarea personală a fiecărei afirmații ar face acțiunea imposibilă. Adevărul este un contract social care funcționează până când este contestat.",
  },
];

export default async function PragmatismPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const copy = isRo
    ? {
        home: "Acasă",
        section: "Literatură & Filosofie",
        pageLabel: "Pragmatism",
        eyebrow: "FILOSOFIA AUTOHTONĂ · PRAGMATISM",
        titleLead: "CEEA CE",
        titleAccent: "FUNCȚIONEAZĂ",
        heroDesc:
          "Singura filosofie autohtonă a Americii: adevărul ca instrument de navigare a lumii, nu ca oglindă statică a naturii. De la Peirce la Dewey.",
        openingTitle: "O filosofie a consecințelor practice",
        openingBody:
          "Pragmatismul a apărut la sfârșitul secolului XIX ca o alternativă la sistemele metafizice europene. În loc să întrebe de unde provin ideile noastre sau dacă ele reflectă un tărâm ideal, pragmatismul întreabă ce diferență fac ele în viața reală. O idee este considerată adevărată dacă funcționează: dacă ne ajută să facem predicții mai bune, să ne organizăm acțiunile și să ne îmbunătățim experiența. Este o filosofie profund legată de spiritul experimental al democrației americane.",
        jamesTitle: "William James și Valoarea de schimb a adevărului",
        jamesBody:
          "În seria sa de prelegeri din 1907, „Pragmatism”, William James a popularizat această metodă folosind o metaforă faimoasă. Textul de mai jos este extras din acele eseuri. Apasă pe orice frază subliniată pentru a-i analiza argumentul.",
        jamesPrimer:
          "Alege o frază subliniată pentru a analiza argumentul lui William James despre cash-value.",
        peirceTitle: "Charles Sanders Peirce și Maxima Pragmatică",
        peirceBody:
          "Pragmatismul a început în anii 1870 în Cambridge, Massachusetts, în cadrul discuțiilor informale ale „Clubului Metafizic”. Charles Sanders Peirce, un logician strălucit și excentric, a fost cel care a formulat prima dată maxima de bază în eseul său din 1878, „Cum să ne clarificăm ideile”. Peirce susținea că pentru a înțelege orice concept, trebuie pur și simplu să examinăm ce efecte fizice și observabile concepem că are. Concepția noastră despre acele efecte practice reprezintă totalitatea concepției noastre despre obiect. Pentru Peirce, filosofia nu era o fugă în metafizica abstractă, ci o metodă de clarificare pentru a sprijini cercetarea empirică.",
        deweyTitle: "John Dewey și Experimentul Democratic",
        deweyBody:
          "În timp ce Peirce a conceput metoda și James a popularizat-o, John Dewey a aplicat pragmatismul la instituțiile structurale ale vieții americane: educația și democrația. Instrumentalisul lui Dewey vedea gândurile ca instrumente pentru rezolvarea problemelor. În educație, el a respins memorarea mecanică în favoarea conceptului „învățării prin practică”, transformând sălile de clasă în laboratoare active de experiență. În politică, el a susținut că democrația nu este un set static de reguli, ci un mod de viață cooperativ și experimental. Pentru Dewey, o societate democratică este o comunitate angajată în experimente raționale continue pentru a rezolva probleme comune și a extinde capacitatea umană.",
        sourceNote:
          "Imagini: portrete din secolul XIX în domeniul public, via Wikimedia Commons.",
        backLink: "Toate temele de literatură și filosofie",
      }
    : {
        home: "Home",
        section: "Literature & Philosophy",
        pageLabel: "Pragmatism",
        eyebrow: "THE NATIVE PHILOSOPHY · PRAGMATISM",
        titleLead: "WHAT",
        titleAccent: "WORKS",
        heroDesc:
          "America's one native philosophy: truth as an instrument for navigating the world, not as a static mirror of nature. From Peirce to Dewey.",
        openingTitle: "A philosophy of practical consequences",
        openingBody:
          "Pragmatism emerged in the late 19th century as an alternative to European metaphysical systems. Instead of asking where our ideas come from or whether they reflect an ideal realm, pragmatism asks what difference they make in real life. An idea is true if it works: if it helps us make better predictions, organize our actions, and improve our experience. It is a philosophy deeply tied to the experimental spirit of American democracy.",
        jamesTitle: "William James and the Cash Value of Truth",
        jamesBody:
          "In his 1907 lectures on 'Pragmatism,' William James popularized the method using a famous metaphor. The passage below is extracted from those essays. Click any underlined phrase to analyze its argument.",
        jamesPrimer:
          "Pick an underlined phrase to analyze William James's argument about the cash-value of truth.",
        peirceTitle: "Charles Sanders Peirce and the Pragmatic Maxim",
        peirceBody:
          "Pragmatism began in the 1870s in Cambridge, Massachusetts, within the informal discussions of the 'Metaphysical Club.' It was Charles Sanders Peirce, a brilliant and eccentric logician, who first formulated the core maxim in his 1878 essay 'How to Make Our Ideas Clear.' Peirce argued that to understand any concept, we must simply examine what physical, observable effects we conceive it to have. Our conception of those practical effects is the entirety of our conception of the object. For Peirce, philosophy was not a flight into abstract metaphysics, but a method of clarification to aid empirical inquiry.",
        deweyTitle: "John Dewey and the Democratic Experiment",
        deweyBody:
          "While Peirce designed the method and James popularized it, John Dewey applied pragmatism to the structural institutions of American life: education and democracy. Dewey's Instrumentalism viewed thoughts as tools for problem-solving. In education, he rejected rote memorization in favor of 'learning by doing,' turning classrooms into active laboratories of experience. In politics, he argued that democracy is not a static set of rules, but a cooperative, experimental way of life. For Dewey, a democratic society is a community engaged in continuous, rational experimentation to solve shared problems and expand human capability.",
        sourceNote:
          "Imagery: 19th-century portraits in the public domain, via Wikimedia Commons.",
        backLink: "All literature and philosophy topics",
      };

  const heroAsset = LITERATURE_ASSETS.williamJames;

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
          { value: "1878", label: isRo ? "Maxima lui Peirce" : "Peirce's Maxim" },
          { value: "1907", label: isRo ? "Publicarea prelegerilor" : "Lectures Published" },
          { value: "1", label: isRo ? "Filosofie autohtonă" : "Native Philosophy" },
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

      {/* William James Close Reading */}
      <ManuscriptParallax asset="williamJames" drift={70} className="py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="macro-section-title mb-6">{copy.jamesTitle}</h2>
          <p className="macro-body mb-16 max-w-3xl">{copy.jamesBody}</p>
          <AnnotatedPassage
            text={JAMES_TEXT}
            annotations={JAMES_NOTES}
            primer={copy.jamesPrimer}
            primerRo={copy.jamesPrimer}
          />
        </div>
      </ManuscriptParallax>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* A powerful, centered quote from Pragmatism */}
        <PullQuote
          quote="The true is the name of whatever proves itself to be good in the way of belief, and good, too, for definite, assignable reasons."
          attribution="William James"
          meta={isRo ? "Pragmatism, 1907" : "Pragmatism, 1907"}
        />

        {/* Charles Sanders Peirce */}
        <section className="py-20 md:py-28 border-b border-white/10">
          <h2 className="macro-section-title mb-12">{copy.peirceTitle}</h2>
          <p className="macro-body max-w-3xl leading-relaxed text-white/70">
            {copy.peirceBody}
          </p>
        </section>

        {/* John Dewey */}
        <section className="py-20 md:py-28">
          <h2 className="macro-section-title mb-12">{copy.deweyTitle}</h2>
          <p className="macro-body max-w-3xl leading-relaxed text-white/70">
            {copy.deweyBody}
          </p>
        </section>

        <BookShowcase category="pragmatism" />

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
