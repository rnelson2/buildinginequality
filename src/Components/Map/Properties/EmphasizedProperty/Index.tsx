import React, { useMemo, useEffect, useRef } from "react";
import * as d3 from "d3";
import { useVisibleProperties, useURLState, useMapContext } from "../../../../hooks";
import { getColor } from "../../../../utilities";
import { CircleMarker } from "react-leaflet";
import { Feature } from "../../../../index.d";
import * as Constants from "../../../../constants";
import { constants } from "buffer";

const Properties = ({ property }: { property: Feature }) => {
  const properties = useVisibleProperties();
  const { selectedProperty, mapview } = useURLState();
  const { highlightedIds } = useMapContext();
  const circleRef = useRef<any>(null);

  const { mortgages } = property.properties;
  const { proj_num } = mortgages[0];
  const units = useMemo(() => mortgages.reduce((sum, mortgage) => sum + mortgage.units, 0), [mortgages]);

  // Base radius calculation
  const baseRadius = useMemo(() => Math.sqrt(units), [units]);

  // Get max income for color scale
  const maxIncome = useMemo(() => {
    return properties.reduce((acc, property) => {
      return property.properties.median_income && property.properties.median_income > acc
        ? property.properties.median_income
        : acc;
    }, 0);
  }, [properties]);

  // Determine if property is selected or highlighted
  const isSelected = parseInt(selectedProperty || "") === proj_num;
  const isHighlighted = highlightedIds.includes(proj_num);
  const isEmphasized = isSelected || isHighlighted;

   // Function to animate pulsing effect
   const animatePulse = () => {
    if (circleRef.current) {
      d3.select(circleRef.current)
        .transition()
        .duration(750)
        .ease(d3.easeSinInOut)
        .tween("pulseTween", function () {
          const marker = this;
          const interpolateRadius = d3.interpolate(baseRadius, Math.max( baseRadius * 2, 20));
          const interpolateOpacity = d3.interpolate(0.5, 0.0); // Fade to transparent
          return (t) => {
            if (marker.setRadius && marker.setStyle) {
              marker.setRadius(interpolateRadius(t));
              marker.setStyle({ fillOpacity: interpolateOpacity(t) });
            }
          };
        })
        .transition() // Add a pause before restarting
        .duration(500) // 500ms pause
        .on("end", animatePulse); // RESTART ANIMATION WITHOUT `dispatch("start")`
    }
  };

  useEffect(() => {
    animatePulse();
  }, [baseRadius]);

  if (!isEmphasized) {
    return null;
  }

  return (
    <CircleMarker
      ref={circleRef}
      key={`${property.geometry.coordinates[0]}-${property.geometry.coordinates[1]}-${selectedProperty}-${mapview}${highlightedIds ? `-${highlightedIds.join("-")}` : ""}`}
      center={[property.geometry.coordinates[1], property.geometry.coordinates[0]]}
      fillColor={Constants.COLOR_ACCENT_RED}
      color={Constants.COLOR_ACCENT_RED}
      weight={0}
      fillOpacity={0.7}
      radius={baseRadius}
    />
  );
};

export default Properties;