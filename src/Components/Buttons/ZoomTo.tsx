import React from "react";
import * as Constants from "../../constants";
import * as Styled from "./styled";

const ZoomTo = () => {
  return (
    <Styled.Svg viewBox="0 0 20 20">
      <g transform="translate(10 10)">
        <Styled.CircleOutline cx={0} cy={0} r={6} strokeWidth={2} />
        <Styled.Circle cx={0} cy={0} r={2} fill={Constants.COLOR_TEXT_ACCENT} />
        <Styled.Line x1={0} x2={0} y1={6} y2={10} stroke={Constants.COLOR_TEXT_ACCENT} strokeWidth={1.5} />
        <Styled.Line x1={0} x2={0} y1={-6} y2={-10} stroke={Constants.COLOR_TEXT_ACCENT} strokeWidth={1.5} />
        <Styled.Line x1={6} x2={10} y1={0} y2={0} stroke={Constants.COLOR_TEXT_ACCENT} strokeWidth={1.5} />
        <Styled.Line x1={-6} x2={-10} y1={0} y2={0} stroke={Constants.COLOR_TEXT_ACCENT} strokeWidth={1.5} />
      </g>
    </Styled.Svg>
  );
};

export default ZoomTo;
