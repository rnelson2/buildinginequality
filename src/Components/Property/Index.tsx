import React from "react";
import { Link } from "react-router-dom";
import * as Types from "../../index.d";
import ArrowLeft from "../Buttons/ArrowLeft";
import * as Styled from "./styled";

const Property = ({ property }: { property: Types.Feature }) => {
  const { street, property_city, property_state,  white_pop, black_pop, other_pop, median_income, mortgages } = property.properties;
  const name = mortgages[0].name;
  const address = `${street}, ${property_city?.toLocaleUpperCase()}, ${property_state}`;
  const units = mortgages.reduce((acc, mortgage) => acc + mortgage.units, 0);
  const amount = mortgages.reduce((acc, mortgage) => acc + mortgage.amount, 0);

  const _median_income = median_income || -1;

  const total_pop = (white_pop || 0) + (black_pop || 0) + (other_pop || 0);
  const percentage_white = white_pop ? Math.round((white_pop / total_pop) * 100) : 0;
  const percentage_black = black_pop ? Math.round((black_pop / total_pop) * 100) : 0;
  const percentage_other = other_pop ? Math.round((other_pop / total_pop) * 100) : 0;

  // sort populations by size descending
  const populations = [
    { name: "White", pop: white_pop || 0, percentage: percentage_white },
    { name: "African American", pop: black_pop || 0, percentage: percentage_black },
    { name: "Other Races", pop: other_pop || 0, percentage: percentage_other },
  ].sort((a, b) => (b.pop || 0) - (a.pop || 0));

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const getDateString = ({ year, month, day }: { year: number; month: number; day: number }) => `${months[month - 1]} ${day}, ${year}`

  return (
    <Styled.Container>
      <Link to={`${process.env.PUBLIC_URL}/map`}>
      <Styled.CloseButton>
        <ArrowLeft /> Close
      </Styled.CloseButton>
        </Link>
      {name ? <h2>{name}</h2> : "No Name"}

      <Styled.Data3>
        <Styled.Header>Property Information</Styled.Header>
        {units && (
          <>
            <Styled.Label>Units</Styled.Label>
            <Styled.DatumEmphasized>{units}</Styled.DatumEmphasized>
          </>
        )}
        {address && (
          <>
            <Styled.Label>Address</Styled.Label>
            <Styled.Datum>{address}</Styled.Datum>
          </>
        )}

        {total_pop > 0 && (
          <>
            <Styled.Header>Demographics and Income Level of Census Tract</Styled.Header>
            {populations.map(({ name, pop, percentage }) => (
              <React.Fragment key={name}>
                <Styled.Label>{name}</Styled.Label>
                <Styled.Amount>{pop?.toLocaleString() || 0}</Styled.Amount>
                <Styled.Percent>{percentage}%</Styled.Percent>
              </React.Fragment>
            ))}
            {(_median_income > 0) && (
              <>
                <Styled.Label>Median Income</Styled.Label>
                <Styled.Amount>${_median_income.toLocaleString()}</Styled.Amount>
              </>
            )}
          </>
        )}

        {amount && (
          <>
            <Styled.Header>{`Mortgage${mortgages.length > 1 ? 's' : ''} Information`}</Styled.Header>
            
            
            {mortgages.map((mortgage, idx) => (
              <React.Fragment key={idx}>
                <Styled.Label>Loan Amount</Styled.Label>
                <Styled.DatumEmphasized>${mortgage.amount.toLocaleString()}</Styled.DatumEmphasized>
                <Styled.Label>Lender</Styled.Label>
                <Styled.Datum key={idx}>{mortgage.holder_name}</Styled.Datum>
                <Styled.Datum>{`${mortgage.holder_city}, ${mortgage.holder_state}`}</Styled.Datum>
                {mortgage.first_payment_date && (
                  <>
                    <Styled.Label>First Payment Date</Styled.Label>
                    <Styled.Datum>{getDateString(mortgage.first_payment_date)}</Styled.Datum>
                  </>
                )}

              </React.Fragment>
            ))}
          </>
        )}
      </Styled.Data3>
    </Styled.Container>
  );
};

export default Property;
