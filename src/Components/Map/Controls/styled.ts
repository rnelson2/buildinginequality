import styled from 'styled-components';
import { Link as RRLink } from "react-router-dom";

export const Container = styled.div`
  grid-area: map;
  position: absolute;
    bottom: 20px;
  right: 20px;
  display: flex;
  align-items: flex-end;
  gap: 20px;
  width: 400px;
  height: 300px;
  justify-content: flex-end;
`;

export const LegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-end;
  justify-content: space-between;

  z-index: 1000;
  background-color: white;
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);

  width: 330px;
  height: 300px;
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
  grid-column: 1 / 1;
  text-align: right;
  font-size: 13px;
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