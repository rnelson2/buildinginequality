import React, { useState, useEffect, useRef } from "react";
import { select } from "d3";
import * as Constants from "../../constants";

const PlusMinus = ({ isOpen }: { isOpen: boolean }) => {
  const horizontalRef = useRef(null);
  const [horizontalX1, setHorizontalX1] = useState(isOpen ? 3 : 4);
  const [horizontalX2, setHorizontalX2] = useState(isOpen ? 17 : 16);
  const verticalRef = useRef(null);
  const [verticalY1, setVerticalY1] = useState(isOpen ? 9.9 : 4);
  const [verticalY2, setVerticalY2] = useState(isOpen ? 10.1 : 16);
  const [strokeWidth, setStrokeWidth] = useState(isOpen ? 3 : 2);

  useEffect(() => {
    if (horizontalRef.current) {
      select(horizontalRef.current)
        .transition()
        .duration(400)
        .attr("x1", isOpen ? 3 : 4)
        .attr("x2", isOpen ? 17 : 16)
        .attr("stroke-width", isOpen ? 3 : 2)
        .on("end", () => {
          setHorizontalX1(isOpen ? 3 : 4);
          setHorizontalX2(isOpen ? 17 : 16);
          setStrokeWidth(isOpen? 3 : 2);
        });
    }
    if (verticalRef.current) {
      select(verticalRef.current)
        .transition()
        .duration(400)
        .attr("y1", isOpen ? 9.9 : 4)
        .attr("y2", isOpen ? 10.1 : 16)
        .attr("stroke-width", isOpen ? 3 : 2)
        .on("end", () => {
          setVerticalY1(isOpen ? 9.9 : 4);
          setVerticalY2(isOpen ? 10.1 : 16);
        });
    }
  }, [isOpen]);

  return (
    <svg viewBox="0 0 20 20">
      <line x1={horizontalX1} x2={horizontalX2} y1={10} y2={10} strokeWidth={strokeWidth} stroke={Constants.COLOR_INTERACTIVE} ref={horizontalRef} />
      <line x1={10} x2={10} y1={verticalY1} y2={verticalY2} strokeWidth={strokeWidth} stroke={Constants.COLOR_INTERACTIVE} ref={verticalRef} />
    </svg>
  );
};

export default PlusMinus;
