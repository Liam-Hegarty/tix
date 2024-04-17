import React, { useEffect, useRef, useState } from "react";
import { ClickToStart, SplashScreen1, SplashScreen2 } from "./SplashScreens";
import { MainMenu } from "./main-menu/MainMenu";
import { Game } from "./game/Game";
import { Credits } from "./main-menu/Credits";
import { LevelSelect } from "./main-menu/LevelSelect";
import { Tutorial } from "./main-menu/Tutorial";

export enum StageEnum {
  START = "start",
  SPLASH1 = "splash1",
  SPLASH2 = "splash2",
  MENU = "menu",
  CREDITS = "credits",
  SELECT = "select",
  TUTORIAL = "tutorial",
  PREGAME_TUTORIAL = "pregame-tutorial",
  GAME = "game"
}

const themeMusic = new Audio(
  `${process.env.PUBLIC_URL}/audio/music/main-theme.mp3`
);
themeMusic.loop = true;

function App() {
  const [stage, setStage] = useState<StageEnum>(StageEnum.START);
  const initialLevel = useRef(1);

  useEffect(() => {
    if (
      stage !== "splash1" &&
      stage !== "game" &&
      stage !== "start" &&
      themeMusic.paused
    ) {
      themeMusic.play();
    }

    if (
      (stage === "splash1" || stage === "game" || stage === "start") &&
      !themeMusic.paused
    ) {
      themeMusic.pause();
    }

    return () => themeMusic.pause();
  }, [stage]);

  switch (stage) {
    case StageEnum.START:
      return <ClickToStart {...{ setStage }} />;
    case StageEnum.SPLASH1:
      return <SplashScreen1 {...{ setStage }} />;
    case StageEnum.SPLASH2:
      return <SplashScreen2 {...{ setStage }} />;
    case StageEnum.MENU:
      initialLevel.current = 1;
      return <MainMenu {...{ setStage, initialLevel }} />;
    case StageEnum.CREDITS:
      return <Credits exit={() => setStage(StageEnum.MENU)} />;
    case StageEnum.SELECT:
      return <LevelSelect {...{ setStage, initialLevel: initialLevel }} />;
    case StageEnum.TUTORIAL:
      return <Tutorial nextStage={() => setStage(StageEnum.MENU)} />;
    case StageEnum.PREGAME_TUTORIAL:
      return <Tutorial nextStage={() => setStage(StageEnum.GAME)} />;
    case StageEnum.GAME:
      return <Game {...{ setStage, initialLevel: initialLevel }} />;
    default:
      let _: never = stage
      return <h1>SOMETHING HAS GONE SERIOUSLY WRONG</h1>
  }
}

export default App;
