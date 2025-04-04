import React, { useContext, useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useLocation, matchPath, useParams } from "react-router-dom";
import * as L from 'leaflet';
import * as Types from './index.d';
import * as Contexts from './Contexts';
import * as Constants from './constants';

/**
 * Get the selected section (e.g. map, areadescriptions, introduction) from the url
 * @returns The area of the site being viewed or undefined for the index
 */
export function useSelectedProperty() {
  const { pathname } = useLocation();
  const selectedVizMatch = matchPath('/:selectedProperty/*', pathname);
  return (selectedVizMatch) ? selectedVizMatch.params.selectedProperty : undefined;
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

    const hashPairs = hash.replace(/^.*#/, "").split("&").reduce<Record<string, string>>((acc, pair) => {
      const [key, value] = pair.split("=");
      if (key && value) acc[key] = value;
      return acc;
    }, {});

    return {
      ...defaultState,
      zoom: hashPairs["loc"] ? parseInt(hashPairs["loc"].split("/")[0], 10) || 0 : defaultState.zoom,
      center: hashPairs["loc"]
        ? (hashPairs["loc"].split("/").slice(1, 3).map(parseFloat) as [number, number])
        : defaultState.center,
      mapview: hashPairs["mv"] === "income" ? "income" : defaultState.mapview,
      hideCensusTracts: hashPairs["censusTracts"] === "hide",
    };
  }, [hash, pathname, selectedProperty]);
};

const useFetchGeoJSON = <T,>(url: string) => {
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
  const [data, setData] = useState<Types.Feature[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get<{ type: 'FeatureCollecton'; features: Types.Feature[] }>(`/points.geojson`);

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

export function useNoAddressProperties() {
  const [data, setData] = useState<Types.NoAddressFeature[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get<{ type: 'FeatureCollecton'; features: Types.NoAddressFeature[] }>(`/no_addresses.geojson`);

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
        const response = await axios.get<{ type: 'FeatureCollecton'; features: Types.ClusteredProperties[] }>(`/clustered_points.geojson`);

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
    const fetchProperties = async () => {
      try {
        const response = await axios.get<{ type: 'FeatureCollecton'; features: Types.CityFeature[] }>(`/cities.geojson`);

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

export function useCitiesOptions() {
  interface GroupedOption {
    label: string;       // The group label (e.g., state name)
    options: Option[];   // The array of selectable items (cities in this case)
  }

  interface Option {
    label: string;       // The city name
    value: string;       // Any unique identifier (we’ll use a link in this case)
    geometry: {
      type: "Polygon";          // The geometry type is a Polygon representing the bounding box
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
    const fetchProperties = async () => {
      try {
        const response = await axios.get<{ type: 'FeatureCollecton'; features: Types.CityFeature[] }>(`/cities.geojson`);

        setGroupedOptions(prepareMenuData(response.data.features));
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProperties();
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
    return data.filter((property) =>
      bounds.contains([property.geometry.coordinates[1], property.geometry.coordinates[0]])
    );
  }, [center, zoom, map, data]);
}

export function useVisibleNoAddressProperties() {
  const { data } = useNoAddressProperties();
  const { center, zoom } = useURLState();
  const { map } = useMapContext();

  return useMemo(() => {
    if (!map) return [];

    const bounds = map.getBounds();
    return data.filter((property) =>
      bounds.contains([property.geometry.coordinates[1], property.geometry.coordinates[0]])
    );
  }, [center, zoom, map, data]);
}

export function useCityStats(): Types.CityStats[] {
  const visibleProperties = useVisibleProperties(); // Properties with addresses
  const noAddressProperties = useVisibleNoAddressProperties(); // Properties without addresses
  console.log(noAddressProperties);

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

      property.properties.mortgages.forEach((mortgage) => {
        addProperty(city, state, {
          hasAddress: true,
          name: mortgage.name || "Unknown",
          units: mortgage.units,
          amount: mortgage.amount,
          proj_num: mortgage.proj_num,
          white_pop: property.properties.white_pop,
          black_pop: property.properties.black_pop,
          other_pop: property.properties.other_pop,
          median_income: property.properties.median_income,
        });
      });
    });

    // Process properties **without addresses**
    noAddressProperties.forEach(property => {
      const city = property.properties.city?.trim();
      const state = property.properties.state?.trim();
      if (!city || !state) return; // Exclude "Unknown"

      property.properties.mortgages.forEach((mortgage) => {
        addProperty(city, state, {
          hasAddress: false,
          name: mortgage.name,
          amount: mortgage.amount,
          units: mortgage.units,
          proj_num: mortgage.proj_num,
        });
      });
    });

    // Convert map to array and sort
    return Array.from(cityMap.values())
      .map((stats) => ({
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
      totalUnits: visibleProperties.reduce((acc, property) =>
        acc + property.properties.mortgages.reduce((units, mortgage) => units + mortgage.units, 0), 0),
      totalProjects: visibleProperties.length,
      maxIncome: Math.max(...visibleProperties.map(property => property.properties.median_income || 0)),
      maxUnits: Math.max(...visibleProperties.map(property =>
        property.properties.mortgages.reduce((units, mortgage) => units + mortgage.units, 0))),
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
    return properties.filter(
      (property) => property.properties.zoom === Math.max(5, zoom) 
    );
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

    const visibleCounties = Constants.census_tract_bbs.filter((tract) =>
      bounds.intersects(new L.LatLngBounds(tract.bbox))
    );

    // if every value in visibleTracts is in loadedTracts and vice versa, then we don't need to do anything
    if (visibleCounties.every((county) => loadedCounties.includes(county.gisjoin)) &&
      loadedCounties.every((gisjoin) => visibleCounties.map((tract) => tract.gisjoin).includes(gisjoin))) {
      setLoading(false);
      return;
    }

    // otherwise, make a list of still visible counties, no longer visible counties, and new counties to load
    const toLoad = visibleCounties.filter((tract) => !loadedCounties.includes(tract.gisjoin));

    // prioritize loading new tracts
    if (toLoad.length > 0) {
      const fetchTracts = async () => {
        try {
          const tractPromises = toLoad.map((tract) =>
            axios.get<{ type: 'FeatureCollection'; features: Types.CensusFeature[] }>(
              `/censustracts/${tract.gisjoin}.geojson`
            )
          );
          const tractResponses = await Promise.all(tractPromises);
          const tractData = tractResponses.flatMap((response) => response.data.features);

          // Append new tracts using functional updates
          setCensusTracts((prev) => [...prev, ...tractData]);
          setLoadedCounties((prev) => [...prev, ...toLoad.map((tract) => tract.gisjoin)]);
          setLoading(false);
        } catch (error) {
          console.error('Error loading census tracts:', error);
          setLoading(false);
        }
      };

      fetchTracts();
    } else {
      // check if there are tracts that are no longer visible and remove them
      const toRemove = loadedCounties.filter((gisjoin) => !visibleCounties.map((county) => county.gisjoin).includes(gisjoin));
      if (toRemove.length > 0) {
        setCensusTracts((prev) => prev.filter((tract) => !toRemove.includes(tract.properties.gisjoin.slice(0, 8))));
        setLoadedCounties((prev) => prev.filter((gisjoin) => !toRemove.includes(gisjoin)));
      }

      // if there are no new tracts to load, then just set loading to false

      setLoading(false);
    }
  }, [map, loadedCounties, center, zoom]); // <-- Include loadedTracts so it re-checks after updates

  return { censusTracts, loading, };
}

export const useMapContext = () => useContext(Contexts.MapStateContext);


export const useDimensions = () => {
  const getDeviceType = (width: number): 'mobile' | 'tablet' | 'desktop' => {
    if (width < Constants.sizes.tablet) return 'mobile';
    if (width >= Constants.sizes.tablet && width < Constants.sizes.desktop) return 'tablet';
    return 'desktop';
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

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return viewport;
};
