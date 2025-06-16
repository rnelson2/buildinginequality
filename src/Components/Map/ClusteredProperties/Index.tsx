import React, { useMemo } from "react";
import {  GeoJSON } from "react-leaflet";
import { useHexbins, useURLState, useMapContext } from "../../../hooks";
import { LatLngBounds } from "leaflet";
import { getBlueThresholdScale } from "../../../utilities";

const ClusteredProperties = () => {
  const { mapview, zoom } = useURLState();
  const { data } = useHexbins(zoom);
  const { map } = useMapContext();

  // Compute visible bounds once (or default to full map)
  const visibleBounds = map?.getBounds?.() ?? new LatLngBounds([[-90, -180], [90, 180]]);

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
  }, [data, map, zoom, visibleBounds]);

  // If no data, return empty
  if (!data || data.length === 0) {
    return null;
  }




  // Color function based on proportion of max
  const getColor = (units: number) => {
    const ratio = units / maxUnits;
    const alpha = 0.6;
    // simple blue-to-red scale (low to high)
    const r = Math.round(255 * ratio);
    const g = Math.round(100 * (1 - ratio));
    const b = Math.round(255 * (1 - ratio));
    return `rgba(${r},${g},${b},${alpha})`;
  };

  //const colorScale = scaleSequential(interpolateBlues).domain([0, maxUnits]);
  const { scale: colorScale } = getBlueThresholdScale(maxUnits);
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
