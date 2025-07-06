import styled from 'styled-components';
import * as Constants from '../../../constants';

export const SelectCity = styled.div`
  grid-area: map;
  position: absolute;
    top: 0px;
  right: 80px;
  gap: 20px;
  width: calc(100% - 40px);
  max-height: calc(100% - 40px);

  @media ${Constants.devices.tablet} {
    width: 400px;
    margin: 10px auto 10px calc((100vw - 520px) / 2);
  }

  @media ${Constants.devices.desktop} {
    width: 400px;
    grid-column: 2 / span 1;
    grid-row: 1 / span 3;
    width: 200px;
    max-height: calc(100vh - 200px);

  }
  z-index: 2500;
`;