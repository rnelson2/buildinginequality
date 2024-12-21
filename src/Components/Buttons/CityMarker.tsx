import React from "react";
import * as Constants from "../../constants";
import { useMapStateContext } from "../../hooks";
import type { MarkerIconType } from "../../index.d";
import { GradeValues, MainGradeLower } from '../../index.d';

export const CityMarker = (props: { type?: MarkerIconType, areas?: GradeValues<number, MainGradeLower>, random?: boolean }) => {
  const type = props.type || useMapStateContext().markerIconType;
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const describeArc = (startAngle: number, endAngle: number) => {
    const x = 100;
    const y = 100;
    const outerR = 100;
    const innerR = outerR / 3;
    const startOuter = polarToCartesian(x, y, outerR, endAngle);
    const endOuter = polarToCartesian(x, y, outerR, startAngle);
    const startInner = polarToCartesian(x, y, innerR, endAngle);
    const endInner = polarToCartesian(x, y, innerR, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const d = ["M", startOuter.x, startOuter.y, "A", outerR, outerR, 0, largeArcFlag, 0, endOuter.x, endOuter.y, "L", endInner.x, endInner.y, "A", innerR, innerR, 0, largeArcFlag, 1, startInner.x, startInner.y].join(" ");

    return d;
  };

  const getLine = (startAngle: number, endAngle: number) => {
    const x = 100;
    const y = 100;
    const outerR = 100;
    const innerR = outerR / 3;
    const endOuter = polarToCartesian(x, y, outerR, startAngle);
    const endInner = polarToCartesian(x, y, innerR, startAngle);

    return {
      x1: endOuter.x,
      y1: endOuter.y,
      x2: endInner.x,
      y2: endInner.y,
    };
  };

  let areas = props.areas;
  if (props.random) {
    const a = 0.1 + Math.random() * 0.15;
    const b = 0.12 + Math.random() * 0.2;
    const c = 0.2 + Math.random() * 0.3;
    const d = 1 - a - b - c;
    areas = { a, b, c, d };
  } else {
    areas = {
      a: 0.15,
      b: 0.2,
      c: 0.35,
      d: 0.3,
    }
  };

  const rs = {
    d: Math.sqrt(areas.d) * 100,
    c: Math.sqrt(areas.d + areas.c) * 100,
    b: Math.sqrt(areas.d + areas.c + areas.b) * 100,
    a: 100,
  };


  if (type === "concentric") {
    return (
      <svg viewBox="0 0 200 200">
        <circle cx={100} cy={100} r={rs.d} fill={Constants.constantsColorsVibrant.D} />
        <path d={`M 100, 100 m 0, -${rs.c} a ${rs.c}, ${rs.c}, 0, 1, 0, 1, 0 Z m 0 ${rs.c - rs.d} a ${rs.d}, ${rs.d}, 0, 1, 1, -1, 0 Z`} fill={Constants.constantsColorsVibrant.C} />
        <path d={`M 100, 100 m 0, -${rs.b} a ${rs.b}, ${rs.b}, 0, 1, 0, 1, 0 Z m 0 ${rs.b - rs.c} a ${rs.c}, ${rs.c}, 0, 1, 1, -1, 0 Z`} fill={Constants.constantsColorsVibrant.B} />
        <path d={`M 100, 100 m 0, -${rs.a} a ${rs.a}, ${rs.a}, 0, 1, 0, 1, 0 Z m 0 ${rs.a - rs.b} a ${rs.b}, ${rs.b}, 0, 1, 1, -1, 0 Z`} fill={Constants.constantsColorsVibrant.A} strokeWidth={0} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 200">
      <path d={describeArc(0, areas.a * 360)} fill={Constants.constantsColorsVibrant.A} />
      <path d={describeArc(areas.a * 360, (areas.a + areas.b) * 360)} fill={Constants.constantsColorsVibrant.B} />
      <path d={describeArc((areas.a + areas.b) * 360, (areas.a + areas.b + areas.c) * 360)} fill={Constants.constantsColorsVibrant.C} />
      <path d={describeArc((areas.a + areas.b + areas.c) * 360, 360)} fill={Constants.constantsColorsVibrant.D} />
      <circle cx="100" cy="100" r="99" fill="transparent" stroke="black" strokeWidth={2} />
      <circle cx="100" cy="100" r="33.333" fill="transparent" stroke="black" strokeWidth={2} />
      <line x1={getLine(0, areas.a * 360).x1} y1={getLine(0, areas.a * 360).y1} x2={getLine(0, areas.a * 360).x2} y2={getLine(0, areas.a * 360).y2} stroke="black" strokeWidth={2} />
      <line x1={getLine(areas.a * 360, (areas.a + areas.b) * 360).x1} y1={getLine(areas.a * 360, (areas.a + areas.b) * 360).y1} x2={getLine(areas.a * 360, (areas.a + areas.b) * 360).x2} y2={getLine(areas.a * 360, (areas.a + areas.b) * 360).y2} stroke="black" strokeWidth={2} />
      <line x1={getLine((areas.a + areas.b) * 360, (areas.a + areas.b + areas.c) * 360).x1} y1={getLine((areas.a + areas.b) * 360, (areas.a + areas.b + areas.c) * 360).y1} x2={getLine((areas.a + areas.b) * 360, (areas.a + areas.b + areas.c) * 360).x2} y2={getLine((areas.a + areas.b) * 360, (areas.a + areas.b + areas.c) * 360).y2} stroke="black" strokeWidth={2} />
      <line x1={getLine((areas.a + areas.b + areas.c) * 360, 360).x1} y1={getLine((areas.a + areas.b + areas.c) * 360, 360).y1} x2={getLine((areas.a + areas.b + areas.c) * 360, 360).x2} y2={getLine((areas.a + areas.b + areas.c) * 360, 360).y2} stroke="black" strokeWidth={2} />
    </svg>
  );
};

export default CityMarker;
