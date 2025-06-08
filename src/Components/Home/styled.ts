import styled from "styled-components";
import { Link } from "react-router-dom";
import * as Constants from "../../constants";

export const Home = styled.div`
    grid-column: 1 / -1;
    // grid-row: 2 / -1;
    grid-row: 1 / -1;
    height: 100vh;
    width: 100%;
    margin: 0 auto;
    padding: 0;
    font-size: 1em;
    line-height: 1.5;
    overflow: auto;
    background-image: url(/GlenOaksVillage1600.jpeg);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-size: 100vw auto;
    position: relative;
    z-index: 0;

    &::before {
      content: "";
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: rgba(20, 20, 40, 0.85); /* your tint here */
      pointer-events: none;
      z-index: 1;
    }

    @media ${Constants.devices.tablet} {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: min-content min-content min-content auto ;
      grid-template-areas: "title" "subtitle" "description" "explore" ;
      // max-height: clamp(600px, 100vw, 900px);
      overflow-y: visible;
      //background-image: url(${process.env.PUBLIC_URL}/static/images/bg_index_tablet.jpg);
    }

    @media ${Constants.devices.desktop} {
      //background-image: url(${process.env.PUBLIC_URL}/static/images/bg_index_desktop.jpg);
    }

    @media ${Constants.devices.desktop2} {
      //background-image: url(${process.env.PUBLIC_URL}/static/images/bg_index_desktop2.jpg);
      background-size: auto 100vh;
    }

    ~ header {
    display: none;
    }

    ~ nav {
    grid-column: 1 / -1;
    grid-row: 1;
    max-width: none;
    margin-right: auto;
    }
`;

export const Title = styled.h1`
    font-family: ${Constants.TEXT_MASTHEAD};
    position: relative;
    display: block;
    margin-top: 3rem;
    margin-bottom: 0.5rem;
    font-size: 24px;
      text-transform: uppercase;
      color:rgb(178, 151, 197); // ${Constants.COLOR_ACCENT_RED};
    font-weight: 700;
    text-align: center;
    line-height: 1.2;
    z-index: 10;

    @media ${Constants.devices.tablet} {
      font-size: calc(1rem + ((1vw - 4.8px) * 2.5));
        grid-area: title;
        margin-top: 12vh;
    }
`;


export const Subtitle = styled.h2`
  display: block;
  margin-top: 0;
  font-size: calc(1rem + ((1vw - 4.8px) * 0.5)) !important;
  text-align: center;
  line-height: 1.1;
  z-index: 10;
  color: #f0f0f0;
  font-family: ${Constants.TEXT_SANSSERIF};
  font-weight: 400;

  @media ${Constants.devices.tablet} {
    grid-area: subtitle;
  }
`;

export const Description = styled.p`
  max-width: min(90%, 800px);
  margin: 0 auto;
  color: white;
  font-weight: 300;
  text-align: center;
  line-height: 1.4;
  position: relative;
  z-index: 10;

  @media ${Constants.devices.tablet} {
    grid-area: description;
    padding: 10vh 0;
  }
`;

export const Explore = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: min(90%, 800px);
  height: 300px;
  margin: 1rem auto;
  position: relative;
  overflow: visible;

  @media ${Constants.devices.tablet} {
    grid-area: explore;
    height: 500px;
    width: 100%;
    align-self: flex-end;
    margin: 0 auto 3rem auto;
  }
`;

export const ExploreButton = styled(Link)`
  position: absolute;
  top: 40%;
  margin: 0 auto;
  color: ${Constants.COLOR_BACKGROUND};
  font-size: 1em;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  line-height: 1;
  background-color: #4B0082;
  padding: 1em 2em;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border: 1px solid ${Constants.COLOR_BACKGROUND};
  z-index: 1000;
  transition: all 0.25s ease-in;

  &:hover,
  &:focus,
  &:active {
    background-color: rgb(178, 151, 197);
    color: black;
    border-color: black
  }
`;
