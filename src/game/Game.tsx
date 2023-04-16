import { Box } from "@mui/material";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import palette from "../palette";
import { Stage } from "@pixi/react";
import { Robot } from "./Robot";
import { Ticker } from "./Ticker";
import { TixEvent } from "./Events";
import { levelOne } from "./levels/LevelOne";
import { Grid } from "./Grid";
import { PauseMenu } from "./PauseMenu";

type Beat = { tock: boolean; time: number };
type Rhythm = Beat[];

const sumRhythmTimes = (rhythm: Rhythm) =>
  rhythm.map((b) => b.time).reduce((x, y) => x + y, 0);

export const Game = ({
  setStage,
}: {
  setStage: Dispatch<SetStateAction<string>>;
}) => {
  const startTime = useRef<number>(-10000);

  const level = levelOne;

  const tolerance = 100;
  const spacing = 100;

  const rhythm = [
    { tock: false, time: 400 },
    { tock: false, time: 400 },
    { tock: false, time: 400 },
    { tock: true, time: 400 },
  ];

  const moveIsOnTempo = (e: TixEvent) => {
    const dividend = (e.ts - startTime.current) % sumRhythmTimes(rhythm);
    const times = rhythm.map((b, i) => {
      return { tock: b.tock, time: sumRhythmTimes(rhythm.slice(0, i)) };
    });

    const nextBeatIndex = Math.max(
      times.findIndex((b) => b.time > dividend),
      0
    );
    const nextBeat = times[nextBeatIndex];
    const previousBeat =
      nextBeatIndex === 0 ? times[times.length - 1] : times[nextBeatIndex - 1];

    const distanceFromBeat = Math.min(
      dividend - previousBeat.time,
      nextBeat.time - dividend
    );
    return distanceFromBeat < tolerance;
  };

  const moveIsOnGrid = (e: TixEvent) => {
    try {
      return !!level.grid[e.location.y][e.location.x];
    } catch (e: any) {
      return false;
    }
  };

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
        <Ticker rhythm={rhythm} startTime={startTime} />
        <Robot
          {...{
            moveIsAllowed: (e) => moveIsOnTempo(e) && moveIsOnGrid(e),
            spacing,
            offset,
            setOffset,
            start: level.start,
            paused,
          }}
        />
      </Stage>
    </Box>
  );
};
