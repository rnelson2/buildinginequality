import styled from "styled-components";
import * as Constants from "../../constants";
import { hexToRgba } from "../../utilities";

export const Map = styled.div`
  grid-area: main;
  width: 100%;
  height: 100%;
  position: relative;
  box-shadow: 0px 4px 6px ${hexToRgba(Constants.COLOR_ACCENT_RED, 0.5)};
  border: 1px solid black;

  @media ${Constants.devices.tablet} {
    width: calc(100% - 2rem);
    height: calc(100% - 2rem);
    margin: 1rem;
  }

  @media ${Constants.devices.desktop} {
    width: calc(100% - 2rem);
    height: calc(100% - 2rem);
    margin: 0 0 2rem 2rem;
  }

  /* .leaflet-control-zoom {
    bottom: 100px;
    right: 10px;
  } */
`;
