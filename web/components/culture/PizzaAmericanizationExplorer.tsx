"use client";

// ─── PizzaAmericanizationExplorer ───────────────────────────────────────────
// Interactive 5-chapter dossier exploring how Neapolitan peasant street food
// was transformed by American abundance, technology, youth culture, and global
// franchising into a $153 billion global staple.
// Adapted from research in JJ McCullough's "How pizza became American."
// Written in the site's own editorial voice: zero em dashes, zero AI tropes.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SITE_IMAGES } from "@/lib/site-images";

interface ChapterFact {
  stat: string;
  label: string;
  labelRo: string;
}

interface Chapter {
  key: string;
  number: string;
  title: string;
  titleRo: string;
  era: string;
  tagline: string;
  taglineRo: string;
  image: string;
  imageAlt: string;
  body1: string;
  body1Ro: string;
  body2: string;
  body2Ro: string;
  body3?: string;
  body3Ro?: string;
  facts: ChapterFact[];
  worthKnowing: string;
  worthKnowingRo: string;
}

const CHAPTERS: Chapter[] = [
  {
    key: "ch1-immigrant-upgrade",
    number: "01",
    title: "The Peasant Dish & Immigrant Upgrade",
    titleRo: "Mancarea taranilor si modernizarea prin imigrare",
    era: "1880–1920",
    tagline: "How American abundance rebuilt Neapolitan street food",
    taglineRo: "Cum a reconstruit abundenta americana mancarea de strada din Napoli",
    image: SITE_IMAGES.culture.foodPepperoniPizza,
    imageAlt: "Classic American pepperoni pizza slice",
    body1:
      "The primordial ancestor of pizza was a humble peasant street food from Naples in the early 19th century. It was a flat piece of dough topped with lard, salt, olive oil, or onions, purchased by day laborers because it was cheap, convenient, and calorie-dense. It was not considered a cultural delicacy or an innovative culinary creation. Southern Italy remained economically impoverished, prompting over four million Italian immigrants to travel to the United States between 1880 and 1920.",
    body1Ro:
      "Stramosul primordial al pizzei a fost o mancare modesta de strada a taranilor din Napoli la inceputul secolului XIX. Era o bucata turtita de aluat unsa cu untura, sare, ulei de masline sau ceapa, cumparata de zilieri pentru ca era ieftina, comoda si plina de calorii. Nu era considerata o delicatesa culturala sau o creatie culinara inovatoare. Sudul Italiei a ramas sarac din punct de vedere economic, determinand peste patru milioane de imigranti italieni sa calatoreasca in Statele Unite intre 1880 si 1920.",
    body2:
      "In America, immigrants encountered a level of grocery abundance unthinkable back home: massive blocks of cheese, fresh vegetables, and affordable cuts of beef and pork. Italian-American cooks upgraded their traditional recipes with these newly accessible ingredients, creating dishes that were experimental rather than ancient: spaghetti with meatballs, baked lasagna, and modern American-style pizza loaded with tomato sauce, mozzarella, peppers, and sausage.",
    body2Ro:
      "In America, imigrantii au descoperit o abundenta de alimente de neconceput acasa: blocuri masive de branza, legume proaspete si bucati accesibile de carne de vita si porc. Bucatarii italo-americani si-au imbunatatit retetele traditionale cu aceste ingrediente proaspat accesibile, creand preparate care erau experimentale si nu stravechi: spaghete cu chiftele, lasagna la cuptor si pizza moderna in stil american, plina de sos de rosii, mozzarella, ardei si carnat.",
    body3:
      "America's first dedicated pizzeria, Lombardi's, opened in New York City in 1905. The willingness to experiment soon birthed distinct regional styles: the thin, foldable New York slice and the Chicago deep-dish pie.",
    body3Ro:
      "Prima pizzerie dedicata a Americii, Lombardi's, s-a deschis in New York City in 1905. Disponibilitatea de a experimenta a generat curand stiluri regionale distincte: felia subtire si pliabila din New York si placinta adanca Chicago deep-dish.",
    facts: [
      { stat: "1905", label: "Lombardi's opens in NYC", labelRo: "Se deschide Lombardi's in NYC" },
      { stat: "4M+", label: "Italian immigrants (1880–1920)", labelRo: "Imigranti italieni (1880–1920)" },
    ],
    worthKnowing:
      "Many dishes considered classic Italian around the world, including garlic bread, chicken parmesan, and pepperoni pizza, were actually born in working-class Italian-American neighborhoods in New York, Boston, and Chicago.",
    worthKnowingRo:
      "Multe preparate considerate clasice italiene in intreaga lume, inclusiv painea cu usturoi, puiul parmesan si pizza cu pepperoni, s-au nascut de fapt in cartierele italo-americane din New York, Boston si Chicago.",
  },
  {
    key: "ch2-reverse-export",
    number: "02",
    title: "The Reverse Export & Italian Rediscovery",
    titleRo: "Exportul invers si redescoperirea italiana",
    era: "1945–1970",
    tagline: "When American tourists taught Italy to love pizza",
    taglineRo: "Cand turistii americani au invatat Italia sa iubeasca pizza",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Slices_of_thin-crust_New_York_style_pizza.jpg",
    imageAlt: "New York style pizza slices",
    body1:
      "By the 1940s, magazines like The Atlantic noted that pizza parlors could be found in every Italian enclave across America, from San Francisco's Latin Quarter to Boston's Hanover Street. But in Italy itself, pizza remained a localized regional food largely confined to Naples. The shift occurred after World War II, driven by a massive influx of American tourists and servicemen visiting Italy.",
    body1Ro:
      "Pana in anii 1940, reviste precum The Atlantic notau ca pizzeriile puteau fi gasite in fiecare enclava italiana din America, de la Cartierul Latin din San Francisco pana la Hanover Street din Boston. Dar in Italia insasi, pizza a ramas o mancare regionala localizata, limitata in mare parte la Napoli. Schimbarea a avut loc dupa Al Doilea Razboi Mondial, alimentata de un aflux masiv de turisti si militari americani care vizitau Italia.",
    body2:
      "American visitors expected to find the rich, cheese-laden pizza they loved at home. To satisfy this lucrative tourist market, pizzerias opened across Rome, Florence, and Venice, adopting Americanized preparation styles. Italian food historian Alberto Grande famously noted that in 1970s Italy, pizza was considered as exotic to average Italians as sushi was to Westerners.",
    body2Ro:
      "Vizitatorii americani se asteptau sa gaseasca pizza bogata si plina de branza pe care o iubeau acasa. Pentru a satisface aceasta piata turistica profitabila, s-au deschis pizzerii in Roma, Florenta si Venetia, adoptand stiluri de preparare americanizate. Istoricul alimentar italian Alberto Grande a remarcat ca in Italia anilor 1970, pizza era considerata la fel de exotica pentru italienii obisnuiti cum era sushi-ul pentru occidentali.",
    body3:
      "In 1953, The New York Times reported a striking milestone: there were already more pizzerias operating in the United States than in the entirety of Italy.",
    body3Ro:
      "In 1953, The New York Times raporta un punct de cotitura: existau deja mai multe pizzerii in functiune in Statele Unite decat in intreaga Italie.",
    facts: [
      { stat: "1953", label: "US pizzerias outnumber Italy", labelRo: "Pizzeriile din SUA le depasesc pe cele din Italia" },
      { stat: "Post-1945", label: "US tourism spreads pizza in Italy", labelRo: "Turismul din SUA raspandeste pizza in Italia" },
    ],
    worthKnowing:
      "The spread of pizza across nationwide Italy in the 1960s and 1970s was heavily influenced by American consumer expectations, proving that soft power can re-export a refined cultural tradition back to its country of origin.",
    worthKnowingRo:
      "Raspandirea pizzei in intreaga Italie in anii 1960 si 1970 a fost puternic influentata de asteptarile consumatorilor americani, dovedind ca soft power-ul poate reexporta o traditie culturala rafinata inapoi in tara de origine.",
  },
  {
    key: "ch3-atomic-teen",
    number: "03",
    title: "Atomic Industrialization & Teen Autonomy",
    titleRo: "Industrializarea atomica si autonomia adolescentilor",
    era: "1950–1970",
    tagline: "Flash freezing, suburban kitchens, and teenage hangouts",
    taglineRo: "Congelarea rapida, bucatariile suburbane si locurile de intalnire ale tinerilor",
    image: SITE_IMAGES.culture.foodPepperoniPizza,
    imageAlt: "Atomic age pizza industrialization and frozen pizza",
    body1:
      "The post-war boom revolutionized American food production. New industrial mixing and baking machinery allowed pizza to be produced at massive scale. Advances in flash-freezing technology combined with the widespread adoption of home freezers and ovens allowed frozen pizzas to enter suburban kitchens via newly built mega-supermarkets.",
    body1Ro:
      "Avantul postbelic a revolutionat productia alimentara americana. Noi utilaje industriale de amestecare si coacere au permis ca pizza sa fie produsa la scara masiva. Avansurile in tehnologia de congelare rapida, combinate cu adoptarea pe scara larga a congelatoarelor si cuptoarelor casnice, au permis ca pizza congelata sa intre in bucatariile suburbane prin noile super-marketuri.",
    body2:
      "For a 1950s family, heating a frozen pizza at home represented the convenience and glamor of the Atomic Age. Simultaneously, commercial pizza parlors began replacing traditional soda fountains as the primary hangout for American teenagers. Going out for a slice offered young people an accessible space for social independence before reaching bar age.",
    body2Ro:
      "Pentru o familie din anii 1950, incalzirea unei pizze congelate acasa reprezenta comoditatea si farmecul Erei Atomice. Simultan, pizzeriile comerciale au inceput sa inlocuiasca faimoasele soda fountains ca principal loc de intalnire pentru adolescentii americani. Iesirea la o felie de pizza le oferea tinerilor un spatiu accesibil pentru independenta sociala inainte de a atinge varsta de mers in baruri.",
    facts: [
      { stat: "1950s", label: "Frozen pizza arrives in supermarkets", labelRo: "Pizza congelata ajunge in supermarketuri" },
      { stat: "#1", label: "Teen hangout spot by 1965", labelRo: "Locul #1 de intalnire al tinerilor din 1965" },
    ],
    worthKnowing:
      "By the mid-1960s, American media reported that suburban pizza parlors had officially surpassed ice cream parlors as the primary venue for youth socializing and weekend gatherings.",
    worthKnowingRo:
      "Pana la mijlocul anilor 1960, presa americana raporta ca pizzeriile suburbane depasisera oficial gheretele de inghetata ca principal spatiu pentru socializarea tinerilor si intalnirile din weekend.",
  },
  {
    key: "ch4-chains-turtles",
    number: "04",
    title: "Mega-Chains, Delivery Myths & The Turtle Craze",
    titleRo: "Marea retea de lanturi, mitul livrarii si Febra Testoaselor",
    era: "1970–1995",
    tagline: "Pizza Hut, Domino's, and four ninja turtles in a sewer",
    taglineRo: "Pizza Hut, Domino's si patru testoase ninja dintr-un canal",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Bristol_Farms_Chicago_Deep_Dish_meat_pizza.JPG/1280px-Bristol_Farms_Chicago_Deep_Dish_meat_pizza.JPG",
    imageAlt: "Delivery pizza and chain expansion",
    body1:
      "The late 20th century saw the expansion of national pizza franchises. Pizza Hut (founded in Kansas in 1958) was selling over 100 million pizzas annually by the late 1970s. Domino's (founded in Michigan in 1960) pioneered dedicated home delivery, creating the iconic 30-minute guarantee marketing campaign.",
    body1Ro:
      "Sfarsitul secolului XX a adus extinderea francizelor nationale de pizza. Pizza Hut (fondata in Kansas in 1958) vindea peste 100 de milioane de pizza anual pana la sfarsitul anilor 1970. Domino's (fondata in Michigan in 1960) a fost pionierul livrarii dedicate la domiciliu, creand emblematica campanie de marketing cu garantia de 30 de minute.",
    body2:
      "Contrary to popular myth, Domino's never offered free pizza for late delivery; the original policy provided a small $3 discount voucher. The company officially retired the 30-minute guarantee in 1994 following public concerns over driver safety. Meanwhile, pop culture accelerated pizza's dominance through the Teenage Mutant Ninja Turtles franchise.",
    body2Ro:
      "Contrar mitului popular, Domino's nu a oferit niciodata pizza gratuita pentru livrari intarziate; politica originala oferea un mic cupon de reducere de 3 dolari. Compania a retras oficial garantia de 30 de minute in 1994 in urma ingrijorarilor publice legate de siguranta soferilor. Intre timp, cultura pop a accelerat dominatia pizzei prin franciza Teenage Mutant Ninja Turtles.",
    body3:
      "The original 1984 comic book featured no pizza, but animators added a pizza obsession for the 1988 television series to make the characters relatable to children. The series launched an unprecedented surge in youth demand, with kids requesting pizza for nearly every meal.",
    body3Ro:
      "Banda desenata originala din 1984 nu includea pizza, dar animatorii au adaugat o obsesie pentru pizza in seria TV din 1988 pentru a face caracterele simpatice copiilor. Seria a lansat un val de cerere fara precedent in randul tinerilor, copiii cerand pizza la aproape fiecare masa.",
    facts: [
      { stat: "100M+", label: "Pizzas sold yearly by Pizza Hut (1979)", labelRo: "Pizza vandute anual de Pizza Hut (1979)" },
      { stat: "1988", label: "TMNT TV show sparks pizza mania", labelRo: "Serialul TMNT starneste mania pizza" },
    ],
    worthKnowing:
      "During the peak of Ninja Turtle mania in the late 1980s, pizza-themed board games, arcade cabinets, and tie-in promotions made pizza the single most commercially advertised food in youth television.",
    worthKnowingRo:
      "In timpul varfului maniei Ninja Turtle de la sfarsitul anilor 1980, jocurile de societate cu tema pizza, jocurile arcade si promotiile au facut din pizza cel mai comercializat aliment in televiziunea pentru copii.",
  },
  {
    key: "ch5-postmodern-craft",
    number: "05",
    title: "Post-Modern Absurdity & Craft Revival",
    titleRo: "Absurditatea post-moderna si renasterea artizanala",
    era: "1995–Present",
    tagline: "From stuffed crusts and McPizza to wood-fired authenticity",
    taglineRo: "De la cruste umplute si McPizza la autenticitatea cuptorului cu lemne",
    image: SITE_IMAGES.culture.foodPepperoniPizza,
    imageAlt: "Artisanal craft pizza and modern pizza culture",
    body1:
      "By the late 1990s, corporate pizza entered an era of rapid experimentation: stuffed crusts, hot-dog edges, dessert pizzas, and McDonald's temporary McPizza rollout. Concurrently, a counter-movement emerged in the 2000s focused on craft authenticity, highlighting artisanal wood-fired brick ovens, sourdough crusts, and locally sourced mozzarella.",
    body1Ro:
      "Pana la sfarsitul anilor 1990, pizza corporativa a intrat intr-o era de experimentare rapida: cruste umplute, margini cu crenvursti, pizza desert si lansarea temporara a McPizza de la McDonald's. Concomitent, o contra-miscare a aparut in anii 2000 concentrata pe autenticitatea artizanala, punand in valoare cuptoarele cu lemne, aluatul maia si mozzarella de productie locala.",
    body2:
      "Today, pizza occupies a unique dual position in American life: both a high-end gourmet craft and a celebrated pop-culture icon. Americans consume an estimated 350 slices of pizza every single second, making it a $153 billion global industry anchored in American innovation.",
    body2Ro:
      "Azi, pizza ocupa o pozitie dubla unica in viata americana: atat un mestesug artizanal gourmet de nivel inalt, cat si un simbol celebrat al culturii pop. Americanii consuma aproximativ 350 de felii de pizza in fiecare secunda, facand din aceasta o industrie globala de 153 miliarde de dolari ancorata in inovatia americana.",
    facts: [
      { stat: "350", label: "Slices consumed per second in US", labelRo: "Felii consumate pe secunda in SUA" },
      { stat: "$153B", label: "Global annual pizza market", labelRo: "Piata globala anuala a pizzei" },
    ],
    worthKnowing:
      "Pizza is the most widely shared celebratory meal in American social life, serving as the default menu for youth sports victories, office milestones, moving days, and weekend gatherings.",
    worthKnowingRo:
      "Pizza este cea mai distribuita mancare de celebrare din viata sociala americana, servind ca meniu standard pentru victoriile sportive ale tinerilor, reusitele la birou, zilele de mutare si intalnirile de weekend.",
  },
];

export function PizzaAmericanizationExplorer() {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const [sel, setSel] = useState(0);
  const active = CHAPTERS[sel];

  return (
    <div className="w-full">
      {/* Chapter navigation: 5 numbered cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 sm:gap-4 mb-12">
        {CHAPTERS.map((ch, i) => {
          const on = i === sel;
          return (
            <button
              key={ch.key}
              type="button"
              onClick={() => setSel(i)}
              className="group flex flex-col items-center rounded-xl p-3 text-center transition-all duration-300"
              style={{
                cursor: "pointer",
                backgroundColor: on ? "#fffdf7" : "rgba(255,253,247,0.5)",
                border: `1px solid ${on ? "#E8391B" : "rgba(12,9,7,0.12)"}`,
                boxShadow: on
                  ? "0 14px 35px rgb(12,9,7,0.12)"
                  : "0 2px 8px rgb(12,9,7,0.03)",
                transform: on ? "translateY(-3px)" : "none",
              }}
            >
              <span
                className="font-macro-display text-2xl font-black leading-none"
                style={{ color: on ? "#E8391B" : "#0C0907" }}
              >
                {ch.number}
              </span>
              <span className="font-body text-[9px] font-bold uppercase tracking-wider text-[#0C0907]/45 mt-1">
                {ch.era}
              </span>
              <span
                className="font-body text-[11px] font-bold uppercase tracking-tight mt-2 line-clamp-2 leading-tight"
                style={{ color: on ? "#E8391B" : "#0C0907" }}
              >
                {ro ? ch.titleRo : ch.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Chapter dossier view */}
      <div key={active.key} className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-14 items-start">
        {/* Left column: image, stats, worth knowing */}
        <div className="flex flex-col gap-6">
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-[#0C0907]/10 bg-white shadow-[0_20px_60px_rgb(12,9,7,0.14)]">
            <Image
              src={active.image}
              alt={active.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
              unoptimized={active.image.startsWith("http")}
            />
            <span className="absolute left-4 top-4 rounded-full bg-[#0C0907]/85 px-3 py-1 font-body text-[10px] font-bold uppercase tracking-[0.15em] text-[#E8B923] backdrop-blur">
              {active.era}
            </span>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {active.facts.map((f) => (
              <div key={f.label} className="rounded-xl border border-[#0C0907]/8 bg-white/60 p-4">
                <div className="font-macro-display text-3xl font-black text-[#E8391B] leading-none">
                  {f.stat}
                </div>
                <div className="font-body text-xs text-[#0C0907]/60 mt-1.5 leading-snug">
                  {ro ? f.labelRo : f.label}
                </div>
              </div>
            ))}
          </div>

          {/* Worth knowing aside */}
          <div className="rounded-2xl border border-[#0C0907]/8 bg-white/60 p-5 shadow-[0_4px_20px_rgb(12,9,7,0.03)]">
            <p className="mb-2 font-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#E8391B]">
              {ro ? "DE STIUT" : "WORTH KNOWING"}
            </p>
            <p className="font-editorial text-[15px] leading-relaxed text-[#0C0907]/70">
              {ro ? active.worthKnowingRo : active.worthKnowing}
            </p>
          </div>
        </div>

        {/* Right column: editorial text */}
        <div className="flex flex-col justify-center">
          <p className="font-body text-[10px] font-bold uppercase tracking-[0.35em] text-[#E8391B] mb-2">
            {ro ? active.taglineRo : active.tagline}
          </p>
          <h3 className="font-macro-display text-4xl sm:text-5xl font-black text-[#0C0907] tracking-tight leading-none mb-6">
            {ro ? active.titleRo : active.title}
          </h3>

          <div className="space-y-4 font-editorial text-[17px] leading-[1.75] text-[#0C0907]/75">
            <p>{ro ? active.body1Ro : active.body1}</p>
            <p>{ro ? active.body2Ro : active.body2}</p>
            {active.body3 && <p>{ro ? active.body3Ro : active.body3}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
