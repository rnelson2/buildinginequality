import styled from "styled-components";
export { Label } from '../styled';


export const Container = styled.div`
  grid-area: map;
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-end;
  justify-content: flex-end;
  z-index: 1000;
  background-color: white;
  border-radius: 0.25em;
  border: 0.5px solid #777;
  padding: 1em;

`;

