import React from "react";
import { getColor } from "../../../utilities";
import { useURLState } from "../../../hooks";
import * as Styled from "./styled";

const ToggleButton = ({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { mapview } = useURLState();

  const properties1 = {
    properties: {
      median_income: 3000,
      white_pop: 60,
      black_pop: 40,
    }
  }

  const properties2 = {
    properties: {
      median_income: 2000,
      white_pop: 20,
      black_pop: 80,
    }
  }

  const properties3 = {
    properties: {
      median_income: 4000,
      white_pop: 80,
      black_pop: 20,
    }
  }

  const options = (mapview === "income") ? { maxIncome: 5000 } : undefined;
  return (
    <Styled.ToggleButton
      onClick={() => setOpen(!open)}
    >
      <svg
        width={44}
        height={44}
      >
        <circle
          cx={26}
          cy={8}
          r={4}
          fill={getColor(properties1, mapview, options)}
        />
        <circle
          cx={36}
          cy={20}
          r={8}
          fill={getColor(properties2, mapview, options)}
        />
        <circle
          cx={12}
          cy={20}
          r={12}
          fill={getColor(properties3, mapview, options)}
        />
      </svg>
      Legend &<br />Controls

    </Styled.ToggleButton>
  );
}

export default ToggleButton;