import styled from "styled-components";
import * as Constants from "../../constants";

export const Map = styled.div`
  grid-area: main;
  width: 100%;
  height: 100%;
  position: relative;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);

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

  .leaflet-control-zoom {
    bottom: 80px;
    right: 10px;
  }
`;
