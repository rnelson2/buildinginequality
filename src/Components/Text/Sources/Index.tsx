import React from 'react';
import { Link } from 'react-router-dom';
import * as Styled from '../styled';
import AboutMenu from '../AboutMenu/Index';

const Sources = () => {
  return (
    <Styled.TextBlock>
      <AboutMenu />
      <Styled.Title>Sources and Methods</Styled.Title>

      <p>This map is based upon the Department of Housing and Urban Development’s database "<a href="https://www.hud.gov/hud-partners/multifamily-fhasl-active" target='_blank' rel="noopener noreferrer">Terminated MF Insured Mortgages,</a>" which catalogues all FHA-underwritten multifamily housing developments.</p>

      <p>Although the dataset lists all of the roughly 7,000 apartment complexes underwritten by the FHA Section 608 program nationwide, only 1,787 of the properties included street addresses in the HUD database. To locate missing addresses, we hired <Link to='/acknowledgments'>a team of twenty undergraduate researchers</Link>. Fortunately, the FHA was quite thorough in reporting the name and location of each development (e.g., "<Link to='/map/12242052#loc=14/34.0456/-118.4076'>Hillcrest Manor</Link>" in "Los Angeles, CA"). Because the apartment complexes were frequently advertised in classified pages or described in feature articles, this identifying information allowed us to locate many of the addresses in digitized historical newspapers. The addresses were also sometimes listed in digitized archival collections and local property records. In many cases, too, we have been able to cross-check these historical sources with contemporary real estate platforms such as Zillow and Redfin, which frequently include the date of construction for listed properties. As of initial publication in July 2025, our student-researchers have located roughly 2,400 addresses, focused principally on metropolitan areas for which the 1950 census collected racial demographic information. In other words, the map plots approximately 4,200 of the 7,000 total properties. Depending on grant resources to keep hiring student researchers, we plan to keep searching for the rest of the missing addresses. For more on our student researchers' process and findings, read <a href="https://penntoday.upenn.edu/news/penn-sas-redlining-and-rentals-cebul" target='_blank' rel="noopener noreferrer">this article from <cite>Penn Today</cite></a>.</p>

      <p>We have written extensively about the origins and impacts of FHA Section 608:</p>

      <ul>
        <li>
          <a href="https://doi.org/10.1093/jahist/jaaf003" target="_blank" rel="noopenner noreferrer">
            Brent Cebul and Michael R. Glass, "Mortgaging Out: FHA Credit Policy, Segregated Rental Housing, and the Remaking of Metropolitan America," <cite>Journal of American History</cite> 112, no. 1 (June 2025): 64–91.
          </a>
        </li>
        <li>
          Brent Cebul and Michael R. Glass, "Title TBD," <cite>Phenomenal World</cite>, Date TBD.
        </li>
      </ul>

      <p>We have also drawn upon a wealth of other government publications and scholarly work, key examples of which are cited below.</p>

      <h3>Government Sources</h3>

      <ul>
        <li>
          <a href="https://hdl.handle.net/2027/uc1.a0000140236" target="_blank" rel="noopenner noreferrer">
            <cite>
              FHA Investigation: Hearings before the Committee on Banking and
              Currency, United States Senate, Eighty-Third Congress, Pursuant to
              S. Res. 229, 
            </cite> Part 3 (Washington, 1954).
          </a>
        </li>
        <li>
          U.S. Congress, Senate, Committee on Banking and Currency, <cite>Middle-Income Housing: Hearings before a Sub-committee of the Committee on Banking and Currency, United States Senate, Eighty-First Congress, Second Session, on Amendments to S. 2246, to Amend the National Housing Act, as Amended, and for Other Purposes, January 12, 13, 16, 17, and 18, 1950</cite> (Washington, 1950).
        </li>
      </ul>

      <h3>Scholarly Books and Articles</h3>

      <ul>
        <li>
          <a href="https://doi.org/10.1093/jahist/jaaa533" target='_blank' rel="noopenner noreferrer">
            Bench Ansfield, "The Crisis of Insurance and the Insuring of the Crisis: Riot
            Reinsurance and Redlining in the Aftermath of the 1960s Uprisings, <cite>Journal of American History</cite> 107, no. 4 (March 2021):
            899–921.
          </a>
        </li>
        <li>
          Brent Cebul,&nbsp;
          <cite>
            Illusions of Progress: Business, Poverty, and Liberalism in the
            American Century
          </cite>{' '}
          (Philadelphia: University of Pennsylvania Press, 2023).
        </li>
        <li>
          N. D. B. Connolly,&nbsp;
          <cite>
            A World More Concrete: Real Estate and the Remaking of Jim Crow South Florida
          </cite>{' '}
          (Chicago: University of Chicago Press, 2014).
        </li>
        <li>
          David M. P. Freund,&nbsp;
          <cite>
            Colored Property: State Policy and White Racial Politics in Suburban America
          </cite>{' '}
          (Chicago: University of Chicago Press, 2007).
        </li>
        <li>
          Michael R. Glass,&nbsp;
          <cite>
            Cracked Foundations: Debt and Inequality in Suburban America
          </cite>{' '}
          (Philadelphia: University of Pennsylvania Press, 2025).
        </li>
        <li>
          <a href="https://doi.org/10.1017/S0898030616000075" target='_blank' rel="noopenner noreferrer">
            Judge Glock, "How the Federal Housing Administration Tried to Save America's
              Cities, 1934-1960,"
            <cite>Journal of Policy History</cite> 28, no. 2 (April 2016):
            290–317.
          </a>
        </li>
        <li>
          Paige Glotzer,&nbsp;
          <cite>
            How the Suburbs Were Segregated: Developers and the Business of
            Exclusionary Housing, 1890-1960
          </cite>{' '}
          (New York: Columbia University Press, 2020).
        </li>
        <li>
          Kenneth T. Jackson,&nbsp;
          <cite>
            Crabgrass Frontier: The Suburbanization of the United States
          </cite>{' '}
          (New York: Oxford University Press, 1985).
        </li>
        <li>
          Rebecca K. Marchiel,&nbsp;
          <cite>
            After Redlining: The Urban Reinvestment Movement in the Era of
            Financial Deregulation
          </cite>{' '}
          (Chicago: University of Chicago Press, 2020).
        </li>
        <li>
          <a href="https://doi.org/10.1080/02723638.2019.1670571" target='_blank' rel="noopenner noreferrer">
            Nicholas Shatan and Kathe Newman,&nbsp;
              "The State Market Relationship as a Real Estate Technology:
              FHA Multifamily Development and Preservation, 1934-Present," <cite>Urban Geography</cite> 41, no. 8 (2019): 1065–89.
          </a>
        </li>
        <li>
          Thomas J. Sugrue,&nbsp;
          <cite>
            The Origins of the Urban Crisis: Race and Inequality in Postwar Detroit
          </cite>{' '}
          (Princeton: Princeton University Press, 1996).
        </li>
        <li>
          Keeanga-Yamahtta Taylor,&nbsp;
          <cite>
            Race for Profit: How Banks and the Real Estate Industry Undermined Black Homeownership
          </cite>{' '}
          (Chapel Hill: University of North Carolina Press, 2019).
        </li>
        <li>
          <a href="https://doi.org/10.1093/jahist/jaab066" target='_blank' rel="noopenner noreferrer">
            LaDale C. Winling and Todd M. Michney,&nbsp;"The Roots of Redlining: Academic, Governmental, and Professional
              Networks in the Making of the New Deal Lending Regime," <cite>Journal of American History</cite> 108, no. 1 (June 2021):
            42–69.
          </a>
        </li>
      </ul>
    </Styled.TextBlock>
  );
};

export default Sources; 
