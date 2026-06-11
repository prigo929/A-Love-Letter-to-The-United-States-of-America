import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Home, ChevronRight } from "lucide-react";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { MacroStyles, MacroHero } from "@/components/economy/EconomyAnimations";
import { CultureStyles } from "@/components/culture/CulturePageComponents";
import { SITE_IMAGES } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Fashion & Streetwear | The American Operating System",
  description: "Explore how blue jeans, sneakers, and streetwear became the default global uniform of youth culture.",
};

export default async function CultureFashionPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const content = {
    pullQuote: isRo
      ? "Moda americană nu a început în saloanele elitiste de design — a pornit ca îmbrăcăminte de lucru și echipament sportiv, devenind o declarație democratică de rebeliune."
      : "American fashion did not begin in elite design salons; it started as rugged workwear and athletic gear, evolving into a democratic statement of rebellion.",
    body1: isRo
      ? "Blugii albaștri, creați inițial de Levi Strauss în secolul al XIX-lea ca pantaloni durabili pentru mineri și fermieri, au devenit uniforma universală a modernității. Adoptați de tineri în anii 1950 ca simbol al rebeliunii și casualității, denimul a șters diferențele de clasă socială și a devenit cel mai exportat stil vestimentar de pe planetă."
      : "Blue jeans, originally patented by Levi Strauss in the 19th century as durable trousers for miners and laborers, evolved into the universal uniform of modernity. Adopted by youth in the 1950s as a symbol of rebellion and casual comfort, denim erased social class distinctions and became the most exported garment style on Earth.",
    body2: isRo
      ? "Pantofii sport au evoluat de la terenul de sport la cultura urbană și moda de lux. Branduri precum Nike și Converse au condus această schimbare, transformând funcționalitatea atletică într-un limbaj al identității și al aspirațiilor cotidiene."
      : "Athletic sneakers evolved from the sports field to urban culture and luxury high fashion. Brands like Nike and Converse drove this shift, transforming athletic functionality into a language of personal identity and everyday aspirations.",
    bandSubtitle: isRo
      ? "Luminile neon ale diner-urilor de pe marginea drumului american au inspirat o întreagă paletă cromatică a streetwear-ului modern și a subculturilor vestimentare globale."
      : "The roadside neon glow of classic diners and gas stations inspired a vibrant color system used in streetwear lines and fashion subcultures worldwide.",
    backLink: isRo ? "← Înapoi la Genuri Muzicale" : "← Back to Music Genres",
    nextLink: isRo ? "Limba Engleză →" : "English Language →",
  };

  const fashionPillars = [
    {
      title: isRo ? "Denimul" : "Denim",
      subtitle: isRo ? "Uniforma Universală a Modernității" : "The Universal Uniform of Modernity",
      image: SITE_IMAGES.culture.fashionJeansSneakers,
      alt: "Blue jeans and white sneakers",
      desc: isRo
        ? "De la mineri la rebeli de Hollywood, blugii au redefinit vestimentația democratică. Astăzi sunt purtați de peste 4 miliarde de oameni zilnic."
        : "From miners to Hollywood rebels, blue jeans redefined democratic dressing. Today they are worn by over 4 billion people daily worldwide.",
    },
    {
      title: isRo ? "Sneaker Culture" : "Sneaker Culture",
      subtitle: isRo ? "De la Teren la Runway" : "From Court to Catwalk",
      image: SITE_IMAGES.culture.classicCar,
      alt: "Classic car and neon lights reflecting Americana culture",
      desc: isRo
        ? "Air Jordan, Chuck Taylor All-Star și Adidas Superstar — pantofii sport americani au redefint luxul urban și identitatea culturală a generațiilor întregi."
        : "Air Jordan, Chuck Taylor All-Star, and Adidas Superstar — American athletic shoes redefined urban luxury and the cultural identity of entire generations.",
    },
    {
      title: isRo ? "Streetwear" : "Streetwear",
      subtitle: isRo ? "Rebeliunea Stradală Globalizată" : "Globalized Street Rebellion",
      image: SITE_IMAGES.culture.flosV8,
      alt: "Flo's V8 Cafe neon sign at dusk",
      desc: isRo
        ? "Supreme, Off-White și BAPE au transformat cultura stradală în industrie globală de miliarde. Streetwear-ul a democratizat moda de lux și a distrus barierele sociale ale couture-ului tradițional."
        : "Supreme, Off-White, and BAPE transformed street culture into a billion-dollar global industry. Streetwear democratized luxury fashion and demolished the social barriers of traditional couture.",
    },
    {
      title: isRo ? "Moda Cowboy" : "Western Wear",
      subtitle: isRo ? "De la Ranch la Runway" : "From Ranch to Runway",
      image: SITE_IMAGES.culture.fashionCowboyBoots,
      alt: "Cowboy boots girl sitting on fence on ranch",
      desc: isRo
        ? "Cizmele cowboy, pălăria Stetson, Wrangler-ul cu talie înaltă — îmbrăcămintea de ranch texan a cucerit podiumurile de modă la Coachella, Milan și Tokyo."
        : "Cowboy boots, Stetson hats, high-rise Wranglers — Texas ranch workwear conquered the fashion runways at Coachella, Milan, and Tokyo.",
    },
    {
      title: isRo ? "Preppy & Ivy League" : "Preppy & Ivy League",
      subtitle: isRo ? "Ralph Lauren și Estetica Aspirațională" : "Ralph Lauren & The Aspirational Aesthetic",
      image: SITE_IMAGES.culture.fashionRalphLaurenStore,
      alt: "Ralph Lauren retail store interior with preppy nautical apparel",
      desc: isRo
        ? "Ralph Lauren a transformat estetica Ivy League — polo, blazer navy, pantaloni chino — în cel mai exportat stil american de lux casual. O viziune despre o Americă aspirațională, vândută în toată lumea."
        : "Ralph Lauren transformed the Ivy League aesthetic — polo shirts, navy blazers, chino trousers — into America's most exported casual luxury style. A vision of aspirational America, sold worldwide.",
    },
    {
      title: isRo ? "Athleisure" : "Athleisure",
      subtitle: isRo ? "Hainele de Sală ca Modă de Zi" : "Gym Clothes as Everyday Fashion",
      image: SITE_IMAGES.culture.basketballDunk,
      alt: "Basketball player dunking — the athletic culture that spawned athleisure",
      desc: isRo
        ? "Lululemon (1998), Under Armour (1996), Nike Dri-FIT — America a inventat conceptul de îmbrăcăminte sport purtată drept fashion casual cotidian. Piața globală de athleisure valorează 600+ miliarde de dolari și crește. Post-2010, leggings de yoga, hoodie-uri de sală și sneakers au înlocuit hainele formale în birouri și restaurante pe tot globul."
        : "Lululemon (1998), Under Armour (1996), Nike Dri-FIT — America invented the concept of gym-wear as everyday fashion. The global athleisure market tops $600B and keeps growing. Post-2010, yoga leggings, gym hoodies, and performance sneakers replaced formal wear in offices and restaurants worldwide.",
    },
  ];

  const vaultAds = [
    { src: SITE_IMAGES.culture.vaultConverse1968, alt: "Converse basketball shoes 1968 ad", label: "Converse 1968" },
    { src: SITE_IMAGES.culture.vaultConverseSears1977, alt: "Converse by Sears 1977 ad", label: "Converse × Sears 1977" },
    { src: SITE_IMAGES.culture.vaultJeans70s, alt: "Retro 70s bell-bottom jeans 1973", label: "Denim 1973" },
    { src: SITE_IMAGES.culture.vaultLemonGoLightly, alt: "Vintage 1970s hair ad", label: "Vintage 1970s" },
    { src: SITE_IMAGES.culture.vaultTiffany1967, alt: "Tiffany & Co 1967 archival ad", label: "Tiffany & Co 1967" },
  ];

  return (
    <>
      <MacroStyles />
      <CultureStyles />

      <MacroHero
        imageSrc={SITE_IMAGES.culture.fashionJeansSneakers}
        imageAlt="Blue jeans and white sneakers — the default American uniform"
        eyebrow={isRo ? "UNIFORMA REBELIUNII · MODĂ" : "THE UNIFORM OF REBELLION · FASHION"}
        titleLead={isRo ? "MODĂ &" : "FASHION &"}
        titleAccent={isRo ? "STREETWEAR" : "STREETWEAR"}
        description={content.pullQuote}
        stats={[
          { value: "1853", label: isRo ? "An fondare Levi's" : "Levi's Founded" },
          { value: "$5B+", label: isRo ? "Venituri Air Jordan" : "Air Jordan Revenues" },
          { value: "4B+", label: isRo ? "Purtători de Blugi / Zi" : "Daily Jeans Wearers" },
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
            <span className="text-white font-medium">{isRo ? "Modă" : "Fashion"}</span>
          </nav>
          <div className="grid gap-12 lg:grid-cols-3 items-start">
            <div className="lg:col-span-2">
              <blockquote className="font-editorial text-2xl md:text-[2.1rem] italic text-[#F5EDD8]/95 leading-[1.4] mb-8 pl-6 border-l-2 border-[#E8391B]">
                &ldquo;{content.pullQuote}&rdquo;
              </blockquote>
              <p className="font-editorial text-lg text-[#F5EDD8]/70 leading-relaxed mb-4">{content.body1}</p>
              <p className="font-editorial text-lg text-[#F5EDD8]/70 leading-relaxed">{content.body2}</p>
            </div>
            <div className="culture-glass rounded-2xl p-6 border border-white/5 space-y-6 group">
              {[
                { value: "1853", label: isRo ? "An fondare Levi Strauss & Co." : "Levi Strauss & Co. founded" },
                { value: "$5B+", label: isRo ? "Venituri anuale Air Jordan" : "Annual Air Jordan revenues" },
                { value: "4B+", label: isRo ? "Purtători de blugi zilnic" : "People wearing jeans daily" },
              ].map((s, i) => (
                <div key={i} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <div className="font-macro-display text-4xl font-bold text-white group-hover:text-glory-gold transition-colors duration-300">{s.value}</div>
                  <div className="text-xs text-glory-gold uppercase tracking-wider mt-1 font-body">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-16 w-full gradient-dark-to-cream" />

        {/* CREAM: Fashion pillars */}
        <section className="relative culture-cream-bg text-[#0C0907] py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-parchment-texture opacity-30 pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
            <div className="text-center mb-20">
              <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#0C0907]/45 font-bold">
                {isRo ? "PILONII MODEI" : "FASHION PILLARS"}
              </p>
              <h2 className="culture-text-hero text-[#0C0907] mt-4">{isRo ? "STILUL AMERICAN" : "AMERICAN STYLE"}</h2>
              <div className="w-24 h-px bg-[#0C0907]/15 mx-auto mt-8" />
            </div>
            <div className="space-y-28">
              {fashionPillars.map((pillar, i) => (
                <div key={i} className={`grid gap-12 md:gap-20 items-center ${i % 2 === 0 ? "md:grid-cols-[3fr_2fr]" : "md:grid-cols-[2fr_3fr] md:[&>*:first-child]:order-last"}`}>
                  <div>
                    <p className="font-body text-[10px] font-bold uppercase tracking-[0.35em] text-[#E8391B] mb-3">{pillar.subtitle}</p>
                    <h3 className="font-macro-display text-5xl md:text-6xl font-black text-[#0C0907] tracking-tight mb-6 leading-none">{pillar.title}</h3>
                    <p className="font-editorial text-lg text-[#0C0907]/70 leading-relaxed">{pillar.desc}</p>
                  </div>
                  <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-[0_30px_80px_rgb(12,9,7,0.15)]">
                    <Image src={pillar.image} alt={pillar.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CREAM: Vintage ad vault */}
        <section className="relative culture-cream-bg text-[#0C0907] pb-28 overflow-hidden border-t border-[#0C0907]/5">
          <div className="absolute inset-0 bg-parchment-texture opacity-30 pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 pt-20">
            <div className="text-center mb-16">
              <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#0C0907]/45 font-bold">
                {isRo ? "ARHIVA PUBLICITĂȚII RETRO" : "THE VINTAGE AD ARCHIVE"}
              </p>
              <h2 className="culture-text-hero text-[#0C0907] mt-4">{isRo ? "RECLAME CLASICE" : "CLASSIC ADS"}</h2>
              <div className="w-24 h-px bg-[#0C0907]/15 mx-auto mt-8" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {vaultAds.map((ad, i) => (
                <div key={i} className="group relative aspect-3/4 rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(12,9,7,0.1)] hover:shadow-[0_20px_50px_rgb(12,9,7,0.2)] hover:-translate-y-1 transition-all duration-500">
                  <Image src={ad.src} alt={ad.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 20vw" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-body text-[9px] font-bold text-white leading-tight">{ad.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CREAM: American designers */}
        <section className="relative culture-cream-bg text-[#0C0907] pb-28 overflow-hidden border-t border-[#0C0907]/5">
          <div className="absolute inset-0 bg-parchment-texture opacity-30 pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 pt-20">
            <div className="text-center mb-16">
              <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#0C0907]/45 font-bold">
                {isRo ? "CASELE DE MODĂ AMERICANE" : "AMERICAN DESIGN HOUSES"}
              </p>
              <h2 className="culture-text-hero text-[#0C0907] mt-4">{isRo ? "DESIGNERI AMERICANI" : "AMERICAN DESIGNERS"}</h2>
              <div className="w-24 h-px bg-[#0C0907]/15 mx-auto mt-8" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  name: "Calvin Klein",
                  era: "1968–present",
                  desc: isRo ? "Minimalismul american ca lux. Klein a redefinit lenjeria, parfumul și denimul prin campanii provocatoare care au plasat SUA pe harta haute couture." : "American minimalism as luxury. Klein redefined underwear, fragrance, and denim through provocative campaigns that put the US on the haute couture map.",
                },
                {
                  name: "Donna Karan",
                  era: "DKNY, 1989",
                  desc: isRo ? "7 pièces essentielles pentru femeia modernă — Donna Karan a inventat garderoba de putere și a creat DKNY ca primul brand aspirațional new-yorkez global." : "Seven easy pieces for the modern woman — Donna Karan invented the power wardrobe and created DKNY as the first globally aspirational New York City brand.",
                },
                {
                  name: "Marc Jacobs",
                  era: "1984–present",
                  desc: isRo ? "Directorul creativ care a pus Louis Vuitton pe harta streetwear-ului. Colecția sa grunge (1992) a schimbat ce înseamnă luxul democratic la nivel global." : "The creative director who put Louis Vuitton on the streetwear map. His grunge collection (1992) permanently changed what democratic luxury means worldwide.",
                },
                {
                  name: "Tom Ford",
                  era: "Gucci 1994, own house 2005",
                  desc: isRo ? "Ford a salvat Gucci de la faliment prin reinventarea sexualității ca instrument de branding. Propriul său brand este sinonimul luxului american modern." : "Ford saved Gucci from bankruptcy by reinventing sexuality as a branding tool. His own house is now synonymous with modern American luxury.",
                },
              ].map((d, i) => (
                <div key={i} className="bg-white/40 backdrop-blur-md rounded-2xl p-8 border border-[#0C0907]/5 shadow-[0_8px_30px_rgb(12,9,7,0.03)] hover:shadow-[0_20px_50px_rgb(12,9,7,0.08)] hover:-translate-y-1.5 transition-all duration-500">
                  <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#E8391B] mb-3">{d.name}</p>
                  <p className="font-macro-display text-2xl font-black text-[#0C0907] tracking-tight mb-1">{d.era}</p>
                  <div className="w-8 h-px bg-[#E8391B]/40 my-4" />
                  <p className="font-editorial text-sm text-[#0C0907]/70 leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="h-16 w-full gradient-cream-to-dark" />

        {/* Dark: stats + neon band */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/5 rounded-3xl overflow-hidden mb-20">
            {[
              { value: "1853", label: isRo ? "An fondare Levi's" : "Levi's patent year", note: isRo ? "Îmbrăcămintea eternă" : "The eternal garment" },
              { value: "4B+", label: isRo ? "Purtători de blugi / zi" : "Daily jeans wearers", note: isRo ? "Pe toate continentele" : "Across every continent" },
              { value: "$5B+", label: isRo ? "Venituri Air Jordan" : "Air Jordan revenues", note: isRo ? "Cultura sneaker-ilor" : "The sneaker economy" },
              { value: "$300B+", label: isRo ? "Piața streetwear globală" : "Global streetwear market", note: isRo ? "Democratizată global" : "Democratized globally" },
            ].map((s, i) => (
              <div key={i} className={`p-8 flex flex-col gap-2 ${i > 0 ? "border-l border-white/5" : ""}`}>
                <span className="font-macro-display text-4xl md:text-5xl font-black text-[#E8B923]">{s.value}</span>
                <span className="text-sm font-body text-white/75 leading-snug">{s.label}</span>
                <span className="text-xs font-body text-white/45">{s.note}</span>
              </div>
            ))}
          </div>

          <div className="relative rounded-3xl h-72 overflow-hidden flex items-center justify-center mb-20">
            <Image src={SITE_IMAGES.culture.flosV8} alt="Flo's V8 Cafe neon sign at dusk" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-black/55" />
            <div className="relative z-10 text-center px-6 max-w-3xl">
              <p className="font-body text-xs font-bold uppercase tracking-[0.3em] text-glory-gold mb-4">
                {isRo ? "ESTETICA NEON AMERICANE" : "THE NEON AESTHETIC"}
              </p>
              <p className="font-editorial italic text-2xl md:text-3xl text-[#F5EDD8] leading-snug">
                &ldquo;{content.bandSubtitle}&rdquo;
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-12 font-body">
            <a href="/culture/music-genres" className="text-xs uppercase tracking-widest text-[#F5EDD8]/50 hover:text-white transition-colors">{content.backLink}</a>
            <a href="/culture/english-language" className="text-xs uppercase tracking-widest text-glory-gold hover:text-white transition-colors">{content.nextLink}</a>
          </div>
        </div>

        <div className="culture-bg">
          <AskAmericaCTA
            locale={locale}
            descriptionEn="Ask the AI Oracle about the history of Levi's jeans, Nike's Air Jordan cultural impact, or how streetwear became a global billion-dollar market."
            descriptionRo="Întreabă Oracolul AI despre istoria blugilor Levi's, impactul cultural Air Jordan sau cum streetwear-ul a devenit o piață globală de miliarde."
          />
        </div>
      </div>
    </>
  );
}
