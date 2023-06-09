import { MusicInfo, Point, ZapTilesInfo } from "../levels/LevelTypes";
import { Graphics as GraphicsElement, Container, useTick } from "@pixi/react";
import { Graphics } from "@pixi/graphics";
import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import palette from "../../palette";
import { RobotListenerRegistry } from "../events/robotListenerRegistry";
import { cumulativeRhythmTimes, currentBeatTime } from "../rhythmUtils";
import { TixEvent } from "../events/Events";

const ZapTile = ({
  location,
  spacing,
  offset,
  isZapping,
}: {
  location: Point;
  spacing: number;
  offset: Point;
  isZapping: boolean;
}) => {
  const warningSign = useCallback((g: Graphics) => {
    g.clear();
    g.beginFill(palette.orange);
    g.lineStyle(1, palette.black, 1);
    g.drawRect(8, 8, 16, 16);
    g.endFill();
  }, []);

  return (
    <Container
      x={location.x * spacing + offset.x - spacing / 2}
      y={location.y * spacing + offset.y - spacing / 2}
    >
      {isZapping && <GraphicsElement draw={warningSign} />}
    </Container>
  );
};

const TileGroup = ({
  tiles,
  spacing,
  offset,
  listenerRegistry,
  musicInfo,
  rhythm,
}: {
  tiles: ZapTilesInfo;
  spacing: number;
  offset: Point;
  listenerRegistry: RobotListenerRegistry;
  musicInfo: MusicInfo;
  rhythm: MutableRefObject<{
    audioTime: number;
    jsTime: number;
  }>;
}) => {
  const [isZapping, setIsZapping] = useState(false);
  const isZappingRef = useRef(false);
  const marshalledCoords = useMemo(
    () => tiles.tiles.map((p) => JSON.stringify(p)),
    [tiles]
  );
  // console.log(marshalledCoords);

  const robotHasBeenZapped = useCallback(
    (e: TixEvent) => {
      // console.log(e)
      if (
        isZappingRef.current &&
        marshalledCoords.includes(JSON.stringify(e.oldLocation))
      ) {
        return {
          // canMove: false,
          // crashed: true,
          // detected: true,
        };
      } else {
        return {};
      }
    },
    [isZappingRef, marshalledCoords]
  );

  useEffect(() => {
    const id = `zap-${JSON.stringify(tiles)}`;
    listenerRegistry.register(id, robotHasBeenZapped);
    return () => listenerRegistry.deregister(id);
  }, [listenerRegistry, robotHasBeenZapped, tiles]);

  useTick(() => {
    const beatTime = currentBeatTime(musicInfo, rhythm, performance.now());
    const beatIndex = cumulativeRhythmTimes(musicInfo.rhythm).findIndex(
      (b) => Math.abs(beatTime - b.time) < musicInfo.tolerance
    );
    const toggleZap = tiles.rhythm[beatIndex % tiles.rhythm.length];
    isZappingRef.current = toggleZap;
    setIsZapping(toggleZap);
  });

  return (
    <>
      {tiles.tiles.map((t) => (
        <ZapTile
          key={`zaptile-${t.x}-${t.y}`}
          location={t}
          spacing={spacing}
          offset={offset}
          isZapping={isZapping}
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
  tiles: ZapTilesInfo[];
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
          rhythm={rhythm}
        />
      ))}
    </>
  );
};
