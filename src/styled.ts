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
  overflow: hidden;
  background-color: ${Constants.COLOR_BACKGROUND};
  grid-template-columns: 25vw 25vw calc(50vw - ${dimensions.menuToggle.width.mobile}px) ${dimensions.menuToggle.width.mobile}px;
  grid-template-rows: ${dimensions.masthead.height.mobile}px 35vh auto 90px;
  grid-template-areas:
    "masthead   masthead   masthead  menutoggle"
    "main       main       main      main"
    "main       main       main      main"
    "main       main       main      main";

  @media ${Constants.devices.tablet} {
    grid-template-columns: 50vw calc(50vw - ${dimensions.menuToggle.width.tablet}px) ${dimensions.menuToggle.width.tablet}px;
    grid-template-rows: ${dimensions.masthead.height.tablet}px 3fr 2fr;
    grid-template-areas:
      "masthead   masthead   menutoggle"
      "main       main       main"
      "main       main       main";
  }

  @media ${Constants.devices.desktop} {
    grid-template-columns: ${Constants.componentDimensions.sidebar.width.desktop}px 300px auto;
    grid-template-rows: ${dimensions.masthead.height.desktop}px ${dimensions.menuToggle.height}px calc(100vh - ${dimensions.masthead.height.desktop}px - ${dimensions.menuToggle.height}px);
    grid-template-areas:
      "masthead   main main"
      "menutoggle main main"
      "sidebar    main main";
  }



  .text {
    grid-column: 2 / span 2;
    grid-row: 1 / span 3;
  }
  a {
    text-decoration: none;
  }
`;
