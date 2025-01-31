import { useRef, useEffect } from 'react';
import { useMapEvent } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { parseHash, modifyHash } from '../../utilities';
import { useURLState } from '../../hooks';

/**
 * Updates the url when the map moves to reflect the current zoom and center or z/x/y.
 * Also, if the hash changes and the loc has been removed (by a link), restores it.
 */
const HashLoc = (): null => {
  const { hash, selectedProperty } = useURLState();
  const navigate = useNavigate();
  const loc = useRef('1/0/0');

  const map = useMapEvent('moveend', () => {
    // check to see if the bounds have changed
    const currentCenter = map.getCenter();
    const currentZoom = map.getZoom();
    const possibleNewLoc = `${currentZoom}/${Math.round(currentCenter.lat * 10000) / 10000}/${Math.round(currentCenter.lng * 10000) / 10000}`;
    if (possibleNewLoc !== loc.current) {
      loc.current = possibleNewLoc;
      const updatedHash = modifyHash(hash, [{
        type: 'set_loc',
        payload: {
          zoom: map.getZoom(),
          center: [currentCenter.lat, currentCenter.lng]
        }
      }]);
      navigate(`/map${selectedProperty ? `/${selectedProperty}` : '' }#${updatedHash}`, { replace: true });
    }
  });

  return null;
};

export default HashLoc;