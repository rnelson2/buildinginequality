import React, { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useVisibleProperties, useURLState, useMapContext } from "../../../../hooks";
import { CircleMarker } from "react-leaflet";
import { getColor } from "../../../../utilities";
import * as Styled from "./styled";
import { Feature } from "../../../../index.d";

const Properties = ({ property }: { property: Feature}) => {
  const properties = useVisibleProperties();
  const { hash, selectedProperty, mapview } = useURLState();
  const { highlightedIds } = useMapContext();
  const navigate = useNavigate();

  const { mortgages } = property.properties;
  const { proj_num } = mortgages[0];
  const units = useMemo(() => mortgages.reduce((sum, mortgage) => sum + mortgage.units, 0), [mortgages]);

  // function to size the circle markers based on the number of units
  const radius = useMemo(() => Math.sqrt(units) * 0.5, [units]);

  const isEmphasized = useMemo(
    () => {
      const isSelected = parseInt(selectedProperty || "") === proj_num;
      const isHighlighted = highlightedIds.includes(proj_num);
      return isSelected || isHighlighted;
    },
    [selectedProperty, highlightedIds]
  )

  const fillOpacity = useMemo(
    () => {
      const notthingSelected = !selectedProperty && highlightedIds.length === 0;
      return notthingSelected || isEmphasized ? 0.6 : 0.3;
    },
    [isEmphasized]
  );


  // get the max income for the income color scale
  const maxIncome = useMemo(() => {
    return properties.reduce((acc, property) => {
      if (property.properties.median_income && property.properties.median_income > acc) {
        return property.properties.median_income;
      }
      return acc;
    }, 0);
  }, [properties]);

  return (
        <CircleMarker
          key={`${property.geometry.coordinates[0]}-${property.geometry.coordinates[1]}-${selectedProperty}-${mapview}${highlightedIds ? `-${highlightedIds.join("-")}` : ""}`}
          center={[property.geometry.coordinates[1], property.geometry.coordinates[0]]}
          fillColor={getColor(property, mapview, { maxIncome })}
          color={getColor(property, mapview, { maxIncome })}
          weight={1}
          fillOpacity={fillOpacity}
          radius={radius}
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
  );
};

export default Properties;
