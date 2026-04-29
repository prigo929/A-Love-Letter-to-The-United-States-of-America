// ─── Unique Features Sub-Page ────────────────────────────────────────────────

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb }      from "@/components/layout/Breadcrumb";
import { QuoteBlock }      from "@/components/sections/QuoteBlock";
import { ConstitutionAurora, InkParticles } from "@/components/constitution/ConstitutionAnimations";
import { getServerLocale } from "@/lib/i18n/server";
import { BLUR_PLACEHOLDER } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Unique Features | Constitution | America: The Greatest Nation",
  description:
    "Elected district attorneys, grand juries, ballot initiatives, recall elections, and town meetings — democratic mechanics found nowhere else on Earth.",
  alternates: { canonical: "/constitution/unique-features" },
};

const UNIQUE_FEATURES_EN = [
  {
    icon: "⚖️",
    title: "Elected District Attorneys",
    badge: "Found nowhere else at this scale",
    body: "In most democracies, prosecutors are career civil servants appointed by the justice ministry — accountable to the government, not to voters. In America, District Attorneys face the electorate every 4 years. If they are too lenient, voters remove them. If they are too aggressive, voters remove them. The power to prosecute is placed directly in the hands of democratic accountability.",
    stat: "2,300+",
    statLabel: "elected DAs across the US",
    source: "National District Attorneys Association 2024",
  },
  {
    icon: "🏛️",
    title: "The Grand Jury System",
    badge: "Abolished in UK (1933), never adopted by Europe",
    body: "Before the federal government can charge you with a serious crime, 23 ordinary citizens — not a judge, not a prosecutor — must agree there is probable cause. Grand juries can refuse to indict even when the government desperately wants to prosecute. They can also conduct independent investigations the government doesn't want. The UK abolished grand juries in 1933. No European nation uses them. America has kept this citizen check on prosecutorial power.",
    stat: "23",
    statLabel: "citizens must agree before you face federal felony charges",
    source: "5th Amendment / Federal Rules of Criminal Procedure",
  },
  {
    icon: "⭐",
    title: "Elected Sheriffs",
    badge: "Elected in 3,000+ counties",
    body: "The chief law enforcement officer of most American counties answers directly to voters — not to a police commissioner appointed by a mayor or governor. Sheriffs are elected in over 3,000 counties, serve 4-year terms, and can be removed by their constituents. This creates a local democratic check on law enforcement that exists nowhere else in the developed world at this scale.",
    stat: "3,000+",
    statLabel: "elected sheriffs across the United States",
    source: "National Sheriffs' Association 2024",
  },
  {
    icon: "📋",
    title: "Ballot Initiatives & Referenda",
    badge: "Direct democracy bypassing the legislature",
    body: "Citizens in 26 states can bypass the legislature entirely — writing their own laws by gathering signatures and putting them to a public vote. California's Proposition 13 (1978) cut property taxes without legislative approval. Colorado Amendment 64 (2012) legalized marijuana before any legislature acted. Citizens United triggered a wave of state-level campaign finance ballot measures. This is direct democracy operating inside a representative system.",
    stat: "26",
    statLabel: "states allow citizen-initiated ballot measures",
    source: "National Conference of State Legislatures 2024",
  },
  {
    icon: "🔄",
    title: "Recall Elections",
    badge: "Remove elected officials mid-term",
    body: "In 19 states, citizens can remove elected officials before their term ends by collecting enough signatures to trigger a special election. California Governor Gray Davis was recalled in 2003 — Arnold Schwarzenegger won the replacement vote. Wisconsin's Governor Scott Walker survived a 2012 recall attempt. The recall mechanism gives voters a check on elected officials that no election cycle can provide.",
    stat: "19",
    statLabel: "states allow recall elections for state officials",
    source: "National Conference of State Legislatures 2024",
  },
  {
    icon: "📚",
    title: "Elected School Boards",
    badge: "90,000+ school board members nationwide",
    body: "Parents vote directly on who controls their children's curriculum, budget, and school policies. No other country does this at scale. 90,000+ school board members across America are accountable to the parents in their district — not to a national ministry of education. The intense school board battles of recent years are democracy functioning exactly as designed: citizens arguing about what their children should be taught.",
    stat: "90,000+",
    statLabel: "elected school board members",
    source: "National School Boards Association 2024",
  },
  {
    icon: "🏘️",
    title: "New England Town Meetings",
    badge: "Continuous since 1620 — the world's oldest direct democracy",
    body: "In hundreds of New England towns, every eligible voter gathers annually to debate and vote directly on town policy, budget, and bylaws. No representative needed. Citizens themselves are the legislature. This practice has been continuous in some towns since the 1620s — making it one of the oldest uninterrupted democratic institutions on Earth.",
    stat: "1620",
    statLabel: "— continuously practiced since",
    source: "New England Municipal Center / Historical Records",
  },
  {
    icon: "⚡",
    title: "Citizens Can Incorporate Towns",
    badge: "Self-governing municipalities created by citizens",
    body: "In most states, groups of citizens can petition to incorporate their community into a city or town with its own elected government, taxing authority, and municipal services — without approval from a higher government. Americans routinely create new self-governing municipalities. The number of incorporated places in the US exceeds 19,000. This bottom-up creation of democratic government has no equivalent in unitary nation-states.",
    stat: "19,000+",
    statLabel: "incorporated municipalities in the United States",
    source: "US Census Bureau 2020",
  },
];

const UNIQUE_FEATURES_RO = [
  {
    icon: "⚖️",
    title: "Procurori Districtuali Aleși",
    badge: "Inexistent la această scară în altă parte",
    body: "În majoritatea democrațiilor, procurorii sunt funcționari civili numiți de ministerul justiției — responsabili față de guvern, nu față de alegători. În America, Procurorii Districtuali înfruntă electoratul la fiecare 4 ani. Dacă sunt prea indulgenți, alegătorii îi elimină. Dacă sunt prea agresivi, alegătorii îi elimină. Puterea de urmărire penală este plasată direct în mâinile responsabilității democratice.",
    stat: "2.300+",
    statLabel: "procurori districtuali aleși în SUA",
    source: "National District Attorneys Association 2024",
  },
  {
    icon: "🏛️",
    title: "Sistemul Marilor Jurii",
    badge: "Abolit în Marea Britanie (1933), niciodată adoptat de Europa",
    body: "Înainte ca guvernul federal să te poată acuza de o infracțiune gravă, 23 de cetățeni obișnuiți — nu un judecător, nu un procuror — trebuie să fie de acord că există cauze probabile. Marile jurii pot refuza rechizitoriul chiar și atunci când guvernul dorește cu disperare să urmărească penal. Marea Britanie a abolit marile jurii în 1933. Nicio națiune europeană nu le folosește.",
    stat: "23",
    statLabel: "cetățeni trebuie să fie de acord înainte ca tu să înfrunți acuzații penale federale",
    source: "Al 5-lea Amendament / Regulile Federale de Procedură Penală",
  },
  {
    icon: "⭐",
    title: "Șerifi Aleși",
    badge: "Aleși în 3.000+ de județe",
    body: "Ofițerul șef de aplicare a legii al majorității județelor americane răspunde direct față de alegători — nu față de un comisar de poliție numit de un primar sau guvernator. Șerifii sunt aleși în peste 3.000 de județe, au mandate de 4 ani și pot fi înlăturați de alegători.",
    stat: "3.000+",
    statLabel: "șerifi aleși în Statele Unite",
    source: "National Sheriffs' Association 2024",
  },
  {
    icon: "📋",
    title: "Inițiative Cetățenești și Referendumuri",
    badge: "Democrație directă care ocolește legislativul",
    body: "Cetățenii din 26 de state pot ocoli complet legislativul — scriind propriile legi prin strângerea de semnături și supunerea lor la vot public. Propunerea 13 a Californiei (1978) a redus impozitele pe proprietate fără aprobare legislativă. Amendamentul 64 din Colorado (2012) a legalizat marijuana înainte ca orice legislatură să acționeze.",
    stat: "26",
    statLabel: "state permit inițiative cetățenești",
    source: "National Conference of State Legislatures 2024",
  },
  {
    icon: "🔄",
    title: "Alegeri de Revocare",
    badge: "Înlătură funcționarii aleși la mijlocul mandatului",
    body: "În 19 state, cetățenii pot înlătura funcționarii aleși înainte de expirarea mandatului prin strângerea de semnături. Guvernatorul californian Gray Davis a fost revocat în 2003 — Arnold Schwarzenegger a câștigat votul de înlocuire. Mecanismul de revocare oferă alegătorilor un control pe care niciun ciclu electoral nu îl poate oferi.",
    stat: "19",
    statLabel: "state permit alegerile de revocare pentru funcționarii statali",
    source: "National Conference of State Legislatures 2024",
  },
  {
    icon: "📚",
    title: "Consilii Școlare Alese",
    badge: "90.000+ de membri ai consiliului școlar la nivel național",
    body: "Părinții votează direct cine controlează programa, bugetul și politicile școlare ale copiilor lor. Nicio altă țară nu face acest lucru la scară. 90.000+ de membri ai consiliului școlar din America sunt responsabili față de părinții din districtul lor.",
    stat: "90.000+",
    statLabel: "membri ai consiliului școlar aleși",
    source: "National School Boards Association 2024",
  },
  {
    icon: "🏘️",
    title: "Adunările Orășenești din Noua Anglie",
    badge: "Continue din 1620 — cea mai veche democrație directă din lume",
    body: "În sute de orașe din Noua Anglie, fiecare alegător eligibil se adună anual pentru a dezbate și vota direct politica, bugetul și regulamentele orașului. Niciun reprezentant nu este necesar. Această practică este continuă în unele orașe din anii 1620.",
    stat: "1620",
    statLabel: "— practicată continuu din",
    source: "New England Municipal Center / Documente Istorice",
  },
  {
    icon: "⚡",
    title: "Cetățenii Pot Înființa Municipalități",
    badge: "Municipalități auto-guvernate create de cetățeni",
    body: "În majoritatea statelor, grupuri de cetățeni pot solicita încorporarea comunității lor într-un oraș cu propriul guvern ales, autoritate fiscală și servicii municipale — fără aprobarea unui guvern superior. Americanii creează în mod curent noi municipalități auto-guvernate.",
    stat: "19.000+",
    statLabel: "municipalități încorporate în Statele Unite",
    source: "US Census Bureau 2020",
  },
];

const ELECTED_POSITIONS_PYRAMID_EN = [
  { level: "Federal", count: "537", description: "President, VP, 535 members of Congress" },
  { level: "State Executives", count: "~300", description: "Governors, AGs, Secretaries of State, Treasurers" },
  { level: "State Legislatures", count: "7,383", description: "State legislators across 50 states" },
  { level: "County Officials", count: "~58,000", description: "Commissioners, DAs, Sheriffs, Judges" },
  { level: "City & Municipal", count: "~135,000", description: "Mayors, council members, city judges" },
  { level: "District & Local", count: "~320,000", description: "School boards, water districts, fire districts" },
  { level: "Total Elected", count: "~520,000", description: "More elected officials than any other democracy" },
];

const ELECTED_POSITIONS_PYRAMID_RO = [
  { level: "Federal", count: "537", description: "Președinte, VP, 535 membri ai Congresului" },
  { level: "Executivi Statali", count: "~300", description: "Guvernatori, procurori generali, secretari de stat, trezorieri" },
  { level: "Legislaturi Statale", count: "7.383", description: "Legislatori statali în 50 de state" },
  { level: "Funcționari de Județ", count: "~58.000", description: "Comisari, procurori, șerifi, judecători" },
  { level: "Oraș și Municipalitate", count: "~135.000", description: "Primari, consilieri, judecători municipali" },
  { level: "District și Local", count: "~320.000", description: "Consilii școlare, districte de apă, districte de pompieri" },
  { level: "Total Aleși", count: "~520.000", description: "Mai mulți funcționari aleși decât orice altă democrație" },
];

export default async function UniqueFeaturesPage() {
  const locale   = await getServerLocale();
  const isRo     = locale === "ro";
  const features = isRo ? UNIQUE_FEATURES_RO : UNIQUE_FEATURES_EN;
  const pyramid  = isRo ? ELECTED_POSITIONS_PYRAMID_RO : ELECTED_POSITIONS_PYRAMID_EN;

  return (
    <>
      <div className="relative overflow-hidden bg-[#080B12] pt-28 pb-16">
        <ConstitutionAurora />
        <InkParticles count={60} />
        <Image
          src="/images/constitution/huntington-town-meeting.jpg"
          alt="Town meeting in Huntington, Vermont — local democracy in action"
          fill className="object-cover opacity-18" priority sizes="100vw"
          placeholder="blur" blurDataURL={BLUR_PLACEHOLDER}
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080B12]/70 to-[#080B12]" />
        <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: isRo ? "Constituție" : "Constitution", href: "/constitution" },
              { label: isRo ? "Doar în America" : "Only in America" },
            ]}
            className="mb-8"
          />
          <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A84C]">
            {isRo ? "Doar în America" : "Only in America"}
          </p>
          <h1 className="mb-6 font-hero leading-none" style={{ fontSize: "clamp(3rem,7vw,6rem)" }}>
            <span className="block text-[#F5F0E8]">{isRo ? "MECANISME DEMOCRATICE" : "DEMOCRATIC MECHANICS"}</span>
            <span className="block" style={{
              background: "linear-gradient(135deg,#D4AF6A,#E8C878,#C9A84C)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              {isRo ? "GĂSITE NICĂIERI ALTUNDEVA" : "FOUND NOWHERE ELSE"}
            </span>
          </h1>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-[#B8B4AC]">
            {isRo
              ? "America are 520.000 de funcționari aleși. Nicio altă democrație nu se apropie. Procurori aleși, șerifi aleși, consilii școlare alese, mari jurii, inițiative cetățenești, alegeri de revocare, adunări orășenești — democrație la fiecare nivel."
              : "America has 520,000 elected officials. No other democracy comes close. Elected prosecutors, elected sheriffs, elected school boards, grand juries, ballot initiatives, recall elections, town meetings — democracy at every level."}
          </p>
        </div>
      </div>

      <div className="bg-[#080B12]">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">

          {/* Elected pyramid */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-[#F5F0E8]">
              {isRo ? "Piramida Democrației Americane" : "The American Democracy Pyramid"}
            </h2>
            <p className="mb-8 font-body text-base text-[#B8B4AC]">
              {isRo
                ? "Democrația americană nu se oprește la Casa Albă sau la Capitol. Ea se extinde până la consiliile școlare locale, șerifii de județ și judecătorii municipali — 520.000 de funcționari aleși care formează cel mai granular sistem democratic de pe Pământ."
                : "American democracy doesn't stop at the White House or Capitol. It reaches down to local school boards, county sheriffs, and municipal judges — 520,000 elected officials forming the most granular democratic system on Earth."}
            </p>
            <div className="overflow-hidden rounded-2xl border border-[rgba(201,168,76,0.15)] bg-[#12181F]">
              {pyramid.map((level, i) => {
                const isLast = i === pyramid.length - 1;
                const width = `${15 + (i / (pyramid.length - 1)) * 85}%`;
                return (
                  <div
                    key={level.level}
                    className={`flex flex-col gap-3 px-6 py-5 ${isLast ? "border-t-2 border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.04)]" : "border-b border-white/5"}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                      <div className="flex items-baseline gap-3">
                        <span className={`font-hero text-2xl ${isLast ? "text-[#C9A84C]" : "text-[#F5F0E8]"}`}>
                          {level.count}
                        </span>
                        <span className={`font-body text-sm uppercase tracking-wider font-semibold ${isLast ? "text-[#C9A84C]" : "text-[#B8B4AC]"}`}>
                          {level.level}
                        </span>
                      </div>
                      <p className="font-body text-sm text-[#8B8880]">{level.description}</p>
                    </div>
                    
                    <div className="h-1.5 w-full rounded-full bg-black/40 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width,
                          background: isLast
                            ? "linear-gradient(90deg, #8B6A2A, #C9A84C, #E8C878)"
                            : `rgba(201,168,76,${0.25 + i * 0.12})`,
                          boxShadow: isLast ? "0 0 12px rgba(201,168,76,0.4)" : "none",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Feature cards */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-[#F5F0E8]">
              {isRo ? "Caracteristici Unice — Detaliate" : "Unique Features — In Detail"}
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[rgba(201,168,76,0.12)] bg-[#12181F] p-6 transition-all hover:border-[rgba(201,168,76,0.3)]"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{f.icon}</span>
                      <h3 className="font-display text-lg font-semibold text-[#F5F0E8]">{f.title}</h3>
                    </div>
                    <span className="shrink-0 rounded-full border border-[rgba(201,168,76,0.25)] bg-[rgba(201,168,76,0.06)] px-2.5 py-1 font-body text-[10px] text-[#C9A84C]">
                      {f.badge}
                    </span>
                  </div>

                  <p className="mb-4 font-body text-sm leading-relaxed text-[#B8B4AC]">{f.body}</p>

                  <div className="flex items-baseline gap-2 border-t border-white/6 pt-3">
                    <span className="font-hero text-2xl text-[#C9A84C]">{f.stat}</span>
                    <span className="font-body text-xs text-[#6B6860]">{f.statLabel}</span>
                  </div>
                  <p className="mt-1 font-body text-[9px] text-[#6B6860]">
                    {isRo ? "Sursă:" : "Source:"} {f.source}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Global contrast */}
          <section className="overflow-hidden rounded-2xl border border-[rgba(201,168,76,0.2)] bg-[#12181F] p-6 md:p-8">
            <h2 className="mb-4 font-display text-2xl font-semibold text-[#F5F0E8]">
              {isRo ? "De ce Contează" : "Why It Matters"}
            </h2>
            <p className="mb-4 font-body text-base leading-relaxed text-[#B8B4AC]">
              {isRo
                ? "Franța are un singur sistem de aplicare a legii național. Germania are procurori numiți de stat, nu aleși de cetățeni. Regatul Unit a abolit marile jurii. Nicio democrație europeană nu are inițiative cetățenești la scara pe care statele americane le folosesc."
                : "France has a single national law enforcement system. Germany has state-appointed prosecutors, not citizen-elected ones. The UK abolished grand juries. No European democracy has citizen ballot initiatives at the scale American states use them."}
            </p>
            <p className="font-body text-base leading-relaxed text-[#B8B4AC]">
              {isRo
                ? "Sistemul american nu este mai dezordonat din cauza acestor caracteristici — este mai responsabil. Procurorii știu că pierd alegeri dacă fac prea mult sau prea puțin. Șerifii știu că alegătorii lor din județ îi evaluează. Consiliile școlare știu că părinții sunt atenți. Responsabilitatea democratică merge până la cel mai jos nivel posibil."
                : "The American system is not more chaotic because of these features — it is more accountable. Prosecutors know they lose elections if they over-charge or under-charge. Sheriffs know their county voters are watching. School boards know parents are engaged. Democratic accountability goes down to the lowest possible level."}
            </p>
          </section>

          <QuoteBlock
            quote={isRo
              ? "\"Arta de a se asocia împreună trebuie să fie mama științei; progresul tuturor celorlalte depinde de progresul ei.\" — Tocqueville, observând democrația americană locală în 1831."
              : "\"The art of associating together must grow and improve in the same ratio in which the equality of conditions is increased. The science of association is the mother of science; the progress of all the rest depends upon the progress it has made.\""}
            attribution={isRo ? "Alexis de Tocqueville" : "Alexis de Tocqueville"}
            title={isRo ? "De la Democrație în America, 1831 — după ce a observat democrația locală americană" : "Democracy in America, 1831 — observing American local democracy"}
            variant="dark"
          />

          <div className="flex items-center justify-between border-t border-white/8 pt-8">
            <Link href="/constitution/second-amendment" className="font-body text-sm text-[#6B6860] hover:text-[#F5F0E8] transition-colors">
              ← {isRo ? "Al Doilea Amendament" : "Second Amendment"}
            </Link>
            <Link href="/constitution" className="font-body text-sm font-semibold text-[#C9A84C] hover:text-[#E8C878] transition-colors">
              ↑ {isRo ? "Constituție" : "Constitution Overview"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
