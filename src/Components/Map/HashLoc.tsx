import { useRef } from 'react';
import { useMapEvent } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { modifyHash } from '../../utilities';
import { useURLState } from '../../hooks';

/**
 * Updates the url when the map moves to reflect the current zoom and center or z/x/y.
 * Also, if the hash changes and the loc has been removed (by a link), restores it.
 */
const HashLoc = (): null => {
  const { hash, selectedProperty } = useURLState();
  const navigate = useNavigate();
  const loc = useRef('1/0/0');
  const updateHash = useRef<NodeJS.Timeout | null>(null);

  const map = useMapEvent("moveend", () => {
    if (updateHash.current) clearTimeout(updateHash.current);
    updateHash.current = setTimeout(() => {
      const currentCenter = map.getCenter();
      const currentZoom = map.getZoom();
      const possibleNewLoc = `${currentZoom}/${Math.round(currentCenter.lat * 10000) / 10000}/${Math.round(currentCenter.lng * 10000) / 10000}`;
      if (possibleNewLoc !== loc.current) {
        loc.current = possibleNewLoc;
        const updatedHash = modifyHash(hash, [{ type: "set_loc", payload: { zoom: currentZoom, center: [currentCenter.lat, currentCenter.lng] } }]);
        navigate(`/map${selectedProperty ? `/${selectedProperty}` : ""}#${updatedHash}`, { replace: true });
      }
    }, 300);
  });

  return null;
};

export default HashLoc;