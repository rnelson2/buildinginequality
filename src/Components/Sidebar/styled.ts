import styled from "styled-components";
import * as Constants from "../../constants";

export const Sidebar = styled.div`
  grid-area: sidebar;
  height: 100%;
  overflow-y: auto;
`;

export const MenuToggle = styled.div`
  display: none;

  @media ${Constants.devices.desktop} {
    display: block;
    grid-area: menutoggle;
    align-self: center;
    justify-self: center;
    color: ${Constants.COLOR_TEXT_ACCENT};
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    cursor: pointer;

    &:hover,
    &:focus,
    &:active {
      color: ${Constants.COLOR_WHITE};
    }
  }
`;