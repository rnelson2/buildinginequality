import { useEffect, useRef } from 'react';
import { useMap, useMapEvent } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { modifyHash } from '../../utilities';
import { useURLState } from '../../hooks';

const HashLoc = (): null => {
  const { hash, selectedProperty } = useURLState();
  const navigate = useNavigate();

  const map = useMap();                           // ← map instance
  const loc = useRef('1/0/0');                    // last hash we wrote
  const updateHashTID = useRef<NodeJS.Timeout>(null); // pending timeout id

  // ————————————————————————————————
  // helper that writes the new hash
  // ————————————————————————————————
  const updateLocation = () => {
    // map may exist but be *unloaded* already
    // @ts-ignore
    if (!map || !map._loaded) return;

    const c = map.getCenter();
    const z = map.getZoom();
    const newLoc = `${z}/${(c.lat).toFixed(4)}/${(c.lng).toFixed(4)}`;

    if (newLoc !== loc.current) {
      loc.current = newLoc;
      const updatedHash = modifyHash(hash, [
        { type: 'set_loc', payload: { zoom: z, center: [c.lat, c.lng] } },
      ]);
      navigate(`/map${selectedProperty ? `/${selectedProperty}` : ''}#${updatedHash}`, {
        replace: true,
      });
    }
  };

  // debounce updates after every move
  useMapEvent('moveend', () => {
    if (updateHashTID.current) clearTimeout(updateHashTID.current);
    updateHashTID.current = setTimeout(updateLocation, 300);
  });

  // write the hash once on first load
  useEffect(() => {
    if (loc.current === '1/0/0') updateLocation();
  }, []); // ← run once

  // clean up on unmount so the timeout can’t fire on a dead map
  useEffect(() => {
    return () => {
      if (updateHashTID.current) clearTimeout(updateHashTID.current);
    };
  }, []);

  return null;
};

export default HashLoc;
