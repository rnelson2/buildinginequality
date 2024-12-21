import React from 'react';

const Ellipses = () => {
  return (
    <svg viewBox='0 0 20 20'>
      <g transform={`translate(${2} ${20 / 2})`}>
        <circle
          r={2}
          fill='#83d1dc'
        />
        <circle
          cx={8}
          r={2}
          fill='#83d1dc'
        />
        <circle
          cx={16}
          r={2}
          fill='#83d1dc'
        />
      </g>
    </svg>
  );
}

export default Ellipses;