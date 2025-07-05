import React from "react";
import { useCityStats } from "../../../hooks";
import City from "./City";
import * as Styled from "./styled";

/**
 * CityStats Component - Displays aggregated statistics for visible cities.
 */
const CityStats = () => {
  const cityStats = useCityStats();

  return (
    <Styled.Container>
      <Styled.Header>Visible Properties</Styled.Header>
      <Styled.List>
        {cityStats.map(({ city, complexes, totalUnits, totalAmount, properties }) => (
          <City
            key={city}
            city={city}
            complexes={complexes}
            totalUnits={totalUnits}
            totalAmount={totalAmount}
            properties={properties}
          />
        ))}
      </Styled.List>
    </Styled.Container>
  );
};

export default CityStats;