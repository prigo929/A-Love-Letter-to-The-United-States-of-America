// Central image registry for the whole site.
//
// If you want to swap an image:
// 1. Put the new file somewhere inside /IMAGES.
// 2. Import it here.
// 3. Replace the matching value in SITE_IMAGES below.
//
// Most content files do NOT import image files directly. They import a key from
// SITE_IMAGES instead, which makes image changes much easier to manage.
//
// Naming tip:
// Keep keys descriptive and stable. For example, `homeGrandCanyon` tells you
// both where the image is used (home page) and what it shows (Grand Canyon).

import chicagoSkyline from "@/IMAGES/Cities/Golden Gate Bridge.jpg";
import homeChicagoDowntownPortrait from "@/IMAGES/Cities/Chicago Downtown portrait.jpg";
import homeNycSunset from "@/IMAGES/Cities/New York Skyline at sunset.jpg";
import homeNycSkyline from "@/IMAGES/Cities/Manhattan One World Trade Center Close-up.jpg";
import homeDeclarationIndependence from "@/IMAGES/Constitution/usa-independence-day-concept-with-declaration-independence.jpg";
import constitutionDocument from "@/IMAGES/Constitution/We The People Wooden Background.jpg";
import cultureFlagCrowd from "@/IMAGES/Culture/Iconic Things/Statue Of Liberty.jpg";
import harvardCampus from "@/IMAGES/Education/Columbia University.jpg";
import economyDollar from "@/IMAGES/Economy/100 dollar bill.jpg";
import economyGrowth from "@/IMAGES/Economy/economy-growth.jpg";
import economyNyseHero from "@/IMAGES/Economy/New York Stock Exchange.jpg";
import economyNYSEUpsideDown from "@/IMAGES/Economy/economy-nyse-upside-down.jpg";
import economyPort from "@/IMAGES/Economy/economy-port.jpg";
import economyTradeSkyline from "@/IMAGES/Infrastructure/I-110 and I-115 Interchange Los Angeles.jpg";
import qualityOfLifeHouse from "@/IMAGES/Housing/USA Suburb house.jpg";
import denaliNationalPark from "@/IMAGES/Landscapes/Mount Denali National Park.jpg";
import glacierNationalPark from "@/IMAGES/Landscapes/Glacier National Park.jpg";
import grandTeton from "@/IMAGES/Landscapes/Yosemite National Park Road.jpg";
import homeGrandCanyon from "@/IMAGES/Landscapes/Grand Canyon National Park.jpg";
import yosemiteNationalPark from "@/IMAGES/Landscapes/Yosemite National Park.jpg";
import yellowstoneNationalPark from "@/IMAGES/Landscapes/Yellowstone National Park.jpg";
import zionNationalPark from "@/IMAGES/Landscapes/Zion National Park.jpg";
import greatLakesChicago from "@/IMAGES/Landscapes/the-great-lakes-with-chicago.jpg";
import globalLeadership from "@/IMAGES/USA from Space/Planet Earth.jpg";
import homeUsaAtNightFromSpace from "@/IMAGES/USA from Space/USA at night from Space.jpg";
import homeAirForcePlane from "@/IMAGES/Military/Air Force/us-air-force-c17-globemaster-nose.jpg";
import homeSpacexLaunch from "@/IMAGES/Science/SpaceX launch.jpg";
import scienceLab from "@/IMAGES/Science/science-lab.jpg";
import homeSiliconValley from "@/IMAGES/Technology/macro of a silicon wafer.jpg";
import siliconValleyOffice from "@/IMAGES/Technology/Apple Headquarters.jpg";

// Military replacements
import armyHero from "@/IMAGES/Military/Army/us-army-soldiers-flag.jpg";
import navyHero from "@/IMAGES/Military/Navy/us-navy-dual-carrier-strike-group.jpg";
import airForceHero from "@/IMAGES/Military/Air Force/us-air-force-desert-storm.jpg";
import b21Raider from "@/IMAGES/Military/Air Force/us-air-force-b21-raider-flight.jpg";
import b2Hero from "@/IMAGES/Military/Air Force/B-2 Spirit Bomber.jpg";
import abramsTank from "@/IMAGES/Military/Army/us-army-abrams-tank-desert.jpg";
import f22Raptor from "@/IMAGES/Military/Air Force/us-air-force-f22-raptor-close.jpg";
import autonomousDrone from "@/IMAGES/Military/Air Force/us-air-force-yfq42a-drone-runway.jpg";
import aircraftCarrierFlightDeck from "@/IMAGES/Military/Navy/us-navy-aircraft-carrier-flight-deck.jpg";
import fa18Landing from "@/IMAGES/Military/Navy/us-navy-fa18f-super-hornet-landing.jpg";
import ticonderogaCruiser from "@/IMAGES/Military/Navy/us-navy-ticonderoga-cruiser-san-diego.jpg";
import carrierStrikeGroupFormation from "@/IMAGES/Military/Navy/us-navy-carrier-strike-group-formation.jpg";
import navyHeritageColumbus from "@/IMAGES/Military/Navy/ContinentalNavyShipColumbus.jpg";
import navyHeritageConstitution from "@/IMAGES/Military/Navy/USS_Constitution_fires_a_17-gun_salute.jpg";
import navyHeritageGreatWhiteFleet from "@/IMAGES/Military/Navy/Great_White_Fleet_return2.jpg";
import navyHeritageMidway from "@/IMAGES/Military/Navy/Battle_of_Midway,_June_1942_(23902373581).jpg";
import navyHeritageCubanMissileCrisis from "@/IMAGES/Military/Navy/P-3A_VP-44_over_USS_Barry_(DD-933)_and_Metallurg_Anosov_during_Cuban_Missile_Crisis_1962.jpg";
import navyHeritageTomahawk from "@/IMAGES/Military/Navy/Missouri.missile02.jpg";
import navyHeritageLincoln from "@/IMAGES/Military/Navy/Abraham-Lincoln-battlegroup.jpg";
import spaceForceLaunch from "@/IMAGES/Military/Space Force/us-space-force-falcon9-launch.jpg";
import spaceForceSputnik from "@/IMAGES/Military/Space Force/Sputnik.jpg";
import spaceForceAfscLogo from "@/IMAGES/Military/Space Force/Air Force Space Command Logo.jpg";
import spaceForceGpsEarth from "@/IMAGES/Military/Space Force/GPS - Earth and Sattelite.jpg";
import spaceForceLaunchPoster from "@/IMAGES/Military/Space Force/US Space Force Launch poster.jpg";
import spaceForceGuardiansPoster from "@/IMAGES/Military/Space Force/US Space Force Guardians poster.jpg";
import ac130Ghostrider from "@/IMAGES/Military/Air Force/us-air-force-ac130j-ghostrider-flight.jpg";
import f22Formation from "@/IMAGES/Military/Air Force/us-air-force-f22-raptor-formation.jpg";
import airForcePersonnel from "@/IMAGES/Military/Air Force/us-air-force-personnel-c17-globemaster.jpg";
import c130Takeoff from "@/IMAGES/Military/Air Force/us-air-force-c130-hercules-dirt-takeoff.jpg";
import soldierCloseUp from "@/IMAGES/Military/Army/us-army-soldier-closeup.jpg";
import soldierSaluting from "@/IMAGES/Military/Army/us-army-soldiers-saluting.jpg";

// New high-fidelity military assets
import f35Lightning from "@/IMAGES/Military/Air Force/us-air-force-f35-lightning.jpg";
import geraldFordCarrier from "@/IMAGES/Military/Navy/us-navy-gerald-ford-carrier.jpg";
import ohioSubmarine from "@/IMAGES/Military/Navy/us-navy-ohio-class-submarine.jpg";
import minutemanLaunch from "@/IMAGES/Military/Air Force/us-air-force-minuteman-iii-launch.jpg";
import cyberOps from "@/IMAGES/Military/Air Force/us-air-force-cyber-ops.jpg";
import marinesAssault from "@/IMAGES/Military/Marines/us-marines-amphibious-assault.jpg";
import socomOperators from "@/IMAGES/Military/SOCOM/us-army-socom-operators.jpg";
import tacticalWorldMap from "@/IMAGES/Military/tactical-world-map.svg";
import coastGuardHero from "@/IMAGES/Military/Coast Guard/US Coast Guard.jpg";

// New user-added high-fidelity Navy images
import fa18SuperHornet from "@/IMAGES/Military/Navy/FA-18 Super Hornet.jpg";
import arleighBurkeJackHLucas from "@/IMAGES/Military/Navy/arleigh_burke_flight_iii_uss_jack_h_lucas.jpeg";
import ohioKentuckySubmarine from "@/IMAGES/Military/Navy/hio_class_ssbn_uss_kentucky.jpg";
import geraldFordCvn from "@/IMAGES/Military/Navy/uss_gerald_r_ford_ford_class_cvn.jpg";

// Air Force Timeline Images
import wrightBrothersFirstFlight from "@/IMAGES/Military/Air Force/Wright Brothers First Flight at Kitty Hawk.jpg";
import bellX1Flight from "@/IMAGES/Military/Air Force/Bell X-1 in flight.jpg";
import f86vsMig15Combat from "@/IMAGES/Military/Air Force/F-86 vs MiG 15.jpg";
import b52StratofortressWing from "@/IMAGES/Military/Air Force/B-52_Stratofortress_assigned_to_the_307th_Bomb_Wing.jpg";
import f117StealthBaghdad from "@/IMAGES/Military/Air Force/F-117 Nighthawk strikes Baghdad.jpg";

// New user-added aircraft images
import f16FightingFalcon from "@/IMAGES/Military/Air Force/F-16 Fighting Falcon.jpg";
import f15exEagleII from "@/IMAGES/Military/Air Force/F-15EX Eagle II.jpg";
import b2SpiritBomber from "@/IMAGES/Military/Air Force/B-2 Spirit Bomber.jpg";
import b1bLancerFlying from "@/IMAGES/Military/Air Force/B-1B Lancer Flying.jpg";
import c17Globemaster from "@/IMAGES/Military/Air Force/Boeing C-17 Globemaster III_aircraft_over_over_the_Blue_Ridge_Mountains_2005.jpg";
import c130Hercules from "@/IMAGES/Military/Air Force/Lockheed Martin C-130 Hercules.jpg";
import kc135Stratotanker from "@/IMAGES/Military/Air Force/KC-135R Stratotanker refuels an F-15C Eagle.jpg";
import kc46Pegasus from "@/IMAGES/Military/Air Force/KC-46 Pegasus.jpg";
import usAirForceB21 from "@/IMAGES/Military/Air Force/US Air Force B-21.jpg";

// Intelligence Seals
import ciaSeal from "@/IMAGES/Military/Intelligence/Seal_of_the_Central_Intelligence_Agency.svg";
import nsaSeal from "@/IMAGES/Military/Intelligence/Seal_of_the_U.S._National_Security_Agency.svg";
import nroSeal from "@/IMAGES/Military/Intelligence/NRO.svg";
import ngaSeal from "@/IMAGES/Military/Intelligence/US-NationalGeospatialIntelligenceAgency-2008Seal.svg";
import diaSeal from "@/IMAGES/Military/Intelligence/Seal_of_the_U.S._Defense_Intelligence_Agency.svg";

import carrierStrikeGroupLogo from "@/ASSETS/Military/Carrier Strike Group Logo Dark.png";

// Culture
import cultureHollywoodSign from "@/IMAGES/Culture/Cinema/Hollywood sign sunset.jpg";
import cultureHollywoodPalms from "@/IMAGES/Culture/Cinema/Hollywood sign between palm trees.jpg";
import cultureChicagoTheatre from "@/IMAGES/Culture/Cinema/Illuminated-Chicago-Theatre-Marquee-Sign-At-Night-With-Street-View.jpg";
import cultureBurger from "@/IMAGES/Culture/Food/American Burger.jpg";
import cultureBurgerFries from "@/IMAGES/Culture/Food/Burger and Fries close up.jpg";
import cultureJazzClub from "@/IMAGES/Culture/Music/Live-Jazz-Band-Performing-On-Stage-With-Neon-Jazz-Sign-And-Red-Curtains.jpg";
import cultureConcertCrowd from "@/IMAGES/Culture/Music/Silhouetted-Crowd-With-Raised-Hands-At-Live-Concert-With-Yellow-Stage-Lights.jpg";
import cultureGuitarNeon from "@/IMAGES/Culture/Music/Close-Up-Of-Electric-Guitar-Illuminated-By-Purple-And-Blue-Neon-Lights.jpg";
import cultureGuitarFlat from "@/IMAGES/Culture/Music/Blue-Burst-Electric-Guitar-Lying-Flat-On-Dark-Textured-Surface.jpg";
import cultureRoute66 from "@/IMAGES/Culture/Iconic Things/Route-66-Shield-Painted-On-Desert-Highway-At-Sunrise.jpg";
import cultureMelsDriveIn from "@/IMAGES/Culture/Iconic Things/Vintage-Classic-Cars-Parked-Outside-Mels-Drive-In-Retro-Diner-At-Night.jpg";
import cultureFlosV8 from "@/IMAGES/Culture/Iconic Things/Flos-V8-Cafe-Neon-Sign-At-Dusk-In-Cars-Land-Disney-California-Adventure.jpg";
import cultureClassicCar from "@/IMAGES/Culture/Iconic Things/Shiny-Black-Classic-Car-Reflecting-Pink-Neon-Signs-At-Mels-Drive-In.jpg";
import cultureTimesSquare from "@/IMAGES/Culture/Just America/Times-Square-NYC-Rainy-Night-With-Yellow-Taxis-And-American-Flag-Billboard.jpg";
import cultureMcDonalds from "@/IMAGES/Culture/Just America/McDonald's Restaurant in Bethlehem, Georgia.jpg";
import cultureDisneyWorld from "@/IMAGES/Culture/Iconic Things/Cinderella Castle at Disney World Orlando.jpg";
import cultureNflStadium from "@/IMAGES/Culture/Sports/Stadiums/Wide-Angle-Night-View-Of-Giant-American-Flag-On-Field-At-MetLife-Stadium.jpg";
import cultureBaseballPark from "@/IMAGES/Culture/Sports/Stadiums/Scenic-Daytime-View-Of-PNC-Park-Baseball-Stadium-And-Pittsburgh-Skyline.jpg";
import cultureCowboysStadium from "@/IMAGES/Culture/Sports/Stadiums/Wide-Interior-View-Of-Packed-ATT-Stadium-During-Dallas-Cowboys-Football-Game.jpg";
import cultureStatueOfLiberty from "@/IMAGES/Culture/Iconic Things/Statue Of Liberty.jpg";

// Global Bases
import baseRamstein from "@/IMAGES/Military/Global Bases/ramstein_air_base.jpg";
import baseYokosuka from "@/IMAGES/Military/Global Bases/western_pacific_fleet_activities_yokosuka.jpg";
import baseCampHumphreys from "@/IMAGES/Military/Global Bases/Camp Humphreys Base.jpg";
import baseDiegoGarcia from "@/IMAGES/Military/Global Bases/Diego Garcia Base.jpeg";
import baseAlUdeid from "@/IMAGES/Military/Global Bases/Al_Udeid_Air_Base.jpg";
import baseRota from "@/IMAGES/Military/Global Bases/mediterranean_naval_station_rota.jpg";
import baseAndersen from "@/IMAGES/Military/Global Bases/Andersen Air Force Base.jpg";
import basePituffik from "@/IMAGES/Military/Global Bases/Thule : Pituffik Space Base.jpg";
import baseLemonnier from "@/IMAGES/Military/Global Bases/Camp Lemonnier.jpg";
import baseNorfolk from "@/IMAGES/Military/Global Bases/atlantic_naval_station_norfolk.jpg";
import baseLakenheath from "@/IMAGES/Military/Global Bases/raf_lakenheath.jpeg";
import baseAviano from "@/IMAGES/Military/Global Bases/aviano_air_base.jpg";
import baseSpangdahlem from "@/IMAGES/Military/Global Bases/spangdahlem_air_base.jpg";
import baseBahrain from "@/IMAGES/Military/Global Bases/arabian_gulf_nsa_bahrain.jpg";
import baseAlDhafra from "@/IMAGES/Military/Global Bases/Al Dhafra Air Base.jpeg";
import baseAliAlSalem from "@/IMAGES/Military/Global Bases/Ali Al Salem Air Base.jpg";
import baseSigonella from "@/IMAGES/Military/Global Bases/Naval Air Station Sigonella.jpg";
import baseManta from "@/IMAGES/Military/Global Bases/Eloy Alfaro Air Base Manta, Ecuador Base.jpg";
import baseGuantanamo from "@/IMAGES/Military/Global Bases/Naval Station Guantanamo Bay.jpg";
import baseEielson from "@/IMAGES/Military/Global Bases/Eielson Air Force Base.jpg";
import baseClear from "@/IMAGES/Military/Global Bases/Clear Space Force Station.jpg";
import baseFortLiberty from "@/IMAGES/Military/Global Bases/Fort_Bragg : Liberty.jpg";
import baseKadena from "@/IMAGES/Military/Global Bases/Kadena_Air_Base_Aerial_photograph_1977.jpg";

// Export plain `.src` strings so the rest of the app can use them in Next Image
// components without caring which physical file they came from.
//
// Why not export the full imported object?
// Next.js image imports are objects with metadata. Most of this app only needs
// the final image URL string, so `.src` keeps downstream files simpler.
export const SITE_IMAGES = {
  homeDeclarationIndependence: homeDeclarationIndependence.src,
  homeGrandCanyon: homeGrandCanyon.src,
  homeGoldenGateBridge: chicagoSkyline.src,
  homeChicagoDowntownPortrait: homeChicagoDowntownPortrait.src,
  homeNycSunset: homeNycSunset.src,
  homeNycSkyline: homeNycSkyline.src,
  homeAirForcePlane: homeAirForcePlane.src,
  homeSpacexLaunch: homeSpacexLaunch.src,
  homeSiliconValley: homeSiliconValley.src,
  homeUsaAtNightFromSpace: homeUsaAtNightFromSpace.src,
  constitutionDocument: constitutionDocument.src,
  grandTeton: grandTeton.src,
  yellowstonePrismatic: yellowstoneNationalPark.src,
  chicagoSkyline: chicagoSkyline.src,
  harvardCampus: harvardCampus.src,
  siliconValleyOffice: siliconValleyOffice.src,
  cultureFlagCrowd: cultureFlagCrowd.src,
  scienceLab: scienceLab.src,
  globalLeadership: globalLeadership.src,
  qualityOfLifeHouse: qualityOfLifeHouse.src,
  economyNYSEUpsideDown: economyNYSEUpsideDown.src,
  economyDollar: economyDollar.src,
  economyGrowth: economyGrowth.src,
  economyNyseHero: economyNyseHero.src,
  economyPort: economyPort.src,
  economyTradeSkyline: economyTradeSkyline.src,
  denaliNationalPark: denaliNationalPark.src,
  glacierNationalPark: glacierNationalPark.src,
  yosemiteNationalPark: yosemiteNationalPark.src,
  yellowstoneNationalPark: yellowstoneNationalPark.src,
  zionNationalPark: zionNationalPark.src,
  greatLakesChicago: greatLakesChicago.src,

  // Military
  armyHero: armyHero.src,
  navyHero: navyHero.src,
  airForceHero: airForceHero.src,
  b2Hero: b2Hero.src,
  b21Raider: b21Raider.src,
  abramsTank: abramsTank.src,
  f22Raptor: f22Raptor.src,
  autonomousDrone: autonomousDrone.src,
  aircraftCarrierFlightDeck: aircraftCarrierFlightDeck.src,
  fa18Landing: fa18SuperHornet.src,
  ticonderogaCruiser: arleighBurkeJackHLucas.src,
  spaceForceLaunch: spaceForceLaunch.src,
  ac130Ghostrider: ac130Ghostrider.src,
  f22Formation: f22Formation.src,
  airForcePersonnel: airForcePersonnel.src,
  c130Takeoff: c130Takeoff.src,
  soldierCloseUp: soldierCloseUp.src,
  soldierSaluting: soldierSaluting.src,
  f35Lightning: f35Lightning.src,
  geraldFordCarrier: geraldFordCvn.src,
  ohioSubmarine: ohioKentuckySubmarine.src,
  minutemanLaunch: minutemanLaunch.src,
  cyberOps: cyberOps.src,
  marinesAssault: marinesAssault.src,
  socomOperators: socomOperators.src,
  coastGuardHero: coastGuardHero.src,

  // Military Nested (for specific page structures)
  military: {
    hero: b2Hero.src,
    carrier: geraldFordCvn.src,
    carrierLogo: carrierStrikeGroupLogo.src,
    b2: b2Hero.src,
    satellite: globalLeadership.src,
    tacticalMap: tacticalWorldMap.src,
  },
  navy: {
    hero: geraldFordCvn.src,
    flightDeck: aircraftCarrierFlightDeck.src,
    geraldFord: geraldFordCvn.src,
    destroyer: arleighBurkeJackHLucas.src,
    fa18Landing: fa18SuperHornet.src,
    ohioSubmarine: ohioKentuckySubmarine.src,
    dualCarrier: navyHero.src,
    carrierFormation: carrierStrikeGroupFormation.src,
    heritageColumbus: navyHeritageColumbus.src,
    heritageConstitution: navyHeritageConstitution.src,
    heritageGreatWhiteFleet: navyHeritageGreatWhiteFleet.src,
    heritageMidway: navyHeritageMidway.src,
    heritageCubanMissileCrisis: navyHeritageCubanMissileCrisis.src,
    heritageTomahawk: navyHeritageTomahawk.src,
    heritageLincoln: navyHeritageLincoln.src,
  },
  airForce: {
    hero: airForceHero.src,
    f22: f22Raptor.src,
    f22Formation: f22Formation.src,
    f35: f35Lightning.src,
    f16: f16FightingFalcon.src,
    f15ex: f15exEagleII.src,
    b2: b2SpiritBomber.src,
    b21: usAirForceB21.src,
    b1b: b1bLancerFlying.src,
    c17: c17Globemaster.src,
    c130: c130Hercules.src,
    ac130: ac130Ghostrider.src,
    personnel: airForcePersonnel.src,
    drone: autonomousDrone.src,
    minuteman: minutemanLaunch.src,
    cyber: cyberOps.src,
    wrightBrothers: wrightBrothersFirstFlight.src,
    bellX1: bellX1Flight.src,
    f86vsMig15: f86vsMig15Combat.src,
    b52: b52StratofortressWing.src,
    f117: f117StealthBaghdad.src,
    kc135: kc135Stratotanker.src,
    kc46: kc46Pegasus.src,
  },
  spaceForce: {
    launch: spaceForceLaunch.src,
    earth: globalLeadership.src,
    earthNight: homeUsaAtNightFromSpace.src,
    spacex: homeSpacexLaunch.src,
    sputnik: spaceForceSputnik.src,
    afscLogo: spaceForceAfscLogo.src,
    gpsEarth: spaceForceGpsEarth.src,
    launchPoster: spaceForceLaunchPoster.src,
    guardiansPoster: spaceForceGuardiansPoster.src,
    spoc: "/images/military/spaceforce/spoc_command_center.png",
    ssc: "/images/military/spaceforce/ssc_clean_room.png",
    starcom: "/images/military/spaceforce/starcom_simulator.png",
    jointComponents: "/images/military/spaceforce/joint_components_map.png",
    gpsOrbit: "/images/military/spaceforce/gps_satellite_orbit.png",
    missileWarning: "/images/military/spaceforce/missile_warning_sat.png",
    protectedSatcom: "/images/military/spaceforce/protected_satcom_orbit.png",
    spaceDomainRadar: "/images/military/spaceforce/space_domain_radar.png",
    nationalSecurityLaunch: "/images/military/spaceforce/national_security_launch.png",
  },
  intelligence: {
    cia: ciaSeal.src,
    nsa: nsaSeal.src,
    nro: nroSeal.src,
    nga: ngaSeal.src,
    dia: diaSeal.src,
  },
  globalBases: {
    ramstein: baseRamstein.src,
    yokosuka: baseYokosuka.src,
    campHumphreys: baseCampHumphreys.src,
    diegoGarcia: baseDiegoGarcia.src,
    alUdeid: baseAlUdeid.src,
    rota: baseRota.src,
    andersen: baseAndersen.src,
    pituffik: basePituffik.src,
    lemonnier: baseLemonnier.src,
    norfolk: baseNorfolk.src,
    lakenheath: baseLakenheath.src,
    aviano: baseAviano.src,
    spangdahlem: baseSpangdahlem.src,
    bahrain: baseBahrain.src,
    alDhafra: baseAlDhafra.src,
    aliAlSalem: baseAliAlSalem.src,
    sigonella: baseSigonella.src,
    manta: baseManta.src,
    guantanamo: baseGuantanamo.src,
    eielson: baseEielson.src,
    clear: baseClear.src,
    fortLiberty: baseFortLiberty.src,
    kadena: baseKadena.src,
  },
  culture: {
    hollywoodSign: cultureHollywoodSign.src,
    hollywoodPalms: cultureHollywoodPalms.src,
    chicagoTheatre: cultureChicagoTheatre.src,
    burger: cultureBurger.src,
    burgerFries: cultureBurgerFries.src,
    jazzClub: cultureJazzClub.src,
    concertCrowd: cultureConcertCrowd.src,
    guitarNeon: cultureGuitarNeon.src,
    guitarFlat: cultureGuitarFlat.src,
    route66: cultureRoute66.src,
    melsDriveIn: cultureMelsDriveIn.src,
    flosV8: cultureFlosV8.src,
    classicCar: cultureClassicCar.src,
    timesSquare: cultureTimesSquare.src,
    mcDonalds: cultureMcDonalds.src,
    disneyWorld: cultureDisneyWorld.src,
    nflStadium: cultureNflStadium.src,
    baseballPark: cultureBaseballPark.src,
    cowboysStadium: cultureCowboysStadium.src,
    statueOfLiberty: cultureStatueOfLiberty.src,
  },
} as const;
