import styled from "styled-components";

export const Container = styled.div`
  grid-area: map;
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 20px;
  align-items: flex-end;
  justify-content: flex-end;
  z-index: 1000;
  pointer-events: none;
  background-color: white;
  border-radius: 0.25em;
  padding: 1em;

`;

export const Label = styled.div`
  margin-bottom: 4px;
  padding-left: 10px;
  text-align: center;
`; 
