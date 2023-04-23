import React, { useRef, useState } from "react";
import { SplashScreens } from "./SplashScreens";
import { MainMenu } from "./main-menu/MainMenu";
import { Game } from "./game/Game";
import { Credits } from "./main-menu/Credits";
import { LevelSelect } from "./main-menu/LevelSelect";

function App() {
  const [stage, setStage] = useState<string>("splash");
  const initialLevel = useRef(1);

  switch (stage) {
    case "splash":
      return <SplashScreens {...{ setStage }} />;
    case "menu":
      initialLevel.current = 1;
      return <MainMenu {...{ setStage, initialLevel }} />;
    case "credits":
      return <Credits exit={() => setStage("menu")} />;
    case "select":
      return <LevelSelect {...{ setStage, initialLevel: initialLevel }} />;
    case "game":
      return <Game {...{ setStage, initialLevel: initialLevel }} />;
    default:
      return <h1>SOMETHING HAS GONE HORRIBLY WRONG</h1>;
  }
}

export default App;
