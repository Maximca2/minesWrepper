import React from "react";
import { Route, Routes } from "react-router-dom";
//Components
import MainPage from "./pages/MainPage";
import MainMenu from "./pages/GameOverMenu";
import Game from "./pages/Game";
//style
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<MainPage />} />
        <Route path="/startGame" element={<Game />} />
        <Route path="/menu" element={<MainMenu />} />
      </Routes>
    </div>
  );
}

export default App;
