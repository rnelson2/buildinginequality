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

export type MapState = {
  map: Map | undefined;
  setMap: React.Dispatch<React.SetStateAction<Map | undefined>>;
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