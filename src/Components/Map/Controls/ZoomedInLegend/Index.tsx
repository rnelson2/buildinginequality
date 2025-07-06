import React from "react";
import * as Styled from "./styled";
import Units from "./Units/Index";
import Census from "./Census/Index";

const ZoomedInLegend: React.FC = () => {
  return (
    <>
      <Units />
      <Census />
    </>
  );
};

export default ZoomedInLegend;