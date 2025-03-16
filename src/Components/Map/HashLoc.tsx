import { useEffect, useRef } from 'react';
import { useMap, useMapEvent } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { modifyHash } from '../../utilities';
import { useURLState } from '../../hooks';

/**
 * Updates the URL hash when the map moves and initializes it if missing.
 */
const HashLoc = (): null => {
  const { hash, selectedProperty } = useURLState();
  const navigate = useNavigate();
  const loc = useRef('1/0/0');
  const updateHash = useRef<NodeJS.Timeout | null>(null);
  const map = useMap(); // Get map instance

  const updateLocation = () => {
    if (!map) return;
    
    const currentCenter = map.getCenter();
    const currentZoom = map.getZoom();
    const possibleNewLoc = `${currentZoom}/${Math.round(currentCenter.lat * 10000) / 10000}/${Math.round(currentCenter.lng * 10000) / 10000}`;

    if (possibleNewLoc !== loc.current) {
      loc.current = possibleNewLoc;
      const updatedHash = modifyHash(hash, [{ type: "set_loc", payload: { zoom: currentZoom, center: [currentCenter.lat, currentCenter.lng] } }]);
      navigate(`/map${selectedProperty ? `/${selectedProperty}` : ""}#${updatedHash}`, { replace: true });
    }
  };

  // Update location on map move
  useMapEvent("moveend", () => {
    if (updateHash.current) clearTimeout(updateHash.current);
    updateHash.current = setTimeout(updateLocation, 300);
  });

  // Update location when the map first initializes
  useEffect(() => {
    if (loc.current === '1/0/0' && map) {
      updateLocation();
    }
  }, [loc, map]);

  return null;
};

export default HashLoc;