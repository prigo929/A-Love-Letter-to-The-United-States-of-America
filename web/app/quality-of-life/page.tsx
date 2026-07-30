import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { FloatingTOC } from "@/components/layout/FloatingTOC";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import {
  MacroStyles,
  MacroHero,
  CountUp,
  MacroFact,
  InfrastructureBand,
} from "@/components/economy/EconomyAnimations";
import { SITE_IMAGES } from "@/lib/site-images";
import DeepDiveSection from "@/components/shared/DeepDiveSection";
import { IconicPhotographs } from "@/components/shared/IconicPhotographs";
import { VERTICALS_THEMATIC_DATA } from "@/lib/data/verticals-thematic-data";
import { DEEP_DIVE_THEMES } from "@/lib/deep-dive-themes";
import { PhotoLightboxGrid } from "@/components/shared/PhotoLightboxGrid";
import { BLUR_PLACEHOLDER } from "@/lib/utils";
import { getQualityOfLifePageCopy } from "@/lib/i18n/messages/pages";

export const metadata: Metadata = {
  title: "Quality of Life | Standard of Living & Abundance",
  description:
    "Explore the American standard of living: disposable income, housing size, vehicle ownership, home appliances, private giving, and leading healthcare outcomes.",
};

export default async function QualityOfLifePage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const copy = getQualityOfLifePageCopy(locale);
  const tocItems = copy.tocItems;

  return (
    <>
      <FloatingTOC items={tocItems} />
      <MacroStyles />

      {/* Cinematic Hero: American Suburbs */}
      <MacroHero
        imageSrc="/images/library/Housing/Modern suburban house with garden and American flag, showcasing beautiful architecture in Eagle Mountain, UT.jpg"
        imageAlt="Modern American Suburban Home with American Flag"
        eyebrow={copy.heroTagline}
        titleLead={isRo ? "CEL MAI ÎNALT" : "THE HIGHEST"}
        titleAccent={isRo ? "NIVEL DE TRAI" : "STANDARD OF LIVING"}
        description={copy.heroSubtitle}
        stats={[
          {
            value: "2-3x",
            label: isRo ? "Spațiu Locativ vs Europa" : "Living Space vs Europe",
          },
          {
            value: "#2",
            label: isRo ? "Cel Mai Ieftin Acces la Locuință" : "Most Affordable Housing",
          },
          {
            value: "800",
            label: isRo ? "Vehicule / 1.000 Locuitori" : "Vehicles / 1,000 People",
          },
        ]}
      />

      <div className="bg-[#000000] relative z-10 pb-32 pt-16 font-body text-white">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
          <Breadcrumb items={[{ label: copy.breadcrumb }]} className="mb-8" />
        </div>

        {/* Flagship comparison CTA */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-20">
          <Link
            href="/quality-of-life/america-vs-the-world"
            className="group flex flex-col gap-4 rounded-3xl border border-glory-gold/25 bg-glory-gold/6 p-6 transition-colors hover:border-glory-gold/50 sm:flex-row sm:items-center sm:justify-between md:p-8"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-glory-gold mb-2">
                {copy.comparisonEyebrow}
              </p>
              <h3 className="font-display text-xl font-bold text-white transition-colors group-hover:text-glory-gold md:text-2xl">
                {copy.comparisonTitle}
              </h3>
              <p className="mt-2 text-sm text-white/50 leading-relaxed font-body max-w-2xl">
                {copy.comparisonDesc}
              </p>
            </div>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-glory-gold text-black transition-transform group-hover:translate-x-2">
              <ArrowRight className="h-5 w-5" />
            </div>
          </Link>
        </div>

        {/* Everyday Abundance Stats Section */}
        <section id="stats" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <div className="text-center max-w-5xl mx-auto mb-16">
            <span className="macro-eyebrow mb-4 block">
              {copy.statsTitle}
            </span>
            <h2 className="macro-section-title text-white text-3xl md:text-4xl mb-6">
              {copy.statsSubtitle}
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {copy.stats.map((stat, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 hover:border-[#E8B923]/20 transition-all duration-300 flex flex-col justify-between text-center"
              >
                <div className="flex flex-col items-center">
                  <h3 className="font-macro-display text-sm font-semibold text-white/50 tracking-wider uppercase mb-4">
                    {stat.title}
                  </h3>
                  <div className="text-2xl font-bold text-white tracking-tight mb-3">
                    {stat.value}
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed font-body">
                    {stat.description}
                  </p>
                </div>
                <div className="border-t border-white/10 pt-4 mt-6 flex flex-col items-center gap-1.5 text-xs text-white/30 w-full">
                  <span>{stat.source}</span>
                  {stat.sourceUrl && (
                    <a
                      href={stat.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#E8B923] hover:underline"
                    >
                      {isRo ? "Sursă →" : "Source →"}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Democratized Luxury & Convenience */}
        <section id="luxury" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <div className="mb-12 max-w-3xl mx-auto text-center">
            <span className="macro-eyebrow mb-4 block">
              {copy.luxuryLabel}
            </span>
            <h2 className="macro-section-title text-white text-3xl md:text-4xl mb-6">
              {copy.luxuryTitle}
            </h2>
            <p className="macro-body text-white/65">
              {copy.luxurySubtitle}
            </p>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {copy.luxuryItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 hover:border-[#E8B923]/20 transition-all duration-300 flex flex-col justify-between text-center"
              >
                <div className="flex flex-col items-center">
                  <h3 className="font-macro-display text-lg font-bold text-white leading-tight mb-3">
                    {item.title}
                  </h3>
                  {item.sourceUrl && (
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#E8B923] border border-[#E8B923]/25 px-3 py-1 rounded-full hover:bg-[#E8B923]/5 transition-colors mb-4 inline-block"
                    >
                      {isRo ? "Date →" : "Data →"}
                    </a>
                  )}
                  <p className="text-sm text-white/60 leading-relaxed font-body mb-4">
                    {item.description}
                  </p>
                </div>
                <div className="text-xs text-white/30 font-mono border-t border-white/10 pt-4 mt-auto w-full text-center">
                  Source: {item.source}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Infrastructure Band (Aviation, Storage, Boats, Libraries) */}
        <InfrastructureBand
          imageSrc={SITE_IMAGES.outdoors.torchLake}
          imageAlt="Torch Lake Michigan: boats on the sandbar"
        >
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory">
            {[
              { src: SITE_IMAGES.grocery.safewayProduce, caption: isRo ? "Abundența Alimentară" : "Food Abundance", description: isRo ? "Calorii ieftine și accesibile la orice colț de stradă." : "Low-cost, high-velocity calories accessible on every corner.", aspect: "16/9", alt: isRo ? "Abundența Alimentară" : "Food Abundance" },
              { src: SITE_IMAGES.culture.dinerInside, caption: isRo ? "Cultura Diner-ului" : "Diner Dining", description: isRo ? "Restaurantul informal american, un simbol al clasei de mijloc." : "The informal community hub for middle-class casual dining.", aspect: "16/9", alt: isRo ? "Cultura Diner-ului" : "Diner Dining" },
              { src: SITE_IMAGES.culture.fashionJeansSneakers, caption: isRo ? "Moda Uniformizată" : "Democratic Fashion", description: isRo ? "Blugi albaștri și pantofi sport: uniforma modernă fără clase." : "Levi's blue jeans and sneakers: the global uniform of classless comfort.", aspect: "16/9", alt: isRo ? "Moda Uniformizată" : "Democratic Fashion" },
              { src: "/images/library/Housing/USA Suburb sunset.jpg", caption: isRo ? "Suburbia la Apus" : "Suburban Sunset", description: isRo ? "Case spațioase cu curte, un standard generalizat." : "Spacious multi-bedroom homes with lawns as a baseline norm.", aspect: "16/9", alt: isRo ? "Suburbia la Apus" : "Suburban Sunset" },
              { src: SITE_IMAGES.housing.frontPorch, caption: isRo ? "Pridvorul American" : "The American Porch", description: isRo ? "Veranda din față: un spațiu semi-public emblematic." : "The front porch: a uniquely American semi-public living space.", aspect: "16/9", alt: isRo ? "Pridvorul American" : "The American Porch" },
              { src: SITE_IMAGES.housing.indianaAutumn, caption: isRo ? "Toamna în Suburbie" : "Suburban Autumn", description: isRo ? "Cartiere cu frunze ruginii: un tablou al normalității americane." : "Tree-lined suburban streets as a middle-class baseline.", aspect: "16/9", alt: isRo ? "Toamna în Suburbie" : "Suburban Autumn" },
              { src: SITE_IMAGES.housing.suburbSpring, caption: isRo ? "Primăvara în Suburbie" : "Suburb in Spring", description: isRo ? "Peluze verzi și flori: peisajul standard al casei americane." : "Green lawns and blossoms: the expected standard of home ownership.", aspect: "16/9", alt: isRo ? "Primăvara în Suburbie" : "Suburb in Spring" },
              { src: SITE_IMAGES.housing.floridaSuburb, caption: isRo ? "Suburbia Floridei" : "Florida Suburbs", description: isRo ? "Case solare, piscine și parcuri: viața în Sun Belt." : "Sun Belt living: pools, palms, and year-round outdoor life.", aspect: "16/9", alt: isRo ? "Suburbia Floridei" : "Florida Suburbs" },
            ].map((img, i) => (
              <div
                key={i}
                className="relative shrink-0 w-80 rounded-2xl overflow-hidden group snap-start bg-neutral-900 border border-white/5 p-4"
              >
                <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-3">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="320px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h4 className="text-white font-macro-display font-bold text-sm mb-1">
                  {img.caption}
                </h4>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {img.description}
                </p>
              </div>
            ))}
          </div>
        </InfrastructureBand>

        {/* Outdoors Photo Grid */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32 mt-16">
          <PhotoLightboxGrid
            gridClassName="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
            sizes="(max-width: 768px) 50vw, 25vw"
            photos={[
              { src: SITE_IMAGES.outdoors.fishing, caption: `${isRo ? "Pescuit" : "River Fishing"} · Provo River, Utah`, alt: isRo ? "Pescuit pe râu" : "River Fishing", aspect: "1/1" },
              { src: SITE_IMAGES.outdoors.camping, caption: `${isRo ? "Camping" : "Camping"} · Madera Canyon, Arizona`, alt: "Camping", aspect: "1/1" },
              { src: SITE_IMAGES.outdoors.rvFamily, caption: `${isRo ? "Vacanță cu RV" : "Family RV Life"} · American Southwest`, alt: isRo ? "Vacanță cu RV" : "Family RV Life", aspect: "1/1" },
              { src: SITE_IMAGES.outdoors.sailing, caption: `${isRo ? "Navigație" : "Great Lakes Sailing"} · Chicago to Mackinac`, alt: isRo ? "Navigație" : "Great Lakes Sailing", aspect: "1/1" },
              { src: SITE_IMAGES.outdoors.rvGrandCanyon, caption: `${isRo ? "RV la Grand Canyon" : "Grand Canyon RV"} · Grand Canyon, Arizona`, alt: isRo ? "RV la Grand Canyon" : "Grand Canyon RV", aspect: "1/1" },
              { src: SITE_IMAGES.outdoors.boating, caption: `${isRo ? "Barcă pe lac" : "Lake Boating"} · Michigan`, alt: isRo ? "Barcă pe lac" : "Lake Boating", aspect: "1/1" },
              { src: SITE_IMAGES.outdoors.hunting, caption: `${isRo ? "Vânătoare" : "Hunting"} · Florida`, alt: isRo ? "Vânătoare" : "Hunting", aspect: "1/1" },
              { src: SITE_IMAGES.outdoors.baldEagle, caption: `${isRo ? "Vulturul Chel" : "Bald Eagle"} · ${isRo ? "Simbolul libertății americane" : "Symbol of American freedom"}`, alt: isRo ? "Vulturul Chel" : "Bald Eagle", aspect: "1/1" },
              { src: SITE_IMAGES.outdoors.boatsDocked, caption: `${isRo ? "Port de agrement" : "Marina Life"} · Marquette, Michigan`, alt: isRo ? "Port de agrement" : "Marina Life", aspect: "1/1" },
              { src: SITE_IMAGES.outdoors.rvArizona, caption: `${isRo ? "RV în deșert" : "Desert RV"} · Arizona`, alt: isRo ? "RV în deșert" : "Desert RV", aspect: "1/1" },
              { src: SITE_IMAGES.outdoors.torchLake, caption: `${isRo ? "Torch Lake" : "Torch Lake Sandbar"} · Michigan`, alt: "Torch Lake", aspect: "1/1" },
            ]}
          />
        </section>

        {/* Disposable Income & Giving Section */}
        <section id="comparison" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <div className="rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md p-8 md:p-12">
            <div className="mb-12 max-w-3xl mx-auto text-center">
              <span className="macro-eyebrow mb-4 block">
                {copy.comparisonEyebrow}
              </span>
              <h2 className="macro-section-title text-white text-3xl md:text-4xl mb-6">
                {copy.incomeTitle}
              </h2>
              <p className="macro-body text-white/70 leading-relaxed mb-6">
                {copy.incomeParagraph1}
              </p>
              <p className="macro-body text-white/70 leading-relaxed">
                {copy.incomeParagraph2}
              </p>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              {copy.incomeItems.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 hover:border-[#E8B923]/20 transition-all flex flex-col justify-between text-center"
                >
                  <div className="flex flex-col items-center">
                    <h3 className="font-macro-display text-lg font-bold text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed font-body mb-4">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 text-xs text-white/30 border-t border-white/10 pt-3 mt-auto w-full">
                    <span>{item.source}</span>
                    {item.sourceUrl && (
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#E8B923] hover:underline"
                      >
                        {isRo ? "Verifică Sursă →" : "Verify Source →"}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Healthcare Section */}
        <section id="healthcare" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="macro-eyebrow mb-4 block">
              {isRo ? "CALITATE CONTRA COSTURI" : "QUALITY VS. COST"}
            </span>
            <h2 className="macro-section-title text-white text-3xl md:text-4xl mb-6">
              {copy.healthcareTitle}
            </h2>
            <p className="macro-body text-white/65">{copy.healthcareParagraph}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {copy.healthcareItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 flex flex-col justify-between hover:border-[#E8B923]/20 transition-all duration-300"
              >
                <div>
                  <MacroFact
                    fact={item.title}
                    detail={item.description}
                  />
                </div>
                <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs text-white/30 mt-4">
                  <span>{item.source}</span>
                  {item.sourceUrl && (
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#E8B923] hover:underline"
                    >
                      {isRo ? "Sursă →" : "Source →"}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cities of America */}
        <section id="cities" className="mb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] text-center font-semibold mb-2">
              {copy.citiesLabel}
            </p>
            <p className="text-center text-white/40 text-sm font-body max-w-xl mx-auto">
              {copy.citiesDesc}
            </p>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-4 px-4 sm:px-6 lg:px-8 scrollbar-none" style={{ scrollSnapType: "x mandatory" }}>
            {[
              { src: SITE_IMAGES.cities.aerialPasadena, label: "Pasadena, CA" },
              { src: SITE_IMAGES.cities.seattleDay, label: "Seattle, WA" },
              { src: SITE_IMAGES.cities.chicagoSkyline, label: "Chicago, IL" },
              { src: SITE_IMAGES.cities.nycCentralPark, label: "New York, NY" },
              { src: SITE_IMAGES.cities.austin, label: "Austin, TX" },
              { src: SITE_IMAGES.cities.dallas, label: "Dallas, TX" },
              { src: SITE_IMAGES.cities.seattleNight, label: "Seattle, WA" },
              { src: SITE_IMAGES.cities.nashville, label: "Nashville, TN" },
              { src: SITE_IMAGES.cities.savannah, label: "Savannah, GA" },
              { src: SITE_IMAGES.cities.seattleSpring, label: "Seattle in Spring" },
              { src: SITE_IMAGES.cities.aerialDallas, label: "Dallas: Aerial" },
              { src: SITE_IMAGES.cities.aerialChicago, label: "Chicago: Aerial" },
              { src: SITE_IMAGES.cities.aerialSantaMonica, label: "Santa Monica, CA" },
              { src: SITE_IMAGES.cities.atlanta, label: "Atlanta, GA" },
            ].map((item, i) => (
              <div
                key={i}
                className="relative shrink-0 w-64 h-44 rounded-2xl overflow-hidden group"
                style={{ scrollSnapAlign: "start" }}
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  sizes="256px"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/65 to-transparent" />
                <p className="absolute bottom-3 left-3 text-white text-xs font-mono font-bold uppercase tracking-wider">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* America from Above: featured aerial section */}
        <section className="mb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] text-center font-semibold mb-2">
              {copy.aerialLabel}
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-black text-white text-center mb-4">
              {copy.aerialTitle}
            </h2>
            <p className="text-center text-white/40 text-sm font-body max-w-xl mx-auto">
              {copy.aerialDesc}
            </p>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <PhotoLightboxGrid
              gridClassName="grid grid-cols-1 md:grid-cols-3 gap-4"
              photos={[
                {
                  src: SITE_IMAGES.cities.chicagoTwilight,
                  alt: "Chicago skyline at twilight with Lake Michigan reflecting the city lights",
                  caption: copy.lakeCaption,
                  aspect: "3/2",
                },
                {
                  src: SITE_IMAGES.cities.midtownGolden,
                  alt: "Midtown Manhattan aerial view in golden hour light",
                  caption: copy.manhattanCaption,
                  aspect: "3/2",
                },
                {
                  src: SITE_IMAGES.cities.nycTopDown,
                  alt: "New York City Midtown viewed directly from above showing grid pattern",
                  caption: copy.nycTopDownCaption,
                  aspect: "3/2",
                },
              ]}
            />
          </div>
        </section>

        {/* AI Ask America Oracle Section */}
        <div className="mt-16">
          <AskAmericaCTA
            locale={locale}
            descriptionEn={copy.oracleDescription}
            descriptionRo={copy.oracleDescription}
          />
        </div>
      </div>

      {/* Deep Dive Archive */}
      <IconicPhotographs
        section="quality-of-life"
        intro="The postwar American dream: abundance, suburbia, and everyday life defining mid-century prosperity, captured on film."
      />

      <div id="explore">
        <DeepDiveSection
          locale={locale}
          topics={VERTICALS_THEMATIC_DATA["quality-of-life"] || []}
          theme={DEEP_DIVE_THEMES["quality-of-life"]}
        />
      </div>
    </>
  );
}
