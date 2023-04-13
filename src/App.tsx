import React, { useState } from "react";
import { SplashScreens } from "./SplashScreens";
import { MainMenu } from "./main-menu/MainMenu";
import { Game } from "./game/Game";

function App() {
  const [stage, setStage] = useState<string>("splash");

  switch (stage) {
    case "splash":
      return <SplashScreens {...{ setStage }} />;
    case "menu":
      return <MainMenu {...{ setStage }} />;
    case "game":
      return <Game />;
    default:
      return <></>;
  }
}

export default App;
