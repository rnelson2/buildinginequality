import styled from 'styled-components';
import * as Constants from "../../../../constants";

export const Container = styled.div`
  position: absolute;
  // center the container
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: clamp(300px, 66%, 600px);
  max-height: calc(100% - 50px);
  background-color: rgba(255, 255, 255, 0.98);
  border-radius: 8px;
  padding: 16px;
  z-index: 2600;
  line-height: 1.5;
  overflow-y: auto;

  h2 {
    text-align: center;
  }
`;

export const Figure = styled.figure`
  margin: 0;
  text-align: center;

  img {
    max-width: 80%;
    height: auto;
    border-radius: 8px;
  }

  figcaption {
    margin-top: 8px;
    font-size: 0.9em;
    color: #555;
    font-style: italic;
  }
`;

export const Close = styled.div`
  position: sticky;
  top: 8px;
  text-align: right;
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
    padding: 4px;
    fill: #333;
    stroke: white;
    background-color: ${Constants.COLOR_ACCENT_RED};
    border-radius: 50%;

    &:hover {
      background-color: black;
    }
  }
`;
