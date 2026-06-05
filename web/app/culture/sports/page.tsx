import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import {
  MacroStyles,
  MacroHero,
  CountUp,
  InfrastructureBand,
} from "@/components/economy/EconomyAnimations";
import { SITE_IMAGES } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "American Sports & Soft Power | The American Operating System",
  description:
    "Explore the global cultural reach of NFL, NBA, MLB, and NCAA sports programs.",
};

export default async function CultureSportsPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const breadcrumbCulture = isRo ? "Cultură" : "Culture";
  const breadcrumbPage = isRo ? "Sport" : "Sports";

  const content = {
    eyebrow: isRo
      ? "EXPORT CULTURAL GLOBAL · SPORT"
      : "GLOBAL CULTURAL EXPORT · SPORTS",
    title: isRo
      ? "SPORTUL AMERICAN ȘI PUTEREA SOFT"
      : "AMERICAN SPORTS & SOFT POWER",
    deck: isRo
      ? "NFL, NBA, MLB și fotbalul universitar — cultura sportivă americană este un export masiv de soft-power și o instituție unică. De la cele 100+ milioane de spectatori ai Super Bowl-ului până la impactul global al baschetului, sportul definește ritualul colectiv american."
      : "The NFL, NBA, MLB, and college football — American sports culture is a massive soft-power export and a uniquely American institution. From the Super Bowl's 100+ million domestic viewers to basketball's global cultural footprint, sports define the American collective ritual.",

    nflLabel: isRo ? "FOTBAL AMERICAN" : "GRIDIRON FOOTBALL",
    nflTitle: isRo ? "NFL & Spectacolul Super Bowl" : "The NFL & The Super Bowl",
    nflText: isRo
      ? "O sărbătoare națională de facto în Statele Unite. Super Bowl reunește peste 100 de milioane de telespectatori interni, îmbinând atletismul de elită cu reclame emblematice și show-uri de la pauză de renume mondial."
      : "A de facto national holiday in the United States. The Super Bowl gathers over 100 million domestic viewers, merging elite athleticism with iconic advertising campaigns and world-renowned halftime shows.",

    nbaLabel: isRo ? "BASCHET" : "BASKETBALL",
    nbaTitle: isRo
      ? "NBA și Cultura Superstarurilor"
      : "The NBA & Global Superstar Culture",
    nbaText: isRo
      ? "De la Dream Team din 1992 până la superstarurile de astăzi, baschetul este unul dintre cele mai de succes exporturi culturale ale Americii, influențând moda, muzica și stilul urban pe toate continentele."
      : "From the 1992 Dream Team to modern global superstars, basketball is one of America's most successful cultural exports, shaping global fashion, music, and urban lifestyle trends.",

    mlbLabel: isRo
      ? "BASEBALL & SPORTURI UNIVERSITARE"
      : "BASEBALL & COLLEGE TRADITIONS",
    mlbTitle: isRo
      ? "MLB ca Istorie și Pasiunea NCAA"
      : "MLB Pastime & NCAA Fanaticism",
    mlbText: isRo
      ? "Major League Baseball reprezintă nostalgia și istoria Americii. În paralel, fotbalul și baschetul universitar din NCAA mobilizează comunități locale cu stadioane gigantice de peste 100.000 de locuri."
      : "Major League Baseball represents nostalgia and the history of America. In parallel, NCAA college football and basketball mobilize local communities with giant stadiums exceeding 100,000 capacities.",

    golfLabel: isRo
      ? "GOLF ȘI SPAȚIU DE AGREMENT"
      : "GOLF & LEISURE LAND DENSITY",
    golfTitle: isRo
      ? "42% din Terenurile de Golf ale Lumii"
      : "42% of Global Golf Supply",
    golfText: isRo
      ? "Statele Unite găzduiesc 42,4% din toate terenurile de golf din lume (aproape 16.000 de terenuri față de cele 8.900 din întreaga Europă). Această densitate reprezintă accesul unic al clasei de mijloc la spațiu verde și timp liber, o reflectare a abundenței de teren și a culturii de recreere fără echivalent global."
      : "The United States accounts for 42.4% of the world's golf courses (nearly 16,000 of the 38,000 courses globally), compared to about 8,900 in all of Europe. This represents a concentration of leisure land density and discretionary free time with no global equivalent.",

    sportsEconomyLabel: isRo ? "MOTOR ECONOMIC SPORTIV" : "THE SPORTS ENGINE",
    sportsEconomyTitle: isRo
      ? "Economia Sportului Profesionist: Cadență Globală"
      : "The Professional Sports Economy: Global Dominance",
    sportsEconomyText: isRo
      ? "Statele Unite operează cele mai mari patru ligi profesioniste din lume după venituri: NFL, NBA, MLB și NHL. NFL generează singură peste 20 mld. $ anual, în timp ce NBA este difuzată în 215 țări. Susținut de ecosistemul unic NCAA, sportul american reprezintă o economie de peste 80 de miliarde de dolari care proiectează o putere soft fără egal."
      : "The United States operates four major professional sports leagues — the NFL, NBA, MLB, and NHL — each individually larger by revenue than the top league of most developed nations. The NFL alone generates over $20 billion in revenue, while the NBA broadcasts to 215 countries. Supported by the unique NCAA college athletics pipeline, the US sports economy reaches over $80 billion annually, projecting unmatched global soft power.",

    parallelLabel: isRo ? "ARENA" : "THE ARENA",
    parallelTitle: isRo ? "Templu Național" : "National Cathedral",
    parallelSubtitle: isRo
      ? "Stadioanele americane nu sunt doar locuri de joc — ele sunt temple ale identității naționale, capabile să coaguleze 100,000 de oameni sub același steag în orice weekend."
      : "American stadiums are not merely venues — they are cathedrals of national identity, capable of gathering 100,000 people under the same flag on any given weekend.",

    backLink: isRo
      ? "← Înapoi la Film și Narativă"
      : "← Back to Film & Storytelling",
    nextLink: isRo ? "Divertisment și Media →" : "Entertainment & Media →",

    oracleDescription: isRo
      ? "Întreabă Oracolul AI despre NFL, NBA, MLB, baschetul universitar, terenurile de golf sau industria sportivă americană."
      : "Ask the AI Oracle about the NFL, NBA, MLB, college football, golf course density, or the total US sports industry.",
  };

  const pillars = [
    {
      label: content.nflLabel,
      title: content.nflTitle,
      text: content.nflText,
      imageSrc: SITE_IMAGES.culture.nflStadium,
      imageAlt: "MetLife Stadium NFL Night Game",
    },
    {
      label: content.nbaLabel,
      title: content.nbaTitle,
      text: content.nbaText,
      imageSrc: SITE_IMAGES.culture.cowboysStadium,
      imageAlt: "AT&T Stadium Packed Dallas Cowboys Game",
      reversed: true,
    },
    {
      label: content.mlbLabel,
      title: content.mlbTitle,
      text: content.mlbText,
      imageSrc: SITE_IMAGES.culture.baseballPark,
      imageAlt: "PNC Park Baseball Stadium Pittsburgh Skyline",
    },
    {
      label: content.golfLabel,
      title: content.golfTitle,
      text: content.golfText,
      imageSrc: SITE_IMAGES.culture.vaultSportsSI2019,
      imageAlt: "Tiger Woods Masters Golf Celebration",
      reversed: true,
    },
  ];

  return (
    <>
      <MacroStyles />

      {/* Cinematic Hero — MetLife Stadium night game */}
      <MacroHero
        imageSrc="/images/library/Culture/Sports/Stadiums/Wide-Angle-Night-View-Of-Giant-American-Flag-On-Field-At-MetLife-Stadium.jpg"
        imageAlt="MetLife Stadium Night Game with Giant American Flag"
        eyebrow={isRo ? "SPORT · SOFT POWER" : "SPORTS · SOFT POWER"}
        titleLead={isRo ? "SPORTUL AMERICAN" : "AMERICAN SPORTS"}
        titleAccent={isRo ? "& PUTEREA SOFT" : "& SOFT POWER"}
        description={content.deck}
        stats={[
          {
            value: "$80B+",
            label: isRo ? "Industria Sportivă SUA" : "Total US Sports Industry",
          },
          {
            value: "100M+",
            label: isRo ? "Spectatori Super Bowl" : "Super Bowl Viewers",
          },
          {
            value: "215",
            label: isRo ? "Țări Difuzare NBA" : "Countries Broadcasting NBA",
          },
        ]}
      />

      <div className="bg-[#030405] relative z-10 pb-32 pt-16 font-body text-white">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
          <Breadcrumb
            items={[
              { label: breadcrumbCulture, href: "/culture" },
              { label: breadcrumbPage },
            ]}
            className="mb-8"
          />
        </div>

        {/* Dynamic Count-Up Stats */}
        <section className="py-24 border-t border-b border-white/5 bg-white/[0.01] mb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] text-center mb-16 font-semibold">
              {isRo ? "CIFRE ÎN SPORT" : "SPORTS BY THE NUMBERS"}
            </p>
            <div className="grid gap-12 sm:grid-cols-3 text-center">
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
                <p className="font-macro-display text-5xl md:text-6xl text-[#E8B923] font-black tracking-tight mb-4">
                  $<CountUp value={80} suffix="B+" />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-3">
                  {isRo ? "Piața Sportivă SUA" : "US Sports Market"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo
                    ? "Cele 4 mari ligi profesioniste plus NCAA generează împreună peste 80 miliarde dolari anual."
                    : "The four major professional leagues plus NCAA athletics together generate over $80 billion annually."}
                </p>
              </div>
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
                <p className="font-macro-display text-5xl md:text-6xl text-[#E8B923] font-black tracking-tight mb-4">
                  <CountUp value={16000} suffix="+" />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-3">
                  {isRo ? "Terenuri de Golf" : "Golf Courses"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo
                    ? "42% din totalul mondial — mai mult decât Europa, Asia și restul lumii combinate."
                    : "42% of global supply — more than Europe, Asia, and the rest of the world combined."}
                </p>
              </div>
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
                <p className="font-macro-display text-5xl md:text-6xl text-[#E8B923] font-black tracking-tight mb-4">
                  $<CountUp value={20} suffix="B+" />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-3">
                  {isRo ? "Venituri NFL" : "NFL Revenue"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo
                    ? "NFL este cea mai valoroasă ligă sportivă din lume per total venituri anuale."
                    : "The NFL is the most valuable sports league in the world by total annual revenue."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sports Pillars Editorial Grid */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-32 mb-32">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className={`grid gap-12 lg:grid-cols-2 items-center ${
                pillar.reversed ? "" : ""
              }`}
            >
              <div
                className={`space-y-6 ${
                  pillar.reversed ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <span className="macro-eyebrow">{pillar.label}</span>
                <h2 className="macro-section-title text-white text-3xl md:text-4xl">
                  {pillar.title}
                </h2>
                <p className="macro-body text-white/70">{pillar.text}</p>
              </div>
              <div
                className={`relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-white/5 bg-black/40 ${
                  pillar.reversed ? "lg:order-1" : "lg:order-2"
                }`}
              >
                {/* Using img for direct path images */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pillar.imageSrc}
                  alt={pillar.imageAlt}
                  className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </div>
          ))}
        </section>

        {/* Parallax Band — Packed NFL Stadium */}
        <InfrastructureBand
          imageSrc="/images/library/Culture/Sports/Stadiums/Panoramic-View-Of-Packed-FedExField-During-Washington-Redskins-NFL-Game.jpg"
          imageAlt="Panoramic View of Packed NFL Stadium"
        >
          <div className="relative z-10 text-center md:text-left">
            <span className="macro-eyebrow mb-2 block">
              {content.parallelLabel}
            </span>
            <h2 className="macro-section-title text-white mb-4">
              {content.parallelTitle}
            </h2>
            <p className="macro-body text-white/70 max-w-3xl leading-relaxed">
              {content.parallelSubtitle}
            </p>
          </div>
        </InfrastructureBand>

        {/* Sports Economy Overview Block */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <div className="rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md p-8 md:p-12">
            <div className="grid gap-8 lg:grid-cols-3 items-start">
              <div className="lg:col-span-2 space-y-6">
                <span className="macro-eyebrow">{content.sportsEconomyLabel}</span>
                <h2 className="macro-section-title text-white text-3xl md:text-4xl">
                  {content.sportsEconomyTitle}
                </h2>
                <p className="macro-body text-white/70">{content.sportsEconomyText}</p>
              </div>

              {/* Stats column */}
              <div className="grid gap-8 border-l border-white/10 pl-8">
                <div>
                  <p className="font-macro-display text-4xl font-bold text-[#E8B923] tracking-tight mb-1">
                    $80B+
                  </p>
                  <p className="font-mono text-xs text-white/50 uppercase tracking-wider">
                    {isRo ? "Industria Sportului din SUA" : "Total US Sports Industry"}
                  </p>
                </div>
                <div>
                  <p className="font-macro-display text-4xl font-bold text-white tracking-tight mb-1">
                    $20B+
                  </p>
                  <p className="font-mono text-xs text-white/50 uppercase tracking-wider">
                    {isRo ? "Venituri Anuale NFL" : "Annual NFL Revenue"}
                  </p>
                </div>
                <div>
                  <p className="font-macro-display text-4xl font-bold text-white tracking-tight mb-1">
                    215
                  </p>
                  <p className="font-mono text-xs text-white/50 uppercase tracking-wider">
                    {isRo ? "Țări Difuzare NBA" : "Countries Broadcasting NBA"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Magazine Vault — Sports SI covers */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] text-center mb-12 font-semibold">
            {isRo ? "MOMENTELE DEFINITORII" : "DEFINING MOMENTS"}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { src: SITE_IMAGES.culture.vaultSportsSI1968, alt: "Lombardi, 1968" },
              { src: SITE_IMAGES.culture.vaultSportsSI1980, alt: "Miracle on Ice, 1980" },
              { src: SITE_IMAGES.culture.vaultSportsSI1984, alt: "Michael Jordan, 1984" },
              { src: SITE_IMAGES.culture.vaultSportsSI1991, alt: "Dream Team, 1991" },
              { src: SITE_IMAGES.culture.vaultSportsSI2016, alt: "Muhammad Ali, 2016" },
            ].map((cover, i) => (
              <div
                key={i}
                className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/5 group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cover.src}
                  alt={cover.alt}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-xs font-mono text-white/80">{cover.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between border-t border-white/10 pt-12">
            <a
              href="/culture/film-and-storytelling"
              className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors font-mono"
            >
              {content.backLink}
            </a>
            <a
              href="/culture/entertainment"
              className="text-xs uppercase tracking-widest text-[#E8B923] hover:text-white transition-colors font-mono"
            >
              {content.nextLink}
            </a>
          </div>
        </div>

        {/* AI Oracle */}
        <div className="mt-32">
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
