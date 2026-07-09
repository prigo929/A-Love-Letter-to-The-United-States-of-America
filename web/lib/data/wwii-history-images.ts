// ─── WWII History Images ──────────────────────────────────────────────────────
// Photographs woven into the /history/wwii deep-dive tabs. Keyed by
// `${topicId}::${section.heading.en}` so ThematicSubpageClient can drop the right
// figures into the right section across all five WWII topics.

import type { Locale } from "@/lib/i18n/config";
import type { StaticImageData } from "next/image";
import type { SectionFigure } from "@/components/history/ThematicSubpageClient";

// Overview
import ussArizona from "@/IMAGES/History/WWII/Explosion of the battleship USS Arizona at Pearl Harbor.jpg";
import fdrJointSession from "@/IMAGES/History/WWII/President Franklin Delano Roosevelt addresses a joint session of United States Congress on 8 December 1941.jpg";
import hitlerWar from "@/IMAGES/History/WWII/Hitler declares war against the United States on 11 December 1941.jpg";
import menEnlist from "@/IMAGES/History/WWII/Men waiting to enlist at recruiting headquarters in San Francisco, California December 1941.jpg";
import eisenhower101st from "@/IMAGES/History/WWII/General Eisenhower speaks with members of the 101st Airborne Division on the evening of 5 June 1944.jpg";
import omahaLcvp from "@/IMAGES/History/WWII/American Troops in an LCVP landing craft approaching Omaha Beach on D-Day, 6 June 1944.jpg";
import b17Stream from "@/IMAGES/History/WWII/Part of a 1,000-ship B-17 Flying Fortress bomber stream during World War II.jpg";
import b17Vapor from "@/IMAGES/History/WWII/Two B-17 Flying Fortresses' vapor trails light up the night sky over Eastern Europe.jpg";
import macarthurLeyte from "@/IMAGES/History/WWII/General Douglas MacArthur wading ashore at Leyte, Philippine Islands 20 October 1944.jpg";
import guadalcanal from "@/IMAGES/History/WWII/Marines rest in the field during the Guadalcanal campaign, 1942.jpg";
import iwoFlag from "@/IMAGES/History/WWII/Raising the Flag on Iwo Jima, by Joe Rosenthal.jpg";
import shermanFlame from "@/IMAGES/History/WWII/An M4 Sherman tank equipped with a flamethrower clearing a Japanese bunker on Iwo Jima, March 1945.jpg";
import trinityTest from "@/IMAGES/History/WWII/Manhattan Project/The Trinity test of the Manhattan Project was the first detonation of a nuclear weapon.jpg";
import oppenheimerGroves from "@/IMAGES/History/WWII/Manhattan Project/Oppenheimer and Groves at the remains of the Trinity test in September 1945.jpg";
import hiroshima from "@/IMAGES/History/WWII/Atomic bomb mushroom cloud rising from Hiroshima, 6 August 1945.jpg";
import nagasaki from "@/IMAGES/History/WWII/Mushroom cloud above Nagasaki after atomic bombing on August 9, 1945. Taken from the north west.jpg";
import cairoConf from "@/IMAGES/History/WWII/The Allied leaders of the Asian and Pacific Theaters.jpg";
import macarthurSurrender from "@/IMAGES/History/WWII/Douglas MacArthur signs the formal Japanese Instrument of Surrender on USS Missouri, 2 September 1945.jpg";
import seniorOfficials from "@/IMAGES/History/WWII/American World War II senior military officials, 1945.jpeg";

// Military
import oranLanding from "@/IMAGES/History/WWII/American troops on board a landing craft going in to land at Oran, November 1942.jpg";
import volturno from "@/IMAGES/History/WWII/American infantry crossing the Volturno River, October 1943.jpg";
import infantryBluff from "@/IMAGES/History/WWII/2nd Infantry Division troops and equipment going up the bluff from Omaha Beach to Saint-Laurent-sur-Mer on D+1, 7 June 1944.jpg";
import tankDestroyers from "@/IMAGES/History/WWII/American tank destroyers move forward during heavy fog to stem German spearhead near Werbomont, Belgium, 20 December 1944.jpg";
import bastogne from "@/IMAGES/History/WWII/Troops of the 101st Airborne move out of Bastogne, after having been besieged there for ten days, 31 December 1944.jpg";
import paratroopers from "@/IMAGES/History/WWII/Paratroopers open parachutes during the operations of the 1st Allied Airborne Army in Holland. September 1944.jpg";
import powsCherbourg from "@/IMAGES/History/WWII/German prisoners of war escorted by American soldiers in Cherbourg, 1944..jpg";
import p51 from "@/IMAGES/History/WWII/North American P-51 Mustang, 26 July 1944.jpg";
import p38 from "@/IMAGES/History/WWII/Lockheed_P-38H_Lightning in air.jpg";
import doolittle from "@/IMAGES/History/WWII/A B-25 bomber takes off from USS Hornet as part of the Doolittle Raid.jpg";
import rendova from "@/IMAGES/History/WWII/American forces landing at Rendova Island, June 1943.jpeg";
import luzon from "@/IMAGES/History/WWII/US troops approaching Japanese positions near Baguio, Luzon, 23 March 1945.jpg";
import firstFlag from "@/IMAGES/History/WWII/A small flag carried by the 2nd Battalion, 28th Marines is planted atop Mount Suribachi at 10 20 a.m.jpg";
import bunkerHill from "@/IMAGES/History/WWII/USS Bunker Hill burns after being hit by two kamikazes. At Okinawa, the kamikazes caused 4,900 American deaths.jpg";
import flyingTigers from "@/IMAGES/History/WWII/Hell's Angels, the 3rd Squadron of the 1st American Volunteer Group Flying Tigers, 1942 in air.jpg";
import eagleSquadron from "@/IMAGES/History/WWII/American pilots of No 71 'Eagle' Squadron rush to their Hawker Hurricanes at Kirton-in-Lindsey, 17 March 1941.jpg";

// Home Front
import sbdAssembly from "@/IMAGES/History/WWII/SBD Dauntless engine assembly at the Douglas Aircraft plant in El Segundo, California, August 1943.jpg";
import c47Riveting from "@/IMAGES/History/WWII/US Home Front/Riveting team working on the cockpit shell of a C-47 transport at the plant of North American Aviation.jpg";
import rosie from "@/IMAGES/History/WWII/US Home Front/Rosie the Riveter, working on an A-31 Vengeance dive bomber, Tennessee, 1943.jpg";
import buckingRivets from "@/IMAGES/History/WWII/US Home Front/Female factory workers bucking rivets during manufacture of an aircraft in 1942, Long Beach, California.jpg";
import womanAircraft from "@/IMAGES/History/WWII/US Home Front/Woman aircraft worker checking assemblies. California, 1942.jpg";
import bondPoster from "@/IMAGES/History/WWII/US Home Front/This is My Fight Too! war bond poster, 1942. Hennepin County Library collection.jpg";
import victoryGarden from "@/IMAGES/History/WWII/US Home Front/A 'Victory Garden' poster from the WWII era, showing garden produce.jpg";
import servicePoster from "@/IMAGES/History/WWII/US Home Front/Service on the home front.jpg";
import sugarRationing from "@/IMAGES/History/WWII/US Home Front/Sugar rationing waiting line.jpg";
import tireSizes from "@/IMAGES/History/WWII/US Home Front/Woman standing next to a wide range of tire sizes required by military aircraft.jpg";
import victoryFarm from "@/IMAGES/History/WWII/US Home Front/Recruitment poster for the Victory Farm Volunteers, 1943.jpg";
import speedComics from "@/IMAGES/History/WWII/US Home Front/Action packed cover of Speed comics number 32, featuring Black Cat, Shock Gibson, Captain Freedom and the Young Defenders.jpg";
import cioLeaders from "@/IMAGES/History/WWII/US Home Front/CIO leaders listen to President Roosevelt's Day of Infamy speech before pledging support to the war effort, December 12, 1941.jpg";
import consolidatedWorkers from "@/IMAGES/History/WWII/US Home Front/Male and female workers gather at Consolidated Aircraft, Fort Worth, Texas, 1942.jpg";
import welderBoilers from "@/IMAGES/History/WWII/US Home Front/Welder making boilers for a ship, Combustion Engineering Co., Chattanooga, Tennessee. June 1942.jpg";
import fortWorthWorker from "@/IMAGES/History/WWII/US Home Front/A female factory worker in 1942, Fort Worth, Texas.jpg";

// Manhattan Project
import fdrLetter from "@/IMAGES/History/WWII/Manhattan Project/Approved by FDR Cover letter written by Vannevar Bush.jpg";
import berkeley1940 from "@/IMAGES/History/WWII/Manhattan Project/March 1940 meeting at Berkeley, California.jpg";
import fermiCyclotron from "@/IMAGES/History/WWII/Manhattan Project/Enrico Fermi, John R.jpg";
import k25 from "@/IMAGES/History/WWII/Manhattan Project/Aerial view of K-25 Gaseous Diffusion Plant at Oak Ridge, TN.jpg";
import y12Shift from "@/IMAGES/History/WWII/Manhattan Project/Shift change at the Y-12 uranium enrichment facility at the Clinton Engineer Works in Oak Ridge, Tennessee, on 11 August 1945.jpg";
import secrecyBillboard from "@/IMAGES/History/WWII/Manhattan Project/A billboard encouraging secrecy among Oak Ridge workers.jpg";
import chicagoPile from "@/IMAGES/History/WWII/Manhattan Project/Some of the University of Chicago team that worked on the Chicago Pile-1.png";
import x10Reactor from "@/IMAGES/History/WWII/Manhattan Project/Workers load uranium slugs into the X-10 Graphite Reactor.jpg";
import hanfordWorkers from "@/IMAGES/History/WWII/Manhattan Project/Hanford workers collect their paychecks at the Western Union office.jpg";
import ralaExperiment from "@/IMAGES/History/WWII/Manhattan Project/Remote handling of a kilocurie source of radiolanthanum for a RaLa Experiment at Los Alamos.jpg";
import gadgetRaised from "@/IMAGES/History/WWII/Manhattan Project/The explosives of the gadget were raised to the top of the tower for the final assembly.jpg";
import gadgetTower from "@/IMAGES/History/WWII/Manhattan Project/Trinity Test. Norris Bradbury, group leader for bomb assembly, stands next to the partially assembled Gadget atop the test tower.jpg";
import silverplate from "@/IMAGES/History/WWII/Manhattan Project/Silverplate B-29 Straight Flush. The tail code of the 444th Bombardment Group is painted on for security reasons.jpg";
import trumanAEA from "@/IMAGES/History/WWII/Manhattan Project/President Harry S. Truman signs the Atomic Energy Act of 1946, establishing the United States Atomic Energy Commission.jpg";

// Lend-Lease
import fdrLendLease from "@/IMAGES/History/WWII/Lend-Lease/President Roosevelt signs the Lend-Lease bill to give aid to Britain and China (March 1941).jpg";
import britishPupils from "@/IMAGES/History/WWII/Lend-Lease/British pupils wave for the camera as they receive plates of American bacon and eggs from Lend-Lease.jpg";
import machineGuns from "@/IMAGES/History/WWII/Lend-Lease/Water-cooled machine guns, just arrived from the USA under lend-lease, are checked at an ordnance depot in England c. 1941.jpg";
import willysJeep from "@/IMAGES/History/WWII/Lend-Lease/Warsaw 1945. Willys jeep used by the Polish First Army as part of U.S. Lend-Lease program.jpg";
import lendLeaseInfo from "@/IMAGES/History/WWII/Lend-Lease/Lend_Lease_Aid_Volume_Percentage_and_Categorical_Breakdown_1941_1945.jpg";

// Additional imagery, maps, and charts (added to fully cover the archive)
import y12ShiftRoot from "@/IMAGES/History/WWII/A shift change at the Y-12 Manhattan Project site, Oak Ridge, Tennessee, 11 August 1945.jpg";
import kobeFirebomb from "@/IMAGES/History/WWII/American B-29 Superfortresses drop incendiary bombs over the port city of Kobe, June 1945.jpg";
import b29Japan from "@/IMAGES/History/WWII/B-29 Superfortress dropping 500 pound high-explosive bombs over Japan, 1945.jpg";
import barnegatIceland from "@/IMAGES/History/WWII/Officers and crew of USS Barnegat (AVP-10) at Hvalfjörður, Iceland, August 1942.jpg";
import pacificMap from "@/IMAGES/History/WWII/Pacific Theater map, 4 June 1942.jpg";
import asiaMap1939 from "@/IMAGES/History/WWII/Political map of the Asia-Pacific region, 1939.png";
import iwoFlagIconic from "@/IMAGES/History/WWII/Raising the Flag on Iwo Jima.jpg";
import naziMap from "@/IMAGES/History/WWII/The conquests and allies of Nazi Germany map.png";
import japanMap from "@/IMAGES/History/WWII/The conquests of Imperial Japan map.png";
import mhEmployment from "@/IMAGES/History/WWII/Manhattan Project/Manhattan Project contractors' employment, August 1942-December 1946.png";
import mhExpenditures from "@/IMAGES/History/WWII/Manhattan Project/Manhattan Project monthly expenditures from January 1943 through the end of December 1946.png";
import losAlamosMap from "@/IMAGES/History/WWII/Manhattan Project/Map of Los Alamos site, New Mexico, 1943-1945.png";
import hanfordMap from "@/IMAGES/History/WWII/Manhattan Project/Map of the Hanford Site.png";
import securityPoster from "@/IMAGES/History/WWII/Manhattan Project/Security poster, warning office workers to close drawers and put documents in safes when not being used.png";
import orgChart from "@/IMAGES/History/WWII/Manhattan Project/The Manhattan Project Organizational Chart, 1 May 1946.png";
import femaleWelderCarver from "@/IMAGES/History/WWII/US Home Front/A female welder helping construct the SS George Washington Carver at the Kaiser Shipyards in Richmond, California, April 1943.jpg";
import ussrRouteMap from "@/IMAGES/History/WWII/Lend-Lease/map shows US Lend Lease shipments to USSR in WW2 by route.jpg";

interface Entry {
  src: StaticImageData;
  en: string;
  ro: string;
}

const MAP: Record<string, Entry[]> = {
  // ── Overview ──────────────────────────────────────────────────────────────
  "World_War_II_Overview::Pearl Harbor Attack and Immediate Response": [
    { src: ussArizona, en: "The battleship USS Arizona explodes at Pearl Harbor, 7 December 1941.", ro: "Cuirasatul USS Arizona explodează la Pearl Harbor, 7 decembrie 1941." },
    { src: fdrJointSession, en: "FDR asks Congress for a declaration of war — the “Day of Infamy” speech, 8 December 1941.", ro: "FDR cere Congresului declararea războiului — discursul „Zilei Infamiei”, 8 decembrie 1941." },
  ],
  "World_War_II_Overview::Declarations of War and Initial Mobilization": [
    { src: hitlerWar, en: "Hitler declares war on the United States, 11 December 1941.", ro: "Hitler declară război Statelor Unite, 11 decembrie 1941." },
    { src: menEnlist, en: "Men line up to enlist in San Francisco, December 1941.", ro: "Bărbați se înrolează la San Francisco, decembrie 1941." },
  ],
  "World_War_II_Overview::D-Day and Liberation of Western Europe": [
    { src: eisenhower101st, en: "Eisenhower speaks with the 101st Airborne on the eve of D-Day, 5 June 1944.", ro: "Eisenhower vorbește cu Divizia 101 Aeropurtată în ajunul Zilei Z, 5 iunie 1944." },
    { src: omahaLcvp, en: "American troops approach Omaha Beach aboard an LCVP, 6 June 1944.", ro: "Trupe americane se apropie de plaja Omaha într-o barcă de debarcare, 6 iunie 1944." },
  ],
  "World_War_II_Overview::Strategic Bombing of Germany": [
    { src: b17Stream, en: "A 1,000-ship B-17 Flying Fortress bomber stream over Europe.", ro: "Un flux de 1.000 de bombardiere B-17 deasupra Europei." },
    { src: b17Vapor, en: "B-17 vapor trails light up the night sky over Eastern Europe.", ro: "Dârele de condens ale B-17 luminează cerul nopții deasupra Europei de Est." },
  ],
  "World_War_II_Overview::Key Battles: Midway, Guadalcanal, and Leyte Gulf": [
    { src: macarthurLeyte, en: "MacArthur wades ashore at Leyte, fulfilling his “I shall return,” 20 October 1944.", ro: "MacArthur debarcă la Leyte, împlinindu-și promisiunea „Mă voi întoarce”, 20 octombrie 1944." },
    { src: guadalcanal, en: "Marines rest during the Guadalcanal campaign, 1942.", ro: "Pușcași marini se odihnesc în campania de la Guadalcanal, 1942." },
  ],
  "World_War_II_Overview::Iwo Jima, Okinawa, and Approach to Japan": [
    { src: iwoFlag, en: "Raising the Flag on Iwo Jima, Joe Rosenthal, 23 February 1945.", ro: "Înălțarea drapelului pe Iwo Jima, Joe Rosenthal, 23 februarie 1945." },
    { src: shermanFlame, en: "A flamethrower Sherman clears a Japanese bunker on Iwo Jima, March 1945.", ro: "Un tanc Sherman cu aruncător de flăcări curăță un buncăr japonez pe Iwo Jima, martie 1945." },
  ],
  "World_War_II_Overview::Manhattan Project and Atomic Development": [
    { src: trinityTest, en: "The Trinity test — the first detonation of a nuclear weapon, 16 July 1945.", ro: "Testul Trinity — prima detonare a unei arme nucleare, 16 iulie 1945." },
    { src: oppenheimerGroves, en: "Oppenheimer and Groves inspect ground zero at the Trinity site.", ro: "Oppenheimer și Groves inspectează epicentrul la locul testului Trinity." },
  ],
  "World_War_II_Overview::Firebombing and Atomic Bombings": [
    { src: hiroshima, en: "The atomic cloud rises over Hiroshima, 6 August 1945.", ro: "Norul atomic se ridică deasupra Hiroshimei, 6 august 1945." },
    { src: nagasaki, en: "The atomic cloud over Nagasaki, 9 August 1945.", ro: "Norul atomic deasupra orașului Nagasaki, 9 august 1945." },
  ],
  "World_War_II_Overview::Conferences: Tehran, Yalta, and Potsdam": [
    { src: cairoConf, en: "Chiang Kai-shek, Roosevelt, and Churchill at the Cairo Conference, 1943.", ro: "Chiang Kai-shek, Roosevelt și Churchill la Conferința de la Cairo, 1943." },
  ],
  "World_War_II_Overview::Aftermath and Legacy": [
    { src: macarthurSurrender, en: "MacArthur signs the Japanese Instrument of Surrender aboard USS Missouri, 2 September 1945.", ro: "MacArthur semnează Actul de capitulare al Japoniei la bordul USS Missouri, 2 septembrie 1945." },
    { src: seniorOfficials, en: "America's senior military leadership, 1945.", ro: "Conducerea militară superioară a Americii, 1945." },
  ],

  // ── Military ──────────────────────────────────────────────────────────────
  "World_War_II_Military::Europe-First Policy and Coalition Warfare": [
    { src: eagleSquadron, en: "American volunteers of No. 71 “Eagle” Squadron scramble to their Hurricanes, 1941.", ro: "Voluntari americani ai Escadrilei 71 „Eagle” aleargă la avioanele Hurricane, 1941." },
  ],
  "World_War_II_Military::Operation Torch: Landings in Morocco and Algeria": [
    { src: oranLanding, en: "American troops land at Oran, North Africa, November 1942.", ro: "Trupe americane debarcă la Oran, Africa de Nord, noiembrie 1942." },
  ],
  "World_War_II_Military::Invasions of Sicily and Mainland Italy": [
    { src: volturno, en: "American infantry cross the Volturno River, Italy, October 1943.", ro: "Infanteria americană traversează râul Volturno, Italia, octombrie 1943." },
  ],
  "World_War_II_Military::Operation Overlord: D-Day and Normandy Beachheads": [
    { src: infantryBluff, en: "2nd Infantry Division troops move up the bluff from Omaha Beach, D+1, 7 June 1944.", ro: "Trupe ale Diviziei 2 Infanterie urcă faleza de la plaja Omaha, D+1, 7 iunie 1944." },
  ],
  "World_War_II_Military::Battle of the Bulge: Ardennes Counteroffensive": [
    { src: tankDestroyers, en: "Tank destroyers advance through fog near Werbomont, Belgium, 20 December 1944.", ro: "Distrugătoare de tancuri înaintează prin ceață lângă Werbomont, Belgia, 20 decembrie 1944." },
    { src: bastogne, en: "The 101st Airborne moves out of Bastogne after a ten-day siege, 31 December 1944.", ro: "Divizia 101 Aeropurtată iese din Bastogne după un asediu de zece zile, 31 decembrie 1944." },
  ],
  "World_War_II_Military::Liberation of France, Belgium, and Push to the Rhine": [
    { src: paratroopers, en: "Paratroopers of the 1st Allied Airborne Army descend over Holland, September 1944.", ro: "Parașutiști ai Primei Armate Aeropurtate Aliate coboară deasupra Olandei, septembrie 1944." },
    { src: powsCherbourg, en: "German prisoners of war are escorted through Cherbourg, 1944.", ro: "Prizonieri germani sunt escortați prin Cherbourg, 1944." },
  ],
  "World_War_II_Military::Combined Bomber Offensive: Daylight Precision Bombing": [
    { src: p51, en: "The North American P-51 Mustang, long-range escort fighter, 1944.", ro: "North American P-51 Mustang, avion de escortă cu rază lungă, 1944." },
    { src: p38, en: "The Lockheed P-38 Lightning in flight.", ro: "Lockheed P-38 Lightning în zbor." },
  ],
  "World_War_II_Military::Turning Points: Battles of Coral Sea and Midway": [
    { src: doolittle, en: "A B-25 launches from USS Hornet for the Doolittle Raid, April 1942.", ro: "Un B-25 decolează de pe USS Hornet pentru Raidul Doolittle, aprilie 1942." },
  ],
  "World_War_II_Military::Guadalcanal and New Guinea: First Offensive Campaigns": [
    { src: rendova, en: "American forces land at Rendova Island, June 1943.", ro: "Forțele americane debarcă pe insula Rendova, iunie 1943." },
  ],
  "World_War_II_Military::Philippines Liberation: Leyte Gulf and Luzon": [
    { src: luzon, en: "U.S. troops advance on Japanese positions near Baguio, Luzon, 23 March 1945.", ro: "Trupe americane înaintează spre pozițiile japoneze lângă Baguio, Luzon, 23 martie 1945." },
  ],
  "World_War_II_Military::Iwo Jima and Okinawa: Bloody Island Fights": [
    { src: firstFlag, en: "The first flag raising atop Mount Suribachi, Iwo Jima, 23 February 1945.", ro: "Prima înălțare a drapelului pe muntele Suribachi, Iwo Jima, 23 februarie 1945." },
    { src: bunkerHill, en: "USS Bunker Hill burns after two kamikaze strikes off Okinawa, 1945.", ro: "USS Bunker Hill arde după două lovituri kamikaze lângă Okinawa, 1945." },
  ],
  "World_War_II_Military::Pacific Theater": [
    { src: flyingTigers, en: "The “Flying Tigers” of the 1st American Volunteer Group over China, 1942.", ro: "„Tigrii Zburători” ai Primului Grup American de Voluntari deasupra Chinei, 1942." },
  ],

  // ── Home Front ────────────────────────────────────────────────────────────
  "World_War_II_Home_Front::Economic Mobilization": [
    { src: cioLeaders, en: "CIO leaders listen to FDR's Day of Infamy speech and pledge support, December 1941.", ro: "Liderii CIO ascultă discursul „Zilei Infamiei” al lui FDR și promit sprijin, decembrie 1941." },
  ],
  "World_War_II_Home_Front::Industrial Conversion and Production Achievements": [
    { src: sbdAssembly, en: "SBD Dauntless engine assembly at the Douglas Aircraft plant, El Segundo, 1943.", ro: "Asamblarea motoarelor SBD Dauntless la uzina Douglas Aircraft, El Segundo, 1943." },
    { src: c47Riveting, en: "A riveting team builds a C-47 transport cockpit at North American Aviation.", ro: "O echipă nituiește cabina unui transportor C-47 la North American Aviation." },
  ],
  "World_War_II_Home_Front::Overall Employment Expansion and Shortages": [
    { src: consolidatedWorkers, en: "Men and women workers at Consolidated Aircraft, Fort Worth, 1942.", ro: "Muncitori și muncitoare la Consolidated Aircraft, Fort Worth, 1942." },
    { src: welderBoilers, en: "A welder makes ship boilers in Chattanooga, June 1942.", ro: "Un sudor fabrică cazane de nave în Chattanooga, iunie 1942." },
  ],
  "World_War_II_Home_Front::Women's Entry into the Workforce": [
    { src: rosie, en: "“Rosie the Riveter” works on an A-31 Vengeance dive bomber, Tennessee, 1943.", ro: "„Rosie Nituitoarea” lucrează la un bombardier în picaj A-31 Vengeance, Tennessee, 1943." },
    { src: buckingRivets, en: "Women buck rivets during aircraft manufacture, Long Beach, 1942.", ro: "Femei nituiesc în timpul fabricării avioanelor, Long Beach, 1942." },
    { src: womanAircraft, en: "A woman aircraft worker checks assemblies, California, 1942.", ro: "O muncitoare din aviație verifică ansamble, California, 1942." },
    { src: fortWorthWorker, en: "A woman factory worker, Fort Worth, Texas, 1942.", ro: "O muncitoare de fabrică, Fort Worth, Texas, 1942." },
  ],
  "World_War_II_Home_Front::Agricultural and Rural Labor Adjustments": [
    { src: victoryFarm, en: "A recruitment poster for the Victory Farm Volunteers, 1943.", ro: "Un afiș de recrutare pentru Voluntarii Fermei Victoriei, 1943." },
  ],
  "World_War_II_Home_Front::War Financing through Bonds and Savings": [
    { src: bondPoster, en: "“This Is My Fight Too!” war bond poster, 1942.", ro: "Afiș pentru obligațiuni de război „Și aceasta este lupta mea!”, 1942." },
  ],
  "World_War_II_Home_Front::Advertising, Posters, and Bond Drives": [
    { src: victoryGarden, en: "A “Victory Garden” home-front poster.", ro: "Un afiș „Grădina Victoriei” de pe frontul intern." },
    { src: servicePoster, en: "“Service on the Home Front” — a WPA civilian-defense poster.", ro: "„Serviciu pe Frontul Intern” — un afiș WPA de apărare civilă." },
  ],
  "World_War_II_Home_Front::Hollywood and Entertainment Contributions": [
    { src: speedComics, en: "Wartime patriotism in pop culture: the cover of Speed Comics #32, 1944.", ro: "Patriotism de război în cultura pop: coperta Speed Comics #32, 1944." },
  ],
  "World_War_II_Home_Front::Rationing, Conservation, and Daily Sacrifices": [
    { src: sugarRationing, en: "Civilians wait in a sugar rationing line.", ro: "Civili așteaptă la coada pentru rația de zahăr." },
    { src: tireSizes, en: "A worker beside the range of tire sizes required by military aircraft.", ro: "O muncitoare lângă gama de dimensiuni de anvelope necesare avioanelor militare." },
  ],

  // ── Manhattan Project ─────────────────────────────────────────────────────
  "World_War_II_Manhattan_Project::Einstein-Szilard Letter and Roosevelt's Response": [
    { src: fdrLetter, en: "Vannevar Bush's cover letter forwarding the atomic bomb report to FDR, 1942.", ro: "Scrisoarea de însoțire a lui Vannevar Bush care înaintează raportul despre bomba atomică către FDR, 1942." },
  ],
  "World_War_II_Manhattan_Project::Atomic Physics Breakthroughs": [
    { src: berkeley1940, en: "The 1940 Berkeley meeting: Lawrence, Compton, Bush, Conant, and Loomis.", ro: "Întâlnirea de la Berkeley din 1940: Lawrence, Compton, Bush, Conant și Loomis." },
    { src: fermiCyclotron, en: "Enrico Fermi and colleagues before the cyclotron at Columbia University, 1940.", ro: "Enrico Fermi și colegii în fața ciclotronului de la Universitatea Columbia, 1940." },
  ],
  "World_War_II_Manhattan_Project::Oak Ridge: Electromagnetic and Gaseous Diffusion": [
    { src: k25, en: "Aerial view of the K-25 gaseous diffusion plant at Oak Ridge, Tennessee.", ro: "Vedere aeriană a uzinei de difuzie gazoasă K-25 din Oak Ridge, Tennessee." },
    { src: y12Shift, en: "Shift change at the Y-12 uranium enrichment facility, Oak Ridge, August 1945.", ro: "Schimbul de tură la uzina de îmbogățire a uraniului Y-12, Oak Ridge, august 1945." },
    { src: secrecyBillboard, en: "A billboard urging secrecy among Oak Ridge workers.", ro: "Un panou care îndeamnă la păstrarea secretului printre muncitorii din Oak Ridge." },
  ],
  "World_War_II_Manhattan_Project::Hanford and Chicago: Plutonium Reactors and Separation": [
    { src: chicagoPile, en: "Members of the University of Chicago team behind Chicago Pile-1, the first nuclear reactor.", ro: "Membri ai echipei Universității din Chicago din spatele Chicago Pile-1, primul reactor nuclear." },
    { src: x10Reactor, en: "Workers load uranium slugs into the X-10 Graphite Reactor.", ro: "Muncitori încarcă blocuri de uraniu în Reactorul cu Grafit X-10." },
    { src: hanfordWorkers, en: "Hanford workers collect their paychecks at the Western Union office.", ro: "Muncitorii de la Hanford își ridică salariile la biroul Western Union." },
  ],
  "World_War_II_Manhattan_Project::Los Alamos: Theoretical Design and Assembly": [
    { src: ralaExperiment, en: "Remote handling during a RaLa experiment at Los Alamos.", ro: "Manipulare la distanță în timpul unui experiment RaLa la Los Alamos." },
  ],
  "World_War_II_Manhattan_Project::Trinity Test: Execution and Results": [
    { src: gadgetRaised, en: "“The Gadget” is raised to the top of the tower for final assembly, July 1945.", ro: "„Dispozitivul” este ridicat în vârful turnului pentru asamblarea finală, iulie 1945." },
    { src: gadgetTower, en: "Norris Bradbury beside the partially assembled Gadget atop the test tower.", ro: "Norris Bradbury lângă Dispozitivul parțial asamblat în vârful turnului de test." },
  ],
  "World_War_II_Manhattan_Project::Hiroshima and Nagasaki Missions": [
    { src: silverplate, en: "A Silverplate B-29, the modified bomber type that carried the atomic bombs.", ro: "Un B-29 Silverplate, tipul de bombardier modificat care a transportat bombele atomice." },
  ],
  "World_War_II_Manhattan_Project::Dismantlement and Atomic Energy Commission": [
    { src: trumanAEA, en: "Truman signs the Atomic Energy Act of 1946, creating the Atomic Energy Commission.", ro: "Truman semnează Legea Energiei Atomice din 1946, creând Comisia pentru Energie Atomică." },
  ],

  // ── Lend-Lease ────────────────────────────────────────────────────────────
  "World_War_II_Lend_Lease::Roosevelt's Arsenal of Democracy Speech": [
    { src: fdrLendLease, en: "FDR signs the Lend-Lease bill to aid Britain and China, March 1941.", ro: "FDR semnează legea Lend-Lease pentru a ajuta Marea Britanie și China, martie 1941." },
  ],
  "World_War_II_Lend_Lease::Aid to the United Kingdom and British Empire": [
    { src: britishPupils, en: "British children receive plates of American bacon and eggs under Lend-Lease.", ro: "Copii britanici primesc porții de bacon și ouă americane prin Lend-Lease." },
    { src: machineGuns, en: "Lend-Lease machine guns, newly arrived from the USA, are checked in England, c. 1941.", ro: "Mitraliere Lend-Lease, proaspăt sosite din SUA, sunt verificate în Anglia, c. 1941." },
  ],
  "World_War_II_Lend_Lease::Aid to the Soviet Union": [
    { src: willysJeep, en: "A Lend-Lease Willys jeep used by the Polish First Army, Warsaw, 1945.", ro: "Un jeep Willys Lend-Lease folosit de Prima Armată Poloneză, Varșovia, 1945." },
  ],
  "World_War_II_Lend_Lease::Scale and Valuation of Supplies": [
    { src: lendLeaseInfo, en: "Lend-Lease aid volume and categorical breakdown, 1941–1945.", ro: "Volumul ajutorului Lend-Lease și defalcarea pe categorii, 1941–1945." },
  ],
};

// Maps, charts, and additional photos — merged onto MAP (appended where a section
// already has figures, added fresh otherwise) so the whole archive is shown.
const EXTRA: Record<string, Entry[]> = {
  "World_War_II_Overview::Prelude to Involvement": [
    { src: naziMap, en: "The conquests and allies of Nazi Germany.", ro: "Cuceririle și aliații Germaniei naziste." },
    { src: japanMap, en: "The conquests of Imperial Japan.", ro: "Cuceririle Japoniei Imperiale." },
  ],
  "World_War_II_Overview::Scientific, Technological, and Intelligence Contributions": [
    { src: y12ShiftRoot, en: "Shift change at the Y-12 plant, Oak Ridge, 11 August 1945.", ro: "Schimbul de tură la uzina Y-12, Oak Ridge, 11 august 1945." },
  ],
  "World_War_II_Overview::Firebombing and Atomic Bombings": [
    { src: kobeFirebomb, en: "B-29 Superfortresses drop incendiary bombs on Kobe, June 1945.", ro: "Superfortărețe B-29 lansează bombe incendiare asupra orașului Kobe, iunie 1945." },
  ],
  "World_War_II_Overview::Iwo Jima, Okinawa, and Approach to Japan": [
    { src: b29Japan, en: "A B-29 Superfortress drops high-explosive bombs over Japan, 1945.", ro: "O Superfortăreață B-29 lansează bombe explozive asupra Japoniei, 1945." },
  ],
  "World_War_II_Military::Battle of the Atlantic": [
    { src: barnegatIceland, en: "Officers and crew of USS Barnegat at Hvalfjörður, Iceland, August 1942.", ro: "Ofițeri și echipaj ai USS Barnegat la Hvalfjörður, Islanda, august 1942." },
  ],
  "World_War_II_Military::Turning Points: Battles of Coral Sea and Midway": [
    { src: pacificMap, en: "The Pacific Theater on the eve of Midway, 4 June 1942.", ro: "Teatrul Pacific în ajunul bătăliei de la Midway, 4 iunie 1942." },
  ],
  "World_War_II_Military::Pacific Theater": [
    { src: asiaMap1939, en: "The Asia-Pacific region on the eve of war, 1939.", ro: "Regiunea Asia-Pacific în ajunul războiului, 1939." },
  ],
  "World_War_II_Military::Iwo Jima and Okinawa: Bloody Island Fights": [
    { src: iwoFlagIconic, en: "Six Marines raise the flag atop Mount Suribachi — Rosenthal's iconic photograph, 23 February 1945.", ro: "Șase pușcași marini înalță drapelul pe muntele Suribachi — fotografia iconică a lui Rosenthal, 23 februarie 1945." },
  ],
  "World_War_II_Manhattan_Project::Establishment of the Manhattan Engineer District": [
    { src: orgChart, en: "The Manhattan Project organizational chart, 1 May 1946.", ro: "Organigrama Proiectului Manhattan, 1 mai 1946." },
  ],
  "World_War_II_Manhattan_Project::Los Alamos: Theoretical Design and Assembly": [
    { src: losAlamosMap, en: "Map of the Los Alamos site, New Mexico, 1943–1945.", ro: "Harta sitului Los Alamos, New Mexico, 1943–1945." },
  ],
  "World_War_II_Manhattan_Project::Hanford and Chicago: Plutonium Reactors and Separation": [
    { src: hanfordMap, en: "Map of the Hanford Site along the Columbia River.", ro: "Harta sitului Hanford de-a lungul râului Columbia." },
  ],
  "World_War_II_Manhattan_Project::Compartmentalization and Censorship Protocols": [
    { src: securityPoster, en: "A security poster warning workers to safeguard documents.", ro: "Un afiș de securitate care avertizează lucrătorii să protejeze documentele." },
  ],
  "World_War_II_Manhattan_Project::Budget Allocations and Resource Mobilization": [
    { src: mhExpenditures, en: "Manhattan Project monthly expenditures, 1943–1946 — peaking at $111.4M in August 1944.", ro: "Cheltuielile lunare ale Proiectului Manhattan, 1943–1946 — vârf de 111,4 mil. $ în august 1944." },
    { src: mhEmployment, en: "Manhattan Project contractor employment, 1942–1946.", ro: "Ocuparea forței de muncă a contractorilor Proiectului Manhattan, 1942–1946." },
  ],
  "World_War_II_Home_Front::Minority Group Labor Contributions": [
    { src: femaleWelderCarver, en: "A welder builds the SS George Washington Carver at the Kaiser Shipyards, Richmond, California, 1943.", ro: "O sudoriță construiește nava SS George Washington Carver la șantierele Kaiser, Richmond, California, 1943." },
  ],
  "World_War_II_Lend_Lease::Aid to the Soviet Union": [
    { src: ussrRouteMap, en: "Map of U.S. Lend-Lease shipment routes to the USSR.", ro: "Harta rutelor de transport Lend-Lease ale SUA către URSS." },
  ],
};

export function getWwiiHistoryImages(
  locale: Locale,
): Record<string, SectionFigure[]> {
  const ro = locale === "ro";
  const merged: Record<string, Entry[]> = {};
  for (const [key, entries] of Object.entries(MAP)) merged[key] = [...entries];
  for (const [key, entries] of Object.entries(EXTRA)) {
    merged[key] = (merged[key] ?? []).concat(entries);
  }
  const out: Record<string, SectionFigure[]> = {};
  for (const [key, entries] of Object.entries(merged)) {
    out[key] = entries.map((e) => ({ src: e.src, caption: ro ? e.ro : e.en }));
  }
  return out;
}
