import L from "leaflet";
import React, { useCallback, useMemo } from "react";
import { Circle, Marker, Polygon, Popup } from "react-leaflet";
import { useURLState, useVisibleClusteredProperties } from "../../../hooks";
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
    // Scale relative to zoom level 9; for zoom levels 4 and below, the radius is halved for each zoom level to avoid excessive size
    const zoomAdjustment = 2 ** (zoom - 9) * 2 ** (5 - Math.min(zoom, 5));
    return baseRadius / zoomAdjustment;
  }, [zoom]);


  // Generate hexagon points
  const generateHexagon = (center: [number, number], radius: number) => {
    const angleStep = (Math.PI * 2) / 6;
    const points: [number, number][] = [];
    for (let i = 0; i < 6; i++) {
      const angle = i * angleStep;
      const x = center[1] + (radius / 111320) * Math.cos(angle); // Approximation using 111,320m per degree latitude
      const y = center[0] + (radius / 140000) * Math.sin(angle); // Approximation using 111,320m per degree latitude
      points.push([y, x]);
    }
    return points;
  };

  // Create a divIcon for the label
  const createLabelIcon = (units: number) => {
    // if units are above 1000, show in thousands
    const label = (units > 1000) ? `${Math.round(units / 1000)}K` : units.toLocaleString();
    return L.divIcon({
      html: `<div style="background-color: transparent; padding: 2px 4px; font-size: 12px; text-align: center;">${label}</div>`,
      className: "", // Remove Leaflet's default styling
      iconSize: [100, 20],
      iconAnchor: [50, 10] // Center the label
    });
  }


  // the minimul radius for a label is 50000 at zoom levels 5 or lower; for zoom levels 6 it is halved for each zoom level
  const minumumLabelRadius = 40000 / (2 ** (zoom - Math.min(zoom, 5)));

  return (
    <>
      {properties.map(property => (
        <React.Fragment key={`${property.geometry.coordinates[0]}-${property.geometry.coordinates[1]}-${mapview}-${zoom}`}>
          <Polygon
            key={`${property.geometry.coordinates[0]}-${property.geometry.coordinates[1]}-${mapview}-${zoom}`}
            //center={[property.geometry.coordinates[1], property.geometry.coordinates[0]]}
            positions={generateHexagon([property.geometry.coordinates[1], property.geometry.coordinates[0]], getRadius(property.properties.units || 0))}
            // fillColor={getColor(property, mapview, { maxIncome })}
            // color={getColor(property, mapview, { maxIncome })}
            fillColor={'#cc3300'}
            color='#cc3300'
            weight={2}
            fillOpacity={0.1}
            // radius={property.properties.units ? getRadius(property.properties.units) : 5}
            eventHandlers={{
              click: () => { },
            }}
          />
          {(getRadius(property.properties.units || 0) > minumumLabelRadius) &&
            <Marker
              position={[property.geometry.coordinates[1], property.geometry.coordinates[0]]}
              icon={createLabelIcon(property.properties.units || 0)}
            >
              <Popup>
                {property.properties.units} units
              </Popup>
            </Marker>
          }

        </React.Fragment>
      ))}
    </>
  );
};

export default ClusteredProperties;
