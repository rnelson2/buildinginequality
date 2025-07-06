import React, { useState } from "react";
import * as Styled from "./styled";
import HexbinLegend from "./HexbinLegend/Index";
import ZoomedInLegend from "./ZoomedInLegend/Index";
import Explanation from "./Explanation/Index";
import { useURLState } from "../../../hooks";

const Controls = () => {
  const { zoom } = useURLState();

  const [showExplanation, setShowExplanation] = useState(false);

  if (zoom <= 10) {
    return (
    <>
      <Styled.Container>
          <HexbinLegend />
          <Styled.HowToUseButton onClick={() => setShowExplanation(!showExplanation)}>How to Read & Use the Map</Styled.HowToUseButton>
      </Styled.Container>
        { showExplanation && <Explanation setShowExplanation={setShowExplanation} /> }
    </>
    );
  }

  return <>
    <Styled.Container>
      <ZoomedInLegend />
      <Styled.HowToUseButton onClick={() => setShowExplanation(!showExplanation)}>How to Read & Use the Map</Styled.HowToUseButton>
      </Styled.Container>

    {showExplanation && <Explanation setShowExplanation={setShowExplanation} />}
  </>;
};

export default Controls;
