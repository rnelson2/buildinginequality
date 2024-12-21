import React from 'react';

const LessThan = () => (
  <svg viewBox="0 0 20 20">
    <g transform={`translate(10 10)`}>
      <line
        x1='-22.5%'
        x2='22.5%'
        y1={0}
        y2='-45%'
        strokeWidth='10%'
      />
      <line
        x1='-22.5%'
        x2='22.5%'
        y1={0}
        y2='45%'
        strokeWidth='10%'
      />
    </g>
  </svg>
);

export default LessThan;