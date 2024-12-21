import React, { useState } from "react";
import * as Styled from "./styled";
import Menu from "../Menu/Index";
import Chart from "../Chart/Index";
import Property from "../Property/Index";
import { useSelectedPropertyData, useVisibleProperties } from "../../hooks";
import MenuToggleButton from "../Buttons/MenuToggleButton";

const Sidebar = () => {
  const properties = useVisibleProperties();
  const selectedProperty = useSelectedPropertyData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Styled.Sidebar>
      <Styled.MenuToggle
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        <MenuToggleButton $isMenuOpen={isMenuOpen} /> Menu
      </Styled.MenuToggle>

      {isMenuOpen && <Menu />}

      {!selectedProperty && !isMenuOpen && <Chart properties={properties} />}
      {selectedProperty && !isMenuOpen && <Property property={selectedProperty} />}
    </Styled.Sidebar>
  );
};

export default Sidebar;
