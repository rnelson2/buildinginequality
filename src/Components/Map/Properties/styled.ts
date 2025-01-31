import styled from "styled-components";
import { CircleMarker } from "react-leaflet";

// Define the SVG pattern as a Base64-encoded background image
const hatchPattern = `data:image/svg+xml;base64,${btoa(`
<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
<defs>
    <pattern id="hatchPattern" patternUnits="userSpaceOnUse" width="20" height="20">
      <line x1="0" x2="20" y1="20" y2="0" stroke="white" stroke-width="4" stroke-linecap="round"/>

    </pattern>
  </defs>
  <circle cx="50" cy="50" r="45" fill="#8B4513" stroke="black" stroke-width="2"/>
  <circle cx="50" cy="50" r="45" fill="url(#hatchPattern)" stroke="black" stroke-width="2"/>
      </svg>
`)}`;


export const Marker = styled(CircleMarker)`
  fill: url("${hatchPattern}") !important;
`;