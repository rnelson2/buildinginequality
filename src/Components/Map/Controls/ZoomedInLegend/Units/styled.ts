import styled from "styled-components";

export const Container = styled.div`
  width: 160px;
  margin: 0 auto;
`;

export const Title = styled.h3`
  font-size: 1em;
  margin: 0;
  text-align: center;
  font-weight: normal;
`;

export const LegendWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  width: 120px;
  height: 80px;
  margin: 0 auto;
  
`;

export const CirclesWrapper = styled.div`
  position: relative;
  width: 50px;
`;

export const Circle = styled.div<{ size: number; color: string; fill: string }>`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  background-color: ${({ fill }) => fill};
  border: 2px solid ${({ color }) => color};
  fill-opacity: 0.1;
`;

export const LabelsWrapper = styled.div`
  position: relative;
  height: 100px; /* Match CirclesWrapper height */
`;

export const LabelCircle = styled.span<{ $topOffset: number }>`
  position: absolute;
  left: 0;
  transform: translateY(-50%);
  top: ${({ $topOffset }) => `calc(100% - ${$topOffset * 2}px)`}; 
  font-size: 0.75rem;
  white-space: nowrap;
  text-align: left;
`;
