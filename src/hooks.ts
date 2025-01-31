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

  const state = useMemo(() => {
    const state: Types.URLState = {
      hash,
      pathname,
      selectedProperty,
      center: [40, -95] as [number, number],
      zoom: 0,
      mapview: 'race',
      hideCensusTracts: false,
    };

    const cleanedHash = hash.replace(/^.*#/, '');
    const hashPairs = cleanedHash ? cleanedHash.split('&') : [];

    for (const hashPair of hashPairs) {
      const [key, value] = hashPair.split('=');
      if (key === 'loc' && value) {
        const [z, x, y] = value.split('/');
        const zoomVal = parseInt(z, 10);
        const xVal = parseFloat(x);
        const yVal = parseFloat(y);

        if (!isNaN(zoomVal) && !isNaN(xVal) && !isNaN(yVal)) {
          state.zoom = zoomVal;
          state.center = [xVal, yVal];
        }
      }
      if (key === 'mv' && value === 'income') {
        state.mapview = 'income';
      }
      if (key === 'censusTracts' && value === 'hide') {
        state.hideCensusTracts = true;
      }
    }

    return state;
  }, [hash, pathname, selectedProperty]);

  return state;
};

export function useProperties() {
  const [properties, setProperties] = useState<Types.Feature[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get<{ type: 'FeatureCollecton'; features: Types.Feature[] }>(`${process.env.PUBLIC_URL}/points.geojson`);

        setProperties(response.data.features);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProperties();
  }, []);

  return { properties, loading };
}

export function useClusteredProperties() {
  const [properties, setProperties] = useState<Types.ClusteredProperties[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get<{ type: 'FeatureCollecton'; features: Types.ClusteredProperties[] }>(`${process.env.PUBLIC_URL}/clustered_points.geojson`);

        setProperties(response.data.features);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProperties();
  }, []);

  return { properties, loading };
}


export function useCities() {
  const [cities, setCities] = useState<Types.CityFeature[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get<{ type: 'FeatureCollecton'; features: Types.CityFeature[] }>(`${process.env.PUBLIC_URL}/cities.geojson`);

        setCities(response.data.features);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProperties();
  }, []);

  return { cities, loading };
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

  const { cities } = useCities();
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
        const response = await axios.get<{ type: 'FeatureCollecton'; features: Types.CityFeature[] }>(`${process.env.PUBLIC_URL}/cities.geojson`);

        setGroupedOptions(prepareMenuData(response.data.features));
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProperties();
  }, [cities]);

  return { groupedOptions, loading };
}

export function useVisibleProperties() {
  const { properties } = useProperties();
  const [visibleProperties, setVisibleProperties] = useState<Types.Feature[]>([]);
  const { center, zoom } = useURLState();
  const { map } = useMapContext();

  useEffect(() => {
    if (map) {
      const bounds = map.getBounds();
      const visibleProperties = properties.filter(property => bounds.contains([property.geometry.coordinates[1], property.geometry.coordinates[0]]));
      setVisibleProperties(visibleProperties);
    }
  }, [center, zoom, map, properties, map]);

  return visibleProperties;
}

export function useVisiblePropertiesStats() {
  const visibleProperties = useVisibleProperties();

  const stats = useMemo(() => {
    const totalUnits = visibleProperties.reduce((acc, property) => acc + property.properties.mortgages.reduce((units, mortgage) => units + mortgage.units, 0), 0);
    const totalProjects = visibleProperties.length;
    const maxIncome = visibleProperties.reduce((acc, property) => Math.max(acc, (property.properties.median_income || 0)), 0);
    const maxUnits = visibleProperties.reduce((acc, property) => Math.max(acc, property.properties.mortgages.reduce((units, mortgage) => units + mortgage.units, 0)), 0);

    return {
      totalUnits,
      totalProjects,
      maxIncome,
      maxUnits,
    };
  }, [visibleProperties]);

  return stats;
}

export function useVisibleClusteredProperties() {
  const { properties } = useClusteredProperties();
  const [visibleProperties, setVisibleProperties] = useState<Types.ClusteredProperties[]>([]);
  const { center, zoom } = useURLState();
  const { map } = useMapContext();

  useEffect(() => {
    if (map) {
      const bounds = map.getBounds();
      const visibleProperties = properties
        .filter(property => property.properties.zoom === zoom && bounds.contains([property.geometry.coordinates[1], property.geometry.coordinates[0]]));
      setVisibleProperties(visibleProperties);
    }
  }, [center, zoom, map, properties, map]);

  return visibleProperties;
}

export function useSelectedPropertyData() {
  const { selectedProperty } = useURLState();
  const { properties } = useProperties();

  if (!selectedProperty) return undefined;
  return properties.find(property => property.properties.mortgages[0].proj_num === parseInt(selectedProperty));
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
              `${process.env.PUBLIC_URL}/censustracts/${tract.gisjoin}.geojson`
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
