import React from 'react';
import { Link } from 'react-router-dom';
import * as Styled from './styled';

const Masthead = () => {
  return (
    <Styled.Masthead>
      <Link to='/'>
        <Styled.Title>Building Inequality</Styled.Title>
        <Styled.Subtitle>Mapping the spatial and racial inequalities of FHA Section 608 rental housing,  1942-1950</Styled.Subtitle>
      </Link>
      </Styled.Masthead>
  );
};

export default Masthead;
