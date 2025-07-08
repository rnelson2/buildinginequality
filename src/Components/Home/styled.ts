import styled from "styled-components";
import { Link } from "react-router-dom";
import * as Constants from "../../constants";

export const Home = styled.div`
    grid-column: 1 / -1;
    // grid-row: 2 / -1;
    grid-row: 1 / -1;
    height: 100vh;
    height: 100svh; /* Static viewport height for mobile */
    height: 100dvh; /* Dynamic viewport height for mobile */
    width: 100%;
    margin: 0 auto;
    padding: 0;
    line-height: 1.5;
    overflow: hidden;
    background-image: url(/GlenOaksVillage1600.jpeg);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-size: auto 100vh;
    position: relative;
    z-index: 0;
    align-items: center;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 50px 25vh calc((100vh - 50px - 25vh) / 2) calc((100vh - 50px - 25vh) / 2);
    grid-template-areas: "menu" "title" "description" "explore" ;

    &::before {
      content: "";
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: rgba(20, 20, 40, 0.85); /* your tint here */
      pointer-events: none;
      z-index: 1;
    }

    @media ${Constants.devices.tablet} {
      background-size: 100vw auto;
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

export const TitleArea = styled.div`
  grid-area: title;
  z-index: 10;
`;

export const Title = styled.h1`
    font-family: ${Constants.TEXT_MASTHEAD};
    position: relative;
    margin: 0;
    font-size: 24px;
    text-transform: uppercase;
    color: ${Constants.COLOR_ACCENT_RED_LIGHT};
    font-weight: 700;
    text-align: center;
    line-height: 1.2;

    @media ${Constants.devices.tablet} {
      font-size: calc(1rem + ((1vw - 4.8px) * 2.5));
    }
`;


export const Subtitle = styled.h2`
  display: block;
  margin: 0;
  font-size: calc(1rem + ((1vw - 4.8px) * 0.5)) !important;
  text-align: center;
  line-height: 1.1;
  z-index: 10;
  color: #F3BDBD;
  font-family: ${Constants.TEXT_SANSSERIF};
  font-weight: 400;
  max-width: min(90%, 800px);
  margin: 0 auto;
`;

export const Description = styled.p`
  max-width: min(90%, 800px);
  margin: 0 auto;
  color: white;
  font-weight: 300;
  text-align: center;
  line-height: 1.4;
  z-index: 10;
  grid-area: description;

  @media ${Constants.devices.tablet} {
    font-size: 1.3em;
  }
`;

export const Explore = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
  max-width: min(90%, 800px);
  margin: 1rem auto;
  position: relative;
  overflow: visible;
  width: 100%;
  grid-area: explore;

  @media ${Constants.devices.tablet} {
    
    align-self: center;    
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
  background-color: ${Constants.COLOR_ACCENT_RED};
  color: white !important;
  padding: 1em 2em;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border: 1px solid ${Constants.COLOR_BACKGROUND};
  z-index: 1000;
  transition: all 0.25s ease-in;
  text-transform: uppercase;

  &:hover,
  &:focus,
  &:active {
    background-color: rgb(178, 151, 197);
    color: black !important;;
    border-color: black
  }
`;

export const Menu = styled.div`
  grid-area: menu;
  display: flex;
  gap: 1rem;
  z-index: 10;
  margin: 1rem auto;
  text-transform: uppercase;

  a {
    color: #eeeeee !important;
    border-bottom: 2px solid transparent;
    &:hover {
      color: ${Constants.COLOR_ACCENT_RED_LIGHT} !important;;
      border-bottom: 2px solid ${Constants.COLOR_ACCENT_RED_LIGHT};
  
    }
  }

  @media ${Constants.devices.tablet} {
    gap: 2rem;
  }
`;
