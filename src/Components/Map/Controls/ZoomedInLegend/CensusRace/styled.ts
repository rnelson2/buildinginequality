import styled from "styled-components";
import { Link as RRLink } from "react-router-dom";

export const IncomeLegend = styled.div` 
  /* display: grid;
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
  */
`;

export const Label = styled.div`
  text-align: center;
  font-size: 13px;
`

export const CensusTractToggle = styled(RRLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  color: black;
`