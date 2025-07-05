import styled from "styled-components";
import * as Constants from "../../../constants";

// Main Container
export const Container = styled.div`
  padding: 20px;
  background: white;
  margin: 16px;
  border: 1px solid #666;
  border-radius: 8px;
`;

// Close Button
export const CloseButton = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 16px;
  
  svg {
    width: 20px;
    height: 20px;
    line {
      stroke: black;
    }
  }
`;

// Property Header (Name + Loan Amount)
export const PropertyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
`;

export const PropertyName = styled.div`
  font-size: 18px;
  font-weight: normal;
`;

export const PropertyAmount = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #222;
  text-align: right;
`;

// Section Header
export const SectionHeader = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-top: 16px;
  margin-bottom: 8px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 4px;
`;

// Grid for Stats
export const StatsGrid = styled.div<{ $marginBottom?: boolean }>`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px 12px;
  padding-bottom: 12px;
  margin-bottom: ${({ $marginBottom }) => ($marginBottom ? "2em" : "0")};
`;

// Label (Gray)
export const StatLabel = styled.div`
  font-size: 16px;
  color: #888;
`;

export const SubStatLabel = styled(StatLabel)`
  font-size: 15px;
  padding-left: 1.5em;
`;

// Value (Bold & Black)
export const StatValue = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #222;
  text-align: right;
`;