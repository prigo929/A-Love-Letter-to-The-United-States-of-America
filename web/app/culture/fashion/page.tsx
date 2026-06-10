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
import { CultureStyles } from "@/components/culture/CulturePageComponents";
import { SITE_IMAGES } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Fashion & Streetwear | The American Operating System",
  description: "Explore how blue jeans, sneakers, and streetwear became the default global uniform of youth culture.",
};

export default async function CultureFashionPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const breadcrumbCulture = isRo ? "Cultură" : "Culture";
  const breadcrumbPage = isRo ? "Modă" : "Fashion";

  const content = {
    eyebrow: isRo ? "UNIFORMA REBELIUNII · MODĂ" : "THE UNIFORM OF REBELLION · FASHION",
    title: isRo ? "BLUGII ALBAȘTRI, SNEAKERȘII ȘI STREETWEAR-UL" : "BLUE JEANS, SNEAKERS & STREETWEAR",
    pullQuote: isRo
      ? "Moda americană nu a început în saloanele elitiste de design; a început ca îmbrăcăminte de lucru și echipament sportiv, devenind o declarație democratică de rebeliune."
      : "American fashion did not begin in elite design salons; it started as rugged workwear and athletic gear, evolving into a democratic statement of rebellion.",
    body1: isRo
      ? "Blugii albaștri, creați inițial de Levi Strauss în secolul al XIX-lea ca pantaloni durabili pentru mineri și fermieri, au devenit în timp uniforma universală a modernității. Adoptați de tineri în anii 1950 ca simbol al rebeliunii și casualității, denimul a șters diferențele de clasă socială și a devenit cel mai exportat stil vestimentar de pe planetă."
      : "Blue jeans, originally patented by Levi Strauss in the 19th century as durable trousers for miners and laborers, evolved over time into the universal uniform of modernity. Adopted by youth in the 1950s as a symbol of rebellion and casual comfort, denim erased social class distinctions and became the most exported garment style on Earth.",
    body2: isRo
      ? "În paralel, pantofii sport (sneakerșii) au evoluat de la terenul de sport la cultură urbană și modă de lux. Branduri precum Nike și Converse au condus această schimbare, transformând funcționalitatea atletică într-un limbaj al identității și al aspirațiilor de zi cu zi."
      : "In parallel, athletic sneakers evolved from the sports field to urban culture and luxury high fashion. Brands like Nike and Converse drove this shift, transforming athletic functionality into a language of personal identity and everyday aspirations.",
    
    section1Title: isRo ? "Denimul ca Declarație" : "Denim as a Statement",
    section1Text: isRo
      ? "De la Hollywood la străzile din Tokyo, blugii reprezintă confortul democratizat. Un produs industrial, ieftin și rezistent, care a cucerit lumea prin simplitatea sa."
      : "From Hollywood stars to the streets of Tokyo, jeans represent democratized comfort. A mass-produced, inexpensive, and rugged garment that captured the world through its sheer utility and simplicity.",

    section2Title: isRo ? "Cultura Sneakerșilor" : "The Sneaker Cult",
    section2Text: isRo
      ? "Air Jordan, Chuck Taylor și sneakerșii moderni au redefinit luxul urban. Pantofii concepuți pentru baschet au devenit moneda de schimb a culturii pop și a streetwear-ului global."
      : "Air Jordans, Chuck Taylors, and modern sneakers redefined urban luxury. Shoes designed for basketball became the primary currency of pop culture and global streetwear fashion.",

    statsTitle: isRo ? "IMPACTUL PE PLANETĂ IN NUMERE" : "THE PLANETARY FOOTPRINT BY THE NUMBERS",
    stat1Label: isRo ? "An Brevetare Blugi" : "First Jeans Patent Year",
    stat2Label: isRo ? "Gros Cota Venituri Jordan" : "Air Jordan Brand Revenues",
    stat3Label: isRo ? "Converse Vândute" : "Chuck Taylor Shoes Sold",

    bandLabel: isRo ? "ESTETICA STRĂZII" : "THE STREET GLOW ESTHETICS",
    bandTitle: isRo ? "Luminile Neon din Cars Land" : "Flo's V8 Neon: The Glow of Americana",
    bandSubtitle: isRo
      ? "Luminile neon de pe marginea drumului american au inspirat o întreagă paletă cromatică a streetwear-ului modern și a subculturilor vestimentare globale."
      : "The roadside neon glow of classic diners and gas stations inspired a vibrant color system used in streetwear lines and fashion design globally.",

    backLink: isRo ? "← Înapoi la Genuri Muzicale" : "← Back to Music Genres",
    nextLink: isRo ? "Limba Engleză →" : "English Language →",
    oracleDescription: isRo
      ? "Întreabă Oracolul AI despre istoria Levi Strauss, originile designului Air Jordan sau expansiunea globală a streetwear-ului."
      : "Ask the AI Oracle about Levi Strauss & Co history, the story behind Air Jordan sneakers, or the rise of streetwear subcultures.",
  };

  return (
    <>
      <MacroStyles />
      <CultureStyles />

      {/* Cinematic Hero Banner */}
      <MacroHero
        imageSrc={SITE_IMAGES.culture.fashionJeansSneakers}
        imageAlt="Blue Jeans and White Sneakers close up"
        eyebrow={content.eyebrow}
        titleLead={isRo ? "UNIFORMA" : "THE DEFAULT"}
        titleAccent={isRo ? "DEMOCRATICĂ" : "UNIFORM"}
        description={content.pullQuote}
        stats={[
          {
            value: "1873",
            label: content.stat1Label,
          },
          {
            value: "$4B+",
            label: content.stat2Label,
          },
          {
            value: "100M+",
            label: content.stat3Label,
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
              {content.statsTitle}
            </p>
            <div className="grid gap-12 sm:grid-cols-3 text-center">
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
                <p className="font-macro-display text-5xl md:text-6xl text-[#E8B923] font-black tracking-tight mb-4">
                  <CountUp value={1873} />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-3">
                  {isRo ? "Invenția Blugilor" : "The Birth of Denim"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo
                    ? "Levi Strauss și Jacob Davis brevetează niturile de cupru pe buzunare, punând bazele designului modern."
                    : "Levi Strauss and Jacob Davis patent copper rivets on pockets, founding the modern trousers layout."}
                </p>
              </div>
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
                <p className="font-macro-display text-5xl md:text-6xl text-[#E8B923] font-black tracking-tight mb-4">
                  $<CountUp value={4} suffix="B+" />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-3">
                  {isRo ? "Venituri Anuale Jordan" : "Air Jordan Revenue"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo
                    ? "Subdivizia Nike generează miliarde în vânzări, transformând încălțămintea sport în monedă pop."
                    : "The Nike sub-brand generates billions in annual sales, cementing sneakers as a culture token."}
                </p>
              </div>
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
                <p className="font-macro-display text-5xl md:text-6xl text-[#E8B923] font-black tracking-tight mb-4">
                  <CountUp value={100} suffix="M+" />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-3">
                  {isRo ? "Converse Vândute" : "Chuck Taylors Sold"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo
                    ? "Cel mai bine vândut model sportiv din istorie, purtat de artiști, rebeli și atleți deopotrivă."
                    : "The most successful canvas athletic shoe in global history, worn by rockers and students alike."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial Essay */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <div className="grid gap-12 lg:grid-cols-3 items-start">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="font-macro-display text-3xl font-bold text-[#E8B923] mb-6">
                {content.title}
              </h2>
              <p className="font-macro-body text-white/80 text-lg md:text-xl leading-relaxed mb-6">
                {content.body1}
              </p>
              <p className="font-macro-body text-white/70 text-base md:text-lg leading-relaxed">
                {content.body2}
              </p>
            </div>

            {/* Design callout */}
            <div className="culture-glass rounded-3xl p-8 border border-white/5 space-y-6 font-sans">
              <h3 className="font-macro-display text-lg font-bold text-glory-gold border-b border-white/10 pb-3 uppercase tracking-wider">
                {isRo ? "Sistemul Casual" : "The Casual Code"}
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-white text-base">{isRo ? "Îmbrăcămintea Utilitară" : "Rugged Roots"}</h4>
                  <p className="text-[#F5EDD8]/60 mt-1 text-xs leading-relaxed">
                    {isRo
                      ? "Fiecare detaliu al blugilor — de la cusăturile duble la buzunarul mic pentru ceas — provine din nevoile de pe teren."
                      : "Every design feature of denim — from double stitching to the watch pocket — maps back to rugged job utility."}
                  </p>
                </div>
                <div className="border-t border-white/5 pt-4">
                  <h4 className="font-bold text-white text-base">{isRo ? "Estetica Streetwear" : "Streetwear Disruption"}</h4>
                  <p className="text-[#F5EDD8]/60 mt-1 text-xs leading-relaxed">
                    {isRo
                      ? "Înlocuirea costumului tradițional cu hanorace, tricouri largi și sneakerși reprezintă deconstrucția democratică a codurilor de clasă."
                      : "Replacing traditional formal wear with hoodies and sneaker culture represents the democratic deconstruction of status codes."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Parallax Band — Flo's V8 */}
        <InfrastructureBand
          imageSrc={SITE_IMAGES.culture.flosV8}
          imageAlt="Flo's V8 Cafe Neon Sign at Dusk"
        >
          <div className="relative z-10 text-center md:text-left">
            <span className="macro-eyebrow mb-2 block">
              {content.bandLabel}
            </span>
            <h2 className="macro-section-title text-white mb-4">
              {content.bandTitle}
            </h2>
            <p className="macro-body text-white/70 max-w-3xl leading-relaxed">
              {content.bandSubtitle}
            </p>
          </div>
        </InfrastructureBand>

        {/* Detailed cards */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-32">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="culture-glass rounded-3xl p-8 border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
              <h3 className="font-macro-display text-2xl font-bold text-white mb-4">
                {content.section1Title}
              </h3>
              <p className="text-sm text-white/75 leading-relaxed font-body">
                {content.section1Text}
              </p>
            </div>
            <div className="culture-glass rounded-3xl p-8 border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
              <h3 className="font-macro-display text-2xl font-bold text-white mb-4">
                {content.section2Title}
              </h3>
              <p className="text-sm text-white/75 leading-relaxed font-body">
                {content.section2Text}
              </p>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between border-t border-white/10 pt-12">
            <a
              href="/culture/music-genres"
              className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors font-mono"
            >
              {content.backLink}
            </a>
            <a
              href="/culture/english-language"
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
            descriptionEn={content.oracleDescription}
            descriptionRo={content.oracleDescription}
          />
        </div>
      </div>
    </>
  );
}
