import React from "react";
import { Route, Routes } from "react-router-dom";
//Components
import MainPage from "./pages/MainPage";
import MainMenu from "./pages/GameOverMenu";
import CreateLevel from "pages/CreateLevel";
import Game from "./pages/Game";
//style
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<MainPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/createOwnLevel" element={<CreateLevel />} />
        <Route path="/startGame" element={<Game />} />
        <Route path="/menu" element={<MainMenu />} />
      </Routes>
    </div>
  );
}

export default App;
