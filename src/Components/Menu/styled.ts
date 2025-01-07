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

export const NavOLD = styled.ul`
  grid-area: main-start / 1 / -1 / -1;
  height: 100%;
  //width: calc(min(500px, 33vw) - 200px);
  width: 100%;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  justify-self: end;
  font-family: ${Constants.TEXT_SANSSERIF};
  font-size: 17px;
  font-weight: 300;
  z-index: 5001;
  box-shadow: 0px 3px 6px 3px rgba(0, 0, 0, 0.5);
  // hide the scrollbar
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */

  ::-webkit-scrollbar { 
      display: none;  /* Safari and Chrome */
  }

  @media ${Constants.devices.tablet} {
    grid-area: main-start / 2 / main-end / main-end;
  }

  @media ${Constants.devices.desktop} {
    position: relative;
    right: auto;
    grid-area: sidebar;
    font-size: 18px;
    z-index: 0;
    box-shadow: none;
  }
`;

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

const ALink = css`
  position: relative;
  display: inline-block;
  padding-bottom: 5px;
  color: ${Constants.COLOR_TEXT_ACCENT};

  &:after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    background-color: blue;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

    &:hover:after,
    &:focus:after,
    &:active:after,
    &.active:after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
    &.active {
      color: ${Constants.COLOR_TEXT};
    }

  * {
    -webkit-transition: all 0.25s ease;
    -moz-transition: all 0.25s ease;
    -ms-transition: all 0.25s ease;
    -o-transition: all 0.25s ease;
    transition: all 0.25s ease;
  }

  &:hover,
  &:focus,
  &:active {
    color: ${Constants.COLOR_TEXT};
  }
`

export const A = styled.a`
  ${ALink};
`;

export const Link = styled(NavLink)`
  ${ALink}; 
`;

