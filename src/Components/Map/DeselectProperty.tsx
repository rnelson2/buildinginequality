import React from "react";
import { useNavigate } from "react-router-dom";
import { useMapEvent } from "react-leaflet";
import * as L from 'leaflet';
import { useSelectedPropertyData, useMapContext, useURLState } from "../../hooks";

const DeselectProperty = (): null => {
  const navigate = useNavigate();
  const selectedProperty = useSelectedPropertyData();
  const { hash } = useURLState();
  const { map } = useMapContext();

  // if the map moves and the selected property is no longer visible, deselect it
  useMapEvent('moveend', () => {
    if (selectedProperty && map) {
      const mapBounds = map.getBounds();
      const selectedPropertyLatLng = new L.LatLng(selectedProperty.geometry.coordinates[1], selectedProperty.geometry.coordinates[0]);
      if (!mapBounds.contains(selectedPropertyLatLng)) {
        navigate(`/map#${hash}`);
      }
    }
  });

  return null;
};

export default DeselectProperty;