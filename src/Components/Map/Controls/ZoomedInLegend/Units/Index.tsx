import React from 'react';
import * as Styled from './styled'
import { hexToRgba } from '../../../../../utilities';
import * as Constants from '../../../../../constants';

const Units = () => {
  const radius = (units: number) => Math.sqrt(units) * 0.5;
  const legendValues = [3000, 1500, 500, 100];

  return (
    <Styled.Container>
      <Styled.Label>Number of<br />Property Units</Styled.Label>
    <Styled.LegendWrapper>
      <Styled.CirclesWrapper>
        {legendValues.map(value => (
          <Styled.Circle
            key={`circle-${value}`}
            size={radius(value) * 2}
            color={'white'}

            fill={hexToRgba(Constants.COLOR_ACCENT_RED, 0.5)}
          />
        ))}
      </Styled.CirclesWrapper>
      <Styled.LabelsWrapper>
        {[...legendValues].reverse().map(value => (
          <Styled.LabelCircle
            key={`label-${value}`}
            $topOffset={radius(value)}
          >
            {value} Units
          </Styled.LabelCircle>
        ))}
      </Styled.LabelsWrapper>

      </Styled.LegendWrapper>
    </Styled.Container>
  )
}

export default Units;