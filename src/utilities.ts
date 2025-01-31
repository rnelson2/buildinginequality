import * as Types from './index.d';
import { scaleLinear } from 'd3';

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
const colorScale = scaleLinear<string>().domain([0, 0.5, 1]).range(["#802380", "#777777", "#239923"]);

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