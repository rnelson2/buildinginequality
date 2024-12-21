import React from 'react';
import { GeoJSON } from 'react-leaflet';
import { useCensusTracts, useURLState } from '../../../hooks';
import * as Types from '../../../index.d';
import { getColor } from '../../../utilities';


const CensusTracts = () => {
  const { censusTracts } = useCensusTracts();
  const { zoom, mapview, hideCensusTracts } = useURLState();

  // if the zoom is less than 8, don't show the census tracts
  if (zoom < 9 || hideCensusTracts) return null;

  // calculate the maximum population density
  const maxPopulationDensity = censusTracts.reduce((acc, censusTract) => {
    const white_pop = censusTract.properties.white_pop || 0;
    const black_pop = censusTract.properties.black_pop || 0;
    const other_pop = censusTract.properties.other_pop || 0;
    const populationDensity = (white_pop + black_pop + other_pop) / censusTract.properties.area;
    return populationDensity > acc ? populationDensity : acc;
  }, 0);

  const maxIncome = censusTracts.reduce((acc, censusTract) => {
    if (censusTract.properties.median_income && censusTract.properties.median_income > acc) {
      return censusTract.properties.median_income;
    }
    return acc;
  }, 0);

  const getFillOpacity = (feature: Types.CensusFeature) => {
    if (mapview === 'income') {
      return (!feature.properties.median_income || feature.properties.median_income === 0) ? 0 : (feature.properties.median_income / maxIncome) * 0.1 + 0.3;
    }
    const white_pop = feature.properties.white_pop || 0;
    const black_pop = feature.properties.black_pop || 0;
    const other_pop = feature.properties.other_pop || 0;
    const populationDensity = (white_pop + black_pop + other_pop) / feature.properties.area;
    return populationDensity / maxPopulationDensity * 0.5;
  }



  return (
    <>
      {censusTracts.map((censusTract) => (
        <GeoJSON
          key={censusTract.properties.gisjoin}
          data={censusTract}
          style={{ fillColor: getColor(censusTract, mapview, { maxIncome, }), stroke: false, fillOpacity: getFillOpacity(censusTract) }}
        />
      ))}
    </>
  );
};

export default CensusTracts;