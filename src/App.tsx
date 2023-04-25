import React, { useEffect, useRef, useState } from "react";
import { ClickToStart, SplashScreen1, SplashScreen2 } from "./SplashScreens";
import { MainMenu } from "./main-menu/MainMenu";
import { Game } from "./game/Game";
import { Credits } from "./main-menu/Credits";
import { LevelSelect } from "./main-menu/LevelSelect";
import { Tutorial } from "./main-menu/Tutorial";

const themeMusic = new Audio(
  `${process.env.PUBLIC_URL}/audio/music/main-theme.mp3`
);
themeMusic.loop = true;

function App() {
  const [stage, setStage] = useState<string>("start");
  const initialLevel = useRef(1);

  useEffect(() => {
    if (stage !== "splash1" && stage !== "game" && stage !== "start" && themeMusic.paused) {
      themeMusic.play();
    }

    if ((stage === "splash1" || stage === "game" || stage === "start") && !themeMusic.paused) {
      themeMusic.pause();
    }

    return () => themeMusic.pause();
  }, [stage]);

  switch (stage) {
    case "start":
      return <ClickToStart {...{ setStage }} />
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
    case "tutorial":
      return <Tutorial nextStage={() => setStage("menu")} />;
    case "pregame-tutorial":
      return <Tutorial nextStage={() => setStage("game")} />;
    case "game":
      return <Game {...{ setStage, initialLevel: initialLevel }} />;
    default:
      return <h1>SOMETHING HAS GONE HORRIBLY WRONG</h1>;
  }
}

export default App;
