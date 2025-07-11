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
  grid-template-columns: 75vw 25vw;
  grid-template-rows: ${dimensions.masthead.height.mobile}px 3fr 2fr;
  grid-template-areas:
    "masthead      menutoggle"
    "main              main"
    "sidebar        sidebar";

  a {
    color: ${Constants.COLOR_ACCENT_TEXT_RED};

    text-decoration: none;
  }

  @media ${Constants.devices.tablet} {
    grid-template-columns: 50vw 50vw;
    grid-template-rows: ${dimensions.masthead.height.tablet}px 3fr 2fr;
    grid-template-areas:
      "masthead      menu"
      "main              main"
      "sidebar        sidebar";
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
