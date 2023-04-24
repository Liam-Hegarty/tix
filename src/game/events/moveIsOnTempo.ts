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
  const cumulativeBeatTimes = cumulativeRhythmTimes(music.rhythm);

  var lastMoveTs = -10000;
  var lastMatchedBeatTs = -10000;

  return (e: TixEvent): Partial<EventResponse> => {
    if (!e.move) {
      return { canMove: false };
    }
    const msProgressOfCurrentLoop = currentBeatTime(music, rhythmTime, e.ts);

    const nextBeatIndex = Math.max(
      cumulativeBeatTimes.findIndex((b) => b.time > msProgressOfCurrentLoop),
      0
    );

    var nextBeat = cumulativeBeatTimes[nextBeatIndex];

    const previousBeat =
      nextBeatIndex === 0
        ? cumulativeBeatTimes[cumulativeBeatTimes.length - 1]
        : cumulativeBeatTimes[nextBeatIndex - 1];

    if (nextBeatIndex === 0) {
      nextBeat = {
        ...nextBeat,
        time: previousBeat.time + music.rhythm[music.rhythm.length - 1].time,
      };
    }

    const distanceFromBeat = Math.min(
      msProgressOfCurrentLoop - previousBeat.time,
      nextBeat.time - msProgressOfCurrentLoop
    );

    const nearestBeat =
      msProgressOfCurrentLoop - previousBeat.time >
      nextBeat.time - msProgressOfCurrentLoop
        ? nextBeat
        : previousBeat;

    if (
      nearestBeat.time === lastMatchedBeatTs &&
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
