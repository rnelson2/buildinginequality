import React from "react";
import { format } from "d3-format";
import { scaleThreshold } from "d3-scale";
import * as Styled from "./styled";
import { getBlueThresholdScale } from "../../../../utilities";
import { useVisibleHexbins } from "../../../../hooks";
import Units from "./Units/Index";
import CensusRaceLegend from "./CensusRace/Index";


const ZoomedInLegend: React.FC = () => {
  return (
    <Styled.Container>
     <Units />
     <CensusRaceLegend />
    </Styled.Container>
  );
};

export default ZoomedInLegend;