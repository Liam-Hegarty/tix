import React, { useEffect, useMemo, useRef, useState } from "react";
import { Grid } from "./tiles/Grid";
import { Ticker } from "./Ticker";
import { Robot } from "./robot/Robot";
import { RobotListenerRegistry } from "./events/robotListenerRegistry";
import addEventListeners from "./events/addEventListeners";
import { ScannerDrones } from "./obstacles/ScannerDrones";
import { levels } from "./levels/levels";

const spacing = 100;

export const LevelRenderer = ({
  levelNumber,
  nextLevel,
  paused,
  _retryCount,
  restart,
}: {
  levelNumber: number;
  nextLevel: () => void;
  paused: boolean;
  _retryCount: number;
  restart: () => void;
}) => {
  const level = levels[levelNumber];
  const rhythmTime = useRef({ audioTime: -10000, jsTime: -1000 });

  const listenerRegistry = useMemo(() => {
    const reg = new RobotListenerRegistry();
    addEventListeners(reg, rhythmTime, level, nextLevel);
    return reg;
  }, [rhythmTime, level, nextLevel]);

  const [offset, setOffset] = useState({
    x: window.innerWidth / 2 - level.start.x * spacing,
    y: window.innerHeight / 2 - level.start.y * spacing,
  });

  useEffect(() => {
    setOffset({
      x: window.innerWidth / 2 - level.start.x * spacing,
      y: window.innerHeight / 2 - level.start.y * spacing,
    });
  }, [level]);

  return (
    <>
      <Grid level={level} spacing={spacing} offset={offset} />
      <Robot
        key={`robot-${levelNumber}`}
        {...{
          listeners: listenerRegistry,
          spacing,
          offset,
          setOffset,
          start: level.start,
          paused,
          restart,
        }}
      />
      {!!level.scannerDrones.length && (
        <ScannerDrones
          drones={level.scannerDrones}
          spacing={spacing}
          offset={offset}
          listenerRegistry={listenerRegistry}
        />
      )}
      <Ticker
        {...{
          rhythm: level.music.rhythm,
          rhythmTime,
          tolerance: level.music.tolerance,
          offset: level.music.rhythmOffset,
          audioTrack: level.music.audioPath,
        }}
      />
    </>
  );
};
