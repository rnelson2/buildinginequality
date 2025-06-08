import styled, { css } from "styled-components";
import * as Constants from "../../../../constants";

// Grid for Stats
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px 12px;
  padding-bottom: 12px;
`;

// Label (Gray)
export const StatLabel = styled.div`
  grid-column: 1 / span 1;
  font-size: 16px;
  color: #888;
`;

export const SubStatLabel = styled(StatLabel)`
  font-size: 14px;
  padding-left: 2em;
`;

// Value (Bold & Black)
export const StatValue = styled.div`
  grid-column: 2 / span 1;
  font-size: 16px;
  font-weight: bold;
  color: #222;
  text-align: right;
`;

// Apartment Card
export const ApartmentCard = styled.div<{ $hasAddress: boolean }>`
  padding: 16px 16px 8px 16px;
  background: white;
  border-bottom: 1px solid #666;
  cursor: pointer;

  ${props =>
    props.$hasAddress &&
    css`
      &:hover {
        background: ${Constants.COLOR_BACKGROUND};
      }
    `}
`;

// Apartment Header
export const ApartmentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
`;

export const ApartmentName = styled.div`
  font-size: 16px;
  font-weight: normal;
`;

export const ApartmentAmount = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #222;
  text-align: right;
`;

export const Unmapped = styled.div`
  background-color: #fff3cd;  // Light yellow background
  color: #856404;  // Muted dark orange text
  font-size: 14px;  
  font-weight: bold;
  padding: 6px 12px;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 8px;
  display: inline-block;
`;
