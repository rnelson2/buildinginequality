import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useURLState, useVisibleProperties } from '../../../../../hooks';
import { modifyHash } from '../../../../../utilities';
import CensusRaceLegend from './Race/Index';
import CensusIncomeLegend from './Income/Index';
import * as Styled from './styled';
import Toggle from 'react-toggle';


const Census = () => {
  const { hideCensusTracts, hash, mapview } = useURLState();
  const visibleProperties = useVisibleProperties();
  const navigate = useNavigate();

  // Determine if census tracts should be hidden based on whether any visible properties are in census tracts
  const hasVisibleCensusTracts = visibleProperties.some(property =>
    (property.properties.median_income && property.properties.median_income > 0) ||
    (property.properties.white_pop && property.properties.white_pop > 0) ||
    (property.properties.black_pop && property.properties.black_pop > 0) ||
    (property.properties.other_pop && property.properties.other_pop > 0)
  );

  if (!hasVisibleCensusTracts) {
    return null; // Do not render if there are no visible census tracts
  }

  return (
    <Styled.Container>
      <Styled.Label>Census Tracts (<Link to={`#${modifyHash(hash, [{ type: 'toggle_censusTracts' }])}`}>{hideCensusTracts ? 'show' : 'hide'}</Link>)</Styled.Label>
      {!hideCensusTracts && (
        <Styled.ToggleContainer>
          <Link to={`#${modifyHash(hash, [{ type: 'set_mapview', payload: 'race' }])}`}>
            Race
          </Link>

          <Styled.Toggle
            icons={false}
            checked={mapview === 'income'}
            onChange={() => {
              const newMapView = mapview === 'income' ? 'race' : 'income';
              navigate(`#${modifyHash(hash, [{ type: 'set_mapview', payload: newMapView }])}`);
            }}
          />
          <Link to={`#${modifyHash(hash, [{ type: 'set_mapview', payload: 'income' }])}`}>
            Income
          </Link>
        </Styled.ToggleContainer>
      )}

      {!hideCensusTracts && mapview === 'race' && <CensusRaceLegend />}
      {!hideCensusTracts && mapview === 'income' && <CensusIncomeLegend />}
    </Styled.Container>
  )
}

export default Census;