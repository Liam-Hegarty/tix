import { MusicInfo } from "../levels/LevelTypes";
import {
  cumulativeRhythmTimes,
  currentBeatTime,
  sumRhythmTimes,
} from "../rhythmUtils";
import { EventResponse, TixEvent } from "./Events";

export const moveIsOnTempo = (
  rhythmTime: React.MutableRefObject<{
    audioTime: number;
    jsTime: number;
  }>,
  music: MusicInfo
) => {
  const cumulativeBeatTimes = [
    ...cumulativeRhythmTimes(music.rhythm),
    { tock: music.rhythm[0].tock, time: sumRhythmTimes(music.rhythm) },
  ];

  var lastMoveTs = -10000;
  var lastMatchedBeatTs = -10000;

  return (e: TixEvent): Partial<EventResponse> => {
    if (!e.move) {
      return { canMove: false };
    }
    const msProgressOfCurrentLoop = currentBeatTime(music, rhythmTime, e.ts);

    const nextBeatIndex = Math.max(
      cumulativeBeatTimes.findIndex((b) => b.time > msProgressOfCurrentLoop),
      1
    );

    const nextBeat = cumulativeBeatTimes[nextBeatIndex];
    const previousBeat = cumulativeBeatTimes[nextBeatIndex - 1];

    const nearestBeat =
      msProgressOfCurrentLoop - previousBeat.time >
      nextBeat.time - msProgressOfCurrentLoop
        ? nextBeat
        : previousBeat;

    console.log({ cumulativeBeatTimes, previousBeat, nextBeat, nearestBeat });

    const distanceFromBeat = Math.abs(
      nearestBeat.time - msProgressOfCurrentLoop
    );

    if (
      (nearestBeat.time === lastMatchedBeatTs ||
        (nearestBeat.time === 0 && // wraparound logic
          lastMatchedBeatTs ===
            cumulativeBeatTimes[cumulativeBeatTimes.length - 1].time)) &&
      e.ts - lastMoveTs < sumRhythmTimes(music.rhythm)
    ) {
      return {
        canMove: false,
        crashed: true,
      };
    } else {
      lastMoveTs = e.ts;
      lastMatchedBeatTs = nearestBeat.time;
    }

    if (distanceFromBeat < music.tolerance && nearestBeat.tock === e.action) {
      return {};
    } else {
      return {
        canMove: false,
        crashed: true,
      };
    }
  };
};
