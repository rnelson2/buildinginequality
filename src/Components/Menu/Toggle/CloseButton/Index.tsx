import { select } from 'd3';
import React, { useEffect, useRef, useState } from 'react';
import * as Constants from '../../../../constants';

//const Masthead = ({ media, edition, selectText }) => {
const Masthead = ({ isMenuOpen }: { isMenuOpen: boolean; }) => {

  const [x1, setX1] = useState('10%');
  const [x2, setX2] = useState('90%');
  const [topY2, setTopY2] = useState('7%');
  const [bottomY2, setBottomY2] = useState('93%');
  const [middleColor, setMiddleColor] = useState(Constants.COLOR_INTERACTIVE);

  const topLine = useRef(null);
  const middleLine = useRef(null);
  const bottomLine = useRef(null);

  useEffect(() => {
    select(middleLine.current)
      .transition()
      .duration(200)
      .style('stroke', (isMenuOpen) ? 'transparent' : Constants.COLOR_INTERACTIVE)
      .on('end', () => {
        setMiddleColor((isMenuOpen) ? 'transparent' : Constants.COLOR_INTERACTIVE);
      })
    select(topLine.current)
      .transition()
      .duration(200)
      .attr('y2', (isMenuOpen) ? '93%' : '7%')
      .attr('x1', (isMenuOpen) ? '20%' : '10%')
      .attr('x2', (isMenuOpen) ? '80%' : '90%')
      .on('end', () => {
        setTopY2((isMenuOpen) ? '93%' : '7%');
        setX1((isMenuOpen) ? '20%' : '10%');
        setX2((isMenuOpen) ? '80%' : '90%');
      })
    select(bottomLine.current)
      .transition()
      .duration(200)
      .attr('y2', (isMenuOpen) ? '7%' : '93%')
      .attr('x1', (isMenuOpen) ? '20%' : '10%')
      .attr('x2', (isMenuOpen) ? '80%' : '90%')
      .on('end', () => {
        setBottomY2((isMenuOpen) ? '7%' : '93%');
      })
  }, [isMenuOpen]);

  return (
    <svg
      width={20}
      height={12}
    >
      <g>
        <line
          x1={x1}
          x2={x2}
          y1='7%'
          y2={topY2}
          strokeWidth='14%'
          ref={topLine}
          style={{
            stroke: Constants.COLOR_INTERACTIVE,
          }}
        />
        <line
          x1={x1}
          x2={x2}
          y1='50%'
          y2='50%'
          strokeWidth='14%'
          ref={middleLine}
          style={{
            stroke: Constants.COLOR_INTERACTIVE,
          }}
        />
        <line
          x1={x1}
          x2={x2}
          y1='93%'
          y2={bottomY2}
          strokeWidth='14%'
          ref={bottomLine}
          style={{
            stroke: Constants.COLOR_INTERACTIVE,
          }}
        />
      </g>
    </svg>
  );
};

export default Masthead;
