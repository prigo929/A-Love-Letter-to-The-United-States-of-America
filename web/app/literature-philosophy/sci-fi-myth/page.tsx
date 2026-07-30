// ─── Science Fiction & Myth ──────────────────────────────────────────────────
// The fifth built page of the literature section. Its argument: The American
// frontier myth did not end at the Pacific; it left the West and went to space.
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
  title: "Science Fiction & Myth | Literature & Philosophy",
  description:
    "How the frontier story left the West and went to space. A close reading of Edgar Rice Burroughs, Ray Bradbury, and Robert Heinlein.",
  alternates: { canonical: "/literature-philosophy/sci-fi-myth" },
};

// Famous passage in the public domain.
const BURROUGHS_TEXT =
  "I am a very old man; how old I do not know. Possibly I am a hundred, possibly more; but I cannot tell because I have never aged as other men, nor do I know any who has seen me other than as I am today. I have been a very old man for as long as I can remember, and yet my body is today as active and strong as it was when I was a captain in the Confederate cavalry...";

const BURROUGHS_NOTES: Annotation[] = [
  {
    phrase: "captain in the Confederate cavalry",
    note: "Burroughs anchors John Carter in the aftermath of the American Civil War. The displacement of veteran soldiers to the West, and in this case, to Mars, is the literal mechanism of the frontier myth.",
    noteRo: "Burroughs îl ancorează pe John Carter în perioada de după Războiul Civil American. Strămutarea soldaților veterani în Vest: și, în acest caz, pe Marte: este mecanismul literal al mitului frontierei.",
  },
  {
    phrase: "never aged as other men",
    note: "A mythological device. Carter is an immortal adventurer, embodying the timeless spirit of exploration and conquest that defines the frontier archetype.",
    noteRo: "Un procedeu mitologic. Carter este un aventurier nemuritor, întruchipând spiritul atemporal al explorării și cuceririi care definește arhetipul frontierei.",
  },
  {
    phrase: "active and strong",
    note: "The physical self-reliance required of the frontier hero, whose survival depends entirely on personal capability, strength, and combat skill in an untamed, hostile land.",
    noteRo: "Încrederea fizică în sine necesară eroului de frontieră, a cărui supraviețuire depinde în întregime de capacitatea personală, forță și abilitățile de luptă într-un ținut sălbatic și ostil.",
  },
];

export default async function SciFiMythPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const copy = isRo
    ? {
        home: "Acasă",
        section: "Literatură & Filosofie",
        pageLabel: "Science-fiction & mit",
        eyebrow: "ULTIMA FRONTIERĂ · MITOLOGIE",
        titleLead: "CĂTRE",
        titleAccent: "STELE",
        heroDesc:
          "Cum povestea frontierei americane a părăsit Vestul și a plecat în spațiu. O analiză a modului în care cucerirea spațială a devenit noul mit al Manifest Destiny.",
        openingTitle: "Spațiul ca frontiera finală",
        openingBody:
          "Când istoricul Frederick Jackson Turner a declarat în 1890 că frontiera americană s-a închis, imaginația națională nu s-a oprit. În loc de asta, a căutat o nouă frontieră în stele. Science-fiction-ul american a preluat structurile mitice ale Westernului: pionierul singuratic, pământul gol de cucerit, lupta brută pentru supraviețuire și lipsa legilor: și le-a mutat în spațiul cosmic. De la călătoriile marțiene ale lui John Carter la nava Enterprise, cucerirea spațiului a rămas un mit profund american despre explorare și renaștere personală.",
        burroughsTitle: "Edgar Rice Burroughs și Westernul Marțian",
        burroughsBody:
          "În romanul său din 1912, „A Princess of Mars”, Edgar Rice Burroughs a creat arhetipul aventurii planetare. Protagonistul John Carter, un veteran al Războiului Civil American, se trezește pe o planetă Marte sălbatică și tribală. Apasă pe frazele subliniate pentru a-i explora textul.",
        burroughsPrimer:
          "Alege o frază subliniată pentru a analiza cum Burroughs îmbină Războiul Civil cu frontiera marțiană.",
        bradburyTitle: "Ray Bradbury și Cronicile marțiene",
        bradburyBody:
          "Capodopera lui Ray Bradbury din 1950, „Cronicile marțiene”, a cartografiat în mod explicit colonizarea planetei Marte pe istoria Vestului American. Poveștile nu descriu călătoria în spațiu ca pe un progres tehnic, ci ca pe o repetare a frontierei: sosirea pionierilor care construiesc orașe, strămutarea tragică și ștergerea culturilor native marțiene prin boli și expansiune, și înlocuirea unei sălbăticii străvechi cu suburbii familiare din Midwest. Pentru Bradbury, Marte a fost o pânză pe care americanii și-au proiectat atât cele mai înalte ambiții, cât și cele mai profunde regrete istorice, dovedind că oriunde merge pionierul, își poartă casa și istoria cu el.",
        heinleinTitle: "Robert Heinlein și Revoluția Lunară",
        heinleinBody:
          "Dacă Bradbury a văzut tragedia frontierei, Robert A. Heinlein a văzut posibilitățile ei revoluționare și politice. În „Luna e o doamnă rea” (1966), Heinlein a prezentat o colonie penitenciară lunară ca fiind noile State Unite ale erei spațiale. Povestea este o repovestire SF directă a Revoluției Americane: o colonie supusă impozitării și extracției de resurse de către o autoritate terestră se revoltă, redactându-și propria Declarație de Independență și declarându-și suveranitatea. Heinlein folosește mediul lunar dur ca test suprem al încrederii în sine de frontieră, susținând că constrângerile severe ale mediului forjează o societate superioară și liberă care depășește declinul birocratic al planetei-mamă.",
        sourceNote:
          "Imagini: portrete de pionieri și manuscrise din secolul XIX în domeniul public, via Wikimedia Commons.",
        backLink: "Toate temele de literatură și filosofie",
      }
    : {
        home: "Home",
        section: "Literature & Philosophy",
        pageLabel: "Science Fiction & Myth",
        eyebrow: "THE FINAL FRONTIER · MYTHOLOGY",
        titleLead: "TO THE",
        titleAccent: "STARS",
        heroDesc:
          "How the story of the American frontier left the West and went to space. An analysis of how space exploration became the new myth of Manifest Destiny.",
        openingTitle: "Space as the final frontier",
        openingBody:
          "When historian Frederick Jackson Turner declared in 1890 that the American frontier was closed, the national imagination did not stop. Instead, it sought a new frontier in the stars. American science fiction took the mythic structures of the Western: the solitary pioneer, the empty land to conquer, the raw struggle for survival, and the lawless wild: and moved them to outer space. From John Carter's Martian travels to the starship Enterprise, space exploration remained a deeply American myth of exploration and personal rebirth.",
        burroughsTitle: "Edgar Rice Burroughs and the Martian Western",
        burroughsBody:
          "In his 1912 novel 'A Princess of Mars,' Edgar Rice Burroughs created the planet-adventure archetype. John Carter, an American Civil War veteran, wakes up on a wild, tribal Mars. Click the underlined phrases to analyze the text.",
        burroughsPrimer:
          "Pick an underlined phrase to analyze how Burroughs links the Civil War to the Martian frontier.",
        bradburyTitle: "Ray Bradbury and the Conquest of Mars",
        bradburyBody:
          "Ray Bradbury's 1950 masterpiece 'The Martian Chronicles' explicitly mapped the colonization of Mars to the history of the American West. The stories do not depict space travel as technical progress, but as a repetition of the frontier: the arrival of pioneers building towns, the tragic displacement and erasure of native Martian cultures by disease and expansion, and the replacement of an ancient wilderness with familiar midwestern suburbs. For Bradbury, Mars was a canvas upon which Americans projected both their highest ambitions and their deepest historical regrets, proving that wherever the pioneer goes, they carry their home and their history with them.",
        heinleinTitle: "Robert Heinlein and the Lunar Revolution",
        heinleinBody:
          "If Bradbury saw the tragedy of the frontier, Robert A. Heinlein saw its revolutionary and political possibilities. In 'The Moon Is a Harsh Mistress' (1966), Heinlein cast a lunar penal colony as the new United States of the space age. The story is a direct sci-fi retelling of the American Revolution: a colony subjected to taxation and resource extraction by an earth-based authority rebels, drafting its own Declaration of Independence and declaring its sovereignty. Heinlein uses the harsh lunar environment as the ultimate test of frontier self-reliance, arguing that the severe constraints of the environment forge a superior, free society that outranks the bureaucratic decay of the mother planet.",
        sourceNote:
          "Imagery: 19th-century portraits and manuscript scans in the public domain, via Wikimedia Commons.",
        backLink: "All literature and philosophy topics",
      };

  const heroAsset = LITERATURE_ASSETS.poeManuscript;

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
          { value: "1912", label: isRo ? "Burroughs pe Marte" : "Burroughs on Mars" },
          { value: "1950", label: isRo ? "Cronicile marțiene" : "Martian Chronicles" },
          { value: "1966", label: isRo ? "Luna e o doamnă rea" : "Moon is a Harsh Mistress" },
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

      {/* Burroughs Close Reading */}
      <ManuscriptParallax asset="poeManuscript" drift={70} className="py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="macro-section-title mb-6">{copy.burroughsTitle}</h2>
          <p className="macro-body mb-16 max-w-3xl">{copy.burroughsBody}</p>
          <AnnotatedPassage
            text={BURROUGHS_TEXT}
            annotations={BURROUGHS_NOTES}
            primer={copy.burroughsPrimer}
            primerRo={copy.burroughsPrimer}
          />
        </div>
      </ManuscriptParallax>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* A powerful, centered quote from Star Trek */}
        <PullQuote
          quote="Space: the final frontier. These are the voyages of the starship Enterprise. Its five-year mission: to explore strange new worlds, to seek out new life and new civilizations, to boldly go where no man has gone before."
          attribution="Gene Roddenberry"
          meta={isRo ? "Star Trek, 1966" : "Star Trek, 1966"}
        />

        {/* Ray Bradbury */}
        <section className="py-20 md:py-28 border-b border-white/10">
          <h2 className="macro-section-title mb-12">{copy.bradburyTitle}</h2>
          <p className="macro-body max-w-3xl leading-relaxed text-white/70">
            {copy.bradburyBody}
          </p>
        </section>

        {/* Robert Heinlein */}
        <section className="py-20 md:py-28">
          <h2 className="macro-section-title mb-12">{copy.heinleinTitle}</h2>
          <p className="macro-body max-w-3xl leading-relaxed text-white/70">
            {copy.heinleinBody}
          </p>
        </section>

        <BookShowcase category="sci-fi-myth" />

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
