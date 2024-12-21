import React, { useState, useEffect } from 'react';
import * as Types from './index.d';
import { AppStateContext } from './Contexts';
import * as Constants from './constants';

const AppStateContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [industrialVocabulary, setIndustrialVocabulary] = useState<Types.TokenCount[]>([]);
  const [highlightedTokens, setHighlightedTokens] = useState<string[]>([]);
  const [visibleGeojson, setVisibleGeojson] = useState<Types.TokenGeojson[]>([]);
  const [visibleHOLCGeojson, setVisibleHOLCGeojson] = useState<Types.HOLCGeojson[]>([]);
  const [visibleHOLCAreaGeojson, setVisibleHOLCAreaGeojson] = useState<Types.HOLCAreaGeojson[]>([]);
  const [censusGeojson, setCensusGeojson] = useState<Types.CensusGeojson[]>([]);
  const calculateDimensions = () => {
    const { innerWidth, innerHeight } = window;
    const { clientWidth, clientHeight } = document.documentElement ? document.documentElement : { clientWidth: null, clientHeight: null };
    const headerHeight = 100;
    const dimensions: Partial<Types.Dimensions> = {
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
    dimensions.dataViewerWidth = dimensions.media === "desktop" ? 300 : dimensions.width;
    // (100vh - 45px - 45px - 2px - 2vw)
    //dimensions.dataViewerHeight = dimensions.media === "desktop" ? dimensions.height - 92 - dimensions.width * 0.02 : dimensions.width;

    return dimensions as Types.Dimensions;
  };

  const [dimensions, setDimensions] = useState(calculateDimensions());

  useEffect(() => {
    window.addEventListener("resize", () => setDimensions(calculateDimensions()));
    setDimensions(calculateDimensions());
  }, []);
  return (
    <AppStateContext.Provider
      value={{
        dimensions,
        visibleGeojson,
        setVisibleGeojson,
        visibleHOLCGeojson,
        setVisibleHOLCGeojson,
        visibleHOLCAreaGeojson,
        setVisibleHOLCAreaGeojson,
        censusGeojson,
        setCensusGeojson,
        industrialVocabulary,
        setIndustrialVocabulary,
        highlightedTokens,
        setHighlightedTokens,
      }}
    >
      {children}
    </AppStateContext.Provider>
  )
};

export default AppStateContextProvider;