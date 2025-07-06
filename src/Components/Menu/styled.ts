import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import * as Constants from '../../constants';

export const Nav = styled.ul`
  z-index: 5001;
  background-color: ${Constants.COLOR_BACKGROUND};
  height: 100vh;
  height: 100dvh;
  grid-area: main;
  justify-self: flex-end;
  width: min-content;
  margin: 0;
  padding-right: 1rem;
  grid-column: 1 / -1;
  grid-row: 2 / -1;


  @media ${Constants.devices.tablet} {
    grid-area: menu;
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: flex-end;
    height: auto;
  }

  @media ${Constants.devices.desktop} {
    gap: 2rem;
    margin-right: 1rem;
  }
`

export const Item = styled.li`
  position: relative;
  margin: 1.5rem 0;
  list-style: none;
  color: ${Constants.COLOR_TEXT_ACCENT};
  text-align: right;
  line-height: 1.2;

  svg {
    a & {
      background: ${Constants.COLOR_ACCENT_RED};
    }
  }

  ul li {
    margin: 1rem calc(0.5rem + 15px) 1rem 0;

    svg {
      position: absolute;
      top: 50%;
      right: -1.5rem;
      height: 14px;
      width: 14px;
      margin-top: -7px;
      stroke: ${Constants.COLOR_TEXT_ACCENT};
    }

    a:hover,
    a:focus,
    a:active {

      svg line {
        stroke: ${Constants.COLOR_ACCENT_RED};
      }
    }
  }
`;

export const Link = styled(NavLink)`
  white-space: nowrap;
  text-transform: uppercase;

  &::after {
    content: '' !important;
  }

  &.active, &:hover {
    border-bottom: 2px solid ${Constants.COLOR_ACCENT_RED};
  }
`;

