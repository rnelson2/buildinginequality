import React from "react";
import ArrowG from "./ArrowG";
import * as Styled from './styled';

const ArrowsToggle = () => {
  return (
    <Styled.Svg viewBox="0 0 20 20">
      <g transform="rotate(180 10 10) translate(3 3)">
        <ArrowG />
      </g>
      <g transform="translate(3 3)">
        <ArrowG />
      </g>
    </Styled.Svg>
  );
};

export default ArrowsToggle;
