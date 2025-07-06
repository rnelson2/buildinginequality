import React from "react";
import * as Styled from "./styled";
import { scaleLinear } from "d3-scale";
import { useVisiblePropertiesStats } from "../../../../../../hooks";
import { getColor } from "../../../../../../utilities";

const CensusIncomeLegend: React.FC = () => {
  const { maxIncome } = useVisiblePropertiesStats();

  const symbolsWidth = 150;
  const incomeScale = scaleLinear().domain([0, maxIncome]);
  const incomeTicks = incomeScale.ticks(5);
  // tick marks for the x axis
  const incomeSectionWidth = symbolsWidth / incomeTicks.length;
  const x = scaleLinear().domain([0, Math.max(...incomeTicks)]).range([0, symbolsWidth - incomeSectionWidth]);

  return (
    <svg
      width={symbolsWidth}
      height={incomeSectionWidth + 40}
    >
      {incomeTicks.map(tick => (
        <rect
          x={x(tick)}
          y="0"
          width={incomeSectionWidth}
          height={incomeSectionWidth}
          fill={getColor({ properties: { median_income: tick + 1 } }, "income", { maxIncome })}
          fillOpacity={(tick / maxIncome) * 0.1 + 0.3}
          key={`income-censusTracts-${tick}`}
        />
      ))}
      {incomeTicks.map(tick => (
        <text
          x={x(tick) + incomeSectionWidth / 2}
          y={incomeSectionWidth + 20}
          textAnchor="middle"
          key={`income-label-${tick}`}
          fontSize={11}
        >
          ${tick / 1000}
          {tick !== 0 ? "K" : ""}
        </text>
      ))}
    </svg>
  );
};
``;
export default CensusIncomeLegend;
