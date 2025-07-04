import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import * as Constants from '../../constants';

export const MenuToggle = styled.div <{ menuOnByDefault: boolean }>`
  margin: 2rem 1rem 0 0;
  color: ${Constants.COLOR_TEXT_ACCENT};
  text-align: center;
  text-transform: uppercase;
  font-weight: 300;
  display: ${p => p.menuOnByDefault ? 'none' : 'block'};
`;

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


  @media ${Constants.devices.tablet} {
    grid-area: menu;
    display: flex;
    gap: 2rem;
    align-items: center;
    justify-content: flex-end;
    margin-right: 2rem;
    height: auto;
  }
`


export const Section = styled.section`
  padding: 0.25rem 1rem;
  border-bottom: 1px solid black;

  @media ${Constants.devices.desktop} {
    padding: 0.25rem 2rem;
  }

  &:last-child {
    border: none;
  }
`;

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

export const ItemProminent = styled(Item)`
  font-size: 1.25em;

  @media ${Constants.devices.desktop} {
    font-size: 1.5em;
  }
`;

export const ItemDeemphasized = styled(Item)`
  margin-bottom: 1rem;
  transform: translateY(-1rem);
`;


export const SubmenuTitle = styled.h3`
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    margin: 0;
    gap: 0.5rem;
    font-size: inherit;
    font-weight: 300;

    + ul {
      margin-bottom: 3rem;

      a {
        font-size: 0.875em;
        font-weight: 300;
      }
    }

    svg {
      height: 15px;
      width: 15px;
    }

    &:hover,
    &:focus,
    &:active {

      color: ${Constants.COLOR_TEXT};
      
      line {
        stroke: ${Constants.COLOR_ACCENT_RED};
      }
    }
`;

export const Submenu = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  // background: -moz-linear-gradient(90deg, ${Constants.COLOR_BACKGROUND} 90%, ${Constants.COLOR_BACKGROUND} 100%);
  // background: -webkit-linear-gradient(90deg, ${Constants.COLOR_BACKGROUND} 90%, ${Constants.COLOR_BACKGROUND} 100%);
  // background: linear-gradient(90deg, ${Constants.COLOR_BACKGROUND} 90%, ${Constants.COLOR_BACKGROUND} 100%);
`;


export const Link = styled(NavLink)`
  white-space: nowrap;
  text-transform: uppercase;

  &::after {
    content: '' !important;
  }
`;

