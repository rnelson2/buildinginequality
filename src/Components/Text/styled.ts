import styled from "styled-components";
import { Link } from 'react-router-dom';
import * as Constants from "../../constants";

export const TextBlock = styled.div`
  max-width: 700px;
  margin-left: max(0px, (100% - 700px) / 2);
  grid-area: main;
  line-height: 1.7;

  ol {
    padding-bottom: 4em !important;
    margin-bottom: 4em;
  }

  a {
    ::after {
      vertical-align: middle;
      content: '';
      padding-left: 1.25em;
      // I used a mask instead of a background-image,
      // but the same principal applies.
      background-color: #999999;
      // mix-blend-mode: overlay;
      mask-image: url('data:image/svg+xml; utf8,<svg version="1.1" width="10" height="10" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-2 -2 18 18" style="enable-background:new 0 0 12 12;" xml:space="preserve"><g><line class="st0" x1="0.9" y1="11.1" x2="10.9" y2="1.1" width="2" stroke="white" fill="none"/><polyline class="st0" points="4.3,1.1 10.9,1.1 10.9,8.2" width="2" stroke="white" fill="none"/></g></svg>');
      mask-size: 100% 100%;
      mask-position: center;
      mask-repeat: no-repeat;

      }

      &[href*='//']::after {
      // content: url(/static/images/external_link.svg);
      padding-left: 1.5em;
      mask-image: url(/static/images/external_link.svg);
      background-color: #666666;
    }
  }
`;

export const Title = styled.h2`
  margin-bottom: 1.5rem;
  text-align: center;
  line-height: 1.2;

  @media ${Constants.devices.desktop} {
    margin-bottom: 2rem;
  }
`;

export const Subtitle = styled.h3`
  text-align: center;
`;

export const SectionTitle = styled.h3`
  text-align: center;
`;

export const Figure = styled.figure`
  text-align: center;

  img {
    max-width: 100%;
  }
`;

export const FigCaption = styled.figcaption`
  color: ${Constants.COLOR_BACKGROUND};
  font-style: italic;
  font-size: 0.9em;
`;

export const A = styled.a`
border-bottom: 1px solid ${Constants.COLOR_BACKGROUND};
`;


export const ByLine = styled.div`
  text-align: center;
  font-size: 1.1em;
  margin-top: 20px;
`;

export const NoWrap = styled.span`
  white-space: nowrap;
`;

export const HangingList = styled.ul`
  // padding: 0;
  // list-style: none;

  // li {
  //   padding-left: 22px;
  //   text-indent: -22px;
  // }
`;

export const Text = styled.article`
  grid-area: main;
  max-width: min(900px, 95%);
  height: calc(100vh - 6rem);
  padding: 3rem calc((100% - min(900px, 95%)) / 2);
  color: ${Constants.COLOR_BACKGROUND};
  font-family: ${Constants.TEXT_SANSSERIF};
  font-weight: 300;
  line-height: 1.7;
  background-color: ${Constants.COLOR_TEXT};
  overflow-y: auto;

  * {
    -webkit-transition: all 0.25s ease;
    -moz-transition: all 0.25s ease;
    -o-transition: all 0.25s ease;
    transition: all 0.2s ease-in-out;
  }

  a {
    color: ${Constants.COLOR_BACKGROUND};
    border-bottom: 1px solid currentColor;

    &:hover,
    &:focus,
    &:active {
      border-bottom: 2px solid ${Constants.COLOR_INTERACTIVE_DARK};
    }

    &[grade] {
      border-bottom: none;
    }
  }

  h3 {
    text-align: center;
  }

  ol, ul {
    padding: 0 0 0 14px;

    li {
      margin-bottom: 0.7em;
      padding-left: 2px;
    }
  }

  > img {
    max-width: 100%;
  }

`;

