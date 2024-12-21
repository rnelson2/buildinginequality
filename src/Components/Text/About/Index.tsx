import React from "react";
import * as Styled from '../styled';

const About = () => {
  return (
    <Styled.TextBlock>
      <Styled.Title>About</Styled.Title>
      <Styled.SectionTitle>The Research Process</Styled.SectionTitle>

      <p>Thanks to significant funding support from the University of Pennsylvania, we have hired a team of twenty undergraduate researchers to locate thousands of missing addresses. Fortunately, the FHA was quite thorough in reporting the name and location of each development (e.g., “Hillcrest Manor” in “Los Angeles, CA.”). This identifying information has allowed us to locate many of the addresses in digitized historical newspaper databases, because the apartment complexes were frequently advertised in the classified pages or described in feature articles. The addresses are also sometimes listed in other digitized archival collections and local property records. In many cases, we have been able to cross-check these historical sources with contemporary real estate platforms such as Zillow and Redfin, which frequently include the date of construction for listed properties.</p>

      <p>For their painstaking work locating thousands of missing street addresses, we would especially like to thank our fantastic team of undergraduate researchers:</p>

      <p>Leo Biehl, Shaanti Choi-Bose, Hadley Degregoris, David Deng, Taryn Flaherty, Max Hall, Mabel Moosbrugger, Jeremy Morton, Connor Nakamura, Niheer Patel, Carolina Payeras, Rajat Ramesh, Norah Rami, Iyanna Rogers, Mitali Sarnobat, Ella Sohn, Jack Starobin, Claire Sun, and Jake Zubkoff.</p>

      <p>For more on their process and findings, see this article from  <cite><a href="https://penntoday.upenn.edu/news/penn-sas-redlining-and-rentals-cebul" rel='noopener' target='_blank'>Penn Today</a></cite> . </p>
    </Styled.TextBlock>
  );
}

export default About;