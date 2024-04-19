import React, { useEffect, useMemo, useRef, useState } from "react";
import { Grid } from "./tiles/Grid";
import { Ticker } from "./Ticker";
import { Robot } from "./robot/Robot";
import { RobotListenerRegistry } from "./events/robotListenerRegistry";
import addEventListeners from "./events/addEventListeners";
import { ScannerDrones } from "./obstacles/ScannerDrones";
import { levels } from "./levels/levels";
import { ZapTiles } from "./obstacles/DropTile";
import constants from "../constants";
import { Level } from "./levels/LevelTypes";
import { Doors } from "./obstacles/Doors";

const spacing = 100;

const saveLevelProgress = (number: number) => {
  const currentValue = localStorage.getItem(constants.saveKey);
  if (!currentValue || Number.parseInt(currentValue) < number) {
    localStorage.setItem(constants.saveKey, number.toString());
  }
};

export const LevelRenderer = ({
  levelNumber,
  nextLevel,
  paused,
  _retryCount,
  restart,
  credits,
}: {
  levelNumber: number;
  nextLevel: () => void;
  paused: boolean;
  _retryCount: number;
  restart: () => void;
  credits: () => void;
}) => {
  const level: Level = levels[levelNumber];
  if (!level) {
    credits();
  }
  const rhythmTime = useRef({ audioTime: -10000, jsTime: -1000 });

  const listenerRegistry = useMemo(() => {
    const reg = new RobotListenerRegistry();
    addEventListeners(reg, rhythmTime, level);
    return reg;
  }, [rhythmTime, level]);

  const [offset, setOffset] = useState({
    x: window.innerWidth / 2 - level.start.x * spacing,
    y: window.innerHeight / 2 - level.start.y * spacing,
  });

  useEffect(() => saveLevelProgress(levelNumber), [levelNumber]);

  useEffect(() => {
    setOffset({
      x: window.innerWidth / 2 - level.start.x * spacing,
      y: window.innerHeight / 2 - level.start.y * spacing,
    });
  }, [level]);

  return (
    <>
      <Grid level={level} spacing={spacing} offset={offset} />
      {!!level.doors.length && (
        <Doors
          coords={level.doors}
          spacing={spacing}
          offset={offset}
          listenerRegistry={listenerRegistry}
        />
      )}
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
          nextLevel,
          rhythmTime,
          music: level.music,
        }}
      />
      {!!level.dropTiles.length && (
        <ZapTiles
          tiles={level.dropTiles}
          spacing={spacing}
          offset={offset}
          listenerRegistry={listenerRegistry}
          musicInfo={level.music}
          rhythm={rhythmTime}
        />
      )}
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
          music: level.music,
        }}
      />
    </>
  );
};
