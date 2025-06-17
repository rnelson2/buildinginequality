import { CircleMarker } from "react-leaflet";
import styled, { keyframes, css } from "styled-components";

// Define keyframe animation
const pulse = keyframes`
  0% { r: 6px; opacity: 0.9; }
  50% { r: 10px; opacity: 0.5; }
  100% { r: 6px; opacity: 0.9; }
`;

export const PulsingCircle = styled(CircleMarker)<{ $isEmphasized: boolean }>`
  ${({ $isEmphasized }) =>
    $isEmphasized &&
    css`
      animation: ${pulse} 1.5s infinite ease-in-out;
      transform-origin: center;
    `}
`;

export const NoProperties = styled.div`
  grid-area: map;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.2em;
  color: #aaa;
  text-align: center;
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 5px 10px;
  border-radius: 3px;
  z-index: 1000;
`; 