import { Box } from "@mui/material";
import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import palette from "../palette";
import { PauseMenu } from "./PauseMenu";
import { LevelRenderer } from "./LevelRenderer";
import { Stage } from "@pixi/react";
import { SCALE_MODES, settings } from "@pixi/core";

settings.SCALE_MODE = SCALE_MODES.NEAREST;

export const Game = ({
  setStage,
  initialLevel,
}: {
  setStage: Dispatch<SetStateAction<string>>;
  initialLevel: MutableRefObject<number>;
}) => {
  const [levelNumber, setLevelNumber] = useState(initialLevel.current);

  const [{ width, height }, setScreenDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [paused, setPaused] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const restart = useCallback(() => {
    setRetryCount(retryCount + 1);
  }, [retryCount, setRetryCount]);

  useEffect(() => {
    const resize = (ev: UIEvent) => {
      if (ev.view) {
        setScreenDimensions({
          width: ev.view.innerWidth,
          height: ev.view.innerHeight,
        });
      } else {
        setScreenDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    const pause = (e: any) => {
      if (e.key === "Escape") {
        setPaused(!paused);
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("keydown", pause);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", pause);
    };
  });

  return (
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        width: "100%",
        height: "100vh",
        flexDirection: "column",
        fontSize: "50",
        backgroundColor: palette.lightBlue,
        color: "white",
      }}
    >
      {paused && (
        <PauseMenu
          unpause={() => setPaused(false)}
          mainMenu={() => setStage("menu")}
          selectLevel={() => setStage("select")}
        />
      )}
      <Stage
        width={width}
        height={height}
        options={{ backgroundAlpha: 1, backgroundColor: 0x000000 }}
      >
        <LevelRenderer
          levelNumber={levelNumber}
          nextLevel={() => setLevelNumber(levelNumber + 1)}
          paused={paused}
          _retryCount={retryCount}
          restart={restart}
          key={`game-${retryCount}`}
        />
      </Stage>
    </Box>
  );
};
