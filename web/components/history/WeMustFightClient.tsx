"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

const SPEECH_EN = [
  {
    text: "We cannot buy our security, our freedom from the threat of the bomb by committing an immorality so great as saying to a billion human beings now enslaved behind the Iron Curtain, \"Give up your dreams of freedom because to save our own skins, we're willing to make a deal with your slave masters.\" Alexander Hamilton said, \"A nation which can prefer disgrace to danger is prepared for a master, and deserves one.\" Now let's set the record straight. There's no argument over the choice between peace and war, but there's only one guaranteed way you can have peace -- and you can have it in the next second -- surrender.",
    highlight: "Alexander Hamilton said, \"A nation which can prefer disgrace to danger is prepared for a master, and deserves one.\""
  },
  {
    text: "Admittedly, there's a risk in any course we follow other than this, but every lesson of history tells us that the greater risk lies in appeasement, and this is the specter our well-meaning liberal friends refuse to face -- that their policy of accommodation is appeasement, and it gives no choice between peace and war, only between fight or surrender. If we continue to accommodate, continue to back and retreat, eventually we have to face the final demand -- the ultimatum. And what then -- when Nikita Khrushchev has told his people he knows what our answer will be? He has told them that we're retreating under the pressure of the Cold War, and someday when the time comes to deliver the final ultimatum, our surrender will be voluntary, because by that time we will have been weakened from within spiritually, morally, and economically. He believes this because from our side he's heard voices pleading for \"peace at any price\" or \"better Red than dead,\" or as one commentator put it, he'd rather \"live on his knees than die on his feet.\" And therein lies the road to war, because those voices don't speak for the rest of us.",
    highlight: "every lesson of history tells us that the greater risk lies in appeasement... it gives no choice between peace and war, only between fight or surrender."
  },
  {
    text: "You and I know and do not believe that life is so dear and peace so sweet as to be purchased at the price of chains and slavery. If nothing in life is worth dying for, when did this begin -- just in the face of this enemy? Or should Moses have told the children of Israel to live in slavery under the pharaohs? Should Christ have refused the cross? Should the patriots at Concord Bridge have thrown down their guns and refused to fire the shot heard 'round the world? The martyrs of history were not fools, and our honored dead who gave their lives to stop the advance of the Nazis didn't die in vain. Where, then, is the road to peace? Well it's a simple answer after all.",
    highlight: "You and I know and do not believe that life is so dear and peace so sweet as to be purchased at the price of chains and slavery."
  },
  {
    text: "You and I have the courage to say to our enemies, \"There is a price we will not pay.\" \"There is a point beyond which they must not advance.\" And this -- this is the meaning in the phrase of Barry Goldwater's \"peace through strength.\" Winston Churchill said, \"The destiny of man is not measured by material computations. When great forces are on the move in the world, we learn we're spirits -- not animals.\" And he said, \"There's something going on in time and space, and beyond time and space, which, whether we like it or not, spells duty\"",
    highlight: "You and I have the courage to say to our enemies, \"There is a price we will not pay.\" \"There is a point beyond which they must not advance.\" And this -- this is the meaning in the phrase of Barry Goldwater's \"peace through strength.\""
  }
];

const SPEECH_RO = [
  {
    text: "Nu ne putem cumpăra securitatea, libertatea de amenințarea bombei comițând o imoralitate atât de mare încât să spunem unui miliard de ființe umane înrobite acum în spatele Cortinei de Fier: «Renunțați la visurile voastre de libertate pentru că, pentru a ne salva propria piele, suntem dispuși să facem o înțelegere cu stăpânii voștri de sclavi». Alexander Hamilton a spus: «O națiune care poate prefera dizgrația în locul pericolului este pregătită pentru un stăpân și îl merită». Acum să stabilim clar lucrurile. Nu există nicio dispută în privința alegerii dintre pace și război, dar există o singură cale garantată prin care poți avea pace — și o poți avea chiar în secunda următoare — capitularea.",
    highlight: "Alexander Hamilton a spus: «O națiune care poate prefera dizgrația în locul pericolului este pregătită pentru un stăpân și îl merită»."
  },
  {
    text: "Este adevărat că există un risc în orice cale am urma în afară de aceasta, dar fiecare lecție a istoriei ne spune că riscul cel mai mare stă în împăciuitorism, iar acesta este spectrul pe care prietenii noștri liberali bine intenționați refuză să-l înfrunte — că politica lor de acomodare este împăciuitorism, și nu oferă nicio alegere între pace și război, ci doar între luptă sau capitulare. Dacă continuăm să acomodăm, să dăm înapoi și să ne retragem, în cele din urmă va trebui să ne confruntăm cu cererea finală — ultimatumul. Și ce facem atunci — când Nikita Hrușciov a spus poporului său că știe care va fi răspunsul nostru? Le-a spus că ne retragem sub presiunea Războiului Rece și că într-o zi, când va veni momentul livrării ultimatumului final, capitularea noastră va fi voluntară, deoarece până atunci vom fi fost slăbiți din interior din punct de vedere spiritual, moral și economic. El crede acest lucru pentru că din tabăra noastră a auzit voci pledând pentru «pace cu orice preț» sau «mai bine Roșu decât mort», sau, cum a spus un comentator, preferă să «trăiască în genunchi decât să moară în picioare». Și tocmai în asta constă drumul spre război, pentru că acele voci nu vorbesc în numele celorlalți.",
    highlight: "fiecare lecție a istoriei ne spune că riscul cel mai mare stă în împăciuitorism... nu oferă nicio alegere între pace și război, ci doar între luptă sau capitulare."
  },
  {
    text: "Tu și cu mine știm și nu credem că viața este atât de dragă și pacea atât de dulce încât să fie cumpărate cu prețul lanțurilor și al sclaviei. Dacă nimic în viață nu merită sacrificiul suprem, când a început asta — doar în fața acestui inamic? Sau ar fi trebuit Moise să le spună copiilor lui Israel să trăiască în sclavie sub faraoni? Ar fi trebuit Hristos să refuze crucea? Ar fi trebuit patrioții de la Concord Bridge să-și arunce armele și să refuze să tragă focul de armă auzit în întreaga lume? Martirii istoriei nu au fost nebuni, iar morții noștri onorați care și-au dat viața pentru a opri avansul naziștilor nu au murit în zadar. Unde este, deci, drumul spre pace? Ei bine, răspunsul este simplu până la urmă.",
    highlight: "Tu și cu mine știm și nu credem că viața este atât de dragă și pacea atât de dulce încât să fie cumpărate cu prețul lanțurilor și al sclaviei."
  },
  {
    text: "Tu și cu mine avem curajul să le spunem dușmanilor noștri: «Există un preț pe care nu-l vom plăti. Există un punct dincolo de care nu trebuie să înaintați». Și acesta — acesta este sensul din spatele sintagmei lui Barry Goldwater: «pace prin forță». Winston Churchill a spus: «Destinul omului nu este măsurat prin calcule materiale. Când forțe mărețe sunt în mișcare în lume, aflăm că suntem spirite — nu animale». Și a mai spus: «Există ceva ce se petrece în timp și spațiu, și dincolo de timp și spațiu, care, fie că ne place sau nu, înseamnă datorie».",
    highlight: "Tu și cu mine avem curajul să le spunem dușmanilor noștri: «Există un preț pe care nu-l vom plăti. Există un punct dincolo de care nu trebuie să înaintați». Și acesta — acesta este sensul din spatele sintagmei lui Barry Goldwater: «pace prin forță»."
  }
];

const TEXTS = {
  en: {
    title: "We Must Fight",
    subtitle: "Ronald Reagan · A Time for Choosing · 1964",
    watchSpeech: "Watch Speech",
    readTranscript: "Transcript",
    contextHeader: "HISTORICAL SIGNIFICANCE",
    contextBody: "This is an excerpt from future president Ronald Reagan's speech during the 1964 presidential campaign of Barry Goldwater 'The Time For Choosing', also known as 'The Speech'. It outlined the moral case for freedom and peace through strength, which eventually became the ideological cornerstone of the Reagan Revolution and the revitalization of the American spirit during the Cold War.",
  },
  ro: {
    title: "Trebuie Să Luptăm",
    subtitle: "Ronald Reagan · Timpul pentru Alegere · 1964",
    watchSpeech: "Urmărește Discursul",
    readTranscript: "Transcrierea Discursului",
    contextHeader: "SEMNIFICAȚIE ISTORICĂ",
    contextBody: "Acesta este un fragment din discursul viitorului președinte Ronald Reagan din timpul campaniei prezidențiale din 1964 a lui Barry Goldwater, intitulat «The Time For Choosing» (Timpul pentru Alegere), cunoscut și sub numele de «The Speech» (Discursul). Acest discurs a conturat argumentele morale în favoarea libertății și a păcii prin forță, devenind piatra de temelie ideologică a Revoluției Reagan și a revitalizării spiritului american în timpul Războiului Rece.",
  }
};

export default function WeMustFightClient({ locale }: { locale: string }) {
  const currentLocale = (locale === "ro" ? "ro" : "en") as Locale;
  const t = TEXTS[currentLocale];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const speech = currentLocale === "ro" ? SPEECH_RO : SPEECH_EN;

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
      setHasStarted(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Hero Header */}
      <section className="text-center pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-3">
        <h1 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-white uppercase leading-[0.95]">
          {t.title}
        </h1>
        <p className="font-body text-xs tracking-widest text-white/50 uppercase font-medium">
          {t.subtitle}
        </p>
      </section>

      {/* Cinematic Video Player Container */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="relative rounded-lg overflow-hidden border border-white/10 bg-black aspect-video">
          <video
            ref={videoRef}
            src="/videos/we-must-fight.mp4"
            className="w-full h-full object-cover"
            preload="metadata"
            playsInline
            controls={hasStarted}
            onPlay={() => setHasStarted(true)}
          />
          {!hasStarted && (
            <button
              onClick={handlePlayClick}
              className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-black/85 transition-all duration-500 focus-visible:outline-none"
              aria-label="Play Speech Video"
              id="cinematic-play-btn"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-16 w-16 items-center justify-center rounded-full border border-white bg-transparent text-white transition-transform"
              >
                <Play className="ml-1 h-6 w-6 fill-white text-white" />
              </motion.div>
              <span className="mt-4 font-body text-[11px] font-bold tracking-[0.2em] text-white uppercase">
                {t.watchSpeech}
              </span>
            </button>
          )}
        </div>
      </section>

      {/* Transcript Column */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="border-b border-white/10 pb-5">
          <h2 className="font-body text-xs font-bold uppercase tracking-[0.25em] text-white/80">
            {t.readTranscript}
          </h2>
        </div>

        {/* Speech Transcript Paragraphs (Clean, box-free, wider layout) */}
        <div className="space-y-14">
          {speech.map((paragraph, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <p className="font-serif text-xl sm:text-2xl text-white/60 leading-[1.85] text-justify font-light hover:text-white/80 transition-colors duration-300">
                {paragraph.text.split(paragraph.highlight).map((part, pIdx) => (
                  <span key={pIdx}>
                    {part}
                    {pIdx < paragraph.text.split(paragraph.highlight).length - 1 && (
                      <strong className="font-medium text-white">
                        {paragraph.highlight}
                      </strong>
                    )}
                  </span>
                ))}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Redesigned Historical Context Card (Minimal Typographic Footer) */}
      <section className="max-w-4xl mx-auto px-4 mt-20 pb-24 sm:px-6 lg:px-8">
        <div className="border-t border-white/10 pt-12">
          <div className="space-y-4 max-w-3xl">
            <h3 className="font-body text-xs font-bold tracking-[0.25em] text-white/80 uppercase">
              {t.contextHeader}
            </h3>
            <p className="font-body text-sm text-white/40 leading-[1.8] tracking-wide">
              {t.contextBody}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
