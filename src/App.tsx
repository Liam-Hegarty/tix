import React, { useEffect, useRef, useState } from "react";
import { SplashScreen1, SplashScreen2 } from "./SplashScreens";
import { MainMenu } from "./main-menu/MainMenu";
import { Game } from "./game/Game";
import { Credits } from "./main-menu/Credits";
import { LevelSelect } from "./main-menu/LevelSelect";

const themeMusic = new Audio(
  `${process.env.PUBLIC_URL}/audio/music/main-theme.mp3`
);
themeMusic.loop = true;

function App() {
  const [stage, setStage] = useState<string>("splash1");
  const initialLevel = useRef(1);

  useEffect(() => {
    if (stage !== "splash1" && stage !== "game" && themeMusic.paused) {
      themeMusic.play();
    }

    if ((stage === "splash1" || stage === "game") && !themeMusic.paused) {
      themeMusic.pause();
    }

    return () => themeMusic.pause();
  }, [stage]);

  switch (stage) {
    case "splash1":
      return <SplashScreen1 {...{ setStage }} />;
    case "splash2":
      return <SplashScreen2 {...{ setStage }} />;
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
