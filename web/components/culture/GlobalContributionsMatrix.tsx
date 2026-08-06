"use client";

// ─── GlobalContributionsMatrix ───────────────────────────────────────────────
// "What Every Country Added to American Culture": The Immigration & Melting-Pot
// Synthesis. Explores non-food, non-demographic contributions of 19 nations to
// the fabric of American civilization.
// Adapted from research in JJ McCullough's "What every country added to American culture."
// Written in the site's own editorial voice: zero em dashes, zero AI tropes.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface Contribution {
  key?: string;
  country: string;
  countryRo: string;
  flag: string;
  category: "arts" | "systems" | "lifestyle";
  categoryLabel: string;
  categoryLabelRo: string;
  contribution: string;
  contributionRo: string;
  tagline: string;
  taglineRo: string;
  detail: string;
  detailRo: string;
  body3?: string;
  body3Ro?: string;
  worthKnowing: string;
  worthKnowingRo: string;
}

const CONTRIBUTIONS: Contribution[] = [
  {
    country: "Argentina",
    countryRo: "Argentina",
    flag: "🇦🇷",
    category: "arts",
    categoryLabel: "Arts & Music",
    categoryLabelRo: "Arta si Muzica",
    contribution: "The Tango & Cinematic Atmosphere",
    contributionRo: "Tango-ul si atmosfera cinematografica",
    tagline: "Accordion rhythms capturing romantic and frantic film scores",
    taglineRo: "Ritmuri de acordeon care capteaza coloane sonore romantice si frenetice",
    detail:
      "Originating in Buenos Aires, the Tango entered mainstream American culture as both a formal partner dance and an indispensable musical tool. Its dramatic accordion melodies capture moods from intense romance to frantic suspense in American film, television, and video game scoring.",
    detailRo:
      "Cu origini in Buenos Aires, Tango-ul a intrat in cultura americana ca dans formal in doi si ca instrument muzical indispensabil. Melodiile sale dramatice de acordeon capteaza stari de la romantism intens la suspans frenetic in film, televiziune si jocuri video.",
    worthKnowing:
      "Tango remains one of the top five formal partner dances taught in American dance academies, while its distinctive beat is widely used by Hollywood composers to signal dramatic tension.",
    worthKnowingRo:
      "Tango-ul ramane unul dintre cele mai importante cinci dansuri de cuplu predate in academiile americane de dans, in timp ce ritmul sau caracteristic este folosit de compozitorii de la Hollywood pentru a semnala tensiune dramatica.",
  },
  {
    country: "Australia",
    countryRo: "Australia",
    flag: "🇦🇺",
    category: "lifestyle",
    categoryLabel: "Pop Culture & Media",
    categoryLabelRo: "Cultura Pop si Media",
    contribution: "Outback Wildlife & Animated Icons",
    contributionRo: "Fauna din Outback si personaje animate",
    tagline: "Kangaroos, koalas, and platypuses as American childhood staples",
    taglineRo: "Cangurii, koala si urangutanii ca simboluri ale copilariei americane",
    detail:
      "Australia's unique marsupials and reptiles captured the American imagination, becoming beloved pop-culture symbols. Characters like Looney Tunes' Tasmanian Devil and Phineas & Ferb's Perry the Platypus demonstrate how Australian fauna was absorbed directly into iconic American cartoons.",
    detailRo:
      "Marsupialele si reptilele unice din Australia au captivat imaginatia americana, devenind simboluri indragite ale culturii pop. Personaje precum Diavolul Tasmanian din Looney Tunes si Perry Platipusul din Phineas & Ferb demonstreaza cum fauna australiana a fost absorbita direct in desenele animate americane.",
    worthKnowing:
      "Despite living thousands of miles away, Australian animals are among the most recognized characters in American children's literature, toy lines, and zoo exhibits.",
    worthKnowingRo:
      "Desi traiesc la mii de kilometri departare, animalele australiene sunt printre cele mai recunoscute personaje din literatura americana pentru copii, liniile de jucarii si gradinile zoologice.",
  },
  {
    country: "Austria",
    countryRo: "Austria",
    flag: "🇦🇹",
    category: "systems",
    categoryLabel: "Philosophy & Economics",
    categoryLabelRo: "Filozofie si Economie",
    contribution: "Free-Market Austrian Economics",
    contributionRo: "Economia austriaca de piata libera",
    tagline: "Friedrich Hayek, Ludwig von Mises, and the free-enterprise movement",
    taglineRo: "Friedrich Hayek, Ludwig von Mises si miscarea liberei initiative",
    detail:
      "Austrian economists Friedrich Hayek and Ludwig von Mises provided the key intellectual framework for modern American conservative and libertarian economic thought. Their theories argued that free markets and individual liberty are inextricably linked, forming a core pillar of post-war American economic policy.",
    detailRo:
      "Economistii austrieci Friedrich Hayek si Ludwig von Mises au oferit cadrul intelectual cheie pentru gandirea economica americana conservatoare si libertariana. Teoriile lor au argumentat ca piețele libere si libertatea individuala sunt legate inseparabil, formand un pilon al politicii economice americane postbelice.",
    worthKnowing:
      "While Austrian economics remains a major intellectual signifier in American free-market policy institutes, its political influence in Austria itself was far less pronounced in the post-war era.",
    worthKnowingRo:
      "In timp ce economia austriaca ramane un reper intelectual major in institutele americane de piata libera, influenta sa politica in Austria a fost mult mai putin pronuntata in era postbelica.",
  },
  {
    country: "Brazil",
    countryRo: "Brazilia",
    flag: "🇧🇷",
    category: "arts",
    categoryLabel: "Arts & Music",
    categoryLabelRo: "Arta si Muzica",
    contribution: "Bossa Nova Jazz & Ambient Soundscapes",
    contributionRo: "Jazz-ul Bossa Nova si fondul sonor ambiental",
    tagline: "Rio's smooth jazz rhythms shaping American lounge and broadcast audio",
    taglineRo: "Ritmurile de smooth jazz din Rio modeland muzica americana de ambianta",
    detail:
      "Developed on the beaches of Rio de Janeiro in the 1950s, Bossa Nova fused samba rhythms with cool jazz. American musicians like Stan Getz embraced the genre, creating timeless hits that redefined relaxing lounge music across American radio, film scores, and corporate environments.",
    detailRo:
      "Dezvoltata pe plajele din Rio de Janeiro in anii 1950, Bossa Nova a fuzionat ritmurile de samba cu cool jazz. Muzicieni americani precum Stan Getz au imbratisat genul, creand hituri atemporale care au redefinit muzica de relaxare la radioul american, in filme si in spatii comerciale.",
    worthKnowing:
      "Bossa Nova became the gold standard for ambient background music in America, shaping the sound of mid-century lounges, hotel lobbies, and broadcast audio.",
    worthKnowingRo:
      "Bossa Nova a devenit standardul de aur pentru muzica de fundal in America, modeland sunetul localurilor de la mijlocul secolului, al holurilor de hotel si al transmisiilor audio.",
  },
  {
    country: "Egypt",
    countryRo: "Egipt",
    flag: "🇪🇬",
    category: "lifestyle",
    categoryLabel: "Pop Culture & Media",
    categoryLabelRo: "Cultura Pop si Media",
    contribution: "Ancient Mystery & Universal Monster Lore",
    contributionRo: "Misterul antic si monstrii clasici Universal",
    tagline: "The 1922 Tutankhamun discovery creating Halloween's Mummy icon",
    taglineRo: "Descoperirea lui Tutankhamon din 1922 creand icoana Mumiilor de Halloween",
    detail:
      "The 1922 discovery of King Tutankhamun's tomb sparked a nationwide 'Mummy Mania' in the United States. Hollywood studio Universal Pictures transformed ancient Egyptian burial traditions into a classic movie monster franchise, establishing the Mummy as a permanent fixture of American Halloween folklore alongside vampires and witches.",
    detailRo:
      "Descoperirea mormantului regelui Tutankhamon din 1922 a starnit o 'Manie a Mumiilor' in Statele Unite. Studioul Hollywoodian Universal Pictures a transformat traditiile funerare egiptene intr-o franciza clasica de monstri, stabilind Muma ca un element permanent al folclorului american de Halloween alaturi de vampiri si vrajitoare.",
    worthKnowing:
      "Architectural revivals inspired by Egypt swept American cities in the 1920s, visible in movie palaces, lodge halls, and monument designs across the country.",
    worthKnowingRo:
      "Stilul arhitectural de inspiratie egipteana a cuprins orasele americane in anii 1920, fiind vizibil in cinematografe, sali de festivitati si monumente din intreaga tara.",
  },
  {
    country: "France",
    countryRo: "Franta",
    flag: "🇫🇷",
    category: "systems",
    categoryLabel: "Language & Style",
    categoryLabelRo: "Limba si Stil",
    contribution: "Linguistic Elegance & Conversational Expressions",
    contributionRo: "Eleganta lingvistica si expresiile conversationale",
    tagline: "Touché, déjà vu, coup d'état, RSVP, and conversational loanwords",
    taglineRo: "Touché, déjà vu, coup d'état, RSVP si imprumuturile conversationale",
    detail:
      "Beyond its colonial legacy, France contributed scores of everyday loanwords and phrases to standard American English. Expressions like touché, déjà vu, faux pas, coup d'état, bon appétit, and the universal invitation code RSVP are woven directly into American conversation to express nuance and sophistication.",
    detailRo:
      "Dincolo de mostenirea sa coloniala, Franta a contribuit cu zeci de cuvinte si expresii zilnice in engleza americana standard. Expresii precum touché, déjà vu, faux pas, coup d'état, bon appétit si codul universal de invitatie RSVP sunt tesute direct in conversatia americana pentru a exprima nuanta si sofisticare.",
    worthKnowing:
      "French loanwords in American English are so thoroughly assimilated that most native speakers use acronyms like RSVP (répondez s'il vous plaît) without realizing they are speaking French.",
    worthKnowingRo:
      "Imprumuturile franceze in engleza americana sunt atat de asimilate incat majoritatea vorbitorilor nativi folosesc acronime precum RSVP fara sa realizeze ca vorbesc franceza.",
  },
  {
    country: "Germany",
    countryRo: "Germania",
    flag: "🇩🇪",
    category: "systems",
    categoryLabel: "Education & Structure",
    categoryLabelRo: "Educatie si Structura",
    contribution: "The Modern K-12 Educational System",
    contributionRo: "Sistemul educational modern K-12",
    tagline: "Prussian age-graded classrooms, dedicated teachers, and Kindergarten",
    taglineRo: "Clasele prusace pe grupe de varsta, profesorii dedicati si Kindergarten-ul",
    detail:
      "In the late 19th century, American school reformers explicitly adopted the Prussian educational model. They replaced one-room schoolhouses with age-graded classrooms, specialized grade teachers, and structured curricula. The most visible German legacy remains the entry point to American primary education: Kindergarten.",
    detailRo:
      "La sfarsitul secolului XIX, reformatorii scolari americani au adoptat modelul educational prusac. Au inlocuit scolile cu o singura clasa cu sali de clasa impartite pe varste, profesori specializati si programe structurate. Cea mai vizibila mostenire germana ramane punctul de intrare in educatia primara americana: Kindergarten.",
    body3: "Kindergarten literally means 'children's garden' in German.",
    body3Ro: "Kindergarten inseamna literal 'gradina copiilor' in limba germana.",
    worthKnowing:
      "German immigrants also brought gymnastics clubs (Turnvereins) that established physical education and school sports programs across 19th-century American public schools.",
    worthKnowingRo:
      "Imigrantii germani au adus si cluburile de gimnastica (Turnvereins) care au stabilit educatia fizica si programele de sport in scolile publice americane din secolul XIX.",
  },
  {
    country: "India",
    countryRo: "India",
    flag: "🇮🇳",
    category: "lifestyle",
    categoryLabel: "Wellness & Lifestyle",
    categoryLabelRo: "Stil de viata si Sanatate",
    contribution: "Yoga, Meditation & Mind-Body Fitness",
    contributionRo: "Yoga, meditarea si stilul de viata minte-corp",
    tagline: "From ancient Hindu practice to a multi-billion dollar American wellness industry",
    taglineRo: "De la practica hindusa antica la o industrie americana de miliarde de dolari",
    detail:
      "Rooted in ancient Hindu traditions, yoga entered American culture through visiting spiritual teachers and immigrants, evolving into a mainstream health movement by the 1980s. Today, yoga studios, mindfulness practices, and athletic apparel form a multi-billion dollar industry that reshaped American concepts of physical fitness and mental well-being.",
    detailRo:
      "Cu radacini in traditiile hinduse antice, yoga a intrat in cultura americana prin profesori spirituali si imigranti, evoluand intr-o miscare de sanatate in anii 1980. Azi, studiourile de yoga, practicile de mindfulness si echipamentele sportive formeaza o industrie de miliarde de dolari ce a remodelat conceptele americane despre sanatate.",
    worthKnowing:
      "Yoga is practiced by over 36 million Americans, making it one of the largest eastern philosophical adoptions in Western history.",
    worthKnowingRo:
      "Yoga este practicata de peste 36 de milioane de americani, fiind una dintre cele mai mari adoptari ale unei filozofii estice din istoria occidentala.",
  },
  {
    key: "indonesia",
    country: "Indonesia",
    countryRo: "Indonezia",
    flag: "🇮🇩",
    category: "systems",
    categoryLabel: "Language & Technology",
    categoryLabelRo: "Limba si Tehnologie",
    contribution: "Coffee Slang & Software Programming Syntax",
    contributionRo: "Argoul pentru cafea si sintaxa de programare",
    tagline: "Java island trade creating 'a cup of Java' and tech language names",
    taglineRo: "Comertul cu cafea din insula Java creand 'o ceasca de Java' si limbajele tech",
    detail:
      "As a primary 19th-century exporter of coffee beans to North America, the Indonesian island of Java became standard American slang for coffee ('a cup of Java'). Decades later, American computer engineers at Sun Microsystems named their revolutionary programming language Java, cementing an Indonesian place-name into global software infrastructure.",
    detailRo:
      "Ca principal exportator de boabe de cafea in America de Nord in secolul XIX, insula indoneziana Java a devenit argoul american standard pentru cafea ('o ceasca de Java'). Decenii mai tarziu, inginerii americani de la Sun Microsystems si-au numit limbajul revolutionar de programare Java, ancorand un nume de loc indonezian in infrastructura software globala.",
    worthKnowing:
      "JavaScript, the programming language powering the modern interactive web, was explicitly named to capitalize on the popularity of Java, giving Indonesia a double legacy in digital technology.",
    worthKnowingRo:
      "JavaScript, limbajul de programare ce alimenteaza web-ul interactiv modern, a fost numit explicita pentru a capitaliza pe popularitatea Java, oferind Indoneziei o dubla mostenire in tehnologia digitala.",
  },
  {
    key: "italy",
    country: "Italy",
    countryRo: "Italia",
    flag: "🇮🇹",
    category: "lifestyle",
    categoryLabel: "Fashion & Glamour",
    categoryLabelRo: "Moda si Eleganta",
    contribution: "High-End Luxury Fashion & Glamour",
    contributionRo: "Moda de lux si eleganta de nivel inalt",
    tagline: "Gucci, Prada, Armani, and Versace defining American status",
    taglineRo: "Gucci, Prada, Armani si Versace definind statutul american",
    detail:
      "While early Italian immigration brought working-class food culture, post-WWII Italy emerged as a titan of high-end luxury design. Houses like Gucci, Prada, Giorgio Armani, and Versace became standard symbols of sophistication, red-carpet glamour, and executive success in American society.",
    detailRo:
      "In timp ce imigrarea italiana timpurie a adus cultura culinara, Italia postbelica a devenit un titan al designului de lux. Case precum Gucci, Prada, Giorgio Armani si Versace au devenit simboluri standard de sofisticare, eleganta pe covorul rosu si succes executiv in societatea americana.",
    worthKnowing:
      "Italian fashion houses dominate Hollywood award season wardrobes, making Italian tailoring the global benchmark for celebrity formal wear.",
    worthKnowingRo:
      "Casele italiene de moda domina garderobele din sezonul premiilor de la Hollywood, facand din croitoria italiana etalonul global pentru tinutele formale ale celebritatilor.",
  },
  {
    key: "japan",
    country: "Japan",
    countryRo: "Japonia",
    flag: "🇯🇵",
    category: "arts",
    categoryLabel: "Interactive Entertainment",
    categoryLabelRo: "Divertisment Interactiv",
    contribution: "Video Games & Interactive Media",
    contributionRo: "Jocurile video si media interactiva",
    tagline: "Nintendo, PlayStation, and arcade design creating America's #1 media industry",
    taglineRo: "Nintendo, PlayStation si designul arcade creand industria media #1 a Americii",
    detail:
      "From 1980s arcade cabinets to home consoles, Japanese gaming companies like Nintendo, Sega, and Sony shaped American youth entertainment. Iconic franchises (Mario, Zelda, Pokemon) built the interactive foundation of an industry that now generates more revenue in North America than film and music combined.",
    detailRo:
      "De la aparatele arcade din anii 1980 la consolele de acasa, companiile japoneze precum Nintendo, Sega si Sony au modelat divertismentul tinerilor americani. Francize emblematice (Mario, Zelda, Pokemon) au construit fundatia interactiva a unei industrii ce genereaza mai multe venituri in America de Nord decat filmul si muzica la un loc.",
    worthKnowing:
      "The 1985 launch of the Nintendo Entertainment System (NES) is credited with saving the North American video game market after the 1983 industry crash.",
    worthKnowingRo:
      "Lansarea din 1985 a Nintendo Entertainment System (NES) este creditata cu salvarea pietei nord-americane de jocuri video dupa prabusirea industriei din 1983.",
  },
  {
    key: "nigeria",
    country: "Nigeria",
    countryRo: "Nigeria",
    flag: "🇳🇬",
    category: "lifestyle",
    categoryLabel: "Textiles & Identity",
    categoryLabelRo: "Textile si Identitate",
    contribution: "Ankara Textiles & Afrocentric Identity",
    contributionRo: "Textilele Ankara si identitatea afrocentrica",
    tagline: "Vibrant patterned prints, dashikis, and gelè wraps in American fashion",
    taglineRo: "Imprimeurile Ankara, dashiki si esarfele gelè in moda americana",
    detail:
      "Nigeria, as the largest African country of origin for modern immigrants, heavily influenced African-American cultural identity. Traditional Ankara pattern fabrics, dashikis, and gelè head wraps were adopted into American fashion during the Civil Rights movement, providing visual heritage symbols that remain prominent in formal events and pop culture.",
    detailRo:
      "Nigeria, ca cea mai mare tara africana de origine pentru imigrantii moderni, a influentat puternic identitatea culturala afro-americana. Materialele cu imprimeuri Ankara, dashiki si esarfele gelè au fost adoptate in moda americana in timpul miscarii pentru drepturi civile, oferind simboluri de mostenire vizuala ce raman proeminente la evenimente formale.",
    worthKnowing:
      "Nigerian Afrobeats music and fashion designers are currently undergoing a major commercial explosion in American media, topping billboard charts and fashion weeks.",
    worthKnowingRo:
      "Muzica nigeriana Afrobeats si designerii de moda trec in prezent printr-o explozie comerciala majora in presa americana, dominand topurile billboard si saptamanile modei.",
  },
  {
    key: "jamaica",
    country: "Jamaica",
    countryRo: "Jamaica",
    flag: "🇯🇲",
    category: "arts",
    categoryLabel: "Music & Subculture",
    categoryLabelRo: "Muzica si Subcultura",
    contribution: "Reggae & Counterculture Relaxation Aesthetics",
    contributionRo: "Reggae si estetica de relaxare din counter-cultura",
    tagline: "Bob Marley's musical legacy and Rastafarian chill sensibilities",
    taglineRo: "Mostenirea muzicala a lui Bob Marley si senzitivitatea de relaxare Rastafariana",
    detail:
      "Jamaican reggae music, popularized globally by Bob Marley, exerted a profound influence on American counterculture in the 1970s. The Rastafarian philosophy of environmental connection, spiritual ease, and laid-back musical basslines permanently shaped American summer aesthetics, festival culture, and popular music production.",
    detailRo:
      "Muzica jamaicana reggae, popularizata global de Bob Marley, a exercitat o influenta profunda asupra counter-culturii americane in anii 1970. Filozofia Rastafariana de conexiune cu mediul, relaxare spirituala si linii de bas muzicale au modelat estetica verilor americane, cultura festivalurilor si muzica pop.",
    worthKnowing:
      "Jamaican sound-system culture and 'toasting' over instrumental tracks in the 1960s were directly imported to New York City by DJ Kool Herc, laying the foundational blueprint for American Hip-Hop.",
    worthKnowingRo:
      "Cultura sistemelor de sunet jamaicane si 'toasting-ul' peste piese instrumentale in anii 1960 au fost importate direct in New York de DJ Kool Herc, punand bazele Hip-Hop-ului american.",
  },
  {
    key: "russia",
    country: "Russia",
    countryRo: "Rusia",
    flag: "🇷🇺",
    category: "systems",
    categoryLabel: "Geopolitics & Contrast",
    categoryLabelRo: "Geopolitica si Contrast",
    contribution: "Cold War Ideological Antithesis & Constitutional Resolve",
    contributionRo: "Antiteza ideologica din Razboiul Rece si vointa constitutionala",
    tagline: "The totalitarian contrast that defined 20th-century American free-world leadership",
    taglineRo: "Contrastul totalitar ce a definit conducerea lumii libere in secolul XX",
    detail:
      "The rise of the Soviet state provided the primary geopolitical counterpart against which 20th-century America defined its identity as leader of the free world. The Cold War struggle reinforced American constitutional principles of free speech, private property, and religious freedom as explicit contrasts to state control.",
    detailRo:
      "Ascensiunea statului sovietic a oferit principalul corespondent geopolitic fata de care America secolului XX si-a definit identitatea de lider al lumii libere. Lupta din Razboiul Rece a intarit principiile constitutionale americane privind libertatea de exprimare, proprietatea privata si libertatea religioasa ca contraste explicite fata de controlul statal.",
    worthKnowing:
      "The Space Race against the USSR directly accelerated American investment in NASA, scientific research, and computer technology, yielding microchips and satellite GPS.",
    worthKnowingRo:
      "Cursa spatiala impotriva URSS a accelerat direct investitiile americane in NASA, cercetarea stiintifica si tehnologia calculatoarelor, generand microcipul si sistemul GPS.",
  },
  {
    key: "saudi-arabia",
    country: "Saudi Arabia",
    countryRo: "Arabia Saudita",
    flag: "🇸🇦",
    category: "systems",
    categoryLabel: "Energy & Infrastructure",
    categoryLabelRo: "Energie si Infrastructura",
    contribution: "Energy Dynamics & Resource Independence Resolve",
    contributionRo: "Dinamica energetica si vointa de independenta de resurse",
    tagline: "20th-century petroleum trade spurring North American energy innovation",
    taglineRo: "Comertul cu petrol din secolul XX stimulând inovatia energetica nord-americana",
    detail:
      "Saudi Arabia's vast petroleum reserves and 20th-century trade partnerships fueled American automotive growth while creating a heightened national focus on strategic energy security. The desire to avoid foreign supply shocks ultimately drove North America to achieve energy self-sufficiency through domestic innovation.",
    detailRo:
      "Rezervele vaste de petrol ale Arabiei Saudite si parteneriatele comerciale din secolul XX au alimentat cresterea automobilistica americana, creand o atentie nationala sporita asupra securitatii energetice strategice. Dorinta de a evita socurile de aprovizionare a determinat America de Nord sa atinga autosuficienta energetica prin inovatie interna.",
    worthKnowing:
      "The energy crises of the 1970s led directly to US federal fuel efficiency standards, national speed limits, and the creation of the Strategic Petroleum Reserve.",
    worthKnowingRo:
      "Crizele energetice din anii 1970 au dus direct la standardele federale de eficienta a combustibilului, limite de viteza nationale si crearea Rezervei Strategice de Petrol.",
  },
  {
    key: "south-africa",
    country: "South Africa",
    countryRo: "Africa de Sud",
    flag: "🇿🇦",
    category: "lifestyle",
    categoryLabel: "Customs & Marketing",
    categoryLabelRo: "Obiceiuri si Marketing",
    contribution: "The Diamond Engagement Ring Custom",
    contributionRo: "Obiceiul inelului de logodna cu diamant",
    tagline: "Late 19th-century diamond mining marketing creating the universal romance gesture",
    taglineRo: "Marketingul diamantelor din secolul XIX creand gestul universal de dragoste",
    detail:
      "Following late 19th-century diamond discoveries in South Africa, the De Beers mining corporation launched an iconic marketing campaign ('A Diamond is Forever') that established buying a diamond engagement ring as a universal American symbol of romantic commitment.",
    detailRo:
      "In urma descoperirilor de diamante din Africa de Sud la sfarsitul secolului XIX, corporatia miniera De Beers a lansat o campanie emblematica de marketing ('A Diamond is Forever') ce a stabilit cumpararea unui inel de logodna cu diamant ca un simbol american universal de angajament romantic.",
    worthKnowing:
      "Before the 1930s De Beers campaign, fewer than 10% of American engagement rings contained diamonds; by 1990, over 80% did, making it a textbook marketing transformation.",
    worthKnowingRo:
      "Inainte de campania De Beers din anii 1930, mai putin de 10% din inelele de logodna americane contineau diamante; pana in 1990, peste 80% contineau, fiind o transformare clasica de marketing.",
  },
  {
    key: "south-korea",
    country: "South Korea",
    countryRo: "Coreea de Sud",
    flag: "🇰🇷",
    category: "lifestyle",
    categoryLabel: "Consumer Tech & Media",
    categoryLabelRo: "Tehnologie de consum si Media",
    contribution: "Consumer Electronics & Hallyu Media Wave",
    contributionRo: "Electronicele de consum si valul media Hallyu",
    tagline: "Samsung displays, mobile tech, K-pop, and modern digital integration",
    taglineRo: "Ecranele Samsung, tehnologia mobila, K-pop-ul si integrarea digitala",
    detail:
      "South Korea's rapid industrialization made tech giant Samsung a household fixture in American homes via televisions, smartphones, and appliances. In recent years, the Korean Wave (Hallyu) expanded this influence through K-pop music, cinema (Parasite), and streaming television.",
    detailRo:
      "Industrializarea rapida a Coreei de Sud a facut din gigantul tehnologic Samsung un element de baza in casele americane prin televizoare, smartphone-uri si electrocasnice. In ultimii ani, Valul Coreean (Hallyu) a extins aceasta influenta prin muzica K-pop, cinematografie (Parasite) si televiziune.",
    worthKnowing:
      "Samsung devices account for nearly 30% of all smartphones used in North America, forming a daily technological infrastructure for tens of millions of citizens.",
    worthKnowingRo:
      "Dispozitivele Samsung reprezinta aproape 30% din toate smartphone-urile folosite in America de Nord, formand o infrastructura tehnologica zilnica pentru zeci de milioane de cetateni.",
  },
  {
    key: "sweden",
    country: "Sweden",
    countryRo: "Suedia",
    flag: "🇸🇪",
    category: "lifestyle",
    categoryLabel: "Design & Living",
    categoryLabelRo: "Design si Stil de viata",
    contribution: "Modular Home Design & Flat-Pack Living",
    contributionRo: "Designul modular pentru casa si stilul de viata flat-pack",
    tagline: "IKEA democratizing affordable Scandinavian interior design",
    taglineRo: "IKEA democratizand designul interior scandinav accesibil",
    detail:
      "Swedish furniture pioneer IKEA introduced flat-pack modular furniture to America in the late 1970s. Its clean, functional Scandinavian design democratized interior decorating for young families and college students, becoming a defining fixture of modern suburban homes.",
    detailRo:
      "Pionierul suedez de mobila IKEA a introdus mobila modulara flat-pack in America la sfarsitul anilor 1970. Designul sau scandinav curat si functional a democratizat decorarea interioara pentru familiile tinere si studenti, devenind un element definitoriu al caselor suburbane moderne.",
    worthKnowing:
      "With over 50 mega-stores in North America, IKEA created a unique retail ritual centered on self-assembly, affordable Scandinavian aesthetic, and Swedish meatballs.",
    worthKnowingRo:
      "Cu peste 50 de magazine mari in America de Nord, IKEA a creat un ritual unic de cumparaturi centrat pe auto-asamblare, estetica scandinava accesibila si chiftelute suedeze.",
  },
  {
    key: "turkey-iran",
    country: "Turkey / Iran",
    countryRo: "Turcia / Iran",
    flag: "🇹🇷",
    category: "arts",
    categoryLabel: "Craftsmanship & Decor",
    categoryLabelRo: "Mestesug si Decor",
    contribution: "Handwoven Luxury Rugs & Textile Artistry",
    contributionRo: "Covoarele de lux tesute manual si arta textilelor",
    tagline: "The gold standard for architectural interior floor craftsmanship",
    taglineRo: "Standardul de aur pentru mestesugul interior al pardoselilor",
    detail:
      "Centuries of Anatolian and Persian textile mastery established Turkish and Persian handwoven rugs as the platonic ideal of floor decor in American homes. From historic New England estates to modern architectural lofts, hand-knotted rugs represent the pinnacle of artisanal home craftsmanship.",
    detailRo:
      "Secole de maestrie textila anatoliana si persana au stabilit covoarele tesute manual turcesti si persane ca idealul platonic al decorului pentru pardoseli in casele americane. De la domeniile istorice din New England la mansardele arhitecturale moderne, covoarele tesute manual reprezinta varful mestesugului casnic.",
    worthKnowing:
      "Authentic hand-knotted rugs can take skilled weavers over a year to complete, making them prized heirlooms passed down through generations of American families.",
    worthKnowingRo:
      "Covoarele autentice tesute manual pot necesita peste un an de munca din partea tesatorilor calificati, fiind mosteniri de pret transmise de-a lungul generatiilor de familii americane.",
  },
];

export function GlobalContributionsMatrix() {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const [filter, setFilter] = useState<"all" | "arts" | "systems" | "lifestyle">("all");
  const [sel, setSel] = useState(0);

  const filtered = filter === "all" ? CONTRIBUTIONS : CONTRIBUTIONS.filter((c) => c.category === filter);
  const active = filtered[sel] || filtered[0] || CONTRIBUTIONS[0];

  return (
    <section className="culture-bg text-[#F5EDD8] py-24 md:py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-body text-[11px] uppercase tracking-[0.3em] text-glory-gold font-bold mb-3">
            {ro ? "SINTEZA IMIGRATIEI SI A CREUZETULUI CULTURAL" : "THE IMMIGRATION & MELTING-POT SYNTHESIS"}
          </p>
          <h2 className="culture-text-hero text-[#F5EDD8] text-4xl sm:text-6xl font-black tracking-tight">
            {ro ? "CE A ADAUGAT FIECARE TARA" : "WHAT EVERY COUNTRY ADDED"}
          </h2>
          <p className="mx-auto mt-6 max-w-3xl font-editorial text-xl italic text-[#F5EDD8]/80 leading-relaxed">
            {ro
              ? "„America este o sinteza continentală modelată de fiecare colț al planetei. Dincolo de cifre demografice și restaurante, aproape fiecare națiune a contribuit cu un fir de înalt profil la țesătura vieții americane.”"
              : "“America is a continental synthesis shaped by every corner of the planet. Beyond demographic numbers and ethnic restaurants, nearly every nation has contributed a distinct, high-profile thread to the fabric of American life.”"}
          </p>
          <div className="w-24 h-px bg-glory-gold/30 mx-auto mt-8" />
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { id: "all", en: "All 19 Nations", ro: "Toate cele 19 Natiuni" },
            { id: "arts", en: "Arts & Entertainment", ro: "Arta si Divertisment" },
            { id: "systems", en: "Philosophy & Systems", ro: "Filozofie si Sisteme" },
            { id: "lifestyle", en: "Lifestyle & Tech", ro: "Stil de viata si Tech" },
          ].map((tab) => {
            const on = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setFilter(tab.id as any);
                  setSel(0);
                }}
                className="rounded-full px-5 py-2 font-body text-xs font-bold uppercase tracking-wider transition-all duration-300"
                style={{
                  cursor: "pointer",
                  backgroundColor: on ? "#E8B923" : "rgba(255,255,255,0.04)",
                  color: on ? "#0C0907" : "rgba(245,237,216,0.7)",
                  border: `1px solid ${on ? "#E8B923" : "rgba(255,255,255,0.1)"}`,
                }}
              >
                {ro ? tab.ro : tab.en}
              </button>
            );
          })}
        </div>

        {/* Country selector tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {filtered.map((c, i) => {
            const on = i === sel;
            return (
              <button
                key={c.country}
                type="button"
                onClick={() => setSel(i)}
                className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 transition-all duration-300"
                style={{
                  cursor: "pointer",
                  backgroundColor: on ? "rgba(232,185,35,0.15)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${on ? "#E8B923" : "rgba(255,255,255,0.08)"}`,
                  transform: on ? "translateY(-2px)" : "none",
                }}
              >
                <span className="text-lg">{c.flag}</span>
                <span
                  className="font-body text-xs font-bold uppercase tracking-wide"
                  style={{ color: on ? "#E8B923" : "#F5EDD8" }}
                >
                  {ro ? c.countryRo : c.country}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active country dossier card */}
        <div key={active.country} className="culture-glass rounded-3xl border border-white/10 p-8 md:p-12 shadow-[0_30px_90px_rgb(0,0,0,0.5)]">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] items-start">
            {/* Left: header & taglines */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{active.flag}</span>
                <div>
                  <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-glory-gold">
                    {ro ? active.categoryLabelRo : active.categoryLabel}
                  </span>
                  <h3 className="font-macro-display text-4xl sm:text-5xl font-black text-white leading-none">
                    {ro ? active.countryRo : active.country}
                  </h3>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-white/5 border border-white/10 p-5">
                <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#E8391B] mb-2">
                  {ro ? "CONTRIBUTIA PRINCIPALA" : "PRIMARY CONTRIBUTION"}
                </p>
                <p className="font-macro-display text-2xl font-black text-white leading-snug">
                  {ro ? active.contributionRo : active.contribution}
                </p>
                <p className="font-body text-xs text-[#F5EDD8]/60 mt-2">
                  {ro ? active.taglineRo : active.tagline}
                </p>
              </div>

              {/* Worth knowing box */}
              <div className="mt-6 rounded-2xl border border-glory-gold/20 bg-glory-gold/[0.04] p-5">
                <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-glory-gold mb-2">
                  {ro ? "DE STIUT" : "WORTH KNOWING"}
                </p>
                <p className="font-editorial text-sm leading-relaxed text-[#F5EDD8]/80">
                  {ro ? active.worthKnowingRo : active.worthKnowing}
                </p>
              </div>
            </div>

            {/* Right: detailed body */}
            <div className="flex flex-col justify-center gap-4 lg:pl-6 lg:border-l lg:border-white/10">
              <p className="font-editorial text-xl md:text-2xl leading-relaxed text-[#F5EDD8]/90">
                {ro ? active.detailRo : active.detail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
