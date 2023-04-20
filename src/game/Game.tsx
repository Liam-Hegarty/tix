import { Box } from "@mui/material";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import palette from "../palette";
import { Stage } from "@pixi/react";
import { Robot } from "./robot/Robot";
import { Ticker } from "./Ticker";
import { Grid } from "./Grid";
import { PauseMenu } from "./PauseMenu";
import { ScannerDrones } from "./obstacles/ScannerDrones";
import { RobotListenerRegistry } from "./events/robotListenerRegistry";
import addEventListeners from "./events/addEventListeners";
import { levels } from "./levels/levels";

const spacing = 100;

export const Game = ({
  setStage,
}: {
  setStage: Dispatch<SetStateAction<string>>;
}) => {
  const [levelNumber, setLevelNumber] = useState(1);
  const level = levels[levelNumber];
  const rhythmTime = useRef({ audioTime: -10000, jsTime: -1000 });

  const listenerRegistry = useMemo(() => {
    console.log("REGISTERING");
    const reg = new RobotListenerRegistry();
    addEventListeners(reg, rhythmTime, level, () =>
      setLevelNumber(levelNumber + 1)
    );
    return reg;
  }, [rhythmTime, level, levelNumber, setLevelNumber]);

  const [{ width, height }, setScreenDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [offset, setOffset] = useState({
    x: width / 2 - level.start.x * spacing,
    y: height / 2 - level.start.y * spacing,
  });

  const [paused, setPaused] = useState(false);

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
        <Grid level={level} spacing={spacing} offset={offset} />
        <Ticker
          {...{
            rhythm: level.music.rhythm,
            rhythmTime,
            tolerance: level.music.tolerance,
            offset: level.music.rhythmOffset,
            audioTrack: level.music.audioPath,
          }}
        />
        <Robot
          {...{
            listeners: listenerRegistry,
            spacing,
            offset,
            setOffset,
            start: level.start,
            paused,
          }}
        />
        {level.scannerDrones.length && (
          <ScannerDrones
            drones={level.scannerDrones}
            spacing={spacing}
            offset={offset}
          />
        )}
      </Stage>
    </Box>
  );
};
