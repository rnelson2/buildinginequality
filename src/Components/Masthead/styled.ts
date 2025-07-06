import styled from 'styled-components';
import * as Constants from '../../constants';

export const Container = styled.div`
 grid-area: masthead;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem; /* Add some padding around the masthead */
    background-color: ${Constants.COLOR_BACKGROUND}; /* Optional: Background for the masthead */
`


export const Masthead = styled.header`
  text-align: left;
  background-color: ${Constants.COLOR_BACKGROUND};
  display: flex;
  height: 100%;
  max-width: 450px;
  align-items: center;
  
  @media ${Constants.devices.tablet} {
    padding-left: 2em;
  }



`;

export const Title = styled.h1`
  display: inline-block;
  font-family: 'Krona One', ${Constants.TEXT_MASTHEAD};
  line-height: 1;
  margin: 0 0 0 10px;
  font-size: 16px;
  text-transform: uppercase;
  color:  ${Constants.COLOR_ACCENT_RED}; // #4B0082; // 
  font-weight: 400;

  @media ${Constants.devices.tablet} {
    font-size: 24px;
    margin: 0;
    line-height: 1;
  }

  @media ${Constants.devices.desktop} {
    font-size: 24px;
    margin: 0;
    line-height: 1;
  }
`;

export const Subtitle = styled.h2`
  display: inline-block;
  margin: 1px 0 0 10px;
  color: #333333;
  font-size: 12px !important;
  text-transform: uppercase;
  letter-spacing: 0.1em !important;
  font-family: ${Constants.TEXT_SANSSERIF};
  font-weight: 400;
  display: none;

  @media ${Constants.devices.tablet} {
    display: none;
    font-size: 13px !important;
    margin: 3px 0 0 0;
    line-height: 1;
  }

  @media ${Constants.devices.desktop} {
    display: block;
    font-size: 13px !important;
    margin: 3px 0 0 0;
    line-height: 1;
  }
`;

