import styled, { createGlobalStyle } from "styled-components";
import * as Constants from "./constants";

const dimensions = Constants.componentDimensions;

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }

`;

export const App = styled.div`
  display: grid;
  font-family: ${Constants.TEXT_SANSSERIF};
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  background-color: ${Constants.COLOR_BACKGROUND};
    grid-template-columns: 50vw calc(50vw - ${dimensions.menuToggle.width.tablet}px) ${dimensions.menuToggle.width.mobile}px;
    grid-template-rows: ${dimensions.masthead.height.mobile}px 3fr 2fr;
    grid-template-areas:
      "masthead   masthead   menutoggle"
      "main       main       main"
      "sidebar    sidebar    sidebar";

  @media ${Constants.devices.tablet} {
    grid-template-columns: 50vw calc(50vw - ${dimensions.menuToggle.width.tablet}px) ${dimensions.menuToggle.width.tablet}px;
    grid-template-rows: ${dimensions.masthead.height.tablet}px 3fr 2fr;
    grid-template-areas:
      "masthead   masthead   menu"
      "main       main       main"
      "sidebar    sidebar    sidebar";
  }

  
@media ${Constants.devices.desktop} {
  grid-template-columns: auto minmax(420px, 25vw);
  grid-template-rows: ${dimensions.masthead.height.desktop}px auto;
  grid-template-areas:
    "masthead menu"
    "main  sidebar";
}



  .text {
    grid-column: 2 / span 2;
    grid-row: 1 / span 3;
  }
  a {
    text-decoration: none;
  }
`;
