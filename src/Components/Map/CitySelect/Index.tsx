import React from "react";
import Select from "react-select";
import { useCitiesOptions, useMapContext } from "../../../hooks";
import * as Styled from "./styled";
import { useDimensions } from "../../../hooks";
import { polygonToBounds } from "../../../utilities";

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
  const { device } = useDimensions();
  const { map } = useMapContext();

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
      // on desktop, pad the right boundary because of the legend
      map.fitBounds(bounds, { maxZoom: 16, paddingBottomRight: (device === 'desktop') ? [213, 0] : [0, 0] }); // Fit the map to the selected city's bounds
      //navigate(selectedOption.value); // Navigate to the selected city's link
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
