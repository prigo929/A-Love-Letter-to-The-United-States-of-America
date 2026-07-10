export interface StateExtendedData {
  governor: { en: string; ro: string };
  legislature: { en: string; ro: string };
  electoralVotes: number;
  politicalStructure: { en: string; ro: string };
  flagDesc: { en: string; ro: string };
  sealDesc: { en: string; ro: string };
  admissionUnion: { en: string; ro: string };
  uniqueLaws: { en: string[]; ro: string[] };
  historicalFirsts: { en: string[]; ro: string[] };
  constitution: {
    adoptedYear: number;
    amendmentsCount: number;
    wordCount: number;
    provisions: { en: string[]; ro: string[] };
  };
}

export const STATE_EXTENDED_DATA: Record<string, StateExtendedData> = {
  AL: {
    governor: { en: "Kay Ivey (R)", ro: "Kay Ivey (R)" },
    legislature: { en: "Bicameral: 35 Senate seats, 105 House seats", ro: "Bicamerat: 35 locuri în Senat, 105 locuri în Cameră" },
    electoralVotes: 9,
    politicalStructure: { en: "7 Congressional districts, Republican trifecta", ro: "7 districte legislative, control republican total (trifecta)" },
    flagDesc: { en: "A crimson St. Andrew's Cross on a field of white.", ro: "O cruce roșie în formă de X (Crucea Sfântului Andrei) pe fundal alb." },
    sealDesc: { en: "Features the rivers and major borders of Alabama.", ro: "Prezintă râurile principale și granițele statului Alabama." },
    admissionUnion: { en: "December 14, 1819 (22nd state)", ro: "14 decembrie 1819 (al 22-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to wear a fake mustache in church that causes laughter.", "Putting salt on a railroad track can be punishable by death."],
      ro: ["Este ilegal să porți mustață falsă în biserică dacă provoacă râsete.", "Punerea de sare pe șinele de cale ferată poate fi pedepsită cu moartea."]
    },
    historicalFirsts: {
      en: ["First state to declare Christmas a legal holiday in 1836.", "Montgomery was the first capital of the Confederacy."],
      ro: ["Primul stat care a declarat Crăciunul sărbătoare oficială în 1836.", "Montgomery a fost prima capitală a Confederației."]
    },
    constitution: {
      adoptedYear: 2022,
      // Still the longest constitution of any US state (and any government on Earth),
      // even after the 2022 recompilation folded in the 1901 version's amendments.
      amendmentsCount: 0,
      wordCount: 204000,
      provisions: {
        en: ["Consolidated the record-breaking 977 amendments of the 1901 version.", "Guarantees a right to public education, but with strict local school funding guidelines."],
        ro: ["A consolidat recordul istoric de 977 de amendamente din versiunea din 1901.", "Garantează dreptul la educație publică, însă cu reguli locale stricte de finanțare."]
      }
    }
  },
  AK: {
    governor: { en: "Mike Dunleavy (R)", ro: "Mike Dunleavy (R)" },
    legislature: { en: "Bicameral: 20 Senate seats, 40 House seats", ro: "Bicamerat: 20 locuri în Senat, 40 locuri în Cameră" },
    electoralVotes: 3,
    politicalStructure: { en: "1 At-large Congressional district, Republican governor", ro: "1 district federal unic, guvernator republican" },
    flagDesc: { en: "Eight gold stars representing the Big Dipper and North Star on blue.", ro: "Opt stele aurii care reprezintă Carul Mare și Steaua Polară pe fundal albastru." },
    sealDesc: { en: "Depicts glaciers, miners, ships, and agricultural lands.", ro: "Înfățișează ghețari, mineri, nave și terenuri agricole." },
    admissionUnion: { en: "January 3, 1959 (49th state)", ro: "3 ianuarie 1959 (al 49-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to whisper in someone's ear while they are moose hunting.", "It is illegal to push a live moose out of a moving airplane."],
      ro: ["Este ilegal să șoptești în urechea cuiva în timp ce vânează elani.", "Este ilegal să împingi un elan viu dintr-un avion în mișcare."]
    },
    historicalFirsts: {
      en: ["First state to adopt rank-choice voting via popular initiative.", "The purchase of Alaska from Russia in 1867 is known as 'Seward's Folly'."],
      ro: ["Primul stat care a adoptat votul prin ordonarea preferințelor prin inițiativă populară.", "Achiziționarea Alaska de la Rusia în 1867 este cunoscută drept 'Nebunia lui Seward'."]
    },
    constitution: {
      adoptedYear: 1956,
      amendmentsCount: 28,
      wordCount: 14500,
      provisions: {
        en: ["Requires the state legislature to hold a mandatory session in Juneau.", "Establishes the Permanent Fund Dividend (PFD), distributing oil wealth to residents."],
        ro: ["Obligă legislativul statului să își desfășoare sesiunile în capitala Juneau.", "Stabilește Dividendul Fondului Permanent (PFD), distribuind veniturile din petrol locuitorilor."]
      }
    }
  },
  AZ: {
    governor: { en: "Katie Hobbs (D)", ro: "Katie Hobbs (D)" },
    legislature: { en: "Bicameral: 30 Senate seats, 60 House seats", ro: "Bicamerat: 30 locuri în Senat, 60 locuri în Cameră" },
    electoralVotes: 11,
    politicalStructure: { en: "9 Congressional districts, Democratic governor", ro: "9 districte legislative, guvernator democrat" },
    flagDesc: { en: "13 copper and yellow rays spreading from a central copper star.", ro: "13 raze în culorile cupru și galben radiind dintr-o stea de cupru centrală." },
    sealDesc: { en: "Showcases the Grand Canyon, cattle, fields, and copper mines.", ro: "Înfățișează Marele Canion, vite, câmpuri și mine de cupru." },
    admissionUnion: { en: "February 14, 1912 (48th state)", ro: "14 februarie 1912 (al 48-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to refuse a glass of water offered to you.", "Cutting down a protected Saguaro cactus carries up to 25 years in prison."],
      ro: ["Este ilegal să refuzi un pahar cu apă care îți este oferit.", "Tăierea unui cactus Saguaro protejat se pedepsește cu până la 25 de ani de închisoare."]
    },
    historicalFirsts: {
      en: ["First state to appoint a female Supreme Court Justice (Sandra Day O'Connor).", "First state where voters passed a state-wide MLK holiday by popular vote."],
      ro: ["Primul stat din care a provenit o femeie judecător la Curtea Supremă (Sandra Day O'Connor).", "Primul stat în care alegătorii au aprobat sărbătoarea MLK prin vot popular."]
    },
    constitution: {
      adoptedYear: 1911,
      amendmentsCount: 156,
      wordCount: 30500,
      provisions: {
        en: ["Includes robust initiative, referendum, and recall provisions.", "Guarantees public school instruction 'as nearly free as possible'."],
        ro: ["Include prevederi solide pentru inițiative cetățenești, referendumuri și demiteri.", "Garantează ca școlile publice să ofere instruire 'cât mai gratuită posibil'."]
      }
    }
  },
  AR: {
    governor: { en: "Sarah Huckabee Sanders (R)", ro: "Sarah Huckabee Sanders (R)" },
    legislature: { en: "Bicameral: 35 Senate seats, 100 House seats", ro: "Bicamerat: 35 locuri în Senat, 100 locuri în Cameră" },
    electoralVotes: 6,
    politicalStructure: { en: "4 Congressional districts, Republican trifecta", ro: "4 districte legislative, control republican total (trifecta)" },
    flagDesc: { en: "A red field with a blue-bordered white diamond containing 25 stars.", ro: "Un fundal roșu cu un romb alb cu margini albastre ce conține 25 de stele." },
    sealDesc: { en: "Depicts an eagle, a shield with a steamboat, plow, and beehive.", ro: "Prezintă un vultur și un scut cu un vapor cu aburi, plug și stup de albine." },
    admissionUnion: { en: "June 15, 1836 (25th state)", ro: "15 iunie 1836 (al 25-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to mispronounce the state's name (AR Statute 1-4-105).", "Sudden honking of a car horn near sandwich shops after 9 PM is illegal in Little Rock."],
      ro: ["Este ilegal să pronunți greșit numele statului (conform statutului 1-4-105).", "Claxonatul brusc în apropierea magazinelor de sandvișuri după ora 21 este ilegal în Little Rock."]
    },
    historicalFirsts: {
      en: ["Contains the world's only public active diamond mine.", "First state to elect a woman to the U.S. Senate (Hattie Caraway in 1932)."],
      ro: ["Deține singura mină activă de diamante din lume deschisă publicului.", "Primul stat care a ales o femeie în Senatul SUA (Hattie Caraway în 1932)."]
    },
    constitution: {
      adoptedYear: 1874,
      amendmentsCount: 102,
      wordCount: 52800,
      provisions: {
        en: ["Severely limits property tax rates, requiring supermajorities for changes.", "Bars atheists from holding civil office or testifying in court (not enforced federally)."],
        ro: ["Limitează drastic impozitele pe proprietate, cerând supermajorități pentru modificări.", "Interzice ateilor să dețină funcții publice sau să depună mărturie (neaplicat din motive federale)."]
      }
    }
  },
  CA: {
    governor: { en: "Gavin Newsom (D)", ro: "Gavin Newsom (D)" },
    legislature: { en: "Bicameral: 40 Senate seats, 80 Assembly seats", ro: "Bicamerat: 40 locuri în Senat, 80 locuri în Adunare" },
    electoralVotes: 54,
    politicalStructure: { en: "52 Congressional districts, Democratic trifecta", ro: "52 districte legislative, control democrat total (trifecta)" },
    flagDesc: { en: "A white field with a red stripe at bottom and a grizzly bear.", ro: "Un fundal alb cu o dungă roșie jos și un urs grizzly în centru." },
    sealDesc: { en: "Features the Roman goddess Minerva, a grizzly bear, and gold miners.", ro: "Prezintă zeița romană Minerva, un urs grizzly și mineri care caută aur." },
    admissionUnion: { en: "September 9, 1850 (31st state)", ro: "9 septembrie 1850 (al 31-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to shoot any kind of game from a moving vehicle, except whales.", "Autonomous vehicles must comply with strict state testing regulations."],
      ro: ["Este ilegal să vânezi animale dintr-un vehicul în mișcare, cu excepția balenelor.", "Vehiculele autonome trebuie să respecte reglementări extrem de stricte de testare."]
    },
    historicalFirsts: {
      en: ["First state to reach a $3 Trillion GDP.", "Silicon Valley introduced the first modern microprocessor and personal computers."],
      ro: ["Primul stat care a atins un PIB de 3 trilioane de dolari.", "Silicon Valley a introdus primul microprocesor modern și calculatoarele personale."]
    },
    constitution: {
      adoptedYear: 1879,
      amendmentsCount: 520,
      wordCount: 71000,
      provisions: {
        en: ["Includes Proposition 13, which caps property tax increases to 1% annually.", "Grarantees a constitutional right to personal privacy, added by voters in 1972."],
        ro: ["Include Propoziția 13, care limitează creșterea impozitului pe proprietate la 1% pe an.", "Garantează un drept constituțional la viață privată, adăugat de alegători în 1972."]
      }
    }
  },
  CO: {
    governor: { en: "Jared Polis (D)", ro: "Jared Polis (D)" },
    legislature: { en: "Bicameral: 35 Senate seats, 65 House seats", ro: "Bicamerat: 35 locuri în Senat, 65 locuri în Cameră" },
    electoralVotes: 10,
    politicalStructure: { en: "8 Congressional districts, Democratic trifecta", ro: "8 districte legislative, control democrat total (trifecta)" },
    flagDesc: { en: "A blue-white-blue triband with a circular red 'C' enclosing a gold disk.", ro: "Trei dungi albastru-alb-albastru cu o literă 'C' roșie ce conține un disc auriu." },
    sealDesc: { en: "Depicts heraldic eyes, a pick and mallet, and mountains.", ro: "Înfățișează ochi heraldici, un târnăcop, un ciocan și munți." },
    admissionUnion: { en: "August 1, 1876 (38th state)", ro: "1 august 1876 (al 38-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to mutilate rocks, trees, or plants in state park boundaries.", "Dueling with swords or firearms is explicitly banned and disqualifies political office."],
      ro: ["Este ilegal să distrugi roci, copaci sau plante în parcurile de stat.", "Duelul cu săbii sau arme de foc este interzis și te descalifică de la funcții publice."]
    },
    historicalFirsts: {
      en: ["First state to legalise recreational cannabis sales by popular vote (2012).", "First state to grant women voting rights through a referendum (1893)."],
      ro: ["Primul stat care a legalizat vânzările de canabis recreațional prin vot popular (2012).", "Primul stat care a acordat drept de vot femeilor printr-un referendum (1893)."]
    },
    constitution: {
      adoptedYear: 1876,
      amendmentsCount: 165,
      wordCount: 59000,
      provisions: {
        en: ["TABOR (Taxpayer's Bill of Rights) requires voter approval for all tax hikes.", "Includes Amendment 64, legalizing and taxing personal cannabis use."],
        ro: ["TABOR (Carta Drepturilor Contribuabililor) cere acordul votanților pentru orice mărire de taxe.", "Include Amendamentul 64, care legalizează și impozitează consumul personal de canabis."]
      }
    }
  },
  CT: {
    governor: { en: "Ned Lamont (D)", ro: "Ned Lamont (D)" },
    legislature: { en: "Bicameral: 36 Senate seats, 151 House seats", ro: "Bicamerat: 36 locuri în Senat, 151 locuri în Cameră" },
    electoralVotes: 7,
    politicalStructure: { en: "5 Congressional districts, Democratic trifecta", ro: "5 districte legislative, control democrat total (trifecta)" },
    flagDesc: { en: "A blue field with an ornate white shield depicting three grapevines.", ro: "Un fundal albastru cu un scut alb ornamentat ce conține trei vițe-de-vie." },
    sealDesc: { en: "Depicts three grapevines, symbolizing the original colonies.", ro: "Prezintă trei vițe-de-vie, simbolizând coloniile fondatoare." },
    admissionUnion: { en: "January 9, 1788 (5th state)", ro: "9 ianuarie 1788 (al 5-lea stat)" },
    uniqueLaws: {
      en: ["A pickle must bounce when dropped to be legally considered a pickle.", "It is illegal to educate dogs or teach them tricks in Hartford."],
      ro: ["Un castravete murat trebuie să sară când e scăpat pe jos pentru a fi considerat murătură.", "Este ilegal să educi câini sau să-i înveți trucuri în Hartford."]
    },
    historicalFirsts: {
      en: ["First state to write a constitution (Fundamental Orders of Connecticut in 1639).", "First state to issue official automobile license plates (1901)."],
      ro: ["Primul stat care a redactat o constituție scrisă (Ordonanțele Fundamentale în 1639).", "Primul stat care a emis plăcuțe de înmatriculare auto oficiale (1901)."]
    },
    constitution: {
      adoptedYear: 1965,
      amendmentsCount: 31,
      wordCount: 16200,
      provisions: {
        en: ["Abolished property qualifications for voting.", "Maintains a constitutional mandate for funding free public elementary and secondary schools."],
        ro: ["A abolit cerințele de deținere a proprietăților pentru dreptul de vot.", "Menține o obligație constituțională de a finanța școlile publice elementare și secundare."]
      }
    }
  },
  DE: {
    governor: { en: "John Carney (D)", ro: "John Carney (D)" },
    legislature: { en: "Bicameral: 21 Senate seats, 41 House seats", ro: "Bicamerat: 21 locuri în Senat, 41 locuri în Cameră" },
    electoralVotes: 3,
    politicalStructure: { en: "1 At-large Congressional district, Democratic trifecta", ro: "1 district federal unic, control democrat total (trifecta)" },
    flagDesc: { en: "A buff diamond enclosing the state coat of arms on a colonial blue field.", ro: "Un romb galben ce conține stema statului pe un fundal albastru colonial." },
    sealDesc: { en: "Depicts a farmer, soldier, wheat sheaf, corn, and ox.", ro: "Înfățișează un fermier, un soldat, un snop de grâu, porumb și un bou." },
    admissionUnion: { en: "December 7, 1787 (1st state)", ro: "7 decembrie 1787 (primul stat)" },
    uniqueLaws: {
      en: ["It is illegal to wear pants that are form-fitting around the waist.", "Durable corporate laws make it the legal home to over 60% of Fortune 500 companies."],
      ro: ["Este ilegal să porți pantaloni mulați pe talie.", "Legile corporative extrem de atractive îl fac sediul legal al peste 60% din firmele Fortune 500."]
    },
    historicalFirsts: {
      en: ["First state to ratify the U.S. Constitution (December 7, 1787).", "First state to establish a tax-free zone for corporate entities."],
      ro: ["Primul stat care a ratificat Constituția SUA (7 decembrie 1787).", "Primul stat care a creat o zonă scutită de taxe pentru corporații."]
    },
    constitution: {
      adoptedYear: 1897,
      amendmentsCount: 40,
      wordCount: 19100,
      provisions: {
        en: ["Provides for the Court of Chancery, the nation's premier corporate court.", "Allows amendments to pass with a two-thirds vote in two consecutive legislatures without voter referendum."],
        ro: ["Instituie Curtea de Cancelarie, principala instanță de drept corporativ din SUA.", "Permite trecerea amendamentelor cu un vot de 2/3 în două sesiuni consecutive, fără referendum."]
      }
    }
  },
  FL: {
    governor: { en: "Ron DeSantis (R)", ro: "Ron DeSantis (R)" },
    legislature: { en: "Bicameral: 40 Senate seats, 120 House seats", ro: "Bicamerat: 40 locuri în Senat, 120 locuri în Cameră" },
    electoralVotes: 30,
    politicalStructure: { en: "28 Congressional districts, Republican trifecta", ro: "28 districte legislative, control republican total (trifecta)" },
    flagDesc: { en: "A red St. Andrew's Cross on a white field, with the state seal in center.", ro: "Crucea Sfântului Andrei roșie pe fundal alb, cu stema statului în centru." },
    sealDesc: { en: "Features a Native American woman, a steamboat, and cabbage palmettos.", ro: "Prezintă o femeie indigenă, un vapor cu aburi și palmieri pitici." },
    admissionUnion: { en: "March 3, 1845 (27th state)", ro: "3 martie 1845 (al 27-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to sing in a public place while wearing a swimsuit.", "You can be fined for elephant parking if you leave one tied to a parking meter."],
      ro: ["Este ilegal să cânți în public în timp ce porți costum de baie.", "Poți fi amendat pentru parcarea unui elefant dacă îl legi de un parcometru."]
    },
    historicalFirsts: {
      en: ["Cape Canaveral hosted the launch of Apollo 11, the first manned moon landing.", "St. Augustine (founded 1565) is the oldest continuously occupied European settlement."],
      ro: ["Cap Canaveral a găzduit lansarea misiunii Apollo 11, prima aselenizare cu echipaj.", "St. Augustine (fondat în 1565) este cea mai veche așezare europeană locuită continuu."]
    },
    constitution: {
      adoptedYear: 1968,
      amendmentsCount: 144,
      wordCount: 31000,
      provisions: {
        en: ["Strictly prohibits the implementation of a state personal income tax.", "Requires a 60% supermajority vote of the electorate to pass any new constitutional amendment."],
        ro: ["Interzice explicit introducerea unui impozit pe venitul personal al cetățenilor.", "Cere o supermajoritate de 60% din voturile exprimate pentru a aproba orice amendament."]
      }
    }
  },
  GA: {
    governor: { en: "Brian Kemp (R)", ro: "Brian Kemp (R)" },
    legislature: { en: "Bicameral: 56 Senate seats, 180 House seats", ro: "Bicamerat: 56 locuri în Senat, 180 locuri în Cameră" },
    electoralVotes: 16,
    politicalStructure: { en: "14 Congressional districts, Republican trifecta", ro: "14 districte legislative, control republican total (trifecta)" },
    flagDesc: { en: "Three stripes of red-white-red with a blue canton containing the state coat of arms.", ro: "Trei dungi roșu-alb-roșu cu un canton albastru ce conține stema de stat." },
    sealDesc: { en: "Features three pillars (wisdom, justice, moderation) guarding the constitution.", ro: "Prezintă trei piloni (înțelepciune, dreptate, moderație) care păzesc constituția." },
    admissionUnion: { en: "January 2, 1788 (4th state)", ro: "2 ianuarie 1788 (al 4-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to carry an ice cream cone in your back pocket on Sundays.", "It is illegal to let chickens cross any road in the town of Quitman."],
      ro: ["Este ilegal să porți un cornet de înghețată în buzunarul din spate duminica.", "Este ilegal să lași găinile să treacă strada în orașul Quitman."]
    },
    historicalFirsts: {
      en: ["First state university in the nation chartered (University of Georgia in 1785).", "First state to lower the voting age to 18 (in 1943)."],
      ro: ["Prima universitate de stat din țară cu cartă oficială (University of Georgia în 1785).", "Primul stat care a coborât vârsta de vot la 18 ani (în 1943)."]
    },
    constitution: {
      adoptedYear: 1983,
      amendmentsCount: 89,
      wordCount: 41000,
      provisions: {
        en: ["Bars anyone convicted of a felony or judged mentally incompetent from voting.", "Establishes a sovereign state-funded pre-kindergarten education program."],
        ro: ["Interzice persoanelor condamnate pentru infracțiuni grave sau declarate incompetente mental să voteze.", "Stabilește un program de educație preșcolară finanțat integral de stat."]
      }
    }
  },
  HI: {
    governor: { en: "Josh Green (D)", ro: "Josh Green (D)" },
    legislature: { en: "Bicameral: 25 Senate seats, 51 House seats", ro: "Bicamerat: 25 locuri în Senat, 51 locuri în Cameră" },
    electoralVotes: 4,
    politicalStructure: { en: "2 Congressional districts, Democratic trifecta", ro: "2 districte legislative, control democrat total (trifecta)" },
    flagDesc: { en: "Eight alternating red, white, and blue stripes with a Union Jack in the canton.", ro: "Opt dungi alternative roșu, alb și albastru cu steagul Marii Britanii în canton." },
    sealDesc: { en: "Depicts King Kamehameha I, Goddess of Liberty, and the state motto.", ro: "Prezintă pe Regele Kamehameha I, Zeița Libertății și motto-ul statului." },
    admissionUnion: { en: "August 21, 1959 (50th state)", ro: "21 august 1959 (al 50-lea stat)" },
    uniqueLaws: {
      en: ["Billboard advertising is completely banned across the islands.", "You can be fined for not owning a boat if you live on certain coastal properties."],
      ro: ["Panourile publicitare stradale sunt complet interzise pe toate insulele.", "Poți fi amendat dacă nu deții o barcă în anumite locații de pe coastă."]
    },
    historicalFirsts: {
      en: ["The only U.S. state with a royal palace (Iolani Palace).", "First state to pass a complete ban on plastic bags at checkout."],
      ro: ["Singurul stat din SUA care deține un palat regal (Palatul Iolani).", "Primul stat care a interzis complet pungile de plastic la casele de marcat."]
    },
    constitution: {
      adoptedYear: 1959,
      amendmentsCount: 110,
      wordCount: 22000,
      provisions: {
        en: ["Protects traditional and customary Native Hawaiian rights.", "Establishes a constitutional duty to protect, preserve, and promote Hawaiian cultural heritage."],
        ro: ["Protejează drepturile tradiționale și cutumiare ale nativilor hawaieni.", "Stabilește o obligație constituțională de a proteja, păstra și promova patrimoniul cultural hawaiian."]
      }
    }
  },
  ID: {
    governor: { en: "Brad Little (R)", ro: "Brad Little (R)" },
    legislature: { en: "Bicameral: 35 Senate seats, 70 House seats", ro: "Bicamerat: 35 locuri în Senat, 70 locuri în Cameră" },
    electoralVotes: 4,
    politicalStructure: { en: "2 Congressional districts, Republican trifecta", ro: "2 districte legislative, control republican total (trifecta)" },
    flagDesc: { en: "A blue field with the state seal centered, bordered by a gold fringe.", ro: "Un fundal albastru cu stema de stat în centru, mărginit de franjuri aurii." },
    sealDesc: { en: "Designed by a woman (Emma Edwards Green), featuring mining, farming, and rivers.", ro: "Proiectat de o femeie (Emma Edwards Green), înfățișând mineritul, agricultura și râurile." },
    admissionUnion: { en: "July 3, 1890 (43rd state)", ro: "3 iulie 1890 (al 43-lea stat)" },
    uniqueLaws: {
      en: ["Giving your sweetheart a box of candy weighing less than 50 lbs is illegal.", "It is illegal to sweep debris onto public roads or highways."],
      ro: ["Oferirea unei cutii de bomboane sub 22 kg iubitei tale este ilegală.", "Este ilegal să mături resturi sau gunoi direct pe drumurile publice."]
    },
    historicalFirsts: {
      en: ["First town in the world to be lit by atomic energy (Arco in 1955).", "Emma Edwards Green was the first woman to design a state seal."],
      ro: ["Primul oraș din lume iluminat prin energie atomică (Arco în 1955).", "Emma Edwards Green a fost prima femeie din istorie care a proiectat stema unui stat."]
    },
    constitution: {
      adoptedYear: 1890,
      amendmentsCount: 135,
      wordCount: 28000,
      provisions: {
        en: ["Includes strict guidelines prohibiting the state from incurring debt.", "Declares water rights and usage for irrigation as a paramount public use."],
        ro: ["Include reglementări foarte stricte care interzic statului să acumuleze datorii.", "Declară drepturile de apă și utilizarea ei pentru irigații ca fiind de interes public suprem."]
      }
    }
  },
  IL: {
    governor: { en: "J.B. Pritzker (D)", ro: "J.B. Pritzker (D)" },
    legislature: { en: "Bicameral: 59 Senate seats, 118 House seats", ro: "Bicamerat: 59 locuri în Senat, 118 locuri în Cameră" },
    electoralVotes: 19,
    politicalStructure: { en: "17 Congressional districts, Democratic trifecta", ro: "17 districte legislative, control democrat total (trifecta)" },
    flagDesc: { en: "A white field showing the state seal with 'Illinois' printed below.", ro: "Un fundal alb ce înfățișează stema statului și cuvântul 'Illinois' scris dedesubt." },
    sealDesc: { en: "Depicts an eagle carrying a shield with 13 stars and stripes.", ro: "Prezintă un vultur purtând un scut cu 13 stele și dungi." },
    admissionUnion: { en: "December 3, 1818 (21st state)", ro: "3 decembrie 1818 (al 21-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to speak English; the official language by statute is 'American'.", "It is illegal to fish while sitting on a giraffe's neck."],
      ro: ["Este ilegal să vorbești engleza; limba oficială prin statut este 'americana'.", "Este ilegal să pescuiești stând pe gâtul unei girafe."]
    },
    historicalFirsts: {
      en: ["Chicago built the first steel-framed skyscraper in the world (1884).", "First state to ratify the 13th Amendment abolishing slavery (1865)."],
      ro: ["Chicago a construit primul zgârie-nori pe structură de oțel din lume (1884).", "Primul stat care a ratificat al 13-lea amendament care a abolit sclavismul (1865)."]
    },
    constitution: {
      adoptedYear: 1970,
      amendmentsCount: 15,
      wordCount: 22000,
      provisions: {
        en: ["Includes a progressive environmental protection clause for all citizens.", "Grants home rule authority to municipalities over 25,000 residents."],
        ro: ["Include o clauză progresistă de protecție a mediului înconjurător pentru toți cetățenii.", "Acordă autonomie administrativă locală (home rule) primăriilor cu peste 25.000 de locuitori."]
      }
    }
  },
  IN: {
    governor: { en: "Eric Holcomb (R)", ro: "Eric Holcomb (R)" },
    legislature: { en: "Bicameral: 50 Senate seats, 100 House seats", ro: "Bicamerat: 50 locuri în Senat, 100 locuri în Cameră" },
    electoralVotes: 11,
    politicalStructure: { en: "9 Congressional districts, Republican trifecta", ro: "9 districte legislative, control republican total (trifecta)" },
    flagDesc: { en: "A blue field with a gold torch surrounded by 19 stars.", ro: "Un fundal albastru cu o torță aurie înconjurată de 19 stele." },
    sealDesc: { en: "Depicts a woodsman chopping a tree and a fleeing buffalo.", ro: "Înfățișează un tăietor de lemne doborând un copac și un bizon care fuge." },
    admissionUnion: { en: "December 11, 1816 (19th state)", ro: "11 decembrie 1816 (al 19-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to take a bath between the months of October and March.", "It is illegal to sell cars on Sundays."],
      ro: ["Este ilegal să faci baie în cadă în perioada lunilor octombrie și martie.", "Este ilegal să vinzi mașini duminica."]
    },
    historicalFirsts: {
      en: ["First state to establish a state-wide public school system.", "Indianapolis built the first Union Station terminal in the world (1853)."],
      ro: ["Primul stat care a înființat un sistem de școli publice la nivel de stat.", "Indianapolis a construit prima gară de tip terminal Union Station din lume (1853)."]
    },
    constitution: {
      adoptedYear: 1851,
      amendmentsCount: 46,
      wordCount: 10500,
      provisions: {
        en: ["Strictly prohibits the state from going into debt.", "Requires the state budget to be balanced and bars deficit spending."],
        ro: ["Interzice explicit statului să contracteze datorii.", "Obligă bugetul statului să fie echilibrat și interzice cheltuielile pe deficit."]
      }
    }
  },
  IA: {
    governor: { en: "Kim Reynolds (R)", ro: "Kim Reynolds (R)" },
    legislature: { en: "Bicameral: 50 Senate seats, 100 House seats", ro: "Bicamerat: 50 locuri în Senat, 100 locuri în Cameră" },
    electoralVotes: 6,
    politicalStructure: { en: "4 Congressional districts, Republican trifecta", ro: "4 districte legislative, control republican total (trifecta)" },
    flagDesc: { en: "A blue, white, and red vertical tricolor showing a bald eagle and motto.", ro: "Trei dungi verticale albastru, alb și roșu ce prezintă un vultur pleșuv și motto-ul." },
    sealDesc: { en: "Depicts a citizen soldier standing in a wheat field.", ro: "Înfățișează un cetățean-soldat stând în mijlocul unui câmp de grâu." },
    admissionUnion: { en: "December 28, 1846 (29th state)", ro: "28 decembrie 1846 (al 29-lea stat)" },
    uniqueLaws: {
      en: ["A man with a mustache may never kiss a woman in public.", "It is illegal to throw bricks or stones onto highways or public paths."],
      ro: ["Un bărbat cu mustață nu are voie să sărute o femeie în public.", "Este ilegal să arunci cu cărămizi sau pietre pe autostrăzi sau căi publice."]
    },
    historicalFirsts: {
      en: ["First state to admit women to the state bar (Arabella Mansfield in 1869).", "First state university to co-educate men and women equally (University of Iowa)."],
      ro: ["Primul stat care a admis femeile în barou (Arabella Mansfield în 1869).", "Prima universitate de stat care a educat în mod egal bărbați și femei (University of Iowa)."]
    },
    constitution: {
      adoptedYear: 1857,
      amendmentsCount: 48,
      wordCount: 15700,
      provisions: {
        en: ["Protects freedom of speech and trial by jury.", "Allows legislative sessions to be held in Des Moines and caps legislative pay."],
        ro: ["Protejează libertatea de exprimare și procesul cu juriu.", "Permite sesiunilor legislative să aibă loc în Des Moines și plafonează indemnizațiile legiuitorilor."]
      }
    }
  },
  KS: {
    governor: { en: "Laura Kelly (D)", ro: "Laura Kelly (D)" },
    legislature: { en: "Bicameral: 40 Senate seats, 125 House seats", ro: "Bicamerat: 40 locuri în Senat, 125 de locuri în Cameră" },
    electoralVotes: 6,
    politicalStructure: { en: "4 Congressional districts, Democratic governor", ro: "4 districte legislative, guvernator democrat" },
    flagDesc: { en: "A blue field with the state seal centered, topped by a sunflower.", ro: "Un fundal albastru cu stema statului în centru, deasupra având o floarea-soarelui." },
    sealDesc: { en: "Features steamships, agriculture, pioneers traveling west, and stars.", ro: "Prezintă nave cu aburi, agricultură, pionieri călătorind spre vest și stele." },
    admissionUnion: { en: "January 29, 1861 (34th state)", ro: "29 ianuarie 1861 (al 34-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to hunt whales; Kansas is completely landlocked.", "It is illegal to catch fish with your bare hands."],
      ro: ["Este ilegal să vânezi balene; Kansas nu are deloc ieșire la mare.", "Este ilegal să prinzi pești cu mâinile goale."]
    },
    historicalFirsts: {
      en: ["First state to elect an African American woman to the U.S. Senate.", "First state to adopt constitutional prohibition of alcohol (1881)."],
      ro: ["Primul stat care a ales o femeie afro-americană în Senatul SUA.", "Primul stat care a adoptat prohibiția alcoolului prin constituție (1881)."]
    },
    constitution: {
      adoptedYear: 1859,
      amendmentsCount: 97,
      wordCount: 12000,
      provisions: {
        en: ["Includes an amendment protecting the right to hunt, fish, and harvest game.", "Explicitly establishes the right to keep and bear arms for defense."],
        ro: ["Include un amendament care protejează dreptul de a vâna, de a pescui și de a recolta vânat.", "Stabilește explicit dreptul de a deține și purta arme pentru autoapărare."]
      }
    }
  },
  KY: {
    governor: { en: "Andy Beshear (D)", ro: "Andy Beshear (D)" },
    legislature: { en: "Bicameral: 38 Senate seats, 100 House seats", ro: "Bicamerat: 38 locuri în Senat, 100 locuri în Cameră" },
    electoralVotes: 8,
    politicalStructure: { en: "6 Congressional districts, Democratic governor", ro: "6 districte legislative, guvernator democrat" },
    flagDesc: { en: "A blue field showing the state seal encircled by goldenrod flowers.", ro: "Un fundal albastru ce prezintă stema statului înconjurată de flori de splinuță." },
    sealDesc: { en: "Depicts a pioneer and statesman embracing, with the motto.", ro: "Înfățișează un pionier și un om de stat îmbrățișându-se, alături de motto-ul statului." },
    admissionUnion: { en: "June 1, 1792 (15th state)", ro: "1 iunie 1792 (al 15-lea stat)" },
    uniqueLaws: {
      en: ["Every citizen must take a bath at least once a year by law.", "It is illegal to dye a baby chick, duckling, or rabbit any color."],
      ro: ["Fiecare cetățean are obligația legală să facă baie cel puțin o dată pe an.", "Este ilegal să vopsești un pui de găină, de rață sau un iepure."]
    },
    historicalFirsts: {
      en: ["First state west of the Appalachian Mountains to join the Union.", "First state to establish a public school system in the South."],
      ro: ["Primul stat aflat la vest de Munții Apalași care s-a alăturat Uniunii.", "Primul stat din Sud care a înființat un sistem de școli publice."]
    },
    constitution: {
      adoptedYear: 1891,
      amendmentsCount: 43,
      wordCount: 21500,
      provisions: {
        en: ["A public official must swear they have never fought a duel under oath.", "Limits legislative sessions to 60 days in even years and 30 days in odd years."],
        ro: ["Un oficial public trebuie să jure la învestire că nu s-a luptat niciodată într-un duel.", "Limitează sesiunile legislative la 60 de zile în anii pari și 30 de zile în anii impari."]
      }
    }
  },
  LA: {
    governor: { en: "Jeff Landry (R)", ro: "Jeff Landry (R)" },
    legislature: { en: "Bicameral: 39 Senate seats, 105 House seats", ro: "Bicamerat: 39 locuri în Senat, 105 locuri în Cameră" },
    electoralVotes: 8,
    politicalStructure: { en: "6 Congressional districts, Republican trifecta", ro: "6 districte legislative, control republican total (trifecta)" },
    flagDesc: { en: "A blue field showing a pelican feeding its young with its own blood.", ro: "Un fundal albastru ce înfățișează un pelican hrănindu-și puii cu propriul sânge." },
    sealDesc: { en: "Depicts the pelican, symbolizing self-sacrifice and state devotion.", ro: "Prezintă pelicanul, simbol al sacrificiului de sine și al devotamentului." },
    admissionUnion: { en: "April 30, 1812 (18th state)", ro: "30 aprilie 1812 (al 18-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to steal an alligator; doing so carries up to 10 years in prison.", "Robbery using a banana as a weapon is treated as armed robbery."],
      ro: ["Este ilegal să furi un aligator; fapta se pedepsește cu până la 10 ani de închisoare.", "Jafurile în care se folosește o banană drept armă sunt judecate ca jaf armat."]
    },
    historicalFirsts: {
      en: ["The only U.S. state that uses civil law based on the Napoleonic Code.", "New Orleans was the first city to host a Mardi Gras parade in 1837."],
      ro: ["Singurul stat din SUA care folosește dreptul civil bazat pe Codul Napoleonian.", "New Orleans a fost primul oraș care a găzduit o paradă de Mardi Gras în 1837."]
    },
    constitution: {
      adoptedYear: 1974,
      amendmentsCount: 200,
      wordCount: 72000,
      provisions: {
        en: ["Establishes parishes instead of counties as local government divisions.", "Guarantees a right to trial by jury in civil cases, unique from Napoleonic codes."],
        ro: ["Stabilește parohii (parishes) în loc de comitate ca subdiviziuni administrative.", "Garantează dreptul la proces cu juriu în cauze civile, o excepție față de codurile napoleoniene."]
      }
    }
  },
  ME: {
    governor: { en: "Janet Mills (D)", ro: "Janet Mills (D)" },
    legislature: { en: "Bicameral: 35 Senate seats, 151 House seats", ro: "Bicamerat: 35 locuri în Senat, 151 locuri în Cameră" },
    electoralVotes: 4,
    politicalStructure: { en: "2 Congressional districts, Democratic trifecta", ro: "2 districte legislative, control democrat total (trifecta)" },
    flagDesc: { en: "A blue field showing the state coat of arms with a pine tree and moose.", ro: "Un fundal albastru ce prezintă stema de stat cu un pin și un elan." },
    sealDesc: { en: "Features a moose resting under a pine tree, with a farmer and seaman.", ro: "Prezintă un elan odihnindu-se sub un pin, alături de un fermier și un marinar." },
    admissionUnion: { en: "March 15, 1820 (23rd state)", ro: "15 martie 1820 (al 23-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to keep Christmas decorations up past January 14.", "It is illegal to step out of a plane in flight."],
      ro: ["Este ilegal să păstrezi decorațiunile de Crăciun montate după data de 14 ianuarie.", "Este ilegal să cobori dintr-un avion în timpul zborului."]
    },
    historicalFirsts: {
      en: ["First state to pass a law prohibiting the sale of alcohol (Maine Law of 1851).", "Eastport is the easternmost city in the United States."],
      ro: ["Primul stat care a adoptat o lege ce interzicea vânzarea de alcool (Legea Maine din 1851).", "Eastport este cel mai estic oraș din Statele Unite."]
    },
    constitution: {
      adoptedYear: 1820,
      amendmentsCount: 173,
      wordCount: 16000,
      provisions: {
        en: ["Grants the right to vote to Native Americans living on reservations, added in 1954.", "Establishes a unique system where the legislature elects the Attorney General."],
        ro: ["Acordă dreptul de vot nativilor americani care locuiesc în rezervații (adăugat în 1954).", "Stabilește un sistem unic în care procurorul general este ales direct de către legislativ."]
      }
    }
  },
  MD: {
    governor: { en: "Wes Moore (D)", ro: "Wes Moore (D)" },
    legislature: { en: "Bicameral: 47 Senate seats, 141 House seats", ro: "Bicamerat: 47 de locuri în Senat, 141 de locuri în Cameră" },
    electoralVotes: 10,
    politicalStructure: { en: "8 Congressional districts, Democratic trifecta", ro: "8 districte legislative, control democrat total (trifecta)" },
    flagDesc: { en: "A complex geometric design combining the Calvert and Crossland coats of arms.", ro: "Un design geometric complex care îmbină blazoanele familiilor Calvert și Crossland." },
    sealDesc: { en: "Depicts a plowman, fisherman, and a shield with family arms.", ro: "Înfățișează un plugar, un pescar și un scut cu blazoanele heraldice." },
    admissionUnion: { en: "April 28, 1788 (7th state)", ro: "28 aprilie 1788 (al 7-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to grow thistle in yards or gardens.", "It is illegal to mistreat oysters or violate strict oyster harvesting seasons."],
      ro: ["Este ilegal să crești ciulini în curte sau în grădină.", "Este ilegal să maltratezi stridiile sau să încalci sezoanele stricte de recoltare."]
    },
    historicalFirsts: {
      en: ["First dental school in the world founded in Baltimore (1840).", "First state to approve a religious toleration act (Maryland Toleration Act of 1649)."],
      ro: ["Prima școală stomatologică din lume a fost fondată în Baltimore (1840).", "Primul stat care a aprobat o lege de toleranță religioasă (Actul de Toleranță în 1649)."]
    },
    constitution: {
      adoptedYear: 1867,
      amendmentsCount: 220,
      wordCount: 47000,
      provisions: {
        en: ["Features a robust Declaration of Rights containing 47 separate articles.", "Maintains the Board of Public Works, a unique executive agency regulating state spending."],
        ro: ["Include o Declarație a Drepturilor solidă, formată din 47 de articole distincte.", "Menține Consiliul Lucrărilor Publice, o agenție executivă unică ce controlează cheltuielile statului."]
      }
    }
  },
  MA: {
    governor: { en: "Maura Healey (D)", ro: "Maura Healey (D)" },
    legislature: { en: "Bicameral: 40 Senate seats, 160 House seats", ro: "Bicamerat: 40 locuri în Senat, 160 locuri în Cameră" },
    electoralVotes: 11,
    politicalStructure: { en: "9 Congressional districts, Democratic trifecta", ro: "9 districte legislative, control democrat total (trifecta)" },
    flagDesc: { en: "A white field showing the state coat of arms with a Native American.", ro: "Un fundal alb ce înfățișează stema statului cu un nativ american în centru." },
    sealDesc: { en: "Features the arms, a star representing statehood, and a hand holding a sword.", ro: "Prezintă stema, o stea ce indică aderarea și o mână care ține o sabie." },
    admissionUnion: { en: "February 6, 1788 (6th state)", ro: "6 februarie 1788 (al 6-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to play the national anthem incorrectly or use it as dance music.", "Explosive golf balls are strictly prohibited inside the state."],
      ro: ["Este ilegal să intonezi greșit imnul național sau să îl folosești ca muzică de dans.", "Mingiile de golf explozive sunt strict interzise pe teritoriul statului."]
    },
    historicalFirsts: {
      en: ["First public school (Boston Latin) and university (Harvard) in America.", "First state to legalize same-sex marriage (2004)."],
      ro: ["Prima școală publică (Boston Latin) și prima universitate (Harvard) din America.", "Primul stat care a legalizat căsătoria între persoane de același sex (2004)."]
    },
    constitution: {
      adoptedYear: 1780,
      amendmentsCount: 120,
      wordCount: 36500,
      provisions: {
        en: ["The oldest continuously active written constitution in the world, drafted by John Adams.", "Explicitly guarantees equal rights under the law, which led to the judicial abolition of slavery in 1783."],
        ro: ["Cea mai veche constituție scrisă activă în mod continuu din lume, redactată de John Adams.", "Garantează explicit drepturi egale în fața legii, ceea ce a dus la abolirea sclaviei de către instanțe în 1783."]
      }
    }
  },
  MI: {
    governor: { en: "Gretchen Whitmer (D)", ro: "Gretchen Whitmer (D)" },
    legislature: { en: "Bicameral: 38 Senate seats, 110 House seats", ro: "Bicamerat: 38 locuri în Senat, 110 locuri în Cameră" },
    electoralVotes: 15,
    politicalStructure: { en: "13 Congressional districts, Democratic trifecta", ro: "13 districte legislative, control democrat total (trifecta)" },
    flagDesc: { en: "A dark blue field showing the state coat of arms with an elk and moose.", ro: "Un fundal albastru închis ce înfățișează stema statului susținută de un cerb și un elan." },
    sealDesc: { en: "Features an eagle holding an olive branch, arrows, and the motto.", ro: "Prezintă un vultur ținând o ramură de măslin, săgeți și motto-ul statului." },
    admissionUnion: { en: "January 26, 1837 (26th state)", ro: "26 ianuarie 1837 (al 26-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to be drunk on a train; doing so carries a jail sentence.", "A wife's hair belongs to her husband by law (not enforced)."],
      ro: ["Este ilegal să fii beat în tren; fapta poate atrage o pedeapsă cu închisoarea.", "Părul soției aparține din punct de vedere legal soțului ei (neaplicată)."]
    },
    historicalFirsts: {
      en: ["First English-speaking government to abolish the death penalty (1846).", "Detroit constructed the first concrete highway in the world (1909)."],
      ro: ["Primul guvern vorbitor de limba engleză din lume care a abolit pedeapsa cu moartea (1846).", "Detroit a construit prima autostradă din beton din lume (1909)."]
    },
    constitution: {
      adoptedYear: 1963,
      amendmentsCount: 35,
      wordCount: 25000,
      provisions: {
        en: ["Establishes an independent citizens redistricting commission.", "Abolished the state's capability to levy a state-level property tax."],
        ro: ["Înființează o comisie cetățenească independentă pentru redistrictare electorală.", "A eliminat dreptul statului de a percepe impozit pe proprietate la nivel de stat."]
      }
    }
  },
  MN: {
    governor: { en: "Tim Walz (D)", ro: "Tim Walz (D)" },
    legislature: { en: "Bicameral: 67 Senate seats, 134 House seats", ro: "Bicamerat: 67 locuri în Senat, 134 locuri în Cameră" },
    electoralVotes: 10,
    politicalStructure: { en: "8 Congressional districts, Democratic trifecta", ro: "8 districte legislative, control democrat total (trifecta)" },
    flagDesc: { en: "A dark blue flag showing a gold-bordered state seal.", ro: "Un fundal albastru închis pe care este poziționată stema cu margini aurii." },
    sealDesc: { en: "Depicts a pioneer plowing a field and an Native American riding a horse.", ro: "Înfățișează un pionier arând pământul și un nativ american călare." },
    admissionUnion: { en: "May 11, 1858 (32nd state)", ro: "11 mai 1858 (al 32-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to cross state lines with a duck placed on your head.", "It is illegal to host a contest where participants try to catch a greased pig."],
      ro: ["Este ilegal să treci granița statului având o rață așezată pe cap.", "Este ilegal să organizezi concursuri în care participanții trebuie să prindă un porc uns cu grăsime."]
    },
    historicalFirsts: {
      en: ["First open-heart surgery in the world performed at the University of Minnesota (1952).", "The first automatic pop-up toaster was invented in Stillwater (1919)."],
      ro: ["Prima operație pe cord deschis din lume a fost realizată la Universitatea din Minnesota (1952).", "Primul prăjitor de pâine automat (pop-up) a fost inventat în Stillwater (1919)."]
    },
    constitution: {
      adoptedYear: 1857,
      amendmentsCount: 120,
      wordCount: 13000,
      provisions: {
        en: ["Establishes a Permanent School Fund fueled by natural resources royalties.", "Strictly limits public debt to minor emergencies unless approved by voters."],
        ro: ["Înființează un Fond Școlar Permanent alimentat de taxele pe exploatarea resurselor.", "Limitează strict datoria publică la urgențe minore, cu excepția cazului în care este aprobată de alegători."]
      }
    }
  },
  MS: {
    governor: { en: "Tate Reeves (R)", ro: "Tate Reeves (R)" },
    legislature: { en: "Bicameral: 52 Senate seats, 122 House seats", ro: "Bicamerat: 52 locuri în Senat, 122 locuri în Cameră" },
    electoralVotes: 6,
    politicalStructure: { en: "4 Congressional districts, Republican trifecta", ro: "4 districte legislative, control republican total (trifecta)" },
    flagDesc: { en: "A red-white-red horizontal tricolor with a blue banner showing a magnolia flower.", ro: "Trei dungi orizontale roșu-alb-roșu cu o bandă albastră ce înfățișează o floare de magnolia." },
    sealDesc: { en: "Depicts an eagle holding an olive branch and arrows in its talons.", ro: "Înfățișează un vultur ținând în gheare o ramură de măslin și săgeți." },
    admissionUnion: { en: "December 10, 1817 (20th state)", ro: "10 decembrie 1817 (al 20-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to explain polygamy to anyone.", "Publicly preaching or teaching atheism can draw a fine."],
      ro: ["Este ilegal să explici poligamia cuiva.", "Propovăduirea sau predarea ateismului în public se poate solda cu amendă."]
    },
    historicalFirsts: {
      en: ["First state to establish a state college for women (Mississippi University for Women in 1884).", "First human lung transplant performed in Jackson (1963)."],
      ro: ["Primul stat care a creat un colegiu de stat dedicat exclusiv femeilor (1884).", "Primul transplant pulmonar la om a fost realizat în Jackson (1963)."]
    },
    constitution: {
      adoptedYear: 1890,
      amendmentsCount: 125,
      wordCount: 26000,
      provisions: {
        en: ["Requires school-aged children to attend public or private schools.", "Authorizes the state to lease out public school trust lands (Sixteenth Section lands)."],
        ro: ["Obligă copiii de vârstă școlară să frecventeze școli publice sau private.", "Autorizează statul să dea în chirie terenurile din fondurile școlare (terenurile din Secțiunea 16)."]
      }
    }
  },
  MO: {
    governor: { en: "Mike Parson (R)", ro: "Mike Parson (R)" },
    legislature: { en: "Bicameral: 34 Senate seats, 163 House seats", ro: "Bicamerat: 34 locuri în Senat, 163 locuri în Cameră" },
    electoralVotes: 10,
    politicalStructure: { en: "8 Congressional districts, Republican trifecta", ro: "8 districte legislative, control republican total (trifecta)" },
    flagDesc: { en: "A red, white, and blue horizontal tricolor with the state seal centered.", ro: "Trei dungi orizontale roșu, alb și albastru cu stema statului poziționată în centru." },
    sealDesc: { en: "Depicts two grizzly bears supporting a shield with an eagle and crescent moon.", ro: "Prezintă doi urși grizzly susținând un scut pe care sunt înfățișați un vultur și o semilună." },
    admissionUnion: { en: "August 10, 1821 (24th state)", ro: "10 august 1821 (al 24-lea stat)" },
    uniqueLaws: {
      en: ["Single men between the ages of 21 and 50 must pay an annual tax of $1.", "It is illegal to worry squirrels inside public parks."],
      ro: ["Bărbații necăsătoriți cu vârste între 21 și 50 de ani trebuie să plătească o taxă anuală de 1 dolar.", "Este ilegal să deranjezi sau să stresezi veverițele în parcurile publice."]
    },
    historicalFirsts: {
      en: ["First city to host the Olympic Games outside of Europe (St. Louis in 1904).", "The ice cream cone was invented and popularized at the St. Louis World's Fair (1904)."],
      ro: ["Primul oraș care a găzduit Jocurile Olimpice în afara Europei (St. Louis în 1904).", "Cornetul de înghețată a fost inventat și popularizat la Expoziția Mondială din St. Louis (1904)."]
    },
    constitution: {
      adoptedYear: 1945,
      amendmentsCount: 118,
      wordCount: 42000,
      provisions: {
        en: ["Includes the Hancock Amendment, capping state revenue and tax increases.", "Explicitly protects the collective bargaining rights of workers."],
        ro: ["Include Amendamentul Hancock, care plafonează veniturile statului și măririle de taxe.", "Protejează explicit dreptul lucrătorilor de a se organiza în sindicate și de a negocia colectiv."]
      }
    }
  },
  MT: {
    governor: { en: "Greg Gianforte (R)", ro: "Greg Gianforte (R)" },
    legislature: { en: "Bicameral: 50 Senate seats, 100 House seats", ro: "Bicamerat: 50 de locuri în Senat, 100 de locuri în Cameră" },
    electoralVotes: 4,
    politicalStructure: { en: "2 Congressional districts, Republican trifecta", ro: "2 districte legislative, control republican total (trifecta)" },
    flagDesc: { en: "A blue field with the state seal centered and 'Montana' printed in gold.", ro: "Un fundal albastru cu stema de stat în centru și cuvântul 'Montana' scris cu litere aurii." },
    sealDesc: { en: "Depicts a plow, shovel, pick, and the Great Falls of the Missouri River.", ro: "Înfățișează un plug, o lopată, un târnăcop și cascadele fluviului Missouri." },
    admissionUnion: { en: "November 8, 1889 (41st state)", ro: "8 noiembrie 1889 (al 41-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to play a recording of an animal in distress to attract game.", "Dumbwaiters or lifts in residential buildings must have safety interlocks."],
      ro: ["Este ilegal să redai sunete cu animale aflate în suferință pentru a atrage vânatul.", "Lifturile de bucătărie sau lifturile rezidențiale trebuie să aibă sisteme de siguranță automate."]
    },
    historicalFirsts: {
      en: ["First state to elect a woman to the U.S. Congress (Jeannette Rankin in 1916).", "Yellowstone was designated the world's first national park in 1872."],
      ro: ["Primul stat care a ales o femeie în Congresul SUA (Jeannette Rankin în 1916).", "Parcul Yellowstone a fost declarat primul parc național din lume în 1872."]
    },
    constitution: {
      adoptedYear: 1972,
      amendmentsCount: 33,
      wordCount: 13500,
      provisions: {
        en: ["Guarantees all citizens a constitutional right to a clean and healthful environment.", "Secures a right to personal privacy, widely used in state court rulings."],
        ro: ["Garantează tuturor cetățenilor un drept constituțional la un mediu curat și sănătos.", "Asigură dreptul la viață privată, folosit frecvent în deciziile instanțelor din stat."]
      }
    }
  },
  NE: {
    governor: { en: "Jim Pillen (R)", ro: "Jim Pillen (R)" },
    legislature: { en: "Unicameral: 49 Senators (Nonpartisan)", ro: "Unicameral: 49 de senatori (neafiliați politic)" },
    electoralVotes: 5,
    politicalStructure: { en: "3 Congressional districts, Non-winner-take-all electoral votes", ro: "3 districte legislative, voturi electorale împărțite (non-proporțional)" },
    flagDesc: { en: "A blue field showing the gold state seal centered.", ro: "Un fundal albastru pe care este situată stema statului în culoarea aurie." },
    sealDesc: { en: "Features a blacksmith, a cabin, wheat sheaves, and a steamboat.", ro: "Prezintă un fierar, o cabană de lemn, snopi de grâu și un vapor cu aburi." },
    admissionUnion: { en: "March 1, 1867 (37th state)", ro: "1 martie 1867 (al 37-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to marry if you are diagnosed with a venereal disease.", "Bar owners cannot sell beer unless they are also cooking a kettle of soup."],
      ro: ["Este ilegal să te căsătorești dacă ai fost diagnosticat cu o boală venerică.", "Proprietarii de baruri nu au voie să vândă bere decât dacă prepară și supă la ceaun."]
    },
    historicalFirsts: {
      en: ["The only U.S. state with a unicameral, nonpartisan state legislature.", "First state to create a public power district (all electric utilities are publicly owned)."],
      ro: ["Singurul stat din SUA care deține un legislativ unicameral și nepartizan.", "Primul stat care a creat un district de energie public (utilitățile electrice sunt deținute de stat)."]
    },
    constitution: {
      adoptedYear: 1875,
      amendmentsCount: 232,
      wordCount: 20000,
      provisions: {
        en: ["Includes an amendment declaring the right to hunt and fish is a heritage.", "Grants the state legislature the unique power to meet in unicameral format."],
        ro: ["Include un amendament care declară dreptul de a vâna și pescui ca fiind o moștenire a statului.", "Acordă legislativului dreptul unic de a se întruni în format unicameral."]
      }
    }
  },
  NV: {
    governor: { en: "Joe Lombardo (R)", ro: "Joe Lombardo (R)" },
    legislature: { en: "Bicameral: 21 Senate seats, 42 Assembly seats", ro: "Bicamerat: 21 locuri în Senat, 42 locuri în Adunare" },
    electoralVotes: 6,
    politicalStructure: { en: "4 Congressional districts, split legislature", ro: "4 districte legislative, legislativ divizat politic" },
    flagDesc: { en: "A blue field with a silver star and sagebrush sprays in the canton.", ro: "Un fundal albastru cu o stea de argint și crenguțe de pelin în canton." },
    sealDesc: { en: "Depicts miners, silver quartz, a railroad, and the sun.", ro: "Înfățișează mineri, cuarț argintifer, o cale ferată și soarele." },
    admissionUnion: { en: "October 31, 1864 (36th state)", ro: "31 octombrie 1864 (al 36-lea stat)" },
    uniqueLaws: {
      en: ["Prostitution is legal in designated counties with under 700,000 residents.", "It is illegal to ride a camel on public highways."],
      ro: ["Prostituția este legală în comitatele special desemnate, cu sub 700.000 de locuitori.", "Este ilegal să călărești o cămilă pe autostrăzile publice."]
    },
    historicalFirsts: {
      en: ["First state to ratify the 15th Amendment granting voting rights to all races (1869).", "Las Vegas was the first city to construct a major hotel-casino resort."],
      ro: ["Primul stat care a ratificat al 15-lea amendament ce acorda drept de vot tuturor raselor (1869).", "Las Vegas a fost primul oraș din lume care a construit un complex hotel-cazinou uriaș."]
    },
    constitution: {
      adoptedYear: 1864,
      amendmentsCount: 110,
      wordCount: 18500,
      provisions: {
        en: ["Required the entire constitution text to be sent via telegraph to D.C. for approval.", "Guarantees a right to a state-run lottery system for funding education."],
        ro: ["A cerut ca întregul text al constituției să fie trimis prin telegraf la Washington pentru aprobare.", "Garantează dreptul de a organiza o loterie de stat destinată finanțării educației."]
      }
    }
  },
  NH: {
    governor: { en: "Chris Sununu (R)", ro: "Chris Sununu (R)" },
    legislature: { en: "Bicameral: 24 Senate seats, 400 House seats", ro: "Bicamerat: 24 de locuri în Senat, 400 de locuri în Cameră" },
    electoralVotes: 4,
    politicalStructure: { en: "2 Congressional districts, Largest legislative body in the U.S.", ro: "2 districte legislative, cel mai mare corp legislativ din SUA" },
    flagDesc: { en: "A blue field showing the state seal with the ship USS Raleigh.", ro: "Un fundal albastru pe care este reprezentată stema cu nava istorică USS Raleigh." },
    sealDesc: { en: "Depicts the frigate USS Raleigh built in Portsmouth in 1776.", ro: "Înfățișează fregata USS Raleigh construită în Portsmouth în 1776." },
    admissionUnion: { en: "June 21, 1788 (9th state)", ro: "21 iunie 1788 (al 9-lea stat)" },
    uniqueLaws: {
      en: ["No state sales tax and no personal income tax.", "It is illegal to gather seaweed from beaches at night."],
      ro: ["Fără taxă pe vânzări și fără impozit pe venitul personal.", "Este ilegal să aduni alge marine de pe plajă în timpul nopții."]
    },
    historicalFirsts: {
      en: ["First colony to declare independence from Great Britain (January 1776).", "First state library in America established in Dover (1892)."],
      ro: ["Prima colonie care și-a declarat independența față de Marea Britanie (ianuarie 1776).", "Prima bibliotecă publică din America a fost deschisă în Dover (1892)."]
    },
    constitution: {
      adoptedYear: 1784,
      amendmentsCount: 147,
      wordCount: 11000,
      provisions: {
        en: ["Explicitly includes a right to revolution and right to privacy.", "Features a mandatory reassessment of the constitution by voters every 10 years."],
        ro: ["Include în mod explicit dreptul la revoluție și dreptul la viață privată.", "Prevede o reevaluare obligatorie a constituției de către alegători la fiecare 10 ani."]
      }
    }
  },
  NJ: {
    governor: { en: "Phil Murphy (D)", ro: "Phil Murphy (D)" },
    legislature: { en: "Bicameral: 40 Senate seats, 80 Assembly seats", ro: "Bicamerat: 40 locuri în Senat, 80 locuri în Adunare" },
    electoralVotes: 14,
    politicalStructure: { en: "12 Congressional districts, Democratic trifecta", ro: "12 districte legislative, control democrat total (trifecta)" },
    flagDesc: { en: "A buff field showing the state coat of arms with Goddesses Ceres and Liberty.", ro: "Un fundal galben-crem ce înfățișează stema cu zeițele Ceres și Libertate." },
    sealDesc: { en: "Depicts Ceres, Liberty, three plows, a horse head, and motto.", ro: "Prezintă pe Ceres, Libertatea, trei pluguri, un cap de cal și motto-ul." },
    admissionUnion: { en: "December 18, 1787 (3rd state)", ro: "18 decembrie 1787 (al 3-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal for drivers to pump their own gas at petrol stations.", "It is illegal to wear a bulletproof vest while committing a felony."],
      ro: ["Este ilegal ca șoferii să își alimenteze singuri mașinile cu benzină.", "Este ilegal să porți vestă antiglonț în timp ce comiți o infracțiune gravă."]
    },
    historicalFirsts: {
      en: ["First state to sign the Bill of Rights (1789).", "First professional baseball game played in Hoboken (1846)."],
      ro: ["Primul stat care a semnat Declarația Drepturilor (Bill of Rights) în 1789.", "Primul meci oficial de baseball profesionist s-a disputat în Hoboken (1846)."]
    },
    constitution: {
      adoptedYear: 1947,
      amendmentsCount: 62,
      wordCount: 17500,
      provisions: {
        en: ["Reorganized the state court system, merging equity and common law courts.", "Guarantees public employees the constitutional right to organize and bargain."],
        ro: ["A reorganizat sistemul instanțelor, contopind curțile de echitate cu cele de drept comun.", "Garantează angajaților publici dreptul constituțional de a se organiza și de a negocia."]
      }
    }
  },
  NM: {
    governor: { en: "Michelle Lujan Grisham (D)", ro: "Michelle Lujan Grisham (D)" },
    legislature: { en: "Bicameral: 42 Senate seats, 70 House seats", ro: "Bicamerat: 42 de locuri în Senat, 70 de locuri în Cameră" },
    electoralVotes: 5,
    politicalStructure: { en: "3 Congressional districts, Democratic trifecta", ro: "3 districte legislative, control democrat total (trifecta)" },
    flagDesc: { en: "A yellow field showing the red Zia sun symbol in the center.", ro: "Un fundal galben ce prezintă simbolul roșu al soarelui Zia în centru." },
    sealDesc: { en: "Features an American eagle protecting a smaller Mexican eagle.", ro: "Prezintă un vultur american care protejează un vultur mexican mai mic." },
    admissionUnion: { en: "January 6, 1912 (47th state)", ro: "6 ianuarie 1912 (al 47-lea stat)" },
    uniqueLaws: {
      en: ["Idiots or insane persons are constitutionally barred from voting.", "It is illegal to trip a horse for entertainment purposes."],
      ro: ["Persoanele cu dizabilități mentale severe sau nebune sunt interzise constituțional de la vot.", "Este ilegal să pui piedică unui cal în scopuri de divertisment."]
    },
    historicalFirsts: {
      en: ["First state to adopt bilingualism (English and Spanish) in public documents.", "The first nuclear detonation in world history occurred at the Trinity Site (1945)."],
      ro: ["Primul stat care a adoptat bilingvismul (engleză și spaniolă) în documentele oficiale.", "Prima detonare nucleară din istoria lumii a avut loc la situl Trinity (1945)."]
    },
    constitution: {
      adoptedYear: 1911,
      amendmentsCount: 175,
      wordCount: 26000,
      provisions: {
        en: ["Strictly protects voting rights and language rights for Spanish speakers.", "Prohibits the state from using public funds to support sectarian religious schools."],
        ro: ["Protejează cu strictețe drepturile de vot și drepturile lingvistice ale vorbitorilor de spaniolă.", "Interzice statului să folosească fonduri publice pentru a sprijini școli religioase."]
      }
    }
  },
  NY: {
    governor: { en: "Kathy Hochul (D)", ro: "Kathy Hochul (D)" },
    legislature: { en: "Bicameral: 63 Senate seats, 150 Assembly seats", ro: "Bicamerat: 63 de locuri în Senat, 150 de locuri în Adunare" },
    electoralVotes: 28,
    politicalStructure: { en: "26 Congressional districts, Democratic trifecta", ro: "26 districte legislative, control democrat total (trifecta)" },
    flagDesc: { en: "A blue field showing the state coat of arms with Goddesses Liberty and Justice.", ro: "Un fundal albastru ce înfățișează stema statului cu zeițele Libertate și Dreptate." },
    sealDesc: { en: "Depicts Liberty, Justice, a shield showing a Hudson river sloop, and a globe.", ro: "Prezintă pe Libertate, Dreptate, un scut cu o ambarcațiune pe râul Hudson și un glob." },
    admissionUnion: { en: "July 26, 1788 (11th state)", ro: "26 iulie 1788 (al 11-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to gather in public while wearing masks, except for masquerades.", "It is illegal to talk to others in an elevator; you must face the door with hands folded."],
      ro: ["Este ilegal să te aduni în public purtând măști, cu excepția balurilor mascate.", "Este ilegal să vorbești în lift; trebuie să stai cu fața la ușă și mâinile încrucișate."]
    },
    historicalFirsts: {
      en: ["New York City served as the first official capital of the United States under the Constitution.", "First state to build a major canal system linking the Great Lakes (Erie Canal in 1825)."],
      ro: ["New York City a fost prima capitală oficială a Statelor Unite sub Constituția din 1787.", "Primul stat care a construit un canal ce lega Marile Lacuri de ocean (Canalul Erie în 1825)."]
    },
    constitution: {
      adoptedYear: 1938,
      amendmentsCount: 228,
      wordCount: 51000,
      provisions: {
        en: ["Includes an amendment guaranteeing the state forest preserves must remain 'forever wild'.", "Establishes a constitutional right to public aid and care for the needy."],
        ro: ["Garantează că rezervațiile forestiere ale statului trebuie să rămână sălbatice pentru totdeauna.", "Stabilește un drept constituțional la asistență publică și îngrijire pentru cei nevoiași."]
      }
    }
  },
  NC: {
    governor: { en: "Roy Cooper (D)", ro: "Roy Cooper (D)" },
    legislature: { en: "Bicameral: 50 Senate seats, 120 House seats", ro: "Bicamerat: 50 locuri în Senat, 120 locuri în Cameră" },
    electoralVotes: 16,
    politicalStructure: { en: "14 Congressional districts, Republican legislative supermajority", ro: "14 districte legislative, supermajoritate republicană în legislativ" },
    flagDesc: { en: "A red and white horizontal band with a blue vertical bar at the left containing stars and initials.", ro: "O dungă orizontală roșie și una albă, cu o bandă verticală albastră ce conține o stea și inițiale." },
    sealDesc: { en: "Depicts Liberty and Plenty holding cornucopia and scroll.", ro: "Înfățișează pe Libertate și Abundență ținând o cornucopia și un pergament." },
    admissionUnion: { en: "November 21, 1789 (12th state)", ro: "21 noiembrie 1789 (al 12-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to use elephants to plow cotton fields.", "Sneezing in public is illegal inside certain county limits (not enforced)."],
      ro: ["Este ilegal să folosești elefanți pentru a ara câmpurile de bumbac.", "Strănutatul în public este ilegal în anumite comitate (neaplicată)."]
    },
    historicalFirsts: {
      en: ["Kitty Hawk hosted the first successful powered flight by the Wright Brothers in 1903.", "First public university to open its doors in the U.S. (UNC Chapel Hill in 1795)."],
      ro: ["Kitty Hawk a găzduit primul zbor autopropulsat din istorie realizat de frații Wright în 1903.", "Prima universitate publică din SUA care a început cursurile (UNC Chapel Hill în 1795)."]
    },
    constitution: {
      adoptedYear: 1971,
      amendmentsCount: 45,
      wordCount: 16500,
      provisions: {
        en: ["Includes an explicit clause stating the state must maintain public universities.", "Bars anyone who denies the existence of Almighty God from holding office (unenforceable federally)."],
        ro: ["Include o clauză explicită ce obligă statul să mențină universități publice.", "Interzice oricui neagă existența lui Dumnezeu să dețină funcții publice (inaplicabil federal)."]
      }
    }
  },
  ND: {
    governor: { en: "Doug Burgum (R)", ro: "Doug Burgum (R)" },
    legislature: { en: "Bicameral: 47 Senate seats, 94 House seats", ro: "Bicamerat: 47 de locuri în Senat, 94 de locuri în Cameră" },
    electoralVotes: 3,
    politicalStructure: { en: "1 At-large Congressional district, Republican trifecta", ro: "1 district federal unic, control republican total (trifecta)" },
    flagDesc: { en: "A blue field showing an eagle carrying an olive branch and arrows under stars.", ro: "Un fundal albastru cu un vultur purtând o ramură de măslin și săgeți sub stele." },
    sealDesc: { en: "Depicts an elm tree, wheat sheaves, an axe, a plow, and a bow.", ro: "Înfățișează un ulm, snopi de grâu, un topor, un plug și un arc cu săgeți." },
    admissionUnion: { en: "November 2, 1889 (39th state)", ro: "2 noiembrie 1889 (al 39-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to keep elk in sandboxes.", "It is illegal to fall asleep with your shoes on."],
      ro: ["Este ilegal să ții elani în lada cu nisip.", "Este ilegal să adormi încălțat cu pantofii în picioare."]
    },
    historicalFirsts: {
      en: ["First state to establish a state-owned bank (Bank of North Dakota in 1919).", "First state to create a state-owned mill and elevator."],
      ro: ["Primul stat care a creat o bancă deținută de stat (Bank of North Dakota în 1919).", "Primul stat care a deținut și operat o moară și un siloz public."]
    },
    constitution: {
      adoptedYear: 1889,
      amendmentsCount: 155,
      wordCount: 20000,
      provisions: {
        en: ["Includes an amendment establishing the Bank of North Dakota to promote commerce.", "Requires all state-level constitutional amendments to be approved by voters."],
        ro: ["Include un amendament care înființează Banca de Stat pentru a sprijini comerțul local.", "Obligă ca toate amendamentele constituționale de nivel statal să fie votate de popor."]
      }
    }
  },
  OH: {
    governor: { en: "Mike DeWine (R)", ro: "Mike DeWine (R)" },
    legislature: { en: "Bicameral: 33 Senate seats, 99 House seats", ro: "Bicamerat: 33 locuri în Senat, 99 locuri în Cameră" },
    electoralVotes: 17,
    politicalStructure: { en: "15 Congressional districts, Republican trifecta", ro: "15 districte legislative, control republican total (trifecta)" },
    flagDesc: { en: "A swallowtail pennant with red and white stripes and a blue triangle containing 17 stars.", ro: "Un fanion cu coadă de rândunică cu dungi roșii și albe și un triunghi albastru cu 17 stele." },
    sealDesc: { en: "Depicts wheat sheaves, a bundle of 17 arrows, and a rising sun.", ro: "Înfățișează snopi de grâu, un mănunchi de 17 săgeți și un soare răsărind." },
    admissionUnion: { en: "March 1, 1803 (17th state)", ro: "1 martie 1803 (al 17-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to get a fish drunk on whiskey.", "Running out of gas on public highways is punishable by fine in Youngstown."],
      ro: ["Este ilegal să îmbeți un pește cu whisky.", "Rămânerea fără benzină pe autostrăzile publice se pedepsește cu amendă în Youngstown."]
    },
    historicalFirsts: {
      en: ["First state west of the original 13 to ban slavery in its constitution.", "First traffic light system in the world installed in Cleveland (1914)."],
      ro: ["Primul stat situat la vest de cele 13 colonii care a interzis sclavia prin constituție.", "Primul semafor electric de trafic din lume a fost instalat în Cleveland (1914)."]
    },
    constitution: {
      adoptedYear: 1851,
      amendmentsCount: 172,
      wordCount: 36000,
      provisions: {
        en: ["Mandates that the state budget must be balanced annually.", "Includes provisions allowing citizens to bypass the legislature to propose laws via initiative."],
        ro: ["Obligă bugetul statului să fie echilibrat în fiecare an.", "Include prevederi care permit cetățenilor să ocolească legislativul pentru a propune legi prin inițiativă."]
      }
    }
  },
  OK: {
    governor: { en: "Kevin Stitt (R)", ro: "Kevin Stitt (R)" },
    legislature: { en: "Bicameral: 48 Senate seats, 101 House seats", ro: "Bicamerat: 48 de locuri în Senat, 101 locuri în Cameră" },
    electoralVotes: 7,
    politicalStructure: { en: "5 Congressional districts, Republican trifecta", ro: "5 districte legislative, control republican total (trifecta)" },
    flagDesc: { en: "A blue field showing an Osage warrior's buffalo-skin shield decorated with eagle feathers.", ro: "Un fundal albastru ce înfățișează scutul din piele de bizon al unui războinic Osage." },
    sealDesc: { en: "A large star containing five symbols representing the Five Civilized Tribes.", ro: "O stea mare ce conține cinci simboluri reprezentând Cele Cinci Triburi Civilizate." },
    admissionUnion: { en: "November 16, 1907 (46th state)", ro: "16 noiembrie 1907 (al 46-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to take a bite out of another person's hamburger.", "It is illegal to trip a horse to catch it."],
      ro: ["Este ilegal să muști din hamburgerul altei persoane.", "Este ilegal să împiedici un cal pentru a-l prinde."]
    },
    historicalFirsts: {
      en: ["First parking meter in the world installed in Oklahoma City (1935).", "First shopping cart in the world invented and introduced in Oklahoma City (1937)."],
      ro: ["Primul parcometru din lume a fost instalat în Oklahoma City (1935).", "Primul cărucior de cumpărături din lume a fost inventat în Oklahoma City (1937)."]
    },
    constitution: {
      adoptedYear: 1907,
      amendmentsCount: 150,
      wordCount: 50000,
      provisions: {
        en: ["Contains very detailed corporate and railroad regulation clauses.", "Provides for direct legislation through citizen initiative and referendum."],
        ro: ["Conține clauze extrem de detaliate pentru reglementarea corporațiilor și căilor ferate.", "Asigură legiferarea directă de către popor prin inițiative și referendumuri."]
      }
    }
  },
  OR: {
    governor: { en: "Tina Kotek (D)", ro: "Tina Kotek (D)" },
    legislature: { en: "Bicameral: 30 Senate seats, 60 House seats", ro: "Bicamerat: 30 locuri în Senat, 60 locuri în Cameră" },
    electoralVotes: 8,
    politicalStructure: { en: "6 Congressional districts, Democratic trifecta", ro: "6 districte legislative, control democrat total (trifecta)" },
    flagDesc: { en: "A navy blue field with the state seal on front and a gold beaver on the reverse side.", ro: "Un fundal albastru închis cu stema pe față și un castor auriu pe verso (singurul steag cu două fețe)." },
    sealDesc: { en: "Depicts an eagle, a wagon, trees, a British man-of-war, and American steamer.", ro: "Înfățișează un vultur, un car cu boi, pini, o navă britanică și un vapor american." },
    admissionUnion: { en: "February 14, 1859 (33rd state)", ro: "14 februarie 1859 (al 33-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to use canned corn as fish bait.", "State laws protect the right of individuals to pump their own gas in rural areas only."],
      ro: ["Este ilegal să folosești porumb la conservă ca momeală pentru pești.", "Legile statului permit alimentarea de către șoferi doar în stațiile din zonele rurale."]
    },
    historicalFirsts: {
      en: ["First state to implement vote-by-mail for all major elections (1998).", "First state to adopt the initiative and referendum system (1902)."],
      ro: ["Primul stat care a implementat votul exclusiv prin corespondență la alegerile majore (1998).", "Primul stat care a adoptat oficial sistemul de inițiativă și referendum (1902)."]
    },
    constitution: {
      adoptedYear: 1859,
      amendmentsCount: 260,
      wordCount: 27500,
      provisions: {
        en: ["Includes the Oregon System (Initiative and Referendum).", "Requires a three-fifths legislative vote to pass any bill raising state revenues."],
        ro: ["Include sistemul Oregon de legiferare directă prin inițiative și referendum.", "Cere un vot de 3/5 în legislativ pentru a adopta orice lege care mărește taxele."]
      }
    }
  },
  PA: {
    governor: { en: "Josh Shapiro (D)", ro: "Josh Shapiro (D)" },
    legislature: { en: "Bicameral: 50 Senate seats, 203 House seats", ro: "Bicamerat: 50 locuri în Senat, 203 locuri în Cameră" },
    electoralVotes: 19,
    politicalStructure: { en: "17 Congressional districts, split legislature control", ro: "17 districte legislative, legislativ divizat politic" },
    flagDesc: { en: "A blue field showing the state coat of arms supported by two draft horses.", ro: "Un fundal albastru închis ce prezintă stema susținută de doi cai de tracțiune." },
    sealDesc: { en: "Features a ship in full sail, a plow, three wheat sheaves, and olive branch.", ro: "Prezintă o corabie cu pânze, un plug, trei snopi de grâu și o ramură de măslin." },
    admissionUnion: { en: "December 12, 1787 (2nd state)", ro: "12 decembrie 1787 (al 2-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to sleep on top of a refrigerator outdoors.", "It is illegal to catch a fish using your teeth or any explosive device."],
      ro: ["Este ilegal să adormi pe un frigider în aer liber.", "Este ilegal să prinzi un pește cu dinții sau folosind materiale explozive."]
    },
    historicalFirsts: {
      en: ["First capital city of the nation under the Constitution (Philadelphia).", "First public zoo in the United States opened in Philadelphia (1874)."],
      ro: ["Prima capitală a națiunii sub Constituția din 1787 (Philadelphia).", "Prima grădină zoologică publică din Statele Unite s-a deschis în Philadelphia (1874)."]
    },
    constitution: {
      adoptedYear: 1968,
      amendmentsCount: 32,
      wordCount: 16000,
      provisions: {
        en: ["Includes an environmental rights amendment declaring public resources belong to all.", "Establishes a unified state judicial system under the Supreme Court of Pennsylvania."],
        ro: ["Include un amendament pentru drepturile de mediu ce declară resursele publice ca fiind ale tuturor.", "Înființează un sistem judiciar unificat sub autoritatea Curții Supreme din Pennsylvania."]
      }
    }
  },
  RI: {
    governor: { en: "Dan McKee (D)", ro: "Dan McKee (D)" },
    legislature: { en: "Bicameral: 38 Senate seats, 75 House seats", ro: "Bicamerat: 38 locuri în Senat, 75 de locuri în Cameră" },
    electoralVotes: 4,
    politicalStructure: { en: "2 Congressional districts, Democratic trifecta", ro: "2 districte legislative, control democrat total (trifecta)" },
    flagDesc: { en: "A white field showing a gold anchor surrounded by 13 gold stars.", ro: "Un fundal alb ce înfățișează o ancoră aurie înconjurată de 13 stele de aur." },
    sealDesc: { en: "Features a gold anchor with 'Hope' printed above.", ro: "Prezintă o ancoră aurie cu cuvântul 'Hope' (Speranță) scris deasupra." },
    admissionUnion: { en: "May 29, 1790 (13th state)", ro: "29 mai 1790 (al 13-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to throw pickle juice at a trolley or streetcar.", "Biting off another person's limb is punishable by up to 20 years in prison."],
      ro: ["Este ilegal să arunci cu zeamă de murături într-un tramvai.", "Mușcarea sau smulgerea unui membru al altei persoane se pedepsește cu până la 20 de ani de închisoare."]
    },
    historicalFirsts: {
      en: ["First colony to formally declare independence from Great Britain (May 4, 1776).", "First water-powered cotton mill built in Pawtucket (Slater Mill in 1793)."],
      ro: ["Prima colonie care și-a declarat oficial independența de Marea Britanie (4 mai 1776).", "Prima moară de bumbac cu propulsie hidraulică (Slater Mill în 1793)."]
    },
    constitution: {
      adoptedYear: 1986,
      amendmentsCount: 12,
      wordCount: 10000,
      provisions: {
        en: ["Guarantees constitutional protection for rights to shoreline access.", "Abolished the state's power to allow capital punishment."],
        ro: ["Garantează protecție constituțională pentru accesul liber pe plajă și maluri.", "A eliminat dreptul statului de a autoriza pedeapsa cu moartea."]
      }
    }
  },
  SC: {
    governor: { en: "Henry McMaster (R)", ro: "Henry McMaster (R)" },
    legislature: { en: "Bicameral: 46 Senate seats, 124 House seats", ro: "Bicamerat: 46 locuri în Senat, 124 locuri în Cameră" },
    electoralVotes: 9,
    politicalStructure: { en: "7 Congressional districts, Republican trifecta", ro: "7 districte legislative, control republican total (trifecta)" },
    flagDesc: { en: "A blue field with a white palmetto tree in center and white crescent in canton.", ro: "Un fundal albastru cu un palmier pitic alb în centru și o semilună albă în canton." },
    sealDesc: { en: "Features two palmettos and symbols representing the defeat of the British in 1776.", ro: "Prezintă doi palmieri pitici și simboluri ale victoriei împotriva britanicilor în 1776." },
    admissionUnion: { en: "May 23, 1788 (8th state)", ro: "23 mai 1788 (al 8-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to play pinball if you are under 18 years of age.", "It is illegal to work on Sundays, except for essential emergency operations."],
      ro: ["Este ilegal să joci pinball dacă ai sub 18 ani.", "Munca de duminică este ilegală, cu excepția serviciilor esențiale de urgență."]
    },
    historicalFirsts: {
      en: ["First state to vote to secede from the Union prior to the Civil War (1860).", "Stirring of the Civil War began with first shots fired at Fort Sumter (1861)."],
      ro: ["Primul stat care a votat ieșirea din Uniune (secesiunea) înainte de Războiul Civil (1860).", "Începutul Războiului Civil s-a marcat prin primele focuri trase la Fort Sumter (1861)."]
    },
    constitution: {
      adoptedYear: 1895,
      amendmentsCount: 105,
      wordCount: 23000,
      provisions: {
        en: ["Includes provisions limiting property tax assessments.", "Maintains strict separation of public school funding from religious institutions."],
        ro: ["Include clauze care limitează evaluările impozitului pe proprietate.", "Menține separarea strictă a fondurilor școlilor publice de instituțiile religioase."]
      }
    }
  },
  SD: {
    governor: { en: "Kristi Noem (R)", ro: "Kristi Noem (R)" },
    legislature: { en: "Bicameral: 35 Senate seats, 70 House seats", ro: "Bicamerat: 35 locuri în Senat, 70 locuri în Cameră" },
    electoralVotes: 3,
    politicalStructure: { en: "1 At-large Congressional district, Republican trifecta", ro: "1 district federal unic, control republican total (trifecta)" },
    flagDesc: { en: "A blue field showing the gold state seal surrounded by rays.", ro: "Un fundal albastru ce înfățișează stema de stat aurie înconjurată de raze." },
    sealDesc: { en: "Depicts a river with a steamboat, farming, mining, and herds of cattle.", ro: "Înfățișează un râu cu un vapor, agricultură, minerit și cirezi de vite." },
    admissionUnion: { en: "November 2, 1889 (40th state)", ro: "2 noiembrie 1889 (al 40-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to fall asleep in a cheese factory.", "It is illegal to place static advertisements near historical monuments."],
      ro: ["Este ilegal să adormi într-o fabrică de brânzeturi.", "Este ilegal să plasezi reclame statice în preajma monumentelor istorice."]
    },
    historicalFirsts: {
      en: ["First state to adopt the initiative and referendum processes (1898).", "Mount Rushmore construction began in 1927, completing in 1941."],
      ro: ["Primul stat din SUA care a adoptat procesele de inițiativă și referendum (1898).", "Construcția monumentului Mount Rushmore a început în 1927 și s-a încheiat în 1941."]
    },
    constitution: {
      adoptedYear: 1889,
      amendmentsCount: 120,
      wordCount: 26500,
      provisions: {
        en: ["Establishes the nation's first popular initiative and referendum process.", "Restricts state spending and limits emergency borrowing capacity."],
        ro: ["Instituie primul proces de inițiativă populară și referendum din SUA.", "Restricționează cheltuielile statului și limitează capacitatea de împrumut de urgență."]
      }
    }
  },
  TN: {
    governor: { en: "Bill Lee (R)", ro: "Bill Lee (R)" },
    legislature: { en: "Bicameral: 33 Senate seats, 99 House seats", ro: "Bicamerat: 33 locuri în Senat, 99 locuri în Cameră" },
    electoralVotes: 11,
    politicalStructure: { en: "9 Congressional districts, Republican trifecta", ro: "9 districte legislative, control republican total (trifecta)" },
    flagDesc: { en: "A red field with a blue circle enclosing 3 white stars, with a blue stripe on right.", ro: "Un fundal roșu cu un cerc albastru ce conține 3 stele albe, cu o dungă albastră la marginea dreaptă." },
    sealDesc: { en: "Depicts a plow, sheaf of wheat, and a river sloop.", ro: "Înfățișează un plug, un snop de grâu și o ambarcațiune fluvială." },
    admissionUnion: { en: "June 1, 1796 (16th state)", ro: "1 iunie 1796 (al 16-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to share your Netflix password with others under state wiretap laws.", "It is illegal to gather or harvest wild ginseng during off-season months."],
      ro: ["Este ilegal să distribui parola de Netflix altcuiva conform legilor interceptării.", "Este ilegal să culegi ginseng sălbatic în afara sezonului oficial."]
    },
    historicalFirsts: {
      en: ["First state to construct a commercial nuclear power facility (Oak Ridge).", "Bristol is designated the official birth site of country music (Bristol Sessions in 1927)."],
      ro: ["Primul stat care a construit o instalație nucleară comercială (Oak Ridge).", "Orașul Bristol este declarat locul oficial de naștere al muzicii country (1927)."]
    },
    constitution: {
      adoptedYear: 1870,
      amendmentsCount: 37,
      wordCount: 14500,
      provisions: {
        en: ["Prohibits the state from implementing a personal income tax.", "Bars ministers or priests from holding seats in the legislature (unenforceable federally)."],
        ro: ["Interzice explicit statului să introducă un impozit pe venitul personal.", "Interzice preoților și slujitorilor bisericești să ocupe locuri în legislativ (inaplicabil federal)."]
      }
    }
  },
  TX: {
    governor: { en: "Greg Abbott (R)", ro: "Greg Abbott (R)" },
    legislature: { en: "Bicameral: 31 Senate seats, 150 House seats", ro: "Bicamerat: 31 locuri în Senat, 150 locuri în Cameră" },
    electoralVotes: 40,
    politicalStructure: { en: "38 Congressional districts, Republican trifecta", ro: "38 districte legislative, control republican total (trifecta)" },
    flagDesc: { en: "The 'Lone Star Flag' featuring vertical blue stripe and horizontal red and white stripes.", ro: "Steagul 'Lone Star' cu o bandă verticală albastră și dungi orizontale roșu și alb." },
    sealDesc: { en: "Depicts a five-pointed star surrounded by olive and live oak branches.", ro: "Înfățișează o stea cu cinci colțuri înconjurată de ramuri de măslin și stejar." },
    admissionUnion: { en: "December 29, 1845 (28th state)", ro: "29 decembrie 1845 (al 28-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to sell one's own organs.", "It is illegal to shoot a buffalo from the second story of a hotel."],
      ro: ["Este ilegal să îți vinzi propriile organe.", "Este ilegal să împuști un bizon de la etajul al doilea al unui hotel."]
    },
    historicalFirsts: {
      en: ["The only U.S. state to enter the Union via treaty as an independent republic.", "First state to establish a space control and astronaut training center (NASA Houston)."],
      ro: ["Singurul stat care a intrat în Uniune prin tratat ca republică independentă.", "Primul stat care a înființat un centru de control spațial și antrenament (NASA Houston)."]
    },
    constitution: {
      adoptedYear: 1876,
      amendmentsCount: 517,
      wordCount: 86000,
      provisions: {
        en: ["Severely limits executive powers of the governor, dividing authority.", "Bars the state from creating personal income taxes without voter referendums."],
        ro: ["Limitează drastic puterile executive ale guvernatorului, divizând autoritatea.", "Interzice statului să creeze impozite pe venit fără referendumuri populare."]
      }
    }
  },
  UT: {
    governor: { en: "Spencer Cox (R)", ro: "Spencer Cox (R)" },
    legislature: { en: "Bicameral: 29 Senate seats, 75 House seats", ro: "Bicamerat: 29 locuri în Senat, 75 de locuri în Cameră" },
    electoralVotes: 6,
    politicalStructure: { en: "4 Congressional districts, Republican trifecta", ro: "4 districte legislative, control republican total (trifecta)" },
    flagDesc: { en: "A blue field with a beehive centered inside a gold circle.", ro: "Un fundal albastru cu un stup de albine situat în interiorul unui cerc auriu." },
    sealDesc: { en: "Depicts a beehive, representing industry, flanked by sego lilies.", ro: "Prezintă un stup de albine, simbol al sârguinței, încadrat de crini sego." },
    admissionUnion: { en: "January 4, 1896 (45th state)", ro: "4 ianuarie 1896 (al 45-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to throw stones or soil onto public streets.", "Husbands are legally responsible for crimes committed by wives in their presence (not enforced)."],
      ro: ["Este ilegal să arunci cu pietre sau pământ pe străzile publice.", "Soții sunt responsabili legal de infracțiunile comise de soții în prezența lor (neaplicată)."]
    },
    historicalFirsts: {
      en: ["Promontory Summit was the site of the Golden Spike linking the first transcontinental railroad in 1869.", "First state to elect a female state senator (Martha Hughes Cannon in 1896)."],
      ro: ["Promontory Summit a fost locul conectării primei căi ferate transcontinentale în 1869.", "Primul stat care a ales o femeie senator (Martha Hughes Cannon în 1896)."]
    },
    constitution: {
      adoptedYear: 1896,
      amendmentsCount: 130,
      wordCount: 19000,
      provisions: {
        en: ["Explicitly bans polygamy as a condition of statehood.", "Requires state revenues from income taxes to be used exclusively for education."],
        ro: ["Interzice explicit poligamia ca condiție obligatorie a aderării la Uniune.", "Obligă ca veniturile din impozitul pe venit să fie folosite doar pentru educație."]
      }
    }
  },
  VT: {
    governor: { en: "Phil Scott (R)", ro: "Phil Scott (R)" },
    legislature: { en: "Bicameral: 30 Senate seats, 150 House seats", ro: "Bicamerat: 30 locuri în Senat, 150 locuri în Cameră" },
    electoralVotes: 3,
    politicalStructure: { en: "1 At-large Congressional district, split control", ro: "1 district federal unic, control divizat politic" },
    flagDesc: { en: "A blue field showing the state coat of arms with a pine tree and cow.", ro: "Un fundal albastru ce înfățișează stema statului cu un pin și o vacă." },
    sealDesc: { en: "Features a pine tree, a cow, wheat sheaves, mountains, and the motto.", ro: "Prezintă un pin, o vacă, snopi de grâu, munți și motto-ul statului." },
    admissionUnion: { en: "March 4, 1791 (14th state)", ro: "4 martie 1791 (al 14-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to deny the existence of God under historical laws.", "Banning billboard advertising along all state highways."],
      ro: ["Este ilegal să negi existența lui Dumnezeu conform unor legi istorice.", "Interzicerea panourilor publicitare de-a lungul tuturor autostrăzilor statului."]
    },
    historicalFirsts: {
      en: ["First state to abolish slavery in its constitution (1777).", "First state admitted to the Union after the original 13 colonies."],
      ro: ["Primul stat care a abolit sclavia prin constituția sa (1777).", "Primul stat admis în Uniune după cele 13 colonii fondatoare."]
    },
    constitution: {
      adoptedYear: 1793,
      amendmentsCount: 56,
      wordCount: 8500,
      provisions: {
        en: ["The shortest state constitution in the nation.", "Requires a unique 'Just Compensation' clause for any government seizure of property."],
        ro: ["Cea mai scurtă constituție de stat din SUA.", "Cere o clauză de 'Dreaptă Compensare' (Just Compensation) pentru orice rechiziție de bunuri."]
      }
    }
  },
  VA: {
    governor: { en: "Glenn Youngkin (R)", ro: "Glenn Youngkin (R)" },
    legislature: { en: "Bicameral: 40 Senate seats, 100 House seats", ro: "Bicamerat: 40 locuri în Senat, 100 locuri în Cameră" },
    electoralVotes: 13,
    politicalStructure: { en: "11 Congressional districts, split legislature", ro: "11 districte legislative, legislativ divizat politic" },
    flagDesc: { en: "A blue field showing the state seal with the goddess Virtus standing over a defeated tyrant.", ro: "Un fundal albastru ce înfățișează stema cu zeița Virtus stând peste un tiran învins." },
    sealDesc: { en: "Depicts Virtus holding a spear and sword, with the motto 'Sic Semper Tyrannis'.", ro: "Prezintă pe Virtus ținând o suliță și sabie, cu motto-ul 'Sic Semper Tyrannis'." },
    admissionUnion: { en: "June 25, 1788 (10th state)", ro: "25 iunie 1788 (al 10-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to use radar detectors in vehicles.", "It is illegal to tickle women on Sundays in Richmond."],
      ro: ["Este ilegal să folosești detectoare de radar în mașini.", "Este ilegal să gâdili femeile duminica în Richmond."]
    },
    historicalFirsts: {
      en: ["Jamestown was the first permanent English settlement in the Americas (1607).", "House of Burgesses was the first representative legislative assembly in the New World."],
      ro: ["Jamestown a fost prima așezare engleză permanentă din America (1607).", "House of Burgesses a fost prima adunare legislativă reprezentativă din Lumea Nouă."]
    },
    constitution: {
      adoptedYear: 1971,
      amendmentsCount: 53,
      wordCount: 22000,
      provisions: {
        en: ["Includes an environmental conservation clause declaring natural assets belong to all.", "Establishes a constitutional requirement for a balanced budget and balanced school funding."],
        ro: ["Include o clauză de conservare a mediului declarând că bunurile naturale aparțin tuturor.", "Stabilește cerința constituțională de buget echilibrat și finanțare echilibrată a școlilor."]
      }
    }
  },
  WA: {
    governor: { en: "Jay Inslee (D)", ro: "Jay Inslee (D)" },
    legislature: { en: "Bicameral: 49 Senate seats, 98 House seats", ro: "Bicamerat: 49 locuri în Senat, 98 locuri în Cameră" },
    electoralVotes: 12,
    politicalStructure: { en: "10 Congressional districts, Democratic trifecta", ro: "10 districte legislative, control democrat total (trifecta)" },
    flagDesc: { en: "A dark green field showing the portrait of George Washington.", ro: "Un fundal verde închis ce înfățișează portretul lui George Washington." },
    sealDesc: { en: "Features a circular portrait of George Washington.", ro: "Prezintă un portret circular al lui George Washington." },
    admissionUnion: { en: "November 11, 1889 (42nd state)", ro: "11 noiembrie 1889 (al 42-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to carry a concealed weapon that is longer than 6 feet.", "It is illegal to claim you are related to rich families to obtain credit."],
      ro: ["Este ilegal să porți o armă ascunsă care este mai lungă de 1.8 metri.", "Este ilegal să pretinzi că ești rudă cu familii bogate pentru a obține credit."]
    },
    historicalFirsts: {
      en: ["Seattle established the first major electronic commerce giant (Amazon).", "First state to adopt strict environmental net-zero goals by law."],
      ro: ["Seattle a lansat primul gigant al comerțului electronic (Amazon).", "Primul stat care a adoptat prin lege obiective stricte de neutralitate a emisiilor (net-zero)."]
    },
    constitution: {
      adoptedYear: 1889,
      amendmentsCount: 108,
      wordCount: 30000,
      provisions: {
        en: ["Declares that the paramount duty of the state is to provide public education.", "Guarantees a constitutional right to privacy, protecting citizens from state intrusion."],
        ro: ["Declară că datoria supremă a statului este de a asigura educația publică.", "Garantează un drept constituțional la viață privată, protejând cetățenii de intruziunea statului."]
      }
    }
  },
  WV: {
    governor: { en: "Jim Justice (R)", ro: "Jim Justice (R)" },
    legislature: { en: "Bicameral: 34 Senate seats, 100 House seats", ro: "Bicamerat: 34 locuri în Senat, 100 locuri în Cameră" },
    electoralVotes: 4,
    politicalStructure: { en: "2 Congressional districts, Republican trifecta", ro: "2 districte legislative, control republican total (trifecta)" },
    flagDesc: { en: "A white field showing the state coat of arms with a blue border.", ro: "Un fundal alb ce prezintă stema statului, cu o bordură albastră." },
    sealDesc: { en: "Depicts two miners flanking a rock inscribed 'June 20, 1863'.", ro: "Înfățișează doi mineri flancând o stâncă inscripționată '20 iunie 1863'." },
    admissionUnion: { en: "June 20, 1863 (35th state)", ro: "20 iunie 1863 (al 35-lea stat)" },
    uniqueLaws: {
      en: ["Roadkill can be legally taken home for dinner under state statutes.", "It is illegal to wear red helmets while cycling (not enforced)."],
      ro: ["Animalele lovite pe drum pot fi luate legal acasă pentru cină conform legii.", "Este ilegal să porți cască roșie când mergi pe bicicletă (neaplicată)."]
    },
    historicalFirsts: {
      en: ["The only U.S. state formed by seceding from a Confederate state during the Civil War.", "First state to implement a state sales tax (1921)."],
      ro: ["Singurul stat format prin secesiunea dintr-un stat confederat în timpul Războiului Civil.", "Primul stat care a implementat o taxă pe vânzări la nivel de stat (1921)."]
    },
    constitution: {
      adoptedYear: 1872,
      amendmentsCount: 75,
      wordCount: 22000,
      provisions: {
        en: ["Bars the state from ever using public funds to support private education.", "Mandates a strict balanced budget and limits borrowing capacity."],
        ro: ["Interzice statului să folosească vreodată fonduri publice pentru a sprijini educația privată.", "Impune un buget echilibrat și limitează strict capacitatea de împrumut."]
      }
    }
  },
  WI: {
    governor: { en: "Tony Evers (D)", ro: "Tony Evers (D)" },
    legislature: { en: "Bicameral: 33 Senate seats, 99 Assembly seats", ro: "Bicamerat: 33 locuri în Senat, 99 locuri în Adunare" },
    electoralVotes: 10,
    politicalStructure: { en: "8 Congressional districts, split political control", ro: "8 districte legislative, control politic divizat" },
    flagDesc: { en: "A blue field showing the state coat of arms with a sailor and miner.", ro: "Un fundal albastru ce prezintă stema de stat cu un marinar și un miner." },
    sealDesc: { en: "Features a plow, pick, shovel, anchor, and a cornucopia.", ro: "Prezintă un plug, un târnăcop, o lopată, o ancoră și o cornucopia." },
    admissionUnion: { en: "May 29, 1848 (30th state)", ro: "29 mai 1848 (al 30-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to serve margarine in place of butter at restaurants unless requested.", "State laws strictly regulate the quality and moisture content of cheese."],
      ro: ["Este ilegal să servești margarină în loc de unt în restaurante decât dacă se cere explicit.", "Legile statului reglementează extrem de strict calitatea și conținutul de umiditate al brânzeturilor."]
    },
    historicalFirsts: {
      en: ["First state to establish a state-wide kindergarten program.", "First typewriter in the world invented in Milwaukee (1868)."],
      ro: ["Primul stat care a înființat un program de grădiniță la nivel de stat.", "Prima mașină de scris din lume a fost inventată în Milwaukee (1868)."]
    },
    constitution: {
      adoptedYear: 1848,
      amendmentsCount: 145,
      wordCount: 15500,
      provisions: {
        en: ["Maintains the school fund, guaranteeing education to children aged 4 to 20.", "Allows municipalities home rule powers to manage their local affairs."],
        ro: ["Menține fondul școlar, garantând educație copiilor între 4 și 20 de ani.", "Acordă primăriilor puteri de autonomie locală pentru gestionarea treburilor interne."]
      }
    }
  },
  WY: {
    governor: { en: "Mark Gordon (R)", ro: "Mark Gordon (R)" },
    legislature: { en: "Bicameral: 31 Senate seats, 62 House seats", ro: "Bicamerat: 31 locuri în Senat, 62 locuri în Cameră" },
    electoralVotes: 3,
    politicalStructure: { en: "1 At-large Congressional district, Republican trifecta", ro: "1 district federal unic, control republican total (trifecta)" },
    flagDesc: { en: "A blue field with a red and white border, enclosing a white American bison silhouette.", ro: "Un fundal albastru cu margini roșii și albe, conținând silueta albă a unui bizon." },
    sealDesc: { en: "Depicts a woman holding a banner reading 'Equal Rights', with miners.", ro: "Înfățișează o femeie ținând un banner pe care scrie 'Equal Rights' (Drepturi Egale), alături de mineri." },
    admissionUnion: { en: "July 10, 1890 (44th state)", ro: "10 iulie 1890 (al 44-lea stat)" },
    uniqueLaws: {
      en: ["It is illegal to take a picture of a rabbit during the month of June.", "New buildings costing over $100,000 must allocate 1% of funds for art."],
      ro: ["Este ilegal să fotografiezi un iepure în timpul lunii iunie.", "Clădirile noi de peste 100.000 de dolari trebuie să aloce 1% din buget pentru artă."]
    },
    historicalFirsts: {
      en: ["First state or territory to grant women the right to vote (1869).", "First female governor elected in U.S. history (Nellie Tayloe Ross in 1924)."],
      ro: ["Primul stat sau teritoriu care a acordat femeilor dreptul de vot (1869).", "Prima femeie guvernator din istoria SUA (Nellie Tayloe Ross în 1924)."]
    },
    constitution: {
      adoptedYear: 1890,
      amendmentsCount: 100,
      wordCount: 31800,
      provisions: {
        en: ["Explicitly guarantees equal political rights for men and women.", "Declares all water inside the state is property of the state, highly unique in the West."],
        ro: ["Garantează explicit drepturi politice egale pentru bărbați și femei.", "Declară că toate apele din interiorul statului sunt proprietate publică a statului."]
      }
    }
  }
};
