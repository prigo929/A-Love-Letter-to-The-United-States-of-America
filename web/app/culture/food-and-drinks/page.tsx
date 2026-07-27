import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Home, ChevronRight } from "lucide-react";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { MacroStyles, MacroHero } from "@/components/economy/EconomyAnimations";
import { CultureStyles } from "@/components/culture/CulturePageComponents";
import { FourFoodsExplorer } from "@/components/culture/FourFoodsExplorer";
import { SevenDessertsExplorer } from "@/components/culture/SevenDessertsExplorer";
import { SITE_IMAGES } from "@/lib/site-images";
import { PhotoLightboxGrid } from "@/components/shared/PhotoLightboxGrid";

export const metadata: Metadata = {
  title: "Food & Drinks | The American Operating System",
  description: "Diners, fast food, BBQ, ice cream — explore the democratic palate and iconic foods invented and popularized in America.",
};

export default async function FoodAndDrinksPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const content = {
    pullQuote: isRo
      ? "Sistemul culinar american a industrializat consistența și a democratizat accesul la mâncare la scară planetară."
      : "The American culinary system industrialized consistency and democratized access to food on a planetary scale.",
    body1: isRo
      ? "Diner-ul clasic american reprezintă designul spațial al accesului democratic. Modelul de franciză (McDonald's, Starbucks, Subway) a transformat prepararea mâncării într-un sistem de asamblare de precizie. Pizza americană — NY slice și Chicago deep dish — a reinventat un preparat italian în ceva complet nou. Înghețata, chipsurile de cartofi, brownies-urile, donuts-urile — toate au origini sau popularizări distinctiv americane."
      : "The American diner represents the spatial design of democratic access. The franchise model (McDonald's, Starbucks, Subway) turned food preparation into a precision assembly system. American pizza — NY slice and Chicago deep dish — reinvented an Italian dish into something entirely new. Ice cream, potato chips, brownies, donuts — all have distinctly American origins or popularization.",
    body2: isRo
      ? "BBQ-ul american este de fapt patru tradiții regionale complet diferite: brisket afumat texan, coaste din Memphis, pulled pork carolina și burnt ends din Kansas City. Fiecare cu propriul tip de lemn, propriul sos și propria filozofie despre ce înseamnă carnea perfectă."
      : "American BBQ is actually four completely different regional traditions: Texas smoked brisket, Memphis ribs, Carolina pulled pork, and Kansas City burnt ends. Each with its own wood, its own sauce, and its own philosophy about what perfect meat means.",
    bandSubtitle: isRo
      ? "Cu tejghele cromate, lumini neon și cabine din vinilin, diner-ul este interfața democratică a conversației libere din SUA."
      : "With chrome counters, neon glow, and vinyl booths, the diner is the democratic interface of neighborhood conversation across America.",
    backLink: isRo ? "← Înapoi la Companii și Branduri" : "← Back to Companies & Brands",
    nextLink: isRo ? "Genuri Muzicale →" : "Music Genres →",
  };

  const mainPillars = [
    {
      title: isRo ? "Hamburgerul" : "The Hamburger",
      subtitle: isRo ? "Simbolul Democrației Culinare" : "Symbol of Culinary Democracy",
      image: SITE_IMAGES.culture.burger,
      alt: "Classic American Burger",
      desc: isRo
        ? "De la grătarul din curte la McDonald's, hamburgherul american a redefinit ce înseamnă o masă rapidă, satisfăcătoare și universală. Acum consumat de miliarde de oameni zilnic în toată lumea."
        : "From the backyard grill to McDonald's, the American hamburger redefined what a fast, satisfying, universal meal looks like. Now consumed by billions worldwide daily.",
    },
    {
      title: isRo ? "BBQ Texan" : "Texas BBQ",
      subtitle: isRo ? "Patru Tradiții, O Filozofie" : "Four Traditions, One Philosophy",
      image: SITE_IMAGES.culture.foodBrisket,
      alt: "Texas BBQ brisket",
      desc: isRo
        ? "Brisket afumat 12–18 ore în lemn de stejar, coaste Memphis glasate cu sos dulce-iute, pulled pork Carolina în stil vinegar-based, burnt ends Kansas City — patru religii culinare distincte cu milioane de adepți."
        : "12–18 hour oak-smoked brisket, Memphis ribs glazed with sweet-hot sauce, Carolina vinegar-based pulled pork, Kansas City burnt ends — four distinct culinary religions with millions of devoted followers.",
    },
    {
      title: isRo ? "Înghețata" : "Ice Cream",
      subtitle: isRo ? "Inventată și Industrializată în America" : "Invented & Industrialized in America",
      image: SITE_IMAGES.culture.foodIceCreamTruck,
      alt: "American ice cream truck",
      desc: isRo
        ? "Cornul de înghețată a fost inventat la Expoziția Mondială din St. Louis (1904). Soft serve-ul — inventat de americani. Ben & Jerry's, Häagen-Dazs — branduri americane care domină piața globală de 97 miliarde de dolari."
        : "The ice cream cone was invented at the St. Louis World's Fair (1904). Soft serve — American invention. Ben & Jerry's, Häagen-Dazs — American brands dominating the $97 billion global market.",
    },
    {
      title: isRo ? "Pizza Americană" : "American Pizza",
      subtitle: isRo ? "NY Slice & Chicago Deep Dish" : "NY Slice & Chicago Deep Dish",
      image: SITE_IMAGES.culture.foodPepperoniPizza,
      alt: "Classic American pepperoni pizza",
      desc: isRo
        ? "Imigranții italieni au adus pizza la New York la începutul secolului XX, dar America a reinventat-o complet. NY slice (1905), Chicago deep dish (1943), Pizza Hut (1958, Kansas), Domino's (1960, Michigan) au exportat-o în 100+ țări. Azi pizza este o industrie globală de 153 miliarde de dolari — cu NY slice și Chicago deep dish ca două invenții distinctiv americane."
        : "Italian immigrants brought pizza to New York in the early 1900s, but America reinvented it entirely. The NY slice (1905), Chicago deep dish (1943), Pizza Hut (1958, Kansas), Domino's (1960, Michigan) then exported it worldwide. Today pizza is a $153 billion global industry — the NY slice and Chicago deep dish are distinctly American inventions.",
    },
  ];

  const drinkPillars = [
    {
      title: "Coca-Cola",
      stat: "1886",
      statLabel: isRo ? "An fondare, Atlanta GA" : "Founded, Atlanta GA",
      desc: isRo ? "Inventată de Dr. John Pemberton. Acum disponibilă în peste 200 de țări — cel mai distribuit produs din lume." : "Invented by Dr. John Pemberton. Now available in 200+ countries — the most distributed product on Earth.",
    },
    {
      title: "Speakeasy & Cocktail",
      stat: "1920s",
      statLabel: isRo ? "Era Prohibiției" : "Prohibition Era",
      desc: isRo ? "Barurile clandestine au inventat cocktail-ul modern. Manhattan, Old Fashioned, Martini — toate au origini americane." : "Underground bars invented the modern cocktail. Manhattan, Old Fashioned, Martini — all American in origin.",
    },
    {
      title: isRo ? "Cafea Americană" : "American Coffee",
      stat: "$100B+",
      statLabel: isRo ? "Piața anuală" : "Annual Market",
      desc: isRo ? "Starbucks a transformat cafeaua într-o experiență aspirațională — 35,000 de cafenele pe 6 continente." : "Starbucks transformed coffee into an aspirational experience — 35,000 locations across 6 continents.",
    },
    {
      title: isRo ? "Bourbon & Tennessee Whiskey" : "Bourbon & Tennessee Whiskey",
      stat: "1791",
      statLabel: isRo ? "Prima distilerie bourbon" : "First bourbon distillery",
      desc: isRo ? "Jack Daniel's, Maker's Mark, Buffalo Trace — bourbon whiskey este legal produs doar în SUA (actul din 1964). Piața valorează $12+ miliarde și exportă cultura distinctivă a Sudului american." : "Jack Daniel's, Maker's Mark, Buffalo Trace — bourbon is legally producible only in the USA (1964 act of Congress). The industry tops $12B and exports the distinct culture of the American South worldwide.",
    },
  ];

  // Catalogue grid — all dishes
  const catalogue = [
    { src: SITE_IMAGES.culture.foodPancakes, label: isRo ? "Pancakes" : "Pancakes" },
    { src: SITE_IMAGES.culture.foodHotDogs, label: isRo ? "Hot Dogs" : "Hot Dogs" },
    { src: SITE_IMAGES.culture.foodBuffaloWings, label: isRo ? "Buffalo Wings" : "Buffalo Wings" },
    { src: SITE_IMAGES.culture.foodPhillyCheesesteak, label: isRo ? "Philly Cheesesteak" : "Philly Cheesesteak" },
    { src: SITE_IMAGES.culture.foodBlt, label: "BLT Sandwich" },
    { src: SITE_IMAGES.culture.foodPbj, label: isRo ? "PB&J" : "PB&J" },
    { src: SITE_IMAGES.culture.foodMacCheese, label: isRo ? "Mac & Cheese" : "Mac & Cheese" },
    { src: SITE_IMAGES.culture.foodFriedChicken, label: isRo ? "Fried Chicken" : "Fried Chicken" },
    { src: SITE_IMAGES.culture.foodLobsterRoll, label: isRo ? "Lobster Roll" : "Lobster Roll" },
    { src: SITE_IMAGES.culture.foodOnionRings, label: isRo ? "Onion Rings" : "Onion Rings" },
    { src: SITE_IMAGES.culture.foodDoughnuts, label: isRo ? "Glazed Donuts" : "Glazed Donuts" },
    { src: SITE_IMAGES.culture.foodBiscuitsGravy, label: isRo ? "Biscuits & Gravy" : "Biscuits & Gravy" },
    { src: SITE_IMAGES.culture.foodPumpkinPie, label: isRo ? "Pumpkin Pie" : "Pumpkin Pie" },
    { src: SITE_IMAGES.culture.foodKeyLimePie, label: isRo ? "Key Lime Pie" : "Key Lime Pie" },
    { src: SITE_IMAGES.culture.foodSmores, label: isRo ? "S'mores" : "S'mores" },
    { src: SITE_IMAGES.culture.foodChocolateChipCookies, label: isRo ? "Chocolate Chip Cookies" : "Choc Chip Cookies" },
    { src: SITE_IMAGES.culture.foodBrownies, label: isRo ? "Brownies" : "Brownies" },
    { src: SITE_IMAGES.culture.burgerFries, label: isRo ? "Burger \u0026 Cartofi" : "Burger \u0026 Fries" },
  ];

  return (
    <>
      <MacroStyles />
      <CultureStyles />

      <MacroHero
        imageSrc={SITE_IMAGES.culture.melsDriveIn}
        imageAlt="Vintage Classic Cars parked outside Mel's Drive-In retro diner at night"
        eyebrow={isRo ? "GUSTUL DEMOCRATIZAT · CULINAR" : "THE DEMOCRATIC PALATE · CULINARY"}
        titleLead={isRo ? "MÂNCARE" : "FOOD &"}
        titleAccent={isRo ? "ȘI BĂUTURI" : "DRINKS"}
        description={content.pullQuote}
        stats={[
          { value: "1.9B", label: isRo ? "Porții Coca-Cola / Zi" : "Daily Coca-Cola Servings" },
          { value: "40,000+", label: isRo ? "Restaurante McDonald's" : "McDonald's Locations" },
          { value: "$900B", label: isRo ? "Piața Food Service SUA" : "U.S. Food Service Market" },
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
            <span className="text-white font-medium">{isRo ? "Mâncare și Băuturi" : "Food & Drinks"}</span>
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
                { value: "1.9B", label: isRo ? "Porții Coca-Cola servite zilnic" : "Daily Coca-Cola servings worldwide" },
                { value: "40,000+", label: isRo ? "Restaurante McDonald's globale" : "McDonald's locations worldwide" },
                { value: "$97B", label: isRo ? "Piața globală a înghețatei" : "Global ice cream market" },
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

        {/* CREAM: Main pillars */}
        <section className="relative culture-cream-bg text-[#0C0907] py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-parchment-texture opacity-30 pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
            <div className="text-center mb-20">
              <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#0C0907]/45 font-bold">
                {isRo ? "ICOANE CULINARE" : "CULINARY ICONS"}
              </p>
              <h2 className="culture-text-hero text-[#0C0907] mt-4">{isRo ? "PILONII CULINARI" : "FOOD PILLARS"}</h2>
              <div className="w-24 h-px bg-[#0C0907]/15 mx-auto mt-8" />
            </div>
            <div className="space-y-28">
              {mainPillars.map((pillar, i) => (
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

        {/* CREAM: Four foods that define America (interactive) */}
        <section className="relative culture-cream-bg text-[#0C0907] pb-24 overflow-hidden border-t border-[#0C0907]/5">
          <div className="absolute inset-0 bg-parchment-texture opacity-30 pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 pt-20">
            <div className="text-center mb-16">
              <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#0C0907]/45 font-bold">
                {isRo ? "PATRU POVEȘTI DE ORIGINE" : "FOUR ORIGIN STORIES"}
              </p>
              <h2 className="culture-text-hero text-[#0C0907] mt-4">
                {isRo ? "PATRU ALIMENTE CARE DEFINESC AMERICA" : "FOUR FOODS THAT DEFINE AMERICA"}
              </h2>
              <p className="mx-auto mt-6 max-w-2xl font-editorial text-lg text-[#0C0907]/60">
                {isRo
                  ? "Friptura, laptele, sandvișul, mărul — atât de obișnuite încât abia le mai vedem ca mâncare. Fiecare are o poveste de origine care se dovedește a fi istorie americană pură. Apasă pe oricare."
                  : "Steak, milk, the sandwich, the apple — so ordinary we barely see them as food. Each has an origin story that turns out to be pure American history. Click any of them."}
              </p>
              <div className="w-24 h-px bg-[#0C0907]/15 mx-auto mt-8" />
            </div>
            <FourFoodsExplorer />
          </div>
        </section>

        {/* CREAM: BBQ Map */}
        <section className="relative culture-cream-bg text-[#0C0907] pb-20 overflow-hidden border-t border-[#0C0907]/5">
          <div className="absolute inset-0 bg-parchment-texture opacity-30 pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-8 pt-20">
            <div className="text-center mb-12">
              <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#0C0907]/45 font-bold">
                {isRo ? "PATRU TRADIȚII, O FILOZOFIE" : "FOUR TRADITIONS, ONE PHILOSOPHY"}
              </p>
              <h2 className="culture-text-hero text-[#0C0907] mt-4">{isRo ? "HARTA BBQ" : "THE BBQ MAP"}</h2>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-[0_30px_80px_rgb(12,9,7,0.12)]">
              <Image src={SITE_IMAGES.culture.foodBbqMap} alt="Illustrated Regional US Barbecue Map" width={1200} height={800} className="w-full h-auto" />
            </div>
          </div>
        </section>

        {/* CREAM: Breakfast Culture */}
        <section className="relative culture-cream-bg text-[#0C0907] pb-20 overflow-hidden border-t border-[#0C0907]/5">
          <div className="absolute inset-0 bg-parchment-texture opacity-30 pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 pt-20">
            <div className="grid gap-12 md:gap-20 items-center md:grid-cols-[3fr_2fr]">
              <div>
                <p className="font-body text-[10px] font-bold uppercase tracking-[0.35em] text-[#E8391B] mb-3">
                  {isRo ? "KELLOGG'S · IHOP · WAFFLE HOUSE · TRADIȚIA DIMINEȚII" : "KELLOGG'S · IHOP · WAFFLE HOUSE · THE MORNING RITUAL"}
                </p>
                <h3 className="font-macro-display text-5xl md:text-6xl font-black text-[#0C0907] tracking-tight mb-6 leading-none">
                  {isRo ? "Cultura Micului Dejun" : "Breakfast Culture"}
                </h3>
                <p className="font-editorial text-lg text-[#0C0907]/70 leading-relaxed">
                  {isRo
                    ? "America a inventat micul dejun modern. Kellogg's Corn Flakes (Battle Creek, Michigan, 1906) a redefinit dimineața. IHOP (1958), Waffle House (1955), Denny's (1953) — all-day breakfast ca instituție democratică. Pancakes cu sirop de arțar, waffle belgiene, ouă Benedict, hash browns, bacon crocant: nicio altă națiune nu mănâncă micul dejun cu atâta religiozitate."
                    : "America invented the modern breakfast. Kellogg's Corn Flakes (Battle Creek, Michigan, 1906) redefined the morning. IHOP (1958), Waffle House (1955), Denny's (1953) turned the all-day breakfast into a democratic institution. Maple syrup pancakes, waffles, eggs Benedict, hash browns, crispy bacon — no nation eats breakfast with more religious devotion than America."}
                </p>
              </div>
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-[0_30px_80px_rgb(12,9,7,0.15)]">
                <Image src={SITE_IMAGES.culture.foodPancakes} alt="Classic fluffy American pancakes with maple syrup" fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
              </div>
            </div>
          </div>
        </section>

        {/* CREAM: Full catalogue grid */}
        <section className="relative culture-cream-bg text-[#0C0907] pb-28 overflow-hidden border-t border-[#0C0907]/5">
          <div className="absolute inset-0 bg-parchment-texture opacity-30 pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 pt-20">
            <div className="text-center mb-16">
              <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#0C0907]/45 font-bold">
                {isRo ? "CATALOGUL PREPARATELOR AMERICANE" : "THE AMERICAN DISH CATALOGUE"}
              </p>
              <h2 className="culture-text-hero text-[#0C0907] mt-4">{isRo ? "PREPARATELE ICONICE" : "ICONIC DISHES"}</h2>
              <div className="w-24 h-px bg-[#0C0907]/15 mx-auto mt-8" />
            </div>
            <PhotoLightboxGrid
              gridClassName="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3"
              sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 16vw"
              photos={catalogue.map((item) => ({
                src: item.src,
                alt: item.label,
                caption: item.label,
                aspect: "1/1",
              }))}
            />
          </div>
        </section>

        {/* CREAM: Drinks */}
        <section className="relative culture-cream-bg text-[#0C0907] pb-28 overflow-hidden border-t border-[#0C0907]/5">
          <div className="absolute inset-0 bg-parchment-texture opacity-30 pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 pt-20">
            <div className="text-center mb-16">
              <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#0C0907]/45 font-bold">
                {isRo ? "BĂUTURI EMBLEMATICE" : "ICONIC DRINKS"}
              </p>
              <h2 className="culture-text-hero text-[#0C0907] mt-4">{isRo ? "BĂUTURILE AMERICANE" : "THE DRINKS"}</h2>
              <div className="w-24 h-px bg-[#0C0907]/15 mx-auto mt-8" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {drinkPillars.map((d, i) => (
                <div key={i} className="bg-white/40 backdrop-blur-md rounded-2xl p-8 border border-[#0C0907]/5 shadow-[0_8px_30px_rgb(12,9,7,0.03)] hover:shadow-[0_20px_50px_rgb(12,9,7,0.08)] hover:-translate-y-1.5 transition-all duration-500">
                  <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#E8391B] mb-3">{d.title}</p>
                  <p className="font-macro-display text-4xl font-black text-[#0C0907] tracking-tight mb-1">{d.stat}</p>
                  <p className="font-body text-xs font-bold uppercase tracking-wider text-[#0C0907]/45 mb-5">{d.statLabel}</p>
                  <p className="font-editorial text-sm text-[#0C0907]/70 leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="h-16 w-full gradient-cream-to-dark" />

        {/* Dark: stats + diner parallax */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/5 rounded-3xl overflow-hidden mb-20">
            {[
              { value: "1.9B", label: isRo ? "Porții Coca-Cola / zi" : "Daily Coke servings", note: isRo ? "Distribuit global" : "Globally distributed" },
              { value: "40K+", label: isRo ? "Restaurante McDonald's" : "McDonald's locations", note: isRo ? "Pe 6 continente" : "Across 6 continents" },
              { value: "$900B", label: isRo ? "Piața food service SUA" : "Food service market", note: isRo ? "Economia gastro SUA" : "American gastro economy" },
              { value: "1904", label: isRo ? "An inventare corn înghețată" : "Ice cream cone invented", note: isRo ? "World's Fair, St. Louis" : "World's Fair, St. Louis" },
            ].map((s, i) => (
              <div key={i} className={`p-8 flex flex-col gap-2 ${i > 0 ? "border-l border-white/5" : ""}`}>
                <span className="font-macro-display text-4xl md:text-5xl font-black text-[#E8B923]">{s.value}</span>
                <span className="text-sm font-body text-white/75 leading-snug">{s.label}</span>
                <span className="text-xs font-body text-white/45">{s.note}</span>
              </div>
            ))}
          </div>

          <div className="relative rounded-3xl h-72 overflow-hidden flex items-center justify-center mb-20">
            <Image src={SITE_IMAGES.culture.dinerInside} alt="Inside a classic American diner" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 text-center px-6 max-w-3xl">
              <p className="font-body text-xs font-bold uppercase tracking-[0.3em] text-glory-gold mb-4">
                {isRo ? "DESIGNUL SPAȚIAL AL CONFORTULUI" : "THE SPATIAL DESIGN OF COMFORT"}
              </p>
              <p className="font-editorial italic text-2xl md:text-3xl text-[#F5EDD8] leading-snug">
                &ldquo;{content.bandSubtitle}&rdquo;
              </p>
            </div>
          </div>

          <PhotoLightboxGrid
            gridClassName="grid md:grid-cols-2 gap-6 mb-20"
            sizes="50vw"
            photos={[
              {
                src: SITE_IMAGES.culture.speakeasyDesign,
                alt: "1920s Speakeasy interior design",
                caption: isRo ? "Speakeasy Era · 1920–1933 · Arta Cocktail-ului" : "Speakeasy Era · 1920–1933 · The Art of the Cocktail",
                aspect: "4/3",
              },
              {
                src: SITE_IMAGES.culture.vaultCocaCola1989,
                alt: "Coca-Cola 1989 vintage advertisement",
                caption: isRo ? "Coca-Cola · Creat în 1886, Atlanta" : "Coca-Cola · Created 1886, Atlanta",
                aspect: "4/3",
              },
            ]}
          />

          {/* Vintage Food & Drink Ads */}
          <div className="mb-20">
            <p className="font-body text-[11px] uppercase tracking-[0.3em] text-white/40 font-bold mb-2">{isRo ? "ARHIVA RECLAMELOR VINTAGE" : "VINTAGE AD ARCHIVE"}</p>
            <h2 className="font-macro-display text-3xl md:text-4xl font-black text-white mb-8">{isRo ? "GUSTUL TRECUTULUI" : "THE TASTE OF HISTORY"}</h2>
            <PhotoLightboxGrid
              gridClassName="grid grid-cols-4 md:grid-cols-6 gap-3"
              sizes="16vw"
              photos={[
                { src: SITE_IMAGES.culture.vaultChiquita1968, alt: "Chiquita vintage ad, 1968", caption: "Chiquita · 1968", aspect: "3/4" },
                { src: SITE_IMAGES.culture.vaultMinuteMaid1979, alt: "Minute Maid vintage ad, 1979", caption: "Minute Maid · 1979", aspect: "3/4" },
                { src: SITE_IMAGES.culture.vaultSprite1966, alt: "Sprite vintage ad, 1966", caption: "Sprite · 1966", aspect: "3/4" },
                { src: SITE_IMAGES.culture.vaultMagicChef1950, alt: "Magic Chef vintage ad, 1950", caption: "Magic Chef · 1950", aspect: "3/4" },
                { src: SITE_IMAGES.culture.vaultGourmetProduce, alt: "Gourmet produce vintage ad, 1969", caption: "Gourmet · 1969", aspect: "3/4" },
                { src: SITE_IMAGES.culture.burgerFries, alt: isRo ? "Burger și cartofi prăjiți" : "Burger and fries", caption: isRo ? "Burger & Cartofi Prăjiți" : "Burger & Fries", aspect: "3/4" },
              ]}
            />
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-12 font-body">
            <a href="/culture/companies-brands" className="text-xs uppercase tracking-widest text-[#F5EDD8]/50 hover:text-white transition-colors">{content.backLink}</a>
            <a href="/culture/music-genres" className="text-xs uppercase tracking-widest text-glory-gold hover:text-white transition-colors">{content.nextLink}</a>
          </div>
        </div>

        <div className="culture-bg">
          <AskAmericaCTA
            locale={locale}
            descriptionEn="Ask the AI Oracle about the history of McDonald's, Coca-Cola's origins, American BBQ regional styles, or how ice cream was invented in America."
            descriptionRo="Întreabă Oracolul AI despre istoria McDonald's, originile Coca-Cola, stilurile regionale BBQ sau invenția înghețatei în America."
          />
        </div>
      </div>
    </>
  );
}
