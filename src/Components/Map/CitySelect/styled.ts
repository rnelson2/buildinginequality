import styled from 'styled-components';
import * as Constants from '../../../constants';

export const SelectCity = styled.div`
  grid-area: map;
  position: absolute;
    top: 0px;
    right: 60px;
  gap: 20px;
  max-height: calc(100% - 40px);
  width: 200px;
  margin: 10px auto 10px calc((100vw - 520px) / 2);

  @media ${Constants.devices.tablet} {
    right: 80px;
  }

  @media ${Constants.devices.desktop} {
    grid-column: 2 / span 1;
    grid-row: 1 / span 3;
    
    max-height: calc(100vh - 200px);

  }
  z-index: 2500;
`;