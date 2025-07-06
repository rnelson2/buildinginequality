import styled from "styled-components";
import { Link } from "react-router-dom";
import * as Constants from "../../../constants";

export const Container = styled.div`
  grid-row: 2 / -1;
  grid-column: 1 / span 2;
  max-height: calc(100vh - ${Constants.componentDimensions.masthead.height.mobile}px);
  overflow-y: auto;

  @media ${Constants.devices.tablet} {
    max-height: calc(100vh - ${Constants.componentDimensions.masthead.height.tablet}px);
  }

  @media ${Constants.devices.desktop} {
    max-height: calc(100vh - ${Constants.componentDimensions.masthead.height.desktop}px);
  }
`;

export const TextBlock = styled.div`
  max-width: min(700px, 95%);
  padding: 1em calc((100vw - min(700px, 95%)) / 2) 2em;
  
  p {
    font-family: ${Constants.TEXT_SERIF};
  }

  line-height: 1.7;

  ol {
    padding-bottom: 4em !important;
    margin-bottom: 4em;
  }

  a {

    &:hover {
      text-decoration: underline;
    }

    &[href*='//']::after
    {
      // content: url(/static/images/external_link.svg);
      padding-left: 1.5em;
      mask-image: url(/images/external_link.svg);
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
  max-width: min(1000px, 95%);
  padding: 0 calc((100vw - min(1000px, 95%)) / 2);

  img {
    display: block;
    max-width: 100%;
  }
`;

export const SideBySide = styled.div`
  display: flex;
  gap: 1rem;
  max-width: 100%;

  img {
    max-width: calc(50% - 0.5rem);
  }
`; 


export const FigCaption = styled.figcaption`
  color: grey;
  max-width: 600px;
  margin: 0 auto;
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

  ol,
  ul {
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

