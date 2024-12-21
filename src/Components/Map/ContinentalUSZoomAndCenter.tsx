import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { parseHash } from "../../utilities";
import { useMapContext, useURLState } from "../../hooks";

/**
 * if the url is just /map with no zoom and center and not state, then set the view to show
 * the continental US.
 */
const ContinentalUSZoomAndCenter = (): null => {
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
        console.log("unsetting map");
        setMap(undefined);
        mapInitialized.current = false;
      }
    };
  }, [theMap, map, setMap]);

  useEffect(() => {
    // initialize the zoom to show the continental US
    if (!loc && theMap) {
      theMap.fitBounds([[49, -124.725], [25.17, -66.96]]);
    }
  }, [theMap, loc]);

  return null;
};

export default ContinentalUSZoomAndCenter;
