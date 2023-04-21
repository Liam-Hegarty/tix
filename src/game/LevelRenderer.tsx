import React, { useMemo, useRef, useState } from "react";
import { Grid } from "./Grid";
import { Ticker } from "./Ticker";
import { Robot } from "./robot/Robot";
import { Level } from "./levels/Level";
import { RobotListenerRegistry } from "./events/robotListenerRegistry";
import addEventListeners from "./events/addEventListeners";
import { ScannerDrones } from "./obstacles/ScannerDrones";

const spacing = 100;

export const LevelRenderer = ({
  level,
  nextLevel,
  paused,
}: {
  level: Level;
  nextLevel: () => void;
  paused: boolean;
}) => {
  const rhythmTime = useRef({ audioTime: -10000, jsTime: -1000 });

  const listenerRegistry = useMemo(() => {
    console.log("REGISTERING");
    const reg = new RobotListenerRegistry();
    addEventListeners(reg, rhythmTime, level, nextLevel);
    return reg;
  }, [rhythmTime, level, nextLevel]);

  const [offset, setOffset] = useState({
    x: window.innerWidth / 2 - level.start.x * spacing,
    y: window.innerHeight / 2 - level.start.y * spacing,
  });

  return (
    <>
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
    </>
  );
};
