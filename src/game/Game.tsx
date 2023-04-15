import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import palette from "../Palette";
import { Stage } from "@pixi/react";
import { Tix } from "./Tix";
import { Ticker } from "./Ticker";
import { TixEvent } from "./Events";

type Beat = { tock: boolean; time: number };
type Rhythm = Beat[];

const sumRhythmTimes = (rhythm: Rhythm) =>
  rhythm.map((b) => b.time).reduce((x, y) => x + y, 0);

export const Game = () => {
  const startTime = useRef<number>(-10000);

  const tolerance = 100;

  const rhythm = [
    { tock: false, time: 400 },
    { tock: false, time: 400 },
    { tock: false, time: 400 },
    { tock: true, time: 400 },
  ];

  const moveIsAllowed = (e: TixEvent) => {
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

  const [{width, height}, setScreenDimensions] = useState({width: window.innerWidth, height: window.innerHeight})

  useEffect(() => {
    const resize = (ev: UIEvent) => {
      if (ev.view) {
        setScreenDimensions({width: ev.view.innerWidth, height: ev.view?.innerHeight});
      }
      else {
        setScreenDimensions({width: window.innerWidth, height: window.innerHeight});
      }
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  })

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
      <Stage
        width={width}
        height={height}
        options={{ backgroundAlpha: 1, backgroundColor: palette.lightBlue }}
      >
        <Tix {...{ moveIsAllowed }} />
        <Ticker rhythm={rhythm} startTime={startTime} />
      </Stage>
    </Box>
  );
};
