import type { Metadata } from "next";
import { getServerLocale } from "@/lib/i18n/server";
import { getCultureHollywood } from "@/lib/data/culture-data";
import { GALLERY_IMAGES } from "@/lib/data/gallery";
import { FilmAndStorytellingClient } from "@/components/culture/FilmAndStorytellingClient";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { MacroStyles } from "@/components/economy/EconomyAnimations";
import { FilmHero } from "@/components/culture/FilmHero";
import { CultureStyles } from "@/components/culture/CulturePageComponents";
import { SITE_IMAGES } from "@/lib/site-images";
import { PhotoLightboxGrid } from "@/components/shared/PhotoLightboxGrid";
import Image from "next/image";
import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Film, Storytelling & Entertainment | The American Operating System",
  description:
    "Hollywood, Netflix, Disney, and the full spectrum of American cultural output — cinematic epochs, legendary auteurs, global streaming dominance, and the theme park industrial complex.",
};

export default async function FilmAndEntertainmentPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const data = getCultureHollywood(locale);

  // Interactive poster vault — movie posters only (clickable lightbox with director/tech details)
  const filmImages = GALLERY_IMAGES.filter(
    (img) => img.category === "Cinema" && img.path.includes("Movie Posters")
  );

  // Music albums — separate from movie posters to avoid duplication
  const musicArchive = [
    { src: SITE_IMAGES.culture.vaultMilesDavis,    title: "Miles Davis",    sub: "Kind of Blue" },
    { src: SITE_IMAGES.culture.vaultMichaelJackson,title: "Michael Jackson", sub: "Thriller" },
    { src: SITE_IMAGES.culture.vaultNirvana,        title: "Nirvana",        sub: "Nevermind" },
    { src: SITE_IMAGES.culture.vaultJohnnyCash,     title: "Johnny Cash",    sub: "Folsom Prison" },
    { src: SITE_IMAGES.culture.vault50Cent,         title: "50 Cent",        sub: "Get Rich..." },
    { src: SITE_IMAGES.culture.vaultEminem,         title: "Eminem",         sub: "MMLP" },
  ];

  const streamingPlatforms = [
    {
      name: "Netflix",
      stat: "260M+",
      statLabel: isRo ? "Abonați Globali" : "Global Subscribers",
      detail: isRo
        ? "Conținut în 45 de limbi, 190 de țări. Cel mai mare exportator de narațiuni din lume."
        : "Content in 45 languages, 190 countries. The world's largest exporter of narrative.",
    },
    {
      name: "YouTube",
      stat: "2.7B",
      statLabel: isRo ? "Utilizatori Lunari" : "Monthly Users",
      detail: isRo
        ? "Platforma video a omenirii — creată, finanțată și construită în Silicon Valley."
        : "Humanity's video platform — built, funded, and engineered in Silicon Valley.",
    },
    {
      name: "Disney+",
      stat: "150M+",
      statLabel: isRo ? "Abonați" : "Subscribers",
      detail: isRo
        ? "Marvel, Star Wars, Pixar, National Geographic — proprietate intelectuală americană globalizată."
        : "Marvel, Star Wars, Pixar, National Geographic — American IP globalized at scale.",
    },
  ];

  const americanIcons = [
    { src: SITE_IMAGES.culture.waltDisney,          name: "Walt Disney",          note: isRo ? "Creator al Imperiului Divertismentului" : "Creator of the Entertainment Empire" },
    { src: SITE_IMAGES.culture.marilynMonroe,       name: "Marilyn Monroe",       note: isRo ? "Icoana Hollywood-ului de Aur" : "Golden Hollywood Icon" },
    { src: SITE_IMAGES.culture.markTwain,           name: "Mark Twain",           note: isRo ? "Vocea Americii Literare" : "The Voice of Literary America" },
    { src: SITE_IMAGES.culture.martinLutherKing,    name: "Martin Luther King Jr.", note: isRo ? "«I Have a Dream» · 1963" : "\"I Have a Dream\" · 1963" },
    { src: SITE_IMAGES.culture.arnoldSchwarzenegger,name: "Arnold Schwarzenegger", note: isRo ? "Terminator · Guvernator · Legendă" : "Terminator · Governor · Legend" },
    { src: SITE_IMAGES.culture.elvisPresley,        name: "Elvis Presley",        note: isRo ? "Regele Rock and Roll-ului" : "The King of Rock and Roll" },
  ];

  const magazineVault = [
    { src: SITE_IMAGES.culture.vaultLifeMarilyn,      title: "LIFE",      sub: "Marilyn Monroe · 1953" },
    { src: SITE_IMAGES.culture.vaultLifeDisney,       title: "LIFE",      sub: "Disney World · 1971" },
    { src: SITE_IMAGES.culture.vaultMarilynAvantGarde,title: "Avant Garde",sub: "Marilyn Monroe · 1968" },
    { src: SITE_IMAGES.culture.vaultTvGuideTwinPeaks, title: "TV Guide",  sub: "Twin Peaks · 1990" },
    { src: SITE_IMAGES.culture.vaultTime911,          title: "TIME",      sub: "9/11 · 2001" },
    { src: SITE_IMAGES.culture.vaultFortune1931,      title: "Fortune",   sub: "Aviation · 1931" },
  ];

  const culturalEras = [
    { src: SITE_IMAGES.culture.era1920s, label: isRo ? "Anii 1920 · Jazz Age"         : "1920s · Jazz Age" },
    { src: SITE_IMAGES.culture.era1950s, label: isRo ? "Anii 1950 · Hollywood de Aur"  : "1950s · Golden Hollywood" },
    { src: SITE_IMAGES.culture.era1970s, label: isRo ? "Anii 1970 · Fast Food & Rock"  : "1970s · Fast Food & Rock" },
    { src: SITE_IMAGES.culture.era1990s, label: isRo ? "Anii 1990 · Era Internetului"   : "1990s · The Internet Age" },
    { src: SITE_IMAGES.culture.era2020s, label: isRo ? "Anii 2020 · AI & Streaming"     : "2020s · AI & Streaming" },
  ];

  const arcadeVault = [
    { src: SITE_IMAGES.culture.vaultAsteroids1979, title: "Asteroids", sub: "Atari · 1979" },
    { src: SITE_IMAGES.culture.vaultPacMan1980,    title: "Pac-Man",   sub: "Namco · 1980" },
  ];

  return (
    <div className="culture-bg text-[#F5EDD8] min-h-screen relative overflow-hidden">
      <MacroStyles />
      <CultureStyles />

      {/* ── Single Hero (video) ─────────────────────────────────────────── */}
      <FilmHero
        videoSrc="/videos/library/Culture/every-living-breathing-moment.mp4#t=37"
        eyebrow={isRo ? "FILM · STORYTELLING · ENTERTAINMENT" : "FILM · STORYTELLING · ENTERTAINMENT"}
        titleLead={isRo ? "FABRICA DE" : "THE DREAM"}
        titleAccent={isRo ? "VISE" : "FACTORY"}
        description={
          isRo
            ? "Hollywood a generat codul vizual prin care planeta \u00ee\u0219i spune pove\u0219tile. Netflix, Disney \u0219i YouTube dictează timpul de ecran global — complet \u00een afara controlului de stat."
            : "Hollywood generated the visual syntax for human dreaming. Netflix, Disney, and YouTube now dictate global screen time — entirely outside state control."
        }
        stats={[
          { value: "$120B",  label: isRo ? "Box Office Global"      : "Global Box Office" },
          { value: "260M+",  label: isRo ? "Abona\u021bi Netflix"   : "Netflix Subscribers" },
          { value: "190",    label: isRo ? "\u0162\u0103ri Acoperite" : "Countries Reached" },
        ]}
      />

      {/* ── Breadcrumb ──────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-16 pb-0">
        <nav aria-label={isRo ? "Fir de navigare" : "Breadcrumb"} className="flex items-center gap-1.5 font-body text-sm text-white/50 tracking-wide">
          <Link href="/" className="hover:text-white transition-colors flex items-center"><Home className="h-3.5 w-3.5" /></Link>
          <ChevronRight className="h-3 w-3 opacity-30 shrink-0" />
          <Link href="/culture" className="hover:text-white transition-colors">{isRo ? "Cultură" : "Culture"}</Link>
          <ChevronRight className="h-3 w-3 opacity-30 shrink-0" />
          <span className="text-white font-medium">{isRo ? "Film & Divertisment" : "Film & Entertainment"}</span>
        </nav>
      </div>

      {/* ── Editorial Thesis ────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-14 pb-24">
        <div className="grid gap-12 lg:grid-cols-3 items-start">
          <div className="lg:col-span-2">
            <blockquote className="font-editorial text-2xl md:text-[2.1rem] italic text-[#F5EDD8]/95 leading-[1.4] mb-8 pl-6 border-l-2 border-[#E8391B]">
              &ldquo;{data.pullQuote}&rdquo;
            </blockquote>
            <p className="font-editorial text-lg text-[#F5EDD8]/70 leading-relaxed mb-4">{data.body}</p>
            <p className="font-editorial text-lg text-[#F5EDD8]/70 leading-relaxed">
              {isRo
                ? "O singură companie, cum ar fi Netflix, cheltuiește peste 15 miliarde de dolari anual pe conținut — o cifră care depășește bugetele întregi de cultură ale majorității națiunilor europene adunate la un loc."
                : "A single company like Netflix spends over $15 billion annually on content — a figure that dwarfs the entire cultural budgets of most European nations combined."}
            </p>
          </div>
          <div className="culture-glass rounded-2xl p-6 border border-white/5 space-y-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-b from-glory-gold/2 to-transparent pointer-events-none" />
            {[
              { value: "$15B",  label: isRo ? "Buget conținut Netflix anual"   : "Netflix Annual Content Budget" },
              { value: "90%+",  label: isRo ? "Cotă piață internațională film"  : "US International Film Market Share" },
              { value: "$30B+", label: isRo ? "Încasări totale MCU"             : "Total MCU Gross" },
            ].map((s, i) => (
              <div key={i} className="border-b border-white/5 pb-4 last:border-0 last:pb-0 relative z-10">
                <div className="font-macro-display text-4xl font-bold text-white tracking-tight group-hover:text-glory-gold transition-colors duration-300">{s.value}</div>
                <div className="text-xs text-glory-gold uppercase tracking-wider mt-1 font-body">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── dark → cream ────────────────────────────────────────────────── */}
      <div className="h-16 w-full gradient-dark-to-cream" />

      {/* ── CREAM: Cinematic Epochs + Visual Grammar (Film content) ─────── */}
      {/* Rendered by the client component (no hero, no bottom nav) */}
      <FilmAndStorytellingClient
        filmImages={filmImages}
        isRo={isRo}
        hollywoodData={data}
        showHero={false}
        showBottomNav={false}
      />

      {/* ── CREAM: Streaming Platforms ───────────────────────────────────── */}
      <section className="relative culture-cream-bg text-[#0C0907] py-24 md:py-28 overflow-hidden border-t border-[#0C0907]/5">
        <div className="absolute inset-0 bg-parchment-texture opacity-30 pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
          <div className="text-center mb-16">
            <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#0C0907]/45 font-bold">
              {isRo ? "DOMINANȚĂ STREAMING" : "STREAMING DOMINANCE"}
            </p>
            <h2 className="culture-text-hero text-[#0C0907] mt-4">{isRo ? "PLATFORMELE ATENȚIEI" : "THE ATTENTION PLATFORMS"}</h2>
            <div className="w-24 h-px bg-[#0C0907]/15 mx-auto mt-8" />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {streamingPlatforms.map((p, i) => (
              <div key={i} className="bg-white/40 backdrop-blur-md rounded-2xl p-8 border border-[#0C0907]/5 shadow-[0_8px_30px_rgb(12,9,7,0.03)] hover:shadow-[0_20px_50px_rgb(12,9,7,0.08)] hover:-translate-y-1.5 transition-all duration-500">
                <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#E8391B] mb-4">{p.name}</p>
                <p className="font-macro-display text-5xl font-black text-[#0C0907] tracking-tight mb-1">{p.stat}</p>
                <p className="font-body text-xs font-bold uppercase tracking-wider text-[#0C0907]/50 mb-5">{p.statLabel}</p>
                <p className="font-editorial text-sm text-[#0C0907]/70 leading-relaxed">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CREAM: Theme Parks ──────────────────────────────────────────── */}
      <section className="relative culture-cream-bg text-[#0C0907] pb-28 md:pb-36 overflow-hidden border-t border-[#0C0907]/5">
        <div className="absolute inset-0 bg-parchment-texture opacity-30 pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 pt-24">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#0C0907]/45 font-bold mb-4">
                {isRo ? "DIVERTISMENT EXPERIENȚIAL" : "EXPERIENTIAL ENTERTAINMENT"}
              </p>
              <h3 className="font-editorial text-3xl md:text-4xl font-bold text-[#0C0907] leading-tight mb-6">
                {isRo ? "Complexul Industrial al Parcurilor Tematice" : "The Theme Park Industrial Complex"}
              </h3>
              <p className="font-editorial text-base text-[#0C0907]/70 leading-relaxed mb-4">
                {isRo
                  ? "America de Nord domină piața mondială a parcurilor tematice cu o cotă de venituri de 37% în 2025. Este exportul industriei de proprietate intelectuală americane — Marvel, Star Wars, Pixar — transpus în realitate fizică."
                  : "North America dominates the global theme park market with approximately 37% revenue share in 2025. It is American cultural IP — Marvel, Star Wars, Pixar — built into physical, experiential reality at premium prices."}
              </p>
              <p className="font-editorial text-base text-[#0C0907]/70 leading-relaxed">
                {isRo
                  ? "Cele 12 parcuri Disney atrag singure peste 34% din vizitatorii mondiali — 140 de milioane anual. Florida Centrală a înregistrat 75 de milioane de vizitatori în 2024, generând aproape 95 de miliarde de dolari impact economic."
                  : "Disney's 12 parks alone capture over 34% of global theme park attendance — 140 million visitors annually. Central Florida recorded 75 million visitors in 2024 generating nearly $95 billion in total economic impact."}
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { value: "37%",  label: isRo ? "Cotă piață globală" : "Global Market Share" },
                  { value: "75M",  label: isRo ? "Vizitatori Florida" : "Florida Visitors" },
                  { value: "$95B", label: isRo ? "Impact economic Orlando" : "Orlando Economic Impact" },
                ].map((s, i) => (
                  <div key={i} className="border border-[#0C0907]/10 rounded-xl p-4 text-center bg-white/30">
                    <p className="font-macro-display text-2xl font-black text-[#0C0907]">{s.value}</p>
                    <p className="font-body text-[9px] uppercase tracking-wider text-[#0C0907]/50 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-16/10 overflow-hidden rounded-2xl border border-[#0C0907]/10 shadow-[0_20px_50px_rgb(12,9,7,0.12)] group">
              <Image src={SITE_IMAGES.culture.disneyWorld} alt="Disney World Cinderella Castle Orlando" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      {/* ── cream → dark ────────────────────────────────────────────────── */}
      <div className="h-16 w-full gradient-cream-to-dark" />

      {/* ── DARK: American Icons ─────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-0">
        <section className="mb-24">
          <p className="font-body text-xs uppercase tracking-[0.25em] text-glory-gold text-center mb-4 font-semibold">
            {isRo ? "AMERICANII CARE AU SCHIMBAT LUMEA" : "AMERICANS WHO CHANGED THE WORLD"}
          </p>
          <h2 className="font-macro-display text-3xl font-bold text-center mb-10 text-white uppercase tracking-tight">
            {isRo ? "Iconele Americane" : "American Icons"}
          </h2>
          <PhotoLightboxGrid
            gridClassName="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
            sizes="(max-width: 768px) 50vw, 16vw"
            photos={americanIcons.map((icon) => ({
              src: icon.src,
              alt: `${icon.name} — ${icon.note}`,
              caption: icon.name,
              aspect: "3/4",
              objectClassName: "object-top",
            }))}
          />
        </section>

        {/* ── DARK: Music Archive (albums only — film posters are in the interactive vault above) ── */}
        <section className="mb-24">
          <p className="font-body text-xs uppercase tracking-[0.25em] text-glory-gold text-center mb-4 font-semibold">
            {isRo ? "ARHIVA MUZICALĂ · ALBUME DEFINITORII" : "MUSIC ARCHIVE · DEFINING ALBUMS"}
          </p>
          <h2 className="font-macro-display text-3xl font-bold text-center mb-12 text-white uppercase tracking-tight">
            {isRo ? "Sunetul Americii" : "The Sound of America"}
          </h2>
          <PhotoLightboxGrid
            gridClassName="grid grid-cols-3 sm:grid-cols-6 gap-3"
            sizes="16vw"
            photos={musicArchive.map((v) => ({
              src: v.src,
              alt: `${v.title} — ${v.sub}`,
              caption: `${v.title} · ${v.sub}`,
              aspect: "1/1",
            }))}
          />
        </section>

        {/* ── DARK: Magazine Archive ──────────────────────────────────────── */}
        <section className="mb-24">
          <p className="font-body text-xs uppercase tracking-[0.25em] text-glory-gold text-center mb-4 font-semibold">
            {isRo ? "ARHIVA REVISTELOR ICONICE" : "ICONIC MAGAZINE ARCHIVE"}
          </p>
          <PhotoLightboxGrid
            gridClassName="grid grid-cols-3 sm:grid-cols-6 gap-3"
            sizes="16vw"
            photos={magazineVault.map((m) => ({
              src: m.src,
              alt: `${m.title} · ${m.sub}`,
              caption: `${m.title} · ${m.sub}`,
              aspect: "3/4",
            }))}
          />
        </section>

        {/* ── DARK: Cultural Eras ─────────────────────────────────────────── */}
        <section className="mb-24">
          <p className="font-body text-xs uppercase tracking-[0.25em] text-glory-gold text-center mb-4 font-semibold">
            {isRo ? "EVOLUȚIA CULTURALĂ" : "CULTURAL EVOLUTION"}
          </p>
          <h2 className="font-macro-display text-3xl font-bold text-center mb-10 text-white uppercase tracking-tight">
            {isRo ? "Erele Americii" : "The American Eras"}
          </h2>
          <PhotoLightboxGrid
            gridClassName="grid grid-cols-2 md:grid-cols-5 gap-3"
            sizes="(max-width: 768px) 50vw, 20vw"
            photos={culturalEras.map((era) => ({
              src: era.src,
              alt: era.label,
              caption: era.label,
              aspect: "1/1",
            }))}
          />
        </section>

        {/* ── DARK: Gaming ────────────────────────────────────────────────── */}
        <section className="mb-24">
          <p className="font-body text-xs uppercase tracking-[0.25em] text-glory-gold text-center mb-4 font-semibold">
            {isRo ? "JOCURI VIDEO · INDUSTRIA DE 200 MILIARDE $" : "VIDEO GAMES · THE $200B INDUSTRY"}
          </p>
          <h2 className="font-macro-display text-3xl font-bold text-center mb-6 text-white uppercase tracking-tight">
            {isRo ? "America A Inventat Jocul" : "America Invented The Game"}
          </h2>
          <p className="font-editorial text-base text-[#F5EDD8]/70 leading-relaxed text-center max-w-2xl mx-auto mb-10">
            {isRo
              ? "Atari, Xbox, PlayStation, Nintendo of America — industria globală a jocurilor video a fost construită pe codul american. Asteroids (1979) și Pac-Man (1980) au transformat arcadele în cultură de masă. Azi, gaming depășește Hollywood și muzica împreună."
              : "Atari, Xbox, PlayStation, Nintendo of America — the global video game industry was built on American code. Asteroids (1979) and Pac-Man (1980) turned arcades into mass culture. Today, gaming surpasses Hollywood and music combined."}
          </p>
          <PhotoLightboxGrid
            gridClassName="grid grid-cols-2 gap-4 max-w-lg mx-auto mb-8"
            sizes="250px"
            photos={arcadeVault.map((g) => ({
              src: g.src,
              alt: `${g.title} · ${g.sub}`,
              caption: `${g.title} · ${g.sub}`,
              aspect: "3/4",
            }))}
          />
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { value: "$200B+", label: isRo ? "Valoare Industrie" : "Industry Value" },
              { value: "3.2B",   label: isRo ? "Jucători Globali"  : "Global Gamers" },
              { value: "1972",   label: isRo ? "Atari Fondată"     : "Atari Founded" },
            ].map((stat, i) => (
              <div key={i} className="border border-white/10 rounded-xl p-4 text-center">
                <p className="font-macro-display text-2xl font-black text-[#E8B923]">{stat.value}</p>
                <p className="font-body text-[9px] uppercase tracking-wider text-white/50 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Bottom Nav ──────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between border-t border-white/10 pt-12 mb-0 font-body">
          <a href="/culture/sports" className="text-xs uppercase tracking-widest text-[#F5EDD8]/50 hover:text-white transition-colors">
            {isRo ? "← Înapoi la Sport" : "← Back to Sports"}
          </a>
          <a href="/culture/companies-brands" className="text-xs uppercase tracking-widest text-glory-gold hover:text-white transition-colors">
            {isRo ? "Companii și Branduri →" : "Companies & Brands →"}
          </a>
        </div>
      </div>

      {/* ── AskAmerica CTA ──────────────────────────────────────────────── */}
      <AskAmericaCTA
        locale={locale}
        descriptionEn="Ask the AI Oracle about Hollywood's cinematic epochs, Netflix's global reach, Disney's theme park empire, legendary directors, or how American storytelling became the world's shared dream language."
        descriptionRo="Întreabă Oracolul AI despre epocile cinematografice Hollywood, dominanța Netflix, imperiul parcurilor Disney, regizorii legendari sau cum povestirea americană a devenit limbajul comun al viselor lumii."
      />
    </div>
  );
}
