import React from "react";
import { CircleMarker } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { useVisibleProperties, useURLState } from "../../../hooks";
import { getColor } from "../../../utilities";

const Properties = () => {
  const properties = useVisibleProperties();
  const { hash, selectedProperty, mapview } = useURLState();
  const navigate = useNavigate();

  // function to size the circle markers based on the number of units
  const getRadius = (units: number) => {
    return Math.sqrt(units) * 0.5;
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
        <CircleMarker
          key={`${property.geometry.coordinates[0]}-${property.geometry.coordinates[1]}-${selectedProperty}-${mapview}`}
          center={[property.geometry.coordinates[1], property.geometry.coordinates[0]]}
          fillColor={getColor(property, mapview, { maxIncome })}
          color={getColor(property, mapview, { maxIncome })}
          weight={1}
          fillOpacity={!selectedProperty || parseInt(selectedProperty) === property.properties.mortgages[0].proj_num ? 0.6 : 0.3}
          radius={getRadius(property.properties.mortgages.reduce((acc, mortgage) => acc + mortgage.units, 0))}
          eventHandlers={{
            click: () => {
              if (parseInt(selectedProperty || "") === property.properties.mortgages[0].proj_num) {
                navigate(`/map${hash}`);
              } else {
                navigate(`/map/${property.properties.mortgages[0].proj_num}${hash}`);
              }
            },
          }}
        />
      ))}
    </>
  );
};

export default Properties;
