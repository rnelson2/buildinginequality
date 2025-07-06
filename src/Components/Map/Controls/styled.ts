import styled from 'styled-components';
import { Link as RRLink } from "react-router-dom";
import * as Constants from '../../../constants';
import { hexToRgba } from '../../../utilities';

export const Container = styled.div`
  grid-area: map;
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  background-color: white;
  border-radius: 0.25em;
  border: 0.5px solid #777;
  padding: 1em;
  max-height: calc(100% - 120px);
  overflow-y: auto;
`;




export const Label = styled.div`
  font-size: 15px;
  text-align: center;
`



export const HowToUseButton = styled.button`
  background-color: ${hexToRgba(Constants.COLOR_ACCENT_RED, 0.5)};
  color: black;
  border: 1px solid #444;
  border-radius: 2px;
  padding: 5px;
  cursor: pointer;
  font-size: 0.7em;
  font-weight: normal;
  text-transform: uppercase;

  &:hover {
    background-color: ${Constants.COLOR_ACCENT_RED};;
    color: white; 
  }
`; 

export const LegendButton = styled.button`
  grid-area: map;
  position: absolute;
  bottom: 20px;
  right: 10px;
  background-color: ${Constants.COLOR_ACCENT_RED_LIGHT};
  color: black;
  border: 1px solid #444;
  border-radius: 2px;
  padding: 5px;
  cursor: pointer;
  font-size: 0.7em;
  font-weight: normal;
  text-transform: uppercase;
  z-index: 1000;

  &:hover {
    background-color: ${Constants.COLOR_ACCENT_RED};
    color: white;
  }
`;

export const Close = styled.div`
  position: sticky;
  top: 8px;
  text-align: right;
  align-self: flex-end;
  cursor: pointer;
  height: 0;
  overflow: visible;
  svg {
    width: 16px;
    height: 16px;
    padding: 3cqmin;
    fill: #333;
    stroke: white;
    background-color: ${Constants.COLOR_ACCENT_RED};
    border-radius: 50%;

    &:hover {
      background-color: black;
    }
  }
`;

