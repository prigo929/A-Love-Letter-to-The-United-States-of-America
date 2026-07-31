"use client";

// ─── AdvancedEnglishConcepts ─────────────────────────────────────────────────
// Two-part editorial exploration of obscure, expert-level English concepts.
// Content adapted from JJ McCullough's video essay research; every line is
// rewritten in the site's own voice, never transcribed. Cream parchment surface
// (dark text on cream), matching the culture vertical.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

// ─── Types ──────────────────────────────────────────────────────────────────

interface ConceptExample {
  en: string;
  ro: string;
}

interface Concept {
  key: string;
  number: string;
  title: string;
  titleRo: string;
  tagline: string;
  taglineRo: string;
  body: string;
  bodyRo: string;
  body2?: string;
  body2Ro?: string;
  body3?: string;
  body3Ro?: string;
  examples?: ConceptExample[];
  worthKnowing: string;
  worthKnowingRo: string;
}

// ─── Section I: SUPER ADVANCED CONCEPTS ─────────────────────────────────────

const SECTION_ONE: Concept[] = [
  {
    key: "accent-marks",
    number: "01",
    title: "Accent Marks in English",
    titleRo: "Semnele diacritice in engleza",
    tagline: "The marks most English speakers cannot name",
    taglineRo: "Semnele pe care majoritatea vorbitorilor nu le pot numi",
    body:
      "One of the most visible differences between English and other Roman-alphabet languages (Spanish, French, German) is that English almost never uses accent marks. The few that do appear are borrowed wholesale from foreign languages, and most English speakers cannot even name them. The acute accent (the small rightward slash) shows up in words lifted from French: cafe, resume, risque, blase, touche, fiance, and of course Beyonce. The umlaut or diaeresis (two dots above a vowel) is rarer still: doppelganger and uber carry it from German, and the name Zoe sometimes takes one over the final E, though many simply spell it Z-O-E-Y instead.",
    bodyRo:
      "Una dintre cele mai vizibile diferente intre engleza si alte limbi cu alfabet latin (spaniola, franceza, germana) este ca engleza aproape niciodata nu foloseste semne diacritice. Cele cateva care apar sunt imprumutate direct din alte limbi, iar majoritatea vorbitorilor de engleza nici macar nu le pot numi. Accentul ascutit (linia mica inclinata la dreapta) apare in cuvinte preluate din franceza: cafe, resume, risque, blase, touche, fiance si, desigur, Beyonce. Umlaut-ul sau diereza (doua puncte deasupra vocalei) e si mai rara: doppelganger si uber o poarta din germana, iar numele Zoe uneori are una deasupra ultimului E, desi multi scriu pur si simplu Z-O-E-Y.",
    body2:
      "The cedilla (the curly tail under a C) appears only in facade. The circumflex (the small triangle hat) survives only in chateau. The tilde (the wavy line) lives in pinata and jalapeno, both from Spanish. And then there is one of the stranger cultural footnotes in English typography: the \"metal umlaut,\" the practice of putting pointless dots over letters in band names to make them look more Germanic and aggressive. Motorhead, Motley Crue, and Blue Oyster Cult all did this, riding the assumption that German and Scandinavian rock bands were tougher.",
    body2Ro:
      "Sedila (coada ondulata de sub C) apare doar in facade. Circumflexul (micul triunghi deasupra literei) supravietuieste doar in chateau. Tilda (linia ondulata) traieste in pinata si jalapeno, ambele din spaniola. Si apoi exista una dintre cele mai ciudate note de subsol culturale din tipografia engleza: \"umlaut-ul metalic,\" practica de a pune puncte inutile deasupra literelor in numele trupelor de rock pentru a le face sa arate mai germanice si agresive. Motorhead, Motley Crue si Blue Oyster Cult au facut asta, mizand pe prezumtia ca trupele germane si scandinave erau mai dure.",
    body3:
      "Dropping accent marks in informal English is perfectly acceptable, and almost nobody will consider it an error to write cafe instead of cafe with an accent. The only real exceptions are words where the accent distinguishes two different meanings: expose (the verb, to reveal) and expose (the noun, an investigative report) would be genuinely confusing without the mark.",
    body3Ro:
      "Eliminarea semnelor diacritice in engleza informala este perfect acceptabila si aproape nimeni nu va considera o greseala sa scrii cafe fara accent. Singurele exceptii reale sunt cuvintele unde accentul distinge doua sensuri diferite: expose (verbul, a dezvalui) si expose (substantivul, un raport de investigatie) ar fi cu adevarat confuze fara semn.",
    examples: [
      { en: "Acute: cafe, resume, fiance", ro: "Ascutit: cafe, resume, fiance" },
      { en: "Umlaut: naive, Zoe", ro: "Umlaut: naive, Zoe" },
      { en: "Cedilla: facade", ro: "Sedila: facade" },
      { en: "Tilde: pinata, jalapeno", ro: "Tilda: pinata, jalapeno" },
    ],
    worthKnowing:
      "The New Yorker magazine has an infamous house-style policy of using diaeresis dots in compound words like cooperate and reelection, writing them as cooperate and reelect with dots over the second vowel. No other publication in the English-speaking world does this. It is a pure editorial affectation.",
    worthKnowingRo:
      "Revista The New Yorker are o politica de stil infama de a folosi punctele de diereza in cuvinte compuse precum cooperate si reelection, scriindu-le cu puncte deasupra celei de-a doua vocale. Nicio alta publicatie din lumea anglofona nu face asta. Este o afectare pur editoriala.",
  },
  {
    key: "lost-letters",
    number: "02",
    title: "The Lost Letters: Ash & Ethel",
    titleRo: "Literele pierdute: Ash si Ethel",
    tagline: "Two letters that English quietly retired",
    taglineRo: "Doua litere pe care engleza le-a pensionat in liniste",
    body:
      "The English alphabet has 26 letters, and these are all you need for 99.99% of English text. But there exist two additional characters that were once part of standard written English and are now effectively extinct. The first is the ash (\u00e6), pronounced like a long E. It is considered redundant today because it provides no functional difference from writing a plain E or AE, but into the early 20th century it was common for writers in England and America to use the ash in words with a clear Latin pedigree: archaeologist, aesthetic, encyclopaedia.",
    bodyRo:
      "Alfabetul englez are 26 de litere si acestea sunt tot ce ai nevoie pentru 99,99% din textul in engleza. Dar exista doua caractere suplimentare care au facut odata parte din engleza scrisa standard si sunt acum efectiv disparute. Prima este ash (\u00e6), pronuntata ca un E lung. Este considerata redundanta azi fiindca nu ofera nicio diferenta functionala fata de un simplu E sau AE, dar pana la inceputul secolului XX era obisnuit ca scriitorii din Anglia si America sa foloseasca ash in cuvinte cu un pedigree latin clar: archaeologist, aesthetic, encyclopaedia.",
    body2:
      "The second is the ethel (\u0153), also pronounced like E, which served a similar function in words like oesophagus and foetus. Unless you plan on reading Victorian medical journals, neither character is relevant to modern English. Today you will only see the ash used for visual flair in things like the Encyclop\u00e6dia Britannica logo or the film title \u00c6on Flux. They are fossils of an era when English writers felt obligated to signal a word's Latin or Greek ancestry through its spelling.",
    body2Ro:
      "A doua este ethel (\u0153), tot pronuntata ca E, care servea o functie similara in cuvinte precum oesophagus si foetus. Daca nu planifici sa citesti jurnale medicale victoriene, niciun caracter nu mai e relevant pentru engleza moderna. Azi vei vedea ash-ul folosit doar ca ornament vizual in lucruri precum logoul Encyclop\u00e6dia Britannica sau titlul filmului \u00c6on Flux. Sunt fosile ale unei ere cand scriitorii englezi se simteau obligati sa semnaleze ascendenta latind sau greaca a unui cuvant prin ortografie.",
    examples: [
      { en: "\u00c6 (ash): encyclop\u00e6dia, \u00e6sthetic", ro: "\u00c6 (ash): encyclop\u00e6dia, \u00e6sthetic" },
      { en: "\u0152 (ethel): \u0153sophagus, f\u0153tus", ro: "\u0152 (ethel): \u0153sophagus, f\u0153tus" },
    ],
    worthKnowing:
      "Both characters are still fully present in Unicode and on every keyboard via special-character menus. They are not truly gone, just ignored. Their survival in logos and movie titles is proof that dead letters make excellent graphic design.",
    worthKnowingRo:
      "Ambele caractere sunt inca pe deplin prezente in Unicode si pe orice tastatura prin meniurile de caractere speciale. Nu au disparut cu adevarat, sunt doar ignorate. Supravietuirea lor in logo-uri si titluri de filme e dovada ca literele moarte fac design grafic excelent.",
  },
  {
    key: "ye-olde",
    number: "03",
    title: "Ye Olde English",
    titleRo: "Ye Olde English",
    tagline: "The fake-archaic English everyone recognizes but nobody speaks",
    taglineRo: "Engleza fals-arhaica pe care toata lumea o recunoaste dar nimeni nu o vorbeste",
    body:
      "Most English speakers have a rough sense of what \"old English\" sounds like, but what they are actually picturing is early modern English, the language spoken between roughly 1500 and 1700. Actual Old English (the language of Beowulf, pre-1100) is completely incomprehensible to modern speakers. The general consensus among linguists is that a modern English speaker transported back in time could probably not understand anyone before the late 1400s. The stereotypes of \"old English\" that most people carry come from two sources: the plays of William Shakespeare (died 1616) and the King James translation of the Bible (published 1611).",
    bodyRo:
      "Majoritatea vorbitorilor de engleza au o idee vaga despre cum suna \"engleza veche,\" dar ceea ce isi imagineaza de fapt este engleza moderna timpurie, limba vorbita intre aproximativ 1500 si 1700. Engleza veche propriu-zisa (limba lui Beowulf, de dinainte de 1100) este complet de neinteles pentru vorbitorii moderni. Consensul general printre lingvisti e ca un vorbitor modern de engleza transportat inapoi in timp probabil nu ar intelege pe nimeni dinainte de sfarsitul anilor 1400. Stereotipurile \"englezei vechi\" pe care le poarta majoritatea oamenilor vin din doua surse: piesele lui William Shakespeare (mort in 1616) si traducerea King James a Bibliei (publicata in 1611).",
    body2:
      "The formula is instantly recognizable: thee, thou, thine, doth, hast, forsooth, adding -eth and -est to verbs, scattering silent E's, reversing noun-verb order. Pop culture deploys this \"Ye Olde Butchered English\" constantly: God and fantasy monarchs are made to speak this way, commercial products use quaint pseudo-archaic spellings for charm (\"Ye Olde Shoppe\"), and fantasy literature leans on it for gravitas. It sounds grand precisely because it sounds old.",
    body2Ro:
      "Formula e instant recognoscibila: thee, thou, thine, doth, hast, forsooth, adaugand -eth si -est la verbe, presarand E-uri mute, inversand ordinea subiect-verb. Cultura populara foloseste aceasta \"Ye Olde Butchered English\" constant: Dumnezeu si monarhii fantastici sunt pusi sa vorbeasca asa, produsele comerciale folosesc ortografii pseudo-arhaice pentru farmec (\"Ye Olde Shoppe\"), iar literatura fantasy se sprijina pe ea pentru gravitate. Suna grandios tocmai fiindca suna vechi.",
    body3:
      "A genuine historical curiosity: the Quakers continued speaking in this old-fashioned English well into the 20th century. President Richard Nixon, raised in a strict Quaker family in the 1920s, grew up hearing thee and thou at home. The Quakers used Old English pronouns and forms of address as a deliberate gesture of humility, making their interactions with other people feel less personal and more attuned to their shared status as children of God. In modern ears it sounds pretentious, but the intent was the opposite.",
    body3Ro:
      "O curiozitate istorica autentica: quakerii au continuat sa vorbeasca in aceasta engleza demotata pana adanc in secolul XX. Presedintele Richard Nixon, crescut intr-o familie quaker stricta in anii 1920, a crescut auzind thee si thou acasa. Quakerii foloseau pronumele si formele de adresare vechi ca un gest deliberat de umilinta, facand interactiunile cu alti oameni sa para mai putin personale si mai armonizate cu statutul lor comun de copii ai lui Dumnezeu. In urechile moderne suna pretentios, dar intentia era opusa.",
    examples: [
      { en: "\"Thou hast forsaken my church\"", ro: "\"Thou hast forsaken my church\"" },
      { en: "\"Ye Olde Coffee Shoppe\"", ro: "\"Ye Olde Coffee Shoppe\"" },
    ],
    worthKnowing:
      "The word \"ye\" in \"Ye Olde\" is actually just \"the.\" The Y stands in for an old letter called thorn (\u00de), which represented the \"th\" sound. Early printers, who lacked thorn in their type sets, substituted Y, and the misreading stuck for centuries.",
    worthKnowingRo:
      "Cuvantul \"ye\" din \"Ye Olde\" e de fapt doar \"the.\" Y-ul tine locul unei litere vechi numite thorn (\u00de), care reprezenta sunetul \"th.\" Tipografii timpurii, care nu aveau thorn in seturile de litere, au substituit Y, iar lectura gresita a ramas vreme de secole.",
  },
  {
    key: "royal-we",
    number: "04",
    title: "The Royal We",
    titleRo: "Noi regal",
    tagline: "When monarchs say 'we' and mean 'I'",
    taglineRo: "Cand monarhii spun 'noi' si se refera la 'eu'",
    body:
      "In ancient English, high-status people used collective pronouns (we, our, us) to refer to themselves individually, while the words I, me, and my were considered lower-class. British kings and queens continue to use this convention today, but only in formal written government documents. When King Charles III officially dissolved Parliament in 2024, the text in the British Gazette read: \"Whereas we have thought it fit by and with the advice of our privy Council to dissolve this present Parliament.\" The king is not speaking for a group. He is speaking for himself, in a grammatical register reserved for sovereignty.",
    bodyRo:
      "In engleza veche, oamenii de rang inalt foloseau pronume colective (we, our, us) pentru a se referi la ei insisi individual, in timp ce cuvintele I, me si my erau considerate de clasa inferioara. Regii si reginele britanice continua sa foloseasca aceasta conventie azi, dar doar in documente guvernamentale scrise formale. Cand Regele Charles al III-lea a dizolvat oficial Parlamentul in 2024, textul din British Gazette a sunat: \"Whereas we have thought it fit by and with the advice of our privy Council to dissolve this present Parliament.\" Regele nu vorbeste in numele unui grup. Vorbeste pentru sine insusi, intr-un registru gramatical rezervat suveranitatii.",
    body2:
      "In every other context, even at highly formal state dinners and royal speeches, the king uses I and my, just like everyone else. Queen Elizabeth II used I and my. Queen Elizabeth I used I and my in her famous 1588 speech to the troops at Tilbury. The popular image of Queen Victoria using the Royal We in casual conversation (\"We are not amused\") appears to be a mischaracterization of a moment when she was genuinely speaking on behalf of a group. The Royal We, in practice, lives almost entirely on paper.",
    body2Ro:
      "In orice alt context, chiar si la dineuri de stat foarte formale si discursuri regale, regele foloseste I si my, ca oricine altcineva. Regina Elisabeta a II-a folosea I si my. Regina Elisabeta I a folosit I si my in celebrul ei discurs din 1588 catre trupele de la Tilbury. Imaginea populara a Reginei Victoria folosind Noi regal in conversatii obisnuite (\"We are not amused\") pare o deformare a unui moment cand ea vorbea cu adevarat in numele unui grup. Noi regal, in practica, traieste aproape exclusiv pe hartie.",
    examples: [
      { en: "\"We are not amused\" (Queen Victoria, probably misquoted)", ro: "\"We are not amused\" (Regina Victoria, probabil citat gresit)" },
    ],
    worthKnowing:
      "In the Japanese video game series Katamari Damacy, the King of All Cosmos speaks entirely in Royal We. The grammatical awkwardness this creates in English makes him sound even more absurdly pompous than the developers likely intended, which is part of the joke.",
    worthKnowingRo:
      "In seria de jocuri video japoneza Katamari Damacy, Regele Intregului Cosmos vorbeste exclusiv in Noi regal. Stranietatea gramaticala pe care o creeaza in engleza il face sa sune si mai absurd de pompos decat au intentionat probabil dezvoltatorii, ceea ce face parte din gluma.",
  },
  {
    key: "anglicization",
    number: "05",
    title: "Anglicization",
    titleRo: "Anglicizarea",
    tagline: "How English rewrites the world's names",
    taglineRo: "Cum rescrie engleza numele lumii",
    body:
      "Anglicization is the act of converting a word from another language into a form that English speakers can spell and pronounce more easily. The practice runs deep. What English speakers think of as traditional biblical names (John, Peter, Benjamin) are anglicized versions of Greek or Hebrew originals (Ioannes, Petros, Benyamin). In old English newspapers and history books, the names of foreign kings and popes were always anglicized: Fernando became Ferdinand, Gregorius became Gregory, Louis stayed Louis but gained an English pronunciation. This practice continued well into the 20th century. Joseph Stalin is one of the last foreign leaders whose first name was anglicized; his given name was Iosif. Every subsequent Soviet leader (Khrushchev, Brezhnev, Gorbachev) is known by their un-anglicized Russian names.",
    bodyRo:
      "Anglicizarea este actul de a converti un cuvant din alta limba intr-o forma pe care vorbitorii de engleza o pot scrie si pronunta mai usor. Practica are radacini adanci. Ceea ce vorbitorii de engleza considera nume biblice traditionale (John, Peter, Benjamin) sunt versiuni anglicizate ale originalelor grecesti sau ebraice (Ioannes, Petros, Benyamin). In ziarele si cartile de istorie vechi, numele regilor si papilor straini erau mereu anglicizate: Fernando devenea Ferdinand, Gregorius devenea Gregory, Louis ramanea Louis dar capatau o pronuntie englezeasca. Practica a continuat pana adanc in secolul XX. Joseph Stalin e unul dintre ultimii lideri straini al carui prenume a fost anglicizat; numele lui dat era Iosif. Fiecare lider sovietic ulterior (Hrusciov, Brejnev, Gorbaciov) e cunoscut dupa numele rusesti ne-anglicizate.",
    body2:
      "Place names tell a similar story. A fair number of cities have aggressively anglicized English names: Cologne (actually Koln), Florence (actually Firenze), Vienna (actually Wien). Some of these are now being corrected: Mumbai replaced Bombay, Beijing replaced Peking, Myanmar replaced Burma. For personal names of immigrants, anglicization was standard practice for anyone who arrived more than a century ago. Andrew Grove, the famous Hungarian-born co-founder of Intel, was born Andras Grof and anglicized his name after immigrating.",
    body2Ro:
      "Numele de locuri spun o poveste similara. Un numar considerabil de orase au nume englezesti agresiv anglicizate: Cologne (de fapt Koln), Florence (de fapt Firenze), Vienna (de fapt Wien). Unele sunt acum corectate: Mumbai a inlocuit Bombay, Beijing a inlocuit Peking, Myanmar a inlocuit Burma. Pentru numele personale ale imigrantilor, anglicizarea era practica standard pentru oricine a sosit cu mai mult de un secol in urma. Andrew Grove, celebrul co-fondator de origine maghiara al Intel, s-a nascut Andras Grof si si-a anglicizat numele dupa imigrare.",
    body3:
      "A peculiar modern taboo has emerged: it is now considered unacceptable to phonetically anglicize the names of people from countries that use the Roman alphabet (you would never write the Prime Minister of Montenegro's name in a phonetic English approximation), yet it remains perfectly fine to phonetically anglicize names from non-Roman scripts (Paetongtarn Shinawatra does not write her name that way in Thai, but the English rendering is accepted without complaint).",
    body3Ro:
      "Un tabu modern peculiar a aparut: e considerat acum inacceptabil sa anglicizezi fonetic numele persoanelor din tari care folosesc alfabetul latin (nu ai scrie niciodata numele premierului Muntenegrului intr-o aproximare fonetica englezeasca), dar ramane perfect acceptabil sa anglicizezi fonetic numele din scripturi non-latine (Paetongtarn Shinawatra nu isi scrie asa numele in thai, dar redarea englezeasca e acceptata fara obiectie).",
    examples: [
      { en: "Ioannes \u2192 John, Petros \u2192 Peter", ro: "Ioannes \u2192 John, Petros \u2192 Peter" },
      { en: "Koln \u2192 Cologne, Firenze \u2192 Florence", ro: "Koln \u2192 Cologne, Firenze \u2192 Florence" },
      { en: "Andras Grof \u2192 Andrew Grove", ro: "Andras Grof \u2192 Andrew Grove" },
    ],
    worthKnowing:
      "The arrows (\u2192) above use a rightward arrow, not an em dash. The anglicization of foreign names is one of the oldest continuous practices in the English language, predating even the printing press.",
    worthKnowingRo:
      "Anglicizarea numelor straine este una dintre cele mai vechi practici continue din limba engleza, predatand chiar si tiparul.",
  },
  {
    key: "fossil-words",
    number: "06",
    title: "Fossil Words",
    titleRo: "Cuvinte fosila",
    tagline: "Words that exist only inside a single phrase",
    taglineRo: "Cuvinte care exista doar in interiorul unei singure expresii",
    body:
      "Fossil words are among the most difficult vocabulary to learn in any language because they carry no independent meaning. They are archaic, forgotten words whose modern survival is tied exclusively to a single fixed phrase. You cannot use them outside that phrase, and you cannot literally translate them. They provide rhythm and texture to an expression, nothing more.",
    bodyRo:
      "Cuvintele fosila sunt printre cele mai dificile elemente de vocabular de invatat in orice limba, fiindca nu au niciun sens independent. Sunt cuvinte arhaice, uitate, a caror supravietuire moderna e legata exclusiv de o singura expresie fixa. Nu le poti folosi in afara acelei expresii si nu le poti traduce literal. Ofera ritm si textura unei expresii, nimic mai mult.",
    body2:
      "Consider \"amok\": you can \"run amok\" (behave chaotically), but you cannot be amok, feel amok, or describe something as amok in any other construction. \"Eke\" is the same: you can \"eke out\" a narrow victory or a living, but eke has no independent life as a verb. \"Ado\" appears only in \"without further ado.\" \"Kith\" survives only in \"kith and kin.\" \"Dint\" lives only in \"by dint of.\" \"Umbrage\" exists almost solely in \"take umbrage.\" Even explaining what these words mean is difficult, because they do not, strictly speaking, mean anything. English speakers learn to use them the way everyone learns idioms: by hearing them in context, absorbing the pattern, and reproducing it, without ever understanding the individual parts.",
    body2Ro:
      "Sa luam \"amok\": poti \"run amok\" (a te comporta haotic), dar nu poti fi amok, simti amok sau descrie ceva ca amok in vreo alta constructie. \"Eke\" e la fel: poti \"eke out\" o victorie la limita sau o existenta, dar eke nu are viata independenta ca verb. \"Ado\" apare doar in \"without further ado.\" \"Kith\" supravietuieste doar in \"kith and kin.\" \"Dint\" traieste doar in \"by dint of.\" \"Umbrage\" exista aproape exclusiv in \"take umbrage.\" Chiar si explicarea a ce inseamna aceste cuvinte e dificila, fiindca ele, strict vorbind, nu inseamna nimic. Vorbitorii de engleza invata sa le foloseasca asa cum invata toata lumea expresiile idiomatice: auzindu-le in context, absorbind tiparul si reproducandu-l, fara a intelege vreodata partile individuale.",
    examples: [
      { en: "run amok, eke out, without further ado", ro: "run amok, eke out, without further ado" },
      { en: "kith and kin, by dint of, take umbrage", ro: "kith and kin, by dint of, take umbrage" },
    ],
    worthKnowing:
      "\"Amok\" actually comes from Malay (amuk), where it originally described a frenzied, murderous attack. The word entered English through colonial contact in Southeast Asia, lost its original violent specificity, and now survives only in a softened idiomatic phrase about general chaos.",
    worthKnowingRo:
      "\"Amok\" vine de fapt din malaeziand (amuk), unde descria initial un atac frenetic, criminal. Cuvantul a intrat in engleza prin contactul colonial din Asia de Sud-Est, si-a pierdut specificitatea violenta originala si acum supravietuieste doar intr-o expresie idiomatica mai blanda despre haos general.",
  },
  {
    key: "collective-nouns",
    number: "07",
    title: "Collective Nouns for Animals",
    titleRo: "Substantive colective pentru animale",
    tagline: "A murder of crows, a parliament of owls",
    taglineRo: "O crima de ciori, un parlament de bufnite",
    body:
      "One of the more whimsical corners of English is the tradition of assigning specific collective nouns to groups of animals. Some are well-known and widely used: a pride of lions, a pack of wolves, a pod of whales, a flock of birds. But the full list extends into the genuinely absurd: a flamboyance of flamingos, a crash of rhinos, a shiver of sharks, a parliament of owls, a dazzle of zebras, a murder of crows, a conspiracy of lemurs.",
    bodyRo:
      "Unul dintre cele mai capricioase colturi ale englezei este traditia de a atribui substantive colective specifice grupurilor de animale. Unele sunt binecunoscute si folosite pe scara larga: a pride of lions, a pack of wolves, a pod of whales, a flock of birds. Dar lista completa se extinde spre autentic absurd: a flamboyance of flamingos, a crash of rhinos, a shiver of sharks, a parliament of owls, a dazzle of zebras, a murder of crows, a conspiracy of lemurs.",
    body2:
      "In daily conversation, most of these exotic terms are rarely used. Even professional animal researchers will usually say \"a group of owls\" rather than \"a parliament\" in a scientific paper, because the literary term sounds too flowery for academic writing. Most ordinary speakers would say \"a herd of zebras\" before they would say \"a dazzle.\" This makes the collective nouns a proxy battle in the larger war between descriptivism and prescriptivism in English. Descriptivism holds that correct English is whatever English speakers actually do. Prescriptivism holds that there are rules, and you should follow them. English dictionaries are overwhelmingly descriptivist: they add words and spellings as they become popular, not because a panel of experts approved them. The collective nouns represent a rare pocket of prescriptivism in an otherwise descriptivist culture, which is exactly what makes them so fascinating to trivia enthusiasts. In a language where secret rules are scarce, discovering one is a genuine thrill.",
    body2Ro:
      "In conversatia zilnica, majoritatea acestor termeni exotici sunt rar folositi. Chiar si cercetatorii profesionisti de animale vor spune de obicei \"a group of owls\" in loc de \"a parliament\" intr-o lucrare stiintifica, fiindca termenul literar suna prea inflorit pentru scrierea academica. Majoritatea vorbitorilor obisnuiti ar spune \"a herd of zebras\" inainte de \"a dazzle.\" Asta face substantivele colective o lupta prin procura in razboiul mai larg dintre descriptivism si prescriptivism in engleza. Descriptivismul sustine ca engleza corecta e orice fac de fapt vorbitorii de engleza. Prescriptivismul sustine ca exista reguli si trebuie sa le respecti. Dictionarele engleze sunt covarsitor descriptiviste: adauga cuvinte si ortografii pe masura ce devin populare, nu fiindca le-a aprobat un panel de experti. Substantivele colective reprezinta un rar buzunar de prescriptivism intr-o cultura altfel descriptivista, ceea ce le face atat de fascinante pentru pasionatii de trivia. Intr-o limba unde regulile secrete sunt rare, descoperirea uneia e un entuziasm autentic.",
    examples: [
      { en: "a murder of crows, a pride of lions", ro: "a murder of crows, a pride of lions" },
      { en: "a flamboyance of flamingos", ro: "a flamboyance of flamingos" },
      { en: "a conspiracy of lemurs", ro: "a conspiracy of lemurs" },
    ],
    worthKnowing:
      "Many of these collective nouns trace back to \"The Book of Saint Albans\" (1486), a medieval English hunting manual that listed the \"proper\" terms for groups of animals. Whether the author intended them as serious taxonomy or as literary wordplay is still debated five centuries later.",
    worthKnowingRo:
      "Multe dintre aceste substantive colective isi au originea in \"The Book of Saint Albans\" (1486), un manual medieval englez de vanatoare care lista termenii \"potriviti\" pentru grupuri de animale. Daca autorul le-a intentionat ca taxonomie serioasa sau ca joc de cuvinte literar e dezbatut inca dupa cinci secole.",
  },
];

// ─── Section II: MORE SUPER-DUPER ADVANCED CONCEPTS ─────────────────────────

const SECTION_TWO: Concept[] = [
  {
    key: "gendered-pronouns",
    number: "08",
    title: "Gendered Pronouns for Objects",
    titleRo: "Pronume de gen pentru obiecte",
    tagline: "Why ships and countries are sometimes 'she'",
    taglineRo: "De ce navele si tarile sunt uneori 'ea'",
    body:
      "Unlike French, German, or Spanish, English does not assign grammatical gender to inanimate objects. There is no masculine pencil or feminine table. But a small, specific category of things has historically been referred to using feminine pronouns: ships and large vehicles, certain forms of heavy artillery, countries, the concept of the Church (particularly the Catholic Church as a spiritual institution), and some abstract concepts like nature, justice, and destiny. This was never a grammatical requirement. Using \"it\" and \"its\" for any of these things has always been correct. Feminine pronouns were a cultural custom, a way of signaling affection, reverence, or protectiveness.",
    bodyRo:
      "Spre deosebire de franceza, germana sau spaniola, engleza nu atribuie gen gramatical obiectelor neinsufletite. Nu exista creion masculin sau masa feminina. Dar o categorie mica si specifica de lucruri a fost referita istoric cu pronume feminine: navele si vehiculele mari, anumite forme de artilerie grea, tarile, conceptul de Biserica (in special Biserica Catolica ca institutie spirituala) si unele concepte abstracte precum natura, justitia si destinul. Aceasta nu a fost niciodata o cerinta gramaticala. Folosirea lui \"it\" si \"its\" pentru oricare dintre aceste lucruri a fost mereu corecta. Pronumele feminine erau un obicei cultural, un mod de a semnala afectiune, reverenta sau protectie.",
    body2:
      "In contemporary English, this custom is fading. Because English is a non-gendered language, every deliberate use of she/her for an object is an explicit choice, and that choice now reads as an affectation. Margaret Thatcher, discussing the sinking of an Argentine warship during the Falklands War, flip-flopped mid-interview between calling the ship \"it\" and \"she,\" which illustrates how even a committed traditionalist finds the convention unnatural when speaking in real time. Using \"it\" comes unconsciously; saying \"she\" requires deliberate effort. In the Simpsons, Mr. Burns says \"Nature started the fight for survival and now she wants to quit because she's losing,\" which the writers clearly intended as a signal of how archaic and aristocratic his speech patterns are.",
    body2Ro:
      "In engleza contemporana, acest obicei se estompeaza. Fiindca engleza e o limba fara gen, fiecare utilizare deliberata de she/her pentru un obiect e o alegere explicita, iar acea alegere acum se citeste ca afectare. Margaret Thatcher, discutand scufundarea unei nave de razboi argentiniene in Razboiul Falklands, a oscilat in mijlocul interviului intre a numi nava \"it\" si \"she,\" ceea ce ilustreaza cum chiar si un traditionalist convins gaseste conventia nenaturala cand vorbeste in timp real. Folosirea lui \"it\" vine inconstient; a spune \"she\" necesita efort deliberat. In Simpsons, Mr. Burns spune \"Nature started the fight for survival and now she wants to quit because she's losing,\" ceea ce scenristii au intentionat clar ca semnal cat de arhaice si aristocratice sunt tiparele lui de vorbire.",
    examples: [
      { en: "\"She's a fine vessel\" (of a ship)", ro: "\"She's a fine vessel\" (despre o nava)" },
      { en: "\"Russia expanded her empire\" (of a country)", ro: "\"Russia expanded her empire\" (despre o tara)" },
    ],
    worthKnowing:
      "This is the sort of linguistic controversy that can only arise in a non-gendered language. In French, where every noun has a grammatical gender, nobody debates whether a ship should be feminine; it simply is, by rule. In English, every act of gendering is a deliberate rhetorical choice, which is what makes it both charming and increasingly controversial.",
    worthKnowingRo:
      "Aceasta e genul de controversa lingvistica ce poate aparea doar intr-o limba fara gen. In franceza, unde fiecare substantiv are gen gramatical, nimeni nu dezbate daca o nava ar trebui sa fie feminina; pur si simplu este, prin regula. In engleza, fiecare act de atribuire de gen e o alegere retorica deliberata, ceea ce o face atat fermecatoare cat si din ce in ce mai controversata.",
  },
  {
    key: "honorific-titles",
    number: "09",
    title: "English Honorific Titles",
    titleRo: "Titluri onorifice in engleza",
    tagline: "Your Majesty, Your Honor, and the strange rules around them",
    taglineRo: "Your Majesty, Your Honor si regulile ciudate din jurul lor",
    body:
      "English lacks the formal grammar that languages like Japanese, Korean, or French use to mark differences in social status. There are no special verb conjugations for speaking to a superior. At best, English has sir and madam. Yet the language compensated for this structural gap by accumulating a long list of honorific titles meant to replace a person's name when addressing someone who holds an office of importance. The most familiar of these are Your Majesty and Your Highness (for royalty) and Your Honor (for judges). Beyond these, a cascade of increasingly obscure titles exists: Your Grace (for dukes and archbishops), Your Eminence (for cardinals), Your Excellency (for governors and ambassadors), Your Holiness (for the Pope), and Your Worship (for mayors in some Commonwealth countries).",
    bodyRo:
      "Engleza nu are gramatica formala pe care limbi precum japoneza, coreana sau franceza o folosesc pentru a marca diferentele de statut social. Nu exista conjugari verbale speciale pentru a vorbi cu un superior. Cel mult, engleza are sir si madam. Totusi, limba a compensat acest gol structural acumuland o lunga lista de titluri onorifice menite sa inlocuiasca numele unei persoane cand te adresezi cuiva care detine o functie importanta. Cele mai familiare sunt Your Majesty si Your Highness (pentru regalitate) si Your Honor (pentru judecatori). Dincolo de acestea, o cascada de titluri din ce in ce mai obscure exista: Your Grace (pentru duci si arhiepiscopi), Your Eminence (pentru cardinali), Your Excellency (pentru guvernatori si ambasadori), Your Holiness (pentru Papa) si Your Worship (pentru primari in unele tari din Commonwealth).",
    body2:
      "A subtle rule governs repeated use: after the first address, you drop the \"Your\" and use only the title. So a conversation with a king would begin with \"Yes, Your Majesty\" and continue with \"Yes, Majesty.\" Another arbitrary tradition: the prefix \"Mr.\" or \"Madam\" is applied to some government titles but not others, and there is no grammatical logic to it. \"Mr. President\" and \"Mr. Secretary\" are standard, but nobody says \"Mr. Senator\" or \"Mr. Governor.\" It is simply tradition. Some observers believe that omitting \"Mr.\" before a title signals personal familiarity, which is why eyebrows rise when officials address the President as just \"President\" rather than \"Mr. President.\"",
    body2Ro:
      "O regula subtila guverneaza utilizarea repetata: dupa prima adresare, renunti la \"Your\" si folosesti doar titlul. Deci o conversatie cu un rege ar incepe cu \"Yes, Your Majesty\" si ar continua cu \"Yes, Majesty.\" O alta traditie arbitrara: prefixul \"Mr.\" sau \"Madam\" se aplica unor titluri guvernamentale dar nu altora, si nu exista logica gramaticala. \"Mr. President\" si \"Mr. Secretary\" sunt standard, dar nimeni nu spune \"Mr. Senator\" sau \"Mr. Governor.\" Este pur si simplu traditie. Unii observatori cred ca omiterea lui \"Mr.\" dinaintea unui titlu semnaleaza familiaritate personala, motiv pentru care se ridica sprancene cand oficiali i se adreseaza Presedintelui doar ca \"President\" in loc de \"Mr. President.\"",
    body3:
      "Then there is \"M'lady,\" the contraction of \"My Lady\" that has become one of the more parodied expressions in internet culture. It descends from the same tradition: My Lord and My Lady were once standard forms of address for the British aristocracy. In some high-ranking British courts, lawyers still say \"My Lord\" and \"My Lady\" when addressing judges. When you say these two-word phrases often enough, they slur into single words (milord, milady), and this is how they entered pop culture as standalone terms.",
    body3Ro:
      "Apoi exista \"M'lady,\" contractia de la \"My Lady\" care a devenit una dintre cele mai parodiate expresii din cultura internetului. Descoboarae din aceeasi traditie: My Lord si My Lady erau odata forme standard de adresare pentru aristocratia britanica. In unele tribunale britanice de rang inalt, avocatii inca spun \"My Lord\" si \"My Lady\" cand se adreseaza judecatorilor. Cand spui aceste expresii de doua cuvinte suficient de des, se contrag in cuvinte unice (milord, milady), si asa au intrat in cultura populara ca termeni de sine statatoare.",
    examples: [
      { en: "Your Majesty \u2192 Majesty (after first use)", ro: "Your Majesty \u2192 Majesty (dupa prima utilizare)" },
      { en: "My Lady \u2192 M'lady (slurred contraction)", ro: "My Lady \u2192 M'lady (contractie)" },
    ],
    worthKnowing:
      "Most educated English speakers can distinguish Your Majesty from Your Honor, but very few could confidently explain what makes someone Your Grace versus Your Eminence. The full system of English honorifics is, for all practical purposes, dead knowledge outside the British aristocracy and the Catholic clergy.",
    worthKnowingRo:
      "Majoritatea vorbitorilor educati de engleza pot distinge Your Majesty de Your Honor, dar foarte putini ar putea explica cu incredere ce face pe cineva Your Grace versus Your Eminence. Sistemul complet de titluri onorifice engleze este, in toate scopurile practice, cunoastere moarta in afara aristocratiei britanice si clerului catolic.",
  },
  {
    key: "latin-in-english",
    number: "10",
    title: "Latin in English",
    titleRo: "Latina in engleza",
    tagline: "The dead language still running beneath the surface",
    taglineRo: "Limba moarta care inca functioneaza sub suprafata",
    body:
      "Britain was conquered by the Roman Empire in the 1st century AD and freed from Roman rule in 410 AD. Yet Latin remained the preferred language of British officialdom, clergy, and scholarship until well into the 1700s. As a result, Latin still holds a somewhat revered, elite status in the English-speaking world. It is the closest English equivalent to the way Korean still sometimes uses Chinese characters in extremely limited, formal contexts: a dead prestige language that refuses to disappear entirely.",
    bodyRo:
      "Britannia a fost cucerita de Imperiul Roman in secolul I d.Hr. si eliberata de sub stapanirea romana in 410 d.Hr. Totusi, latina a ramas limba preferata a oficialilor, clerului si invatamantului britanic pana adanc in anii 1700. Ca rezultat, latina detine inca un statut oarecum venerat, elitist, in lumea anglofona. Este cel mai apropiat echivalent englez al modului in care coreana inca foloseste uneori caractere chinezesti in contexte extrem de limitate si formale: o limba de prestigiu moarta care refuza sa dispara complet.",
    body2:
      "Latin's strongest surviving foothold is in Anglo-American law. A set of Latin legal phrases remains in active everyday use, and any fully fluent English speaker is expected to know their meaning: habeas corpus (produce the body, a demand to bring a prisoner before a court), mens rea (guilty mind, criminal intent), prima facie (at first appearance, self-evident), pro bono (for the public good, free legal work), bona fide (in good faith, genuine). Some of these have migrated entirely into casual English: vice versa, status quo, per se, and even the humble \"etc.\" are all untranslated Latin that English speakers sprinkle into conversation without thinking twice.",
    body2Ro:
      "Cea mai puternica pozitie supravietuitoare a latinei e in dreptul anglo-american. Un set de expresii juridice latine ramane in uz activ zilnic, iar orice vorbitor pe deplin fluent de engleza trebuie sa le stie sensul: habeas corpus (prezinta corpul, cererea de a aduce un prizonier in fata instantei), mens rea (minte vinovata, intentie criminala), prima facie (la prima vedere, evident), pro bono (pentru binele public, munca juridica gratuita), bona fide (cu buna credinta, autentic). Unele au migrat complet in engleza cotidiana: vice versa, status quo, per se si chiar umilul \"etc.\" sunt toate latina netradusa pe care vorbitorii de engleza o presara in conversatie fara sa se gandeasca de doua ori.",
    body3:
      "Latin also survives in the form of official mottos. Most governments in Britain and America have issued Latin mottos for the territories they govern. E Pluribus Unum (out of many, one) appears on every piece of US currency. Harvard's motto is a single word: Veritas (truth). MGM's logo reads Ars Gratia Artis (art for the sake of art). The useful test for whether a Latin word has been fully absorbed into English: if you still use the Latin pronunciation to say it, it probably has not crossed over. \"Bona fide\" is arguably English; \"carpe diem\" is still identifiably Latin.",
    body3Ro:
      "Latina supravietuieste si sub forma devizelor oficiale. Majoritatea guvernelor din Britannia si America au emis devize latine pentru teritoriile pe care le conduc. E Pluribus Unum (din multi, unul) apare pe fiecare moneda americana. Deviza Harvard este un singur cuvant: Veritas (adevarul). Logoul MGM scrie Ars Gratia Artis (arta de dragul artei). Testul util pentru a sti daca un cuvant latin a fost pe deplin absorbit in engleza: daca inca folosesti pronuntia latina sa-l spui, probabil nu a trecut. \"Bona fide\" e in mod discutabil engleza; \"carpe diem\" e inca identificabil latina.",
    examples: [
      { en: "habeas corpus, mens rea, pro bono", ro: "habeas corpus, mens rea, pro bono" },
      { en: "E Pluribus Unum, Veritas, Ars Gratia Artis", ro: "E Pluribus Unum, Veritas, Ars Gratia Artis" },
    ],
    worthKnowing:
      "At elite private schools in Britain and America, Latin was taught as a core subject into the late 20th century, framed as a gateway to understanding the ancient roots of common English words. The practice has mostly ended, but it left a cultural residue: educated English speakers are generally expected to recognize at least a handful of Latin nouns and verbs on sight.",
    worthKnowingRo:
      "La scolile private de elita din Britannia si America, latina era predata ca materie de baza pana tarziu in secolul XX, prezentata ca o poarta spre intelegerea radacinilor antice ale cuvintelor engleze comune. Practica s-a incheiat in mare parte, dar a lasat un reziduu cultural: vorbitorii educati de engleza sunt in general asteptati sa recunoasca macar o mana de substantive si verbe latine din prima vedere.",
  },
  {
    key: "vocative-o",
    number: "11",
    title: "The Vocative O",
    titleRo: "O vocativul",
    tagline: "Why 'O Canada' is not 'Oh Canada'",
    taglineRo: "De ce 'O Canada' nu e 'Oh Canada'",
    body:
      "There is a subtle, almost invisible distinction in English between \"Oh\" (the common interjection, expressing surprise or emotion) and \"O\" (a single letter, used for archaic, biblical, or ceremonial effect). The vocative O is a direct address to something or someone in a solemn, elevated register. Its primary cultural source is the King James Bible (1611), and it carries a vaguely sacred gravity that \"Oh\" does not.",
    bodyRo:
      "Exista o distinctie subtila, aproape invizibila in engleza intre \"Oh\" (interjectia comuna, exprimand surpriza sau emotie) si \"O\" (o singura litera, folosita pentru efect arhaic, biblic sau ceremonial). O vocativul este o adresare directa catre ceva sau cineva intr-un registru solemn, elevat. Sursa sa culturala principala e Biblia King James (1611), si poarta o gravitate vag sacra pe care \"Oh\" nu o are.",
    body2:
      "The distinction is visible in several well-known titles and openings. The film \"O Brother, Where Art Thou?\" uses the vocative O to capture a King James-era feeling. The Christmas carol \"O Come, All Ye Faithful\" would lose its ceremonial tone if spelled \"Oh Come.\" The Canadian national anthem begins \"O Canada.\" The Star-Spangled Banner was originally written with the vocative O (\"O say can you see\"), though today many Americans write it \"Oh\" simply because that spelling is more familiar. Most editors would advise: always write \"Oh\" unless you are deliberately pursuing a poetic, biblical, or ceremonial effect.",
    body2Ro:
      "Distinctia e vizibila in cateva titluri si deschideri binecunoscute. Filmul \"O Brother, Where Art Thou?\" foloseste O vocativul pentru a surprinde o atmosfera din era King James. Colinda \"O Come, All Ye Faithful\" si-ar pierde tonul ceremonial daca s-ar scrie \"Oh Come.\" Imnul national canadian incepe cu \"O Canada.\" The Star-Spangled Banner a fost scris initial cu O vocativul (\"O say can you see\"), desi azi multi americani il scriu \"Oh\" pur si simplu fiindca acea ortografie e mai familiara. Majoritatea editorilor ar sfatui: scrie mereu \"Oh\" cu exceptia cazului in care urmaresti deliberat un efect poetic, biblic sau ceremonial.",
    examples: [
      { en: "\"O Canada\" (vocative, ceremonial)", ro: "\"O Canada\" (vocativ, ceremonial)" },
      { en: "\"Oh, I see\" (common interjection)", ro: "\"Oh, I see\" (interjectie comuna)" },
      { en: "\"O Brother, Where Art Thou?\"", ro: "\"O Brother, Where Art Thou?\"" },
    ],
    worthKnowing:
      "The vocative O is one of those English conventions that most native speakers follow instinctively but could never explain if asked. If you polled a hundred Americans on why \"O Canada\" has no H, most would say it is simply how Canada spells things, not realizing it is a deliberate archaic English construction with a 400-year lineage.",
    worthKnowingRo:
      "O vocativul e una din acele conventii engleze pe care majoritatea vorbitorilor nativi le urmeaza instinctiv dar nu le-ar putea explica daca ar fi intrebati. Daca ai intreba o suta de americani de ce \"O Canada\" nu are H, majoritatea ar spune ca pur si simplu asa scriu canadienii, nerealizand ca e o constructie englezeasca arhaica deliberata cu o descendenta de 400 de ani.",
  },
  {
    key: "headline-english",
    number: "12",
    title: "Newspaper Headline English",
    titleRo: "Engleza de titlu de ziar",
    tagline: "A compressed dialect born of limited column inches",
    taglineRo: "Un dialect comprimat nascut din spatiul limitat al coloanelor",
    body:
      "Newspaper headline English is a distinct register of the language, a compressed, telegraphic style that drops articles, conjunctions, and auxiliary verbs to save physical space in print. Past events are described in present tense. Second adjectives are appended with commas instead of \"and.\" The result is a staccato rhythm that would be considered incorrect in any other form of English but is immediately understood by any literate speaker.",
    bodyRo:
      "Engleza de titlu de ziar e un registru distinct al limbii, un stil comprimat, telegrafic, care elimina articole, conjunctii si verbe auxiliare pentru a economisi spatiu fizic in tipar. Evenimentele trecute sunt descrise la timp prezent. Adjectivele secunde sunt adaugate cu virgule in loc de \"and.\" Rezultatul e un ritm staccato care ar fi considerat incorect in orice alta forma de engleza dar e imediat inteles de orice vorbitor alfabetizat.",
    body2:
      "The most famous joke about this convention involves British politician Michael Foot, who was once appointed to lead an arms-control organization. The headline reportedly read: \"Foot Heads Arms Body.\" Every word in that sentence has a double meaning (foot/Foot, heads/leads, arms/weapons, body/organization), but the joke only works if you understand headline grammar well enough to parse it as a legitimate headline rather than a list of body parts. The Onion, America's preeminent satirical newspaper, is a master of this register. One classic headline: \"Area Homosexual Saves Four From Fire. Man Is Hero, Gay.\" That second sentence, with the comma replacing \"and,\" is pure headline dialect, a construction you would never use in spoken English.",
    body2Ro:
      "Cea mai faimoasa gluma despre aceasta conventie il implica pe politicianul britanic Michael Foot, care a fost numit odata sa conduca o organizatie de control al armamentului. Titlul a sunat: \"Foot Heads Arms Body.\" Fiecare cuvant din acea propozitie are un dublu sens (foot/Foot, heads/conduce, arms/arme, body/organizatie), dar gluma functioneaza doar daca intelegi gramatica de titlu suficient de bine sa o citesti ca un titlu legitim si nu o lista de parti ale corpului. The Onion, principalul ziar satiric american, e un maestru al acestui registru. Un titlu clasic: \"Area Homosexual Saves Four From Fire. Man Is Hero, Gay.\" Acea a doua propozitie, cu virgula inlocuind \"and,\" e pur dialect de titlu, o constructie pe care n-ai folosi-o niciodata in engleza vorbita.",
    examples: [
      { en: "\"Foot Heads Arms Body\"", ro: "\"Foot Heads Arms Body\"" },
      { en: "\"Man Is Hero, Gay\" (The Onion)", ro: "\"Man Is Hero, Gay\" (The Onion)" },
    ],
    worthKnowing:
      "The digital age has largely eliminated the space constraint that created headline English in the first place, yet the style persists. Online publications have unlimited column width but continue writing in compressed headline dialect, which suggests the convention has outlived its practical origin and become an aesthetic choice.",
    worthKnowingRo:
      "Era digitala a eliminat in mare parte constrangerea de spatiu care a creat engleza de titlu, totusi stilul persista. Publicatiile online au latime nelimitata a coloanei dar continua sa scrie in dialect comprimat de titlu, ceea ce sugereaza ca aceasta conventie si-a supravietuit originea practica si a devenit o alegere estetica.",
  },
  {
    key: "rolling-r",
    number: "13",
    title: "The Rolling R",
    titleRo: "R-ul rulat",
    tagline: "A Latin inheritance that now signals pomposity",
    taglineRo: "O mostenire latina care acum semnaleaza pompozitate",
    body:
      "In some media and performance contexts, English speakers will pronounce the letter R by rolling their tongue in a way that is conspicuously theatrical. In pop culture, this rolled R almost always signals that a character is extremely pompous, snobby, or villainous. It shows up constantly in musical theater, where hammy actors over-deliver lines for effect. Dr. Robotnik in the old Sonic the Hedgehog cartoons speaks this way, which plays up his absurd grandiosity.",
    bodyRo:
      "In unele contexte media si de spectacol, vorbitorii de engleza pronunta litera R ruland limba intr-un mod conspicuos teatral. In cultura populara, acest R rulat semnaleaza aproape intotdeauna ca un personaj e extrem de pompos, snob sau raufacator. Apare constant in teatrul muzical, unde actorii exagerati livreaza replicile cu maximum de efect. Dr. Robotnik din vechile desene Sonic the Hedgehog vorbeste asa, ceea ce amplifica grandiozitatea lui absurda.",
    body2:
      "The association between rolling Rs and pretentiousness is itself a Latin inheritance. In Roman times, Latin contained many words pronounced with rolling Rs. This lives on prominently in Spanish, where rolling Rs are common and unremarkable. But in English, where Latin carries a reputation as the language of elites, priests, and academics, the rolling R became coded as affected, fussy, overly proper. The more proper your English becomes, the more your pronunciation starts to regress toward something resembling classical Latin, and the rolling R is the most audible symptom of that regression. Outside of theater and satire, it is almost never heard in ordinary conversation.",
    body2Ro:
      "Asocierea intre R-urile rulate si pretentiozitate e ea insasi o mostenire latina. In vremurile romane, latina continea multe cuvinte pronuntate cu R-uri rulate. Aceasta traieste proeminent in spaniola, unde R-urile rulate sunt comune si neremarcabile. Dar in engleza, unde latina are reputatia de limba a elitelor, preotilor si academicienilor, R-ul rulat a devenit codat ca afectat, pretentios, excesiv de corect. Cu cat engleza ta devine mai corecta, cu atat pronuntia ta incepe sa regreseze spre ceva asemandtor latinei clasice, iar R-ul rulat e simptomul cel mai audibil al acelei regresii. In afara teatrului si satirei, aproape niciodata nu se aude in conversatia obisnuita.",
    examples: [
      { en: "\"I'll see you rr-rot in jail!\" (theatrical villain)", ro: "\"I'll see you rr-rot in jail!\" (raufacator teatral)" },
      { en: "\"Rr-roll up the rim!\" (Tim Hortons ad)", ro: "\"Rr-roll up the rim!\" (reclama Tim Hortons)" },
    ],
    worthKnowing:
      "The Tim Hortons \"Roll Up the Rim to Win\" campaign made the rolled R its signature sound in Canadian advertising, using it purely for playful emphasis. It is one of the very few commercial uses of the rolled R that is not meant to signal pomposity or villainy.",
    worthKnowingRo:
      "Campania Tim Hortons \"Roll Up the Rim to Win\" a facut din R-ul rulat sunetul sau emblematic in publicitatea canadiana, folosindu-l pur pentru accent ludic. Este una dintre foarte putinele utilizari comerciale ale R-ului rulat care nu e menita sa semnaleze pompozitate sau rautate.",
  },
];

// ─── Component ──────────────────────────────────────────────────────────────

function ConceptSection({
  sectionTitle,
  sectionTitleRo,
  sectionSubtitle,
  sectionSubtitleRo,
  concepts,
  ro,
}: {
  sectionTitle: string;
  sectionTitleRo: string;
  sectionSubtitle: string;
  sectionSubtitleRo: string;
  concepts: Concept[];
  ro: boolean;
}) {
  const [sel, setSel] = useState(0);
  const active = concepts[sel];

  return (
    <section className="relative culture-cream-bg text-[#0C0907] py-24 md:py-32 overflow-hidden border-t border-[#0C0907]/5">
      <div className="absolute inset-0 bg-parchment-texture opacity-30 pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#0C0907]/45 font-bold">
            {ro ? sectionTitleRo : sectionTitle}
          </p>
          <h2 className="culture-text-hero text-[#0C0907] mt-4" style={{ fontSize: "clamp(36px, 6vw, 80px)" }}>
            {ro ? sectionSubtitleRo : sectionSubtitle}
          </h2>
          <div className="w-24 h-px bg-[#0C0907]/15 mx-auto mt-8" />
        </div>

        {/* Concept selector: numbered gold cards */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {concepts.map((c, i) => {
            const on = i === sel;
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => setSel(i)}
                className="group flex flex-col items-center rounded-xl px-4 py-3 transition-all duration-300 min-w-[120px]"
                style={{
                  cursor: "pointer",
                  backgroundColor: on ? "#fffdf7" : "rgba(255,253,247,0.5)",
                  border: `1px solid ${on ? "#E8391B" : "rgba(12,9,7,0.1)"}`,
                  boxShadow: on
                    ? "0 18px 40px rgb(12,9,7,0.12)"
                    : "0 2px 8px rgb(12,9,7,0.03)",
                  transform: on ? "translateY(-3px)" : "none",
                }}
              >
                <span
                  className="font-macro-display text-2xl font-black tracking-tight leading-none"
                  style={{ color: on ? "#E8391B" : "#0C0907" }}
                >
                  {c.number}
                </span>
                <span
                  className="font-body text-[10px] font-bold uppercase tracking-[0.12em] mt-1.5 leading-tight text-center"
                  style={{ color: on ? "#E8391B" : "rgba(12,9,7,0.55)" }}
                >
                  {ro ? c.titleRo : c.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active concept dossier */}
        <div key={active.key} className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14 items-start">
          {/* Left: examples + worth knowing */}
          <div className="flex flex-col gap-6">
            {/* Tagline */}
            <p className="font-body text-[10px] font-bold uppercase tracking-[0.35em] text-[#E8391B]">
              {ro ? active.taglineRo : active.tagline}
            </p>

            {/* Title */}
            <h3 className="font-macro-display text-3xl md:text-4xl font-black leading-none tracking-tight text-[#0C0907]">
              {ro ? active.titleRo : active.title}
            </h3>

            {/* Examples card */}
            {active.examples && active.examples.length > 0 && (
              <div className="rounded-2xl bg-white/55 border border-[#0C0907]/5 p-5 shadow-[0_4px_20px_rgb(12,9,7,0.04)]">
                <p className="mb-3 font-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#E8391B]">
                  {ro ? "EXEMPLE" : "EXAMPLES"}
                </p>
                <ul className="space-y-2">
                  {active.examples.map((ex, i) => (
                    <li
                      key={i}
                      className="font-editorial text-[15px] text-[#0C0907]/75 leading-relaxed pl-4 border-l-2 border-[#E8391B]/30"
                    >
                      {ro ? ex.ro : ex.en}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Worth knowing */}
            <div className="rounded-2xl bg-white/55 border border-[#0C0907]/5 p-5 shadow-[0_4px_20px_rgb(12,9,7,0.04)]">
              <p className="mb-2 font-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#E8391B]">
                {ro ? "DE STIUT" : "WORTH KNOWING"}
              </p>
              <p className="font-editorial text-[15px] leading-relaxed text-[#0C0907]/70">
                {ro ? active.worthKnowingRo : active.worthKnowing}
              </p>
            </div>
          </div>

          {/* Right: body text */}
          <div className="flex flex-col gap-5">
            <p className="font-editorial text-[17px] leading-[1.75] text-[#0C0907]/75">
              {ro ? active.bodyRo : active.body}
            </p>
            {active.body2 && (
              <p className="font-editorial text-[17px] leading-[1.75] text-[#0C0907]/75">
                {ro ? active.body2Ro : active.body2}
              </p>
            )}
            {active.body3 && (
              <p className="font-editorial text-[17px] leading-[1.75] text-[#0C0907]/75">
                {ro ? active.body3Ro : active.body3}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function AdvancedEnglishConcepts() {
  const { locale } = useLanguage();
  const ro = locale === "ro";

  return (
    <>
      {/* Section I */}
      <ConceptSection
        sectionTitle="EXPERT-LEVEL ENGLISH"
        sectionTitleRo="ENGLEZA LA NIVEL DE EXPERT"
        sectionSubtitle="SUPER ADVANCED CONCEPTS"
        sectionSubtitleRo="CONCEPTE SUPER AVANSATE"
        concepts={SECTION_ONE}
        ro={ro}
      />

      {/* Gold divider between sections */}
      <div className="relative culture-cream-bg overflow-hidden">
        <div className="mx-auto max-w-3xl px-6 py-10 flex items-center gap-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#E8B923]/40 to-transparent" />
          <span className="font-macro-display text-3xl font-black text-[#E8B923]/30 select-none">II</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#E8B923]/40 to-transparent" />
        </div>
      </div>

      {/* Section II */}
      <ConceptSection
        sectionTitle="EVEN DEEPER"
        sectionTitleRo="SI MAI ADANC"
        sectionSubtitle="MORE SUPER-DUPER ADVANCED"
        sectionSubtitleRo="MAI MULTE CONCEPTE SUPER-DUPER AVANSATE"
        concepts={SECTION_TWO}
        ro={ro}
      />
    </>
  );
}
