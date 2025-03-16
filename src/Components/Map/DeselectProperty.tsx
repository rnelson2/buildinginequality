import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMapEvent } from "react-leaflet";
import * as L from 'leaflet';
import { useSelectedPropertyData, useMapContext, useURLState } from "../../hooks";

const DeselectProperty = (): null => {
  const navigate = useNavigate();
  const selectedProperty = useSelectedPropertyData();
  const { hash } = useURLState();
  const { map } = useMapContext();

  // Ref to store the debounce timer
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // if the map moves and the selected property is no longer visible, deselect it
  useMapEvent("moveend", () => {
    if (!map || !selectedProperty) return;
  
    const mapBounds = map.getBounds();
    const selectedPropertyLatLng = new L.LatLng(
      selectedProperty.geometry.coordinates[1],
      selectedProperty.geometry.coordinates[0]
    );
  
    if (mapBounds.contains(selectedPropertyLatLng)) return; // No need to debounce
  
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
  
    debounceTimeout.current = setTimeout(() => {
      navigate(`/map#${hash}`);
    }, 300);
  });

  return null;
};

export default DeselectProperty;