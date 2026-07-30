export interface StateData {
  abbrev: string;
  fips: string;
  region: "Northeast" | "South" | "Midwest" | "West";
  statehoodYear: number;
  statehoodOrder: number;
  population: number; // In millions
  gdp: number; // In billions
  area: number; // In square miles
  name: {
    en: string;
    ro: string;
  };
  capital: {
    en: string;
    ro: string;
  };
  nickname: {
    en: string;
    ro: string;
  };
  industry: {
    en: string;
    ro: string;
  };
  story: {
    en: string;
    ro: string;
  };
}

export const EXPLORER_STATES: Record<string, StateData> = {
  AL: {
    abbrev: "AL",
    fips: "01",
    region: "South",
    statehoodYear: 1819,
    statehoodOrder: 22,
    population: 5.1,
    gdp: 302,
    area: 52420,
    name: { en: "Alabama", ro: "Alabama" },
    capital: { en: "Montgomery", ro: "Montgomery" },
    nickname: { en: "Yellowhammer State", ro: "Statul Ciocănitoarei Galbene" },
    industry: { en: "Aerospace, Automotive, Forestry", ro: "Aerospațial, Auto, Silvicultură" },
    story: {
      en: "Huntsville, known as 'Rocket City', is where NASA's Saturn V rockets that sent American astronauts to the Moon were designed and tested.",
      ro: "Huntsville, cunoscut ca 'Orașul Rachetelor', este locul unde au fost proiectate și testate rachetele Saturn V ale NASA care au trimis astronauții americani pe Lună."
    }
  },
  AK: {
    abbrev: "AK",
    fips: "02",
    region: "West",
    statehoodYear: 1959,
    statehoodOrder: 49,
    population: 0.73,
    gdp: 67,
    area: 665384,
    name: { en: "Alaska", ro: "Alaska" },
    capital: { en: "Juneau", ro: "Juneau" },
    nickname: { en: "The Last Frontier", ro: "Ultima Frontieră" },
    industry: { en: "Oil, Fishing, Tourism, Defense", ro: "Petrol, Pescuit, Turism, Apărare" },
    story: {
      en: "America's largest state by area is twice the size of Texas and holds over 100,000 glaciers, as well as Denali, the highest peak in North America.",
      ro: "Cel mai mare stat al Americii ca suprafață este de două ori mai mare decât Texas și adăpostește peste 100.000 de ghețari, precum și Denali, cel mai înalt vârf din America de Nord."
    }
  },
  AZ: {
    abbrev: "AZ",
    fips: "04",
    region: "West",
    statehoodYear: 1912,
    statehoodOrder: 48,
    population: 7.4,
    gdp: 492,
    area: 113990,
    name: { en: "Arizona", ro: "Arizona" },
    capital: { en: "Phoenix", ro: "Phoenix" },
    nickname: { en: "Grand Canyon State", ro: "Statul Marelui Canion" },
    industry: { en: "Technology, Tourism, Copper Mining", ro: "Tehnologie, Turism, Exploatarea Cuprului" },
    story: {
      en: "Home to the Grand Canyon, one of the seven natural wonders of the world, and a booming technology sector in Phoenix.",
      ro: "Găzduiește Marele Canion, una dintre cele șapte minuni naturale ale lumii, și un hub tehnologic în plină expansiune în Phoenix."
    }
  },
  AR: {
    abbrev: "AR",
    fips: "05",
    region: "South",
    statehoodYear: 1836,
    statehoodOrder: 25,
    population: 3.1,
    gdp: 169,
    area: 53179,
    name: { en: "Arkansas", ro: "Arkansas" },
    capital: { en: "Little Rock", ro: "Little Rock" },
    nickname: { en: "The Natural State", ro: "Statul Natural" },
    industry: { en: "Agriculture, Logistics, Retail", ro: "Agricultură, Logistică, Retail" },
    story: {
      en: "Contains the Crater of Diamonds State Park, the world's only active diamond-producing site open to the public.",
      ro: "Conține Parcul Crater of Diamonds, singurul sit activ de producere a diamantelor din lume deschis publicului larg."
    }
  },
  CA: {
    abbrev: "CA",
    fips: "06",
    region: "West",
    statehoodYear: 1850,
    statehoodOrder: 31,
    population: 39.0,
    gdp: 3890,
    area: 163696,
    name: { en: "California", ro: "California" },
    capital: { en: "Sacramento", ro: "Sacramento" },
    nickname: { en: "The Golden State", ro: "Statul de Aur" },
    industry: { en: "Technology, Entertainment, Agriculture", ro: "Tehnologie, Divertisment, Agricultură" },
    story: {
      en: "Silicon Valley is the global epicenter of tech and AI innovation, while the state's economy is larger than that of all but four nations on Earth.",
      ro: "Silicon Valley este epicentrul global al inovației în tehnologie și AI, în timp ce economia statului este mai mare decât cea a majorității țărilor de pe Pământ."
    }
  },
  CO: {
    abbrev: "CO",
    fips: "08",
    region: "West",
    statehoodYear: 1876,
    statehoodOrder: 38,
    population: 5.9,
    gdp: 501,
    area: 104094,
    name: { en: "Colorado", ro: "Colorado" },
    capital: { en: "Denver", ro: "Denver" },
    nickname: { en: "Centennial State", ro: "Statul Centenar" },
    industry: { en: "Aerospace, Renewable Energy, Tourism", ro: "Aerospațial, Energie Regenerabilă, Turism" },
    story: {
      en: "Possesses the highest average elevation of any U.S. state, featuring 58 mountain peaks rising above 14,000 feet (the 'Fourteeners').",
      ro: "Are cea mai mare altitudine medie dintre toate statele americane, având 58 de vârfuri montane care depășesc 4.200 de metri (numite 'Fourteeners')."
    }
  },
  CT: {
    abbrev: "CT",
    fips: "09",
    region: "Northeast",
    statehoodYear: 1788,
    statehoodOrder: 5,
    population: 3.6,
    gdp: 332,
    area: 5543,
    name: { en: "Connecticut", ro: "Connecticut" },
    capital: { en: "Hartford", ro: "Hartford" },
    nickname: { en: "Constitution State", ro: "Statul Constituției" },
    industry: { en: "Finance, Insurance, Advanced Manufacturing", ro: "Finanțe, Asigurări, Producție Avansată" },
    story: {
      en: "Built the USS Nautilus, the world's first nuclear-powered submarine, launched in Groton in 1954.",
      ro: "A construit USS Nautilus, primul submarin cu propulsie nucleară din lume, lansat în Groton în 1954."
    }
  },
  DE: {
    abbrev: "DE",
    fips: "10",
    region: "Northeast",
    statehoodYear: 1787,
    statehoodOrder: 1,
    population: 1.0,
    gdp: 89,
    area: 2489,
    name: { en: "Delaware", ro: "Delaware" },
    capital: { en: "Dover", ro: "Dover" },
    nickname: { en: "The First State", ro: "Primul Stat" },
    industry: { en: "Corporate Legal Services, Finance, Chemicals", ro: "Servicii Juridice, Finanțe, Produse Chimice" },
    story: {
      en: "The very first state to ratify the United States Constitution on December 7, 1787.",
      ro: "Primul stat care a ratificat Constituția Statelor Unite ale Americii pe 7 decembrie 1787."
    }
  },
  DC: {
    abbrev: "DC",
    fips: "11",
    region: "South",
    statehoodYear: 1790,
    statehoodOrder: 0,
    population: 0.68,
    gdp: 172,
    area: 68,
    name: { en: "Washington D.C.", ro: "Washington D.C." },
    capital: { en: "Washington", ro: "Washington" },
    nickname: { en: "Nation's Capital", ro: "Capitala Națiunii" },
    industry: { en: "Government, Defense, Public Policy", ro: "Guvern, Apărare, Politici Publice" },
    story: {
      en: "The federal district of the United States, home to the White House, the Capitol, the Supreme Court, and numerous historical monuments.",
      ro: "Districtul federal al Statelor Unite, sediul Casei Albe, Capitoliului, Curții Supreme și a numeroase monumente istorice emblematice."
    }
  },
  FL: {
    abbrev: "FL",
    fips: "12",
    region: "South",
    statehoodYear: 1845,
    statehoodOrder: 27,
    population: 22.6,
    gdp: 1580,
    area: 65757,
    name: { en: "Florida", ro: "Florida" },
    capital: { en: "Tallahassee", ro: "Tallahassee" },
    nickname: { en: "Sunshine State", ro: "Statul Soarelui" },
    industry: { en: "Tourism, Aerospace, Agriculture", ro: "Turism, Aerospațial, Agricultură" },
    story: {
      en: "Home to NASA's Kennedy Space Center, the historical launch site of all Apollo lunar missions and Space Shuttle flights.",
      ro: "Găzduiește Centrul Spațial Kennedy al NASA, locul istoric de lansare al tuturor misiunilor lunare Apollo și zborurilor navetei spațiale."
    }
  },
  GA: {
    abbrev: "GA",
    fips: "13",
    region: "South",
    statehoodYear: 1788,
    statehoodOrder: 4,
    population: 11.0,
    gdp: 810,
    area: 59425,
    name: { en: "Georgia", ro: "Georgia" },
    capital: { en: "Atlanta", ro: "Atlanta" },
    nickname: { en: "Peach State", ro: "Statul Piersicilor" },
    industry: { en: "Logistics, Agriculture, Entertainment", ro: "Logistică, Agricultură, Divertisment" },
    story: {
      en: "Atlanta's Hartsfield-Jackson International Airport is the world's busiest airport by passenger traffic, linking international trade routes.",
      ro: "Aeroportul Internațional Hartsfield-Jackson din Atlanta este cel mai aglomerat aeroport din lume ca trafic de pasageri, legând rutele comerciale globale."
    }
  },
  HI: {
    abbrev: "HI",
    fips: "15",
    region: "West",
    statehoodYear: 1959,
    statehoodOrder: 50,
    population: 1.4,
    gdp: 108,
    area: 10931,
    name: { en: "Hawaii", ro: "Hawaii" },
    capital: { en: "Honolulu", ro: "Honolulu" },
    nickname: { en: "Aloha State", ro: "Statul Aloha" },
    industry: { en: "Tourism, Defense, Agriculture", ro: "Turism, Apărare, Agricultură" },
    story: {
      en: "The only U.S. state made entirely of islands, representing a major strategic defense post and ecological haven in the Pacific.",
      ro: "Singurul stat format exclusiv din insule, reprezentând un punct strategic de apărare și un paradis ecologic în mijlocul Pacificului."
    }
  },
  ID: {
    abbrev: "ID",
    fips: "16",
    region: "West",
    statehoodYear: 1890,
    statehoodOrder: 43,
    population: 1.9,
    gdp: 118,
    area: 83569,
    name: { en: "Idaho", ro: "Idaho" },
    capital: { en: "Boise", ro: "Boise" },
    nickname: { en: "Gem State", ro: "Statul Gemă" },
    industry: { en: "Agriculture, Science & Technology", ro: "Agricultură, Știință și Tehnologie" },
    story: {
      en: "Leads the nation in potato production, yielding over 13 billion pounds annually, while hosting national science laboratories.",
      ro: "Conduce națiunea la producția de cartofi cu peste 13 miliarde de lire anual, găzduind totodată importante laboratoare de știință naționale."
    }
  },
  IL: {
    abbrev: "IL",
    fips: "17",
    region: "Midwest",
    statehoodYear: 1818,
    statehoodOrder: 21,
    population: 12.5,
    gdp: 1085,
    area: 57914,
    name: { en: "Illinois", ro: "Illinois" },
    capital: { en: "Springfield", ro: "Springfield" },
    nickname: { en: "Prairie State", ro: "Statul Preriei" },
    industry: { en: "Finance, Advanced Manufacturing, Agriculture", ro: "Finanțe, Industrie Manufacturieră, Agricultură" },
    story: {
      en: "Chicago is the birth site of the modern skyscraper, home of the legendary Loop, and a major financial and commodities trading hub.",
      ro: "Chicago este locul de naștere al zgârie-norilor moderni, gazda legendarului Loop și un centru major de tranzacționare a mărfurilor și finanțelor."
    }
  },
  IN: {
    abbrev: "IN",
    fips: "18",
    region: "Midwest",
    statehoodYear: 1816,
    statehoodOrder: 19,
    population: 6.8,
    gdp: 498,
    area: 36418,
    name: { en: "Indiana", ro: "Indiana" },
    capital: { en: "Indianapolis", ro: "Indianapolis" },
    nickname: { en: "Hoosier State", ro: "Statul Hoosier" },
    industry: { en: "Automotive, Pharmaceuticals, Manufacturing", ro: "Automobile, Farmaceutice, Industrie Manufacturieră" },
    story: {
      en: "Hosts the Indianapolis 500: the world's oldest and largest single-day sporting event, attracting over 300,000 spectators.",
      ro: "Găzduiește Indianapolis 500: cel mai vechi și mai mare eveniment sportiv de o zi din lume, atrăgând peste 300.000 de spectatori."
    }
  },
  IA: {
    abbrev: "IA",
    fips: "19",
    region: "Midwest",
    statehoodYear: 1846,
    statehoodOrder: 29,
    population: 3.2,
    gdp: 238,
    area: 56272,
    name: { en: "Iowa", ro: "Iowa" },
    capital: { en: "Des Moines", ro: "Des Moines" },
    nickname: { en: "Hawkeye State", ro: "Statul Ochi de Șoim" },
    industry: { en: "Agriculture, Bio-technology, Insurance", ro: "Agricultură, Biotehnologie, Asigurări" },
    story: {
      en: "America's agricultural heartland, producing more corn and pork than any other state in the nation.",
      ro: "Inima agricolă a Americii, statul produce mai mult porumb și carne de porc decât orice alt stat din națiune."
    }
  },
  KS: {
    abbrev: "KS",
    fips: "20",
    region: "Midwest",
    statehoodYear: 1861,
    statehoodOrder: 34,
    population: 2.9,
    gdp: 215,
    area: 82278,
    name: { en: "Kansas", ro: "Kansas" },
    capital: { en: "Topeka", ro: "Topeka" },
    nickname: { en: "Sunflower State", ro: "Statul Floarea Soarelui" },
    industry: { en: "Aerospace, Agriculture, Food Processing", ro: "Aerospațial, Agricultură, Procesarea Alimentelor" },
    story: {
      en: "The geographic center of the contiguous United States, famous for wheat production and its aviation industry in Wichita.",
      ro: "Centrul geografic al Statelor Unite contigue, celebru pentru producția sa record de grâu și industria sa aviatică din Wichita."
    }
  },
  KY: {
    abbrev: "KY",
    fips: "21",
    region: "South",
    statehoodYear: 1792,
    statehoodOrder: 15,
    population: 4.5,
    gdp: 263,
    area: 40408,
    name: { en: "Kentucky", ro: "Kentucky" },
    capital: { en: "Frankfort", ro: "Frankfort" },
    nickname: { en: "Bluegrass State", ro: "Statul Ierbii Albastre" },
    industry: { en: "Automotive, Whiskey Distilling, Logistics", ro: "Auto, Distilarea Bourbonului, Logistică" },
    story: {
      en: "Hosts the world-famous Kentucky Derby horse race and produces 95% of the world's supply of Kentucky Bourbon whiskey.",
      ro: "Găzduiește celebra cursă de cai Kentucky Derby și produce 95% din aprovizionarea globală cu whisky de tip Bourbon."
    }
  },
  LA: {
    abbrev: "LA",
    fips: "22",
    region: "South",
    statehoodYear: 1812,
    statehoodOrder: 18,
    population: 4.6,
    gdp: 288,
    area: 52378,
    name: { en: "Louisiana", ro: "Louisiana" },
    capital: { en: "Baton Rouge", ro: "Baton Rouge" },
    nickname: { en: "Pelican State", ro: "Statul Pelican" },
    industry: { en: "Petrochemicals, Shipping, Seafood, Tourism", ro: "Petrochimie, Transport Naval, Fructe de mare, Turism" },
    story: {
      en: "New Orleans is the birthplace of Jazz music, representing a unique historical blend of French, Spanish, Creole, and American cultures.",
      ro: "New Orleans este locul de naștere al muzicii Jazz, reprezentând o fuziune istorică unică a culturilor franceză, spaniolă, creolă și americană."
    }
  },
  ME: {
    abbrev: "ME",
    fips: "23",
    region: "Northeast",
    statehoodYear: 1820,
    statehoodOrder: 23,
    population: 1.4,
    gdp: 88,
    area: 35385,
    name: { en: "Maine", ro: "Maine" },
    capital: { en: "Augusta", ro: "Augusta" },
    nickname: { en: "Pine Tree State", ro: "Statul Pinilor" },
    industry: { en: "Fisheries, Tourism, Shipbuilding", ro: "Pescuit, Turism, Șantiere Navale" },
    story: {
      en: "Famous for its rugged coastline, 65 historic lighthouses, and supplying over 90% of the nation's lobster.",
      ro: "Faimos pentru coasta sa accidentată, cele 65 de faruri istorice și asigurarea a peste 90% din aprovizionarea cu homar a națiunii."
    }
  },
  MD: {
    abbrev: "MD",
    fips: "24",
    region: "South",
    statehoodYear: 1788,
    statehoodOrder: 7,
    population: 6.2,
    gdp: 495,
    area: 12407,
    name: { en: "Maryland", ro: "Maryland" },
    capital: { en: "Annapolis", ro: "Annapolis" },
    nickname: { en: "Old Line State", ro: "Statul Vechii Linii" },
    industry: { en: "Biotechnology, Defense, Aerospace", ro: "Biotehnologie, Apărare, Aerospațial" },
    story: {
      en: "Fort McHenry in Baltimore was the site where Francis Scott Key wrote 'The Star-Spangled Banner' during the War of 1812.",
      ro: "Fort McHenry din Baltimore este locul unde Francis Scott Key a scris imnul 'The Star-Spangled Banner' în timpul Războiului din 1812."
    }
  },
  MA: {
    abbrev: "MA",
    fips: "25",
    region: "Northeast",
    statehoodYear: 1788,
    statehoodOrder: 6,
    population: 7.0,
    gdp: 718,
    area: 10554,
    name: { en: "Massachusetts", ro: "Massachusetts" },
    capital: { en: "Boston", ro: "Boston" },
    nickname: { en: "The Bay State", ro: "Statul Golfului" },
    industry: { en: "Higher Education, Biotech, Technology", ro: "Învățământ Superior, Biotehnologie, Tehnologie" },
    story: {
      en: "Home to Harvard University (established 1636), MIT, and the historic Boston Tea Party sites that sparked the American Revolution.",
      ro: "Găzduiește Universitatea Harvard (fondată în 1636), MIT și locurile istorice ale Boston Tea Party care au declanșat Revoluția Americană."
    }
  },
  MI: {
    abbrev: "MI",
    fips: "26",
    region: "Midwest",
    statehoodYear: 1837,
    statehoodOrder: 26,
    population: 10.0,
    gdp: 652,
    area: 96716,
    name: { en: "Michigan", ro: "Michigan" },
    capital: { en: "Lansing", ro: "Lansing" },
    nickname: { en: "Great Lakes State", ro: "Statul Marilor Lacuri" },
    industry: { en: "Automotive Manufacturing, Engineering", ro: "Industrie Auto, Inginerie" },
    story: {
      en: "Detroit, the 'Motor City', is the birthplace of the modern automotive assembly line invented by Henry Ford, which revolutionized manufacturing.",
      ro: "Detroit, numit 'Motor City', este locul de naștere al liniei moderne de asamblare auto inventate de Henry Ford, revoluționând industria."
    }
  },
  MN: {
    abbrev: "MN",
    fips: "27",
    region: "Midwest",
    statehoodYear: 1858,
    statehoodOrder: 32,
    population: 5.7,
    gdp: 458,
    area: 86936,
    name: { en: "Minnesota", ro: "Minnesota" },
    capital: { en: "St. Paul", ro: "St. Paul" },
    nickname: { en: "North Star State", ro: "Statul Stelei Nordului" },
    industry: { en: "Medical Technology, Retail, Agriculture", ro: "Tehnologie Medicală, Retail, Agricultură" },
    story: {
      en: "Known as the 'Land of 10,000 Lakes', the state actually contains 11,842 lakes over 10 acres, creating vast freshwater ecosystems.",
      ro: "Cunoscut drept 'Țara celor 10.000 de lacuri', statul conține în realitate 11.842 de lacuri mai mari de 10 acri, formând ecosisteme uriașe."
    }
  },
  MS: {
    abbrev: "MS",
    fips: "28",
    region: "South",
    statehoodYear: 1817,
    statehoodOrder: 20,
    population: 2.9,
    gdp: 139,
    area: 48430,
    name: { en: "Mississippi", ro: "Mississippi" },
    capital: { en: "Jackson", ro: "Jackson" },
    nickname: { en: "Magnolia State", ro: "Statul Magnolia" },
    industry: { en: "Agriculture, Forestry, Shipping", ro: "Agricultură, Silvicultură, Transport Naval" },
    story: {
      en: "The birth site of Blues music in the Mississippi Delta, which deeply influenced rock 'n' roll and modern American music.",
      ro: "Locul de naștere al muzicii Blues în Delta Mississippi, care a influențat profund genul rock 'n' roll și muzica americană modernă."
    }
  },
  MO: {
    abbrev: "MO",
    fips: "29",
    region: "Midwest",
    statehoodYear: 1821,
    statehoodOrder: 24,
    population: 6.2,
    gdp: 402,
    area: 69704,
    name: { en: "Missouri", ro: "Missouri" },
    capital: { en: "Jefferson City", ro: "Jefferson City" },
    nickname: { en: "Show Me State", ro: "Statul Arată-mi" },
    industry: { en: "Aerospace, Agriculture, Advanced Logistics", ro: "Aerospațial, Agricultură, Logistică Avansată" },
    story: {
      en: "St. Louis is home to the Gateway Arch—standing 630 feet high as the world's tallest monument representing westward expansion.",
      ro: "St. Louis găzduiește Arcul Gateway—un monument înalt de 192 de metri, cel mai înalt monument din lume simbolizând expansiunea spre vest."
    }
  },
  MT: {
    abbrev: "MT",
    fips: "30",
    region: "West",
    statehoodYear: 1889,
    statehoodOrder: 41,
    population: 1.1,
    gdp: 70,
    area: 147040,
    name: { en: "Montana", ro: "Montana" },
    capital: { en: "Helena", ro: "Helena" },
    nickname: { en: "Treasure State", ro: "Statul Comoară" },
    industry: { en: "Agriculture, Mining, Tourism", ro: "Agricultură, Minerit, Turism" },
    story: {
      en: "Home to Glacier National Park, which contains active glaciers and is part of the 'Crown of the Continent' ecosystem.",
      ro: "Găzduiește Parcul Național Glacier, care adăpostește ghețari activi și face parte din ecosistemul 'Coroana Continentului'."
    }
  },
  NE: {
    abbrev: "NE",
    fips: "31",
    region: "Midwest",
    statehoodYear: 1867,
    statehoodOrder: 37,
    population: 2.0,
    gdp: 168,
    area: 77348,
    name: { en: "Nebraska", ro: "Nebraska" },
    capital: { en: "Lincoln", ro: "Lincoln" },
    nickname: { en: "Cornhusker State", ro: "Statul Curățătorilor de Porumb" },
    industry: { en: "Agriculture, Finance & Insurance", ro: "Agricultură, Finanțe și Asigurări" },
    story: {
      en: "Home to the sandhills, the largest hand-planted forest in the world (Halsey), and Warren Buffett's Berkshire Hathaway in Omaha.",
      ro: "Găzduiește dunele de nisip sandhills, cea mai mare pădure plantată manual din lume (Halsey) și conglomeratul Berkshire Hathaway din Omaha."
    }
  },
  NV: {
    abbrev: "NV",
    fips: "32",
    region: "West",
    statehoodYear: 1864,
    statehoodOrder: 36,
    population: 3.2,
    gdp: 220,
    area: 110572,
    name: { en: "Nevada", ro: "Nevada" },
    capital: { en: "Carson City", ro: "Carson City" },
    nickname: { en: "Silver State", ro: "Statul Argintului" },
    industry: { en: "Tourism & Gaming, Mining, Clean Energy", ro: "Turism și Jocuri, Minerit, Energie Curată" },
    story: {
      en: "Las Vegas is the entertainment capital of the world, leading global hospitality and large-scale convention center development.",
      ro: "Las Vegas este capitala mondială a divertismentului, conducând piața globală de ospitalitate și organizarea conferințelor la scară largă."
    }
  },
  NH: {
    abbrev: "NH",
    fips: "33",
    region: "Northeast",
    statehoodYear: 1788,
    statehoodOrder: 9,
    population: 1.4,
    gdp: 108,
    area: 9349,
    name: { en: "New Hampshire", ro: "New Hampshire" },
    capital: { en: "Concord", ro: "Concord" },
    nickname: { en: "Granite State", ro: "Statul Granitului" },
    industry: { en: "Technology, Financial Services, Tourism", ro: "Tehnologie, Servicii Financiare, Turism" },
    story: {
      en: "Hosts the first presidential primary elections in the nation, and Mt. Washington, famous for some of the world's most extreme wind speeds.",
      ro: "Găzduiește primele alegeri primare prezidențiale din țară și Muntele Washington, faimos pentru cele mai extreme viteze ale vântului din lume."
    }
  },
  NJ: {
    abbrev: "NJ",
    fips: "34",
    region: "Northeast",
    statehoodYear: 1787,
    statehoodOrder: 3,
    population: 9.3,
    gdp: 778,
    area: 8723,
    name: { en: "New Jersey", ro: "New Jersey" },
    capital: { en: "Trenton", ro: "Trenton" },
    nickname: { en: "Garden State", ro: "Statul Grădină" },
    industry: { en: "Pharmaceuticals, Biotechnology, Telecom", ro: "Farmaceutice, Biotehnologie, Telecomunicații" },
    story: {
      en: "Thomas Edison's Menlo Park lab was the birth site of the incandescent light bulb, the phonograph, and the motion picture camera.",
      ro: "Laboratorul lui Thomas Edison din Menlo Park este locul de naștere al becului electric, al fonografului și al camerei de filmat."
    }
  },
  NM: {
    abbrev: "NM",
    fips: "35",
    region: "West",
    statehoodYear: 1912,
    statehoodOrder: 47,
    population: 2.1,
    gdp: 128,
    area: 121590,
    name: { en: "New Mexico", ro: "New Mexico" },
    capital: { en: "Santa Fe", ro: "Santa Fe" },
    nickname: { en: "Land of Enchantment", ro: "Ținutul Încântării" },
    industry: { en: "Aerospace & Defense, Scientific Research, Oil & Gas", ro: "Aerospațial și Apărare, Cercetare Științifică, Petrol și Gaze" },
    story: {
      en: "Hosts the Los Alamos National Laboratory and was the historic testing ground for the world's first nuclear detonation (Trinity test).",
      ro: "Găzduiește Laboratorul Național Los Alamos și a fost terenul istoric pentru prima detonare nucleară din lume (Testul Trinity)."
    }
  },
  NY: {
    abbrev: "NY",
    fips: "36",
    region: "Northeast",
    statehoodYear: 1788,
    statehoodOrder: 11,
    population: 19.6,
    gdp: 2150,
    area: 54555,
    name: { en: "New York", ro: "New York" },
    capital: { en: "Albany", ro: "Albany" },
    nickname: { en: "Empire State", ro: "Statul Imperiu" },
    industry: { en: "Finance, Technology, Media & Art", ro: "Finanțe, Tehnologie, Media și Artă" },
    story: {
      en: "New York City houses Wall Street and the NYSE, making it the financial capital of the globe, while upstate features rich natural parks.",
      ro: "New York City găzduiește Wall Street și NYSE, devenind capitala financiară a lumii, în timp ce nordul statului oferă parcuri naturale bogate."
    }
  },
  NC: {
    abbrev: "NC",
    fips: "37",
    region: "South",
    statehoodYear: 1789,
    statehoodOrder: 12,
    population: 10.8,
    gdp: 768,
    area: 53819,
    name: { en: "North Carolina", ro: "Carolina de Nord" },
    capital: { en: "Raleigh", ro: "Raleigh" },
    nickname: { en: "Tar Heel State", ro: "Statul Călcâiului de Katran" },
    industry: { en: "Information Tech, Banking, Biotechnology", ro: "Tehnologia Informației, Bănci, Biotehnologie" },
    story: {
      en: "Kitty Hawk was the site of the Wright Brothers' historic first powered, controlled flight in 1903, initiating the age of aviation.",
      ro: "Kitty Hawk este locul unde frații Wright au efectuat primul zbor controlat, autopropulsat din istorie în 1903, deschizând era aviației."
    }
  },
  ND: {
    abbrev: "ND",
    fips: "38",
    region: "Midwest",
    statehoodYear: 1889,
    statehoodOrder: 39,
    population: 0.78,
    gdp: 72,
    area: 70698,
    name: { en: "North Dakota", ro: "Dakota de Nord" },
    capital: { en: "Bismarck", ro: "Bismarck" },
    nickname: { en: "Peace Garden State", ro: "Statul Grădinii Păcii" },
    industry: { en: "Agriculture, Oil Extraction, Defense", ro: "Agricultură, Extracția Petrolului, Apărare" },
    story: {
      en: "Home to Theodore Roosevelt National Park where badlands and wild bison meet, and represents a key domestic energy producer.",
      ro: "Găzduiește Parcul Național Theodore Roosevelt unde preria întâlnește bizonii sălbatici, fiind un producător cheie de energie."
    }
  },
  OH: {
    abbrev: "OH",
    fips: "39",
    region: "Midwest",
    statehoodYear: 1803,
    statehoodOrder: 17,
    population: 11.8,
    gdp: 832,
    area: 44826,
    name: { en: "Ohio", ro: "Ohio" },
    capital: { en: "Columbus", ro: "Columbus" },
    nickname: { en: "Buckeye State", ro: "Statul Buckeye" },
    industry: { en: "Advanced Manufacturing, Aerospace, Health Care", ro: "Producție Avansată, Aerospațial, Sănătate" },
    story: {
      en: "The birthplace of aviation pioneers and 25 American astronauts, including historic legends Neil Armstrong and John Glenn.",
      ro: "Locul de naștere al pionierilor aviației și al 25 de astronauți americani, printre care legendele Neil Armstrong și John Glenn."
    }
  },
  OK: {
    abbrev: "OK",
    fips: "40",
    region: "South",
    statehoodYear: 1907,
    statehoodOrder: 46,
    population: 4.0,
    gdp: 245,
    area: 69899,
    name: { en: "Oklahoma", ro: "Oklahoma" },
    capital: { en: "Oklahoma City", ro: "Oklahoma City" },
    nickname: { en: "Sooner State", ro: "Statul Sooner" },
    industry: { en: "Oil & Gas, Aerospace Manufacturing, Agriculture", ro: "Petrol și Gaze, Industrie Aerospațială, Agricultură" },
    story: {
      en: "A historic center of Native American heritage and American cowboy culture, home to the National Cowboy Museum.",
      ro: "Un centru istoric al patrimoniului nativilor americani și al culturii cowboy-ilor, gazdă a Muzeului Național al Cowboy-ilor."
    }
  },
  OR: {
    abbrev: "OR",
    fips: "41",
    region: "West",
    statehoodYear: 1859,
    statehoodOrder: 33,
    population: 4.2,
    gdp: 298,
    area: 98379,
    name: { en: "Oregon", ro: "Oregon" },
    capital: { en: "Salem", ro: "Salem" },
    nickname: { en: "Beaver State", ro: "Statul Castor" },
    industry: { en: "Technology, Forestry, Outdoor Recreation", ro: "Tehnologie, Silvicultură, Turism și Recreere" },
    story: {
      en: "Crater Lake is the deepest lake in America, formed inside a collapsed volcanic caldera, filled entirely by direct rain and snow.",
      ro: "Crater Lake este cel mai adânc lac din America, format în caldera unui vulcan prăbușit, alimentat doar de ploaie și zăpadă."
    }
  },
  PA: {
    abbrev: "PA",
    fips: "42",
    region: "Northeast",
    statehoodYear: 1787,
    statehoodOrder: 2,
    population: 13.0,
    gdp: 935,
    area: 46054,
    name: { en: "Pennsylvania", ro: "Pennsylvania" },
    capital: { en: "Harrisburg", ro: "Harrisburg" },
    nickname: { en: "Keystone State", ro: "Statul Cheie de Boltă" },
    industry: { en: "Healthcare, Manufacturing, Coal & Steel", ro: "Sănătate, Producție Industrială, Cărbune și Oțel" },
    story: {
      en: "Philadelphia's Independence Hall is the birthplace of the United States, where the Declaration of Independence and Constitution were adopted.",
      ro: "Independence Hall din Philadelphia este locul de naștere al Statelor Unite, unde au fost adoptate Declarația de Independență și Constituția."
    }
  },
  RI: {
    abbrev: "RI",
    fips: "44",
    region: "Northeast",
    statehoodYear: 1790,
    statehoodOrder: 13,
    population: 1.1,
    gdp: 74,
    area: 1545,
    name: { en: "Rhode Island", ro: "Rhode Island" },
    capital: { en: "Providence", ro: "Providence" },
    nickname: { en: "Ocean State", ro: "Statul Ocean" },
    industry: { en: "Tourism, Healthcare, Education", ro: "Turism, Sănătate, Educație" },
    story: {
      en: "America's smallest state has over 400 miles of coastline, famous as a sailing capital and home to Newport's gilded mansions.",
      ro: "Cel mai mic stat al Americii are o coastă de peste 640 km, fiind renumit ca o capitală a navigației și casă a vilelor opulente din Newport."
    }
  },
  SC: {
    abbrev: "SC",
    fips: "45",
    region: "South",
    statehoodYear: 1788,
    statehoodOrder: 8,
    population: 5.3,
    gdp: 315,
    area: 32020,
    name: { en: "South Carolina", ro: "Carolina de Sud" },
    capital: { en: "Columbia", ro: "Columbia" },
    nickname: { en: "Palmetto State", ro: "Statul Palmierului Pitic" },
    industry: { en: "Automotive, Aerospace, Tourism", ro: "Automobile, Aerospațial, Turism" },
    story: {
      en: "Charleston is a historic port city famous for its historic architecture, cobblestone streets, and Civil War heritage at Fort Sumter.",
      ro: "Charleston este un port istoric renumit pentru arhitectura sa de epocă, străzile pavate și moștenirea Războiului Civil de la Fort Sumter."
    }
  },
  SD: {
    abbrev: "SD",
    fips: "46",
    region: "Midwest",
    statehoodYear: 1889,
    statehoodOrder: 40,
    population: 0.91,
    gdp: 70,
    area: 77116,
    name: { en: "South Dakota", ro: "Dakota de Sud" },
    capital: { en: "Pierre", ro: "Pierre" },
    nickname: { en: "Mount Rushmore State", ro: "Statul Muntelui Rushmore" },
    industry: { en: "Finance & Banking, Agriculture, Tourism", ro: "Finanțe și Bănci, Agricultură, Turism" },
    story: {
      en: "Home to Mount Rushmore, a colossal sculpture carved into granite showing the faces of Presidents Washington, Jefferson, Roosevelt, and Lincoln.",
      ro: "Găzduiește Muntele Rushmore, o sculptură monumentală în granit înfățișând chipurile președinților Washington, Jefferson, Roosevelt și Lincoln."
    }
  },
  TN: {
    abbrev: "TN",
    fips: "47",
    region: "South",
    statehoodYear: 1796,
    statehoodOrder: 16,
    population: 7.1,
    gdp: 485,
    area: 42144,
    name: { en: "Tennessee", ro: "Tennessee" },
    capital: { en: "Nashville", ro: "Nashville" },
    nickname: { en: "Volunteer State", ro: "Statul Voluntar" },
    industry: { en: "Automotive, Healthcare, Entertainment & Music", ro: "Auto, Servicii Medicale, Divertisment și Muzică" },
    story: {
      en: "Nashville, 'Music City USA', is the global capital of country music, while Memphis was the home base for rock legend Elvis Presley.",
      ro: "Nashville, supranumit 'Music City', este capitala mondială a muzicii country, în timp ce Memphis a fost casa legendei Elvis Presley."
    }
  },
  TX: {
    abbrev: "TX",
    fips: "48",
    region: "South",
    statehoodYear: 1845,
    statehoodOrder: 28,
    population: 30.5,
    gdp: 2560,
    area: 268596,
    name: { en: "Texas", ro: "Texas" },
    capital: { en: "Austin", ro: "Austin" },
    nickname: { en: "The Lone Star State", ro: "Statul Stelei Singuratice" },
    industry: { en: "Energy, Aerospace, Information Tech", ro: "Energie, Aerospațial, Tehnologia Informației" },
    story: {
      en: "America's energy powerhouse, home to NASA's Johnson Space Center in Houston, and is the nation's largest exporter of goods.",
      ro: "Forța energetică a Americii, gazdă a Centrului Spațial Johnson al NASA din Houston și cel mai mare exportator de mărfuri din țară."
    }
  },
  UT: {
    abbrev: "UT",
    fips: "49",
    region: "West",
    statehoodYear: 1896,
    statehoodOrder: 45,
    population: 3.4,
    gdp: 255,
    area: 84897,
    name: { en: "Utah", ro: "Utah" },
    capital: { en: "Salt Lake City", ro: "Salt Lake City" },
    nickname: { en: "Beehive State", ro: "Statul Stup" },
    industry: { en: "Software & Technology, Tourism, Finance", ro: "Software și Tehnologie, Turism, Finanțe" },
    story: {
      en: "Contains five world-class national parks (the 'Mighty 5') and hosted the 2002 Winter Olympic Games in Salt Lake City.",
      ro: "Conține cinci parcuri naționale de talie mondială (numite 'Mighty 5') și a găzduit Jocurile Olimpice de Iarnă din 2002 în Salt Lake City."
    }
  },
  VT: {
    abbrev: "VT",
    fips: "50",
    region: "Northeast",
    statehoodYear: 1791,
    statehoodOrder: 14,
    population: 0.65,
    gdp: 42,
    area: 9616,
    name: { en: "Vermont", ro: "Vermont" },
    capital: { en: "Montpelier", ro: "Montpelier" },
    nickname: { en: "Green Mountain State", ro: "Statul Munților Verzi" },
    industry: { en: "Agriculture & Maple Syrup, Tourism", ro: "Agricultură și Sirop de Arțar, Turism" },
    story: {
      en: "The leading producer of maple syrup in the United States, famous for its autumn foliage and commitment to local conservation.",
      ro: "Principalul producător de sirop de arțar din Statele Unite, faimos pentru peisajele de toamnă și dedicarea pentru conservarea naturii."
    }
  },
  VA: {
    abbrev: "VA",
    fips: "51",
    region: "South",
    statehoodYear: 1788,
    statehoodOrder: 10,
    population: 8.7,
    gdp: 695,
    area: 42775,
    name: { en: "Virginia", ro: "Virginia" },
    capital: { en: "Richmond", ro: "Richmond" },
    nickname: { en: "Mother of Presidents", ro: "Mama Președinților" },
    industry: { en: "Defense Contracting, Tech, Government", ro: "Contracte de Apărare, Tehnologie, Guvern" },
    story: {
      en: "Known as the 'Mother of Presidents' because 8 U.S. presidents were born here, including George Washington and Thomas Jefferson.",
      ro: "Cunoscut ca 'Mama Președinților' deoarece 8 președinți ai SUA s-au născut aici, inclusiv George Washington și Thomas Jefferson."
    }
  },
  WA: {
    abbrev: "WA",
    fips: "53",
    region: "West",
    statehoodYear: 1889,
    statehoodOrder: 42,
    population: 7.8,
    gdp: 805,
    area: 71298,
    name: { en: "Washington", ro: "Washington" },
    capital: { en: "Olympia", ro: "Olympia" },
    nickname: { en: "The Evergreen State", ro: "Statul Mereu Verde" },
    industry: { en: "Information Tech, Aerospace, Agriculture", ro: "Tehnologia Informației, Aerospațial, Agricultură" },
    story: {
      en: "Birthplace of tech giants Microsoft and Amazon, and Boeing's main aerospace assembly hubs, making it an innovation powerhouse.",
      ro: "Locul de naștere al giganților Microsoft și Amazon, precum și al principalelor fabrici Boeing, fiind un pilon al inovației."
    }
  },
  WV: {
    abbrev: "WV",
    fips: "54",
    region: "South",
    statehoodYear: 1863,
    statehoodOrder: 35,
    population: 1.77,
    gdp: 98,
    area: 24230,
    name: { en: "West Virginia", ro: "Virginia de Vest" },
    capital: { en: "Charleston", ro: "Charleston" },
    nickname: { en: "Mountain State", ro: "Statul Muntos" },
    industry: { en: "Energy, Chemicals, Forestry", ro: "Energie, Produse Chimice, Silvicultură" },
    story: {
      en: "The only state born by splitting from another state during the Civil War, famous for its Appalachian peaks and coal mining heritage.",
      ro: "Singurul stat apărut prin divizarea dintr-un alt stat în timpul Războiului Civil, renumit pentru munții Apalași și minerit."
    }
  },
  WI: {
    abbrev: "WI",
    fips: "55",
    region: "Midwest",
    statehoodYear: 1848,
    statehoodOrder: 30,
    population: 5.9,
    gdp: 405,
    area: 65496,
    name: { en: "Wisconsin", ro: "Wisconsin" },
    capital: { en: "Madison", ro: "Madison" },
    nickname: { en: "Badger State", ro: "Statul Viezure" },
    industry: { en: "Dairy & Cheese, Manufacturing, Paper", ro: "Lactate și Brânzeturi, Industrie Manufacturieră, Hârtie" },
    story: {
      en: "Known as 'America's Dairyland', Wisconsin produces over 3.4 billion pounds of cheese annually, leading the entire country.",
      ro: "Cunoscut drept 'Lactăria Americii', Wisconsin produce peste 3,4 miliarde de lire de brânză anual, conducând detașat în țară."
    }
  },
  WY: {
    abbrev: "WY",
    fips: "56",
    region: "West",
    statehoodYear: 1890,
    statehoodOrder: 44,
    population: 0.58,
    gdp: 49,
    area: 97813,
    name: { en: "Wyoming", ro: "Wyoming" },
    capital: { en: "Cheyenne", ro: "Cheyenne" },
    nickname: { en: "Equality State", ro: "Statul Egalității" },
    industry: { en: "Mining & Energy, Tourism, Agriculture", ro: "Minerit și Energie, Turism, Agricultură" },
    story: {
      en: "Home to Yellowstone National Park, the world's first national park, protecting active geysers, thermal springs, and massive herds of bison.",
      ro: "Găzduiește Parcul Național Yellowstone, primul parc național din lume, care protejează ghețari termali și turme uriașe de bizon."
    }
  }
};
