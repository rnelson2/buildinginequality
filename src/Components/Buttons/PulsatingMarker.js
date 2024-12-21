import React from 'react';
import { renderToString } from 'react-dom/server';
import L from 'leaflet';
import * as Constants from '../../constants';

// the pulsating marker keyframes are set in the global style
const IconHTML = <div
  style={{
    width: 18,
    height: 18,
    background: 'white',
    borderRadius: 9,
    animation: '1.5s pulsatingMarker infinite',
  }}
  >
  <div
    style={{
      width: 10,
      height: 10,
      background: 'rgb(51, 136, 255)',
      borderRadius: 5,
      transform: 'translate(4px, 4px)',
    }}
  />
</div>;


const icon = L.divIcon({
  html: renderToString(IconHTML),
  // empty class name to prevent the default leaflet-div-icon to apply
  className: 'emphasizedPoint',
});

export default icon;
