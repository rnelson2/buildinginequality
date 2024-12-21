import styled from 'styled-components';
import * as Constants from '../../constants';

export const Masthead = styled.header`
  grid-area: masthead;
  text-align: left;
  background-color: ${Constants.COLOR_BACKGROUND};
  display: flex;
  height: 100%;

  @media ${Constants.devices.desktop} {
    text-align: center;
  }
`;

export const Title = styled.h1`
  display: inline-block;
  font-family: ${Constants.TEXT_MASTHEAD};
  line-height: 1;
  margin: 8px 0 1px 10px;
  font-size: 20px;
  text-transform: uppercase;
  color:   #4B0082; // ${Constants.COLOR_ACCENT_RED};
  font-weight: 400;

  @media ${Constants.devices.tablet} {
    font-size: 30px;
    margin: 0 10px;
    line-height: ${Constants.componentDimensions.masthead.height.tablet}px;
  }

  @media ${Constants.devices.desktop} {
    margin: 20px 5px 0 5px;
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
    display: block;
    font-size: 14px !important;
    margin: 0 10px;
    line-height: ${Constants.componentDimensions.masthead.height.tablet}px;
  }

  @media ${Constants.devices.desktop} {
    font-size: 13px !important;
    margin: 3px 1rem 0 1rem;
    line-height: 1;
  }
`;

