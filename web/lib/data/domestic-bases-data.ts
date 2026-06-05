import type { Locale } from "@/lib/i18n/config";

export type ServiceBranch = 'Joint' | 'Army' | 'Marine Corps' | 'Navy' | 'Air Force' | 'Space Force';

export interface DomesticBase {
  id: string;
  name: string;
  branch: ServiceBranch;
  state: string;
  coordinates: string;
  locationDetails?: string;
  description?: string;
}

export const domesticBases: DomesticBase[] = [
  // ==========================================
  // JOINT BASES
  // ==========================================
  { id: 'pentagon', name: 'The Pentagon', branch: 'Joint', state: 'Virginia', coordinates: '38.8719, -77.0563', locationDetails: 'Arlington County', description: 'Headquarters of the United States Department of Defense and the central command node for the U.S. Armed Forces.' },
  { id: 'jb-elmendorf-richardson', name: 'Joint Base Elmendorf–Richardson', branch: 'Joint', state: 'Alaska', coordinates: '61.2514, -149.8058', locationDetails: 'Anchorage', description: 'Premier staging hub for Pacific Air Forces and Army airborne units, offering rapid deployment across the Indo-Pacific and Arctic.' },
  { id: 'jb-pearl-harbor-hickam', name: 'Joint Base Pearl Harbor–Hickam', branch: 'Joint', state: 'Hawaii', coordinates: '21.3382, -157.9468', locationDetails: 'Honolulu', description: 'Historic deep-water naval base and aviation hub serving as the central nervous system for Pacific Fleet and Pacific Air Forces.' },
  { id: 'jb-mcguire-dix-lakehurst', name: 'Joint Base McGuire–Dix–Lakehurst', branch: 'Joint', state: 'New Jersey', coordinates: '40.0347, -74.5888', locationDetails: 'Trenton', description: 'The DoD’s only tri-service joint base, specializing in global mobility, rapid deployment, and advanced aviation engineering.' },
  { id: 'jb-charleston', name: 'Joint Base Charleston', branch: 'Joint', state: 'South Carolina', coordinates: '32.8986, -80.0405', locationDetails: 'North Charleston', description: 'Massive logistics and airlift node responsible for sustaining global operations and moving heavy armor via sealift.' },
  { id: 'jb-san-antonio', name: 'Joint Base San Antonio', branch: 'Joint', state: 'Texas', coordinates: '29.4526, -98.4354', locationDetails: 'San Antonio', description: 'The largest joint base in the DoD, acting as the epicenter for military medical training and Air Force basic training.' },
  { id: 'jb-langley-eustis', name: 'Joint Base Langley-Eustis', branch: 'Joint', state: 'Virginia', coordinates: '37.0828, -76.3605', locationDetails: 'Newport News', description: 'Home to Air Combat Command and Army transportation and aviation logistics training.' },
  { id: 'joint-region-marianas', name: 'Joint Region Marianas', branch: 'Joint', state: 'Guam', coordinates: '13.5840, 144.9290', description: 'Critical sovereign forward-staging area in the Pacific, combining naval port facilities, Marine bases, and heavy bomber ramps.' },
  { id: 'jb-myer-henderson-hall', name: 'Joint Base Myer-Henderson Hall', branch: 'Joint', state: 'Virginia', coordinates: '38.8812, -77.0789', locationDetails: 'Arlington County', description: 'Provides base operations support for the National Capital Region and Arlington National Cemetery.' },
  { id: 'jeb-little-creek-fort-story', name: 'Joint Expeditionary Base Little Creek–Fort Story', branch: 'Joint', state: 'Virginia', coordinates: '36.9167, -76.1517', locationDetails: 'Virginia Beach', description: 'The major operating base for Navy expeditionary and amphibious forces on the East Coast.' },
  { id: 'jb-lewis-mcchord', name: 'Joint Base Lewis-McChord', branch: 'Joint', state: 'Washington', coordinates: '47.1120, -122.5695', locationDetails: 'Tacoma', description: 'The premier military installation on the West Coast, enabling rapid Army and Air Force power projection into the Pacific.' },
  { id: 'jb-anacostia-bolling', name: 'Joint Base Anacostia-Bolling', branch: 'Joint', state: 'Washington, D.C.', coordinates: '38.8416, -77.0163', description: 'Provides crucial administrative, intelligence, and ceremonial support functions directly to the capital.' },
  { id: 'jb-andrews', name: 'Joint Base Andrews', branch: 'Joint', state: 'Maryland', coordinates: '38.8108, -76.8670', description: 'Known as "America\'s Airfield," it is the home of Air Force One and the primary gateway for government leaders.' },
  { id: 'jftb-los-alamitos', name: 'Joint Forces Training Base Los Alamitos', branch: 'Joint', state: 'California', coordinates: '33.7915, -118.0528', description: 'Key National Guard and Reserve aviation training facility supporting disaster response in Southern California.' },

  // ==========================================
  // UNITED STATES ARMY
  // ==========================================
  { id: 'anniston-army-depot', name: 'Anniston Army Depot', branch: 'Army', state: 'Alabama', coordinates: '33.6401, -85.9554', description: 'The Army’s primary site for repairing, upgrading, and overhauling heavy tracked combat vehicles and artillery.' },
  { id: 'fort-rucker', name: 'Fort Novosel (Rucker)', branch: 'Army', state: 'Alabama', coordinates: '31.3323, -85.7145', description: 'The epicenter of United States Army Aviation, training all Army helicopter pilots.' },
  { id: 'fort-mcclellan', name: 'Fort McClellan', branch: 'Army', state: 'Alabama', coordinates: '33.7225, -85.7981', description: 'Premier training site utilized by the Alabama National Guard.' },
  { id: 'redstone-arsenal', name: 'Redstone Arsenal', branch: 'Army', state: 'Alabama', coordinates: '34.6852, -86.6433', description: 'A federal center of excellence for missile and aerospace testing, housing Army Materiel Command.' },
  { id: 'fort-greely', name: 'Fort Greely', branch: 'Army', state: 'Alaska', coordinates: '63.9537, -145.7275', description: 'Houses a critical component of the U.S. Ground-Based Midcourse Defense (GMD) anti-ballistic missile system.' },
  { id: 'fort-richardson', name: 'Fort Richardson', branch: 'Army', state: 'Alaska', coordinates: '61.2657, -149.6580', description: 'Home to U.S. Army Alaska, specializing in extreme cold-weather operations and Pacific deployments.' },
  { id: 'fort-wainwright', name: 'Fort Wainwright', branch: 'Army', state: 'Alaska', coordinates: '64.8239, -147.6180', description: 'Major mechanized and aviation installation focused on arctic combat readiness.' },
  { id: 'camp-navajo', name: 'Camp Navajo', branch: 'Army', state: 'Arizona', coordinates: '35.2166, -111.8315', description: 'National Guard base providing heavy maneuver training and secure munitions storage.' },
  { id: 'fort-huachuca', name: 'Fort Huachuca', branch: 'Army', state: 'Arizona', coordinates: '31.5592, -110.3501', description: 'Headquarters for the U.S. Army Intelligence Center and the Army Network Enterprise Technology Command.' },
  { id: 'yuma-proving-ground', name: 'Yuma Proving Ground', branch: 'Army', state: 'Arizona', coordinates: '32.8427, -114.3942', description: 'One of the largest military installations in the world, dedicated to testing artillery, vehicles, and munitions.' },
  { id: 'fort-irwin', name: 'Fort Irwin (NTC)', branch: 'Army', state: 'California', coordinates: '35.2625, -116.6853', description: 'Home of the National Training Center, providing unparalleled force-on-force desert combat training for brigade combat teams.' },
  { id: 'mot-concord', name: 'Military Ocean Terminal Concord', branch: 'Army', state: 'California', coordinates: '38.0560, -122.0238', description: 'The DoD’s primary West Coast ammunition seaport, critical for Pacific theater resupply.' },
  { id: 'presidio-of-monterey', name: 'Presidio of Monterey', branch: 'Army', state: 'California', coordinates: '36.6063, -121.9161', description: 'Home to the Defense Language Institute, training linguists for all branches of the armed forces and intelligence community.' },
  { id: 'sierra-army-depot', name: 'Sierra Army Depot', branch: 'Army', state: 'California', coordinates: '40.1691, -120.1415', description: 'An expeditionary logistics center for rapid deployment of military equipment and long-term storage.' },
  { id: 'fort-carson', name: 'Fort Carson', branch: 'Army', state: 'Colorado', coordinates: '38.7369, -104.7925', description: 'The "Mountain Post," serving as home to mechanized, infantry, and Special Forces units.' },
  { id: 'fort-benning', name: 'Fort Moore (Benning)', branch: 'Army', state: 'Georgia', coordinates: '32.3653, -84.8776', description: 'The Maneuver Center of Excellence, training the Army’s infantry and armor forces.' },
  { id: 'fort-gordon', name: 'Fort Eisenhower (Gordon)', branch: 'Army', state: 'Georgia', coordinates: '33.4158, -82.1388', description: 'The nerve center for U.S. Army Cyber Command and the Army Cyber Center of Excellence.' },
  { id: 'fort-stewart', name: 'Fort Stewart', branch: 'Army', state: 'Georgia', coordinates: '31.8687, -81.6059', description: 'The largest Army installation east of the Mississippi, home to the 3rd Infantry Division.' },
  { id: 'schofield-barracks', name: 'Schofield Barracks', branch: 'Army', state: 'Hawaii', coordinates: '21.4930, -158.0620', description: 'Home to the 25th Infantry Division and the Army’s primary staging base for operations in the Pacific.' },
  { id: 'fort-leavenworth', name: 'Fort Leavenworth', branch: 'Army', state: 'Kansas', coordinates: '39.3496, -94.9213', description: 'The intellectual center of the Army, home to the Command and General Staff College.' },
  { id: 'fort-riley', name: 'Fort Riley', branch: 'Army', state: 'Kansas', coordinates: '39.0722, -96.7905', description: 'Home of the 1st Infantry Division ("The Big Red One"), providing heavy mechanized forces.' },
  { id: 'fort-campbell-ky', name: 'Fort Campbell', branch: 'Army', state: 'Kentucky', coordinates: '36.6508, -87.4641', description: 'Home of the 101st Airborne Division (Air Assault) and the 160th Special Operations Aviation Regiment.' },
  { id: 'fort-knox', name: 'Fort Knox', branch: 'Army', state: 'Kentucky', coordinates: '37.8860, -85.9620', description: 'Home to U.S. Army Human Resources Command and the legendary United States Bullion Depository.' },
  { id: 'fort-polk', name: 'Fort Johnson (Polk)', branch: 'Army', state: 'Louisiana', coordinates: '31.0507, -93.1979', description: 'Home of the Joint Readiness Training Center (JRTC), preparing light infantry and airborne forces for deployment.' },
  { id: 'aberdeen-proving-ground', name: 'Aberdeen Proving Ground', branch: 'Army', state: 'Maryland', coordinates: '39.4674, -76.1363', description: 'The Army’s oldest active proving ground, serving as a hub for weapons testing and chemical defense research.' },
  { id: 'fort-meade', name: 'Fort Meade', branch: 'Army', state: 'Maryland', coordinates: '39.1091, -76.7410', description: 'The nation’s preeminent center for information warfare, housing the NSA and U.S. Cyber Command.' },
  { id: 'fort-leonard-wood', name: 'Fort Leonard Wood', branch: 'Army', state: 'Missouri', coordinates: '37.7410, -92.1287', description: 'Premier training center for combat engineers, chemical, biological, radiological, and nuclear (CBRN) specialists, and military police.' },
  { id: 'fort-bliss-nm', name: 'Fort Bliss', branch: 'Army', state: 'New Mexico', coordinates: '31.8152, -106.4026', description: 'Massive maneuver area hosting the 1st Armored Division and extensive air defense artillery training.' },
  { id: 'white-sands-missile-range', name: 'White Sands Missile Range', branch: 'Army', state: 'New Mexico', coordinates: '32.3813, -106.4786', description: 'The DoD’s largest open-air test range, evaluating advanced weapons systems, lasers, and rocketry.' },
  { id: 'fort-drum', name: 'Fort Drum', branch: 'Army', state: 'New York', coordinates: '44.0538, -75.7667', description: 'Home of the 10th Mountain Division, providing rapidly deployable light infantry forces worldwide.' },
  { id: 'west-point', name: 'United States Military Academy (West Point)', branch: 'Army', state: 'New York', coordinates: '41.3918, -73.9554', description: 'The historic and elite officer-producing academy for the United States Army.' },
  { id: 'fort-bragg', name: 'Fort Liberty', branch: 'Army', state: 'North Carolina', coordinates: '35.1415, -79.0060', description: 'The epicenter of U.S. airborne and special operations, maintaining the immediate global response force.' },
  { id: 'fort-sill', name: 'Fort Sill', branch: 'Army', state: 'Oklahoma', coordinates: '34.6644, -98.4316', description: 'The Field Artillery School and center for advanced fires and air defense training.' },
  { id: 'fort-hood', name: 'Fort Cavazos (Hood)', branch: 'Army', state: 'Texas', coordinates: '31.1340, -97.7797', description: 'One of the largest armored outposts in the world, home to the massive III Armored Corps.' },
  { id: 'fort-belvoir', name: 'Fort Belvoir', branch: 'Army', state: 'Virginia', coordinates: '38.7188, -77.1542', description: 'A strategic logistics and intelligence hub housing numerous vital defense agencies.' },

  // ==========================================
  // UNITED STATES MARINE CORPS
  // ==========================================
  { id: 'mcas-yuma', name: 'MCAS Yuma', branch: 'Marine Corps', state: 'Arizona', coordinates: '32.6565, -114.6059', description: 'The busiest air station in the Marine Corps, supporting advanced aviation weapons and tactics training.' },
  { id: 'mcb-camp-pendleton', name: 'MCB Camp Pendleton', branch: 'Marine Corps', state: 'California', coordinates: '33.3275, -117.3090', description: 'The Marine Corps’ premier amphibious training base on the West Coast, home to the I Marine Expeditionary Force.' },
  { id: 'mcas-miramar', name: 'MCAS Miramar', branch: 'Marine Corps', state: 'California', coordinates: '32.8688, -117.1436', description: 'Historic aviation facility and current home to the 3rd Marine Aircraft Wing.' },
  { id: 'mcrd-san-diego', name: 'MCRD San Diego', branch: 'Marine Corps', state: 'California', coordinates: '32.7410, -117.1944', description: 'The crucible for enlisted Marine recruits from the western half of the United States.' },
  { id: 'mcagcc-29-palms', name: 'MCAGCC 29 Palms', branch: 'Marine Corps', state: 'California', coordinates: '34.2288, -116.0583', description: 'The largest Marine Corps base, conducting massive, live-fire combined-arms combat exercises.' },
  { id: 'mcb-camp-lejeune', name: 'MCB Camp Lejeune', branch: 'Marine Corps', state: 'North Carolina', coordinates: '34.6136, -77.3400', description: 'The East Coast epicenter for Marine expeditionary power, home to the II Marine Expeditionary Force.' },
  { id: 'mcrd-parris-island', name: 'MCRD Parris Island', branch: 'Marine Corps', state: 'South Carolina', coordinates: '32.3275, -80.6865', description: 'The legendary eastern training ground where civilians are forged into United States Marines.' },
  { id: 'mcb-quantico', name: 'MCB Quantico', branch: 'Marine Corps', state: 'Virginia', coordinates: '38.5147, -77.3117', description: 'The "Crossroads of the Marine Corps," home to officer training, FBI Academy, and Marine Corps Combat Development Command.' },

  // ==========================================
  // UNITED STATES NAVY
  // ==========================================
  { id: 'naws-china-lake', name: 'Naval Air Weapons Station China Lake', branch: 'Navy', state: 'California', coordinates: '35.6880, -117.6583', description: 'The Navy’s premier installation for research, testing, and evaluation of advanced aviation weapons systems.' },
  { id: 'nb-coronado', name: 'Naval Base Coronado', branch: 'Navy', state: 'California', coordinates: '32.6946, -117.1818', description: 'Consortium of installations housing aircraft carriers, SEAL teams, and Pacific Fleet naval aviation.' },
  { id: 'nb-san-diego', name: 'Naval Base San Diego', branch: 'Navy', state: 'California', coordinates: '32.6806, -117.1260', description: 'The principal homeport of the Pacific Fleet, accommodating over 50 combat ships.' },
  { id: 'nsb-new-london', name: 'Naval Submarine Base New London', branch: 'Navy', state: 'Connecticut', coordinates: '41.3967, -72.0883', description: 'The "Home of the Submarine Force," serving as the primary East Coast base for fast-attack nuclear submarines.' },
  { id: 'nas-jacksonville', name: 'Naval Air Station Jacksonville', branch: 'Navy', state: 'Florida', coordinates: '30.2335, -81.6807', description: 'A massive aviation hub focused on anti-submarine warfare and maritime patrol (P-8 Poseidon).' },
  { id: 'nas-pensacola', name: 'Naval Air Station Pensacola', branch: 'Navy', state: 'Florida', coordinates: '30.3541, -87.3142', description: 'The "Cradle of Naval Aviation" and home base for the legendary Blue Angels flight demonstration squadron.' },
  { id: 'nsb-kings-bay', name: 'Naval Submarine Base Kings Bay', branch: 'Navy', state: 'Georgia', coordinates: '30.7972, -81.5428', description: 'The East Coast home for the Navy’s Ohio-class nuclear-powered ballistic missile submarines (SSBNs).' },
  { id: 'portsmouth-naval-shipyard', name: 'Portsmouth Naval Shipyard', branch: 'Navy', state: 'Maine', coordinates: '43.0805, -70.7369', description: 'One of the nation’s oldest shipyards, currently dedicated to overhauling and refueling nuclear submarines.' },
  { id: 'us-naval-academy', name: 'United States Naval Academy', branch: 'Navy', state: 'Maryland', coordinates: '38.9818, -76.4831', description: 'The prestigious undergraduate college that educates and commissions officers for the Navy and Marine Corps.' },
  { id: 'nas-fallon', name: 'Naval Air Station Fallon', branch: 'Navy', state: 'Nevada', coordinates: '39.4166, -118.7001', description: 'Home to the Navy’s elite Naval Aviation Warfighting Development Center, including the TOPGUN school.' },
  { id: 'nb-kitsap', name: 'Naval Base Kitsap', branch: 'Navy', state: 'Washington', coordinates: '47.7475, -122.7303', description: 'Complex hosting the Pacific Fleet’s ballistic missile submarines and a massive shipyard facility.' },
  { id: 'navstation-norfolk', name: 'Naval Station Norfolk', branch: 'Navy', state: 'Virginia', coordinates: '36.9467, -76.3133', description: 'The largest naval station in the world, serving as the power projection hub for the Atlantic Fleet.' },
  { id: 'nas-oceana', name: 'Naval Air Station Oceana', branch: 'Navy', state: 'Virginia', coordinates: '36.8206, -76.0333', description: 'The East Coast master jet base, housing nearly all Atlantic Fleet strike fighter squadrons.' },

  // ==========================================
  // UNITED STATES AIR FORCE
  // ==========================================
  { id: 'eielson-afb', name: 'Eielson Air Force Base', branch: 'Air Force', state: 'Alaska', coordinates: '64.6657, -147.1015', description: 'Strategic Arctic outpost and home to advanced F-35 squadrons and RED FLAG-Alaska exercises.' },
  { id: 'davis-monthan-afb', name: 'Davis–Monthan Air Force Base', branch: 'Air Force', state: 'Arizona', coordinates: '32.1664, -110.8830', description: 'Hosts the famous "Boneyard" for aircraft storage and is a key hub for A-10 Thunderbolt II operations.' },
  { id: 'beale-afb', name: 'Beale Air Force Base', branch: 'Air Force', state: 'California', coordinates: '39.1432, -121.4365', description: 'The Air Force’s premier installation for high-altitude reconnaissance, including the U-2 Dragon Lady.' },
  { id: 'edwards-afb', name: 'Edwards Air Force Base', branch: 'Air Force', state: 'California', coordinates: '34.9240, -117.8912', description: 'The center of the aerospace testing universe, where historic flight milestones and stealth technologies are proven.' },
  { id: 'usafa', name: 'United States Air Force Academy', branch: 'Air Force', state: 'Colorado', coordinates: '39.0111, -104.8872', description: 'The rigorous military academy dedicated to developing the future officers of the Air Force and Space Force.' },
  { id: 'eglin-afb', name: 'Eglin Air Force Base', branch: 'Air Force', state: 'Florida', coordinates: '30.4831, -86.5254', description: 'The largest Air Force base in the world by area, serving as the focal point for air armament testing and development.' },
  { id: 'hurlburt-field', name: 'Hurlburt Field', branch: 'Air Force', state: 'Florida', coordinates: '30.4283, -86.6891', description: 'Headquarters of Air Force Special Operations Command (AFSOC), operating gunships and specialized mobility aircraft.' },
  { id: 'macdill-afb', name: 'MacDill Air Force Base', branch: 'Air Force', state: 'Florida', coordinates: '27.8488, -82.5204', description: 'Vital mobility base and the distinguished headquarters for both U.S. Central Command and U.S. Special Operations Command.' },
  { id: 'scott-afb', name: 'Scott Air Force Base', branch: 'Air Force', state: 'Illinois', coordinates: '38.5451, -89.8351', description: 'The global logistics nerve center, housing U.S. Transportation Command (TRANSCOM) and Air Mobility Command.' },
  { id: 'barksdale-afb', name: 'Barksdale Air Force Base', branch: 'Air Force', state: 'Louisiana', coordinates: '32.5028, -93.6625', description: 'Home of the legendary B-52 Stratofortress and headquarters for Air Force Global Strike Command.' },
  { id: 'whiteman-afb', name: 'Whiteman Air Force Base', branch: 'Air Force', state: 'Missouri', coordinates: '38.7275, -93.5475', description: 'The operational home of the B-2 Spirit stealth bomber fleet, maintaining persistent global strike capabilities.' },
  { id: 'nellis-afb', name: 'Nellis Air Force Base', branch: 'Air Force', state: 'Nevada', coordinates: '36.2361, -115.0343', description: '"Home of the Fighter Pilot," hosting the USAF Warfare Center, elite weapons schools, and RED FLAG exercises.' },
  { id: 'area-51', name: 'Area 51 (Groom Lake)', branch: 'Air Force', state: 'Nevada', coordinates: '37.2350, -115.8111', description: 'Highly classified remote detachment utilized for the flight testing of experimental and black-project stealth aircraft.' },
  { id: 'seymour-johnson-afb', name: 'Seymour Johnson Air Force Base', branch: 'Air Force', state: 'North Carolina', coordinates: '35.3394, -77.9605', description: 'A major combat-ready facility hosting the F-15E Strike Eagle fleet.' },
  { id: 'minot-afb', name: 'Minot Air Force Base', branch: 'Air Force', state: 'North Dakota', coordinates: '48.4158, -101.3586', description: 'A critical dual-wing nuclear deterrent base, fielding both B-52 bombers and Minuteman III ICBMs.' },
  { id: 'wright-patterson-afb', name: 'Wright-Patterson Air Force Base', branch: 'Air Force', state: 'Ohio', coordinates: '39.8261, -84.0483', description: 'The heavy-weight research and acquisition center for the USAF, home to Air Force Materiel Command.' },
  { id: 'tinker-afb', name: 'Tinker Air Force Base', branch: 'Air Force', state: 'Oklahoma', coordinates: '35.4147, -97.3888', description: 'Massive sustainment and logistics hub, and home to the Navy’s strategic E-6B Mercury command post aircraft.' },
  { id: 'ellsworth-afb', name: 'Ellsworth Air Force Base', branch: 'Air Force', state: 'South Dakota', coordinates: '44.1450, -103.1036', description: 'A premier long-range strike base hosting the B-1B Lancer bomber fleet.' },
  { id: 'dyess-afb', name: 'Dyess Air Force Base', branch: 'Air Force', state: 'Texas', coordinates: '32.4208, -99.8544', description: 'Significant Global Strike Command base, operating the B-1B Lancer and C-130J Super Hercules.' },
  { id: 'lackland-afb', name: 'Lackland Air Force Base', branch: 'Air Force', state: 'Texas', coordinates: '29.3833, -98.6180', description: 'The "Gateway to the Air Force," serving as the sole location for USAF enlisted basic military training.' },
  { id: 'francis-e-warren-afb', name: 'F.E. Warren Air Force Base', branch: 'Air Force', state: 'Wyoming', coordinates: '41.1527, -104.8683', description: 'One of the nation’s three strategic missile bases, controlling a vast network of Minuteman III ICBM silos.' },

  // ==========================================
  // UNITED STATES SPACE FORCE
  // ==========================================
  { id: 'clear-sfs', name: 'Clear Space Force Station', branch: 'Space Force', state: 'Alaska', coordinates: '64.2911, -149.1869', description: 'Critical early warning radar site monitoring northern approaches for ballistic missile threats.' },
  { id: 'vandenberg-sfb', name: 'Vandenberg Space Force Base', branch: 'Space Force', state: 'California', coordinates: '34.7313, -120.5341', description: 'The primary West Coast spaceport, conducting national security satellite launches and test flights of intercontinental ballistic missiles.' },
  { id: 'buckley-sfb', name: 'Buckley Space Force Base', branch: 'Space Force', state: 'Colorado', coordinates: '39.7016, -104.7516', description: 'Hosts critical overhead persistent infrared satellite monitoring systems for global missile warning.' },
  { id: 'cheyenne-mountain-sfs', name: 'Cheyenne Mountain Space Force Station', branch: 'Space Force', state: 'Colorado', coordinates: '38.7447, -104.8463', description: 'A legendary bunker complex providing hardened, subterranean aerospace defense command and warning capabilities.' },
  { id: 'peterson-sfb', name: 'Peterson Space Force Base', branch: 'Space Force', state: 'Colorado', coordinates: '38.8239, -104.6975', description: 'Headquarters of U.S. Space Command and vital hub for global space surveillance and warning operations.' },
  { id: 'schriever-sfb', name: 'Schriever Space Force Base', branch: 'Space Force', state: 'Colorado', coordinates: '38.8028, -104.5230', description: 'Nerve center for GPS, military communications satellites, and space defense tactical operations.' },
  { id: 'cape-canaveral-sfs', name: 'Cape Canaveral Space Force Station', branch: 'Space Force', state: 'Florida', coordinates: '28.4888, -80.5777', description: 'The premier East Coast launch site for military, scientific, and commercial spacecraft, supporting global orbital operations.' },
  { id: 'patrick-sfb', name: 'Patrick Space Force Base', branch: 'Space Force', state: 'Florida', coordinates: '28.2344, -80.6044', description: 'Headquarters of the Space Launch Delta 45, managing launch operations for Cape Canaveral.' },
  { id: 'kaena-point-sfs', name: 'Kaena Point Space Force Station', branch: 'Space Force', state: 'Hawaii', coordinates: '21.5647, -158.2800', description: 'Remote tracking station providing satellite telemetry, tracking, and commanding in the Pacific.' },
  { id: 'cape-cod-sfs', name: 'Cape Cod Space Force Station', branch: 'Space Force', state: 'Massachusetts', coordinates: '41.7522, -70.5383', description: 'Operates the PAVE PAWS early warning radar system covering the North Atlantic.' },
  { id: 'new-boston-sfs', name: 'New Boston Space Force Station', branch: 'Space Force', state: 'New Hampshire', coordinates: '42.9416, -71.6444', description: 'Vital satellite tracking and command station within the Satellite Control Network.' },
  { id: 'cavalier-sfs', name: 'Cavalier Space Force Station', branch: 'Space Force', state: 'North Dakota', coordinates: '48.7258, -97.6033', description: 'Operates the Perimeter Acquisition Radar Attack Characterization System (PARCS) for missile tracking and space surveillance.' },
];

export function getDomesticBases(locale: Locale): DomesticBase[] {
  return domesticBases;
}
