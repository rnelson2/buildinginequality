import React from "react";
import { Link } from "react-router-dom";
import * as Types from "../../index.d";
import ArrowLeft from "../Buttons/ArrowLeft";
import * as Styled from "./styled";
import { useURLState } from "../../hooks";

const Property = ({ property }: { property: Types.Feature }) => {
  const { hash } = useURLState();
  const { street, property_city, property_state, white_pop, black_pop, other_pop, median_income, mortgages } = property.properties;

  const name = mortgages[0].name || "Unknown";
  const city = `${property_city}, ${property_state}`;
  const units = mortgages.reduce((acc, mortgage) => acc + mortgage.units, 0);
  const amount = mortgages.reduce((acc, mortgage) => acc + mortgage.amount, 0);

  const total_pop = (white_pop || 0) + (black_pop || 0) + (other_pop || 0);
  const percentage_white = white_pop ? Math.round((white_pop / total_pop) * 100) : 0;
  const percentage_black = black_pop ? Math.round((black_pop / total_pop) * 100) : 0;
  const percentage_other = other_pop ? Math.round((other_pop / total_pop) * 100) : 0;

  // Sort populations by size descending
  const populations = [
    { name: "White", pop: white_pop || 0, percentage: percentage_white },
    { name: "African American", pop: black_pop || 0, percentage: percentage_black },
    { name: "Other Races", pop: other_pop || 0, percentage: percentage_other },
  ].sort((a, b) => b.pop - a.pop);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const getDateString = ({ year, month, day }: { year: number; month: number; day: number }) => `${months[month - 1]} ${day}, ${year}`;

  return (
    <Styled.Container>
      {/* Close Button */}
      <Link to={`${process.env.PUBLIC_URL}/map${hash}`}>
        <Styled.CloseButton>
          <ArrowLeft /> Close
        </Styled.CloseButton>
      </Link>

      {/* Property Header */}
      <Styled.PropertyHeader>
        <Styled.PropertyName>{name}</Styled.PropertyName>
        <Styled.PropertyAmount>${amount.toLocaleString()}</Styled.PropertyAmount>
      </Styled.PropertyHeader>

      {/* Property Details */}
      <Styled.StatsGrid>
        <Styled.StatLabel>Units</Styled.StatLabel>
        <Styled.StatValue>{units}</Styled.StatValue>

        <Styled.StatLabel>Address</Styled.StatLabel>
        <Styled.StatValue>{street}<br />{city}</Styled.StatValue>
      </Styled.StatsGrid>

      {/* Census Tract Information */}
      {total_pop > 0 && (
        <>
          <Styled.SectionHeader>Census Tract</Styled.SectionHeader>
          <Styled.StatsGrid>
            {populations.map(({ name, pop, percentage }) => (
              <React.Fragment key={name}>
                <Styled.SubStatLabel>{name}</Styled.SubStatLabel>
                <Styled.StatValue>{percentage}% ({pop?.toLocaleString()})</Styled.StatValue>
              </React.Fragment>
            ))}

            {median_income && (
              <>
                <Styled.SubStatLabel>Median Income</Styled.SubStatLabel>
                <Styled.StatValue>${median_income.toLocaleString()}</Styled.StatValue>
              </>
            )}
          </Styled.StatsGrid>
        </>
      )}

      {/* Mortgage Information */}
      {mortgages.length > 0 && (
        <>
          <Styled.SectionHeader>{`Lender${mortgages.length > 1 ? "s" : ""} Information`}</Styled.SectionHeader>
          {mortgages.map((mortgage, idx) => (
            <Styled.StatsGrid key={idx}>
              {(mortgages.length > 1) && (
                <>
                  <Styled.SubStatLabel>Loan Amount</Styled.SubStatLabel>
                  <Styled.StatValue>${mortgage.amount.toLocaleString()}</Styled.StatValue>
                </>
              )}

              {mortgage.holder_name && (
                <>
                  <Styled.SubStatLabel>Lender</Styled.SubStatLabel>
                  <Styled.StatValue>{mortgage.holder_name}</Styled.StatValue>
                </>
              )}

              {mortgage.first_payment_date && (
                <>
                  <Styled.SubStatLabel>First Payment</Styled.SubStatLabel>
                  <Styled.StatValue>{getDateString(mortgage.first_payment_date)}</Styled.StatValue>
                </>
              )}
            </Styled.StatsGrid>
          ))}
        </>
      )}
    </Styled.Container>
  );
};

export default Property;