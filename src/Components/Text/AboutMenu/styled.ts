import styled from "styled-components";
import * as Constants from "../../../constants";
import { NavLink } from "react-router-dom";

export const Container = styled.div`

  margin: 0 auto;
  padding: 2em 0;
  font-size: 0.9em;
  line-height: 1.5;
  overflow-y: auto;
  scrollbar-width: none;

  display: flex;
  justify-content: center;
  gap: 1rem;

  @media ${Constants.devices.tablet} {
    padding: 2em 2em 2em 2em;
    grid-row: 2 / -1;
    
  }
  @media ${Constants.devices.desktop} {
    padding: 0 0 0 0;
    background: transparent;
    width: 100%;
  }



`;

export const Link = styled(NavLink)`
  text-decoration: none;
  text-transform: uppercase;
  color: ${Constants.COLOR_ACCENT_RED} !important;


  &.active {
    color: ${Constants.COLOR_INTERACTIVE};
    border-bottom: 2px solid ${Constants.COLOR_ACCENT_RED} !important;
  }
  &:hover {
    color: ${Constants.COLOR_INTERACTIVE_DARK};
    border-bottom: 2px solid ${Constants.COLOR_ACCENT_RED};
    text-decoration: none !important;
  }

  &:focus {
    outline: none;
    color: ${Constants.COLOR_ACCENT_RED};
    border-bottom: 2px solid ${Constants.COLOR_ACCENT_RED};
  }
`;




export const Citations = styled.div`
    div:nth-child(odd) {
      color: silver;
      font-size: 1.2rem;
      margin: 1rem 0;
    }
    max-width: min(90vw, 700px);
    margin-left: auto;
    margin-right: auto;

  @media ${Constants.devices.tablet} {
    display: grid;
    grid-template-columns: 150px 1fr;
    gap: 3rem;
  
    div:nth-child(odd) {
      text-align: right;
      align-self: center;
      margin: 0;
    }
  }
`;

