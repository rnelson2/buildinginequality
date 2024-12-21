import * as React from 'react';

const HamburgerIcon = props => (
  <svg
    width={(props && props.size) ? props.size : '20px'}
    height={(props && props.size) ? props.size : '12px'}
    className='hamburger'
  >
    <g>
      <line
        x1='10%'
        x2='90%'
        y1='7%'
        y2='7%'
        strokeWidth='14%'
      />
      <line
        x1='10%'
        x2='90%'
        y1='50%'
        y2='50%'
        strokeWidth='14%'
      />
      <line
        x1='10%'
        x2='90%'
        y1='93%'
        y2='93%'
        strokeWidth='14%'
      />
    </g>
  </svg>
);

export default HamburgerIcon;
