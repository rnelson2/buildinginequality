import React from 'react';
import * as Constants from "../../constants";

const ExternalLink = () => (
  <svg viewBox="0 0 20 20">
    <g>
      <line
        x1={0.5}
        x2={0.5}
        y1={2}
        y2={13.5}
        strokeWidth={1}
      />

      <line
        x1={0.5}
        x2={12}
        y1={13.5}
        y2={13.5}
        strokeWidth={1}
      />

      <line
        x1={0.5}
        x2={8}
        y1={2}
        y2={2}
        strokeWidth={1}
      />

      <line
        x1={12}
        x2={12}
        y1={7}
        y2={13.5}
        strokeWidth={1}
      />

      <line
        x1={7}
        x2={13.5}
        y1={7}
        y2={0.5}
        strokeWidth={1}
      />

      <line
        x1={9}
        x2={13.5}
        y1={0.5}
        y2={0.5}
        strokeWidth={1}
      />

      <line
        x1={13.5}
        x2={13.5}
        y1={0.5}
        y2={5}
        strokeWidth={1}
      />
    </g>
  </svg>
);

export default ExternalLink;