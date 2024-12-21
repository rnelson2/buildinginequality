import React, { useEffect, useState } from "react";
import { DimensionsContext } from "./Contexts";
import * as Constants from "./constants";
import type { Dimensions } from ".";

const DimensionsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const calculateDimensions = () => {
    const { innerWidth, innerHeight } = window;
    const { clientWidth, clientHeight } = document.documentElement ? document.documentElement : { clientWidth: null, clientHeight: null };
    const headerHeight = 100;
    const dimensions: Partial<Dimensions> = {
      containerPadding: 20,
      headerHeight,
      mobileHeaderHeight: 35,
      dataViewerTitleBottomMargin: 10,
      adNavHeight: 20,
      mainPaneWidth: 0,
      dataViewerTitleHeight: 0,
    };
    dimensions.width = clientWidth || innerWidth;
    dimensions.height = clientHeight || innerHeight;
    dimensions.tilesHeight = dimensions.height - 140; // two paddings + headerHeight
    dimensions.mapHeight = dimensions.height;
    dimensions.mapWidth = dimensions.width - 300;
    dimensions.middleMenuWidth = Math.min(300, dimensions.width * 0.17);

    dimensions.media = "phone";
    if (dimensions.width >= Constants.sizes.tablet) {
      dimensions.media = "tablet-portrait";
    }
    if (dimensions.width >= Constants.sizes.desktop) {
      dimensions.media = "desktop";
    }
    dimensions.dataViewerWidth = dimensions.media === "desktop" ? Constants.componentDimensions.sidebar.width.desktop : dimensions.width;
    // (100vh - 45px - 45px - 2px - 2vw)
    //dimensions.dataViewerHeight = dimensions.media === "desktop" ? dimensions.height - 92 - dimensions.width * 0.02 : dimensions.width;

    return dimensions as Dimensions;
  };

  const [dimensions, setDimensions] = useState(calculateDimensions());

  useEffect(() => {
    window.addEventListener("resize", () => setDimensions(calculateDimensions()));
    setDimensions(calculateDimensions());
  }, []);

  return <DimensionsContext.Provider value={dimensions}>{children}</DimensionsContext.Provider>;
};

export default DimensionsContextProvider;