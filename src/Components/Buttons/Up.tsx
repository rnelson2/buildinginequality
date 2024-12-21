import React from 'react';

const Up = () => (
  <svg viewBox="0 0 20 20">
    <g transform={`translate(10 10)`}>
      <line
        x1='-40%'
        x2={0}
        y1='42.5%'
        y2='0'
        strokeWidth='10%'
      />
      <line
        x1='40%'
        x2={0}
        y1='42.5%'
        y2='0'
        strokeWidth='10%'
      />

      <line
        x1='-40%'
        x2={0}
        y1='7.5%'
        y2='-32.5%'
        strokeWidth='10%'
      />
      <line
        x1='40%'
        x2={0}
        y1='7.5%'
        y2='-32.5%'
        strokeWidth='10%'
      />
    </g>
  </svg>
);

export default Up;