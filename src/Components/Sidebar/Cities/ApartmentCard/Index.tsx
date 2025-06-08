import React from "react";
import { useNavigate } from "react-router-dom";
import * as Styled from "./styled";
import { CityProperty } from "../../../../index.d";
import { useMapContext, useURLState, useVisibleProperties } from "../../../../hooks";
import { modifyHash } from "../../../../utilities";
import { latLng } from "leaflet";

const ApartmentCard: React.FC<{ property: CityProperty }> = ({ property }) => {
  const { setOnlyHighlightedId, clearHighlightedIds, map } = useMapContext();
  const { zoom, hash } = useURLState();
  const navigate = useNavigate();
  const visibleProperties = useVisibleProperties();
  // get the lat/lng of the property
  const [lng, lat] = visibleProperties.find(p => {
    const project_nums = p.properties.mortgages.map(m => m.proj_num);
    return project_nums.includes(property.proj_num);
  })?.geometry.coordinates || [0, 0];

  const { units, amount, name, proj_num, white_pop, black_pop, other_pop, median_income, hasAddress } = property;

  const hasCensusData = white_pop || black_pop || other_pop || median_income;

  const totalPopulation = (white_pop ?? 0) + (black_pop ?? 0) + (other_pop ?? 0);
  const whitePercentage = totalPopulation === 0 ? 0 : (white_pop ?? 0) / totalPopulation;
  const blackPercentage = totalPopulation === 0 ? 0 : (black_pop ?? 0) / totalPopulation;
  const otherPercentage = totalPopulation === 0 ? 0 : (other_pop ?? 0) / totalPopulation;

  return (
    <Styled.ApartmentCard
      onMouseEnter={() => (zoom >= 10 && hasAddress ? setOnlyHighlightedId(proj_num) : false)}
      onMouseLeave={() => (zoom >= 10 && hasAddress ? clearHighlightedIds() : false)}
      onClick={() => {
        if (zoom > 10 && hasAddress) {
          navigate(`/map/${proj_num}${hash}`)
        }
        // if zoom is less than 11, zoom in and center on the property
        else if (hasAddress) {
          const newHash = modifyHash(hash, [
            {
              type: 'set_loc',
              payload: {
                zoom: 11,
                center: [lat, lng],
            } }
          ]);
          if (map) {
            const latLngPosition = latLng(lat, lng);
            map.setView(latLngPosition, 11);
          }
          navigate(`/map/${proj_num}#${newHash}`);
        }
      }}
      $hasAddress={hasAddress}
    >
      {!hasAddress && <Styled.Unmapped>Currently unmapped</Styled.Unmapped>}
      <Styled.ApartmentHeader>
        <Styled.ApartmentName>{name || "Unknown"}</Styled.ApartmentName>
        <Styled.ApartmentAmount>${amount.toLocaleString()}</Styled.ApartmentAmount>
      </Styled.ApartmentHeader>

      <Styled.StatsGrid>
        <Styled.StatLabel>Units</Styled.StatLabel>
        <Styled.StatValue>{units}</Styled.StatValue>

        {hasCensusData && (
          <>
            <Styled.StatLabel>Census Tract</Styled.StatLabel>
            {whitePercentage > 0.005 && (
              <>
                <Styled.SubStatLabel>White</Styled.SubStatLabel>
                <Styled.StatValue>{(whitePercentage * 100).toFixed(1)}% </Styled.StatValue>
              </>
            )}
            {blackPercentage > 0.005 && (
              <>
                <Styled.SubStatLabel>African American</Styled.SubStatLabel>
                <Styled.StatValue>{(blackPercentage * 100).toFixed(1)}% </Styled.StatValue>
              </>
            )}
            {otherPercentage > 0.05 && (
              <>
                <Styled.SubStatLabel>Other Races</Styled.SubStatLabel>

                <Styled.StatValue>{(otherPercentage * 100).toFixed(1)}%</Styled.StatValue>
              </>
            )}

            <Styled.SubStatLabel>Median Income</Styled.SubStatLabel>
            <Styled.StatValue>${median_income?.toLocaleString() || "N/A"}</Styled.StatValue>
          </>
        )}

        {/* <Styled.StatLabel>White Pop:</Styled.StatLabel>
              <Styled.StatValue>{property.properties.white_pop ?? "N/A"}</Styled.StatValue>

              <Styled.StatLabel>Black Pop:</Styled.StatLabel>
              <Styled.StatValue>{property.properties.black_pop ?? "N/A"}</Styled.StatValue>

              <Styled.StatLabel>Other Pop:</Styled.StatLabel>
              <Styled.StatValue>{property.properties.other_pop ?? "N/A"}</Styled.StatValue>

              <Styled.StatLabel>Median Income:</Styled.StatLabel>
              <Styled.StatValue>${property.properties.median_income?.toLocaleString() || "N/A"}</Styled.StatValue> */}
      </Styled.StatsGrid>
    </Styled.ApartmentCard>
  );
};

export default ApartmentCard;
