import React from 'react';
import * as Styled from './styled';
import { Link } from 'react-router-dom';
import CloseButton from '../../../Buttons/Close';

const Explanation = ({ setShowExplanation }: { setShowExplanation: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <Styled.Container>
      <Styled.Close onClick={() => setShowExplanation(false)}><CloseButton /></Styled.Close>
      <h2>How to Read & Use the Map</h2>
      <p>The map always shows apartments and other rental housing underwritten by <Link to='/stories'>FHA Section 608 financing</Link> but shows that data differently depending on how zoomed in it is.</p>

      <p><strong>Aggregated view (zoomed out):</strong> When you're zoomed out, space is split into a honeycomb of hexagons. Each hexagons represents an area where at least one apartment property was located. Lighter colors indicate fewer units, darker more. As you zoom in, hexagons get smaller and the legend updates to show the new unit range.</p>

      <Styled.Figure>
        <img src='/images/explanation/zoomedHexbins.png' alt="National hexbin view: darkest hexagons cluster over New York, Chicago and Los Angeles, indicating about 50,000 608-financed units" />
        <figcaption>Honeycomb view zoomed in to Georgia.</figcaption>
      </Styled.Figure>

      <p><strong>Property view (zoomed in):</strong> Zoomed in, hexagons dissolve into circles—one per property. We’ve geocoded about 4,000 of the roughly 7,000 Section 608 developments (see <Link to='/sources'>Sources and Methods</Link> for details). Circle size scales with unit count: most properties had fewer than 100 units, while the largest topped out around 3,000. Click on any circle to open a detailed view of the data about the property and the one or more mortgages underwritten by the 608 program.</p>

      <Styled.Figure>
        <img src='/images/explanation/circles.png' alt='Map zoomed in with circles representing individual properties' />
        <figcaption>Zoomed in, the map shows individual properties. Several apartments were built in Brooklyn's Flatbush area using 608 financing. Flat Bush Gardens in the lower right was the largest with nearly 2,500. The other three properties shown here were much smaller, with 107, 139, and 216 units. </figcaption>
      </Styled.Figure>

      <p><strong>Race and Income Layers:</strong> Detailed 1950 census data about race and income is shown for many cities when zoomed in, like Flatbush above. (In 1950 not all areas had compact census tracts, so this data is not shown in all areas.) Use this data to explore racial and socioeconomic patterns of 608 financed housing, which was disproportionally built in whiter and more well-to-do areas. You can toggle between race and income or turn the underlying census data on or off in the legend on the bottom right.</p>

    </Styled.Container>
  )
}

export default Explanation; 