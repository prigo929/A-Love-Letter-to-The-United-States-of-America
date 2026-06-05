import type { Locale } from "@/lib/i18n/config";
import type { ServiceBranch } from "./domestic-bases-data";

export interface OverseasBase {
  id: string;
  name: string;
  branch: ServiceBranch;
  country: string;
  coordinates: string; // format: "latitude, longitude"
  locationDetails?: string;
  description?: string;
}

export const overseasBases: OverseasBase[] = [
  // ==========================================
  // AUSTRALIA
  // ==========================================
  { id: 'adscs-kojarena', name: 'Australian Defence Satellite Communications Station', branch: 'Joint', country: 'Australia', coordinates: '-28.6946, 114.8427', locationDetails: 'Kojarena', description: 'A highly classified node in the ECHELON global surveillance network, providing critical signals intelligence (SIGINT) across the Indo-Pacific.' },
  { id: 'ncs-harold-holt', name: 'Naval Communication Station Harold E. Holt', branch: 'Navy', country: 'Australia', coordinates: '-21.8159, 114.1651', locationDetails: 'Exmouth', description: 'Provides extremely low frequency (ELF) radio transmissions, enabling secure communication with submerged U.S. and allied nuclear submarines.' },
  { id: 'pine-gap', name: 'Pine Gap', branch: 'Joint', country: 'Australia', coordinates: '-23.7989, 133.7375', locationDetails: 'Alice Springs', description: 'A remote and secretive satellite tracking facility jointly run by the CIA, NSA, and Australian intelligence, essential for global missile warning.' },
  { id: 'robertson-barracks', name: 'Robertson Barracks (MRF-D)', branch: 'Marine Corps', country: 'Australia', coordinates: '-12.4634, 130.9856', locationDetails: 'Darwin', description: 'Hosts the Marine Rotational Force-Darwin, projecting expeditionary amphibious power deep into the southern Indo-Pacific.' },

  // ==========================================
  // BAHAMAS & BAHRAIN
  // ==========================================
  { id: 'autec-bahamas', name: 'Atlantic Undersea Test and Evaluation Center (AUTEC)', branch: 'Navy', country: 'Bahamas', coordinates: '24.7118, -77.7788', description: 'The Navy’s premier underwater testing facility, evaluating advanced torpedoes, acoustics, and anti-submarine warfare tactics in the "Tongue of the Ocean."' },
  { id: 'nsa-bahrain', name: 'Naval Support Activity Bahrain', branch: 'Navy', country: 'Bahrain', coordinates: '26.2084, 50.6074', locationDetails: 'HQ Fifth Fleet', description: 'The command anchor for the U.S. Fifth Fleet, securing the Persian Gulf, monitoring Iranian naval activity, and protecting vital energy chokepoints.' },

  // ==========================================
  // BELGIUM & BULGARIA
  // ==========================================
  { id: 'chievres-ab', name: 'Chièvres Air Base', branch: 'Joint', country: 'Belgium', coordinates: '50.5758, 3.8310', locationDetails: 'NATO Airbase', description: 'Crucial logistics and aviation hub providing direct, rapid support to the Supreme Headquarters Allied Powers Europe (SHAPE).' },
  { id: 'novo-selo-range', name: 'Novo Selo Range', branch: 'Joint', country: 'Bulgaria', coordinates: '42.7423, 26.6027', locationDetails: 'Sliven Province', description: 'A highly modernized forward training area for U.S. armored brigades deployed to reinforce NATO’s eastern flank.' },
  { id: 'graf-ignatievo-ab', name: 'Graf Ignatievo Air Base', branch: 'Joint', country: 'Bulgaria', coordinates: '42.2906, 24.7131', locationDetails: 'Plovdiv Province', description: 'A vital fighter staging base securing the Black Sea region and supporting NATO air policing missions.' },

  // ==========================================
  // CAMEROON & CANADA & CUBA & DJIBOUTI
  // ==========================================
  { id: 'cl-garoua', name: 'Contingency Location Garoua', branch: 'Army', country: 'Cameroon', coordinates: '9.3364, 13.3765', description: 'A forward drone operating base conducting vital intelligence, surveillance, and counter-terrorism missions across West and Central Africa.' },
  { id: 'cfb-north-bay', name: 'CFB North Bay', branch: 'Joint', country: 'Canada', coordinates: '46.3636, -79.4228', description: 'Essential subterranean NORAD aerospace control center, monitoring northern approaches for strategic bomber or missile threats.' },
  { id: 'ns-guantanamo', name: 'Guantanamo Bay Naval Base', branch: 'Navy', country: 'Cuba', coordinates: '19.9060, -75.2071', description: 'The oldest overseas U.S. naval base, providing persistent, untouchable maritime access to the Caribbean and the Windward Passage.' },
  { id: 'camp-lemonnier', name: 'Camp Lemonnier', branch: 'Joint', country: 'Djibouti', coordinates: '11.5472, 43.1594', description: 'The primary base of operations for U.S. Africa Command in the Horn of Africa, projecting maritime security into the Red Sea and Gulf of Aden.' },

  // ==========================================
  // GERMANY
  // ==========================================
  { id: 'geilenkirchen-nato', name: 'NATO Air Base Geilenkirchen', branch: 'Air Force', country: 'Germany', coordinates: '50.9608, 6.0422', description: 'Home to NATO’s Airborne Early Warning and Control Force, operating the legendary E-3A AWACS surveillance fleet.' },
  { id: 'buchel-ab', name: 'Büchel Air Base', branch: 'Air Force', country: 'Germany', coordinates: '50.1738, 7.0594', description: 'A strategic NATO nuclear sharing site where U.S. tactical nuclear weapons are securely stored for potential deployment by allied aircraft.' },
  { id: 'grafenwohr-training', name: 'Grafenwöhr Training Area', branch: 'Army', country: 'Germany', coordinates: '49.7156, 11.9016', description: 'The U.S. Army’s largest training area in Europe, facilitating massive live-fire armor, artillery, and combined-arms exercises.' },
  { id: 'landstuhl-rmc', name: 'Landstuhl Regional Medical Center', branch: 'Army', country: 'Germany', coordinates: '49.4002, 7.5540', description: 'The largest American military hospital outside the United States, providing world-class trauma care for forces wounded in CENTCOM and AFRICOM.' },
  { id: 'patch-barracks', name: 'Patch Barracks', branch: 'Army', country: 'Germany', coordinates: '48.7369, 9.0805', locationDetails: 'Stuttgart', description: 'The nerve center for United States European Command (EUCOM), coordinating all military operations and deterrence across the continent.' },
  { id: 'ramstein-ab', name: 'Ramstein Air Base', branch: 'Air Force', country: 'Germany', coordinates: '49.4369, 7.6003', description: 'The central nervous system for U.S. air operations in Europe, managing massive strategic airlift and theater logistics.' },
  { id: 'spangdahlem-ab', name: 'Spangdahlem Air Base', branch: 'Air Force', country: 'Germany', coordinates: '49.9727, 6.6925', description: 'Forward-deployed fighter wing providing immediate tactical airpower and suppression of enemy air defenses (SEAD) for EUCOM.' },

  // ==========================================
  // GREECE, GREENLAND, HONDURAS, ISRAEL
  // ==========================================
  { id: 'crete-naval-base', name: 'Crete Naval Base', branch: 'Navy', country: 'Greece', coordinates: '35.4950, 24.1486', locationDetails: 'Souda Bay', description: 'A vital Mediterranean deep-water port capable of accommodating Nimitz and Ford-class nuclear-powered aircraft carriers.' },
  { id: 'pituffik-sfb', name: 'Pituffik Space Base', branch: 'Space Force', country: 'Greenland', coordinates: '76.5312, -68.7031', description: 'A critical High North early warning radar node, tracking polar ballistic missile trajectories and orbital satellite assets.' },
  { id: 'soto-cano-ab', name: 'Soto Cano Air Base', branch: 'Joint', country: 'Honduras', coordinates: '14.3822, -87.6225', locationDetails: 'JTF Bravo', description: 'The operational hub for Joint Task Force Bravo, managing rapid disaster response and counter-narcotics missions in Central America.' },
  { id: 'site-512', name: 'Site 512', branch: 'Army', country: 'Israel', coordinates: '31.1340, 34.7877', description: 'A forward-deployed U.S. radar and air defense monitoring facility providing early warning against ballistic missile threats in the Middle East.' },

  // ==========================================
  // ITALY
  // ==========================================
  { id: 'aviano-ab', name: 'Aviano Air Base', branch: 'Air Force', country: 'Italy', coordinates: '46.0319, 12.5963', description: 'A vital southern European launchpad for U.S. fighter squadrons covering the Mediterranean, North Africa, and the Balkans.' },
  { id: 'caserma-ederle', name: 'Caserma Ederle & Camp Darby', branch: 'Army', country: 'Italy', coordinates: '45.5413, 11.5794', description: 'Headquarters of the 173rd Airborne Brigade, providing rapid-response paratrooper deployment capabilities into Europe and Africa.' },
  { id: 'nsa-naples', name: 'Naval Support Activity Naples', branch: 'Navy', country: 'Italy', coordinates: '40.8841, 14.2886', locationDetails: 'HQ Sixth Fleet', description: 'Headquarters of the U.S. Sixth Fleet, commanding maritime power projection across the Mediterranean and Eastern Atlantic.' },
  { id: 'sigonella-nas', name: 'Sigonella Naval Air Station', branch: 'Navy', country: 'Italy', coordinates: '37.4019, 14.9222', description: 'The "Hub of the Med," providing indispensable logistical, maritime patrol, and unmanned drone surveillance reach into Africa and the Middle East.' },

  // ==========================================
  // IRAQ & JAPAN
  // ==========================================
  { id: 'harir-ab', name: 'Harir Air Base', branch: 'Joint', country: 'Iraq', coordinates: '36.5297, 44.3411', locationDetails: 'Erbil Governorate', description: 'A secluded, fortified staging base in Iraqi Kurdistan supporting special operations and regional intelligence gathering.' },
  { id: 'kadena-ab', name: 'Kadena Air Base', branch: 'Air Force', country: 'Japan', coordinates: '26.3555, 127.7674', locationDetails: 'Okinawa', description: 'The "Keystone of the Pacific," housing the largest combat air wing in the USAF and projecting immediate air superiority over the East China Sea.' },
  { id: 'mcb-camp-butler', name: 'MCB Camp Smedley D. Butler', branch: 'Marine Corps', country: 'Japan', coordinates: '26.3055, 127.7816', locationDetails: 'Okinawa', description: 'The administrative core for Marine forces in Okinawa, positioning amphibious rapid-response elements directly within the first island chain.' },
  { id: 'cfa-yokosuka', name: 'Fleet Activities Yokosuka', branch: 'Navy', country: 'Japan', coordinates: '35.2861, 139.6666', description: 'The preeminent forward-deployed naval base in the world, homeport to the U.S. Seventh Fleet’s nuclear aircraft carrier strike group.' },
  { id: 'cfa-sasebo', name: 'Fleet Activities Sasebo', branch: 'Navy', country: 'Japan', coordinates: '33.1613, 129.7150', description: 'Crucial logistical and amphibious staging base positioned near the East China Sea and the Korean Peninsula.' },
  { id: 'yokota-ab', name: 'Yokota Air Base', branch: 'Air Force', country: 'Japan', coordinates: '35.7486, 139.3486', locationDetails: 'Tokyo', description: 'Headquarters of U.S. Forces Japan, coordinating bilateral defense treaties and serving as the primary airlift hub in the Western Pacific.' },
  { id: 'misawa-ab', name: 'Misawa Air Base', branch: 'Air Force', country: 'Japan', coordinates: '40.7022, 141.3683', locationDetails: 'Aomori', description: 'A joint, bilateral fighter base conducting critical intelligence gathering and suppression of enemy air defenses (SEAD) near the Sea of Japan.' },

  // ==========================================
  // JORDAN, KENYA, KOSOVO, KUWAIT
  // ==========================================
  { id: 'muwaffaq-salti-ab', name: 'Muwaffaq Salti Air Base', branch: 'Air Force', country: 'Jordan', coordinates: '31.8341, 36.7825', locationDetails: 'Azraq', description: 'A central operational hub for U.S. drone and fighter rotations conducting counter-terrorism and strike missions across the Levant.' },
  { id: 'camp-simba', name: 'Camp Simba', branch: 'Navy', country: 'Kenya', coordinates: '-2.2741, 40.9069', description: 'A remote, secure forward operating location supporting maritime security and drone surveillance along the East African coast.' },
  { id: 'camp-bondsteel', name: 'Camp Bondsteel', branch: 'Army', country: 'Kosovo', coordinates: '42.3661, 21.2461', locationDetails: 'KFOR Base', description: 'The main command and logistics anchor for KFOR peacekeeping operations, maintaining stability in the volatile Balkan region.' },
  { id: 'camp-arifjan', name: 'Camp Arifjan', branch: 'Army', country: 'Kuwait', coordinates: '28.8752, 48.1583', description: 'A massive logistics and command fortress enabling the rapid buildup and sustainment of heavy armored forces in the Persian Gulf.' },
  { id: 'ali-al-salem-ab', name: 'Ali Al Salem Air Base', branch: 'Air Force', country: 'Kuwait', coordinates: '29.3463, 47.5211', description: 'The theater "gateway," serving as the primary airlift node for personnel and cargo entering the CENTCOM area of responsibility.' },

  // ==========================================
  // NETHERLANDS, POLAND, PORTUGAL, QATAR
  // ==========================================
  { id: 'volkel-ab', name: 'Volkel Air Base', branch: 'Air Force', country: 'Netherlands', coordinates: '51.6575, 5.7061', locationDetails: '703rd MUNSS', description: 'A key NATO nuclear sharing facility maintaining tactical deterrent capabilities in Western Europe.' },
  { id: 'camp-kosciuszko', name: 'Camp Kościuszko', branch: 'Army', country: 'Poland', coordinates: '52.4063, 16.9251', locationDetails: 'HQ V Corps', description: 'The forward headquarters of the U.S. V Corps, commanding Army operations and serving as the linchpin for reinforcing NATO’s eastern flank.' },
  { id: 'redzikowo-md', name: 'Redzikowo Missile Defense Complex', branch: 'Joint', country: 'Poland', coordinates: '54.4827, 17.1122', locationDetails: 'Aegis Ashore', description: 'An Aegis Ashore ballistic missile defense site, protecting Europe and the U.S. from intermediate-range ballistic missile threats.' },
  { id: 'lajes-ab', name: 'Lajes Air Base', branch: 'Air Force', country: 'Portugal', coordinates: '38.7616, -27.0908', locationDetails: 'Azores', description: 'A strategic mid-Atlantic refueling, logistics, and communications bridge connecting North America to Europe and the Middle East.' },
  { id: 'al-udeid-ab', name: 'Al Udeid Air Base', branch: 'Air Force', country: 'Qatar', coordinates: '25.1175, 51.3147', description: 'The command epicenter for U.S. air operations in the Middle East, hosting the Combined Air Operations Center (CAOC) and bomber rotations.' },

  // ==========================================
  // ROMANIA & SAUDI ARABIA
  // ==========================================
  { id: 'mk-air-base', name: 'Mihail Kogălniceanu Air Base', branch: 'Joint', country: 'Romania', coordinates: '44.3622, 28.4883', locationDetails: 'USAG Black Sea', description: 'A rapidly expanding Black Sea staging node, vital for NATO power projection, air policing, and countering regional aggression.' },
  { id: 'deveselu-base', name: 'Deveselu Military Base', branch: 'Navy', country: 'Romania', coordinates: '44.0622, 24.3975', locationDetails: 'NSF Deveselu', description: 'A foundational pillar of the European Phased Adaptive Approach (EPAA), operating the Aegis Ashore missile defense system.' },
  { id: 'prince-sultan-ab', name: 'Prince Sultan Air Base', branch: 'Air Force', country: 'Saudi Arabia', coordinates: '24.0558, 47.5802', description: 'A heavily fortified desert air base supporting U.S. fighter rotations, Patriot missile defense, and regional deterrence in the Gulf.' },

  // ==========================================
  // SINGAPORE, SOMALIA, SOUTH KOREA
  // ==========================================
  { id: 'changi-naval', name: 'Changi Naval Base', branch: 'Navy', country: 'Singapore', coordinates: '1.3094, 104.0208', description: 'A vital Southeast Asian logistics access point, engineered specifically to accommodate the deep draft of Nimitz-class nuclear aircraft carriers.' },
  { id: 'baledogle-af', name: 'Baledogle Airfield', branch: 'Joint', country: 'Somalia', coordinates: '2.5711, 44.8219', description: 'A fortified expeditionary runway supporting special operations and drone strikes against extremist networks in East Africa.' },
  { id: 'osan-ab', name: 'Osan Air Base', branch: 'Air Force', country: 'South Korea', coordinates: '37.0897, 127.0275', description: 'Headquarters of the Seventh Air Force, stationed just miles from the DMZ to provide immediate, overwhelming airpower on the Korean peninsula.' },
  { id: 'kunsan-ab', name: 'Kunsan Air Base', branch: 'Air Force', country: 'South Korea', coordinates: '35.9036, 126.6158', description: 'A critical frontline fighter base, home to the "Wolf Pack" (8th Fighter Wing) maintaining high-alert deterrence against North Korea.' },
  { id: 'camp-mujuk', name: 'Camp Mujuk', branch: 'Marine Corps', country: 'South Korea', coordinates: '35.9405, 129.4180', description: 'The only Marine Corps installation in South Korea, providing expeditionary staging and joint amphibious training capabilities.' },

  // ==========================================
  // SPAIN, TURKEY, UAE, UK & TERRITORIES
  // ==========================================
  { id: 'ns-rota', name: 'Naval Station Rota', branch: 'Navy', country: 'Spain', coordinates: '36.6455, -6.3497', description: 'The gateway to the Mediterranean, homeporting forward-deployed Arleigh Burke-class destroyers crucial for NATO ballistic missile defense.' },
  { id: 'moron-ab', name: 'Morón Air Base', branch: 'Air Force', country: 'Spain', coordinates: '37.1705, -5.6158', description: 'A massive transit and staging airfield for Air Mobility Command, and home to rapid-response Marine crisis elements for Africa.' },
  { id: 'incirlik-ab', name: 'Incirlik Air Base', branch: 'Air Force', country: 'Turkey', coordinates: '37.0019, 35.4258', description: 'A highly strategic NATO airbase in southern Turkey, enabling rapid tactical air access to the Middle East and Eastern Mediterranean.' },
  { id: 'kurecik-radar', name: 'Kürecik Radar Station', branch: 'Army', country: 'Turkey', coordinates: '38.4116, 37.7663', description: 'An early-warning X-band radar facility acting as the "eyes" of NATO’s ballistic missile defense architecture in the Middle East.' },
  { id: 'al-dhafra-ab', name: 'Al Dhafra Air Base', branch: 'Air Force', country: 'United Arab Emirates', coordinates: '24.2483, 54.5477', description: 'A premier Persian Gulf air combat and ISR hub, hosting fifth-generation fighters, U-2s, and Global Hawk surveillance aircraft.' },
  { id: 'raf-lakenheath', name: 'RAF Lakenheath', branch: 'Air Force', country: 'United Kingdom', coordinates: '52.4094, 0.5608', locationDetails: 'Suffolk', description: 'The largest U.S. Air Force-operated base in England, projecting fifth-generation F-35 fighter combat power across Northern Europe.' },
  { id: 'raf-mildenhall', name: 'RAF Mildenhall', branch: 'Air Force', country: 'United Kingdom', coordinates: '52.3611, 0.4811', locationDetails: 'Suffolk', description: 'The essential aerial refueling bridge for U.S. aircraft transiting the Atlantic into Europe, Africa, and the Middle East.' },
  { id: 'nsf-diego-garcia', name: 'Naval Support Facility Diego Garcia', branch: 'Navy', country: 'British Overseas Territory', coordinates: '-7.3133, 72.4111', description: 'A highly classified, unsinkable logistics and bomber footprint in the middle of the Indian Ocean, providing untouchable strategic reach.' },
];

export function getOverseasBases(locale: Locale): OverseasBase[] {
  return overseasBases;
}
