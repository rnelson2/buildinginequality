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
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
  background-color: white;
  border-radius: 0.25em;
  border: 0.5px solid #777;
  padding: 1em;
`;

export const HexContainer = styled(Container)`
  height: 90px;
  width: 320px;
  max-width: 95vw;
  overflow-y: auto;
  background-color: white;
  padding: 5px 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
  border: 2px solid rgba(0, 0, 0, 0.2);
`;

export const LegendContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
  background-color: white;
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);

  pointer-events: auto;
`

export const Toggle = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 10px;
`;

export const Legend = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Link = styled(RRLink) <{ selected: boolean }>`
  color: ${props => props.selected ? 'black' : 'gray'};
  text-decoration: ${props => props.selected ? 'underline' : 'none'} !important;
  font-weight: ${props => props.selected ? 'bold' : 'normal'};
  &:hover {
    text-decoration: underline;
  }

`

export const IncomeLegend = styled.div` 
  display: grid;
  grid-template-columns: min-content 200px;
  align-content: flex-start;
  grid-gap: 10px;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  flex-grow: 10;

  svg {
    grid-column: 2 / 2;
    overflow: visible;
  }
`;

export const Label = styled.div`
  font-size: 15px;
  text-align: center;
`

export const CensusTractToggle = styled(RRLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  color: black;
`

export const ToggleButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.5);
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  text-transform: uppercase;
  font-size: 10px;
  pointer-events: auto;
  cursor: pointer;
`;

export const CloseButton = styled.div`
  text-align: right;

  svg {
    width: 20px;
    height: 20px;
    line {
      stroke: black;
    }
  }
`;

export const NoCensusData = styled.div`
  display: flex;
  gap: 1em;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 14px;
`;

export const LegendWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  width: 150px
  
`;

export const CirclesWrapper = styled.div`
  position: relative;
  width: 50px;
`;

export const Circle = styled.div<{ size: number; color: string; fill: string }>`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  background-color: ${({ fill }) => fill};
  border: 2px solid ${({ color }) => color};
  fill-opacity: 0.1;
`;

export const LabelsWrapper = styled.div`
  position: relative;
  height: 100px; /* Match CirclesWrapper height */
`;

export const LabelCircle = styled.span<{ $topOffset: number }>`
  position: absolute;
  left: 0;
  transform: translateY(-50%);
  top: ${({ $topOffset }) => `calc(100% - ${$topOffset * 2}px)`}; 
  font-size: 0.75rem;
  white-space: nowrap;
  text-align: left;
`;

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

