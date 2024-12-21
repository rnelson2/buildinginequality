import React from "react";
import ExternalLink from '../Buttons/ExternalLink';
import * as Styled from './styled';

const Menu = () => {
  return (
    <Styled.Nav>
      <Styled.Section>
        <Styled.ItemProminent>
          <Styled.Link to="/map">Explore the Map</Styled.Link>
        </Styled.ItemProminent>
      </Styled.Section>
      <Styled.Section>
        <Styled.Item>
          <Styled.Link to="/introduction">Introduction</Styled.Link>
        </Styled.Item>
        <Styled.Item>
          <Styled.Link to="/about">About</Styled.Link>
        </Styled.Item>
      </Styled.Section>
    </Styled.Nav>
  );
};

export default Menu;
