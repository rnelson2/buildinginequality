import React from 'react';

const Close = () => (
  <svg viewBox="0 0 20 20">
    <g transform={`translate(10 10) rotate(45)`}>
      <line
        x1='-45%'
        x2='45%'
        y1={0}
        y2={0}
        strokeWidth='10%'
      />
      <line
        x1={0}
        x2={0}
        y1='-45%'
        y2='45%'
        strokeWidth='10%'
      />
    </g>
  </svg>
);

export default Close;