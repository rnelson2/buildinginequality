import React from "react";
import { NavLink } from "react-router-dom";
import * as Styled from "./styled";

const About = () => {
  return (
    <Styled.Container>
          <Styled.Link to='/sources'>
            Sources & Methods
        </Styled.Link>
        <Styled.Link to='/citing'>
          Citing
      </Styled.Link>
          <Styled.Link to='/data'>
            Data
        </Styled.Link>
          <Styled.Link to='/acknowledgments'>
            Acknowledgments
          </Styled.Link>
    </Styled.Container>
  );
};

export default About;
