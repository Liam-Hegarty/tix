import React, { useState } from "react";
import { SplashScreens } from "./SplashScreens";
import { MainMenu } from "./main-menu/MainMenu";
import { Game } from "./game/Game";
import { Credits } from "./main-menu/Credits";

function App() {
  const [stage, setStage] = useState<string>("splash");

  switch (stage) {
    case "splash":
      return <SplashScreens {...{ setStage }} />;
    case "menu":
      return <MainMenu {...{ setStage }} />;
    case "credits":
      return <Credits exit={() => setStage("menu")} />;
    case "game":
      return <Game {...{setStage}} />;
    default:
      return <></>;
  }
}

export default App;
