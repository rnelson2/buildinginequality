import React, { useMemo, useState, useEffect } from "react";
import {  GeoJSON, useMapEvent } from "react-leaflet";
import { useHexbins, useURLState, useMapContext } from "../../../hooks";
import { LatLngBounds } from "leaflet";
import { getBlueThresholdScale, getRedThresholdScale } from "../../../utilities";

const ClusteredProperties = () => {
  const { mapview, zoom, center } = useURLState();
  const { data } = useHexbins(zoom);
  const { map } = useMapContext();
  

  // Compute visible bounds once (or default to full map)
  const [visibleBounds, setVisibleBounds] = useState(
    map?.getBounds?.() ?? new LatLngBounds([[-90, -180], [90, 180]])
  );

  useMapEvent('moveend', () => {
    if (map) setVisibleBounds(map.getBounds());
  });

  useEffect(() => {
    if (map) {
      setVisibleBounds(map.getBounds());
    }
  }, [map, mapview, zoom, center[0], center[1]]);

  function getEffectiveMax(unitsArray: number[], quantile: number = 0.95): number {
    const sorted = [...unitsArray].sort((a, b) => a - b);
    const index = Math.floor(quantile * sorted.length);
    return sorted[index] || 1;
  }

  // Filter for only visible features and calculate max units
  const { visibleFeatures, maxUnits } = useMemo(() => {
    if (!data || data.length === 0) {
      return { visibleFeatures: [], maxUnits: 100 };
    }
    const visible = data.filter(feature => {
      const coords = feature.geometry.coordinates[0];
      return coords.some(([lng, lat]) => visibleBounds.contains([lat, lng]));
    });
    const unitsArray = visible.map(f => f.properties.units);
    const maxUnits = getEffectiveMax(unitsArray, 0.95);
    return { visibleFeatures: visible, maxUnits };
  }, [data, map, zoom, visibleBounds, center[0], center[1]]);

  // If no data, return empty
  if (!data || data.length === 0) {
    return null;
  }

  //const colorScale = scaleSequential(interpolateBlues).domain([0, maxUnits]);
  const { scale: colorScale } = getRedThresholdScale(maxUnits);
  return (
    <>
      {visibleFeatures.map(property => (
        <GeoJSON
          key={`${property.geometry.coordinates[0]}-${property.geometry.coordinates[1]}-${mapview}-${zoom}`}
          data={property}
          style={{
            fillColor: colorScale(property.properties.units),
            color: '#bbb',
            weight: 1,
            fillOpacity: 0.6,
          }}
        />
      ))}
      
    </>
  );
};

export default ClusteredProperties;
