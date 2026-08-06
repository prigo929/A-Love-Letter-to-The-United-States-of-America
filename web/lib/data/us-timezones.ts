/**
 * U.S. Time Zone Data & High-Precision County FIPS Resolver
 * Implements real intra-state time zone splits (ID, OR, AZ non-DST, ND, SD, NE, KS, TX, MI, IN, KY, TN, FL, AK).
 * Matches standard US Time Zone map conventions (Reference: Image 1).
 */

export interface TimeZoneInfo {
  code: string;
  name: string;
  utcOffset: string;
  color: string;
  observesDst: boolean;
}

export const TIME_ZONES: Record<string, TimeZoneInfo> = {
  EDT: {
    code: "EDT",
    name: "Eastern Daylight Time",
    utcOffset: "UTC-4",
    color: "#dc2626", // Crimson Red
    observesDst: true,
  },
  CDT: {
    code: "CDT",
    name: "Central Daylight Time",
    utcOffset: "UTC-5",
    color: "#eab308", // Central Yellow / Gold
    observesDst: true,
  },
  MDT: {
    code: "MDT",
    name: "Mountain Daylight Time",
    utcOffset: "UTC-6",
    color: "#22c55e", // Mountain Green
    observesDst: true,
  },
  MST_AZ: {
    code: "MST",
    name: "Arizona Mountain Standard Time (No DST)",
    utcOffset: "UTC-7",
    color: "#15803d", // Darker Green (Hatched)
    observesDst: false,
  },
  PDT: {
    code: "PDT",
    name: "Pacific Daylight Time",
    utcOffset: "UTC-7",
    color: "#f97316", // Pacific Orange
    observesDst: true,
  },
  AKDT: {
    code: "AKDT",
    name: "Alaska Daylight Time",
    utcOffset: "UTC-8",
    color: "#0284c7", // Alaska Sky Blue
    observesDst: true,
  },
  HADT: {
    code: "HADT",
    name: "Aleutian Daylight Time",
    utcOffset: "UTC-9",
    color: "#0369a1", // Aleutian Deep Blue
    observesDst: true,
  },
  HST: {
    code: "HST",
    name: "Hawaii Standard Time (No DST)",
    utcOffset: "UTC-10",
    color: "#a855f7", // Hawaii Purple
    observesDst: false,
  },
};

// County FIPS exception overrides for intra-state time zone splits
const PACIFIC_COUNTY_FIPS = new Set([
  // Idaho Panhandle
  "16009", "16017", "16021", "16035", "16049", "16055", "16057", "16061", "16069", "16079",
]);

const MOUNTAIN_COUNTY_FIPS = new Set([
  // Oregon (Malheur)
  "41045",
  // Nevada (West Wendover / Elko East)
  "32007",
  // North Dakota West
  "38001", "38007", "38011", "38037", "38041", "38043", "38087", "38089", "38025", "38053", "38085",
  // South Dakota West (River Split)
  "46007", "46019", "46031", "46033", "46041", "46047", "46055", "46063", "46071", "46081", "46093", "46102", "46103", "46105", "46117", "46137",
  // Nebraska West
  "31005", "31007", "31013", "31029", "31031", "31033", "31045", "31049", "31057", "31069", "31075", "31091", "31101", "31105", "31123", "31135", "31161", "31165", "31171",
  // Kansas West
  "20023", "20071", "20075", "20181", "20203",
  // Texas West (El Paso & Hudspeth)
  "48141", "48229",
]);

const CENTRAL_COUNTY_FIPS = new Set([
  // Michigan Upper Peninsula West
  "26053", "26071", "26109", "26043",
  // Indiana Northwest & Southwest
  "18089", "18127", "18091", "18073", "18149", "18111", "18051", "18129", "18163", "18173", "18147", "18123",
  // Florida Panhandle
  "12005", "12013", "12033", "12045", "12059", "12063", "12091", "12113", "12131", "12133",
]);

// East Tennessee FIPS (Eastern Time)
const EAST_TENNESSEE_FIPS = new Set([
  "47001", "47009", "47011", "47013", "47025", "47029", "47041", "47057", "47063", "47065",
  "47067", "47089", "47091", "47093", "47105", "47107", "47115", "47121", "47123", "47129",
  "47139", "47143", "47145", "47151", "47153", "47155", "47163", "47171", "47173", "47179",
]);

// East Kentucky FIPS (Eastern Time)
const EAST_KENTUCKY_FIPS = new Set([
  "21011", "21013", "21017", "21019", "21023", "21025", "21033", "21037", "21041", "21045",
  "21049", "21051", "21053", "21061", "21063", "21065", "21067", "21069", "21071", "21073",
  "21077", "21079", "21081", "21089", "21095", "21097", "21099", "21103", "21109", "21111",
  "21113", "21115", "21117", "21119", "21121", "21123", "21125", "21127", "21129", "21131",
  "21133", "21135", "21137", "21147", "21151", "21153", "21155", "21159", "21163", "21165",
  "21167", "21171", "21173", "21175", "21181", "21185", "21187", "21189", "21191", "21193",
  "21195", "21197", "21199", "21201", "21203", "21205", "21207", "21209", "21211", "21215",
  "21223", "21229", "21231", "21235", "21237", "21239",
]);

export function getTimeZoneForLocation(params: {
  geoid?: string;
  stateAbbrev?: string;
  stateFips?: string;
}): TimeZoneInfo {
  const fips = params.geoid?.padStart(5, "0") || "";
  const stFips = params.stateFips ? params.stateFips.padStart(2, "0") : fips.slice(0, 2);
  const stAbbrev = params.stateAbbrev || "";

  // 1. County level overrides for intra-state splits
  if (fips) {
    if (stFips === "04") {
      // Arizona: Apache (04001), Navajo (04017), Coconino (04005) observe MDT in Navajo Nation
      if (fips === "04001" || fips === "04017") {
        return TIME_ZONES.MDT;
      }
      return TIME_ZONES.MST_AZ;
    }
    if (stFips === "02") {
      if (fips === "02016" || fips === "02013") return TIME_ZONES.HADT;
      return TIME_ZONES.AKDT;
    }
    if (PACIFIC_COUNTY_FIPS.has(fips)) return TIME_ZONES.PDT;
    if (MOUNTAIN_COUNTY_FIPS.has(fips)) return TIME_ZONES.MDT;
    if (CENTRAL_COUNTY_FIPS.has(fips)) return TIME_ZONES.CDT;
    if (stFips === "47" && EAST_TENNESSEE_FIPS.has(fips)) return TIME_ZONES.EDT;
    if (stFips === "21" && EAST_KENTUCKY_FIPS.has(fips)) return TIME_ZONES.EDT;
  }

  // 2. Default state-level assignment
  if (stAbbrev === "HI" || stFips === "15") return TIME_ZONES.HST;
  if (stAbbrev === "AK" || stFips === "02") return TIME_ZONES.AKDT;

  if (["WA", "OR", "CA", "NV"].includes(stAbbrev) || ["53", "41", "06", "32"].includes(stFips)) {
    return TIME_ZONES.PDT;
  }
  if (["AZ"].includes(stAbbrev) || stFips === "04") {
    return TIME_ZONES.MST_AZ;
  }
  if (["MT", "ID", "WY", "UT", "CO", "NM"].includes(stAbbrev) || ["30", "16", "56", "49", "08", "35"].includes(stFips)) {
    return TIME_ZONES.MDT;
  }
  if (
    ["ND", "SD", "NE", "KS", "OK", "TX", "MN", "IA", "MO", "AR", "LA", "WI", "IL", "MS", "AL"].includes(stAbbrev) ||
    ["38", "46", "31", "20", "40", "48", "27", "19", "29", "05", "22", "55", "17", "28", "01"].includes(stFips)
  ) {
    return TIME_ZONES.CDT;
  }

  // Eastern Time default for remaining states (MI, IN, OH, KY, TN, GA, FL, NC, SC, VA, WV, PA, NY, VT, NH, ME, MA, CT, RI, NJ, DE, MD)
  return TIME_ZONES.EDT;
}
