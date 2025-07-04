import React from 'react';
import * as Styled from '../styled';
import AboutMenu from '../AboutMenu/Index';

const Citing = () => {
  return (
    <Styled.TextBlock>
      <AboutMenu />
      <Styled.Title>Citing <cite>Building Inequality</cite></Styled.Title>
      <p>For citations, we recommend the following format using the <cite>Chicago Manual of Style</cite>.</p>

      <p>Cebul, Brent, Michael R. Glass, and Robert K. Nelson. “Building Inequality: Mapping the Spatial and Racial Inequalities of FHA Section 608 Rental Housing, 1942-1950.” https://buildinginequality.us/.</p>


    </Styled.TextBlock>
  );
}

export default Citing;