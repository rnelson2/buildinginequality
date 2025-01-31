import React from "react";
import { Circle } from "react-leaflet";
import { useVisibleClusteredProperties, useURLState } from "../../../hooks";
import { getColor } from "../../../utilities";

const Properties = () => {
  const properties = useVisibleClusteredProperties();
  const { mapview, zoom } = useURLState();

  // Function to size the circle markers based on the number of units and zoom level
  const getRadius = (units: number) => {
    // Base radius scaling factor for units
    const baseRadius = Math.sqrt(units) * 35;

    // Adjust radius based on zoom level (higher zoom = larger circles visually)
    const zoomAdjustment = 2 ** (zoom - 9); // Scale relative to zoom level 9

    return baseRadius / zoomAdjustment;
  };

  // get the max income for the income color scale
  const maxIncome = properties.reduce((acc, property) => {
    if (property.properties.median_income && property.properties.median_income > acc) {
      return property.properties.median_income;
    }
    return acc;
  }, 0);
  return (
    <>
      {properties.map((property, idx) => (
          <Circle
          key={`${property.geometry.coordinates[0]}-${property.geometry.coordinates[1]}-${mapview}-${zoom}`}
          center={[property.geometry.coordinates[1], property.geometry.coordinates[0]]}
          fillColor={getColor(property, mapview, { maxIncome })}
          color={getColor(property, mapview, { maxIncome })}
          weight={1}
          fillOpacity={0.5}
          radius={property.properties.units ? getRadius(property.properties.units) : 5}
          eventHandlers={
            {
              click: () => {
               
              }
            }
          }
          />
      ))}
    </>
  );
};

export default Properties;
