import styled from 'styled-components';
import * as Constants from '../../../constants';

export const Button = styled.button`
  background-color: ${Constants.COLOR_BLUE};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 16px;
  cursor: pointer;
  display: block;
  margin: 1rem auto;

  &:hover {
    background-color: ${Constants.COLOR_INTERACTIVE_DARK};
  }

  a {
    color: white !important;
    text-decoration: none !important;
  }
`;
