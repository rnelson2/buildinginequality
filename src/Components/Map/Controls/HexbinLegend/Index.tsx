import React from "react";
import { format } from "d3-format";
import { scaleThreshold } from "d3-scale";
import * as Styled from "./styled";
import { getBlueThresholdScale } from "../../../../utilities";
import { useVisibleHexbins } from "../../../../hooks";

interface HexbinLegendProps {
  width?: number;
  steps?: number; // number of bins/colors
}

const HexbinLegend: React.FC<HexbinLegendProps> = ({
  width = 300,
  steps = 7,
}) => {
  const hexbins = useVisibleHexbins();
  const maxUnits = hexbins.reduce((max, bin) => Math.max(max, bin.properties.units), 0);
  const label = "Number of Apartment Units";
  const { domain, range } = getBlueThresholdScale(maxUnits, 7);

  const fmt = format(".2s"); // e.g., 1.2k

  // Build bins: [start, end, color]
  const bins = [...domain.map((end, i) => ({
    start: i === 0 ? 0 : domain[i - 1],
    end,
    color: range[i],
  })), {
    start: domain[domain.length - 1],
    end: maxUnits,
    color: range[range.length - 1],
  }];

  const binCount = bins.length;
  const gap = 10;
  const totalGap = gap * (binCount - 1);
  const hexWidth = (width - totalGap) / binCount;
  const a = hexWidth / 2;
  const hexHeight = Math.sqrt(3) * a;

  const padding = 10;
  const labelFontSize = 10;
  const labelOffset = 4;
  const textYOffset = labelFontSize;
  const svgHeight = labelFontSize * 2 + 3 + labelOffset + hexHeight + padding;

  return (
    <Styled.Container>
      <Styled.Label>{label}</Styled.Label>
      <svg width={width + padding * 2} height={svgHeight}>
        <g transform={`translate(${padding}, ${labelFontSize + labelOffset})`}>
          {bins.map(({ start, end, color }, i) => {
            const cx = a + i * (hexWidth + gap);
            const cy = hexHeight / 2;

            const points = [
              [cx + a, cy],
              [cx + a / 2, cy + (Math.sqrt(3) / 2) * a],
              [cx - a / 2, cy + (Math.sqrt(3) / 2) * a],
              [cx - a, cy],
              [cx - a / 2, cy - (Math.sqrt(3) / 2) * a],
              [cx + a / 2, cy - (Math.sqrt(3) / 2) * a],
            ]
              .map(pt => pt.join(","))
              .join(" ");

            return (
              <g key={i}>
                <text
                  x={cx}
                  y={-labelOffset}
                  textAnchor="middle"
                  fontSize={labelFontSize}
                >
                  {`${fmt(start)}-`}
                  <tspan
                    x={cx}
                    dy={labelFontSize + 3}
                  >
                    {fmt(end)}
                  </tspan>
                </text>
                <polygon
                  points={points}
                  fill={color}
                  stroke="#666"
                  strokeWidth={0.5}
                  fillOpacity={0.6}
                  transform={`translate(0, ${labelFontSize + 3})`}
                />
              </g>
            );
          })}
        </g>
      </svg>
    </Styled.Container>
  );
};

export default HexbinLegend;