import React from "react";
import * as Styled from '../styled';

const Introduction = () => {
  return (
    <Styled.TextBlock>
      <Styled.Title>Introduction</Styled.Title>
      <p>From 1942 to 1950, the Federal Housing Administration (FHA) operated the Section 608 program to insure mortgages for multifamily rental housing. The program provided rental housing prioritized for (but by no means exclusively available to) World War II-era defense workers and  veterans. By backing loans for apartment developments, the federal government played an essential but subtle role in the production of rental housing. But, thanks to the FHA's well-documented practice of redlining as well as its reliance on private sector builders to select sites and develop properties, profound racial inequalities were built into publicly-underwritten rental housing markets.</p>

      <p>The FHA Section 608-insured mortgage data are overlaid upon racial demographic data drawn from the 1950 census indicating the percentage of “nonwhite” residents (see below for a key) in each census tract. Two important limitations are of note.</p>


      <p>First, “nonwhite” is a regrettably capacious and imprecise category, but given the uneven and locally determined ways in which demographic data were reported, we have opted to employ this category, since it was the category used in the 1950 census.</p>

      <p>Second, census tract-level demographic data for 1950 are unavailable in smaller cities, developing suburbs, exurbs, and rural communities. </p>
    
    </Styled.TextBlock>
  );
}

export default Introduction;