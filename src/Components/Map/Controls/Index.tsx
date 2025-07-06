import React, { useState } from "react";
import * as Styled from "./styled";
import ToggleButton from "./ToggleButton";
import { scaleLinear } from "d3-scale";
import { modifyHash, getColor, hexToRgba } from "../../../utilities";
import { useURLState, useVisiblePropertiesStats } from "../../../hooks";
import CloseButton from "../../Buttons/Close";
import HexbinLegend from "./HexbinLegend/Index";
import ZoomedInLegend from "./ZoomedInLegend/Index";
import * as Constants from "../../../constants";

const Controls = () => {
  const { hash, mapview, pathname, hideCensusTracts, zoom } = useURLState();
  const { maxIncome } = useVisiblePropertiesStats();
  const [open, setOpen] = useState(true);

  const symbolsWidth = 180;

  const incomeScale = scaleLinear().domain([0, maxIncome]).range([0, symbolsWidth]);

  // tick marks for the x axis
  const incomeTicks = incomeScale.ticks(5);
  const incomeSectionWidth = symbolsWidth / incomeTicks.length;

  const raceScale = scaleLinear()
    .domain([0, 100])
    .range([incomeSectionWidth / 2, symbolsWidth - incomeSectionWidth / 2]);
  const raceTicks = [0, 25, 50, 75, 100];

  if (zoom <= 10) {

    return (
      <Styled.HexContainer>
        <HexbinLegend />
      </Styled.HexContainer>
    );
    //return <Styled.HexContainer>Each hexagon represents multiple apartment properties grouped loosely by location. Its size reflects the total number of apartment units—larger hexagons indicate more units in that general area. At lower zoom levels, hexagons may appear between familiar cities; their placement reflects spatial clustering rather than exact geography.</Styled.HexContainer>;
  }

  if (zoom > 10) {
    return <ZoomedInLegend />;
  }

  const radius = (units: number) => Math.sqrt(units) * 0.5;
  const legendValues = [3000, 1500, 500, 100];

  return (
    <Styled.Container>
      {open && (
        <Styled.LegendContainer>
          <Styled.LegendWrapper>
            <Styled.CirclesWrapper>
              {legendValues.map(value => (
                <Styled.Circle
                  key={`circle-${value}`}
                  size={radius(value) * 2}
                  color={'white'}

                  fill={hexToRgba(Constants.COLOR_ACCENT_RED, 0.5)}
                />
              ))}
            </Styled.CirclesWrapper>
            <Styled.LabelsWrapper>
              {[...legendValues].reverse().map(value => (
                <Styled.LabelCircle
                  key={`label-${value}`}
                  $topOffset={radius(value)}
                >
                  {value} Units
                </Styled.LabelCircle>
              ))}
            </Styled.LabelsWrapper>

          </Styled.LegendWrapper>
{/* 
          <Styled.CloseButton
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseButton />
          </Styled.CloseButton> */}
          <div>
          <Styled.Toggle>
            <Styled.Link
              to={`${pathname}#${modifyHash(hash, [{ type: "set_mapview", payload: "race" }])}`}
              selected={mapview === "race"}
            >
              Race
            </Styled.Link>
            <Styled.Link
              to={`${pathname}#${modifyHash(hash, [{ type: "set_mapview", payload: "income" }])}`}
              selected={mapview === "income"}
            >
              Income
            </Styled.Link>
          </Styled.Toggle>

          <Styled.Legend>
            {mapview === "income" && maxIncome > 0 && (
              <Styled.IncomeLegend>
                <Styled.Label>Properties</Styled.Label>
                <svg
                  width={symbolsWidth + incomeSectionWidth / 2}
                  height={incomeSectionWidth}
                >
                  {incomeTicks.map(tick => (
                    <circle
                      cx={incomeScale(tick) + incomeSectionWidth / 2}
                      cy={incomeSectionWidth / 2}
                      r={incomeSectionWidth / 2 - 4}
                      fill={getColor({ properties: { median_income: tick + 1 } }, "income", { maxIncome })}
                      fillOpacity={0.8}
                      stroke={getColor({ properties: { median_income: tick + 1 } }, "income", { maxIncome })}
                      strokeWidth={1}
                      key={`income-properties-${tick}`}
                    />
                  ))}
                </svg>
                {!hideCensusTracts && (
                  <>
                    <Styled.Label>Census Tracts</Styled.Label>
                    <svg
                      width={symbolsWidth + incomeSectionWidth / 2}
                      height={incomeSectionWidth}
                    >
                      {incomeTicks.map(tick => (
                        <rect
                          x={incomeScale(tick)}
                          y="0"
                          width={incomeSectionWidth}
                          height={incomeSectionWidth}
                          fill={getColor({ properties: { median_income: tick + 1 } }, "income", { maxIncome })}
                          fillOpacity={(tick / maxIncome) * 0.1 + 0.3}
                          key={`income-censusTracts-${tick}`}
                        />
                      ))}
                    </svg>
                  </>
                )}

                <svg
                  width={symbolsWidth + incomeSectionWidth / 2}
                  height="25"
                >
                  {incomeTicks.map(tick => (
                    <text
                      x={incomeScale(tick) + incomeSectionWidth / 2}
                      y={12}
                      textAnchor="middle"
                      key={`income-label-${tick}`}
                      fontSize={11}
                    >
                      ${tick / 1000}
                      {tick !== 0 ? "K" : ""}
                    </text>
                  ))}
                </svg>
              </Styled.IncomeLegend>
            )}

            {mapview === "race" && (
              <Styled.IncomeLegend>
               

                

                {!hideCensusTracts && (
                  <>
                    <Styled.Label>Census Tracts</Styled.Label>

                    <svg
                      width={140}
                      height={140}
                    >
                      {[0, 0.2, 0.4, 0.6, 0.8].map(value => (
                        <g
                          key={value}
                          transform={`translate(${20 + value * 100})`}
                        >
                          {[0, 0.2, 0.4, 0.6, 0.8].map(alpha => (
                            <rect
                              key={`value${value}-${alpha}`}
                              x={0}
                              y={80 - alpha * 100}
                              width={20}
                              height={20}
                              fill={getColor({ properties: { white_pop: value, black_pop: 1 - value, other_pop: 0 } })}
                              fillOpacity={(alpha + 0.1) * 0.7}
                              stroke="#efefef"
                              strokeWidth={0.25}
                            />
                          ))}
                        </g>
                      ))}

                      {/* x axis */}
                      {[0, 100].map(value => (
                        <g
                          key={value}
                          transform={`translate(${20 + value})`}
                        >
                          <text
                            x={0}
                            y={120}
                            fontSize={10}
                            fill="#555"
                            textAnchor="middle"
                          >
                            100%
                            <tspan
                              x={0}
                              dy={10}
                            >
                              {value === 0 ? "of color" : "white"}
                            </tspan>
                          </text>
                        </g>
                      ))}

                      {/* y axis */}
                      <text
                        x={10}
                        y={50}
                        fontSize={10}
                        fill="#555"
                        textAnchor="middle"
                        transform="rotate(-90, 10, 50)"
                      >
                        Denser Population →
                      </text>
                    </svg>
                  </>
                )}
              </Styled.IncomeLegend>
            )}
          </Styled.Legend>
          <Styled.CensusTractToggle to={`${pathname}#${modifyHash(hash, [{ type: "toggle_censusTracts" }])}`}> {hideCensusTracts ? "Show" : "Hide"} Census Tracts</Styled.CensusTractToggle>
          </div>
        </Styled.LegendContainer>
      )}
    </Styled.Container>
  );
};

export default Controls;
