import React, { useEffect } from "react";
import { TileLayer, MapContainer, ZoomControl } from "react-leaflet";
import * as Styled from "./styled";
import USZoomAndCenter from "./USZoomAndCenter";
import HashLoc from "./HashLoc";
import DeselectProperty from "./DeselectProperty";
import "leaflet/dist/leaflet.css";
import { useVisibleProperties, useURLState, useMapContext } from "../../hooks";
import CensusTracts from "./CensusTracts/Index";
import Properties from "./Properties/Index";
import ClusteredProperties from "./ClusteredProperties/Index";
import Controls from "./Controls/Index";
import CitySelect from "./CitySelect/Index";


const Map = () => {
  const { center, zoom } = useURLState();
  const { map, setMap } = useMapContext();

  // a cleanup function to unset the map when the component is unmounted
  useEffect(() => {
    return () => {
      if (map) {
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
        minZoom={1}
        maxBounds={[[78, -179], [0, -45]]}
        zoomControl={false}
      >
        <USZoomAndCenter />
        <HashLoc />
        <DeselectProperty />
        <TileLayer
          // positron light
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {/* <TileLayer
          url="https://s3.amazonaws.com/dsl-general/sanborns/{z}/{x}/{y}.png"
          maxNativeZoom={20}
        /> */}
        {zoom >= 11 && <CensusTracts /> }
        {zoom >= 11 && <Properties />}
        {zoom < 11 && <ClusteredProperties />}
        <ZoomControl position="topright" /> 
      </MapContainer>

      <Controls />
      <CitySelect />
    </Styled.Map>
  );
};

export default Map;