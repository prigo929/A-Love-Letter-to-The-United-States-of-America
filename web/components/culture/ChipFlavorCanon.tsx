"use client";

// ─── ChipFlavorCanon ─────────────────────────────────────────────────────────
// The American potato-chip flavor canon — the "big four" bestsellers (Classic,
// Sour Cream & Onion, Barbecue, Salt & Vinegar), each of which turns out to hold
// a whole tale of American cultural evolution: the democratic potato, the onion's
// class snobbery, barbecue's Black-American history, and vinegar's British import.
// A color-coded selector keyed to each flavor's signature bag color opens its story.
//
// Adapted from a video essay's research (JJ, "The History of American Chip
// Flavors") — its "canon" framing and facts guided coverage; every line here is
// rewritten in the site's own voice, not transcribed. Styled for the food page's
// cream/parchment editorial surface (dark text on cream).

import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface Flavor {
  key: string;
  name: string;
  nameRo: string;
  descriptor: string;
  descriptorRo: string;
  color: string;
  tint: string;
  since: string;
  sinceLabel: string;
  sinceLabelRo: string;
  story: string;
  storyRo: string;
  note: string;
  noteRo: string;
  facts: { stat: string; label: string; labelRo: string }[];
}

const FLAVORS: Flavor[] = [
  {
    key: "classic",
    name: "Classic",
    nameRo: "Clasic",
    descriptor: "The original",
    descriptorRo: "Originalul",
    color: "#C68A1E",
    tint: "rgba(198,138,30,0.08)",
    since: "1853",
    sinceLabel: "Saratoga chips are born",
    sinceLabelRo: "Se nasc chipsurile Saratoga",
    story:
      "The plain chip is the whole story in miniature. The potato is native to the Americas but was cultivated first by the native peoples of Latin America, carried to Europe by the Spanish, and there dismissed as gross peasant food — \"only the wretched eat the roots.\" Egalitarian America never took to that snobbery; colonists and then a wave of Irish immigrants made the potato a mainstream food eaten by every class. It even reached fine restaurants like Moon's Lake House in Saratoga Springs, New York, where the potato chip was invented around 1853. Factory technology in the early 1900s turned chips from a scoop-it-from-a-barrel bulk good into sealed individual bags, and postwar entrepreneurs bought up the regional makers into national giants.",
    storyRo:
      "Chipsul simplu e toată povestea în miniatură. Cartoful este originar din Americi, dar a fost cultivat întâi de popoarele native din America Latină, dus în Europa de spanioli și acolo disprețuit ca mâncare țărănească — „doar nenorociții mănâncă rădăcinile.” America egalitară nu a preluat snobismul acela; coloniștii și apoi un val de imigranți irlandezi au făcut din cartof o mâncare de masă consumată de toate clasele. A ajuns chiar în restaurante fine precum Moon's Lake House din Saratoga Springs, New York, unde chipsul a fost inventat în jurul lui 1853. Tehnologia de fabrică de la începutul anilor 1900 a transformat chipsurile dintr-un produs vândut la kilogram într-un produs în pungi sigilate, iar antreprenorii postbelici au cumpărat producătorii regionali, făcând giganți naționali.",
    note:
      "The famous legend — a snotty chef slicing potatoes paper-thin in 1853 to spite tycoon Cornelius Vanderbilt — is almost certainly a myth. Historians think the chef's sister invented them in a far less theatrical accident.",
    noteRo:
      "Legenda faimoasă — un bucătar arțăgos care felia cartofii subțiri ca hârtia în 1853 ca să-l enerveze pe magnatul Cornelius Vanderbilt — este aproape sigur un mit. Istoricii cred că sora bucătarului le-a inventat într-un accident mult mai puțin teatral.",
    facts: [
      { stat: "60%+", label: "Of US chips are Frito-Lay", labelRo: "Din chipsurile SUA sunt Frito-Lay" },
      { stat: "50%", label: "Of US snack food, by 1975", labelRo: "Din snacksul SUA, până în 1975" },
    ],
  },
  {
    key: "sourcream",
    name: "Sour Cream & Onion",
    nameRo: "Smântână & Ceapă",
    descriptor: "The dip, bagged",
    descriptorRo: "Sosul, în pungă",
    color: "#4E8C5A",
    tint: "rgba(78,140,90,0.08)",
    since: "1952",
    sinceLabel: "Lipton's dehydrated onion soup",
    sinceLabelRo: "Supa de ceapă deshidratată Lipton",
    story:
      "Onions carried the same class baggage as the potato, but split along a north-south line: from the 1600s the English treated onion-eaters as the lowest, smelliest sort of people, while the Spanish, Greeks, Italians and even the French ate them freely. Egalitarian America, filling with immigrants from onion-loving Europe, normalized the vegetable. The flavor's real origin is a postwar convenience product: World War II dehydration tech gave Lipton its packeted onion soup in 1952, and Californians started stirring that powder into sour cream to make \"California dip\" — like a baked potato with sour cream and onions, perfect for scooping with a chip. Lay's simply bottled the whole idea into a chip in the early 1970s.",
    storyRo:
      "Ceapa purta același bagaj de clasă ca și cartoful, dar despărțit pe o linie nord-sud: din anii 1600 englezii îi tratau pe mâncătorii de ceapă drept cei mai de jos și mai mirositori oameni, în timp ce spaniolii, grecii, italienii și chiar francezii o mâncau liber. America egalitară, umplându-se de imigranți din Europa iubitoare de ceapă, a normalizat leguma. Originea reală a aromei este un produs de conveniență postbelic: tehnologia de deshidratare din Al Doilea Război Mondial i-a dat Lipton supa de ceapă la plic în 1952, iar californienii au început să amestece acea pudră în smântână pentru a face „California dip” — ca un cartof copt cu smântână și ceapă, perfect pentru înmuiat un chips. Lay's a îmbuteliat pur și simplu toată ideea într-un chips la începutul anilor 1970.",
    note:
      "Lipton pushed \"California dip\" hard on 1950s TV — the host of the show it sponsored, Talent Scouts, sold the dip as the reason to buy the soup even if you never intended to make soup.",
    noteRo:
      "Lipton a promovat intens „California dip” la TV-ul anilor 1950 — gazda emisiunii pe care o sponsoriza, Talent Scouts, vindea sosul ca motivul de a cumpăra supa, chiar dacă nu aveai de gând să faci supă.",
    facts: [
      { stat: "1952", label: "Lipton onion soup packet", labelRo: "Plicul de supă de ceapă Lipton" },
      { stat: "1970s", label: "Lay's makes it a chip", labelRo: "Lay's o face chips" },
    ],
  },
  {
    key: "barbecue",
    name: "Barbecue",
    nameRo: "Barbecue",
    descriptor: "The first flavored chip",
    descriptorRo: "Primul chips aromat",
    color: "#B5382A",
    tint: "rgba(181,56,42,0.08)",
    since: "1958",
    sinceLabel: "Lay's BBQ chips debut",
    sinceLabelRo: "Debutează chipsurile BBQ Lay's",
    story:
      "Barbecue is the oldest tradition here and the one least changed. The word comes from the Taíno of the Caribbean and means a rack for smoking meat; European colonizers copied the indigenous method of cooking over open fire, making it either an early melting-pot borrowing or cultural appropriation, depending on your mood. Americans threw big barbecues from the start — George Washington attended them — and it was a great social equalizer, with one exception: in the South the work fell to enslaved Black cooks, who mastered and reshaped it, and after emancipation barbecue restaurants became a path to Black economic self-sufficiency. The postwar backyard grill (1945–1965 was its \"golden age\") turned it into a middle-class status symbol, and Kraft's sweet tomato-and-molasses sauce became the national default.",
    storyRo:
      "Barbecue-ul este cea mai veche tradiție de aici și cea mai puțin schimbată. Cuvântul vine de la populația Taíno din Caraibe și înseamnă un grătar pentru afumat carne; colonizatorii europeni au copiat metoda indigenă de gătit pe foc deschis, făcând-o fie o preluare timpurie de creuzet, fie apropriere culturală, în funcție de dispoziție. Americanii au făcut barbecue-uri mari de la început — George Washington participa la ele — și era un mare egalizator social, cu o excepție: în Sud munca revenea bucătarilor negri înrobiți, care l-au stăpânit și remodelat, iar după emancipare restaurantele de barbecue au devenit o cale spre autosuficiență economică pentru negri. Grătarul postbelic din curte (1945–1965 a fost „epoca sa de aur”) l-a transformat într-un simbol de statut al clasei de mijloc, iar sosul dulce de roșii și melasă de la Kraft a devenit standardul național.",
    note:
      "Lay's barbecue, unveiled in 1958 at the height of the backyard-grill craze, was the first successful flavored potato chip — the product that proved chips didn't have to be plain, and opened the door to every flavor that followed.",
    noteRo:
      "Barbecue-ul Lay's, lansat în 1958 în plină nebunie a grătarului de curte, a fost primul chips aromat de succes — produsul care a dovedit că chipsurile nu trebuie să fie simple și a deschis ușa fiecărei arome care a urmat.",
    facts: [
      { stat: "1958", label: "First flavored chip in the US", labelRo: "Primul chips aromat din SUA" },
      { stat: "#1", label: "Kraft, top US barbecue sauce", labelRo: "Kraft, sosul BBQ nr. 1 din SUA" },
    ],
  },
  {
    key: "saltvinegar",
    name: "Salt & Vinegar",
    nameRo: "Sare & Oțet",
    descriptor: "The British import",
    descriptorRo: "Importul britanic",
    color: "#35699B",
    tint: "rgba(53,105,155,0.08)",
    since: "1970s",
    sinceLabel: "Nalley brings it to America",
    sinceLabelRo: "Nalley îl aduce în America",
    story:
      "Vinegar is just alcohol gone bad — the word anglicizes the French vin aigre, \"sour wine\" — and it is one of the oldest foodstuffs on Earth, long used to season and to mask the taste of spoiling food. The English, too good for onions, favored malt vinegar, and doused it over the deep-fried fish and chips that became a British staple in the 1800s. When postwar British immigrants arrived thinking of themselves as exotic foreigners, the British pub rose as one more kind of ethnic restaurant, bringing fish and chips and vinegar with it. That primed America for the flavor: salt and vinegar, a British chip flavor, was introduced to the US in the early 1970s not by Lay's but by the small Tacoma company Nalley, which leaned hard on the British angle.",
    storyRo:
      "Oțetul este doar alcool stricat — cuvântul anglicizează francezul vin aigre, „vin acru” — și este unul dintre cele mai vechi alimente de pe Pământ, folosit mult timp pentru a condimenta și a masca gustul mâncării alterate. Englezii, prea buni pentru ceapă, preferau oțetul de malț și îl turnau peste peștele prăjit și cartofii care au devenit un aliment de bază britanic în anii 1800. Când imigranții britanici postbelici au sosit gândindu-se despre ei înșiși ca străini exotici, pub-ul britanic s-a ridicat ca încă un tip de restaurant etnic, aducând cu el fish and chips și oțet. Asta a pregătit America pentru aromă: sare și oțet, o aromă britanică de chips, a fost introdusă în SUA la începutul anilor 1970 nu de Lay's, ci de mica firmă Nalley din Tacoma.",
    note:
      "The paradox: Americans now eat more salt-and-vinegar chips than anyone on Earth, yet many would find the actual British habit that inspired them — pouring vinegar over their fries — strange and foreign.",
    noteRo:
      "Paradoxul: americanii mănâncă acum mai multe chipsuri cu sare și oțet decât oricine pe Pământ, dar mulți ar considera obiceiul britanic real care le-a inspirat — a turna oțet peste cartofii prăjiți — ceva ciudat și străin.",
    facts: [
      { stat: "1970s", label: "Nalley's US launch", labelRo: "Lansarea Nalley în SUA" },
      { stat: "🇬🇧", label: "Originally a British flavor", labelRo: "Inițial o aromă britanică" },
    ],
  },
];

export function ChipFlavorCanon() {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const [sel, setSel] = useState(0);
  const active = FLAVORS[sel];

  return (
    <div>
      {/* Color-coded flavor selector */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {FLAVORS.map((f, i) => {
          const on = i === sel;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setSel(i)}
              aria-current={on}
              className="group relative overflow-hidden rounded-2xl border-2 p-5 text-left transition-all duration-300"
              style={{
                cursor: "pointer",
                borderColor: on ? f.color : "rgba(12,9,7,0.12)",
                backgroundColor: on ? f.tint : "transparent",
                transform: on ? "translateY(-3px)" : "translateY(0)",
                boxShadow: on ? `0 18px 40px ${f.tint}` : "none",
              }}
            >
              {/* signature color band — the "bag top" */}
              <span
                className="mb-3 block h-2.5 w-12 rounded-full transition-all duration-300"
                style={{ backgroundColor: f.color, opacity: on ? 1 : 0.4, width: on ? "3.5rem" : "3rem" }}
                aria-hidden
              />
              <span
                className="block font-macro-display text-lg font-black uppercase leading-tight tracking-tight sm:text-xl"
                style={{ color: on ? "#0C0907" : "rgba(12,9,7,0.55)" }}
              >
                {ro ? f.nameRo : f.name}
              </span>
              <span
                className="mt-1 block font-body text-[11px] font-bold uppercase tracking-[0.15em]"
                style={{ color: on ? f.color : "rgba(12,9,7,0.35)" }}
              >
                {ro ? f.descriptorRo : f.descriptor}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active flavor panel */}
      <div
        key={active.key}
        className="mt-10 overflow-hidden rounded-3xl border"
        style={{ borderColor: `${active.color}40`, backgroundColor: active.tint }}
      >
        {/* Colored header strip */}
        <div className="flex items-center gap-4 px-7 py-5" style={{ backgroundColor: active.color }}>
          <span className="font-macro-display text-3xl font-black leading-none text-white md:text-4xl">
            {active.since}
          </span>
          <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-white/85">
            {ro ? active.sinceLabelRo : active.sinceLabel}
          </span>
        </div>

        <div className="grid gap-8 p-7 md:grid-cols-[1.6fr_1fr] md:gap-12 md:p-9">
          <div>
            <h3
              className="mb-5 font-macro-display text-3xl font-black leading-none tracking-tight md:text-4xl"
              style={{ color: "#0C0907" }}
            >
              {ro ? active.nameRo : active.name}
            </h3>
            <p className="font-editorial text-[17px] leading-relaxed text-[#0C0907]/75">
              {ro ? active.storyRo : active.story}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {/* Facts */}
            <div className="flex flex-wrap gap-6">
              {active.facts.map((f) => (
                <div key={f.label} className="border-l-2 pl-4" style={{ borderColor: `${active.color}66` }}>
                  <div className="font-macro-display text-3xl font-black leading-none text-[#0C0907]">{f.stat}</div>
                  <div className="mt-1.5 max-w-[11rem] font-body text-xs text-[#0C0907]/55">{ro ? f.labelRo : f.label}</div>
                </div>
              ))}
            </div>

            {/* Aside note */}
            <div className="rounded-2xl bg-white/50 p-5">
              <p className="mb-1.5 font-body text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: active.color }}>
                {ro ? "DE ȘTIUT" : "WORTH KNOWING"}
              </p>
              <p className="font-editorial text-[14px] leading-relaxed text-[#0C0907]/70">
                {ro ? active.noteRo : active.note}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
