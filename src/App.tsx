import React, { Suspense, useState, useReducer } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import DimensionsContextProvider from "./DimensionsContextProvider";
// import AppStateContextProvider from "./AppStateContextProvider";
import Masthead from "./Components/Masthead/Index";
import Map from "./Components/Map/Index";
import Sidebar from "./Components/Sidebar/Index";
import Intro from "./Components/Text/Intro/Index";
import Acknowledgments from "./Components/Text/Acknowledgments/Index";
import Sources from "./Components/Text/Sources/Index";
import Menu from "./Components/Menu/Index";
import Home from "./Components/Home/Index";
import Citing from "./Components/Text/Citation/Index";
import Data from "./Components/Text/Data/Index";
import Stories from "./Components/Text/Stories/Index";
import * as Styled from "./styled";
import { MapStateContext } from "./Contexts";
import type { Map as MapT } from "leaflet";
import * as Types from "./index.d";

const App = () => {
  const [map, setMap] = useState<MapT | undefined>();
  const [highlightedIds, dispatchHighlightedIds] = useReducer((state: number[], action: Types.HighlightedIdActions): number[] => {
    if (action.type === "add_to_highlighted") {
      return [...state, action.payload];
    }
    if (action.type === "set_only_highlighted") {
      return [action.payload];
    }
    if (action.type === "set_highlighted") {
      return action.payload;
    }
    if (action.type === "remove_from_highlighted") {
      return state.filter(id => id !== action.payload);
    }
    if (action.type === "clear_highlighted") {
      return [];
    }
    return state;
  }, []);

  return (
    <Styled.App>
      <Styled.GlobalStyle />
      <Router basename={'/'}>
        <MapStateContext.Provider
          value={{
            map,
            setMap,
            highlightedIds,
            addToHighlightedIds: (id: number) => {
              dispatchHighlightedIds({ type: "add_to_highlighted", payload: id });
            },
            setHighlightedIds: (ids: number[]) => {
              dispatchHighlightedIds({ type: "set_highlighted", payload: ids });
            },
            setOnlyHighlightedId: (id: number) => {
              dispatchHighlightedIds({ type: "set_only_highlighted", payload: id });
            },
            removeFromHighlightedIds: (id: number) => {
              dispatchHighlightedIds({ type: "remove_from_highlighted", payload: id });
            },
            clearHighlightedIds: () => {
              dispatchHighlightedIds({ type: "clear_highlighted" });
            },
          }}
        >
          
          <Routes>
            <Route
              path="/map/:selectedProperty?"
              element={
                <>
                  <Masthead />
                  <Map />
                  <Sidebar />
                  <Menu />
                </>
              }
            ></Route>

            <Route
              path="/introduction"
              element={
                <>
                  <Masthead />
                  <Menu />
                  <Intro />
                </>
              }
            />

            <Route
              path="/sources"
              element={
                <>
                  <Masthead />
                  <Menu />
                  <Sources />
                </>
              }
            />

            <Route
              path="/citing"
              element={
                <>
                  <Masthead />
                  <Menu />
                  <Citing />
                </>
              }
            />

            <Route
              path="/data"
              element={
                <>
                  <Masthead />
                  <Menu />
                  <Data />
                </>
              }
            />

<Route
              path="/stories"
              element={
                <>
                  <Masthead />
                  <Menu />
                  <Stories />
                </>
              }
            />




            <Route
              path="/acknowledgments"
              element={
                <>
                  <Masthead />
                  <Menu />
                  <Acknowledgments />
                </>
              }
            />
            <Route
              path="/"
              element={
                  <Home />
              }
            />
          </Routes>
        </MapStateContext.Provider>
      </Router>
    </Styled.App>
  );
};

export default App;
