import React from 'react';
import * as Styled from './styled';
import { getColor } from '../../../../../utilities';

const CensusRaceLegend = () => {
  return (
    <Styled.IncomeLegend>
                   

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
    </Styled.IncomeLegend>
  );
}

export default CensusRaceLegend;