import styled from "styled-components";
import * as Constants from "../../constants"

export const Container = styled.div`
  text-align: center;

  svg {
    max-width: 500px;
  }

  @media ${Constants.devices.desktop} {
    padding: 0 15px;
  }
`;

export const Explanation = styled.div`
  color: grey;
`;