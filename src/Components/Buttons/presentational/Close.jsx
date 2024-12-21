import React from 'react';

const Minimize = () => (
  <svg
    width={20}
    height={20}
    style={{
      margin: 0,
    }}
  >
    <g transform={`translate(${20 / 2} ${20 / 2}) rotate(45)`}>
      {/* <circle
        cx={0}
        cy={0}
        r={20 / 2}
        fill="#4B4E6D"
        fillOpacity={1}
      /> */}
      <line
        x1={-8}
        x2={8}
        y1={0}
        y2={0}
        stroke="#edb443"
        strokeWidth={20 / 10}
      />
      <line
        x1={0}
        x2={0}
        y1={-8}
        y2={8}
        stroke="#edb443"
        strokeWidth={20 / 10}
      />
    </g>
  </svg>
);

export default Minimize;
