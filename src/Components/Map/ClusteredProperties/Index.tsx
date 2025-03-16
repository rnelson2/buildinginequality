import React, { useMemo, useCallback } from "react";
import { Circle } from "react-leaflet";
import { useVisibleClusteredProperties, useURLState } from "../../../hooks";
import { getColor } from "../../../utilities";

const ClusteredProperties = () => {
  const properties = useVisibleClusteredProperties();
  const { mapview, zoom } = useURLState();

  // Memoized max income calculation
  const maxIncome = useMemo(() => {
    return properties.reduce((acc, property) => {
      return property.properties.median_income > acc ? property.properties.median_income : acc;
    }, 0);
  }, [properties]);

  // Memoized function to size circle markers
  const getRadius = useCallback((units: number) => {
    const baseRadius = Math.sqrt(units) * 35;
    const zoomAdjustment = 2 ** (zoom - 9); // Scale relative to zoom level 9
    return baseRadius / zoomAdjustment;
  }, [zoom]);

  return (
    <>
      {properties.map(property => (
        <Circle
          key={`${property.geometry.coordinates[0]}-${property.geometry.coordinates[1]}-${mapview}-${zoom}`}
          center={[property.geometry.coordinates[1], property.geometry.coordinates[0]]}
          fillColor={getColor(property, mapview, { maxIncome })}
          color={getColor(property, mapview, { maxIncome })}
          weight={1}
          fillOpacity={0.5}
          radius={property.properties.units ? getRadius(property.properties.units) : 5}
          eventHandlers={{
            click: () => {},
          }}
        />
      ))}
    </>
  );
};

export default ClusteredProperties;
