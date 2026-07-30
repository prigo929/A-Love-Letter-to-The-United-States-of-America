// ─── Oratory & Poetry ────────────────────────────────────────────────────────
// The first built page of the literature section, and the pattern the other four
// follow. Its argument: American oratory is a written form. The speeches that
// lasted were composed, not improvised, and they survive as text.
//
// Two constraints shaped what is on this page:
//
//  1. COPYRIGHT. Everything quoted at length here is public domain: Lincoln
//     (1863), Douglass (1852), Whitman (1855). "I Have a Dream" is 1963 and the
//     King estate actively enforces it, so it is discussed and cited but never
//     excerpted beyond a few attributed words. Do not add a long MLK passage.
//
//  2. TRANSLATION. Quoted text stays in English in both locales. A Romanian
//     "Four score and seven years ago" is a different sentence with a different
//     cadence, and the cadence is the whole subject. Romanian readers get the
//     analysis translated and the primary text intact — which is also how a
//     serious bilingual anthology handles it.

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
  title: "Oratory & Poetry | Literature & Philosophy",
  description:
    "The Gettysburg Address ran 272 words and two minutes. A close reading of American oratory as a written form, including Lincoln, Douglass, and Whitman.",
  alternates: { canonical: "/literature-philosophy/oratory-poetry" },
};

// The Bliss copy text, which is the version carved at the Lincoln Memorial and
// the only one Lincoln signed. Public domain.
const GETTYSBURG =
  "Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal. Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and so dedicated, can long endure. We are met on a great battle-field of that war. We have come to dedicate a portion of that field, as a final resting place for those who here gave their lives that that nation might live. It is altogether fitting and proper that we should do this. But, in a larger sense, we can not dedicate — we can not consecrate — we can not hallow — this ground. The brave men, living and dead, who struggled here, have consecrated it, far above our poor power to add or detract. The world will little note, nor long remember what we say here, but it can never forget what they did here. It is rather for us to be here dedicated to the great task remaining before us — that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion — that we here highly resolve that these dead shall not have died in vain — that this nation, under God, shall have a new birth of freedom — and that government of the people, by the people, for the people, shall not perish from the earth.";

const GETTYSBURG_NOTES: Annotation[] = [
  {
    phrase: "Four score and seven years ago",
    note: "Eighty-seven years, so 1776. Lincoln dates the nation from the Declaration and its promise of equality, not from the Constitution that tolerated slavery. The entire argument of the war is inside that arithmetic. And a 'score' belongs to the Psalms rather than to counting, which makes a recent country sound ancient.",
    noteRo: "Optzeci și șapte de ani, deci 1776. Lincoln datează națiunea de la Declarație și de la promisiunea ei de egalitate, nu de la Constituția care tolera sclavia. Întregul argument al războiului se află în această aritmetică. Iar „score” aparține Psalmilor, nu numărătorii, ceea ce face ca o țară tânără să sune străveche.",
  },
  {
    phrase: "conceived in Liberty",
    note: "The first move in a sustained birth metaphor: conceived, brought forth, new birth. The nation is a living thing that can be born a second time, which is what lets the speech end on rebirth instead of on loss.",
    noteRo: "Prima mișcare într-o metaforă susținută a nașterii: conceput, adus pe lume, o nouă naștere. Națiunea este un organism viu care poate fi născut a doua oară, iar asta permite discursului să se încheie cu renaștere, nu cu pierdere.",
  },
  {
    phrase: "all men are created equal",
    note: "He calls it a proposition. Not a fact the country owns but a claim still on trial, which is precisely why the war can be described as a test. Jefferson wrote it as a self-evident truth; Lincoln quietly demotes it to something that must be proven.",
    noteRo: "O numește o propoziție. Nu un fapt pe care țara îl deține, ci o afirmație încă în probă, exact de aceea războiul poate fi descris ca un test. Jefferson o scrisese ca adevăr evident prin sine; Lincoln o retrogradează discret la ceva ce trebuie dovedit.",
  },
  {
    phrase: "The world will little note, nor long remember what we say here",
    note: "The most famous wrong prediction in American speech. It is also a rhetorical device as old as Cicero: diminish your own words so the deeds you are honouring rise above them. The line survives precisely because it was false.",
    noteRo: "Cea mai celebră predicție greșită din oratoria americană. Este totodată un procedeu retoric vechi de pe vremea lui Cicero: îți diminuezi propriile cuvinte pentru ca faptele pe care le onorezi să se ridice deasupra lor. Fraza supraviețuiește tocmai fiindcă era falsă.",
  },
  {
    phrase: "a new birth of freedom",
    note: "The metaphor closes here. Emancipation is framed not as a rupture with the founding but as the same nation being born again, which lets an extraordinarily radical act sound like continuity.",
    noteRo: "Aici se închide metafora. Emanciparea nu este prezentată ca o ruptură cu întemeierea, ci ca aceeași națiune născută din nou, ceea ce face ca un act extraordinar de radical să sune ca o continuitate.",
  },
  {
    phrase: "of the people, by the people, for the people",
    note: "Three prepositions, one noun, no adjectives at all. The construction was not his: Daniel Webster and the abolitionist preacher Theodore Parker both used versions of it. Lincoln compressed it until it scanned like a line of verse, which is why his is the one people can recite.",
    noteRo: "Trei prepoziții, un substantiv, niciun adjectiv. Construcția nu îi aparținea: Daniel Webster și predicatorul aboliționist Theodore Parker folosiseră amândoi variante ale ei. Lincoln a comprimat-o până a căpătat metrica unui vers, de aceea a lui este cea pe care oamenii o pot recita.",
  },
];

export default async function OratoryPoetryPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const copy = isRo
    ? {
        breadcrumbHome: "Acasă",
        breadcrumbSection: "Literatură & Filosofie",
        pageLabel: "Oratorie & Poezie",
        eyebrow: "CUVÂNTUL ROSTIT · ORATORIE",
        titleLead: "DOUĂ",
        titleAccent: "MINUTE",
        heroDesc:
          "Discursul de la Gettysburg are 272 de cuvinte. Oratorul dinaintea lui a vorbit două ore, iar nimeni nu-și amintește un singur cuvânt din ce a spus.",
        openingTitle: "Oratoria americană este o formă scrisă",
        openingBody:
          "Discursurile care au rămas nu au fost improvizate. Au fost compuse: revizuite, cronometrate, construite frază cu frază de oameni care știau exact ce face fiecare cuvânt. Lincoln și-a scris discursul înainte de a pleca la Gettysburg și l-a revizuit în noaptea dinaintea rostirii. Douglass și-a pregătit atacul din 1852 luni întregi. Ceea ce numim oratorie americană supraviețuiește pentru că a fost, de la bun început, literatură.",
        closeTitle: "Discursul, luat pe bucăți",
        closeBody:
          "Textul de mai jos este copia Bliss, singura pe care Lincoln a semnat-o și cea gravată la Lincoln Memorial. Apasă pe orice frază subliniată pentru a vedea ce face.",
        primer:
          "Alege o frază subliniată. Fiecare face altceva: datează națiunea, mută o metaforă, împrumută o cadență.",
        douglassTitle: "Cealaltă tradiție",
        douglassBody:
          "Cu unsprezece ani înaintea Gettysburgului, Frederick Douglass a fost invitat să vorbească de Patru Iulie și a întrebat auditoriul de ce l-au chemat. Discursul este cel mai bun exemplu american de laudă transformată în acuzație: petrece o treime din durata lui elogiind Părinții Fondatori, pentru ca apoi să întoarcă tot acel respect împotriva ascultătorilor săi.",
        douglassQuoteGloss:
          "„Ce înseamnă pentru sclav Patru Iulie?” — Douglass, Rochester, New York, 5 iulie 1852.",
        whitmanTitle: "Și apoi versul se rupe",
        whitmanBody:
          "În 1855, Walt Whitman a publicat pe cheltuiala lui o carte fără numele autorului pe copertă, scrisă în versuri care nu rimau și nu respectau nicio metrică engleză. Poezia americană nu s-a mai întors niciodată. Ceea ce Lincoln a făcut cu cadența unei propoziții, Whitman a făcut cu forma unui poem: a rupt-o de tiparul britanic și a construit ceva care sună ca vorbirea.",
        kingTitle: "Moștenirea, și de ce se oprește aici",
        kingBody:
          "Linia merge mai departe: Lincoln la Gettysburg, Douglass la Rochester, și apoi Martin Luther King Jr. pe treptele Lincoln Memorial în 1963 — stând, deliberat, sub cuvintele lui Lincoln și deschizând cu „Five score years ago”, ecoul direct al aritmeticii biblice a lui Lincoln. Nu putem cita aici discursul lui King pe larg: „I Have a Dream” a fost rostit în 1963 și rămâne sub drept de autor, iar moștenirea King îl protejează activ. Textele lui Lincoln, Douglass și Whitman de pe această pagină sunt în domeniul public, motiv pentru care le puteți citi integral.",
        sourceNote: "Imagini: domeniu public, via Wikimedia Commons.",
        backLink: "Toate temele de literatură și filosofie",
      }
    : {
        breadcrumbHome: "Home",
        breadcrumbSection: "Literature & Philosophy",
        pageLabel: "Oratory & Poetry",
        eyebrow: "THE SPOKEN WORD · ORATORY",
        titleLead: "TWO",
        titleAccent: "MINUTES",
        heroDesc:
          "The Gettysburg Address is 272 words. The orator who spoke before Lincoln spoke for two hours, and nobody remembers a single word of it.",
        openingTitle: "American oratory is a written form",
        openingBody:
          "The speeches that lasted were not improvised. They were composed: revised, timed, built sentence by sentence by people who knew exactly what each word was doing. Lincoln wrote his address before leaving for Gettysburg and revised it the night before he gave it. Douglass prepared his 1852 attack for months. What we call American oratory survives because it was literature first.",
        closeTitle: "The address, taken apart",
        closeBody:
          "The text below is the Bliss copy, the only version Lincoln signed and the one carved at the Lincoln Memorial. Click any underlined phrase to see what it is doing.",
        primer:
          "Pick an underlined phrase. Each one is doing something different: dating the nation, moving a metaphor, borrowing a cadence.",
        douglassTitle: "The other tradition",
        douglassBody:
          "Eleven years before Gettysburg, Frederick Douglass was invited to speak on the Fourth of July and asked his audience why they had invited him. The speech is the finest American example of praise turned into indictment: it spends its first third genuinely honouring the Founders, then turns every bit of that respect against the people listening.",
        douglassQuoteGloss:
          "\"What to the Slave is the Fourth of July?\" — Douglass, Rochester, New York, 5 July 1852.",
        whitmanTitle: "And then the line breaks",
        whitmanBody:
          "In 1855 Walt Whitman self-published a book with no author name on the cover, written in lines that did not rhyme and obeyed no English meter. American poetry never went back. What Lincoln did to the cadence of a sentence, Whitman did to the shape of a poem: broke it off the British template and built something that sounds like speech.",
        kingTitle: "The inheritance, and why it stops here",
        kingBody:
          "The line runs forward: Lincoln at Gettysburg, Douglass at Rochester, and then Martin Luther King Jr. on the steps of the Lincoln Memorial in 1963 — standing deliberately beneath Lincoln's words and opening with \"Five score years ago\", a direct echo of Lincoln's biblical arithmetic. We cannot quote King at length here. \"I Have a Dream\" was delivered in 1963, remains under copyright, and the King estate actively enforces it. The Lincoln, Douglass and Whitman texts on this page are public domain, which is exactly why you can read them in full.",
        sourceNote: "Imagery: public domain, via Wikimedia Commons.",
        backLink: "All literature and philosophy topics",
      };

  const gettysburgAsset = LITERATURE_ASSETS.gettysburgManuscript;

  return (
    <main className="min-h-screen bg-black text-white">
      <MacroStyles />
      <LitStyles />

      <MacroHero
        imageSrc={gettysburgAsset.src}
        imageAlt={isRo ? gettysburgAsset.altRo : gettysburgAsset.alt}
        eyebrow={copy.eyebrow}
        titleLead={copy.titleLead}
        titleAccent={copy.titleAccent}
        description={copy.heroDesc}
        stats={[
          { value: "272", label: isRo ? "Cuvinte" : "Words" },
          { value: "2", label: isRo ? "Minute rostite" : "Minutes spoken" },
          { value: "1863", label: isRo ? "Domeniu public" : "Public domain" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: copy.breadcrumbHome, href: "/" },
            { label: copy.breadcrumbSection, href: "/literature-philosophy" },
            { label: copy.pageLabel },
          ]}
          className="py-8"
        />

        {/* Opening argument, lit by scroll */}
        <section className="py-24 md:py-32">
          <h2 className="macro-section-title mb-12">{copy.openingTitle}</h2>
          <ScrollIlluminatedText className="lit-serif lit-measure text-2xl leading-[1.7] md:text-[34px] md:leading-[1.55]">
            {copy.openingBody}
          </ScrollIlluminatedText>
        </section>
      </div>

      {/* The centrepiece: the address over its own manuscript */}
      <ManuscriptParallax asset="gettysburgManuscript" className="py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="macro-section-title mb-6">{copy.closeTitle}</h2>
          <p className="macro-body mb-16 max-w-3xl">{copy.closeBody}</p>
          <AnnotatedPassage
            text={GETTYSBURG}
            annotations={GETTYSBURG_NOTES}
            primer={copy.primer}
            primerRo={copy.primer}
          />
        </div>
      </ManuscriptParallax>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PullQuote
          quote="I celebrate myself, and sing myself, / And what I assume you shall assume."
          attribution="Walt Whitman"
          meta={isRo ? "Leaves of Grass, 1855" : "Leaves of Grass, 1855"}
        />

        <section className="py-20 md:py-28">
          <h2 className="macro-section-title mb-12">{copy.whitmanTitle}</h2>
          <ScrollIlluminatedText className="lit-serif lit-measure text-xl leading-[1.75] md:text-[28px] md:leading-[1.6]">
            {copy.whitmanBody}
          </ScrollIlluminatedText>
        </section>
      </div>

      <ManuscriptParallax asset="douglassPortrait" drift={70} className="py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="macro-section-title mb-12">{copy.douglassTitle}</h2>
          <ScrollIlluminatedText className="lit-serif lit-measure text-xl leading-[1.75] md:text-[28px] md:leading-[1.6]">
            {copy.douglassBody}
          </ScrollIlluminatedText>
          <p className="mt-10 font-body text-sm text-white/40">{copy.douglassQuoteGloss}</p>
        </div>
      </ManuscriptParallax>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PullQuote
          quote="This Fourth of July is yours, not mine. You may rejoice, I must mourn."
          attribution="Frederick Douglass"
          meta={isRo ? "Rochester, 1852" : "Rochester, 1852"}
        />

        {/* The copyright wall, stated rather than worked around */}
        <section className="py-20 md:py-28">
          <h2 className="macro-section-title mb-12">{copy.kingTitle}</h2>
          <p className="macro-body max-w-3xl">{copy.kingBody}</p>
        </section>

        <BookShowcase category="oratory-poetry" />

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
