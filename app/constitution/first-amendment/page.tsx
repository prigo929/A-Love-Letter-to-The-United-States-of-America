// ─── First Amendment Sub-Page ─────────────────────────────────────────────────
// This page focuses on the First Amendment — the bedrock of American liberty.
// It explains why the U.S. has the strongest free speech laws in the world.
//
// For Beginners: This page uses comparative data to show the difference 
// between "Free Speech" in America versus other democratic nations.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb }     from "@/components/layout/Breadcrumb";
import { QuoteBlock }     from "@/components/sections/QuoteBlock";
import { ConstitutionAurora, InkParticles } from "@/components/constitution/ConstitutionAnimations";
import { getServerLocale } from "@/lib/i18n/server";
import { BLUR_PLACEHOLDER } from "@/lib/utils";

export const metadata: Metadata = {
  title: "First Amendment | Constitution | America: The Greatest Nation",
  description:
    "The broadest free speech protection of any democracy in history. Why America protects speech other nations criminalize — and why that matters.",
  alternates: { canonical: "/constitution/first-amendment" },
};

const SPEECH_CASES_EN = [
  { name: "Schenck v. United States", year: 1919, ruling: "Government can restrict speech that creates 'clear and present danger'", significance: "First major First Amendment case — established initial limits on speech during wartime" },
  { name: "Whitney v. California", year: 1927, ruling: "States can restrict speech advocating illegal acts", significance: "Justice Brandeis wrote the most powerful dissent for free speech in American history: 'If there be time to expose through discussion the falsehood and fallacies, to avert the evil by the processes of education, the remedy to be applied is more speech, not enforced silence.'" },
  { name: "New York Times v. Sullivan", year: 1964, ruling: "Public officials must prove 'actual malice' to win defamation suits", significance: "Protects robust press coverage of government. No democracy offers broader defamation protection to journalists covering public officials." },
  { name: "Brandenburg v. Ohio", year: 1969, ruling: "Government can only restrict speech inciting 'imminent lawless action'", significance: "The modern First Amendment standard. Speech must be directed to producing and likely to produce imminent lawless action — a very high bar." },
  { name: "Texas v. Johnson", year: 1989, ruling: "Flag burning is constitutionally protected expression", significance: "5-4 decision that shocked many Americans. But the principle it upheld — that government cannot punish expression because it finds it offensive — is the cornerstone of free speech." },
  { name: "Citizens United v. FEC", year: 2010, ruling: "Corporations and unions may spend unlimited amounts in elections", significance: "The most contested First Amendment ruling of the modern era. 5-4. Held that political spending is protected speech. Critics argue it gave corporations constitutional personhood for speech purposes." },
  { name: "Matal v. Tam", year: 2017, ruling: "Government cannot refuse to register 'disparaging' trademarks", significance: "Unanimous court struck down a law banning 'disparaging' trademarks. The government may not discriminate against speech based on its viewpoint — even offensive viewpoints." },
  { name: "303 Creative v. Elenis", year: 2023, ruling: "First Amendment protects a web designer's right to decline same-sex wedding websites", significance: "6-3. The tension between free speech and anti-discrimination law — the defining First Amendment debate of the current era." },
];

const SPEECH_CASES_RO = [
  { name: "Schenck v. United States", year: 1919, ruling: "Guvernul poate restricționa discursul care creează 'pericol clar și prezent'", significance: "Primul caz major al Primului Amendament — a stabilit primele limite ale discursului în timp de război." },
  { name: "New York Times v. Sullivan", year: 1964, ruling: "Funcționarii publici trebuie să dovedească 'răutate reală' pentru a câștiga procese de defăimare", significance: "Protejează presa în acoperirea guvernului. Nicio democrație nu oferă o protecție mai largă a libertății presei față de procese de defăimare." },
  { name: "Brandenburg v. Ohio", year: 1969, ruling: "Guvernul poate restricționa doar discursul care incită 'acțiunea ilegală iminentă'", significance: "Standardul modern al Primului Amendament. Un prag extrem de ridicat." },
  { name: "Texas v. Johnson", year: 1989, ruling: "Arderea steagului este expresie protejată constituțional", significance: "Decizie 5-4 care a șocat mulți americani. Dar principiul — că guvernul nu poate pedepsi expresia pe care o găsește ofensivă — este piatra de temelie a libertății de exprimare." },
  { name: "Citizens United v. FEC", year: 2010, ruling: "Corporațiile și sindicatele pot cheltui sume nelimitate în alegeri", significance: "Cel mai contestat decret al Primului Amendament din era modernă. 5-4. Cheltuielile politice sunt discurs protejat." },
  { name: "303 Creative v. Elenis", year: 2023, ruling: "Primul Amendament protejează dreptul unui web designer de a refuza site-uri de nuntă pentru cupluri de același sex", significance: "6-3. Tensiunea dintre libertatea de exprimare și legile anti-discriminare — dezbaterea definitorie a Primului Amendament în era actuală." },
];

const GLOBAL_COMPARISON_EN = [
  { country: "Germany", flag: "🇩🇪", rule: "Nazi symbols, Holocaust denial, and incitement to hatred are criminally prosecuted", context: "Germany's experience with the Nazi regime shapes its approach to hate speech. The Basic Law protects free expression but prohibits speech that attacks human dignity." },
  { country: "United Kingdom", flag: "🇬🇧", rule: "The Public Order Act and Racial and Religious Hatred Act restrict hate speech and offensive public expression", context: "UK law balances free expression with public order and community harmony. Speech that 'causes harassment, alarm or distress' can be criminal." },
  { country: "Canada", flag: "🇨🇦", rule: "Section 319 of the Criminal Code prohibits 'willful promotion of hatred' against identifiable groups", context: "Canada's Charter protects freedom of expression but Parliament has limited hate speech. The Supreme Court has upheld hate speech laws as consistent with Charter values." },
  { country: "France", flag: "🇫🇷", rule: "The Loi Pleven (1972) prohibits incitement to discrimination, hatred or violence based on origin, race, religion", context: "France has extensive hate speech laws. Defamation of a group based on religion, race, ethnicity, or sexual orientation is a criminal offense." },
  { country: "United States", flag: "🇺🇸", rule: "Speech can only be restricted when it presents a danger of imminent lawless action — a very high bar", context: "The United States protects vastly more speech than any other developed democracy. Hate speech, offensive speech, Nazi symbols, Holocaust denial — all constitutionally protected." },
];

const GLOBAL_COMPARISON_RO = [
  { country: "Germania", flag: "🇩🇪", rule: "Simbolurile naziste, negarea Holocaustului și incitarea la ură sunt urmărite penal", context: "Experiența Germaniei cu regimul nazist îi modelează abordarea față de discursul de ură. Legea Fundamentală protejează expresia liberă, dar interzice discursul care atacă demnitatea umană." },
  { country: "Regatul Unit", flag: "🇬🇧", rule: "Legea Ordinii Publice restricționează discursul de ură și expresia publică ofensivă", context: "Legea britanică echilibrează libertatea de exprimare cu ordinea publică. Discursul care 'cauzează hărțuire, alarmă sau suferință' poate fi infracțiune." },
  { country: "Canada", flag: "🇨🇦", rule: "Secțiunea 319 a Codului Penal interzice 'promovarea deliberată a urii' față de grupuri identificabile", context: "Carta canadiană protejează libertatea de exprimare, dar Parlamentul a limitat discursul de ură. Curtea Supremă a menținut legile privind discursul de ură." },
  { country: "Franța", flag: "🇫🇷", rule: "Legea Pleven (1972) interzice incitarea la discriminare, ură sau violență pe baza originii, rasei, religiei", context: "Franța are legi extinse privind discursul de ură. Defăimarea unui grup pe baza religiei sau rasei este o infracțiune penală." },
  { country: "Statele Unite", flag: "🇺🇸", rule: "Discursul poate fi restricționat doar când prezintă pericolul iminent de acțiune ilegală — un prag foarte ridicat", context: "SUA protejează mult mai mult discursul decât orice altă democrație dezvoltată. Discursul de ură, simbolurile naziste, negarea Holocaustului — toate protejate constituțional." },
];

export default async function FirstAmendmentPage() {
  const locale   = await getServerLocale();
  const isRo     = locale === "ro";
  const cases    = isRo ? SPEECH_CASES_RO : SPEECH_CASES_EN;
  const global   = isRo ? GLOBAL_COMPARISON_RO : GLOBAL_COMPARISON_EN;

  return (
    <>
      <div className="relative overflow-hidden bg-[#080B12] pt-28 pb-16">
        <ConstitutionAurora />
        <InkParticles count={60} />
        <Image
          src="/images/constitution/national-archives-bill-of-rights.jpg"
          alt="Bill of Rights displayed at the National Archives, containing the First Amendment"
          fill className="object-cover opacity-18" priority sizes="100vw"
          placeholder="blur" blurDataURL={BLUR_PLACEHOLDER}
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080B12]/70 to-[#080B12]" />
        <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: isRo ? "Constituție" : "Constitution", href: "/constitution" },
              { label: isRo ? "Primul Amendament" : "First Amendment" },
            ]}
            className="mb-8"
          />
          <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A84C]">
            {isRo ? "Amendamentul I" : "Amendment I"}
          </p>
          <h1 className="mb-6 font-hero leading-none" style={{ fontSize: "clamp(3rem,7vw,6rem)" }}>
            <span className="block text-[#F5F0E8]">
              {isRo ? "CEA MAI LARGĂ" : "THE BROADEST"}
            </span>
            <span
              className="block"
              style={{
                background: "linear-gradient(135deg, #D4AF6A, #E8C878, #C9A84C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {isRo ? "LIBERTATE DE EXPRIMARE DIN LUME" : "FREE SPEECH ON EARTH"}
            </span>
          </h1>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-[#B8B4AC]">
            {isRo
              ? "America protejează discursul pe care alte națiuni îl incriminează. Arderea steagului. Marșurile neo-naziste. Arta ofensivă. Aceasta nu este o accident — este o filozofie juridică elaborată pe 200 de ani."
              : "America protects speech other nations criminalize. Flag burning. Neo-Nazi marches. Offensive art. This is not an accident — it is a legal philosophy built over 200 years."}
          </p>
        </div>
      </div>

      <div className="bg-[#080B12]">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">

          {/* Original text */}
          <section>
            <div
              className="relative overflow-hidden rounded-2xl border border-[rgba(201,168,76,0.2)] p-8 md:p-10"
              style={{ background: "linear-gradient(168deg, #F9F3E3 0%, #F4EDD8 30%, #EDE4C8 65%, #E8DDB8 100%)" }}
            >
              <p
                className="mb-4 text-center font-body text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: "#8B6A2A" }}
              >
                {isRo ? "Textul Original — Amendamentul I, Ratificat 15 Decembrie 1791" : "Original Text — Amendment I, Ratified December 15, 1791"}
              </p>
              <blockquote
                className="text-center"
                style={{
                  fontFamily: "'EB Garamond','Georgia',serif",
                  fontSize: "clamp(16px,2.5vw,22px)",
                  fontStyle: "italic",
                  lineHeight: "1.8",
                  color: "#2C2416",
                }}
              >
                &ldquo;Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances.&rdquo;
              </blockquote>
            </div>
          </section>

          {/* What it protects */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-[#F5F0E8]">
              {isRo ? "Cinci Libertăți într-o Singură Propoziție" : "Five Freedoms in One Sentence"}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: "🗣️", title: isRo ? "Libertatea de Exprimare" : "Free Speech",    body: isRo ? "Guvernul nu te poate pedepsi pentru că îl critici — chiar dur, chiar ofensiv. Standardul: pericolul iminent de acțiune ilegală." : "Government cannot punish you for criticizing it — even harshly, even offensively. The standard: imminent danger of illegal action." },
                { icon: "⛪", title: isRo ? "Libertatea Religiei" : "Free Religion",       body: isRo ? "Nicio religie de stat și nicio interferență cu credința ta. Motivul pentru care America este paradoxal cea mai religioasă democrație." : "No state religion and no interference with your faith. The reason America is paradoxically the most religious democracy." },
                { icon: "📰", title: isRo ? "Libertatea Presei" : "Free Press",            body: isRo ? "Presa poate publica secrete guvernamentale dacă servesc interesul public. Pentagon Papers (1971): New York Times a publicat împotriva dorințelor Casei Albe." : "The press can publish government secrets if they serve public interest. Pentagon Papers (1971): the Times published against the White House's explicit wishes." },
                { icon: "✊", title: isRo ? "Dreptul la Adunare" : "Free Assembly",        body: isRo ? "Poți protesta, demonstra și advocacy — chiar cauze pe care majoritatea le dezaprobă. Marșuri ale KKK, marșuri neo-naziste, proteste anti-avort — toate protejate." : "You can protest, demonstrate, and advocate — even for causes the majority despises. KKK marches, neo-Nazi marches, anti-abortion protests — all protected." },
                { icon: "📜", title: isRo ? "Dreptul la Petiție" : "Right to Petition",    body: isRo ? "Poți cere guvernului să îți redreseze nemulțumirile. Fundamentul pentru lobby, advocacy civic și contactarea reprezentanților aleși." : "You can petition the government to redress your grievances. The foundation for lobbying, civic advocacy, and contacting elected representatives." },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[rgba(201,168,76,0.12)] bg-[#12181F] p-5"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <p className="font-display text-lg font-semibold text-[#C9A84C]">{item.title}</p>
                  </div>
                  <p className="font-body text-sm leading-relaxed text-[#B8B4AC]">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Key Cases */}
          <section>
            <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">
              {isRo ? "Cazuri Definitorii — Cum S-a Construit Protecția" : "Defining Cases — How the Protection Was Built"}
            </h2>
            <p className="mb-8 font-body text-base text-[#B8B4AC]">
              {isRo
                ? "Primul Amendament nu a apărut pe deplin format în 1791. A fost sculptat caz cu caz, pe 100 de ani, adesea prin hotărâri judecătorești neașteptate."
                : "The First Amendment did not emerge fully formed in 1791. It was sculpted case by case, over 100 years, often through unexpected rulings."}
            </p>
            <div className="space-y-3">
              {cases.map((c, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-2xl border border-[rgba(201,168,76,0.1)] bg-[#12181F]"
                >
                  <div className="flex gap-4 p-5">
                    <div className="shrink-0 rounded-xl border border-[rgba(201,168,76,0.25)] bg-[rgba(201,168,76,0.06)] px-3 py-2 text-center min-w-[64px]">
                      <p className="font-display text-lg font-semibold text-[#C9A84C]">{c.year}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="mb-1 font-body text-sm font-bold text-[#F5F0E8]">{c.name}</p>
                      <p className="mb-2 font-body text-xs italic text-[#C9A84C]">{c.ruling}</p>
                      <p className="font-body text-xs leading-relaxed text-[#B8B4AC]">{c.significance}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Global comparison */}
          <section>
            <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">
              {isRo ? "America vs. Lumea: Libertatea de Exprimare" : "America vs. The World: Free Speech"}
            </h2>
            <p className="mb-8 font-body text-base text-[#B8B4AC]">
              {isRo
                ? "Fiecare democrație protejează libertatea de exprimare în constituția sa. Nicio altă democrație nu o protejează la fel de larg ca America."
                : "Every democracy protects free speech in its constitution. No other democracy protects it as broadly as America."}
            </p>
            <div className="space-y-4">
              {global.map((g, i) => (
                <div
                  key={i}
                  className={`overflow-hidden rounded-2xl border p-5 ${
                    g.country === "United States" || g.country === "Statele Unite"
                      ? "border-[rgba(201,168,76,0.4)] bg-[rgba(201,168,76,0.06)]"
                      : "border-white/8 bg-[#12181F]"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl shrink-0">{g.flag}</span>
                    <div>
                      <p className={`mb-1 font-body text-sm font-bold ${g.country === "United States" || g.country === "Statele Unite" ? "text-[#C9A84C]" : "text-[#F5F0E8]"}`}>
                        {g.country}
                      </p>
                      <p className="mb-2 font-body text-xs italic text-[#C9A84C]/80">{g.rule}</p>
                      <p className="font-body text-xs leading-relaxed text-[#B8B4AC]">{g.context}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <QuoteBlock
            quote={isRo
              ? "\"Dacă există o lege imperativă în constituția noastră, este că niciun oficial — înalt sau mărunt — nu poate prescrie ce va fi ortodox în politică, naționalism, religie sau alte chestiuni de opinie, sau forța cetățenilor să-și mărturisească credința prin cuvinte sau acte.\""
              : "\"If there is any fixed star in our constitutional constellation, it is that no official, high or petty, can prescribe what shall be orthodox in politics, nationalism, religion, or other matters of opinion, or force citizens to confess by word or act their faith therein.\""}
            attribution="Justice Robert Jackson"
            title={isRo ? "West Virginia State Board of Education v. Barnette, 1943" : "West Virginia State Board of Education v. Barnette, 1943"}
            variant="dark"
          />

          <div className="flex items-center justify-between border-t border-white/8 pt-8">
            <Link href="/constitution/bill-of-rights" className="font-body text-sm text-[#6B6860] hover:text-[#F5F0E8] transition-colors">
              ← {isRo ? "Declarația Drepturilor" : "Bill of Rights"}
            </Link>
            <Link href="/constitution/second-amendment" className="font-body text-sm font-semibold text-[#C9A84C] hover:text-[#E8C878] transition-colors">
              {isRo ? "Al Doilea Amendament →" : "Second Amendment →"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
