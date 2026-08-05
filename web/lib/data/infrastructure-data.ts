/**
 * U.S. Infrastructure Datasets: Transcontinental Interstate Highways & Amtrak Passenger Rail Lines
 * Exact Multi-Point WGS84 Polylines [Longitude, Latitude]
 */

export interface TransportRoute {
  id: string;
  name: string;
  code: string;
  type: "interstate" | "amtrak";
  color: string;
  dashArray?: string;
  coordinates: [number, number][]; // [longitude, latitude]
}

export const INTERSTATE_HIGHWAYS: TransportRoute[] = [
  {
    id: "i90",
    name: "Interstate 90 (Seattle to Boston)",
    code: "I-90",
    type: "interstate",
    color: "#f59e0b",
    coordinates: [
      [-122.3321, 47.6062], [-117.4260, 47.6588], [-112.5361, 46.0038], [-108.5007, 45.7833],
      [-104.0500, 44.3500], [-96.7311, 43.5460], [-93.2650, 44.9778], [-87.6298, 41.8781],
      [-83.5379, 41.6528], [-81.6944, 41.4993], [-78.8784, 42.8864], [-73.7562, 42.6526],
      [-71.0589, 42.3601],
    ],
  },
  {
    id: "i80",
    name: "Interstate 80 (San Francisco to New York City)",
    code: "I-80",
    type: "interstate",
    color: "#fb923c",
    coordinates: [
      [-122.4194, 37.7749], [-119.8138, 39.5296], [-114.9000, 40.8300], [-111.8910, 40.7608],
      [-104.8202, 41.1399], [-96.0000, 41.2565], [-91.5300, 41.6600], [-87.6298, 41.8781],
      [-81.6944, 41.4993], [-77.0000, 41.0000], [-74.0060, 40.7128],
    ],
  },
  {
    id: "i70",
    name: "Interstate 70 (Cove Fort to Baltimore)",
    code: "I-70",
    type: "interstate",
    color: "#fbbf24",
    coordinates: [
      [-112.5800, 38.6000], [-104.9903, 39.7392], [-94.5786, 39.0997], [-90.1994, 38.6270],
      [-86.1581, 39.7684], [-82.9988, 39.9612], [-79.9959, 40.4406], [-76.6122, 39.2904],
    ],
  },
  {
    id: "i40",
    name: "Interstate 40 (Barstow to Wilmington)",
    code: "I-40",
    type: "interstate",
    color: "#eab308",
    coordinates: [
      [-117.0186, 34.8958], [-112.0740, 35.1983], [-106.6504, 35.0844], [-101.8313, 35.2220],
      [-97.5164, 35.4676], [-89.9711, 35.1495], [-86.7816, 36.1627], [-83.9207, 35.9606],
      [-78.6382, 35.7796], [-77.9447, 34.2257],
    ],
  },
  {
    id: "i10",
    name: "Interstate 10 (Santa Monica to Jacksonville)",
    code: "I-10",
    type: "interstate",
    color: "#f97316",
    coordinates: [
      [-118.4912, 34.0195], [-112.0740, 33.4484], [-106.4850, 31.7619], [-98.4936, 29.4241],
      [-95.3698, 29.7604], [-91.1871, 30.4583], [-90.0715, 29.9511], [-84.2807, 30.4383],
      [-81.6557, 30.3322],
    ],
  },
  {
    id: "i95",
    name: "Interstate 95 (Miami to Houlton, Maine)",
    code: "I-95",
    type: "interstate",
    color: "#ef4444",
    coordinates: [
      [-80.1918, 25.7617], [-81.6557, 30.3322], [-81.0912, 32.0835], [-78.6382, 35.7796],
      [-77.4360, 37.5407], [-77.0369, 38.9072], [-75.1652, 39.9526], [-74.0060, 40.7128],
      [-71.0589, 42.3601], [-70.2558, 43.6615], [-68.7778, 44.8012], [-67.8400, 46.1200],
    ],
  },
  {
    id: "i75",
    name: "Interstate 75 (Miami to Sault Ste. Marie)",
    code: "I-75",
    type: "interstate",
    color: "#f43f5e",
    coordinates: [
      [-80.1918, 25.7617], [-82.4572, 27.9506], [-84.3880, 33.7490], [-84.1500, 35.9600],
      [-84.5120, 39.1031], [-83.5379, 41.6528], [-83.0458, 42.3314], [-84.3547, 46.4953],
    ],
  },
  {
    id: "i35",
    name: "Interstate 35 (Laredo to Duluth)",
    code: "I-35",
    type: "interstate",
    color: "#a855f7",
    coordinates: [
      [-99.5075, 27.5036], [-98.4936, 29.4241], [-97.7431, 30.2672], [-96.8088, 32.7767],
      [-97.5164, 35.4676], [-94.5786, 39.0997], [-93.6208, 41.5868], [-93.2650, 44.9778],
      [-92.1005, 46.7867],
    ],
  },
  {
    id: "i15",
    name: "Interstate 15 (San Diego to Sweet Grass)",
    code: "I-15",
    type: "interstate",
    color: "#38bdf8",
    coordinates: [
      [-117.1611, 32.7157], [-115.1398, 36.1699], [-111.8910, 40.7608], [-112.3000, 42.8700],
      [-112.5361, 46.0038], [-111.3000, 47.5000], [-111.9600, 48.9900],
    ],
  },
  {
    id: "i5",
    name: "Interstate 5 (San Diego to Blaine)",
    code: "I-5",
    type: "interstate",
    color: "#10b981",
    coordinates: [
      [-117.1611, 32.7157], [-118.2437, 34.0522], [-119.7871, 36.7468], [-121.4689, 38.5816],
      [-122.6784, 45.5152], [-122.3321, 47.6062], [-122.7500, 49.0000],
    ],
  },
];

export const AMTRAK_RAIL_LINES: TransportRoute[] = [
  {
    id: "acela",
    name: "Amtrak Acela Express (Boston - NYC - DC)",
    code: "Acela",
    type: "amtrak",
    color: "#38bdf8",
    dashArray: "4 3",
    coordinates: [
      [-71.0589, 42.3601], [-71.4128, 41.8240], [-72.9279, 41.3083], [-74.0060, 40.7128],
      [-74.7699, 40.2206], [-75.1652, 39.9526], [-75.5467, 39.7459], [-76.6122, 39.2904],
      [-77.0369, 38.9072],
    ],
  },
  {
    id: "empire-builder",
    name: "Amtrak Empire Builder (Chicago - Seattle)",
    code: "Empire",
    type: "amtrak",
    color: "#06b6d4",
    dashArray: "5 3",
    coordinates: [
      [-87.6298, 41.8781], [-89.4012, 43.0731], [-93.0900, 44.9537], [-96.7898, 46.8772],
      [-100.7837, 46.8083], [-111.4994, 48.5500], [-114.3153, 48.4106], [-117.4260, 47.6588],
      [-122.3321, 47.6062],
    ],
  },
  {
    id: "california-zephyr",
    name: "Amtrak California Zephyr (Chicago - SF)",
    code: "Zephyr",
    type: "amtrak",
    color: "#0ea5e9",
    dashArray: "5 3",
    coordinates: [
      [-87.6298, 41.8781], [-93.6208, 41.5868], [-96.0000, 41.2565], [-104.9903, 39.7392],
      [-111.8910, 40.7608], [-119.8138, 39.5296], [-121.4689, 38.5816], [-122.2711, 37.8044],
    ],
  },
  {
    id: "southwest-chief",
    name: "Amtrak Southwest Chief (Chicago - LA)",
    code: "Chief",
    type: "amtrak",
    color: "#0284c7",
    dashArray: "5 3",
    coordinates: [
      [-87.6298, 41.8781], [-94.5786, 39.0997], [-105.6836, 40.3428], [-106.6504, 35.0844],
      [-111.6513, 35.1983], [-117.0186, 34.8958], [-118.2437, 34.0522],
    ],
  },
  {
    id: "sunset-limited",
    name: "Amtrak Sunset Limited (New Orleans - LA)",
    code: "Sunset",
    type: "amtrak",
    color: "#38bdf8",
    dashArray: "5 3",
    coordinates: [
      [-90.0715, 29.9511], [-95.3698, 29.7604], [-98.4936, 29.4241], [-106.4850, 31.7619],
      [-110.9747, 32.2226], [-112.0740, 33.4484], [-118.2437, 34.0522],
    ],
  },
  {
    id: "coast-starlight",
    name: "Amtrak Coast Starlight (Seattle - LA)",
    code: "Starlight",
    type: "amtrak",
    color: "#6366f1",
    dashArray: "4 3",
    coordinates: [
      [-122.3321, 47.6062], [-122.6784, 45.5152], [-123.0351, 44.0521], [-121.3153, 44.0582],
      [-121.4689, 38.5816], [-122.4194, 37.7749], [-119.6982, 34.4208], [-118.2437, 34.0522],
    ],
  },
  {
    id: "texas-eagle",
    name: "Amtrak Texas Eagle (Chicago - San Antonio)",
    code: "Eagle",
    type: "amtrak",
    color: "#818cf8",
    dashArray: "5 3",
    coordinates: [
      [-87.6298, 41.8781], [-90.1994, 38.6270], [-92.2896, 34.7465], [-96.8088, 32.7767],
      [-97.7431, 30.2672], [-98.4936, 29.4241],
    ],
  },
  {
    id: "crescent",
    name: "Amtrak Crescent (NYC - Atlanta - New Orleans)",
    code: "Crescent",
    type: "amtrak",
    color: "#a855f7",
    dashArray: "5 3",
    coordinates: [
      [-74.0060, 40.7128], [-75.1652, 39.9526], [-77.0369, 38.9072], [-80.8431, 35.2271],
      [-84.3880, 33.7490], [-86.8025, 33.5186], [-90.0715, 29.9511],
    ],
  },
  {
    id: "silver-star",
    name: "Amtrak Silver Star (NYC - Miami)",
    code: "SilverStar",
    type: "amtrak",
    color: "#c084fc",
    dashArray: "4 3",
    coordinates: [
      [-74.0060, 40.7128], [-77.0369, 38.9072], [-78.6382, 35.7796], [-81.0912, 32.0835],
      [-81.6557, 30.3322], [-82.4572, 27.9506], [-80.1918, 25.7617],
    ],
  },
];
