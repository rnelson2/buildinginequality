import * as d3 from 'd3';
import React, { useEffect, useRef, useState } from 'react';

//const Masthead = ({ media, edition, selectText }) => {
const Masthead = ({ $isMenuOpen }: { $isMenuOpen: boolean; }) => {

  const [x2, setX2] = useState(($isMenuOpen) ? '80%' : '43%');
  const [topY1, setTopY1] = useState('7%');
  const [topY2, setTopY2] = useState('7%');
  const [bottomY1, setBottomY1] = useState('93%');
  const [bottomY2, setBottomY2] = useState('93%');
  const [middleColor, setMiddleColor] = useState('currentColor');

  const topLine = useRef(null);
  const middleLine = useRef(null);
  const bottomLine = useRef(null);

  useEffect(() => {
    d3.select(middleLine.current)
      .transition()
      .duration(200)
      .style('stroke', ($isMenuOpen) ? 'transparent' : 'currentColor')
      .on('end', () => {
        setMiddleColor(($isMenuOpen) ? 'transparent' : 'currentColor');
      })
    d3.select(topLine.current)
      .transition()
      .duration(200)
      .attr('x2', ($isMenuOpen) ? '80%' : '43%')
      .attr('y1', ($isMenuOpen) ? '7%' : '50%')
      .attr('y2', ($isMenuOpen) ? '93%' : '7%')
      .on('end', () => {
        setTopY1(($isMenuOpen) ? '7%' : '50%');
        setTopY2(($isMenuOpen) ? '93%' : '7%');
        setX2(($isMenuOpen) ? '80%' : '43%');
      })
    d3.select(bottomLine.current)
      .transition()
      .duration(200)
      .attr('x2', ($isMenuOpen) ? '80%' : '43%')
      .attr('y1', ($isMenuOpen) ? '93%' : '50%')
      .attr('y2', ($isMenuOpen) ? '7%' : '93%')
      .on('end', () => {
        setBottomY1(($isMenuOpen) ? '93%' : '50%');
        setBottomY2(($isMenuOpen) ? '7%' : '93%');
      })
  }, [$isMenuOpen]);

  return (
    <svg
      width={20}
      height={12}
    >
      <g>
        <line
          x1={'20%'}
          x2={x2}
          y1={topY1}
          y2={topY2}
          strokeWidth='10%'
          ref={topLine}
          style={{
            stroke: 'currentColor',
          }}
        />
        <line
          x1={'20%'}
          x2={'90%'}
          y1='50%'
          y2='50%'
          strokeWidth='10%'
          ref={middleLine}
          style={{
            stroke: middleColor,
          }}
        />
        <line
          x1={'20%'}
          x2={x2}
          y1='93%'
          y2={bottomY2}
          strokeWidth='10%'
          ref={bottomLine}
          style={{
            stroke: 'currentColor',
          }}
        />
      </g>
    </svg>
  );
};

export default Masthead;
