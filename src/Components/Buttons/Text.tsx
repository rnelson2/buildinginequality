import React from 'react';

const Text = () => (
  <svg viewBox="0 0 40 20">
    <g transform={`translate(20 10)`}>
      <text
        x='0%'
        y='42%'
        fontSize='26px'
        fontFamily='serif'
        textAnchor='end'
      >
        T
      </text>
      <line
        x1='8%'
        x2='50%'
        y1='-35%'
        y2='-35%'
        strokeWidth='10%'
      />
      <line
        x1='8%'
        x2='30%'
        y1='0%'
        y2='0%'
        strokeWidth='10%'
      />
      <line
        x1='8%'
        x2='40%'
        y1='35%'
        y2='35%'
        strokeWidth='10%'
      />
    </g>
  </svg>
);

export default Text;