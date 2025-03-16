import React, { useState } from "react";
import * as Styled from "./styled";
import Chart from "../Chart/Index";
import Cities from "./Cities/Index";
import Property from "../Property/Index";
import { useSelectedPropertyData, useVisibleProperties } from "../../hooks";

const Sidebar = () => {
  const properties = useVisibleProperties();
  const selectedProperty = useSelectedPropertyData();

  return (
    <Styled.Sidebar>
      {!selectedProperty && <Chart properties={properties} />}
      {!selectedProperty && <Cities />}
      {selectedProperty && <Property property={selectedProperty} />}
    </Styled.Sidebar>
  );
};

export default Sidebar;
