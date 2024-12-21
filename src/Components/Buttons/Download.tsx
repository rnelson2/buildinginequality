import React from "react";
import ArrowG from "./ArrowG";
import * as Styled from './styled';

const Download = () => {
  return (
    <Styled.Svg viewBox="0 0 20 20">
      <g transform="rotate(90 10 10)">
        <ArrowG />
      </g>
      <g transform="translate(10 10)">
        <Styled.Line x1={-7} x2={7} y1={8.5} y2={8.5} strokeWidth={1.5} />
      </g>
    </Styled.Svg>
  );
};

export default Download;
