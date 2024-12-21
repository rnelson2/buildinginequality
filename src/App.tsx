import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import DimensionsContextProvider from "./DimensionsContextProvider";
// import AppStateContextProvider from "./AppStateContextProvider";
import Masthead from "./Components/Masthead/Index";
import Map from "./Components/Map/Index";
import Sidebar from "./Components/Sidebar/Index";
import Intro from "./Components/Text/Intro/Index";
import About from "./Components/Text/About/Index";
import Menu from "./Components/Menu/Index";
import * as Styled from "./styled";
import { MapStateContext } from "./Contexts";
import type { Map as MapT } from "leaflet";

const App = () => {
  const [map, setMap] = useState<MapT | undefined>();

  return (
    <Styled.App>
      <Styled.GlobalStyle />
      <Router basename={process.env.PUBLIC_URL}>
        <MapStateContext.Provider value={{ map, setMap }}>
          <Masthead />
          <Routes>
            <Route
              path="/map/:selectedProperty?"
              element={
                <>
                  <Map />
                  <Sidebar />
                </>
              }
            ></Route>

            <Route path="/introduction" element={<><Menu /><Intro /></>} />
            <Route path="/about" element={<><Menu /><About /></>} />
            <Route path="/" element={<><Menu /></>} />
          </Routes>
        </MapStateContext.Provider>
      </Router>
    </Styled.App>
  );
};

export default App;
