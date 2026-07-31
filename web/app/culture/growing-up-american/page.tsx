import type { Metadata } from "next";
import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { MacroStyles, MacroHero } from "@/components/economy/EconomyAnimations";
import { CultureStyles, CultureParallaxDivider } from "@/components/culture/CulturePageComponents";
import { SITE_IMAGES } from "@/lib/site-images";
import { ToyCanon } from "@/components/culture/ToyCanon";
import { ToySymbols } from "@/components/culture/ToySymbols";
import { SchoolSuppliesCanon } from "@/components/culture/SchoolSuppliesCanon";
import { HighSchoolTropes } from "@/components/culture/HighSchoolTropes";

export const metadata: Metadata = {
  title: "Growing Up American | The American Operating System",
  description:
    "The texture of an American childhood and adolescence: the Hasbro toy canon, why toy symbols are frozen in the Victorian era, the big-seven school supplies, and the clichés of the Hollywood high school.",
  alternates: { canonical: "/culture/growing-up-american" },
};

export default async function GrowingUpAmericanPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  return (
    <>
      <MacroStyles />
      <CultureStyles />

      <MacroHero
        imageSrc={SITE_IMAGES.culture.schoolHallway}
        imageAlt="A hallway in a modern American public high school"
        eyebrow={isRo ? "JUCĂRII · ȘCOALĂ · ADOLESCENȚĂ" : "TOYS · SCHOOL · ADOLESCENCE"}
        titleLead={isRo ? "COPILĂRIA" : "GROWING UP"}
        titleAccent={isRo ? "AMERICANĂ" : "AMERICAN"}
        description={
          isRo
            ? "Textura unei copilării și adolescențe americane: canonul de jucării Hasbro, simbolurile de jucării înghețate în epoca victoriană, rechizitele celor șapte și clișeele liceului de la Hollywood."
            : "The texture of an American childhood and adolescence: the Hasbro toy canon, the toy symbols frozen in the Victorian era, the big-seven school supplies, and the clichés of the Hollywood high school."
        }
        stats={[
          { value: "1923", label: isRo ? "Fondarea Hasbro" : "Hasbro founded" },
          { value: "1903", label: isRo ? "Se naște Crayola" : "Crayola is born" },
          { value: "1M+", label: isRo ? "Fotbaliști de liceu" : "HS football players" },
        ]}
      />

      <div className="culture-bg text-[#F5EDD8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-20 pb-24">
          <nav className="flex items-center gap-1.5 font-body text-sm text-white/50 tracking-wide mb-14">
            <Link href="/" className="hover:text-white transition-colors flex items-center"><Home className="h-3.5 w-3.5" /></Link>
            <ChevronRight className="h-3 w-3 opacity-30 shrink-0" />
            <Link href="/culture" className="hover:text-white transition-colors">{isRo ? "Cultură" : "Culture"}</Link>
            <ChevronRight className="h-3 w-3 opacity-30 shrink-0" />
            <span className="text-white font-medium">{isRo ? "Copilăria americană" : "Growing Up American"}</span>
          </nav>
          <div className="max-w-3xl">
            <blockquote className="font-editorial text-2xl md:text-[2.1rem] italic text-[#F5EDD8]/95 leading-[1.4] mb-8 pl-6 border-l-2 border-[#E8391B]">
              &ldquo;{isRo
                ? "Puține tradiții culturale au peste 150 de ani. Aproape totul în copilăria americană datează fie din inovațiile de la sfârșitul secolului XIX, fie din epoca postbelică."
                : "Very few cultural traditions are more than 150 years old. Almost everything in the American childhood dates to either the innovations of the late 19th century or the postwar era."}&rdquo;
            </blockquote>
            <p className="font-editorial text-lg text-[#F5EDD8]/70 leading-relaxed">
              {isRo
                ? "De la jucăriile pe care le adunăm și simbolurile prin care le reprezentăm, la rechizitele pe care le cumpărăm și clișeele liceului pe care le exportăm în toată lumea, copilăria americană este un canon în sine, construit în cea mai mare parte în două explozii de invenție și abundență."
                : "From the toys we collect and the symbols we use to picture them, to the supplies we shop for and the high-school clichés we export worldwide, the American childhood is a canon of its own, built mostly in two bursts of invention and abundance."}
            </p>
          </div>
        </div>

        <div className="h-16 w-full gradient-dark-to-cream" />

        {/* CREAM: The American Toy Canon */}
        <section className="relative culture-cream-bg text-[#0C0907] pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-parchment-texture opacity-30 pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 pt-20">
            <div className="text-center mb-16">
              <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#0C0907]/45 font-bold">
                {isRo ? "IMPERIUL UNEI SINGURE COMPANII" : "ONE COMPANY'S EMPIRE"}
              </p>
              <h2 className="culture-text-hero text-[#0C0907] mt-4">
                {isRo ? "CANONUL JUCĂRIILOR AMERICANE" : "THE AMERICAN TOY CANON"}
              </h2>
              <p className="mx-auto mt-6 max-w-2xl font-editorial text-lg text-[#0C0907]/60">
                {isRo
                  ? "Opt dintre cele mai iconice jucării americane moderne, și povestea din spatele lor: aproape toate au ajuns proprietatea unei singure companii din Rhode Island, Hasbro. Apasă pe oricare."
                  : "Eight of the most iconic modern American toys, and the story underneath them: nearly all became the property of one Rhode Island company, Hasbro. Click any of them."}
              </p>
              <div className="w-24 h-px bg-[#0C0907]/15 mx-auto mt-8" />
            </div>
            <ToyCanon />
          </div>
        </section>

        <CultureParallaxDivider imageSrc={SITE_IMAGES.culture.growingUpToyStore} alt="A classic American toy store aisle" heightClassName="h-[42vh]" />

        {/* CREAM: Why toy symbols are old & weird */}
        <section className="relative culture-cream-bg text-[#0C0907] pb-24 overflow-hidden border-t border-[#0C0907]/5">
          <div className="absolute inset-0 bg-parchment-texture opacity-30 pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 pt-20">
            <div className="text-center mb-16">
              <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#0C0907]/45 font-bold">
                {isRo ? "ÎNGHEȚATE ÎN EPOCA VICTORIANĂ" : "FROZEN IN THE VICTORIAN ERA"}
              </p>
              <h2 className="culture-text-hero text-[#0C0907] mt-4">
                {isRo ? "DE CE SUNT SIMBOLURILE DE JUCĂRII AȘA VECHI" : "WHY TOY SYMBOLS ARE SO OLD"}
              </h2>
              <p className="mx-auto mt-6 max-w-2xl font-editorial text-lg text-[#0C0907]/60">
                {isRo
                  ? "Când desenăm „o jucărie”, într-un desen animat, în clip art, pe o decorațiune de Crăciun, folosim un set înghețat și ciudat de datat. Vina este a Crăciunului victorian. Apasă pe oricare simbol."
                  : "When we picture \"a toy\" in a cartoon, in clip art, on a Christmas ornament, we reach for a frozen, weirdly dated set. The culprit is Victorian Christmas. Click any symbol."}
              </p>
              <div className="w-24 h-px bg-[#0C0907]/15 mx-auto mt-8" />
            </div>
            <ToySymbols />
          </div>
        </section>

        <CultureParallaxDivider imageSrc={SITE_IMAGES.culture.growingUpClassroom} alt="A modern American public high school classroom" heightClassName="h-[42vh]" />

        {/* CREAM: The School Supplies Canon */}
        <section className="relative culture-cream-bg text-[#0C0907] pb-24 overflow-hidden border-t border-[#0C0907]/5">
          <div className="absolute inset-0 bg-parchment-texture opacity-30 pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 pt-20">
            <div className="text-center mb-16">
              <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#0C0907]/45 font-bold">
                {isRo ? "IMPORTATE DIN EUROPA, AJUSTATE AICI" : "IMPORTED FROM EUROPE, TWEAKED HERE"}
              </p>
              <h2 className="culture-text-hero text-[#0C0907] mt-4">
                {isRo ? "CANONUL RECHIZITELOR" : "THE SCHOOL SUPPLIES CANON"}
              </h2>
              <p className="mx-auto mt-6 max-w-2xl font-editorial text-lg text-[#0C0907]/60">
                {isRo
                  ? "Emoția cumpărăturilor de rechizite ascunde șapte obiecte cu istorii europene lungi, de la grafitul englezesc la pixul francez. Apasă pe oricare."
                  : "The thrill of shopping for school supplies hides seven objects with long European histories, from English graphite to the French ballpoint. Click any of them."}
              </p>
              <div className="w-24 h-px bg-[#0C0907]/15 mx-auto mt-8" />
            </div>
            <SchoolSuppliesCanon />
          </div>
        </section>

        <CultureParallaxDivider imageSrc={SITE_IMAGES.culture.growingUpFootballNight} alt="A Friday-night high school football stadium under the lights" heightClassName="h-[42vh]" />

        {/* CREAM: The High School Clichés */}
        <section className="relative culture-cream-bg text-[#0C0907] pb-28 overflow-hidden border-t border-[#0C0907]/5">
          <div className="absolute inset-0 bg-parchment-texture opacity-30 pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 pt-20">
            <div className="text-center mb-16">
              <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#0C0907]/45 font-bold">
                {isRo ? "CEL MAI EXPORTAT DECOR AL AMERICII" : "AMERICA'S MOST-EXPORTED SETTING"}
              </p>
              <h2 className="culture-text-hero text-[#0C0907] mt-4">
                {isRo ? "CLIȘEELE LICEULUI" : "THE HIGH SCHOOL CLICHÉS"}
              </h2>
              <p className="mx-auto mt-6 max-w-2xl font-editorial text-lg text-[#0C0907]/60">
                {isRo
                  ? "Liceul american rulează pe o listă fixă de clișee, exportate în toată lumea prin filme și seriale. Fiecare figură-tip ascunde o istorie reală. Apasă pe oricare."
                  : "American high school runs on a fixed roster of clichés, exported worldwide through film and TV. Each stock figure hides a real history. Click any of them."}
              </p>
              <div className="w-24 h-px bg-[#0C0907]/15 mx-auto mt-8" />
            </div>

            <div className="mx-auto mb-16 max-w-3xl space-y-6 font-editorial text-lg leading-relaxed text-[#0C0907]/75">
              <p>
                {isRo
                  ? "Liceul american a evoluat din academiile de la începutul secolului XIX, unde părinții bogați își trimiteau băieții câțiva ani înainte de facultate. La mijlocul anilor 1800, reformatori inspirați de Germania au introdus sortarea pe vârste pe care o știm azi: școala elementară, apoi liceul de patru ani, apoi universitatea. Până la începutul secolului XX, liceul devenise parte a sistemului public prin care treceau toți copiii, iar legile muncii și trecerea de la o economie agricolă au făcut ca elevii să rămână în școală până pe la 18 ani."
                  : "American high school evolved out of early-19th-century academies, where wealthy parents sent their boys for a few years before college. In the mid-1800s, German-inspired reformers introduced the age-sorting we know today: elementary school, then a four-year secondary school, then university. By the early 20th century high school had become part of the public system every child passed through, and child-labor laws and the move off the farm kept teenagers in school until around 18."}
              </p>
              <p>
                {isRo
                  ? "Adolescenții boom-ului de după al Doilea Război Mondial au fost prima generație cu o adolescență stabilă și prima vizată ca demografie de consum aparte. Divertismentul timpuriu evita școala ca fiind plictisitoare, dar până în anii 1980 cineaștii boomeri au făcut din liceu decorul american prin excelență al maturizării, uneori pentru râs (Fast Times at Ridgemont High), alteori mai profund (filmele lui John Hughes), iar la TV de la Saved by the Bell la Degrassi. Densitatea acestor povești a produs un repertoriu fix de eroi, ticăloși și conflicte, îmbrățișat mai târziu post-ironic de High School Musical și Glee. Acesta este repertoriul de mai jos."
                  : "The teenagers of the postwar baby boom were the first generation with a stable adolescence and the first targeted as a distinct consumer demographic. Early entertainment avoided school as boring, but by the 1980s boomer filmmakers made high school the definitive American coming-of-age setting, sometimes for laughs (Fast Times at Ridgemont High), sometimes more deeply (the films of John Hughes), and on TV from Saved by the Bell to Degrassi. The density of those stories bred a fixed roster of heroes, villains and conflicts, later embraced post-ironically by High School Musical and Glee. That roster is the deck below."}
              </p>
            </div>

            <HighSchoolTropes />
          </div>
        </section>

        <div className="h-16 w-full gradient-cream-to-dark" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between border-t border-white/10 pt-12 font-body">
            <a href="/culture/english-language" className="text-xs uppercase tracking-widest text-[#F5EDD8]/50 hover:text-white transition-colors">
              {isRo ? "← Înapoi la Limba Engleză" : "← Back to English Language"}
            </a>
            <a href="/culture/entertainment" className="text-xs uppercase tracking-widest text-glory-gold hover:text-white transition-colors">
              {isRo ? "Film & Divertisment →" : "Film & Entertainment →"}
            </a>
          </div>
        </div>

        <div className="culture-bg">
          <AskAmericaCTA
            locale={locale}
            descriptionEn="Ask the AI Oracle about the rise of Hasbro, why Play-Doh started as wallpaper cleaner, the history of the yellow pencil, or how American high school became the world's favorite movie setting."
            descriptionRo="Întreabă Oracolul AI despre ascensiunea Hasbro, de ce Play-Doh a început ca detergent de tapet, istoria creionului galben sau cum a devenit liceul american decorul preferat de film al lumii."
          />
        </div>
      </div>
    </>
  );
}
