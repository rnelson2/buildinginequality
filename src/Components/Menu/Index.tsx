import React, { useState, useRef, useEffect } from "react";
import { useDimensions } from "../../hooks";
import Toggle from "./Toggle/Index";
import * as Styled from "./styled";

const Menu = () => {
  const { device } = useDimensions();

  const [isOpen, setIsOpen] = useState(device !== "mobile");
  const currentMedia = useRef(device);

  // change whether the menu is open if the size of the window is changed
  useEffect(() => {
    if (device !== currentMedia.current) {
      if (device !== "mobile" && !isOpen) {
        setIsOpen(true);
      }
      currentMedia.current = device;
    }
  }, [device]);

  // on mobile and tablets, close the menu if something is selected
  useEffect(() => {
    if (device === "mobile") {
      setIsOpen(false);
    }
  }, [device]);

  return (
    <>
      {device === "mobile" && (
        <Toggle
          isMenuOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
      {isOpen && (
        <Styled.Nav>
          <Styled.Item>
            <Styled.Link to="/map">Map</Styled.Link>
          </Styled.Item>
          <Styled.Item>
            <Styled.Link to="/stories">Stories of the Program</Styled.Link>
          </Styled.Item>
          <Styled.Item>
            <Styled.Link to="/sources">About</Styled.Link>
          </Styled.Item>
        </Styled.Nav>
      )}
    </>
  );
};

export default Menu;
