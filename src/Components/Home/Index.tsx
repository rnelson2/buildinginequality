import React from "react";
import * as Styled from "./styled";
import { Link } from "react-router-dom";

const Home = () => {

  return (
    <Styled.Home>

      <Styled.Menu>
        <Link to="/map">Map</Link>
        <Link to="/stories">Stories of the Program</Link>
        <Link to="/about">About</Link>
      </Styled.Menu>
      <Styled.Title>
        Building Inequality
      </Styled.Title>
      <Styled.Subtitle>Mapping the spatial and racial inequalities of FHA Section 608 rental housing, 1942-1950</Styled.Subtitle>

      <Styled.Description>
        From 1942 to 1950, the Federal Housing Administration operated the Section 608 program to insure mortgages for multifamily rental housing. By backing loans for apartment developments, the federal government played an essential but subtle role in the production of rental housing. But, thanks to the FHA's well-documented practice of redlining as well as its reliance on private sector builders to select sites and develop properties, profound racial inequalities were built into publicly-underwritten rental housing markets.
      </Styled.Description>
      
      <Styled.Explore>
        <Styled.ExploreButton to={"/map"}>
          Explore the Map
        </Styled.ExploreButton>
      </Styled.Explore>

    </Styled.Home>
  );
};

export default Home;