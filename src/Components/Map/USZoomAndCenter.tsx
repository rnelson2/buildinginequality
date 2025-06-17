import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { parseHash } from "../../utilities";
import { useMapContext, useURLState } from "../../hooks";

/**
 * if the url is just /map with no zoom and center and not state, then set the view to show
 * the  US.
 */
const USZoomAndCenter = (): null => {
  const map = useMap();
  const { map: theMap, setMap } = useMapContext();
  const { hash, pathname } = useURLState();
  const { loc } = parseHash(hash);

  const mapInitialized = useRef(false);

  useEffect(() => {
    if (!mapInitialized.current && map) {
      mapInitialized.current = true;
      setMap(map);
    }
    return () => {
      if (map && !pathname.startsWith("/map")) {
        setMap(undefined);
        mapInitialized.current = false;
      }
    };
  }, [theMap, map, setMap]);

  useEffect(() => {
    // initialize the zoom to show the  US
    if (!loc && theMap) {
      theMap.fitBounds([[68.77, -169.38], [17.231, -66.96]]);
    }
  }, [theMap, loc]);

  return null;
};

export default USZoomAndCenter;
