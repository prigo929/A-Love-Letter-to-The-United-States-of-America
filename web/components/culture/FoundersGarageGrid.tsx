"use client";

// ─── FoundersGarageGrid ──────────────────────────────────────────────────────
// "The Founders' Garage & Small-Town Roots": Highlighting how multi-trillion-dollar
// global corporations started in suburban garages, tiny sheds, and small 5&10 stores.
// Written in editorial voice: zero em dashes, zero AI tropes.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SITE_IMAGES } from "@/lib/site-images";

interface GarageItem {
  id: string;
  name: string;
  logoFile: string;
  logoInvert?: boolean;
  image: string;
  year: string;
  location: string;
  locationRo: string;
  address: string;
  startingCapital: string;
  startingCapitalRo: string;
  currentValuation: string;
  currentValuationRo: string;
  growthMultiplier: string;
  tagline: string;
  taglineRo: string;
  story: string;
  storyRo: string;
  legacy: string;
  legacyRo: string;
}

const FOUNDER_GARAGES: GarageItem[] = [
  {
    id: "apple-garage",
    name: "Apple",
    logoFile: "/ASSETS/Companies/Apple_Logo white.svg",
    logoInvert: false,
    image: SITE_IMAGES.culture.garageApple,
    year: "1976",
    location: "Los Altos, California",
    locationRo: "Los Altos, California",
    address: "2066 Crist Drive, Los Altos, CA 94024",
    startingCapital: "$1,350 (Sold Wozniak's calculator & Jobs' VW bus)",
    startingCapitalRo: "1.350$ (Calculatorul lui Wozniak și microbuzul VW al lui Jobs)",
    currentValuation: "$3.4 Trillion Market Cap",
    currentValuationRo: "Capitalizare de piață de 3,4 Trilioane $",
    growthMultiplier: "2.5 Billion-Fold Growth",
    tagline: "The 1976 garage where Steve Jobs and Steve Wozniak hand-soldered the Apple I",
    taglineRo: "Garajul din 1976 unde Steve Jobs și Steve Wozniak au lipit manual placa Apple I",
    story:
      "Working out of Steve Jobs' parents' suburban single-car garage in Los Altos, Jobs and Steve Wozniak hand-soldered fifty Apple I motherboard circuits for Paul Terrell's Byte Shop. The house and garage are now designated as an official California historic site.",
    storyRo:
      "Lucrând în garajul părinților lui Steve Jobs din Los Altos, Jobs și Steve Wozniak au asamblat manual cincizeci de plăci de bază Apple I pentru magazinul Byte Shop. Casa și garajul sunt acum sit istoric oficial în California.",
    legacy:
      "Established the global garage incubator archetype, proving a duo with vision could challenge giant computing mainframes.",
    legacyRo:
      "A consacrat arhetipul garajului ca incubator tehnologic, demonstrând că două persoane cu o viziune pot sfida giganții informatici.",
  },
  {
    id: "amazon-garage",
    name: "Amazon",
    logoFile: "/ASSETS/Companies/Amazon_Logo_0.svg",
    logoInvert: false,
    image: SITE_IMAGES.culture.garageAmazon,
    year: "1994",
    location: "Bellevue, Washington",
    locationRo: "Bellevue, Washington",
    address: "10704 NE 28th Street, Bellevue, WA 98004",
    startingCapital: "$10,000 Personal Savings",
    startingCapitalRo: "10.000$ Economii Personale",
    currentValuation: "$2.0 Trillion Market Cap",
    currentValuationRo: "Capitalizare de piață de 2,0 Trilioane $",
    growthMultiplier: "200 Million-Fold Growth",
    tagline: "The rented Bellevue garage where Jeff Bezos packed the first online book orders",
    taglineRo: "Garajul închiriat din Bellevue unde Jeff Bezos a împachetat primele comenzi de cărți",
    story:
      "Jeff Bezos moved to Bellevue, Washington in 1994 and rented a home with a garage converted into an office powered by extension cords. Amazon held meetings at a nearby Barnes & Noble before scaling into the cloud and e-commerce backbone of global retail.",
    storyRo:
      "Jeff Bezos s-a mutat în Bellevue în 1994 și a închiriat o casă cu garaj transformat în birou alimentat prin prelungitoare. Amazon a ținut primele ședințe la o librărie din apropiere înainte de a deveni gigantul de azi.",
    legacy:
      "Pioneered customer-obsessed long-term reinvestment, expanding from an online bookstore to AWS cloud infrastructure.",
    legacyRo:
      "A fost pionierul reinvestirii pe termen lung obsesiv orientate către client, extinzându-se de la librărie online la cloud-ul AWS.",
  },
  {
    id: "hp-garage",
    name: "Hewlett-Packard (HP)",
    logoFile: "/ASSETS/Companies/hp.svg",
    logoInvert: true,
    image: SITE_IMAGES.culture.garageHp,
    year: "1939",
    location: "Palo Alto, California",
    locationRo: "Palo Alto, California",
    address: "367 Addison Avenue, Palo Alto, CA 94301",
    startingCapital: "$538 Capital & Sears Drill Press",
    startingCapitalRo: "538$ Capital și o mașină de găurit Sears",
    currentValuation: "Birthplace of Silicon Valley (CA Landmark #976)",
    currentValuationRo: "Locul de naștere al Silicon Valley (Sit Istoric #976)",
    growthMultiplier: "Foundational Tech Origin",
    tagline: "The 12x18 ft wooden garage widely designated as the Birthplace of Silicon Valley",
    taglineRo: "Garajul de lemn de 12x18 ft desemnat ca Locul de Naștere al Silicon Valley",
    story:
      "Stanford graduates Bill Hewlett and Dave Packard invested $538 in a 12x18 foot garage behind their Palo Alto apartment. Their first commercial product, the HP 200A audio oscillator, was purchased by Walt Disney Studios for the sound design of Fantasia.",
    storyRo:
      "Absolvenții de la Stanford Bill Hewlett și Dave Packard au investit 538$ într-un garaj de 12x18 picioare. Primul lor produs comercial, oscilatorul audio HP 200A, a fost cumpărat de studiourile Walt Disney pentru sunetul filmului Fantasia.",
    legacy:
      "Created the founding corporate culture of Silicon Valley, blending technical rigor with egalitarian workplace trust.",
    legacyRo:
      "A creat cultura corporativă fondatoare din Silicon Valley, îmbinând rigoarea tehnică cu încrederea la locul de muncă.",
  },
  {
    id: "google-garage",
    name: "Google",
    logoFile: "/ASSETS/Companies/Google_Logo_0.svg",
    logoInvert: false,
    image: SITE_IMAGES.culture.garageGoogle,
    year: "1998",
    location: "Menlo Park, California",
    locationRo: "Menlo Park, California",
    address: "232 S Santa Margarita Ave, Menlo Park, CA 94025",
    startingCapital: "$1,700 / Month Rent & $100K Angel Check",
    startingCapitalRo: "1.700$ / Lună Chirie și cec de 100K$",
    currentValuation: "$2.1 Trillion Market Cap",
    currentValuationRo: "Capitalizare de piață de 2,1 Trilioane $",
    growthMultiplier: "21 Million-Fold Growth",
    tagline: "Susan Wojcicki's Menlo Park garage where Larry Page and Sergey Brin incorporated Google",
    taglineRo: "Garajul Susanei Wojcicki din Menlo Park unde Larry Page și Sergey Brin au fondat Google",
    story:
      "In September 1998, Stanford PhD students Larry Page and Sergey Brin rented the garage of Susan Wojcicki (who later became CEO of YouTube) to build Google's first commercial office, housing server racks built from Lego bricks.",
    storyRo:
      "În septembrie 1998, doctoranzii Larry Page și Sergey Brin au închiriat garajul Susanei Wojcicki (care a devenit ulterior CEO YouTube) pentru a găzdui rack-urile de servere construite din piese Lego.",
    legacy:
      "Organized humanity's digital knowledge, proving that search algorithms could organize the expanding World Wide Web.",
    legacyRo:
      "A organizat cunoașterea digitală a omenirii, demonstrând că algoritmii de căutare pot structura întregul internet.",
  },
  {
    id: "walmart-510",
    name: "Walmart",
    logoFile: "/ASSETS/Companies/Walmart_logo_(2008).svg",
    logoInvert: false,
    image: SITE_IMAGES.culture.garageWalmart,
    year: "1950",
    location: "Bentonville, Arkansas",
    locationRo: "Bentonville, Arkansas",
    address: "105 N Main Street, Bentonville, AR 72712",
    startingCapital: "$25,000 Store Franchise Loan",
    startingCapitalRo: "25.000$ Imprumut pentru Franciză",
    currentValuation: "2.1 Million Employees & $600B+ Revenue",
    currentValuationRo: "2,1 Milioane Angajați și Venituri de 600Mld+$",
    growthMultiplier: "World's Largest Retailer",
    tagline: "Sam Walton's 5&10 main-street store that birthed the world's largest retail empire",
    taglineRo: "Magazinul 5&10 al lui Sam Walton care a dat naștere celui mai mare imperiu de retail",
    story:
      "Sam Walton opened Walton's 5&10 on the town square of Bentonville, Arkansas in 1950. By focusing on high volume, low margins, and passing savings directly to small-town working families, Walton expanded from Main Street into global retail logistics.",
    storyRo:
      "Sam Walton a deschis magazinul Walton's 5&10 în piața centrală din Bentonville în 1950. Axându-se pe volum mare și marje mici, Walton s-a extins din micul oraș în gigantul logistic de retail de azi.",
    legacy:
      "Revolutionized suburban logistics and supply chains, passing purchasing power directly to working-class households.",
    legacyRo:
      "A revoluționat logistica suburbană și lanțurile de aprovizionare, extinzând puterea de cumpărare a familiilor.",
  },
  {
    id: "harley-shed",
    name: "Harley-Davidson",
    logoFile: "/ASSETS/Companies/Harley-Davidson_logo.svg",
    logoInvert: true,
    image: SITE_IMAGES.culture.garageHarley,
    year: "1903",
    location: "Milwaukee, Wisconsin",
    locationRo: "Milwaukee, Wisconsin",
    address: "10x15 ft Wooden Shed, Chestnut Street, Milwaukee, WI",
    startingCapital: "Hand-Machined Engine Parts & $150 Loan",
    startingCapitalRo: "Piese Machinate Manual și Împrumut de 150$",
    currentValuation: "120+ Years Global Freedom Legend",
    currentValuationRo: "Legendă Globală a Libertății de 120+ Ani",
    growthMultiplier: "Iconic American Legend",
    tagline: "The 10x15 foot wooden shed where William Harley and Arthur Davidson built their first motorcycle",
    taglineRo: "Șopronul de lemn de 10x15 ft unde William Harley și Arthur Davidson au construit prima motocicletă",
    story:
      "In 1903, 21-year-old William S. Harley and Arthur Davidson built a small single-cylinder motor engine designed to fit a standard bicycle frame inside a 10x15 foot wooden backyard shed with 'Harley-Davidson Motor Co.' scrawled on the door.",
    storyRo:
      "În 1903, William S. Harley (21 de ani) și Arthur Davidson au construit un mic motor monocilindru pentru o bicicletă standard într-un șopron de lemn pe ușa căruia scria „Harley-Davidson Motor Co.”.",
    legacy:
      "Created the legendary symbol of American highway freedom, individual expression, and mechanical craftsmanship.",
    legacyRo:
      "A creat simbolul legendar al libertății pe autostrăzile americane, exprimării individuale și măiestriei mecanice.",
  },
];

export function FoundersGarageGrid() {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const [selectedId, setSelectedId] = useState<string>(FOUNDER_GARAGES[0].id);

  const active = FOUNDER_GARAGES.find((g) => g.id === selectedId) || FOUNDER_GARAGES[0];

  return (
    <div className="my-16">
      {/* 6 Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
        {FOUNDER_GARAGES.map((g) => {
          const isSel = g.id === active.id;
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => setSelectedId(g.id)}
              className="flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 border text-center"
              style={{
                cursor: "pointer",
                backgroundColor: isSel ? "#0C0907" : "rgba(255,255,255,0.04)",
                color: isSel ? "#F5EDD8" : "rgba(245,237,216,0.6)",
                borderColor: isSel ? "#E8B923" : "rgba(255,255,255,0.08)",
                transform: isSel ? "translateY(-3px)" : "none",
                boxShadow: isSel ? "0 15px 35px rgba(0,0,0,0.5)" : "none",
              }}
            >
              <span className="font-mono text-xs font-bold text-glory-gold mb-1">
                {g.year}
              </span>
              <span className="font-body text-xs font-bold uppercase tracking-wider truncate w-full">
                {g.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Active Feature Card */}
      <div key={active.id} className="culture-glass rounded-3xl border border-white/10 p-8 md:p-12 shadow-[0_30px_90px_rgb(0,0,0,0.5)]">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] items-start">
          {/* Left Column: Photograph & Address Info */}
          <div>
            {/* Real Uploaded Photo Frame */}
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.6)] border border-white/10 mb-6 bg-white/5">
              <Image
                src={active.image}
                alt={active.name + " founding garage photograph"}
                fill
                className="object-contain p-2"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>

            {/* Address & Founding Info Box */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-glory-gold font-body text-xs">📍</span>
                <span className="font-mono text-xs font-bold text-white">
                  {active.address}
                </span>
              </div>
              <p className="font-body text-xs font-medium text-[#F5EDD8]/70">
                {ro ? active.locationRo : active.location} ({active.year})
              </p>
            </div>
          </div>

          {/* Right Column: Then vs Now Multiplier, Story & Legacy */}
          <div className="space-y-6">
            {/* Header: Name & Year */}
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-glory-gold block mb-0.5">
                  {ro ? `RĂDĂCINI FONDATOARE (${active.year})` : `FOUNDING ROOTS (${active.year})`}
                </span>
                <h3 className="font-macro-display text-3xl font-black text-white">
                  {active.name}
                </h3>
              </div>
              <span className="rounded-full bg-[#E8391B]/10 border border-[#E8391B]/30 px-3.5 py-1 font-body text-xs font-bold text-[#E8391B] uppercase tracking-wider">
                {active.growthMultiplier}
              </span>
            </div>

            {/* Then vs Now Capital & Valuation Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5">
                <span className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-[#F5EDD8]/50 block mb-1">
                  {ro ? "CAPITAL DE START (ATUNCI)" : "STARTING CAPITAL (THEN)"}
                </span>
                <p className="font-editorial text-base font-bold text-white">
                  {ro ? active.startingCapitalRo : active.startingCapital}
                </p>
              </div>

              <div className="rounded-2xl border border-glory-gold/30 bg-glory-gold/[0.05] p-5">
                <span className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-glory-gold block mb-1">
                  {ro ? "IMPACT / VALOARE (AZI)" : "IMPACT / VALUATION (TODAY)"}
                </span>
                <p className="font-macro-display text-lg font-black text-glory-gold">
                  {ro ? active.currentValuationRo : active.currentValuation}
                </p>
              </div>
            </div>

            {/* Tagline & Origin Story */}
            <div>
              <p className="font-editorial text-lg italic text-glory-gold/90 leading-relaxed mb-4">
                &ldquo;{ro ? active.taglineRo : active.tagline}&rdquo;
              </p>
              <p className="font-editorial text-lg leading-relaxed text-[#F5EDD8]/90">
                {ro ? active.storyRo : active.story}
              </p>
            </div>

            {/* Garage Incubator Legacy Banner */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5">
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#F5EDD8]/50 mb-2">
                {ro ? "MOȘTENIREA INCUBATORULUI DE GARAJ" : "GARAGE INCUBATOR LEGACY"}
              </p>
              <p className="font-editorial text-base leading-relaxed text-[#F5EDD8]/80">
                {ro ? active.legacyRo : active.legacy}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
