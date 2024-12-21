import React from "react";
import CloseButton from "./CloseButton/Index";
import * as Styled from "./styled";
import { useDimensionsContext } from "../../../hooks";

const MenuToggle = ({ isMenuOpen, setIsOpen }: { isMenuOpen: boolean; setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { media } = useDimensionsContext();
  if (media !== "desktop") {
    return (
      <Styled.Toggle onClick={() => { setIsOpen(!isMenuOpen); }}>
        <CloseButton isMenuOpen={isMenuOpen} />
      </Styled.Toggle>
    );
  }

  return <Styled.Toggle>Menu</Styled.Toggle>;
};

export default MenuToggle;
