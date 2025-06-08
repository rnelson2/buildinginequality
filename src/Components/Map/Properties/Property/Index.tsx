import React, { useMemo, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useVisibleProperties, useURLState, useMapContext } from "../../../../hooks";
import { CircleMarker } from "react-leaflet";
import { getColor } from "../../../../utilities";
import * as Styled from "./styled";
import { Feature } from "../../../../index.d";

const Property = ({ property }: { property: Feature }) => {
  const properties = useVisibleProperties();
  const { hash, selectedProperty, mapview } = useURLState();
  const { highlightedIds } = useMapContext();
  const navigate = useNavigate();
  const circleRef = useRef<any>(null);

  const { mortgages } = property.properties;
  const { proj_num } = mortgages[0];
  const units = useMemo(() => mortgages.reduce((sum, mortgage) => sum + mortgage.units, 0), [mortgages]);

  // function to size the circle markers based on the number of units
  const radius = useMemo(() => Math.sqrt(units) * 0.5, [units]);

  const isEmphasized = useMemo(() => {
    const isSelected = parseInt(selectedProperty || "") === proj_num;
    const isHighlighted = highlightedIds.includes(proj_num);
    return isSelected || isHighlighted;
  }, [selectedProperty, highlightedIds]);

  const fillOpacity = useMemo(() => {
    const notthingSelected = !selectedProperty && highlightedIds.length === 0;
    return notthingSelected || isEmphasized ? 0.6 : 0.3;
  }, [isEmphasized, selectedProperty]);

  // get the max income for the income color scale
  const maxIncome = useMemo(() => {
    return properties.reduce((acc, property) => {
      if (property.properties.median_income && property.properties.median_income > acc) {
        return property.properties.median_income;
      }
      return acc;
    }, 0);
  }, [properties]);

  const fillColor = useMemo(() => {
    return getColor(property, mapview, { maxIncome });
  }, [property, mapview, maxIncome]);

  // Ensure Leaflet CircleMarker updates style when `fillColor` changes
  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.setStyle({ fillColor, color: fillColor });
    }
  }, [fillColor]);

  return (
    <CircleMarker
      ref={circleRef}
      center={[property.geometry.coordinates[1], property.geometry.coordinates[0]]}
      fillColor={fillColor}
      color={getColor(property, mapview, { maxIncome })}
      weight={1}
      fillOpacity={fillOpacity}
      radius={radius}
      eventHandlers={{
        click: () => {
          if (parseInt(selectedProperty || "-9999999") === property.properties.mortgages[0].proj_num) {
            navigate(`/map${hash}`);
          } else {
            navigate(`/map/${property.properties.mortgages[0].proj_num}${hash}`);
          }
        },
      }}
    />
  );
};

export default Property;
