import React from 'react';
import { Link } from 'react-router-dom';
import Chart from './Chart'
import * as Styled from './styled';

const Stories = () => {
  return (
    <Styled.Container>
    <Styled.TextBlock>
      <Styled.Title>Stories of the Program</Styled.Title>
      <h3>FHA and Rental Housing</h3>

        <p>The Federal Housing Authority (FHA) played an instrumental but largely forgotten role in the production of private rental housing during the 1940s and 1950s. While the FHA’s mortgage credit programs are widely remembered and justly reviled for institutionalizing redlining in single-family home mortgages, the FHA also granted mortgage insurance for rental housing. In practice, this meant that the builder of an apartment building—such as Fred C. Trump —could finance construction with a mortgage from a private bank that was insured by the federal government. Should the builder default on the loan, the FHA covered the bank’s losses. These protections made banks more willing to lend and builders more willing to construct apartments.</p>
        
          <p>The most significant rental program was FHA Section 608, established by Congress in 1942 to meet World War II-era housing shortages. Between 1942 and 1950, Section 608 underwrote the construction of approximately 7,000 apartment complexes nationwide, for a total of 465,674 rental units. The program accounted for two out of every three private rental units built over that period, and it produced twice as many apartments as public housing during those years. Though Section 608 was largely successful in subsidizing the production of rental housing, Congress canceled the program in 1950 amid scandals over allegations that builders were inflating their costs to reap outsized profits. The ensuing Congressional hearings and criminal investigations into builders’ profiteering provided essential data and other source material for this project.</p>

    </Styled.TextBlock>

      <Styled.Figure>
        <Styled.SideBySide>
          <img src='/images/Rental_1.jpg' />
          <img src='/images/Rental_2.jpg' />
        </Styled.SideBySide>
        <Styled.FigCaption>
          <p>The program included both garden-style walkups and high-rise buildings. Pictured here are Glen Oaks Village in Queens, New York (1947, left) and The Woodner in Washington, D.C. (1954, right)</p>

          <p>
            Source: "A 3,800-Unit Project for Long Island," <cite>Insured Mortgage Portfolio</cite> 12, no. 2 (1947): 7; "Architectural Design Under the FHA Program," <cite>Insured Mortgage Portfolio</cite> 18, no. 3 (1954): 6.
            
          </p>
        </Styled.FigCaption>
      </Styled.Figure>

    <Styled.TextBlock>

      <h3>Developers and Profiteering</h3>

        <p>Speculation and profiteering were defining characteristics of the midcentury public-private approach to housing production. The devil was in the arcane details of FHA credit programs. In 1942, Congress amended the National Housing Act of 1934 to create the FHA Section 608 program of mortgage insurance for multifamily rentals. The goal was to entice builders to rapidly construct large quantities of rental housing for defense workers. Under the liberalized terms of FHA Section 608, builders were allowed to make down payments of just 10 percent for government-insured mortgages with payments stretched over twenty-five years, effectively lowering the financial barriers to new construction. To apply for mortgage insurance under Section 608, a builder needed to own the land and cover several other initial expenses such as legal and architectural fees. But these costs could easily be recouped during the appraisal and underwriting process by inflating the land values—which some builders did by selling and reselling the land through shell companies or by simply bribing FHA appraisers—and then listing the initial fees as excessively high amounts. These maneuvers often ballooned the insured mortgage value well above actual construction costs, allowing builders to pocket the leftover funds as profits. For instance, when Fred C. Trump built the <Link to='/map/1242051#loc=12/40.6322/-73.974'>Beach Haven Apartments</Link> in Brooklyn, he invested just $249,000 of his own funds but walked away with $3 million in excess profits. Builders got rich, but tenants in their apartments paid higher rents to defray the inflated mortgages. After these abuses came to light during blockbuster hearings over the summer of 1954, the Senate Committee on Banking and Currency decried that builders had used the FHA "as a vehicle to allow a few to reap fortunes at the expense of the American people."</p>
      </Styled.TextBlock>

      <Styled.Figure>
        <img src='/images/Profiteering.jpg' />
        <Styled.FigCaption>
          <p>Despite abusing FHA programs to pocket millions in excess profits, in advertisements like this one (1949) Fred Trump championed his Section 608 projects as "a triumph of free enterprise."</p>
          <p>Source: New York Times, January 16, 1949, R2.</p>
        </Styled.FigCaption>
      </Styled.Figure>

      <Styled.TextBlock>

        <h3>Urban Decentralization</h3>

        <p>One of the primary strategies that developers used to inflate their mortgage values was to build on cheap land. The lower the initial price of the land, the more builders could mark up the costs in their applications for FHA mortgage insurance. By World War II, large plots of inexpensive land could only be found on the outskirts of cities or further out in the suburban hinterlands. For example, Fred Trump built his <Link to='/map/1240060#loc=12/40.6322/-73.974'>Shore Haven apartment project</Link> on a coastal marsh at the southern end of Brooklyn that had been recently dredged and filled for a highway project. Other builders placed FHA projects on erstwhile farmland, toxic brownfield sites, or vacant tracts next to railroad tracks, manufacturing plants, highway interchanges, and auto repair shops.</p>
        <p>Among the most iconic federally insured apartment developments was <Link to='/map/7140074#%23loc=11/41.6796/-87.8254&loc=12/41.3866/-87.7124'>Park Forest</Link> in the southwest suburbs of Chicago. Sociologist William H. Whyte featured Park Forest as the epitome of postwar suburban conformity in his 1956 classic of social commentary, <cite>The Organization Man</cite>. Fully underwritten by FHA Section 608, Park Forest included 2,720 rental units of two-story brick duplexes. Park Forest’s builder, Nathan Manilow, was later found to have paid a $7,500 bribe (adjusted for inflation, roughly $100,000 in 2025) to an FHA official for favorable appraisals on the project. In addition to generating outsized profits for developers, FHA Section 608 projects like Shore Haven Apartments and Park Forest helped accelerate white flight from American urban centers during the postwar era, pulling white residents to the metropolitan fringes.</p>

      </Styled.TextBlock>

      <Styled.Figure>
        <img src='/images/Decentralization.jpg' />
        <Styled.FigCaption>
          <p>Park Forest, Illinois (1952), one of the largest FHA Section 608 projects, included 2,720 rental units in two-story brick duplexes.</p>
          <p>Source: <a href="https://americanhistory.si.edu/explore/exhibitions/america-on-the-move/online/city-and-suburb" target='_blank' rel='noopener noreferrer'>Chicago Historical Society</a>.</p>
        </Styled.FigCaption>
      </Styled.Figure>


      <Styled.TextBlock>
        <h3>Segregation and Redlining</h3>

        <p>As with the FHA single-family programs, the multifamily programs also followed patterns of redlining, with nearly all the apartments built in predominantly white neighborhoods. These locations, coupled with most builders’ steadfast refusal to rent to people of color, further entrenched patterns of racial segregation. In New York City, for instance, the maps demonstrate how nearly all the FHA Section 608 projects were located in census tracts with 92 percent or higher white population, and just one apartment complex, <Link to='/map/1242436#loc=15/40.8199/-73.9611'>Convent Gardens</Link>, was built in a neighborhood with mostly nonwhite residents.</p>

        </Styled.TextBlock>

        <Styled.Figure>

        <Styled.SideBySide>
          <div style={{ width: '45%' }}>
            <h4>New York City</h4>
            <Chart city='New York' omitHeader={true} />
          </div>
          <div style={{ width: '45%' }}>
            <h4>Chicago</h4>
            <Chart city='Chicago' omitHeader={true} />
            </div>
          </Styled.SideBySide>

          <Styled.FigCaption>
            <p>Distribution of FHA Section 608 Apartments by Race and Income</p>
            <p>These charts demonstrate that for New York City and Chicago, as for other major cities nationwide, nearly all the FHA Section 608 apartments were built in census tracts with close to 0% nonwhite population. Each bubble is a census tract in which one or more apartments were built. The size of the bubble indicates the number of units built.</p></Styled.FigCaption>
        </Styled.Figure>
        
      <Styled.TextBlock>
          <p>For Black communities to obtain FHA-insured apartments, it sometimes took creative methods of community financing rather than working through conventional lenders. On the South Side of Chicago, the local dining car waiters’ union organized a system of mutual ownership to build <Link to='/map/7140113#loc=11/41.5841/-87.5511'>Parkway Gardens</Link>, which included 694 units in three- and four-story walkup buildings. This unique financing arrangement, enthused civil rights icon Mary McLeod Bethune, meant that Black shareholders would "be buying as they rent." In response to criticism from civil rights activists that the FHA was perpetuating segregation, officials pointed to the handful of developments in Black communities, celebrating how much the agency had done by way of "making better housing available to racial minorities." These platitudes elided the fact that Section 608 complexes open to Black residents were usually sited on the least desirable land near garbage dumps, power plants, and environmental toxins.</p>
        
        </Styled.TextBlock>

      <Styled.Figure>
        <img src='/images/Segregation.jpg' />
        <Styled.FigCaption>
          <p>Parkway Gardens in Chicago (2015), one of the few FHA Section 608 projects open to Black tenants.</p>
          <p>Source: <a href="https://commons.wikimedia.org/wiki/File:Image_Parkway_Gardens.jpg" target='_blank' rel='noopener noreferrer'>Wikimedia Commons</a>.</p>
        </Styled.FigCaption>
      </Styled.Figure>    





    </Styled.Container>
  );
}

export default Stories;