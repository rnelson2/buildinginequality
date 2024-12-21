import React, { useState } from "react";
import * as Styled from "./styled";
import { Link } from "react-router-dom";
import ToggleButton from "./ToggleButton";
import { scaleLinear } from "d3-scale";
import { modifyHash, getColor } from "../../../utilities";
import { useURLState, useVisiblePropertiesStats } from "../../../hooks";
import CloseButton from '../../Buttons/Close';

const Controls = () => {
  const { hash, mapview, pathname, hideCensusTracts } = useURLState();
  const { maxIncome } = useVisiblePropertiesStats();
  const [ open, setOpen ] = useState(true);

  const symbolsWidth = 180;

  const incomeScale = scaleLinear().domain([0, maxIncome]).range([0, symbolsWidth]);

  

  // tick marks for the x axis
  const incomeTicks = incomeScale.ticks(5);
  const incomeSectionWidth = symbolsWidth / (incomeTicks.length);
  
  const raceScale = scaleLinear().domain([0, 100]).range([incomeSectionWidth / 2, symbolsWidth - incomeSectionWidth / 2]);
  const raceTicks = [0, 25, 50, 75, 100];

  return (
    <Styled.Container>
      <ToggleButton
        open={open}
        setOpen={setOpen}
      />

      {open && (
        <Styled.LegendContainer>
          <Styled.CloseButton
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseButton />
          </Styled.CloseButton>
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
            <Styled.Label>Properties</Styled.Label>
            <svg
              width={symbolsWidth}
              height={incomeSectionWidth}
            >
              {raceTicks.map(tick => (
                <circle
                  cx={raceScale(tick)}
                  cy={incomeSectionWidth / 2}
                  r={incomeSectionWidth / 2 - 4}
                  fill={getColor({ properties: { white_pop: tick, black_pop: 100 - tick } })}
                  fillOpacity={0.8}
                  stroke={getColor({ properties: { white_pop: tick, black_pop: 100 - tick } })}
                  strokeWidth={1}
                  key={`race-properties-${tick}`}
                />
              ))}
            </svg>

            <svg
              width={symbolsWidth}
              height="25"
            >
              <text
                x={raceScale(0)}
                y={12}
                textAnchor="middle"
                fontSize={11}
              >
                100%
                <tspan
                  x={raceScale(0)}
                  dy={10}
                >
                  of color
                </tspan>
              </text>

              <text
                x={raceScale(50)}
                y={12}
                textAnchor="middle"
                fontSize={11}
              >
                50/50%
              </text>

              <text
                x={raceScale(100)}
                y={12}
                textAnchor="middle"
                fontSize={11}
              >
                100%
                <tspan
                  x={raceScale(100)}
                  dy={10}
                >
                  white
                </tspan>
              </text>
            </svg>

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
        </Styled.LegendContainer>
      )}
    </Styled.Container>
  );
};

export default Controls;
