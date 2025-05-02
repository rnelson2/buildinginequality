import React, { useEffect, useRef } from "react";
import { scaleSequential, interpolateYlOrRd, select, axisBottom, scaleLinear } from "d3";

interface HexbinLegendProps {
  maxUnits: number;
  width?: number;
  height?: number;
  ticks?: number;
}

const HexbinLegend: React.FC<HexbinLegendProps> = ({
  maxUnits,
  width = 200,
  height = 12,
  ticks = 5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const axisRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;

    const colorScale = scaleSequential(interpolateYlOrRd).domain([0, maxUnits]);

    for (let i = 0; i < width; ++i) {
      const value = (i / width) * maxUnits;
      context.fillStyle = colorScale(value);
      context.fillRect(i, 0, 1, height);
    }

    // Draw axis below
    const svg = select(axisRef.current);
    const x = scaleLinear().domain([0, maxUnits]).range([0, width]);
    const axis = axisBottom(x).ticks(ticks).tickSize(4);
    // @ts-ignore
    svg.select("g").call(axis);
  }, [maxUnits, width, height, ticks]);

  return (
    <div style={{ fontSize: "0.8rem", lineHeight: "1", marginTop: "8px" }}>
      <div style={{ marginBottom: "4px" }}>Apartment Units (per hex)</div>
      <canvas ref={canvasRef} width={width} height={height} />
      <svg width={width} height={20} ref={axisRef}>
        <g transform="translate(0,0)" />
      </svg>
    </div>
  );
};

export default HexbinLegend;
