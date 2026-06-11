import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Home, ChevronRight } from "lucide-react";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { MacroStyles, MacroHero, CountUp } from "@/components/economy/EconomyAnimations";
import { CultureStyles } from "@/components/culture/CulturePageComponents";
import { SITE_IMAGES } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "American Sports & Soft Power | The American Operating System",
  description: "Explore the global cultural reach of NFL, NBA, MLB, and NCAA sports programs.",
};

export default async function CultureSportsPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const content = {
    pullQuote: isRo
      ? "NFL, NBA, MLB și fotbalul universitar — cultura sportivă americană este un export masiv de soft-power și o instituție unică."
      : "The NFL, NBA, MLB, and college football — American sports culture is a massive soft-power export and a uniquely American institution.",
    body: isRo
      ? "De la cele 100+ milioane de spectatori ai Super Bowl-ului până la impactul global al baschetului, sportul definește ritualul colectiv american. Susținut de ecosistemul unic NCAA, sportul american reprezintă o economie de peste 80 de miliarde de dolari care proiectează o putere soft fără egal."
      : "From the Super Bowl's 100+ million domestic viewers to basketball's global cultural footprint, sports define the American collective ritual. Supported by the unique NCAA athletics pipeline, the US sports economy reaches over $80 billion annually, projecting unmatched global soft power.",
    sportsEconomyTitle: isRo ? "Economia Sportului Profesionist: Dominanță Globală" : "The Professional Sports Economy: Global Dominance",
    sportsEconomyText: isRo
      ? "Statele Unite operează cele mai mari patru ligi profesioniste din lume după venituri: NFL, NBA, MLB și NHL. NFL generează singură peste 20 mld. $ anual, în timp ce NBA este difuzată în 215 țări. Susținut de ecosistemul unic NCAA, sportul american reprezintă o economie de peste 80 de miliarde de dolari care proiectează o putere soft fără egal."
      : "The United States operates four major professional sports leagues — the NFL, NBA, MLB, and NHL — each individually larger by revenue than the top league of most developed nations. The NFL alone generates over $20 billion in revenue, while the NBA broadcasts to 215 countries. Supported by the unique NCAA college athletics pipeline, the US sports economy reaches over $80 billion annually, projecting unmatched global soft power.",
    olympicTitle: isRo ? "Dominația Olimpică: O Țară care Concurează ca un Continent" : "Olympic Dominance: A Country That Competes as a Continent",
    olympicText: isRo
      ? "SUA dețin cele mai multe medalii de aur per total (1.220), cu Uniunea Sovietică pe locul doi (473). Ceea ce face acest lucru și mai remarcabil este contextul competitiv: SUA câștigă aceste medalii fără un aparat sportiv dirijat de stat, fără academii sportive obligatorii. Succesul olimpic american este produsul unei infrastructuri private profunde de atletism universitar, cluburi private, sponsorizări comerciale și ambiție individuală."
      : "The US holds the most gold medals overall with 1,220, with the Soviet Union in second place at 473. What makes this more remarkable is the competitive context: the US earns these medals without a state-directed athletic apparatus, without mandatory sports academies. American Olympic success is the product of a deep private infrastructure of collegiate athletics, private clubs, commercial sponsorships, and individual ambition operating in a free society.",
    parallelQuote: isRo
      ? "Stadioanele americane nu sunt doar locuri de joc — ele sunt temple ale identității naționale, capabile să coaguleze 100.000 de oameni sub același steag în orice weekend."
      : "American stadiums are not merely venues — they are cathedrals of national identity, capable of gathering 100,000 people under the same flag on any given weekend.",
    definingMoments: isRo ? "MOMENTELE DEFINITORII" : "DEFINING MOMENTS",
    backLink: isRo ? "← Înapoi la Film și Narativă" : "← Back to Film & Storytelling",
    nextLink: isRo ? "Divertisment și Media →" : "Entertainment & Media →",
  };

  const pillars = [
    {
      label: isRo ? "FOTBAL AMERICAN" : "GRIDIRON FOOTBALL",
      title: isRo ? "NFL & Spectacolul Super Bowl" : "The NFL & The Super Bowl",
      text: isRo
        ? "O sărbătoare națională de facto în Statele Unite. Super Bowl reunește peste 100 de milioane de telespectatori interni, îmbinând atletismul de elită cu reclame emblematice și show-uri de la pauză de renume mondial."
        : "A de facto national holiday in the United States. The Super Bowl gathers over 100 million domestic viewers, merging elite athleticism with iconic advertising campaigns and world-renowned halftime shows.",
      image: SITE_IMAGES.culture.nflStadium,
      alt: "NFL Stadium Night Game",
    },
    {
      label: isRo ? "BASCHET" : "BASKETBALL",
      title: isRo ? "NBA și Cultura Superstarurilor" : "The NBA & Global Superstar Culture",
      text: isRo
        ? "De la Dream Team din 1992 până la superstarurile de astăzi, baschetul este unul dintre cele mai de succes exporturi culturale ale Americii, influențând moda, muzica și stilul urban pe toate continentele."
        : "From the 1992 Dream Team to modern global superstars, basketball is one of America's most successful cultural exports, shaping global fashion, music, and urban lifestyle trends.",
      image: SITE_IMAGES.culture.cowboysStadium,
      alt: "AT&T Stadium Packed Game",
      reversed: true,
    },
    {
      label: isRo ? "BASEBALL & SPORTURI UNIVERSITARE" : "BASEBALL & COLLEGE TRADITIONS",
      title: isRo ? "MLB ca Pastime & Pasiunea NCAA" : "MLB Pastime & NCAA Fanaticism",
      text: isRo
        ? "Major League Baseball reprezintă nostalgia și istoria Americii. În paralel, fotbalul și baschetul universitar din NCAA mobilizează comunități locale cu stadioane gigantice de peste 100.000 de locuri."
        : "Major League Baseball represents nostalgia and the history of America. In parallel, NCAA college football and basketball mobilize local communities with giant stadiums exceeding 100,000 capacities.",
      image: SITE_IMAGES.culture.baseballPark,
      alt: "PNC Park Baseball Stadium Pittsburgh Skyline",
    },
    {
      label: isRo ? "GOLF ȘI SPAȚIU DE AGREMENT" : "GOLF & LEISURE LAND DENSITY",
      title: isRo ? "42% din Terenurile de Golf ale Lumii" : "42% of Global Golf Supply",
      text: isRo
        ? "Statele Unite găzduiesc 42,4% din toate terenurile de golf din lume — aproape 16.000 față de cele 8.900 din întreaga Europă. Această densitate reprezintă accesul unic al clasei de mijloc la spațiu verde și timp liber, o reflectare a abundenței de teren fără echivalent global."
        : "The United States accounts for 42.4% of the world's golf courses — nearly 16,000 of the 38,000 globally, compared to about 8,900 in all of Europe. This represents a concentration of leisure land density and discretionary free time with no global equivalent.",
      image: SITE_IMAGES.culture.vaultSportsSI2019,
      alt: "Tiger Woods Masters Golf",
      reversed: true,
    },
  ];

  const siCovers = [
    { src: SITE_IMAGES.culture.vaultSportsSI1968, alt: "Vince Lombardi, 1968" },
    { src: SITE_IMAGES.culture.vaultSportsSI1980, alt: isRo ? "Miracolul pe Gheață, 1980" : "Miracle on Ice, 1980" },
    { src: SITE_IMAGES.culture.vaultSportsSI1984, alt: "Michael Jordan, 1984" },
    { src: SITE_IMAGES.culture.vaultSportsSI1991, alt: "Dream Team, 1991" },
    { src: SITE_IMAGES.culture.vaultSportsSI1993, alt: "George Steinbrenner, 1993" },
    { src: SITE_IMAGES.culture.vaultSportsSI1999, alt: "Brandi Chastain, 1999" },
    { src: SITE_IMAGES.culture.vaultSportsSI2016, alt: "Muhammad Ali, 2016" },
    { src: SITE_IMAGES.culture.vaultSportsSI2016Cubs, alt: "Chicago Cubs, 2016" },
    { src: SITE_IMAGES.culture.vaultSportsSI2019, alt: "Tiger Woods, 2019" },
  ];

  return (
    <>
      <MacroStyles />
      <CultureStyles />

      <MacroHero
        videoSrc="/videos/library/Culture/Michael Jordan | Edit.mp4"
        eyebrow={isRo ? "CULTURĂ · SPECTACOL" : "CULTURE · SPECTACLE"}
        titleLead={isRo ? "SPORTUL AMERICAN" : "AMERICAN SPORTS"}
        titleAccent={isRo ? "& TRADIȚIE" : "& TRADITION"}
        description={content.pullQuote}
        stats={[
          { value: "$80B+", label: isRo ? "Industria Sportului" : "Sports Industry" },
          { value: "100M+", label: isRo ? "Spectatori Super Bowl" : "Super Bowl Viewers" },
          { value: "215", label: isRo ? "Difuzări Globale NBA" : "NBA Global Broadcasts" },
        ]}
      />

      {/* Dark thesis */}
      <div className="culture-bg text-[#F5EDD8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-20 pb-24">
          <nav className="flex items-center gap-1.5 font-body text-sm text-white/50 tracking-wide mb-14">
            <Link href="/" className="hover:text-white transition-colors flex items-center"><Home className="h-3.5 w-3.5" /></Link>
            <ChevronRight className="h-3 w-3 opacity-30 shrink-0" />
            <Link href="/culture" className="hover:text-white transition-colors">{isRo ? "Cultură" : "Culture"}</Link>
            <ChevronRight className="h-3 w-3 opacity-30 shrink-0" />
            <span className="text-white font-medium">{isRo ? "Sport" : "Sports"}</span>
          </nav>
          <div className="grid gap-12 lg:grid-cols-3 items-start">
            <div className="lg:col-span-2">
              <blockquote className="font-editorial text-2xl md:text-[2.1rem] italic text-[#F5EDD8]/95 leading-[1.4] mb-8 pl-6 border-l-2 border-[#E8391B]">
                &ldquo;{content.pullQuote}&rdquo;
              </blockquote>
              <p className="font-editorial text-lg text-[#F5EDD8]/70 leading-relaxed">{content.body}</p>
            </div>
            <div className="culture-glass rounded-2xl p-6 border border-white/5 space-y-6 group">
              {[
                { value: "$80B+", label: isRo ? "Industria totală sport SUA" : "Total US Sports Industry" },
                { value: "$20B+", label: isRo ? "Venituri anuale NFL" : "Annual NFL Revenue" },
                { value: "215", label: isRo ? "Țări difuzare NBA" : "Countries Broadcasting NBA" },
              ].map((s, i) => (
                <div key={i} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <div className="font-macro-display text-4xl font-bold text-white group-hover:text-glory-gold transition-colors duration-300">{s.value}</div>
                  <div className="text-xs text-glory-gold uppercase tracking-wider mt-1 font-body">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* gradient transition */}
        <div className="h-16 w-full gradient-dark-to-cream" />

        {/* CREAM: Sports Pillars */}
        <section className="relative culture-cream-bg text-[#0C0907] py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-parchment-texture opacity-30 pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
            <div className="text-center mb-20">
              <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#0C0907]/45 font-bold">
                {isRo ? "PILONII SPORTULUI AMERICAN" : "THE PILLARS OF AMERICAN SPORT"}
              </p>
              <h2 className="culture-text-hero text-[#0C0907] mt-4">{isRo ? "SPORT & IDENTITATE" : "SPORT & IDENTITY"}</h2>
              <div className="w-24 h-px bg-[#0C0907]/15 mx-auto mt-8" />
            </div>
            <div className="space-y-20 md:space-y-28">
              {pillars.map((p, i) => (
                <div
                  key={i}
                  className={`grid gap-10 lg:grid-cols-2 items-center ${p.reversed ? "lg:[&>*:first-child]:order-2" : ""}`}
                >
                  <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl border border-[#0C0907]/10 shadow-[0_20px_50px_rgb(12,9,7,0.12)] group">
                    <Image src={p.image} alt={p.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E8391B] font-body">{p.label}</span>
                    <h3 className="font-editorial text-3xl md:text-4xl font-bold text-[#0C0907] leading-tight mt-3 mb-5">{p.title}</h3>
                    <p className="font-editorial text-base text-[#0C0907]/70 leading-relaxed">{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CREAM: Boxing & College Sports */}
        <section className="relative culture-cream-bg text-[#0C0907] pb-0 overflow-hidden border-t border-[#0C0907]/5">
          <div className="absolute inset-0 bg-parchment-texture opacity-30 pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 pt-24 pb-24">
            <div className="grid gap-20 md:gap-28">

              {/* Boxing */}
              <div className="grid gap-12 md:gap-20 items-center md:grid-cols-[2fr_3fr] md:[&>*:first-child]:order-last">
                <div>
                  <p className="font-body text-[10px] font-bold uppercase tracking-[0.35em] text-[#E8391B] mb-3">
                    {isRo ? "SPORTUL REGALILOR · NEW YORK, 1882–PREZENT" : "THE SPORT OF KINGS · NEW YORK, 1882–PRESENT"}
                  </p>
                  <h3 className="font-macro-display text-5xl md:text-6xl font-black text-[#0C0907] tracking-tight mb-6 leading-none">
                    {isRo ? "Boxul American" : "American Boxing"}
                  </h3>
                  <p className="font-editorial text-lg text-[#0C0907]/70 leading-relaxed">
                    {isRo
                      ? "Muhammad Ali vs. Joe Frazier — Fight of the Century (1971) rămâne cel mai văzut eveniment sportiv din istoria televiziunii la acea dată. Ali a redefinit ce înseamnă un campion: nu doar un atlet, ci un simbol al rezistenței sociale, curajului moral și excelenței perfecte. Tyson, Foreman, Sugar Ray Leonard — America a produs cei mai mari campioni de box din toate timpurile."
                      : "Muhammad Ali vs. Joe Frazier — the Fight of the Century (1971) remains the most watched live TV event in history at that time. Ali redefined what a champion means: not just an athlete, but a symbol of social resistance, moral courage, and perfect excellence. Tyson, Foreman, Sugar Ray Leonard — America has produced the greatest boxing champions of all time."}
                  </p>
                </div>
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-[0_30px_80px_rgb(12,9,7,0.15)]">
                  <Image src={SITE_IMAGES.culture.aliVsFrazier1971} alt="Muhammad Ali vs Joe Frazier Fight of the Century 1971" fill className="object-cover" sizes="(max-width: 768px) 100vw, 55vw" />
                </div>
              </div>

              {/* College Sports */}
              <div className="grid gap-12 md:gap-20 items-center md:grid-cols-[3fr_2fr]">
                <div>
                  <p className="font-body text-[10px] font-bold uppercase tracking-[0.35em] text-[#E8391B] mb-3">
                    {isRo ? "NCAA · MARCH MADNESS · UNIC ÎN LUME" : "NCAA · MARCH MADNESS · UNIQUE IN THE WORLD"}
                  </p>
                  <h3 className="font-macro-display text-5xl md:text-6xl font-black text-[#0C0907] tracking-tight mb-6 leading-none">
                    {isRo ? "Sport Universitar" : "College Sports"}
                  </h3>
                  <p className="font-editorial text-lg text-[#0C0907]/70 leading-relaxed">
                    {isRo
                      ? "March Madness — turneul NCAA de baschet universitar — este un fenomen cultural fără echivalent în afara Statelor Unite: 68 de echipe, 67 de meciuri, 100+ milioane de spectatori. Fotbalul universitar umple stadioane de 100.000+ de locuri în fiecare weekend de toamnă. NCAA generează singur 4 miliarde de dolari anual. Nu există altă țară unde sportul universitar are această scară."
                      : "March Madness — the NCAA college basketball tournament — is a cultural phenomenon unique to the United States: 68 teams, 67 games, 100M+ viewers. College football fills 100,000+ seat stadiums every autumn weekend. NCAA generates $4 billion annually on its own. No other country has college athletics at this scale."}
                  </p>
                </div>
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-[0_30px_80px_rgb(12,9,7,0.15)]">
                  <Image src={SITE_IMAGES.culture.marchMadness} alt="NCAA March Madness Tournament Basketball Court MSG" fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CREAM: Sports Economy */}
        <section className="relative culture-cream-bg text-[#0C0907] pb-28 md:pb-36 overflow-hidden border-t border-[#0C0907]/5">
          <div className="absolute inset-0 bg-parchment-texture opacity-30 pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 pt-24">
            <div className="grid gap-10 lg:grid-cols-2 items-start">
              <div>
                <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#0C0907]/45 font-bold mb-4">
                  {isRo ? "MOTOR ECONOMIC SPORTIV" : "THE SPORTS ENGINE"}
                </p>
                <h3 className="font-editorial text-3xl md:text-4xl font-bold text-[#0C0907] leading-tight mb-6">{content.sportsEconomyTitle}</h3>
                <p className="font-editorial text-base text-[#0C0907]/70 leading-relaxed">{content.sportsEconomyText}</p>
              </div>
              <div>
                <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#0C0907]/45 font-bold mb-4">
                  {isRo ? "DOMINAȚIE OLIMPICĂ" : "OLYMPIC DOMINANCE"}
                </p>
                <h3 className="font-editorial text-3xl md:text-4xl font-bold text-[#0C0907] leading-tight mb-6">{content.olympicTitle}</h3>
                <p className="font-editorial text-base text-[#0C0907]/70 leading-relaxed">{content.olympicText}</p>
              </div>
            </div>
          </div>
        </section>

        {/* gradient transition */}
        <div className="h-16 w-full gradient-cream-to-dark" />

        {/* Dark: stats + vault */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
          {/* Bordered stats strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/5 rounded-3xl overflow-hidden mb-28">
            {[
              { value: "$80B+", label: isRo ? "Industria sportului SUA" : "US Sports Industry", note: isRo ? "Cele 4 ligi + NCAA" : "4 major leagues + NCAA" },
              { value: "$20B+", label: isRo ? "Venituri NFL anuale" : "Annual NFL Revenue", note: isRo ? "Cea mai valoroasă ligă" : "Most valuable league on Earth" },
              { value: "215", label: isRo ? "Țări difuzare NBA" : "Countries Broadcasting NBA", note: isRo ? "Cea mai globală ligă" : "The most globally distributed league" },
              { value: "1,220", label: isRo ? "Medalii olimpice de aur" : "Olympic Gold Medals", note: isRo ? "Recordul absolut mondial" : "The all-time world record" },
            ].map((s, i) => (
              <div key={i} className={`p-8 flex flex-col gap-2 ${i > 0 ? "border-l border-white/5" : ""}`}>
                <span className="font-macro-display text-4xl md:text-5xl font-black text-[#E8B923]">{s.value}</span>
                <span className="text-sm font-body text-white/75 leading-snug">{s.label}</span>
                <span className="text-xs font-body text-white/45">{s.note}</span>
              </div>
            ))}
          </div>

          {/* SI Covers vault */}
          <p className="font-body text-xs uppercase tracking-[0.25em] text-glory-gold text-center mb-12 font-semibold">
            {content.definingMoments}
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-3 mb-24">
            {siCovers.map((cover, i) => (
              <div key={i} className="relative aspect-3/4 overflow-hidden rounded-xl border border-white/5 group hover:border-glory-gold/40 transition-all duration-300">
                <Image src={cover.src} alt={cover.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="11vw" />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                  <span className="text-[9px] font-body text-white leading-tight">{cover.alt}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Parallax quote */}
          <div className="relative rounded-3xl h-80 overflow-hidden flex items-center justify-center mb-20">
            <Image src={SITE_IMAGES.culture.nflStadium} alt="NFL Stadium" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-black/65" />
            <div className="relative z-10 text-center px-6 max-w-3xl">
              <p className="font-editorial italic text-2xl md:text-4xl text-[#F5EDD8] leading-tight mb-4">
                &ldquo;{content.parallelQuote}&rdquo;
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-12 font-body">
            <a href="/culture/film-and-storytelling" className="text-xs uppercase tracking-widest text-[#F5EDD8]/50 hover:text-white transition-colors">{content.backLink}</a>
            <a href="/culture/entertainment" className="text-xs uppercase tracking-widest text-glory-gold hover:text-white transition-colors">{content.nextLink}</a>
          </div>
        </div>

        <div className="culture-bg">
          <AskAmericaCTA
            locale={locale}
            descriptionEn="Ask the AI Oracle about the NFL, NBA, MLB, college football, golf course density, or the total US sports industry."
            descriptionRo="Întreabă Oracolul AI despre NFL, NBA, MLB, baschetul universitar, terenurile de golf sau industria sportivă americană."
          />
        </div>
      </div>
    </>
  );
}
