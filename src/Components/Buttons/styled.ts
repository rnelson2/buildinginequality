import styled from 'styled-components';

export const Line = styled.line`
  stroke: black;
`;

export const Circle = styled.circle`
  fill: black;
`;

export const CircleOutline = styled.circle`
  fill: transparent;
  stroke: black;
`;

export const Svg = styled.svg`
  :hover {
    ${Line}, ${CircleOutline} {
      stroke: red;
    }

    ${Circle} {
      fill: red;
    }
  }
`;