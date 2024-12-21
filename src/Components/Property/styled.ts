import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
`

export const Data3 = styled.div`
  display: grid;
  grid-template-columns: min-content min-content 1fr;
  grid-column-gap: 1rem;
  grid-row-gap: 0.5rem;
  align-items: center;
`
export const Header = styled.h3`
  grid-column: 1 / -1;
`;

export const Label = styled.div`
  color: grey;
  text-align: right;
  grid-column: 1;
  white-space: nowrap;
`;

export const Amount = styled.div`
  font-size: 1.1rem;
  text-align: right;
  grid-column: 2;
`;

export const Percent = styled.div`
  color: grey;
  grid-column: 3;
`;

export const DatumEmphasized = styled(Amount)`
    text-align: left;
  grid-column: 2 / -1;
  `;

export const Datum = styled(DatumEmphasized)`
  font-size: 1rem;
`

export const CloseButton = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
   svg {
      width: 20px;
      height: 20px;
      line {
        stroke: black;
      }
   }
`;

export const Mortgages = styled.div`
  padding: 10px 0;
`;

