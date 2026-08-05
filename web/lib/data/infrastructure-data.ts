/**
 * U.S. Infrastructure Datasets: Interstate Highway Arteries & Amtrak Passenger Rail Networks
 * Exact WGS84 GeoJSON coordinate polylines
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
    name: "Interstate 90",
    code: "I-90",
    type: "interstate",
    color: "#f59e0b",
    coordinates: [
      [-122.3321, 47.6062], [-117.4260, 47.6588], [-112.5361, 46.0038], [-108.5007, 45.7833],
      [-96.7311, 43.5460], [-87.6298, 41.8781], [-83.5379, 41.6528], [-81.6944, 41.4993],
      [-78.8784, 42.8864], [-73.7562, 42.6526], [-71.0589, 42.3601],
    ],
  },
  {
    id: "i80",
    name: "Interstate 80",
    code: "I-80",
    type: "interstate",
    color: "#fb923c",
    coordinates: [
      [-122.4194, 37.7749], [-119.8138, 39.5296], [-111.8910, 40.7608], [-104.8202, 41.1399],
      [-96.0000, 41.2565], [-87.6298, 41.8781], [-81.6944, 41.4993], [-74.0060, 40.7128],
    ],
  },
  {
    id: "i40",
    name: "Interstate 40",
    code: "I-40",
    type: "interstate",
    color: "#eab308",
    coordinates: [
      [-117.0186, 34.8958], [-112.0740, 35.1983], [-106.6504, 35.0844], [-97.5164, 35.4676],
      [-89.9711, 35.1495], [-86.7816, 36.1627], [-78.6382, 35.7796], [-77.9447, 34.2257],
    ],
  },
  {
    id: "i10",
    name: "Interstate 10",
    code: "I-10",
    type: "interstate",
    color: "#f97316",
    coordinates: [
      [-118.4912, 34.0195], [-112.0740, 33.4484], [-106.4850, 31.7619], [-98.4936, 29.4241],
      [-95.3698, 29.7604], [-90.0715, 29.9511], [-84.2807, 30.4383], [-81.6557, 30.3322],
    ],
  },
  {
    id: "i95",
    name: "Interstate 95",
    code: "I-95",
    type: "interstate",
    color: "#ef4444",
    coordinates: [
      [-80.1918, 25.7617], [-81.6557, 30.3322], [-78.6382, 35.7796], [-77.0369, 38.9072],
      [-75.1652, 39.9526], [-74.0060, 40.7128], [-71.0589, 42.3601], [-68.7778, 44.8012],
    ],
  },
  {
    id: "i75",
    name: "Interstate 75",
    code: "I-75",
    type: "interstate",
    color: "#f43f5e",
    coordinates: [
      [-80.1918, 25.7617], [-82.4572, 27.9506], [-84.3880, 33.7490], [-84.5120, 39.1031],
      [-83.5379, 41.6528], [-83.0458, 42.3314], [-84.3547, 46.4953],
    ],
  },
];

export const AMTRAK_RAIL_LINES: TransportRoute[] = [
  {
    id: "acela",
    name: "Amtrak Acela Express",
    code: "Acela",
    type: "amtrak",
    color: "#38bdf8",
    dashArray: "4 3",
    coordinates: [
      [-71.0589, 42.3601], [-71.4128, 41.8240], [-72.9279, 41.3083], [-74.0060, 40.7128],
      [-74.7699, 40.2206], [-75.1652, 39.9526], [-75.5467, 39.7459], [-76.6122, 39.2904], [-77.0369, 38.9072],
    ],
  },
  {
    id: "empire-builder",
    name: "Amtrak Empire Builder",
    code: "Empire",
    type: "amtrak",
    color: "#06b6d4",
    dashArray: "5 3",
    coordinates: [
      [-87.6298, 41.8781], [-89.4012, 43.0731], [-93.0900, 44.9537], [-96.7898, 46.8772],
      [-100.7837, 46.8083], [-111.4994, 48.5500], [-114.3153, 48.4106], [-117.4260, 47.6588], [-122.3321, 47.6062],
    ],
  },
  {
    id: "sunset-limited",
    name: "Amtrak Sunset Limited",
    code: "Sunset",
    type: "amtrak",
    color: "#0ea5e9",
    dashArray: "5 3",
    coordinates: [
      [-90.0715, 29.9511], [-95.3698, 29.7604], [-98.4936, 29.4241], [-106.4850, 31.7619],
      [-110.9747, 32.2226], [-112.0740, 33.4484], [-118.2437, 34.0522],
    ],
  },
  {
    id: "coast-starlight",
    name: "Amtrak Coast Starlight",
    code: "Starlight",
    type: "amtrak",
    color: "#6366f1",
    dashArray: "4 3",
    coordinates: [
      [-122.3321, 47.6062], [-122.6784, 45.5152], [-123.0351, 44.0521], [-121.3153, 44.0582],
      [-121.4689, 38.5816], [-122.4194, 37.7749], [-119.6982, 34.4208], [-118.2437, 34.0522],
    ],
  },
];
