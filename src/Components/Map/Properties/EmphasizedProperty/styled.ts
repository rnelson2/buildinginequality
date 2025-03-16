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