import * as Types from './index.d';
import { scaleLinear, interpolateHcl } from 'd3';
import { scaleThreshold } from "d3-scale";

export function getBlueThresholdScale(maxUnits: number, steps: 5 | 7 | 9 = 7) {
  const colorRange = {
    5: ["#deebf7", "#9ecae1", "#6baed6", "#3182bd", "#08519c"],
    7: ["#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#084594"],
    9: ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"],
  }[steps];

  const binCount = colorRange.length;

  // Create evenly spaced bin edges (excluding 0 and maxUnits)
  const domain = Array.from({ length: binCount - 1 }, (_, i) =>
    Math.round(((i + 1) / binCount) * maxUnits)
  );

  const scale = scaleThreshold<number, string>()
    .domain(domain)
    .range(colorRange);

  return { scale, domain, range: colorRange };
}

export function getRedThresholdScale(maxUnits: number, steps: 5 | 7 | 9 = 7) {
  // colour ranges built around #D62424
  const colorRange = {
    5: ["#fee5d9", "#fcae91", "#fb6a4a", "#ef3b2c", "#d62424"],
    7: [
      "#fee5d9",
      "#fcbba1",
      "#fc9272",
      "#fb6a4a",
      "#ef3b2c",
      "#cb181d",
      "#d62424",
    ],
    9: [
      "#fff5f0",
      "#fee0d2",
      "#fcbba1",
      "#fc9272",
      "#fb6a4a",
      "#ef3b2c",
      "#d62424",
      "#a50f15",
      "#67000d",
    ],
  }[steps];


  const binCount = colorRange.length;

  // Create evenly spaced bin edges (excluding 0 and maxUnits)
  const domain = Array.from({ length: binCount - 1 }, (_, i) =>
    Math.round(((i + 1) / binCount) * maxUnits)
  );

  const scale = scaleThreshold<number, string>()
    .domain(domain)
    .range(colorRange);

  return { scale, domain, range: colorRange };
}

/**
 * Gets the hash from the url and parse it into a key-value object
 * @returns A key-value object
 */
export function parseHash(hash: string): Types.URLHash {
  const pairs = hash.replace(/^#\/?|\/$/g, '').split('&');
  const hashValues: Record<string, any> = {};
  pairs.forEach(pair => {
    if (pair.includes('=')) {
      const [key, value] = pair.split('=');
      hashValues[key] = value;
    }
  });
  return hashValues as Types.URLHash;
}

/**
 * A substitute for Object.keys() which returns the keys but with their types
 * @param o The object
 * @returns The object's keys typed
 */
export function getKeys<T extends {}>(o: T): Array<keyof T> {
  return <Array<keyof T>>Object.keys(o);
}

export const modifyHash = (hash: string, actions: Types.HashActions[]): string => {
  const pairs = hash.replace(/^#\/?|\/$/g, '').split('&');
  const hashValues: Record<string, any> = {};
  pairs.forEach(pair => {
    if (pair.includes('=')) {
      const [key, value] = pair.split('=');
      hashValues[key] = value;
    }
  });
  actions.forEach(action => {
    if (action.type === 'set_loc') {
      const center = action.payload.center.map(coord => Math.round(coord * 10000) / 10000);
      hashValues.loc = `${action.payload.zoom}/${center[0]}/${center[1]}`;
    }
    if (action.type === 'set_mapview') {
      hashValues.mv = (action.payload !== 'race') ? action.payload : null;
    }
    if (action.type === 'toggle_censusTracts') {
      hashValues.censusTracts = hashValues.censusTracts ? null : 'hide';
    }
  });

return getKeys(hashValues)
    .filter(key => hashValues[key] !== null)
    .map(key => `${key}=${hashValues[key]}`)
    .join('&');
}

// function for color 
//const colorScale = scaleLinear<string>().domain([0, 0.5, 1]).range(["#802380", "#777777", "#239923"]);

// const colorScale = scaleLinear<string>().domain([0, 0.25, 0.5, 0.75, 1]).range(['#732d82', '#5b65a5', '#a5a5a5', '#4f9fb5', '#00978f']);

export const colorScale = scaleLinear<string>()
  .domain([0, 0.5, 1])              // 0 = 100 % non-white, 1 = 100 % white
  .range(["#802380", "#d9d9d9", "#1D7E45"]) // purple → neutral → darker green
  .interpolate(interpolateHcl);      // keeps perceived lightness smooth

const incomeColorScale = (maxIncome: number) => {
  return scaleLinear<string>().domain([maxIncome, 1, 0]).range(["#0000ff", "#eeeeff", "#777777"])
};

export const getColor = (feature: { properties: { median_income?: number, white_pop?: number, black_pop?: number, other_pop?: number}}, mapview?: 'income' | 'race', options?: { maxIncome?: number }) => {
  if (mapview === 'income' && options?.maxIncome) {
    return incomeColorScale(options.maxIncome)(feature.properties.median_income || 0);
  }
  if (!feature.properties.white_pop && !feature.properties.black_pop && !feature.properties.other_pop) {
    return "#8B4513";
  }
  const white_pop = feature.properties.white_pop || 0;
  const black_pop = feature.properties.black_pop || 0;
  const other_pop = feature.properties.other_pop || 0;
  return colorScale(white_pop / (white_pop + black_pop + other_pop));
}


export function polygonToBounds(polygon: { type: "Polygon"; coordinates: [number, number][][]; }) {
  // Extract the coordinates from the polygon
  const coordinates = polygon.coordinates[0]; // Assuming it's a single polygon

  // Initialize min/max values
  let minLat = Infinity;
  let maxLat = -Infinity;
  let minLng = Infinity;
  let maxLng = -Infinity;

  // Loop through the points to find the bounding box
  coordinates.forEach(([lng, lat]) => {
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
  });

  // Return the bounds in Leaflet's format
  return [[minLat, minLng], [maxLat, maxLng]] as [[number, number], [number, number]];
}

export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(/\s+/) // splits on whitespace
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Converts a hex color to an RGBA string.
 * @param hex - The hex color string (e.g., "#ff5733" or "#f53").
 * @param opacity - The opacity value (0 to 1).
 * @returns The RGBA string (e.g., "rgba(255, 87, 51, 0.5)").
 */
export const hexToRgba = (hex: string, opacity: number): string => {
  // Expand shorthand hex format (e.g., "#f53" -> "#ff5533")
  let fullHex = hex.replace(/^#/, '');
  if (fullHex.length === 3) {
    fullHex = fullHex.split('').map((char) => char + char).join('');
  }

  // Parse RGB values
  const r = parseInt(fullHex.substring(0, 2), 16);
  const g = parseInt(fullHex.substring(2, 4), 16);
  const b = parseInt(fullHex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};