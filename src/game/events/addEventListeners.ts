import { Level, Rhythm } from "../levels/Level";
import { EventResponse, TixEvent } from "./Events";
import { RobotListenerRegistry } from "./robotListenerRegistry";

const sumRhythmTimes = (rhythm: Rhythm) =>
  rhythm.map((b) => b.time).reduce((x, y) => x + y, 0);
const moveIsOnTempo =
  (
    rhythmTime: React.MutableRefObject<{
      audioTime: number;
      jsTime: number;
    }>,
    level: Level
  ) =>
  (e: TixEvent): EventResponse | undefined => {
    const { audioTime, jsTime } = rhythmTime.current;
    const dividend =
      (audioTime + (e.ts - jsTime)) % sumRhythmTimes(level.music.rhythm);
    const times = level.music.rhythm.map((b, i) => {
      return {
        tock: b.tock,
        time: sumRhythmTimes(level.music.rhythm.slice(0, i)),
      };
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
    if (distanceFromBeat < level.music.tolerance) {
      return undefined;
    } else {
      return {
        response: "CRASH",
      };
    }
  };

const moveIsOnGrid =
  (level: Level) =>
  (e: TixEvent): EventResponse | undefined => {
    try {
      if (!!level.grid[e.location.y][e.location.x]) {
        return undefined;
      } else {
        return {
          response: "CRASH",
        };
      }
    } catch (e: any) {
      return {
        response: "CRASH",
      };
    }
  };

export default function addEventListeners(
  registry: RobotListenerRegistry,
  timeRef: React.MutableRefObject<{
    audioTime: number;
    jsTime: number;
  }>,
  level: Level
) {
  registry.register(moveIsOnTempo(timeRef, level));
  registry.register(moveIsOnGrid(level));
}
