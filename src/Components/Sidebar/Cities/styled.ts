import styled from "styled-components";
import * as Constants from '../../../constants';

// Sidebar Container
export const Container = styled.div`
  padding: 16px;
  
  margin: 0 auto;
`;

export const Header = styled.h2`
  text-align: center;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  @media ${Constants.devices.tablet} {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    justify-content: center;
    align-items: flex-start;

  }

  @media ${Constants.devices.desktop} {
    display: block;
    max-width: 500px;
  }


`;

// List Item (City Container)
export const ListItem = styled.li`
  padding: 16px;
  background: white;
  margin-bottom: 30px;
  border: 1px solid #666;
  border-radius: 8px;
  position: relative;

  @media ${Constants.devices.tablet} {
    width: calc(50% - 3em);
  }

  @media ${Constants.devices.desktop} {
    width: auto;
  }
`;


export const CityHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 6px;
`;

export const Stat = styled.div`
  font-size: 14px;
  color: #555;
`;


export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
`;

export const Th = styled.th`
  background: #007bff;
  color: white;
  padding: 10px;
  text-align: left;
`;

export const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;



// City Name (Large & Bold)
export const CityName = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  padding-bottom: 8px;
`;

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

// Value (Bold & Black)
export const StatValue = styled.div`
  grid-column: 2 / span 1;
  font-size: 18px;
  font-weight: bold;
  color: #222;
  text-align: right;

`;

// Caret Icon (SVG)
export const Caret = styled.div<{ $isExpanded: boolean }>`
  width: 10px;
  height: 10px;
  border-left: 2px solid #555;
  border-bottom: 2px solid #555;
  transform: ${({ $isExpanded }) => ($isExpanded ? "rotate(135deg)" : "rotate(-45deg)")};
  transition: transform 0.2s ease-in-out;
`;

// Toggle Button
export const ToggleButton = styled.button<{ $isExpanded: boolean }>`
  ${p => !p.$isExpanded && `  
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
  `}
  ${p => p.$isExpanded && `  
    margin: 0 auto;
  `}
  background: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  border: 1px solid ${Constants.COLOR_INTERACTIVE};

  &:hover {
    background: ${Constants.COLOR_INTERACTIVE};
    color: white;

    ${Caret} {
      border-color: white;
    }
  }
`;

// Container for Property Cards
export const TableContainer = styled.div`
  margin-top: 12px;
`;

export const TableTitle = styled.h4`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 6px;
`;



