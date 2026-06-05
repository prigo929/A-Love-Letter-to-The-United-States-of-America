import type { Locale } from "@/lib/i18n/config";
import type { ServiceBranch } from "./domestic-bases-data";

export interface OverseasBase {
  id: string;
  name: string;
  branch: ServiceBranch;
  country: string;
  coordinates: string; // format: "latitude, longitude"
  locationDetails?: string;
}

export const overseasBases: OverseasBase[] = [
  // ==========================================
  // AUSTRALIA
  // ==========================================
  { id: 'adscs-kojarena', name: 'Australian Defence Satellite Communications Station', branch: 'Joint', country: 'Australia', coordinates: '-28.6946, 114.8427', locationDetails: 'Kojarena, Western Australia' },
  { id: 'ncs-harold-holt', name: 'Naval Communication Station Harold E. Holt', branch: 'Navy', country: 'Australia', coordinates: '-21.8159, 114.1651', locationDetails: 'Exmouth, Western Australia' },
  { id: 'pine-gap', name: 'Pine Gap', branch: 'Joint', country: 'Australia', coordinates: '-23.7989, 133.7375', locationDetails: 'Alice Springs, Northern Territory' },
  { id: 'robertson-barracks', name: 'Robertson Barracks (MRF-Darwin)', branch: 'Marine Corps', country: 'Australia', coordinates: '-12.4634, 130.9856', locationDetails: 'Darwin, Northern Territory' },

  // ==========================================
  // BAHAMAS & BAHRAIN
  // ==========================================
  { id: 'autec-bahamas', name: 'Atlantic Undersea Test and Evaluation Center (AUTEC)', branch: 'Navy', country: 'Bahamas', coordinates: '24.7118, -77.7788' },
  { id: 'nsa-bahrain', name: 'Naval Support Activity Bahrain', branch: 'Navy', country: 'Bahrain', coordinates: '26.2084, 50.6074', locationDetails: 'HQ Fifth Fleet' },

  // ==========================================
  // BELGIUM & BULGARIA
  // ==========================================
  { id: 'chievres-ab', name: 'Chièvres Air Base', branch: 'Joint', country: 'Belgium', coordinates: '50.5758, 3.8310', locationDetails: 'NATO Airbase' },
  { id: 'aytos-logistics', name: 'Aytos Logistics Center', branch: 'Joint', country: 'Bulgaria', coordinates: '42.7000, 27.2500', locationDetails: 'Burgas Province' },
  { id: 'bezmer-ab', name: 'Bezmer Air Base', branch: 'Joint', country: 'Bulgaria', coordinates: '42.4547, 26.3522', locationDetails: 'Yambol Province' },
  { id: 'graf-ignatievo-ab', name: 'Graf Ignatievo Air Base', branch: 'Joint', country: 'Bulgaria', coordinates: '42.2906, 24.7131', locationDetails: 'Plovdiv Province' },
  { id: 'novo-selo-range', name: 'Novo Selo Range', branch: 'Joint', country: 'Bulgaria', coordinates: '42.7423, 26.6027', locationDetails: 'Sliven Province' },

  // ==========================================
  // CAMEROON & CANADA & CUBA & DJIBOUTI
  // ==========================================
  { id: 'cl-garoua', name: 'Contingency Location Garoua', branch: 'Army', country: 'Cameroon', coordinates: '9.3364, 13.3765' },
  { id: 'cfb-north-bay', name: 'CFB North Bay', branch: 'Joint', country: 'Canada', coordinates: '46.3636, -79.4228' },
  { id: 'ns-guantanamo', name: 'Guantanamo Bay Naval Base', branch: 'Navy', country: 'Cuba', coordinates: '19.9060, -75.2071' },
  { id: 'camp-lemonnier', name: 'Camp Lemonnier', branch: 'Joint', country: 'Djibouti', coordinates: '11.5472, 43.1594' },

  // ==========================================
  // GERMANY
  // ==========================================
  { id: 'geilenkirchen-nato', name: 'NATO Air Base Geilenkirchen', branch: 'Air Force', country: 'Germany', coordinates: '50.9608, 6.0422' },
  { id: 'buchel-ab', name: 'Büchel Air Base', branch: 'Air Force', country: 'Germany', coordinates: '50.1738, 7.0594' },
  { id: 'dagger-complex', name: 'Dagger Complex', branch: 'Army', country: 'Germany', coordinates: '49.8291, 8.5833', locationDetails: 'Darmstadt' },
  { id: 'grafenwohr-training', name: 'Grafenwöhr Training Area', branch: 'Army', country: 'Germany', coordinates: '49.7156, 11.9016' },
  { id: 'hohenfels-training', name: 'Hohenfels Training Area', branch: 'Army', country: 'Germany', coordinates: '49.2150, 11.8363' },
  { id: 'kaiserslautern-mc', name: 'Kaiserslautern Military Community', branch: 'Joint', country: 'Germany', coordinates: '49.4385, 7.6003' },
  { id: 'katterbach-kaserne', name: 'Katterbach Kaserne', branch: 'Army', country: 'Germany', coordinates: '49.3130, 10.6385', locationDetails: 'Ansbach' },
  { id: 'kelley-barracks', name: 'Kelley Barracks', branch: 'Army', country: 'Germany', coordinates: '48.7230, 9.1763', locationDetails: 'Stuttgart' },
  { id: 'lucius-clay-kaserne', name: 'Lucius D. Clay Kaserne', branch: 'Army', country: 'Germany', coordinates: '50.0494, 8.3255', locationDetails: 'Wiesbaden' },
  { id: 'landstuhl-rmc', name: 'Landstuhl Regional Medical Center', branch: 'Army', country: 'Germany', coordinates: '49.4002, 7.5540' },
  { id: 'africom-law', name: 'Maritime & International Law-U.S. Africa Command', branch: 'Joint', country: 'Germany', coordinates: '48.7230, 9.1763' },
  { id: 'panzer-kaserne', name: 'Panzer Kaserne', branch: 'Army', country: 'Germany', coordinates: '48.6836, 9.0436', locationDetails: 'Böblingen' },
  { id: 'patch-barracks', name: 'Patch Barracks', branch: 'Army', country: 'Germany', coordinates: '48.7369, 9.0805', locationDetails: 'Stuttgart' },
  { id: 'ramstein-ab', name: 'Ramstein Air Base', branch: 'Air Force', country: 'Germany', coordinates: '49.4369, 7.6003' },
  { id: 'robinson-barracks', name: 'Robinson Barracks', branch: 'Army', country: 'Germany', coordinates: '48.8319, 9.1919', locationDetails: 'Stuttgart' },
  { id: 'sembach-kaserne', name: 'Sembach Kaserne', branch: 'Army', country: 'Germany', coordinates: '49.5083, 7.8594', locationDetails: 'Kaiserslautern' },
  { id: 'shipton-kaserne', name: 'Shipton Kaserne', branch: 'Army', country: 'Germany', coordinates: '49.3241, 10.6263', locationDetails: 'Ansbach' },
  { id: 'spangdahlem-ab', name: 'Spangdahlem Air Base', branch: 'Air Force', country: 'Germany', coordinates: '49.9727, 6.6925' },
  { id: 'storck-barracks', name: 'Storck Barracks', branch: 'Army', country: 'Germany', coordinates: '49.4755, 10.3847', locationDetails: 'Illesheim' },

  // ==========================================
  // GREECE, GREENLAND, HONDURAS, ISRAEL
  // ==========================================
  { id: 'crete-naval-base', name: 'Crete Naval Base', branch: 'Navy', country: 'Greece', coordinates: '35.4950, 24.1486', locationDetails: 'Souda Bay' },
  { id: 'pituffik-sfb', name: 'Pituffik Space Base', branch: 'Space Force', country: 'Greenland', coordinates: '76.5312, -68.7031' },
  { id: 'soto-cano-ab', name: 'Soto Cano Air Base', branch: 'Joint', country: 'Honduras', coordinates: '14.3822, -87.6225', locationDetails: 'JTF Bravo' },
  { id: 'dimona-radar', name: 'Dimona Radar Facility', branch: 'Joint', country: 'Israel', coordinates: '30.9666, 35.0933' },
  { id: 'site-512', name: 'Site 512', branch: 'Army', country: 'Israel', coordinates: '31.1340, 34.7877' },

  // ==========================================
  // ITALY
  // ==========================================
  { id: 'aviano-ab', name: 'Aviano Air Base', branch: 'Air Force', country: 'Italy', coordinates: '46.0319, 12.5963' },
  { id: 'caserma-ederle', name: 'Caserma Ederle & Camp Darby', branch: 'Army', country: 'Italy', coordinates: '45.5413, 11.5794' },
  { id: 'nsa-naples', name: 'Naval Support Activity Naples', branch: 'Navy', country: 'Italy', coordinates: '40.8841, 14.2886', locationDetails: 'HQ Sixth Fleet' },
  { id: 'sigonella-nas', name: 'Sigonella Naval Air Station', branch: 'Navy', country: 'Italy', coordinates: '37.4019, 14.9222' },

  // ==========================================
  // IRAQ & JAPAN
  // ==========================================
  { id: 'harir-ab', name: 'Harir Air Base', branch: 'Joint', country: 'Iraq', coordinates: '36.5297, 44.3411', locationDetails: 'Erbil Governorate' },
  { id: 'camp-zama', name: 'Camp Zama', branch: 'Army', country: 'Japan', coordinates: '35.5130, 139.3941' },
  { id: 'fort-buckner', name: 'Fort Buckner', branch: 'Army', country: 'Japan', coordinates: '26.3113, 127.7913' },
  { id: 'kadena-ab', name: 'Kadena Air Base', branch: 'Air Force', country: 'Japan', coordinates: '26.3555, 127.7674', locationDetails: 'Okinawa' },
  { id: 'kanoya-af', name: 'Kanoya Air Field', branch: 'Marine Corps', country: 'Japan', coordinates: '31.3672, 130.8363', locationDetails: 'Kagoshima' },
  { id: 'misawa-ab', name: 'Misawa Air Base', branch: 'Air Force', country: 'Japan', coordinates: '40.7022, 141.3683', locationDetails: 'Aomori' },
  { id: 'mcas-futenma', name: 'MCAS Futenma', branch: 'Marine Corps', country: 'Japan', coordinates: '26.2736, 127.7558', locationDetails: 'Okinawa' },
  { id: 'mcas-iwakuni', name: 'MCAS Iwakuni', branch: 'Marine Corps', country: 'Japan', coordinates: '34.1436, 132.2355', locationDetails: 'Yamaguchi' },
  { id: 'mcb-camp-butler', name: 'MCB Camp Smedley D. Butler', branch: 'Marine Corps', country: 'Japan', coordinates: '26.3055, 127.7816', locationDetails: 'Okinawa Complex' },
  { id: 'camp-fuji', name: 'Camp Fuji', branch: 'Marine Corps', country: 'Japan', coordinates: '35.3125, 138.8772', locationDetails: 'Shizuoka' },
  { id: 'naf-atsugi', name: 'Naval Air Facility Atsugi', branch: 'Navy', country: 'Japan', coordinates: '35.4547, 139.4511' },
  { id: 'nf-japan-okinawa', name: 'Naval Forces Japan, Okinawa', branch: 'Navy', country: 'Japan', coordinates: '26.3263, 127.8180' },
  { id: 'sagami-depot', name: 'Sagami General Depot', branch: 'Army', country: 'Japan', coordinates: '35.5802, 139.3794' },
  { id: 'usag-okinawa', name: 'U.S. Army Garrison Okinawa', branch: 'Army', country: 'Japan', coordinates: '26.3888, 127.7330' },
  { id: 'cfa-sasebo', name: 'Fleet Activities Sasebo', branch: 'Navy', country: 'Japan', coordinates: '33.1613, 129.7150' },
  { id: 'cfa-yokosuka', name: 'Fleet Activities Yokosuka', branch: 'Navy', country: 'Japan', coordinates: '35.2861, 139.6666' },
  { id: 'yokota-ab', name: 'Yokota Air Base', branch: 'Air Force', country: 'Japan', coordinates: '35.7486, 139.3486', locationDetails: 'Tokyo' },

  // ==========================================
  // JORDAN, KENYA, KOSOVO, KUWAIT, MARSHALL ISLANDS
  // ==========================================
  { id: 'muwaffaq-salti-ab', name: 'Muwaffaq Salti Air Base', branch: 'Air Force', country: 'Jordan', coordinates: '31.8341, 36.7825', locationDetails: 'Azraq' },
  { id: 'tower-22', name: 'Tower 22', branch: 'Joint', country: 'Jordan', coordinates: '33.3150, 38.6722', locationDetails: 'Rukban' },
  { id: 'camp-simba', name: 'Camp Simba', branch: 'Navy', country: 'Kenya', coordinates: '-2.2741, 40.9069' },
  { id: 'camp-bondsteel', name: 'Camp Bondsteel', branch: 'Army', country: 'Kosovo', coordinates: '42.3661, 21.2461', locationDetails: 'KFOR Base' },
  { id: 'camp-arifjan', name: 'Camp Arifjan', branch: 'Army', country: 'Kuwait', coordinates: '28.8752, 48.1583' },
  { id: 'camp-buehring', name: 'Camp Buehring', branch: 'Army', country: 'Kuwait', coordinates: '29.6997, 47.4338' },
  { id: 'camp-patriot', name: 'Camp Patriot', branch: 'Joint', country: 'Kuwait', coordinates: '28.8522, 48.2913', locationDetails: 'Kuwait Naval Base' },
  { id: 'ahmad-al-jaber-ab', name: 'Ahmad al-Jaber Air Base', branch: 'Air Force', country: 'Kuwait', coordinates: '28.9347, 47.7933' },
  { id: 'ali-al-salem-ab', name: 'Ali Al Salem Air Base', branch: 'Air Force', country: 'Kuwait', coordinates: '29.3463, 47.5211' },
  { id: 'bucholz-aaf', name: 'Bucholz Army Airfield', branch: 'Army', country: 'Marshall Islands', coordinates: '8.7302, 167.7402' },

  // ==========================================
  // NETHERLANDS, POLAND, PORTUGAL, QATAR
  // ==========================================
  { id: 'uscg-europe', name: 'USCG Activities Europe', branch: 'Joint', country: 'Netherlands', coordinates: '50.8491, 5.9750' },
  { id: 'volkel-ab', name: 'Volkel Air Base', branch: 'Air Force', country: 'Netherlands', coordinates: '51.6575, 5.7061', locationDetails: '703rd MUNSS' },
  { id: 'camp-kosciuszko', name: 'Camp Kościuszko', branch: 'Army', country: 'Poland', coordinates: '52.4063, 16.9251', locationDetails: 'HQ V Corps' },
  { id: 'powidz-ab', name: '33rd Air Base, Powidz', branch: 'Joint', country: 'Poland', coordinates: '52.3780, 17.9525' },
  { id: 'lask-ab', name: 'Łask Air Base', branch: 'Air Force', country: 'Poland', coordinates: '51.5511, 19.1802' },
  { id: 'redzikowo-md', name: 'Redzikowo Missile Defense Complex', branch: 'Joint', country: 'Poland', coordinates: '54.4827, 17.1122', locationDetails: 'Aegis Ashore' },
  { id: 'lajes-ab', name: 'Lajes Air Base', branch: 'Air Force', country: 'Portugal', coordinates: '38.7616, -27.0908', locationDetails: 'Azores' },
  { id: 'al-udeid-ab', name: 'Al Udeid Air Base', branch: 'Air Force', country: 'Qatar', coordinates: '25.1175, 51.3147' },

  // ==========================================
  // ROMANIA & SAUDI ARABIA
  // ==========================================
  { id: 'campia-turzii-ab', name: 'Câmpia Turzii Air Base', branch: 'Air Force', country: 'Romania', coordinates: '46.4527, 23.9016', locationDetails: '731st EAS' },
  { id: 'deveselu-base', name: 'Deveselu Military Base', branch: 'Navy', country: 'Romania', coordinates: '44.0622, 24.3975', locationDetails: 'NSF Deveselu / Aegis Ashore' },
  { id: 'mk-air-base', name: 'Mihail Kogălniceanu Air Base', branch: 'Joint', country: 'Romania', coordinates: '44.3622, 28.4883', locationDetails: 'USAG Black Sea' },
  { id: 'saudi-maritime', name: 'Saudi Maritime Infrastructure Protection Force', branch: 'Navy', country: 'Saudi Arabia', coordinates: '26.9744, 49.6586' },
  { id: 'prince-sultan-ab', name: 'Prince Sultan Air Base', branch: 'Air Force', country: 'Saudi Arabia', coordinates: '24.0558, 47.5802' },

  // ==========================================
  // SINGAPORE, SOMALIA, SOUTH KOREA
  // ==========================================
  { id: 'changi-ab', name: 'Changi Air Base', branch: 'Air Force', country: 'Singapore', coordinates: '1.3780, 103.9922' },
  { id: 'changi-naval', name: 'Changi Naval Base', branch: 'Navy', country: 'Singapore', coordinates: '1.3094, 104.0208' },
  { id: 'baledogle-af', name: 'Baledogle Airfield', branch: 'Joint', country: 'Somalia', coordinates: '2.5711, 44.8219' },
  { id: 'busan-naval', name: 'Busan Naval Base', branch: 'Navy', country: 'South Korea', coordinates: '35.1011, 129.1022' },
  { id: 'camp-mujuk', name: 'Camp Mujuk', branch: 'Marine Corps', country: 'South Korea', coordinates: '35.9405, 129.4180' },
  { id: 'cfa-chinhae', name: 'Commander Fleet Activities Chinhae', branch: 'Navy', country: 'South Korea', coordinates: '35.1508, 128.6658' },
  { id: 'kunsan-ab', name: 'Kunsan Air Base', branch: 'Air Force', country: 'South Korea', coordinates: '35.9036, 126.6158' },
  { id: 'osan-ab', name: 'Osan Air Base', branch: 'Air Force', country: 'South Korea', coordinates: '37.0897, 127.0275' },

  // ==========================================
  // SPAIN, TURKEY, UAE, UK & TERRITORIES
  // ==========================================
  { id: 'moron-ab', name: 'Morón Air Base', branch: 'Air Force', country: 'Spain', coordinates: '37.1705, -5.6158' },
  { id: 'ns-rota', name: 'Naval Station Rota', branch: 'Navy', country: 'Spain', coordinates: '36.6455, -6.3497' },
  { id: 'incirlik-ab', name: 'Incirlik Air Base', branch: 'Air Force', country: 'Turkey', coordinates: '37.0019, 35.4258' },
  { id: 'izmir-as', name: 'Izmir Air Station', branch: 'Air Force', country: 'Turkey', coordinates: '38.5130, 27.0097' },
  { id: 'kurecik-radar', name: 'Kürecik Radar Station', branch: 'Army', country: 'Turkey', coordinates: '38.4116, 37.7663' },
  { id: 'al-dhafra-ab', name: 'Al Dhafra Air Base', branch: 'Air Force', country: 'United Arab Emirates', coordinates: '24.2483, 54.5477' },
  { id: 'raf-alconbury', name: 'RAF Alconbury', branch: 'Air Force', country: 'United Kingdom', coordinates: '52.3705, -0.2227', locationDetails: 'Huntingdonshire' },
  { id: 'raf-croughton', name: 'RAF Croughton', branch: 'Air Force', country: 'United Kingdom', coordinates: '51.9866, -1.1822', locationDetails: 'Northamptonshire' },
  { id: 'raf-fairford', name: 'RAF Fairford', branch: 'Air Force', country: 'United Kingdom', coordinates: '51.6822, -1.7900', locationDetails: 'Gloucestershire' },
  { id: 'raf-lakenheath', name: 'RAF Lakenheath', branch: 'Air Force', country: 'United Kingdom', coordinates: '52.4094, 0.5608', locationDetails: 'Suffolk' },
  { id: 'raf-mildenhall', name: 'RAF Mildenhall', branch: 'Air Force', country: 'United Kingdom', coordinates: '52.3611, 0.4811', locationDetails: 'Suffolk' },
  { id: 'raf-molesworth', name: 'RAF Molesworth', branch: 'Air Force', country: 'United Kingdom', coordinates: '52.3802, -0.4283', locationDetails: 'Cambridgeshire' },
  { id: 'ascension-aaf', name: 'Ascension Island Auxiliary Airfield', branch: 'Joint', country: 'British Overseas Territory', coordinates: '-7.9697, -14.3936' },
  { id: 'nsf-diego-garcia', name: 'Naval Support Facility Diego Garcia', branch: 'Navy', country: 'British Overseas Territory', coordinates: '-7.3133, 72.4111' },
];

export function getOverseasBases(locale: Locale): OverseasBase[] {
  return overseasBases;
}
