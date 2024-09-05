import { MusicInfo, Point, DropTilesInfo } from "../levels/LevelTypes";
import { Graphics as GraphicsElement, Container, useTick } from "@pixi/react";
import { Graphics } from "@pixi/graphics";
import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useState,
} from "react";
import palette from "../../palette";
import { RobotListenerRegistry } from "../events/robotListenerRegistry";
import { cumulativeRhythmTimes, currentBeatTime } from "../rhythmUtils";
import { TixEvent } from "../events/Events";

const DropTile = ({
  location,
  spacing,
  offset,
  animProgress,
}: {
  location: Point;
  spacing: number;
  offset: Point;
  animProgress: number;
}) => {
  const warningSign = useCallback((animProgress: number) => (g: Graphics) => {
    g.clear();
    g.beginFill(palette.black);
    g.lineStyle(1, palette.black, 1);
    g.drawRect(50 - (50 * animProgress), 0, 100 * animProgress, 100);
    g.endFill();
  }, []);

  return (
    <Container
      x={location.x * spacing + offset.x - spacing / 2}
      y={location.y * spacing + offset.y - spacing / 2}
    >
      <GraphicsElement draw={warningSign(animProgress)} />
    </Container>
  );
};

const TileGroup = ({
  tiles,
  spacing,
  offset,
  listenerRegistry,
  musicInfo,
  musicRef: rhythm,
}: {
  tiles: DropTilesInfo;
  spacing: number;
  offset: Point;
  listenerRegistry: RobotListenerRegistry;
  musicInfo: MusicInfo;
  musicRef: MutableRefObject<{
    audioTime: number;
    jsTime: number;
  }>;
}) => {
  const [animProgress, setAnimProgress] = useState(0);

  const robotHasBeenDropped = useCallback((e: TixEvent) => {
    return {};
  }, []);

  useTick(() => {
    const currentTime = currentBeatTime(musicInfo, rhythm, performance.now());
    const beatTimes = cumulativeRhythmTimes(musicInfo.rhythm).map(
      (b) => b.time
    );
    let nextBeatIndex = beatTimes.findIndex((b) => b > currentTime);
    if (nextBeatIndex === -1) {
      nextBeatIndex = 0
    }
    const previousBeatIndex = nextBeatIndex === 0 ? beatTimes.length - 1 : nextBeatIndex - 1;

    const wasOpen = tiles.pattern[previousBeatIndex % (tiles.pattern.length)]
    const willBeOpen = tiles.pattern[nextBeatIndex % (tiles.pattern.length)]
    const progress = (currentTime - beatTimes[previousBeatIndex]) / (beatTimes[nextBeatIndex] - beatTimes[previousBeatIndex])  

    console.log({wasOpen, willBeOpen, progress})

    // if (willBeOpen && wasOpen) {
    //   setAnimProgress(0)
    // }
    // else if (!willBeOpen && !wasOpen) {
    //   setAnimProgress(1)
    // }
    if (willBeOpen && !wasOpen) {
      setAnimProgress(progress)
    }
    else {
      setAnimProgress(1 - progress)
    }
  });

  useEffect(() => {
    const id = `zap-${JSON.stringify(tiles)}`;
    listenerRegistry.register(id, robotHasBeenDropped);
    return () => listenerRegistry.deregister(id);
  }, [listenerRegistry, robotHasBeenDropped, tiles]);

  return (
    <>
      {tiles.tiles.map((t) => (
        <DropTile
          key={`zaptile-${t.x}-${t.y}`}
          location={t}
          spacing={spacing}
          offset={offset}
          animProgress={animProgress}
        />
      ))}
    </>
  );
};

export const ZapTiles = ({
  tiles,
  spacing,
  offset,
  listenerRegistry,
  musicInfo,
  rhythm,
}: {
  tiles: DropTilesInfo[];
  spacing: number;
  offset: Point;
  listenerRegistry: RobotListenerRegistry;
  musicInfo: MusicInfo;
  rhythm: MutableRefObject<{
    audioTime: number;
    jsTime: number;
  }>;
}) => {
  return (
    <>
      {tiles.map((t, i) => (
        <TileGroup
          key={`zap-tile-group-${i}`}
          tiles={t}
          spacing={spacing}
          offset={offset}
          listenerRegistry={listenerRegistry}
          musicInfo={musicInfo}
          musicRef={rhythm}
        />
      ))}
    </>
  );
};
