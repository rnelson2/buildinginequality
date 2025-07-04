import React from 'react';
import * as Styled from '../styled';
import AboutMenu from '../AboutMenu/Index';
import * as StyledData from './styled';

const Data = () => {
  return (
    <Styled.TextBlock>
      <AboutMenu />
      <Styled.Title>Data</Styled.Title>
      <p>
        The data for used in <cite>Building Inequality</cite> is licensed under a CC-NC-BY license and is free to use for non-commercial purposes with attribution.
      </p>

      <StyledData.Button>
        <a href='/points.geojson' target='_blank' rel='noopener noreferrer' download>
          Download the data as GeoJSON
        </a>
      </StyledData.Button>
    </Styled.TextBlock>
  );
}

export default Data;