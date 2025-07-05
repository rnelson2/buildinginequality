import type { extend, Map } from 'leaflet';

export interface Feature {
  type: "Feature";
  properties: {
    property_city: string | null;
    property_state: string | null;
    street: string | null;
    zip: string | null;
    gisjoin?: string;
    white_pop?: number;
    black_pop?: number;
    other_pop?: number;
    median_income?: number;
    mortgages: {
      name: string | null;
      holder_city: string | null;
      holder_name: string | null;
      holder_state: string | null;
      proj_num: number;
      amount: number;
      units: number;
      first_payment_date: null | {
        year: number;
        month: number;
        day: number;
      };
    }[]
  };
  geometry: { type: "Point"; coordinates: [number, number] };
}

export type HighlightedIdActions = {
  type: 'add_to_highlighted';
  payload: number;
} | {
  type: 'set_only_highlighted';
  payload: number;
} | {
  type: 'set_highlighted';
  payload: number[];
} | {
  type: 'remove_from_highlighted';
  payload: number;
} | {
  type: 'clear_highlighted';
};

export type MapState = {
  map: Map | undefined;
  setMap: React.Dispatch<React.SetStateAction<Map | undefined>>;
  highlightedIds: number[];
  addToHighlightedIds: (id: number) => void;
  setHighlightedIds: (id: number[]) => void;
  setOnlyHighlightedId: (id: number) => void;
  removeFromHighlightedIds: (id: number) => void;
  clearHighlightedIds: () => void;
};

export type URLParams = {
  selectedProperty?: string;
}

export interface URLHash {
  loc?: string | null;
  mv: 'income' | 'race';
  censusTracts?: 'hide';
}

export type Point = [number, number];

export type Bounds = [Point, Point];

export interface ZoomAndCenter {
  zoom: number;
  center: Point;
}

export interface URLState extends URLParams, ZoomAndCenter {
  hash: string;
  pathname: string;
  mapview: 'income' | 'race';
  hideCensusTracts: boolean;
}

export type HashActions = {
  type: 'set_loc';
  payload: {
    zoom: number;
    center: Point;
  };
} | {
  type: 'set_mapview';
  payload: 'race' | 'income';
} | {
  type: 'toggle_censusTracts';
};

interface Geometry {
  type: "Polygon" | "MultiPolygon";
  coordinates: number[][][] | number[][][][];
}

type CensusFeature = {
  type: "Feature";
  properties: {
    gisjoin: string;
    area: number;
    state: string;
    county: string;
    white_pop: number;
    black_pop: number;
    other_pop: number;
    median_income: number;
  };
  geometry: Geometry;
};


interface CityFeature {
  type: "Feature";
  geometry: {
    type: "Polygon";          // The geometry type is a Polygon representing the bounding box
    coordinates: number[][][]; // The coordinates of the polygon
  };
  properties: {
    property_city: string;       // City name
    property_state: string;      // State abbreviation
    num_of_properties: number;   // Number of properties in the city
    num_of_units: number;        // Total number of units across properties
    total_mortgage: number;      // Total mortgage amount
  }
}

// Feature properties for clustered points
interface ClusteredProperties {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: {
    zoom: number; // Zoom level for the cluster
    white_pop: number; // Aggregated white population
    black_pop: number; // Aggregated black population
    other_pop: number; // Aggregated other population
    median_income: number; // Averaged median income
    units: number | null; // Total number of units
  };
}

export interface NoAddressMortgage {
  proj_num: number;
  name: string;
  amount: number;
  units: number;
}

export interface NoAddressFeatureProperties {
  city: string;
  state: string;
  units: number;
  proj_num: number;
  name: string;
  amount: number;
}

export interface NoAddressFeature {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number]; // Longitude, Latitude
  };
  properties: NoAddressFeatureProperties;
}


interface CityProperty {
  hasAddress: boolean;
  name: string;
  units: number;
  amount: number;
  proj_num: number;
  white_pop?: number;
  black_pop?: number;
  other_pop?: number;
  median_income?: number;
}

interface CityStats {
  city: string;
  complexes: number;
  totalUnits: number;
  totalAmount: number;
  properties: CityProperty[];
}

export interface H3HexFeature {
  type: "Feature";
  properties: {
    h3_index: string;   // The H3 cell index (e.g., '85283473fffffff')
    units: number;      // Total apartment units in this hex
  };
  geometry: {
    type: "Polygon";
    coordinates: [number, number][][]; // GeoJSON: [lng, lat] for each ring
  };
}

export interface H3HexLookup {
  h3_index: string;   // The H3 cell index (e.g., '85283473fffffff')
  file: string;       // The filename where this hex's data is stored
  bbox: [[number, number], [number, number]]; // Bounding box: [[minLng, minLat], [maxLng, maxLat]]
  count: number;      // Number of features in this hex
}