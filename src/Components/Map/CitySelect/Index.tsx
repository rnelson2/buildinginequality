import React from "react";
import Select from "react-select";
import { useCitiesOptions, useMapContext } from "../../../hooks";
import * as Styled from "./styled";
import { useDimensions, useURLState } from "../../../hooks";
import { polygonToBounds, modifyHash } from "../../../utilities";
import { useNavigate } from "react-router-dom";
import { latLngBounds } from "leaflet";

interface GroupedOption {
  label: string; // State name (non-selectable header)
  options: Option[]; // List of cities in the state
}

interface Option {
  label: string;
  value: string;
  geometry: {
    type: "Polygon";
    coordinates: [number, number][][]; 
  };
}

const CitySelect = () => {
  const { groupedOptions } = useCitiesOptions();
  const navigate = useNavigate();
  const { device } = useDimensions();
  const { map } = useMapContext();
  const { selectedProperty, hash } = useURLState();

  console.log(hash);

  const handleChange = (selectedOption: any) => {
    if (selectedOption && map) {
      const bounds = polygonToBounds(selectedOption.geometry);
      // if either max or min lats and longs are less than 0.02 degrees apart, pad them to make the bounds at least 0.02 degrees apart
      if (bounds[0][0] === bounds[1][0]) {
        bounds[0][0] -= 0.01;
        bounds[1][0] += 0.01;
      }
      if (bounds[0][1] === bounds[1][1]) {
        bounds[0][1] -= 0.01;
        bounds[1][1] += 0.01;
      }
      if (selectedProperty) {
        navigate(`/map`);
      } 
      const leafletBounds = latLngBounds(bounds);
      const newZoom = map.getBoundsZoom(leafletBounds);
      const newCenter = leafletBounds.getCenter();
      const newLat = Math.round(newCenter.lat * 10000) / 10000; // round to 4 decimal places
      const newLng = Math.round(newCenter.lng * 10000) / 10000;
      const newHash = modifyHash(hash, [
        { type: 'set_loc', payload: { zoom: newZoom, center: [newLat, newLng] } },
      ]);
      navigate(`/map#${newHash}`, { replace: true });
      
      // on desktop, pad the right boundary because of the legend
      //map.fitBounds(bounds, { maxZoom: 16, paddingBottomRight: (device === 'desktop') ? [213, 0] : [0, 0] }); // Fit the map to the selected city's bounds
    }
  };

  return (
    <Styled.SelectCity>
      <Select
        options={groupedOptions}
        onChange={handleChange}
        placeholder="Select a city..."
        isClearable
      />
    </Styled.SelectCity>
  );
};

export default CitySelect;
