import React, { useEffect } from "react";
import { TileLayer, MapContainer, CircleMarker } from "react-leaflet";
import * as Styled from "./styled";
import ContinentalUSZoomAndCenter from "./ContinentalUSZoomAndCenter";
import HashLoc from "./HashLoc";
import DeselectProperty from "./DeselectProperty";
import "leaflet/dist/leaflet.css";
import { useVisibleProperties, useURLState, useMapContext } from "../../hooks";
import { getColor } from "../../utilities";
import CensusTracts from "./CensusTracts/Index";
import Properties from "./Properties/Index";
import Controls from "./Controls/Index";


const Map = () => {
  const { center, zoom } = useURLState();
  const { map, setMap } = useMapContext();

  // function to size the circle markers based on the number of units
  const getRadius = (units: number) => {
    return Math.sqrt(units) * 0.5;
  };

  // a cleanup function to unset the map when the component is unmounted
  useEffect(() => {
    return () => {
      if (map) {
        console.log("unsetting map");
        setMap(undefined);
      }
    };
  }, [map, setMap]);

  return (
    <Styled.Map>

    <MapContainer
      center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        maxZoom={21}
      >
        <ContinentalUSZoomAndCenter />
        <HashLoc />
        <DeselectProperty />
        <TileLayer
          // positron light
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <TileLayer
          url="https://s3.amazonaws.com/dsl-general/sanborns/{z}/{x}/{y}.png"
          maxNativeZoom={20}
        />
        <CensusTracts />
        <Properties />
      </MapContainer>

      <Controls />
    </Styled.Map>
  );
};

export default Map;