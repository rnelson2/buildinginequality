import React, { useState, useEffect } from "react";
import * as Styled from "./styled";
import HexbinLegend from "./HexbinLegend/Index";
import ZoomedInLegend from "./ZoomedInLegend/Index";
import Explanation from "./Explanation/Index";
import { useURLState, useDimensions } from "../../../hooks";
import CloseButton from "../../Buttons/Close";

const Controls = () => {
  const { zoom } = useURLState();
  const { device } = useDimensions();

  const [hidden, setHidden] = useState(device === "mobile");

  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    // Hide controls on mobile devices
    if (device === 'desktop') {
      setHidden(false);
    }
  }, [device]);

  return (
    <>
      {!hidden && (
        <Styled.Container>
          {device !== 'desktop' && (
            <Styled.Close onClick={() => setHidden(true)}>
              <CloseButton />
            </Styled.Close>
          )}
          {zoom < 10 ? <HexbinLegend /> : <ZoomedInLegend />}
          <Styled.HowToUseButton onClick={() => setShowExplanation(!showExplanation)}>How to Read & Use the Map</Styled.HowToUseButton>
        </Styled.Container>
      )}
      {showExplanation && <Explanation setShowExplanation={setShowExplanation} />}
      {hidden && (
        <Styled.LegendButton onClick={() => setHidden(false)} >
          Legend
        </Styled.LegendButton>
      )}
    </>
  );
};

export default Controls;
