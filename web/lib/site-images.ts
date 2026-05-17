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
import homeNycSunset from "@/IMAGES/Cities/New York Skyline at sunset.jpg";
import homeNycSkyline from "@/IMAGES/Cities/Manhattan One World Trade Center Close-up.jpg";
import homeDeclarationIndependence from "@/IMAGES/Constitution/usa-independence-day-concept-with-declaration-independence.jpg";
import constitutionDocument from "@/IMAGES/Constitution/We The People Wooden Background.jpg";
import cultureFlagCrowd from "@/IMAGES/Culture/Statue Of Liberty.jpg";
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
import yellowstonePrismatic from "@/IMAGES/Landscapes/yellowstone-grand-prismatic-spring-sunset.jpg";
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
import b2Hero from "@/IMAGES/Military/Air Force/us-air-force-b2-spirit-maintenance.jpg";
import abramsTank from "@/IMAGES/Military/Army/us-army-abrams-tank-desert.jpg";
import f22Raptor from "@/IMAGES/Military/Air Force/us-air-force-f22-raptor-close.jpg";
import autonomousDrone from "@/IMAGES/Military/Air Force/us-air-force-yfq42a-drone-runway.jpg";
import aircraftCarrierFlightDeck from "@/IMAGES/Military/Navy/us-navy-aircraft-carrier-flight-deck.jpg";
import fa18Landing from "@/IMAGES/Military/Navy/us-navy-fa18f-super-hornet-landing.jpg";
import ticonderogaCruiser from "@/IMAGES/Military/Navy/us-navy-ticonderoga-cruiser-san-diego.jpg";
import carrierStrikeGroupFormation from "@/IMAGES/Military/Navy/us-navy-carrier-strike-group-formation.jpg";
import spaceForceLaunch from "@/IMAGES/Military/Space Force/us-space-force-falcon9-launch.jpg";
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

import carrierStrikeGroupLogo from "@/ASSETS/Military/Carrier Strike Group Logo Dark.png";

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
  fa18Landing: fa18Landing.src,
  ticonderogaCruiser: ticonderogaCruiser.src,
  spaceForceLaunch: spaceForceLaunch.src,
  ac130Ghostrider: ac130Ghostrider.src,
  f22Formation: f22Formation.src,
  airForcePersonnel: airForcePersonnel.src,
  c130Takeoff: c130Takeoff.src,
  soldierCloseUp: soldierCloseUp.src,
  soldierSaluting: soldierSaluting.src,
  f35Lightning: f35Lightning.src,
  geraldFordCarrier: geraldFordCarrier.src,
  ohioSubmarine: ohioSubmarine.src,
  minutemanLaunch: minutemanLaunch.src,
  cyberOps: cyberOps.src,
  marinesAssault: marinesAssault.src,
  socomOperators: socomOperators.src,

  // Military Nested (for specific page structures)
  military: {
    hero: b2Hero.src,
    carrier: geraldFordCarrier.src,
    carrierLogo: carrierStrikeGroupLogo.src,
    b2: b2Hero.src,
    satellite: globalLeadership.src,
    tacticalMap: tacticalWorldMap.src,
  },
  navy: {
    hero: geraldFordCarrier.src,
    flightDeck: aircraftCarrierFlightDeck.src,
    geraldFord: geraldFordCarrier.src,
    destroyer: ticonderogaCruiser.src,
    fa18Landing: fa18Landing.src,
    ohioSubmarine: ohioSubmarine.src,
    dualCarrier: navyHero.src,
    carrierFormation: carrierStrikeGroupFormation.src,
  },
} as const;
