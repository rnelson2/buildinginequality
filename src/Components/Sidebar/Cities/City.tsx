import React, { useState } from "react";
import CityTable from "./CityTable";
import * as Styled from "./styled";
import { CityProperty } from "../../../index.d";

interface CityProps {
  city: string;
  complexes: number;
  totalUnits: number;
  totalAmount: number;
  properties: CityProperty[];
}

const City: React.FC<CityProps> = ({ city, complexes, totalUnits, totalAmount, properties }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Styled.ListItem>
      {/* City Name */}
      <Styled.CityName>{city}</Styled.CityName>

      {/* Stats Grid */}
      <Styled.StatsGrid>
        <Styled.StatLabel>Apartments</Styled.StatLabel>
        <Styled.StatValue>{complexes}</Styled.StatValue>

        <Styled.StatLabel>Units</Styled.StatLabel>
        <Styled.StatValue>{totalUnits.toLocaleString()}</Styled.StatValue>

        <Styled.StatLabel>Total Mortgage Financing</Styled.StatLabel>
        <Styled.StatValue>${totalAmount.toLocaleString()}</Styled.StatValue>
      </Styled.StatsGrid>

      {/* Toggle Button */}
      <Styled.ToggleButton isExpanded={isExpanded} onClick={() => setIsExpanded((prev) => !prev)}>
        {isExpanded ? "Hide Details" : "Show Details"}
        <Styled.Caret isExpanded={isExpanded} />
      </Styled.ToggleButton>

      {/* Expanded Table */}
      {isExpanded && <CityTable properties={properties} />}
    </Styled.ListItem>
  );
};

export default City;