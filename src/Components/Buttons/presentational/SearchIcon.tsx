import React from 'react';

const SearchIcon = (props: {size?: number; color?: string;}) => {
  const size = props.size || 20;
  const color = props.color || '#4B4E6D';
  return (
    <svg
      width={size}
      height={size}
      className='icon search'
    >

      <g transform={`translate(${size / 2 * 1.3} ${size / 2 * 1.3}) rotate(315)`}>
        <circle
          cx={0}
          cy={size * 1.3 * -0.1}
          r={size * 1.3 * 0.2}
          fill='transparent'
          fillOpacity={1}
          stroke={color}
          strokeWidth={size / 9}
        />
        <line
          x1={0}
          x2={0}
          y1={size * 1.3 * 0.1}
          y2={size * 1.3 * 0.4}
          stroke={color}
          strokeWidth={size / 7}
        />
      </g>
    </svg>
  )
};

export default SearchIcon;
