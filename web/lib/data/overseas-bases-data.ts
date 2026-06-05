import type { Locale } from "@/lib/i18n/config";
import type { ServiceBranch } from "./domestic-bases-data";

export interface OverseasBase {
  id: string;
  name: string;
  branch: ServiceBranch;
  country: string;
  locationDetails?: string;
}

export const overseasBases: OverseasBase[] = [
  // ==========================================
  // AUSTRALIA
  // ==========================================
  { id: 'adscs-kojarena', name: 'Australian Defence Satellite Communications Station', branch: 'Joint', country: 'Australia', locationDetails: 'Kojarena, Western Australia' },
  { id: 'ncs-harold-holt', name: 'Naval Communication Station Harold E. Holt', branch: 'Navy', country: 'Australia', locationDetails: 'Exmouth, Western Australia' },
  { id: 'pine-gap', name: 'Pine Gap', branch: 'Joint', country: 'Australia', locationDetails: 'Alice Springs, Northern Territory' },
  { id: 'robertson-barracks', name: 'Robertson Barracks (MRF-Darwin)', branch: 'Marine Corps', country: 'Australia', locationDetails: 'Darwin, Northern Territory' },

  // ==========================================
  // BAHAMAS & BAHRAIN
  // ==========================================
  { id: 'autec-bahamas', name: 'Atlantic Undersea Test and Evaluation Center (AUTEC)', branch: 'Navy', country: 'Bahamas' },
  { id: 'nsa-bahrain', name: 'Naval Support Activity Bahrain', branch: 'Navy', country: 'Bahrain', locationDetails: 'HQ Fifth Fleet' },

  // ==========================================
  // BELGIUM & BULGARIA
  // ==========================================
  { id: 'chievres-ab', name: 'Chièvres Air Base', branch: 'Joint', country: 'Belgium', locationDetails: 'NATO Airbase' },
  { id: 'aytos-logistics', name: 'Aytos Logistics Center', branch: 'Joint', country: 'Bulgaria', locationDetails: 'Burgas Province' },
  { id: 'bezmer-ab', name: 'Bezmer Air Base', branch: 'Joint', country: 'Bulgaria', locationDetails: 'Yambol Province' },
  { id: 'graf-ignatievo-ab', name: 'Graf Ignatievo Air Base', branch: 'Joint', country: 'Bulgaria', locationDetails: 'Plovdiv Province' },
  { id: 'novo-selo-range', name: 'Novo Selo Range', branch: 'Joint', country: 'Bulgaria', locationDetails: 'Sliven Province' },

  // ==========================================
  // CAMEROON & CANADA & CUBA & DJIBOUTI
  // ==========================================
  { id: 'cl-garoua', name: 'Contingency Location Garoua', branch: 'Army', country: 'Cameroon' },
  { id: 'cfb-north-bay', name: 'CFB North Bay', branch: 'Joint', country: 'Canada' },
  { id: 'ns-guantanamo', name: 'Guantanamo Bay Naval Base', branch: 'Navy', country: 'Cuba' },
  { id: 'camp-lemonnier', name: 'Camp Lemonnier', branch: 'Joint', country: 'Djibouti' },

  // ==========================================
  // GERMANY
  // ==========================================
  { id: 'geilenkirchen-nato', name: 'NATO Air Base Geilenkirchen', branch: 'Air Force', country: 'Germany' },
  { id: 'buchel-ab', name: 'Büchel Air Base', branch: 'Air Force', country: 'Germany' },
  { id: 'dagger-complex', name: 'Dagger Complex', branch: 'Army', country: 'Germany', locationDetails: 'Darmstadt' },
  { id: 'grafenwohr-training', name: 'Grafenwöhr Training Area', branch: 'Army', country: 'Germany' },
  { id: 'hohenfels-training', name: 'Hohenfels Training Area', branch: 'Army', country: 'Germany' },
  { id: 'kaiserslautern-mc', name: 'Kaiserslautern Military Community', branch: 'Joint', country: 'Germany' },
  { id: 'katterbach-kaserne', name: 'Katterbach Kaserne', branch: 'Army', country: 'Germany', locationDetails: 'Ansbach' },
  { id: 'kelley-barracks', name: 'Kelley Barracks', branch: 'Army', country: 'Germany', locationDetails: 'Stuttgart' },
  { id: 'lucius-clay-kaserne', name: 'Lucius D. Clay Kaserne', branch: 'Army', country: 'Germany', locationDetails: 'Wiesbaden' },
  { id: 'landstuhl-rmc', name: 'Landstuhl Regional Medical Center', branch: 'Army', country: 'Germany' },
  { id: 'africom-law', name: 'Maritime & International Law-U.S. Africa Command', branch: 'Joint', country: 'Germany' },
  { id: 'panzer-kaserne', name: 'Panzer Kaserne', branch: 'Army', country: 'Germany', locationDetails: 'Böblingen' },
  { id: 'patch-barracks', name: 'Patch Barracks', branch: 'Army', country: 'Germany', locationDetails: 'Stuttgart' },
  { id: 'ramstein-ab', name: 'Ramstein Air Base', branch: 'Air Force', country: 'Germany' },
  { id: 'robinson-barracks', name: 'Robinson Barracks', branch: 'Army', country: 'Germany', locationDetails: 'Stuttgart' },
  { id: 'sembach-kaserne', name: 'Sembach Kaserne', branch: 'Army', country: 'Germany', locationDetails: 'Kaiserslautern' },
  { id: 'shipton-kaserne', name: 'Shipton Kaserne', branch: 'Army', country: 'Germany', locationDetails: 'Ansbach' },
  { id: 'spangdahlem-ab', name: 'Spangdahlem Air Base', branch: 'Air Force', country: 'Germany' },
  { id: 'storck-barracks', name: 'Storck Barracks', branch: 'Army', country: 'Germany', locationDetails: 'Illesheim' },

  // ==========================================
  // GREECE, GREENLAND, HONDURAS, ISRAEL
  // ==========================================
  { id: 'crete-naval-base', name: 'Crete Naval Base', branch: 'Navy', country: 'Greece', locationDetails: 'Souda Bay' },
  { id: 'pituffik-sfb', name: 'Pituffik Space Base', branch: 'Space Force', country: 'Greenland' },
  { id: 'soto-cano-ab', name: 'Soto Cano Air Base', branch: 'Joint', country: 'Honduras', locationDetails: 'JTF Bravo' },
  { id: 'dimona-radar', name: 'Dimona Radar Facility', branch: 'Joint', country: 'Israel' },
  { id: 'site-512', name: 'Site 512', branch: 'Army', country: 'Israel' },

  // ==========================================
  // ITALY
  // ==========================================
  { id: 'aviano-ab', name: 'Aviano Air Base', branch: 'Air Force', country: 'Italy' },
  { id: 'caserma-ederle', name: 'Caserma Ederle & Camp Darby', branch: 'Army', country: 'Italy' },
  { id: 'nsa-naples', name: 'Naval Support Activity Naples', branch: 'Navy', country: 'Italy', locationDetails: 'HQ Sixth Fleet' },
  { id: 'sigonella-nas', name: 'Sigonella Naval Air Station', branch: 'Navy', country: 'Italy' },

  // ==========================================
  // IRAQ & JAPAN
  // ==========================================
  { id: 'harir-ab', name: 'Harir Air Base', branch: 'Joint', country: 'Iraq', locationDetails: 'Erbil Governorate' },
  { id: 'camp-zama', name: 'Camp Zama', branch: 'Army', country: 'Japan' },
  { id: 'fort-buckner', name: 'Fort Buckner', branch: 'Army', country: 'Japan' },
  { id: 'kadena-ab', name: 'Kadena Air Base', branch: 'Air Force', country: 'Japan', locationDetails: 'Okinawa' },
  { id: 'kanoya-af', name: 'Kanoya Air Field', branch: 'Marine Corps', country: 'Japan', locationDetails: 'Kagoshima' },
  { id: 'misawa-ab', name: 'Misawa Air Base', branch: 'Air Force', country: 'Japan', locationDetails: 'Aomori' },
  { id: 'mcas-futenma', name: 'MCAS Futenma', branch: 'Marine Corps', country: 'Japan', locationDetails: 'Okinawa' },
  { id: 'mcas-iwakuni', name: 'MCAS Iwakuni', branch: 'Marine Corps', country: 'Japan', locationDetails: 'Yamaguchi' },
  { id: 'mcb-camp-butler', name: 'MCB Camp Smedley D. Butler', branch: 'Marine Corps', country: 'Japan', locationDetails: 'Okinawa Complex' },
  { id: 'camp-fuji', name: 'Camp Fuji', branch: 'Marine Corps', country: 'Japan', locationDetails: 'Shizuoka' },
  { id: 'naf-atsugi', name: 'Naval Air Facility Atsugi', branch: 'Navy', country: 'Japan' },
  { id: 'nf-japan-okinawa', name: 'Naval Forces Japan, Okinawa', branch: 'Navy', country: 'Japan' },
  { id: 'sagami-depot', name: 'Sagami General Depot', branch: 'Army', country: 'Japan' },
  { id: 'usag-okinawa', name: 'U.S. Army Garrison Okinawa', branch: 'Army', country: 'Japan' },
  { id: 'cfa-sasebo', name: 'Fleet Activities Sasebo', branch: 'Navy', country: 'Japan' },
  { id: 'cfa-yokosuka', name: 'Fleet Activities Yokosuka', branch: 'Navy', country: 'Japan' },
  { id: 'yokota-ab', name: 'Yokota Air Base', branch: 'Air Force', country: 'Japan', locationDetails: 'Tokyo' },

  // ==========================================
  // JORDAN, KENYA, KOSOVO, KUWAIT, MARSHALL ISLANDS
  // ==========================================
  { id: 'muwaffaq-salti-ab', name: 'Muwaffaq Salti Air Base', branch: 'Air Force', country: 'Jordan', locationDetails: 'Azraq' },
  { id: 'tower-22', name: 'Tower 22', branch: 'Joint', country: 'Jordan', locationDetails: 'Rukban' },
  { id: 'camp-simba', name: 'Camp Simba', branch: 'Navy', country: 'Kenya' },
  { id: 'camp-bondsteel', name: 'Camp Bondsteel', branch: 'Army', country: 'Kosovo', locationDetails: 'KFOR Base' },
  { id: 'camp-arifjan', name: 'Camp Arifjan', branch: 'Army', country: 'Kuwait' },
  { id: 'camp-buehring', name: 'Camp Buehring', branch: 'Army', country: 'Kuwait' },
  { id: 'camp-patriot', name: 'Camp Patriot', branch: 'Joint', country: 'Kuwait', locationDetails: 'Kuwait Naval Base' },
  { id: 'ahmad-al-jaber-ab', name: 'Ahmad al-Jaber Air Base', branch: 'Air Force', country: 'Kuwait' },
  { id: 'ali-al-salem-ab', name: 'Ali Al Salem Air Base', branch: 'Air Force', country: 'Kuwait' },
  { id: 'bucholz-aaf', name: 'Bucholz Army Airfield', branch: 'Army', country: 'Marshall Islands' },

  // ==========================================
  // NETHERLANDS, POLAND, PORTUGAL, QATAR
  // ==========================================
  { id: 'uscg-europe', name: 'USCG Activities Europe', branch: 'Joint', country: 'Netherlands' },
  { id: 'volkel-ab', name: 'Volkel Air Base', branch: 'Air Force', country: 'Netherlands', locationDetails: '703rd MUNSS' },
  { id: 'camp-kosciuszko', name: 'Camp Kościuszko', branch: 'Army', country: 'Poland', locationDetails: 'HQ V Corps' },
  { id: 'powidz-ab', name: '33rd Air Base, Powidz', branch: 'Joint', country: 'Poland' },
  { id: 'lask-ab', name: 'Łask Air Base', branch: 'Air Force', country: 'Poland' },
  { id: 'redzikowo-md', name: 'Redzikowo Missile Defense Complex', branch: 'Joint', country: 'Poland', locationDetails: 'Aegis Ashore' },
  { id: 'lajes-ab', name: 'Lajes Air Base', branch: 'Air Force', country: 'Portugal', locationDetails: 'Azores' },
  { id: 'al-udeid-ab', name: 'Al Udeid Air Base', branch: 'Air Force', country: 'Qatar' },

  // ==========================================
  // ROMANIA & SAUDI ARABIA
  // ==========================================
  { id: 'campia-turzii-ab', name: 'Câmpia Turzii Air Base', branch: 'Air Force', country: 'Romania', locationDetails: '731st EAS' },
  { id: 'deveselu-base', name: 'Deveselu Military Base', branch: 'Navy', country: 'Romania', locationDetails: 'NSF Deveselu / Aegis Ashore' },
  { id: 'mk-air-base', name: 'Mihail Kogălniceanu Air Base', branch: 'Joint', country: 'Romania', locationDetails: 'USAG Black Sea' },
  { id: 'saudi-maritime', name: 'Saudi Maritime Infrastructure Protection Force', branch: 'Navy', country: 'Saudi Arabia' },
  { id: 'prince-sultan-ab', name: 'Prince Sultan Air Base', branch: 'Air Force', country: 'Saudi Arabia' },

  // ==========================================
  // SINGAPORE, SOMALIA, SOUTH KOREA
  // ==========================================
  { id: 'changi-ab', name: 'Changi Air Base', branch: 'Air Force', country: 'Singapore' },
  { id: 'changi-naval', name: 'Changi Naval Base', branch: 'Navy', country: 'Singapore' },
  { id: 'baledogle-af', name: 'Baledogle Airfield', branch: 'Joint', country: 'Somalia' },
  { id: 'busan-naval', name: 'Busan Naval Base', branch: 'Navy', country: 'South Korea' },
  { id: 'camp-mujuk', name: 'Camp Mujuk', branch: 'Marine Corps', country: 'South Korea' },
  { id: 'cfa-chinhae', name: 'Commander Fleet Activities Chinhae', branch: 'Navy', country: 'South Korea' },
  { id: 'kunsan-ab', name: 'Kunsan Air Base', branch: 'Air Force', country: 'South Korea' },
  { id: 'osan-ab', name: 'Osan Air Base', branch: 'Air Force', country: 'South Korea' },

  // ==========================================
  // SPAIN, TURKEY, UAE, UK & TERRITORIES
  // ==========================================
  { id: 'moron-ab', name: 'Morón Air Base', branch: 'Air Force', country: 'Spain' },
  { id: 'ns-rota', name: 'Naval Station Rota', branch: 'Navy', country: 'Spain' },
  { id: 'incirlik-ab', name: 'Incirlik Air Base', branch: 'Air Force', country: 'Turkey' },
  { id: 'izmir-as', name: 'Izmir Air Station', branch: 'Air Force', country: 'Turkey' },
  { id: 'kurecik-radar', name: 'Kürecik Radar Station', branch: 'Army', country: 'Turkey' },
  { id: 'al-dhafra-ab', name: 'Al Dhafra Air Base', branch: 'Air Force', country: 'United Arab Emirates' },
  { id: 'raf-alconbury', name: 'RAF Alconbury', branch: 'Air Force', country: 'United Kingdom', locationDetails: 'Huntingdonshire' },
  { id: 'raf-croughton', name: 'RAF Croughton', branch: 'Air Force', country: 'United Kingdom', locationDetails: 'Northamptonshire' },
  { id: 'raf-fairford', name: 'RAF Fairford', branch: 'Air Force', country: 'United Kingdom', locationDetails: 'Gloucestershire' },
  { id: 'raf-lakenheath', name: 'RAF Lakenheath', branch: 'Air Force', country: 'United Kingdom', locationDetails: 'Suffolk' },
  { id: 'raf-mildenhall', name: 'RAF Mildenhall', branch: 'Air Force', country: 'United Kingdom', locationDetails: 'Suffolk' },
  { id: 'raf-molesworth', name: 'RAF Molesworth', branch: 'Air Force', country: 'United Kingdom', locationDetails: 'Cambridgeshire' },
  { id: 'ascension-aaf', name: 'Ascension Island Auxiliary Airfield', branch: 'Joint', country: 'British Overseas Territory' },
  { id: 'nsf-diego-garcia', name: 'Naval Support Facility Diego Garcia', branch: 'Navy', country: 'British Overseas Territory' },
];

export function getOverseasBases(locale: Locale): OverseasBase[] {
  return overseasBases;
}
