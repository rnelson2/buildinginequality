import React from "react";
import * as Styled from "./styled";
import ApartmentCard from "./ApartmentCard/Index";
import { CityProperty } from "../../../index.d";

/**
 * CityTable Component - Displays apartment details for a specific city.
 */
const CityTable: React.FC<{ properties: CityProperty[] }> = ({ properties }) => {
  return (
    <Styled.TableContainer>
      {properties.map((property) => {// Use first mortgage entry
        return (
          <ApartmentCard key={property.proj_num} property={property} />
        );
      })}
    </Styled.TableContainer>
  );
};

export default CityTable;