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
import globalLeadership from "@/IMAGES/USA from Space/Planet Earth.jpg";
import homeUsaAtNightFromSpace from "@/IMAGES/USA from Space/USA at night from Space.jpg";
import homeAirForcePlane from "@/IMAGES/Military/Air Force/home-air-force-plane.jpg";
import homeSpacexLaunch from "@/IMAGES/Science/SpaceX launch.jpg";
import scienceLab from "@/IMAGES/Science/science-lab.jpg";
import homeSiliconValley from "@/IMAGES/Technology/macro of a silicon wafer.jpg";
import siliconValleyOffice from "@/IMAGES/Technology/Apple Headquarters.jpg";

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
  yellowstonePrismatic: yellowstonePrismatic.src,
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
} as const;
