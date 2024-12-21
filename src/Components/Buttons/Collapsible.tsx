import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';


const Collapsible = ({ isOpen }: { isOpen: boolean; }) => {
  const [rotate, setRotate] = useState(0);
  const ref = useRef(null);
  
  useEffect(() => {
    const newRotate = (isOpen ? 90 : 0);
    d3.select(ref.current)
      .transition()
      .duration(200)
      .attr('transform', `rotate(${newRotate} 7 7)`)
      .on('end', () => {
        setRotate(newRotate);
      });
  }, [isOpen]);

  return (
    <svg
      viewBox='0 0 20 20'
    >
      <g
        transform={`rotate(${rotate} 10 20)`}
        ref={ref}
      >
        <line
          x1='25%'
          x2='75%'
          y1='0%'
          y2='50%'
        />
        <line
          x1='25%'
          x2='75%'
          y1='100%'
          y2='50%'
        />
      </g>

    </svg>
  )
};

export default Collapsible;