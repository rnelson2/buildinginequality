import React from "react";
import { scaleLinear, scaleSqrt } from "d3";
import { getColor } from "../../utilities";
import * as Types from "../../index.d";
import { useURLState } from "../../hooks";
import * as Styled from "./styled";

// Define a new type where white_pop, black_pop, and other_pop are required
export type FeatureWithRacialData = Omit<Types.Feature, "properties"> & {
  properties: Omit<Types.Feature["properties"], "white_pop" | "black_pop" | "other_pop" | "median_income" | "gisjoin"> & Required<Pick<Types.Feature["properties"], "white_pop" | "black_pop" | "other_pop" | "median_income" | "gisjoin" >>;
};

const Chart = ({ properties }: { properties: Types.Feature[] }) => {
  const { mapview } = useURLState();
  const propertiesWithRacialData: FeatureWithRacialData[] = properties.filter((d): d is FeatureWithRacialData => !!(d.properties.gisjoin && d.properties.white_pop != null && d.properties.black_pop != null && d.properties.other_pop != null && d.properties.median_income != null));

  // combine properities with the same racial and income data, and sum their units

  // This object will map gisjoin to aggregated data
  const gisjoinMap: {
    [gisjoin: string]: {
      // We'll store these once we find them
      median_income?: number;
      white_pop?: number;
      black_pop?: number;
      other_pop?: number;
      // We'll sum units as we go
      units: number;
      // To detect if we've already stored census data
      hasCensusData: boolean;
    };
  } = {};
  
  const propertiesInCensusTracts = (properties
    .filter((feature) => feature.properties.gisjoin)) as (Types.Feature & { properties: { gisjoin: string } })[];
  
  const racial_and_income_data: {
    gisjoin: string;
    units: number;
    median_income: number;
    white_pop: number;
    black_pop: number;
    other_pop: number;
  }[] = [];
  
  propertiesWithRacialData.forEach((feature) => {
    const { gisjoin, median_income, white_pop, black_pop, other_pop, mortgages } = feature.properties;

    // get the index of the gisjoin in the array
    const index = racial_and_income_data.findIndex((d) => d.gisjoin === gisjoin);
    // if the gisjoin is not in the array, add it
    if (index === -1) {
      racial_and_income_data.push({
        gisjoin,
        units: mortgages.reduce((sum, m) => sum + (m.units || 0), 0),
        median_income,
        white_pop,
        black_pop,
        other_pop
      });
    } else {
      // if the gisjoin is in the array, add the units
      racial_and_income_data[index].units += mortgages.reduce((sum, m) => sum + (m.units || 0), 0);
    }
  });


  const maxIncome = racial_and_income_data.reduce((acc, property) => {
    return property.median_income > acc ? property.median_income : acc;
  }, 0);

  // get the maxUnits among the properties
  const maxUnits = racial_and_income_data.reduce((acc, property) => {
    return property.units > acc ? property.units : acc;
  }, 0);
 
  
  const r = scaleSqrt().domain([0, maxUnits]).range([0, 3]);

  const xScale = scaleLinear().domain([1, 0]).range([0, 100]);
  const yScale = scaleLinear()
    .domain([0, maxIncome * 1.1])
    .range([66, 0]);

  // tick marks for the x axis
  const xTicks = xScale.ticks(5);

  // use d3 to calculate y axis tick marks
  const yTicks = yScale.ticks(5);

  return (
    <Styled.Container>
      <h2>Apartments by Race and Income</h2>
      <Styled.Explanation>Bubbles are all apartments in a census tract.</Styled.Explanation>
      <Styled.Explanation>The chart only shows tracts with race and income data.</Styled.Explanation>
      <Styled.Explanation>Size is proportional to number of housing units.</Styled.Explanation>
    <svg viewBox="0 0 130 100">
      // x axis
      <g transform="translate(20 10)">
        <line
          x1="0"
          y1="66"
          x2="100"
          y2="66"
          stroke="grey"
          strokeWidth={0.4}
        />
        {xTicks.map(tick => {
          return (
            <g key={`tick-${tick}`}>
              <line
                x1={xScale(tick)}
                y1="66"
                x2={xScale(tick)}
                y2="68"
                stroke="grey"
                strokeWidth={0.4}
              />
              <text
                x={xScale(tick)}
                y="73"
                textAnchor="middle"
                fontSize={4}
              >
                {Math.round((1 - tick) * 100)}%
              </text>
            </g>
          );
        })}
        <text
          x="50"
          y="80"
          textAnchor="middle"
          fontSize={4}
        >
          Non-white Population
        </text>
        // y axis
        {yTicks.map(tick => {
          return (
            <g key={`ytick-${tick}`}>
              <line
                x1="0"
                y1={yScale(tick)}
                x2="100"
                y2={yScale(tick)}
                stroke="grey"
                strokeWidth={0.2}
              />
              <text
                x="-3"
                y={yScale(tick) + 1}
                textAnchor="end"
                fontSize={4}
              >
                ${(tick / 1000).toFixed(0)}K
              </text>
            </g>
          );
        })}
        <text
          x="-12"
          y="33"
          textAnchor="middle"
          fontSize={4}
          transform="rotate(270 -12 33)"
        >
          Median Income
        </text>
        {racial_and_income_data.map((property, i) => {
          const y = yScale(property.median_income);
          return (
            <circle
              key={`chartdot-${property.white_pop}-${property.black_pop}-${property.other_pop}-${property.median_income}`}
              cx={xScale(property.white_pop / (property.white_pop + property.black_pop + property.other_pop))}
              cy={y}
              r={r(property.units)}
              fill={getColor({ properties: property }, mapview, { maxIncome })}
              fillOpacity={0.3}
              stroke={getColor({ properties: property }, mapview, { maxIncome })}
              strokeWidth={0.5}
            />
          );
        })}
      </g>
      </svg>
    </Styled.Container>
  );
};

export default Chart;