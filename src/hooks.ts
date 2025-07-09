import React, { useContext, useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import { useLocation, matchPath, useParams, generatePath } from "react-router-dom";
import * as L from "leaflet";
import * as Types from "./index.d";
import * as Contexts from "./Contexts";
import * as Constants from "./constants";

const propertiesDataCache = new Map<"properties", Types.Feature[]>();
const inFlightPropertyRequest = new Map<"properties", Promise<Types.Feature[]>>();
const citiesDataCache = new Map<"cities", Types.CityFeature[]>();
const inFlightCitiesRequest = new Map<"cities", Promise<Types.CityFeature[]>>();
const hexbinsDataCache = new Map<number, Types.H3HexFeature[]>();
const inFlightHexbinRequest = new Map<number, Promise<Types.H3HexFeature[]>>();

const loadedHexPropertiesCache = new Map<string, Types.Feature[]>();
const inFlightHexPropertiesRequests = new Map<string, Promise<Types.Feature[]>>();

function bboxForHex(hexbin: GeoJSON.Feature): L.LatLngBounds {
  // reuse cached bbox if present
  if ((hexbin as any)._bbox) return (hexbin as any)._bbox;

  let minLat = 90,
    minLng = 180;
  let maxLat = -90,
    maxLng = -180;

  // works for Polygon; if MultiPolygon flatten first
  for (const [lng, lat] of (hexbin.geometry as any).coordinates[0]) {
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
  }

  const bbox = L.latLngBounds(
    [minLat, minLng], // south-west
    [maxLat, maxLng] // north-east
  );
  (hexbin as any)._bbox = bbox; // cache on the feature
  return bbox;
}

/**
 * Get the selected section (e.g. map, areadescriptions, introduction) from the url
 * @returns The area of the site being viewed or undefined for the index
 */
export function useSelectedProperty() {
  const { pathname } = useLocation();
  const selectedVizMatch = matchPath("/:selectedProperty/*", pathname);
  return selectedVizMatch ? selectedVizMatch.params.selectedProperty : undefined;
}

export const useURLState = () => {
  const { hash, pathname } = useLocation();
  const { selectedProperty } = useParams();

  return useMemo(() => {
    const defaultState: Types.URLState = {
      hash,
      pathname,
      selectedProperty,
      center: [40, -95] as [number, number],
      zoom: 0,
      mapview: "race",
      hideCensusTracts: false,
    };

    if (!hash) return defaultState;

    const hashPairs = hash
      .replace(/^.*#/, "")
      .split("&")
      .reduce<Record<string, string>>((acc, pair) => {
        const [key, value] = pair.split("=");
        if (key && value) acc[key] = value;
        return acc;
      }, {});

    return {
      ...defaultState,
      zoom: hashPairs["loc"] ? parseInt(hashPairs["loc"].split("/")[0], 10) || 0 : defaultState.zoom,
      center: hashPairs["loc"] ? (hashPairs["loc"].split("/").slice(1, 3).map(parseFloat) as [number, number]) : defaultState.center,
      mapview: hashPairs["mv"] === "income" ? "income" : defaultState.mapview,
      hideCensusTracts: hashPairs["censusTracts"] === "hide",
    };
  }, [hash, pathname, selectedProperty]);
};

const useFetchGeoJSON = <T>(url: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ type: "FeatureCollection"; features: T[] }>(url);
        setData(response.data.features);
      } catch (error) {
        console.error(`Error fetching ${url}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading };
};

export function useProperties() {
  const { center, zoom } = useURLState();
  const [data, setData] = useState<Types.Feature[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { map } = useMapContext();

  useEffect(() => {
    if (!map) return;
    setLoading(true);

    const bounds = map.getBounds();
    const west = bounds.getWest();
    const south = bounds.getSouth();
    const east = bounds.getEast();
    const north = bounds.getNorth();

    // go through the hexLookup to find the hexes that intersect with the bounds
    const visibleHexes = Constants.hexLookups.filter(hex => {
      const [minLat, minLng] = hex.bbox[0];
      const [maxLat, maxLng] = hex.bbox[1];
      return !(minLng > east || maxLng < west || minLat > north || maxLat < south);
    });

    const visibleHexFiles = visibleHexes.map(hex => hex.file);

    // 3. For each hex index, either get from cache, or kick off a fetch
    const fetches = visibleHexFiles.map((hex) => {
      // already loaded?
      if (loadedHexPropertiesCache.has(hex)) {
        return Promise.resolve(loadedHexPropertiesCache.get(hex)!);
      }
      // already fetching?
      if (inFlightHexPropertiesRequests.has(hex)) {
        return inFlightHexPropertiesRequests.get(hex)!;
      }
      // kick off fetch
      const req = axios
        .get<{ type: "FeatureCollection"; features: Types.Feature[] }>(
          `/points/${hex}`
        )
        .then((res) => {
          const feats = res.data.features;
          loadedHexPropertiesCache.set(hex, feats);
          inFlightHexPropertiesRequests.delete(hex);
          return feats;
        })
        // @ts-ignore
        .catch((err) => {
          inFlightHexPropertiesRequests.delete(hex);
          console.error(`Failed to load hex ${hex}:`, err);
          return [];
        });

      inFlightHexPropertiesRequests.set(hex, req);
      return req;
    });

    // 4. Wait for _all_ the needed bins, then aggregate & filter
    Promise.all(fetches)
      .then((arraysOfFeatures) => {
        const all = arraysOfFeatures.flat();

        setData(
          all
            .filter(
              (property) =>
                property.properties.mortgages.length > 0 &&
                property.properties.mortgages[0].proj_num
          )
            // sort by units descending
            .sort((a, b) => {
              const aUnits = (a.properties.mortgages.length > 0)
                ? a.properties.mortgages.reduce((sum: number, m: typeof a.properties.mortgages[0]) => sum + (m.units || 0), 0)
                : 0;
              const bUnits = (b.properties.mortgages.length > 0)
                ? b.properties.mortgages.reduce((sum: number, m: typeof b.properties.mortgages[0]) => sum + (m.units || 0), 0)
                : 0;
              return bUnits - aUnits;
            })
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [map, center[0], center[1], zoom]);

  return { data, loading };
}

export function useHexbins(zoom: number) {
  const [data, setData] = useState<Types.H3HexFeature[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (hexbinsDataCache.has(zoom)) {
      setData(hexbinsDataCache.get(zoom)!);
      setLoading(false);
      return;
    }
    setLoading(true);

    const fetchData = () => {
      if (inFlightHexbinRequest.has(zoom)) {
        // If a request is already in progress, reuse it.
        return inFlightHexbinRequest.get(zoom)!;
      }

      const request = axios.get<{ type: "FeatureCollection"; features: Types.H3HexFeature[] }>(`/hexbins/h3_hexbin_zoom_${zoom}.geojson`).then(response => {
        // Cache the response data
        hexbinsDataCache.set(zoom, response.data.features);
        inFlightHexbinRequest.delete(zoom); // Clear the in-flight request
        return response.data.features;
      });

      inFlightHexbinRequest.set(zoom, request);
      setLoading(true);
      return request;
    };

    fetchData()
      .then(data => {
        if (data) {
          setData(data);
          setLoading(false);
        }
      })
      .catch(error => {
        console.error(`Error fetching hexbins for zoom ${zoom}:`, error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [zoom]);

  return { data, loading };
}

export function useNoAddressProperties() {
  const [data, setData] = useState<Types.NoAddressFeature[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get<{ type: "FeatureCollecton"; features: Types.NoAddressFeature[] }>(`/no_addresses.geojson`);

        setData(response.data.features);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProperties();
  }, []);

  return { data, loading };
}

export function useClusteredProperties() {
  const [data, setData] = useState<Types.ClusteredProperties[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get<{ type: "FeatureCollecton"; features: Types.ClusteredProperties[] }>(`/clustered_points.geojson`);

        setData(response.data.features);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProperties();
  }, []);

  return { data, loading };
}

export function useCities() {
  const [data, setData] = useState<Types.CityFeature[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (citiesDataCache.has("cities")) {
      setData(citiesDataCache.get("cities")!);
      setLoading(false);
      return;
    }
    setLoading(true);

    const fetchProperties = () => {
      if (inFlightCitiesRequest.has("cities")) {
        // If a request is already in progress, reuse it.
        return inFlightCitiesRequest.get("cities")!;
      }
      const request = axios.get<{ type: "FeatureCollecton"; features: Types.CityFeature[] }>(`/cities.geojson`).then(response => {
        // Cache the response data
        citiesDataCache.set("cities", response.data.features);
        inFlightCitiesRequest.delete("cities"); // Clear the in-flight request
        return response.data.features;
      });

      inFlightCitiesRequest.set("cities", request);
      return request;
    };

    fetchProperties()
      .then(data => {
        if (data) {
          setData(data);
          setLoading(false);
        }
      })
      .catch(error => {
        console.error(`Error fetching cities:`, error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading };
}

export function useCitiesOptions() {
  interface GroupedOption {
    label: string; // The group label (e.g., state name)
    options: Option[]; // The array of selectable items (cities in this case)
  }

  interface Option {
    label: string; // The city name
    value: string; // Any unique identifier (we’ll use a link in this case)
    geometry: {
      type: "Polygon"; // The geometry type is a Polygon representing the bounding box
      coordinates: number[][][]; // The coordinates of the polygon
    }; // The geometry of the city
  }

  const { data } = useCities();
  const [groupedOptions, setGroupedOptions] = useState<GroupedOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  function prepareMenuData(features: Types.CityFeature[]): GroupedOption[] {
    // Organize features by state
    const groupedByState = features.reduce<Record<string, Option[]>>((acc, feature) => {
      const { property_city, property_state } = feature.properties;
      const [lng, lat] = feature.geometry.coordinates[0][0]; // Approx center of the bounding box
      // @ts-ignore
      const state = Constants.states[property_state] as string;

      // Create a link for the city
      const link = `/map#loc=14/${lat}/${lng}`;

      // Add the city as an option
      const option: Option = {
        label: property_city,
        value: link,
        geometry: feature.geometry,
      };

      // Group by state
      if (!acc[state]) {
        acc[state] = [];
      }
      acc[state].push(option);

      return acc;
    }, {});

    // Convert grouped data into an array of GroupedOption objects
    return Object.entries(groupedByState)
      .map(([state, options]) => ({
        label: state, // State name as the group label
        options: options.sort((a, b) => a.label.localeCompare(b.label)), // Sort cities alphabetically
      }))
      .sort((a, b) => a.label.localeCompare(b.label)); // Sort states alphabetically
  }

  useEffect(() => {
    if (data) {
      setGroupedOptions(prepareMenuData(data));
      setLoading(false);
    }
  }, [data]);

  return { groupedOptions, loading };
}

export function useVisibleProperties() {
  const { data } = useProperties();
  const { center, zoom } = useURLState();
  const { map } = useMapContext();

  return useMemo(() => {
    if (!map) return [];

    const bounds = map.getBounds();
    return data.filter(property => bounds.contains([property.geometry.coordinates[1], property.geometry.coordinates[0]]));
  }, [center, zoom, map, data]);
}

export function useVisibleHexbins() {
  const { center, zoom } = useURLState();
  const { data } = useHexbins(zoom);
  const { map } = useMapContext();
  return useMemo(() => {
    if (!map) return [];

    const bounds = map.getBounds();
    return data.filter(hex => bounds.intersects(bboxForHex(hex)));
  }, [center, zoom, map, data]);
}

export function useVisibleNoAddressProperties() {
  const { data } = useNoAddressProperties();
  const { center, zoom } = useURLState();
  const { map } = useMapContext();

  return useMemo(() => {
    if (!map) return [];

    const bounds = map.getBounds();
    return data.filter(property => bounds.contains([property.geometry.coordinates[1], property.geometry.coordinates[0]]));
  }, [center, zoom, map, data]);
}

export function useCityStats(): Types.CityStats[] {
  const visibleProperties = useVisibleProperties(); // Properties with addresses
  const noAddressProperties = useVisibleNoAddressProperties(); // Properties without addresses

  const cityStats = useMemo(() => {
    const cityMap = new Map<string, Types.CityStats>();

    // Helper function to add a property to the cityMap
    const addProperty = (city: string, state: string, property: Types.CityProperty) => {
      const key = `${city}, ${state}`;
      if (!cityMap.has(key)) {
        cityMap.set(key, { city: key, complexes: 0, totalUnits: 0, totalAmount: 0, properties: [] });
      }

      const stats = cityMap.get(key)!;
      stats.complexes += 1;
      stats.totalUnits += property.units;
      stats.totalAmount += property.amount;
      stats.properties.push(property);
    };

    // Process properties **with addresses**
    visibleProperties.forEach(property => {
      const city = property.properties.property_city?.trim();
      const state = property.properties.property_state?.trim();
      if (!city || !state) return; // Exclude "Unknown"

      if (!property.properties.mortgages || property.properties.mortgages.length === 0) return; // Skip properties without mortgages

      // aggregate mortgages for properties with addresses to calculate amount and units
      const mortgageAmounts = property.properties.mortgages.reduce((acc, mortgage) => {
        acc.amount += mortgage.amount || 0;
        acc.units += mortgage.units || 0;
        return acc;
      }, { amount: 0, units: 0 });

        addProperty(city, state, {
          hasAddress: true,
          name: property.properties.mortgages[0].name || "Unknown",
          units: mortgageAmounts.units,
          amount: mortgageAmounts.amount,
          proj_num: property.properties.mortgages[0].proj_num,
          white_pop: property.properties.white_pop,
          black_pop: property.properties.black_pop,
          other_pop: property.properties.other_pop,
          median_income: property.properties.median_income,
      });
    });

    // Process properties **without addresses**
    noAddressProperties.forEach(location => {
      const city = location.properties.city?.trim();
      const state = location.properties.state?.trim();
      if (!city || !state) return; // Exclude "Unknown"

      location.properties.properties.forEach(property => {
        addProperty(city, state, {
          hasAddress: false,
          amount: property.amount || 0,
          units: property.units,
          proj_num: property.proj_num,
          name: property.name || "Unknown",
        });
      });
    });

    // Convert map to array and sort
    return Array.from(cityMap.values())
      .map(stats => ({
        ...stats,
        properties: stats.properties.sort((a, b) => b.amount - a.amount), // Sort properties by mortgage amount (desc)
      }))
      .sort((a, b) => b.complexes - a.complexes); // Sort cities by number of complexes (desc)
  }, [visibleProperties, noAddressProperties]);

  return cityStats;
}

export function useVisiblePropertiesStats() {
  const visibleProperties = useVisibleProperties();

  return useMemo(() => {
    if (!visibleProperties.length) {
      return { totalUnits: 0, totalProjects: 0, maxIncome: 0, maxUnits: 0 };
    }

    return {
      totalUnits: visibleProperties.reduce((acc, property) => acc + property.properties.mortgages.reduce((units, mortgage) => units + mortgage.units, 0), 0),
      totalProjects: visibleProperties.length,
      maxIncome: Math.max(...visibleProperties.map(property => property.properties.median_income || 0)),
      maxUnits: Math.max(...visibleProperties.map(property => property.properties.mortgages.reduce((units, mortgage) => units + mortgage.units, 0))),
    };
  }, [visibleProperties]);
}

export function useVisibleClusteredProperties() {
  const { data: properties } = useClusteredProperties();
  const { center, zoom } = useURLState();
  const { map } = useMapContext();

  return useMemo(() => {
    if (!map) return [];

    // const bounds = map.getBounds();
    return properties.filter(property => property.properties.zoom === Math.max(5, zoom));
  }, [center, zoom, map, properties]);
}

export function useSelectedPropertyData() {
  const { selectedProperty } = useURLState();
  const { data } = useProperties();

  if (!selectedProperty) return undefined;
  return data.find(property => property.properties.mortgages.length > 0 && property.properties.mortgages.some(d => d?.proj_num === parseInt(selectedProperty)));
}

export function useCensusTracts() {
  const [censusTracts, setCensusTracts] = useState<Types.CensusFeature[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // keep track of the counties that have been loaded; the value is equal to the first 8 characters of the gisjoin of tracts
  const [loadedCounties, setLoadedCounties] = useState<string[]>([]);
  const { map } = useMapContext();
  const { center, zoom } = useURLState();

  const bounds = map ? map.getBounds() : null;

  useEffect(() => {
    if (!bounds) return;

    const visibleCounties = Constants.census_tract_bbs.filter(tract => bounds.intersects(new L.LatLngBounds(tract.bbox)));

    // if every value in visibleTracts is in loadedTracts and vice versa, then we don't need to do anything
    if (visibleCounties.every(county => loadedCounties.includes(county.gisjoin)) && loadedCounties.every(gisjoin => visibleCounties.map(tract => tract.gisjoin).includes(gisjoin))) {
      setLoading(false);
      return;
    }

    // otherwise, make a list of still visible counties, no longer visible counties, and new counties to load
    const toLoad = visibleCounties.filter(tract => !loadedCounties.includes(tract.gisjoin));

    // prioritize loading new tracts
    if (toLoad.length > 0) {
      const fetchTracts = async () => {
        try {
          const tractPromises = toLoad.map(tract => axios.get<{ type: "FeatureCollection"; features: Types.CensusFeature[] }>(`/censustracts/${tract.gisjoin}.geojson`));
          const tractResponses = await Promise.all(tractPromises);
          const tractData = tractResponses.flatMap(response => response.data.features);

          // Append new tracts using functional updates
          setCensusTracts(prev => [...prev, ...tractData]);
          setLoadedCounties(prev => [...prev, ...toLoad.map(tract => tract.gisjoin)]);
          setLoading(false);
        } catch (error) {
          console.error("Error loading census tracts:", error);
          setLoading(false);
        }
      };

      fetchTracts();
    } else {
      // check if there are tracts that are no longer visible and remove them
      const toRemove = loadedCounties.filter(gisjoin => !visibleCounties.map(county => county.gisjoin).includes(gisjoin));
      if (toRemove.length > 0) {
        setCensusTracts(prev => prev.filter(tract => !toRemove.includes(tract.properties.gisjoin.slice(0, 8))));
        setLoadedCounties(prev => prev.filter(gisjoin => !toRemove.includes(gisjoin)));
      }

      // if there are no new tracts to load, then just set loading to false

      setLoading(false);
    }
  }, [map, loadedCounties, center, zoom]); // <-- Include loadedTracts so it re-checks after updates

  return { censusTracts, loading };
}

export const useMapContext = () => useContext(Contexts.MapStateContext);

export const useDimensions = () => {
  const getDeviceType = (width: number): "mobile" | "tablet" | "desktop" => {
    if (width < Constants.sizes.tablet) return "mobile";
    if (width >= Constants.sizes.tablet && width < Constants.sizes.desktop) return "tablet";
    return "desktop";
  };

  const [viewport, setViewport] = useState(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const device = getDeviceType(width);
    return { width, height, device };
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const device = getDeviceType(width);
      setViewport({ width, height, device });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return viewport;
};


// routeParams.ts
export type RouteParams = {
  home: void;                                   // no params
  map: { selectedProperty?: string | number }; // same name as in template
  sources: void;
  citing: void;
  data: void;
  stories: void;
  acknowledgments: void;
};

export function useLinkBuilder() {
  /**
   * Build a pathname, then (optionally) tack on search & hash.
   */
  const build = useCallback(
    <
      R extends keyof typeof Constants.ROUTES
    >(
      route: R,
      params?: RouteParams[R],
      hash?: string
    ) => {
      // 1. Fill in any :params in the template
      let path = generatePath(Constants.ROUTES[route], params as any);

      return {
        pathname: path,
        hash: hash ? hash : "",
      }
    },
    []
  );

  return build;
}

