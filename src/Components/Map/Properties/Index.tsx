import React from "react";
import Property from "./Property/Index";
import EmphasizedProperty from "./EmphasizedProperty/Index";
import { useVisibleProperties, useURLState, useMapContext } from "../../../hooks";

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


  return (
    <>
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
