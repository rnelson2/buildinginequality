import React from "react";
import Property from "./Property/Index";
import EmphasizedProperty from "./EmphasizedProperty/Index";
import { useVisibleProperties, useURLState, useMapContext } from "../../../hooks";
import * as Styled from "./styled";

const Properties = () => {
  const properties = useVisibleProperties();
  const { selectedProperty, mapview } = useURLState();
  const { highlightedIds } = useMapContext();

  let emphasizedProperties: typeof properties[0][] = [];
  if (selectedProperty && highlightedIds.length === 0) {
    emphasizedProperties = properties.filter(property => {
      const { mortgages } = property.properties;
      return mortgages.some(mortgage => mortgage.proj_num === parseInt(selectedProperty));
    });
  } else if (highlightedIds.length > 0) {
    emphasizedProperties = properties.filter(property => {
      const { mortgages } = property.properties;
      return mortgages.map(d => d.proj_num).some(proj_num => highlightedIds.includes(proj_num));
    });
  }

  if (properties.length === 0) {
    return <Styled.NoProperties>Street addresses for any properties in this area have not yet been located. Zoom out to see aggregated and approximate locations. Data about these properties is available in the sidebar.</Styled.NoProperties>;
  }

  return (
    <>
      <Styled.PropertiesPane name="properties" />
        {/* This pane is used to ensure properties are rendered above other layers */}
      {emphasizedProperties.map(property => (
        <EmphasizedProperty
          property={property}
          key={`emphasized${property.geometry.coordinates[0]}-${property.geometry.coordinates[1]}-${selectedProperty}-${mapview}${highlightedIds ? `-${highlightedIds.join("-")}` : ""}`}
        />
      ))}
      {properties.map(property => (
        <Property
          property={property}
          key={`${property.geometry.coordinates[0]}-${property.geometry.coordinates[1]}-${selectedProperty}-${mapview}${highlightedIds ? `-${highlightedIds.join("-")}` : ""}`}
        />
      ))}
    </>
  );
};

export default Properties;
