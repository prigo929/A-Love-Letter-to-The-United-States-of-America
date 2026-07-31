"use client";

// ─── HighSchoolTropes ────────────────────────────────────────────────────────
// American high school is the country's most-exported cultural setting, and it
// runs on a fixed roster of clichés. This is a "trope deck": each card opens the
// real history behind a stock figure of the Hollywood high school, from the
// football jock to the cheerleader, the SAT, the glee club, the tiger mom, and
// the frog dissection.
//
// Adapted from a video essay's research (JJ, "The history of the clichés of high
// school culture," built around the card game Epic Spell Wars): its trope roster
// and facts guided coverage; every line here is rewritten in the site's own
// voice, not transcribed. Cream/parchment editorial surface (dark text on cream).

import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface Trope {
  key: string;
  icon: string;
  name: string;
  nameRo: string;
  tag: string;
  tagRo: string;
  story: string;
  storyRo: string;
  fact: string;
  factLabel: string;
  factLabelRo: string;
}

const TROPES: Trope[] = [
  {
    key: "jock",
    icon: "🏈",
    name: "The Football Jock",
    nameRo: "Sportivul de fotbal",
    tag: "The school's own invention",
    tagRo: "Invenția proprie a școlii",
    story:
      "The muscle-bound jock reads like an outside force invading the school, but high school football grew straight out of the institution itself. American football is a modified British rugby that late-19th-century colleges invented to settle, in gentlemanly contests, whose school was better, a question that consumed the narrow elite who then attended university. Early high schools consciously modeled themselves on those colleges and copied the tradition, so they built teams to play their rivals almost immediately. The oldest high school football rivalry, New London against Norwich Free Academy in Connecticut, dates to 1875, the same year Harvard first played Yale. Today nearly 70% of American high schools field a team, and over a million teenagers play in any given year.",
    storyRo:
      "Sportivul musculos pare o forță din exterior care invadează școala, dar fotbalul de liceu a crescut direct din instituția însăși. Fotbalul american este un rugby britanic modificat pe care colegiile de la sfârșitul secolului XIX l-au inventat pentru a stabili, în întreceri gentlemanești, a cui școală e mai bună, o întrebare care obseda elita îngustă care mergea atunci la facultate. Primele licee s-au modelat conștient după acele colegii și au copiat tradiția, așa că și-au făcut echipe aproape imediat. Cea mai veche rivalitate de fotbal liceal, New London contra Norwich Free Academy din Connecticut, datează din 1875, același an în care Harvard a jucat prima dată cu Yale. Azi aproape 70% dintre liceele americane au o echipă, iar peste un milion de adolescenți joacă în fiecare an.",
    fact: "1875",
    factLabel: "Oldest high-school rivalry",
    factLabelRo: "Cea mai veche rivalitate liceală",
  },
  {
    key: "cheerleader",
    icon: "📣",
    name: "The Cheerleader",
    nameRo: "Majoreta",
    tag: "Invented by one man in 1948",
    tagRo: "Inventată de un om în 1948",
    story:
      "The cheerleader now reads as a paragon of American femininity, but cheerleading was, for a long time, not considered feminine at all. Riling up a crowd before a game was originally the work of charismatic male students doing acrobatics and comedy, partly because girls dancing was seen as scandalously erotic and not something a school wanted to stage in front of uptight parents. Female dance numbers crept in during the 1930s and 40s, but nearly every trope we now attach to cheerleading traces to one man: Lawrence Herkimer, a former male cheerleader who founded the National Cheerleaders Association in 1948. His camps supplied the pleated skirts, the pom-poms, and the jumps, at the exact moment girls were taking up the activity. The New York Times mourned him as simply \"Mr. Cheerleader.\"",
    storyRo:
      "Majoreta pare azi un simbol al feminității americane, dar mult timp cheerleading-ul nu a fost considerat deloc feminin. Însuflețirea publicului înaintea unui meci era la origine treaba unor studenți băieți carismatici care făceau acrobații și comedie, parțial fiindcă dansul fetelor era văzut ca scandalos de erotic. Numerele de dans feminine au apărut în anii 1930 și 40, dar aproape fiecare clișeu pe care îl asociem azi cu cheerleading-ul provine de la un singur om: Lawrence Herkimer, un fost cheerleader care a fondat National Cheerleaders Association în 1948. Taberele lui au furnizat fustele plisate, pompoanele și săriturile, exact când fetele preluau activitatea. New York Times l-a plâns pur și simplu ca „Domnul Cheerleader”.",
    fact: "1948",
    factLabel: "The NCA, and every cliché",
    factLabelRo: "NCA și fiecare clișeu",
  },
  {
    key: "sat",
    icon: "✏️",
    name: "The SAT",
    nameRo: "Testul SAT",
    tag: "A 1926 aptitude relic",
    tagRo: "O relicvă de aptitudine din 1926",
    story:
      "The bubble-sheet SAT is a relic of a time when testing people for general aptitude was more in fashion than it is now. Introduced in 1926 and run by a nonprofit, the College Board, rather than by schools or the government, it grades general reading, writing and math skill. Most Western countries just have secondary students pass one cumulative knowledge exam that universities read for admission. The US is unusual in weighing your average grade across every high school course plus a separate aptitude test, a controversial system that has also helped keep American universities among the most elite in the world. If you are a foreigner who finds the whole apparatus baffling, that is rather the point: you have already been screened out.",
    storyRo:
      "Testul SAT cu grile este o relicvă a unei epoci în care testarea aptitudinii generale era mai la modă decât acum. Introdus în 1926 și administrat de o organizație non-profit, College Board, nu de școli sau guvern, evaluează abilitățile generale de citit, scris și matematică. Majoritatea țărilor occidentale pun elevii să treacă un singur examen cumulativ de cunoștințe pe care universitățile îl citesc la admitere. SUA este neobișnuită prin faptul că cântărește media notelor din toate cursurile de liceu plus un test separat de aptitudine, un sistem controversat care a ajutat totuși universitățile americane să rămână printre cele mai elitiste din lume. Dacă ești străin și ți se pare derutant tot aparatul, cam ăsta e rostul: ai fost deja filtrat.",
    fact: "1926",
    factLabel: "The College Board's exam",
    factLabelRo: "Examenul College Board",
  },
  {
    key: "gleeclub",
    icon: "🎶",
    name: "The Glee Club",
    nameRo: "Corul „glee”",
    tag: "An 18th-century word revived by TV",
    tagRo: "Un cuvânt din secolul XVIII reînviat de TV",
    story:
      "The odd name gives away how old the glee club is. A \"glee\" was an 18th-century British term for a kind of unaccompanied part-song sung by a small group of men, something close to what we would now call a cappella. Keeping a glee club on hand to sing the school songs was part of Ivy League university culture in Victorian America, and because early high schools copied colleges, glee clubs became a high school thing too. As the music fell out of fashion the surviving clubs reinvented themselves into ordinary mixed-gender choirs, which is what the show Glee was actually about, though its popularity may have nudged some choirs to start calling themselves glee clubs again.",
    storyRo:
      "Numele ciudat trădează cât de vechi e corul „glee”. Un „glee” era un termen britanic din secolul XVIII pentru un fel de cântec pe voci, fără acompaniament, interpretat de un grup mic de bărbați, ceva apropiat de ceea ce am numi azi a cappella. Un cor „glee” care să cânte imnurile școlii făcea parte din cultura universităților Ivy League în America victoriană, iar fiindcă primele licee copiau colegiile, corurile „glee” au devenit și un lucru de liceu. Când muzica a ieșit din modă, cele care au supraviețuit s-au reinventat în coruri obișnuite mixte, despre care era de fapt serialul Glee, deși popularitatea lui poate a împins unele coruri să se numească din nou „glee”.",
    fact: "18th c.",
    factLabel: "A British part-song",
    factLabelRo: "Un cântec pe voci britanic",
  },
  {
    key: "tigermom",
    icon: "🐯",
    name: "The Tiger Mom",
    nameRo: "Mama-tigru",
    tag: "A 2011 bestseller archetype",
    tagRo: "Un arhetip dintr-un bestseller din 2011",
    story:
      "The tiger mom, mauling her kid over a failing grade, was popularized by a single 2011 book: Battle Hymn of the Tiger Mother by the Yale professor Amy Chua, who argued that strict parenting is the only proven way to get results, however impolitic that is to say. The term was first meant to evoke a strict Asian-American parent set against a more permissive white one, but it has grown less racialized as it spread, to the point that the stock cartoon version of the mauled kid is not even drawn as Asian anymore. It is one of the newer entries in the high school canon, a reminder that the roster keeps taking on fresh clichés.",
    storyRo:
      "Mama-tigru, care își sfâșie copilul pentru o notă mică, a fost popularizată de o singură carte din 2011: Battle Hymn of the Tiger Mother a profesoarei de la Yale Amy Chua, care susținea că parentingul strict este singura cale dovedită de a obține rezultate, oricât de incorect politic ar fi să spui asta. Termenul a fost menit inițial să evoce un părinte asiatic-american strict în contrast cu unul alb mai permisiv, dar a devenit mai puțin rasializat pe măsură ce s-a răspândit. Este una dintre intrările mai noi în canonul liceului, o dovadă că lista continuă să adopte clișee proaspete.",
    fact: "2011",
    factLabel: "Amy Chua's book",
    factLabelRo: "Cartea lui Amy Chua",
  },
  {
    key: "adderall",
    icon: "💊",
    name: "Adderall & the Counselor",
    nameRo: "Adderall și consilierul",
    tag: "The pill-pushing archetype",
    tagRo: "Arhetipul care împinge pastile",
    story:
      "The frazzled counselor pushing pills points at a real and touchy subject. Adderall, a mass-market prescription amphetamine introduced in 1996 (its first three letters are not a coincidence), became hugely popular among American students for its reputation of helping kids with attention problems focus. Treating behavior with amphetamines is far more common in the US and Canada than elsewhere, which is officially explained by different rates of attention problems, but that has always drawn skepticism: whether the real issue is administrators too quick to diagnose and parents too quick to medicate. Studies have also linked amphetamines like Adderall to a slightly higher risk of psychosis than other ADHD drugs.",
    storyRo:
      "Consilierul agitat care împinge pastile arată spre un subiect real și delicat. Adderall, o amfetamină cu prescripție de larg consum introdusă în 1996 (primele trei litere nu sunt o coincidență), a devenit extrem de popular printre elevii americani pentru reputația de a-i ajuta pe copiii cu probleme de atenție să se concentreze. Tratarea comportamentului cu amfetamine e mult mai frecventă în SUA și Canada decât altundeva, ceea ce se explică oficial prin rate diferite ale problemelor de atenție, dar asta a stârnit mereu scepticism: dacă nu cumva problema reală sunt administratorii prea grăbiți să diagnosticheze și părinții prea grăbiți să mediceze. Studiile au legat și amfetaminele precum Adderall de un risc ușor mai mare de psihoză.",
    fact: "1996",
    factLabel: "Adderall hits the market",
    factLabelRo: "Adderall ajunge pe piață",
  },
  {
    key: "cafeteria",
    icon: "🍕",
    name: "Cafeteria Food",
    nameRo: "Mâncarea din cantină",
    tag: "Sloppy joes & rectangular pizza",
    tagRo: "Sloppy joes și pizza dreptunghiulară",
    story:
      "American high schools have had cafeterias since the early 20th century, are required to by federal law, and have been micromanaged for basic nutrition for close to a century, with students outraged at the results for just as long. The sloppy joe, a mushy ground-beef sandwich in tomato sauce, went mainstream after the war, and lunchroom managers quietly love it because the mess hides the vegetables that meet government nutrition quotas. Rectangular pizza traces to a 1988 government cafeteria cookbook; kids call it cardboard and then spend adulthood chasing the taste. Pizza pockets arrived in the 1980s through two simultaneous origin stories, a Pillsbury line and a Nestlé one.",
    storyRo:
      "Liceele americane au cantine de la începutul secolului XX, sunt obligate prin lege federală și au fost micromanageriate pentru nutriție de aproape un secol, cu elevii revoltați de rezultate de tot atâta timp. Sloppy joe, un sandviș cu carne tocată moale în sos de roșii, s-a răspândit după război, iar administratorii cantinelor îl adoră discret fiindcă mizeria ascunde legumele care îndeplinesc cotele guvernamentale de nutriție. Pizza dreptunghiulară provine dintr-o carte de bucate guvernamentală pentru cantine din 1988; copiii îi spun carton, apoi îi caută gustul toată maturitatea. Buzunarele de pizza au apărut în anii 1980 prin două povești de origine simultane, o linie Pillsbury și una Nestlé.",
    fact: "1988",
    factLabel: "Rectangular pizza's cookbook",
    factLabelRo: "Cartea pizzei dreptunghiulare",
  },
  {
    key: "yearbook",
    icon: "📖",
    name: "The Yearbook",
    nameRo: "Anuarul",
    tag: "An elite tradition, trickled down",
    tagRo: "O tradiție elitistă, coborâtă",
    story:
      "The yearbook is another 19th-century college tradition that trickled down. Back when only a small elite attended university, wealthy students commissioned bookmakers to produce special volumes of photos of themselves and their friends, commemorating a rarefied shared experience. As photo printing and bookbinding got cheap through the 20th century, even the crummiest high school could mass-produce hundreds of yearbooks, one free copy per student. There is a quiet commentary in the fact that a college yearbook now seems absurd: so many people attend that you can barely fit a single graduating department's names onto the commencement program.",
    storyRo:
      "Anuarul este o altă tradiție universitară din secolul XIX care s-a scurs în jos. Pe vremea când doar o mică elită mergea la facultate, studenții bogați comandau tipografilor volume speciale cu fotografii ale lor și ale prietenilor, comemorând o experiență comună rarefiată. Pe măsură ce tipărirea foto și legarea cărților au devenit ieftine în secolul XX, chiar și cel mai amărât liceu putea produce sute de anuare, câte un exemplar gratuit de elev. E un comentariu discret în faptul că un anuar de facultate pare azi absurd: merg atât de mulți încât abia încapi numele unui singur departament de absolvenți pe programul de absolvire.",
    fact: "19th c.",
    factLabel: "A college original",
    factLabelRo: "Un original universitar",
  },
  {
    key: "frog",
    icon: "🐸",
    name: "Frog Dissection",
    nameRo: "Disecția broaștei",
    tag: "Real since the 1920s",
    tagRo: "Reală din anii 1920",
    story:
      "Dissecting a frog in biology class is such a narrowly specific American cliché that foreigners could be forgiven for thinking Hollywood invented it, but it has been real since at least the 1920s and continues across the US and Canada today. It is even big business: a single distributor sells a bucket of a hundred dissection-ready frogs for under 500 dollars. Frogs got the job mostly because they are a fairly complex organism available in huge numbers across the continent. It has turned polarizing in recent years, with PETA campaigning against it, many schools now offering an opt-out, and digital frog dissections available for the squeamish.",
    storyRo:
      "Disecția unei broaște la ora de biologie este un clișeu american atât de specific încât străinii ar putea fi iertați că-l cred inventat de Hollywood, dar e real de cel puțin din anii 1920 și continuă azi în SUA și Canada. E chiar o afacere mare: un singur distribuitor vinde o găleată de o sută de broaște gata de disecție cu sub 500 de dolari. Broaștele au primit rolul mai ales fiindcă sunt un organism destul de complex disponibil în număr uriaș pe continent. A devenit polarizant în ultimii ani, cu PETA făcând campanie împotrivă, multe școli oferind acum o variantă de renunțare, și disecții digitale de broască disponibile pentru cei mai sensibili.",
    fact: "1920s",
    factLabel: "Dissection goes mainstream",
    factLabelRo: "Disecția devine obișnuită",
  },
];

export function HighSchoolTropes() {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const [sel, setSel] = useState(0);
  const active = TROPES[sel];

  return (
    <div>
      {/* The trope deck */}
      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-3 md:grid-cols-9 md:gap-3">
        {TROPES.map((t, i) => {
          const on = i === sel;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setSel(i)}
              aria-current={on}
              className="group flex flex-col items-center gap-1.5 rounded-xl border-2 px-2 py-3 text-center transition-all duration-300"
              style={{
                cursor: "pointer",
                borderColor: on ? "#E8391B" : "rgba(12,9,7,0.12)",
                backgroundColor: on ? "rgba(232,57,27,0.06)" : "transparent",
                transform: on ? "translateY(-3px)" : "none",
              }}
            >
              <span className="text-2xl leading-none sm:text-3xl" style={{ filter: on ? "none" : "grayscale(0.4)" }}>
                {t.icon}
              </span>
              <span
                className="font-body text-[10px] font-bold uppercase leading-tight tracking-wide"
                style={{ color: on ? "#E8391B" : "rgba(12,9,7,0.5)" }}
              >
                {ro ? t.nameRo : t.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active trope */}
      <div key={active.key} className="mt-10 rounded-3xl border border-[#0C0907]/10 bg-white/50 p-7 md:p-10">
        <div className="flex items-center gap-4">
          <span className="text-4xl leading-none md:text-5xl">{active.icon}</span>
          <div>
            <p className="font-body text-[10px] font-bold uppercase tracking-[0.35em] text-[#E8391B]">
              {ro ? active.tagRo : active.tag}
            </p>
            <h3 className="font-macro-display text-3xl font-black leading-none tracking-tight text-[#0C0907] md:text-4xl">
              {ro ? active.nameRo : active.name}
            </h3>
          </div>
        </div>
        <p className="mt-6 max-w-3xl font-editorial text-[17px] leading-relaxed text-[#0C0907]/75">
          {ro ? active.storyRo : active.story}
        </p>
        <div className="mt-7 flex items-baseline gap-4 border-t border-[#0C0907]/10 pt-6">
          <span className="font-macro-display text-4xl font-black leading-none text-[#E8391B] md:text-5xl">{active.fact}</span>
          <span className="font-body text-sm text-[#0C0907]/55">{ro ? active.factLabelRo : active.factLabel}</span>
        </div>
      </div>
    </div>
  );
}
