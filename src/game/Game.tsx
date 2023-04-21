import { Box } from "@mui/material";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import palette from "../palette";
import { PauseMenu } from "./PauseMenu";
import { LevelRenderer } from "./LevelRenderer";
import { Stage } from "@pixi/react";

export const Game = ({
  setStage,
}: {
  setStage: Dispatch<SetStateAction<string>>;
}) => {
  const [levelNumber, setLevelNumber] = useState(1);

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
