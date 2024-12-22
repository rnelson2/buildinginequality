import styled from 'styled-components';
import * as Constants from '../../../constants';

export const SelectCity = styled.div`
  grid-area: map;
  position: absolute;
    top: 20px;
  left: 20px;
  gap: 20px;
  width: 400px;
  height: 300px;

  @media ${Constants.devices.tablet} {
    width: 520px;
    margin: 10px auto 10px calc((100vw - 520px) / 2);
  }

  @media ${Constants.devices.desktop} {
    grid-column: 2 / span 1;
    grid-row: 1 / span 3;
    width: 300px;
    margin: 20px 0 0 20px;
    max-height: calc(100vh - 200px);

  }
  z-index: 2500;
`;