import React from "react";
import ArrowG from "./ArrowG";
import * as Styled from './styled';

const Download = () => {
  return (
    <Styled.Svg viewBox="0 0 20 20">
      <g transform="rotate(180 10 10)">
        <ArrowG />
      </g>
    </Styled.Svg>
  );
};

export default Download;
